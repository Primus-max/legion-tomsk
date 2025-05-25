<template>
  <footer class="footer-section" aria-label="Контакты">
    <div class="footer-section__container">
      <h2 class="footer-section__title">Контакты</h2>
      <div class="footer-section__content">
        <div class="footer-section__info">
          <button class="footer-section__cta">Рассчитать</button>
          <a class="footer-section__contact" href="tel:+78120000000">
            <span class="footer-section__icon">📞</span>
            +7 (812) 000-00-00
          </a>
          <a class="footer-section__contact" href="mailto:info@legion-tomsk.ru">
            <span class="footer-section__icon">✉️</span>
            info@legion-tomsk.ru
          </a>
          <address class="footer-section__address">
            <span class="footer-section__icon">📍</span>
            г. Томск, ул. Примерная, 1
          </address>
          <div class="footer-section__socials">
            <a href="#" class="footer-section__social" aria-label="VK" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.97 17.5c-5.2 0-8.1-3.6-8.22-9.6h2.74c.08 4.3 1.97 6.1 3.47 6.4V7.9h2.2v3.1c1.48-.16 3.04-1.8 3.56-3.1h2.6c-.41 1.8-2.1 3.4-2.98 3.9.88.3 2.7 1.5 3.36 3.9h-2.9c-.5-1.5-1.74-2.6-3.1-2.7v2.7c1.36.1 2.6 1.2 3.1 2.7h-2.7z"/></svg>
            </a>
            <a href="#" class="footer-section__social" aria-label="Telegram" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.04 16.56c-.36 0-.3-.14-.42-.48l-1.05-3.46 8.1-5.1c.37-.22.57-.1.46.35l-1.38 6.53c-.1.44-.36.55-.73.34l-2.03-1.5-1 .97c-.1.1-.18.18-.36.18zm-2.1-4.1l3.2 1.2 1.3-1.2c.13-.12.24-.23.5-.23.13 0 .28.04.44.13l2.1 1.5 1.2-5.7-8.74 5.3z"/></svg>
            </a>
            <a href="#" class="footer-section__social" aria-label="WhatsApp" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.472-.148-.67.15-.197.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.363.71.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
            </a>
          </div>
        </div>
        <div class="footer-section__map-wrap">
          <div class="footer-section__map" aria-label="Карта">
            <iframe
              class="footer-section__yandex-map"
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A1b2e3c4d5e6f7a8b9c0d1e2f3a4b5c6d&amp;source=constructor"
              width="100%" height="220" frameborder="0" allowfullscreen title="Карта проезда"></iframe>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Можно добавить обработчик для кнопки 'Рассчитать' через emit или router
</script>

