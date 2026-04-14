/* eslint-disable no-console */

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.dev) {
    return;
  }
  nuxtApp.vueApp.config.errorHandler = () => {
    console.log('未知错误');
  };
});
