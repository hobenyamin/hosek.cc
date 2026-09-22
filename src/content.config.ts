import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * One markdown file per project in src/content/work. The body is the case
 * study for /work/[id]; everything the rail and the work index need lives in
 * the frontmatter, so neither has to parse prose to lay itself out.
 */
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      year: z.number(),
      /** Joined with " & " for the rail's discipline line. */
      role: z.array(z.string()).default([]),
      /** Optional so a project can exist before its cover art does. */
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Live site, when there is one. */
      url: z.string().url().optional(),
      summary: z.string().optional(),
      /** Homepage rail shows these; falls back to all when none are set. */
      featured: z.boolean().default(false),
      /** Ascending — lowest first in the rail. */
      order: z.number().default(0),
      draft: z.boolean().default(false),
    }),
});

export const collections = { work };
