<template>
  <div class="fixed top-0 z-50 w-full border-b bg-white/50 shadow-sm backdrop-blur-md">
    <div class="mx-auto h-14 max-w-4xl w-[80%] flex justify-between gap-8 py-2 transition-all duration-10">
      <div class="flex items-center justify-center gap-x-8 px-4 font-misans">
        <NuxtImg src="/cosmo-logo.svg" class="h-8 w-8" />
        <NavBarItem v-for="item in navbarItems" :key="item.text" :text="item.text" :to="item.to" class="hidden md:block" />
      </div>
      <button type="button" class="button-gradient mr-4 rounded px-4 text-nowrap text-lg text-white font-500 font-misans">
        加入我们
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const navbarItems = [{
  text: '组织介绍',
  to: '/',
}, {
  text: '组织架构',
  to: '/',
}, {
  text: '我们的项目',
  to: '/',
}];
</script>

<style scoped>
.button-gradient {
  background-image: linear-gradient(120deg, #0961B9 0%, #048BFF 51%, #4BA5FB 82%, #71B6FC 91%, #93C5FD 100%);
}
</style>
