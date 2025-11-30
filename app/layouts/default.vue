<template>
  <!-- <LoadingAnimation class="z-100" /> -->
  <div class="p-2 h-dvh">
    <div
      class="grid-container overflow-clip border border-neutral-300 rounded-md transition-all duration-700"
      :class="[screen === 'full' ? 'w-full h-full' : 'w-[90%] h-[90%]']"
    >
      <div class="grid-menu w-12 border-r border-neutral-300 bg-white/20 backdrop-blur-lg">
        <div class="h-12 border-b border-neutral-300 p-2.5 -mr-1">
          <NuxtImg src="/cosmo-logo.svg" />
        </div>
      </div>

      <div class="grid-header grid grid-cols-3 h-12 items-center border-b border-neutral-300 bg-white/20 p-2 backdrop-blur-lg">
        <div class="col-start-2 justify-self-center sm:justify-self-center px-2 -mt-0.5 sm:mt-0">
          <div class="flex flex-col sm:flex-row items-center sm:items-center gap-0 sm:gap-1">
            <span class="text-blue-400 font-[700] text-xs sm:text-sm">
              COSMO
            </span>
            <span class="text-zinc-6 font-[600] text-xs sm:text-sm whitespace-nowrap">
              智慧校园平台运研中心
            </span>
          </div>
        </div>

        <!-- Window buttons -->
        <div class="col-start-3 mr-1 sm:mr-2 flex justify-self-end gap-2 sm:gap-3 text-zinc-5">
          <UIcon v-if="screen === 'full'" name="i-ph:minus" class="cursor-pointer" @click="screen = 'minimized'" />
          <UIcon v-else name="i-ph:plus" class="cursor-pointer" @click="screen = 'full'" />
          <UIcon name="i-ph:square" class="cursor-pointer" @click="toggle" />
          <UIcon name="i-ph:x" class="cursor-pointer" />
        </div>
      </div>

      <div class="grid-nav border-b border-neutral-300 bg-white/20 backdrop-blur-lg">
        <div class="flex justify-center items-center w-full h-full">
          <UNavigationMenu :items="items" color="neutral" class="flex justify-center items-center flex-1 navigation-menu-spaced" />
        </div>
      </div>

      <div class="grid-main overflow-y-scroll">
        <slot />
      </div>

      <div class="grid-dot flex items-center justify-center border-r border-t border-neutral-300 bg-white/20 backdrop-blur-lg">
        <!-- <div class="h-2 w-2 rounded-full bg-blue" /> -->
      </div>

      <div class="grid-footer grid grid-cols-3 h-12 items-center border-t border-neutral-300 bg-white/20 p-2 text-zinc-6 backdrop-blur-lg">
        <div class="col-start-3 mr-4 flex items-center justify-self-end gap-6">
          <NuxtLink to="https://the1068.pictures/" target="_blank">
            <div class="text-xs font-semibold leading-[0.6rem] font-serif">
              10<br>68
            </div>
          </NuxtLink>
          <NuxtLink to="https://github.com/SMS-COSMO" target="_blank">
            <UIcon name="i-ph:github-logo" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div
      class="fixed right-10 top-20 h-1/3 w-1/5 bg-blue-400 blur-[100px] sm:blur-[200px] -z-10 transition-all"
      :style="`opacity: 0.${count};`"
    />
    <div
      class="fixed bottom-20 left-20 h-1/3 w-1/5 bg-blue-400 blur-[100px] sm:blur-[200px] -z-10 transition-all"
      :style="`opacity: 0.${count};`"
    />
  </div>
</template>

<script setup lang="ts">
const { count, inc, dec } = useCounter(50);
const increasing = ref(true);

useIntervalFn(
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
  300,
);

const screen = ref<'full' | 'minimized'>('full');

const { toggle } = useFullscreen();

const items = ref([
  {
    label: 'Default',
    icon: 'i-lucide-file-braces-corner',
    to: '/',
  },
  {
    label: 'History',
    icon: 'i-lucide-book-open',
    to: '/history',
  },
  {
    label: 'Introduction',
    icon: 'i-lucide-users-round',
    to: '/introduction',
  },
]);
</script>

<style>
.grid-container {
  display: grid;
  grid-template-areas:
    'menu header'
    'menu nav'
    'menu main'
    'dot footer';
  grid-template-columns: 3rem 1fr;
  grid-template-rows: 3rem 3rem 1fr 3rem;
}

.grid-menu {
  grid-area: menu;
}

.grid-header {
  grid-area: header;
}

.grid-footer {
  grid-area: footer;
}

.grid-main {
  grid-area: main;
}

.grid-dot {
  grid-area: dot;
}

.grid-nav {
  grid-area: nav;
  display: flex;
  align-items: center;
  min-height: 3rem;
  padding: 0 1rem;
}

@media (max-width: 640px) {
  .grid-header {
    min-height: 3rem;
    padding: 0.25rem 0.5rem;
  }

  .grid-header .col-start-2 {
    max-width: calc(100% - 4rem);
    overflow: visible;
  }

  .grid-header .col-start-3 {
    min-width: 3rem;
  }
}
</style>
