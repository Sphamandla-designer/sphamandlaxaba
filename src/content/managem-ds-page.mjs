// ManaGEM design system — work/managem/design-system/
// Documents the design system I created, which the GEMIS manager approved and
// GEMIS formally adopted, and shows it applied across the ManaGEM product
// redesign, the Take-On onboarding experience and the ManaGEM landing page.
// Values come from the built experiences (see managem-ds.mjs). Nothing here
// describes governance, contribution workflows or adoption metrics: none were
// supplied.

import { esc, url, img } from '../shared.mjs';
import { projects } from './projects.mjs';
import { QUICK, SRC_CORE, SRC_TAKEON, full, glyph, shot, head, section, chapterNav, nextProject } from './managem-parts.mjs';
import { designSystem, TOKENS, TYPE_SCALE, RADII, SHADOWS } from './managem-ds.mjs';

const SRC_LANDING = 'ManaGEM landing page';
const SRC_ORIGINAL = 'Original interface · approved for publication';

const chapters = [
  ['in-action', 'In action'],
  ['foundations', 'Foundations'],
  ['navigation', 'Navigation'],
  ['components', 'Components'],
  ['states', 'States'],
  ['data', 'Data'],
  ['forms', 'Forms'],
  ['responsive', 'Responsive'],
  ['access', 'Accessibility'],
  ['future', 'Next'],
];

const table = (cols, rows, label, cls = '') => `
  <div class="dsx-table${cls ? ` ${cls}` : ''}" role="region" aria-label="${esc(label)}" tabindex="0">
    <table>
      <thead><tr>${cols.map((c) => `<th scope="col">${c}</th>`).join('')}</tr></thead>
      <tbody>${rows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`)).join('')}</tr>`).join('')}</tbody>
    </table>
  </div>`;

const sw = (hex) => `<span class="dsx-sw" style="--c:${hex}" aria-hidden="true"></span><code>${hex}</code>`;

// ------------------------------------------------------------------- hero

const hero = (ctx) => `
  <header class="mf-hero dsx-hero" aria-labelledby="dsx-title">
    <div class="wrap">
      <a class="mf-back" href="${url(ctx, QUICK)}">${glyph.back}<span>ManaGEM case study</span></a>
      <div class="mf-hero__grid">
        <div class="mf-hero__text">
          <p class="mx-eyebrow">ManaGEM · Design system</p>
          <h1 class="mf-title" id="dsx-title">One design foundation for three ManaGEM experiences.</h1>
          <p class="mf-sub">I created this design system to give ManaGEM a consistent foundation. GEMIS formally adopted it, and I applied it to the product redesign, the Take-On onboarding experience and the ManaGEM landing page.</p>
        </div>
        <dl class="dsx-credit">
          <div><dt>Created</dt><dd>By me — foundations, components and patterns</dd></div>
          <div><dt>Applied</dt><dd>By me — to the product redesign, Take-On and the landing page</dd></div>
          <div><dt>Reviewed</dt><dd>With the GEMIS manager and full-stack developer, in the prototype review</dd></div>
          <div><dt>Approved</dt><dd>By the GEMIS manager — the design direction now being implemented</dd></div>
          <div><dt>Adopted</dt><dd>By GEMIS, as its design system for ManaGEM</dd></div>
        </dl>
      </div>
    </div>
  </header>`;

// ----------------------------------------------------- 01 · in action

const STEPS = [
  ['The need', 'ManaGEM had grown feature by feature, and screens no longer behaved alike.'],
  ['The foundation', 'I created one set of colours, type, components and patterns.'],
  ['Adoption', 'GEMIS formally adopted it as the design system for ManaGEM.'],
  ['Application', 'I used it for the product redesign, Take-On and the landing page.'],
  ['What it supports', 'New modules and experiences start from known parts.'],
];

const EXP = [['p', 'Product redesign', SRC_CORE], ['t', 'Take-On', SRC_TAKEON], ['l', 'Landing page', SRC_LANDING]];

// One shared decision, shown in each experience. `items` holds, per
// experience, either an image key or live HTML, plus the measured values.
const xrow = (ctx, { id, title, why, items, shared, varies }) => `
  <article class="dsx-x" id="x-${id}" aria-labelledby="x-${id}-h">
    <div class="dsx-x__head">
      <h3 id="x-${id}-h">${title}</h3>
      <p>${why}</p>
    </div>
    <div class="dsx-x__grid">
      ${items.map((it, i) => {
        const [, name, src] = EXP[i];
        const media = it.html
          ? `<div class="dsx-x__stage dsx-x__stage--live${it.dark ? ' is-dark' : ''}">${it.html}</div>`
          : `<a class="zoom dsx-x__stage${it.dark ? ' is-dark' : ''}" href="${full(ctx, `managem/${it.key}`)}" data-zoom data-caption="${esc(`${name}: ${it.alt}`)}" aria-label="Enlarge: ${esc(it.alt)}">${img(ctx, `managem/${it.key}`, it.alt, { sizes: '(min-width: 1264px) 400px, 100vw' })}</a>`;
        return `<figure class="dsx-x__item">${media}<figcaption><strong>${name}</strong><span>${it.spec}</span><span class="mx-src">${esc(it.key ? src : 'Rendered from the measured values')}</span></figcaption></figure>`;
      }).join('')}
    </div>
    <dl class="dsx-x__notes">
      <div><dt>Shared</dt><dd>${shared}</dd></div>
      <div><dt>Varies</dt><dd>${varies}</dd></div>
    </dl>
  </article>`;

const spec = (font, mono, rows) => `
  <div class="dsx-spec" style="--f:${font};--m:${mono}">
    ${rows.map(([cls, txt, meta]) => `<p class="dsx-spec__${cls}">${txt}<small>${meta}</small></p>`).join('')}
  </div>`;

const ramp = (cols) => `<div class="dsx-ramp">${cols.map(([hex, label, txt]) => `<span style="--c:${hex};--tc:${txt || '#fff'}"><b>${label}</b><code>${hex}</code></span>`).join('')}</div>`;

