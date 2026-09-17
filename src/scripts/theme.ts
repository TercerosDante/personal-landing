/**
 * Light / dark theme. Dark is the default (per the owner), regardless of the OS
 * setting; light is opt-in.
 *
 * A manual choice from `#themeToggle` is stored in `localStorage.theme` and
 * stamped as `<html data-theme>`; an inline script in Layout.astro re-applies it
 * before first paint. Dispatches `themechange` so canvas drawing can re-read
 * tokens.
 */
import { getLang } from './i18n';

const KEY = 'theme';
const root = document.documentElement;
const btn = document.getElementById('themeToggle');

export function isDark(): boolean {
  return root.dataset.theme !== 'light';
}

function updateLabel(): void {
  const es = getLang() === 'es';
  const label = isDark()
    ? es
      ? 'Cambiar a tema claro'
      : 'Switch to light theme'
    : es
      ? 'Cambiar a tema oscuro'
      : 'Switch to dark theme';
  btn?.setAttribute('aria-label', label);
}

btn?.addEventListener('click', () => {
  const next = isDark() ? 'light' : 'dark';
  root.dataset.theme = next;
  try {
    localStorage.setItem(KEY, next);
  } catch {
    /* ignore storage failures (private mode) */
  }
  updateLabel();
  window.dispatchEvent(new CustomEvent('themechange'));
});

window.addEventListener('langchange', updateLabel);
updateLabel();
