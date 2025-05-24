<template>
  <main class="portfolio-page">
    <h1 class="portfolio-title">Портфолио</h1>
    <p class="portfolio-desc">Здесь собраны лучшие работы по категориям. Выберите интересующую рубрику и вдохновляйтесь!</p>
    <nav class="portfolio-tabs" aria-label="Рубрики портфолио">
      <button
        v-for="cat in categories"
        :key="cat.id"
        :class="['portfolio-tab', { active: activeCategory === cat.id }]"
        @click="scrollToCategory(cat.id)"
        :aria-label="cat.title"
      >
        <span class="portfolio-tab__icon">{{ cat.icon }}</span>
        {{ cat.title }}
      </button>
    </nav>
    <div class="portfolio-categories">
      <section
        v-for="cat in categories"
        :key="cat.id"
        :id="cat.id"
        class="portfolio-category"
        :aria-labelledby="'cat-title-' + cat.id"
      >
        <h2 class="portfolio-category__title" :id="'cat-title-' + cat.id">
          <span class="portfolio-category__icon">{{ cat.icon }}</span>
          {{ cat.title }}
        </h2>
        <p class="portfolio-category__desc">{{ cat.desc }}</p>
        <div v-if="works[cat.id] && works[cat.id].length" class="carousel-row">
          <button
            class="carousel-arrow left"
            :class="{ disabled: carouselIndexes[cat.id] === 0 }"
            @click="prevSlide(cat.id)"
            aria-label="Назад"
          >
            ‹
          </button>
          <div class="portfolio-carousel">
            <div
              v-for="(work, idx) in works[cat.id]"
              :key="work.id"
              class="portfolio-gallery__item"
              v-show="isVisibleInCarousel(cat.id, idx)"
            >
              <div class="portfolio-gallery__img-wrap">
                <img :src="work.image" :alt="cat.title + ' работа ' + (idx+1)" class="portfolio-gallery__img" loading="lazy" />
              </div>
              <button class="portfolio-gallery__cta" aria-label="Рассчитать">Рассчитать</button>
            </div>
          </div>
          <button
            class="carousel-arrow right"
            :class="{ disabled: carouselIndexes[cat.id] >= works[cat.id].length - visibleSlides }"
            @click="nextSlide(cat.id)"
            aria-label="Вперёд"
          >
            ›
          </button>
        </div>
        <div v-else class="portfolio-gallery__empty">
          В этой категории скоро появятся работы!
        </div>
      </section>
    </div>
    <FooterSection />
  </main>
</template>

<script>
export default {
  name: 'Portfolio',
}
</script>

<script setup>
import {
  computed,
  onMounted,
  ref,
} from 'vue';

import FooterSection from '../components/sections/FooterSection.vue';

const categories = [
  { id: 'peretyazhka', title: 'Перетяжка', icon: '🪡', desc: 'Премиальная перетяжка салона и отдельных элементов.' },
  { id: 'tyuning', title: 'Тюнинг', icon: '⚡', desc: 'Уникальный тюнинг салона и интерьера.' },
  { id: 'restavraciya', title: 'Реставрация', icon: '🛠️', desc: 'Восстановление и реставрация салона.' },
  { id: 'poshiv', title: 'Пошив', icon: '🧵', desc: 'Индивидуальный пошив элементов интерьера.' },
  { id: 'vyshivka', title: 'Вышивка', icon: '✒️', desc: 'Вышивка логотипов, надписей и узоров.' },
  { id: 'elektro', title: 'Автоэлектрика', icon: '💡', desc: 'Установка и настройка электрооборудования.' },
  { id: 'kovry', title: 'Ковры/органайзеры', icon: '🧩', desc: 'Изготовление ковров и органайзеров.' },
];

