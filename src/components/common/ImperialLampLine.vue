<script setup>
import {
  defineEmits,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue';

const props = defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: '6px' },
  borderRadius: { type: String, default: '2px' },
  isActive: { type: Boolean, default: false }
})

const emits = defineEmits(['activated', 'animation-end'])
const lampRef = ref(null)
const isActiveInternal = ref(false)
let observer = null

watch(() => props.isActive, (val) => {
  if (val && !isActiveInternal.value) {
    isActiveInternal.value = true
    emits('activated')
  }
})

onMounted(() => {
  observer = new window.IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !isActiveInternal.value) {
        isActiveInternal.value = true
        emits('activated')
      }
    },
    { threshold: 0.3 }
  )
  if (lampRef.value) {
    observer.observe(lampRef.value)
  }
})

onUnmounted(() => {
  if (lampRef.value && observer) {
    observer.unobserve(lampRef.value)
  }
})

function onLampAnimationEnd(e) {
  if (e.animationName === 'lamp-turn-on') {
    emits('animation-end')
  }
}
</script>

<template>
  <div class="imperial-lamp-wrapper" ref="lampRef">
    <div
      class="imperial-lamp-line"
      :class="{ active: isActiveInternal }"
      :style="{
        '--lamp-height': height,
        '--lamp-radius': borderRadius,
        width: width
      }"
      @animationend="onLampAnimationEnd"
    />
    <div class="imperial-lamp-glow" :class="{ active: isActiveInternal }" />
  </div>
</template>

<style scoped>
.imperial-lamp-wrapper {
  position: relative;
  width: 100%;
  min-height: var(--lamp-height, 6px);
}

.imperial-lamp-line {
  display: block;
  height: var(--lamp-height);
  border-radius: var(--lamp-radius);
  background: #ffffff;
  box-shadow: none;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  opacity: 1;
  transition: box-shadow 0.2s;
}
.imperial-lamp-line.active {
  animation: lamp-turn-on 2.5s ease-out forwards;
}

.imperial-lamp-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background: radial-gradient(
    ellipse at top,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 214, 0, 0.1) 40%,
    transparent 100%
  );
  filter: blur(15px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}
.imperial-lamp-glow.active {
  opacity: 1;
  animation: glow-turn-on 2.5s ease-out forwards;
}

@keyframes lamp-turn-on {
  0% {
    opacity: 0;
    box-shadow: none;
  }
  10% {
    opacity: 1;
    box-shadow: 
      0 0 10px #ffffff,
      0 0 20px #ffd600,
      0 0 30px #ffd60066;
  }
  15% {
    opacity: 0.4;
    box-shadow: 
      0 0 5px #ffffff88,
      0 0 10px #ffd60088;
  }
  20% {
    opacity: 1;
    box-shadow: 
      0 0 10px #ffffff,
      0 0 20px #ffd600,
      0 0 30px #ffd60066;
  }
  30% {
    opacity: 0.4;
    box-shadow: 
      0 0 5px #ffffff88,
      0 0 10px #ffd60088;
  }
  35% {
    opacity: 1;
    box-shadow: 
      0 0 10px #ffffff,
      0 0 20px #ffd600,
      0 0 30px #ffd60066;
  }
  100% {
    opacity: 1;
    box-shadow: 
      0 0 10px #ffffff,
      0 0 20px #ffd600,
      0 0 30px #ffd60066;
  }
}

@keyframes glow-turn-on {
  0% {
    opacity: 0;
    filter: blur(15px);
  }
  10% {
    opacity: 0.7;
  }
  15% {
    opacity: 0.2;
  }
  20% {
    opacity: 0.8;
  }
  30% {
    opacity: 0.2;
  }
  35% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
    filter: blur(15px);
  }
}
</style> 