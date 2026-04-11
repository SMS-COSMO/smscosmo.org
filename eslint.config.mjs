import antfu from '@antfu/eslint-config';
import onlyTailwindPlugin from './eslint-local-plugin.mjs';

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: true,
  },
  typescript: true,
  vue: true,
  ignores: ['.github/**/*', 'public/**'],
}, {
  plugins: {
    cosmo: onlyTailwindPlugin,
  },
  rules: {
    'style/brace-style': ['warn', '1tbs', { allowSingleLine: true }],
    'vue/block-order': ['error', {
      order: ['template', 'script', 'style'],
    }],
    'cosmo/only-tailwind': 'error',
  },
});