<style lang="scss" scoped>
.footer-section {
  width: 100%;
  background: linear-gradient(120deg, #181818 80%, #232323 100%);
  border-radius: 32px 32px 0 0;
  box-shadow: 0 -8px 48px #000a, 0 0 0 2px #ffd60022;
  margin: 64px auto 0 auto;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.footer-section__container {
  width: 100%;
  max-width: 1200px;
  padding: 48px 32px 32px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.footer-section__title {
  font-size: clamp(2rem, 4vw, 2.3rem);
  font-weight: 900;
  color: #fff;
  text-align: center;
  margin-bottom: 32px;
  letter-spacing: 0.04em;
  text-shadow: 0 4px 24px #ffd60088, 0 2px 8px #fff2;
  text-transform: uppercase;
}
.footer-section__content {
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 100%;
  justify-content: space-between;
  min-height: 0;
  height: 100%;
  align-items: stretch;
}
.footer-section__info {
  display: flex;
  flex-direction: column;
  gap: 22px;
  min-width: 260px;
  max-width: 340px;
}
.footer-section__cta {
  background: linear-gradient(90deg, #ffd600 60%, #fff700 100%);
  color: #181818;
  font-weight: 900;
  font-size: 1.13rem;
  border: none;
  border-radius: 12px;
  padding: 14px 32px;
  box-shadow: 0 2px 18px #ffd60055, 0 0 0 2px #ffd600cc;
  cursor: pointer;
  transition: box-shadow 0.2s, background 0.2s;
  margin-bottom: 8px;
  &:hover {
    box-shadow: 0 4px 32px #ffd60099, 0 0 0 2.5px #ffd600cc;
    background: linear-gradient(90deg, #fff700 80%, #ffd600 100%);
  }
}
.footer-section__contact, .footer-section__address {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
  font-size: 1.09rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
  &:hover {
    color: #ffd600;
  }
}
.footer-section__icon {
  font-size: 1.25em;
  color: #ffd600;
  filter: drop-shadow(0 0 6px #ffd60088);
}
.footer-section__socials {
  display: flex;
  gap: 18px;
  margin-top: 8px;
}
.footer-section__social {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #232323;
  box-shadow: 0 2px 12px #ffd60033, 0 0 0 2px #ffd60033;
  transition: box-shadow 0.2s, background 0.2s;
  svg {
    width: 22px;
    height: 22px;
    fill: #ffd600;
    filter: drop-shadow(0 0 6px #ffd60088);
  }
  &:hover {
    background: #ffd600;
    box-shadow: 0 4px 24px #ffd60099, 0 0 0 2.5px #ffd600cc;
    svg {
      fill: #181818;
      filter: none;
    }
  }
}
.footer-section__map-wrap {
  flex: 1 1 auto;
  min-width: 0;
  max-width: 100vw;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  min-height: 0;
  height: 100%;
}
.footer-section__map {
  width: 100%;
  min-height: 0;
  height: 100%;
  background: #181818;
  border-radius: 18px;
  box-shadow: 0 2px 24px #ffd60022, 0 0 0 2px #ffd60033;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  overflow: hidden;
  position: relative;
}
.footer-section__yandex-map {
  width: 100%;
  height: 100%;
  display: block;
}
.footer-section__map-placeholder {
  color: #ffd60099;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
}
@media (min-width: 901px) {
  .footer-section__content {
    flex-direction: row;
    align-items: stretch;
    gap: 48px;
    height: auto;
  }
  .footer-section__info {
    min-width: 260px;
    max-width: 340px;
  }
  .footer-section__map-wrap {
    max-width: 520px;
    min-width: 220px;
    height: 100%;
    align-items: stretch;
    justify-content: stretch;
  }
  .footer-section__map {
    min-height: 220px;
    height: 100%;
  }
  .footer-section__yandex-map {
    min-height: 220px;
    height: 100%;
  }
}
@media (max-width: 900px) {
  .footer-section__content {
    flex-direction: column;
    gap: 32px;
    align-items: center;
    min-height: 0;
    height: 100%;
  }
  .footer-section__map-wrap {
    max-width: 100vw;
    width: 100%;
    min-height: 0;
    height: auto;
  }
  .footer-section__map {
    min-height: 180px;
    height: 180px;
  }
  .footer-section__yandex-map {
    min-height: 180px;
    height: 180px;
  }
}
@media (max-width: 700px) {
  .footer-section {
    border-radius: 18px 18px 0 0;
    margin: 36px auto 0 auto;
    padding: 0;
  }
  .footer-section__container {
    padding: 32px 6vw 18px 6vw;
  }
  .footer-section__title {
    font-size: 1.25rem;
    margin-bottom: 22px;
  }
  .footer-section__info {
    min-width: 0;
    max-width: 100vw;
    gap: 16px;
  }
  .footer-section__cta {
    width: 100%;
    padding: 12px 0;
    font-size: 1.05rem;
  }
  .footer-section__map {
    min-height: 140px;
    height: 140px;
    border-radius: 12px;
  }
  .footer-section__yandex-map {
    min-height: 140px;
    height: 140px;
  }
  .footer-section__socials {
    gap: 12px;
  }
  .footer-section__social {
    width: 32px;
    height: 32px;
    svg {
      width: 18px;
      height: 18px;
    }
  }
}
</style> 