// Partials shared by more than one page.

import { esc, url, site, icon, button, cvButton } from '../shared.mjs';
import { experience } from '../content/experience.mjs';

export const timeline = (ctx) => `
  <ol class="timeline" role="list">
    ${experience
      .map(
        (e) => `
      <li class="timeline__item">
        <div class="timeline__when">
          <p class="timeline__dates">${esc(e.dates)}</p>
          ${e.current ? '<p class="timeline__now"><span aria-hidden="true">●</span> Current role</p>' : ''}
        </div>
        <div class="timeline__what">
          <h3 class="timeline__org">${esc(e.org)}</h3>
          <p class="timeline__role">${esc(e.role)}</p>
          <ul class="timeline__points">${e.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
          ${
            e.work.length
              ? `<p class="timeline__work"><span class="label">Case studies</span> ${e.work
                  .map((w) => `<a href="${url(ctx, w.href)}">${esc(w.label)}</a>`)
                  .join('<span aria-hidden="true"> · </span>')}</p>`
              : ''
          }
        </div>
      </li>`,
      )
      .join('')}
  </ol>`;

export const contactLinks = (ctx) => `
  <ul class="contact-links" role="list">
    <li>
      <span class="label">Email</span>
      <span class="contact-links__row">
        <a class="contact-links__big" href="mailto:${site.email}">${site.email}</a>
        <button class="copy" type="button" data-copy="${site.email}">${icon.copy}<span data-copy-label>Copy</span></button>
      </span>
    </li>
    <li>
      <span class="label">LinkedIn</span>
      <a class="contact-links__big" href="${site.linkedin}" target="_blank" rel="noopener">Sphamandla Xaba ${icon.external}<span class="sr-only"> (opens in a new tab)</span></a>
    </li>
    <li>
      <span class="label">CV</span>
      <a class="contact-links__big" href="${url(ctx, site.cv)}" download>Download CV (PDF) ${icon.download}</a>
    </li>
  </ul>
  <p class="sr-only" role="status" aria-live="polite" data-copy-status></p>`;

export const closingCta = (ctx) => `
  <section class="closing" aria-labelledby="closing-h">
    <div class="wrap closing__grid">
      <p class="eyebrow">Contact</p>
      <h2 class="closing__title" id="closing-h">Have a product or experience that needs thoughtful design?</h2>
      <p class="closing__copy">I’m open to opportunities to contribute to meaningful digital products and collaborate with teams building better experiences.</p>
      <div class="closing__links">${contactLinks(ctx)}</div>
    </div>
  </section>`;

export { button, cvButton };
