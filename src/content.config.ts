import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One markdown file per project in src/content/work.
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.number(),
      /** Shown joined with " & ". */
      role: z.array(z.string()).default([]),
      /** The mockup. Optional so a project can exist before it has one. */
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Live site, when there is one. */
      url: z.url().optional(),
      /** Shown on the homepage rail (all projects if none are featured). */
      featured: z.boolean().default(false),
      /** Lowest first. */
      order: z.number().default(0),
      draft: z.boolean().default(false),
    }),
});

export const collections = { work };
