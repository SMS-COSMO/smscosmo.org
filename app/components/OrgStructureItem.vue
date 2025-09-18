<template>
  <div class="flex flex-col" :class="right ? 'items-end' : 'items-start'">
    <div
      class="flex translate-y-1/2 items-center justify-center border rounded-lg bg-white px-4 py-2 shadow-sm"
      :class="right ? '-translate-x-4' : 'translate-x-4'"
    >
      <div class="mr-2 text-2xl" :class="icon" />
      <span class="text-xl font-semibold font-misans">{{ department }}</span>
    </div>
    <div class="border rounded-lg px-4 pb-4 pt-10 shadow-sm">
      <p class="text-lg font-misans">
        {{ introduction }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  department: string;
  introduction: string;
  icon: string;
  right?: boolean;
}>();
</script>
