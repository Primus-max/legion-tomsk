import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  base: '/legion-tomsk/',
  plugins: [vue()],
  assetsInclude: ['**/*.svg'],
  build: {
    assetsInlineLimit: 0 // Чтобы SVG всегда обрабатывался как файл
  }
})
