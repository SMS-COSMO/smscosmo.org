<template>
  <div class="min-h-screen bg-gradient-to-br p-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold dark:text-white mb-4">
        导航
      </h1>
      <p class="text-xl dark:text-gray-300">
        跳转至
      </p>
    </div>
    <div class="max-w-4xl mx-auto">
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/30 overflow-hidden">
        <div class="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
            导航
          </h2>
          <p class="text-gray-600 dark:text-gray-300 mt-2">
            点击以下链接查看详细内容
          </p>
        </div>
        <div class="p-6">
          <ul>
            <li v-for="item in NavItems" :key="item.path" class="group">
              <NuxtLink
                :to="item.path"
                class="flex items-center p-4 rounded-lg transition-all duration-300 group-hover:bg-blue-50 dark:group-hover:bg-gray-700 group-hover:shadow-md"
                active-class="bg-blue-100 dark:bg-gray-700 border-l-4 border-blue-500 dark:border-blue-400"
              >
                <!-- 文档图标 -->
                <div class="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-gray-700 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-200 dark:group-hover:bg-gray-600 transition-colors">
                  <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>

                <!-- 文档标题和描述 -->
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {{ item.title }}
                  </h3>
                  <p v-if="item.description" class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {{ item.description }}
                  </p>
                  <p v-else class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    点击查看详细内容
                  </p>
                </div>

                <!-- 导航箭头 -->
                <div class="flex-shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const NavItems = ref([
  {
    title: '组织历程',
    description: '111',
    path: '/history',
  },
  {
    title: '详细介绍',
    description: '111',
    path: '/introduction',
  },
]);
</script>
