<!-- eslint-disable prefer-const -->
<!-- eslint-disable unused-imports/no-unused-vars -->
<!-- 注意, 由于此处为模版, 不参与实际使用, 因而禁用了两个检查, 实际开发非必要不要这样做 -->
<!-- 具体使用请参照tx文档中的动画组件开发指南 -->
<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  duration: 300,
  delay: 0,
  iterationCount: 1,
  autoPlay: false,
  loop: false,
  reverse: false,
  milestones: () => [],
});
const emit = defineEmits<{
  start: []; // 动画开始时触发
  end: []; // 动画结束时触发
  pause: []; // 动画暂停时触发
  resume: []; // 动画恢复播放时触发
  complete: [iteration: number]; // 动画完成一次迭代时触发
  abort: []; // 动画中止时触发
  milestone: [progress: number, iteration: number]; // 动画到达阶段里程碑时触发
}>();
throw new Error('Template.vue 仅为动画组件开发模版, 不应直接使用');
interface Props {
  // 动画配置
  duration?: number; // 动画持续时间 (ms)，默认 300
  delay?: number; // 动画延迟时间 (ms)，默认 0
  iterationCount?: number | 'infinite'; // 动画重复次数，默认 1
  autoPlay?: boolean; // 是否自动播放，默认 true
  loop?: boolean; // 是否循环播放，默认 false
  reverse?: boolean; // 是否反向播放，默认 false
  styleSheet?: Map<string, string>; // 动画内部需要由外界定义的样式表
  milestones?: number[]; // 动画阶段里程碑，百分比数组 (0-100)，默认 []
}

// 动画状态
const isPlaying = ref(false);
const isPaused = ref(false);
const currentIteration = ref(0);
const currentProgress = ref(0); // 当前阶段
let animationFrameId: number | null = null;
let startTime: number | null = null;
let pausedTime: number = 0;
const triggeredMilestones = ref(new Set<number>()); // 已触发的里程碑

defineExpose({
  // 这里暴露一下各个函数
  // 播放, 暂停等

  triggeredMilestones,
  isPlaying,
  isPaused,
  currentIteration,
  currentProgress,
});
</script>

<style scoped>
</style>
