<template>
  <div class="flex mb-12" :class="onRight ? 'flex-row' : 'flex-row-reverse'">
    <!-- 竖线容器（固定宽度，用于放置竖线） -->
    <div class="w-8 flex justify-center relative">
      <div class="w-0.5 h-full bg-gray-300" />
    </div>

    <!-- 内容区域：flex-1 占满剩余空间，并通过内边距紧贴竖线 -->
    <div class="flex-1 relative" :class="onRight ? 'pl-0.5' : 'pr-0'">
      <motion.div
        class="w-full h-[94%] translate-y-2 p-6 rounded-lg border border-gray-300 bg-white shadow-lg"
        :initial="{ opacity: 0, y: 50 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5 }"
      >
        <ContentRenderer v-if="markdownContent" :value="markdownContent" />
        <time class="text-sm text-gray-500 block mt-2">{{ markdownContent?.date }}</time>
      </motion.div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Collections } from '@nuxt/content';
import { motion } from 'motion-v';

defineProps<{
  markdownContent: Collections['history'] | null;
  onRight: boolean; // true: 竖线在右侧，内容在左侧；false: 竖线在左侧，内容在右侧
}>();
</script>
