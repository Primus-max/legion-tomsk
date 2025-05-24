<template>
  <div class="portfolio-gallery-block">
    <div class="carousel-row">
      <button
        class="carousel-arrow left"
        :class="{ disabled: currentIndex === 0 }"
        @click="prevSlide"
        aria-label="Назад"
      >
        ‹
      </button>
      <div class="portfolio-carousel">
        <div
          v-for="(work, idx) in works"
          :key="work.id"
          class="portfolio-gallery__item"
          :style="{ height: cardHeight + 'px' }"
          v-show="isVisible(idx)"
          @click="openModal(idx)"
          tabindex="0"
          role="button"
          :aria-label="'Открыть фото ' + (idx+1)"
        >
          <div class="portfolio-gallery__img-wrap">
            <img :src="work.image" :alt="'Фото ' + (idx+1)" class="portfolio-gallery__img" loading="lazy" />
          </div>
        </div>
      </div>
      <button
        class="carousel-arrow right"
        :class="{ disabled: currentIndex >= works.length - visibleSlides }"
        @click="nextSlide"
        aria-label="Вперёд"
      >
        ›
      </button>
    </div>
    <button v-if="works.length" class="portfolio-gallery__cta-main" @click="openModal(currentIndex)">Рассчитать</button>
    <ImageModalSlider
      v-if="modalVisible"
      :images="modalImages"
      :startIndex="modalIndex"
      :visible="modalVisible"
      @close="modalVisible = false"
    />
  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
  ref,
  watch,
} from 'vue';

import ImageModalSlider from './ImageModalSlider.vue';

const props = defineProps({
  works: { type: Array, required: true },
  cardHeight: { type: Number, default: 320 },
});

const visibleSlides = ref(3);
const currentIndex = ref(0);
const modalVisible = ref(false);
const modalIndex = ref(0);

function updateVisibleSlides() {
  if (window.innerWidth < 700) visibleSlides.value = 1;
  else if (window.innerWidth < 1100) visibleSlides.value = 2;
  else visibleSlides.value = 3;
}
onMounted(() => {
  updateVisibleSlides();
  window.addEventListener('resize', updateVisibleSlides);
});

function isVisible(idx) {
  return idx >= currentIndex.value && idx < currentIndex.value + visibleSlides.value;
}
function prevSlide() {
  if (currentIndex.value > 0) currentIndex.value--;
}
function nextSlide() {
  if (currentIndex.value < props.works.length - visibleSlides.value) currentIndex.value++;
}
function openModal(idx) {
  modalIndex.value = idx;
  modalVisible.value = true;
}
const modalImages = computed(() => props.works.map((w, i) => ({ src: w.image, alt: `Фото ${i+1}` })));
watch(() => props.works, () => { currentIndex.value = 0; });
</script>

<style scoped>
.portfolio-gallery-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
}
.carousel-row {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
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
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  animation: fadeInUp 0.7s;
  outline: none;
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
.portfolio-gallery__cta-main {
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
.portfolio-gallery__cta-main:hover {
  box-shadow: 0 4px 32px #ffd60099, 0 0 0 2.5px #ffd600cc;
  background: linear-gradient(90deg, #fff700 80%, #ffd600 100%);
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
}
@media (max-width: 900px) {
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