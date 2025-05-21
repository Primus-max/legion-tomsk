<template>
  <div
    class="imperial-lamp-line"
    :style="{
      '--lamp-height': height,
      '--lamp-glow': glow,
      '--lamp-gradient': gradient,
      '--lamp-radius': borderRadius,
      width: width
    }"
  />
</template>

<script setup>
const props = defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: '6px' },
  glow: { type: String, default: '0 8px 32px 0 #FFD600cc' },
  gradient: { type: String, default: 'linear-gradient(90deg, #FFD600 30%, #fff 100%)' },
  borderRadius: { type: String, default: '2px' }
})
</script>

<style scoped>
.imperial-lamp-line {
  display: block;
  height: var(--lamp-height);
  border-radius: var(--lamp-radius);
  background: var(--lamp-gradient);
  box-shadow: var(--lamp-glow);
  margin: 0 auto;
  position: relative;
  z-index: 2;
  background-size: 200% 100%;
  animation: lamp-gradient-move 3s linear infinite alternate;
}

@keyframes lamp-gradient-move {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}
</style> 