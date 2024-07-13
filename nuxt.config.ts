// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
  ],
  devtools: { enabled: true },
  css: ['@unocss/reset/tailwind.css', './assets/main.css'],
});
