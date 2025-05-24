<template>
  <main class="contacts-page">
    <h1 class="contacts-title">Контакты</h1>
    <p class="contacts-subtitle">Мы всегда на связи — звоните, пишите или приезжайте!</p>

    <section class="contacts-blocks">
      <address class="contacts-card">
        <div class="contacts-card__icon">📞</div>
        <div>
          <div class="contacts-card__label">Телефон</div>
          <a class="contacts-card__value" href="tel:+79991234567">+7 (999) 123-45-67</a>
        </div>
      </address>
      <div class="contacts-card">
        <div class="contacts-card__icon">💬</div>
        <div>
          <div class="contacts-card__label">Мессенджеры</div>
          <div class="contacts-messengers">
            <a href="https://wa.me/79991234567" target="_blank" rel="noopener" aria-label="WhatsApp" class="contacts-messenger whatsapp">WhatsApp</a>
            <a href="https://t.me/yourusername" target="_blank" rel="noopener" aria-label="Telegram" class="contacts-messenger telegram">Telegram</a>
          </div>
        </div>
      </div>
      <address class="contacts-card">
        <div class="contacts-card__icon">✉️</div>
        <div>
          <div class="contacts-card__label">Email</div>
          <a class="contacts-card__value" href="mailto:info@example.com">info@example.com</a>
        </div>
      </address>
      <address class="contacts-card">
        <div class="contacts-card__icon">📍</div>
        <div>
          <div class="contacts-card__label">Адрес</div>
          <div class="contacts-card__value">г. Томск, ул. Примерная, 1</div>
          <a href="https://yandex.ru/maps/?text=Томск, Примерная 1" target="_blank" rel="noopener" class="contacts-map-link">Показать на карте</a>
        </div>
      </address>
      <div class="contacts-card">
        <div class="contacts-card__icon">⏰</div>
        <div>
          <div class="contacts-card__label">Время работы</div>
          <div class="contacts-card__value">Пн–Сб: 10:00–19:00<br>Вс: выходной</div>
        </div>
      </div>
    </section>

    <section class="contacts-map-section">
      <iframe
        class="contacts-map"
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A1b2e3c4d5e6f7a8b9c0d1e2f3a4b5c6d&amp;source=constructor"
        width="100%" height="320" frameborder="0" allowfullscreen title="Карта проезда"></iframe>
    </section>

    <section class="contacts-form-section">
      <h2 class="contacts-form-title">Форма обратной связи</h2>
      <form class="contacts-form" @submit.prevent="submit">
        <input v-model="form.name" required placeholder="Ваше имя*" />
        <input v-model="form.phone" required placeholder="Телефон*" />
        <input v-model="form.email" type="email" placeholder="Email" />
        <textarea v-model="form.message" required placeholder="Ваш вопрос или сообщение*"></textarea>
        <button :disabled="loading" class="contacts-form-btn">{{ loading ? 'Отправка...' : 'Отправить' }}</button>
        <div v-if="success" class="contacts-form-success">Спасибо! Мы свяжемся с вами в ближайшее время.</div>
      </form>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({ name: '', phone: '', email: '', message: '' });
const loading = ref(false);
const success = ref(false);
async function submit() {
  loading.value = true;
  await new Promise(r => setTimeout(r, 1200));
  loading.value = false;
  success.value = true;
  setTimeout(() => { success.value = false; }, 2500);
  form.value = { name: '', phone: '', email: '', message: '' };
}
</script>

