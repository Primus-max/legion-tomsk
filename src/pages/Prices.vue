<template>
  <main class="prices-page">
    <h1>Прайс-лист на услуги автосервиса</h1>
    <p class="prices-page__desc">
      Все цены ориентировочные и зависят от марки автомобиля, выбранных материалов и сложности работ. Для точного расчёта воспользуйтесь формой заказа или свяжитесь с нами.
    </p>
    <section v-for="cat in categories" :key="cat.key" class="price-category">
      <div class="price-category__header">
        <img v-if="cat.icon" :src="cat.icon" :alt="cat.label + ' иконка'" class="price-category__icon" />
        <div>
          <h2 class="price-category__title">{{ cat.label }}</h2>
          <p class="price-category__desc">{{ cat.desc }}</p>
        </div>
      </div>
      <table class="price-category__table">
        <caption>Цены на услуги по {{ cat.label.toLowerCase() }}</caption>
        <thead>
          <tr>
            <th>Услуга</th>
            <th>Цена, ₽</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in cat.items" :key="item.title" :class="{ 'zebra': idx % 2 === 1 }">
            <td>
              <div class="service-title-row">
                <span>{{ item.title }}</span>
                <span v-if="item.badge" class="badge">{{ item.badge }}</span>
              </div>
              <div v-if="item.desc" class="service-desc">{{ item.desc }}</div>
            </td>
            <td class="price-cell">{{ item.price }}</td>
            <td><button class="order-btn" @click="openOrderModal(item.title, cat.label)">Заказать</button></td>
          </tr>
        </tbody>
      </table>
    </section>
    <OrderModal
      v-if="orderModalVisible"
      :defaultService="orderModalService"
      :defaultCategory="orderModalCategory"
      @close="closeOrderModal"
    />
    <FooterSection />
  </main>
</template>

<script setup>
import { ref } from 'vue';

import OrderModal from '../components/OrderModal.vue';
import FooterSection from '../components/sections/FooterSection.vue';

const orderModalVisible = ref(false);
const orderModalService = ref('');
const orderModalCategory = ref('');

function openOrderModal(service, category) {
  orderModalService.value = service;
  orderModalCategory.value = category;
  orderModalVisible.value = true;
}
function closeOrderModal() {
  orderModalVisible.value = false;
}

const categories = [
  {
    key: 'peretyazhka',
    label: 'Перетяжка',
    icon: '/assets/icons/seat.svg',
    desc: 'Перетяжка салона, сидений, руля, потолка и других элементов.',
    items: [
      { title: 'Сиденья', price: 'от 7 000', badge: 'Хит', desc: 'Кожа, алькантара, экокожа. Демонтаж, подготовка, установка.' },
      { title: 'Руль', price: 'от 2 500', desc: 'Выбор материала и цвета, декоративная прострочка.' },
      { title: 'Потолок', price: 'от 6 000', desc: 'Шумоизоляция и подбор ткани.' },
    ],
  },
  {
    key: 'tuning',
    label: 'Тюнинг',
    icon: '/assets/icons/tuning.svg',
    desc: 'Комплексное обновление интерьера, подсветка, индивидуальные решения.',
    items: [
      { title: 'Тюнинг салона', price: 'от 12 000', badge: 'Рекомендуем', desc: 'Вставки, подсветка, индивидуальные решения.' },
      { title: 'Детали интерьера', price: 'от 3 000', desc: 'Ручки, панели, вставки под дерево/карбон.' },
      { title: 'Панели', price: 'от 4 000', desc: 'Перетяжка и реставрация панелей, торпедо, дверных карт.' },
    ],
  },
  {
    key: 'restoration',
    label: 'Реставрация',
    icon: '/assets/icons/restore.svg',
    desc: 'Восстановление кожи, ремонт сидений, пластика и других элементов.',
    items: [
      { title: 'Восстановление кожи', price: 'от 4 500', desc: 'Ремонт, покраска и восстановление кожаных элементов.' },
      { title: 'Ремонт сидений', price: 'от 3 500', desc: 'Устранение повреждений, замена наполнителя.' },
      { title: 'Пластик', price: 'от 2 000', desc: 'Ремонт и восстановление пластиковых деталей.' },
    ],
  },
  {
    key: 'sewing',
    label: 'Пошив',
    icon: '/assets/icons/sewing.svg',
    desc: 'Пошив чехлов, подлокотников, ковриков по индивидуальным лекалам.',
    items: [
      { title: 'Пошив чехлов', price: 'от 5 000', desc: 'Индивидуальный пошив, выбор материала и цвета.' },
      { title: 'Пошив подлокотника', price: 'от 2 000', desc: 'Пошив и перетяжка подлокотников.' },
      { title: 'Пошив ковриков', price: 'от 2 500', desc: 'Премиальные материалы, возможна вышивка логотипа.' },
    ],
  },
  {
    key: 'embroidery',
    label: 'Вышивка',
    icon: '/assets/icons/embroidery.svg',
    desc: 'Вышивка логотипов, декоративная и именная вышивка.',
    items: [
      { title: 'Вышивка логотипа', price: 'от 1 500', desc: 'Фирменный или индивидуальный логотип.' },
      { title: 'Декоративная вышивка', price: 'от 2 000', desc: 'Узоры, надписи по вашему эскизу.' },
      { title: 'Именная вышивка', price: 'от 1 800', desc: 'Имя, инициалы или индивидуальный текст.' },
    ],
  },
  {
    key: 'electronics',
    label: 'Электрика',
    icon: '/assets/icons/electro.svg',
    desc: 'Установка подсветки, USB, систем мониторинга.',
    items: [
      { title: 'Установка подсветки', price: 'от 3 000', desc: 'Светодиодная подсветка, выбор цвета и сценариев.' },
      { title: 'Установка USB', price: 'от 1 200', desc: 'Врезка и подключение USB-портов.' },
      { title: 'Мониторинг', price: 'от 2 500', desc: 'Системы мониторинга и контроля состояния авто.' },
    ],
  },
  {
    key: 'carpets',
    label: 'Ковры',
    icon: '/assets/icons/carpet.svg',
    desc: 'Изготовление и укладка EVO- и 3D-ковров, органайзеры.',
    items: [
      { title: 'EVO ковры', price: 'от 2 000', desc: 'Изготовление и укладка по индивидуальным лекалам.' },
      { title: '3D ковры', price: 'от 2 500', desc: '3D-ковры с бортиками, защита от влаги и грязи.' },
      { title: 'Органайзеры', price: 'от 1 500', desc: 'Органайзеры и аксессуары для багажника и салона.' },
    ],
  },
];
</script>

