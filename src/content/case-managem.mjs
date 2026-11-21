// ManaGEM case study — flagship page with its own layout (see `render`).
//
// Evidence rules for this file:
//  - Screenshots and flow videos are captured from the two supplied prototypes
//    (prototypes/managem.html and "ManaGem Take-On (Standalone).html") and show
//    demo / sample data, never client data.
//  - The opening film is the ManaGEM product film supplied in the repository.
//    Its promotional lines are GEMIS marketing, not results of this project.
//  - Problems are the seven items in the redesign brief. No research sessions,
//    quotes or metrics are claimed. Counts on the page are counts of what the
//    prototypes contain, not outcomes.
//  - Take-On is a designed prototype with development underway. Its AI
//    processing is simulated; its legal and security copy is prototype content.
//  - Anything unverified is left off the page and logged with todo(...).

import { esc, url, img, todo, button, status, icon } from '../shared.mjs';

const SRC_CORE = 'Core redesign prototype · demo data';
const SRC_TAKEON = 'Take-On prototype · sample data';
const TAKEON_FILE = 'ManaGem%20Take-On%20(Standalone).html';
const VID = 'assets/video/managem/';

// ------------------------------------------------------------ components

const glyph = {
  play: '<svg class="i i-play" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.2v9.6L13 8z" fill="currentColor"/></svg>',
  pause: '<svg class="i i-pause" viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 3h2.4v10H4.5zM9.1 3h2.4v10H9.1z" fill="currentColor"/></svg>',
  maze: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4zM4 9h7M15 4v7M9 14h11M9 14v6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  doc: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  bell: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  layers: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  inbox: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13l2.5-8h11L20 13v6H4zM4 13h5l1 2h4l1-2h5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
};

const full = (ctx, key) => url(ctx, `assets/images/${key}${key.endsWith('mg-sidebar') ? '' : '-1600'}.webp`);

/** A real product screenshot; every shot opens in the viewer. */
function shot(ctx, key, alt, { caption = '', source = SRC_CORE, sizes = '(min-width: 1264px) 1200px, 100vw', cls = '' } = {}) {
  const k = `managem/${key}`;
  return `<figure class="mx-shot${cls ? ` ${cls}` : ''}">
    <a class="zoom mx-frame" href="${full(ctx, k)}" data-zoom data-caption="${esc(caption || alt)}" aria-label="Enlarge: ${esc(alt)}">${img(ctx, k, alt, { sizes })}</a>
    <figcaption>${caption ? `<span>${esc(caption)}</span>` : ''}<span class="mx-src">${esc(source)}</span></figcaption>
  </figure>`;
}

/**
 * An autoplaying, muted, looping screen recording. Nothing downloads until it
 * nears the viewport (preload="none"); assets/js/main.js picks the small file
 * on phones and slow connections, pauses it off screen, and leaves it paused
 * for reduced-motion and data-saver users. Without JavaScript it shows native
 * controls. The pause button satisfies WCAG 2.2.2 for moving content.
 */
function video(ctx, name, label, { caption = '', source = SRC_CORE, big = '1280', small = '768', poster = `${name}-poster.webp`, w = 1280, h = 800, hero = false, cls = '' } = {}) {
  const src = (s) => url(ctx, `${VID}${name}-${s}.mp4`);
  return `<figure class="mx-video${hero ? ' mx-video--hero' : ''}${cls ? ` ${cls}` : ''}" data-video${hero ? ' data-video-eager' : ''}>
    <div class="mx-frame mx-video__frame">
      <video muted loop playsinline controls preload="none" width="${w}" height="${h}" poster="${url(ctx, VID + poster)}" aria-label="${esc(label)}">
        <source src="${src(small)}" type="video/mp4" media="(max-width: 767px)">
        <source src="${src(big)}" type="video/mp4">
      </video>
      <button class="mx-video__toggle" type="button" data-video-toggle aria-label="Play video" hidden>${glyph.play}${glyph.pause}</button>
    </div>
    <figcaption>${caption ? `<span>${esc(caption)}</span>` : ''}<span class="mx-src">${esc(source)}</span></figcaption>
  </figure>`;
}

const head = ({ id, n, label, title, intro = '', align = 'center' }) => `
  <header class="mx-head mx-head--${align}">
    <p class="mx-kicker"><span class="mx-kicker__n">${n}</span>${esc(label)}</p>
    <h2 class="mx-h2" id="${id}-h">${title}</h2>
    ${intro ? `<p class="mx-intro">${intro}</p>` : ''}
  </header>`;

const section = (id, body, mod = '', label = `${id}-h`) => `
  <section class="mx-sec${mod ? ` mx-sec--${mod}` : ''}" id="${id}" aria-labelledby="${label}"${/^core-|^key-/.test(id) ? '' : ' data-chapter'}>
    <div class="wrap">${body}</div>
  </section>`;

const note = (text) => `<p class="mx-note">${text}</p>`;
const ticks = (items) => `<ul class="mx-ticks" role="list">${items.map((d) => `<li>${d}</li>`).join('')}</ul>`;

