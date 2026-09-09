# hosek.cc

Personal portfolio — Astro, Tailwind CSS v4, fully static.

## Commands

| Command           | Action                              |
| :---------------- | :---------------------------------- |
| `npm install`     | Install dependencies                |
| `npm run dev`     | Dev server at http://localhost:4321 |
| `npm run build`   | Type-check, then build to `./dist/` |
| `npm run preview` | Serve the production build locally  |
| `npm run check`   | Type-check only (`astro check`)     |
| `npm run format`  | Format everything with Prettier     |

## Structure

```
src/
├─ consts.ts              Name, email, socials, nav
├─ content.config.ts      Schema for the `work` collection
├─ content/work/          One Markdown file per project
│  └─ _template.md        Copy this to start a new one
├─ lib/work.ts            Shared queries: sorting, featured, draft handling
├─ styles/global.css      Tailwind entry + your design tokens
├─ components/            BaseHead, Header, Footer, ProjectCard
├─ layouts/BaseLayout.astro
└─ pages/
   ├─ index.astro         Hero, work, about, contact
   ├─ work/index.astro    All projects
   ├─ work/[...slug].astro  Case study, one per Markdown file
   └─ 404.astro
```

## Adding a project

1. Copy `src/content/work/_template.md` to `src/content/work/my-project.md`.
   The filename becomes the URL (`/work/my-project`).
2. Fill in the frontmatter. The schema in `src/content.config.ts` is enforced —
   `npm run check` reports any field that's missing or the wrong type.
3. Keep `draft: true` while writing: drafts appear in `dev` and are excluded
   from `build`. Set `featured: true` to surface it on the homepage.

Images go next to the Markdown file and are referenced relatively
(`cover: ./cover.png`). Astro optimises and resizes them at build time, so
commit the full-size original.

## Deploying

The build is fully static (`./dist/`) with no adapter, so it drops onto Vercel,
Netlify, Cloudflare Pages or GitHub Pages as-is. Build command `npm run build`,
output directory `dist`.

Before the first deploy, check that `site` in `astro.config.mjs`, `SITE.url` in
`src/consts.ts` and the sitemap URL in `public/robots.txt` all point at the real
domain — canonical URLs, the sitemap and social previews depend on it.
