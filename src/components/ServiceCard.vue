<template>
  <router-link :to="link" class="service-card">
    <div class="service-card__image">
      <img :src="imageSource" :alt="title">
      <div class="service-card__overlay"></div>
    </div>
    <div class="service-card__content">
      <h3 class="service-card__title">{{ title }}</h3>
      <p class="service-card__description">{{ description }}</p>
      <div class="service-card__bottom">
        <div class="service-card__price" v-if="price">от {{ price }} ₽</div>
        <button class="service-card__order">Заказать</button>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';

import placeholderImage from '../assets/placeholder.svg?url';

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
    required: false,
    default: ''
  },
  link: {
    type: String,
    required: false,
    default: '#'
  },
  price: {
    type: Number,
    default: null
  }
})

const imageSource = computed(() => props.image || placeholderImage)
</script>

<style lang="scss" scoped>
@keyframes card-fade-in {
  from { 
    opacity: 0; 
    transform: translateY(30px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
  }
}

.service-card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  border-radius: clamp(12px, 2vw, 16px);
  overflow: hidden;
  background: linear-gradient(135deg, #181818 0%, #222 100%);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  color: #fff;
  animation: card-fade-in 0.7s cubic-bezier(.4,1.4,.6,1) both;
  border: 1px solid rgba(255, 214, 0, 0.1);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 0 30px #ffd60044;
    border-color: rgba(255, 214, 0, 0.2);
    
    @media (hover: none) {
      transform: none;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
    }
    
    .service-card__overlay {
      opacity: 0.75;
    }

    .service-card__image img {
      transform: scale(1.05);
      filter: brightness(1.1);
    }

    .service-card__title {
      color: #ffd600;
      text-shadow: 0 0 15px #ffd60066;
    }
  }

  &__image {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; // 16:9 ratio
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      background: #222;
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.95) 100%);
    opacity: 0.8;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  &__content {
    position: relative;
    z-index: 1;
    padding: clamp(16px, 4vw, 24px);
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }

  &__title {
    font-size: clamp(1.1rem, 2.5vw, 1.4rem);
    font-weight: 800;
    margin: 0 0 clamp(8px, 2vw, 12px);
    color: #ffd600;
    letter-spacing: 0.5px;
    text-shadow: 0 2px 12px #ffd60033;
    text-transform: uppercase;
    transition: all 0.3s ease;
    word-break: keep-all;
    overflow-wrap: normal;
    white-space: normal;
    hyphens: none;
    text-align: center;
    padding: 0 8px;

    &::after {
      content: '';
      display: block;
      width: clamp(32px, 8vw, 48px);
      height: 3px;
      background: linear-gradient(90deg, #ffd600 0%, transparent 100%);
      margin-top: clamp(8px, 2vw, 12px);
      border-radius: 2px;
      box-shadow: 0 0 10px #ffd60066;
    }
  }

  @media (max-width: 600px) {
    &__title {
      font-size: 1rem;
      padding: 0 2px;
    }
  }

  &__description {
    font-size: clamp(0.9rem, 2vw, 1.05rem);
    line-height: 1.6;
    margin: 0 0 clamp(16px, 4vw, 20px);
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  &__bottom {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  &__price {
    font-size: clamp(1.1rem, 2.5vw, 1.3rem);
    font-weight: 700;
    color: #ffd600;
    text-shadow: 0 2px 8px #ffd60044;
    letter-spacing: 0.5px;
    text-align: center;
  }

  &__order {
    background: transparent;
    color: #ffd600;
    border: 2px solid #ffd600;
    border-radius: 6px;
    padding: 0.5em 1.2em;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: none;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s, border-color 0.2s;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-align: center;
    min-width: 120px;
  }

  &__order:hover {
    background: #ffd600;
    color: #181818;
    box-shadow: 0 4px 16px #ffd60066;
    border-color: #ffd600;
  }
}
</style> 