/** A design decision as a feature tile: header, one big visual, four beats. */
function feature({ id, tag, title, lede, media, beats, shows }) {
  return `
    <article class="mx-feat" aria-labelledby="${id}-t">
      <header class="mx-feat__head">
        <p class="mx-feat__tag">${tag}</p>
        <h3 class="mx-feat__title" id="${id}-t">${title}</h3>
        <p class="mx-feat__lede">${lede}</p>
      </header>
      <div class="mx-feat__media">${media}</div>
      <dl class="mx-beats">${beats.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      ${shows ? `<p class="mx-shows"><span>Demonstrates</span> ${shows}</p>` : ''}
    </article>`;
}

// ----------------------------------------------------------------- hero

const hero = (ctx) => `
  <header class="mx-hero" aria-labelledby="mx-title">
    <div class="wrap mx-hero__text">
      <a class="back" href="${url(ctx, 'index.html#work')}">← Selected work</a>
      <p class="mx-eyebrow">Case study · Enterprise ERP · Product redesign</p>
      <h1 class="mx-title" id="mx-title">Reimagining ManaGEM</h1>
      <p class="mx-sub">Redesigning an established business management platform, simplifying complex workflows, and designing a more structured approach to client onboarding.</p>
      <div class="btn-row">
        ${button(ctx, { label: 'Read the case study', href: '#overview', variant: 'primary', ic: '' })}
        ${button(ctx, { label: 'Open the prototype', href: 'prototypes/managem.html', variant: 'secondary', ic: 'external', external: true })}
      </div>
    </div>
    <div class="wrap mx-hero__film">
      ${video(ctx, 'film', 'ManaGEM product film: the redesigned dashboard, navigation, stock, factory, debtors and invoicing screens', {
        caption: 'ManaGEM product film, featuring the redesigned interface. Its promotional lines are GEMIS marketing, not results of this project.',
        source: 'Product film',
        big: '1280',
        small: '640',
        poster: 'film-poster-1280.webp',
        w: 1280,
        h: 720,
        hero: true,
      })}
    </div>
  </header>`;

const chapters = [
  ['overview', 'Overview'],
  ['product', 'Product'],
  ['challenge', 'Challenge'],
  ['role', 'My role'],
  ['approach', 'Approach'],
  ['core', 'Core redesign'],
  ['takeon', 'Take-On'],
  ['decisions', 'UX decisions'],
  ['screens', 'Screens'],
  ['status', 'Status'],
  ['reflection', 'Reflection'],
];

// ------------------------------------------------------------- sections

const overview = (ctx) =>
  section(
    'overview',
    `
    ${head({ id: 'overview', n: '01', label: 'At a glance', title: 'A substantial redesign of a product that already existed.' })}
    <div class="mx-tldr">
      <article class="mx-card">
        <p class="mx-card__k">The product</p>
        <p>ManaGEM is a business management (ERP) platform by GEMIS. It grew from a template bought around 2015 into a system other businesses run on.</p>
      </article>
      <article class="mx-card">
        <p class="mx-card__k">The problem</p>
        <p>New clients found it hard to understand and navigate, and getting onto it depended on collecting and capturing their information by hand.</p>
      </article>
      <article class="mx-card mx-card--accent">
        <p class="mx-card__k">What I did</p>
        <p>Rethought the product screen by screen and workflow by workflow, redesigned the interface, and designed Take-On, an AI-assisted onboarding flow.</p>
      </article>
    </div>
    <dl class="mx-facts">
      <div><dt>My role</dt><dd>Product Design, UX/UI Design, Workflow Redesign</dd></div>
      <div><dt>Organisation</dt><dd>GEMIS</dd></div>
      <div><dt>Project</dt><dd>ERP product redesign and onboarding experience design</dd></div>
      <div><dt>Scope</dt><dd>Navigation, interface, workflows, and the Take-On prototype</dd></div>
      <div><dt>Status</dt><dd>${status('Core redesign: designed', 'live')}${status('Take-On: prototype complete, development underway', 'progress')}</dd></div>
    </dl>
    <ul class="mx-counts" role="list" aria-label="Scope of the design, counted from the prototypes">
      <li><strong>2</strong><span>connected initiatives</span></li>
      <li><strong>24</strong><span>navigation destinations, in 5 groups</span></li>
      <li><strong>6</strong><span>core design decisions</span></li>
      <li><strong>11</strong><span>steps in the onboarding flow</span></li>
    </ul>
    ${todo(ctx, 'ManaGEM: team, collaborators and project timeline', '— left off the page until they can be confirmed.')}`,
  );

const flowNodes = [
  ['Enquiry', 'A lead is captured and tracked.'],
  ['Quote', 'It is priced from the catalogue.'],
  ['Job', 'Accepted work becomes a project or build.'],
  ['Stock', 'Materials are bought, stored and dispatched.'],
  ['Invoice', 'Finished work is billed.'],
  ['Payment', 'Balances are followed up in debtors.'],
];

