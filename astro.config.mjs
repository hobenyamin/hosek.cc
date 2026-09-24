// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://hosek.cc',
  integrations: [sitemap()],

  // URLs without a trailing slash (/about). Pages build as about.html and
  // Vercel's cleanUrls serves them at /about.
  trailingSlash: 'never',
  build: { format: 'file' },

  // Load pages on link hover so navigation feels instant.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: [{
      provider: fontProviders.local(),
      name: "Satoshi",
      cssVariable: "--font-satoshi",
      options: {
        variants: [{
          src: ['./src/fonts/Satoshi-Variable.woff2'],
        }]
      }
    }]
});
