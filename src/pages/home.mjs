// Homepage — "SX / INTELLIGENCE".
// A portfolio presented as a design-intelligence console. It has its own
// document shell, stylesheet (src/home/home.css → assets/css/home.css) and
// script (assets/js/home.js); the case-study pages are untouched.
//
// Every fact here comes from src/site.mjs, src/content/projects.mjs,
// src/content/experience.mjs or the brief for this page. Nothing is scored,
// counted or measured that is not a literal count of items on the page.

import { esc, url, img, site } from '../shared.mjs';
import { projects } from '../content/projects.mjs';
import { experience, education, learning, tools } from '../content/experience.mjs';

const byslug = Object.fromEntries(projects.map((p) => [p.slug, p]));
const caseUrl = (ctx, slug) => url(ctx, `work/${slug}/`);
const pad = (n) => String(n).padStart(2, '0');

const ic = {
  arrow: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  out: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  down: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  check: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
};
const mark = `<svg class="sx-mark" viewBox="0 0 48 48" aria-hidden="true"><path class="sx-mark__frame" d="M4 14V4h10M34 4h10v10M44 34v10H34M14 44H4V34" fill="none" stroke="currentColor" stroke-width="2"/><path class="sx-mark__s" d="M22 15h-6a3.5 3.5 0 0 0 0 7h3a3.5 3.5 0 0 1 0 7h-7" fill="none" stroke="currentColor" stroke-width="2.6"/><path class="sx-mark__x" d="m27 15 11 14M38 15 27 29" fill="none" stroke="currentColor" stroke-width="2.6"/><path class="sx-mark__u" d="M12 35h26" fill="none" stroke="var(--red)" stroke-width="2.6"/></svg>`;

// ------------------------------------------------------------------ data

const NAV = [
  ['overview', 'Overview'],
  ['work', 'Projects'],
  ['approach', 'Capabilities'],
  ['experience', 'Experience'],
  ['contact', 'Contact'],
];
const RAIL = [
  ['overview', 'Command centre'],
  ['approach', 'Design intelligence'],
  ['work', 'Project intelligence'],
  ['architecture', 'System architecture'],
  ['experience', 'Professional profile'],
  ['contact', 'Contact terminal'],
];

const DIMENSIONS = [
  { key: 'strategy', cap: 'thinking', name: 'Strategy', text: 'Framing the right problem before designing a solution: what the business needs, what users need, and where the two meet.', caps: ['Product discovery', 'Problem framing', 'Product requirements'], x: 14, y: 14 },
  { key: 'experience', cap: 'ux', name: 'Experience', text: 'Journeys, flows and information structures that people can follow without being taught.', caps: ['User journeys', 'Information architecture', 'Workflow design'], x: 86, y: 14 },
  { key: 'systems', cap: 'interface', name: 'Systems', text: 'Reusable foundations — tokens, components and patterns — that keep a product consistent as it grows.', caps: ['Design systems', 'Component libraries', 'Responsive interfaces'], x: 86, y: 86 },
  { key: 'products', cap: 'delivery', name: 'Products', text: 'Interfaces taken from prototype through review to development handoff.', caps: ['Interactive prototypes', 'Developer collaboration', 'Interface validation'], x: 14, y: 86 },
];

const CAPABILITIES = [
  {
    key: 'thinking', name: 'Product thinking', line: 'Decide what is worth designing before designing it.',
    items: ['Product discovery', 'Problem framing', 'User-centred decision making', 'Product requirements'],
    evidence: [['managem', 'Discovery with existing clients framed the redesign around one tension: familiarity for current clients, clarity for new ones.'], ['wastemart', 'The driver’s working day defined the product: jobs, evidence, sign-off and end of day.']],
  },
  {
    key: 'ux', name: 'UX architecture', line: 'Structure the product so the next step is obvious.',
    items: ['User journeys', 'Information architecture', 'Workflow design', 'Interaction architecture'],
    evidence: [['managem', 'Navigation restructured from expanding menus into labelled groups.'], ['wastemart', 'An operational workflow designed for use in the field.'], ['gemis', 'Information architecture for the redesigned corporate website.']],
  },
  {
    key: 'interface', name: 'Interface systems', line: 'Build the parts once, then build everything from them.',
    items: ['Design systems', 'Component libraries', 'Responsive interfaces', 'Enterprise dashboards'],
    evidence: [['managem', 'I created the design system; GEMIS formally adopted it.'], ['wastemart', 'A mobile-first interface.'], ['gemis', 'A responsive website.']],
  },
  {
    key: 'delivery', name: 'Product delivery', line: 'Carry the design through review and into development.',
    items: ['Interactive prototypes', 'Developer collaboration', 'Design documentation', 'Interface validation'],
    evidence: [['managem', 'The system and prototype underwent functional review.'], ['wastemart', 'Design complete; development is underway.'], ['gemis', 'Built in collaboration with a development team.']],
  },
  {
    key: 'ai', name: 'AI-assisted design', line: 'Use AI where it speeds up exploration, and design for it where it serves the product.',
    items: ['AI-supported workflows', 'Intelligent product experiences', 'Rapid prototyping', 'AI-assisted design exploration'],
    evidence: [['managem', 'Take-On: an AI-assisted onboarding experience I designed for ManaGEM.']],
  },
];

