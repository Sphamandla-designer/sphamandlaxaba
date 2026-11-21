// ManaGEM — the full case study (work/managem/full/).
// The optional, in-depth reading for design leads: product context, workflow
// analysis, every decision with its reasoning, the whole Take-On journey and
// additional screens. Evidence rules are documented in managem-parts.mjs.

import { esc, url, todo, button, status, icon } from '../shared.mjs';
import { projects } from './projects.mjs';
import {
  SRC_CORE, SRC_TAKEON, TAKEON_FILE, QUICK, glyph,
  shot, video, head, section, note, ticks, chapterNav, feature, nextProject,
} from './managem-parts.mjs';

const chapters = [
  ['context', 'Context'],
  ['challenges', 'Challenges'],
  ['role', 'Role'],
  ['system', 'Existing system'],
  ['workflow', 'Navigation'],
  ['core', 'Core redesign'],
  ['decisions', 'UX decisions'],
  ['takeon', 'Take-On'],
  ['screens', 'Screens'],
  ['status', 'Status'],
  ['reflection', 'Reflection'],
];

// ------------------------------------------------------------------- hero

const hero = (ctx) => `
  <header class="mf-hero" aria-labelledby="mf-title">
    <div class="wrap">
      <a class="mf-back" href="${url(ctx, QUICK)}">${glyph.back}<span>Back to the overview</span></a>
      <div class="mf-hero__grid">
        <div class="mf-hero__text">
          <p class="mx-eyebrow">Full case study · about 8 minutes</p>
          <h1 class="mf-title" id="mf-title">ManaGEM, in depth</h1>
          <p class="mf-sub">The product context, workflow analysis, design reasoning and complete Take-On journey behind the ManaGEM redesign.</p>
        </div>
        <ol class="mf-contents" role="list" aria-label="Contents">
          ${chapters.map(([id, label], i) => `<li><a href="#${id}"><span>${String(i + 1).padStart(2, '0')}</span>${label}</a></li>`).join('')}
        </ol>
      </div>
    </div>
  </header>`;

// ------------------------------------------------------------- 1 context

const flowNodes = [
  ['Enquiry', 'A lead is captured and tracked.'],
  ['Quote', 'It is priced from the catalogue.'],
  ['Job', 'Accepted work becomes a project or a factory build.'],
  ['Stock', 'Materials are bought, stored and dispatched.'],
  ['Invoice', 'Finished work is billed and synced to accounting.'],
  ['Payment', 'Balances are followed up in debtors.'],
];

const context = () =>
  section(
    'context',
    `
    ${head({ id: 'context', n: '01', label: 'Product context', title: 'One platform. Multiple connected business workflows.', intro: 'ManaGEM is an established business management (ERP) platform by GEMIS. It began with a template bought around 2015 and grew into a system other businesses run on. This project redesigned that existing product — it did not build a new ERP.' })}
    <ol class="mx-chain" role="list" aria-label="How work moves through ManaGEM">
      ${flowNodes.map(([t, d], i) => `<li><span class="mx-chain__n">${String(i + 1).padStart(2, '0')}</span><strong>${t}</strong><span class="mx-chain__d">${d}</span></li>`).join('')}
    </ol>
    <div class="mx-shared">
      <p>Shared by every stage</p>
      <ul role="list"><li>Customers & contacts</li><li>Products & pricing</li><li>Staff</li><li>Reports</li><li>Sage accounting sync</li></ul>
    </div>
    <p class="mx-pull">A record created in one stage is read in the next. If it is hard to find or unclear in one place, the confusion travels down the chain — which is why this is an information-architecture problem before it is a visual one.</p>
    <ul class="mx-counts" role="list" aria-label="Scope of the design, counted from the prototypes">
      <li><strong>2</strong><span>connected initiatives</span></li>
      <li><strong>24</strong><span>navigation destinations, in 5 groups</span></li>
      <li><strong>6</strong><span>core design decisions</span></li>
      <li><strong>11</strong><span>steps in the onboarding flow</span></li>
    </ul>`,
    { mod: 'soft' },
  );

// ---------------------------------------------------------- 2 challenges

