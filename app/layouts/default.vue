<template>
  <!-- <LoadingAnimation class="z-100" /> -->
  <div class="p-2 w-full h-dvh fixed top-0 left-0 overflow-y-scroll hide-scrollbar">
    <!-- <div
      class="overflow-clip border border-neutral-300 rounded-md transition-all duration-700"
      :class="[screen === 'full' ? 'w-full h-full' : 'w-[90%] h-[90%]']"
    > -->
    <div class="flex justify-center w-full">
      <Navigation />
    </div>

    <div class="grid-main">
      <slot />
    </div>

    <div class="grid-dot flex items-center justify-center border-r border-t border-neutral-300 bg-white/20 backdrop-blur-lg">
      <!-- <div class="h-2 w-2 rounded-full bg-blue" /> -->
    </div>

    <div class="grid-footer h-12 items-center border-t border-neutral-300 bg-white/20 p-2 text-zinc-6 backdrop-blur-lg">
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
    <!-- </div> -->

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

// const screen = ref<'full' | 'minimized'>('full');

// const { toggle } = useFullscreen();

// const items = ref([
//   {
//     label: 'Default',
//     icon: 'i-lucide-file-braces-corner',
//     to: '/',
//   },
//   {
//     label: 'History',
//     icon: 'i-lucide-book-open',
//     to: '/history',
//   },
//   {
//     label: 'Introduction',
//     icon: 'i-lucide-users-round',
//     to: '/introduction',
//   },
// ]);
</script>

<style>
.grid-footer {
  grid-area: footer;
}

@media (max-width: 640px) {

}
</style>
