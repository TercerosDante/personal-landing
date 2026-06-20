# Ronald Terceros — Portfolio

Personal portfolio for **Ronald Terceros** (Full-Stack Engineer), built with
[Astro](https://astro.build) as a fully **static**, bilingual (EN/ES) site and deployed on Vercel at
**[ronaldterceros.com](https://ronaldterceros.com)**.

Performance-first: no UI framework and a zero-dependency client bundle (a single ~3 KB gzipped
script). The only server-side code is the contact endpoint, which runs as a Vercel Serverless
Function via the `@astrojs/vercel` adapter; every page is still prerendered to static HTML.

## Highlights

- **Static Astro 6 with the `@astrojs/vercel` adapter** — every page prerendered; only the contact
  form runs on demand as a serverless function.
- **Bilingual** — English by default with an in-place EN ⇄ ES toggle (no reload, no i18n library).
- **Optimized assets** — `astro:assets` AVIF/WebP responsive images, self-hosted subset fonts
  (Astro Fonts API), build-time inlined SVG icons. No third-party CDNs.
- **SEO** — canonical, Open Graph + Twitter cards, JSON-LD `Person`, sitemap, robots.txt, custom
  1200×630 share image.
- **Accessible** — WCAG AA contrast, landmarks, correct heading order.

## Requirements

- **Node.js ≥ 22.12** (Astro 6). `.nvmrc` pins Node `22`.

## Commands

| Command          | Action                                                            |
| ---------------- | ----------------------------------------------------------------- |
| `npm install`    | Install dependencies                                              |
| `npm run dev`    | Dev server at `http://localhost:4321` (serves `/api/contact` too) |
| `npm run build`  | Build to `.vercel/output/` (static pages + contact function)      |
| `npm run check`  | Type-check the project (`astro check`)                            |
| `npm run test`   | Run the endpoint unit tests (Vitest)                              |
| `npm run format` | Format with Prettier                                              |

## Project structure

```text
src/
  pages/
    index.astro          # the single page (composes the section components)
    api/contact.ts       # on-demand POST endpoint: Resend + Zod (prerender=false)
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

Vercel auto-detects Astro and the **`@astrojs/vercel` adapter** (build `astro build`, output
`.vercel/output/`, Node 22). Prerendered pages are served from the CDN; the contact form runs as a
serverless function and needs `RESEND_API_KEY` + `CONTACT_EMAIL` set on the project. A small
`vercel.json` adds global security headers. The production domain is configured on the Vercel project.

## Built with AI, under direction

This repository was developed with **[Claude Code](https://claude.com/claude-code)** (Anthropic) as a
hands-on collaborator, not an autopilot. I directed the work and kept the engineering judgment:
architecture, trade-offs, and the call on what actually shipped were mine, and every change was
reviewed and tested before it landed. The AI made the work faster — the criteria behind it stayed
human.
