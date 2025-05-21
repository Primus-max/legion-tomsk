<template>
  <router-link :to="link" class="service-card" :class="{ 'service-card--dark': isDark }">
    <div class="service-card__image">
      <img :src="image" :alt="title">
      <div class="service-card__overlay"></div>
    </div>
    <div class="service-card__content">
      <h3 class="service-card__title">{{ title }}</h3>
      <p class="service-card__description">{{ description }}</p>
      <div class="service-card__price" v-if="price">от {{ price }} ₽</div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';

import { useTheme } from '../stores/theme';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: null
  }
})

const themeStore = useTheme()
const isDark = computed(() => themeStore.isDark)
</script>

<style lang="scss" scoped>
@keyframes card-fade-in {
  from { opacity: 0; transform: translateY(30px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.service-card {
  position: relative;
  display: block;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, #181818 80%, #222 100%);
  box-shadow: 0 4px 24px rgba(255, 214, 0, 0.08), 0 2px 8px rgba(0,0,0,0.18);
  transition: box-shadow 0.3s, transform 0.3s;
  text-decoration: none;
  color: #fff;
  animation: card-fade-in 0.7s cubic-bezier(.4,1.4,.6,1) both;

  &:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 0 24px 0 #ffd600, 0 8px 32px rgba(255,214,0,0.18), 0 2px 8px rgba(0,0,0,0.18);
    
    .service-card__overlay {
      opacity: 0.8;
    }
    .service-card__image img {
      transform: scale(1.07);
      filter: brightness(1.08);
    }
  }

  &--dark {
    background: linear-gradient(135deg, #181818 80%, #222 100%);
    border: 1px solid #ffd60044;
  }

  &__image {
    position: relative;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s, filter 0.3s;
    }
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%);
    opacity: 0.55;
    transition: opacity 0.3s;
    pointer-events: none;
  }

  &__content {
    padding: 24px 22px 20px 22px;
    position: relative;
    z-index: 1;
  }

  &__title {
    font-size: 1.6rem;
    font-weight: 800;
    margin: 0 0 12px;
    color: #ffd600;
    letter-spacing: 1px;
    text-shadow: 0 2px 12px #ffd60033;
    text-transform: uppercase;
    
    &::after {
      content: '';
      display: block;
      width: 48px;
      height: 3px;
      background: linear-gradient(90deg, #ffd600 60%, #fff 100%);
      margin-top: 10px;
      border-radius: 2px;
      box-shadow: 0 0 8px #ffd60099;
    }
  }

  &__description {
    font-size: 1.05rem;
    line-height: 1.6;
    margin: 0 0 18px;
    color: #fff;
    opacity: 0.92;
    text-shadow: 0 1px 4px #000a;
  }

  &__price {
    font-size: 1.25rem;
    font-weight: 700;
    color: #ffd600;
    text-shadow: 0 2px 8px #ffd60044;
    letter-spacing: 0.5px;
  }
}
</style> 