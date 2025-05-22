<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: { Header }
}
</script>

<template>
  <div id="app">
    <Header />
    <div style="height: 64px;"></div>
    <router-view />
  </div>
</template>

<style>
:root {
  --color-bg: #181818;
  --color-accent: #ffd600;
  --color-accent-dark: #e6b800;
  --color-text: #fff;
}
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Кастомный скроллбар для всего приложения */
html, body, #app {
  scrollbar-width: thin;
  scrollbar-color: #ffbf008a var(--color-bg);
}

/* Chrome, Edge, Safari */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background: var(--color-bg);
}
::-webkit-scrollbar-thumb {
  background: #5a4a1a;
  border-radius: 8px;
  box-shadow: none;
  border: 2px solid #181818;
  transition: background 0.2s;
}
::-webkit-scrollbar-thumb:hover {
  background: #ffd600;
}
::-webkit-scrollbar-track {
  background: #181818;
  border-radius: 8px;
  box-shadow: 0 0 8px 0 #ffd60022 inset;
}

@media (max-width: 700px) {
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
}
</style>
