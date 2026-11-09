// Case-study template and the components only case studies use.

import { html, esc, url, meta, status, figure, button } from './layout.mjs';
import { projects } from './content/projects.mjs';

/** A key design decision — always the same five-part structure. */
export function decision(ctx, { n, title, challenge, considerations, decision: choice, rationale, evidence }) {
  return html`
  <article class="decision" aria-labelledby="dec-${ctx.slug}-${n}">
    <header class="decision__head">
      <p class="decision__num">Decision ${esc(n)}</p>
      <h3 class="decision__title" id="dec-${ctx.slug}-${n}">${title}</h3>
    </header>
    <dl class="decision__grid">
      <div><dt>The challenge</dt><dd>${challenge}</dd></div>
      <div><dt>Considerations</dt><dd>${considerations}</dd></div>
      <div><dt>My decision</dt><dd>${choice}</dd></div>
      <div><dt>Rationale</dt><dd>${rationale}</dd></div>
    </dl>
    <div class="decision__evidence"><p class="label">Evidence</p>${evidence}</div>
  </article>`;
}

/** Horizontal sequence of steps (journeys, pipelines). */
export const flow = (steps, { label = '', dense = false } = {}) => html`
  <ol class="flow${dense ? ' flow--dense' : ''}"${label ? ` aria-label="${esc(label)}"` : ''}>
    ${steps
      .map((s, i) =>
        typeof s === 'string'
          ? `<li><span class="flow__n">${String(i + 1).padStart(2, '0')}</span><span class="flow__t">${esc(s)}</span></li>`
          : `<li><span class="flow__n">${String(i + 1).padStart(2, '0')}</span><span class="flow__t">${esc(s.t)}</span>${s.d ? `<span class="flow__d">${esc(s.d)}</span>` : ''}</li>`,
      )
      .join('')}
  </ol>`;

/** Information architecture shown as grouped columns. groups: [{ name, items: [] }] */
export const tree = (root, groups, note = '') => html`
  <div class="tree">
    <p class="tree__root">${esc(root)}</p>
    <div class="tree__groups">
      ${groups
        .map(
          (g) => `<div class="tree__group"><p class="tree__name">${esc(g.name)}</p><ul role="list">${g.items
            .map((i) => `<li>${esc(i)}</li>`)
            .join('')}</ul></div>`,
        )
        .join('')}
    </div>
    ${note ? `<p class="tree__note">${note}</p>` : ''}
  </div>`;

/** A row of phone screens. items: [{ key, alt, caption }] */
export const screens = (ctx, items, cls = '') => html`
  <div class="screens ${cls}">
    ${items
      .map((s) => figure(ctx, { ...s, frame: 'phone', sizes: '(min-width: 1024px) 280px, 45vw' }))
      .join('')}
  </div>`;

/** Plain two-column text pair, e.g. "Done / In progress". */
export const pair = (a, b) => html`<div class="pair"><div>${a}</div><div>${b}</div></div>`;

/**
 * Render a full case-study page body.
 * content: { slug, intro: [[k,v]], cover(ctx), sections: [{ id, title, body(ctx) }] }
 */
export function renderCase(ctx, content) {
  const p = projects.find((x) => x.slug === content.slug);
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];

  const toc = content.sections
    .map((s, k) => `<li><a href="#${s.id}"><span>${String(k + 1).padStart(2, '0')}</span>${esc(s.short || s.title)}</a></li>`)
    .join('');

  const sections = content.sections
    .map(
      (s, k) => html`
    <section class="cs-section" id="${s.id}" aria-labelledby="${s.id}-h">
      <header class="cs-section__head">
        <p class="cs-section__num">${String(k + 1).padStart(2, '0')}</p>
        <h2 class="cs-section__title" id="${s.id}-h">${esc(s.title)}</h2>
      </header>
      <div class="cs-section__body">${s.body(ctx)}</div>
    </section>`,
    )
    .join('');

  return html`
  <article class="case case--${p.slug}">
    <header class="cs-hero wrap">
      <nav class="crumbs" aria-label="Breadcrumb">
        <ol role="list"><li><a href="${url(ctx, 'index.html#work')}">Selected work</a></li><li aria-current="page">${esc(p.name)}</li></ol>
      </nav>
      <div class="cs-hero__grid">
        <div class="cs-hero__num" aria-hidden="true">${p.num}</div>
        <div class="cs-hero__text">
          <p class="eyebrow">${esc(p.category)}</p>
          <h1 class="cs-hero__title">${esc(p.title)}</h1>
          <p class="cs-hero__lede">${content.lede}</p>
        </div>
        <div class="cs-hero__meta">
          ${meta([
            ['Project', esc(p.name)],
            ['Status', status(p.status.label, p.status.kind)],
            ['Platform', esc(p.platform)],
            ['My role', esc(p.role)],
            ...(content.introCtx ? content.introCtx(ctx) : []),
          ])}
        </div>
      </div>
    </header>
    <div class="cs-cover wrap">${content.cover(ctx)}</div>
    <div class="cs-layout wrap">
      <nav class="cs-toc" aria-label="Case study sections">
        <p class="label">In this case study</p>
        <ol role="list">${toc}</ol>
      </nav>
      <div class="cs-body">${sections}</div>
    </div>
    <nav class="cs-next" aria-label="Next case study">
      <a class="cs-next__link wrap" href="${url(ctx, `work/${next.slug}/`)}">
        <span class="label">Next case study · ${next.num}</span>
        <span class="cs-next__name">${esc(next.name)}</span>
        <span class="cs-next__title">${esc(next.title)}</span>
        <span class="cs-next__cta">Explore case study ${'<svg class="i" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'}</span>
      </a>
    </nav>
  </article>`;
}

export { button };
