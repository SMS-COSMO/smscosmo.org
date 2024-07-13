<template>
  <div class="flex flex-col items-center justify-center">
    <NavBar />
    <div class="w-full flex flex-col max-w-6xl items-center justify-center px-4 mt-20 sm:px-8 relative">
      <div class="w-full flex flex-col items-center justify-center gap-y-10 py-20 sm:py-28 z-10">
        <div class="rounded-full bg-blue-100 px-8 py-1 text-blue-600 font-500 font-misans text-lg flex justify-center items-center gap-2">
          <span>
            🎉 我们正在招新
          </span>
          <span class="i-ph-arrow-right-light" />
        </div>
        <div class="relative w-full">
          <h1 class="hero-gradient font-shuhei bg-clip-text text-transparent text-6xl sm:text-8xl text-center relative z-10">
            智造
            <br>
            无限可能
          </h1>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            <svg width="100%" height="100%">
              <text
                class="dashed font-900 font-misans text-7xl sm:text-9xl" x="50%" y="50%" dominant-baseline="middle"
                text-anchor="middle"
              >
                <tspan x="50%" dy="0">COSMO</tspan>
              </text>
            </svg>
          </div>
        </div>
        <button
          type="button"
          class="font-misans text-xl font-500 button-shadow text-zinc-900 border border-zinc-600 rounded-lg px-4 py-2"
        >
          了解更多
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.hero-gradient {
  background-image: linear-gradient(to bottom, #0961B9 0%, #0679E1 26%, #048BFF 65%, #99C2FF 100%);
}

.dashed {
  fill: none;
  --uno: stroke-zinc-600;
  stroke-width: 1px;
  stroke-dasharray: 5px, 5px;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.button-shadow {
  transition: all 0.3s ease-in-out;
  box-shadow:
    0px 1.9px 2.3px rgba(0, 0, 0, 0.009),
    0px 4.5px 5.6px rgba(0, 0, 0, 0.014),
    0px 8.5px 10.5px rgba(0, 0, 0, 0.019),
    0px 15.2px 18.8px rgba(0, 0, 0, 0.025),
    0px 28.4px 35.1px rgba(0, 0, 0, 0.032),
    0px 68px 84px rgba(0, 0, 0, 0.05);
}

.button-shadow:hover {
  box-shadow:
    0px 3.5px 3.2px rgba(0, 0, 0, 0.025),
    0px 8.4px 7.8px rgba(0, 0, 0, 0.034),
    0px 15.8px 14.7px rgba(0, 0, 0, 0.041),
    0px 28.1px 26.1px rgba(0, 0, 0, 0.047),
    0px 52.6px 48.9px rgba(0, 0, 0, 0.054),
    0px 126px 117px rgba(0, 0, 0, 0.07);
}
</style>
