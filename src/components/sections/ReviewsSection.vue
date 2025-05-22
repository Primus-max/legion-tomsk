<template>
  <section class="reviews-section">
    <h2 class="reviews-section__title">Отзывы клиентов</h2>
    <div class="reviews-section__carousel-wrap">
      <button class="reviews-section__arrow left" @click="prevSlide" v-if="showArrows">
        <span>&lt;</span>
      </button>
      <div
        class="reviews-section__carousel"
        ref="carouselRef"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div
          class="reviews-section__slides"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div
            v-for="(review, idx) in reviews"
            :key="idx"
            class="reviews-section__slide"
          >
            <div class="review-card">
              <div class="review-card__header">
                <div class="review-card__avatar" :aria-label="review.name">
                  <img v-if="review.avatar" :src="review.avatar" :alt="review.name" />
                  <span v-else>{{ initials(review.name) }}</span>
                </div>
                <div class="review-card__info">
                  <div class="review-card__name">{{ review.name }}</div>
                  <div class="review-card__date">{{ review.date }}</div>
                </div>
              </div>
              <div class="review-card__text">{{ review.text }}</div>
            </div>
          </div>
        </div>
      </div>
      <button class="reviews-section__arrow right" @click="nextSlide" v-if="showArrows">
        <span>&gt;</span>
      </button>
    </div>
  </section>
</template>

<script setup>
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
} from 'vue';

const reviews = [
  {
    name: 'Алексей К.',
    date: '12.04.2024',
    text: 'Очень доволен работой! Перетяжка руля — просто огонь, всё аккуратно и быстро. Спасибо за премиальный сервис!',
    avatar: '',
  },
  {
    name: 'Мария П.',
    date: '28.03.2024',
    text: 'Делала тюнинг салона — результат превзошёл ожидания. Цвета, материалы, всё на высшем уровне!',
    avatar: '',
  },
  {
    name: 'Игорь С.',
    date: '15.02.2024',
    text: 'Реставрация сидений — как новые! Очень приятная команда, всё объяснили и помогли выбрать материал.',
    avatar: '',
  },
  {
    name: 'Екатерина Л.',
    date: '02.01.2024',
    text: 'Пошив ковриков и вышивка — быстро, качественно, красиво. Рекомендую!',
    avatar: '',
  },
];

const carouselRef = ref(null);
const currentSlide = ref(0);
const slidesToShow = 3;
const showArrows = computed(() => reviews.length > slidesToShow);
const maxSlide = computed(() => reviews.length - slidesToShow);

function nextSlide() {
  if (currentSlide.value < maxSlide.value) currentSlide.value++;
}
function prevSlide() {
  if (currentSlide.value > 0) currentSlide.value--;
}

let touchStartX = 0;
let touchEndX = 0;

function onTouchStart(e) {
  touchStartX = e.touches[0].clientX;
}
function onTouchMove(e) {
  touchEndX = e.touches[0].clientX;
}
function onTouchEnd() {
  const dx = touchEndX - touchStartX;
  if (Math.abs(dx) > 40) {
    if (dx < 0) nextSlide();
    else prevSlide();
  }
}

function initials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

onMounted(() => {});
onUnmounted(() => {});
</script>

<style lang="scss" scoped>
.reviews-section {
  margin: 72px auto 0 auto;
  padding: 56px 0 64px 0;
  width: 100%;
  max-width: 1200px;
  background: linear-gradient(120deg, #181818 80%, #232323 100%);
  border-radius: 32px;
  box-shadow: 0 8px 48px #000a, 0 0 0 2px #ffd60022;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title {
    font-size: clamp(2rem, 4vw, 2.7rem);
    font-weight: 900;
    color: #fff;
    text-align: center;
    margin-bottom: 48px;
    letter-spacing: 0.04em;
    text-shadow: 0 4px 24px #ffd60088, 0 2px 8px #fff2;
    text-transform: uppercase;
  }
  &__carousel-wrap {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: none;
    margin: 0 auto 40px auto;
    position: relative;
    gap: 0;
    min-height: 320px;
  }
  &__carousel {
    width: 100%;
    overflow: hidden;
    touch-action: pan-y;
    margin: 0 64px;
  }
  &__slides {
    display: flex;
    gap: 32px;
    min-width: 100%;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    justify-content: center;
  }
  &__slide {
    min-width: 400px;
    max-width: 480px;
    flex: 0 0 440px;
    height: 100%;
  }
  &__slide:first-child .review-card {
    border-left: none;
  }
  &__slide:last-child .review-card {
    border-right: none;
  }
  &__caption {
    color: #fff;
    font-weight: 700;
    font-size: 1rem;
    text-align: center;
    margin-top: 4px;
    text-shadow: 0 2px 8px #ffd60033;
    letter-spacing: 0.04em;
  }
}