const PROJECTS = [
  {
    slug: 'managem', name: 'ManaGEM', type: 'Enterprise resource planning system', tone: 'sky',
    text: 'Redesigning an established ERP platform to make complex business workflows clearer, more consistent and easier to navigate.',
    role: 'UX/UI and product design',
    showcase: ['Enterprise UX', 'Complex workflows', 'Information architecture', 'Design system application', 'Product interface design'],
    context: ['ManaGEM is a GEMIS product.', 'I contributed significantly to its UX/UI and product design.', 'I designed the Take-On experience and the landing page.', 'GEMIS formally adopted the design system I created.', 'The system and prototype underwent functional review.'],
  },
  {
    slug: 'wastemart', name: 'WasteMart', type: 'Mobile application', tone: 'teal',
    text: 'A mobile workflow for waste-collection drivers: jobs, evidence, sign-off and end of day, built for the field.',
    role: 'Product design',
    showcase: ['Mobile product design', 'User journeys', 'Operational workflows', 'Interaction design', 'Mobile-first experiences'],
    context: ['The design is complete.', 'Development is underway.'],
  },
  {
    slug: 'gemis', name: 'GEMIS', type: 'Corporate digital experience', tone: 'silver',
    text: 'The redesign of the GEMIS corporate website, from structure to interface.',
    role: 'Led the redesign',
    showcase: ['Website redesign', 'Information architecture', 'Digital brand experience', 'UX/UI', 'Developer collaboration'],
    context: ['I led the GEMIS website redesign.', 'I collaborated with a development team.'],
  },
];

// Disciplines each case study demonstrates (m = ManaGEM, w = WasteMart, g = GEMIS).
const MATRIX = [
  ['Enterprise UX', 'm'],
  ['Workflow design', 'mw'],
  ['Information architecture', 'mg'],
  ['Design systems', 'm'],
  ['User journeys', 'w'],
  ['Mobile-first design', 'w'],
  ['Interaction design', 'w'],
  ['Digital brand experience', 'g'],
  ['Website redesign', 'g'],
  ['Developer collaboration', 'mg'],
];

const LAYERS = [
  { name: 'Business requirements', purpose: 'Establish what the product must achieve and the constraints it has to respect.', act: ['Stakeholder conversations', 'Scope and priority setting', 'Reviewing the existing product'], out: ['Project scope', 'Priorities', 'Constraints'], ev: [['managem', 'Scope, priorities and timeline were set with the GEMIS manager.']] },
  { name: 'User needs', purpose: 'Understand who uses the product, what they are trying to do and where it fails them.', act: ['Conversations with users', 'Reviewing complaints and feedback', 'Framing the problem'], out: ['Findings', 'Problem statement', 'Design principles'], ev: [['managem', 'Phone conversations with existing clients shaped the dashboard and navigation.']] },
  { name: 'Information architecture', purpose: 'Organise content and functions so people can predict where things are.', act: ['Grouping and labelling', 'Navigation models', 'Content hierarchy'], out: ['Sitemap', 'Navigation structure', 'Page hierarchy'], ev: [['managem', 'Expanding menus became labelled navigation groups.'], ['gemis', 'Structure for the redesigned corporate website.']] },
  { name: 'User flows', purpose: 'Map each task from start to finish, including what happens when something goes wrong.', act: ['Journey mapping', 'Workflow design', 'Edge cases and recovery'], out: ['User journeys', 'Task flows', 'Step sequences'], ev: [['wastemart', 'A driver’s day: jobs, evidence, sign-off, end of day.'], ['managem', 'Take-On: guided, step-by-step onboarding.']] },
  { name: 'Interface systems', purpose: 'Turn structure into a consistent, reusable interface.', act: ['Design tokens and components', 'Responsive layouts', 'States and feedback'], out: ['Design system', 'Component library', 'Screen designs'], ev: [['managem', 'A design system GEMIS formally adopted.']] },
  { name: 'Development handoff', purpose: 'Make sure what is built matches what was designed.', act: ['Interactive prototypes', 'Design documentation', 'Review with developers'], out: ['Prototype', 'Specifications', 'Review notes'], ev: [['managem', 'Prototype functionally reviewed.'], ['wastemart', 'Design complete; development underway.'], ['gemis', 'Built with a development team.']] },
];

