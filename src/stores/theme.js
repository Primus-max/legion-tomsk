import { ref } from 'vue';

import { defineStore } from 'pinia';

export const useTheme = defineStore('theme', () => {
  // Всегда возвращаем true для тёмной темы
  const isDark = ref(true);

  // Инициализация тёмной темы
  document.documentElement.classList.add('dark');

  return {
    isDark
  }
}) 