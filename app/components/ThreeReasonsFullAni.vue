<template>
  <div class="fixed top-0 left-0 w-full h-full">
    <motion.h1
      class="absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2 w-60 h-28 font-bold text-2xl"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
    >
      第一个原因的占位符
    </motion.h1>
  </div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v';
</script>
