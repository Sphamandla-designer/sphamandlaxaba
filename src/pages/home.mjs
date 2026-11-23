// Homepage. Built on the site's design system (design.md tokens in
// src/styles/01-tokens.css) and the shared shell; its own styles are in
// src/styles/07-home.css.
//
// Order: hero → selected work → how I work → experience → contact.
// Each fact appears once. Every visual is a real artefact from the projects
// (prototype captures and recordings in assets/); nothing is illustrative
// except the GEMIS tile, which is typographic because no capture exists yet.

import { esc, url, img, site, icon } from '../shared.mjs';
import { projects } from '../content/projects.mjs';
import { experience, education, tools } from '../content/experience.mjs';
import { video } from '../content/managem-parts.mjs';

const P = Object.fromEntries(projects.map((p) => [p.slug, p]));
const caseUrl = (ctx, slug) => url(ctx, `work/${slug}/`);
const state = (p) => `<span class="status status--${p.status.kind}"><span class="status__mark" aria-hidden="true"></span>${esc(p.status.label)}</span>`;
const more = (label) => `<span class="hm-more"><span>${label}</span>${icon.arrow}</span>`;
const phone = (ctx, key, alt, cls = '') => `<span class="hm-phone${cls ? ` ${cls}` : ''}">${img(ctx, `wastemart/${key}`, alt, { sizes: '220px' })}</span>`;

// ------------------------------------------------------------------ hero

const hero = (ctx) => `
  <section class="hm-hero" aria-labelledby="hero-h">
    <div class="wrap">
      <p class="hm-eyebrow" data-stagger>Product Designer · ${esc(site.location)}</p>
      <h1 class="hm-hero__title" id="hero-h" data-words>Designing complex systems. Making them feel simple.</h1>
      <p class="hm-hero__copy" data-stagger>I’m Sphamandla Xaba. I design enterprise platforms, digital products and intelligent user experiences.</p>
      <div class="btn-row hm-hero__cta" data-stagger>
        <a class="btn btn--primary" href="#work"><span>Explore selected work</span>${icon.arrow}</a>
        <a class="btn btn--secondary" href="${url(ctx, site.cv)}" download><span>View curriculum vitae</span>${icon.download}</a>
      </div>
      <div class="hm-stage" data-hm-stage>
        <div class="hm-browser">
          <div class="hm-browser__bar" aria-hidden="true"><i></i><i></i><i></i></div>
          ${img(ctx, 'managem/mg-dashboard', 'The redesigned ManaGEM dashboard', { sizes: '(min-width: 1264px) 1040px, 92vw', eager: true })}
        </div>
        ${phone(ctx, '06-jobs', 'The WasteMart driver app job list', 'hm-stage__phone')}
      </div>
      <p class="hm-cap">ManaGEM and WasteMart design prototypes · demo data</p>
    </div>
  </section>`;

// ------------------------------------------------------------------ work

const work = (ctx) => `
  <section class="hm-sec" id="work" aria-labelledby="work-h">
    <div class="wrap">
      <header class="hm-head" data-reveal>
        <h2 class="hm-h2" id="work-h">Selected work.</h2>
        <p class="hm-head__sub">Three products, three kinds of complexity.</p>
      </header>
      <div class="hm-work">
        <a class="hm-tile hm-tile--managem" href="${caseUrl(ctx, 'managem')}" data-reveal>
          <div class="hm-tile__text">
            <p class="hm-tile__cat">Enterprise resource planning</p>
            <h3 class="hm-tile__name">ManaGEM</h3>
            <p class="hm-tile__line">An established ERP, redesigned so complex workflows are clear and consistent.</p>
            <p class="hm-tile__foot">${state(P.managem)}${more('View case study')}</p>
          </div>
          <div class="hm-tile__media hm-tile__media--screen">${img(ctx, 'managem/mg-invoices', 'ManaGEM invoices screen', { sizes: '(min-width: 1264px) 760px, 92vw' })}</div>
        </a>
        <a class="hm-tile hm-tile--wastemart" href="${caseUrl(ctx, 'wastemart')}" data-reveal>
          <div class="hm-tile__text">
            <p class="hm-tile__cat">Mobile application</p>
            <h3 class="hm-tile__name">WasteMart</h3>
            <p class="hm-tile__line">A driver’s working day in one app: jobs, evidence and sign-off.</p>
            <p class="hm-tile__foot">${state(P.wastemart)}${more('View case study')}</p>
          </div>
          <div class="hm-tile__media hm-tile__media--phones">${phone(ctx, '07-job-detail', 'WasteMart job detail')}${phone(ctx, '09-capture-top', 'WasteMart evidence capture')}${phone(ctx, '12-signoff', 'WasteMart customer sign-off')}</div>
        </a>
        <a class="hm-tile hm-tile--gemis" href="${caseUrl(ctx, 'gemis')}" data-reveal>
          <div class="hm-tile__text">
            <p class="hm-tile__cat">Corporate website</p>
            <h3 class="hm-tile__name">GEMIS</h3>
            <p class="hm-tile__line">A website redesign I led, built with a development team.</p>
            <p class="hm-tile__foot">${state(P.gemis)}${more('View case study')}</p>
          </div>
          <div class="hm-tile__media hm-tile__media--type" aria-hidden="true"><span>GEMIS</span></div>
        </a>
      </div>
    </div>
  </section>`;

// -------------------------------------------------------------- approach

const flow = [['06-jobs', 'Jobs'], ['07-job-detail', 'Job'], ['09-capture-top', 'Evidence'], ['12-signoff', 'Sign-off'], ['19-endday-review', 'End of day']];
const steps = ['Requirements', 'User needs', 'Information architecture', 'User flows', 'Interface system', 'Handoff'];