const problems = [
  ['maze', 'Complexity', 'The system was difficult for new clients to understand and navigate, and it carried unnecessary features that made it more complicated than it needed to be.'],
  ['doc', 'Operational clarity', 'Certain information — invoice-related data in particular — did not consistently reflect as users expected.'],
  ['bell', 'Interaction feedback', 'Users had little visibility of messages, notifications and tasks needing attention. Forms did not clearly confirm a save, so people clicked save again and risked duplicate actions.'],
  ['layers', 'Product consistency', 'The interface did not adequately reflect GEMIS branding, and features needed a more deliberate organisation.'],
];

const challenges = (ctx) =>
  section(
    'challenges',
    `
    ${head({ id: 'challenges', n: '02', label: 'Existing product challenges', title: 'Not to make it look better. To make it easier to understand.' })}
    <ol class="mx-problems" role="list">
      ${problems.map(([g, t, d], i) => `<li class="mx-problem"><span class="mx-problem__icon">${glyph[g]}</span><p class="mx-problem__n">0${i + 1}</p><h3 class="mx-problem__t">${t}</h3><p>${d}</p></li>`).join('')}
      <li class="mx-problem mx-problem--wide"><span class="mx-problem__icon">${glyph.inbox}</span><p class="mx-problem__n">05 · Onboarding</p><h3 class="mx-problem__t">Getting started was manual</h3><p>New clients relied heavily on manual information collection and entry before they could use the platform at all — a second opportunity, and the reason for Take-On.</p></li>
    </ol>
    ${note('These are the problems as set out in the redesign brief. No screenshots of the original interface were available, so they are described rather than shown, and no user research findings are claimed.')}
    ${todo(ctx, 'ManaGEM: screenshots of the original (pre-redesign) interface', '— needed for before-and-after comparisons. Neither supplied file contains the legacy UI.')}`,
    { mod: 'band' },
  );

// ---------------------------------------------------------------- 3 role

const role = (ctx) =>
  section(
    'role',
    `
    ${head({ id: 'role', n: '03', label: 'My role and ownership', title: 'I owned the product experience: how it is organised, how it flows, and how it looks.' })}
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
    </div>
    ${todo(ctx, 'ManaGEM: team, collaborators and project timeline', '— left off both pages until they can be confirmed.')}`,
  );

// ------------------------------------------------------- 4 existing system

const briefMap = [
  ['Hard for new clients to navigate', 'A', 'Grouped navigation'],
  ['Invoice information not reflecting as expected', 'B', 'Readable records and visible state'],
  ['Little visibility of messages and tasks', 'C', 'Operational visibility'],
  ['No clear confirmation that a form saved', 'D', 'Form feedback'],
  ['Interface did not reflect GEMIS branding', 'E', 'One product language'],
  ['Unnecessary features adding complexity', 'F', 'Simplifying'],
  ['Onboarding depended on manual capture', '→', 'ManaGEM Take-On'],
];

const system = () =>
  section(
    'system',
    `
    ${head({ id: 'system', n: '04', label: 'Understanding the existing system', title: 'Before changing how it looked, I worked out how it fitted together.', intro: 'Product and workflow analysis of the existing system against the brief — not formal user research, and not presented as such.' })}
    <ol class="mx-steps" role="list">
      <li><span>1</span><h3>Inventory</h3><p>List every function the business relies on, so nothing that works is lost in the redesign.</p></li>
      <li><span>2</span><h3>Relationships</h3><p>Trace how a record moves: enquiry to quote, job to invoice, invoice to accounting.</p></li>
      <li><span>3</span><h3>Friction</h3><p>Find where each problem in the brief actually shows up in the product.</p></li>
    </ol>
    <div class="mx-map" role="table" aria-label="Each problem in the brief and the design response">
      <div class="mx-map__row mx-map__row--head" role="row"><span role="columnheader">Problem in the brief</span><span role="columnheader">Design response</span></div>
      ${briefMap
        .map(([p, l, r]) => `<div class="mx-map__row" role="row"><span role="cell">${p}</span><span role="cell"><a href="#${l === '→' ? 'takeon' : `core-${l}`}"><b class="mx-map__tag">${l}</b>${r}</a></span></div>`)
        .join('')}
    </div>`,
    { mod: 'soft' },
  );

// ------------------------------------------------ 5 workflow & navigation

