import { defineCollection, defineContentConfig, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    history: defineCollection({ // 编年史（届）
      type: 'page',
      source: 'history/**/*.md',
      schema: z.object({
        date: z.string(),
      }),
    }),
    members: defineCollection({ // 人员介绍
      type: 'page',
      source: 'members/**/*.md',
      schema: z.object({
        date: z.string(),
      }),
    }),
    projects: defineCollection({ // 项目介绍
      type: 'page',
      source: 'projects/**/*.md',
      schema: z.object({
        date: z.string(),
      }),
    }),
  },
});
