<template>
  <div class="w-full flex flex-col justify-center overflow-hidden h-svh sm:px-8">
    <TresCanvas class="opacity-50 absolute! w-full!">
      <TresPerspectiveCamera
        :position="[0, 0, 3]"
        :fov="75"
      />

      <Suspense>
        <Text3D
          :position="[-2, 1, 0]"
          text="#"
          font="/FiraCodeRegular.json"
          :bevel-thickness="0.01"
          :bevel-size="0.02"
          :bevel-segments="40"
          :size="0.6"
          :curve-segments="10"
        >
          <TresMeshMatcapMaterial :matcap="matcapTexture" />
        </Text3D>
      </Suspense>
      <Suspense>
        <Text3D
          :position="[1, 1.3, 0]"
          text="{"
          font="/FiraCodeRegular.json"
          :bevel-thickness="0.01"
          :bevel-size="0.02"
          :bevel-segments="40"
          :size="0.6"
          :curve-segments="10"
        >
          <TresMeshMatcapMaterial :matcap="matcapTexture" />
        </Text3D>
      </Suspense>
      <Suspense>
        <Text3D
          :position="[1, -1.5, 0]"
          text=">"
          font="/FiraCodeRegular.json"
          :bevel-thickness="0.01"
          :bevel-size="0.02"
          :bevel-segments="40"
          :size="0.5"
          :curve-segments="10"
        >
          <TresMeshMatcapMaterial :matcap="matcapTexture" />
        </Text3D>
      </Suspense>
      <Suspense>
        <Text3D
          :position="[-2.6, -1.2, 0]"
          text="["
          font="/FiraCodeRegular.json"
          :bevel-thickness="0.01"
          :bevel-size="0.02"
          :bevel-segments="40"
          :size="0.6"
          :curve-segments="10"
        >
          <TresMeshMatcapMaterial :matcap="matcapTexture" />
        </Text3D>
      </Suspense>
      <Suspense>
        <Text3D
          :position="[2.4, -0.1, 0.3]"
          text="/"
          font="/FiraCodeRegular.json"
          :bevel-thickness="0.01"
          :bevel-size="0.02"
          :bevel-segments="40"
          :size="0.5"
          :curve-segments="10"
        >
          <TresMeshMatcapMaterial :matcap="matcapTexture" />
        </Text3D>
      </Suspense>

      <TresDirectionalLight :position="[0, 2, 4]" :intensity="1.2" cast-shadow />
      <MouseParallax
        :factor="0.5"
        :ease="3"
      />
    </TresCanvas>

    <div class="z-10 w-full flex flex-col items-center justify-center gap-y-10 py-20 sm:py-28">
      <div class="flex items-center justify-center gap-2 rounded-full bg-blue-100 px-8 py-1 text-lg text-blue-600 font-500 font-misans">
        <span>
          🎉 我们正在招新
        </span>
        <span class="i-ph-arrow-right-light" />
      </div>
      <div class="relative w-full">
        <h1 class="hero-gradient relative z-10 bg-clip-text text-center text-6xl text-transparent font-shuhei sm:text-8xl">
          智造
          <br>
          无限可能
        </h1>
        <div class="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2">
          <svg width="100%" height="100%">
            <text
              class="dashed text-7xl font-900 font-misans sm:text-9xl" x="50%" y="50%"
              dominant-baseline="middle"
              text-anchor="middle"
            >
              <tspan x="50%" dy="0">COSMO</tspan>
            </text>
          </svg>
        </div>
      </div>
      <button
        type="button"
        class="button-shadow border border-zinc-600 rounded-lg px-4 py-2 text-xl text-zinc-900 font-500 font-misans"
      >
        了解更多
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const matcapTexture = await useTexture(['/22.png']);
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
