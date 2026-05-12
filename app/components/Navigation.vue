<template>
  <div
    class="fixed top-0 left-0 w-full z-50"
  >
    <AnimatePresence>
      <motion.div
        v-if="!hidden"
        class="flex p-0.5 w-full"
        :initial="{ opacity: 0, y: '-150%' }"
        :animate="navStyle"
        :exit="{ opacity: 0, y: '-150%' }"
        :transition="navTransition"
      >
        <div class="w-16 h-16 p-2.5 -mr-1">
          <NuxtImg src="/cosmo-logo.svg" />
        </div>
        <div class="mt-auto mb-auto">
          <span class="text-blue-400 font-[700]"> COSMO </span>
          <span class="text-zinc-6 font-[600] hidden md:inline-block">
            智慧校园平台运研中心
          </span>
        </div>
        <div class="flex ml-auto align-middle font-[600] text-white">
          <div
            v-for="item in NavItems"
            :key="item.path"
            class="mt-auto mb-auto mr-3 hover:text-gray-400 transition-colors duration-300"
          >
            <NuxtLink :to="item.path" :title="item.description">
              {{ item.title }}
            </NuxtLink>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
  <div class="h-28 w-full" /> <!-- 防止nav挡住下面的元素 -->
</template>

<script setup lang="ts">
import type { $Transition } from 'motion-v'; // 用来规定类型，防止类型检查报错
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion-v';
import { computed, ref } from 'vue';

defineProps<{ hidden: boolean }>();

const NavItems = ref([
  { title: '主页', description: '111', path: '/' },
  { title: '组织历程', description: '111', path: '/history' },
  { title: '详细介绍', description: '111', path: '/introduction' },
]);

// 滚动阈值（像素），超过此值切换为“短”样式
const SCROLL_THRESHOLD = 100;
const onTop = ref(false);
const animationEnabled = ref(false);

const { scrollY } = useScroll();
useMotionValueEvent(scrollY, 'change', (latest) => {
  onTop.value = latest > SCROLL_THRESHOLD;
  // console.log('onTop:', onTop.value);
});

const navStyle = computed(() => {
  if (onTop.value) {
    return {
      y: 0,
      opacity: 1,
      margin: '0px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(8px)',
      borderRadius: '0px',
      boxShadow: 'none',
      width: '100%',
    };
  } else {
    return {
      y: '2vh',
      opacity: 1,
      backgroundColor: 'rgba(30, 64, 175, 0.8)',
      backdropFilter: 'blur(4px)',
      borderRadius: '12px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      width: '95%',
      x: '2.5%', // 这里是因为宽度变成了95%，所以左右各有2.5%的空白，所以往右边移动了2.5%
    };
  }
});
const navTransition = computed((): $Transition => {
  if (!animationEnabled.value) {
    return { duration: 0 }; // 为了防止页面初次加载时播放动画（页面加载完成的瞬间nav应处于就位状态），禁用动画效果
  }
  if (onTop.value) {
    return {
      duration: 0.5,
      type: 'tween', // 如果是贴顶的形态，在出现时应该直接就位，而不是在竖直方向有多的移动（即，防止“短”样式的nav顶端低于可视范围顶端）
      ease: 'easeOut',
    };
  } else {
    return {
      duration: 0.5,
      type: 'spring',
      stiffness: 70,
    };
  }
});
onMounted(() => {
  setTimeout(() => {
    animationEnabled.value = true;
  }, 100); // 挂载之后0.1s再启用nav动画，参见navTransition中注释
});
</script>
