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
        <PortfolioGallery :works="works[cat.id]" />
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
import { ref } from 'vue';

import PortfolioGallery from '../components/PortfolioGallery.vue';
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
    { id: 6, image: 'https://placehold.co/400x300?text=Перетяжка+6' },
    { id: 7, image: 'https://placehold.co/400x300?text=Перетяжка+7' },
    { id: 8, image: 'https://placehold.co/400x300?text=Перетяжка+8' },
    { id: 9, image: 'https://placehold.co/400x300?text=Перетяжка+9' },
    { id: 10, image: 'https://placehold.co/400x300?text=Перетяжка+10' },
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

function scrollToCategory(id) {
  activeCategory.value = id;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
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