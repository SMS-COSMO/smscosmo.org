// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@tresjs/nuxt',
    '@nuxt/image',
  ],
  fonts: {
    families: [
      { name: 'shuhei', src: '/ShuHeiTi.woff2', provider: 'local', preload: true },
      { name: 'misans', src: '/MiSans.woff2', provider: 'local', preload: true },
    ],
  },
  css: ['~/assets/css/main.css'],
});
