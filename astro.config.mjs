// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://hosek.cc',
  integrations: [sitemap()],
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
