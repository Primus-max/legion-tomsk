<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo">
        <span>Legion</span>
      </div>
      <nav class="header__nav" :class="{ 'is-open': menuOpen }">
        <ul>
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/services">Услуги</router-link></li>
          <li><router-link to="/portfolio">Портфолио</router-link></li>
          <li><router-link to="/prices">Прайс</router-link></li>
          <li><router-link to="/reviews">Отзывы</router-link></li>
          <li><router-link to="/contacts">Контакты</router-link></li>
        </ul>
      </nav>
      <div class="header__contacts">
        <a href="tel:+78120000000" class="header__phone">+7 (812) 000-00-00</a>
        <button class="header__cta">Получить расчет</button>
        <button class="header__theme" @click="toggleTheme" :aria-label="theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'">
          <span v-if="theme === 'light'">🌙</span>
          <span v-else>☀️</span>
        </button>
        <button class="header__burger" @click="menuOpen = !menuOpen" aria-label="Открыть меню">
          <span :class="{ 'open': menuOpen }"></span>
          <span :class="{ 'open': menuOpen }"></span>
          <span :class="{ 'open': menuOpen }"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      menuOpen: false,
      theme: localStorage.getItem('theme') || 'light',
    }
  },
  mounted() {
    document.documentElement.setAttribute('data-theme', this.theme);
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', this.theme);
      localStorage.setItem('theme', this.theme);
    }
  },
  watch: {
    $route() {
      this.menuOpen = false;
    }
  }
}
</script>

<style scoped>
.header {
  background: var(--color-bg);
  box-shadow: 0 2px 8px rgba(24,24,24,0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 2px solid var(--color-accent);
  transition: background 0.3s, color 0.3s;
}
.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem 1rem;
}
.header__logo span {
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--color-accent);
  letter-spacing: 2px;
  text-shadow: 0 2px 8px rgba(255,214,0,0.10);
  font-family: 'Manrope', 'Inter', 'Roboto', Arial, sans-serif;
}
.header__nav ul {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.header__nav a {
  color: var(--color-text);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
  font-size: 1.08rem;
  letter-spacing: 0.5px;
}
.header__nav a.router-link-exact-active {
  color: var(--color-accent);
}
.header__contacts {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.header__phone {
  color: var(--color-text);
  font-weight: 700;
  text-decoration: none;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
}
.header__cta {
  background: var(--color-accent);
  color: var(--color-bg);
  border: none;
  border-radius: 6px;
  padding: 0.5em 1.2em;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(255,214,0,0.10);
  transition: background 0.2s, box-shadow 0.2s, color 0.2s;
}
.header__cta:hover {
  background: var(--color-accent-dark);
  color: var(--color-bg);
  box-shadow: 0 6px 24px rgba(255,214,0,0.18);
}
.header__theme {
  background: none;
  border: none;
  font-size: 1.6rem;
  margin-left: 0.5rem;
  cursor: pointer;
  color: var(--color-accent);
  transition: color 0.2s;
  outline: none;
  padding: 0 0.2em;
}
.header__theme:hover {
  color: var(--color-accent-dark);
}
.header__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 1rem;
}
.header__burger span {
  display: block;
  height: 4px;
  width: 100%;
  background: var(--color-accent);
  margin: 4px 0;
  border-radius: 2px;
  transition: 0.3s;
}
@media (max-width: 900px) {
  .header__container {
    flex-wrap: wrap;
  }
  .header__nav ul {
    gap: 1rem;
  }
}
@media (max-width: 700px) {
  .header__nav {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100vw;
    background: var(--color-bg);
    box-shadow: 0 2px 8px rgba(24,24,24,0.10);
    transform: translateY(-200%);
    transition: transform 0.3s;
    z-index: 99;
  }
  .header__nav.is-open {
    transform: translateY(0);
  }
  .header__nav ul {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem 0;
  }
  .header__burger {
    display: flex;
  }
  .header__contacts {
    gap: 0.5rem;
  }
}
</style> 