.reviews-section__arrow {
  background: none;
  border: none;
  color: #fff;
  width: 32px;
  height: 32px;
  font-size: 1.4rem;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  margin: 0;
  left: -40px;
  right: auto;
  border-radius: 0;
  box-shadow: none;
  outline: none;
  transition: none;
  &.right {
    left: auto;
    right: -40px;
  }
  &:hover {
    color: #fff;
    background: none;
    box-shadow: none;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    line-height: 1;
  }
}

@media (max-width: 900px) {
  .reviews-section__carousel {
    margin: 0;
    padding: 0;
    overflow: visible;
    position: relative;
  }
  .reviews-section__slides {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    min-width: unset;
    justify-content: flex-start;
    padding: 0 8vw;
    transition: none;
    transform: none !important;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .reviews-section__slides::-webkit-scrollbar {
    display: none;
  }
  .reviews-section__slide {
    min-width: 80vw;
    max-width: 80vw;
    scroll-snap-align: center;
    flex: 0 0 80vw;
    margin: 0;
    height: auto;
  }
  .reviews-section__arrow {
    display: none !important;
  }
}

.reviews-section__arrow:disabled {
  opacity: 0.3;
  pointer-events: none;
}

.review-card {
  background: radial-gradient(ellipse at 60% 0%, #232323 70%, #181818 100%);
  border-radius: 22px;
  box-shadow: 0 2px 32px #ffd60022, 0 0 0 2.5px #ffd60033, 0 0 32px 0 #ffd60011 inset;
  border: 1.5px solid #ffd60033;
  padding: 32px 28px 28px 28px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: relative;
  width: 100%;
  min-height: 220px;
  height: 100%;
  justify-content: flex-start;
  align-items: stretch;
  opacity: 0;
  transform: translateY(40px) scale(0.97);
  animation: review-fade-in 0.8s cubic-bezier(.6,.2,.3,1.1) forwards;
  animation-delay: 0s;
  transition: box-shadow 0.25s, transform 0.22s;
  &:hover {
    box-shadow: 0 6px 40px #ffd60066, 0 0 0 2.5px #ffd600cc, 0 0 32px 0 #ffd60033 inset;
    transform: scale(1.025) translateY(-4px);
  }
  aspect-ratio: 1.7/1;
}
@keyframes review-fade-in {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.review-card__header {
  display: flex;
  align-items: center;
  gap: 16px;
}
.review-card__avatar {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: radial-gradient(circle at 60% 40%, #fff 60%, #ffd600 100%, #fff0 120%);
  box-shadow: 0 2px 18px #ffd60055, 0 0 0 4px #fff2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.35rem;
  color: #181818;
  overflow: hidden;
  border: 2.5px solid #ffd600cc;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
}
.review-card__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.review-card__name {
  font-weight: 900;
  font-size: 1.18rem;
  color: #ffd600;
  letter-spacing: 0.01em;
  margin-bottom: 2px;
}
.review-card__date {
  font-size: 0.98rem;
  color: #fff7;
  font-weight: 400;
  letter-spacing: 0.01em;
}
.review-card__text {
  font-size: 1.09rem;
  color: #fff;
  font-weight: 500;
  line-height: 1.7;
  margin-top: 2px;
  text-align: left;
  letter-spacing: 0.01em;
}
</style> 