const product = () =>
  section(
    'product',
    `
    ${head({ id: 'product', n: '02', label: 'Understanding the product', title: 'One platform. Multiple connected business workflows.', intro: 'ManaGEM follows a piece of work from the first enquiry to the final payment. Every stage belongs to a different part of the business, but they all describe the same job.' })}
    <ol class="mx-chain" role="list" aria-label="How work moves through ManaGEM">
      ${flowNodes.map(([t, d], i) => `<li><span class="mx-chain__n">${String(i + 1).padStart(2, '0')}</span><strong>${t}</strong><span class="mx-chain__d">${d}</span></li>`).join('')}
    </ol>
    <div class="mx-shared">
      <p>Shared by every stage</p>
      <ul role="list"><li>Customers & contacts</li><li>Products & pricing</li><li>Staff</li><li>Reports</li><li>Sage accounting sync</li></ul>
    </div>
    <p class="mx-pull">A record created in one stage is read in the next. If it is hard to find or unclear in one place, the confusion travels down the chain.</p>`,
    'soft',
  );

const problems = [
  ['maze', 'Complexity', 'Difficult for new clients to understand and navigate, with features that added complication.'],
  ['doc', 'Operational clarity', 'Invoice-related information in particular did not consistently reflect as expected.'],
  ['bell', 'Limited feedback', 'Little visibility of messages and tasks, and no clear sign that a form had saved — so people saved twice.'],
  ['layers', 'Product consistency', 'The interface did not reflect GEMIS branding, and features needed more deliberate organisation.'],
];

const challenge = (ctx) =>
  section(
    'challenge',
    `
    ${head({ id: 'challenge', n: '03', label: 'The challenge', title: 'Not to make it look better. To make it easier to understand.' })}
    <ol class="mx-problems" role="list">
      ${problems.map(([g, t, d], i) => `<li class="mx-problem"><span class="mx-problem__icon">${glyph[g]}</span><p class="mx-problem__n">0${i + 1}</p><h3 class="mx-problem__t">${t}</h3><p>${d}</p></li>`).join('')}
      <li class="mx-problem mx-problem--wide"><span class="mx-problem__icon">${glyph.inbox}</span><p class="mx-problem__n">05 · Onboarding</p><h3 class="mx-problem__t">Getting started was manual</h3><p>New clients relied on manual information collection and entry before they could use the platform at all — a second opportunity, and the reason for Take-On.</p></li>
    </ol>
    ${note('These are the problems as set out in the redesign brief. No screenshots of the original interface were available, so they are described rather than shown, and no user research findings are claimed.')}
    ${todo(ctx, 'ManaGEM: screenshots of the original (pre-redesign) interface', '— needed for before-and-after comparisons. Neither supplied file contains the legacy UI.')}`,
    'band',
  );

const role = () =>
  section(
    'role',
    `
    ${head({ id: 'role', n: '04', label: 'My role and ownership', title: 'I owned the product experience: how it is organised, how it flows, and how it looks.' })}
    <p class="mx-statement">I took ownership of rethinking ManaGEM across its major screens and workflows — examining how existing functionality connected, where the experience created unnecessary complexity, and how the product could become easier to navigate, while keeping what the business depended on.</p>
    <div class="mx-own">
      <article class="mx-card">
        <p class="mx-card__k">What I did</p>
        ${ticks(['Rethought the product screen by screen and workflow by workflow', 'Redesigned the overall interface', 'Reconsidered how existing functions connect', 'Kept working features and improved how they are used', 'Simplified unnecessarily complicated areas', 'Made product experience and workflow decisions', 'Designed the Take-On onboarding experience end to end'])}
      </article>
      <article class="mx-card mx-card--quiet">
        <p class="mx-card__k">Outside my role</p>
        <ul class="mx-crosses" role="list"><li>Backend development</li><li>Database changes</li><li>AI models and extraction logic</li><li>Technical integrations</li></ul>
      </article>
    </div>`,
  );

const briefMap = [
  ['Hard for new clients to navigate', 'A', 'Grouped navigation'],
  ['Invoice information not reflecting as expected', 'B', 'Readable records and visible state'],
  ['Little visibility of messages and tasks', 'C', 'Operational visibility'],
  ['No clear confirmation that a form saved', 'D', 'Form feedback'],
  ['Interface did not reflect GEMIS branding', 'E', 'One product language'],
  ['Unnecessary features adding complexity', 'F', 'Simplifying'],
  ['Onboarding depended on manual capture', '→', 'ManaGEM Take-On'],
];

