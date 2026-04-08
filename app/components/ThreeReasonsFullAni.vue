<template>
  <div v-if="stage <= 1" ref="container1" :style="{ opacity: 0 }" class="relative top-0 left-0 w-full h-full">
    <div ref="rotateCircle" class="absolute -left-[30%] -top-[10%] w-96 h-96 border-6 border-dashed border-blue-300 rounded-full" />
    <h1 class="main-intro-text-1 absolute left-[5%] top-[20%] w-80 h-auto">
      第一个原因
    </h1>
    <h1 class="main-intro-text-1 absolute left-[20%] top-[25%] w-80 h-auto">
      的占位符
    </h1>
    <div ref="imgBoxFirst1" class="absolute w-[95%] h-80 -z-100 left-[50%] top-[32%] bg-blue-100 rounded-3xl text-center">
      一个占位用的，以后存放图片
    </div>
    <span class="minor-intro-text-1 absolute left-[5%] top-[70%] w-80 h-auto">
      占位的文字,这里应该放点介绍
    </span>
  </div>

  <!-- 第二阶段 -->
  <div v-if="stage <= 2" ref="container2" class="relative top-0.5 left-0 w-full h-full">
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
    <h1 class="main-intro-text-2 absolute left-[5%] top-[60%] z-10">
      第二个原因
    </h1>
    <h1 class="main-intro-text-2 absolute left-[20%] top-[65%] z-10">
      的占位符
    </h1>
    <div ref="imgBoxSecond1" class="absolute w-[95%] h-90 z-1 left-[2%] top-[20%] bg-blue-200 rounded-3xl text-center">
      一个占位用的，以后存放图片
    </div>
    <span class="minor-intro-text-2 absolute left-[5%] top-[71%] z-10">
      占位的文字,这里应该放点介绍
    </span>
  </div>

  <div v-if="stage <= 3" ref="container3" class="w-full h-full flex items-center justify-center">
    <h1 class="main-intro-text-3 absolute left-[5%] top-[10%] z-10">
      第三个原因
    </h1>
    <h1 class="main-intro-text-3 absolute left-[30%] top-[15%] z-10">
      的占位符
    </h1>
    <span class="minor-intro-text-3 absolute left-[5%] top-[20%] z-10">
      占位的文字,这里应该放点介绍
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
    <div ref="imgBoxThird1" class="absolute w-[95%] h-90 z-1 left-[2%] top-[40%] bg-blue-200 rounded-3xl text-center">
      一个占位用的，以后存放图片
    </div>
  </div>
</template>

<script setup lang="ts">
import { animate, stagger } from 'motion-v';

defineProps<{
  start: boolean;
}>();
const emit = defineEmits<{
  (e: 'onComplete'): void;
}>();

const container1 = ref<HTMLElement>();
const rotateCircle = ref<HTMLElement>();
const imgBoxFirst1 = ref<HTMLElement>();

const container2 = ref<HTMLElement>();
const line1 = ref<HTMLElement>();
const line2 = ref<HTMLElement>();
const line3 = ref<HTMLElement>();
const imgBoxSecond1 = ref<HTMLElement>();

const container3 = ref<HTMLElement>();
const imgBoxThird1 = ref<HTMLElement>();
const thirdLine = ref<HTMLElement>();
const stage = ref(0);

async function InitAnimate() {
  const seq = [
    [container3.value!, { opacity: 0, y: '50vh' }, { duration: 0.01 }],
    [imgBoxThird1.value!, { opacity: 0, y: -200, scale: 0.4 }, { duration: 0.01 }],
    ['.main-intro-text-3', { opacity: 0, x: -50 }, { duration: 0.01 }],
    ['.minor-intro-text-3', { opacity: 0, y: 50 }, { duration: 0.01 }],
    [thirdLine.value!, { opacity: 0, strokeDashoffset: 1, x: -100 }, { duration: 0.01 }],

    [container1.value!, { opacity: 0, y: '50vh' }, { duration: 0.01 }],
    [rotateCircle.value!, { opacity: 0, rotate: 0 }, { duration: 0.01 }],
    [rotateCircle.value!, { rotate: 0 }, { duration: 0.01 }],
    ['.main-intro-text-1', { opacity: 0, x: -50 }, { duration: 0.01 }],
    [imgBoxFirst1.value!, { opacity: 0, y: -200, x: -100, scale: 0.8 }, { duration: 0.01 }],
    ['.minor-intro-text-1', { opacity: 0, y: 50 }, { duration: 0.01 }],

    [container2.value!, { opacity: 0, y: '50vh' }, { duration: 0.01 }],
    [line1.value!, { opacity: 0, pathLength: 0 }, { duration: 0.01 }],
    [line2.value!, { opacity: 0, pathLength: 0 }, { duration: 0.01 }],
    [line3.value!, { opacity: 0, pathLength: 0 }, { duration: 0.01 }],
    [imgBoxSecond1.value!, { opacity: 0, y: -200, scale: 0.4 }, { duration: 0.01 }],
    ['.main-intro-text-2', { opacity: 0, x: -50 }, { duration: 0.01 }],
    ['.minor-intro-text-2', { opacity: 0, y: 50 }, { duration: 0.01 }],

  ];
  await animate(seq as any);

  // console.log('Initialized');
}