<style scoped>
.prices-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 12px 48px 12px;
}
.prices-page__desc {
  color: #aaa;
  font-size: 1.08rem;
  margin-bottom: 2.2em;
  max-width: 700px;
}
.price-category {
  background: #232323;
  border-radius: 18px;
  box-shadow: 0 4px 32px #ffd60022;
  margin-bottom: 2.5em;
  padding: 1.5em 1.2em 1.2em 1.2em;
  position: relative;
  overflow: hidden;
}
.price-category__header {
  display: flex;
  align-items: flex-start;
  gap: 1.2em;
  margin-bottom: 1.1em;
}
.price-category__icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 8px #ffd60044);
}
.price-category__title {
  font-size: 1.35rem;
  font-weight: 900;
  color: #ffd600;
  margin: 0 0 0.2em 0;
}
.price-category__desc {
  color: #aaa;
  font-size: 1.01rem;
  margin: 0;
}
.price-category__table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: transparent;
  margin-top: 0.5em;
}
.price-category__table caption {
  caption-side: top;
  color: #ffd600;
  font-weight: 700;
  font-size: 1.08rem;
  padding: 0.5em 0 0.3em 0;
  text-align: left;
  letter-spacing: 0.02em;
}
.price-category__table th, .price-category__table td {
  padding: 14px 10px 10px 10px;
  border: none;
  text-align: left;
  font-size: 1.04rem;
  background: transparent;
}
.price-category__table th {
  background: #181818;
  color: #ffd600;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-radius: 0;
}
.price-category__table td {
  color: #fff;
  font-weight: 500;
  vertical-align: top;
  border-radius: 0;
}
.zebra {
  background: #232323;
}
.price-category__table tr.zebra td {
  background: #1a1a1a;
}
.service-title-row {
  display: flex;
  align-items: center;
  gap: 0.7em;
  font-weight: 600;
}
.badge {
  display: inline-block;
  background: linear-gradient(90deg, #ffd600 60%, #fff700 100%);
  color: #181818;
  font-size: 0.85em;
  font-weight: 700;
  border-radius: 8px;
  padding: 0.1em 0.7em;
  margin-left: 0.2em;
  vertical-align: middle;
  box-shadow: 0 1px 4px #ffd60022;
}
.service-desc {
  color: #ffd600cc;
  font-size: 0.93em;
  margin-top: 0.18em;
  margin-bottom: 0.1em;
  font-weight: 400;
  line-height: 1.4;
}
.price-cell {
  color: #ffd600;
  font-weight: 900;
  text-align: right;
  font-size: 1.13rem;
}
.order-btn {
  background: linear-gradient(90deg, #ffd600 60%, #fff700 100%);
  color: #181818;
  font-weight: 900;
  font-size: 1.01rem;
  border: none;
  border-radius: 10px;
  padding: 8px 22px;
  box-shadow: 0 1px 6px #ffd60033, 0 0 0 1.5px #ffd600cc;
  cursor: pointer;
  transition: box-shadow 0.2s, background 0.2s;
}
.order-btn:hover {
  box-shadow: 0 2px 12px #ffd60077, 0 0 0 2px #ffd600cc;
  background: linear-gradient(90deg, #fff700 80%, #ffd600 100%);
}
@media (max-width: 900px) {
  .price-category {
    padding: 1em 0.3em 1em 0.3em;
  }
  .price-category__icon {
    width: 36px;
    height: 36px;
  }
  .price-category__table th, .price-category__table td {
    padding: 8px 4px;
    font-size: 0.97rem;
  }
}
@media (max-width: 700px) {
  .prices-page {
    padding: 12px 0 24px 0;
  }
  .price-category {
    margin-bottom: 1.2em;
    padding: 0.7em 0.1em 0.7em 0.1em;
  }
  .price-category__header {
    gap: 0.7em;
  }
  .price-category__icon {
    width: 28px;
    height: 28px;
  }
  .price-category__table th, .price-category__table td {
    padding: 6px 2px;
    font-size: 0.91rem;
  }
  .order-btn {
    padding: 7px 10px;
    font-size: 0.93rem;
  }
}
</style> 