/**
 * Client behaviours for the portfolio. Bundled by Astro (imported once from the
 * base Layout). Typed, tree-shaken, no inline blob.
 */
// Importing the named helpers also runs the i18n module (toggle wiring + any
// saved-locale swap) before the behaviours below read the current language.
import { taglineWords, formText } from './i18n';

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================== CLOCK ============================== */
function tick(): void {
  const el = document.getElementById('clock');
  if (!el) return;
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const bo = new Date(utc - 4 * 3600000);
  const p = (x: number) => String(x).padStart(2, '0');
  el.textContent = `${p(bo.getHours())}:${p(bo.getMinutes())}:${p(bo.getSeconds())}`;
}
tick();
setInterval(tick, 1000);

/* ============================== TYPEWRITER ============================== */
(() => {
  const el = document.getElementById('tw');
  if (!el) return;
  let words = taglineWords();
  let i = 0;
  let c = 0;
  let del = false;
  let timer: ReturnType<typeof setTimeout>;
  const step = () => {
    const t = words[i % words.length] ?? '';
    el.textContent = t.slice(0, c);
    if (!del) {
      c++;
      if (c > t.length) {
        del = true;
        timer = setTimeout(step, 1300);
        return;
      }
    } else {
      c--;
      if (c < 0) {
        del = false;
        i = (i + 1) % words.length;
        c = 0;
      }
    }
    timer = setTimeout(step, del ? 34 : 72);
  };
  step();
  // Rebuild with the new locale's words when the language toggles.
  window.addEventListener('langchange', () => {
    words = taglineWords();
    i = 0;
    c = 0;
    del = false;
    clearTimeout(timer);
    step();
  });
})();

