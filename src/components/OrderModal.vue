<template>
  <div class="order-modal__backdrop" @click.self="close">
    <div class="order-modal">
      <div class="order-modal__header">
        <h2 class="order-modal__title">Получить расчет</h2>
        <button class="order-modal__close" @click="close" aria-label="Закрыть">×</button>
      </div>
      <form class="order-modal__form" @submit.prevent="submit">
        <div class="order-modal__scroll">
          <div class="order-modal__fields">
            <!-- Если услуга не выбрана (открыто из хедера) — показываем селект -->
            <div v-if="!selectedServiceKey && !props.defaultService" class="order-modal__row order-modal__row--full">
              <label>Выберите услугу*
                <select v-model="selectedServiceKey" required>
                  <option disabled value="">Выберите</option>
                  <option v-for="opt in serviceOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </label>
            </div>
            <!-- Если услуга выбрана (defaultService) — селект не показываем -->
            <template v-else>
              <div v-if="selectedService" class="order-modal__service-label order-modal__row order-modal__row--full">{{ selectedService.label }}</div>
              <template v-if="selectedService">
                <div class="order-modal__row order-modal__row--auto">
                  <label v-for="field in selectedService.fields" :key="field.key" :class="['order-modal__field', `field-${field.key}`]">
                    {{ field.label }}<span v-if="field.required">*</span>
                    <template v-if="field.type === 'select'">
                      <select v-model="form[field.key]" :required="field.required">
                        <option disabled value="">Выберите</option>
                        <option v-for="opt in field.options" :key="opt.value || opt">{{ opt.label || opt }}</option>
                        <option v-if="field.allowCustom" value="Другое">Другое</option>
                      </select>
                      <input v-if="field.allowCustom && form[field.key] === 'Другое'" v-model="form[field.key]" placeholder="Введите значение" />
                    </template>
                    <template v-else-if="field.type === 'carousel'">
                      <div class="material-carousel__wrap">
                        <button v-if="showCarouselArrows" type="button" class="carousel-arrow left" @click="scrollMaterial(-1)">
                          <svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="13" fill="none" stroke="#FFD600" stroke-width="2"/><polyline points="16,8 10,14 16,20" fill="none" stroke="#FFD600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="material-carousel" ref="materialCarouselRef">
                          <div v-for="mat in field.options" :key="mat.value" class="material-carousel__item" :class="{ selected: form.material === mat.value }" @click="form.material = mat.value">
                            <img :src="mat.img" :alt="mat.label" class="material-carousel__img" />
                            <div class="material-carousel__label" :title="mat.label">{{ mat.label }}</div>
                          </div>
                        </div>
                        <button v-if="showCarouselArrows" type="button" class="carousel-arrow right" @click="scrollMaterial(1)">
                          <svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="13" fill="none" stroke="#FFD600" stroke-width="2"/><polyline points="12,8 18,14 12,20" fill="none" stroke="#FFD600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                      </div>
                    </template>
                    <template v-else-if="field.type === 'textarea'">
                      <textarea v-model="form[field.key]" :required="field.required" rows="2" :placeholder="field.label" />
                    </template>
                    <template v-else-if="field.key === 'brand'">
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
                    </template>
                    <template v-else-if="field.key === 'model'">
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
                    </template>
                    <template v-else>
                      <input v-model="form[field.key]" :required="field.required" :placeholder="field.label" />
                    </template>
                  </label>
                </div>
              </template>
            </template>
          </div>
        </div>
        <div class="order-modal__footer">
          <button class="order-modal__submit" :disabled="loading">{{ loading ? 'Отправка...' : 'Отправить заказ' }}</button>
          <div v-if="success" class="order-modal__success">Спасибо! Мы свяжемся с вами в ближайшее время.</div>
        </div>
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

