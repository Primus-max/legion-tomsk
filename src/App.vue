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
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
