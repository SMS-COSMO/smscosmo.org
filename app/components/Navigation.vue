<template>
  <div class="flex fixed top-0 z-50 w-full">
    <div :class="navClass">
      <div class="w-16 h-16 p-2.5 -mr-1">
        <NuxtImg src="/cosmo-logo.svg" />
      </div>
      <div class="mt-auto mb-auto">
        <span class="text-blue-400 font-[700]">
          COSMO
        </span>
        <span class="text-zinc-6 font-[600] hidden md:inline-block">
          智慧校园平台运研中心
        </span>
      </div>
      <div class="flex ml-auto align-middle font-[600]">
        <div v-for="item in NavItems" :key="item.path" class="mt-auto mb-auto mr-3 hover:text-gray-400 duration-300">
          <NuxtLink :to="item.path" :title="item.description">
            {{ item.title }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
  <div class="h-28 w-full">
    <div ref="topItem" class="absolute top-0 h-10 w-full -z-50" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const topItem = ref(null);

const tallClass = 'flex m-5 p-0.5 w-full bg-blue-800/80 backdrop-blur-sm shadow-2xl rounded-md duration-500';
const shortClass = 'flex p-0.5 w-full bg-black/50 backdrop-blur-sm shadow-2xl duration-500';
const navClass = ref(tallClass);
let navState = 'tall';
function toShort(): void {
  navClass.value = shortClass;
  navState = 'short';
}
function toTall(): void {
  navClass.value = tallClass;
  navState = 'tall';
}
// eslint-disable-next-line unused-imports/no-unused-vars
function swapNav(): void {
  if (navState === 'tall') {
    toShort();
  } else {
    toTall();
  }
}
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (!entry || entry.isIntersecting) {
      toTall();
    } else {
      toShort();
    }
  });
  observer.observe(topItem.value);
});

const NavItems = ref([
  {
    title: '主页',
    description: '111',
    path: '/',
  },
  {
    title: '组织历程',
    description: '111',
    path: '/history',
  },
  {
    title: '详细介绍',
    description: '111',
    path: '/introduction',
  },
]);
</script>
