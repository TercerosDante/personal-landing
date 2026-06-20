# CLAUDE.md

Guidance for working in this repository.

## What this is

A premium developer portfolio for **Ronald Terceros** (Full-Stack Engineer) — a single
**static** page built with **Astro 6**, bilingual (English default, Spanish via an in-place
toggle), deployed on **Vercel** at `https://ronaldterceros.com`. Optimized for load performance:
no UI framework, a zero-dependency client bundle, tiny client JS. One on-demand route (the contact
form) runs server-side as a Vercel Serverless Function via the `@astrojs/vercel` adapter.

## Commands

| Command            | Action                                             |
| ------------------ | -------------------------------------------------- |
| `npm run dev`      | Dev server at `http://localhost:4321` (serves `/api/contact` too) |
| `npm run build`    | Build to `.vercel/output/` (static pages + contact function) |
| `npm run preview`  | n/a with the Vercel adapter; use `npm run dev` or `vercel dev` |
| `npm run check`    | Type-check (`astro check`) — keep this at **0/0/0** |
| `npm run format`   | Prettier write (see the `global.css` caveat below) |

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
  components/            # Nav, Hero, Experience, Projects, Stack, Education, Contact, Footer
                        # + Background (bg layers + warp canvas), Lightbox, Boot, Icon
  data/                 # STRUCTURE only (no translatable prose) — see "Content vs structure"
  i18n/content.ts       # ALL human copy, EN + ES, typed
  scripts/
    client.ts           # all client behaviours (bundled, typed — no inline blob)
    i18n.ts             # the EN/ES swap engine
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
     `placeholder`, image `alt`, the stack tooltip `data-note`, the toast `data-ph`.
3. **If the element has child elements** (an icon/SVG), wrap the text in a `<span data-i18n>` —
   `data-i18n` sets `textContent` and would otherwise wipe the children.

`path` is a dotted path resolved against `content.es` (`exp.companies.0.roles.1.desc`, array indices
included). `src/scripts/i18n.ts` resolves it, captures the English from the DOM on first switch (so
only ES is shipped), sets `<html lang>`, persists `localStorage.lang`, and dispatches `langchange`.
The toggle button (`#langToggle`, a globe + EN/ES code) lives in `Nav.astro`. The choice is
re-applied on load **during the boot overlay**, so there's no flash. `client.ts` listens for
`langchange` to rebuild the typewriter and uses `taglineWords()` / `formText()` from `i18n.ts`
(both embedded via `enExtra` in `Layout.astro` because they aren't present in the DOM as text).

> SEO/meta stay English (the default page is English); the toggle is client-only.

### 3. Design system — one compact CSS file

`src/styles/global.css` is the **entire** design system (one rule per line, compact). It is
**prettier-ignored on purpose** — do not run Prettier expecting to "format" it; that would expand it
into thousands of lines. Design tokens are CSS variables in `:root` at the top. Components are
markup-only and reference these classes/tokens.

Notable tokens: `--paper*` (warm backgrounds), `--ink*`/`--slate` (text), `--signal` `#d8623f`
(brand coral, used for accents/links/highlights), `--signal-strong` `#c0512c` (darker coral used
**only as the fill of solid buttons** so white-on-coral meets WCAG AA 4.5:1).

### 4. Build-time icons

`src/components/Icon.astro` inlines SVGs from `@iconify-json/devicon-plain` **at build time** (only
the icons actually used ship; no icon-font CDN, no runtime JS). Icons are monochrome `currentColor`
— color them via the parent's `color` (e.g. the stack chips set `style="color:..."` on `.ti`).
`react` has no "plain" variant in that set, so it's provided via a small inline `OVERRIDES` map in
`Icon.astro`. Usage: `<Icon name="nestjs" size={17} />`.

### 5. Images, fonts, scripts

- **Images** — `astro:assets` `<Picture formats={['avif','webp']} fallbackFormat="webp">`. Source
  PNGs (1.4–1.9 MB) become responsive AVIF/WebP (~60–150 KB). The lightbox reads the fallback WebP
  `<img>` src.
- **Fonts** — Astro 6 **Fonts API** (config in `astro.config.mjs`): Archivo + IBM Plex Mono,
  self-hosted and subset, referenced via `var(--font-archivo)` / `var(--font-mono)`. No Google
  Fonts CDN, no `preload` (the boot overlay masks any swap).
- **Client JS** — one module, `src/scripts/client.ts`, imported once from `Layout.astro`. It owns:
  clock, typewriter, warp-grid canvas, parallax, nav (menu + active link), reveal-on-scroll,
  placeholder toast, contact form (client validation + `POST /api/contact`), lightbox,
  boot/entrance. No inline `<script>` blobs.

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
(not shipped to production). Heavier anti-abuse (rate limiting / Turnstile) is intentionally deferred
until real spam appears.
