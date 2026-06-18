# Ronald Terceros — Portfolio

Personal portfolio for **Ronald Terceros** (Full-Stack Engineer), built with
[Astro](https://astro.build) as a fully **static**, bilingual (EN/ES) site and deployed on Vercel at
**[ronaldterceros.com](https://ronaldterceros.com)**.

Performance-first: no UI framework, `astro` is the only runtime dependency, and the client ships a
single ~3 KB (gzipped) script.

## Highlights

- **Static Astro 6** — no adapter, Vercel zero-config.
- **Bilingual** — English by default with an in-place EN ⇄ ES toggle (no reload, no i18n library).
- **Optimized assets** — `astro:assets` AVIF/WebP responsive images, self-hosted subset fonts
  (Astro Fonts API), build-time inlined SVG icons. No third-party CDNs.
- **SEO** — canonical, Open Graph + Twitter cards, JSON-LD `Person`, sitemap, robots.txt, custom
  1200×630 share image.
- **Accessible** — WCAG AA contrast, landmarks, correct heading order.

## Requirements

- **Node.js ≥ 22.12** (Astro 6). `.nvmrc` pins Node `22`.

## Commands

| Command           | Action                                          |
| ----------------- | ----------------------------------------------- |
| `npm install`     | Install dependencies                            |
| `npm run dev`     | Dev server at `http://localhost:4321`           |
| `npm run build`   | Build the static site to `dist/`                |
| `npm run preview` | Preview the production build locally            |
| `npm run check`   | Type-check the project (`astro check`)          |
| `npm run format`  | Format with Prettier                            |

## Project structure

```text
src/
  pages/index.astro      # the single page (composes the section components)
  layouts/Layout.astro   # <head> (SEO + fonts), embeds the ES i18n payload, loads the client script
  components/            # Nav · Hero · Experience · Projects · Stack · Education · Contact · Footer
                        # + Background · Lightbox · Boot · Icon
  data/                  # structural data only (tech tokens, icons, colors, images, dates)
  i18n/content.ts        # all reader-facing copy, English + Spanish, typed
  scripts/client.ts      # all client behaviour (bundled, typed)
  scripts/i18n.ts        # the EN/ES in-place swap engine
  styles/global.css      # single design-system stylesheet (design tokens + all rules)
  assets/                # images processed by astro:assets
public/                  # served as-is: favicon, og.png, resume.pdf, robots.txt, sitemap.xml
```

## Editing content

All copy lives in **`src/i18n/content.ts`** (both locales). The `Content` interface keeps the English
and Spanish trees in sync. The `src/data/*.ts` files hold only non-text structure. See
[`CLAUDE.md`](./CLAUDE.md) for the architecture, i18n mechanism, and conventions in detail.

## Deployment (Vercel)

Vercel auto-detects Astro (build `astro build`, output `dist/`, Node 22) — **no adapter and no
`vercel.json`** for a static site. The production domain is configured on the Vercel project.
