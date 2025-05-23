<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <button class="modal-close" @click="close">×</button>
    <div class="modal-slider">
      <button class="modal-arrow modal-arrow--left" @click="prev" :disabled="currentIndex === 0">◀</button>
      <img :src="images[currentIndex].src" :alt="images[currentIndex].alt" class="modal-image" />
      <button class="modal-arrow modal-arrow--right" @click="next" :disabled="currentIndex === images.length - 1">▶</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  images: { type: Array, required: true },
  startIndex: { type: Number, default: 0 },
  visible: { type: Boolean, default: false }
});
const emit = defineEmits(['close']);

const currentIndex = ref(props.startIndex);

watch(() => props.startIndex, (val) => { currentIndex.value = val; });
watch(() => props.visible, (val) => { if (val) currentIndex.value = props.startIndex; });

function close() { emit('close'); }
function prev() { if (currentIndex.value > 0) currentIndex.value--; }
function next() { if (currentIndex.value < props.images.length - 1) currentIndex.value++; }

function handleKey(e) {
  if (!props.visible) return;
  if (e.key === 'Escape') close();
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'ArrowRight') next();
}
onMounted(() => window.addEventListener('keydown', handleKey));
onBeforeUnmount(() => window.removeEventListener('keydown', handleKey));
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  z-index: 1000;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.modal-slider {
  position: relative;
  background: #181818;
  border-radius: 16px;
  box-shadow: 0 8px 40px #00000099;
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  max-width: 90vw;
  max-height: 90vh;
}
.modal-image {
  max-width: 70vw;
  max-height: 70vh;
  border-radius: 12px;
  background: #222;
  border: 3px solid #ffd600;
  box-shadow: 0 2px 24px #ffd60033;
}
.modal-arrow {
  background: #232323;
  color: #ffd600;
  border: none;
  border-radius: 8px;
  font-size: 2.2rem;
  font-weight: 700;
  padding: 0.2em 0.5em;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  box-shadow: 0 2px 8px #00000022;
  z-index: 2;
}
.modal-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.modal-arrow--left { margin-right: 0.5em; }
.modal-arrow--right { margin-left: 0.5em; }
.modal-close {
  position: fixed;
  top: 32px;
  right: 48px;
  background: none;
  color: #fff;
  border: none;
  font-size: 2.5rem;
  font-weight: 900;
  cursor: pointer;
  z-index: 1100;
  line-height: 1;
  box-shadow: none;
  padding: 0;
}
@media (max-width: 900px) {
  .modal-slider { padding: 1.2rem 0.5rem 1.2rem 0.5rem; }
  .modal-image { max-width: 90vw; max-height: 50vh; }
  .modal-close { top: 16px; right: 16px; }
}
@media (max-width: 600px) {
  .modal-slider { flex-direction: column; gap: 0.7rem; }
  .modal-image { max-width: 95vw; max-height: 40vh; }
  .modal-close { top: 8px; right: 8px; font-size: 2rem; }
}
</style> 