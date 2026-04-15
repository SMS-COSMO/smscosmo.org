<template>
  <AnimateHandler
    ref="handlerRef"
    :style="{ opacity: 0 }"
    class="relative top-0 left-0 w-full h-full"
    :init-sequence="(): AnimationSequence => [
      [imgBox1, { opacity: 0, y: -200, scale: 0.4 }, { at: '0' }],
      ['.main-intro-text', { opacity: 0, x: -50 }, { at: '0' }],
      ['.minor-intro-text', { opacity: 0, y: 50 }, { at: '0' }],
      [thirdLine, { opacity: 0, x: -100, strokeDashoffset: 1 }, { at: '0' }],
    ]"
    :enter-sequence="(): AnimationSequence => [
      [imgBox1, { opacity: [0, 1], y: [-200, 0], scale: [0.4, 1] }, { duration: 1, at: '+0.3' }],
      ['.main-intro-text', { opacity: [0, 1], x: [-50, 0] }, { duration: 0.3, delay: stagger(0.1), at: '+0.3', type: 'spring' }],
      ['.minor-intro-text', { opacity: [0, 1], y: [200, 0] }, { duration: 0.5, at: '+0.4', type: 'spring' }],
      [thirdLine, { opacity: [0, 1], x: [-100, 0] }, { duration: 1, at: '<' }],
    ]"
    :exit-sequence="(): AnimationSequence => [
      [thirdLine, { opacity: [1, 0], x: [0, 100] }, { duration: 1, at: '0.05' }],
      ['.main-intro-text', { opacity: [1, 0], x: [0, -50] }, { duration: 0.3, at: '+0.2' }],
      ['.minor-intro-text', { opacity: [1, 0], y: [0, 50] }, { duration: 0.3, at: '+0.1' }],
      [imgBox1, { opacity: [1, 0], y: [0, -200], scale: [1, 0.4] }, { duration: 0.4, at: '+0.2' }],
    ]"
    :exit-delay="10000"
    @init-complete="console.log('Init Complete')"
    @enter-start="() => {
      console.log('Enter Start')
      animate(thirdLine, { strokeDashoffset: [0, -15] }, { duration: 1, repeat: Infinity, ease: 'linear' });
    }"
    @enter-complete="console.log('Enter Complete')"
    @exit-start="console.log('Exit Start')"
    @exit-complete="console.log('Exit Complete'); emit('onComplete')"
  >
    <div ref="container" class="w-full h-full flex items-center justify-center">
      <h1 class="main-intro-text absolute left-[5%] top-[10%] z-10">
        {{ title1 }}
      </h1>
      <h1 class="main-intro-text absolute left-[15%] top-[15%] z-10">
        {{ title2 }}
      </h1>
      <span class="minor-intro-text absolute left-[5%] top-[20%] z-10">
        {{ description }}
      </span>
      <svg
        class="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line
          ref="thirdLine"
          x1="0"
          y1="38%"
          x2="100%"
          y2="38%"
          stroke="#95d1f9"
          stroke-width="0.5"
          stroke-dasharray="1 2"
        />
      </svg>
      <div ref="imgBox1" class="absolute w-[95%] h-90 z-1 left-[2%] top-[40%] bg-blue-200 rounded-3xl text-center">
        一个占位用的，以后存放图片
      </div>
    </div>
  </AnimateHandler>
</template>

<script setup lang="ts">
import type { AnimationSequence } from 'motion-v';
import { animate, stagger } from 'motion-v';
import { useAnimationHandler } from '~/composables/useAnimationHandler';
import AnimateHandler from './AnimateHandler.vue';

defineProps<{
  title1: string;
  title2: string;
  description: string;
}>();
const emit = defineEmits<{
  (e: 'onComplete'): void;
}>();

const { handlerRef, expose } = useAnimationHandler();
const container = ref<HTMLElement>();
const imgBox1 = ref<HTMLElement>();
const thirdLine = ref<HTMLElement>();

defineExpose(expose);
</script>

<!-- cosmo-only-tailwind-disable -->
<style scoped>
.main-intro-text {
  font-size: 2.25rem;
  font-weight: bold;
}
.minor-intro-text {
  font-size: 1rem;
}
</style>
