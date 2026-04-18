<template>
  <AnimateHandler
    ref="handlerRef"
    :style="{ opacity: 0 }"
    class="relative top-0 left-0 w-full h-full"
    :init-sequence="(): AnimationSequence => [
      [line1, { opacity: 0, pathLength: 0 }, { at: '0' }],
      [line2, { opacity: 0, pathLength: 0 }, { at: '0' }],
      [line3, { opacity: 0, pathLength: 0 }, { at: '0' }],
      [imgBox1, { opacity: 0, y: -200, scale: 0.4 }, { at: '0' }],
      ['.main-intro-text', { opacity: 0, x: -50 }, { at: '0' }],
      ['.minor-intro-text', { opacity: 0, y: 50 }, { at: '0' }],
    ]"
    :enter-sequence="(): AnimationSequence => [
      [line1, { opacity: [0, 1], pathLength: [0, 1] }, { duration: 0.5 }],
      [line2, { opacity: [0, 1], pathLength: [0, 1] }, { duration: 0.5, at: '-0.3' }],
      [line3, { opacity: [0, 1], pathLength: [0, 1] }, { duration: 0.5, at: '-0.3' }],
      [imgBox1, { opacity: [0, 1], y: [-200, 0], scale: [0.4, 1] }, { duration: 1, at: '<' }],
      ['.main-intro-text', { opacity: [0, 1], x: [-50, 0] }, { duration: 0.4, delay: stagger(0.1), at: '+0.3', type: 'spring' }],
      ['.minor-intro-text', { opacity: [0, 1], y: [50, 0] }, { duration: 0.5, at: '+0.1', type: 'spring' }],
    ]"
    :exit-sequence="(): AnimationSequence => [
      [line1, { opacity: [1, 0], pathLength: [1, 0] }, { duration: 0.5, at: '+0' }],
      [line2, { opacity: [1, 0], pathLength: [1, 0] }, { duration: 0.5, at: '+0.1' }],
      [line3, { opacity: [1, 0], pathLength: [1, 0] }, { duration: 0.5, at: '+0.2' }],
      ['.main-intro-text', { opacity: [1, 0], x: [0, -50] }, { duration: 0.3, at: '+0.3' }],
      [imgBox1, { opacity: [1, 0], y: [0, -200], scale: [1, 0.4] }, { duration: 0.3, at: '+0.1' }],
      ['.minor-intro-text', { opacity: [1, 0], y: [0, 50] }, { duration: 0.3, at: '+0.2' }],
    ]"
    :enter-duration="2"
    :exit-duration="1"
    @init-complete="console.log('Init Complete')"
    @enter-start="() => console.log('Enter Start')"
    @enter-complete="console.log('Enter Complete')"
    @exit-start="console.log('Exit Start')"
    @exit-complete="console.log('Exit Complete'); emit('onComplete')"
  >
    <div class="relative top-0.5 left-0 w-full h-full">
      <svg
        class="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref="line1"
          d="M -10 30 L 110 0"
          stroke="#95d1f9"
          stroke-width="12"
          fill="none"
        />
        <path
          ref="line2"
          d="M -10 50 L 110 20"
          stroke="#95d1f9"
          stroke-width="12"
          fill="none"
        />
        <path
          ref="line3"
          d="M -10 80 L 110 50"
          stroke="#95d1f9"
          stroke-width="12"
          fill="none"
        />
      </svg>
      <h1 class="main-intro-text absolute left-[5%] top-[60%] z-10">
        {{ title1 }}
      </h1>
      <h1 class="main-intro-text absolute left-[20%] top-[65%] z-10">
        {{ title2 }}
      </h1>
      <div ref="imgBox1" class="absolute w-[95%] h-90 z-1 left-[2%] top-[20%] bg-blue-200 rounded-3xl text-center">
        一个占位用的，以后存放图片
      </div>
      <span class="minor-intro-text absolute left-[5%] top-[71%] z-10">
        {{ description }}
      </span>
    </div>
  </AnimateHandler>
</template>

<script setup lang="ts">
import type { AnimationSequence } from 'motion-v';
import { stagger } from 'motion-v';
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
const line1 = ref<HTMLElement>();
const line2 = ref<HTMLElement>();
const line3 = ref<HTMLElement>();
const imgBox1 = ref<HTMLElement>();

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
