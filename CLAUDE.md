# CLAUDE.md

Guidance for working in this repository.

## What this is

A premium developer portfolio for **Ronald Terceros** (Full-Stack Engineer) — a single
**static** page built with **Astro 6**, bilingual (English default, Spanish via an in-place
toggle), deployed on **Vercel** at `https://ronaldterceros.com`. Optimized for load performance:
no UI framework, a zero-dependency client bundle, tiny client JS. One on-demand route (the contact
form) runs server-side as a Vercel Serverless Function via the `@astrojs/vercel` adapter.

## Commands

| Command           | Action                                                            |
| ----------------- | ----------------------------------------------------------------- |
| `npm run dev`     | Dev server at `http://localhost:4321` (serves `/api/contact` too) |
| `npm run build`   | Build to `.vercel/output/` (static pages + contact function)      |
| `npm run preview` | n/a with the Vercel adapter; use `npm run dev` or `vercel dev`    |
| `npm run check`   | Type-check (`astro check`) — keep this at **0/0/0**               |
| `npm run format`  | Prettier write (see the `global.css` caveat below)                |

Node **≥ 22.12** is required (Astro 6); `.nvmrc` pins `22`. Always run `npm run check` and
`npm run build` before committing.

## Architecture

Static Astro with the **`@astrojs/vercel` adapter**: every page is prerendered to a static file, and
only the contact endpoint (`src/pages/api/contact.ts`, `prerender = false`) runs on demand as a
serverless function. `src/pages/index.astro` composes one page from section components. There is **no
client-side framework** — interactivity is a single bundled TypeScript module.

```text
src/
  pages/
    index.astro          # composes the page (inside <main>)
    api/contact.ts       # on-demand POST endpoint: Resend send + Zod validation (prerender=false)
  layouts/Layout.astro   # <head>: SEO meta + Fonts API + global.css; embeds ES i18n JSON; loads client.ts
  components/            # Nav, Hero, Projects, Experience, AiDev, Education, Contact, Colophon, Footer
                        # + Background (bg layers + grid canvas), Lightbox, Icon
  data/                 # STRUCTURE only (no translatable prose) — see "Content vs structure"
  i18n/content.ts       # ALL human copy, EN + ES, typed
  scripts/
    client.ts           # all client behaviours (bundled, typed — no inline blob)
    i18n.ts             # the EN/ES swap engine
    theme.ts            # light/dark toggle (system default + manual override)
  styles/global.css     # single compact design-system stylesheet (prettier-ignored)
  assets/               # source images processed by astro:assets
public/                 # served as-is: favicon.svg, og.png, resume.pdf, robots.txt, sitemap.xml
```

## Core patterns (read before editing)

### 1. Content vs structure separation

**All reader-facing copy lives in `src/i18n/content.ts`** (both locales). `src/data/*.ts` holds only
non-translatable structure: tech/brand tokens (React, NestJS…), proper nouns (TsunaGo, Jalasoft…),
icons, colors, image imports, tags, dates, percentages, URLs. Components iterate the `data/` arrays
for structure and pull text from `content` **by the same index/order**.

`content.ts` exports `content` (`{ en, es }`), the `Content` interface (which **enforces en/es
parity**), and `dict = content.en` (what components render at build time).

### 2. i18n — in-place toggle, no library

The page is **server-rendered in English**. Spanish is embedded once as JSON and swapped in the
browser. This was a deliberate choice (custom ~160-line engine instead of i18next/Paraglide) to keep
the bundle tiny: **net cost ≈ 3–4 KB gzipped**, no dependency.

To make a string translatable in a component:

1. Add the key to **both** `en` and `es` in `content.ts`.
2. Render English from `dict` **and** tag the element:
   - `data-i18n="path"` → swaps `textContent`
   - `data-i18n-html="path"` → swaps `innerHTML` (use for rich/authored HTML, e.g. the hero lead)
   - `data-i18n-attr="attr:path"` → swaps an attribute (`;`-separate multiple). Used for input
     `placeholder` and project image `alt`.
