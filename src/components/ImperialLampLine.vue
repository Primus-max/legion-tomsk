<template>
  <div class="imperial-lamp-wrapper">
    <div
      class="imperial-lamp-line"
      :style="{
        '--lamp-height': height,
        '--lamp-radius': borderRadius,
        width: width
      }"
    />
    <div class="imperial-lamp-glow" />
  </div>
</template>

<script setup>
const props = defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: '6px' },
  borderRadius: { type: String, default: '2px' }
})
</script>

<style scoped>
.imperial-lamp-wrapper {
  position: relative;
  width: 100%;
}

.imperial-lamp-line {
  display: block;
  height: var(--lamp-height);
  border-radius: var(--lamp-radius);
  background: #ffffff;
  box-shadow: 
    0 0 10px #ffffff,
    0 0 20px #ffd600,
    0 0 30px #ffd60066;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  opacity: 0;
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