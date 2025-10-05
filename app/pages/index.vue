<template>
  <Hero />
  <div class="mx-auto my-25 max-w-3xl w-[80%] flex flex-col items-center justify-center container space-y-16">
    <ContentItem v-for="text in texts" :key="text.title" v-bind="text" />
    <OrgStructure />
  </div>
  <Navigation />
  <div>
    <footer class="mt-1 text-center text-gray-500 dark:text-gray-400 text-sm">
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
// const { data: navigationData, pending } = await useAsyncData('history', () => queryCollection('history').all());
</script>