const AREAS = ['Product design', 'UI/UX design', 'Graphic design', 'Product coordination', 'Product testing', 'Marketing and SEO', 'Developer collaboration'];

// ---------------------------------------------------------------- pieces

const tick = '<i class="tick tick--tl"></i><i class="tick tick--tr"></i><i class="tick tick--bl"></i><i class="tick tick--br"></i>';
const secHead = (n, label, title, meta, lede = '') => `
  <header class="sec__head" data-r>
    <p class="sec__index"><span class="sec__n">${n}</span><span>${label}</span><span class="sec__rule" aria-hidden="true"></span><span class="sec__meta">${meta}</span></p>
    <div class="sec__row">
      <h2 class="sec__title" id="${label.toLowerCase().replace(/[^a-z]+/g, '-')}-h" data-split>${title}</h2>
      ${lede ? `<p class="sec__lede">${lede}</p>` : ''}
    </div>
  </header>`;
const hid = (label) => `${label.toLowerCase().replace(/[^a-z]+/g, '-')}-h`;
const projLink = (ctx, slug) => `<a class="plink plink--${PROJECTS.find((p) => p.slug === slug).tone}" href="${caseUrl(ctx, slug)}"><span>${PROJECTS.find((p) => p.slug === slug).name}</span>${ic.arrow}</a>`;

const intro = () => `
  <div class="intro" data-intro aria-hidden="true">
    <div class="intro__grid"></div>
    <div class="intro__scan"></div>
    <div class="intro__core">
      ${mark}
      <p class="intro__name"><span>SX</span><span>/</span><span>INTELLIGENCE</span></p>
      <p class="intro__sub">Product design portfolio · Sphamandla Xaba</p>
      <div class="intro__bar"><span></span></div>
    </div>
    <button class="intro__skip" type="button" data-intro-skip tabindex="-1">Skip introduction</button>
  </div>`;

const topbar = (ctx) => `
  <header class="top" data-top>
    <a class="top__id" href="#overview" aria-label="SX / Intelligence — Sphamandla Xaba, back to overview">${mark}<span class="top__name">SX<i>/</i>INTELLIGENCE</span></a>
    <nav class="top__nav" aria-label="Primary">
      <ul role="list">${NAV.map(([id, l]) => `<li><a href="#${id}" data-nav="${id}">${l}</a></li>`).join('')}</ul>
    </nav>
    <div class="top__sys">
      <p class="sysline" title="Local time in Johannesburg"><span class="sysline__dot" aria-hidden="true"></span><span class="sysline__k">JHB</span><time data-clock>--:--</time><span class="sysline__k">SAST</span></p>
      <a class="top__btn" href="${site.linkedin}" rel="noopener" target="_blank"><span>LinkedIn</span>${ic.out}</a>
      <a class="top__btn top__btn--solid" href="${url(ctx, site.cv)}" download><span>CV</span>${ic.down}</a>
    </div>
  </header>
  <nav class="rail" aria-label="Sections" data-rail>
    <span class="rail__line" aria-hidden="true"><i data-rail-fill></i></span>
    <ol role="list">${RAIL.map(([id, l], i) => `<li><a href="#${id}" data-rail-link="${id}"><span class="rail__n">${pad(i + 1)}</span><span class="rail__l">${l}</span></a></li>`).join('')}</ol>
  </nav>
  <nav class="dock" aria-label="Sections (compact)">
    <ul role="list">${NAV.map(([id, l], i) => `<li><a href="#${id}" data-nav="${id}"><span class="dock__n">${pad(i + 1)}</span><span>${l}</span></a></li>`).join('')}</ul>
  </nav>`;

