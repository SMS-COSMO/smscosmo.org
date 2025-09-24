<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50 relative overflow-hidden">
    <!-- 动态粒子背景 -->
    <div class="absolute inset-0 z-0">
      <div v-for="i in 30" :key="i" 
          class="absolute rounded-full bg-blue-200/40"
          :style="particleStyle(i)">
      </div>
    </div>
    
    <!-- 中央Logo区域 -->
    <div class="fixed inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div class="relative">
        <!-- 背景光晕效果 -->
        <div class="absolute inset-0 bg-blue-300/20 rounded-full blur-3xl transform scale-150 opacity-60"></div>
        <NuxtImg src="/cosmo-logo.svg" class="aspect-square h-32 mb-6 opacity-70" />
          <!-- <span class="text-blue-600/60 text-sm font-light tracking-widest">CONTENT PLATFORM</span> -->
      </div>
    </div>
    
    <!-- 动态光晕效果 -->
    <div
      class="fixed right-10 top-20 h-1/3 w-1/5 bg-gradient-to-r from-blue-200 to-cyan-100 blur-[120px] -z-10 transition-all duration-1000"
      :style="`opacity: 0.${count/2}; transform: translate(${count/5}px, ${count/10}px) rotate(${count/2}deg);`"
    />
    <div
      class="fixed bottom-20 left-20 h-1/3 w-1/5 bg-gradient-to-r from-indigo-200 to-purple-100 blur-[120px] -z-10 transition-all duration-1000"
      :style="`opacity: 0.${count/2}; transform: translate(-${count/5}px, -${count/10}px) rotate(-${count/2}deg);`"
    />
    
    <!-- 几何装饰元素 -->
    <div class="absolute top-1/4 left-10 w-32 h-32 border-2 border-blue-300/40 rounded-full transform -rotate-12"></div>
    <div class="absolute bottom-1/4 right-10 w-40 h-40 border-2 border-indigo-300/40 rounded-lg transform rotate-12"></div>
    
    <!-- 主布局容器 -->
    <div class="container mx-auto px-4 py-8 max-w-4xl relative z-20">
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

// 粒子背景样式生成器
const particleStyle = (index) => {
  const size = Math.random() * 8 + 3;
  const left = Math.random() * 100;
  const top = Math.random() * 100;
  const opacity = Math.random() * 0.4 + 0.2;
  const animationDuration = Math.random() * 25 + 15;
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    top: `${top}%`,
    opacity: opacity,
    animation: `float ${animationDuration}s infinite ease-in-out`
  };
};
</script>

<style scoped>
/* 自定义动画效果 */
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-15px) translateX(8px);
  }
  50% {
    transform: translateY(8px) translateX(-15px);
  }
  75% {
    transform: translateY(-8px) translateX(15px);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>