<template>
  <div ref="container" :style="{ opacity: 0 }" class="w-full h-full flex items-center justify-center -z-100">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { AnimationSequence } from 'motion-v';
import { animate } from 'motion-v';

const props = defineProps<{
  initSequence: () => AnimationSequence; // 初始化序列
  enterSequence: () => AnimationSequence; // 进入动画序列
  exitSequence: () => AnimationSequence; // 退出动画序列
  infinitySequence?: () => AnimationSequence; // 无限循环动画序列

  enterDelay?: number; // 进入动画延迟 毫秒
  exitDelay?: number; // 退出动画延迟 毫秒
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
  if (props.enterDelay)
    await new Promise(resolve => setTimeout(resolve, props.enterDelay));
  if (props.enterSequence)
    await runSequence(props.enterSequence(), {});
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
  if (props.exitDelay)
    await new Promise(resolve => setTimeout(resolve, props.exitDelay));
  if (props.exitSequence) {
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
  await runEnterSequence();
  // console.log('Enter Sequence Completed');
  await runExitSequence();
}

defineExpose({
  runFullSequence,
  runInitSequence,
  runEnterSequence,
  runExitSequence,
  aniStatus,
});
</script>
