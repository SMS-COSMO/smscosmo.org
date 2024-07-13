<template>
  <h1 class="text-xl font-600 text-center underline underline-offset-4 decoration-zinc-800 dark:decoration-zinc-100">
    {{ text }}
  </h1>
</template>

<script setup lang="ts">
defineProps<{ text: string }>();
</script>
