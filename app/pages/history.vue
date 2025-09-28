<template>
  <div>
    <Title>组织历程</Title>
    <Hero />
    <div class="flex justify-center px-4">
      <div class="w-full max-w-4xl">
        <ul class="space-y-6">
          <li v-for="his in history" :key="his.id">
            <div v-if="!his" class="text-center text-gray-500 py-8">
              文章未找到
            </div>
            <div v-else class="bg-blue- rounded-lg shadow-md p-6">
              <ContentRenderer :value="his" />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex justify-center gap-10">
      <Button @click="navigateTo('/')" class="bg-blue-400 text-gray-500 border border-blue-300 px-4 py-3 rounded">
        返回主页
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: history } = await useAsyncData(() => {
  return queryCollection('history').all();
});

if (!history.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
  });
}
</script>
