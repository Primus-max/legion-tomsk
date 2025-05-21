<template>
  <section class="imperial-section">
    <ImperialLampLine class="imperial-section__lamp" @activated="onLampActivated" />
    <transition name="imperial-fade">
      <div v-if="contentVisible" class="imperial-section__content">
        <h2 v-if="title" class="imperial-section__title" :data-text="title">{{ title }}</h2>
        <slot />
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref } from 'vue';

import ImperialLampLine from './ImperialLampLine.vue';

defineProps({
  title: {
    type: String,
    required: false
  }
})

const contentVisible = ref(false)
function onLampActivated() {
  setTimeout(() => { contentVisible.value = true }, 600)
}
</script>

<style scoped>
.imperial-section {
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  overflow: visible;
}

.imperial-section__lamp {
  position: relative;
  width: 100%;
  z-index: 2;
}

.imperial-section__content {
  position: relative;
  z-index: 1;
  padding-top: 64px;
}

.imperial-section__title {
  font-size: clamp(2.2rem, 6vw, 3.5rem);
  font-weight: 900;
  text-align: center;
  background: linear-gradient(90deg, #fff 40%, #ffd600 60%, #fff 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  text-shadow: 0 4px 24px #ffd60055;
  filter: drop-shadow(0 2px 8px #ffd60044);
  animation: title-glow 3s ease-in-out infinite alternate, title-gradient-move 4s linear infinite alternate;
  margin: 0 0 48px 0;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.imperial-section__title::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: transparent;
  text-shadow: 0 0 20px #ffd60066;
  animation: title-glow 2s ease-in-out infinite alternate;
}

@keyframes title-gradient-move {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

@keyframes title-glow {
  from {
    text-shadow: 0 0 20px #ffd60022, 0 0 40px #ffd60011;
  }
  to {
    text-shadow: 0 0 25px #ffd60044, 0 0 50px #ffd60022;
  }
}

.imperial-fade-enter-active, .imperial-fade-leave-active {
  transition: opacity 0.7s cubic-bezier(.4,1.4,.6,1);
}
.imperial-fade-enter-from, .imperial-fade-leave-to {
  opacity: 0;
}
.imperial-fade-enter-to, .imperial-fade-leave-from {
  opacity: 1;
}
</style> 