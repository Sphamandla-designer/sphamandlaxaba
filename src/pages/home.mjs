// Homepage. Follows the AZENTOS reference in "Portfolio Inspirations" closely:
// a light grey hero panel inside a black frame (segmented tabs top left, date
// and a contact button top right, a tight two-line title, an (About) note, a
// two-card widget, a centred portrait with a name plate, a status pill and a
// featured card), a black strip of three labels, a centred statement whose
// words light as they are read, and an outlined container of stat cards. The
// sections after that extend the same monochrome language. Product screens
// appear only in the work section. Styles: src/home/home.css.
//
// The four KPI tiles carry figures supplied by Sphamandla. The roles
// timeline is drawn from the dates in
// src/content/experience.mjs. Nothing else on the page is scored or measured.

import { esc, url, img, site } from '../shared.mjs';
import { experience, education, tools } from '../content/experience.mjs';

const caseUrl = (ctx, slug) => url(ctx, `work/${slug}/`);
const pad = (n) => String(n).padStart(2, '0');

const svg = (d, extra = '') => `<svg viewBox="0 0 20 20" aria-hidden="true"${extra}>${d}</svg>`;
const ic = {
  home: svg('<path d="M3.5 9 10 3.5 16.5 9v7.5h-4.5v-5h-4v5H3.5z"/>'),
  grid: svg('<rect x="3.5" y="3.5" width="5.5" height="5.5" rx="1.5"/><rect x="11" y="3.5" width="5.5" height="5.5" rx="1.5"/><rect x="3.5" y="11" width="5.5" height="5.5" rx="1.5"/><rect x="11" y="11" width="5.5" height="5.5" rx="1.5"/>'),
  spark: svg('<path d="M10 3v4M10 13v4M3 10h4M13 10h4M5.5 5.5l2 2M12.5 12.5l2 2M14.5 5.5l-2 2M7.5 12.5l-2 2"/>'),
  flow: svg('<circle cx="5" cy="5" r="2"/><circle cx="15" cy="15" r="2"/><path d="M7 5h4a4 4 0 0 1 4 4v4"/>'),
  user: svg('<circle cx="10" cy="7" r="3.2"/><path d="M4 16.5c.8-3 3.2-4.5 6-4.500s5.2 1.5 6 4.5"/>'),
  mail: svg('<rect x="3" y="4.5" width="14" height="11" rx="2.5"/><path d="m4 6.5 6 4.5 6-4.5"/>'),
  search: svg('<circle cx="9" cy="9" r="5"/><path d="m13 13 3.5 3.5"/>'),
  arrow: svg('<path d="M4 10h12M11.5 5.5 16 10l-4.5 4.5"/>'),
  out: svg('<path d="M7 13 13 7M8 7h5v5"/>'),
  down: svg('<path d="M10 3.500v9M6.5 9.5 10 13l3.5-3.500M4.5 16.500h11"/>'),
};
const mark = `<svg class="mark" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="12" fill="url(#mk)"/><path d="M17.5 13h-5a3 3 0 0 0 0 6h3a3 3 0 0 1 0 6H9.500M21.5 13l9 12M30.5 13l-9 12" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><defs><linearGradient id="mk" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FF7A59"/><stop offset="1" stop-color="#D92D3A"/></linearGradient></defs></svg>`;

// ------------------------------------------------------------------ data

const NAV = [
  ['overview', 'Overview', ic.home],
  ['work', 'Projects', ic.grid],
  ['approach', 'Capabilities', ic.spark],
  ['process', 'Process', ic.flow],
  ['experience', 'Experience', ic.user],
  ['contact', 'Contact', ic.mail],
];

const PROJECTS = [
  { slug: 'managem', name: 'ManaGEM', type: 'Enterprise resource planning', role: 'UX/UI and product design', text: 'An established ERP, redesigned so complex workflows are clear and consistent. Includes the Take-On onboarding experience and the landing page.' },
  { slug: 'wastemart', name: 'WasteMart', type: 'Mobile application', role: 'Product design', text: 'A driver’s working day in one app: jobs, evidence, sign-off and end of day.' },
  { slug: 'gemis', name: 'GEMIS', type: 'Brand and website design', role: 'UI/UX design lead', text: 'A brand identity, design system and corporate website for a South African software company.' },
];

