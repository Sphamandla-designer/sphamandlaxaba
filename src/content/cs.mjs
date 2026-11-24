// Shared case-study system (class prefix "cx"), used by all three case studies.
//
// One page shape, so a recruiter learns it once:
//   header  → title, one-sentence summary, actions (View prototype), four facts
//   cover   → one framed visual
//   glance  → Problem · My part · Outcome
//   sections→ label + heading + one short intro, then points and sized visuals
//   close   → next project
//
// Visual sizes are fixed by role, never by the image file:
//   screen  full-width desktop capture in a browser frame (max 1040px)
//   duo     two equal captures
//   trio    three equal captures (cropped to one ratio)
//   phones  phone captures at one width (220px), in a row
//   strip   a wide, short crop at full width
// Styles: src/styles/09-case.css.

import { esc, url, img, icon } from '../shared.mjs';
import { full } from './managem-parts.mjs';

export const pad = (n) => String(n).padStart(2, '0');

/** A captioned image that opens in the viewer. frame: browser | plain | phone | crop */
export function shot(ctx, key, alt, { cap = '', src = '', sizes = '(min-width: 1200px) 1040px, 92vw', frame = 'plain', eager = false, bar = '' } = {}) {
  const chrome = frame === 'browser' ? `<span class="cx-bar" aria-hidden="true"><i></i><i></i><i></i>${bar ? `<b>${esc(bar)}</b>` : ''}</span>` : '';
  return `<figure class="cx-shot cx-shot--${frame}">
    <a class="cx-shot__frame zoom" href="${full(ctx, key)}" data-zoom data-caption="${esc(cap || alt)}" aria-label="Enlarge: ${esc(alt)}">${chrome}${img(ctx, key, alt, { sizes, eager })}</a>
    ${cap || src ? `<figcaption>${cap ? `<span>${cap}</span>` : '<span></span>'}${src ? `<small>${esc(src)}</small>` : ''}</figcaption>` : ''}
  </figure>`;
}

/** The neutral mat every visual sits on. layout: screen | duo | trio | phones | strip | free */
export const stage = (inner, layout = 'screen', { note = '' } = {}) => `
  <div class="cx-stage cx-stage--${layout}">
    <div class="cx-stage__in">${inner}</div>
    ${note ? `<p class="cx-stage__note">${note}</p>` : ''}
  </div>`;

/** Page header: what, who, and where to click. */
export function header(ctx, { kicker, title, summary, actions = [], facts = [] }) {
  return `
  <header class="cx-header" aria-labelledby="cx-title">
    <div class="wrap">
      <a class="cx-back" href="${url(ctx, 'index.html#work')}">${icon.arrow}<span>Selected work</span></a>
      <p class="cx-kicker">${esc(kicker)}</p>
      <h1 class="cx-title" id="cx-title">${esc(title)}</h1>
      <p class="cx-summary">${summary}</p>
      ${actions.length ? `<div class="cx-actions">${actions.map(action).join('')}</div>` : ''}
      <dl class="cx-facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    </div>
  </header>`;
}

/** { label, href, primary, external, note } — href is already resolved. */
export const action = ({ label, href, primary = false, external = false }) =>
  `<a class="cx-btn${primary ? ' cx-btn--primary' : ''}" href="${href}"${external ? ' target="_blank" rel="noopener"' : ''}><span>${esc(label)}</span>${external ? icon.external : icon.arrow}${external ? '<span class="sr-only"> (opens in a new tab)</span>' : ''}</a>`;

/** The cover visual directly under the header. */
export const cover = (inner, layout = 'screen') => `<div class="cx-cover"><div class="wrap">${stage(inner, layout)}</div></div>`;

/** Problem · My part · Outcome. */
export const glance = (items) => `
  <section class="cx-glance" aria-label="At a glance">
    <div class="wrap">
      <dl class="cx-glance__grid">${items.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    </div>
  </section>`;

/** Sticky section links with a reading-progress line. */
export const toc = (items, cta = '') => `
  <nav class="cx-toc" aria-label="Case study sections" data-chapters>
    <div class="wrap">
      <ol role="list">${items.map(([id, l]) => `<li><a href="#${id}">${l}</a></li>`).join('')}</ol>
      ${cta}
    </div>
    <span class="cx-toc__bar" data-progress aria-hidden="true"></span>
  </nav>`;

/** A section: label on the left, heading and intro on the right, then the body at full width. */
export const sec = (id, { label, title, intro = '' }, body, { soft = false } = {}) => `
  <section class="cx-sec${soft ? ' cx-sec--soft' : ''}" id="${id}" aria-labelledby="${id}-h">
    <div class="wrap">
      <header class="cx-head">
        <p class="cx-label">${label}</p>
        <div class="cx-head__main">
          <h2 class="cx-h2" id="${id}-h">${title}</h2>
          ${intro ? `<p class="cx-intro">${intro}</p>` : ''}
        </div>
      </header>
      <div class="cx-body">${body}</div>
    </div>
  </section>`;

/** Short, bold-led points. cols: 2 | 3 | 4 */
export const points = (items, cols = 3) => `
  <ul class="cx-points cx-points--${cols}" role="list">${items.map(([k, v]) => `<li><strong>${k}</strong><span>${v}</span></li>`).join('')}</ul>`;

/** A numbered sequence (only for real sequences). */
export const steps = (items, label = 'Steps') => `
  <ol class="cx-steps" role="list" aria-label="${esc(label)}">${items.map((s, i) => `<li><span class="cx-steps__n">${pad(i + 1)}</span><span>${s}</span></li>`).join('')}</ol>`;

/** Text beside a visual, for one decision. */
export const split = (text, visual, { flip = false } = {}) => `
  <div class="cx-split${flip ? ' cx-split--flip' : ''}"><div class="cx-split__text">${text}</div><div class="cx-split__visual">${visual}</div></div>`;

/** Problem / Decision / Why. */
export const decision = (n, title, rows) => `
  <p class="cx-dec__n">Decision ${pad(n)}</p>
  <h3 class="cx-h3">${title}</h3>
  <dl class="cx-rows">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;

/** Key/value rows. */
export const rows = (items) => `<dl class="cx-rows">${items.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;

export const note = (text) => `<p class="cx-note">${text}</p>`;
export const prose = (...ps) => `<div class="cx-prose">${ps.map((p) => `<p>${p}</p>`).join('')}</div>`;
export const textlink = (href, label, external = false) =>
  `<a class="cx-link" href="${href}"${external ? ' target="_blank" rel="noopener"' : ''}><span>${label}</span>${external ? icon.external : icon.arrow}${external ? '<span class="sr-only"> (opens in a new tab)</span>' : ''}</a>`;

/** Closing actions and the next project. */
export const close = (ctx, next, actions = []) => `
  <footer class="cx-close">
    <div class="wrap">
      ${actions.length ? `<div class="cx-actions">${actions.map(action).join('')}</div>` : ''}
      <a class="cx-next" href="${url(ctx, `work/${next.slug}/`)}">
        <span class="cx-next__label">Next case study</span>
        <span class="cx-next__name">${esc(next.name)}</span>
        <span class="cx-next__title">${esc(next.title)}</span>
        ${icon.arrow}
      </a>
    </div>
  </footer>`;
