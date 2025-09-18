<template>
  <NuxtLink :to="to">
    <h1 class="text-center text-xl font-semibold dark:decoration-zinc-100">
      {{ text }}
    </h1>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
  to: string;
}>();
</script>