const CAPABILITIES = [
  { key: 'thinking', name: 'Product thinking', line: 'Decide what is worth designing before designing it.', items: ['Product discovery', 'Problem framing', 'User-centred decision making', 'Product requirements'], shown: ['managem', 'wastemart'] },
  { key: 'ux', name: 'UX architecture', line: 'Structure the product so the next step is obvious.', items: ['User journeys', 'Information architecture', 'Workflow design', 'Interaction architecture'], shown: ['managem', 'wastemart', 'gemis'] },
  { key: 'interface', name: 'Interface systems', line: 'Build the parts once.', items: ['Design systems', 'Component libraries', 'Responsive interfaces', 'Enterprise dashboards'], shown: ['managem', 'wastemart', 'gemis'] },
  { key: 'delivery', name: 'Product delivery', line: 'Carry the design into development.', items: ['Interactive prototypes', 'Developer collaboration', 'Design documentation', 'Interface validation'], shown: ['managem', 'wastemart', 'gemis'] },
  { key: 'ai', name: 'AI-assisted design', line: 'Use AI where it serves the product.', items: ['AI-supported workflows', 'Intelligent product experiences', 'Rapid prototyping', 'AI-assisted design exploration'], shown: ['managem'] },
];

const STEPS = [
  { name: 'Requirements', full: 'Business requirements', purpose: 'Establish what the product must achieve and the constraints it has to respect.', out: ['Project scope', 'Priorities', 'Constraints'], ev: [['managem', 'Scope, priorities and timeline were set with the GEMIS manager.']] },
  { name: 'User needs', full: 'User needs', purpose: 'Understand who uses the product, what they are trying to do and where it fails them.', out: ['Findings', 'Problem statement', 'Design principles'], ev: [['managem', 'Phone conversations with existing clients shaped the dashboard and navigation.']] },
  { name: 'Architecture', full: 'Information architecture', purpose: 'Organise content and functions so people can predict where things are.', out: ['Sitemap', 'Navigation structure', 'Page hierarchy'], ev: [['managem', 'Expanding menus became labelled navigation groups.'], ['gemis', '']] },
  { name: 'User flows', full: 'User flows', purpose: 'Map each task from start to finish, including what happens when something goes wrong.', out: ['User journeys', 'Task flows', 'Step sequences'], ev: [['wastemart', 'A driver’s day: jobs, evidence, sign-off, end of day.'], ['managem', '']] },
  { name: 'Interface', full: 'Interface systems', purpose: 'Turn structure into a consistent, reusable interface.', out: ['Design system', 'Component library', 'Screen designs'], ev: [['managem', 'A design system GEMIS formally adopted.']] },
  { name: 'Handoff', full: 'Development handoff', purpose: 'Make sure what is built matches what was designed.', out: ['Prototype', 'Specifications', 'Review notes'], ev: [['managem', 'Prototype functionally reviewed.'], ['wastemart', ''], ['gemis', '']] },
];

const AREAS = ['Product design', 'UI/UX design', 'Graphic design', 'Product coordination', 'Product testing', 'Marketing and SEO', 'Developer collaboration'];

// Roles on a year axis, from the dates in experience.mjs ("2023 — 2025").
const year = new Date().getFullYear();
const span = experience.map((e) => { const [a, b] = e.dates.split('—').map((s) => s.trim()); return { ...e, from: +a, to: /present/i.test(b) ? year : +b }; });
const y0 = Math.min(...span.map((s) => s.from));
const YEARS = Array.from({ length: year - y0 + 1 }, (_, i) => y0 + i);

// ---------------------------------------------------------------- pieces

const PROTO = { managem: ['View prototype', 'prototypes/managem.html'], wastemart: ['View prototype', 'prototypes/wastemart.html'], gemis: ['View live site', 'https://gemis.co.za/'] };
const pname = (slug) => PROJECTS.find((p) => p.slug === slug).name;
const chip = (ctx, slug) => `<a class="chip" href="${caseUrl(ctx, slug)}">${pname(slug)}${ic.out}</a>`;
/** The reference's control: a small dark rectangle with a north-east arrow. */
const btn = (href, label, { tone = 'ink', icon = ic.out, attrs = '' } = {}) => `<a class="btn btn--${tone}" href="${href}" ${attrs}><span>${label}</span>${icon}</a>`;
const lines = (...ls) => ls.map((l) => `<span class="ln"><span>${l}</span></span>`).join(' ');
const glyphs = {
  check: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m6 10.5 2.8 2.8L14.5 7.500"/></svg>',
  star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M3 12h18M5.6 5.6l12.800 12.800M18.400 5.600 5.600 18.400"/></svg>',
  mark: '<svg viewBox="0 0 24 24" aria-hidden="true" class="fill"><path d="M4 4h7v7H7.500A3.500 3.500 0 0 1 4 7.500zM13 4h3.500A3.500 3.500 0 0 1 20 7.500V11h-7zM4 13h7v7H7.500A3.500 3.500 0 0 1 4 16.500zM13 13h7v3.500A3.500 3.500 0 0 1 16.500 20H13z"/></svg>',
};
const TABS = [['overview', 'Home'], ['work', 'Work'], ['process', 'Process'], ['experience', 'About']];
const TOOLS6 = Object.values(tools).flat().slice(0, 6);

