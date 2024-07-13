<template>
  <div ref="navbar" class="border navbar-shadow backdrop-blur-md border-zinc-300 rounded-full w-[90%] max-w-6xl h-18 flex items-center justify-between gap-x-8 fixed top-0 mt-5 z-100 px-2 sm:px-6 py-2">
    <div class="flex px-4 font-misans gap-x-6 items-center justify-center">
      <h1 class="font-900 text-2xl sm:text-3xl text-zinc-800 dark:text-zinc-100 mr-2 flex gap-2 justify-center items-center flex-nowrap	">
        <NuxtImg src="/cosmo-logo.svg" class="h-8 w-8" />
        COSMO
      </h1>
      <template v-for="item in navbarItems" :key="item">
        <NavBarItem :text="item" class="hidden md:block" />
      </template>
    </div>
    <button type="button" class="button-gradient font-misans text-xl text-white font-500 rounded-lg px-4 py-2 mr-4 text-nowrap">
      加入我们
    </button>
  </div>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';

const navbar = ref(null);
// const isNotMobile = useMediaQuery('(min-width: 768px)');
const navbarItems = ref(['组织介绍', '组织架构', '我们的项目']);
</script>

<style scoped>
.button-gradient {
  background-image: linear-gradient(120deg, #0961B9 0%, #048BFF 51%, #4BA5FB 82%, #71B6FC 91%, #93C5FD 100%);
}

.navbar-shadow {
  box-shadow:
  0px 0.9px 1px rgba(0, 0, 0, 0.005),
  0px 2.1px 2.3px rgba(0, 0, 0, 0.008),
  0px 3.9px 4.4px rgba(0, 0, 0, 0.012),
  0px 6.9px 7.8px rgba(0, 0, 0, 0.015),
  0px 13px 14.6px rgba(0, 0, 0, 0.02),
  0px 31px 35px rgba(0, 0, 0, 0.03)
;
}
</style>