/* ============================== WARP GRID (mouse-gravity background) ============================== */
(() => {
  const cv = document.getElementById('warp') as HTMLCanvasElement | null;
  const ctx = cv?.getContext('2d');
  if (!cv || !ctx) return;
  const GAP = 46;
  const R = 250;
  const MAXPULL = 20;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let mx = -9999;
  let my = -9999;
  let tmx = -9999;
  let tmy = -9999;
  let W = 0;
  let H = 0;
  let raf = 0;
  function resize(): void {
    W = window.innerWidth;
    H = window.innerHeight;
    cv!.width = W * dpr;
    cv!.height = H * dpr;
    cv!.style.width = `${W}px`;
    cv!.style.height = `${H}px`;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  const warp = (x: number, y: number): [number, number] => {
    const dx = x - mx;
    const dy = y - my;
    const d = Math.hypot(dx, dy);
    if (d > R || d < 0.001) return [x, y];
    const f = 1 - d / R;
    const pull = f * f * MAXPULL;
    return [x - (dx / d) * pull, y - (dy / d) * pull];
  };
  function drawStatic(): void {
    ctx!.clearRect(0, 0, W, H);
    ctx!.lineWidth = 1;
    ctx!.strokeStyle = 'rgba(48,66,96,0.07)';
    const cols = Math.ceil(W / GAP) + 2;
    const rows = Math.ceil(H / GAP) + 2;
    for (let r = 0; r < rows; r++) {
      ctx!.beginPath();
      ctx!.moveTo(0, r * GAP);
      ctx!.lineTo(W, r * GAP);
      ctx!.stroke();
    }
    for (let c = 0; c < cols; c++) {
      ctx!.beginPath();
      ctx!.moveTo(c * GAP, 0);
      ctx!.lineTo(c * GAP, H);
      ctx!.stroke();
    }
  }
  function frame(): void {
    mx += (tmx - mx) * 0.1;
    my += (tmy - my) * 0.1;
    ctx!.clearRect(0, 0, W, H);
    ctx!.lineWidth = 1;
    ctx!.strokeStyle = 'rgba(48,66,96,0.07)';
    const cols = Math.ceil(W / GAP) + 2;
    const rows = Math.ceil(H / GAP) + 2;
    for (let r = 0; r < rows; r++) {
      ctx!.beginPath();
      for (let c = 0; c < cols; c++) {
        const p = warp(c * GAP, r * GAP);
        c ? ctx!.lineTo(p[0], p[1]) : ctx!.moveTo(p[0], p[1]);
      }
      ctx!.stroke();
    }
    for (let c = 0; c < cols; c++) {
      ctx!.beginPath();
      for (let r = 0; r < rows; r++) {
        const p = warp(c * GAP, r * GAP);
        r ? ctx!.lineTo(p[0], p[1]) : ctx!.moveTo(p[0], p[1]);
      }
      ctx!.stroke();
    }
    // Keep animating only while the grid is still easing toward the cursor.
    // Once settled (or the cursor has left), stop; input wakes it again.
    raf =
      Math.abs(tmx - mx) > 0.5 || Math.abs(tmy - my) > 0.5
        ? requestAnimationFrame(frame)
        : 0;
  }
  const wake = (): void => {
    if (!raf && !REDUCED) raf = requestAnimationFrame(frame);
  };
  const onMove = (e: PointerEvent): void => {
    tmx = e.clientX;
    tmy = e.clientY;
    wake();
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', onMove, { passive: true });
  document.addEventListener('mouseleave', () => {
    tmx = -9999;
    tmy = -9999;
    wake();
  });
  window.addEventListener('resize', () => {
    resize();
    if (REDUCED) drawStatic();
    else wake();
  });
  if (REDUCED) drawStatic();
  else wake();
})();

/* ============================== PARALLAX (mouse depth + scroll, self-suspending) ============================== */
(() => {
  const aura = document.querySelector<HTMLElement>('.aura');
  const avatar = document.querySelector<HTMLElement>('.avatar');
  const name = document.querySelector<HTMLElement>('.intro-id h1');
  // The aura's ambient float is now a CSS animation (`auraFloat`), so under
  // reduced motion there is nothing left for JS to do here.
  if (REDUCED) return;
  let tmx = 0;
  let tmy = 0;
  let mx = 0;
  let my = 0;
  let tsy = window.scrollY || 0;
  let sy = tsy;
  let raf = 0;
  const step = () => {
    mx += (tmx - mx) * 0.06;
    my += (tmy - my) * 0.06;
    sy += (tsy - sy) * 0.12;
    // Aura reacts via the individual `translate` property so it composes with
    // the CSS `auraFloat` transform (the float runs on the compositor, no JS).
    if (aura) {
      aura.style.translate = `${(-mx * 9).toFixed(2)}% ${(-sy * 0.006 - my * 7).toFixed(2)}%`;
    }
    if (avatar) {
      avatar.style.transform = `translate3d(${(-mx * 16).toFixed(1)}px,${(-my * 12 + sy * 0.05).toFixed(1)}px,0)`;
    }
    if (name) {
      name.style.transform = `translate3d(${(mx * 8).toFixed(1)}px,${(my * 5).toFixed(1)}px,0)`;
    }
    // Keep stepping only while values are still easing toward their target.
    // Once settled the loop stops; pointer/scroll wakes it again.
    const moving =
      Math.abs(tmx - mx) > 0.0002 ||
      Math.abs(tmy - my) > 0.0002 ||
      Math.abs(tsy - sy) > 0.05;
    raf = moving ? requestAnimationFrame(step) : 0;
  };
  const wake = () => {
    if (!raf) raf = requestAnimationFrame(step);
  };
  window.addEventListener(
    'pointermove',
    (e) => {
      tmx = e.clientX / window.innerWidth - 0.5;
      tmy = e.clientY / window.innerHeight - 0.5;
      wake();
    },
    { passive: true },
  );
  window.addEventListener(
    'scroll',
    () => {
      tsy = window.scrollY;
      wake();
    },
    { passive: true },
  );
  wake(); // settle the initial resting state once, then stop
})();

/* ============================== NAV (menu · smooth scroll · active link) ============================== */
(() => {
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menuBtn');
  const setMenu = (open: boolean) => {
    nav?.classList.toggle('open', open);
    menuBtn?.classList.toggle('open', open);
    menuBtn?.setAttribute('aria-expanded', String(open));
    // Lock the page behind the full-screen mobile sheet.
    document.body.style.overflow = open ? 'hidden' : '';
  };
  menuBtn?.addEventListener('click', () =>
    setMenu(!nav?.classList.contains('open')),
  );
  // Tap the empty sheet area (not a link) to close.
  nav?.addEventListener('click', (e) => {
    if (e.target === nav) setMenu(false);
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav?.classList.contains('open')) setMenu(false);
  });
  // If the viewport grows back to desktop while open (e.g. rotation), close so
  // the page never stays scroll-locked behind a hidden sheet.
  window
    .matchMedia('(min-width:861px)')
    .addEventListener('change', (e) => {
      if (e.matches) setMenu(false);
    });
  document.querySelectorAll<HTMLElement>('[data-go]').forEach((b) =>
    b.addEventListener('click', () => {
      const sel = b.dataset.go;
      if (sel) document.querySelector(sel)?.scrollIntoView();
    }),
  );
  if (!nav) return;
  nav
    .querySelectorAll<HTMLAnchorElement>('a[href^="#"]:not(.ph)')
    .forEach((a) => a.addEventListener('click', () => setMenu(false)));
  const navMap: Record<string, HTMLAnchorElement> = {};
  nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    const href = a.getAttribute('href');
    if (href && href !== '#') navMap[href.slice(1)] = a;
  });
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          Object.values(navMap).forEach((a) => a.classList.remove('on'));
          navMap[e.target.id]?.classList.add('on');
        }
      }),
    { rootMargin: '-45% 0px -50% 0px' },
  );
  document.querySelectorAll('section[id]').forEach((s) => io.observe(s));
})();