const topnav = () => `
  <nav class="tabs" aria-label="Sections">
    <ul role="list">${TABS.map(([id, l]) => `<li><a href="#${id}" data-nav="${id}">${l}</a></li>`).join('')}</ul>
  </nav>`;

const overview = (ctx) => `
  <section class="hero" id="overview" aria-labelledby="hero-h" data-sec data-scroll>
    <div class="hero__panel">
      <div class="hero__fig" aria-hidden="false">
        <div class="hero__photo">${img(ctx, 'about/sphamandla-xaba', 'Sphamandla Xaba, in a straw hat and a checked shirt, looking up to the left', { sizes: '(min-width: 900px) 36vw, 92vw', eager: true })}</div>
        <p class="plate"><span class="plate__mark">${glyphs.mark}</span><span class="plate__name">${esc(site.name)}</span><span class="plate__bars" aria-hidden="true"></span></p>
        <ul class="hero__names" role="list" aria-label="Case studies">${PROJECTS.map((p) => `<li><a href="${caseUrl(ctx, p.slug)}">${p.name}</a></li>`).join('')}</ul>
      </div>

      <div class="hero__left">
        <h1 id="hero-h" class="title" data-rise>${lines('Product', '<i>Designer</i>')}<sup aria-hidden="true">(’${String(year).slice(2)})</sup></h1>
        <div class="hero__about" data-rise>
          <p class="dot">(About)</p>
          <p>Designing complex systems. Making them feel simple.</p>
          ${btn('#work', 'View work')}
        </div>
        <div class="duo" data-rise>
          <a class="duo__a" href="#work">
            <span class="duo__n">10+</span><span class="duo__l">Digital projects</span>
            <span class="duo__tools" aria-hidden="true">${TOOLS6.map((t) => `<i>${esc(t)}</i>`).join('')}</span>
            <span class="duo__btn">Selected work</span>
          </a>
          <a class="duo__b" href="#experience"><span class="duo__l">Experience</span><span class="duo__n">3<small>yrs</small></span><span class="duo__l">Professional design experience</span></a>
        </div>
      </div>

      <div class="hero__right">
        <div class="hero__top" data-rise>
          <p class="hero__date"><span data-day>${esc(site.location.split(',')[0])}</span><span><time data-clock>--:--</time> · <span data-date>South Africa</span></span></p>
          ${btn('#contact', 'Contact me')}
        </div>
        <p class="pill" data-rise><i>${glyphs.check}</i>Design system adopted</p>
        <p class="hero__base" data-rise>Based in<span class="dot">${esc(site.location.split(',')[0])}</span></p>
        <a class="now" href="${caseUrl(ctx, 'managem')}" data-rise>
          <span class="now__k">Featured case study</span>
          <span class="now__row"><b>ManaGEM</b><em>${year}</em></span>
          <span class="now__art" aria-hidden="true"><span>ERP</span><i>${ic.out}</i><u></u></span>
        </a>
      </div>
    </div>
    <div class="strip"><span>Since <b>${y0}</b></span><a href="#statement">Scroll down <i aria-hidden="true">↓</i></a><span>${esc(site.location)}</span></div>
  </section>`;