const navGroups = [
  ['Core', ['Dashboard']],
  ['Customers', ['Customers', 'Customer Contacts', 'Warranties']],
  ['Sales', ['New Enquiry', 'Open Enquiries', 'Closed Enquiries', 'Invoices', 'Sage Invoices', 'Inspection Reports', 'Sales Targets', 'Quote Templates', 'Reports', 'Master Data']],
  ['Operations', ['Debtors Management', 'Products & Pricing', 'Projects Module', 'Factory', 'Stock Control']],
  ['Admin', ['Staff Records', 'My Companies', 'Manage Users', 'Master Data', 'Settings']],
];

const workflow = (ctx) =>
  section(
    'workflow',
    `
    ${head({ id: 'workflow', n: '05', label: 'Workflow and navigation', title: 'Navigation that follows the business, not the database.', intro: 'With twenty-four destinations, the structure of the navigation is the first thing a new client learns. I grouped them by the part of the business they serve and gave every screen the same three ways to orient.' })}
    ${video(ctx, 'flow-navigation', 'Moving through the redesigned sidebar from the dashboard to Open Enquiries, Invoices, Debtors, Factory and Stock Control', { caption: 'Moving between connected modules from one grouped sidebar.' })}
    <div class="mf-ia">
      ${shot(ctx, 'mg-sidebar', 'The complete redesigned sidebar with five labelled groups', { caption: 'The full sidebar.', sizes: '240px', cls: 'mf-ia__bar' })}
      <div class="mf-ia__groups" aria-label="Every destination, by group">
        ${navGroups.map(([g, items]) => `<div><p class="mf-ia__g">${g}<span>${items.length}</span></p><ul role="list">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></div>`).join('')}
      </div>
      <div class="mf-ia__aids">
        <p class="mx-card__k">On every screen</p>
        <dl>
          <div><dt>Breadcrumb</dt><dd>Shows where the screen sits — Home, then the group, then the page.</dd></div>
          <div><dt>Search</dt><dd>One search field in the top bar, so nothing depends on remembering the menu.</dd></div>
          <div><dt>Counts</dt><dd>Items with open work carry a count, such as open enquiries and factory jobs.</dd></div>
        </dl>
      </div>
    </div>`,
  );

// ----------------------------------------------------- 6 core redesign

const anatomy = [
  [14.6, 49.2, 'Grouped navigation', 'Five labelled groups; the current page is highlighted.'],
  [61, 3.2, 'Search and orientation', 'Top-bar search and a breadcrumb on every screen.'],
  [31.5, 10.6, 'Title and summary line', 'What the list is, and its most important figure in words.'],
  [90.5, 10.8, 'One primary action', 'The main thing to do on this screen, always in the same place.'],
  [37.5, 17.5, 'Summary totals first', 'Billed, paid, outstanding and overdue before any rows.'],
  [62.5, 32.5, 'Filters and export', 'Removable filter chips, a date range, and CSV, Excel or PDF.'],
  [91.5, 44.3, 'Plain-word status', 'Paid, Partial, Unpaid, Overdue — words and colour together.'],
];

const core = (ctx) =>
  section(
    'core',
    `
    <div class="mx-part">
      <p class="mx-part__n">Initiative 01</p>
      <h2 class="mx-part__name" id="core-h">ManaGEM Core Experience</h2>
      <p class="mx-part__desc">The redesign of the established ERP. Underneath the individual screens sits one repeated page anatomy — learn it once, and every module reads the same way.</p>
    </div>
    <div class="mf-anatomy">
      ${shot(ctx, 'mg-invoices', 'The Invoices screen with seven numbered markers pointing to its parts', {
        caption: 'The anatomy of a list screen, shown on Invoices. The same structure is used from Factory to Staff Records.',
        inner: anatomy.map(([x, y], i) => `<span class="mf-pin" style="left:${x}%;top:${y}%" aria-hidden="true">${i + 1}</span>`).join(''),
      })}
      <ol class="mf-legend" role="list">
        ${anatomy.map(([, , t, d], i) => `<li><span class="mf-legend__n" aria-hidden="true">${i + 1}</span><div><strong>${t}</strong><p>${d}</p></div></li>`).join('')}
      </ol>
    </div>`,
  );

// ------------------------------------------------ 7 detailed UX decisions

