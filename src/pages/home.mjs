// Homepage — the portfolio as a dashboard.
// Design language studied from the dashboard references in the repository
// root: an app shell (sidebar, search bar), a welcome banner with a glow, a
// bento grid of rounded cards, pill controls, stat tiles, a table, a
// stepper track and a timeline. Styles: src/home/home.css. Script:
// assets/js/home.js.
//
// A dashboard invites numbers. Every number here is a literal count of
// something on this page, statuses come from src/content/projects.mjs, and
// the timeline is drawn from the dates in src/content/experience.mjs.

import { esc, url, img, site } from '../shared.mjs';
import { projects } from '../content/projects.mjs';
import { experience, education, tools } from '../content/experience.mjs';

const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
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

// stage: how far along each project is (0 design, 1 development, 2 live),
// read from the status in src/content/projects.mjs.
const STAGES = ['Design', 'Development', 'Live'];
const PROJECTS = [
  { slug: 'managem', name: 'ManaGEM', type: 'Enterprise resource planning', role: 'UX/UI and product design', stage: 1, text: 'An established ERP, redesigned so complex workflows are clear and consistent. Includes the Take-On onboarding experience and the landing page.' },
  { slug: 'wastemart', name: 'WasteMart', type: 'Mobile application', role: 'Product design', stage: 1, text: 'A driver’s working day in one app: jobs, evidence, sign-off and end of day.' },
  { slug: 'gemis', name: 'GEMIS', type: 'Corporate website', role: 'Led the redesign', stage: 2, text: 'The GEMIS corporate website, redesigned with a development team.' },
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

const pname = (slug) => PROJECTS.find((p) => p.slug === slug).name;
const chip = (ctx, slug) => `<a class="chip chip--${slug}" href="${caseUrl(ctx, slug)}"><i aria-hidden="true"></i>${pname(slug)}${ic.arrow}</a>`;
const head = (id, title, meta = '') => `<header class="sec__head"><h2 id="${id}-h">${title}</h2>${meta ? `<p>${meta}</p>` : ''}</header>`;
const stageTrack = (p) => `<span class="stage" role="img" aria-label="Stage: ${STAGES[p.stage]}">${STAGES.map((s, i) => `<i class="${i < p.stage || p.stage === STAGES.length - 1 ? 'is-done' : i === p.stage ? 'is-now' : ''}"></i>`).join('')}</span>`;

const visual = (ctx, p) => {
  if (p.slug === 'managem') return `<div class="shot shot--screen">${img(ctx, 'managem/mg-dashboard', 'The redesigned ManaGEM dashboard', { sizes: '(min-width: 1100px) 640px, 92vw' })}</div>`;
  if (p.slug === 'wastemart') return `<div class="shot shot--phones">${['07-job-detail', '06-jobs', '12-signoff'].map((k, i) => `<span>${img(ctx, `wastemart/${k}`, ['WasteMart job detail', 'WasteMart job list', 'WasteMart customer sign-off'][i], { sizes: '200px' })}</span>`).join('')}</div>`;
  return `<div class="shot shot--none" role="img" aria-label="No capture of the GEMIS website has been added to this portfolio yet"><span>GEMIS</span><small>Website capture not added yet</small></div>`;
};

const sidebar = (ctx) => `
  <aside class="side" aria-label="Portfolio">
    <a class="brand" href="#overview">${mark}<span><b>${esc(site.name)}</b><small>Product Designer</small></span></a>
    <nav class="side__nav" aria-label="Sections">
      <p class="side__k">Portfolio</p>
      <ul role="list">${NAV.map(([id, l, i]) => `<li><a href="#${id}" data-nav="${id}">${i}<span>${l}</span></a></li>`).join('')}</ul>
      <p class="side__k">Case studies</p>
      <ul role="list">${PROJECTS.map((p) => `<li><a href="${caseUrl(ctx, p.slug)}"><i class="dot dot--${p.slug}" aria-hidden="true"></i><span>${p.name}</span></a></li>`).join('')}</ul>
    </nav>
    <div class="side__foot">
      <a class="btn btn--light" href="${url(ctx, site.cv)}" download>${ic.down}<span>Download CV</span></a>
      <a class="side__link" href="${site.linkedin}" target="_blank" rel="noopener"><span>LinkedIn</span>${ic.out}</a>
    </div>
  </aside>`;

const topbar = (ctx) => `
  <header class="bar">
    <a class="bar__brand" href="#overview" aria-label="${esc(site.name)} — overview">${mark}</a>
    <div class="find" data-find>
      ${ic.search}
      <input type="text" role="combobox" aria-label="Search this portfolio" aria-expanded="false" aria-controls="find-list" aria-autocomplete="list" placeholder="Search projects, sections, contact…" autocomplete="off" spellcheck="false" data-find-input>
      <kbd aria-hidden="true">/</kbd>
      <ul class="find__list" id="find-list" role="listbox" hidden>
        ${[
          ...PROJECTS.map((p) => [`${p.name} case study`, caseUrl(ctx, p.slug), p.type]),
          ...NAV.map(([id, l]) => [l, `#${id}`, 'Section']),
          ['Download CV', url(ctx, site.cv), 'PDF'],
          ['About', url(ctx, 'about/'), 'Page'],
          ['Email', `mailto:${site.email}`, site.email],
        ].map(([t, href, k], i) => `<li role="option" id="find-${i}"><a href="${href}" tabindex="-1"><span>${t}</span><small>${esc(k)}</small></a></li>`).join('')}
      </ul>
    </div>
    <p class="bar__time" title="Local time in Johannesburg"><i aria-hidden="true"></i><span>Johannesburg</span><time data-clock>--:--</time></p>
    <a class="btn btn--ghost bar__cv" href="${url(ctx, site.cv)}" download>${ic.down}<span>CV</span></a>
  </header>`;

const overview = (ctx) => `
  <section class="sec" id="overview" aria-labelledby="hero-h" data-sec>
    <div class="banner card">
      <div class="banner__copy">
        <p class="eyebrow"><i aria-hidden="true"></i>Product Designer · ${esc(site.location)}</p>
        <h1 id="hero-h"><span>Designing complex systems.</span> <span>Making them feel simple.</span></h1>
        <p class="banner__lede">I’m Sphamandla Xaba. I design enterprise platforms, digital products and intelligent user experiences.</p>
        <p class="banner__cta">
          <a class="btn btn--accent" href="#work"><span>Explore selected work</span>${ic.arrow}</a>
          <a class="btn btn--ghost" href="${url(ctx, site.cv)}" download><span>View curriculum vitae</span>${ic.down}</a>
        </p>
      </div>
    </div>
    <ul class="stats" role="list">
      ${[
        [PROJECTS.length, 'Case studies', 'Web, mobile and enterprise', 'work'],
        [CAPABILITIES.length, 'Capability domains', `${CAPABILITIES.reduce((n, c) => n + c.items.length, 0)} practices`, 'approach'],
        [STEPS.length, 'Process steps', 'Requirement to handoff', 'process'],
        [experience.length, 'Design roles', `Since ${y0}`, 'experience'],
      ].map(([n, l, s, id]) => `<li><a class="stat card" href="#${id}"><span class="stat__l">${l}</span><span class="stat__n">${pad(n)}</span><span class="stat__s">${s}</span><span class="stat__dots" aria-hidden="true">${'<i></i>'.repeat(n)}</span><span class="stat__go">${ic.arrow}</span></a></li>`).join('')}
    </ul>
  </section>`;

const work = (ctx) => `
  <section class="sec" id="work" aria-labelledby="work-h" data-sec>
    ${head('work', 'Projects', `${PROJECTS.length} case studies`)}
    <div class="grid">
      <div class="card list" data-pick>
        <div class="card__head"><h3>Selected work</h3><p class="legend">${STAGES.map((s) => `<span>${s}</span>`).join('<b aria-hidden="true">→</b>')}</p></div>
        <ul class="rows" role="list">
          ${PROJECTS.map((p, i) => `
          <li>
            <button class="rowbtn" type="button" data-pick-btn="${p.slug}" aria-pressed="${i === 0}" aria-controls="preview">
              <i class="dot dot--${p.slug}" aria-hidden="true"></i>
              <span class="rowbtn__main"><b>${p.name}</b><small>${p.type}</small></span>
              <span class="rowbtn__meta"><span class="pill pill--${bySlug[p.slug].status.kind}">${esc(bySlug[p.slug].status.label)}</span>${stageTrack(p)}</span>
            </button>
          </li>`).join('')}
        </ul>
        <p class="card__foot">Select a project to preview it.</p>
      </div>
      <div class="card preview" id="preview" aria-live="polite">
        ${PROJECTS.map((p, i) => `
        <article class="preview__pane preview__pane--${p.slug}" data-pick-pane="${p.slug}"${i ? ' hidden' : ''}>
          <div class="preview__text">
            <p class="eyebrow"><i class="dot dot--${p.slug}" aria-hidden="true"></i>${p.type}</p>
            <h3>${p.name}</h3>
            <p class="preview__line">${p.text}</p>
            <dl class="facts"><div><dt>Involvement</dt><dd>${p.role}</dd></div><div><dt>Platform</dt><dd>${esc(bySlug[p.slug].platform)}</dd></div></dl>
            <a class="btn btn--accent" href="${caseUrl(ctx, p.slug)}" data-case="${p.slug}"><span>Open case study</span>${ic.arrow}</a>
          </div>
          ${visual(ctx, p)}
        </article>`).join('')}
      </div>
    </div>
  </section>`;

const approach = (ctx) => `
  <section class="sec" id="approach" aria-labelledby="approach-h" data-sec>
    ${head('approach', 'Capabilities', `${CAPABILITIES.length} domains`)}
    <div class="card caps" data-pick>
      <div class="tabs" role="group" aria-label="Capability domains" data-strip>
        ${CAPABILITIES.map((c, i) => `<button class="tab" type="button" data-pick-btn="${c.key}" aria-pressed="${i === 0}" aria-controls="cap-view">${c.name}</button>`).join('')}
      </div>
      <div class="caps__view" id="cap-view" aria-live="polite">
        ${CAPABILITIES.map((c, i) => `
        <div class="caps__pane" data-pick-pane="${c.key}"${i ? ' hidden' : ''}>
          <div class="caps__lead"><p class="eyebrow">${pad(i + 1)} / ${pad(CAPABILITIES.length)}</p><p class="caps__line">${c.line}</p><div class="caps__shown"><span>Shown in</span>${c.shown.map((s) => chip(ctx, s)).join('')}</div></div>
          <ol class="caps__items" role="list">${c.items.map((it, j) => `<li style="--j:${j}"><span>${pad(j + 1)}</span>${it}</li>`).join('')}</ol>
        </div>`).join('')}
      </div>
    </div>
  </section>`;

const process = (ctx) => `
  <section class="sec" id="process" aria-labelledby="process-h" data-sec>
    ${head('process', 'Process', `${STEPS.length} steps, each feeding the next`)}
    <div class="card flowcard" data-pick>
      <ol class="track" role="list" aria-label="Process steps" data-strip>
        ${STEPS.map((s, i) => `<li><button class="track__btn" type="button" data-pick-btn="${i}" aria-pressed="${i === 0}" aria-controls="step-view"><span>${pad(i + 1)}</span>${s.name}</button></li>`).join('')}
      </ol>
      <div id="step-view" aria-live="polite">
        ${STEPS.map((s, i) => `
        <div class="step" data-pick-pane="${i}"${i ? ' hidden' : ''}>
          <div class="step__lead"><p class="eyebrow">Step ${i + 1} of ${STEPS.length}</p><h3>${s.full}</h3><p>${s.purpose}</p></div>
          <div class="step__col"><p class="label">Deliverables</p><ul role="list">${s.out.map((o) => `<li>${o}</li>`).join('')}</ul></div>
          <div class="step__col"><p class="label">In the work</p><ul class="step__ev" role="list">${s.ev.map(([slug, t]) => `<li>${chip(ctx, slug)}${t ? `<p>${t}</p>` : ''}</li>`).join('')}</ul></div>
          <p class="step__nav">${i > 0 ? `<button class="btn btn--ghost btn--sm" type="button" data-pick-go="${i - 1}"><span aria-hidden="true">←</span> ${STEPS[i - 1].name}</button>` : '<span></span>'}${i < STEPS.length - 1 ? `<button class="btn btn--ghost btn--sm" type="button" data-pick-go="${i + 1}">Next: ${STEPS[i + 1].name} <span aria-hidden="true">→</span></button>` : ''}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`;

const profile = (ctx) => `
  <section class="sec" id="experience" aria-labelledby="experience-h" data-sec>
    ${head('experience', 'Experience', `${experience.length} roles · ${esc(site.location)}`)}
    <div class="grid grid--exp">
      <div class="card me">
        <div class="me__photo">${img(ctx, 'about/portrait-spha', 'Sphamandla Xaba', { sizes: '(min-width: 1100px) 300px, 60vw' })}</div>
        <h3>${esc(site.name)}</h3>
        <p class="me__role">Product Designer / UI/UX Designer</p>
        <dl class="facts facts--stack"><div><dt>Experience</dt><dd>About three years across design and multidisciplinary roles</dd></div><div><dt>Education</dt><dd>${esc(education.qualification)}, ${esc(education.school)}</dd></div></dl>
        <a class="btn btn--ghost btn--sm" href="${url(ctx, 'about/')}"><span>Full profile</span>${ic.arrow}</a>
      </div>
      <div class="card gantt">
        <div class="card__head"><h3>Roles</h3><p class="legend">By year</p></div>
        <div class="gantt__chart" style="--n:${YEARS.length}">
          <ol class="gantt__axis" role="list" aria-hidden="true">${YEARS.map((y) => `<li>${y}</li>`).join('')}</ol>
          <ul class="gantt__rows" role="list">
            ${span.map((e) => `<li class="gantt__bar${e.current ? ' is-now' : ''}" style="--a:${e.from - y0 + 1};--b:${e.to - y0 + 2}"><b>${esc(e.role)}</b><span>${esc(e.org)} · ${esc(e.dates)}</span></li>`).join('')}
          </ul>
        </div>
        <ul class="gantt__work" role="list">${span.filter((e) => e.work.length).flatMap((e) => e.work).map((w) => `<li><a class="chip" href="${url(ctx, w.href)}">${esc(w.label)}${ic.arrow}</a></li>`).join('')}</ul>
      </div>
      <div class="card"><div class="card__head"><h3>Experience includes</h3></div><ul class="tags" role="list">${AREAS.map((a) => `<li>${a}</li>`).join('')}</ul></div>
      <div class="card"><div class="card__head"><h3>Tools</h3></div><dl class="toolset">${Object.entries(tools).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v.map(esc).join(' · ')}</dd></div>`).join('')}</dl></div>
    </div>
  </section>`;

const contact = (ctx) => `
  <section class="sec" id="contact" aria-labelledby="contact-h" data-sec>
    <div class="card cta">
      <div>
        <h2 id="contact-h">Have a complex product challenge?</h2>
        <p>Let’s turn complexity into a clearer, more useful digital experience.</p>
      </div>
      <ul class="cta__rows" role="list">
        <li><span>Email</span><a href="mailto:${site.email}">${site.email}</a><button class="btn btn--ghost btn--sm" type="button" data-copy="${site.email}"><span data-copy-label>Copy</span></button></li>
        <li><span>LinkedIn</span><a href="${site.linkedin}" target="_blank" rel="noopener">Sphamandla Xaba</a><a class="btn btn--ghost btn--sm" href="${site.linkedin}" target="_blank" rel="noopener" aria-label="Open LinkedIn in a new tab">Open ${ic.out}</a></li>
        <li><span>CV</span><a href="${url(ctx, site.cv)}" download>Curriculum vitae (PDF)</a><a class="btn btn--ghost btn--sm" href="${url(ctx, site.cv)}" download aria-label="Download CV as PDF">Download ${ic.down}</a></li>
      </ul>
      <a class="btn btn--accent btn--lg" href="mailto:${site.email}"><span>Start a conversation</span>${ic.arrow}</a>
    </div>
    <p class="foot">© ${year} ${esc(site.name)} <a href="#overview">Back to top ↑</a></p>
  </section>`;

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
<meta name="theme-color" content="#08090B">
<link rel="icon" href="${url(ctx, 'assets/favicon.svg')}" type="image/svg+xml">
<link rel="preload" href="${url(ctx, 'assets/fonts/outfit-latin-wght-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${url(ctx, 'assets/css/home.css')}">
<script>document.documentElement.classList.add('js')</script>
<script src="${url(ctx, 'assets/js/home.js')}" defer></script>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body id="top">
<a class="skip" href="#main">Skip to content</a>
<div class="app">
${sidebar(ctx)}
<div class="shell">
${topbar(ctx)}
<main id="main" tabindex="-1">
${overview(ctx)}
${work(ctx)}
${approach(ctx)}
${process(ctx)}
${profile(ctx)}
${contact(ctx)}
</main>
</div>
</div>
<nav class="dock" aria-label="Sections (compact)"><ul role="list">${NAV.map(([id, l, i]) => `<li><a href="#${id}" data-nav="${id}">${i}<span>${l}</span></a></li>`).join('')}</ul></nav>
</body>
</html>
`;
  },
};
