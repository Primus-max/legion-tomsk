<template>
  <ImperialSection title="Портфолио" class="portfolio-section">
    <div class="portfolio-section__tabs">
      <div
        v-for="cat in categories"
        :key="cat.key"
        :class="['portfolio-section__tab', { active: cat.key === activeCategory }]"
        @click="activeCategory = cat.key"
        role="tab"
        tabindex="0"
      >
        {{ cat.label }}
      </div>
    </div>
    <div class="portfolio-section__carousel-wrap">
      <button class="portfolio-section__arrow left" @click="prevSlide" v-if="showArrows">
        <span>&lt;</span>
      </button>
      <div
        class="portfolio-section__carousel"
        ref="carouselRef"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div
          class="portfolio-section__slides"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div
            v-for="(item, idx) in slides[activeCategory]"
            :key="idx"
            class="portfolio-section__slide"
          >
            <img :src="item.image" :alt="item.title" />
          </div>
        </div>
      </div>
      <button class="portfolio-section__arrow right" @click="nextSlide" v-if="showArrows">
        <span>&gt;</span>
      </button>
    </div>
    <router-link to="/portfolio" class="portfolio-section__all">Смотреть все работы</router-link>
  </ImperialSection>
</template>

<script setup>
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue';

import ImperialSection from './ImperialSection.vue';

const categories = [
  { key: 'peretyazhka', label: 'Перетяжка' },
  { key: 'tuning', label: 'Тюнинг' },
  { key: 'restoration', label: 'Реставрация' },
  { key: 'sewing', label: 'Изготовление и пошив' },
  { key: 'embroidery', label: 'Вышивка' },
  { key: 'electronics', label: 'Автоэлектрика' },
  { key: 'carpets', label: 'EVO и 3D ковры' },
];

const slides = {
  peretyazhka: [
    { image: '/images/seats.svg', title: 'Сиденья Mercedes' },
    { image: '/images/seats.svg', title: 'Сиденья BMW' },
    { image: '/images/seats.svg', title: 'Сиденья Lexus' },
    { image: '/images/seats.svg', title: 'Сиденья Audi' },
    { image: '/images/seats.svg', title: 'Сиденья Toyota' },
  ],
  tuning: [
    { image: '/images/tuning.svg', title: 'Тюнинг салона' },
    { image: '/images/tuning.svg', title: 'Детали интерьера' },
    { image: '/images/tuning.svg', title: 'Панели' },
  ],
  restoration: [
    { image: '/images/restoration.svg', title: 'Реставрация кожи' },
    { image: '/images/restoration.svg', title: 'Восстановление пластика' },
    { image: '/images/restoration.svg', title: 'Ремонт сидений' },
  ],
  sewing: [
    { image: '/images/sewing.svg', title: 'Пошив подлокотника' },
    { image: '/images/sewing.svg', title: 'Пошив чехлов' },
    { image: '/images/sewing.svg', title: 'Пошив ковриков' },
  ],
  embroidery: [
    { image: '/images/embroidery.svg', title: 'Логотип на подголовнике' },
    { image: '/images/embroidery.svg', title: 'Декоративная вышивка' },
    { image: '/images/embroidery.svg', title: 'Именная вышивка' },
  ],
  electronics: [
    { image: '/images/electronics.svg', title: 'Подсветка салона' },
    { image: '/images/electronics.svg', title: 'Установка USB' },
    { image: '/images/electronics.svg', title: 'Мониторинг' },
  ],
  carpets: [
    { image: '/images/carpets.svg', title: 'EVO ковры' },
    { image: '/images/carpets.svg', title: '3D ковры' },
    { image: '/images/carpets.svg', title: 'Органайзеры' },
  ],
};

const activeCategory = ref(categories[0].key);
const carouselRef = ref(null);
const currentSlide = ref(0);
const slidesToShow = 3;

const showArrows = computed(() => slides[activeCategory.value].length > slidesToShow);

function nextSlide() {
  const max = slides[activeCategory.value].length - slidesToShow;
  if (currentSlide.value < max) currentSlide.value++;
}
function prevSlide() {
  if (currentSlide.value > 0) currentSlide.value--;
}

let touchStartX = 0;
let touchEndX = 0;

function onTouchStart(e) {
  touchStartX = e.touches[0].clientX;
}
function onTouchMove(e) {
  touchEndX = e.touches[0].clientX;
}
function onTouchEnd() {
  const dx = touchEndX - touchStartX;
  if (Math.abs(dx) > 40) {
    if (dx < 0) nextSlide();
    else prevSlide();
  }
}

