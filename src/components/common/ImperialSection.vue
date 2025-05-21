<template>
  <section class="imperial-section" ref="sectionRef" :class="{ 'is-lit': isInView }">
    <ImperialLampLine :is-active="isInView" class="imperial-section__lamp" :width="lampWidth" :border-radius="lampRadius" @activated="onLampActivated" />
    <div class="imperial-section__content">
      <div class="section-inner">
        <h2 v-if="title" class="imperial-section__title" :data-text="title">{{ title }}</h2>
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  onMounted,
  onUnmounted,
  ref,
} from 'vue';

import ImperialLampLine from './ImperialLampLine.vue';

defineProps({
  title: {
    type: String,
    required: false
  },
  lampWidth: {
    type: String,
    default: '100%'
  },
  lampRadius: {
    type: String,
    default: '0'
  }
})

const isInView = ref(false)
const sectionRef = ref(null)
let observer = null

function onLampActivated() {}

onMounted(() => {
  observer = new window.IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !isInView.value) {
        isInView.value = true
      }
    },
    { threshold: 0.2 }
  )
  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  if (sectionRef.value && observer) {
    observer.unobserve(sectionRef.value)
  }
})
</script>

<style scoped>
</style> 