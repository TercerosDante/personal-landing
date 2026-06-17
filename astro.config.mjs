// @ts-check
import { defineConfig } from "astro/config";

// Static output by default (no adapter). Vercel auto-detects Astro and deploys
// this with zero configuration (build `astro build`, output `dist/`).
// https://docs.astro.build/en/guides/deploy/vercel/
export default defineConfig({
  // Set the production URL once a domain exists — enables canonical URLs and,
  // later, a sitemap:
  // site: 'https://ronaldterceros.dev',
});