const works = {
  peretyazhka: [
    { id: 1, image: 'https://placehold.co/400x300?text=Перетяжка+1' },
    { id: 2, image: 'https://placehold.co/400x300?text=Перетяжка+2' },
    { id: 3, image: 'https://placehold.co/400x300?text=Перетяжка+3' },
    { id: 4, image: 'https://placehold.co/400x300?text=Перетяжка+4' },
    { id: 5, image: 'https://placehold.co/400x300?text=Перетяжка+5' },
  ],
  tyuning: [
    { id: 1, image: 'https://placehold.co/400x300?text=Тюнинг+1' },
    { id: 2, image: 'https://placehold.co/400x300?text=Тюнинг+2' },
    { id: 3, image: 'https://placehold.co/400x300?text=Тюнинг+3' },
    { id: 4, image: 'https://placehold.co/400x300?text=Тюнинг+4' },
  ],
  restavraciya: [
    { id: 1, image: 'https://placehold.co/400x300?text=Реставрация+1' },
    { id: 2, image: 'https://placehold.co/400x300?text=Реставрация+2' },
  ],
  poshiv: [
    { id: 1, image: 'https://placehold.co/400x300?text=Пошив+1' },
    { id: 2, image: 'https://placehold.co/400x300?text=Пошив+2' },
    { id: 3, image: 'https://placehold.co/400x300?text=Пошив+3' },
  ],
  vyshivka: [
    { id: 1, image: 'https://placehold.co/400x300?text=Вышивка+1' },
    { id: 2, image: 'https://placehold.co/400x300?text=Вышивка+2' },
  ],
  elektro: [
    { id: 1, image: 'https://placehold.co/400x300?text=Электро+1' },
    { id: 2, image: 'https://placehold.co/400x300?text=Электро+2' },
    { id: 3, image: 'https://placehold.co/400x300?text=Электро+3' },
  ],
  kovry: [
    { id: 1, image: 'https://placehold.co/400x300?text=Ковры+1' },
    { id: 2, image: 'https://placehold.co/400x300?text=Ковры+2' },
    { id: 3, image: 'https://placehold.co/400x300?text=Ковры+3' },
    { id: 4, image: 'https://placehold.co/400x300?text=Ковры+4' },
  ],
};

const activeCategory = ref(categories[0].id);
const carouselIndexes = ref({});
const visibleSlides = ref(3);
const showArrows = ref(true);

function updateVisibleSlides() {
  if (window.innerWidth < 700) {
    visibleSlides.value = 1;
    showArrows.value = false;
  } else if (window.innerWidth < 1100) {
    visibleSlides.value = 2;
    showArrows.value = true;
  } else {
    visibleSlides.value = 3;
    showArrows.value = true;
  }
}
onMounted(() => {
  updateVisibleSlides();
  window.addEventListener('resize', updateVisibleSlides);
  categories.forEach(cat => {
    if (!(cat.id in carouselIndexes.value)) carouselIndexes.value[cat.id] = 0;
  });
});

