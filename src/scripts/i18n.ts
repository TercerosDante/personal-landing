/**
 * In-place EN ⇄ ES language toggle (no library, no reload).
 *
 * The page is server-rendered in English. The Spanish copy is embedded once as
 * JSON (`#i18n-data`). On toggle this swaps:
 *   - `[data-i18n]`        → textContent
 *   - `[data-i18n-html]`   → innerHTML (trusted, authored copy)
 *   - `[data-i18n-attr]`   → one or more `attr:path` pairs (`;`-separated)
 * English values are captured from the DOM on first switch, so only Spanish is
 * shipped. Choice is persisted to localStorage and re-applied during the boot
 * overlay (no visible flash). A `langchange` event lets client.ts re-sync.
 */
import type { Lang } from '../i18n/content';

const STORE_KEY = 'lang';

interface Embedded {
  es: Record<string, unknown>;
  enExtra: { tagline: string[]; opening: string };
}

const el = document.getElementById('i18n-data');
const data: Embedded = el?.textContent
  ? (JSON.parse(el.textContent) as Embedded)
  : { es: {}, enExtra: { tagline: [], opening: '' } };

const ES = data.es;
const EN_TAGLINE = data.enExtra?.tagline ?? [];
const EN_OPENING = data.enExtra?.opening ?? '';

/** Resolve a dotted path (`exp.companies.0.roles.1.desc`) into the ES object. */
function resolve(path: string): string | undefined {
  const value = path.split('.').reduce<unknown>((o, k) => {
    if (o && typeof o === 'object') return (o as Record<string, unknown>)[k];
    return undefined;
  }, ES);
  return typeof value === 'string' ? value : undefined;
}

const esString = (path: string) =>
  path
    .split('.')
    .reduce<unknown>(
      (o, k) =>
        o && typeof o === 'object'
          ? (o as Record<string, unknown>)[k]
          : undefined,
      ES,
    );

// Captured English snapshots (so switching back is exact, without shipping EN).
const enText = new WeakMap<Element, string>();
const enHtml = new WeakMap<Element, string>();
const enAttr = new WeakMap<Element, Record<string, string>>();

function swapText(node: Element, lang: Lang): void {
  const path = node.getAttribute('data-i18n');
  if (!path) return;
  if (lang === 'es') {
    if (!enText.has(node)) enText.set(node, node.textContent ?? '');
    const es = resolve(path);
    if (es !== undefined) node.textContent = es;
  } else if (enText.has(node)) {
    node.textContent = enText.get(node) ?? node.textContent;
  }
}

function swapHtml(node: Element, lang: Lang): void {
  const path = node.getAttribute('data-i18n-html');
  if (!path) return;
  if (lang === 'es') {
    if (!enHtml.has(node)) enHtml.set(node, node.innerHTML);
    const es = resolve(path);
    if (es !== undefined) node.innerHTML = es;
  } else if (enHtml.has(node)) {
    node.innerHTML = enHtml.get(node) ?? node.innerHTML;
  }
}

function swapAttrs(node: Element, lang: Lang): void {
  const spec = node.getAttribute('data-i18n-attr');
  if (!spec) return;
  for (const pair of spec.split(';')) {
    const idx = pair.indexOf(':');
    if (idx < 0) continue;
    const attr = pair.slice(0, idx).trim();
    const path = pair.slice(idx + 1).trim();
    if (lang === 'es') {
      const store = enAttr.get(node) ?? {};
      if (!(attr in store)) {
        store[attr] = node.getAttribute(attr) ?? '';
        enAttr.set(node, store);
      }
      const es = resolve(path);
      if (es !== undefined) node.setAttribute(attr, es);
    } else {
      const prev = enAttr.get(node)?.[attr];
      if (prev !== undefined) node.setAttribute(attr, prev);
    }
  }
}

let lang: Lang = 'en';

function updateToggle(): void {
  const btn = document.getElementById('langToggle');
  if (!btn) return;
  btn.textContent = lang === 'en' ? 'ES' : 'EN';
  btn.setAttribute(
    'aria-label',
    lang === 'en' ? 'Cambiar a español' : 'Switch to English',
  );
}

function apply(next: Lang): void {
  document.querySelectorAll('[data-i18n]').forEach((n) => swapText(n, next));
  document
    .querySelectorAll('[data-i18n-html]')
    .forEach((n) => swapHtml(n, next));
  document
    .querySelectorAll('[data-i18n-attr]')
    .forEach((n) => swapAttrs(n, next));
  lang = next;
  document.documentElement.lang = next;
  updateToggle();
  window.dispatchEvent(
    new CustomEvent('langchange', { detail: { lang: next } }),
  );
}

export function getLang(): Lang {
  return lang;
}

export function taglineWords(): string[] {
  if (lang !== 'es') return EN_TAGLINE;
  const words = esString('hero.tagline');
  return Array.isArray(words) ? (words as string[]) : EN_TAGLINE;
}

export function openingText(): string {
  if (lang !== 'es') return EN_OPENING;
  return resolve('contact.opening') ?? EN_OPENING;
}

// Wire the toggle and apply any saved preference (during the boot overlay).
const toggle = document.getElementById('langToggle');
toggle?.addEventListener('click', () => apply(lang === 'en' ? 'es' : 'en'));

if (localStorage.getItem(STORE_KEY) === 'es') {
  apply('es');
} else {
  updateToggle();
}

// Persist on every change.
window.addEventListener('langchange', () => {
  try {
    localStorage.setItem(STORE_KEY, lang);
  } catch {
    /* ignore storage failures (private mode) */
  }
});
