<template>
  <div class="relative h-full w-full flex flex-col justify-center overflow-hidden sm:px-8">
    <TresCanvas class="opacity-50 !absolute !w-full">
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
      <!-- <div class="flex items-center justify-center gap-2 rounded-full bg-blue-100 px-8 py-1 text-lg text-blue-400 font-500 font-misans">
        <span>
          🎉 我们正在招新
        </span>
        <span class="i-ph-arrow-right-light" />
      </div> -->
      <div class="relative w-full">
        <h1 class="hero-gradient relative z-10 bg-clip-text text-center text-7xl text-transparent font-shuhei sm:text-9xl">
          智造
          <br>
          无限可能
        </h1>
        <div class="absolute left-1/2 top-[58%] sm:top-1/2 w-full -translate-x-1/2 -translate-y-1/2">
          <svg width="100%" height="100%">
            <text
              class="dashed text-8xl font-[900] sm:text-[10rem] stroke-zinc-600" x="50%" y="56%"
              style="font-family: 'misans', sans-seri f;"
              dominant-baseline="middle"
              text-anchor="middle"
            >
              <tspan x="50%" dy="0">COSMO</tspan>
            </text>
          </svg>
        </div>
      </div>
      <div class="text-center text-gray-500 dark:text-gray-400 text-2xl font-medium">
        <p>From COSMO，to the cosmos.</p>
      </div>
    </div>

    <!-- 向下箭头指示器 -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
      <div class="animate-bounce-slow">
        <svg class="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
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
  stroke-width: 1px;
  stroke-dasharray: 5px, 5px;
  stroke-linejoin: round;
  stroke-linecap: round;
}

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}
</style>
