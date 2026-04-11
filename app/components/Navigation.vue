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
        :transition="{ duration: 0.3, type: 'spring', stiffness: 80 }"
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
  <div class="h-28 w-full" />
</template>

<script setup lang="ts">
import { AnimatePresence, motion, optimizedAppearDataAttribute, useMotionValueEvent, useScroll } from 'motion-v';
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

const { scrollY } = useScroll();
useMotionValueEvent(scrollY, 'change', (latest) => {
  onTop.value = latest > SCROLL_THRESHOLD;
  console.log('onTop:', onTop.value);
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
      y: 10,
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
</script>
