<template>
  <div class="w-full space-y-8">
    <div class="mr-auto space-y-1">
      <h1 class="text-4xl font-semibold font-misans">
        我们的组织架构
      </h1>
      <h3 class="text-xl font-medium font-uncut">
        Our Organization Structure
      </h3>
    </div>
    <section>
      <OrgStructureItem
        v-for="orgStructureItem in orgStructure"
        :key="orgStructureItem.department"
        v-bind="orgStructureItem"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
const orgStructure = [{
  department: '技术部',
  icon: 'i-ph:terminal-window-duotone',
  introduction: '对编程有不错的兴趣？技术部是个很棒的选择！作为COSMO核心部门，技术部负责项目的开发与运维，在这里，你可以实战上手开发，切实锻炼自己的编程技能，可以拓宽技术视野，提升综合水平。',
}, {
  department: '美工部',
  icon: 'i-ph:pencil-circle-duotone',
  introduction: '你是否总被各种色彩吸引眼球？喜爱平面设计？想要为网页设计UI？想自己尝试却不知道从哪里开始？美工部是一个绝佳的机会！我们有超多实践机会，0门槛，帮你打开新世界的大门！',
  right: true,
}];
</script>
