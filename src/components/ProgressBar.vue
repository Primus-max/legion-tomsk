<template>
  <div class="progress-bar-bg">
    <div class="progress-bar-fill" :style="{ width: `${progress}%` }"></div>
  </div>
</template>

<script setup>
import {
  onMounted,
  onUnmounted,
  ref,
} from 'vue';

const progress = ref(0);

const updateProgress = () => {
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollTop = window.scrollY;
  if (scrollHeight > 0 && scrollTop > 0) {
    progress.value = (scrollTop / scrollHeight) * 100;
  } else {
    progress.value = 0;
  }
};

onMounted(() => {
  updateProgress();
  window.addEventListener('scroll', updateProgress);
});
onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress);
});
</script>

<style scoped>
.progress-bar-bg {
  width: 100%;
  height: 3px;
  background: transparent;
  position: relative;
  overflow: hidden;
}
.progress-bar-fill {
  height: 100%;
  background: #ffd600;
  transition: width 0.2s;
  box-shadow: 0 0 8px #ffd60099;
  width: 100%;
}
</style> 