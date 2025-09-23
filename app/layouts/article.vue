<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
    <!-- 动态背景效果 -->
    <div
      class="fixed right-10 top-20 h-1/3 w-1/5 bg-blue-400 blur-[200px] -z-10 transition-all duration-1000"
      :style="`opacity: 0.${count};`"
    />
    <div
      class="fixed bottom-20 left-20 h-1/3 w-1/5 bg-blue-400 blur-[200px] -z-10 transition-all duration-1000"
      :style="`opacity: 0.${count};`"
    />
    
    <!-- 主布局容器 -->
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- 直接插入页面内容 -->
      <slot />
    </div>
  </div>
</template>

<script setup>
// 动态背景效果计数器
const count = ref(50);
const increasing = ref(true);

// 背景呼吸灯效果
useIntervalFn(() => {
  if (count.value >= 95) increasing.value = false;
  if (count.value <= 30) increasing.value = true;
  if (increasing.value) count.value += 5;
  else count.value -= 5;
}, 300);
</script>