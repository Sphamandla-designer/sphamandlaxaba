// Shared page shell and reusable components.
// Components are plain functions returning HTML strings. `ctx` carries the
// page depth so every link and asset path is relative — the site works the
// same under a local server and under the GitHub Pages sub-path.

import { site, nav } from './site.mjs';
import { readFileSync } from 'node:fs';

const imgMeta = JSON.parse(readFileSync(new URL('./content/images.json', import.meta.url), 'utf8'));

// ---------------------------------------------------------------- utilities

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const html = (strings, ...values) => strings.reduce((out, s, i) => out + s + (values[i] ?? ''), '');

/** Resolve a site-relative path for the page at ctx.depth (absolute for 404). */
export function url(ctx, path = '') {
  const prefix = ctx.absolute ? site.basePath : '../'.repeat(ctx.depth);
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  if (path === '' || path === 'index.html') return prefix || './';
  if (path.startsWith('index.html#')) return prefix + path.slice(10);
  return prefix + path;
}

/**
 * Missing content is never shown as fact — and, to keep pages clean, it is
 * not shown at all. Each gap is recorded here and written to
 * CONTENT-NEEDED.md by the build.
 */
export const placeholderLog = [];
export function todo(ctx, need, detail = '') {
  placeholderLog.push({ page: ctx.page, need, detail });
  return '';
}

// --------------------------------------------------------------- components

export const icon = {
  arrow: '<svg class="i" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  external: '<svg class="i" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  download: '<svg class="i" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  sun: '<svg class="i i-sun" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6 13 13M3 13l1.4-1.4M11.6 4.4 13 3" stroke="currentColor" stroke-width="1.6"/></svg>',
  moon: '<svg class="i i-moon" viewBox="0 0 16 16" aria-hidden="true"><path d="M13 9.5A5.5 5.5 0 0 1 6.5 3 5.5 5.5 0 1 0 13 9.5Z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  copy: '<svg class="i" viewBox="0 0 16 16" aria-hidden="true"><rect x="5" y="5" width="8.5" height="8.5" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 10.5V3.5A1 1 0 0 1 4 2.5h6.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  menu: '<svg class="i i-menu" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 5h12M2 11h12" stroke="currentColor" stroke-width="1.6"/></svg>',
  close: '<svg class="i i-close" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" stroke-width="1.6"/></svg>',
};

/** Pill button. variant: primary (black) | secondary (white) | subtle (gray) */
export function button(ctx, { label, href, variant = 'primary', ic = 'arrow', download = false, external = false }) {
  const attrs = [
    `href="${esc(url(ctx, href))}"`,
    `class="btn btn--${variant}"`,
    download ? 'download' : '',
    external ? 'target="_blank" rel="noopener"' : '',
  ].filter(Boolean).join(' ');
  return `<a ${attrs}><span>${esc(label)}</span>${icon[ic] || ''}${external ? '<span class="sr-only"> (opens in a new tab)</span>' : ''}</a>`;
}

export const cvButton = (ctx, variant = 'secondary', label = 'Download CV') =>
  button(ctx, { label, href: site.cv, variant, ic: 'download', download: true });

/** Status in words with a shape marker — never colour alone. */
export const status = (label, kind = 'live') =>
  `<span class="status status--${kind}"><span class="status__mark" aria-hidden="true"></span>${esc(label)}</span>`;

