// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import vercel from '@astrojs/vercel';

// Static output (the default) plus the Vercel adapter: every page is
// prerendered to a static file, and only the on-demand contact endpoint
// (src/pages/api/contact.ts, `export const prerender = false`) ships as a
// Vercel Serverless Function. https://docs.astro.build/en/guides/integrations-guide/vercel/
export default defineConfig({
  adapter: vercel(),

  // Canonical production URL — used for canonical tags, absolute OG/Twitter
  // image URLs and sitemap.xml. The site must be served from this domain (added
  // to the Vercel project) for shares to resolve.
  site: 'https://ronaldterceros.com',

  // Self-hosted, subset, preloaded fonts via Astro's built-in Fonts API —
  // no render-blocking Google Fonts CDN. https://docs.astro.build/en/guides/fonts/
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Archivo',
      cssVariable: '--font-archivo',
      weights: [500, 600, 700, 800, 900],
      subsets: ['latin'],
      styles: ['normal'],
    },
    {
      provider: fontProviders.google(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-mono',
      weights: [300, 400, 500, 600],
      subsets: ['latin'],
      styles: ['normal'],
    },
  ],
});
