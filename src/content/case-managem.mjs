// ManaGEM case study — a flagship page with its own layout (see `render`).
//
// Evidence rules for this file:
//  - Every screenshot is captured from the two supplied prototypes
//    (prototypes/managem.html and "ManaGem Take-On (Standalone).html").
//    They show demo / sample data, never client data.
//  - Problems are the seven items in the redesign brief. Nothing else is
//    claimed as a finding: no research sessions, quotes or metrics.
//  - Take-On is a designed prototype with development underway. Its AI
//    processing is simulated; its legal and security copy is prototype content.
//  - Anything that could not be verified is left off the page and logged with
//    todo(...) so it appears in CONTENT-NEEDED.md.

import { esc, url, img, todo, button, status, icon } from '../shared.mjs';

const SRC_CORE = 'Core redesign prototype · demo data';
const SRC_TAKEON = 'Take-On prototype · sample data';
const TAKEON_FILE = 'ManaGem%20Take-On%20(Standalone).html';

const full = (ctx, key) => url(ctx, `assets/images/${key}${key.endsWith('mg-sidebar') ? '' : '-1600'}.webp`);

/** A real product screenshot. framed adds browser chrome; every shot opens in the viewer. */
function shot(ctx, key, alt, { caption = '', source = SRC_CORE, framed = false, sizes = '(min-width: 1264px) 700px, 100vw', eager = false, cls = '' } = {}) {
  const k = `managem/${key}`;
  const image = `<a class="zoom" href="${full(ctx, k)}" data-zoom data-caption="${esc(caption || alt)}" aria-label="Enlarge: ${esc(alt)}">${img(ctx, k, alt, { sizes, eager })}</a>`;
  return `<figure class="fig mx-shot${framed ? ' mx-shot--framed' : ''}${cls ? ` ${cls}` : ''}">
    ${framed ? `<div class="mx-chrome"><div class="mx-chrome__bar" aria-hidden="true"><i></i><i></i><i></i></div>${image}</div>` : image}
    <figcaption>${caption ? `<span>${esc(caption)}</span>` : ''}<span class="mx-src">${esc(source)}</span></figcaption>
  </figure>`;
}

const kicker = (n, label) => `<p class="mx-kicker"><span class="mx-kicker__n">${n}</span>${esc(label)}</p>`;

const head = (id, n, label, title, intro = '') => `
  <header class="mx-head">
    ${kicker(n, label)}
    <div class="mx-head__main">
      <h2 class="mx-h2" id="${id}-h">${title}</h2>
      ${intro ? `<p class="mx-intro">${intro}</p>` : ''}
    </div>
  </header>`;

const section = (id, body, mod = '') => `
  <section class="mx-sec${mod ? ` mx-sec--${mod}` : ''}" id="${id}" aria-labelledby="${id}-h" data-chapter>
    <div class="wrap">${body}</div>
  </section>`;

const note = (text) => `<p class="mx-note">${text}</p>`;

/** One core-redesign decision, told in the same five beats each time. */
function decision(ctx, { letter, title, difficulty, why, choice, result, shows, media, flip = false }) {
  return `
  <article class="mx-decision${flip ? ' mx-decision--flip' : ''}" aria-labelledby="core-${letter}">
    <div class="mx-decision__text">
      <p class="mx-decision__letter" aria-hidden="true">${letter}</p>
      <h3 class="mx-h3" id="core-${letter}">${title}</h3>
      <dl class="mx-beats">
        <div><dt>What was difficult</dt><dd>${difficulty}</dd></div>
        <div><dt>Why it mattered</dt><dd>${why}</dd></div>
        <div><dt>The decision</dt><dd>${choice}</dd></div>
        <div><dt>In the interface</dt><dd>${result}</dd></div>
      </dl>
      <p class="mx-shows"><span>Demonstrates</span>${shows}</p>
    </div>
    <div class="mx-decision__media">${media}</div>
  </article>`;
}

/** One Take-On UX decision. */
function keyDecision(ctx, { n, title, reason, detail, media }) {
  return `
  <article class="mx-key" aria-labelledby="key-${n}">
    <div class="mx-key__text">
      <p class="mx-key__n" aria-hidden="true">${n}</p>
      <h3 class="mx-h3" id="key-${n}">${title}</h3>
      <p class="mx-key__reason">${reason}</p>
      <ul class="mx-ticks" role="list">${detail.map((d) => `<li>${d}</li>`).join('')}</ul>
    </div>
    <div class="mx-key__media">${media}</div>
  </article>`;
}

const chapters = [
  ['overview', 'Overview'],
  ['product', 'Product'],
  ['challenge', 'Challenge'],
  ['role', 'My role'],
  ['analysis', 'Analysis'],
  ['core', 'Core redesign'],
  ['takeon', 'Take-On'],
  ['decisions', 'UX decisions'],
  ['screens', 'Screens'],
  ['status', 'Status'],
  ['reflection', 'Reflection'],
];

