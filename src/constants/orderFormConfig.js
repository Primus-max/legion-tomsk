// Конфиг для динамической формы заказа услуг

export class OrderField {
  /**
   * @param {string} key - Ключ поля (например, 'brand')
   * @param {string} label - Название для пользователя
   * @param {string} type - Тип поля ('text', 'select', 'carousel', 'textarea', 'phone', 'email', 'number')
   * @param {boolean} required - Обязательное ли поле
   * @param {Array} options - Варианты для select/carousel (если есть)
   * @param {boolean} allowCustom - Можно ли вводить своё значение (для select)
   */
  constructor({ key, label, type = 'text', required = false, options = [], allowCustom = false }) {
    this.key = key;
    this.label = label;
    this.type = type;
    this.required = required;
    this.options = options;
    this.allowCustom = allowCustom;
  }
}

export class ServiceConfig {
  /**
   * @param {string} key - Ключ услуги (например, 'peretyazhka')
   * @param {string} label - Название услуги
   * @param {OrderField[]} fields - Массив полей для этой услуги
   */
  constructor({ key, label, fields }) {
    this.key = key;
    this.label = label;
    this.fields = fields;
  }
}

// Популярные марки и модели авто (можно расширять)
export const POPULAR_BRANDS = [
  'Toyota', 'BMW', 'Mercedes', 'Audi', 'Lexus', 'Volkswagen', 'Hyundai', 'Kia', 'Ford', 'Nissan',
];
export const POPULAR_MODELS = {
  Toyota: ['Camry', 'Land Cruiser', 'Corolla'],
  BMW: ['3 Series', '5 Series', 'X5'],
  Mercedes: ['E-Class', 'S-Class', 'GLC'],
  Audi: ['A4', 'Q5', 'A6'],
  Lexus: ['RX', 'ES', 'GX'],
  Volkswagen: ['Passat', 'Tiguan', 'Polo'],
  Hyundai: ['Solaris', 'Tucson', 'Creta'],
  Kia: ['Rio', 'Sportage', 'Ceed'],
  Ford: ['Focus', 'Kuga', 'Mondeo'],
  Nissan: ['Qashqai', 'X-Trail', 'Almera'],
};

// Материалы с миниатюрами (заглушки, заменить на реальные пути)
export const MATERIALS = [
  { value: 'Кожа', label: 'Кожа', img: '/src/assets/materials/leather.png' },
  { value: 'Алькантара', label: 'Алькантара', img: '/src/assets/materials/alcantara.png' },
  { value: 'Экокожа', label: 'Экокожа', img: '/src/assets/materials/eco-leather.png' },
  { value: 'Комбинированно', label: 'Комбинированно', img: '/src/assets/materials/combined.png' },
];

// Цвета (можно расширять)
export const COLORS = [
  'Черный', 'Бежевый', 'Коричневый', 'Красный', 'Серый', 'Синий', 'Белый', 'Другой',
];