const hero = (ctx) => `
  <section class="hero" id="overview" aria-labelledby="hero-h" data-sec>
    <canvas class="hero__field" data-field aria-hidden="true"></canvas>
    <div class="hero__scan" aria-hidden="true"></div>
    <div class="hero__grid">
      <div class="hero__head">
        <p class="hero__tag" data-h><span class="hero__tagdot" aria-hidden="true"></span>Product Designer · ${esc(site.location)}</p>
        <h1 class="hero__title" id="hero-h"><span class="hero__line" data-h><span>Designing complex systems.</span></span> <span class="hero__line hero__line--2" data-h><span>Making them feel simple.</span></span></h1>
      </div>
      <div class="hero__copy">
        <p class="hero__lede" data-h>I’m Sphamandla Xaba, a Product Designer focused on enterprise platforms, digital products and intelligent user experiences.</p>
        <ul class="hero__desc" role="list" data-h>${['Product design', 'UX architecture', 'Enterprise systems', 'Digital experiences'].map((d, i) => `<li><span>${pad(i + 1)}</span>${d}</li>`).join('')}</ul>
        <div class="hero__cta" data-h>
          <a class="btn btn--red" href="#work"><span>Explore selected work</span>${ic.arrow}</a>
          <a class="btn btn--line" href="${url(ctx, site.cv)}" download><span>View curriculum vitae</span>${ic.down}</a>
        </div>
        <p class="hero__avail" data-h><span>Availability</span>For current availability, <a href="#contact">get in touch</a>.</p>
      </div>
      <div class="map" data-map data-h>
        ${tick}
        <p class="map__cap"><span>Design dimensions</span><span>4 nodes · select to inspect</span></p>
        <div class="map__body"><div class="map__stage">
          <div class="map__plane"><i class="map__ghost" aria-hidden="true"></i><i class="map__ghost map__ghost--2" aria-hidden="true"></i>
            <svg class="map__svg" viewBox="0 0 100 100" aria-hidden="true">
              <g class="map__rings"><circle cx="50" cy="50" r="12"/><circle cx="50" cy="50" r="24"/><circle cx="50" cy="50" r="36"/><circle cx="50" cy="50" r="48"/></g>
              <path class="map__axis" d="M50 0v100M0 50h100"/>
              ${DIMENSIONS.map((d, i) => {
                const n = DIMENSIONS[(i + 1) % 4];
                return `<path class="map__edge" data-edge="${d.key} ${n.key}" d="M${d.x} ${d.y} L${n.x} ${n.y}"/><path class="map__spoke" data-edge="${d.key}" d="M50 50 L${d.x} ${d.y}"/>`;
              }).join('')}
              ${DIMENSIONS.map((d) => `<g class="map__pad" data-pad="${d.key}"><rect x="${d.x - 5}" y="${d.y - 5}" width="10" height="10"/><rect class="map__pad2" x="${d.x - 8}" y="${d.y - 8}" width="16" height="16"/></g>`).join('')}
              <rect class="map__core" x="44" y="44" width="12" height="12"/>
            </svg>
            ${DIMENSIONS.map((d, i) => `<div class="map__node" style="left:${d.x}%;top:${d.y}%"><div class="map__pin"><button class="map__flag" type="button" data-dim="${d.key}" aria-pressed="${i === 0}" aria-controls="map-read"><span class="map__n">${pad(i + 1)}</span><span class="map__name">${d.name}</span></button><span class="map__stem" aria-hidden="true"></span></div></div>`).join('')}
          </div>
        </div>
        <div class="map__read" id="map-read" aria-live="off">
          ${DIMENSIONS.map((d, i) => `<div class="map__panel" data-dim-panel="${d.key}"${i ? ' hidden' : ''}><p class="map__k"><span>${pad(i + 1)}</span>${d.name}</p><p class="map__t">${d.text}</p><ul role="list">${d.caps.map((c) => `<li>${c}</li>`).join('')}</ul><a class="plink map__go" href="#approach" data-goto-cap="${d.cap}"><span>Explore ${CAPABILITIES.find((c) => c.key === d.cap).name.toLowerCase()}</span>${ic.arrow}</a></div>`).join('')}
        </div></div>
      </div>
    </div>
    <nav class="index" aria-label="What is on this page" data-h>
      ${[[PROJECTS.length, 'Case studies', 'work'], [CAPABILITIES.length, 'Capability domains', 'approach'], [LAYERS.length, 'Architecture layers', 'architecture'], [experience.length, 'Roles', 'experience']].map(([n, l, id]) => `<a href="#${id}"><span class="index__n">${pad(n)}</span><span class="index__l">${l}</span>${ic.arrow}</a>`).join('')}
    </nav>
  </section>`;

