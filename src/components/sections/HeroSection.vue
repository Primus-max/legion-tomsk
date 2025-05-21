<template>
  <ImperialSection :title="title" class="hero-section">
    <div class="hero-section__content">
      <p class="hero-section__subtitle">Преобразите интерьер вашего автомобиля с помощью профессиональной перетяжки салона премиум-класса</p>
      <div class="hero-section__services">
        <ServiceCard
          v-for="service in services"
          :key="service.id"
          v-bind="service"
        />
      </div>
    </div>
  </ImperialSection>
</template>

<script setup>
import ServiceCard from '../ServiceCard.vue';
import ImperialSection from './ImperialSection.vue';

const title = 'Премиальная перетяжка салона';

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
];
</script>

<style lang="scss" scoped>
.hero-section__content {
  position: relative;
  z-index: 3;
  text-align: center;
}

.hero-section__subtitle {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 1.6;
  margin: 0 auto clamp(30px, 6vh, 50px);
  color: rgba(255, 255, 255, 0.9);
  max-width: 800px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.hero-section__services {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: clamp(20px, 3vw, 40px);
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 max(16px, 3vw);
  justify-items: center;
}
</style> 