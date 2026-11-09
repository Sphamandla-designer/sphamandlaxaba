// Partials shared by more than one page.

import { esc, url, site, icon } from '../shared.mjs';
import { experience } from '../content/experience.mjs';

/** Experience as hairline-divided rows; responsibilities expand on demand. */
export const timeline = (ctx) => `
  <div class="rows">
    ${experience
      .map(
        (e) => `
      <details class="row">
        <summary>
          <span class="row__main"><span class="row__title">${esc(e.org)}</span><span class="row__sub">${esc(e.role)}</span></span>
          <span class="row__meta">${esc(e.dates)}</span>
        </summary>
        <div class="row__body">
          <ul class="list" role="list">${e.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
          ${e.work.length ? `<p class="row__links">${e.work.map((w) => `<a href="${url(ctx, w.href)}">${esc(w.label)}</a>`).join(' · ')}</p>` : ''}
        </div>
      </details>`,
      )
      .join('')}
  </div>`;

export const contactLinks = (ctx) => `
  <ul class="contact" role="list">
    <li>
      <a class="contact__link" href="mailto:${site.email}">${site.email}</a>
      <button class="btn btn--subtle btn--sm" type="button" data-copy="${site.email}">${icon.copy}<span data-copy-label>Copy</span></button>
    </li>
    <li><a class="contact__link" href="${site.linkedin}" target="_blank" rel="noopener">LinkedIn ${icon.external}<span class="sr-only"> (opens in a new tab)</span></a></li>
    <li><a class="contact__link" href="${url(ctx, site.cv)}" download>Download CV ${icon.download}</a></li>
  </ul>
  <p class="sr-only" role="status" aria-live="polite" data-copy-status></p>`;

/** The black promo card that closes most pages. */
export const closingCta = (ctx) => `
  <section class="section" aria-labelledby="closing-h">
    <div class="wrap">
      <div class="card card--dark closing">
        <div class="closing__text">
          <h2 class="closing__title" id="closing-h">Have a product that needs thoughtful design?</h2>
          <p class="closing__copy">I’m open to product design roles and collaborations.</p>
        </div>
        ${contactLinks(ctx)}
      </div>
    </div>
  </section>`;