const capabilities = (ctx) => `
  <section class="sec" id="approach" aria-labelledby="${hid('Design intelligence')}" data-sec>
    ${secHead('02', 'Design intelligence', 'How I approach product design.', `${CAPABILITIES.length} domains · ${CAPABILITIES.reduce((n, c) => n + c.items.length, 0)} practices`, 'Five domains, from deciding what to build to handing it to developers. Select one to see its practices and where each shows in the work.')}
    <div class="cap" data-cap data-r>
      ${tick}
      <div class="cap__list" role="group" aria-label="Capability domains" data-strip>
        ${CAPABILITIES.map((c, i) => `<button class="cap__tab" type="button" data-cap-tab="${c.key}" aria-pressed="${i === 0}" aria-controls="cap-view"><span class="cap__n">${pad(i + 1)}</span><span class="cap__name">${c.name}</span><span class="cap__count">${c.items.length} practices</span></button>`).join('')}
      </div>
      <div class="cap__view" id="cap-view" aria-live="polite">
        ${CAPABILITIES.map((c, i) => `
        <div class="cap__panel" data-cap-panel="${c.key}"${i ? ' hidden' : ''}>
          <div class="cap__tree">
            <p class="cap__root"><span>${pad(i + 1)}</span>${c.name}</p>
            <p class="cap__line">${c.line}</p>
            <ul class="cap__items" role="list">${c.items.map((it, j) => `<li style="--j:${j}"><span class="cap__wire" aria-hidden="true"></span><span class="cap__item"><i>${pad(i + 1)}.${j + 1}</i>${it}</span></li>`).join('')}</ul>
          </div>
          <div class="cap__ev">
            <p class="label">Where it shows in the work</p>
            <ul role="list">${c.evidence.map(([slug, t]) => `<li>${projLink(ctx, slug)}<p>${t}</p></li>`).join('')}</ul>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`;

const visual = (ctx, p) => {
  if (p.slug === 'managem') {
    return `<div class="pv pv--managem" data-par>
      <div class="pv__browser"><div class="pv__bar" aria-hidden="true"><i></i><i></i><i></i><span>ManaGEM · Dashboard</span></div>${img(ctx, 'managem/mg-dashboard', 'The redesigned ManaGEM dashboard', { sizes: '(min-width: 1100px) 820px, 100vw' })}</div>
      <div class="pv__float">${img(ctx, 'managem/to-06-validation', 'ManaGEM Take-On validation summary', { sizes: '(min-width: 1100px) 420px, 60vw' })}</div>
      <p class="pv__cap">Redesign prototype and Take-On prototype · demo data</p>
    </div>`;
  }
  if (p.slug === 'wastemart') {
    return `<div class="pv pv--wastemart" data-par>
      <div class="pv__phones">
        <div class="pv__phone">${img(ctx, 'wastemart/07-job-detail', 'WasteMart job detail screen', { sizes: '240px' })}</div>
        <div class="pv__phone pv__phone--main">${img(ctx, 'wastemart/06-jobs', 'WasteMart driver job list', { sizes: '260px' })}</div>
        <div class="pv__phone">${img(ctx, 'wastemart/12-signoff', 'WasteMart customer sign-off screen', { sizes: '240px' })}</div>
      </div>
      <p class="pv__cap">Design prototype screens · sample data</p>
    </div>`;
  }
  return `<div class="pv pv--gemis" data-par>
    <div class="pv__wire" role="img" aria-label="Illustrative wireframe placeholder. A capture of the GEMIS website has not yet been added to this portfolio.">
      <div class="pv__wirebar"><i></i><i></i><i></i></div>
      <div class="pv__wirebody"><span class="w w--nav"></span><span class="w w--h"></span><span class="w w--h w--h2"></span><span class="w w--p"></span><span class="w w--btn"></span><span class="w w--grid"><i></i><i></i><i></i></span></div>
      <p class="pv__word" aria-hidden="true">GEMIS</p>
    </div>
    <p class="pv__cap pv__cap--note">Illustrative placeholder — a capture of the website has not been added yet</p>
  </div>`;
};

const project = (ctx, p, i) => {
  const src = byslug[p.slug];
  return `
  <article class="proj proj--${p.tone} proj--${p.slug}" id="case-${p.slug}" data-proj="${p.slug}" data-r aria-labelledby="proj-${p.slug}">
    ${tick}
    <div class="proj__info">
      <p class="proj__index"><span class="proj__n">${pad(i + 1)}</span><span class="proj__type">${p.type}</span></p>
      <h3 class="proj__name" id="proj-${p.slug}"><a href="${caseUrl(ctx, p.slug)}" data-case>${p.name}</a></h3>
      <p class="proj__text">${p.text}</p>
      <dl class="proj__meta">
        <div><dt>Involvement</dt><dd>${p.role}</dd></div>
        <div><dt>Platform</dt><dd>${esc(src.platform)}</dd></div>
        <div><dt>Status</dt><dd><span class="state"><i aria-hidden="true"></i>${esc(src.status.label)}</span></dd></div>
      </dl>
      <div class="proj__cols">
        <div><p class="label">Showcases</p><ul class="proj__show" role="list">${p.showcase.map((s) => `<li>${s}</li>`).join('')}</ul></div>
        <div><p class="label">Verified context</p><ul class="proj__ctx" role="list">${p.context.map((s) => `<li>${ic.check}<span>${s}</span></li>`).join('')}</ul></div>
      </div>
      <p class="proj__cta" aria-hidden="true"><span>Open case study</span>${ic.arrow}</p>
    </div>
    ${visual(ctx, p)}
  </article>`;
};

const work = (ctx) => `
  <section class="sec sec--work" id="work" aria-labelledby="${hid('Project intelligence')}" data-sec>
    ${secHead('03', 'Project intelligence', 'Three products. Three kinds of complexity.', '3 case studies · web, mobile, enterprise', 'An ERP platform, a field app for drivers and a corporate website. Each panel opens its case study.')}
    <nav class="pnav" aria-label="Jump to a case study" data-pnav>
      <ol role="list">${PROJECTS.map((p, i) => `<li><a class="pnav__a pnav__a--${p.tone}" href="#case-${p.slug}" data-pnav-link="${p.slug}"><span class="pnav__n">${pad(i + 1)}</span><span class="pnav__name">${p.name}</span><span class="pnav__type">${p.type}</span></a></li>`).join('')}</ol>
    </nav>
    <div class="projs">${PROJECTS.map((p, i) => project(ctx, p, i)).join('')}</div>
    <div class="matrix" data-matrix data-r>
      ${tick}
      <div class="matrix__head"><p class="label">Discipline matrix</p><p class="matrix__note">Which disciplines each case study demonstrates. Categorical, not scored.</p></div>
      <div class="matrix__scroll">
        <table>
          <thead><tr><th scope="col"><span class="vh">Discipline</span></th>${PROJECTS.map((p, i) => `<th scope="col" data-col="${p.slug}"><a href="${caseUrl(ctx, p.slug)}"><span>${pad(i + 1)}</span>${p.name}</a></th>`).join('')}</tr></thead>
          <tbody>${MATRIX.map(([d, on]) => `<tr><th scope="row">${d}</th>${PROJECTS.map((p) => `<td data-col="${p.slug}">${on.includes(p.slug[0]) ? `<span class="dot dot--${p.tone}"><span class="vh">Yes</span></span>` : '<span class="nodot"><span class="vh">No</span></span>'}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>
    </div>
  </section>`;

const architecture = (ctx) => `
  <section class="sec" id="architecture" aria-labelledby="${hid('System architecture')}" data-sec>
    ${secHead('04', 'System architecture', 'From a business requirement to a built interface.', `${LAYERS.length} layers · select one to inspect`, 'Six layers, each feeding the next. Select a layer to see its purpose, the activities involved, what it produces and where it appears in the projects.')}
    <div class="arch" data-arch data-r>
      ${tick}
      <ol class="arch__list" role="list" aria-label="Layers" data-strip>
        ${LAYERS.map((l, i) => `<li><button class="arch__tab" type="button" data-layer="${i}" aria-pressed="${i === 0}" aria-controls="arch-view"><span class="arch__n">L${i + 1}</span><span class="arch__name">${l.name}</span></button>${i < LAYERS.length - 1 ? '<span class="arch__flow" aria-hidden="true"></span>' : ''}</li>`).join('')}
      </ol>
      <div class="arch__stage" aria-hidden="true">
        <div class="arch__stack">${LAYERS.map((l, i) => `<div class="arch__plate" data-plate="${i}" style="--i:${i}"><span>L${i + 1} · ${l.name}</span></div>`).join('')}</div>
      </div>
      <div class="arch__view" id="arch-view" aria-live="polite">
        ${LAYERS.map((l, i) => `
        <div class="arch__panel" data-layer-panel="${i}"${i ? ' hidden' : ''}>
          <p class="arch__k"><span>L${i + 1} / ${LAYERS.length}</span>${l.name}</p>
          <p class="arch__purpose">${l.purpose}</p>
          <div class="arch__cols">
            <div><p class="label">Design activities</p><ul role="list">${l.act.map((a) => `<li>${a}</li>`).join('')}</ul></div>
            <div><p class="label">Deliverables</p><ul role="list">${l.out.map((a) => `<li>${a}</li>`).join('')}</ul></div>
          </div>
          <div class="arch__ev"><p class="label">Project evidence</p><ul role="list">${l.ev.map(([slug, t]) => `<li>${projLink(ctx, slug)}<p>${t}</p></li>`).join('')}</ul></div>
          <p class="arch__step">${i > 0 ? `<button type="button" data-layer-go="${i - 1}"><span aria-hidden="true">←</span> ${LAYERS[i - 1].name}</button>` : '<span></span>'}${i < LAYERS.length - 1 ? `<button type="button" data-layer-go="${i + 1}">Next: ${LAYERS[i + 1].name} <span aria-hidden="true">→</span></button>` : ''}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`;

const profile = (ctx) => `
  <section class="sec" id="experience" aria-labelledby="${hid('Professional profile')}" data-sec>
    ${secHead('05', 'Professional profile', 'A designer with a multidisciplinary background.', `${experience.length} roles · ${esc(site.location)}`, 'Two design roles, with experience that also covers graphic design, product coordination, product testing, and marketing and SEO.')}
    <div class="prof">
      <aside class="prof__id" data-r>
        ${tick}
        <div class="prof__photo">${img(ctx, 'about/portrait-spha', 'Sphamandla Xaba', { sizes: '(min-width: 1100px) 300px, 60vw' })}</div>
        <p class="prof__name">${esc(site.name)}</p>
        <p class="prof__role">Product Designer / UI/UX Designer</p>
        <dl class="prof__facts">
          <div><dt>Experience</dt><dd>About three years across design and multidisciplinary roles</dd></div>
          <div><dt>Based in</dt><dd>${esc(site.location)}</dd></div>
          <div><dt>Education</dt><dd>${esc(education.qualification)}<br>${esc(education.school)}</dd></div>
        </dl>
        <a class="btn btn--line btn--sm" href="${url(ctx, 'about/')}"><span>Full profile</span>${ic.arrow}</a>
      </aside>
      <div class="prof__time" data-r>
        <p class="label">Roles</p>
        <ol class="time" role="list">
          ${experience.map((e) => `
          <li class="time__item${e.current ? ' is-current' : ''}">
            <p class="time__dates">${esc(e.dates)}${e.current ? '<span class="state"><i aria-hidden="true"></i>Current</span>' : ''}</p>
            <h3 class="time__org">${esc(e.org)}</h3>
            <p class="time__role">${esc(e.role)}</p>
            <ul class="time__pts" role="list">${e.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
            ${e.work.length ? `<p class="time__work">${e.work.map((w) => `<a class="plink" href="${url(ctx, w.href)}"><span>${esc(w.label)}</span>${ic.arrow}</a>`).join('')}</p>` : ''}
          </li>`).join('')}
        </ol>
      </div>
      <div class="prof__side" data-r>
        <div class="prof__block"><p class="label">Experience includes</p><ul class="chips" role="list">${AREAS.map((a) => `<li>${a}</li>`).join('')}</ul></div>
        <div class="prof__block"><p class="label">Tools</p><dl class="toolset">${Object.entries(tools).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v.map(esc).join(' · ')}</dd></div>`).join('')}</dl></div>
        <div class="prof__block"><p class="label">Continued learning</p><ul class="learn" role="list">${learning.map((l) => `<li>${esc(l)}</li>`).join('')}</ul></div>
      </div>
    </div>
  </section>`;

const contact = (ctx) => `
  <section class="sec sec--contact" id="contact" aria-labelledby="contact-h" data-sec>
    <div class="term" data-r>
      ${tick}
      <div class="term__bar" aria-hidden="true"><span>06</span><span>Contact terminal</span><span class="term__path">sx://contact</span></div>
      <div class="term__body">
        <div class="term__lead">
          <h2 class="term__title" id="contact-h" data-split>Have a complex product challenge?</h2>
          <p class="term__copy">Let’s turn complexity into a clearer, more useful digital experience.</p>
          <a class="btn btn--red btn--lg" href="mailto:${site.email}"><span>Start a conversation</span>${ic.arrow}</a>
        </div>
        <ul class="term__rows" role="list">
          <li><span class="term__k">Email</span><a class="term__v" href="mailto:${site.email}">${site.email}</a><button class="term__act" type="button" data-copy="${site.email}"><span data-copy-label>Copy</span></button></li>
          <li><span class="term__k">LinkedIn</span><a class="term__v" href="${site.linkedin}" rel="noopener" target="_blank">Sphamandla Xaba</a><a class="term__act" href="${site.linkedin}" rel="noopener" target="_blank" aria-label="Open LinkedIn profile in a new tab">Open ${ic.out}</a></li>
          <li><span class="term__k">CV</span><a class="term__v" href="${url(ctx, site.cv)}" download>Curriculum vitae (PDF)</a><a class="term__act" href="${url(ctx, site.cv)}" download aria-label="Download CV as PDF">Download ${ic.down}</a></li>
          <li><span class="term__k">Location</span><span class="term__v">${esc(site.location)}</span><span class="term__act term__act--plain"><time data-clock>--:--</time> SAST</span></li>
        </ul>
      </div>
    </div>
  </section>`;

const foot = (ctx) => `
  <footer class="foot">
    <p class="foot__id">${mark}<span>© ${new Date().getFullYear()} ${esc(site.name)}</span></p>
    <ul role="list">${PROJECTS.map((p) => `<li><a href="${caseUrl(ctx, p.slug)}">${p.name}</a></li>`).join('')}<li><a href="${url(ctx, 'about/')}">About</a></li></ul>
    <a class="foot__top" href="#overview">Back to top ↑</a>
  </footer>`;

// -------------------------------------------------------------- document

const title = 'Sphamandla Xaba — Product Designer | Enterprise platforms and digital products';
const description = 'Portfolio of Sphamandla Xaba, a Product Designer in Johannesburg focused on enterprise platforms, digital products and intelligent user experiences. Case studies: ManaGEM, WasteMart and GEMIS.';
const BOOT = `(function(){var d=document.documentElement;d.classList.add('js');try{var m=matchMedia('(prefers-reduced-motion: reduce)').matches,t=+localStorage.getItem('sx-intro')||0;if(!m&&!location.hash&&Date.now()-t>432e5){d.classList.add('sx-intro')}}catch(e){}})();`;

export default {
  path: 'index.html',
  page: 'Home',
  navKey: 'home',
  render: () => '',
  document(ctx) {
    const canonical = site.origin + site.basePath;
    const ld = {
      '@context': 'https://schema.org', '@type': 'Person', name: site.name, jobTitle: 'Product Designer', url: canonical, email: `mailto:${site.email}`, sameAs: [site.linkedin],
      address: { '@type': 'PostalAddress', addressLocality: 'Johannesburg', addressCountry: 'ZA' },
    };
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
<meta name="theme-color" content="#080A0D">
<link rel="icon" href="${url(ctx, 'assets/favicon.svg')}" type="image/svg+xml">
<link rel="preload" href="${url(ctx, 'assets/fonts/space-grotesk-latin-wght-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${url(ctx, 'assets/fonts/inter-latin-wght-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${url(ctx, 'assets/css/home.css')}">
<script>${BOOT}</script>
<script src="${url(ctx, 'assets/js/home.js')}" defer></script>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body id="top">
<a class="skip" href="#main">Skip to content</a>
${intro()}
${topbar(ctx)}
<main id="main" tabindex="-1">
${hero(ctx)}
${capabilities(ctx)}
${work(ctx)}
${architecture(ctx)}
${profile(ctx)}
${contact(ctx)}
</main>
${foot(ctx)}
<div class="cursor" data-cursor aria-hidden="true"><span>View case</span></div>
</body>
</html>
`;
  },
};
