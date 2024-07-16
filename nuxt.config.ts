// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@tresjs/nuxt',
  ],
  css: [
    '@unocss/reset/tailwind.css',
    './assets/main.css',
  ],
});
