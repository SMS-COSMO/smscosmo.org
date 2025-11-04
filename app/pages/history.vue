<template>
  <div>
    <Title>详细介绍</Title>
    <Hero />
    <div class="flex justify-center px-4">
      <div class="w-full max-w-4xl">
        <ul class="space-y-6">
          <li v-for="his in history" :key="his.path">
            <div v-if="!his" class="text-center text-gray-500 py-8">
              文章未找到
            </div>
            <div v-else class="bg-blue-200 text-gray-950 rounded-lg shadow-md p-6 font-semibold font-misans">
              <ContentRenderer :value="his" />
            </div>
          </li>
        </ul>
      </div>
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
