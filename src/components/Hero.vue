<template>
  <section class="hero">
    <ImperialLampLine class="hero__lamp" :width="'100%'" :height="'6px'" :glow="'0 8px 32px 0 #FFD600cc'" :gradient="'linear-gradient(90deg, #FFD600 30%, #fff 100%)'" />
    <div class="hero__lamp-glow" />
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
import ImperialLampLine from './ImperialLampLine.vue';
import ServiceCard from './ServiceCard.vue';

const themeStore = useTheme()
const isDark = computed(() => themeStore.isDark)

const services = [
  {
    id: 1,
    title: 'Перетяжка сидений',
    description: 'Полная перетяжка сидений премиальной кожей с учётом всех особенностей вашего автомобиля',
    image: '/images/seats.svg',
    link: '/services/seats',
    price: 25000
  },
  {
    id: 2,
    title: 'Тюнинг',
    description: 'Профессиональный тюнинг салона автомобиля с использованием премиальных материалов и технологий',
    image: '/images/tuning.svg',
    link: '/services/tuning',
    price: 30000
  },
  {
    id: 3,
    title: 'Реставрация',
    description: 'Восстановление и реставрация элементов салона до состояния нового',
    image: '/images/restoration.svg',
    link: '/services/restoration',
    price: 20000
  },
  {
    id: 4,
    title: 'Изготовление и пошив',
    description: 'Индивидуальный пошив элементов салона по вашим размерам и пожеланиям',
    image: '/images/sewing.svg',
    link: '/services/sewing',
    price: 15000
  },
  {
    id: 5,
    title: 'Вышивка',
    description: 'Нанесение вышивки любой сложности на элементы салона',
    image: '/images/embroidery.svg',
    link: '/services/embroidery',
    price: 5000
  },
  {
    id: 6,
    title: 'Автоэлектрика',
    description: 'Установка и настройка электрооборудования в салоне автомобиля',
    image: '/images/electronics.svg',
    link: '/services/electronics',
    price: 10000
  },
  {
    id: 7,
    title: 'EVO и 3D ковры / органайзеры',
    description: 'Изготовление современных ковров с высоким бортом и органайзеров',
    image: '/images/carpets.svg',
    link: '/services/carpets',
    price: 8000
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
  margin-top: 40px;

  &__lamp {
    margin-bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    z-index: 2;
  }

  &__lamp-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 160px;
    pointer-events: none;
    z-index: 1;
    background: radial-gradient(
      ellipse at top,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 214, 0, 0.05) 50%,
      transparent 100%
    );
    filter: blur(20px);
    opacity: 0;
    animation: hero-glow-appear 2.5s ease-out forwards;
  }

  &__content {
    position: relative;
    z-index: 3;
    padding: clamp(40px, 8vh, 60px) max(16px, calc((100% - 1280px) / 2));
    margin: 0 auto;
    width: 100%;
    max-width: 100%;
    text-align: center;
  }

  &__title {
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 900;
    margin-bottom: clamp(20px, 4vh, 24px);
    text-transform: uppercase;
    letter-spacing: 2px;
    background: linear-gradient(90deg, #fff 40%, #ffd600 60%, #fff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    text-shadow: 0 4px 24px #ffd60055;
    filter: drop-shadow(0 2px 8px #ffd60044);
    animation: title-glow 3s ease-in-out infinite alternate, title-gradient-move 4s linear infinite alternate;
    text-align: center;
  }

  &__subtitle {
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    line-height: 1.6;
    margin: 0 auto clamp(30px, 6vh, 50px);
    color: rgba(255, 255, 255, 0.9);
    max-width: 800px;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    text-align: center;
  }

  &__services {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
    gap: clamp(20px, 3vw, 40px);
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 max(16px, 3vw);
    justify-items: center;
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

@keyframes title-gradient-move {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

@keyframes hero-glow-appear {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style> 
