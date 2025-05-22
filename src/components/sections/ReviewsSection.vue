<template>
  <section class="reviews-section">
    <h2 class="reviews-section__title">Отзывы клиентов</h2>
    <div
      class="reviews-section__stack-wrap"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <div
        v-for="(review, idx) in visibleReviews"
        :key="review._id"
        class="review-card"
        :class="{ swipe: swiping && idx === 0 }"
        :style="getCardStyle(idx)"
        @transitionend="onCardTransitionEnd"
      >
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
      <button class="reviews-section__arrow left" @click="swipeLeft">
        <span>&lt;</span>
      </button>
      <button class="reviews-section__arrow right" @click="swipeRight">
        <span>&gt;</span>
      </button>
    </div>
  </section>
</template>

<script setup>
import {
  computed,
  ref,
} from 'vue';

const baseReviews = [
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

// Генерируем id и рандомный rotate для каждой карточки
const reviews = ref(
  baseReviews.map((r, i) => ({
    ...r,
    _id: i + '-' + Math.random().toString(36).slice(2, 7),
    rotate: (Math.random() - 0.5) * 8 // от -4 до +4 градусов
  }))
);
const topIndex = ref(0);
const swiping = ref(false);

const visibleReviews = computed(() => {
  // Показываем 3 верхних карточки (верхняя — первая)
  const arr = [];
  for (let i = 0; i < 3; i++) {
    arr.push(reviews.value[(topIndex.value + i) % reviews.value.length]);
  }
  return arr;
});

function getCardStyle(idx) {
  // idx=0 — верхняя, idx=1 — вторая, idx=2 — третья
  const z = 10 - idx;
  // На мобильных чуть меньше scale и rotate
  const isMobile = window.matchMedia('(max-width: 700px)').matches;
  const scale = isMobile ? 1 - idx * 0.04 : 1 - idx * 0.06;
  const y = idx * (isMobile ? 6 : 10);
  const rotate = isMobile ? (visibleReviews.value[idx]?.rotate || 0) * 0.7 : visibleReviews.value[idx]?.rotate || 0;
  return {
    zIndex: z,
    transform: `translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`
  };
}

function swipeLeft() {
  if (swiping.value) return;
  swiping.value = true;
}
function swipeRight() {
  if (swiping.value) return;
  swiping.value = true;
}
function onCardTransitionEnd() {
  if (!swiping.value) return;
  // Перемещаем верхнюю карточку в конец
  const first = reviews.value.shift();
  reviews.value.push({ ...first, rotate: (Math.random() - 0.5) * 8 });
  swiping.value = false;
}
function initials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

// Touch-свайп для мобильных
let touchStartX = 0;
let touchEndX = 0;
function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}
function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  const dx = touchEndX - touchStartX;
  if (Math.abs(dx) > 40) {
    if (dx < 0) swipeLeft();
    else swipeRight();
  }
}
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
  display: flex;
  flex-direction: column;
  align-items: center;
}
.reviews-section__title {
  font-size: clamp(2rem, 4vw, 2.7rem);
  font-weight: 900;
  color: #fff;
  text-align: center;
  margin-bottom: 48px;
  letter-spacing: 0.04em;
  text-shadow: 0 4px 24px #ffd60088, 0 2px 8px #fff2;
  text-transform: uppercase;
}
.reviews-section__stack-wrap {
  width: 100vw;
  min-height: 240px;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.review-card {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 520px;
  min-height: 260px;
  max-width: 98vw;
  background: radial-gradient(ellipse at 60% 0%, #232323 70%, #181818 100%);
  border-radius: 22px;
  box-shadow: 0 2px 32px #ffd60022, 0 0 0 2.5px #ffd60033, 0 0 32px 0 #ffd60011 inset;
  border: 1.5px solid #ffd60033;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 22px;
  justify-content: flex-start;
  align-items: stretch;
  opacity: 1;
  padding: 40px 36px 36px 36px;
  transition: transform 0.5s cubic-bezier(.6,.2,.3,1.1), box-shadow 0.25s, opacity 0.3s;
  will-change: transform, opacity;
  &.swipe {
    transform: translateX(120%) rotate(12deg) scale(1.05) !important;
    opacity: 0;
    pointer-events: none;
  }
  &:hover {
    box-shadow: 0 6px 40px #ffd60066, 0 0 0 2.5px #ffd600cc, 0 0 32px 0 #ffd60033 inset;
    transform: scale(1.025) translateY(-4px) rotate(var(--rotate, 0deg));
  }
}
.review-card__header {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-bottom: 10px;
}
.review-card__avatar {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: radial-gradient(circle at 60% 40%, #fff 60%, #ffd600 100%, #fff0 120%);
  box-shadow: 0 2px 18px #ffd60055, 0 0 0 4px #fff2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.5rem;
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
  gap: 4px;
}
.review-card__name {
  font-weight: 900;
  font-size: 1.22rem;
  color: #ffd600;
  letter-spacing: 0.01em;
  margin-bottom: 2px;
}
.review-card__date {
  font-size: 1.04rem;
  color: #fff7;
  font-weight: 400;
  letter-spacing: 0.01em;
}
.review-card__text {
  font-size: 1.13rem;
  color: #fff;
  font-weight: 500;
  line-height: 1.7;
  margin-top: 6px;
  text-align: left;
  letter-spacing: 0.01em;
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
  z-index: 20;
  margin: 0;
  left: 292px;
  right: auto;
  border-radius: 0;
  box-shadow: none;
  outline: none;
  transition: none;
  &.right {
    left: 940px;    
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
@media (max-width: 700px) {
  .reviews-section__arrow {
    display: none;
  }
  .review-card {
    width: 90vw;
    min-width: 0;
    max-width: 90vw;
    min-height: 140px;
    padding: 14px 3vw 14px 3vw;
    box-shadow: 0 2px 10px #ffd60022, 0 0 0 1px #ffd60033, 0 0 8px 0 #ffd60011 inset;
  }
  .review-card__avatar {
    width: 44px;
    height: 44px;
    font-size: 1.1rem;
  }
}
</style> 