/* ============================== PLACEHOLDER TOAST ============================== */
(() => {
  const toast = document.getElementById('toast');
  if (!toast) return;
  let toT: ReturnType<typeof setTimeout>;
  document.querySelectorAll<HTMLElement>('.ph').forEach((el) =>
    el.addEventListener('click', (e) => {
      e.preventDefault();
      toast.textContent = `🔧 ${el.dataset.ph || 'Placeholder, coming soon'}`;
      const x = Math.min(e.clientX, window.innerWidth - toast.offsetWidth - 20);
      toast.style.left = `${Math.max(12, x)}px`;
      toast.style.top = `${e.clientY + 16}px`;
      toast.classList.add('show');
      clearTimeout(toT);
      toT = setTimeout(() => toast.classList.remove('show'), 1900);
    }),
  );
})();

/* ============================== REVEAL ON SCROLL ============================== */
(() => {
  const rio = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          if (el.dataset.d) el.style.transitionDelay = `${el.dataset.d}s`;
          el.classList.add('in');
          rio.unobserve(el);
        }
      }),
    { rootMargin: '0px 0px -8% 0px' },
  );
  document.querySelectorAll('.reveal').forEach((el) => rio.observe(el));
})();

/* ============================== CONTACT FORM (validate · POST · /api/contact) ============================== */
(() => {
  const f = document.getElementById('cform') as HTMLFormElement | null;
  if (!f) return;
  const btn = f.querySelector<HTMLButtonElement>('.cform-send');
  const statusEl = document.getElementById('cformStatus');
  const hp = f.querySelector<HTMLInputElement>('#cf-website');

  // Turnstile (optional, lazy). The widget element only exists when a site key
  // is configured, so without keys this is a no-op and the form is unaffected.
  const tsEl = f.querySelector<HTMLElement>('#ts-widget');
  const tsKey = tsEl?.dataset.sitekey;
  let tsToken = '';
  let tsLoaded = false;
  const loadTurnstile = (): void => {
    if (!tsEl || !tsKey || tsLoaded) return;
    tsLoaded = true;
    window.onTurnstileLoad = () => {
      window.turnstile?.render(tsEl, {
        sitekey: tsKey,
        appearance: 'interaction-only',
        theme: 'light',
        callback: (token: string) => {
          tsToken = token;
        },
        'expired-callback': () => {
          tsToken = '';
        },
        'error-callback': () => {
          tsToken = '';
        },
      });
    };
    const s = document.createElement('script');
    s.src =
      'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit';
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  };
  // Load the widget on first interaction so it stays off the initial page load.
  if (tsEl) f.addEventListener('focusin', loadTurnstile, { once: true });

  type Key = 'name' | 'email' | 'message';
  const fields: Record<Key, HTMLInputElement | HTMLTextAreaElement | null> = {
    name: f.querySelector('#cf-name'),
    email: f.querySelector('#cf-email'),
    message: f.querySelector('#cf-msg'),
  };
  const errEls: Record<Key, HTMLElement | null> = {
    name: document.getElementById('cf-name-err'),
    email: document.getElementById('cf-email-err'),
    message: document.getElementById('cf-msg-err'),
  };

  // Rules mirror the Zod schema in src/pages/api/contact.ts (kept in sync by
  // hand so the browser ships no validation library).
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errorKey: Record<Key, string | null> = {
    name: null,
    email: null,
    message: null,
  };
  let statusKey: string | null = null;
  let statusKind: '' | 'pending' | 'success' | 'error' = '';

  const val = (k: Key) => fields[k]?.value.trim() ?? '';

  function validate(): boolean {
    const name = val('name');
    const email = val('email');
    const message = val('message');
    errorKey.name = name.length < 2 || name.length > 100 ? 'invalidName' : null;
    errorKey.email =
      !EMAIL.test(email) || email.length > 255 ? 'invalidEmail' : null;
    errorKey.message =
      message.length < 10 || message.length > 3000 ? 'invalidMessage' : null;
    return !errorKey.name && !errorKey.email && !errorKey.message;
  }

  function renderErrors(): void {
    (Object.keys(errEls) as Key[]).forEach((k) => {
      const key = errorKey[k];
      if (errEls[k]) errEls[k]!.textContent = key ? formText(key) : '';
      fields[k]?.setAttribute('aria-invalid', key ? 'true' : 'false');
    });
  }

  function renderStatus(): void {
    if (!statusEl) return;
    statusEl.textContent = statusKey ? formText(statusKey) : '';
    statusEl.dataset.kind = statusKind;
  }

  // Re-localize any visible messages when the language toggles mid-flow.
  window.addEventListener('langchange', () => {
    renderErrors();
    renderStatus();
  });

  // Clear a field's error as the visitor corrects it.
  (Object.keys(fields) as Key[]).forEach((k) =>
    fields[k]?.addEventListener('input', () => {
      if (errorKey[k]) {
        errorKey[k] = null;
        renderErrors();
      }
    }),
  );

  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (statusKind === 'pending') return;

    if (!validate()) {
      renderErrors();
      const firstBad = (Object.keys(errorKey) as Key[]).find(
        (k) => errorKey[k],
      );
      if (firstBad) fields[firstBad]?.focus();
      return;
    }
    renderErrors();

    statusKind = 'pending';
    statusKey = 'sending';
    btn?.setAttribute('disabled', 'true');
    btn?.classList.add('is-loading');
    renderStatus();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: val('name'),
          email: val('email'),
          message: val('message'),
          website: hp?.value ?? '',
          turnstileToken: tsToken,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      statusKind = 'success';
      statusKey = 'success';
      f.reset();
    } catch {
      statusKind = 'error';
      statusKey = 'errorGeneric';
    } finally {
      btn?.removeAttribute('disabled');
      btn?.classList.remove('is-loading');
      renderStatus();
    }
  });
})();

