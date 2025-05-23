<template>
  <main class="services-page">
    <!-- Перетяжка -->
    <section id="peretyazhka" class="service-block service-block--alt">
      <div class="service-block__header">
        <h2>Перетяжка салона</h2>
        <p class="service-block__lead">Премиальная перетяжка салона автомобиля с гарантией качества и индивидуальным подходом.</p>
      </div>
      <div class="service-block__content">
        <ServiceGallery :images="peretyazhkaImages" @open-modal="openModal('peretyazhka', $event)" />
        <div class="service-block__desc">
          <p>
            Используем только лучшие материалы: натуральная кожа, алькантара, экокожа. Перетяжка салона — это не только обновление внешнего вида, но и повышение комфорта, статуса и стоимости вашего авто.
          </p>
          <ul class="service-block__benefits">
            <li>Индивидуальный подбор материалов и дизайна</li>
            <li>Гарантия на все работы</li>
            <li>Опытные мастера с портфолио</li>
            <li>Соблюдение сроков</li>
          </ul>
          <button class="service-block__cta">Заказать перетяжку</button>
        </div>
      </div>
      <div class="service-block__portfolio">
        <h3>Примеры работ</h3>
        <div class="portfolio-gallery">
          <img src="https://placehold.co/300x200?text=Перетяжка+1" alt="Пример работы 1" />
          <img src="https://placehold.co/300x200?text=Перетяжка+2" alt="Пример работы 2" />
          <img src="https://placehold.co/300x200?text=Перетяжка+3" alt="Пример работы 3" />
        </div>
      </div>
    </section>

    <!-- Тюнинг -->
    <section id="tyuning" class="service-block">
      <div class="service-block__header">
        <h2>Тюнинг салона</h2>
        <p class="service-block__lead">Уникальный тюнинг салона с использованием современных материалов и технологий.</p>
      </div>
      <div class="service-block__content">
        <ServiceGallery :images="tyuningImages" @open-modal="openModal('tyuning', $event)" />
        <div class="service-block__desc">
          <p>
            Мы предлагаем индивидуальные решения по тюнингу салона: эксклюзивные вставки, подсветка, нестандартные материалы, интеграция современных технологий. Ваш салон станет уникальным и подчеркнёт ваш стиль.
          </p>
          <ul class="service-block__benefits">
            <li>Эксклюзивные материалы и дизайн</li>
            <li>Профессиональная установка электроники</li>
            <li>Гарантия на все работы</li>
            <li>Соблюдение сроков</li>
          </ul>
          <button class="service-block__cta">Заказать тюнинг</button>
        </div>
      </div>
      <div class="service-block__portfolio">
        <h3>Примеры работ</h3>
        <div class="portfolio-gallery">
          <img src="https://placehold.co/300x200?text=Тюнинг+1" alt="Пример тюнинга 1" />
          <img src="https://placehold.co/300x200?text=Тюнинг+2" alt="Пример тюнинга 2" />
          <img src="https://placehold.co/300x200?text=Тюнинг+3" alt="Пример тюнинга 3" />
        </div>
      </div>
    </section>

    <!-- Реставрация -->
    <section id="restavratsiya" class="service-block service-block--alt">
      <div class="service-block__header">
        <h2>Реставрация салона</h2>
        <p class="service-block__lead">Восстановление и реставрация элементов салона до состояния нового.</p>
      </div>
      <div class="service-block__content">
        <ServiceGallery :images="restavratsiyaImages" @open-modal="openModal('restavratsiya', $event)" />
        <div class="service-block__desc">
          <p>
            Реставрация — это комплекс работ по восстановлению внешнего вида и функциональности салона. Мы устраняем потертости, царапины, восстанавливаем форму и цвет, возвращаем салону первозданный вид.
          </p>
          <ul class="service-block__benefits">
            <li>Восстановление любых материалов</li>
            <li>Современные технологии ремонта</li>
            <li>Гарантия на результат</li>
            <li>Быстро и качественно</li>
          </ul>
          <button class="service-block__cta">Заказать реставрацию</button>
        </div>
      </div>
      <div class="service-block__portfolio">
        <h3>Примеры работ</h3>
        <div class="portfolio-gallery">
          <img src="https://placehold.co/300x200?text=Реставрация+1" alt="Пример реставрации 1" />
          <img src="https://placehold.co/300x200?text=Реставрация+2" alt="Пример реставрации 2" />
          <img src="https://placehold.co/300x200?text=Реставрация+3" alt="Пример реставрации 3" />
        </div>
      </div>
    </section>

    <!-- Изготовление и пошив -->
    <section id="poshiv" class="service-block">
      <div class="service-block__header">
        <h2>Изготовление и пошив</h2>
        <p class="service-block__lead">Индивидуальный пошив элементов интерьера по вашим размерам и пожеланиям.</p>
      </div>
      <div class="service-block__content">
        <ServiceGallery :images="poshivImages" @open-modal="openModal('poshiv', $event)" />
        <div class="service-block__desc">
          <p>
            Мы создаём уникальные элементы интерьера: чехлы, подлокотники, панели, ковры и многое другое. Всё — по индивидуальным меркам, с учётом ваших пожеланий и стиля автомобиля.
          </p>
          <ul class="service-block__benefits">
            <li>Точные замеры и индивидуальный подход</li>
            <li>Большой выбор материалов и цветов</li>
            <li>Профессиональный пошив</li>
            <li>Гарантия на изделия</li>
          </ul>
          <button class="service-block__cta">Заказать пошив</button>
        </div>
      </div>
      <div class="service-block__portfolio">
        <h3>Примеры работ</h3>
        <div class="portfolio-gallery">
          <img src="https://placehold.co/300x200?text=Пошив+1" alt="Пример пошива 1" />
          <img src="https://placehold.co/300x200?text=Пошив+2" alt="Пример пошива 2" />
          <img src="https://placehold.co/300x200?text=Пошив+3" alt="Пример пошива 3" />
        </div>
      </div>
    </section>

    <!-- Вышивка -->
    <section id="vyshivka" class="service-block service-block--alt">
      <div class="service-block__header">
        <h2>Вышивка</h2>
        <p class="service-block__lead">Нанесение вышивки любой сложности на элементы салона.</p>
      </div>
      <div class="service-block__content">
        <ServiceGallery :images="vyshivkaImages" @open-modal="openModal('vyshivka', $event)" />
        <div class="service-block__desc">
          <p>
            Вышивка логотипов, надписей, узоров и индивидуальных дизайнов на сиденьях, подголовниках, коврах и других деталях интерьера. Современное оборудование и качественные нитки.
          </p>
          <ul class="service-block__benefits">
            <li>Любые цвета и стили</li>
            <li>Высокая точность и детализация</li>
            <li>Долговечность вышивки</li>
            <li>Индивидуальный дизайн</li>
          </ul>
          <button class="service-block__cta">Заказать вышивку</button>
        </div>
      </div>
      <div class="service-block__portfolio">
        <h3>Примеры работ</h3>
        <div class="portfolio-gallery">
          <img src="https://placehold.co/300x200?text=Вышивка+1" alt="Пример вышивки 1" />
          <img src="https://placehold.co/300x200?text=Вышивка+2" alt="Пример вышивки 2" />
          <img src="https://placehold.co/300x200?text=Вышивка+3" alt="Пример вышивки 3" />
        </div>
      </div>
    </section>

    <!-- Автоэлектрика -->
    <section id="elektro" class="service-block">
      <div class="service-block__header">
        <h2>Автоэлектрика</h2>
        <p class="service-block__lead">Установка и настройка электрооборудования в салоне автомобиля.</p>
      </div>
      <div class="service-block__content">
        <ServiceGallery :images="elektroImages" @open-modal="openModal('elektro', $event)" />
        <div class="service-block__desc">
          <p>
            Устанавливаем и настраиваем любое электрооборудование: подсветка, мультимедиа, зарядки, сигнализации, парктроники и многое другое. Гарантия на все работы.
          </p>
          <ul class="service-block__benefits">
            <li>Профессиональный монтаж</li>
            <li>Современные технологии</li>
            <li>Гарантия на работы и оборудование</li>
            <li>Безопасность и аккуратность</li>
          </ul>
          <button class="service-block__cta">Заказать автоэлектрику</button>
        </div>
      </div>
      <div class="service-block__portfolio">
        <h3>Примеры работ</h3>
        <div class="portfolio-gallery">
          <img src="https://placehold.co/300x200?text=Электрика+1" alt="Пример электрики 1" />
          <img src="https://placehold.co/300x200?text=Электрика+2" alt="Пример электрики 2" />
          <img src="https://placehold.co/300x200?text=Электрика+3" alt="Пример электрики 3" />
        </div>
      </div>
    </section>

    <!-- EVO и 3D ковры / органайзеры -->
    <section id="kovry" class="service-block service-block--alt">
      <div class="service-block__header">
        <h2>EVO и 3D ковры / органайзеры</h2>
        <p class="service-block__lead">Изготовление современных ковров с высоким бортом и органайзеров для салона.</p>
      </div>
      <div class="service-block__content">
        <ServiceGallery :images="kovryImages" @open-modal="openModal('kovry', $event)" />
        <div class="service-block__desc">
          <p>
            Изготавливаем EVO и 3D ковры по индивидуальным размерам, а также органайзеры для багажника и салона. Защита, стиль и удобство для вашего автомобиля.
          </p>
          <ul class="service-block__benefits">
            <li>Точное прилегание и индивидуальный размер</li>
            <li>Прочные и износостойкие материалы</li>
            <li>Лёгкий уход и чистка</li>
            <li>Разнообразие цветов и фактур</li>
          </ul>
          <button class="service-block__cta">Заказать ковры/органайзер</button>
        </div>
      </div>
      <div class="service-block__portfolio">
        <h3>Примеры работ</h3>
        <div class="portfolio-gallery">
          <img src="https://placehold.co/300x200?text=Ковры+1" alt="Пример ковров 1" />
          <img src="https://placehold.co/300x200?text=Ковры+2" alt="Пример ковров 2" />
          <img src="https://placehold.co/300x200?text=Ковры+3" alt="Пример ковров 3" />
        </div>
      </div>
    </section>
    <ImageModalSlider
      :images="modalImages"
      :startIndex="modalIndex"
      :visible="modalVisible"
      @close="modalVisible = false"
    />
  </main>