function scrollToCategory(id) {
  activeCategory.value = id;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
function prevSlide(catId) {
  if (carouselIndexes.value[catId] > 0) carouselIndexes.value[catId]--;
}
function nextSlide(catId) {
  if (carouselIndexes.value[catId] < works[catId].length - visibleSlides.value) carouselIndexes.value[catId]++;
}
function isVisibleInCarousel(catId, idx) {
  const start = carouselIndexes.value[catId];
  return idx >= start && idx < start + visibleSlides.value;
}
</script>

<style scoped>
.portfolio-page {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}
.portfolio-title {
  font-size: 2.8rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 0.5em;
  letter-spacing: 0.04em;
  text-shadow: 0 4px 24px #ffd60088, 0 2px 8px #fff2;
  text-transform: uppercase;
}
.portfolio-desc {
  text-align: center;
  color: #ffd600;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}
.portfolio-tabs {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
  position: sticky;
  top: 70px;
  z-index: 10;
  background: transparent;
}
.portfolio-tab {
  background: #232323;
  color: #ffd600;
  border: none;
  border-radius: 18px;
  padding: 0.7em 1.6em;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 12px #ffd60022;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5em;
}
.portfolio-tab.active, .portfolio-tab:hover {
  background: #ffd600;
  color: #181818;
  box-shadow: 0 4px 24px #ffd60055;
}
.portfolio-tab__icon {
  font-size: 1.3em;
}
.portfolio-categories {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}
.portfolio-category__title {
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 0.2em;
  display: flex;
  align-items: center;
  gap: 0.5em;
  color: #ffd600;
  text-shadow: 0 2px 12px #ffd60055;
}
.portfolio-category__icon {
  font-size: 1.5em;
}
.portfolio-category__desc {
  color: #fff;
  margin-bottom: 1.5em;
  font-size: 1.1rem;
}
.carousel-row {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.portfolio-carousel {
  display: flex;
  gap: 2rem;
  flex: 1 1 0;
  overflow: visible;
}
.carousel-arrow {
  flex: 0 0 36px;
  background: transparent;
  color: #ffd600;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.7rem;
  font-weight: 900;
  cursor: pointer;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: background 0.2s, color 0.2s, opacity 0.2s, filter 0.2s;
  pointer-events: auto;
  outline: none;
}
.carousel-arrow:hover {
  color: #fff700;
  filter: drop-shadow(0 0 6px #ffd600);
  opacity: 1;
}
.carousel-arrow.disabled {
  opacity: 0;
  pointer-events: none;
}
.portfolio-gallery__item {
  background: #181818;
  border-radius: 18px;
  box-shadow: 0 4px 32px #ffd60022;
  padding: 1.2rem 1rem 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  max-width: 400px;
  transition: box-shadow 0.2s, transform 0.2s;
  animation: fadeInUp 0.7s;
}
.portfolio-gallery__item:hover {
  box-shadow: 0 8px 48px #ffd60055;
  transform: translateY(-6px) scale(1.03);
}
.portfolio-gallery__img-wrap {
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
  background: #232323;
  display: flex;
  align-items: center;
  justify-content: center;
}
.portfolio-gallery__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s;
}
.portfolio-gallery__item:hover .portfolio-gallery__img {
  transform: scale(1.07);
}
.portfolio-gallery__cta {
  margin-top: 0.7em;
  background: linear-gradient(90deg, #ffd600 60%, #fff700 100%);
  color: #181818;
  font-weight: 900;
  font-size: 1.13rem;
  border: none;
  border-radius: 12px;
  padding: 12px 32px;
  box-shadow: 0 2px 18px #ffd60055, 0 0 0 2px #ffd600cc;
  cursor: pointer;
  transition: box-shadow 0.2s, background 0.2s;
}
.portfolio-gallery__cta:hover {
  box-shadow: 0 4px 32px #ffd60099, 0 0 0 2.5px #ffd600cc;
  background: linear-gradient(90deg, #fff700 80%, #ffd600 100%);
}
.portfolio-gallery__empty {
  color: #ffd60099;
  font-size: 1.2rem;
  text-align: center;
  padding: 2.5em 0;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@media (max-width: 1100px) {
  .portfolio-gallery__item {
    min-width: 260px;
    max-width: 320px;
  }
  .carousel-arrow {
    width: 28px;
    height: 28px;
    font-size: 1.1rem;
  }
}
@media (max-width: 900px) {
  .portfolio-page {
    padding: 1rem 0.5rem 2rem 0.5rem;
    gap: 1.5rem;
  }
  .portfolio-carousel {
    gap: 1.2rem;
  }
  .portfolio-gallery__item {
    min-width: 220px;
    max-width: 260px;
    padding: 0.8rem 0.5rem 1rem 0.5rem;
  }
}
@media (max-width: 700px) {
  .portfolio-tabs {
    top: 56px;
    gap: 0.5rem;
  }
  .portfolio-title {
    font-size: 1.5rem;
  }
  .portfolio-category__title {
    font-size: 1.1rem;
  }
  .portfolio-category__desc {
    font-size: 0.98rem;
  }
  .carousel-arrow {
    display: none;
  }
  .portfolio-carousel {
    gap: 0.5rem;
  }
  .portfolio-gallery__item {
    min-width: 90vw;
    max-width: 95vw;
    padding: 0.5rem 0.2rem 0.7rem 0.2rem;
  }
}
</style> 