const materialCarouselRef = ref(null);
const showCarouselArrows = computed(() => window.innerWidth > 700);
function scrollMaterial(dir) {
  let el = materialCarouselRef.value;
  if (Array.isArray(el)) el = el[0];
  if (el && el.$el) el = el.$el;
  if (el) {
    const item = el.querySelector('.material-carousel__item');
    const gap = parseFloat(getComputedStyle(el).gap) || 0;
    const scrollStep = item ? item.offsetWidth + gap : 120;
    const maxScroll = el.scrollWidth - el.clientWidth;
    let nextScroll = el.scrollLeft + dir * scrollStep;
    if (nextScroll < 0) nextScroll = 0;
    if (nextScroll > maxScroll) nextScroll = maxScroll;
    el.scrollTo({ left: nextScroll, behavior: 'smooth' });
  }
}

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
  padding: 0;
  min-width: 320px;
  max-width: 95vw;
  width: 100%;
  max-height: 95vh;
  overflow: hidden;
  position: relative;
  color: #fff;
  display: flex;
  flex-direction: column;
}
.order-modal__header {
  position: sticky;
  top: 0;
  z-index: 2;
  background: #232323;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2em 1.5em 0.5em 1.5em;
  min-height: 64px;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
}
.order-modal__footer {
  position: sticky;
  bottom: 0;
  z-index: 2;
  background: #232323;
  padding: 1em 1.5em 1.5em 1.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
}
.order-modal__form {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.order-modal__scroll {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 0 1.5em 120px 1.5em;
  max-height: calc(95vh - 64px - 90px);
  min-height: 0;
  scrollbar-width: thin;
  scrollbar-color: #ffd600 #232323;
  overflow-x: hidden;
}
.order-modal__scroll::-webkit-scrollbar {
  width: 8px;
  background: #232323;
  border-radius: 8px;
}
.order-modal__scroll::-webkit-scrollbar-thumb {
  background: #ffd600;
  border-radius: 8px;
}
.order-modal__fields {
  display: flex;
  flex-direction: column;
  gap: 0.7em;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}
.order-modal__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.1em 2.5%;
}
.order-modal__row--full {
  grid-template-columns: 1fr;
}
.order-modal__row--auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 0.7em 2.5%;
  width: 100%;
}
.order-modal__fields label {
  display: flex;
  flex-direction: column;
  min-width: 140px;
  max-width: 340px;
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
  max-width: 100%;
}
.order-modal__fields input:focus,
.order-modal__fields select:focus,
.order-modal__fields textarea:focus {
  outline: 2px solid #ffd600;
}
.material-carousel__wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  padding: 0 56px;
  gap: 0;
}
.material-carousel {
  display: flex;
  gap: 1.3em;
  width: 100%;
  min-width: 0;
  flex: 1 1 auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  justify-content: flex-start;
}
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
  z-index: 2;
  opacity: 1;
  box-shadow: none;
  pointer-events: auto;
}
.carousel-arrow.left {
  left: 12px;
}
.carousel-arrow.right {
  right: 12px;
}
.carousel-arrow svg {
  display: block;
}
.carousel-arrow:active {
  opacity: 0.7;
}
.material-carousel__item {
  min-width: 120px;
  max-width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.material-carousel__item.selected {
  border: 2px solid #ffd600;
  box-shadow: 0 2px 8px #ffd60055;
}
.material-carousel__img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.3em;
  background: #181818;
  box-shadow: 0 1px 4px #0006;
}
.material-carousel__label {
  display: block;
  font-size: 0.95em;
  color: #ffd600;
  text-align: center;
  margin-top: 0.2em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.15;
  font-weight: 600;
}
.order-modal__title {
  margin-bottom: 1.2rem;
  font-size: 1.4rem;
  font-weight: 900;
  color: #ffd600;
  text-align: center;
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
.order-modal__service-label {
  display: block;
  font-size: 1.08em;
  font-weight: 700;
  color: #ffd600;
  margin-bottom: 0.5em;
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
@media (max-width: 700px) {
  .carousel-arrow {
    display: none !important;
  }
  .order-modal__row.order-modal__row--auto {
    grid-template-columns: 1fr;
    gap: 0.7em;
  }
  .order-modal__fields {
    max-width: 100%;
    padding: 0;
  }
  .material-carousel__wrap {
    padding: 0;
  }
  .material-carousel__label {
    font-size: 0.85em;
    width: 70px;
  }
  .material-carousel__item {
    min-width: 90px;
    max-width: 90px;
  }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style> 