// uno.config.ts
import type { breakpointsAntDesign } from '@vueuse/core';
import { defineConfig, presetIcons, presetUno, presetWebFonts, transformerDirectives } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetWebFonts({
      fonts: {
        shuhei: {
          provider: 'none',
          name: 'AlimamaShuHeiTi',
        },
        uncut: {
          provider: 'none',
          name: 'Uncut Sans',
        },
        misans: {
          provider: 'none',
          name: 'MiSans',
        },
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    breakpoints: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
});
