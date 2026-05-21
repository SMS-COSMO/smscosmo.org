<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <motion.div
    class="w-full flex flex-col md:flex-row gap-6 md:gap-8 p-6 bg-blue-100 rounded-2xl shadow-lg"
    :initial="{ x: -50, opacity: 0 }"
    :whileInView="{ x: 0, opacity: 1 }"
    :transition="{ duration: 1, type: 'spring' }"
  >
    <!-- 左侧图片区域 -->
    <motion.div class="md:w-1/2 flex-shrink-0">
      <!-- 图片容器，用于获取宽度 -->
      <div ref="imgContainer">
        <motion.img
          class="w-full h-48 object-cover rounded-2xl shadow-md text-center border border-dashed border-gray-300"
          :initial="{ opacity: 0, y: 40 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :transition="{ duration: 1, delay: 0.6, type: 'spring' }"
          src="/images/test.png"
          alt="占位图片"
        />
      </div>

      <!-- 滑轨和滑块 -->
      <div class="mt-4 w-full">
        <div class="relative h-12 w-full bg-white/40 backdrop-blur-sm rounded-full shadow-inner border border-white/30">
          <motion.h4
            class="absolute top-1/2 -translate-y-1/2 right-15 text-sm font-medium tracking-tight text-blue-700/80"
            :style="{ opacity: textOpacity }"
          >
            访问github
          </motion.h4>
          <motion.div
            class="absolute top-1/2 -translate-y-1/2 w-15 h-10 bg-gradient-to-r from-white to-blue-50 rounded-full shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center gap-1 border border-blue-200/50"
            drag="x"
            :dragSnapToOrigin="isToOrigin"
            :dragElastic="0.1"
            :dragConstraints="dragConstraints"
            :style="{ x: sliderX }"
          >
            <!-- 装饰小圆点，表示可拖拽 -->
            <span class="ml-2 text-lg font-medium text-blue-600">></span>
          </motion.div>
        </div>
      </div>
    </motion.div>

    <!-- 右侧 Markdown 内容区域（原样） -->
    <motion.div
      class="md:w-1/2 prose prose-lg max-w-none"
      :initial="{ opacity: 0, x: -40 }"
      :whileInView="{ opacity: 1, x: 0 }"
      :transition="{ duration: 0.8, delay: 1, type: 'spring' }"
    >
      <ContentRenderer v-if="markdownContent" :value="markdownContent" />
      <div v-else class="text-gray-400 italic">
        暂无内容
      </div>
    </motion.div>
  </motion.div>
</template>

<script setup lang="ts">
import type { Collections } from '@nuxt/content';
import { motion } from 'motion-v';

defineProps<{
  markdownContent: Collections['projects'] | null;
}>();

const imgContainer = ref<HTMLDivElement | null>(null);
const dragConstraints = ref({ left: 0, right: 300 }); // 初始默认
const sliderX = useMotionValue(0);
let hasNavigated = false; // 防止重复导航
const isToOrigin = ref(true);
const textOpacity = useTransform(sliderX, [0, 200], [1, 0.1]);

onMounted(() => {
  if (imgContainer.value) {
    const parentWidth = imgContainer.value.clientWidth;
    const thumbWidth = 80; // 滑块宽度 w-20 = 5rem = 80px
    dragConstraints.value = { left: 0, right: parentWidth - thumbWidth };
  }
});

useMotionValueEvent(sliderX, 'change', (latest) => {
  if (hasNavigated)
    return; // 已经导航过一次，直接返回
  // 当滑块拖动到右侧边界时，打开GitHub链接
  if (latest >= dragConstraints.value.right - 2) {
    isToOrigin.value = false;
    hasNavigated = true;
    navigateTo('/');
  }
});
</script>
