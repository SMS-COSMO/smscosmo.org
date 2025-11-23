<template>
  <div class="space-y-6">
    <div class="mr-auto space-y-4">
      <h1 class="text-5xl font-semibold font-misans">
        {{ title }}
      </h1>
      <h3 class="text-xl font-medium font-uncut">
        {{ subtitle }}
      </h3>
    </div>
    <div class="space-y-3">
      <p v-for="content in contents" :key="content" class="text-xl font-misans">
        {{ content }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
  contents: string[];
}>();
</script>
