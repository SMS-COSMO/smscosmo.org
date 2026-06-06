<template>
  <div
    class="relative w-full h-150 md:h-112.5 sm:h-87.5 flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#1a1a2e_0%,#0f0f1a_100%)]"
  >
    <div class="absolute inset-0 pointer-events-none">
      <div
        v-for="star in stars"
        :key="star.id"
        class="absolute rounded-full bg-white animate-pulse opacity-70"
        :style="{
          left: star.left,
          top: star.top,
          width: star.size,
          height: star.size,
          animationDelay: star.animationDelay,
          animationDuration: star.animationDuration,
        }"
      />
    </div>

    <div class="relative w-full h-full flex items-center justify-center">
      <div class="absolute w-12 h-12 z-10">
        <div
          class="absolute inset-0 rounded-full shadow-[0_0_20px_#ffd700,0_0_40px_#ffa500,0_0_60px_#ff8c00] animate-[pulse_4s_ease-in-out_infinite]"
          style="background: radial-gradient(circle at 30% 30%, #fff5c0, #ffd700, #ff8c00);"
        />
        <div
          class="absolute inset-[-25%] rounded-full animate-pulse"
          style="background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%); animation-duration: 3s;"
        />
      </div>

      <div class="relative w-full h-full flex items-center justify-center">
        <div
          v-for="(planet, index) in planets"
          :key="planet.name"
          class="absolute rounded-full pointer-events-none"
          :style="getOrbitStyle(index)"
        >
          <div
            class="absolute inset-0 animate-spin"
            :style="{ animationDuration: planet.period }"
          >
            <div
              class="absolute top-1/2 left-1/2 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-125"
              :style="getPlanetStyle(planet, index)"
              @mouseenter="hoveredPlanet = planet.name"
              @mouseleave="hoveredPlanet = null"
            >
              <div
                class="relative rounded-full shadow-[inset_-3px_-3px_10px_rgba(0,0,0,0.4),0_0_10px_rgba(255,255,255,0.1)] transition-shadow duration-300 ease-in-out"
                :style="{ background: planet.color, width: '100%', height: '100%' }"
              >
                <div
                  v-if="planet.name === '土星'"
                  class="absolute left-1/2 top-1/2 h-[40%] w-[180%] rounded-full border border-white/50 pointer-events-none"
                  style="transform: translate(-50%, -50%) rotateX(75deg);"
                />
              </div>
            </div>
          </div>

          <div
            class="absolute inset-0 border border-white/10 rounded-full opacity-70 animate-pulse"
            :style="{ animationDuration: planet.period }"
          />
        </div>
      </div>
    </div>

    <Transition
      enter-from-class="opacity-0"
      enter-active-class="transition-opacity duration-300"
      leave-to-class="opacity-0"
      leave-active-class="transition-opacity duration-300"
    >
      <div
        v-if="hoveredPlanet"
        class="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl px-6 py-4 text-center text-white"
      >
        <div class="text-lg font-semibold">
          {{ hoveredPlanet }}
        </div>
        <div class="mt-2 text-sm text-white/70">
          {{ getPlanetInfo(hoveredPlanet) }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const hoveredPlanet = ref<string | null>(null);

const planets = [
  { name: '1', color: 'radial-gradient(circle at 30% 30%, #b5b5b5, #8c8c8c)', size: 8, period: '8s' },
  { name: '2', color: 'radial-gradient(circle at 30% 30%, #ffd700, #daa520)', size: 12, period: '12s' },
  { name: '3', color: 'radial-gradient(circle at 30% 30%, #4a90d9, #2e5a1c)', size: 14, period: '16s' },
  { name: '4', color: 'radial-gradient(circle at 30% 30%, #ff6b4a, #c1440e)', size: 10, period: '20s' },
  { name: '5', color: 'radial-gradient(circle at 30% 30%, #d4a574, #b8860b)', size: 28, period: '28s' },
  { name: '6', color: 'radial-gradient(circle at 30% 30%, #f4d58d, #d4a574)', size: 24, period: '36s' },
  { name: '7', color: 'radial-gradient(circle at 30% 30%, #7de3f4, #4fa4b5)', size: 18, period: '48s' },
];

const stars = Array.from({ length: 100 }, (_, i) => {
  const size = Math.random() * 2 + 1;
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const delay = Math.random() * 3;
  const duration = Math.random() * 2 + 1;
  return {
    id: i,
    left: `${x}%`,
    top: `${y}%`,
    size: `${size}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  };
});

function getOrbitStyle(index: number) {
  const baseRadius = 60;
  const radiusIncrement = 45;
  const radius = baseRadius + index * radiusIncrement;
  return {
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
  };
}

function getPlanetStyle(planet: typeof planets[0], index: number) {
  const baseRadius = 60;
  const radiusIncrement = 45;
  const radius = baseRadius + index * radiusIncrement;
  return {
    width: `${planet.size}px`,
    height: `${planet.size}px`,
    transform: `translate(-50%, -50%) translateX(${radius}px)`,
  };
}

function getPlanetInfo(name: string) {
  const info: Record<string, string> = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
  };
  return info[name] || '';
}
</script>
