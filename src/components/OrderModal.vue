<template>
  <div class="order-modal__backdrop" @click.self="close">
    <div class="order-modal">
      <button class="order-modal__close" @click="close" aria-label="Закрыть">×</button>
      <h2 class="order-modal__title">Получить расчет</h2>
      <form class="order-modal__form" @submit.prevent="submit">
        <div class="order-modal__fields">
          <!-- Если услуга не выбрана (открыто из хедера) — показываем селект -->
          <div v-if="!selectedServiceKey && !props.defaultService">
            <label>Выберите услугу*
              <select v-model="selectedServiceKey" required>
                <option disabled value="">Выберите</option>
                <option v-for="opt in serviceOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
              </select>
            </label>
          </div>
          <!-- Если услуга выбрана (defaultService) — селект не показываем -->
          <template v-else>
            <div v-if="selectedService" class="order-modal__service-label">{{ selectedService.label }}</div>
            <template v-if="selectedService" v-for="field in selectedService.fields" :key="field.key">
              <!-- Марка авто -->
              <label v-if="field.key === 'brand'">
                {{ field.label }}<span v-if="field.required">*</span>
                <template v-if="!brandInputMode">
                  <select v-model="form.brand" required>
                    <option disabled value="">Выберите</option>
                    <option v-for="b in field.options" :key="b" :value="b">{{ b }}</option>
                    <option value="Другое">Другое</option>
                  </select>
                </template>
                <template v-else>
                  <input v-model="form.brand" required placeholder="Введите марку" />
                </template>
              </label>
              <!-- Модель авто -->
              <label v-else-if="field.key === 'model'">
                {{ field.label }}<span v-if="field.required">*</span>
                <template v-if="!modelInputMode && getModelOptions.length">
                  <select v-model="form.model" required>
                    <option disabled value="">Выберите</option>
                    <option v-for="m in getModelOptions" :key="m" :value="m">{{ m }}</option>
                    <option value="Другое">Другое</option>
                  </select>
                </template>
                <template v-else>
                  <input v-model="form.model" required placeholder="Введите модель" />
                </template>
              </label>
              <!-- Материал (карусель) -->
              <label v-else-if="field.type === 'carousel'">
                {{ field.label }}<span v-if="field.required">*</span>
                <!-- Заглушка для компонента-карусели -->
                <div class="material-carousel">
                  <div v-for="mat in field.options" :key="mat.value" class="material-carousel__item" :class="{ selected: form.material === mat.value }" @click="form.material = mat.value">
                    <img :src="mat.img" :alt="mat.label" class="material-carousel__img" />
                    <div class="material-carousel__label">{{ mat.label }}</div>
                  </div>
                </div>
              </label>
              <!-- Select -->
              <label v-else-if="field.type === 'select'">
                {{ field.label }}<span v-if="field.required">*</span>
                <select v-model="form[field.key]" :required="field.required">
                  <option disabled value="">Выберите</option>
                  <option v-for="opt in field.options" :key="opt.value || opt">{{ opt.label || opt }}</option>
                  <option v-if="field.allowCustom" value="Другое">Другое</option>
                </select>
                <input v-if="field.allowCustom && form[field.key] === 'Другое'" v-model="form[field.key]" placeholder="Введите значение" />
              </label>
              <!-- Textarea -->
              <label v-else-if="field.type === 'textarea'">
                {{ field.label }}<span v-if="field.required">*</span>
                <textarea v-model="form[field.key]" :required="field.required" rows="2" :placeholder="field.label" />
              </label>
              <!-- Number -->
              <label v-else-if="field.type === 'number'">
                {{ field.label }}<span v-if="field.required">*</span>
                <input v-model="form[field.key]" type="number" :required="field.required" :placeholder="field.label" />
              </label>
              <!-- Email -->
              <label v-else-if="field.type === 'email'">
                {{ field.label }}<span v-if="field.required">*</span>
                <input v-model="form[field.key]" type="email" :required="field.required" :placeholder="field.label" />
              </label>
              <!-- Phone -->
              <label v-else-if="field.type === 'phone'">
                {{ field.label }}<span v-if="field.required">*</span>
                <input v-model="form[field.key]" type="tel" :required="field.required" placeholder="+7 (___) ___-__-__" />
              </label>
              <!-- Text (по умолчанию) -->
              <label v-else>
                {{ field.label }}<span v-if="field.required">*</span>
                <input v-model="form[field.key]" :required="field.required" :placeholder="field.label" />
              </label>
            </template>
          </template>
        </div>
        <button class="order-modal__submit" :disabled="loading">{{ loading ? 'Отправка...' : 'Отправить заказ' }}</button>
        <div v-if="success" class="order-modal__success">Спасибо! Мы свяжемся с вами в ближайшее время.</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  ref,
  watch,
} from 'vue';

