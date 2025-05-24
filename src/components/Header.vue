<template>
  <header class="header">
    <div class="header__container">
      <div class="header__logo desktop-only">
        <span>Legion</span>
      </div>
      <div class="header__contacts">
        <button class="header__cta mobile-wide">Получить расчет</button>
      </div>
      <button class="header__burger" v-if="!menuOpen" @click="menuOpen = !menuOpen" :aria-label="menuOpen ? 'Закрыть меню' : 'Открыть меню'">
        <span :class="{ 'open': menuOpen }"></span>
        <span :class="{ 'open': menuOpen }"></span>
        <span :class="{ 'open': menuOpen }"></span>
      </button>
      <nav class="header__nav" :class="{ 'is-open': menuOpen }">
        <button class="header__close mobile-only" @click="menuOpen = false" aria-label="Закрыть меню">&times;</button>
        <ul>
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/services">Услуги</router-link></li>
          <li><router-link to="/portfolio">Портфолио</router-link></li>
          <li><router-link to="/prices">Прайс</router-link></li>
          <li><router-link to="/contacts">Контакты</router-link></li>
        </ul>
        <div class="header__menu-contacts mobile-only">
          <a href="tel:+78120000000" class="header__phone">+7 (812) 000-00-00</a>
        </div>
      </nav>
    </div>
    <ProgressBar />
  </header>
</template>

<script>
import ProgressBar from './ProgressBar.vue';

export default {
  name: 'Header',
  components: { ProgressBar },
  data() {
    return {
      menuOpen: false
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: background 0.3s, color 0.3s;
}
.header__container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  position: relative;
}
.header__logo span {
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--color-accent);
  letter-spacing: 2px;
  text-shadow: 0 2px 8px rgba(255,214,0,0.10);
  font-family: 'Manrope', 'Inter', 'Roboto', Arial, sans-serif;
}
.header__contacts {
  display: flex;
  align-items: center;
  gap: 1rem;
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
  margin-left: auto;
  margin-right: 0;
  z-index: 1100;
}
.header__burger span {
  display: block;
  height: 4px;
  width: 100%;
  background: #fff;
  margin: 4px 0;
  border-radius: 2px;
  transition: 0.3s;
}
.header__burger span.open:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.header__burger span.open:nth-child(2) {
  opacity: 0;
}
.header__burger span.open:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}
.header__nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  background: var(--color-bg);
  box-shadow: 0 2px 8px rgba(24,24,24,0.10);
  transform: translateY(-200%);
  transition: transform 0.3s;
  z-index: 1050;
}
.header__nav.is-open {
  transform: translateY(0);
}
.header__nav ul {
  display: flex;
  flex-direction: row;
  align-items: center;
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
.header__menu-contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem 0 1rem 0;
}
.header__phone {
  color: var(--color-text);
  font-weight: 700;
  text-decoration: none;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  text-align: center;
  margin: 0 auto;
  display: block;
}
.header__close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1200;
  width: 32px;
  height: 32px;
  line-height: 32px;
  padding: 0;
  box-shadow: none;
  background-color: transparent !important;
}
.desktop-only {
  display: block;
}
.mobile-only {
  display: none;
}
.mobile-wide {
  min-width: 0;
}
@media (max-width: 900px) {
  .header__container {
    flex-wrap: wrap;
  }
}
@media (max-width: 700px) {
  .header__container {
    padding: 0.25rem 0.5rem;
    min-height: 48px;
  }
  .header__logo {
    display: none;
  }
  .desktop-only {
    display: none !important;
  }
  .mobile-only {
    display: block !important;
  }
  .header__contacts {
    flex: 1;
    justify-content: flex-start;
    gap: 0.5rem;
  }
  .header__cta {
    flex: 1;
    min-width: 0;
    width: 100%;
    max-width: 220px;
    margin-right: 0.5rem;
  }
  .mobile-wide {
    width: 100%;
    max-width: 220px;
    margin-right: 0.5rem;
  }
  .header__burger {
    display: flex;
  }
  .header__nav ul {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 2.5rem 0 0 0;
  }
}
</style> 