/** Compact key/value list. items: [[term, value(html)]] — empty values are dropped. */
export const meta = (items, cls = '') =>
  `<dl class="meta ${cls}">${items
    .filter(([, v]) => v)
    .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v}</dd></div>`)
    .join('')}</dl>`;

/** Responsive image with explicit dimensions (no layout shift). */
export function img(ctx, key, alt, { sizes = '100vw', eager = false } = {}) {
  const m = imgMeta[key];
  if (!m) throw new Error(`Unknown image: ${key}`);
  const [folder, base] = key.split('/');
  const src = (w) => url(ctx, `assets/images/${folder}/${base}${m.sizes.length > 1 ? `-${w}` : ''}.webp`);
  const widest = Math.min(Math.max(...m.sizes), m.w);
  const h = Math.round((m.h * widest) / m.w);
  const srcset = m.sizes.length > 1 ? ` srcset="${m.sizes.map((w) => `${src(w)} ${w}w`).join(', ')}" sizes="${sizes}"` : '';
  return `<img src="${src(widest)}"${srcset} width="${widest}" height="${h}" alt="${esc(alt)}" ${
    eager ? 'fetchpriority="high"' : 'loading="lazy"'
  } decoding="async">`;
}

/** Figure in 16px card chrome. kind: screen | phone | mockup. Opens in the viewer. */
export function figure(ctx, { key, alt, caption = '', kind = 'screen', sizes, eager = false }) {
  const m = imgMeta[key];
  const [folder, base] = key.split('/');
  const full = url(ctx, `assets/images/${folder}/${base}${m.sizes.length > 1 ? `-${Math.max(...m.sizes)}` : ''}.webp`);
  return `<figure class="fig fig--${kind}"><a class="zoom" href="${full}" data-zoom data-caption="${esc(caption || alt)}" aria-label="Enlarge: ${esc(alt)}">${img(ctx, key, alt, { sizes, eager })}</a>${
    caption ? `<figcaption>${esc(caption)}</figcaption>` : ''
  }</figure>`;
}

/** Section heading. */
export const sectionHead = ({ title, intro = '', id = '' }) => `
  <header class="shead">
    <h2 class="shead__title"${id ? ` id="${id}"` : ''}>${title}</h2>
    ${intro ? `<p class="shead__intro">${intro}</p>` : ''}
  </header>`;

// ------------------------------------------------------------------- shell

function header(ctx) {
  const links = nav
    .map((n) => `<li><a class="nav-link" href="${esc(url(ctx, n.href))}"${ctx.navKey === n.key ? ' aria-current="page"' : ''}>${n.label}</a></li>`)
    .join('');
  return `
  <a class="skip" href="#main">Skip to content</a>
  <header class="nav-bar" data-header>
    <div class="nav-bar__inner wrap">
      <a class="wordmark" href="${url(ctx, '')}">Sphamandla Xaba</a>
      <nav class="site-nav" aria-label="Primary">
        <div class="site-menu" id="site-menu" data-nav-menu>
          <ul class="site-menu__list" role="list">${links}</ul>
          <a class="btn btn--primary site-menu__cv" href="${url(ctx, site.cv)}" download><span>Download CV</span>${icon.download}</a>
        </div>
      </nav>
      <button class="icon-btn" type="button" data-theme-toggle aria-label="Switch to dark theme">${icon.sun}${icon.moon}</button>
      <button class="icon-btn nav-toggle" type="button" aria-expanded="false" aria-controls="site-menu" aria-label="Open menu" data-nav-toggle>${icon.menu}${icon.close}</button>
    </div>
  </header>`;
}

function footer(ctx) {
  return `
  <footer class="footer">
    <div class="wrap footer__grid">
      <div>
        <p class="footer__name">Sphamandla Xaba</p>
        <p class="footer__muted">Product Designer · UI/UX<br>${esc(site.location)}</p>
      </div>
      <nav aria-label="Work">
        <p class="footer__head">Work</p>
        <ul role="list">
          <li><a href="${url(ctx, 'work/managem/')}">ManaGEM ERP</a></li>
          <li><a href="${url(ctx, 'work/wastemart/')}">WasteMart</a></li>
          <li><a href="${url(ctx, 'work/gemis/')}">GEMIS Website</a></li>
        </ul>
      </nav>
      <nav aria-label="Contact">
        <p class="footer__head">Contact</p>
        <ul role="list">
          <li><a href="mailto:${site.email}">Email</a></li>
          <li><a href="${site.linkedin}" target="_blank" rel="noopener">LinkedIn<span class="sr-only"> (opens in a new tab)</span></a></li>
          <li><a href="${url(ctx, site.cv)}" download>CV (PDF)</a></li>
        </ul>
      </nav>
    </div>
    <div class="wrap footer__base">
      <p>© ${new Date().getFullYear()} Sphamandla Xaba</p>
      <a href="#top">Back to top</a>
    </div>
  </footer>
  <dialog class="viewer" data-viewer aria-label="Image viewer">
    <form method="dialog" class="viewer__bar">
      <p class="viewer__caption" data-viewer-caption></p>
      <button class="btn btn--secondary" type="submit">Close</button>
    </form>
    <div class="viewer__stage"><img data-viewer-img alt=""></div>
  </dialog>`;
}

const THEME_BOOT = `(function(){var t;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t;document.documentElement.classList.add('js')})();`;

export function documentShell(ctx, { title, description, body, bodyClass = '', noindex = false, ogImage = 'assets/images/og-default.jpg' }) {
  const canonical = site.origin + site.basePath + ctx.path.replace(/index\.html$/, '');
  const fullTitle = title ? `${title} — Sphamandla Xaba` : 'Sphamandla Xaba — Product Designer | UI/UX';
  return `<!doctype html>
<html lang="en-ZA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.origin + site.basePath + ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="${url(ctx, 'assets/favicon.svg')}" type="image/svg+xml">
<link rel="preload" href="${url(ctx, 'assets/fonts/inter-latin-wght-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${url(ctx, 'assets/css/site.css')}">
<script>${THEME_BOOT}</script>
<script src="${url(ctx, 'assets/js/main.js')}" defer></script>
</head>
<body class="${bodyClass}" id="top">
${header(ctx)}
<main id="main" tabindex="-1">
${body}
</main>
${footer(ctx)}
</body>
</html>
`;
}
