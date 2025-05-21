import { ref } from 'vue';

import { defineStore } from 'pinia';

export const useTheme = defineStore('theme', () => {
  const isDark = ref(localStorage.getItem('theme') === 'dark')

  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    updateThemeClass()
  }

  const updateThemeClass = () => {
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  // Инициализация темы при загрузке
  updateThemeClass()

  // Следим за системной темой
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    if (localStorage.getItem('theme') === null) {
      isDark.value = e.matches
      updateThemeClass()
    }
  })

  return {
    isDark,
    toggleTheme
  }
}) 