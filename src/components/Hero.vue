<template>
  <section class="hero">
    <div class="hero__content container">
      <h1 class="hero__title">Премиальная перетяжка салона</h1>
      <p class="hero__subtitle">Преобразите интерьер вашего автомобиля с помощью профессиональной перетяжки салона премиум-класса</p>
      
      <div class="hero__services">
        <ServiceCard
          v-for="service in services"
          :key="service.id"
          v-bind="service"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

import { useTheme } from '../stores/theme';
import ServiceCard from './ServiceCard.vue';

const themeStore = useTheme()
const isDark = computed(() => themeStore.isDark)

const services = [
  {
    id: 1,
    title: 'Перетяжка сидений',
    description: 'Полная перетяжка сидений премиальной кожей с учётом всех особенностей вашего автомобиля',
    image: '/images/seats.jpg',
    link: '/services/seats',
    price: 25000
  },
  {
    id: 2,
    title: 'Перетяжка руля',
    description: 'Профессиональная перетяжка руля натуральной кожей с декоративной прострочкой',
    image: '/images/steering.jpg',
    link: '/services/steering',
    price: 5000
  },
  {
    id: 3,
    title: 'Перетяжка потолка',
    description: 'Замена обивки потолка алькантарой или другими премиальными материалами',
    image: '/images/ceiling.jpg',
    link: '/services/ceiling',
    price: 15000
  }
]
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #111;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ffd600 30%, #fff 100%);
    box-shadow: 0 0 20px #ffd600;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top right, #ffd60008 0%, transparent 70%);
    pointer-events: none;
  }

  &__content {
    position: relative;
    z-index: 1;
    padding: clamp(40px, 8vh, 60px) max(16px, calc((100% - 1280px) / 2));
    margin: 0 auto;
    width: 100%;
    max-width: 100%;
  }

  &__title {
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 900;
    margin-bottom: clamp(20px, 4vh, 24px);
    text-transform: uppercase;
    letter-spacing: 2px;
    background: linear-gradient(90deg, #fff 50%, #ffd600 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 4px 24px #ffd60055;
    filter: drop-shadow(0 2px 8px #ffd60044);
    animation: title-glow 3s ease-in-out infinite alternate;
  }

  &__subtitle {
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    line-height: 1.6;
    margin: 0 auto clamp(30px, 6vh, 50px);
    color: rgba(255, 255, 255, 0.9);
    max-width: 800px;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }

  &__services {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
    gap: clamp(20px, 3vw, 40px);
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 max(16px, 3vw);
  }
}

@keyframes title-glow {
  from {
    text-shadow: 0 0 20px #ffd60022, 0 0 40px #ffd60011;
  }
  to {
    text-shadow: 0 0 25px #ffd60044, 0 0 50px #ffd60022;
  }
}
</style> 
