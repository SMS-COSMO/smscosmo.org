<template>
  <div ref="container" :style="{ opacity: 0 }" class="relative top-0.5 left-0 w-full h-full">
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
</template>

<script setup lang="ts">
import { animate, stagger } from 'motion-v';

defineProps<{
  title1: string;
  title2: string;
  description: string;
}>();
const emit = defineEmits<{
  (e: 'onComplete'): void;
}>();

const container = ref<HTMLElement>();
const line1 = ref<HTMLElement>();
const line2 = ref<HTMLElement>();
const line3 = ref<HTMLElement>();
const imgBox1 = ref<HTMLElement>();

async function InitSequence() {
  const seq = [

    [container.value!, { opacity: 0, y: '100vh' }, { at: '0' }],
    [line1.value!, { opacity: 0, pathLength: 0 }, { at: '<' }],
    [line2.value!, { opacity: 0, pathLength: 0 }, { at: '<' }],
    [line3.value!, { opacity: 0, pathLength: 0 }, { at: '<' }],
    [imgBox1.value!, { opacity: 0, y: -200, scale: 0.4 }, { at: '<' }],
    ['.main-intro-text', { opacity: 0, x: -50 }, { at: '<' }],
    ['.minor-intro-text', { opacity: 0, y: 50 }, { at: '<' }],

  ];
  await animate(seq as any, { defaultTransition: { duration: 0.001 } });

  // console.log('Initialized');
}

async function runSequence() {
  const seq = [
    [container.value!, { opacity: [0, 1], y: ['100vh', 0] }, { duration: 1 }],

    [line1.value!, { opacity: [0, 1], pathLength: [0, 1] }, { duration: 0.5 }],
    [line2.value!, { opacity: [0, 1], pathLength: [0, 1] }, { duration: 0.5, at: '-0.3' }],
    [line3.value!, { opacity: [0, 1], pathLength: [0, 1] }, { duration: 0.5, at: '-0.3' }],

    [imgBox1.value!, { opacity: [0, 1], y: [-200, 0], scale: [0.4, 1] }, { duration: 1, at: '<' }],

    ['.main-intro-text', { opacity: [0, 1], x: [-50, 0] }, { duration: 0.4, delay: stagger(0.1), at: '+0.3', type: 'spring' }],

    ['.minor-intro-text', { opacity: [0, 1], y: [50, 0] }, { duration: 0.5, at: '+0.1', type: 'spring' }],

    [line1.value!, { opacity: [1, 0], pathLength: [1, 0] }, { duration: 0.5, at: '+3' }],
    [line2.value!, { opacity: [1, 0], pathLength: [1, 0] }, { duration: 0.5, at: '+0.4' }],
    [line3.value!, { opacity: [1, 0], pathLength: [1, 0] }, { duration: 0.5, at: '+0.3' }],
    [container.value!, { opacity: [1, 0], y: [0, '-50vh'] }, { duration: 1, at: '+0.05' }],
  ];

  await animate(seq as any);
  // console.log('Second sequence completed');
}

async function runAnimate() {
  await InitSequence();
  await runSequence();
  emit('onComplete');
}

onMounted(() => {
  runAnimate();
});
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