const ROWS = [
  {
    id: 'type', title: 'Typography',
    why: 'One interface typeface keeps the three experiences recognisably the same product. Figures always switch to a monospaced face so amounts line up; the landing page scales the same type up for reading at a distance.',
    items: [
      { html: spec('Outfit', 'JetBrains Mono', [['h', 'Invoices', 'Page title 24 / 600'], ['b', 'Eight invoices, R 535,000 outstanding', 'Body 13 / 400'], ['n', 'INV-2026-0142 · R 425,000', 'Figures · JetBrains Mono']]), spec: 'Compact sizes for long working sessions' },
      { html: spec('Outfit', 'JetBrains Mono', [['h', 'Review customers', 'Page title 22 / 600'], ['b', 'Ten records found in your files', 'Body 13.5 / 400'], ['n', '82% confidence', 'Figures · JetBrains Mono']]), spec: 'Almost identical scale, slightly roomier body' },
      { html: spec('Outfit', 'IBM Plex Mono', [['d', 'One job, from enquiry to payment', 'Section title 48 / 600, shown smaller'], ['b', 'ManaGEM keeps the job, the money and the stock on one record.', 'Body 17 / 400'], ['n', 'R 2,000 / month', 'Figures · IBM Plex Mono']]), spec: 'Display sizes for a marketing page' },
    ],
    shared: 'Outfit for all interface text; 600 weight for every heading; a monospaced face for figures and references.',
    varies: 'The landing page uses display sizes (48–72px) and IBM Plex Mono, the fallback already named in the product’s font stack.',
  },
  {
    id: 'colour', title: 'Colour',
    why: 'Navy and slate do the structural work in all three, so colour can be saved for meaning: one accent for “act here”, and a fixed semantic set for status.',
    items: [
      { html: ramp([['#0F172A', 'Structure'], ['#0EA5E9', 'Action', '#0F172A'], ['#10B981', 'Done', '#0F172A'], ['#F59E0B', 'Attention', '#0F172A'], ['#EF4444', 'Problem', '#0F172A'], ['#8B5CF6', 'Duplicate']]), spec: 'Sky marks actions, focus and the current page' },
      { html: ramp([['#0F172A', 'Structure'], ['#0EA5E9', 'Progress', '#0F172A'], ['#10B981', 'Done', '#0F172A'], ['#F59E0B', 'Attention', '#0F172A'], ['#EF4444', 'Problem', '#0F172A'], ['#8B5CF6', 'Duplicate']]), spec: 'Same palette; navy carries the main action' },
      { html: ramp([['#0B1222', 'Structure'], ['#00BFA6', 'Sign-up', '#0B1222'], ['#0EA5E9', 'Links', '#0F172A'], ['#06734E', 'Good'], ['#92400E', 'Warn'], ['#B91C1C', 'Bad']]), spec: 'Darker navy bands and a teal call to action' },
    ],
    shared: 'Navy #0F172A for structure, sky for focus and links, the emerald / amber / red family for status — always with a word.',
    varies: 'The landing page adds GEM teal #00BFA6 for sign-up only, so marketing actions never look like actions inside the product.',
  },
  {
    id: 'actions', title: 'Buttons and actions',
    why: 'Each area has one clearly primary action next to a quieter secondary one, with an icon that says what will happen. Shape and colour change with the context; the hierarchy does not.',
    items: [
      { key: 'ds-x-p-actions', alt: 'Export and New Invoice buttons', spec: 'Sky fill, 7px radius, 13 / 500' },
      { key: 'ds-x-t-actions', alt: 'Back and Accept & continue buttons', spec: 'Navy fill, 9px radius, 13 / 600' },
      { key: 'ds-x-l-actions', alt: 'Start your free trial and Explore the product buttons on the navy hero', spec: 'Teal pill, navy text, 15–17 / 600', dark: true },
    ],
    shared: 'One primary per area; secondary is outlined or ghost; leading or trailing icon; same Outfit label.',
    varies: 'Take-On’s primary is navy, with sky kept for an accent button; the landing page uses larger pill buttons with a teal fill reserved for sign-up.',
  },
  {
    id: 'forms', title: 'Form fields',
    why: 'Labels always sit above the field and required fields are marked, so people can scan a form top to bottom and know what is still needed. Focus is a sky border, the same signal as the current page in the sidebar.',
    items: [
      { key: 'ds-x-p-form', alt: 'New Enquiry customer fields with the contact field in focus', spec: '9×12px padding, 7px radius, label 12 / 500' },
      { key: 'ds-x-t-form', alt: 'Take-On company profile fields with sample company details', spec: '9×12px padding, 8px radius, label 12 / 600' },
      { key: 'ds-x-l-form', alt: 'Landing page team form with name, company, email and selects', spec: '48px high, 12px radius, label 14 / 600' },
    ],
    shared: 'Label above · white field · 1px #E2E8F0 border · sky focus · two-column rows for related fields.',
    varies: 'The landing form is larger (16px text, 48px fields), as suits a public sign-up form; the product keeps fields compact for daily data entry.',
  },
  {
    id: 'cards', title: 'Cards and information',
    why: 'Cards group one idea with its key figure first, so a page can be read by its headlines before any detail.',
    items: [
      { key: 'ds-x-p-cards', alt: 'Enquiries and quotes KPI cards with change against the prior period', spec: 'Label · 32px figure · change, 12px radius' },
      { key: 'ds-to-dropzone-files', alt: 'Take-On upload card with two files marked encrypted and scanned', spec: 'Title · guidance · content, 14px radius' },
      { key: 'ds-x-l-cards', alt: 'Landing page pricing card for the Team plan', spec: 'Plan · price · inclusions · action, 24px radius' },
    ],
    shared: 'White card, 1px border, soft small shadow; the most important figure or title first.',
    varies: 'Radius grows with the context — 12px in the product, 14px in Take-On, 24px on the landing page — and marketing cards can be inverted to navy for emphasis.',
  },
  {
    id: 'status', title: 'Status and feedback',
    why: 'Status always pairs a colour with a word, so it survives a quick glance, a grey-scale print-out and colour-blindness. The same four meanings appear wherever records can be in different states.',
    items: [
      { key: 'ds-x-p-status', alt: 'Invoice totals in monospaced figures with Paid, Partial, Unpaid and Overdue badges', spec: 'Badges 11 / 500 caps on a tint' },
      { key: 'ds-x-t-valid', alt: 'Take-On validation results in green, amber, purple and red rows, each with a sentence', spec: 'Full-sentence rows with an icon' },
      { key: 'ds-x-l-status', alt: 'Landing page job list with On track and Delayed tags and an Illustrative figures note', spec: 'Tags 12.5 / 600 with a value' },
    ],
    shared: 'Emerald = done or on track, amber = needs attention, red = problem, purple = possible duplicate; text colour is the dark shade of each hue.',
    varies: 'Take-On explains each status in a sentence because people are checking AI-extracted data for the first time; the landing page labels its sample figures as illustrative.',
  },
  {
    id: 'layout', title: 'Layout and hierarchy',
    why: 'Every screen reads in the same order — where you are, the headline figures, then the detail — and spacing is tighter inside a group than between groups, so blocks separate without extra lines.',
    items: [
      { key: 'mg-dashboard', alt: 'The redesigned dashboard: sidebar, top bar, KPI cards, charts and projects', spec: 'Sidebar + top bar frame; 16px gaps' },
      { key: 'to-06-validation', alt: 'Take-On validation summary with a stepper, counts and results', spec: 'Stepper frame; 24px card padding' },
      { key: 'ds-land-tour', alt: 'Landing page product tour section with tabs and a product screenshot', spec: 'Editorial sections; 112px between them' },
    ],
    shared: 'A fixed frame (sidebar, stepper or section header), headline figures before detail, the same card and table parts inside.',
    varies: 'Density: the product packs information for daily use, Take-On gives one task per screen, and the landing page gives each message a full section.',
  },
];