import {
  MATERIALS,
  POPULAR_BRANDS,
  POPULAR_MODELS,
  SERVICES,
} from '../constants/orderFormConfig';

const emit = defineEmits(['close']);
const props = defineProps({
  defaultService: { type: String, default: '' },
  defaultWorkType: { type: String, default: '' },
  defaultCategory: { type: String, default: '' },
});

function findServiceKey(val) {
  if (!val) return '';
  const byKey = SERVICES.find(s => s.key === val);
  if (byKey) return byKey.key;
  const byLabel = SERVICES.find(s => s.label === val);
  if (byLabel) return byLabel.key;
  return '';
}

const selectedServiceKey = ref(findServiceKey(props.defaultService));
const selectedService = computed(() => SERVICES.find(s => s.key === selectedServiceKey.value) || null);

const form = ref({});
const loading = ref(false);
const success = ref(false);

const serviceOptions = SERVICES.map(s => ({ value: s.key, label: s.label }));

// ГАРАНТИРОВАННАЯ инициализация формы при появлении selectedService
watch(
  selectedService,
  (service) => {
    if (service) {
      form.value = {};
      service.fields.forEach(f => {
        if (f.key === 'workType' && props.defaultWorkType) {
          form.value[f.key] = props.defaultWorkType;
        } else {
          form.value[f.key] = '';
        }
      });
    }
  },
  { immediate: true }
);

const brandInputMode = ref(false);
const modelInputMode = ref(false);

watch(
  () => form.value.brand,
  (brand) => {
    if (!POPULAR_BRANDS.includes(brand)) {
      brandInputMode.value = true;
    } else {
      brandInputMode.value = false;
      form.value.model = '';
      modelInputMode.value = false;
    }
  }
);
watch(
  () => form.value.model,
  (model) => {
    if (!getModelOptions.value.includes(model)) {
      modelInputMode.value = true;
    } else {
      modelInputMode.value = false;
    }
  }
);
const getModelOptions = computed(() => {
  const brand = form.value.brand;
  return POPULAR_MODELS[brand] || [];
});

function close() {
  emit('close');
}

async function submit() {
  loading.value = true;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem 2.5%;
}
.order-modal__fields label {
  display: flex;
  flex-direction: column;
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
.material-carousel {
  display: flex;
  gap: 0.7em;
  margin: 0.5em 0;
  overflow-x: auto;
}
.material-carousel__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid transparent;
  border-radius: 10px;
  padding: 0.3em 0.7em 0.5em 0.7em;
  background: #232323;
  cursor: pointer;
  min-width: 70px;
  transition: border 0.2s, box-shadow 0.2s;
}
.material-carousel__item.selected {
  border: 2px solid #ffd600;
  box-shadow: 0 2px 8px #ffd60055;
}
.material-carousel__img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 0.3em;
}
.material-carousel__label {
  font-size: 0.9em;
  color: #ffd600;
  text-align: center;
}
@media (max-width: 700px) {
  .order-modal {
    padding: 1.2rem 0.5rem 1rem 0.5rem;
    min-width: 0;
  }
  .order-modal__fields {
    grid-template-columns: 1fr;
    gap: 0.7rem;
  }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style> 