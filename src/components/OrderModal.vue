<template>
  <div class="order-modal__backdrop" @click.self="close">
    <div class="order-modal">
      <button class="order-modal__close" @click="close" aria-label="Закрыть">×</button>
      <h2 class="order-modal__title">Заказ услуги</h2>
      <form class="order-modal__form" @submit.prevent="submit">
        <div class="order-modal__fields">
          <label>
            <span v-if="form.service || form.category" class="order-modal__service-label">
              <span v-if="form.category">{{ form.category }}:</span>
              <span v-if="form.service">{{ form.service }}</span>
            </span>
          </label>
          <label>
            Марка авто*
            <input v-model="form.brand" required placeholder="Например, Toyota" />
          </label>
          <label>
            Модель авто*
            <input v-model="form.model" required placeholder="Например, Camry" />
          </label>
          <label>
            Год выпуска
            <input v-model="form.year" type="number" min="1970" max="2099" placeholder="2020" />
          </label>
          <label>
            Тип работ*
            <select v-model="form.workType" required>
              <option disabled value="">Выберите</option>
              <option v-for="type in workTypes" :key="type" :value="type">{{ type }}</option>
            </select>
          </label>
          <label>
            Материал
            <select v-model="form.material">
              <option value="">Не выбрано</option>
              <option v-for="mat in materials" :key="mat" :value="mat">{{ mat }}</option>
            </select>
          </label>
          <label>
            Цвет
            <input v-model="form.color" placeholder="Черный, бежевый..." />
          </label>
          <label>
            Комментарий
            <textarea v-model="form.comment" rows="2" placeholder="Ваши пожелания"></textarea>
          </label>
          <label>
            Имя*
            <input v-model="form.name" required placeholder="Ваше имя" />
          </label>
          <label>
            Телефон*
            <input v-model="form.phone" required placeholder="+7 (___) ___-__-__" />
          </label>
          <label>
            Email
            <input v-model="form.email" type="email" placeholder="mail@example.com" />
          </label>
        </div>
        <button class="order-modal__submit" :disabled="loading">{{ loading ? 'Отправка...' : 'Отправить заказ' }}</button>
        <div v-if="success" class="order-modal__success">Спасибо! Мы свяжемся с вами в ближайшее время.</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {
  defineProps,
  ref,
  watch,
} from 'vue';

const emit = defineEmits(['close']);

const props = defineProps({
  defaultService: { type: String, default: '' },
  defaultCategory: { type: String, default: '' },
});

const form = ref({
  brand: '',
  model: '',
  year: '',
  workType: '',
  material: '',
  color: '',
  comment: '',
  name: '',
  phone: '',
  email: '',
  service: '',
  category: '',
});

watch(
  () => [props.defaultService, props.defaultCategory],
  ([service, category]) => {
    form.value.service = service || '';
    form.value.category = category || '';
  },
  { immediate: true }
);

const workTypes = [
  'Сиденья',
  'Руль',
  'Потолок',
  'Двери',
  'Пол',
  'Торпедо',
  'Подлокотник',
  'Комбинированно',
];
const materials = ['Кожа', 'Алькантара', 'Экокожа', 'Комбинированно'];

const loading = ref(false);
const success = ref(false);

function close() {
  emit('close');
}

async function submit() {
  loading.value = true;
  // Мок-отправка
  await new Promise(r => setTimeout(r, 1200));
  loading.value = false;
  success.value = true;
  setTimeout(close, 1800);
}
</script>

<style scoped>
.order-modal__backdrop {
  position: fixed;
  inset: 0;
  background: #181818cc;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s;
}
.order-modal {
  background: #232323;
  border-radius: 18px;
  box-shadow: 0 8px 48px #ffd60055;
  padding: 2.2rem 1.5rem 1.5rem 1.5rem;
  min-width: 320px;
  max-width: 95vw;
  width: 100%;
  max-height: 95vh;
  overflow-y: auto;
  position: relative;
  color: #fff;
}
.order-modal__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none !important;
  box-shadow: none !important;
  border: none !important;
  border-radius: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  opacity: 1;
  transition: none;
  z-index: 10;
}
.order-modal__title {
  margin-bottom: 1.2rem;
  font-size: 1.4rem;
  font-weight: 900;
  color: #ffd600;
  text-align: center;
}
.order-modal__form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.order-modal__fields {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2.5%;
}
.order-modal__fields label {
  display: flex;
  flex-direction: column;
  flex: 1 1 47%;
  min-width: 140px;
  font-size: 1rem;
  gap: 0.3em;
}
.order-modal__fields input,
.order-modal__fields select,
.order-modal__fields textarea {
  border-radius: 8px;
  border: 1px solid #ffd60055;
  background: #181818;
  color: #fff;
  padding: 0.5em 0.8em;
  font-size: 1rem;
  margin-top: 0.1em;
}
.order-modal__fields input:focus,
.order-modal__fields select:focus,
.order-modal__fields textarea:focus {
  outline: 2px solid #ffd600;
}
.order-modal__submit {
  margin: 1.2em auto 0 auto;
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
.order-modal__submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.order-modal__success {
  color: #ffd600;
  text-align: center;
  margin-top: 1em;
  font-weight: 700;
}
.order-modal__service-label {
  display: block;
  font-size: 1.08em;
  font-weight: 700;
  color: #ffd600;
  margin-bottom: 0.5em;
}
@media (max-width: 700px) {
  .order-modal {
    padding: 1.2rem 0.5rem 1rem 0.5rem;
    min-width: 0;
  }
  .order-modal__fields {
    flex-direction: column;
    gap: 0.7rem;
  }
  .order-modal__fields label {
    flex: 1 1 100%;
  }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style> 