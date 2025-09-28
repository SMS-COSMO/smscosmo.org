<template>
  <div>
    <Title>详细介绍</Title>
    <Hero />
    <div class="flex justify-center px-4">
      <div class="w-full max-w-4xl">
        <ul class="space-y-6">
          <li v-for="intro in introducions" :key="intro.id">
            <div v-if="!intro" class="text-center text-gray-500 py-8">
              文章未找到
            </div>
            <div v-else class="bg-blue- rounded-lg shadow-md p-6">
              <ContentRenderer :value="intro" />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex justify-center gap-10">
      <Button class="bg-blue-400 text-gray-500 border border-blue-300 px-4 py-3 rounded" @click="navigateTo('/')">
        返回主页
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: introducions } = await useAsyncData(() => {
  return queryCollection('introduction').all();
});

if (!introducions.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
  });
}
</script>