</template>

<script setup>
import { ref } from 'vue';
import ServiceGallery from '../components/ServiceGallery.vue';
import ImageModalSlider from '../components/ImageModalSlider.vue';

const peretyazhkaImages = [
  { src: 'https://placehold.co/300x200?text=Перетяжка+1', alt: 'Перетяжка 1' },
  { src: 'https://placehold.co/300x200?text=Перетяжка+2', alt: 'Перетяжка 2' },
  { src: 'https://placehold.co/300x200?text=Перетяжка+3', alt: 'Перетяжка 3' }
];
const tyuningImages = [
  { src: 'https://placehold.co/300x200?text=Тюнинг+1', alt: 'Тюнинг 1' },
  { src: 'https://placehold.co/300x200?text=Тюнинг+2', alt: 'Тюнинг 2' },
  { src: 'https://placehold.co/300x200?text=Тюнинг+3', alt: 'Тюнинг 3' }
];
const restavratsiyaImages = [
  { src: 'https://placehold.co/300x200?text=Реставрация+1', alt: 'Реставрация 1' },
  { src: 'https://placehold.co/300x200?text=Реставрация+2', alt: 'Реставрация 2' },
  { src: 'https://placehold.co/300x200?text=Реставрация+3', alt: 'Реставрация 3' }
];
const poshivImages = [
  { src: 'https://placehold.co/300x200?text=Пошив+1', alt: 'Пошив 1' },
  { src: 'https://placehold.co/300x200?text=Пошив+2', alt: 'Пошив 2' },
  { src: 'https://placehold.co/300x200?text=Пошив+3', alt: 'Пошив 3' }
];
const vyshivkaImages = [
  { src: 'https://placehold.co/300x200?text=Вышивка+1', alt: 'Вышивка 1' },
  { src: 'https://placehold.co/300x200?text=Вышивка+2', alt: 'Вышивка 2' },
  { src: 'https://placehold.co/300x200?text=Вышивка+3', alt: 'Вышивка 3' }
];
const elektroImages = [
  { src: 'https://placehold.co/300x200?text=Электрика+1', alt: 'Электрика 1' },
  { src: 'https://placehold.co/300x200?text=Электрика+2', alt: 'Электрика 2' },
  { src: 'https://placehold.co/300x200?text=Электрика+3', alt: 'Электрика 3' }
];
const kovryImages = [
  { src: 'https://placehold.co/300x200?text=Ковры+1', alt: 'Ковры 1' },
  { src: 'https://placehold.co/300x200?text=Ковры+2', alt: 'Ковры 2' },
  { src: 'https://placehold.co/300x200?text=Ковры+3', alt: 'Ковры 3' }
];

