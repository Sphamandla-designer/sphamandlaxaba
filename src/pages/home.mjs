import { esc, url, html, img, status, button, cvButton, sectionHead, icon } from '../shared.mjs';
import { projects, moreWork } from '../content/projects.mjs';
import { timeline, closingCta } from './partials.mjs';

const specialisms = ['Enterprise systems', 'Mobile apps', 'SaaS & dashboards', 'Websites', 'UX/UI'];

const hero = (ctx) => html`
  <section class="hero" aria-labelledby="hero-h">
    <div class="wrap hero__grid">
      <div class="hero__text">
        <p class="hero__eyebrow">Product Designer · UI/UX · South Africa</p>
        <h1 class="hero__title" id="hero-h">I design digital products that make complex workflows simpler.</h1>
        <p class="hero__copy">Enterprise systems, mobile apps and websites — turning complex requirements into clear, practical products.</p>
        <ul class="chips" role="list" aria-label="Specialisations">${specialisms.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
      </div>
      <div class="hero__card card card--form">
        <p class="hero__card-title">Selected work</p>
        <ul class="inputs" role="list">
          ${projects
            .map(
              (p) => `<li><a class="input-row" href="${url(ctx, `work/${p.slug}/`)}"><span class="input-row__dot" aria-hidden="true"></span><span class="input-row__label">${esc(p.name)}</span><span class="input-row__value">${esc(p.category.split(' · ')[0])}</span>${icon.arrow}</a></li>`,
            )
            .join('')}
        </ul>
        <div class="hero__actions">
          ${button(ctx, { label: 'Explore selected work', href: 'index.html#work' })}
          ${cvButton(ctx, 'subtle')}
        </div>
      </div>
    </div>
  </section>`;

function projectCard(ctx, p, i) {
  const dark = i === 1; // alternating rhythm: white → black → white
  const media = p.cover
    ? `<a class="promo__media" href="${url(ctx, `work/${p.slug}/`)}" tabindex="-1" aria-hidden="true">${img(ctx, p.cover.key, '', { sizes: '(min-width: 1120px) 560px, 100vw' })}</a>`
    : `<div class="promo__media promo__media--type" aria-hidden="true"><span>GEMIS</span></div>`;
  return html`
  <article class="promo card ${dark ? 'card--dark' : 'card--soft'}${i % 2 ? ' promo--flip' : ''}" aria-labelledby="p-${p.slug}">
    ${media}
    <div class="promo__text">
      <p class="promo__cat">${esc(p.name)} · ${esc(p.category)}</p>
      <h3 class="promo__title" id="p-${p.slug}">${esc(p.title)}</h3>
      <p class="promo__summary">${esc(p.summary)}</p>
      ${status(p.status.label, p.status.kind)}
      <div class="btn-row">${button(ctx, { label: 'View case study', href: `work/${p.slug}/`, variant: dark ? 'secondary' : 'primary' })}</div>
    </div>
  </article>`;
}

const work = (ctx) => html`
  <section class="section" id="work" aria-labelledby="work-h" tabindex="-1">
    <div class="wrap">
      ${sectionHead({ title: 'Selected work', id: 'work-h' })}
      <div class="stack">${projects.map((p, i) => projectCard(ctx, p, i)).join('')}</div>
      <h3 class="subhead">More work</h3>
      <div class="more">
        ${moreWork
          .map(
            (m) => `<article class="card more__card">
          ${img(ctx, m.image.key, m.image.alt, { sizes: '(min-width: 768px) 560px, 100vw' })}
          <div class="more__text">
            <h4 class="more__name">${m.href ? `<a href="${m.href}" target="_blank" rel="noopener">${esc(m.name)} ${icon.external}<span class="sr-only"> (opens in a new tab)</span></a>` : esc(m.name)}</h4>
            <p class="more__note">${esc(m.note)}</p>
          </div>
        </article>`,
          )
          .join('')}
      </div>
    </div>
  </section>`;

const approach = () => {
  const stages = [
    ['Understand', 'The product, the business and the people using it.'],
    ['Structure', 'Information, navigation and journeys.'],
    ['Design', 'Clear interfaces and interaction patterns.'],
    ['Refine', 'Remove inconsistencies, improve usability.'],
    ['Collaborate', 'Work closely with developers to ship it.'],
  ];
  return html`
  <section class="section" id="approach" aria-labelledby="approach-h" tabindex="-1">
    <div class="wrap">
      <div class="card card--soft approach">
        ${sectionHead({ title: 'How I work', id: 'approach-h' })}
        <ol class="steps" role="list">
          ${stages.map(([t, d], i) => `<li><span class="steps__n">${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
        </ol>
      </div>
    </div>
  </section>`;
};

const capabilities = () => {
  const groups = {
    'Product design': ['Product thinking', 'Workflow design', 'Information architecture', 'User journeys'],
    'UX/UI design': ['Interaction design', 'Wireframing', 'Prototyping', 'Responsive design'],
    'Enterprise & SaaS': ['ERP interfaces', 'Dashboards', 'Data-heavy screens', 'Business workflows'],
    'Digital experiences': ['Corporate websites', 'Redesigns', 'Mobile apps', 'Design systems'],
  };
  return html`
  <section class="section" aria-labelledby="cap-h">
    <div class="wrap">
      ${sectionHead({ title: 'Capabilities', id: 'cap-h' })}
      <div class="caps">
        ${Object.entries(groups).map(([k, l]) => `<div class="card card--soft caps__card"><h3>${k}</h3><ul role="list">${l.map((x) => `<li>${x}</li>`).join('')}</ul></div>`).join('')}
      </div>
    </div>
  </section>`;
};

const experienceSection = (ctx) => html`
  <section class="section" aria-labelledby="exp-h">
    <div class="wrap">
      ${sectionHead({ title: 'Experience', id: 'exp-h' })}
      ${timeline(ctx)}
    </div>
  </section>`;

const aboutPreview = (ctx) => html`
  <section class="section" aria-labelledby="about-h">
    <div class="wrap">
      <article class="promo card card--soft">
        <div class="promo__media promo__media--portrait">${img(ctx, 'about/portrait-spha', 'Portrait of Sphamandla Xaba', { sizes: '(min-width: 1120px) 560px, 100vw' })}</div>
        <div class="promo__text">
          <h2 class="promo__title" id="about-h">Hi, I’m Sphamandla.</h2>
          <p class="promo__summary">A Johannesburg-based product designer. I design enterprise software, mobile apps and websites at Gem Information Systems — and I like finding the structure that makes a complex product feel simple.</p>
          <div class="btn-row">${button(ctx, { label: 'More about me', href: 'about/', variant: 'primary' })}</div>
        </div>
      </article>
    </div>
  </section>`;

export default {
  path: 'index.html',
  page: 'Home',
  navKey: null,
  title: '',
  description: 'Sphamandla Xaba — South African Product Designer (UI/UX) designing enterprise systems, mobile apps and websites that make complex workflows simpler.',
  bodyClass: 'page-home',
  render: (ctx) => [hero(ctx), work(ctx), approach(), capabilities(), experienceSection(ctx), aboutPreview(ctx), closingCta(ctx)].join(''),
};
