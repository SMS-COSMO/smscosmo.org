<template>
  <Hero />
  <div class="min-h-screen p-8">
    <h1 class="text-center">组织历程</h1>
    <Button @click="navigateTo('/')" class="text-center">
      返回
    </Button>
    <div />
    <div class="flex flex-col items-center gap-1">
      <div v-for="det in details" :key="det.id">
        <UCard class="w-150 max-w-2xl h-fit">
          <template #header>
            {{ det.title }}
          </template>
          <template #default>
            <ContentRenderer :value="det.body" />
          </template>
          <template #footer>
            {{ det.description }}
          </template>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: details } = await useAsyncData(() => {
  return queryCollection('docs').all()
})
</script>
