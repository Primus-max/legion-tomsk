<template>
  <ImperialSection title="Портфолио" class="portfolio-preview">
    <div class="portfolio-preview__tabs">
      <div
        v-for="cat in categories"
        :key="cat.key"
        :class="['portfolio-preview__tab', { active: cat.key === activeCategory }]"
        @click="activeCategory = cat.key"
        role="tab"
        tabindex="0"
      >
        {{ cat.label }}
      </div>
    </div>
    <div class="portfolio-preview__carousel-wrap">
      <button class="portfolio-preview__arrow left" @click="prevSlide" v-if="showArrows">
        <span>&lt;</span>
      </button>
      <div
        class="portfolio-preview__carousel"
        ref="carouselRef"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div
          class="portfolio-preview__slides"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div
            v-for="(item, idx) in slides[activeCategory]"
            :key="idx"
            class="portfolio-preview__slide"
          >
            <img :src="item.image" :alt="item.title" />
            <div class="portfolio-preview__caption">{{ item.title }}</div>
          </div>
        </div>
      </div>
      <button class="portfolio-preview__arrow right" @click="nextSlide" v-if="showArrows">
        <span>&gt;</span>
      </button>
    </div>
    <router-link to="/portfolio" class="portfolio-preview__all">Смотреть все работы</router-link>
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
.portfolio-preview {
  margin: 64px auto 0 auto;
  max-width: 1200px;
  min-height: 600px;
  padding: 0 0 48px 0;
  z-index: 2;

  &__tabs {
    display: flex;
    gap: 0;
    justify-content: center;
    margin: 32px 0 24px 0;
    flex-wrap: wrap;
    border-bottom: 2px solid #ffd60044;
  }

  &__tab {
    background: none;
    border: none;
    color: #ffd600;
    font-weight: 700;
    font-size: 1.1rem;
    padding: 0.7em 2em 0.7em 2em;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s, background-color 0.2s;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 3px solid transparent;
    margin-bottom: -2px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 20%;
      height: 60%;
      width: 1px;
      background: #ffd60044;
    }
    
    &:last-child::after {
      display: none;
    }
    
    &.active {
      color: #fff;
      border-bottom: 3px solid #ffd600;
      background: rgba(255, 214, 0, 0.1);
    }
    
    &:hover {
      color: #fff;
      background: rgba(255, 214, 0, 0.05);
    }
  }

  &__carousel-wrap {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 900px;
    margin: 0 auto 24px auto;
    position: relative;
  }

  &__arrow {
    background: #181818;
    border: 2px solid #ffd600;
    color: #ffd600;
    width: 44px;
    height: 44px;
    font-size: 2rem;
    font-weight: 900;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 4;
    
    &.left {
      left: -24px;
    }
    
    &.right {
      right: -24px;
    }
    
    &:hover {
      background: #ffd600;
      color: #181818;
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
  }

  &__slides {
    display: flex;
    gap: 24px;
    min-width: 100%;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &__slide {
    background: #181818;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.18);
    border: 1.5px solid #ffd60044;
    min-width: 220px;
    max-width: 260px;
    flex: 0 0 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 18px 12px 12px 12px;
    transition: box-shadow 0.3s;
    img {
      width: 100%;
      height: 120px;
      object-fit: contain;
      margin-bottom: 12px;
      background: #222;
      border-radius: 8px;
      box-shadow: 0 2px 8px #ffd60022;
    }
  }

  &__caption {
    color: #ffd600;
    font-weight: 700;
    font-size: 1rem;
    text-align: center;
    margin-top: 4px;
    text-shadow: 0 2px 8px #ffd60033;
  }

  &__all {
    display: inline-block;
    background: none;
    border: 2px solid #ffd600;
    color: #ffd600;
    font-weight: 700;
    padding: 0.8em 2em;
    margin: 24px auto 0;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: background 0.2s, color 0.2s;
    
    &:hover {
      background: #ffd600;
      color: #181818;
    }
  }
}

@keyframes portfolio-glow-appear {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes lamp-blink {
  0% { filter: brightness(0.2); }
  10% { filter: brightness(1.2); }
  20% { filter: brightness(0.2); }
  30% { filter: brightness(1.2); }
  40% { filter: brightness(0.2); }
  50% { filter: brightness(1.2); }
  100% { filter: brightness(1); }
}

.portfolio-fade-enter-active {
  animation: portfolio-fade-in 0.7s cubic-bezier(.4,1.4,.6,1) both;
}
@keyframes portfolio-fade-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes title-glow {
  from {
    text-shadow: 0 0 20px #ffd60022, 0 0 40px #ffd60011;
  }
  to {
    text-shadow: 0 0 25px #ffd60044, 0 0 50px #ffd60022;
  }
}

@keyframes title-gradient-move {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style> 