const skill = (cls, title, line, media, src) => `
  <article class="hm-skill ${cls}" data-reveal>
    <header><h3>${title}</h3><p>${line}</p></header>
    <div class="hm-skill__media">${media}</div>
    <p class="hm-skill__src">${src}</p>
  </article>`;

const approach = (ctx) => `
  <section class="hm-sec hm-sec--soft" id="approach" aria-labelledby="approach-h">
    <div class="wrap">
      <header class="hm-head" data-reveal>
        <h2 class="hm-h2" id="approach-h">How I work.</h2>
        <p class="hm-head__sub">Shown in the work itself.</p>
      </header>
      <ol class="hm-steps" role="list" aria-label="Process, in order" data-reveal>${steps.map((s, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${s}</li>`).join('')}</ol>
      <div class="hm-skills">
        ${skill('hm-skill--ia', 'Information architecture', 'Structure people can predict.',
          `<div class="hm-ba"><figure>${img(ctx, 'managem/nav-original-sales', 'The original ManaGEM sidebar, with Sales expanded into a long list', { sizes: '200px' })}<figcaption>Before</figcaption></figure><figure>${img(ctx, 'managem/ds-sidebar-expanded', 'The redesigned sidebar in five labelled groups', { sizes: '220px' })}<figcaption>After</figcaption></figure></div>`,
          'ManaGEM navigation')}
        ${skill('hm-skill--ds', 'Design systems', 'Build the parts once.',
          `<div class="hm-stack">${img(ctx, 'managem/ds-kpi-grid', 'KPI card components', { sizes: '(min-width: 1264px) 640px, 92vw' })}${img(ctx, 'managem/ds-toolbar', 'Toolbar and filter components', { sizes: '(min-width: 1264px) 640px, 92vw' })}${img(ctx, 'managem/ds-table-invoices', 'Data table component', { sizes: '(min-width: 1264px) 640px, 92vw' })}</div>`,
          'Components from the design system GEMIS adopted')}
        ${skill('hm-skill--flow', 'User flows', 'Every task, from start to finish.',
          `<ol class="hm-flow" role="list">${flow.map(([k, l], i) => `<li>${phone(ctx, k, `WasteMart: ${l}`)}<span><b>${i + 1}</b>${l}</span></li>`).join('')}</ol>`,
          'WasteMart driver flow')}
        ${skill('hm-skill--proto', 'Prototyping', 'Tested before it is built.',
          video(ctx, 'flow-navigation', 'Moving between modules in the ManaGEM redesign prototype', { source: '' }),
          'ManaGEM interactive prototype')}
        ${skill('hm-skill--ai', 'AI-assisted design', 'AI that shows its work.',
          img(ctx, 'managem/to-06-validation', 'Take-On validation summary: what the AI-assisted step found, and what needs review', { sizes: '(min-width: 1264px) 520px, 92vw' }),
          'ManaGEM Take-On onboarding')}
      </div>
    </div>
  </section>`;

// ------------------------------------------------------------ experience

const profile = (ctx) => `
  <section class="hm-sec" id="experience" aria-labelledby="exp-h">
    <div class="wrap">
      <header class="hm-head" data-reveal>
        <h2 class="hm-h2" id="exp-h">Experience.</h2>
      </header>
      <div class="hm-exp">
        <div class="hm-exp__me" data-reveal>
          <div class="hm-exp__photo">${img(ctx, 'about/portrait-spha', 'Sphamandla Xaba', { sizes: '(min-width: 900px) 320px, 60vw' })}</div>
          <a class="hm-link" href="${url(ctx, 'about/')}"><span>More about me</span>${icon.arrow}</a>
        </div>
        <div class="hm-exp__body" data-reveal>
          <ol class="hm-roles" role="list">
            ${experience.map((e) => `<li><p class="hm-roles__d">${esc(e.dates)}</p><div><h3>${esc(e.role)}</h3><p>${esc(e.org)}</p></div></li>`).join('')}
            <li><p class="hm-roles__d">Education</p><div><h3>${esc(education.qualification)}</h3><p>${esc(education.school)}</p></div></li>
          </ol>
          <dl class="hm-tools">${Object.entries(tools).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v.map(esc).join(', ')}</dd></div>`).join('')}</dl>
        </div>
      </div>
    </div>
  </section>`;

// --------------------------------------------------------------- contact

const contact = () => `
  <section class="hm-sec hm-sec--contact" id="contact" aria-labelledby="contact-h">
    <div class="wrap">
      <div class="hm-contact" data-reveal>
        <h2 class="hm-contact__title" id="contact-h">Have a complex product challenge?</h2>
        <p class="hm-contact__copy">Let’s turn complexity into a clearer, more useful digital experience.</p>
        <div class="btn-row hm-contact__cta">
          <a class="btn btn--primary" href="mailto:${site.email}"><span>${site.email}</span></a>
          <a class="btn btn--secondary" href="${site.linkedin}" target="_blank" rel="noopener"><span>LinkedIn</span>${icon.external}<span class="sr-only"> (opens in a new tab)</span></a>
        </div>
      </div>
    </div>
  </section>`;

export default {
  path: 'index.html',
  page: 'Home',
  navKey: 'home',
  title: '',
  bodyClass: 'page-home',
  description: 'Portfolio of Sphamandla Xaba, a Product Designer in Johannesburg focused on enterprise platforms, digital products and intelligent user experiences. Case studies: ManaGEM, WasteMart and GEMIS.',
  render: (ctx) => hero(ctx) + work(ctx) + approach(ctx) + profile(ctx) + contact(ctx),
};