const modalVisible = ref(false);
const modalImages = ref([]);
const modalIndex = ref(0);

function openModal(type, index) {
  switch(type) {
    case 'peretyazhka': modalImages.value = peretyazhkaImages; break;
    case 'tyuning': modalImages.value = tyuningImages; break;
    case 'restavratsiya': modalImages.value = restavratsiyaImages; break;
    case 'poshiv': modalImages.value = poshivImages; break;
    case 'vyshivka': modalImages.value = vyshivkaImages; break;
    case 'elektro': modalImages.value = elektroImages; break;
    case 'kovry': modalImages.value = kovryImages; break;
    default: modalImages.value = [];
  }
  modalIndex.value = index;
  modalVisible.value = true;
}
</script>

<style scoped>
.services-page {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.service-block {
  background: #181818;
  border-radius: 18px;
  box-shadow: 0 4px 32px #00000022;
  padding: 2.5rem 2rem 2rem 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.service-block--alt {
  background: #232323;
}
.service-block__header h2 {
  font-size: 2.2rem;
  color: #ffd600;
  margin-bottom: 0.3em;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  text-shadow: 0 4px 24px #ffd60055;
}
.service-block__lead {
  color: rgba(255,255,255,0.85);
  font-size: 1.2rem;
  margin-bottom: 0.7em;
}
.service-block__content {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;
}
.service-block__gallery {
  flex: 1 1 260px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 180px;
  max-width: 320px;
}
.service-block__gallery img {
  width: 100%;
  border-radius: 12px;
  background: #222;
  object-fit: cover;
  box-shadow: 0 2px 12px #00000033;
}
.service-block__desc {
  flex: 2 1 340px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.service-block__desc p {
  color: #fff;
  font-size: 1.1rem;
  line-height: 1.7;
}
.service-block__benefits {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.service-block__benefits li {
  position: relative;
  padding-left: 1.5em;
  color: #ffd600;
  font-weight: 600;
  font-size: 1rem;
}
.service-block__benefits li::before {
  content: '✔';
  position: absolute;
  left: 0;
  color: #ffd600;
  font-size: 1.1em;
}
.service-block__cta {
  background: #ffd600;
  color: #181818;
  border: none;
  border-radius: 8px;
  padding: 0.8em 2.2em;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 4px 16px #ffd60033;
  transition: background 0.2s, color 0.2s;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.service-block__cta:hover {
  background: #232323;
  color: #ffd600;
}
.service-block__portfolio {
  margin-top: 1.5rem;
}
.service-block__portfolio h3 {
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 0.7em;
  font-weight: 700;
}
.portfolio-gallery {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.portfolio-gallery img {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  background: #222;
  box-shadow: 0 2px 8px #00000022;
}
@media (max-width: 900px) {
  .service-block__content {
    flex-direction: column;
    gap: 1.2rem;
  }
  .service-block__gallery, .service-block__desc {
    max-width: 100%;
  }
  .portfolio-gallery img {
    width: 90px;
    height: 60px;
  }
}
@media (max-width: 600px) {
  .services-page {
    padding: 1rem 0.2rem 2rem 0.2rem;
    gap: 1.5rem;
  }
  .service-block {
    padding: 1.2rem 0.5rem 1.2rem 0.5rem;
    gap: 1rem;
  }
  .service-block__header h2 {
    font-size: 1.3rem;
  }
  .service-block__lead {
    font-size: 1rem;
  }
}
</style> 