<template>
  <ImperialSection title="Прайс-лист" class="price-section">
    <div class="price-section__tabs">
      <div
        v-for="cat in categories"
        :key="cat.key"
        :class="['price-section__tab', { active: cat.key === activeCategory }]"
        @click="activeCategory = cat.key"
        role="tab"
        tabindex="0"
      >
        {{ cat.label }}
      </div>
    </div>
    <div class="price-section__table-wrap">
      <table class="price-section__table">
        <thead>
          <tr>
            <th class="price-section__th">Услуга</th>
            <th class="price-section__th price-section__th--price">Цена</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in prices[activeCategory]" :key="item.title">
            <td class="price-section__td">{{ item.title }}</td>
            <td class="price-section__td price-section__td--price">{{ item.price }}</td>
          </tr>
        </tbody>
      </table>
      <div class="price-section__note">
        Цена рассчитывается индивидуально с учётом марки автомобиля и выбранного материала.
      </div>
    </div>
    <router-link to="/prices" class="price-section__all">Смотреть полный прайс</router-link>
  </ImperialSection>
</template>

<script setup>
import { ref } from 'vue';

import ImperialSection from './ImperialSection.vue';

const categories = [
  { key: 'peretyazhka', label: 'Перетяжка' },
  { key: 'tuning', label: 'Тюнинг' },
  { key: 'restoration', label: 'Реставрация' },
  { key: 'sewing', label: 'Пошив' },
  { key: 'embroidery', label: 'Вышивка' },
  { key: 'electronics', label: 'Электрика' },
  { key: 'carpets', label: 'Ковры' },
];

const prices = {
  peretyazhka: [
    { title: 'Сиденья', price: 'от 7 000' },
    { title: 'Руль', price: 'от 2 500' },
    { title: 'Потолок', price: 'от 6 000' },
  ],
  tuning: [
    { title: 'Тюнинг салона', price: 'от 12 000' },
    { title: 'Детали интерьера', price: 'от 3 000' },
    { title: 'Панели', price: 'от 4 000' },
  ],
  restoration: [
    { title: 'Восстановление кожи', price: 'от 4 500' },
    { title: 'Ремонт сидений', price: 'от 3 500' },
    { title: 'Пластик', price: 'от 2 000' },
  ],
  sewing: [
    { title: 'Пошив чехлов', price: 'от 5 000' },
    { title: 'Пошив подлокотника', price: 'от 2 000' },
    { title: 'Пошив ковриков', price: 'от 2 500' },
  ],
  embroidery: [
    { title: 'Вышивка логотипа', price: 'от 1 500' },
    { title: 'Декоративная вышивка', price: 'от 2 000' },
    { title: 'Именная вышивка', price: 'от 1 800' },
  ],
  electronics: [
    { title: 'Установка подсветки', price: 'от 3 000' },
    { title: 'Установка USB', price: 'от 1 200' },
    { title: 'Мониторинг', price: 'от 2 500' },
  ],
  carpets: [
    { title: 'EVO ковры', price: 'от 2 000' },
    { title: '3D ковры', price: 'от 2 500' },
    { title: 'Органайзеры', price: 'от 1 500' },
  ],
};

const activeCategory = ref(categories[0].key);
</script>

<style lang="scss" scoped>
.price-section {
  margin: 64px auto 0 auto;
  padding: 0 0 48px 0;
  &__tabs {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin: 0 0 24px 0;
    flex-wrap: wrap;
    border-bottom: 1px solid #ffd60022;
  }
  &__tab {
    color: #fff;
    border-bottom: 2px solid transparent;
    background: none;
    font-weight: 700;
    font-size: 0.95rem;
    padding: 0.3em 1em;
    cursor: pointer;
    transition: color 0.2s, border-color 0.2s;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    border-radius: 0;
    min-width: unset;
    &.active {
      color: #ffd600;
      border-bottom: 2px solid #ffd600;
      background: none;
    }
    &:hover:not(.active) {
      color: #ffd600cc;
      border-bottom: 2px solid #ffd60055;
    }
  }
  &__table-wrap {
    margin: 0 auto 32px auto;
    width: 100%;
    max-width: 600px;
    border-radius: 12px;
    overflow: hidden;
    background: rgba(24,24,24,0.98);
    box-shadow: 0 2px 24px #ffd60011;
    padding: 0;
  }
  &__table {
    width: 100%;
    border-collapse: collapse;
    background: transparent;
    border: none;
  }
  &__th, &__td {
    border: none !important;
    border-bottom: 1px solid #222 !important;
  }
  &__th--price, &__td--price {
    text-align: right !important;
  }
  &__tr:last-child &__td {
    border-bottom: none !important;
  }
  &__th {
    background: #181818;
    color: #aaa;
    font-weight: 700;
    font-size: 0.98rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 6px 16px;
    text-align: left;
  }
  &__td {
    padding: 6px 16px;
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
    max-width: 100%;
    width: 100%;
    &:hover {
      box-shadow: 0 0 16px #ffd60088;
      color: #fff;
      background: none;
    }
  }
  &__note {
    color: #aaa;
    font-size: 0.92rem;
    text-align: left;
    margin: 24px auto 24px auto;
    letter-spacing: 0.01em;
    display: block;
    max-width: 90%;
    width: fit-content;
  }
}
</style> 