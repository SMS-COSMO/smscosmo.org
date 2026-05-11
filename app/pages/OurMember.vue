<template>
  <div class="relative min-h-screen flex justify-center items-center overflow-hidden bg-gradient-to-b from-[#0a0e27] to-black">
    <div ref="starfield" class="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />

    <div class="relative w-[800px] h-[800px] mx-auto z-10">
      <div
        class="absolute top-1/2 left-1/2 w-[50px] h-[50px] rounded-full z-10"
        :style="{
          background: 'radial-gradient(circle, #ffd700, #ff8c00)',
          boxShadow: '0 0 40px #ffa500',
          transform: 'translate(-50%, -50%)',
        }"
      />

      <div
        v-for="(orbit, index) in orbits"
        :key="`orbit-${index}`"
        class="absolute top-1/2 left-1/2 border border-white/20"
        :style="{
          width: `${orbit.width * scale}px`,
          height: `${orbit.height * scale}px`,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
        }"
      />

      <div
        v-for="(planet, index) in planets"
        :key="`planet-${index}`"
        :ref="el => planetRefs[index] = el"
        class="absolute flex justify-center items-center"
      >
        <div
          class="rounded-full flex justify-center items-center"
          :style="{
            width: `${planet.size * scale}px`,
            height: `${planet.size * scale}px`,
            background: planet.color,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
          }"
        >
          <div
            class="text-white font-bold text-center whitespace-nowrap"
            :style="{
              fontSize: `${planet.fontSize * scale}px`,
              textShadow: '0 0 4px rgba(0, 0, 0, 0.9)',
            }"
          >
            {{ planet.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SolarSystem',
  data() {
    return {
      orbits: [
        { width: 200, height: 100 },
        { width: 400, height: 200 },
        { width: 600, height: 300 },
        { width: 800, height: 400 },
        { width: 1000, height: 500 },
        { width: 1200, height: 600 },
        { width: 1400, height: 700 },
      ],
      planets: [
        { text: '第一届', size: 30, fontSize: 9, color: 'radial-gradient(circle at 30% 30%, #5bb5e8, #094c76)', a: 100, b: 50, period: 6 },
        { text: '第二届', size: 38, fontSize: 10, color: 'radial-gradient(circle at 30% 30%, #ff6b6b, #bb0303)', a: 200, b: 100, period: 10 },
        { text: '第三届', size: 41, fontSize: 11, color: 'radial-gradient(circle at 30% 30%, #7ec8ff, #49a1e4)', a: 300, b: 150, period: 14 },
        { text: '第四届', size: 38, fontSize: 11, color: 'radial-gradient(circle at 30% 30%, #ff8a7a, #dd5347)', a: 400, b: 200, period: 18 },
        { text: '第五届', size: 60, fontSize: 14, color: 'radial-gradient(circle at 30% 30%, #f0e68c, #b8b124)', a: 500, b: 250, period: 22 },
        { text: '第六届', size: 53, fontSize: 13, color: 'radial-gradient(circle at 30% 30%, #e6e673, #7b7906)', a: 600, b: 300, period: 26 },
        { text: '第七届', size: 45, fontSize: 12, color: 'radial-gradient(circle at 30% 30%, #7df0f5, #2cc9d7)', a: 700, b: 350, period: 30 },
      ],
      angles: [0, 0, 0, 0, 0, 0, 0],
      animationId: null,
      scale: 1,
      planetRefs: [],
      starAnimationIds: [],
    };
  },
  mounted() {
    this.calculateScale();
    window.addEventListener('resize', this.calculateScale);
    this.startAnimation();
    this.$nextTick(() => {
      this.createStars();
    });
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.calculateScale);
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.starAnimationIds.forEach(id => cancelAnimationFrame(id));
  },
  methods: {
    calculateScale() {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const baseWidth = 1400;
      const baseHeight = 700;

      const scaleX = (screenWidth * 0.9) / baseWidth;
      const scaleY = (screenHeight * 0.8) / baseHeight;
      this.scale = Math.min(scaleX, scaleY, 1);
    },

    startAnimation() {
      const animate = () => {
        const time = Date.now() / 1000;
        this.planets.forEach((planet, index) => {
          const angularVelocity = (2 * Math.PI) / planet.period;
          this.angles[index] = angularVelocity * time;
          this.updatePlanetPosition(index);
        });
        this.animationId = requestAnimationFrame(animate);
      };
      animate();
    },

    updatePlanetPosition(index) {
      const planet = this.planets[index];
      const el = this.planetRefs[index];
      if (!el)
        return;

      const angle = this.angles[index];
      const x = planet.a * Math.cos(angle) * this.scale;
      const y = planet.b * Math.sin(angle) * this.scale;

      el.style.left = `calc(50% + ${x}px)`;
      el.style.top = `calc(50% + ${y}px)`;
      el.style.transform = 'translate(-50%, -50%)';
    },

    createStars() {
      const starfield = this.$refs.starfield;
      if (!starfield)
        return;

      const starCount = window.innerWidth < 768 ? 150 : 300;

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'absolute bg-white rounded-full';
        star.style.cssText = `
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          width: ${Math.random() * 3 + 1}px;
          height: ${Math.random() * 3 + 1}px;
        `;

        starfield.appendChild(star);

        this.animateStar(star, i);
      }
    },

    animateStar(star, index) {
      const duration = (Math.random() * 3 + 2) * 1000;
      const delay = Math.random() * 3000;
      const startTime = Date.now() + delay;

      const animate = () => {
        const now = Date.now();
        if (now < startTime) {
          const id = requestAnimationFrame(animate);
          this.starAnimationIds[index] = id;
          return;
        }

        const elapsed = (now - startTime) % duration;
        const progress = elapsed / duration;

        const opacity = 0.3 + 0.7 * (Math.sin(progress * Math.PI * 2) + 1) / 2;
        const scale = 1 + 0.2 * Math.sin(progress * Math.PI * 2);

        star.style.opacity = opacity;
        star.style.transform = `scale(${scale})`;

        const id = requestAnimationFrame(animate);
        this.starAnimationIds[index] = id;
      };

      animate();
    },
  },
};
</script>
