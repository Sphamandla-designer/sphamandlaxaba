import { esc, url, html, img, status, button, cvButton, sectionHead, icon } from '../shared.mjs';
import { projects, moreWork } from '../content/projects.mjs';
import { timeline, closingCta } from './partials.mjs';

const specialisms = ['Enterprise systems', 'Mobile apps', 'SaaS & dashboards', 'Websites', 'UX/UI'];

const hero = (ctx) => html`
  <section class="hero hero--home" aria-labelledby="hero-h">
    <div class="hero__visual" aria-hidden="true" data-hero-visual>
      <canvas data-hero-canvas></canvas>
      <svg class="hero__grid-fallback" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 50h100M50 0v100M0 25h100M0 75h100M25 0v100M75 0v100" stroke="currentColor" stroke-width="0.15" fill="none"/></svg>
    </div>
    <div class="wrap hero__inner">
      <p class="hero__eyebrow" data-stagger>Product Designer · UI/UX · South Africa</p>
      <h1 class="hero__title" id="hero-h" data-words>I design digital products that make complex workflows simpler.</h1>
      <p class="hero__copy" data-stagger>Enterprise systems, mobile apps and websites — turning complex requirements into clear, practical products.</p>
      <div class="btn-row hero__actions" data-stagger>
        ${button(ctx, { label: 'Explore selected work', href: 'index.html#work' })}
        ${cvButton(ctx, 'secondary')}
      </div>
      <ul class="chips" role="list" aria-label="Specialisations" data-stagger>${specialisms.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
    </div>
    <a class="hero__scroll" href="#work" aria-label="Scroll to selected work"><span></span></a>
  </section>`;

function projectCard(ctx, p, i) {
  const media = p.cover
    ? img(ctx, p.cover.key, '', { sizes: '(min-width: 1120px) 380px, (min-width: 768px) 45vw, 100vw' })
    : `<div class="tile__type" aria-hidden="true"><span>GEMIS</span></div>`;
  return html`
  <article class="tile card card--soft" aria-labelledby="p-${p.slug}" data-reveal style="--i:${i}">
    <a class="tile__link" href="${url(ctx, `work/${p.slug}/`)}" aria-labelledby="p-${p.slug}">
      <div class="tile__media">${media}</div>
      <div class="tile__text">
        <p class="tile__cat">${esc(p.category)}</p>
        <h3 class="tile__title" id="p-${p.slug}">${esc(p.title)}</h3>
        <p class="tile__summary">${esc(p.summary)}</p>
        <div class="tile__foot">${status(p.status.label, p.status.kind)}<span class="btn btn--primary btn--sm tile__cta"><span>View</span>${icon.arrow}</span></div>
      </div>
    </a>
  </article>`;
}

const work = (ctx) => html`
  <section class="section" id="work" aria-labelledby="work-h" tabindex="-1">
    <div class="wrap">
      ${sectionHead({ title: 'Selected work', id: 'work-h' })}
      <div class="tiles">${projects.map((p, i) => projectCard(ctx, p, i)).join('')}</div>
      <h3 class="subhead">More work</h3>
      <div class="more">
        ${moreWork
          .map(
            (m) => `<article class="card more__card" data-reveal>
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
          ${stages.map(([t, d], i) => `<li data-reveal style="--i:${i}"><span class="steps__n">${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
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
        ${Object.entries(groups).map(([k, l], i) => `<div class="card card--soft caps__card" data-reveal style="--i:${i}"><h3>${k}</h3><ul role="list">${l.map((x) => `<li>${x}</li>`).join('')}</ul></div>`).join('')}
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
      <article class="promo card card--soft" data-reveal>
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
