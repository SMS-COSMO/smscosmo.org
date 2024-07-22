<template>
  <div class="absolute left-0 top-0 h-screen w-screen bg-white">
    <div class="relative top-1/2 mx-auto h-10 max-w-xl w-[85%] flex items-center justify-center border border-blue-400 -translate-y-1/2">
      <div class="px-2">
        <NuxtImg src="/cosmo-logo.svg" class="aspect-square h-6" />
      </div>
      <div class="h-full flex grow items-center justify-center border-x border-blue-400 px">
        <NuxtImg src="/anim-text.svg" class="h-6" />
      </div>
      <LoadingPing class="aspect-square h-6 stroke-blue-500" />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
