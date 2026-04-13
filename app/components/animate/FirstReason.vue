<template>
  <div ref="container" :style="{ opacity: 0 }" class="relative top-0 left-0 w-full h-full">
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
const rotateCircle = ref<HTMLElement>();
const imgBox1 = ref<HTMLElement>();

async function InitSequence() {
  const seq = [
    [container.value!, { opacity: 0, y: '100vh' }, { at: '0' }],
    [rotateCircle.value!, { opacity: 0, rotate: 0 }, { at: '<' }],
    [rotateCircle.value!, { rotate: 0 }, { at: '<' }],
    ['.main-intro-text-1', { opacity: 0, x: -50 }, { at: '<' }],
    [imgBox1.value!, { opacity: 0, y: -200, x: -100, scale: 0.8 }, { at: '<' }],
    ['.minor-intro-text-1', { opacity: 0, y: 50 }, { at: '<' }],
  ];
  await animate(seq as any, { defaultTransition: { duration: 0.001 } });

  // console.log('Initialized');
}

async function runSequence() {
  animate(rotateCircle.value!, { rotate: 360 }, { duration: 15, ease: 'linear', repeat: Infinity });
  const seq = [

    [container.value!, { opacity: [0, 1], y: ['100vh', 0] }, { duration: 1 }],

    [rotateCircle.value!, { opacity: [0, 1] }, { duration: 0.1, at: '+0.3' }],

    ['.main-intro-text', { opacity: [0, 1], x: [-50, 0] }, { duration: 0.4, delay: stagger(0.1), at: '+0.3' }],

    [imgBox1.value!, { opacity: [0, 1], y: [-200, 0], x: [-100, -200], scale: [0.8, 1] }, { duration: 1, at: '<' }],

    ['.minor-intro-text', { opacity: [0, 1], y: [50, 0] }, { duration: 0.5, at: '+0.1' }],

    [container.value!, { opacity: [1, 0], y: [0, '-50vh'] }, { duration: 1, at: '+2' }],
  ];

  await animate(seq as any);
  // console.log('First sequence completed');
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