<style scoped>
.contacts-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 12px 48px 12px;
}
.contacts-title {
  font-size: 2.1rem;
  font-weight: 900;
  color: #ffd600;
  margin-bottom: 0.2em;
}
.contacts-subtitle {
  color: #aaa;
  font-size: 1.13rem;
  margin-bottom: 2.2em;
}
.contacts-blocks {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.2em;
  margin-bottom: 2.5em;
}
.contacts-card {
  background: #232323;
  border-radius: 14px;
  box-shadow: 0 2px 16px #ffd60011;
  padding: 1.1em 1.3em;
  display: flex;
  align-items: flex-start;
  gap: 1.1em;
  min-width: 220px;
  flex: 1 1 260px;
  font-style: normal;
  max-width: 320px;
}
.contacts-card__icon {
  font-size: 2.1em;
  color: #ffd600;
  flex-shrink: 0;
  margin-top: 0.1em;
}
.contacts-card__label {
  color: #ffd600;
  font-weight: 700;
  font-size: 1.01em;
  margin-bottom: 0.2em;
}
.contacts-card__value {
  color: #fff;
  font-size: 1.09em;
  font-weight: 500;
  margin-bottom: 0.1em;
}
.contacts-map-link {
  color: #ffd600;
  font-size: 0.98em;
  text-decoration: underline;
  margin-top: 0.2em;
  display: inline-block;
}
.contacts-messengers {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 0.7em;
  min-width: 0;
  align-items: center;
  overflow-x: auto;
}
.contacts-messenger {
  white-space: nowrap;
  min-width: 0;
  font-size: 1em;
  padding: 0.3em 1.1em;
}
.contacts-messenger.whatsapp {
  background: linear-gradient(90deg, #25d366 60%, #128c7e 100%);
  color: #181818;
}
.contacts-messenger.telegram {
  background: linear-gradient(90deg, #229ed9 60%, #0077b5 100%);
  color: #fff;
}
.contacts-messenger:hover {
  filter: brightness(1.1);
}
.contacts-map-section {
  margin: 2.5em 0 2.5em 0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 24px #ffd60011;
}
.contacts-map {
  width: 100%;
  height: 320px;
  border: none;
  display: block;
}
.contacts-form-section {
  margin-top: 2.5em;
  background: #232323;
  border-radius: 16px;
  box-shadow: 0 2px 24px #ffd60011;
  padding: 2em 1.2em 1.5em 1.2em;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;
}
.contacts-form-title {
  color: #ffd600;
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 1.1em;
  text-align: center;
}
.contacts-form {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
.contacts-form input,
.contacts-form textarea {
  border-radius: 8px;
  border: 1px solid #ffd60055;
  background: #181818;
  color: #fff;
  padding: 0.7em 1em;
  font-size: 1.05em;
  font-family: inherit;
  resize: none;
}
.contacts-form input:focus,
.contacts-form textarea:focus {
  outline: 2px solid #ffd600;
}
.contacts-form-btn {
  background: linear-gradient(90deg, #ffd600 60%, #fff700 100%);
  color: #181818;
  font-weight: 900;
  font-size: 1.13rem;
  border: none;
  border-radius: 12px;
  padding: 12px 32px;
  box-shadow: 0 2px 18px #ffd60055, 0 0 0 2px #ffd600cc;
  cursor: pointer;
  transition: box-shadow 0.2s, background 0.2s;
}
.contacts-form-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.contacts-form-success {
  color: #ffd600;
  text-align: center;
  margin-top: 1em;
  font-weight: 700;
}
@media (max-width: 900px) {
  .contacts-blocks {
    flex-direction: column;
    gap: 0.7em;
  }
  .contacts-card {
    min-width: 0;
    padding: 0.8em 0.7em;
    max-width: 100%;
  }
  .contacts-messengers {
    flex-wrap: wrap;
    gap: 0.5em;
    overflow-x: visible;
  }
  .contacts-form-section {
    padding: 1.2em 0.5em 1em 0.5em;
  }
}
@media (max-width: 700px) {
  .contacts-page {
    padding: 10px 0 24px 0;
  }
  .contacts-title {
    font-size: 1.3rem;
  }
  .contacts-form-title {
    font-size: 1.05rem;
  }
  .contacts-map {
    height: 180px;
  }
}
</style> 