watch(activeCategory, () => {
  currentSlide.value = 0;
});

onMounted(() => {
  // Здесь может быть код инициализации, если потребуется
});

onUnmounted(() => {
  // Здесь может быть код очистки, если потребуется
});
</script>

<style lang="scss" scoped>
.portfolio-section {
  margin: 64px auto 0 auto;
  max-width: 1200px;
  min-height: 600px;
  padding: 0 0 48px 0;
  z-index: 2;

  &__tabs {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin: 16px 0 24px 0;
    flex-wrap: wrap;
    border-bottom: 1px solid #ffd60022;
  }

  &__tab {
    color: #fff;
    border-bottom: 2px solid transparent;
    background: none;
    font-weight: 700;
    font-size: 0.92rem;
    padding: 0.25em 0.7em;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    border-radius: 0;
    min-width: unset;
    &.active {
      color: #ffd600;
      border-bottom: 2px solid #ffd600;
      background: none;
    }
    &:hover:not(.active) {
      color: #ffd600cc;
      border-bottom: 2px solid #ffd60055;
    }
  }

  &__carousel-wrap {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: none;
    margin: 0 auto 40px auto;
    position: relative;
    gap: 0;
    min-height: 320px;
  }

  &__arrow {
    background: none;
    border: none;
    color: #fff;
    width: 32px;
    height: 32px;
    font-size: 1.4rem;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    margin: 0;
    left: -40px;
    right: auto;
    border-radius: 0;
    box-shadow: none;
    outline: none;
    transition: none;
    &.right {
      left: auto;
      right: -40px;
    }
    &:hover {
      color: #fff;
      background: none;
      box-shadow: none;
    }
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
      line-height: 1;
    }
  }

  &__carousel {
    width: 100%;
    overflow: hidden;
    touch-action: pan-y;
    margin: 0 64px;
  }

  &__slides {
    display: flex;
    gap: 32px;
    min-width: 100%;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    justify-content: center;
  }

  &__slide {
    background: #181818;
    border-radius: 0;
    box-shadow: 0 2px 16px #000a;
    border: 1.5px solid #ffd60033;
    min-width: 260px;
    max-width: 320px;
    flex: 0 0 260px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 36px 24px 24px 24px;
    transition: box-shadow 0.3s, border-color 0.2s;
    &:hover {
      border-color: #ffd600;
      box-shadow: 0 2px 16px #000a;
    }
    img {
      width: 100%;
      height: 140px;
      object-fit: contain;
      margin-bottom: 16px;
      background: #222;
      border-radius: 0;
      box-shadow: 0 2px 8px #ffd60011;
    }
  }

  &__caption {
    color: #fff;
    font-weight: 700;
    font-size: 1rem;
    text-align: center;
    margin-top: 4px;
    text-shadow: 0 2px 8px #ffd60033;
    letter-spacing: 0.04em;
  }

  &__all {
    display: inline-block;
    border: 2px solid #ffd600;
    color: #ffd600;
    background: none;
    font-weight: 700;
    padding: 0.8em 2em;
    margin: 24px auto 0;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: box-shadow 0.2s, color 0.2s;
    border-radius: 8px;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    display: block;
    text-align: center;
    &:hover {
      box-shadow: 0 0 16px #ffd60088;
      color: #fff;
      background: none;
    }
  }
}

@media (max-width: 900px) {
  .portfolio-section__tabs {
    gap: 4px;
    padding: 0 8px;
    overflow-x: auto;
    flex-wrap: nowrap;
    white-space: nowrap;
    justify-content: flex-start;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .portfolio-section__tabs::-webkit-scrollbar {
    display: none;
  }
  .portfolio-section__tab {
    font-size: 0.85rem;
    padding: 0.18em 0.5em;
    min-width: unset;
  }
  .portfolio-section__carousel {
    margin: 0;
    padding: 0;
    overflow: visible;
    position: relative;
  }
  .portfolio-section__slides {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    min-width: unset;
    justify-content: flex-start;
    padding: 0 8vw;
    transition: none;
    transform: none !important;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .portfolio-section__slides::-webkit-scrollbar {
    display: none;
  }
  .portfolio-section__slide {
    min-width: 80vw;
    max-width: 80vw;
    scroll-snap-align: center;
    flex: 0 0 80vw;
    margin: 0;
  }
  .portfolio-section__arrow {
    display: none !important;
  }
}
</style> 