const statement = (ctx) => `
  <section class="say" id="statement" aria-label="Approach" data-scroll>
    <div class="wrap">
      <p class="say__t" data-words>Decide what is worth designing before designing it. Structure the product so the next step is obvious. Build the parts once, and carry the design into development.</p>
      <p class="say__s">Enterprise platforms, digital products and <br>intelligent user experiences. <span>Designed in Johannesburg.</span></p>
      <div class="bento" data-scroll>
        <div class="bento__lead">
          <h2 class="bento__t">Three years. Ten projects. One adopted design system.<span class="glass glass--a" aria-hidden="true">${glyphs.star}</span><span class="glass glass--b" aria-hidden="true">${glyphs.mark}</span></h2>
          <p>Product design across web, mobile and enterprise SaaS, from business requirements to development handoff.</p>
        </div>
        <ul class="bento__cards" role="list">
          <li><a class="bcard bcard--light" href="#work"><span class="bcard__dots" aria-hidden="true">${TOOLS6.map((t) => `<i>${esc(t.slice(0, 2))}</i>`).join('')}</span><span class="bcard__n">10+</span><span class="bcard__l">Digital<br>projects</span></a></li>
          <li><a class="bcard" href="${url(ctx, 'work/managem/design-system/')}"><span class="bcard__n">01</span><span class="bcard__k">Design system</span><span class="bcard__seal" aria-hidden="true">Formally<br>adopted<br>GEMIS</span><span class="bcard__p">A design system created for ManaGEM and formally adopted by GEMIS.</span></a></li>
          <li><a class="bcard bcard--mid" href="#approach"><span class="bcard__n">3</span><span class="bcard__k">Product disciplines</span><span class="bcard__p">Web · Mobile · Enterprise SaaS</span></a></li>
        </ul>
      </div>
    </div>
  </section>`;

// Screens each card plays through: [image key, short label].
const SCREENS = {
  managem: [['mg-dashboard', 'Dashboard'], ['mg-open-enquiries', 'Enquiries'], ['mg-invoices', 'Invoices'], ['mg-stock', 'Stock'], ['to-06-validation', 'Take-On']],
  wastemart: [['06-jobs', 'Jobs'], ['07-job-detail', 'Job'], ['09-capture-top', 'Evidence'], ['12-signoff', 'Sign-off'], ['19-endday-review', 'End of day']],
  gemis: [['live-home', 'Home'], ['live-solutions', 'Solutions'], ['live-work', 'Case studies'], ['live-story', 'Our story'], ['live-contact', 'Contact']],
};
const glyph = { pause: '<svg viewBox="0 0 20 20" aria-hidden="true" class="g-pause"><path d="M7 5v10M13 5v10"/></svg>', play: '<svg viewBox="0 0 20 20" aria-hidden="true" class="g-play"><path d="M7 4.5v11l9-5.500z"/></svg>' };

const player = (ctx, p) => {
  const shots = SCREENS[p.slug];
  return `<div class="pj__media" data-player>
      <div class="pj__stage">${shots.map(([k, l], i) => `<figure class="pj__slide${i === 0 ? ' is-on' : ''}" data-slide>${img(ctx, `${p.slug}/${k}`, `${p.name}: ${l}`, { sizes: p.slug !== 'wastemart' ? '(min-width: 1100px) 760px, 130vw' : '220px' })}</figure>`).join('')}</div>
      <button class="pj__next" type="button" data-next aria-label="Next ${p.name} screen"></button>
      <div class="pj__bars" role="group" aria-label="${p.name} screens">${shots.map(([, l], i) => `<button type="button" data-bar aria-label="${l}" aria-pressed="${i === 0}"><i></i></button>`).join('')}</div>
      <p class="pj__cap"><span data-cap>${shots[0][1]}</span><span data-count>1 / ${shots.length}</span></p>
      <button class="pj__toggle" type="button" data-toggle aria-label="Pause" hidden>${glyph.pause}${glyph.play}</button>
    </div>`;
};

const work = (ctx) => `
  <section class="sec work" id="work" aria-labelledby="work-h" data-sec>
    <div class="wrap">
      <header class="head">
        <p class="dot">(Selected work)</p>
        <h2 id="work-h" class="title title--md" data-rise>${lines('Three products,', '<i>designed end to end.</i>')}</h2>
      </header>
      <div class="stack">
        ${PROJECTS.map((p, i) => { const [pl, ph] = PROTO[p.slug]; const ext = /^https?:/.test(ph); return `
        <article class="pj pj--${p.slug}${i % 2 ? '' : ' pj--light'}" style="--i:${i}" aria-labelledby="p-${p.slug}">
          <div class="pj__text">
            <p class="pj__k">${p.type}</p>
            <p class="pj__row"><span id="p-${p.slug}" role="heading" aria-level="3" class="pj__name">${p.name}</span><em>${pad(i + 1)}</em></p>
            <p class="pj__desc">${p.text}</p>
            <p class="pj__role"><span>Role</span>${p.role}</p>
            <p class="pj__acts">
              ${btn(caseUrl(ctx, p.slug), `View case study<span class="sr"> for ${p.name}</span>`, { tone: i % 2 ? 'paper' : 'ink', attrs: `data-case="${p.slug}"` })}
              ${btn(ext ? ph : url(ctx, ph), `${pl}<span class="sr"> for ${p.name} (opens in a new tab)</span>`, { tone: 'line', attrs: 'target="_blank" rel="noopener"' })}
            </p>
          </div>
          ${player(ctx, p)}
        </article>`; }).join('')}
      </div>
    </div>
  </section>`;