const approach = () =>
  section(
    'approach',
    `
    ${head({ id: 'approach', n: '05', label: 'Understanding the existing system', title: 'Before changing how it looked, I worked out how it fitted together.', intro: 'Product and workflow analysis of the existing system against the brief — not formal user research.' })}
    <ol class="mx-steps" role="list">
      <li><span>1</span><h3>Inventory</h3><p>List every function the business relies on, so nothing that works is lost.</p></li>
      <li><span>2</span><h3>Relationships</h3><p>Trace how a record moves: enquiry to quote, job to invoice, invoice to accounting.</p></li>
      <li><span>3</span><h3>Friction</h3><p>Find where each problem in the brief actually shows up in the product.</p></li>
    </ol>
    <div class="mx-map" role="table" aria-label="Each problem in the brief and the design response">
      <div class="mx-map__row mx-map__row--head" role="row"><span role="columnheader">Problem in the brief</span><span role="columnheader">Design response</span></div>
      ${briefMap
        .map(([p, l, r]) => `<div class="mx-map__row" role="row"><span role="cell">${p}</span><span role="cell"><a href="#${l === '→' ? 'takeon' : `core-${l}`}"><b class="mx-map__tag">${l}</b>${r}</a></span></div>`)
        .join('')}
    </div>`,
    'soft',
  );

const navGroups = [['Core', 1], ['Customers', 3], ['Sales', 10], ['Operations', 5], ['Admin', 5]];

const coreIntro = () =>
  section(
    'core',
    `
    <div class="mx-part">
      <p class="mx-part__n">Initiative 01</p>
      <h2 class="mx-part__name" id="core-h">ManaGEM Core Experience</h2>
      <p class="mx-part__desc">The redesign of the established ERP: its navigation, how it presents information, and its workflows. Six decisions, A to F.</p>
      <ol class="mx-jump" role="list">${['Navigation', 'Information', 'Visibility', 'Form feedback', 'Consistency', 'Simplifying'].map((t, i) => `<li><a href="#core-${'ABCDEF'[i]}"><b>${'ABCDEF'[i]}</b>${t}</a></li>`).join('')}</ol>
    </div>`,
  );

