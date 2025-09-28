import { defineCollection, defineContentConfig, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    history: defineCollection({
      type: 'page',
      source: 'history/**/*.md',
      schema: z.object({
        date: z.string(),
      }),
    }),
    introduction: defineCollection({
      type: 'page',
      source: 'introduction/**/*.md',
      schema: z.object({
        date: z.string(),
      }),
    }),
  },
});