const approach = (ctx) => `
  <section class="sec caps" id="approach" aria-labelledby="approach-h" data-sec>
    <div class="wrap">
      <div class="box caps__in">
        <header class="caps__head">
          <p class="dot">(Capabilities)</p>
          <h2 id="approach-h" class="title title--md" data-rise>${lines('Five things', '<i>I bring.</i>')}</h2>
        </header>
        <div class="acc">
          ${CAPABILITIES.map((c, i) => `
          <details class="acc__item" name="cap"${i === 0 ? ' open' : ''}>
            <summary><span class="acc__n">${pad(i + 1)}</span><span class="acc__name">${c.name}</span><span class="acc__ic" aria-hidden="true"></span></summary>
            <div class="acc__body">
              <p class="acc__line">${c.line}</p>
              <ul class="acc__items" role="list">${c.items.map((it) => `<li>${it}</li>`).join('')}</ul>
              <p class="acc__shown"><span>Shown in</span>${c.shown.map((sl) => chip(ctx, sl)).join('')}</p>
            </div>
          </details>`).join('')}
        </div>
      </div>
    </div>
  </section>`;

const process = (ctx) => `
  <section class="rail" id="process" aria-labelledby="process-h" data-sec data-rail>
    <div class="rail__pin">
      <div class="wrap rail__head">
        <div>
          <p class="dot">(Process)</p>
          <h2 id="process-h" class="title title--md">Six steps, <i>each feeding the next.</i></h2>
        </div>
        <p class="rail__count" aria-hidden="true"><b data-rail-n>01</b><span>/ ${pad(STEPS.length)}</span></p>
      </div>
      <ol class="rail__track" role="list" data-rail-track>
        ${STEPS.map((st, i) => `
        <li class="stepc">
          <p class="stepc__top"><span>${pad(i + 1)}</span><em>Step</em></p>
          <h3>${st.full}</h3>
          <p class="stepc__p">${st.purpose}</p>
          <ul class="stepc__out" role="list" aria-label="Deliverables">${st.out.map((o) => `<li>${o}</li>`).join('')}</ul>
          <ul class="stepc__ev" role="list" aria-label="In the work">${st.ev.map(([slug, t]) => `<li>${chip(ctx, slug)}${t ? `<span>${t}</span>` : ''}</li>`).join('')}</ul>
        </li>`).join('')}
      </ol>
      <div class="wrap"><div class="rail__bar" aria-hidden="true"><i data-rail-bar></i></div></div>
    </div>
  </section>`;