const coreDecisions = (ctx) =>
  [
    section(
      'core-A',
      feature({
        id: 'core-A',
        tag: 'A · Navigation',
        title: 'A more coherent navigation experience',
        lede: 'Twenty-four destinations, organised by the part of the business they serve.',
        media: `${video(ctx, 'flow-navigation', 'Moving through the redesigned sidebar from the dashboard to Open Enquiries, Invoices, Debtors, Factory and Stock Control', { caption: 'Moving between connected modules from one grouped sidebar.' })}
          <ul class="mx-groups" role="list" aria-label="Navigation groups">${navGroups.map(([g, n]) => `<li><strong>${g}</strong><span>${n}</span></li>`).join('')}</ul>`,
        beats: [
          ['Problem', 'New clients had to learn many destinations before the product was useful.'],
          ['Why it mattered', 'If people cannot tell where a task lives, every other improvement stays hidden.'],
          ['Decision', 'Group navigation by business area, and always show where the user is.'],
          ['In the interface', 'Five labelled groups, a breadcrumb on every page, top-bar search, and counts on items with open work.'],
        ],
        shows: 'Information architecture',
      }),
      'soft',
      'core-A-t',
    ),
    section(
      'core-B',
      feature({
        id: 'core-B',
        tag: 'B · Information',
        title: 'Making important information easier to understand',
        lede: 'Totals first, then the state of every record in plain words.',
        media: `<div class="mx-duo">
          ${shot(ctx, 'mg-invoices', 'Invoices list with four summary totals above a table where each invoice has a plain-word status', { caption: 'Invoices: billed, paid, outstanding and overdue, then a status on every row.', sizes: '(min-width: 1264px) 600px, 100vw' })}
          ${shot(ctx, 'mg-sage-invoices', 'Sage Invoices screen with synced, pending and error counts and a last-sync time per invoice', { caption: 'Accounting sync: Synced, Pending or Error, and when it last ran.', sizes: '(min-width: 1264px) 600px, 100vw' })}
        </div>`,
        beats: [
          ['Problem', 'Records are dense, and invoice information did not always reflect as expected.'],
          ['Why it mattered', 'People act on what a screen tells them. An unclear invoice means a wrong or late follow-up.'],
          ['Decision', 'One list anatomy everywhere: summary totals, filters, then a plain-word status per row.'],
          ['In the interface', 'Paid, Partial, Unpaid, Overdue on invoices; sync state per invoice in the accounting view.'],
        ],
        shows: 'Data-heavy UI design',
      }),
      '',
      'core-B-t',
    ),
    section(
      'core-C',
      feature({
        id: 'core-C',
        tag: 'C · Visibility',
        title: 'Improving operational visibility',
        lede: 'What needs attention is brought to where people already look.',
        media: `<div class="mx-duo">
          ${shot(ctx, 'mg-dashboard', 'Dashboard with a messages banner above four headline figures, charts and current projects', { caption: 'A messages banner sits at the top of the dashboard.', sizes: '(min-width: 1264px) 600px, 100vw' })}
          ${shot(ctx, 'mg-stock-alerts', 'Stock Control with recent movements, open purchase orders and a low stock alerts panel', { caption: 'Low stock and open orders sit beside day-to-day activity.', sizes: '(min-width: 1264px) 600px, 100vw' })}
        </div>${note('This is the design direction for surfacing attention. Specific notification behaviour is not claimed as implemented.')}`,
        beats: [
          ['Problem', 'Little visibility of messages, notifications and tasks needing attention.'],
          ['Why it mattered', 'Unnoticed work does not get done — and one missed item delays the next stage.'],
          ['Decision', 'Surface attention in the dashboard, top bar, navigation and module panels.'],
          ['In the interface', 'A messages banner, a notification indicator, navigation counts and low-stock alerts.'],
        ],
        shows: 'Systems thinking',
      }),
      'soft',
      'core-C-t',
    ),
    section(
      'core-D',
      feature({
        id: 'core-D',
        tag: 'D · Form feedback',
        title: 'Clearer form feedback',
        lede: 'Visible progress, one review, and one final action.',
        media: `${video(ctx, 'flow-enquiry', 'Filling in the four-step New Enquiry form, reviewing it, and pressing Create Enquiry, which returns to the enquiry list', { caption: 'New Enquiry: four steps, a review of everything entered, then a single commit.' })}
          ${todo(ctx, 'ManaGEM: designed save-confirmation states (saving, saved, error)', '— the prototype shows review-then-commit but has no explicit saved/toast state, so none is shown.')}`,
        beats: [
          ['Problem', 'Forms did not make it clear that information had saved, so users clicked save again.'],
          ['Why it mattered', 'Repeated saves can create duplicate actions, and doubt erodes trust in the system.'],
          ['Decision', 'Make the moment of commitment unmistakable instead of hiding it in a long form.'],
          ['In the interface', 'A four-step stepper, a review screen, one Create Enquiry button, then the enquiry list.'],
        ],
        shows: 'Interaction design',
      }),
      '',
      'core-D-t',
    ),
    section(
      'core-E',
      feature({
        id: 'core-E',
        tag: 'E · Consistency',
        title: 'A more consistent product language',
        lede: 'The GEMIS identity in the shell, and one page anatomy in every module.',
        media: `<div class="mx-trio">
          ${shot(ctx, 'mg-login', 'ManaGEM sign-in screen carrying the GemIS mark and the line Run your business with clarity', { caption: 'Sign-in', sizes: '(min-width: 1264px) 800px, 100vw', cls: 'mx-trio__main' })}
          ${shot(ctx, 'mg-factory', 'Factory module with summary figures and a production pipeline', { caption: 'Factory', sizes: '(min-width: 1264px) 400px, 50vw' })}
          ${shot(ctx, 'mg-staff', 'Staff Members list with the same tabs, filters and table pattern', { caption: 'Staff Records', sizes: '(min-width: 1264px) 400px, 50vw' })}
        </div>`,
        beats: [
          ['Problem', 'The interface did not reflect GEMIS branding or read as one system.'],
          ['Why it mattered', 'Consistency lets people reuse what they learned on one screen everywhere else.'],
          ['Decision', 'Carry the GEMIS identity through the shell; build modules from a small set of parts.'],
          ['In the interface', 'A branded sign-in and sidebar; title, summary, tabs, filters and table in every module.'],
        ],
        shows: 'UI craft',
      }),
      'soft',
      'core-E-t',
    ),
    section(
      'core-F',
      feature({
        id: 'core-F',
        tag: 'F · Simplifying',
        title: 'Simplifying the experience',
        lede: 'Reorganise before removing: related functions live together.',
        media: `${shot(ctx, 'mg-stock', 'Stock Control with twelve related areas arranged as tabs across one module', { caption: 'Stock Control: suppliers, orders, stores, movements and stock takes as tabs in one module.' })}${note('Described as reorganisation. No claim is made that specific features were removed.')}`,
        beats: [
          ['Problem', 'Unnecessary features and scattered functions made the system more complicated.'],
          ['Why it mattered', 'Complexity that does not serve a task is a cost paid on every visit.'],
          ['Decision', 'Keep what the business depends on, and put related functions together.'],
          ['In the interface', 'Module tabs instead of separate destinations, and dashboard shortcuts to common tasks.'],
        ],
        shows: 'Product judgement',
      }),
      '',
      'core-F-t',
    ),
  ].join('');

const phases = [
  ['Prepare', [['01', 'Welcome'], ['02', 'Trust & compliance'], ['03', 'Company profile']]],
  ['Provide', [['04', 'Document upload']]],
  ['Process', [['05', 'AI extraction'], ['06', 'Validation summary']]],
  ['Review', [['07', 'Customers'], ['08', 'Products'], ['09', 'Staff']]],
  ['Submit', [['10', 'Confirm & submit'], ['11', 'Complete · GEMIS check']]],
];