// --------------------------------------------------------------- sections

const hero = (ctx) => `
  <header class="mx-hero wrap">
    <a class="back" href="${url(ctx, 'index.html#work')}">← Selected work</a>
    <p class="mx-eyebrow">Case study <span aria-hidden="true">·</span> Enterprise ERP <span aria-hidden="true">·</span> Product redesign</p>
    <h1 class="mx-title">Reimagining ManaGEM</h1>
    <p class="mx-sub">Redesigning an established business management platform, simplifying complex workflows, and designing a more structured approach to client onboarding.</p>
    <div class="btn-row">
      ${button(ctx, { label: 'Read the case study', href: '#overview', variant: 'primary', ic: '' })}
      ${button(ctx, { label: 'Open the prototype', href: 'prototypes/managem.html', variant: 'secondary', ic: 'external', external: true })}
    </div>
    <dl class="mx-herometa">
      <div><dt>My role</dt><dd>Product Design, UX/UI Design, Workflow Redesign</dd></div>
      <div><dt>Organisation</dt><dd>GEMIS</dd></div>
      <div><dt>Project type</dt><dd>Existing product redesign and onboarding experience design</dd></div>
      <div><dt>Status</dt><dd>${status('Core redesign: designed', 'live')}${status('Take-On: prototype complete, development underway', 'progress')}</dd></div>
    </dl>
  </header>
  <div class="mx-stage">
    <div class="wrap">
      ${shot(ctx, 'mg-dashboard', 'The redesigned ManaGEM dashboard: grouped navigation on the left, a messages banner, four headline figures, a sales summary chart and current projects', {
        caption: 'The redesigned dashboard — the first screen a user sees after signing in.',
        framed: true,
        eager: true,
        sizes: '(min-width: 1264px) 1200px, 100vw',
      })}
    </div>
  </div>`;

const overview = (ctx) =>
  section(
    'overview',
    `
    ${head('overview', '01', 'Project overview', 'A substantial redesign of a product that already existed — not a new product.')}
    <div class="mx-split">
      <div class="mx-brief">
        <div>
          <h3 class="mx-label">What it is</h3>
          <p>ManaGEM is a business management (ERP) platform developed by GEMIS. It grew from a template bought around 2015 into a system that other businesses could run on.</p>
        </div>
        <div>
          <h3 class="mx-label">The problem</h3>
          <p>The original experience had become hard for new clients to understand and navigate, and bringing a new client onto the platform depended on collecting and capturing their information by hand.</p>
        </div>
        <div>
          <h3 class="mx-label">What I did</h3>
          <p>I rethought the product screen by screen and workflow by workflow, redesigned its interface, and designed Take-On — an AI-assisted onboarding experience for new clients.</p>
        </div>
      </div>
      <dl class="mx-facts">
        <div><dt>Product</dt><dd>ManaGEM</dd></div>
        <div><dt>Organisation</dt><dd>GEMIS</dd></div>
        <div><dt>Project</dt><dd>ERP product redesign and onboarding experience design</dd></div>
        <div><dt>My role</dt><dd>Product Design, UX/UI Design, Workflow Redesign</dd></div>
        <div><dt>Scope</dt><dd>Existing product experience, navigation, interface, workflows, and the Take-On onboarding prototype</dd></div>
        <div><dt>Take-On status</dt><dd>UX/UI prototype completed; development underway</dd></div>
      </dl>
    </div>
    ${todo(ctx, 'ManaGEM: team, collaborators and project timeline', '— left off the page until they can be confirmed.')}`,
  );

const flowNodes = [
  ['Enquiry', 'A lead is captured and tracked through the sales pipeline.'],
  ['Quote', 'The enquiry is priced and quoted from the product catalogue.'],
  ['Job', 'Accepted work becomes a project, or a build in the factory.'],
  ['Stock', 'Materials are purchased, stored, moved and dispatched.'],
  ['Invoice', 'Completed work is billed and passed to accounting.'],
  ['Payment', 'Outstanding balances are followed up in debtors.'],
];

const product = (ctx) =>
  section(
    'product',
    `
    ${head('product', '02', 'Understanding the product', 'One platform. Multiple connected business workflows.', 'ManaGEM follows a piece of work from the first enquiry to the final payment. Each stage belongs to a different part of the business, but they all describe the same job — which is why the product needs careful information architecture rather than a collection of separate screens.')}
    <ol class="mx-flow" role="list" aria-label="How work moves through ManaGEM">
      ${flowNodes.map(([t, d], i) => `<li><span class="mx-flow__n">${String(i + 1).padStart(2, '0')}</span><strong>${t}</strong><span>${d}</span></li>`).join('')}
    </ol>
    <div class="mx-shared">
      <p class="mx-label">Shared by every stage</p>
      <ul role="list"><li>Customers and contacts</li><li>Products and pricing</li><li>Staff records</li><li>Reports</li><li>Accounting sync (Sage)</li></ul>
    </div>
    <p class="mx-aside">A record created in one stage is read in the next. If an enquiry, a quote or an invoice is hard to find or unclear in one place, the confusion travels down the chain.</p>`,
    'soft',
  );