// Описание услуг и их полей
export const SERVICES = [
  new ServiceConfig({
    key: 'peretyazhka',
    label: 'Перетяжка',
    fields: [
      new OrderField({ key: 'brand', label: 'Марка авто', type: 'select', required: true, options: POPULAR_BRANDS, allowCustom: true }),
      new OrderField({ key: 'model', label: 'Модель авто', type: 'select', required: true, options: [], allowCustom: true }),
      new OrderField({ key: 'workType', label: 'Тип работ', type: 'select', required: true, options: ['Сиденья', 'Руль', 'Потолок', 'Двери', 'Пол', 'Торпедо', 'Подлокотник', 'Комбинированно'] }),
      new OrderField({ key: 'material', label: 'Материал', type: 'carousel', required: true, options: MATERIALS }),
      new OrderField({ key: 'color', label: 'Цвет', type: 'select', required: false, options: COLORS, allowCustom: true }),
      new OrderField({ key: 'comment', label: 'Комментарий', type: 'textarea', required: false }),
      new OrderField({ key: 'name', label: 'Имя', type: 'text', required: true }),
      new OrderField({ key: 'phone', label: 'Телефон', type: 'phone', required: true }),
      new OrderField({ key: 'email', label: 'Email', type: 'email', required: false }),
    ],
  }),
  new ServiceConfig({
    key: 'tuning',
    label: 'Тюнинг',
    fields: [
      new OrderField({ key: 'brand', label: 'Марка авто', type: 'select', required: true, options: POPULAR_BRANDS, allowCustom: true }),
      new OrderField({ key: 'model', label: 'Модель авто', type: 'select', required: true, options: [], allowCustom: true }),
      new OrderField({ key: 'workType', label: 'Тип работ', type: 'select', required: true, options: ['Тюнинг салона', 'Детали интерьера', 'Панели', 'Комбинированно'] }),
      new OrderField({ key: 'material', label: 'Материал', type: 'carousel', required: false, options: MATERIALS }),
      new OrderField({ key: 'color', label: 'Цвет', type: 'select', required: false, options: COLORS, allowCustom: true }),
      new OrderField({ key: 'comment', label: 'Комментарий', type: 'textarea', required: false }),
      new OrderField({ key: 'name', label: 'Имя', type: 'text', required: true }),
      new OrderField({ key: 'phone', label: 'Телефон', type: 'phone', required: true }),
      new OrderField({ key: 'email', label: 'Email', type: 'email', required: false }),
    ],
  }),
  new ServiceConfig({
    key: 'restoration',
    label: 'Реставрация',
    fields: [
      new OrderField({ key: 'brand', label: 'Марка авто', type: 'select', required: true, options: POPULAR_BRANDS, allowCustom: true }),
      new OrderField({ key: 'model', label: 'Модель авто', type: 'select', required: true, options: [], allowCustom: true }),
      new OrderField({ key: 'workType', label: 'Тип работ', type: 'select', required: true, options: ['Восстановление кожи', 'Ремонт сидений', 'Пластик', 'Комбинированно'] }),
      new OrderField({ key: 'color', label: 'Цвет', type: 'select', required: false, options: COLORS, allowCustom: true }),
      new OrderField({ key: 'comment', label: 'Комментарий', type: 'textarea', required: false }),
      new OrderField({ key: 'name', label: 'Имя', type: 'text', required: true }),
      new OrderField({ key: 'phone', label: 'Телефон', type: 'phone', required: true }),
      new OrderField({ key: 'email', label: 'Email', type: 'email', required: false }),
    ],
  }),
  new ServiceConfig({
    key: 'sewing',
    label: 'Пошив',
    fields: [
      new OrderField({ key: 'brand', label: 'Марка авто', type: 'select', required: true, options: POPULAR_BRANDS, allowCustom: true }),
      new OrderField({ key: 'model', label: 'Модель авто', type: 'select', required: true, options: [], allowCustom: true }),
      new OrderField({ key: 'workType', label: 'Тип работ', type: 'select', required: true, options: ['Пошив чехлов', 'Пошив подлокотника', 'Пошив ковриков', 'Комбинированно'] }),
      new OrderField({ key: 'material', label: 'Материал', type: 'carousel', required: true, options: MATERIALS }),
      new OrderField({ key: 'color', label: 'Цвет', type: 'select', required: false, options: COLORS, allowCustom: true }),
      new OrderField({ key: 'comment', label: 'Комментарий', type: 'textarea', required: false }),
      new OrderField({ key: 'name', label: 'Имя', type: 'text', required: true }),
      new OrderField({ key: 'phone', label: 'Телефон', type: 'phone', required: true }),
      new OrderField({ key: 'email', label: 'Email', type: 'email', required: false }),
    ],
  }),
  new ServiceConfig({
    key: 'embroidery',
    label: 'Вышивка',
    fields: [
      new OrderField({ key: 'brand', label: 'Марка авто', type: 'select', required: true, options: POPULAR_BRANDS, allowCustom: true }),
      new OrderField({ key: 'model', label: 'Модель авто', type: 'select', required: true, options: [], allowCustom: true }),
      new OrderField({ key: 'workType', label: 'Тип работ', type: 'select', required: true, options: ['Вышивка логотипа', 'Декоративная вышивка', 'Именная вышивка', 'Комбинированно'] }),
      new OrderField({ key: 'color', label: 'Цвет', type: 'select', required: false, options: COLORS, allowCustom: true }),
      new OrderField({ key: 'comment', label: 'Комментарий', type: 'textarea', required: false }),
      new OrderField({ key: 'name', label: 'Имя', type: 'text', required: true }),
      new OrderField({ key: 'phone', label: 'Телефон', type: 'phone', required: true }),
      new OrderField({ key: 'email', label: 'Email', type: 'email', required: false }),
    ],
  }),
  new ServiceConfig({
    key: 'electronics',
    label: 'Автоэлектрика',
    fields: [
      new OrderField({ key: 'brand', label: 'Марка авто', type: 'select', required: true, options: POPULAR_BRANDS, allowCustom: true }),
      new OrderField({ key: 'model', label: 'Модель авто', type: 'select', required: true, options: [], allowCustom: true }),
      new OrderField({ key: 'workType', label: 'Тип работ', type: 'select', required: true, options: ['Установка подсветки', 'Установка USB', 'Мониторинг', 'Другое'] }),
      new OrderField({ key: 'comment', label: 'Комментарий', type: 'textarea', required: false }),
      new OrderField({ key: 'name', label: 'Имя', type: 'text', required: true }),
      new OrderField({ key: 'phone', label: 'Телефон', type: 'phone', required: true }),
      new OrderField({ key: 'email', label: 'Email', type: 'email', required: false }),
    ],
  }),
  new ServiceConfig({
    key: 'carpets',
    label: 'Ковры/органайзеры',
    fields: [
      new OrderField({ key: 'brand', label: 'Марка авто', type: 'select', required: true, options: POPULAR_BRANDS, allowCustom: true }),
      new OrderField({ key: 'model', label: 'Модель авто', type: 'select', required: true, options: [], allowCustom: true }),
      new OrderField({ key: 'workType', label: 'Тип работ', type: 'select', required: true, options: ['EVO ковры', '3D ковры', 'Органайзеры', 'Другое'] }),
      new OrderField({ key: 'material', label: 'Материал', type: 'carousel', required: false, options: MATERIALS }),
      new OrderField({ key: 'color', label: 'Цвет', type: 'select', required: false, options: COLORS, allowCustom: true }),
      new OrderField({ key: 'comment', label: 'Комментарий', type: 'textarea', required: false }),
      new OrderField({ key: 'name', label: 'Имя', type: 'text', required: true }),
      new OrderField({ key: 'phone', label: 'Телефон', type: 'phone', required: true }),
      new OrderField({ key: 'email', label: 'Email', type: 'email', required: false }),
    ],
  }),
]; 