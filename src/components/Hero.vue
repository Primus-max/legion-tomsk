<template>
  <section class="hero" :class="{ 'hero--dark': isDark }">
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
  padding: 60px 0;
  background: var(--color-background);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: var(--color-accent);
  }

  &--dark {
    background: var(--color-background-soft);
  }

  &__content {
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  &__title {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 20px;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 2px;
    background: linear-gradient(90deg, #fff 60%, #ffd600 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    text-shadow: 0 4px 24px #ffd60055, 0 1px 0 #fff;
    filter: drop-shadow(0 2px 8px #ffd60044);
    transition: text-shadow 0.3s;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  &__subtitle {
    font-size: 1.25rem;
    line-height: 1.6;
    margin-bottom: 40px;
    color: #fff;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    text-shadow: 0 2px 8px #ffd60022;
    opacity: 0.95;
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  &__services {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 40px;
  }
}
</style> 