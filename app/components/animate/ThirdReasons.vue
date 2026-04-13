<template>
  <div ref="container" :style="{ opacity: 0 }" class="w-full h-full flex items-center justify-center">
    <h1 class="main-intro-text absolute left-[5%] top-[10%] z-10">
      {{ title1 }}
    </h1>
    <h1 class="main-intro-text absolute left-[30%] top-[15%] z-10">
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
const imgBox1 = ref<HTMLElement>();
const thirdLine = ref<HTMLElement>();

async function InitSequence() {
  const seq = [
    [container.value!, { opacity: 0, y: '100vh' }, { at: '0' }],
    [imgBox1.value!, { opacity: 0, y: -200, scale: 0.4 }, { at: '<' }],
    ['.main-intro-text', { opacity: 0, x: -50 }, { at: '<' }],
    ['.minor-intro-text', { opacity: 0, y: 50 }, { at: '<' }],
    [thirdLine.value!, { opacity: 0, strokeDashoffset: 1, x: -100 }, { at: '<' }],
  ];
  await animate(seq as any, { defaultTransition: { duration: 0.001 } });

  // console.log('Initialized');
}

async function runSequence() {
  const seq = [
    [container.value!, { opacity: [0, 1], y: ['100vh', 0] }, { duration: 1 }],

    [imgBox1.value!, { opacity: [0, 1], y: [-200, 0], scale: [0.4, 1] }, { duration: 1, at: '+0.3' }],

    ['.main-intro-text', { opacity: [0, 1], x: [-50, 0] }, { duration: 0.3, delay: stagger(0.1), at: '+0.3', type: 'spring' }],

    ['.minor-intro-text', { opacity: [0, 1], y: [200, 0] }, { duration: 0.5, at: '+0.4', type: 'spring' }],

    [thirdLine.value!, { opacity: [0, 1], x: [-100, 0] }, { duration: 1, at: '<' }],
    [thirdLine.value!, { strokeDashoffset: [0, -15] }, { duration: 1, at: '-0.05', repeat: 10, ease: 'linear' }],

    [thirdLine.value!, { opacity: [1, 0], x: [0, 100] }, { duration: 1, at: '-0.05' }],

    [container.value!, { opacity: [1, 0], y: [0, '-50vh'] }, { duration: 1, at: '+2' }],
  ];
  await animate(seq as any);
  // console.log('Third sequence completed');
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
