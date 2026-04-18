<template>
  <AnimateHandler
    ref="handlerRef"
    :style="{ opacity: 0 }"
    class="relative top-0 left-0 w-full h-full"
    :init-sequence="(): AnimationSequence => [
      [rotateCircle, { opacity: 0, rotate: 0 }, { at: '0' }],
      [rotateCircle, { rotate: 0 }, { at: '0' }],
      ['.main-intro-text', { opacity: 0, x: -50 }, { at: '0' }],
      [imgBox1, { opacity: 0, y: -200, x: -100, scale: 0.8 }, { at: '0' }],
      ['.minor-intro-text', { opacity: 0, y: 50 }, { at: '0' }],
    ]"
    :enter-sequence="(): AnimationSequence => [
      [rotateCircle, { opacity: [0, 1], x: [-100, 0] }, { duration: 0.5, at: '+0.2' }],
      ['.main-intro-text', { opacity: [0, 1], x: [-50, 0] }, { duration: 0.4, delay: stagger(0.1), at: '+0.1' }],
      [imgBox1, { opacity: [0, 1], y: [-200, 0], x: [-100, -200], scale: [0.8, 1] }, { duration: 1, at: '+0' }],
      ['.minor-intro-text', { opacity: [0, 1], y: [50, 0] }, { duration: 0.5, at: '+1' }],
    ]"
    :exit-sequence="(): AnimationSequence => [
      ['.main-intro-text', { opacity: [1, 0], x: [0, -50] }, { duration: 0.2, at: '+0.3' }],
      [imgBox1, { opacity: [1, 0], y: [0, -200], x: [-200, -100], scale: [1, 0.8] }, { duration: 0.3, at: '+0.1' }],
      [rotateCircle, { opacity: [1, 0], x: [0, -100] }, { duration: 0.5, at: '+0' }],
      ['.minor-intro-text', { opacity: [1, 0], y: [0, 50] }, { duration: 0.2, at: '<' }],
      [{ opacity: [1, 0] }, { duration: 0.3, at: '+1' }],
    ]"
    :show-progress-bar="true"

    :enter-delay="3"
    :exit-delay="3"

    @init-complete="console.log('Init Complete')"
    @enter-start="() => {
      console.log('Enter Start')
      animate(rotateCircle!, { rotate: 360 }, { duration: 15, ease: 'linear', repeat: Infinity });
    }"
    @enter-complete="console.log('Enter Complete')"
    @exit-start="console.log('Exit Start')"
    @exit-complete="console.log('Exit Complete'); emit('onComplete')"
  >
    <div ref="rotateCircle" class="absolute -left-[30%] -top-[10%] w-96 h-96 border-6 border-dashed border-blue-300 rounded-full" />
    <h1 class="main-intro-text absolute left-[5%] top-[20%] w-80 h-auto">
      {{ title1 }}
    </h1>
    <h1 class="main-intro-text absolute left-[20%] top-[25%] w-80 h-auto">
      {{ title2 }}
    </h1>
    <div ref="imgBox1" class="absolute w-[95%] h-80 -z-100 left-[50%] top-[32%] bg-blue-100 rounded-3xl text-center">
      一个占位用的，以后存放图片
    </div>
    <span class="minor-intro-text absolute left-[5%] top-[70%] w-80 h-auto">
      {{ description }}
    </span>
  </AnimateHandler>
</template>

<script setup lang="ts">
import type { AnimationSequence } from 'motion-v';
import { animate, stagger } from 'motion-v';
import { useAnimationHandler } from '@/composables/useAnimationHandler';
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

const rotateCircle = ref<HTMLElement>();
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