3. **If the element has child elements** (an icon/SVG), wrap the text in a `<span data-i18n>` —
   `data-i18n` sets `textContent` and would otherwise wipe the children.

`path` is a dotted path resolved against `content.es` (`exp.companies.0.roles.1.desc`, array indices
included). `src/scripts/i18n.ts` resolves it, captures the English from the DOM on first switch (so
only ES is shipped), sets `<html lang>`, persists `localStorage.lang`, and dispatches `langchange`.
The toggle button (`#langToggle`, a globe + EN/ES code) lives in `Nav.astro`. The choice is
re-applied on load **before the entrance reveal** (hero and nav stay hidden until `html.ready`), so
there's no flash. `client.ts` listens for
`langchange` to rebuild the typewriter and uses `taglineWords()` / `formText()` from `i18n.ts`
(both embedded via `enExtra` in `Layout.astro` because they aren't present in the DOM as text).

> SEO/meta stay English (the default page is English); the toggle is client-only.

### 3. Design system — one compact CSS file

`src/styles/global.css` is the **entire** design system (one rule per line, compact). It is
**prettier-ignored on purpose** — do not run Prettier expecting to "format" it; that would expand it
into thousands of lines. Design tokens are CSS variables in `:root` at the top. Components are
markup-only and reference these classes/tokens.

Notable tokens: `--paper*`/`--card` (backgrounds), `--ink`/`--ink-soft`/`--muted` (text, all
≥ 4.5:1), `--faint` (decorative only, never text), `--signal` `#d8623f` (brand coral: fills, rules,
large text), `--signal-text` (darker coral for small text, AA), `--signal-strong` `#c0512c` (fill of
solid buttons, white text AA), `--ok`/`--err` (semantic states only). Shape scale: `--r-ctl` 10px
(buttons/inputs), `--r-card` 16px (cards/images), `--r-pill` (chips); the wordmark plate keeps 6px.

**Dark mode is the default** (owner's choice, regardless of OS setting): `:root` holds the light
tokens and `:root:not([data-theme="light"])` overrides them with the dark set, so light is opt-in. A manual
choice (`#themeToggle`) is stored in `localStorage.theme` and re-applied before paint by a one-line
inline script in `Layout.astro`. **That script's sha256 is pinned in the `vercel.json` CSP**: if you edit
it, recompute the hash from the built HTML and update `script-src`.

**Design rules in force**: body copy is Archivo; IBM Plex Mono is for metadata only (dates, tags,
labels). Min text size 12px. At most 3 eyebrows on the page (hero role line, AI & Dev, Colophon), no
numbered labels. No em/en dashes in copy (use `-`). One accent (coral).

### 4. Build-time icons

`src/components/Icon.astro` inlines SVGs from `@iconify-json/devicon-plain` (tech logos),
`@iconify-json/simple-icons` (logos devicon-plain lacks, `name="si:..."`) and `@iconify-json/ph`
(Phosphor UI glyphs, `name="ph:..."`) **at build time** (only
the icons actually used ship; no icon-font CDN, no runtime JS). Icons are monochrome `currentColor`
— color them via the parent's `color`. Don't hand-roll SVG icons; use a `ph:` glyph.
Usage: `<Icon name="nestjs" size={17} />`, `<Icon name="ph:arrow-right" size={16} />`.

### 5. Images, fonts, scripts

- **Images** — `astro:assets` `<Picture formats={['avif','webp']} fallbackFormat="webp">`. Source
  PNGs (1.4–1.9 MB) become responsive AVIF/WebP (~60–150 KB). The lightbox reads the fallback WebP
  `<img>` src.
- **Fonts** — Astro 6 **Fonts API** (config in `astro.config.mjs`): Archivo + IBM Plex Mono,
  self-hosted and subset, referenced via `var(--font-archivo)` / `var(--font-mono)`. No Google
  Fonts CDN. The Fonts API generates metric-matched fallbacks, so the swap is not visible.
- **Client JS** — one module, `src/scripts/client.ts`, imported once from `Layout.astro`. It owns:
  typewriter, grid canvas (theme-aware), nav (menu + active link), reveal-on-scroll (stagger via the
  CSS `--i` property), contact form (client validation + `POST /api/contact`), lightbox, CV picker
  and the entrance (`html.ready`); it imports `theme.ts`. No scroll listeners: the portrait depth is a
  CSS scroll-driven animation. The only inline script is the theme bootstrap in `Layout.astro`.

### 6. SEO

In `Layout.astro`: `<title>`/description, canonical, Open Graph + Twitter Card (both → `/og.png`),
and JSON-LD `schema.org/Person`. `public/` holds `robots.txt` and a hand-written `sitemap.xml`.
`site: 'https://ronaldterceros.com'` in `astro.config.mjs` drives canonical/OG/sitemap URLs. The
1200×630 share image is `public/og.png`.

## Key decisions & rationale

- **Static Astro, no UI framework** — smallest possible payload; the page is content + a little
  vanilla TS, and the client ships **zero runtime dependencies**. The contact endpoint adds
  server-only deps (`resend`, `zod`) and the `@astrojs/vercel` adapter; none of them reach the browser.
- **In-place EN/ES toggle (custom, no library)** — chosen over URL-based routing per the owner;
  trade-off is that both languages' text + the engine ship (~3–4 KB gz), vs. zero for separate URLs.
  No library keeps that to the minimum.
- **All copy in one typed file** — editing text never means touching markup; `Content` enforces
  en/es parity at compile time.
- **One global stylesheet (not scoped)** — chosen for pixel-fidelity to the original hand-built
  design and low risk; prettier-ignored to stay compact.
- **Minification is already on** by default (Astro `compressHTML`, esbuild JS, Vite CSS) — nothing to
  configure.
- **Accessibility (WCAG AA)** — `--signal-strong` for solid-button contrast, darker footer text,
  a `<main>` landmark, correct heading order (Education uses `<h3>`), and no redundant `aria-label`s
  on links whose visible text already names them.

## Gotchas

- **`global.css` is prettier-ignored and compact** — keep edits one-rule-per-line; tokens in `:root`.
- **New translatable text needs entries in BOTH locales.** If a key is missing in `es`, the swap
  leaves English in place (resolve returns `undefined`).
- **Wrap text in a `<span>`** when an element also contains an icon, or `data-i18n` will erase it.
- **Lighthouse** — run in an **Incognito window**. Browser extensions (Bitwarden, React DevTools)
  inflate "unused/minify JS" and add console errors that aren't from this site.
- **`desktop.json` / `mobile.json`** in the repo root are local Lighthouse exports — gitignored.

## Deployment

Vercel, near zero-config: it auto-detects Astro and the `@astrojs/vercel` adapter, runs
`astro build` (output in `.vercel/output/`), and serves prerendered pages from the CDN plus the
`/api/contact` route as a serverless function (Node 22). The function needs two
env vars on the project: **`RESEND_API_KEY`** and **`CONTACT_EMAIL`** (see `.env.example`; pull them
locally with `vercel env pull`). Domain `ronaldterceros.com` (+ `www`) is configured on the project.

A small **`vercel.json`** sets global **security headers** (`X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy`, HSTS, and a **CSP in `Content-Security-Policy-Report-Only`** to
harden before enforcing). The contact endpoint also rejects oversized bodies (`Content-Length` > 16 KB)
on top of the Zod caps + honeypot. `package.json` has an `overrides` pin (`path-to-regexp` ≥ 6.3.0) to
clear a high-severity transitive advisory; remaining `npm audit` items are esbuild **dev-server-only**
(not shipped to production). **Cloudflare Turnstile** is wired but **off by default**: the widget
renders only when `PUBLIC_TURNSTILE_SITE_KEY` is set (lazy-loaded on first form focus, so Lighthouse is
untouched), and the server verifies only when `TURNSTILE_SECRET_KEY` is set; with neither, the form
behaves exactly as before. Set both on the Vercel project to enable it. The endpoint is unit-tested with
**Vitest** (`npm run test`): schema, honeypot, body cap, Resend success/failure, Turnstile pass/fail.
