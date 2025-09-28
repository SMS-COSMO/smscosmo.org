<script setup lang="ts">

const route = useRoute()

const { data: page } = await useAsyncData(`page-${route.params.slug}`, () => {
  return queryCollection('history').path(route.path).first()
})

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
  })
}

useSeoMeta(page.value?.seo || {})
</script>

<template>
  <NuxtLayout :name="'article'" class="bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700">
    <div v-if="!page">
      未找到
    </div>
    <div v-else>
      <ContentRenderer
      v-if="page"
      :value="page"
      class="prose dark:prose-invert prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900"
    />
    </div>
    <div class="flex justify-center">
      <Button @click="navigateTo('/')" class="bg-blue-100 text-gray-500 border border-blue-300 px-4 py-3 rounded">返回主页</Button>
    </div> 
  </NuxtLayout>
</template>
