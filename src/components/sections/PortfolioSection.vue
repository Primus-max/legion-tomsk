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
            <div class="portfolio-section__caption">{{ item.title }}</div>
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

import ImperialSection from '../ImperialSection.vue';

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
@import '../PortfolioPreview.vue';

.portfolio-section {
  @extend .portfolio-preview;
}

// Переопределяем все .portfolio-preview__* на .portfolio-section__*
.portfolio-section__tabs { @extend .portfolio-preview__tabs; }
.portfolio-section__tab { @extend .portfolio-preview__tab; }
.portfolio-section__carousel-wrap { @extend .portfolio-preview__carousel-wrap; }
.portfolio-section__arrow { @extend .portfolio-preview__arrow; }
.portfolio-section__carousel { @extend .portfolio-preview__carousel; }
.portfolio-section__slides { @extend .portfolio-preview__slides; }
.portfolio-section__slide { @extend .portfolio-preview__slide; }
.portfolio-section__caption { @extend .portfolio-preview__caption; }
.portfolio-section__all { @extend .portfolio-preview__all; }
</style> 