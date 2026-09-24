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

      /* ---- Case study only. Nothing below is read by the rail or /work. ---- */

      /**
       * The hero's headline — the one-line claim the project makes. Falls
       * back to `title`, so a project without one still has a hero.
       */
      headline: z.string().optional(),
      /** Second hero line, under the headline. Quieter than it. */
      standfirst: z.string().optional(),
      /**
       * The statement: one sentence, set large and alone between the hero
       * media and the body. Falls back to `summary`.
       */
      statement: z.string().optional(),
      /**
       * Opening line of the case study, above the body. Falls back to
       * `summary` so a project needs only one blurb until it earns two.
       */
      intro: z.string().optional(),
      /**
       * Hero media, directly under the headline and above the statement.
       * A video in /public, or an image in src/assets.
       */
      hero: z
        .object({
          kind: z.enum(['image', 'video']).default('image'),
          src: z.union([image(), z.string()]),
          alt: z.string().default(''),
          poster: image().optional(),
        })
        .optional(),
      /**
       * The spec strip: label/value pairs rendered in source order, so a
       * project can list Client, Timeline, Team or anything else without the
       * schema having to know the field names in advance.
       */
      facts: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .default([]),
      /** Tools and technologies, rendered as a plain list. */
      stack: z.array(z.string()).default([]),
      /** What was shipped. */
      deliverables: z.array(z.string()).default([]),
      /**
       * The media run after the body. `src` is an image in src/assets
       * (resolved and optimised at build), or a video path under /public —
       * `kind` says which, since only images can go through <Image>.
       *
       * `span` is what makes the run read as a composition rather than a
       * stack: `full` takes the width, `half` pairs up with the next `half`.
       * Ordering is the author's, so the rhythm is decided in the markdown
       * file rather than by a rule in the template.
       */
      gallery: z
        .array(
          z.object({
            kind: z.enum(['image', 'video']).default('image'),
            src: z.union([image(), z.string()]),
            alt: z.string().default(''),
            /** Shown under the media. */
            caption: z.string().optional(),
            /** Poster frame for a video. */
            poster: image().optional(),
            span: z.enum(['full', 'half']).default('full'),
          }),
        )
        .default([]),
      /**
       * Per-page social card. Falls back to the site default, not to `cover`:
       * covers are cropped for the rail's tall tiles and read badly at 1.91:1.
       */
      ogImage: z.string().optional(),
    }),
});

export const collections = { work };