async function runFirstSeq() {
  animate(rotateCircle.value!, { rotate: 360 }, { duration: 15, ease: 'linear', repeat: Infinity });
  const firstSequence = [

    [container1.value!, { opacity: [0, 1], y: ['50vh', 0] }, { duration: 1 }],

    [rotateCircle.value!, { opacity: [0, 1] }, { duration: 0.1, at: '+0.3' }],

    ['.main-intro-text-1', { opacity: [0, 1], x: [-50, 0] }, { duration: 0.4, delay: stagger(0.1), at: '+0.3' }],

    [imgBoxFirst1.value!, { opacity: [0, 1], y: [-200, 0], x: [-100, -200], scale: [0.8, 1] }, { duration: 1, at: '<' }],

    ['.minor-intro-text-1', { opacity: [0, 1], y: [50, 0] }, { duration: 0.5, at: '+0.1' }],

    [container1.value!, { opacity: [1, 0], y: [0, '-50vh'] }, { duration: 1, at: '+2' }],
  ];

  await animate(firstSequence as any);
  // console.log('First sequence completed');
}

async function runSecondSeq() {
  const secondSequence = [
    [container2.value!, { opacity: [0, 1], y: ['50vh', 0] }, { duration: 1 }],

    [line1.value!, { opacity: [0, 1], pathLength: [0, 1] }, { duration: 0.5 }],
    [line2.value!, { opacity: [0, 1], pathLength: [0, 1] }, { duration: 0.5, at: '-0.3' }],
    [line3.value!, { opacity: [0, 1], pathLength: [0, 1] }, { duration: 0.5, at: '-0.3' }],

    [imgBoxSecond1.value!, { opacity: [0, 1], y: [-200, 0], scale: [0.4, 1] }, { duration: 1, at: '<' }],

    ['.main-intro-text-2', { opacity: [0, 1], x: [-50, 0] }, { duration: 0.4, delay: stagger(0.1), at: '+0.3', type: 'spring' }],

    ['.minor-intro-text-2', { opacity: [0, 1], y: [50, 0] }, { duration: 0.5, at: '+0.1', type: 'spring' }],

    [line1.value!, { opacity: [1, 0], pathLength: [1, 0] }, { duration: 0.5, at: '+3' }],
    [line2.value!, { opacity: [1, 0], pathLength: [1, 0] }, { duration: 0.5, at: '+0.4' }],
    [line3.value!, { opacity: [1, 0], pathLength: [1, 0] }, { duration: 0.5, at: '+0.3' }],
    [container2.value!, { opacity: [1, 0], y: [0, '-50vh'] }, { duration: 1, at: '+0.05' }],
  ];

  await animate(secondSequence as any);
  // console.log('Second sequence completed');
}

async function runThirdSeq() {
  const thirdSequence = [
    [container3.value!, { opacity: [0, 1], y: ['50vh', 0] }, { duration: 1 }],

    [imgBoxThird1.value!, { opacity: [0, 1], y: [-200, 0], scale: [0.4, 1] }, { duration: 1, at: '+0.3' }],

    ['.main-intro-text-3', { opacity: [0, 1], x: [-50, 0] }, { duration: 0.3, delay: stagger(0.1), at: '+0.3', type: 'spring' }],

    ['.minor-intro-text-3', { opacity: [0, 1], y: [200, 0] }, { duration: 0.5, at: '+0.4', type: 'spring' }],

    [thirdLine.value!, { opacity: [0, 1], x: [-100, 0] }, { duration: 1, at: '<' }],
    [thirdLine.value!, { strokeDashoffset: [0, -15] }, { duration: 1, at: '+0.1', repeat: 10, ease: 'linear' }],
    'line',

    [thirdLine.value!, { opacity: [1, 0], x: [0, 100] }, { duration: 1, at: 'line' }],

    [container3.value!, { opacity: [1, 0], y: [0, '-50vh'] }, { duration: 1, at: '+2' }],
  ];
  await animate(thirdSequence as any);
  // console.log('Third sequence completed');
}

async function runSequence() {
  await InitAnimate();
  stage.value = 1;
  await runFirstSeq();
  stage.value = 2;
  await runSecondSeq();
  stage.value = 3;
  await runThirdSeq();
  emit('onComplete');
}

onMounted(() => {
  runSequence();
});
</script>

<style scoped>
.main-intro-text-1 {
  font-size: 2.25rem;
  font-weight: bold;
}

.minor-intro-text-1 {
  font-size: 1rem;
}

.main-intro-text-2 {
  font-size: 2.25rem;
  font-weight: bold;
}

.minor-intro-text-2 {
  font-size: 1rem;
}

.main-intro-text-3 {
  font-size: 2.25rem;
  font-weight: bold;
}

.minor-intro-text-3 {
  font-size: 1rem;
}
</style>