const themes = [
  ['Complexity', 'The existing system was difficult for new clients to understand and navigate, and it carried features that made the experience more complicated than it needed to be.'],
  ['Operational clarity', 'Certain information — invoice-related data in particular — did not consistently reflect as users expected.'],
  ['Limited feedback', 'Users had little visibility of messages, notifications or tasks needing their attention. Forms did not clearly confirm a save, so people clicked save again and risked creating duplicate actions.'],
  ['Product consistency', 'The interface did not adequately reflect GEMIS branding, and features needed a more deliberate organisation.'],
];

const challenge = (ctx) =>
  section(
    'challenge',
    `
    ${head('challenge', '03', 'The challenge', 'The brief was not to make the platform look better. It was to make it easier to understand.')}
    <ol class="mx-themes" role="list">
      ${themes.map(([t, d], i) => `<li><span class="mx-themes__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><h3 class="mx-h3">${t}</h3><p>${d}</p></li>`).join('')}
    </ol>
    <div class="mx-callout">
      <p class="mx-label">And before any of that — onboarding</p>
      <p class="mx-callout__text">New clients relied heavily on manual information collection and entry before they could use the platform at all. That created a second opportunity: to rethink how a business arrives in ManaGEM.</p>
    </div>
    ${note('These are the problems as they were set out in the redesign brief. No screenshots of the original interface were available for this case study, so they are described rather than illustrated — and no user research findings are claimed.')}
    ${todo(ctx, 'ManaGEM: screenshots of the original (pre-redesign) interface', '— needed for annotated "before" images and before-and-after comparisons. Neither supplied file contains the legacy UI.')}`,
    'band',
  );

const role = (ctx) =>
  section(
    'role',
    `
    ${head('role', '04', 'My role and ownership', 'I owned the product experience: how it is organised, how it flows, and how it looks.')}
    <div class="mx-split mx-split--role">
      <div class="mx-prose">
        <p class="mx-statement">I took ownership of rethinking the ManaGEM experience across its major screens and workflows.</p>
        <p>Rather than approaching the project as a visual refresh, I examined how existing functionality connected, where the experience created unnecessary complexity, and how the product could become easier to navigate.</p>
        <p>I redesigned the interface, reconsidered workflow structures, and worked to preserve the functionality the business already depended on while creating a more coherent experience around it.</p>
      </div>
      <div class="mx-own">
        <div>
          <h3 class="mx-label">What I did</h3>
          <ul class="mx-ticks" role="list">
            <li>Rethought the product screen by screen and workflow by workflow</li>
            <li>Redesigned the overall interface</li>
            <li>Reconsidered how existing functions connect across the product</li>
            <li>Kept working features and improved how they are used</li>
            <li>Simplified areas that were unnecessarily complicated</li>
            <li>Made product experience and workflow decisions</li>
            <li>Designed the Take-On onboarding experience end to end</li>
          </ul>
        </div>
        <div>
          <h3 class="mx-label">Outside my role</h3>
          <ul class="mx-crosses" role="list">
            <li>Backend development</li>
            <li>Database changes</li>
            <li>AI models and extraction logic</li>
            <li>Technical integrations</li>
          </ul>
        </div>
      </div>
    </div>`,
  );

const briefMap = [
  ['Hard for new clients to navigate', 'Every destination in the product, and which ones belong to the same part of the business', 'A', 'Grouped navigation'],
  ['Invoice information not reflecting as expected', 'Everywhere invoice data appears: invoices, the accounting sync and debtors', 'B', 'Readable records and visible state'],
  ['Little visibility of messages, notifications and tasks', 'Where items needing attention live, and whether they are visible without searching', 'C', 'Operational visibility'],
  ['No clear confirmation that a form saved', 'How multi-field forms commit, and what the user sees before and after', 'D', 'Form feedback'],
  ['Interface did not reflect GEMIS branding', 'The sign-in screen, the product shell and shared components', 'E', 'One product language'],
  ['Unnecessary features adding complexity', 'Which functions are separate destinations and which belong inside a module', 'F', 'Simplifying'],
  ['Onboarding depended on manual capture', 'What a new client has to supply: company details, customers, products, staff', '→', 'ManaGEM Take-On'],
];

const analysis = (ctx) =>
  section(
    'analysis',
    `
    ${head('analysis', '05', 'Understanding the existing system', 'Before changing how it looked, I worked out how it fitted together.', 'This was product and workflow analysis: working through the existing system against the redesign brief. It was not formal user research, and I have not described it as such.')}
    <div class="mx-method">
      <div><span class="mx-method__n">1</span><h3 class="mx-label">Inventory</h3><p>List every function the business relies on, so that nothing that works is lost in the redesign.</p></div>
      <div><span class="mx-method__n">2</span><h3 class="mx-label">Relationships</h3><p>Trace how a record moves between modules — enquiry to quote, job to invoice, invoice to accounting.</p></div>
      <div><span class="mx-method__n">3</span><h3 class="mx-label">Friction</h3><p>Take each problem in the brief and find the places in the product where it actually shows up.</p></div>
    </div>
    <div class="mx-map" role="table" aria-label="Each problem in the brief, what was examined, and the design response">
      <div class="mx-map__head" role="row"><span role="columnheader">Problem in the brief</span><span role="columnheader">What I examined</span><span role="columnheader">Design response</span></div>
      ${briefMap
        .map(
          ([p, e, l, r]) => `<div class="mx-map__row" role="row"><span role="cell" data-label="Problem in the brief"><strong>${p}</strong></span><span role="cell" data-label="What I examined">${e}</span><span role="cell" data-label="Design response"><a href="#${l === '→' ? 'takeon' : `core-${l}`}"><b class="mx-map__tag">${l}</b>${r}</a></span></div>`,
        )
        .join('')}
    </div>`,
  );

const navGroups = [
  ['Core', ['Dashboard']],
  ['Customers', ['Customers', 'Customer Contacts', 'Warranties']],
  ['Sales', ['New Enquiry', 'Open Enquiries', 'Closed Enquiries', 'Invoices', 'Sage Invoices', 'Inspection Reports', 'Sales Targets', 'Quote Templates', 'Reports', 'Master Data']],
  ['Operations', ['Debtors Management', 'Products & Pricing', 'Projects Module', 'Factory', 'Stock Control']],
  ['Admin', ['Staff Records', 'My Companies', 'Manage Users', 'Master Data', 'Settings']],
];

const core = (ctx) =>
  section(
    'core',
    `
    <div class="mx-part">
      <p class="mx-part__n">Initiative 01</p>
      <p class="mx-part__name">ManaGEM Core Experience</p>
      <p class="mx-part__desc">The redesign of the established ERP: its navigation, how it presents information, and its workflows.</p>
    </div>
    ${head('core', '06', 'Redesigning the core experience', 'Six decisions that shaped the redesign.')}

    ${decision(ctx, {
      letter: 'A',
      title: 'A more coherent navigation experience',
      difficulty: 'A new client has to find their way around two dozen destinations before the product becomes useful to them.',
      why: 'If people cannot tell where they are or where a task lives, every other improvement is hidden behind that confusion.',
      choice: 'Organise navigation by the part of the business it serves, not as one long list — and always show the user where they are.',
      result: 'Five labelled groups, a breadcrumb on every page, a search field in the top bar, and counts beside the items that have open work.',
      shows: 'Information architecture',
      media: `
        <div class="mx-navmap">
          ${shot(ctx, 'mg-sidebar', 'The redesigned ManaGEM sidebar with its five labelled groups: Core, Customers, Sales, Operations and Admin', { caption: 'The full sidebar.', sizes: '240px', cls: 'mx-shot--sidebar' })}
          <div class="mx-tree" aria-label="Navigation groups in the redesign">
            ${navGroups.map(([g, items]) => `<div><p class="mx-tree__g">${g}<span>${items.length}</span></p><ul role="list">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></div>`).join('')}
          </div>
        </div>`,
    })}

    ${decision(ctx, {
      letter: 'B',
      flip: true,
      title: 'Making important information easier to understand',
      difficulty: 'Business records are dense, and invoice information in particular was not reflecting the way users expected.',
      why: 'People act on what a screen tells them. If the state of an invoice is unclear, the follow-up is wrong or late.',
      choice: 'Give every list the same anatomy, lead with totals, and put the state of each record into plain words.',
      result: 'Invoices open with billed, paid, outstanding and overdue totals; each row says Paid, Partial, Unpaid or Overdue. The accounting view shows whether each invoice is Synced, Pending or in Error, and when it last synced.',
      shows: 'Data-heavy UI design',
      media: `
        ${shot(ctx, 'mg-invoices', 'Invoices list with four summary totals above a table where each invoice has a plain-word status', { caption: 'Invoices: totals first, then a status in words on every row.' })}
        ${shot(ctx, 'mg-detail-sage', 'Sage Invoices screen showing a connected indicator, counts of synced, pending and errored invoices, and a last-sync time per row', { caption: 'The accounting view makes sync state visible per invoice. This is the designed interface; data accuracy itself is an engineering concern.' })}`,
    })}

    ${decision(ctx, {
      letter: 'C',
      title: 'Improving operational visibility',
      difficulty: 'Users had limited visibility of messages, notifications and tasks that needed their attention.',
      why: 'Work that nobody notices does not get done — and in a connected system, one missed item delays the next stage.',
      choice: 'Bring what needs attention to the places people already look, instead of expecting them to go and check.',
      result: 'A messages banner at the top of the dashboard, a notification indicator in the top bar, counts in the navigation, and alert panels inside modules such as low stock.',
      shows: 'Systems thinking',
      media: `
        ${shot(ctx, 'mg-detail-attention', 'Top of the dashboard with a banner reading "You have 4 new messages" above four headline figures', { caption: 'Messages are surfaced on the dashboard, above the figures.' })}
        ${shot(ctx, 'mg-stock-alerts', 'Stock Control dashboard showing recent movements, open purchase orders and a low stock alerts panel', { caption: 'Inside Stock Control, low-stock items and open purchase orders sit beside day-to-day activity.' })}
        ${note('This is the design direction for surfacing attention. I am not claiming specific notification behaviour as implemented.')}`,
    })}

    ${decision(ctx, {
      letter: 'D',
      flip: true,
      title: 'Clearer form feedback',
      difficulty: 'Forms did not make it clear that information had saved, so users clicked save repeatedly.',
      why: 'Repeated saves can create duplicate actions — and uncertainty about whether work was kept erodes trust in the whole system.',
      choice: 'Make the moment of commitment unmistakable: show progress through the form, ask for one review, and offer one final action.',
      result: 'New Enquiry is a four-step form with a visible stepper. The last step summarises what will be created and has a single Create Enquiry button; the user then lands on the enquiry list.',
      shows: 'Interaction design',
      media: `
        ${shot(ctx, 'mg-new-enquiry', 'Step one of the New Enquiry form with a four-step progress indicator and required fields marked', { caption: 'Step 1 of 4 — required fields are marked and progress is always visible.' })}
        ${shot(ctx, 'mg-detail-review', 'Final review step of New Enquiry summarising customer, site, schedule and estimated value above one Create Enquiry button', { caption: 'Step 4 — a review of everything entered, then one clear commit.' })}
        ${todo(ctx, 'ManaGEM: designed save-confirmation states (saving, saved, error)', '— the supplied prototype shows the review-then-commit pattern but contains no explicit saved/toast state, so none is shown.')}`,
    })}

    ${decision(ctx, {
      letter: 'E',
      title: 'A more consistent product language',
      difficulty: 'The interface did not adequately reflect GEMIS branding, and the product did not read as one system.',
      why: 'Consistency is how people transfer what they learned on one screen to the next. In an ERP that saving is repeated across every module.',
      choice: 'Carry the GEMIS identity through the shell and build each module from the same small set of parts.',
      result: 'A branded sign-in and sidebar, and one page anatomy — title, summary figures, tabs, filters, table — reused from Factory to Staff Records.',
      shows: 'UI craft and consistency',
      media: `
        ${shot(ctx, 'mg-login', 'ManaGEM sign-in screen with the GemIS mark, the line "Run your business with clarity" and a sign-in form', { caption: 'Sign-in carries the GEMIS identity from the first screen.' })}
        <div class="mx-pair">
          ${shot(ctx, 'mg-factory', 'Factory module with summary figures and a five-stage production pipeline', { caption: 'Factory', sizes: '(min-width: 1264px) 340px, 50vw' })}
          ${shot(ctx, 'mg-staff', 'Staff Members list using the same tabs, filters and table pattern', { caption: 'Staff Records', sizes: '(min-width: 1264px) 340px, 50vw' })}
        </div>`,
    })}

    ${decision(ctx, {
      letter: 'F',
      flip: true,
      title: 'Simplifying the experience',
      difficulty: 'Unnecessary features and scattered functions made the system more complicated than the work it supported.',
      why: 'Complexity that does not serve a task is a cost every user pays on every visit.',
      choice: 'Reconsider how features are organised before reconsidering whether they exist — keep what the business depends on, and put related functions together.',
      result: 'Related functions live inside their module as tabs: Stock Control holds suppliers, purchase orders, stores, movements and stock takes in one place, and the dashboard offers shortcuts to the most common tasks.',
      shows: 'Product judgement',
      media: `
        ${shot(ctx, 'mg-stock', 'Stock Control with its sub-areas arranged as tabs across the top of a single module', { caption: 'Stock Control: twelve related areas organised as tabs within one module.' })}
        ${note('I describe this as reorganisation. I am not claiming that specific features were removed.')}`,
    })}`,
  );

const journey = [
  ['to-01-welcome', 'Welcome', 'Explains the four stages and what the client will need, before asking for anything.', 'Take-On welcome screen describing upload, AI structuring, review and the GEMIS final check'],
  ['to-02-trust', 'Trust and compliance', 'A plain-language summary of how data is handled, with explicit consent.', 'Trust and compliance screen with four data-handling summaries and a data processing agreement'],
  ['to-03-profile', 'Company profile', 'The basic company details that set up the client’s workspace.', 'Company profile form with registered name, registration number, contact details and industry'],
  ['to-04-upload', 'Document upload', 'One labelled drop area per kind of information, required or optional.', 'Upload screen with separate areas for customer list, product and price list, staff records and supplier list'],
  ['to-05-extraction', 'AI extraction', 'Processing shown as a readable log rather than a spinner.', 'Extraction screen with running counts, an extraction log and an audit activity list'],
  ['to-06-validation', 'Validation summary', 'What was found and how confident the system is, before any detail.', 'Validation summary with document and record counts, validation results and a confidence breakdown'],
  ['to-07-customers', 'Customer review', 'Every extracted customer with a status, filterable by what needs attention.', 'Customer review table where each record is marked verified, needs review, possible duplicate or low confidence'],
  ['to-08-products', 'Product review', 'The same review pattern, applied to products and pricing.', 'Product and pricing review table with the same status column and filters'],
  ['to-09-staff', 'Staff review', 'The same pattern again for staff records.', 'Staff review table with verified, needs review and low confidence records'],
  ['to-10-confirm', 'Confirmation and submission', 'Overall readiness, outstanding issues and a final declaration.', 'Final confirmation screen with a readiness score, per-category totals and a list of issues to fix'],
  ['to-11-complete', 'Completion', 'Confirms the submission and explains that GEMIS reviews it next.', 'Completion screen confirming the submission was sent for GEMIS review, with a reference number'],
];

const phases = [
  ['Prepare', '1–3'],
  ['Provide', '4'],
  ['Process', '5–6'],
  ['Review', '7–9'],
  ['Submit', '10–11'],
];

const takeon = (ctx) =>
  section(
    'takeon',
    `
    <div class="mx-part">
      <p class="mx-part__n">Initiative 02</p>
      <p class="mx-part__name">ManaGEM Take-On</p>
      <p class="mx-part__desc">A new onboarding experience: from submitting business information, through AI-assisted extraction and review, to a final GEMIS check.</p>
      <p class="mx-part__status">${status('Designed prototype · development underway', 'progress')}</p>
    </div>
    ${head('takeon', '07', 'Rethinking client onboarding', 'From manual information capture to a guided onboarding experience.', 'A redesigned product is still hard to start using if getting into it is slow. New clients have to provide their business information before the platform is useful to them, and the traditional approach relied on collecting and capturing that information by hand. Take-On is my design for a more structured route in — an extension of the same redesign, not a separate product.')}
    <div class="mx-phases" aria-hidden="true">${phases.map(([p, r]) => `<div><strong>${p}</strong><span>Steps ${r}</span></div>`).join('')}</div>
    <div class="mx-railbar">
      <p class="mx-railhint" id="rail-hint">The complete journey, in order. Scroll sideways to move through all eleven steps; select any screen to enlarge it.</p>
      <div class="mx-railbtns">
        <button type="button" data-rail-prev aria-label="Previous step" aria-controls="takeon-rail">${icon.arrow}</button>
        <button type="button" data-rail-next aria-label="Next step" aria-controls="takeon-rail">${icon.arrow}</button>
      </div>
    </div>
    <ol class="mx-rail" id="takeon-rail" role="list" tabindex="0" aria-labelledby="rail-hint" data-rail>
      ${journey
        .map(
          ([key, t, d, alt], i) => `<li class="mx-rail__item">
        <div class="mx-rail__meta"><span class="mx-rail__n">${String(i + 1).padStart(2, '0')}</span><h3 class="mx-rail__t">${t}</h3><p>${d}</p></div>
        ${shot(ctx, key, alt, { source: SRC_TAKEON, sizes: '(min-width: 900px) 640px, 84vw' })}
      </li>`,
        )
        .join('')}
    </ol>
    <div class="mx-proto">
      <h3 class="mx-label">Reading these screens correctly</h3>
      <ul class="mx-proto__list" role="list">
        <li><strong>It is a prototype.</strong> The UX/UI design is complete and development is underway. It is not presented here as a released feature.</li>
        <li><strong>The processing is simulated.</strong> The extraction, confidence scores and timings on screen are designed states, not output from a live AI integration or measured results.</li>
        <li><strong>The records are samples.</strong> Company names, customers, products and staff are placeholder data, not client data.</li>
        <li><strong>The legal and security wording is draft content.</strong> Statements about POPIA, encryption and audit trails show where that information belongs in the flow; they still need technical and legal validation.</li>
      </ul>
    </div>`,
    'band',
  );

const decisions = (ctx) =>
  section(
    'decisions',
    `
    ${head('decisions', '08', 'Key UX decisions', 'Five decisions about how much to trust automation — and how to show it.', 'The principle behind all five: AI-assisted extraction is not treated as infallible or autonomous. People should be able to understand, inspect and correct information before it is submitted.')}

    ${keyDecision(ctx, {
      n: '01',
      title: 'Flexible document onboarding',
      reason: 'Clients already hold this information somewhere — in a spreadsheet, a price list, a scanned page. Asking them to retype it record by record is the manual work the brief set out to reduce.',
      detail: ['One drop area per kind of information, so nothing needs to be labelled or sorted first', 'Accepted formats are stated on every area: PDF, XLSX, CSV, DOCX, JPG, PNG', 'Required and optional categories are marked, and the screen says what is still missing', 'No document? Each category can be typed in manually instead'],
      media: shot(ctx, 'to-04-upload', 'Upload screen with files added to the customer and product areas, each file marked encrypted and scanned', { caption: 'Upload: one area per category, with each file’s state shown on the file itself.', source: SRC_TAKEON }),
    })}

    ${keyDecision(ctx, {
      n: '02',
      title: 'Transparent processing',
      reason: 'A progress spinner asks people to trust something they cannot see. If a system is going to read a company’s records, it should say what it is doing while it does it.',
      detail: ['A running log names each document as it is read', 'Counts of customers, products, staff and flagged records update as the step progresses', 'An activity list records each stage with a time'],
      media: shot(ctx, 'to-05-extraction', 'Extraction screen with counts of customers, products, staff and flagged records above an extraction log and an audit activity list', { caption: 'Processing explained in words. In the prototype this step is simulated.', source: SRC_TAKEON }),
    })}

    ${keyDecision(ctx, {
      n: '03',
      title: 'Confidence-based validation',
      reason: 'Reviewing every record with equal care is slow, and people stop reading. The design separates what looks ready from what needs attention, so effort goes where it matters.',
      detail: ['A summary first: how many records were found and how they break down', 'Four plain-language states — Verified, Needs review, Possible duplicate, Low confidence', 'State is carried by a word and an icon, not by colour alone', 'Filters jump straight to the records that need a decision'],
      media: `
        ${shot(ctx, 'to-06-validation', 'Validation summary showing documents processed, records detected, validation results by type and a confidence breakdown', { caption: 'The summary sets expectations before the detail.', source: SRC_TAKEON })}
        ${shot(ctx, 'to-07-customers', 'Customer review table with a status on every row and filters for needs review, duplicates and verified', { caption: 'Every row carries its state; filters isolate what needs attention.', source: SRC_TAKEON })}`,
    })}

    ${keyDecision(ctx, {
      n: '04',
      title: 'Human-in-the-loop review',
      reason: 'An extracted record is a suggestion until someone who knows the business agrees with it. So the design shows the evidence behind each record and leaves the decision with the client.',
      detail: ['Each record shows its source document, the original text and a confidence score', 'A missing or doubtful field is called out — “Email not found in source document”', 'Every field stays editable; a record can be confirmed or rejected', 'Possible duplicates offer three explicit choices: merge with existing, keep both, or discard'],
      media: `
        ${shot(ctx, 'to-07-record', 'Review record panel showing the source document, extracted text, reasoning, a warning that the email was not found, and editable fields', { caption: 'Reviewing one record: where it came from, what is missing, and room to correct it.', source: SRC_TAKEON })}
        ${shot(ctx, 'to-07-duplicate', 'Review record panel for a possible duplicate, showing the matched existing customer and options to discard, keep both or merge', { caption: 'A possible duplicate: the match is explained and the choice is the client’s.', source: SRC_TAKEON })}`,
    })}

    ${keyDecision(ctx, {
      n: '05',
      title: 'GEMIS verification',
      reason: 'Automation does not remove the need for oversight. The flow ends by handing over to a person at GEMIS, and it says so — rather than implying that submitting means the data is live.',
      detail: ['The final step lists outstanding issues before the client submits', 'The completion screen is titled “Submitted for GEMIS review”, not “Done”', 'A GEMIS-side queue shows each company’s progress and what is awaiting sign-off'],
      media: `
        ${shot(ctx, 'to-10-confirm', 'Final confirmation screen with a readiness score, totals per category and a list of issues recommended to fix before submitting', { caption: 'Before submitting: what is ready, and what still needs attention.', source: SRC_TAKEON })}
        ${shot(ctx, 'to-12-admin', 'GEMIS admin view listing companies in the take-on queue with their progress, status and flagged items', { caption: 'The GEMIS side: a queue of submissions awaiting a human check.', source: SRC_TAKEON })}`,
    })}`,
  );

const gallery = [
  ['mg-open-enquiries', 'Open Enquiries — the sales pipeline, with counts per stage above the list.', 'Open Enquiries list with tabs, pipeline stage counts, filters and a table of leads', 'wide', SRC_CORE],
  ['mg-projects', 'Projects — current jobs with foreman, dates and progress.', 'Current Jobs list in the Projects module with progress bars', '', SRC_CORE],
  ['mg-debtors', 'Debtors Management — outstanding balances and ageing by customer.', 'Debtors Management with outstanding totals and an ageing column', '', SRC_CORE],
  ['mg-products', 'Products & Pricing — the catalogue, with pricing, tax and stock.', 'Products and Pricing catalogue table', '', SRC_CORE],
  ['mg-warranties', 'Warranties — active warranties and maintenance that is due or overdue.', 'Warranties list with maintenance status per warranty', '', SRC_CORE],
  ['mg-reports', 'Reports — one report at a time, with its parameters and totals.', 'Quotes report with report types, parameters and results', 'wide', SRC_CORE],
  ['mg-customers', 'Customers — account type, status and accounting link.', 'Customers list with account type and status columns', '', SRC_CORE],
  ['to-08-products', 'Take-On — reviewing extracted products and pricing.', 'Take-On product review table with a status per record', '', SRC_TAKEON],
  ['to-10-declaration', 'Take-On — compliance status and the final declaration before submitting.', 'Take-On final declaration with a compliance checklist and a confirmation checkbox', '', SRC_TAKEON],
  ['to-11-complete', 'Take-On — submitted, and waiting for GEMIS review.', 'Take-On completion screen with a submission reference', '', SRC_TAKEON],
];

const screens = (ctx) =>
  section(
    'screens',
    `
    ${head('screens', '09', 'Final product experience', 'More of the product, at a size you can read.', 'Select any screen to open it full size. Everything here comes from the two design prototypes.')}
    <div class="mx-gallery">
      ${gallery.map(([k, c, a, size, src]) => shot(ctx, k, a, { caption: c, source: src, cls: size ? `mx-gallery__${size}` : '', sizes: size ? '(min-width: 1264px) 1200px, 100vw' : '(min-width: 900px) 590px, 100vw' })).join('')}
    </div>
    <div class="btn-row mx-links">
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
    ${head('status', '10', 'Outcome and implementation status', 'What exists today, stated precisely.')}
    <div class="mx-status">
      <div class="mx-status__col">
        <p class="mx-label">01 — Core ManaGEM redesign</p>
        <p class="mx-status__state">${status('Design complete', 'live')}</p>
        <p>The redesigned experience is designed across the product’s main areas — dashboard, customers, sales, invoicing, debtors, products, projects, factory, stock and staff — and delivered as an interactive prototype.</p>
        <p>This case study makes no claim about how much of the redesign is in production.</p>
      </div>
      <div class="mx-status__col">
        <p class="mx-label">02 — ManaGEM Take-On</p>
        <p class="mx-status__state">${status('Prototype complete · development underway', 'progress')}</p>
        <p>The Take-On UX/UI prototype has been completed, and development is underway.</p>
        <p>The AI processing in the prototype is simulated. It is not described here as a live integration, and clients are not presented as using it.</p>
      </div>
    </div>
    <div class="mx-unclaimed">
      <h3 class="mx-label">Not claimed</h3>
      <p>No business results are attributed to this work. I have not measured — and do not claim — reduced onboarding time, eliminated manual work, or changes in revenue, conversion or productivity. None of the designs were validated through user testing that I can document.</p>
    </div>
    ${todo(ctx, 'ManaGEM: which parts of the core redesign are in production', '— the page currently says "design complete" and makes no production claim. Confirm before stating anything stronger.')}
    ${todo(ctx, 'ManaGEM: confirm the sample company name in the Take-On prototype ("SBS Waterproofing") may be shown publicly', '— it appears in the Take-On screenshots as sample data.')}`,
  );

const reflection = (ctx) =>
  section(
    'reflection',
    `
    ${head('reflection', '11', 'Reflection', 'What this project changed about how I work.')}
    <div class="mx-reflect">
      <p class="mx-statement">The most useful thing I did on ManaGEM happened before I designed anything: working out what each screen was for, and what it was connected to.</p>
      <div class="mx-prose">
        <p>In a system like this, a screen is never only a screen. The enquiry form decides what the pipeline can show. The invoice list is only as clear as the status it is given. Navigation, data, forms and feedback kept turning out to be the same problem seen from different sides, and I got better results once I stopped treating them as separate pieces of work.</p>
        <p>Preserving what already worked was harder than replacing it. It meant understanding why a function existed before deciding where it belonged, and accepting that the right answer was often to move something rather than redesign it.</p>
        <p>Take-On taught me to be careful with automation. The interesting design work was not the extraction step — it was everything around it: showing what the system did, admitting what it was unsure about, and keeping a person responsible for the final answer.</p>
        <p>What I would want next is evidence. The decisions here are reasoned from the brief and the product, and the honest next step is to watch new clients use them.</p>
      </div>
    </div>`,
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
    ${analysis(ctx)}
    ${core(ctx)}
    ${takeon(ctx)}
    ${decisions(ctx)}
    ${screens(ctx)}
    ${statusSection(ctx)}
    ${reflection(ctx)}
    <nav class="wrap mx-next" aria-label="Next case study">
      <a class="mx-next__link" href="${url(ctx, `work/${next.slug}/`)}">
        <span class="mx-next__label">Next project</span>
        <span class="mx-next__name">${esc(next.name)}</span>
        <span class="mx-next__sum">${esc(next.title)}</span>
        <span class="mx-next__arrow"><span>View case study</span>${icon.arrow}</span>
      </a>
    </nav>
  </article>`;
  },
};
