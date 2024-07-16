<template>
  <NavBar />
  <slot />
  <div
    class="fixed right-0 top-0 h-1/3 w-1/5 bg-blue blur-200"
    :style="`opacity: 0.${count};`"
  />
  <div
    class="fixed bottom-0 left-0 h-1/3 w-1/5 bg-blue blur-200"
    :style="`opacity: 0.${count};`"
  />
</template>

<script setup lang="ts">
const { count, inc, dec } = useCounter(50);
const increasing = ref(true);

useTimeoutPoll(
  () => {
    if (count.value >= 95)
      increasing.value = false;
    if (count.value <= 30)
      increasing.value = true;
    if (increasing.value)
      inc(5);
    else
      dec(5);
  },
  350,
  { immediate: true },
);
</script>
