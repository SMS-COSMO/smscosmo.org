<template>
  <div>
    <Title>详细介绍</Title>
    <Hero />
    <div class="flex relative px-4">
      <!-- 可收起的左侧导航栏 -->
      <div
        class="fixed left-0 sm:left-4 top-1/2 -translate-y-1/2 z-50 transition-all duration-300"
        :class="isNavOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <div class="nav-sidebar bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-lg shadow-xl border border-blue-200/30 dark:border-gray-700/30 p-5 min-w-[200px] sm:min-w-[220px] max-h-[80vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-5 pb-4 border-b border-blue-200/20 dark:border-gray-700/20">
            <h3 class="text-lg sm:text-xl font-semibold font-misans text-blue-600 dark:text-blue-400">
              详细介绍
            </h3>
            <button
              class="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors p-1 rounded-md hover:bg-blue-50/50 dark:hover:bg-gray-700/50"
              @click="isNavOpen = false"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav class="space-y-1.5">
            <a
              v-for="(item, index) in navigationItems"
              :key="index"
              :href="`#section-${index + 1}`"
              class="nav-item block px-4 py-2.5 rounded-lg text-sm font-medium font-misans text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-gray-700/60 transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200/50 dark:hover:border-gray-600/50"
              @click="scrollToSection(`section-${index + 1}`, $event)"
            >
              {{ item }}
            </a>
          </nav>
        </div>
      </div>

      <!-- 展开按钮 -->
      <button
        v-if="!isNavOpen"
        class="nav-toggle-btn fixed left-0 sm:left-4 top-1/2 -translate-y-1/2 z-40 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-r-lg p-2.5 sm:p-3 shadow-lg transition-all duration-300 hover:shadow-xl"
        @click="isNavOpen = true"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- 内容区域 -->
      <div class="w-full max-w-4xl mx-auto">
        <ul class="space-y-6">
          <li v-for="(intro, index) in introducions" :id="`section-${index + 1}`" :key="`intro-${index}`" class="scroll-mt-32">
            <div v-if="!intro" class="text-center text-gray-500 py-8">
              文章未找到
            </div>
            <div v-else class="history-card bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-xl shadow-lg border border-blue-200/30 dark:border-gray-700/30 p-8 font-misans transition-all duration-300 hover:shadow-xl hover:border-blue-300/50 dark:hover:border-gray-600/50">
              <ContentRenderer :value="intro" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isNavOpen = ref(false);

const { data: introducions } = await useAsyncData(() => {
  return queryCollection('introduction').all();
});

if (!introducions.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
  });
}

// 生成导航项：基于内容数量生成序号
const navigationItems = computed(() => {
  const items = [];
  const introArray = Array.isArray(introducions.value) ? introducions.value : [];
  const count = introArray.length;

  // 使用序号生成导航项
  for (let i = 0; i < count; i++) {
    items.push(`第${i + 1}部分`);
  }
  return items;
});

// 滚动到指定位置
function scrollToSection(id: string, event: Event) {
  event.preventDefault();

  // 使用 nextTick 确保 DOM 已更新
  nextTick(() => {
    // 使用双重 setTimeout 确保元素已完全渲染
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        // 使用 scrollIntoView 方法，配合 CSS scroll-margin-top
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else {
        // 如果找不到元素，尝试直接使用 hash 跳转
        window.location.hash = id;
        // 然后再次尝试滚动
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }, 200);
      }
    }, 100);
  });
}
</script>

<style scoped>
.nav-sidebar {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
}

.dark .nav-sidebar {
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.25) 0%, rgba(31, 41, 55, 0.15) 100%);
}

.nav-item {
  position: relative;
}

.nav-item:hover {
  transform: translateX(2px);
}

.nav-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: linear-gradient(to bottom, #0961B9, #048BFF);
  border-radius: 0 2px 2px 0;
  transition: height 0.2s ease;
}

.nav-item:hover::before {
  height: 60%;
}

.nav-toggle-btn {
  backdrop-filter: blur(10px);
}

.history-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
  position: relative;
  overflow: hidden;
}

.dark .history-card {
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.25) 0%, rgba(31, 41, 55, 0.15) 100%);
}

.history-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(to right, #0961B9, #0679E1, #048BFF, #99C2FF);
  opacity: 0.6;
}

.history-card:hover::before {
  opacity: 1;
}

/* 优化内容渲染器的样式 */
.history-card :deep(h1) {
  color: #0961B9;
  font-weight: 700;
  margin-bottom: 1rem;
  font-size: 1.875rem;
}

.history-card :deep(h2) {
  color: #0679E1;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
}

.history-card :deep(h3) {
  color: #048BFF;
  font-weight: 600;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.history-card :deep(p) {
  color: #374151;
  line-height: 1.75;
  margin-bottom: 1rem;
}

.dark .history-card :deep(p) {
  color: #e5e7eb;
}

.history-card :deep(strong) {
  color: #0961B9;
  font-weight: 600;
}

.dark .history-card :deep(strong) {
  color: #60a5fa;
}

.history-card :deep(ul),
.history-card :deep(ol) {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.history-card :deep(li) {
  margin-bottom: 0.5rem;
  color: #374151;
  line-height: 1.75;
}

.dark .history-card :deep(li) {
  color: #e5e7eb;
}
</style>
