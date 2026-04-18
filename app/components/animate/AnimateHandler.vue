<template>
  <div ref="container" :style="{ opacity: 0 }" class="w-full h-full flex items-center justify-center -z-100">
    <slot />
  </div>
  <div v-if="showProgressBar" class="fixed bottom-0 left-0 w-full h-2">
    <motion.div
      class="w-full h-2 bg-blue-200 transition-all"
      :style="{ width: progressPercent }"
    />
  </div>
</template>

<script setup lang="ts">
import type { AnimationSequence } from 'motion-v';
import { animate, motion } from 'motion-v';

const props = defineProps<{
  initSequence: () => AnimationSequence; // 初始化序列
  enterSequence: () => AnimationSequence; // 进入动画序列
  exitSequence: () => AnimationSequence; // 退出动画序列
  infinitySequence?: () => AnimationSequence; // 无限循环动画序列

  enterDelay?: number; // 进入动画延迟 秒
  exitDelay?: number; // 退出动画延迟 秒

  showProgressBar?: boolean; // 是否显示进度条
  enterDuration?: number; // 进入动画持续时间（秒）
  exitDuration?: number; // 退出动画持续时间（秒）
}>();

const emit = defineEmits<{
  (e: 'initComplete'): void;
  (e: 'enterStart'): void;
  (e: 'enterComplete'): void;
  (e: 'exitStart'): void;
  (e: 'exitComplete'): void;
}>();

interface AnimateStatus {
  stage: 'init' | 'enter' | 'exit';
  status: 'done' | 'running';
}

const container = ref<HTMLElement>();
const aniStatus = reactive<AnimateStatus>({
  stage: 'init',
  status: 'done',
});
const progressValue = useMotionValue(0);
// useMotionValueEvent(progressValue, 'change', (latest) => {
// console.log(`Progress: ${latest}`);
// });
const progressPercent = useTransform(progressValue, value => `${value * 100}%`);

async function runSequence(seq: AnimationSequence, options?: { duration?: number }) {
  if (!seq)
    return;
  const opts = options?.duration ? { defaultTransition: { duration: options.duration } } : {};
  await animate(seq, opts);
}

// 初始化动画
async function runInitSequence() {
  if (aniStatus.status !== 'done' || aniStatus.stage !== 'init')
    return;
  aniStatus.stage = 'init';
  aniStatus.status = 'running';
  if (props.initSequence) {
    await animate(container.value!, { opacity: 0, y: '100vh' }, { duration: 0.001 });
    await runSequence(props.initSequence(), { duration: 0.001 });
  }
  emit('initComplete');
  aniStatus.stage = 'enter';
  aniStatus.status = 'done';
}

// 进入动画
async function runEnterSequence() {
  if (aniStatus.status !== 'done' || aniStatus.stage !== 'enter')
    return;
  aniStatus.stage = 'enter';
  aniStatus.status = 'running';
  emit('enterStart');
  const seq: AnimationSequence = [
    [container.value!, { opacity: [0, 1], y: ['100vh', 0] }, { at: '0', duration: 0.5 }],
  ];

  await runSequence(seq);
  if (props.enterSequence) {
    animate(progressValue, 0.5, { duration: getSequenceDuration(props.enterSequence()), ease: 'linear' });
    await runSequence(props.enterSequence(), {});
  }
  emit('enterComplete');
  aniStatus.stage = 'exit';
  aniStatus.status = 'done';
}

// 退出动画
async function runExitSequence() {
  if (aniStatus.status !== 'done' || aniStatus.stage !== 'exit')
    return;
  aniStatus.stage = 'exit';
  aniStatus.status = 'running';
  emit('exitStart');

  if (props.exitSequence) {
    animate(progressValue, 1, { duration: getSequenceDuration(props.exitSequence()), ease: 'linear' });
    await runSequence(props.exitSequence());
  }
  const seq: AnimationSequence = [
    [container.value!, { opacity: [1, 0], y: [0, '-100vh'] }, { at: '+0', duration: 1 }],
  ];

  await runSequence(seq, {});
  emit('exitComplete');
  aniStatus.stage = 'exit';
  aniStatus.status = 'done';
}

async function runFullSequence() {
  await runInitSequence();
  // console.log('Init Sequence Completed');
  if (typeof props.enterDelay)
    await new Promise(resolve => setTimeout(resolve, (props.enterDelay ?? 0) * 1000));
  await runEnterSequence();
  // console.log('Enter Sequence Completed');
  if (typeof props.exitDelay)
    await new Promise(resolve => setTimeout(resolve, (props.exitDelay ?? 0) * 1000));
  await runExitSequence();
}

function getSequenceDuration(sequence: AnimationSequence): number {
  let prevStart = 0;
  let prevEnd = 0;
  let totalDuration = 0;
  for (const item of sequence) {
    const [, , options = {}] = item as any;
    const { at, duration = 0.3, delay = 0 } = options as any;

    // 处理 delay 可能是函数（例如 stagger）
    let delayNum = 0;
    if (typeof delay === 'function') {
      delayNum = 0.1;
    } else {
      delayNum = delay || 0;
    }

    // 解析 at
    let start: number;
    if (at === undefined) {
      start = prevEnd;
    } else if (typeof at === 'number') {
      start = at;
    } else if (typeof at === 'string') {
      if (at === '<') {
        start = prevStart;
      } else if (at.startsWith('+')) {
        start = prevEnd + Number.parseFloat(at);
      } else if (at.startsWith('-')) {
        start = prevEnd - Number.parseFloat(at);
      } else {
        // 标签等忽略
        start = prevEnd;
      }
    } else {
      start = prevEnd;
    }

    start += delayNum;
    const end = start + duration;
    totalDuration = Math.max(totalDuration, end);
    prevStart = start;
    prevEnd = end;
  }
  // console.log(`Calculated sequence duration: ${totalDuration}s`);
  return totalDuration;
}

defineExpose({
  runFullSequence,
  runInitSequence,
  runEnterSequence,
  runExitSequence,
  aniStatus,
});
</script>
