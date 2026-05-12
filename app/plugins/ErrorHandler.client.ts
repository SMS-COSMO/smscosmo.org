/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.dev) {
    return;
  }

  nuxtApp.vueApp.config.errorHandler = () => {
    console.log('未知错误');
  };

  // 以下代码逻辑来自AI，有修改

  window.addEventListener('error', (event) => {
    const { filename, message, error, target } = event;

    // 资源加载错误（script、link、img 等）
    if (target && (
      target instanceof HTMLScriptElement
      || target instanceof HTMLLinkElement
      || target instanceof HTMLImageElement
      || target instanceof HTMLVideoElement
      || target instanceof HTMLAudioElement)) {
      console.error('网络资源加载失败，请检查网络');
    } else {
      // JS 运行时错误
      console.log('未知错误');
    }

    // 阻止事件传递
    event.stopPropagation();
    event.preventDefault();
  });

  // 捕获 Promise 未处理的 reject（如动态 import 失败）
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;

    // 判断是否为资源加载相关的错误
    if (reason?.message?.includes('Failed to fetch')
      || reason?.message?.includes('NetworkError')
      || reason?.message?.includes('Loading chunk')) {
      console.error('网络资源加载失败，请检查网络');
    } else {
      console.log('未知错误');
    }

    // 阻止事件传递
    event.stopPropagation();
    event.preventDefault();
  });
});