const decisionTiles = (ctx) =>
  [
    ['A', 'soft', {
      tag: 'A · Navigation', title: 'A more coherent navigation experience', lede: 'Grouped by business area, with the user’s location always visible.',
      media: shot(ctx, 'mg-open-enquiries', 'Open Enquiries with the breadcrumb Home, Sales, Open Enquiries and a count of 51 beside the menu item', { caption: 'Breadcrumb, highlighted menu item and open-work count, all on one screen.' }),
      beats: [['Problem', 'New clients had to learn many destinations before the product was useful.'], ['Why it mattered', 'If people cannot tell where a task lives, every other improvement stays hidden.'], ['Decision', 'Group navigation by business area, and always show where the user is.'], ['In the interface', 'Five labelled groups, a breadcrumb on every page, top-bar search, and counts on items with open work.']],
      shows: 'Information architecture' }],
    ['B', '', {
      tag: 'B · Information', title: 'Making important information easier to understand', lede: 'Totals first, then the state of every record in plain words.',
      media: `<div class="mx-duo">${shot(ctx, 'mg-invoices', 'Invoices list with four summary totals and a plain-word status on each row', { caption: 'Invoices: billed, paid, outstanding and overdue, then a status on every row.', sizes: '(min-width: 1264px) 600px, 100vw' })}${shot(ctx, 'mg-sage-invoices', 'Sage Invoices with synced, pending and error counts and a last-sync time per invoice', { caption: 'Accounting sync: Synced, Pending or Error, and when it last ran.', sizes: '(min-width: 1264px) 600px, 100vw' })}</div>
        ${note('This is the designed interface for invoice state. Whether the underlying data reflects correctly is an engineering concern, and no fix is claimed here.')}`,
      beats: [['Problem', 'Records are dense, and invoice information did not always reflect as expected.'], ['Why it mattered', 'People act on what a screen tells them. An unclear invoice means a wrong or late follow-up.'], ['Decision', 'One list anatomy everywhere: summary totals, filters, then a plain-word status per row.'], ['In the interface', 'Paid, Partial, Unpaid, Overdue on invoices; sync state and last-sync time per invoice in the accounting view.']],
      shows: 'Data-heavy UI design' }],
    ['C', 'soft', {
      tag: 'C · Visibility', title: 'Improving operational visibility', lede: 'What needs attention is brought to where people already look.',
      media: `<div class="mx-duo">${shot(ctx, 'mg-dashboard', 'Dashboard with a messages banner above four headline figures', { caption: 'A messages banner sits at the top of the dashboard.', sizes: '(min-width: 1264px) 600px, 100vw' })}${shot(ctx, 'mg-stock-alerts', 'Stock Control with open purchase orders and a low stock alerts panel', { caption: 'Low stock and open orders sit beside day-to-day activity.', sizes: '(min-width: 1264px) 600px, 100vw' })}</div>
        ${note('This is the design direction for surfacing attention. Specific notification behaviour is not claimed as implemented.')}`,
      beats: [['Problem', 'Little visibility of messages, notifications and tasks needing attention.'], ['Why it mattered', 'Unnoticed work does not get done — and one missed item delays the next stage.'], ['Decision', 'Surface attention in the dashboard, top bar, navigation and module panels.'], ['In the interface', 'A messages banner, a notification indicator, navigation counts and low-stock alerts.']],
      shows: 'Systems thinking' }],
    ['D', '', {
      tag: 'D · Form feedback', title: 'Clearer form feedback', lede: 'Visible progress, one review, and one final action.',
      media: `${video(ctx, 'flow-enquiry', 'Filling in the four-step New Enquiry form, reviewing it, and pressing Create Enquiry, which returns to the enquiry list', { caption: 'New Enquiry: four steps, a review of everything entered, then a single commit.' })}
        ${todo(ctx, 'ManaGEM: designed save-confirmation states (saving, saved, error)', '— the prototype shows review-then-commit but has no explicit saved/toast state, so none is shown.')}`,
      beats: [['Problem', 'Forms did not make it clear that information had saved, so users clicked save again.'], ['Why it mattered', 'Repeated saves can create duplicate actions, and doubt erodes trust in the system.'], ['Decision', 'Make the moment of commitment unmistakable instead of hiding it in a long form.'], ['In the interface', 'A four-step stepper, a review screen, one Create Enquiry button, then the enquiry list.']],
      shows: 'Interaction design' }],
    ['E', 'soft', {
      tag: 'E · Consistency', title: 'A more consistent product language', lede: 'The GEMIS identity in the shell, and one page anatomy in every module.',
      media: `<div class="mx-trio">${shot(ctx, 'mg-login', 'ManaGEM sign-in carrying the GemIS mark', { caption: 'Sign-in', sizes: '(min-width: 1264px) 800px, 100vw', cls: 'mx-trio__main' })}${shot(ctx, 'mg-factory', 'Factory module with a production pipeline', { caption: 'Factory', sizes: '(min-width: 1264px) 400px, 50vw' })}${shot(ctx, 'mg-staff', 'Staff Members with the same tabs, filters and table pattern', { caption: 'Staff Records', sizes: '(min-width: 1264px) 400px, 50vw' })}</div>`,
      beats: [['Problem', 'The interface did not reflect GEMIS branding or read as one system.'], ['Why it mattered', 'Consistency lets people reuse what they learned on one screen everywhere else.'], ['Decision', 'Carry the GEMIS identity through the shell; build modules from a small set of parts.'], ['In the interface', 'A branded sign-in and sidebar; title, summary, tabs, filters and table in every module.']],
      shows: 'UI craft' }],
    ['F', '', {
      tag: 'F · Simplifying', title: 'Simplifying the experience', lede: 'Reorganise before removing: related functions live together.',
      media: `${shot(ctx, 'mg-stock', 'Stock Control with twelve related areas arranged as tabs across one module', { caption: 'Stock Control: suppliers, orders, stores, movements and stock takes as tabs in one module.' })}${note('Described as reorganisation. No claim is made that specific features were removed.')}`,
      beats: [['Problem', 'Unnecessary features and scattered functions made the system more complicated.'], ['Why it mattered', 'Complexity that does not serve a task is a cost paid on every visit.'], ['Decision', 'Keep what the business depends on, and put related functions together.'], ['In the interface', 'Module tabs instead of separate destinations, and dashboard shortcuts to common tasks.']],
      shows: 'Product judgement' }],
  ]
    .map(([L, mod, f]) => section(`core-${L}`, feature({ id: `core-${L}`, ...f }), { mod, label: `core-${L}-t`, chapter: false }))
    .join('');