const journey = [
  ['to-01-welcome', 'Welcome', 'Take-On welcome screen describing upload, AI structuring, review and the GEMIS check'],
  ['to-02-trust', 'Trust & compliance', 'Trust and compliance screen with plain-language data-handling summaries'],
  ['to-03-profile', 'Company profile', 'Company profile form with registered name, contact details and industry'],
  ['to-04-upload', 'Document upload', 'Upload screen with separate areas for customers, products, staff and suppliers'],
  ['to-05-extraction', 'AI extraction', 'Extraction screen with running counts and an extraction log'],
  ['to-06-validation', 'Validation summary', 'Validation summary with record counts and a confidence breakdown'],
  ['to-07-customers', 'Customer review', 'Customer review table with a status on every record'],
  ['to-08-products', 'Product review', 'Product and pricing review table'],
  ['to-09-staff', 'Staff review', 'Staff review table'],
  ['to-10-confirm', 'Confirm & submit', 'Final confirmation with readiness, totals and issues to fix'],
  ['to-11-complete', 'Complete', 'Completion screen confirming the submission was sent for GEMIS review'],
];

const takeon = (ctx) =>
  section(
    'takeon',
    `
    <div class="mx-part">
      <p class="mx-part__n">Initiative 02</p>
      <h2 class="mx-part__name" id="takeon-h">ManaGEM Take-On</h2>
      <p class="mx-part__desc">From manual information capture to a guided onboarding experience: upload what you have, review what the system extracted, and hand over to GEMIS for a final check.</p>
      <p class="mx-part__status">${status('Designed prototype · development underway', 'progress')}</p>
    </div>
    ${video(ctx, 'flow-takeon-upload', 'Uploading a customer list, price lists, staff and supplier files, running the extraction, and arriving at the validation summary', { caption: 'Upload, processing and validation summary. The processing in the prototype is simulated.', source: SRC_TAKEON })}
    <h3 class="mx-subh">Eleven steps, five phases</h3>
    <ol class="mx-phases" role="list">
      ${phases.map(([p, steps]) => `<li><p class="mx-phases__p">${p}</p><ol role="list">${steps.map(([n, t]) => `<li><span>${n}</span>${t}</li>`).join('')}</ol></li>`).join('')}
    </ol>
    <div class="mx-railbar">
      <p class="mx-railhint" id="rail-hint">Every screen, in order — scroll sideways or use the arrows; select a screen to enlarge it.</p>
      <div class="mx-railbtns">
        <button type="button" data-rail-prev aria-label="Previous screen" aria-controls="takeon-rail">${icon.arrow}</button>
        <button type="button" data-rail-next aria-label="Next screen" aria-controls="takeon-rail">${icon.arrow}</button>
      </div>
    </div>
    <ol class="mx-rail" id="takeon-rail" role="list" tabindex="0" aria-labelledby="rail-hint" data-rail>
      ${journey.map(([key, t, alt], i) => `<li class="mx-rail__item"><p class="mx-rail__t"><span>${String(i + 1).padStart(2, '0')}</span>${t}</p>${shot(ctx, key, alt, { source: SRC_TAKEON, sizes: '(min-width: 900px) 560px, 80vw' })}</li>`).join('')}
    </ol>
    <div class="mx-caveats">
      <h3 class="mx-subh">Reading these screens correctly</h3>
      <ul role="list">
        <li><strong>A prototype</strong>The UX/UI design is complete and development is underway. Not a released feature.</li>
        <li><strong>Simulated processing</strong>Extraction, confidence scores and timings are designed states, not live AI output or measured results.</li>
        <li><strong>Sample records</strong>Companies, customers, products and staff are placeholder data.</li>
        <li><strong>Draft legal wording</strong>POPIA, encryption and audit statements show where that content belongs; they still need technical and legal validation.</li>
      </ul>
    </div>`,
    'band',
  );

const decisionsIntro = () =>
  section(
    'decisions',
    `${head({ id: 'decisions', n: '08', label: 'Key UX decisions', title: 'Five decisions about how much to trust automation — and how to show it.', intro: 'AI-assisted extraction is never treated as infallible. People should be able to understand, inspect and correct information before it is submitted.' })}
    <ol class="mx-jump mx-jump--light" role="list">${['Flexible upload', 'Transparent processing', 'Confidence', 'Human review', 'GEMIS verification'].map((t, i) => `<li><a href="#key-${i + 1}"><b>0${i + 1}</b>${t}</a></li>`).join('')}</ol>`,
  );

