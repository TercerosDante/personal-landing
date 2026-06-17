# Ronald Terceros — Personal Site

Personal portfolio for Ronald Terceros (Full-Stack Engineer), built with [Astro](https://astro.build) and deployed on Vercel as a fully **static** site.

> **Status — scaffold only.** The portfolio currently lives as raw HTML in [`POC/`](./POC) and has **not** been integrated into the Astro app yet. The home page is a placeholder.

## Requirements

- **Node.js ≥ 22.12** (required by Astro 6). `.nvmrc` pins Node `22`.

## Commands

| Command           | Action                                          |
| ----------------- | ----------------------------------------------- |
| `npm install`     | Install dependencies                            |
| `npm run dev`     | Start the dev server at `http://localhost:4321` |
| `npm run build`   | Build the static site to `dist/`                |
| `npm run preview` | Preview the production build locally            |
| `npm run check`   | Type-check the project (`astro check`)          |
| `npm run format`  | Format with Prettier                            |

## Project structure

```text
src/
  components/Icon.astro   # build-time SVG icon — inlines only-used icons, no CDN
  layouts/Layout.astro    # base HTML document
  pages/index.astro       # placeholder home page
public/                   # static assets served as-is (favicon, …)
POC/                      # original hand-built portfolio (raw HTML) — to be integrated
```

## Performance approach

This scaffold is set up to keep the eventual portfolio fast:

- **Images** — Astro's built-in [`astro:assets`](https://docs.astro.build/en/guides/images/) (Sharp) converts source images to WebP/AVIF with responsive sizes at build time. (The POC screenshots are 1.4–1.9 MB PNGs.)
- **Icons** — `src/components/Icon.astro` inlines only the icons actually referenced from `@iconify-json/devicon` at build time. No icon-font CDN, no runtime JS.
- **Fonts** — to be self-hosted/subset with Astro's built-in Fonts API (removes the Google Fonts CDN).
- **Static output** — no server runtime; nothing extra ships to the browser.

## Deployment (Vercel)

Push to GitHub and import the repository on [Vercel](https://vercel.com). It auto-detects Astro (build `astro build`, output `dist/`, Node 22) — **no adapter and no `vercel.json` needed** for a static site.
