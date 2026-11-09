// Case-study template and case-only components.

import { html, esc, url, meta, status, icon } from './layout.mjs';
import { projects } from './content/projects.mjs';

/** A key decision: problem, decision, why — plus the screen that shows it. */
export const decision = (ctx, { n, title, problem, choice, why, evidence }) => html`
  <article class="decision card">
    <div class="decision__text">
      <p class="decision__num">${esc(n)}</p>
      <h3 class="decision__title">${esc(title)}</h3>
      <dl class="decision__list">
        <div><dt>Problem</dt><dd>${problem}</dd></div>
        <div><dt>Decision</dt><dd>${choice}</dd></div>
        <div><dt>Why</dt><dd>${why}</dd></div>
      </dl>
    </div>
    <div class="decision__media">${evidence}</div>
  </article>`;

/** A sequence of steps as subtle pills. */
export const flow = (steps, label) => html`
  <ol class="flow" aria-label="${esc(label)}">${steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>`;

/** Bullet list without decoration. */
export const list = (items) => `<ul class="list" role="list">${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;

/** Grouped navigation map. groups: [{ name, items }] */
export const tree = (groups) => html`
  <div class="tree">${groups
    .map((g) => `<div class="tree__group"><p class="tree__name">${esc(g.name)}</p><ul role="list">${g.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></div>`)
    .join('')}</div>`;

export function renderCase(ctx, content) {
  const p = projects.find((x) => x.slug === content.slug);
  const next = projects[(projects.indexOf(p) + 1) % projects.length];

  const sections = content.sections
    .map(
      (s) => html`
    <section class="cs-section${s.dark ? ' cs-section--dark' : ''}" id="${s.id}" aria-labelledby="${s.id}-h">
      <div class="wrap">
        <h2 class="cs-section__title" id="${s.id}-h">${esc(s.title)}</h2>
        <div class="cs-section__body">${s.body(ctx)}</div>
      </div>
    </section>`,
    )
    .join('');

  return html`
  <article class="case">
    <header class="cs-hero wrap">
      <a class="back" href="${url(ctx, 'index.html#work')}">← Selected work</a>
      <p class="cs-hero__cat">${esc(p.category)}</p>
      <h1 class="cs-hero__title">${esc(p.title)}</h1>
      <p class="cs-hero__lede">${content.lede}</p>
      ${meta([
        ['Role', esc(p.role)],
        ['Platform', esc(p.platform)],
        ['Status', status(p.status.label, p.status.kind)],
        ...(content.meta ? content.meta(ctx) : []),
      ], 'meta--row')}
    </header>
    <div class="cs-cover wrap">${content.cover(ctx)}</div>
    ${sections}
    <nav class="wrap cs-next" aria-label="Next case study">
      <a class="cs-next__card card card--dark" href="${url(ctx, `work/${next.slug}/`)}">
        <span class="cs-next__label">Next case study</span>
        <span class="cs-next__name">${esc(next.name)}</span>
        <span class="btn btn--secondary" aria-hidden="true"><span>Explore</span>${icon.arrow}</span>
      </a>
    </nav>
  </article>`;
}