const profile = (ctx) => `
  <section class="about" id="experience" aria-labelledby="experience-h" data-sec>
    <div class="about__panel">
      <header class="about__head">
        <div>
          <p class="dot">(Experience)</p>
          <h2 id="experience-h" class="title title--md" data-rise>${lines('About three years', '<i>across design roles.</i>')}</h2>
        </div>
        ${btn(url(ctx, 'about/'), 'Full profile')}
      </header>
      <ol class="roles" role="list">
        ${span.map((e, i) => `<li data-rise style="--i:${i}"><span class="roles__d">${esc(e.dates)}</span><span class="roles__r">${esc(e.role)}</span><span class="roles__o">${esc(e.org)}${e.current ? '<i>Current</i>' : ''}</span></li>`).join('')}
        <li data-rise style="--i:${span.length}"><span class="roles__d">Education</span><span class="roles__r">${esc(education.qualification)}</span><span class="roles__o">${esc(education.school)}</span></li>
      </ol>
      <div class="about__cols">
        <div data-rise><p class="dot">(Experience includes)</p><ul class="tags" role="list">${AREAS.map((a) => `<li>${a}</li>`).join('')}</ul></div>
        <div data-rise><p class="dot">(Tools)</p><dl class="toolset">${Object.entries(tools).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v.map(esc).join(' · ')}</dd></div>`).join('')}</dl></div>
      </div>
    </div>
  </section>`;

const contact = (ctx) => `
  <section class="sec talk" id="contact" aria-labelledby="contact-h" data-sec>
    <div class="wrap">
      <p class="dot talk__k">(Contact)</p>
      <h2 id="contact-h" class="say__t talk__t" data-rise>Have a complex product challenge? <span>Let’s turn complexity into a clearer, more useful digital experience.</span></h2>
      <p class="talk__cta" data-rise>${btn(`mailto:${site.email}`, 'Start a conversation', { tone: 'paper' })}</p>
      <ul class="talk__rows box" role="list">
        <li><span>Email</span><a href="mailto:${site.email}">${site.email}</a><button class="btn btn--line" type="button" data-copy="${site.email}"><span data-copy-label>Copy</span></button></li>
        <li><span>LinkedIn</span><a href="${site.linkedin}" target="_blank" rel="noopener">Sphamandla Xaba<span class="sr"> (opens in a new tab)</span></a>${btn(site.linkedin, 'Open', { tone: 'line', attrs: 'target="_blank" rel="noopener" aria-label="Open LinkedIn in a new tab"' })}</li>
        <li><span>CV</span><a href="${url(ctx, site.cv)}" download>Curriculum vitae (PDF)</a>${btn(url(ctx, site.cv), 'Download', { tone: 'line', icon: ic.down, attrs: 'download aria-label="Download CV as PDF"' })}</li>
      </ul>
    </div>
  </section>`;

const footer = (ctx) => `
  <footer class="foot">
    <div class="wrap foot__in">
      <p class="foot__name">${esc(site.name)}<span>Product Designer</span></p>
      <nav aria-label="Case studies"><p class="dot">(Work)</p><ul role="list">${PROJECTS.map((p) => `<li><a href="${caseUrl(ctx, p.slug)}">${p.name}</a></li>`).join('')}</ul></nav>
      <nav aria-label="More"><p class="dot">(More)</p><ul role="list"><li><a href="${url(ctx, 'about/')}">About</a></li><li><a href="${site.linkedin}" target="_blank" rel="noopener">LinkedIn<span class="sr"> (opens in a new tab)</span></a></li><li><a href="${url(ctx, site.cv)}" download>CV (PDF)</a></li></ul></nav>
    </div>
    <div class="strip strip--foot"><span>© ${year} ${esc(site.name)}</span><a href="#top">Back to top <i aria-hidden="true">↑</i></a><span>${esc(site.location)}</span></div>
  </footer>`;

// -------------------------------------------------------------- document

const title = 'Sphamandla Xaba — Product Designer | Enterprise platforms and digital products';
const description = 'Portfolio of Sphamandla Xaba, a Product Designer in Johannesburg focused on enterprise platforms, digital products and intelligent user experiences. Case studies: ManaGEM, WasteMart and GEMIS.';

export default {
  path: 'index.html',
  page: 'Home',
  navKey: 'home',
  render: () => '',
  document(ctx) {
    const canonical = site.origin + site.basePath;
    const ld = { '@context': 'https://schema.org', '@type': 'Person', name: site.name, jobTitle: 'Product Designer', url: canonical, email: `mailto:${site.email}`, sameAs: [site.linkedin], address: { '@type': 'PostalAddress', addressLocality: 'Johannesburg', addressCountry: 'ZA' } };
    return `<!doctype html>
<html lang="en-ZA" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${canonical}assets/images/og-default.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="color-scheme" content="dark">
<meta name="theme-color" content="#0a0a0a">
<link rel="icon" href="${url(ctx, 'assets/favicon.svg')}" type="image/svg+xml">
<link rel="preload" href="${url(ctx, 'assets/fonts/inter-latin-wght-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${url(ctx, 'assets/css/home.css')}">
<script>document.documentElement.classList.add('js')</script>
<script src="${url(ctx, 'assets/js/home.js')}" defer></script>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body id="top">
<a class="skip" href="#main">Skip to content</a>
${topnav(ctx)}
<main id="main" tabindex="-1">
${overview(ctx)}
${statement(ctx)}
${work(ctx)}
${approach(ctx)}
${process(ctx)}
${profile(ctx)}
${contact(ctx)}
</main>
${footer(ctx)}
</body>
</html>
`;
  },
};
