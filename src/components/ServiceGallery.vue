<template>
  <div class="service-gallery">
    <button class="gallery-arrow gallery-arrow--up" @click="prev" :disabled="currentIndex === 0">▲</button>
    <div class="gallery-image-wrapper">
      <img :src="images[currentIndex].src" :alt="images[currentIndex].alt" class="gallery-image" @click="openModal" style="cursor:pointer" />
    </div>
    <button class="gallery-arrow gallery-arrow--down" @click="next" :disabled="currentIndex === images.length - 1">▼</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['open-modal']);

const props = defineProps({
  images: {
    type: Array,
    default: () => [
      { src: 'https://placehold.co/300x200?text=Пример+1', alt: 'Пример работы 1', caption: 'Пример 1' },
      { src: 'https://placehold.co/300x200?text=Пример+2', alt: 'Пример работы 2', caption: 'Пример 2' },
      { src: 'https://placehold.co/300x200?text=Пример+3', alt: 'Пример работы 3', caption: 'Пример 3' },
    ]
  }
});

const currentIndex = ref(0);

function prev() {
  if (currentIndex.value > 0) currentIndex.value--;
}
function next() {
  if (currentIndex.value < props.images.length - 1) currentIndex.value++;
}
function openModal() {
  emit('open-modal', currentIndex.value);
}
</script>

<style scoped>
.service-gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
  max-width: 320px;
  min-width: 180px;
}
.gallery-image-wrapper {
  background: #181818;
  border-radius: 12px;
  box-shadow: 0 2px 12px #00000033;
  padding: 0.7rem 0.7rem 0.3rem 0.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.gallery-image {
  width: 100%;
  max-width: 260px;
  border-radius: 8px;
  background: #222;
  object-fit: cover;
  border: 2px solid #ffd600;
  transition: box-shadow 0.2s;
}
.gallery-image:hover {
  box-shadow: 0 0 0 3px #ffd60099;
}
.gallery-arrow {
  background: #232323;
  color: #ffd600;
  border: none;
  border-radius: 6px;
  font-size: 1.3rem;
  font-weight: 700;
  padding: 0.3em 1.1em;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  box-shadow: 0 2px 8px #00000022;
}
.gallery-arrow:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.gallery-arrow--up {
  margin-bottom: 0.2em;
}
.gallery-arrow--down {
  margin-top: 0.2em;
}
@media (max-width: 600px) {
  .service-gallery {
    max-width: 100%;
    min-width: 0;
  }
  .gallery-image {
    max-width: 100%;
  }
}
</style> 