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
</style>
