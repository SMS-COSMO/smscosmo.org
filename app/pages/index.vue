<template>
  <Hero />
  <div class="mx-auto my-25 max-w-3xl w-[80%] flex flex-col items-center justify-center container space-y-16">
    <ContentItem v-for="text in texts" :key="text.title" v-bind="text" />
    <OrgStructure />
  </div>
  <!-- 以下是跳转文档模块 -->
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
    <!-- 页面标题 -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">
        COSMO 智慧校园平台文档中心
      </h1>
      <p class="text-xl text-gray-600">
        选择您需要查看的文档
      </p>
    </div>

    <!-- 文档目录 -->
    <div class="max-w-4xl mx-auto">
      <!-- 加载状态 -->
      <div v-if="pending" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        <p class="mt-4 text-gray-600">
          加载文档目录中...
        </p>
      </div>

      <!-- 目录内容 -->
      <div v-else-if="navigationData" class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 overflow-hidden">
        <!-- 目录头部 -->
        <div class="p-6 border-b border-gray-200/50">
          <h2 class="text-2xl font-bold text-gray-800">
            文档目录
          </h2>
          <p class="text-gray-600 mt-2">
            点击以下链接查看详细内容
          </p>
        </div>

        <!-- 目录列表 -->
        <div class="p-6">
          <ul class="space-y-3">
            <li v-for="item in navigationData" :key="item.path" class="group">
              <NuxtLink
                :to="item.path"
                class="flex items-center p-4 rounded-lg transition-all duration-300 group-hover:bg-blue-50 group-hover:shadow-md"
                active-class="bg-blue-100 border-l-4 border-blue-500"
              >
                <!-- 文档图标 -->
                <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>

                <!-- 文档标题和描述 -->
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {{ item.title }}
                  </h3>
                  <p v-if="item.description" class="text-sm text-gray-600 mt-1">
                    {{ item.description }}
                  </p>
                  <p v-else class="text-sm text-gray-500 mt-1">
                    点击查看详细内容
                  </p>
                </div>

                <!-- 导航箭头 -->
                <div class="flex-shrink-0 text-gray-400 group-hover:text-blue-500 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- 无数据状态 -->
      <div v-else class="text-center py-12 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">
          暂无文档
        </h3>
        <p class="text-gray-600">
          当前没有可用的文档内容
        </p>
      </div>
    </div>

    <!-- 底部信息 -->
    <footer class="mt-12 text-center text-gray-500 text-sm">
      <p>COSMO 智慧校园平台 © 2025 版权所有</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import OrgStructure from '~/components/OrgStructure.vue';

useHeadSafe({
  title: 'COSMO | 智造无限可能',
});

const texts = [
  {
    title: 'COSMO 是什么',
    subtitle: 'What is COSMO',
    contents: ['COSMO 智慧校园平台运研中心，深圳中学七大校级学生组织之一，成立于 2021 年 5 月，是一个小而精的年轻组织。在这里，我们依托互联网等技术，致力于通过信息化手段给予学生在校园生活中各方面的帮助。'],
  },
  {
    title: '我们做什么',
    subtitle: 'What We Do',
    contents: ['我们关注校园生活中的问题，用技术改善体验。上一学年，我们完成了食堂点歌系统，深中漫游指南，“深中知网”等项目，收获了同学们的好评。接下来，我们将持续推进食堂显示屏优化等项目。', '同时，我们还运营着校园互助，招募学霸同学担任讲师为同学们提供一对一的学习帮助。'],
  },
  {
    title: '为什么加入 COSMO',
    subtitle: 'Why COSMO',
    contents: ['麻雀虽小，五脏俱全。 COSMO 比其他学生组织规模小，我们重视组织内 每一个人的想法 和立场。 同学们拥有很大的话语权和决策权，并且参与到现有核心项目的开发和运营，获得宝贵的实践经验。', '同时，在 COSMO， 成为组织高层 的机会大于其他学生组织。 加入COSMO，不仅是对单纯想提升领导能力的高考体系同学一次绝佳的历练机会， 还可以为国际体系同学的课外活动添砖加瓦，为未来的大学申请锦上添花。', '对于 国际体系的同学 ，COSMO 是一个不错的选择， 无论是锻炼社交能力，增长领导才能， 或者自己实践做项目，加强 Community Influence 等等， 都可以在这里找到独属于自己的收获。'],
  },
];
// 获取导航数据
const { data: navigationData, pending } = await useAsyncData('history', () => queryCollection('history').all());
</script>