const keyDecisions = (ctx) =>
  [
    ['1', 'Flexible document onboarding', 'Clients upload what they already hold instead of retyping it record by record.',
      shot(ctx, 'to-04-upload', 'Upload screen with files added to the customer and product areas, each marked encrypted and scanned', { caption: 'One area per category, each file’s state shown on the file itself.', source: SRC_TAKEON }),
      [['Why', 'Retyping every record is the manual work the brief set out to reduce.'], ['Design', 'One drop area per category, with required ones marked.'], ['Detail', 'Accepted formats stated on every area: PDF, XLSX, CSV, DOCX, JPG, PNG.'], ['Fallback', 'No document? Each category can be typed in manually.']]],
    ['2', 'Transparent processing', 'The system says what it is doing while it does it.',
      shot(ctx, 'to-05-extraction', 'Extraction screen with running counts above an extraction log and an audit activity list', { caption: 'Processing explained in words. In the prototype this step is simulated.', source: SRC_TAKEON }),
      [['Why', 'A spinner asks for trust in something people cannot see.'], ['Design', 'A running log names each document as it is read.'], ['Detail', 'Counts of customers, products, staff and flagged records update live.'], ['Record', 'An activity list logs each stage with a time.']]],
    ['3', 'Confidence-based validation', 'Effort goes to the records that need it.',
      `<div class="mx-duo">${shot(ctx, 'to-06-validation', 'Validation summary with record counts, validation results and a confidence breakdown', { caption: 'A summary sets expectations before the detail.', source: SRC_TAKEON, sizes: '(min-width: 1264px) 600px, 100vw' })}${shot(ctx, 'to-07-customers', 'Customer review table with a status on every row and filters for needs review, duplicates and verified', { caption: 'Every row carries its state; filters isolate what needs a decision.', source: SRC_TAKEON, sizes: '(min-width: 1264px) 600px, 100vw' })}</div>`,
      [['Why', 'Equal care on every record is slow, and people stop reading.'], ['Design', 'Four states: Verified, Needs review, Possible duplicate, Low confidence.'], ['Detail', 'Each state uses a word and an icon, never colour alone.'], ['Speed', 'Filters jump straight to what needs a decision.']]],
    ['4', 'Human-in-the-loop review', 'An extracted record is a suggestion until the client agrees with it.',
      video(ctx, 'flow-takeon-review', 'Filtering the customer review table, opening a record with a missing email, then resolving a possible duplicate by merging it', { caption: 'Filter, inspect the evidence behind a record, then resolve a duplicate.', source: SRC_TAKEON }),
      [['Why', 'Only someone who knows the business can confirm what the system read.'], ['Evidence', 'Source document, original text and a confidence score on every record.'], ['Gaps', 'Missing fields are called out: “Email not found in source document”.'], ['Control', 'Edit, confirm or reject; for duplicates, merge, keep both or discard.']]],
    ['5', 'GEMIS verification', 'Submitting hands over to a person — it does not make data live.',
      video(ctx, 'flow-takeon-submit', 'Reviewing outstanding issues, confirming the declaration, submitting for GEMIS review, then viewing the GEMIS take-on queue', { caption: 'Outstanding issues, the declaration, submission, and the GEMIS queue.', source: SRC_TAKEON }),
      [['Why', 'Automation does not remove the need for oversight.'], ['Design', 'Outstanding issues are listed before the client submits.'], ['Wording', 'The last screen says “Submitted for GEMIS review”, not “Done”.'], ['Other side', 'A GEMIS queue shows each company’s progress and sign-offs.']]],
  ]
    .map(([n, title, lede, media, beats], i) =>
      section(`key-${n}`, feature({ id: `key-${n}`, tag: `0${n} · Take-On`, title, lede, media, beats }), i % 2 ? '' : 'soft', `key-${n}-t`),
    )
    .join('');

const gallery = [
  ['mg-open-enquiries', 'Open Enquiries — the sales pipeline with counts per stage.', 'Open Enquiries list with stage counts, filters and a table of leads', 'wide', SRC_CORE],
  ['mg-projects', 'Projects — current jobs with foreman, dates and progress.', 'Current Jobs list with progress bars', '', SRC_CORE],
  ['mg-debtors', 'Debtors — balances and ageing by customer.', 'Debtors Management with outstanding totals and ageing', '', SRC_CORE],
  ['mg-products', 'Products & Pricing — the catalogue.', 'Products and Pricing catalogue table', '', SRC_CORE],
  ['mg-warranties', 'Warranties — maintenance due and overdue.', 'Warranties list with maintenance status', '', SRC_CORE],
  ['mg-reports', 'Reports — one report at a time, with its parameters.', 'Quotes report with report types, parameters and results', 'wide', SRC_CORE],
  ['to-07-duplicate', 'Take-On — a possible duplicate, explained.', 'Take-On review panel for a possible duplicate with merge options', '', SRC_TAKEON],
  ['to-12-admin', 'Take-On — the GEMIS take-on queue.', 'GEMIS admin queue of companies awaiting sign-off', '', SRC_TAKEON],
];

const screens = (ctx) =>
  section(
    'screens',
    `
    ${head({ id: 'screens', n: '09', label: 'Final product experience', title: 'More of the product, at a size you can read.', intro: 'Select any screen to open it full size.' })}
    <div class="mx-gallery">
      ${gallery.map(([k, c, a, size, src]) => shot(ctx, k, a, { caption: c, source: src, cls: size ? 'mx-gallery__wide' : '', sizes: size ? '(min-width: 1264px) 1200px, 100vw' : '(min-width: 834px) 590px, 100vw' })).join('')}
    </div>
    <div class="btn-row mx-center">
      ${button(ctx, { label: 'Open the core redesign prototype', href: 'prototypes/managem.html', variant: 'primary', ic: 'external', external: true })}
      ${button(ctx, { label: 'Open the Take-On prototype', href: TAKEON_FILE, variant: 'secondary', ic: 'external', external: true })}
    </div>
    <p class="mx-fine">Both prototypes are built for desktop screens and use demo data.</p>`,
    'soft',
  );

