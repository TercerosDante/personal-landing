// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// Static output by default (no adapter). Vercel auto-detects Astro and deploys
// this with zero configuration. https://docs.astro.build/en/guides/deploy/vercel/
export default defineConfig({
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

  // Set the production URL once a domain exists (canonical URLs, future sitemap):
  // site: 'https://ronaldterceros.com',
});