const decisions = (ctx) =>
  section(
    'decisions',
    `${head({ id: 'decisions', n: '07', label: 'Detailed UX decisions', title: 'Six decisions, each with its reasoning.', intro: 'Every decision answers a specific problem in the brief. Each one is set out the same way: the problem, why it mattered, the decision, and where it shows in the interface.' })}
    <ol class="mx-jump" role="list">${['Navigation', 'Information', 'Visibility', 'Form feedback', 'Consistency', 'Simplifying'].map((t, i) => `<li><a href="#core-${'ABCDEF'[i]}"><b>${'ABCDEF'[i]}</b>${t}</a></li>`).join('')}</ol>`,
    { mod: 'soft' },
  ) + decisionTiles(ctx);

// ------------------------------------------------------------- 8 Take-On

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

const takeonIntro = (ctx) =>
  section(
    'takeon',
    `
    <div class="mx-part">
      <p class="mx-part__n">Initiative 02 · Chapter 08</p>
      <h2 class="mx-part__name" id="takeon-h">ManaGEM Take-On</h2>
      <p class="mx-part__desc">From manual information capture to a guided onboarding experience: upload what you have, review what the system extracted, and hand over to GEMIS for a final check.</p>
      <p class="mx-part__status">${status('UX/UI prototype completed · development underway', 'progress')}</p>
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
    { mod: 'band' },
  );

const takeonDecisions = (ctx) =>
  section(
    'takeon-decisions',
    `${head({ id: 'takeon-decisions', label: 'Take-On UX decisions', title: 'Five decisions about how much to trust automation — and how to show it.', intro: 'AI-assisted extraction is never treated as infallible. People should be able to understand, inspect and correct information before it is submitted.' })}
    <ol class="mx-jump" role="list">${['Flexible upload', 'Transparent processing', 'Confidence', 'Human review', 'GEMIS verification'].map((t, i) => `<li><a href="#key-${i + 1}"><b>0${i + 1}</b>${t}</a></li>`).join('')}</ol>`,
    { chapter: false },
  ) +
  [
    ['1', 'Flexible document onboarding', 'Clients upload what they already hold instead of retyping it record by record.',
      shot(ctx, 'to-04-upload', 'Upload screen with files added, each marked encrypted and scanned', { caption: 'One area per category, each file’s state shown on the file itself.', source: SRC_TAKEON }),
      [['Why', 'Retyping every record is the manual work the brief set out to reduce.'], ['Design', 'One drop area per category, with required ones marked.'], ['Detail', 'Accepted formats stated on every area: PDF, XLSX, CSV, DOCX, JPG, PNG.'], ['Fallback', 'No document? Each category can be typed in manually.']]],
    ['2', 'Transparent processing', 'The system says what it is doing while it does it.',
      shot(ctx, 'to-05-extraction', 'Extraction screen with running counts above an extraction log and an audit list', { caption: 'Processing explained in words. In the prototype this step is simulated.', source: SRC_TAKEON }),
      [['Why', 'A spinner asks for trust in something people cannot see.'], ['Design', 'A running log names each document as it is read.'], ['Detail', 'Counts of customers, products, staff and flagged records update live.'], ['Record', 'An activity list logs each stage with a time.']]],
    ['3', 'Confidence-based validation', 'Effort goes to the records that need it.',
      `<div class="mx-duo">${shot(ctx, 'to-06-validation', 'Validation summary with record counts and a confidence breakdown', { caption: 'A summary sets expectations before the detail.', source: SRC_TAKEON, sizes: '(min-width: 1264px) 600px, 100vw' })}${shot(ctx, 'to-07-lowconf', 'Review panel for a low-confidence record with only a company name found', { caption: 'A low-confidence record says exactly what could not be read.', source: SRC_TAKEON, sizes: '(min-width: 1264px) 600px, 100vw' })}</div>`,
      [['Why', 'Equal care on every record is slow, and people stop reading.'], ['Design', 'Four states: Verified, Needs review, Possible duplicate, Low confidence.'], ['Detail', 'Each state uses a word and an icon, never colour alone.'], ['Speed', 'Filters jump straight to what needs a decision.']]],
    ['4', 'Human-in-the-loop review', 'An extracted record is a suggestion until the client agrees with it.',
      video(ctx, 'flow-takeon-review', 'Filtering the customer review table, opening a record with a missing email, then resolving a possible duplicate by merging it', { caption: 'Filter, inspect the evidence behind a record, then resolve a duplicate.', source: SRC_TAKEON }),
      [['Why', 'Only someone who knows the business can confirm what the system read.'], ['Evidence', 'Source document, original text and a confidence score on every record.'], ['Gaps', 'Missing fields are called out: “Email not found in source document”.'], ['Control', 'Edit, confirm or reject; for duplicates, merge, keep both or discard.']]],
    ['5', 'GEMIS verification', 'Submitting hands over to a person — it does not make data live.',
      video(ctx, 'flow-takeon-submit', 'Reviewing outstanding issues, confirming the declaration, submitting for GEMIS review, then viewing the GEMIS take-on queue', { caption: 'Outstanding issues, the declaration, submission, and the GEMIS queue.', source: SRC_TAKEON }),
      [['Why', 'Automation does not remove the need for oversight.'], ['Design', 'Outstanding issues are listed before the client submits.'], ['Wording', 'The last screen says “Submitted for GEMIS review”, not “Done”.'], ['Other side', 'A GEMIS queue shows each company’s progress and sign-offs.']]],
  ]
    .map(([n, title, lede, media, beats], i) =>
      section(`key-${n}`, feature({ id: `key-${n}`, tag: `0${n} · Take-On`, title, lede, media, beats }), { mod: i % 2 ? '' : 'soft', label: `key-${n}-t`, chapter: false }),
    )
    .join('');

// ----------------------------------------------------------- 9 screens

const gallery = [
  ['mg-reports', 'Reports — one report at a time, with its parameters and totals.', 'Quotes report with report types, parameters and results', 'wide', SRC_CORE],
  ['mg-customers', 'Customers — account type, status and the Sage link.', 'Customers list with account type and status', '', SRC_CORE],
  ['mg-projects', 'Projects — current jobs with foreman, dates and progress.', 'Current Jobs list with progress bars', '', SRC_CORE],
  ['mg-debtors', 'Debtors — enquiry, invoice and reference in one row, with ageing.', 'Debtors Management with enquiry and invoice numbers and ageing', '', SRC_CORE],
  ['mg-warranties', 'Warranties — maintenance up to date, due or overdue.', 'Warranties list with maintenance status', '', SRC_CORE],
  ['to-02-consent', 'Take-On — explicit consent, including what the AI does and does not do.', 'Take-On consent checkboxes covering authorisation, processing and AI’s role', '', SRC_TAKEON],
  ['to-10-declaration', 'Take-On — compliance status and the final declaration.', 'Take-On compliance checklist and final declaration', '', SRC_TAKEON],
];

const screens = (ctx) =>
  section(
    'screens',
    `
    ${head({ id: 'screens', n: '09', label: 'Interface details and additional screens', title: 'More of the product, at a size you can read.', intro: 'Screens not shown elsewhere in either version. Select any screen to open it full size.' })}
    <div class="mx-gallery">
      ${gallery.map(([k, c, a, size, src]) => shot(ctx, k, a, { caption: c, source: src, cls: size ? 'mx-gallery__wide' : '', sizes: size ? '(min-width: 1264px) 1200px, 100vw' : '(min-width: 834px) 590px, 100vw' })).join('')}
    </div>
    <div class="btn-row mx-center">
      ${button(ctx, { label: 'Open the core redesign prototype', href: 'prototypes/managem.html', variant: 'primary', ic: 'external', external: true })}
      ${button(ctx, { label: 'Open the Take-On prototype', href: TAKEON_FILE, variant: 'secondary', ic: 'external', external: true })}
    </div>
    <p class="mx-fine">Both prototypes are built for desktop screens and use demo data.</p>`,
    { mod: 'soft' },
  );

// --------------------------------------------------------- 10 status

const statusSection = (ctx) =>
  section(
    'status',
    `
    ${head({ id: 'status', n: '10', label: 'Implementation status', title: 'What exists today, stated precisely.' })}
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
    <div class="mf-split">
      <div><p class="mx-card__k">Existing functionality</p><p>The modules and business workflows ManaGEM already supported.</p></div>
      <div><p class="mx-card__k">My design contribution</p><p>How those workflows are organised, connected, presented and confirmed — and the Take-On experience.</p></div>
      <div><p class="mx-card__k">Prototype behaviour</p><p>Simulated extraction, sample records and draft legal wording in Take-On.</p></div>
      <div><p class="mx-card__k">Ongoing development</p><p>Take-On is being built. Live AI integration and account provisioning are not claimed.</p></div>
    </div>
    <p class="mx-unclaimed"><strong>Not claimed:</strong> reduced onboarding time, eliminated manual work, or any change in revenue, conversion or productivity. No user testing is claimed.</p>
    ${todo(ctx, 'ManaGEM: which parts of the core redesign are in production', '— both pages say "design complete" and make no production claim.')}
    ${todo(ctx, 'ManaGEM: confirm the sample company name in the Take-On prototype ("SBS Waterproofing") may be shown publicly', '— it appears in the Take-On screenshots and videos as sample data.')}
    ${todo(ctx, 'ManaGEM: confirm who produced the product film and that it may be shown in the portfolio', '— used as the opening visual of the quick case study.')}`,
  );

// ------------------------------------------------------ 11 reflection

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
    { mod: 'soft' },
  );

export default {
  render(ctx) {
    const p = projects.find((x) => x.slug === 'managem');
    const next = projects[(projects.indexOf(p) + 1) % projects.length];
    return `
  <article class="case mx mx--full">
    ${hero(ctx)}
    ${chapterNav(ctx, chapters, { name: 'ManaGEM · Full', cta: `<a class="btn btn--secondary mx-chapters__cta" href="${url(ctx, QUICK)}">Overview</a>` })}
    ${context(ctx)}
    ${challenges(ctx)}
    ${role(ctx)}
    ${system(ctx)}
    ${workflow(ctx)}
    ${core(ctx)}
    ${decisions(ctx)}
    ${takeonIntro(ctx)}
    ${takeonDecisions(ctx)}
    ${screens(ctx)}
    ${statusSection(ctx)}
    ${reflection(ctx)}
    <section class="mf-return" aria-labelledby="mf-return-h">
      <div class="wrap">
        <h2 id="mf-return-h">That’s the full story.</h2>
        <p>Short on time? The overview covers the role, decisions and final interface in about three minutes.</p>
        <a class="btn btn--secondary" href="${url(ctx, QUICK)}">${glyph.back}<span>Back to the overview</span></a>
      </div>
    </section>
    ${nextProject(ctx, next)}
  </article>`;
  },
};
