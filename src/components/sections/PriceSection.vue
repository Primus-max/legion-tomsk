<template>
  <ImperialSection title="Прайс-лист" class="price-section">
    <div class="price-section__table">
      <div class="price-section__row price-section__row--head">
        <div class="price-section__cell">Услуга</div>
        <div class="price-section__cell">от, ₽</div>
      </div>
      <div class="price-section__row" v-for="item in prices" :key="item.title">
        <div class="price-section__cell">{{ item.title }}</div>
        <div class="price-section__cell price-section__cell--price">{{ item.price }}</div>
      </div>
    </div>
    <router-link to="/prices" class="price-section__all">Смотреть полный прайс</router-link>
  </ImperialSection>
</template>

<script setup>
import ImperialSection from './ImperialSection.vue';

const prices = [
  { title: 'Перетяжка сидений', price: 'от 7 000' },
  { title: 'Пошив чехлов', price: 'от 5 000' },
  { title: 'Тюнинг салона', price: 'от 12 000' },
  { title: 'Восстановление кожи', price: 'от 4 500' },
  { title: 'Детейлинг салона', price: 'от 3 000' },
];
</script>

<style lang="scss" scoped>
.price-section {
  margin: 64px auto 0 auto;
  padding: 0 0 48px 0;
  &__table {
    margin: 0 auto 32px auto;
    width: 100%;
    max-width: 600px;
    border-radius: 12px;
    overflow: hidden;
    background: rgba(24,24,24,0.98);
    box-shadow: 0 2px 24px #ffd60011;
    border: 1.5px solid #ffd60022;
  }
  &__row {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ffd60011;
    &:last-child {
      border-bottom: none;
    }
    &--head {
      background: #181818;
      color: #ffd600;
      font-weight: 900;
      font-size: 1.1rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
  }
  &__cell {
    flex: 1 1 50%;
    padding: 18px 20px;
    font-size: 1.08rem;
    color: #fff;
    font-weight: 600;
    &--price {
      color: #ffd600;
      text-align: right;
      font-weight: 900;
      font-size: 1.13rem;
      letter-spacing: 0.03em;
    }
  }
  &__all {
    display: block;
    margin: 32px auto 0 auto;
    border: 2px solid #ffd600;
    color: #ffd600;
    background: none;
    font-weight: 700;
    padding: 0.8em 2em;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: box-shadow 0.2s, color 0.2s;
    border-radius: 8px;
    text-align: center;
    max-width: 320px;
    &:hover {
      box-shadow: 0 0 16px #ffd60088;
      color: #fff;
      background: none;
    }
  }
}
</style> 