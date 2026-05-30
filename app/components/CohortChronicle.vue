<template>
  <motion.div
    v-for="m in msg"
    :key="m.cohort"
    class="w-fullh-10 rounded bg-blue-500 p-4"
    :initial="{ opacity: 0, y: 20 }"
    :animate="{ opacity: 1, y: 0 }"
    :while-in-view="{ opacity: 0.8, y: 20 }"
    :transition="{ duration: 0.5 }"
  >
    <h3 class="text-xl font-bold">
      第 {{ m.cohort }} 届
    </h3>
    <component :is="m.markdown" />

    <!-- <li v-for="q in quotes" :key="q.id">
    {{ q.quote }}
  </li> -->
  </motion.div>
</template>

<script setup lang="ts">
interface CohortItem {
  cohort: number;
  markdown: string | any;
}
defineProps<{
  msg: CohortItem[];
}>();
</script>
