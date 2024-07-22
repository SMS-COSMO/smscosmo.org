<template>
  <!-- <LoadingAnimation class="z-100" /> -->
  <div class="p-2 h-dvh">
    <div
      class="grid-container overflow-clip border rounded-md transition-all duration-700"
      :class="[screen === 'full' ? 'w-full h-full' : 'w-90% h-90%']"
    >
      <div class="grid-menu w-12 border-r bg-white/20 backdrop-blur-lg">
        <div class="h-12 border-b p-2.5 -mr-1">
          <NuxtImg src="/cosmo-logo.svg" />
        </div>
      </div>

      <div class="grid-header grid grid-cols-3 h-12 items-center border-b bg-white/20 p-2 backdrop-blur-lg">
        <div class="col-start-2 justify-self-center">
          <span class="mr-1 text-blue font-700">
            COSMO
          </span>
          <span class="text-zinc-6 font-600">
            智慧校园平台运研中心
          </span>
        </div>

        <!-- Window buttons -->
        <div class="col-start-3 mr-2 flex justify-self-end gap-3 text-zinc-5">
          <div v-if="screen === 'full'" class="i-ph:minus cursor-pointer" @click="screen = 'minimized'" />
          <div v-else class="i-ph:plus cursor-pointer" @click="screen = 'full'" />
          <div class="i-ph:square cursor-pointer" @click="toggle" />
          <div class="i-ph:x cursor-pointer" />
        </div>
      </div>

      <div class="grid-main overflow-y-scroll">
        <slot />
      </div>

      <div class="grid-dot flex items-center justify-center border-r border-t bg-white/20 backdrop-blur-lg">
        <!-- <div class="h-2 w-2 rounded-full bg-blue" /> -->
      </div>

      <div class="grid-footer grid grid-cols-3 h-12 items-center border-t bg-white/20 p-2 text-zinc-6 backdrop-blur-lg">
        <div class="col-start-3 mr-4 flex items-center justify-self-end gap-6">
          <NuxtLink to="https://the1068.pictures/" target="_blank">
            <div class="text-xs font-semibold leading-[0.6rem] font-serif">
              10<br>68
            </div>
          </NuxtLink>
          <NuxtLink to="https://github.com/SMS-COSMO" target="_blank">
            <div class="i-ph:github-logo" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div
      class="fixed right-10 top-20 h-1/3 w-1/5 bg-blue blur-200 -z-10"
      :style="`opacity: 0.${count};`"
    />
    <div
      class="fixed bottom-20 left-20 h-1/3 w-1/5 bg-blue blur-200 -z-10"
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
</script>

<style>
.grid-container {
  display: grid;
  grid-template-areas:
    'menu header'
    'menu main'
    'dot footer';
  grid-template-columns: 3rem 1fr;
  grid-template-rows: 3rem 1fr 3rem;
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
</style>