/* ============================== IMAGE LIGHTBOX ============================== */
(() => {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg') as HTMLImageElement | null;
  const lbCap = document.getElementById('lbCap');
  const lbClose = document.getElementById('lbClose');
  if (!lb || !lbImg) return;
  const open = (src: string, alt: string) => {
    lbImg.src = src;
    lbImg.alt = alt;
    if (lbCap) lbCap.textContent = alt.replace(/,.*$/, '');
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  };
  document.querySelectorAll<HTMLElement>('.proj-thumb').forEach((t) => {
    const im = t.querySelector('img');
    if (im)
      t.addEventListener('click', () =>
        open(im.getAttribute('src') || '', im.getAttribute('alt') || ''),
      );
  });
  lbClose?.addEventListener('click', close);
  lb.addEventListener('click', (e) => {
    if (e.target !== lbImg) close();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lb.classList.contains('open')) close();
  });
})();

/* ============================== BOOT / ENTRANCE ============================== */
window.addEventListener('load', () => {
  const boot = document.getElementById('boot');
  const bar = document.getElementById('bootBar');
  requestAnimationFrame(() => {
    if (bar) bar.style.width = '100%';
  });
  setTimeout(() => document.documentElement.classList.add('ready'), 520);
  setTimeout(() => boot?.classList.add('gone'), 560);
});
