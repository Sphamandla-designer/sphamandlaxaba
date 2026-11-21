// ManaGEM — full case study (work/managem/full/).
// The deep dive behind the recruiter overview: the original interface and
// what was wrong with it, the design problem, the approach, detailed design
// stories with before/after evidence, interface patterns, the full Take-On
// journey, how the redesign will be evaluated, status and reflection.
// Evidence rules are in managem-parts.mjs.

import { esc, url, todo, button, icon } from '../shared.mjs';
import { projects } from './projects.mjs';
import { designSystem, DS_PRINCIPLES } from './managem-ds.mjs';
import {
  SRC_CORE, SRC_TAKEON, SRC_LEGACY, TAKEON_FILE, QUICK, glyph,
  shot, video, filmVideo, head, section, note, chapterNav, feature, nextProject,
  compare, statusList, workflowDiagram,
} from './managem-parts.mjs';

const chapters = [
  ['background', 'Background'],
  ['existing', 'Existing experience'],
  ['problem', 'Design problem'],
  ['approach', 'Approach'],
  ['decisions', 'Decisions'],
  ['patterns', 'Design system'],
  ['takeon', 'Take-On'],
  ['evaluation', 'Evaluation'],
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
          <p class="mx-eyebrow">ManaGEM · Full case study · about 8 minutes</p>
          <h1 class="mf-title" id="mf-title">Reimagining the experience behind everyday business operations.</h1>
          <p class="mf-sub">The original product, what made it hard to use, how I approached the redesign, and the reasoning behind each decision — including the Take-On onboarding concept.</p>
        </div>
        <ol class="mf-contents" role="list" aria-label="Contents">
          ${chapters.map(([id, label], i) => `<li><a href="#${id}"><span>${String(i + 1).padStart(2, '0')}</span>${label}</a></li>`).join('')}
        </ol>
      </div>
    </div>
  </header>`;

// ------------------------------------------------------ 6.1 · background

const modules = [
  ['Customers & suppliers', 'Accounts, contacts, warranties, suppliers'],
  ['Sales', 'Enquiries, quotations, targets, reports'],
  ['Jobs & projects', 'Bookings, foremen, progress, job costing'],
  ['Stock & purchasing', 'Stores, movements, purchase orders, stock takes'],
  ['Production', 'Factory jobs and builds'],
  ['Finance', 'Invoices, debtors, receipts, accounting sync'],
  ['Administration', 'Staff, users, companies, reference data'],
];

const background = (ctx) =>
  section(
    'background',
    `
    ${head({ id: 'background', n: '01', label: 'Product background', title: 'ManaGEM is where a business’s daily work happens.', intro: 'ManaGEM is an established ERP and business-management platform developed by GEMIS, my employer, and used by its clients to run day-to-day operations. It began with a template bought around 2015 and grew over many years. This project redesigned that existing product — it did not build a new one.' })}
    <ul class="mf-modules" role="list" aria-label="Business functions in ManaGEM">
      ${modules.map(([t, d]) => `<li><strong>${t}</strong><span>${d}</span></li>`).join('')}
    </ul>
    <div class="mf-why">
      <h3 class="mx-subh mf-left">Why an ERP needs connected information architecture</h3>
      <p>These are not separate tools. An enquiry becomes a quotation, a job, a stock movement and an invoice, and each step reads the record the last one created. If a record is hard to find, or its state unclear, in one module, the problem travels to the next team. The structure of the product matters as much as any single screen.</p>
    </div>
    ${workflowDiagram()}
    <div class="mf-film">
      ${filmVideo(ctx)}
    </div>`,
    { mod: 'soft' },
  );

// ---------------------------------------------- 6.2 · existing experience

const analysis = [
  ['Navigation structure', 'One long sidebar. Sections such as Sales and Stock Control expand into a dozen or more items each, so the menu changes length as you move and offers no sense of grouping.', 'legacy-suppliers', 'The original Suppliers screen with the Stock Control menu expanded'],
  ['Information density and labels', 'The Customers list has fourteen columns, three of them headed “Description”. Values in some rows have moved into the wrong columns, so the table cannot be read reliably.', 'legacy-customers', 'The original Customers list with three Description columns and misaligned rows'],
  ['Table hierarchy and actions', 'Every invoice row carries up to ten buttons — edit, open, delete, post to Sage, create warranty, upload, PDF, delivery, send, copy — while whether it is paid is a small checkbox.', 'legacy-invoices', 'The original Invoices list with many buttons per row'],
  ['Very wide reports', 'The Projects report runs to sixteen columns. Budget and actual figures sit side by side with only a grey background to separate them.', 'legacy-projects', 'The original Projects report with sixteen columns'],
  ['Status visibility', 'The dashboard leads with four headline numbers and a chart; open enquiries and inspection reports sit lower down, and messages appear only as an envelope icon in the top bar.', 'legacy-dashboard', 'The original dashboard with headline figures, a sales chart and empty panels'],
  ['Visual consistency', 'Each module has its own layout: green banner panels on some lists, plain tables on others, and different filter controls on each.', 'legacy-purchase-orders', 'The original Purchase Orders list with a different filter layout'],
];

const existing = (ctx) =>
  section(
    'existing',
    `
    ${head({ id: 'existing', n: '02', label: 'Understanding the existing experience', title: 'The original interface, screen by screen.', intro: 'These are screenshots of the original interface. Client names, contact details and financial figures are replaced by grey bars; everything else — layout, labels, alignment and controls — is unchanged.' })}
    <div class="mf-legacy">
      ${analysis
        .map(
          ([t, d, key, alt], i) => `
      <article class="mf-legacy__item${i % 2 ? ' mf-legacy__item--flip' : ''}">
        <div class="mf-legacy__text"><span class="mq-n">0${i + 1}</span><h3>${t}</h3><p>${d}</p></div>
        ${shot(ctx, key, alt, { source: SRC_LEGACY, sizes: '(min-width: 1264px) 760px, 100vw' })}
      </article>`,
        )
        .join('')}
    </div>
    <p class="mf-legacy__more">Not shown above, but part of the brief: forms gave no clear sign that a save had worked, and onboarding a new client relied on collecting and typing in their records by hand.</p>`,
  );

// ------------------------------------------------- 6.3 · the design problem

const problemGroups = [
  ['Discoverability', 'New clients could not easily find their way around.', 'Group navigation by business area; always show where the user is.', 'core-A'],
  ['Workflow complexity', 'Unnecessary features and scattered functions added effort.', 'Bring related functions together; reorganise before removing.', 'core-D'],
  ['Data clarity', 'Some information, particularly invoices, did not reflect as expected.', 'Show the state of every record in words, with totals first.', 'core-B'],
  ['Interaction feedback', 'Saves were not clearly confirmed; attention items were easy to miss.', 'Make the commit step explicit; surface what needs attention.', 'core-C'],
  ['Product consistency', 'Modules looked and behaved differently; no GEMIS identity.', 'One page structure and one set of patterns, in a GEMIS shell.', 'patterns'],
  ['Client onboarding', 'Getting started depended on manual collection and entry.', 'A guided, AI-assisted onboarding flow with human review.', 'takeon'],
];

const problem = () =>
  section(
    'problem',
    `
    ${head({ id: 'problem', n: '03', label: 'Defining the design problem', title: 'Six problems, each with a design opportunity.' })}
    <div class="mf-problems" role="table" aria-label="Design problems and opportunities">
      <div class="mf-problems__row mf-problems__row--head" role="row"><span role="columnheader">Problem area</span><span role="columnheader">What was wrong</span><span role="columnheader">Design opportunity</span></div>
      ${problemGroups.map(([t, w, o, href]) => `<div class="mf-problems__row" role="row"><span role="cell"><strong>${t}</strong></span><span role="cell">${w}</span><span role="cell"><a href="#${href}">${o}</a></span></div>`).join('')}
    </div>`,
    { mod: 'band' },
  );

// --------------------------------------------------------- 6.4 · approach

const approachSteps = [
  ['Screen-by-screen review', 'Every screen in the product, what it is for, and what it shows.'],
  ['Workflow relationships', 'Which screens create the records others read, from enquiry to payment.'],
  ['Information hierarchy', 'What a user needs first on each screen, and what can wait.'],
  ['Navigation', 'Grouping destinations by the part of the business they serve.'],
  ['Reuse of functionality', 'Keeping every function businesses depend on, and changing how it is reached.'],
  ['Simplification', 'Removing visual noise and moving rarely used actions out of the way.'],
];

const navGroups = [
  ['Core', ['Dashboard']],
  ['Customers', ['Customers', 'Customer Contacts', 'Warranties']],
  ['Sales', ['New Enquiry', 'Open Enquiries', 'Closed Enquiries', 'Invoices', 'Sage Invoices', 'Inspection Reports', 'Sales Targets', 'Quote Templates', 'Reports', 'Master Data']],
  ['Operations', ['Debtors Management', 'Products & Pricing', 'Projects Module', 'Factory', 'Stock Control']],
  ['Admin', ['Staff Records', 'My Companies', 'Manage Users', 'Master Data', 'Settings']],
];

const approach = (ctx) =>
  section(
    'approach',
    `
    ${head({ id: 'approach', n: '04', label: 'Product-design approach', title: 'Understanding the system before changing it.', intro: 'This was product and workflow analysis of the existing system against the redesign brief. It was not formal user research, and it is not presented as such.' })}
    <ol class="mf-approach" role="list">
      ${approachSteps.map(([t, d], i) => `<li><span class="mq-n">0${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
    </ol>
    <h3 class="mx-subh">The navigation model</h3>
    <div class="mf-ia">
      ${shot(ctx, 'mg-sidebar', 'The redesigned sidebar with five labelled groups', { caption: 'Redesigned sidebar.', sizes: '240px', cls: 'mf-ia__bar' })}
      <div class="mf-ia__groups" aria-label="Every destination, by group">
        ${navGroups.map(([g, items]) => `<div><p class="mf-ia__g">${g}<span>${items.length}</span></p><ul role="list">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></div>`).join('')}
      </div>
      <div class="mf-ia__aids">
        <p class="mx-card__k">On every screen</p>
        <dl>
          <div><dt>Breadcrumb</dt><dd>Home, then the group, then the page — so location is always visible.</dd></div>
          <div><dt>Search</dt><dd>One field in the top bar, so nothing depends on remembering the menu.</dd></div>
          <div><dt>Counts</dt><dd>Items with open work carry a number, such as open enquiries.</dd></div>
        </dl>
      </div>
    </div>`,
    { mod: 'soft' },
  );

// --------------------------------------------- 6.5 · detailed decisions

const anatomy = [
  [14.6, 49.2, 'Grouped navigation', 'Five labelled groups; the current page is highlighted.'],
  [61, 3.2, 'Search and orientation', 'Top-bar search and a breadcrumb on every screen.'],
  [31.5, 10.6, 'Title and summary line', 'What the list is, and its most important figure in words.'],
  [90.5, 10.8, 'One primary action', 'The main thing to do here, always in the same place.'],
  [37.5, 17.5, 'Summary totals first', 'Billed, paid, outstanding and overdue before any rows.'],
  [62.5, 32.5, 'Filters and export', 'Removable filter chips, a date range, and CSV, Excel or PDF.'],
  [91.5, 44.3, 'Plain-word status', 'Paid, Partial, Unpaid, Overdue — words and colour together.'],
];

const story = (id, mod, { tag, title, beats, media }) =>
  section(
    id,
    `<article class="mf-story" aria-labelledby="${id}-t">
      <header class="mx-feat__head">
        <p class="mx-feat__tag">${tag}</p>
        <h3 class="mx-feat__title" id="${id}-t">${title}</h3>
      </header>
      <dl class="mf-story__beats">${beats.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      <div class="mx-feat__media">${media}</div>
    </article>`,
    { mod, label: `${id}-t`, chapter: false },
  );

const decisions = (ctx) =>
  section(
    'decisions',
    `${head({ id: 'decisions', n: '05', label: 'Detailed design decisions', title: 'The reasoning behind each design decision.', intro: 'The strongest examples from the redesign, each set out as problem, consideration and decision — with the original and redesigned screens side by side where both exist.' })}
    <ol class="mx-jump" role="list">${['Navigation', 'Records', 'Feedback', 'Simplifying'].map((t, i) => `<li><a href="#core-${'ABCD'[i]}"><b>${'ABCD'[i]}</b>${t}</a></li>`).join('')}</ol>`,
  ) +
  story('core-A', 'soft', {
    tag: 'A · Navigation and discoverability',
    title: 'From one long menu to five groups',
    beats: [
      ['Problem', 'The original sidebar is a single list whose sections expand in place — Stock Control alone opens into a dozen or more items — so its length and order keep changing.'],
      ['Consideration', 'A new client learns a product through its navigation. The structure has to explain the business, not mirror how features were added.'],
      ['Design decision', 'Five labelled groups by business area, every destination visible at once, plus a breadcrumb, top-bar search and counts on items with open work.'],
    ],
    media: `<div class="mq-navpair">
      ${shot(ctx, 'legacy-nav', 'The original sidebar with Stock Control expanded', { caption: 'Original', source: SRC_LEGACY, sizes: '220px' })}
      ${shot(ctx, 'mg-sidebar', 'The redesigned sidebar with five groups', { caption: 'Redesign', source: SRC_CORE, sizes: '220px' })}
      ${video(ctx, 'flow-navigation', 'Moving through the redesigned sidebar between connected modules', { caption: 'Moving between connected modules in the redesign.', cls: 'mq-navpair__video' })}
    </div>`,
  }) +
  story('core-B', '', {
    tag: 'B · Information hierarchy and operational records',
    title: 'Every list built the same way, with state first',
    beats: [
      ['Problem', 'Original lists open with filters in a coloured banner, then wide tables where actions dominate each row and state is a checkbox or buried in a column.'],
      ['Consideration', 'Users act on what a list tells them. Invoice information in particular has to be readable at a glance, and consistent wherever it appears.'],
      ['Design decision', 'One anatomy for every list — title and summary line, totals, filters, table — with a plain-word status on every row and actions moved off the row.'],
    ],
    media: `${compare(ctx, {
      before: ['legacy-invoices', 'The original Invoices list'],
      after: ['mg-invoices', 'The redesigned Invoices list'],
      caption: 'Invoices, before and after.',
    })}
    <div class="mf-anatomy">
      ${shot(ctx, 'mg-invoices', 'The redesigned Invoices screen with seven numbered markers pointing to its parts', {
        caption: 'The anatomy of a list screen. The same structure is used from Customers to Staff Records.',
        inner: anatomy.map(([x, y], i) => `<span class="mf-pin" style="left:${x}%;top:${y}%" aria-hidden="true">${i + 1}</span>`).join(''),
      })}
      <ol class="mf-legend" role="list">${anatomy.map(([, , t, d], i) => `<li><span class="mf-legend__n" aria-hidden="true">${i + 1}</span><div><strong>${t}</strong><p>${d}</p></div></li>`).join('')}</ol>
    </div>
    ${compare(ctx, { before: ['legacy-products', 'The original Products list'], after: ['mg-products', 'The redesigned Products and Pricing list'], caption: 'Products, before and after.' })}
    ${note('Whether the underlying invoice data reflects correctly is an engineering matter; the redesign addresses how that information is presented, and no data fix is claimed here.')}`,
  }) +
  story('core-C', 'soft', {
    tag: 'C · Form feedback and save-state clarity',
    title: 'One visible moment of commitment',
    beats: [
      ['Problem', 'Forms did not communicate clearly that a save had worked, so people pressed save again — risking duplicate submissions. Items needing attention were also easy to miss.'],
      ['Consideration', 'Saving should be a single, deliberate step that the user can see coming and see completed, without hunting for confirmation.'],
      ['Design decision', 'Multi-step forms with visible progress, a review screen showing everything entered, one final action, and a return to the updated list. Messages and open-work counts appear where people already look.'],
    ],
    media: `${video(ctx, 'flow-enquiry', 'Filling in the four-step New Enquiry form, reviewing it and creating the enquiry', { caption: 'New Enquiry: four steps, a review, one commit, then the updated list.' })}
    <div class="mx-duo">
      ${shot(ctx, 'mg-detail-review', 'Review step of the New Enquiry form', { caption: 'The review step before committing.', sizes: '(min-width: 1264px) 600px, 100vw' })}
      ${shot(ctx, 'mg-detail-attention', 'Dashboard messages banner above the headline figures', { caption: 'Messages surfaced on the dashboard.', sizes: '(min-width: 1264px) 600px, 100vw' })}
    </div>
    ${todo(ctx, 'ManaGEM: designed save-confirmation states (saving, saved, error)', '— the design-system section now specifies saving, saved and error states, rebuilt for the portfolio; confirm they match what the development team is building.')}`,
  }) +
  story('core-D', '', {
    tag: 'D · Simplifying without removing',
    title: 'Related functions brought together',
    beats: [
      ['Problem', 'Functions accumulated over the years as separate destinations, which made the product feel larger and harder to learn than the work it supports.'],
      ['Consideration', 'Businesses depend on these functions. The aim was to reduce the effort of reaching them, not to take them away.'],
      ['Design decision', 'Related areas become tabs inside one module — Stock Control holds suppliers, purchase orders, stores, movements and stock takes — and the dashboard offers shortcuts to common tasks.'],
    ],
    media: `${compare(ctx, { before: ['legacy-purchase-orders', 'The original Purchase Orders list, one of many separate Stock Control pages'], after: ['mg-stock', 'The redesigned Stock Control module with its areas as tabs'], caption: 'Stock: separate pages in the original; one module with tabs in the redesign.' })}
    ${note('Described as reorganisation. No claim is made that specific features were removed.')}`,
  });

// --------------------------------------------- 6.6 · interface consistency

const patterns = [
  ['pat-summary', 'Summary cards', 'A label, a figure and an icon — the same on invoices, stock and the dashboard.'],
  ['pat-filters', 'Filters and export', 'Search, removable filter chips, a date range and export, in the same order on every list.'],
  ['pat-table', 'Tables and status', 'Calm rows, right-aligned figures in a tabular face, and a status pill in words.'],
  ['pat-stepper', 'Progress', 'Numbered steps for any form that takes more than one screen.'],
  ['pat-form', 'Inputs', 'Labels above fields, required fields marked, two columns where fields belong together.'],
];

const patternsSection = (ctx) =>
  section(
    'patterns',
    `
    ${head({ id: 'patterns', n: '06', label: 'Design system', title: 'One design system behind every screen.', intro: 'The redesign is built from one set of foundations — colour, type, spacing — and a small library of components reused in every module. The board below rebuilds that system with the redesign’s own tokens, and shows each component in motion.' })}
    <ol class="mf-principles" role="list">
      ${DS_PRINCIPLES.map(([t, d], i) => `<li><span class="mq-n">0${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
    </ol>
    ${designSystem()}
    <h3 class="mx-subh">The same patterns in the redesigned screens</h3>
    <div class="mf-patterns">
      ${patterns.map(([k, t, d]) => `<figure class="mf-pattern"><figcaption><strong>${t}</strong><span>${d}</span></figcaption>${shot(ctx, k, `${t} pattern from the redesigned interface`, { sizes: '(min-width: 1264px) 960px, 100vw' })}</figure>`).join('')}
    </div>
    <div class="mx-trio">
      ${shot(ctx, 'mg-login', 'The ManaGEM sign-in screen with the GEMIS mark', { caption: 'The GEMIS identity from the first screen.', sizes: '(min-width: 1264px) 900px, 100vw', cls: 'mx-trio__main' })}
      ${shot(ctx, 'mg-factory', 'The Factory module using the shared page structure', { caption: 'Factory', sizes: '(min-width: 1264px) 450px, 50vw' })}
      ${shot(ctx, 'mg-staff', 'Staff Records using the same tabs, filters and table', { caption: 'Staff Records', sizes: '(min-width: 1264px) 450px, 50vw' })}
    </div>`,
    { mod: 'soft' },
  );

// ------------------------------------------------------------ 6.7 · Take-On

const phases = [
  ['Prepare', [['01', 'Welcome'], ['02', 'Trust & compliance'], ['03', 'Company profile']]],
  ['Provide', [['04', 'Document upload']]],
  ['Process', [['05', 'AI extraction'], ['06', 'Validation summary']]],
  ['Review', [['07', 'Customers'], ['08', 'Products'], ['09', 'Staff']]],
  ['Submit', [['10', 'Confirm & submit'], ['11', 'Completion']]],
];

const journey = [
  ['to-01-welcome', 'Welcome', 'Take-On welcome screen describing upload, AI structuring, review and the GEMIS check'],
  ['to-02-trust', 'Trust & compliance', 'Plain-language summary of how data is handled'],
  ['to-03-profile', 'Company profile', 'Company profile form'],
  ['to-04-upload', 'Document upload', 'Upload screen with an area per kind of information'],
  ['to-05-extraction', 'AI extraction', 'Extraction screen with running counts and a log'],
  ['to-06-validation', 'Validation summary', 'Validation summary with a confidence breakdown'],
  ['to-07-customers', 'Customer review', 'Customer review table with a status per record'],
  ['to-08-products', 'Product review', 'Product and pricing review table'],
  ['to-09-staff', 'Staff review', 'Staff review table'],
  ['to-10-confirm', 'Confirm & submit', 'Final confirmation with outstanding issues'],
  ['to-11-complete', 'Completion', 'Submitted for GEMIS review'],
];

const takeonIntro = (ctx) =>
  section(
    'takeon',
    `
    <div class="mx-part">
      <p class="mx-part__n">07 · Onboarding</p>
      <h2 class="mx-part__name" id="takeon-h">ManaGEM Take-On</h2>
      <p class="mx-part__desc">Before a new client can use ManaGEM, their customers, products, pricing and staff have to be in it. That depended on collecting the information and typing it in by hand. Take-On is my design for a guided alternative: the client uploads what they already have, an AI-assisted process structures it, the client reviews and corrects it, and GEMIS checks it before anything is created.</p>
      <p class="mx-part__status"><span class="status status--progress"><span class="status__mark" aria-hidden="true"></span>UX/UI prototype completed; development underway</span></p>
    </div>
    ${video(ctx, 'flow-takeon-upload', 'Uploading files, running the extraction and arriving at the validation summary', { caption: 'Upload, processing and validation. The processing in the prototype is simulated.', source: SRC_TAKEON })}
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
      <h3 class="mx-subh">Prototype behaviour versus production</h3>
      <ul role="list">
        <li><strong>Design</strong>The UX/UI prototype is complete. Development is underway; it is not a released feature.</li>
        <li><strong>Simulated processing</strong>Extraction, confidence scores and timings are designed states, not output from a live AI service.</li>
        <li><strong>Sample records</strong>Companies, customers, products and staff in the prototype are placeholder data.</li>
        <li><strong>Draft compliance wording</strong>POPIA, encryption and audit statements show where that content belongs. They are not claims about implemented security.</li>
      </ul>
    </div>`,
    { mod: 'band' },
  );

const takeonDecisions = (ctx) =>
  section(
    'takeon-decisions',
    `${head({ id: 'takeon-decisions', label: 'Balancing automation with oversight', title: 'The AI assists. People decide.', intro: 'Every decision in Take-On keeps the client able to see what the system did, judge how sure it is, and correct it — and keeps a person at GEMIS responsible for the final check.' })}`,
    { chapter: false },
  ) +
  [
    ['1', 'Flexible document upload', 'Clients bring what they already hold.', shot(ctx, 'to-04-upload', 'Upload screen with files added to each category', { caption: 'One area per category, with accepted formats and a manual-entry fallback.', source: SRC_TAKEON }),
      [['Why', 'Retyping every record is the manual work the brief set out to reduce.'], ['Design', 'One drop area per kind of information; required ones are marked.'], ['Detail', 'Accepted formats on every area: PDF, XLSX, CSV, DOCX, JPG, PNG.'], ['Fallback', 'Any category can be entered manually instead.']]],
    ['2', 'Transparent processing', 'Say what is happening, as it happens.', shot(ctx, 'to-05-extraction', 'Extraction screen with counts and a log', { caption: 'Processing explained document by document. Simulated in the prototype.', source: SRC_TAKEON }),
      [['Why', 'A spinner asks for trust in something nobody can see.'], ['Design', 'A running log names each document as it is read.'], ['Detail', 'Counts of records found and flagged update as it runs.'], ['Record', 'Each stage is listed with a time.']]],
    ['3', 'Confidence and validation', 'Put effort where it is needed.', `<div class="mx-duo">${shot(ctx, 'to-06-validation', 'Validation summary', { caption: 'A summary sets expectations before the detail.', source: SRC_TAKEON, sizes: '(min-width: 1264px) 600px, 100vw' })}${shot(ctx, 'to-07-lowconf', 'A low-confidence record with only a name found', { caption: 'A low-confidence record says exactly what could not be read.', source: SRC_TAKEON, sizes: '(min-width: 1264px) 600px, 100vw' })}</div>`,
      [['Why', 'Equal care on every record is slow, and people stop reading.'], ['States', 'Verified, Needs review, Possible duplicate, Low confidence.'], ['Detail', 'Each state uses a word and an icon, not colour alone.'], ['Speed', 'Filters jump straight to records needing a decision.']]],
    ['4', 'Evidence and correction', 'Show the source behind every record.', video(ctx, 'flow-takeon-review', 'Filtering records, opening one with a missing email, then merging a duplicate', { caption: 'Evidence, missing fields and a duplicate merged.', source: SRC_TAKEON }),
      [['Evidence', 'Source document, original text and a confidence score per record.'], ['Gaps', 'Missing fields are called out, such as “Email not found in source document”.'], ['Control', 'Every field is editable; a record can be confirmed or rejected.'], ['Duplicates', 'Merge with existing, keep both, or discard.']]],
    ['5', 'Human verification', 'Submitting hands over to a person.', video(ctx, 'flow-takeon-submit', 'Reviewing issues, confirming, submitting for GEMIS review, then the GEMIS queue', { caption: 'Outstanding issues, declaration, submission and the GEMIS queue.', source: SRC_TAKEON }),
      [['Why', 'Automation does not remove the need for oversight.'], ['Before', 'Outstanding issues are listed before the client submits.'], ['Wording', 'The last screen says “Submitted for GEMIS review”, not “Done”.'], ['GEMIS side', 'A queue shows each company’s progress and sign-offs.']]],
  ]
    .map(([n, title, lede, media, beats], i) => section(`key-${n}`, feature({ id: `key-${n}`, tag: `Take-On · 0${n}`, title, lede, media, beats }), { mod: i % 2 ? '' : 'soft', label: `key-${n}-t`, chapter: false }))
    .join('');

// ------------------------------------------------------- 6.8 · evaluation

const measures = [
  ['Finding information', 'Time taken to locate key records, such as an overdue invoice or a customer’s open job.'],
  ['Repeated saves', 'How often a form is submitted more than once.'],
  ['Duplicate submissions', 'Duplicate records created from the same entry.'],
  ['Key workflows', 'Time to complete workflows such as enquiry to quotation.'],
  ['Time to first invoice', 'For a new client, from account setup to their first invoice.'],
  ['Take-On completion', 'Share of clients who finish onboarding once they start.'],
  ['Manual correction', 'Number of extracted records a client has to correct.'],
  ['GEMIS review time', 'Time for GEMIS to verify a Take-On submission.'],
];

const evaluation = () =>
  section(
    'evaluation',
    `
    ${head({ id: 'evaluation', n: '08', label: 'Validation and measurement', title: 'How we plan to evaluate the redesign.', intro: 'The redesigned product has not been released, so none of these has been measured. They are proposed measures for after release — not results.' })}
    <ol class="mf-measures" role="list">
      ${measures.map(([t, d]) => `<li><span class="mf-measures__tag">Proposed</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
    </ol>
    <p class="mx-unclaimed">No usability testing of the redesign is documented, and none is claimed.</p>`,
  );

// ----------------------------------------------------- 6.9 · status

const statusSection = (ctx) =>
  section(
    'status',
    `
    <div class="mq-statusblock">
      <div>
        <p class="mx-kicker"><span class="mx-kicker__n">09</span>Implementation and outcome</p>
        <h2 class="mx-h2" id="status-h">Designed. Now moving through implementation.</h2>
        <p class="mq-lede">From a design perspective the redesign is complete, and the development team is now coding it. The redesigned screens have not been released to customers. Rather than releasing them one at a time, GEMIS plans to release the redesigned product as a complete, coordinated experience once implementation is ready.</p>
        <p class="mq-note">No performance outcomes are available yet. The notes below separate what I designed from what is still being built.</p>
      </div>
      ${statusList()}
    </div>
    <div class="mf-split">
      <div><p class="mx-card__k">Existing functionality</p><p>The modules and workflows ManaGEM already supported, kept in the redesign.</p></div>
      <div><p class="mx-card__k">My design contribution</p><p>How those workflows are organised, connected, presented and confirmed — and the Take-On experience.</p></div>
      <div><p class="mx-card__k">Prototype behaviour</p><p>Simulated extraction, sample records and draft compliance wording in Take-On.</p></div>
      <div><p class="mx-card__k">Built by others</p><p>Backend, database, AI and integration work belongs to the development team, not to my role.</p></div>
    </div>
    <div class="btn-row mx-center">
      ${button(ctx, { label: 'Open the redesign prototype', href: 'prototypes/managem.html', variant: 'primary', ic: 'external', external: true })}
      ${button(ctx, { label: 'Open the Take-On prototype', href: TAKEON_FILE, variant: 'secondary', ic: 'external', external: true })}
    </div>
    <p class="mx-fine">Both prototypes are built for desktop screens and use demo data.</p>
    ${todo(ctx, 'ManaGEM: team, collaborators and project timeline', '— left off both pages until confirmed.')}
    ${todo(ctx, 'ManaGEM: confirm the sample company name in the Take-On prototype ("SBS Waterproofing") may be shown publicly', '— it is also the account name in the legacy screenshots, where it has been redacted.')}
    ${todo(ctx, 'ManaGEM: confirm who produced the product film and that it may be shown', '— used in the Product background section of the full case study.')}`,
    { mod: 'soft' },
  );

// ------------------------------------------------- 6.10 · reflection

const reflection = () =>
  section(
    'reflection',
    `
    ${head({ id: 'reflection', n: '10', label: 'Reflection', title: 'What this project taught me about designing an ERP.' })}
    <div class="mx-lessons">
      <article><h3>Appearance is the last layer</h3><p>The Customers list did not need nicer colours; it needed columns that meant something and rows that lined up. Most of the work was deciding what each screen is for before deciding how it looks.</p></article>
      <article><h3>Modules depend on each other</h3><p>An invoice is only as clear as the job and enquiry behind it. Changing one screen meant checking every screen that reads its records — which is why I redesigned workflow by workflow, not page by page.</p></article>
      <article><h3>Simplify the path, keep the function</h3><p>Businesses rely on features that look redundant from outside. The safer move was usually to regroup a function or move it out of the way, rather than remove it.</p></article>
      <article><h3>What I want to measure</h3><p>Once released, I want to see whether repeat saves and duplicate records fall, whether new clients find invoices and jobs without help, and how many Take-On records still need manual correction.</p></article>
    </div>`,
  );

export default {
  render(ctx) {
    const p = projects.find((x) => x.slug === 'managem');
    const next = projects[(projects.indexOf(p) + 1) % projects.length];
    return `
  <article class="case mx mx--full">
    ${hero(ctx)}
    ${chapterNav(ctx, chapters, { name: 'ManaGEM · Full', cta: `<a class="btn btn--secondary mx-chapters__cta" href="${url(ctx, QUICK)}">Overview</a>` })}
    ${background(ctx)}
    ${existing(ctx)}
    ${problem(ctx)}
    ${approach(ctx)}
    ${decisions(ctx)}
    ${patternsSection(ctx)}
    ${takeonIntro(ctx)}
    ${takeonDecisions(ctx)}
    ${evaluation(ctx)}
    ${statusSection(ctx)}
    ${reflection(ctx)}
    <section class="mf-return" aria-labelledby="mf-return-h">
      <div class="wrap">
        <h2 id="mf-return-h">That’s the full story.</h2>
        <p>Short on time? The overview covers the role, decisions and redesigned interface in about three minutes.</p>
        <a class="btn btn--secondary" href="${url(ctx, QUICK)}">${glyph.back}<span>Back to the overview</span></a>
      </div>
    </section>
    ${nextProject(ctx, next)}
  </article>`;
  },
};