const inAction = (ctx) =>
  section(
    'in-action',
    `
    ${head({ id: 'in-action', n: '01', label: 'The system in action', title: 'One foundation, applied three ways.', intro: 'The product redesign, Take-On and the landing page are built from the same decisions. Below, each decision is shown in all three experiences, with what is shared and what deliberately varies.' })}
    <ol class="dsx-steps" role="list">
      ${STEPS.map(([t, d], i) => `<li><span class="mq-n">0${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
    </ol>
    <div class="dsx-apps">
      <figure class="dsx-app">${shot(ctx, 'mg-dashboard', 'The redesigned ManaGEM dashboard', { caption: 'ManaGEM product redesign', sizes: '(min-width: 1264px) 450px, 100vw' })}</figure>
      <figure class="dsx-app">${shot(ctx, 'to-06-validation', 'The Take-On validation summary', { caption: 'ManaGEM Take-On', source: SRC_TAKEON, sizes: '(min-width: 1264px) 450px, 100vw' })}</figure>
      <figure class="dsx-app">${shot(ctx, 'ds-land-hero', 'The ManaGEM landing page hero with a product screenshot', { caption: 'ManaGEM landing page', source: SRC_LANDING, sizes: '(min-width: 1264px) 450px, 100vw' })}</figure>
    </div>
    <div class="dsx-xs">${ROWS.map((r) => xrow(ctx, r)).join('')}</div>
    ${table(['Decision', 'Product redesign', 'Take-On', 'Landing page'], [
      ['Interface typeface', 'Outfit', 'Outfit', 'Outfit'],
      ['Figures typeface', 'JetBrains Mono', 'JetBrains Mono', 'IBM Plex Mono'],
      ['Page / section title', '24 / 600', '22 / 600', '48 / 600 (hero 72)'],
      ['Body text', '13px', '13.5px', '17px'],
      ['Primary action', `${sw('#0EA5E9')} white text`, `${sw('#0F172A')} white text`, `${sw('#00BFA6')} navy text`],
      ['Button shape', '7px radius · 13 / 500', '9px radius · 13 / 600', 'Pill · 15–17 / 600'],
      ['Field', '7px radius · label 12 / 500', '8px radius · label 12 / 600', '12px radius · label 14 / 600'],
      ['Card radius', '12px', '14px', '24px'],
      ['Border', sw('#E2E8F0'), sw('#E2E8F0'), sw('#E2E8F0')],
      ['Status', 'Emerald · amber · red · purple badges', 'Same set, as sentences', 'Good · warn · bad tags'],
    ], 'Shared decisions and their values in each experience')}
    <p class="mx-note">Values read from each build’s stylesheet. Names and figures in the captures are demo or sample data.</p>`,
  );

// ------------------------------------------------------- 02 · foundations

const WHY = [
  ['Typography for long working sessions', 'Outfit has open, even letterforms that stay legible at the 11–13px sizes dense screens need. Amounts, invoice numbers and references switch to JetBrains Mono, whose equal-width digits line up in columns, so totals can be compared down a table without reading each one.'],
  ['Colour that carries meaning', 'Navy and slate carry the structure; one sky blue marks what you can act on and where you are. Emerald, amber, red and purple mean done, needs attention, problem and possible duplicate in every module — and each always comes with a word.'],
  ['Spacing and hierarchy for scanning', 'Screens follow one reading order: title, headline figures, tabs, toolbar, then records. Small gaps inside a group and larger gaps between groups let people scan many records and still see where one block ends.'],
  ['Components that behave the same everywhere', 'Every module uses the same KPI card, toolbar, table, tabs and drawer. Once someone learns how filtering or editing works in Invoices, it works the same way in Enquiries or Stock — and each part only has to be specified once.'],
  ['Navigation and patterns that connect modules', 'The five-group sidebar, breadcrumb and global search frame every screen, so a new client always knows where they are. Drawers keep the list in view while editing, and stepped forms end in a review before anything is committed.'],
];

const foundations = (ctx) =>
  section(
    'foundations',
    `
    ${head({ id: 'foundations', n: '02', label: 'Foundations', title: 'Colour, type and shape, defined once.', intro: 'Each foundation answers a problem in a business-management product: long sessions, dense records and many modules. The board renders the actual values live; the tables list each one and where it is used.' })}
    <div class="dsx-why">
      ${WHY.map(([t, d]) => `<div><h3>${t}</h3><p>${d}</p></div>`).join('')}
    </div>
    ${designSystem()}
    <div class="dsx-cols">
      <div>
        <h3 class="dsx-h3">Colour</h3>
        ${table(['Token', 'Value', 'Use'], [
          ...TOKENS.brand.map(([n, t, hex, use]) => [n, sw(hex), use]),
          ...TOKENS.neutrals.map(([n, t, hex]) => [n, sw(hex), t === '--text-2' ? 'Secondary text' : t === '--text-3' ? 'Tertiary text, icons' : t === '--border' ? 'Every 1px line' : 'Surfaces and fills']),
          ...TOKENS.semantic.map(([n, hex, light, text, use]) => [n, `${sw(hex)} ${sw(light)} text ${sw(text)}`, use]),
        ], 'Colour tokens')}
      </div>
      <div>
        <h3 class="dsx-h3">Typography</h3>
        ${table(['Role', 'Size / weight', 'Sample'], TYPE_SCALE.map(([n, spec, cls, s]) => [n, spec, `<span class="dsx-type ${cls}">${s}</span>`]), 'Type scale', 'dsx-table--type')}
        <h3 class="dsx-h3">Layout and spacing</h3>
        ${table(['Measure', 'Value'], [
          ['Sidebar', '240px · 64px collapsed'], ['Top bar', '56px high, 24px side padding'], ['Search field', 'Up to 380px'], ['KPI grid', '4 columns, 16px gap'], ['Quick actions', '4 columns, 12px gap'], ['Drawer', '480px'],
          ['Spacing in use', '4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 24px'],
        ], 'Layout values')}
        <p class="mx-note">Spacing values are those used across the components; they are not declared as a separate token scale.</p>
      </div>
    </div>
    <div class="dsx-cols dsx-cols--3">
      <div><h3 class="dsx-h3">Radius</h3>${table(['px', 'Used for'], RADII, 'Radius values')}</div>
      <div><h3 class="dsx-h3">Elevation</h3>${table(['Level', 'Value'], SHADOWS.map(([n, v, u]) => [n, `<code>${v}</code><br><small>${u}</small>`]), 'Shadows')}</div>
      <div><h3 class="dsx-h3">Icons and motion</h3>${table(['Item', 'Value'], [['Icons', '16px outline, 2px stroke, round caps'], ['In buttons', '14px'], ['Icon tiles', '32px (KPI), 40px (quick actions)'], ['Transitions', '100–200ms: buttons 120, toggle 120, KPI 150, sidebar and drawer 200'], ['Borders', '1px #E2E8F0 everywhere']], 'Icons and motion')}</div>
    </div>`,
    { mod: 'soft' },
  );

// ------------------------------------------------------- 03 · navigation

const navigation = (ctx) =>
  section(
    'navigation',
    `
    ${head({ id: 'navigation', n: '03', label: 'Navigation and application structure', title: 'From expanding menus to five labelled groups.', intro: 'In the original interface, each section expanded in place into a long list of sub-pages. The system replaces that with five groups — Core, Customers, Sales, Operations, Admin — where every destination stays visible and the user’s location is always marked.' })}
    <div class="dsx-navcompare">
      <div class="dsx-navcompare__orig">
        <p class="mx-compare__label"><span class="mx-compare__dot mx-compare__dot--before" aria-hidden="true"></span>Original interface</p>
        <div class="dsx-navcompare__three">
          ${shot(ctx, 'nav-original-sales', 'Original sidebar with Sales expanded into twelve items', { caption: 'Sales expanded', source: SRC_ORIGINAL, sizes: '220px' })}
          ${shot(ctx, 'nav-original-products', 'Original sidebar with Products and Pricing expanded', { caption: 'Products & Pricing expanded', source: SRC_ORIGINAL, sizes: '220px' })}
          ${shot(ctx, 'nav-original-projects', 'Original sidebar with Projects Module expanded into three sub-blocks', { caption: 'Projects Module expanded', source: SRC_ORIGINAL, sizes: '220px' })}
        </div>
      </div>
      <div class="dsx-navcompare__new">
        <p class="mx-compare__label"><span class="mx-compare__dot mx-compare__dot--after" aria-hidden="true"></span>Redesign</p>
        <div class="dsx-navcompare__two">
          ${shot(ctx, 'ds-sidebar-expanded', 'Redesigned sidebar with five labelled groups', { caption: 'Expanded', sizes: '240px' })}
          ${shot(ctx, 'ds-sidebar-collapsed', 'Redesigned sidebar collapsed to icons', { caption: 'Collapsed', sizes: '80px' })}
        </div>
      </div>
    </div>
    ${table(['Element', 'Specification', 'States in the prototype'], [
      ['Nav item', '13px, 7×10px padding, 6px radius, 16px icon', 'Default · hover (navy 800, white text) · active (10% sky fill, 3px sky left edge, sky icon)'],
      ['Section label', '10 / 600 caps, 0.08em, slate 500', '—'],
      ['Count badge', '10px pill, white 8% fill', 'Default · alert (amber 20% fill, amber text)'],
      ['Sidebar', '240px, navy 900, sticky', 'Expanded · collapsed to 64px icons (200ms) · off-canvas on mobile with overlay'],
      ['Top bar', '56px, breadcrumb · search · bell · avatar', 'Search focus (sky border, white fill) · bell with red unread dot'],
      ['Breadcrumb', 'Home / section / current (600)', 'Home hidden on small screens'],
      ['User', '28px gradient avatar, name 12/500, role 11 slate', 'Always shows who is signed in and their role'],
    ], 'Navigation specification')}
    <div class="dsx-crops">
      ${shot(ctx, 'ds-topbar', 'Redesigned top bar with breadcrumb, search with shortcut, notification bell and avatar', { caption: 'Top bar' })}
      ${shot(ctx, 'ds-search-focus', 'Search field in its focus state with a sky border', { caption: 'Search · focus', sizes: '400px', cls: 'dsx-small' })}
      ${shot(ctx, 'ds-user', 'Signed-in user with name and role in the sidebar', { caption: 'Signed-in user and role', sizes: '300px', cls: 'dsx-small' })}
    </div>`,
  );

// ------------------------------------------------------- 04 · components

const comp = (ctx, { name, purpose, anatomy, variants, behaviour, key, alt, src = SRC_CORE, wide = false }) => `
  <article class="dsx-comp${wide ? ' dsx-comp--wide' : ''}">
    <div class="dsx-comp__text">
      <h3>${name}</h3>
      <p class="dsx-comp__purpose">${purpose}</p>
      <dl>
        <div><dt>Anatomy</dt><dd>${anatomy}</dd></div>
        <div><dt>Variants</dt><dd>${variants}</dd></div>
        <div><dt>Behaviour</dt><dd>${behaviour}</dd></div>
      </dl>
    </div>
    ${shot(ctx, key, alt, { source: src, sizes: wide ? '(min-width: 1264px) 860px, 100vw' : '(min-width: 1264px) 600px, 100vw' })}
  </article>`;

const components = (ctx) =>
  section(
    'components',
    `
    ${head({ id: 'components', n: '04', label: 'Core components', title: 'The parts every module is built from.', intro: 'Each component below exists in the redesign or Take-On prototype. Its purpose, parts, variants and behaviour are taken from the prototype’s markup and styles; each comes with a real capture.' })}
    <div class="dsx-comps">
      ${comp(ctx, { name: 'KPI cards', purpose: 'Put the figures a manager checks first at the top of the dashboard and each module.', anatomy: 'Caps label · 32px figure · delta line · 32px tinted icon tile', variants: 'Delta up (emerald), down (red), muted', behaviour: 'Hover lifts 1px with the medium shadow (150ms)', key: 'ds-kpi-grid', alt: 'Four KPI cards: enquiries, quotes, sales and opportunities', wide: true })}
      ${comp(ctx, { name: 'Toolbar and filters', purpose: 'One place to search, filter and export any list.', anatomy: 'Search field · removable filter chips · dashed “Add filter” · date range · CSV / Excel / PDF', variants: 'Chip, add-chip, export group', behaviour: 'Search focus turns the field white with a sky border; chips’ × and add-chip highlight on hover', key: 'ds-toolbar', alt: 'Toolbar with search, filter chips, date range and export buttons', wide: true })}
      ${comp(ctx, { name: 'Data tables', purpose: 'Dense records that stay readable: references and amounts in mono, status in words.', anatomy: 'Checkbox · mono reference · bold name with sub-line · figures right-aligned · status badge · row actions', variants: 'Sortable headers; responsive card layout on mobile', behaviour: 'Sortable header and row hover tint; selected rows fill sky 50', key: 'ds-table-invoices', alt: 'Invoices table with statuses', wide: true })}
      ${comp(ctx, { name: 'Bulk action bar', purpose: 'Act on several selected records without leaving the list.', anatomy: 'Selection count · actions · destructive action in red', variants: 'Default and danger buttons', behaviour: 'Slides up from the bottom when rows are selected', key: 'ds-bulk-bar', alt: 'Navy bulk action bar showing two customers selected with delete, export and cancel' })}
      ${comp(ctx, { name: 'Pagination', purpose: 'Move through long lists and choose page size.', anatomy: 'Result count · page-size select · page buttons', variants: '—', behaviour: 'Hover tint; current page filled sky', key: 'ds-pager', alt: 'Pagination showing results count and page buttons' })}
      ${comp(ctx, { name: 'Tabs', purpose: 'Switch between views of one module, with counts that show where work is waiting.', anatomy: 'Label · count pill · optional amber warning dot', variants: 'Tabs (underline), sub-tabs (filled)', behaviour: 'Active tab: sky text and 2px underline; active sub-tab: navy fill, white text', key: 'ds-tabs-factory', alt: 'Factory tabs with counts and a warning dot on Not invoiced', wide: true })}
      ${comp(ctx, { name: 'Sub-tabs', purpose: 'Group related areas inside one module instead of separate menu items.', anatomy: 'Label · count', variants: 'Default · active · hover', behaviour: 'Twelve Stock Control areas live here rather than in the sidebar', key: 'ds-subtabs-stock', alt: 'Stock Control sub-tabs from Dashboard to Stock Take', wide: true })}
      ${comp(ctx, { name: 'Pipeline', purpose: 'Show where work sits in a process at a glance.', anatomy: 'Stage label · count · connecting arrow', variants: 'Enquiry pipeline; factory funnel with progress bars', behaviour: 'Stages are selectable; the active stage fills sky 50', key: 'ds-pipeline', alt: 'Enquiry pipeline with counts from new lead to invoiced', wide: true })}
      ${comp(ctx, { name: 'Drawer', purpose: 'Create or edit a record without losing the list behind it.', anatomy: 'Header with close · scrolling body · footer actions', variants: 'Form drawer (Invite user); review drawer (Take-On)', behaviour: 'Slides in from the right over a dimmed page (200ms); full width on mobile', key: 'ds-drawer', alt: 'Invite new user drawer with name, email, role and a toggle; empty space in its body trimmed' })}
      ${comp(ctx, { name: 'Form fields', purpose: 'Consistent capture across every form.', anatomy: '12/500 label above · 9×12px input · 7px radius · required asterisk', variants: 'Text, select, textarea, two-column row, toggle', behaviour: 'Focus: sky border with a 3px sky ring', key: 'ds-form-focus', alt: 'New Enquiry customer information form with a focused field' })}
      ${comp(ctx, { name: 'Quick actions', purpose: 'Shortcuts to the most common tasks from the dashboard.', anatomy: '40px sky icon tile · title · sub-line', variants: '—', behaviour: 'Hover: sky border and medium shadow', key: 'ds-quick-actions', alt: 'Four quick action cards on the dashboard', wide: true })}
      ${comp(ctx, { name: 'Empty state', purpose: 'Explain a screen that has nothing to show yet.', anatomy: '64px icon circle · heading · message · action', variants: '—', behaviour: 'Used in the prototype for modules not yet designed', key: 'ds-empty', alt: 'Empty state with an icon, a heading and a documentation link' })}
    </div>
    <h3 class="mx-subh">Take-On components built on the same system</h3>
    <div class="dsx-crops dsx-crops--to">
      ${shot(ctx, 'ds-to-stepper', 'Take-On eleven-step progress bar', { caption: 'Stepper', source: SRC_TAKEON })}
      ${shot(ctx, 'ds-to-dropzone-files', 'Take-On upload area with files marked encrypted and scanned', { caption: 'Upload area', source: SRC_TAKEON, sizes: '(min-width: 1264px) 600px, 100vw' })}
      ${shot(ctx, 'to-07-record', 'Take-On review drawer showing the source of an extracted record', { caption: 'Review drawer', source: SRC_TAKEON, sizes: '(min-width: 1264px) 600px, 100vw' })}
    </div>`,
    { mod: 'soft' },
  );

// ------------------------------------------------------------ 05 · states

const Y = '<span class="dsx-y" aria-label="Present">●</span>';
const N = '<span class="dsx-n" aria-label="Not present">—</span>';
const states = (ctx) =>
  section(
    'states',
    `
    ${head({ id: 'states', n: '05', label: 'Component states', title: 'Only the states the prototypes actually have.', intro: 'A state is listed as present only where the prototype’s styles define it and a screen uses it. Common patterns the prototypes do not include — saving indicators, success toasts, inline error messages — are not added here.' })}
    ${table(['Component', 'Default', 'Hover', 'Focus', 'Active / selected', 'Disabled', 'Expanded / open', 'Loading', 'Empty'], [
      ['Nav item', Y, Y, N, Y, N, Y + ' collapse', N, N],
      ['Button', Y, Y, N, N, 'Take-On only', N, N, N],
      ['Input / select', Y, N, Y, N, N, N, N, N],
      ['Search', Y, N, Y, N, N, N, N, N],
      ['Table row', Y, Y, N, Y, N, N, N, N],
      ['Tab / sub-tab', Y, Y, N, Y, N, N, N, N],
      ['Pager', Y, Y, N, Y, N, N, N, N],
      ['Checkbox', Y, N, N, Y, N, N, N, N],
      ['Toggle', Y, N, N, Y + ' on', N, N, N, N],
      ['KPI / quick action', Y, Y, N, N, N, N, N, N],
      ['Drawer / bulk bar', N, N, N, N, N, Y, N, N],
      ['Take-On processing', N, N, N, N, N, N, Y, N],
      ['Module screen', N, N, N, N, N, N, N, Y],
    ], 'Component state matrix', 'dsx-table--matrix')}
    <ul class="dsx-notes" role="list">
      <li><strong>Validation</strong> appears in Take-On as gating: “Accept & continue” stays disabled until every consent is ticked, and the upload step lists what is still required.</li>
      <li><strong>Error</strong> is expressed as status — Overdue, Error in the Sage sync, Low confidence — not as form error messages.</li>
      <li><strong>Focus</strong> styling is defined for inputs and search. Buttons and nav items rely on the browser’s default focus outline.</li>
    </ul>
    <div class="dsx-crops dsx-crops--states">
      ${shot(ctx, 'ds-to-btn-disabled', 'Take-On Accept and continue button in its disabled state', { caption: 'Disabled until consent', source: SRC_TAKEON, sizes: '220px', cls: 'dsx-btnshot' })}
      ${shot(ctx, 'ds-to-btn-enabled', 'The same button enabled after consent', { caption: 'Enabled', source: SRC_TAKEON, sizes: '220px', cls: 'dsx-btnshot' })}
      ${shot(ctx, 'ds-kpi-hover', 'KPI card in its hover state, raised with a shadow', { caption: 'KPI hover', sizes: '300px', cls: 'dsx-small' })}
      ${shot(ctx, 'ds-row-hover', 'Table row in its hover state', { caption: 'Row hover', sizes: '(min-width: 1264px) 1200px, 100vw', cls: 'dsx-full' })}
    </div>`,
  );

// ------------------------------------------------------------ 06 · data

const data = (ctx) =>
  section(
    'data',
    `
    ${head({ id: 'data', n: '06', label: 'Data presentation', title: 'Important information first, in words people can act on.', intro: 'The six client conversations pointed to one need: see important business information immediately instead of searching through screens. These patterns are how the system answers that.' })}
    <div class="dsx-patterns">
      <div><h3>KPIs at the top</h3><p>Every module that has headline figures opens with KPI cards before any list.</p></div>
      <div><h3>Financial figures in mono</h3><p>Amounts, invoice numbers and references use the monospaced face, right-aligned in tables.</p></div>
      <div><h3>Semantic status</h3><p>Emerald, amber, red, sky and purple badges, each with a word: Paid, Partial, Overdue, Unpaid, Duplicate.</p></div>
      <div><h3>Messages on the dashboard</h3><p>A messages banner sits above the KPIs, and the bell carries an unread dot.</p></div>
      <div><h3>Search everywhere</h3><p>A search field in the top bar on every screen, plus a search field in each list’s toolbar.</p></div>
    </div>
    <div class="dsx-crops">
      ${shot(ctx, 'mg-invoices', 'Invoices with totals, then a status per row', { caption: 'Invoices: totals first, status on every row' })}
      ${shot(ctx, 'ds-kpi-sage', 'Sage invoice KPIs showing synced, pending and error counts', { caption: 'Accounting sync state as KPIs', sizes: '(min-width: 1264px) 600px, 100vw' })}
      ${shot(ctx, 'mg-detail-attention', 'Dashboard messages banner above the KPI cards', { caption: 'Messages before figures', sizes: '(min-width: 1264px) 600px, 100vw' })}
    </div>`,
    { mod: 'soft' },
  );

// ------------------------------------------------------------ 07 · forms

const forms = (ctx) =>
  section(
    'forms',
    `
    ${head({ id: 'forms', n: '07', label: 'Forms and workflow', title: 'Steps you can see, and a review before committing.', intro: 'Longer forms are split into visible steps and end in a review of everything entered. Take-On applies the same pattern at a larger scale, with eleven steps and a consent step that gates progress.' })}
    <div class="dsx-flow">
      ${shot(ctx, 'mg-new-enquiry', 'New Enquiry step one: customer information in a two-column layout', { caption: 'New Enquiry · step 1 of 4: grouped fields, required marks', sizes: '(min-width: 1264px) 600px, 100vw' })}
      ${shot(ctx, 'mg-detail-review', 'New Enquiry review step with a single Create Enquiry button', { caption: 'New Enquiry · step 4: review, then one commit', sizes: '(min-width: 1264px) 600px, 100vw' })}
      ${shot(ctx, 'to-02-consent', 'Take-On consent checklist gating the next step', { caption: 'Take-On · consent gates progress', source: SRC_TAKEON, sizes: '(min-width: 1264px) 600px, 100vw' })}
      ${shot(ctx, 'to-10-confirm', 'Take-On final confirmation listing outstanding issues', { caption: 'Take-On · outstanding issues before submitting', source: SRC_TAKEON, sizes: '(min-width: 1264px) 600px, 100vw' })}
    </div>
    <p class="mx-note">After Create Enquiry, the prototype returns to the enquiry list. It does not show a separate saving or saved message.</p>`,
  );

// ------------------------------------------------------- 08 · responsive

const responsive = (ctx) =>
  section(
    'responsive',
    `
    ${head({ id: 'responsive', n: '08', label: 'Responsive behaviour', title: 'The same system, rearranged for smaller screens.', intro: 'The redesign prototype defines five breakpoints. Below 900px the sidebar moves off-canvas behind a menu button; below 640px tables become stacked cards that keep each label.' })}
    ${table(['Breakpoint', 'What changes'], [
      ['≤ 1024px', 'KPI grid from 4 to 2 columns'], ['≤ 900px', 'Sidebar off-canvas with an overlay; menu button appears; search fills the bar'], ['≤ 800px', 'Quick actions and mini stats to 2 columns'],
      ['≤ 720px', 'Sign-in panel stacks'], ['≤ 640px', 'KPIs to 1 column; pipeline to 2; drawer full width; page title 20px; tables become labelled cards; breadcrumb drops Home'],
    ], 'Breakpoints')}
    <div class="dsx-phones">
      ${shot(ctx, 'ds-m-dashboard', 'Dashboard at phone width', { caption: 'Dashboard', sizes: '300px' })}
      ${shot(ctx, 'ds-m-menu', 'Off-canvas sidebar open over the dashboard at phone width', { caption: 'Off-canvas navigation', sizes: '300px' })}
      ${shot(ctx, 'ds-m-invoices', 'Invoices as stacked labelled cards at phone width', { caption: 'Table as cards', sizes: '300px' })}
    </div>`,
    { mod: 'soft' },
  );

// ---------------------------------------------------- 09 · accessibility

const PASS = 'Meets 4.5 : 1';
const BELOW = '<strong>Below 4.5 : 1</strong>';
const prow = (html, ratio) => `<div class="dsx-prop__row">${html}<span class="r">${ratio}</span></div>`;

const access = () =>
  section(
    'access',
    `
    ${head({ id: 'access', n: '09', label: 'Accessibility and usability', title: 'What the system does well, and what I propose to strengthen.', intro: 'Contrast was measured for every text colour pair the system uses. No formal accessibility audit has been carried out, and no WCAG compliance is claimed. The improvements below are my proposals; they have not been adopted by GEMIS.' })}
    <div class="dsx-cols">
      <div>
        <h3 class="dsx-h3">Built in</h3>
        <ul class="dsx-notes" role="list">
          <li>Status always has a word as well as a colour.</li>
          <li>Labels sit above fields; required fields are marked.</li>
          <li>Inputs and search have a visible focus ring.</li>
          <li>Navigation always shows the current page, breadcrumb and signed-in role.</li>
          <li>The same patterns repeat in every module, so learning one screen helps with the next.</li>
          <li>Take-On’s navy primary button and the landing page’s navy-on-teal button already pass comfortably.</li>
        </ul>
      </div>
      <div>
        <h3 class="dsx-h3">Contrast in the current implementation</h3>
        ${table(['Pair', 'Ratio', 'Result'], [
          ['Text #0F172A on white', '17.9 : 1', PASS],
          ['Secondary text #64748B on white', '4.8 : 1', PASS],
          ['Badge text on its tint (all five)', '4.5–6.0 : 1', PASS],
          ['Nav text #CBD5E1 on navy', '12.0 : 1', PASS],
          ['Take-On primary: white on navy #0F172A', '17.9 : 1', PASS],
          ['Landing CTA: #0B1222 on teal #00BFA6', '8.0 : 1', PASS],
          ['Product primary: white on sky #0EA5E9', '2.8 : 1', BELOW],
          ['Sky text on white: links, active tab, invoice references', '2.8 : 1', BELOW],
          ['KPI change up: emerald #10B981 on white', '2.5 : 1', BELOW],
          ['KPI change down: red #EF4444 on white', '3.8 : 1', BELOW],
          ['Tertiary text #94A3B8 on white', '2.6 : 1', BELOW],
        ], 'Measured contrast ratios in the current implementation')}
      </div>
    </div>
    <h3 class="mx-subh">Proposed improvements</h3>
    ${table(['Element', 'Current', 'Proposed', 'Ratio after', 'Why this value'], [
      ['Primary button fill', `${sw('#0EA5E9')} 2.8&nbsp;:&nbsp;1`, `${sw('#0369A1')} sky 700`, '5.9 : 1', 'Stays in the sky family, so the brand accent is unchanged in hue; hover moves to sky 800 #075985 (7.6 : 1).'],
      ['Links, active tab, references', `${sw('#0EA5E9')} 2.8&nbsp;:&nbsp;1`, `${sw('#0369A1')} sky 700`, '5.9 : 1', 'Text in the accent colour needs the darker shade; #0EA5E9 stays for focus rings, icons on navy (6.4 : 1) and fills.'],
      ['Tab underline, selected borders', `${sw('#0EA5E9')} 2.8&nbsp;:&nbsp;1`, `${sw('#0284C7')} sky 600`, '4.1 : 1', 'Non-text indicators need 3 : 1; sky 600 is already the system’s hover colour.'],
      ['KPI change, up', `${sw('#10B981')} 2.5&nbsp;:&nbsp;1`, `${sw('#047857')}`, '5.5 : 1', 'The emerald badge text colour the system already uses.'],
      ['KPI change, down', `${sw('#EF4444')} 3.8&nbsp;:&nbsp;1`, `${sw('#B91C1C')}`, '6.5 : 1', 'The red badge text colour the system already uses.'],
      ['Tertiary text', `${sw('#94A3B8')} 2.6&nbsp;:&nbsp;1`, `${sw('#64748B')} for readable text`, '4.8 : 1', 'Keep #94A3B8 only for disabled states and decorative icons.'],
    ], 'Proposed contrast improvements')}
    <div class="dsx-prop" aria-label="Current and proposed colours side by side">
      <div class="dsx-prop__col">
        <span class="dsx-prop__tag">Current implementation</span>
        ${prow('<span class="dsx-pbtn" style="--c:#0EA5E9">+ New invoice</span>', '2.8 : 1')}
        ${prow('<span class="dsx-ptab" style="--c:#0EA5E9">Dashboard</span><span class="dsx-pmono" style="--c:#0EA5E9">INV-2026-0142</span>', '2.8 : 1')}
        ${prow('<span class="dsx-pd" style="--c:#10B981">↑ +5 vs prior</span><span class="dsx-pd" style="--c:#EF4444">↓ −2% vs prior</span>', '2.5 · 3.8 : 1')}
        ${prow('<span class="dsx-pt" style="--c:#94A3B8">Showing 1–10 of 243</span>', '2.6 : 1')}
      </div>
      <div class="dsx-prop__col dsx-prop__col--new">
        <span class="dsx-prop__tag">Proposed · not yet adopted</span>
        ${prow('<span class="dsx-pbtn" style="--c:#0369A1">+ New invoice</span>', '5.9 : 1')}
        ${prow('<span class="dsx-ptab" style="--c:#0369A1;--b:#0284C7">Dashboard</span><span class="dsx-pmono" style="--c:#0369A1">INV-2026-0142</span>', '5.9 : 1')}
        ${prow('<span class="dsx-pd" style="--c:#047857">↑ +5 vs prior</span><span class="dsx-pd" style="--c:#B91C1C">↓ −2% vs prior</span>', '5.5 · 6.5 : 1')}
        ${prow('<span class="dsx-pt" style="--c:#64748B">Showing 1–10 of 243</span>', '4.8 : 1')}
      </div>
    </div>
    <p class="mx-note">Ratios calculated with the WCAG relative-luminance formula against white. The approved product design, and every capture on this page, still uses the current values.</p>`,
  );

// ------------------------------------------------------------ 10 · future

const future = () =>
  section(
    'future',
    `
    ${head({ id: 'future', n: '10', label: 'Supporting future work', title: 'A foundation new screens can start from.', intro: 'Because colour, type, components and states are already defined, a new ManaGEM module or GEMIS experience starts from known parts rather than a blank page — as Take-On and the landing page already did.' })}
    <div class="dsx-patterns dsx-patterns--3">
      <div><h3>New modules</h3><p>Reuse the page structure: header, KPI cards, tabs, toolbar, table, pager.</p></div>
      <div><h3>New experiences</h3><p>Take-On shows a new flow built on the same tokens and components with only a few additions: stepper, upload area, confidence badges.</p></div>
      <div><h3>Marketing</h3><p>The landing page shows how the system extends for marketing — a teal accent, darker bands — while the product screens stay unchanged.</p></div>
    </div>`,
    { mod: 'soft' },
  );

export default {
  render(ctx) {
    const p = projects.find((x) => x.slug === 'managem');
    const next = projects[(projects.indexOf(p) + 1) % projects.length];
    return `
  <article class="case mx mx--full mx--ds">
    ${hero(ctx)}
    ${chapterNav(ctx, chapters, { name: 'Design system', cta: `<a class="btn btn--secondary mx-chapters__cta" href="${url(ctx, QUICK)}">Case study</a>` })}
    ${inAction(ctx)}
    ${foundations(ctx)}
    ${navigation(ctx)}
    ${components(ctx)}
    ${states(ctx)}
    ${data(ctx)}
    ${forms(ctx)}
    ${responsive(ctx)}
    ${access(ctx)}
    ${future(ctx)}
    <section class="mf-return" aria-labelledby="dsx-return-h">
      <div class="wrap">
        <h2 id="dsx-return-h">See the system in the case study.</h2>
        <p>How the design system fits the wider ManaGEM redesign — from the navigation decision to Take-On.</p>
        <a class="btn btn--secondary" href="${url(ctx, QUICK)}">${glyph.back}<span>Back to the case study</span></a>
      </div>
    </section>
    ${nextProject(ctx, next)}
  </article>`;
  },
};
