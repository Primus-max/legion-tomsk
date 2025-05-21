<template>
  <main>
    <Hero />
    <h1 style="display:none">Главная</h1>
    <p style="display:none">Добро пожаловать на сайт по перетяжке, тюнингу и реставрации авто!</p>
  </main>
</template>

<script>
import Hero from '../components/Hero.vue';

export default {
  name: 'Home',
  components: { Hero }
}
</script> 