/**
 * Client behaviours for the portfolio. Bundled by Astro (imported once from the
 * base Layout). Typed, tree-shaken, no inline blob.
 */
import { site } from '../data/site';
// Importing the named helpers also runs the i18n module (toggle wiring + any
// saved-locale swap) before the behaviours below read the current language.
import { taglineWords, openingText } from './i18n';

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
  window.addEventListener('resize', resize);
  window.addEventListener(
    'pointermove',
    (e) => {
      tmx = e.clientX;
      tmy = e.clientY;
    },
    { passive: true },
  );
  window.addEventListener(
    'pointerdown',
    (e) => {
      tmx = e.clientX;
      tmy = e.clientY;
    },
    { passive: true },
  );
  document.addEventListener('mouseleave', () => {
    tmx = -9999;
    tmy = -9999;
  });
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
    requestAnimationFrame(frame);
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
  }
  if (REDUCED) drawStatic();
  else frame();
})();

/* ============================== PARALLAX (mouse depth + scroll) ============================== */
(() => {
  const aura = document.querySelector<HTMLElement>('.aura');
  const avatar = document.querySelector<HTMLElement>('.avatar');
  const name = document.querySelector<HTMLElement>('.intro-id h1');
  if (REDUCED) {
    if (aura) aura.style.transform = 'translate3d(0,0,0) scale(1.06)';
    return;
  }
  let tmx = 0;
  let tmy = 0;
  let mx = 0;
  let my = 0;
  let tsy = window.scrollY || 0;
  let sy = tsy;
  let t = 0;
  window.addEventListener(
    'pointermove',
    (e) => {
      tmx = e.clientX / window.innerWidth - 0.5;
      tmy = e.clientY / window.innerHeight - 0.5;
    },
    { passive: true },
  );
  window.addEventListener(
    'scroll',
    () => {
      tsy = window.scrollY;
    },
    { passive: true },
  );
  const loop = () => {
    requestAnimationFrame(loop);
    mx += (tmx - mx) * 0.06;
    my += (tmy - my) * 0.06;
    sy += (tsy - sy) * 0.12;
    t += 0.0015;
    if (aura) {
      aura.style.transform = `translate3d(${(Math.sin(t) * 2 - mx * 9).toFixed(2)}%,${(Math.cos(t * 0.8) * 1.8 - sy * 0.006 - my * 7).toFixed(2)}%,0) scale(1.08)`;
    }
    if (avatar) {
      avatar.style.transform = `translate3d(${(-mx * 16).toFixed(1)}px,${(-my * 12 + sy * 0.05).toFixed(1)}px,0)`;
    }
    if (name) {
      name.style.transform = `translate3d(${(mx * 8).toFixed(1)}px,${(my * 5).toFixed(1)}px,0)`;
    }
  };
  loop();
})();

/* ============================== NAV (menu · smooth scroll · active link) ============================== */
(() => {
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menuBtn');
  menuBtn?.addEventListener('click', () => nav?.classList.toggle('open'));
  document.querySelectorAll<HTMLElement>('[data-go]').forEach((b) =>
    b.addEventListener('click', () => {
      const sel = b.dataset.go;
      if (sel) document.querySelector(sel)?.scrollIntoView();
    }),
  );
  if (!nav) return;
  nav
    .querySelectorAll<HTMLAnchorElement>('a[href^="#"]:not(.ph)')
    .forEach((a) =>
      a.addEventListener('click', () => nav.classList.remove('open')),
    );
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

/* ============================== CONTACT FORM (mailto compose) ============================== */
(() => {
  const f = document.getElementById('cform') as HTMLFormElement | null;
  if (!f) return;
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!f.reportValidity()) return;
    const d = new FormData(f);
    const name = (d.get('name') || '').toString().trim();
    const email = (d.get('email') || '').toString().trim();
    const msg = (d.get('message') || '').toString().trim();
    const subject = encodeURIComponent(
      `Portfolio contact${name ? ` from ${name}` : ''}`,
    );
    const body = encodeURIComponent(
      `${msg}\n\n${name}${email ? `\n${email}` : ''}`,
    );
    const note = document.getElementById('cformNote');
    if (note) note.textContent = openingText();
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
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