const statusSection = (ctx) =>
  section(
    'status',
    `
    ${head({ id: 'status', n: '10', label: 'Outcome and implementation status', title: 'What exists today, stated precisely.' })}
    <div class="mx-status">
      <article class="mx-card">
        <p class="mx-card__k">01 · Core ManaGEM redesign</p>
        <p class="mx-status__state">${status('Design complete', 'live')}</p>
        <p>Designed across dashboard, customers, sales, invoicing, debtors, products, projects, factory, stock and staff, and delivered as an interactive prototype. No claim is made about how much is in production.</p>
      </article>
      <article class="mx-card">
        <p class="mx-card__k">02 · ManaGEM Take-On</p>
        <p class="mx-status__state">${status('Prototype complete · development underway', 'progress')}</p>
        <p>The Take-On UX/UI prototype has been completed, and development is underway. The AI processing is simulated; it is not described as live, and clients are not presented as using it.</p>
      </article>
    </div>
    <p class="mx-unclaimed"><strong>Not claimed:</strong> reduced onboarding time, eliminated manual work, or any change in revenue, conversion or productivity. No user testing is claimed.</p>
    ${todo(ctx, 'ManaGEM: which parts of the core redesign are in production', '— the page says "design complete" and makes no production claim.')}
    ${todo(ctx, 'ManaGEM: confirm the sample company name in the Take-On prototype ("SBS Waterproofing") may be shown publicly', '— it appears in the Take-On screenshots and videos as sample data.')}
    ${todo(ctx, 'ManaGEM: confirm who produced the product film and that it may be shown in the portfolio', '— used as the opening visual, captioned as the product film.')}`,
  );

const reflection = () =>
  section(
    'reflection',
    `
    ${head({ id: 'reflection', n: '11', label: 'Reflection', title: 'What this project changed about how I work.' })}
    <div class="mx-reflect">
      <p class="mx-statement">The most useful thing I did on ManaGEM happened before I designed anything: working out what each screen was for, and what it was connected to.</p>
      <div class="mx-lessons">
        <article><h3>Screens are never only screens</h3><p>The enquiry form decides what the pipeline can show; the invoice list is only as clear as its status. Navigation, data, forms and feedback kept turning out to be one problem.</p></article>
        <article><h3>Keeping is harder than replacing</h3><p>Preserving what worked meant understanding why a function existed before deciding where it belonged — often the answer was to move it, not redesign it.</p></article>
        <article><h3>Design around the automation</h3><p>The interesting work in Take-On was not extraction. It was showing what the system did, admitting what it was unsure of, and keeping a person responsible.</p></article>
        <article><h3>Next: evidence</h3><p>These decisions are reasoned from the brief and the product. The honest next step is to watch new clients use them.</p></article>
      </div>
    </div>`,
    'soft',
  );

export default {
  slug: 'managem',
  /** Custom layout — used by renderCase instead of the generic template. */
  render(ctx, { next }) {
    return `
  <article class="case mx">
    ${hero(ctx)}
    <nav class="mx-chapters" aria-label="Case study sections" data-chapters>
      <div class="wrap">
        <p class="mx-chapters__name" aria-hidden="true">ManaGEM</p>
        <ol role="list">${chapters.map(([id, label]) => `<li><a href="#${id}">${label}</a></li>`).join('')}</ol>
        <a class="btn btn--primary mx-chapters__cta" href="${url(ctx, 'prototypes/managem.html')}" target="_blank" rel="noopener">Prototype<span class="sr-only"> (opens in a new tab)</span></a>
      </div>
      <span class="mx-progress" aria-hidden="true" data-progress></span>
    </nav>
    ${overview(ctx)}
    ${product(ctx)}
    ${challenge(ctx)}
    ${role(ctx)}
    ${approach(ctx)}
    ${coreIntro(ctx)}
    ${coreDecisions(ctx)}
    ${takeon(ctx)}
    ${decisionsIntro(ctx)}
    ${keyDecisions(ctx)}
    ${screens(ctx)}
    ${statusSection(ctx)}
    ${reflection(ctx)}
    <nav class="mx-next" aria-label="Next case study">
      <div class="wrap">
        <a class="mx-next__link" href="${url(ctx, `work/${next.slug}/`)}">
          <span class="mx-next__label">Next project</span>
          <span class="mx-next__name">${esc(next.name)}</span>
          <span class="mx-next__sum">${esc(next.title)}</span>
          <span class="mx-next__btn"><span>View case study</span>${icon.arrow}</span>
        </a>
      </div>
    </nav>
  </article>`;
  },
};
