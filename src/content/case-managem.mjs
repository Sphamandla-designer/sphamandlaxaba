// ManaGEM — recruiter overview (work/managem/), the default reading.
// Two to three minutes: what ManaGEM is, what was wrong with it, what I did,
// four design decisions with before/after evidence, Take-On, the redesigned
// interface and an exact status. The deep dive lives at work/managem/full/
// (case-managem-full.mjs). Evidence rules are in managem-parts.mjs.

import { url, icon } from '../shared.mjs';
import {
  SRC_CORE, SRC_TAKEON, SRC_LEGACY, FULL,
  shot, video, head, section, chapterNav, nextProject, compare, statusList, workflowDiagram,
} from './managem-parts.mjs';

const chapters = [
  ['glance', 'At a glance'],
  ['challenge', 'Challenge'],
  ['approach', 'Approach'],
  ['decisions', 'Decisions'],
  ['takeon', 'Take-On'],
  ['interface', 'Interface'],
  ['status', 'Status'],
];

const fullLink = (ctx, label) => `<a class="mq-textlink" href="${url(ctx, FULL)}">${label}<span aria-hidden="true">${icon.arrow}</span></a>`;

// --------------------------------------------------------------- 1 · hero

const meta = [
  ['Product', 'ManaGEM'],
  ['Organisation', 'GEMIS'],
  ['Project', 'Existing product redesign'],
  ['Role', 'Product Design / UX/UI Design'],
  ['Status', 'Design completed; implementation underway'],
  ['Category', 'Enterprise Software / ERP'],
];

const hero = (ctx) => `
  <header class="mq-hero" aria-labelledby="mq-title">
    <div class="wrap">
      <a class="back" href="${url(ctx, 'index.html#work')}">← Selected work</a>
      <div class="mq-hero__text">
        <p class="mq-hero__cat">ManaGEM · Product design case study</p>
        <h1 class="mq-title" id="mq-title">Reimagining the experience behind everyday business operations.</h1>
        <p class="mq-sub">Redesigning an established ERP platform to make complex business workflows clearer, more consistent and easier to navigate.</p>
      </div>
      <dl class="mq-herometa">${meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      <div class="mq-hero__shot">
        <div class="mq-browser">
          <div class="mq-browser__bar" aria-hidden="true"><i></i><i></i><i></i><span>ManaGEM · Dashboard</span></div>
          ${shot(ctx, 'mg-dashboard', 'The redesigned ManaGEM dashboard: grouped navigation, a messages banner, four headline figures, a sales summary and current projects', { sizes: '(min-width: 1264px) 1200px, 100vw', eager: true })}
        </div>
        <p class="mq-hero__cap"><span>The redesigned dashboard — the first screen after signing in.</span><span class="mx-src">${SRC_CORE} · not yet released</span>${fullLink(ctx, 'Read the full case study')}</p>
      </div>
    </div>
  </header>`;

// --------------------------------------------------------- 2 · at a glance

const glance = () =>
  section(
    'glance',
    `
    <div class="mq-glance">
      <div class="mq-glance__lead">
        <p class="mx-kicker"><span class="mx-kicker__n">01</span>At a glance</p>
        <h2 class="mx-h2" id="glance-h">One system for the whole job, from first enquiry to final payment.</h2>
        <p class="mq-lede">ManaGEM is GEMIS’s business management platform. A single piece of work passes through sales, operations and finance inside it — so a screen is never only a screen. It is one step in a chain other people depend on.</p>
      </div>
      <dl class="mq-glance__facts">
        <div><dt>Product</dt><dd>An established ERP for trade and project businesses: customers, suppliers, products and pricing, enquiries and quotations, jobs, stock, production, invoicing and reporting.</dd></div>
        <div><dt>My role</dt><dd>Product design and UX/UI design, with substantial ownership of the product-design direction and the interface and workflow decisions.</dd></div>
        <div><dt>Scope</dt><dd>The existing product, screen by screen and workflow by workflow — plus Take-On, a new onboarding experience for clients.</dd></div>
        <div><dt>Design focus</dt><dd>Navigation, information hierarchy, form feedback and consistency — while keeping the functionality businesses already rely on.</dd></div>
        <div><dt>Status</dt><dd>Design completed. The development team is building it, and it has not yet been released to customers.</dd></div>
      </dl>
    </div>`,
  );

// ----------------------------------------------------------- 3 · challenge

const problems = [
  ['Navigation', 'New clients found the product difficult to navigate.'],
  ['Onboarding', 'Getting started depended heavily on manual information collection and entry.'],
  ['Data clarity', 'Some information did not reflect as expected — invoice information in particular.'],
  ['Visibility', 'Messages and notifications needing attention were not visible enough.'],
  ['Identity', 'The product did not carry a consistent GEMIS identity.'],
  ['Complexity', 'Some unnecessary features made the interface more complicated.'],
  ['Save feedback', 'Forms did not show clearly when a save had worked, leading to repeat saves and possible duplicates.'],
];

const challenge = (ctx) =>
  section(
    'challenge',
    `
    ${head({ id: 'challenge', n: '02', label: 'The challenge', title: 'An established system with growing complexity.', intro: 'ManaGEM started from a template bought around 2015 and grew feature by feature. These were the problems in the product when the redesign began.' })}
    <ol class="mq-seven" role="list">
      ${problems.map(([t, d], i) => `<li><span class="mq-n">0${i + 1}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}
    </ol>
    <div class="mq-legacy">
      ${shot(ctx, 'legacy-customers', 'The original Customers list: three columns headed Description, and two rows whose values have shifted into the wrong columns', { caption: 'The original Customers list. Three columns are headed “Description”, and in rows 4 and 9 the values have shifted into the wrong columns — an email under First Name, a date under Last Name.', source: SRC_LEGACY, cls: 'mq-legacy__main' })}
      ${shot(ctx, 'legacy-invoices', 'The original Invoices list with up to ten buttons on every row and a checkbox for paid status', { caption: 'The original Invoices list: up to ten buttons on every row, and status reduced to a checkbox.', source: SRC_LEGACY })}
    </div>`,
    { mod: 'soft' },
  );

// ------------------------------------------------------------ 4 · approach

const approachSteps = [
  ['Understand', 'What the system already does, and which functions businesses rely on.'],
  ['Trace', 'How information moves between modules — enquiry to invoice to accounting.'],
  ['Simplify', 'Where complexity came from, and what could be grouped or removed from view.'],
  ['Redesign', 'Each screen in the context of the screens before and after it, and in one consistent language.'],
];

const approach = () =>
  section(
    'approach',
    `
    ${head({ id: 'approach', n: '03', label: 'My approach', title: 'Redesigning the system, not just the screens.', intro: 'I worked through ManaGEM screen by screen and workflow by workflow, reconsidering how its functions connect before deciding how any one screen should look — and preserving the features businesses already depend on.' })}
    ${workflowDiagram()}
    <ol class="mq-steps" role="list">
      ${approachSteps.map(([t, d], i) => `<li><span class="mq-n">0${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
    </ol>`,
  );

// ----------------------------------------------------------- 5 · decisions

const decisions = (ctx) => [
  {
    tag: 'A · Navigation and discoverability',
    title: 'Grouping navigation by the part of the business it serves',
    rows: [
      ['Original problem', 'A long, flat menu whose sections expand into a dozen or more items each.'],
      ['Consideration', 'New clients need to learn where things are before the product is useful.'],
      ['Direction', 'Five labelled groups — Core, Customers, Sales, Operations, Admin — plus a breadcrumb, top-bar search and counts on items with open work.'],
    ],
    media: `<div class="mq-navpair">
      ${shot(ctx, 'legacy-nav', 'The original sidebar with Stock Control expanded into twelve items', { caption: 'Original', source: SRC_LEGACY, sizes: '220px' })}
      ${shot(ctx, 'mg-sidebar', 'The redesigned sidebar with five labelled groups', { caption: 'Redesign', source: SRC_CORE, sizes: '220px' })}
      ${video(ctx, 'flow-navigation', 'Moving through the redesigned sidebar between connected modules', { caption: 'Moving between modules in the redesign.', cls: 'mq-navpair__video' })}
    </div>`,
  },
  {
    tag: 'B · Information hierarchy',
    title: 'Putting the state of every record first',
    rows: [
      ['Original problem', 'Dense tables where status was a checkbox and invoice information did not always reflect as expected.'],
      ['Consideration', 'People act on what a list tells them; unclear state means late or wrong follow-up.'],
      ['Direction', 'Summary totals before rows, a plain-word status on every record, and actions moved out of the row.'],
    ],
    media: compare(ctx, {
      before: ['legacy-invoices', 'The original Invoices list with checkboxes for paid status and up to ten buttons per row'],
      after: ['mg-invoices', 'The redesigned Invoices list with four summary totals and a Paid, Partial, Unpaid or Overdue status per row'],
      caption: 'Invoices, before and after. Use the switch to compare.',
    }),
  },
  {
    tag: 'C · Form feedback',
    title: 'Making the moment of saving unmistakable',
    rows: [
      ['Original problem', 'Forms did not confirm a save clearly, so people saved again — risking duplicate records.'],
      ['Consideration', 'A save should be one deliberate step the user can see coming and see completed.'],
      ['Direction', 'A four-step form with visible progress, a review of everything entered, one final action, then a return to the updated list.'],
    ],
    media: video(ctx, 'flow-enquiry', 'Filling in the four-step New Enquiry form, reviewing it and creating the enquiry, which returns to the enquiry list', { caption: 'New Enquiry in the redesign: steps, review, one commit.' }),
  },
  {
    tag: 'D · Consistency and identity',
    title: 'One product language, in GEMIS colours',
    rows: [
      ['Original problem', 'Each module felt like a separate tool, and the product did not carry a GEMIS identity.'],
      ['Consideration', 'Consistency lets people reuse on one screen what they learned on another.'],
      ['Direction', 'A GEMIS-branded shell and one page structure — title, summary, filters, table — repeated in every module.'],
    ],
    media: compare(ctx, {
      before: ['legacy-customers', 'The original Customers list'],
      after: ['mg-customers', 'The redesigned Customers list with the shared page structure'],
      caption: 'Customers, before and after. The same structure is used from Products to Staff Records.',
    }),
  },
];

const decisionSection = (ctx) =>
  section(
    'decisions',
    `
    ${head({ id: 'decisions', n: '04', label: 'Key design decisions', title: 'Four decisions, each tied to a problem in the product.' })}
    <div class="mq-decisions">
      ${decisions(ctx)
        .map(
          (d, i) => `
      <article class="mq-dec" aria-labelledby="dec-${i}">
        <header class="mq-dec__head">
          <p class="mq-dec__tag">${d.tag}</p>
          <h3 id="dec-${i}">${d.title}</h3>
        </header>
        <dl class="mq-dec__rows">${d.rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
        <div class="mq-dec__media">${d.media}</div>
      </article>`,
        )
        .join('')}
    </div>
    <p class="mq-more">${fullLink(ctx, 'See the detailed reasoning and more comparisons')}</p>`,
    { mod: 'soft' },
  );

// ------------------------------------------------------------- 6 · Take-On

const journey = [
  ['to-01-welcome', 'Welcome', 'Welcome screen explaining the four stages'],
  ['to-02-trust', 'Trust & compliance', 'Plain-language summary of how data is handled'],
  ['to-03-profile', 'Company profile', 'Company profile form'],
  ['to-04-upload', 'Document upload', 'One upload area per kind of information'],
  ['to-05-extraction', 'AI extraction', 'Processing shown as a readable log'],
  ['to-06-validation', 'Validation summary', 'Record counts and a confidence breakdown'],
  ['to-07-customers', 'Customer review', 'Each customer with a confidence status'],
  ['to-08-products', 'Product review', 'Products and pricing with the same statuses'],
  ['to-09-staff', 'Staff review', 'Staff records with the same statuses'],
  ['to-10-confirm', 'Confirm & submit', 'Outstanding issues listed before submitting'],
  ['to-11-complete', 'Completion', 'Submitted for GEMIS review'],
];

const highlights = [
  'Document upload in the formats clients already have',
  'Structured extraction into customers, products and staff',
  'Confidence indicators on every record',
  'The source evidence behind each record',
  'Flagged and missing information called out',
  'Manual correction of any field',
  'Merge, keep or reject for possible duplicates',
  'A human check by GEMIS before anything is created',
];

const takeon = (ctx) =>
  section(
    'takeon',
    `
    ${head({ id: 'takeon', n: '05', label: 'ManaGEM Take-On', title: 'Making the first experience with ManaGEM more structured.', intro: 'Take-On is an onboarding experience designed to reduce manual collection and capture of a new client’s information. Clients upload the documents they already have; an AI-assisted process extracts and structures the records; the client reviews and corrects them; and GEMIS verifies the result.' })}
    <p class="mq-status-pill"><span class="status status--progress"><span class="status__mark" aria-hidden="true"></span>UX/UI prototype completed; development underway</span></p>
    <div class="mq-takeon">
      ${video(ctx, 'flow-takeon-review', 'Filtering extracted customers, opening a record with a missing email, then merging a possible duplicate', { caption: 'Reviewing extracted records: evidence, missing fields, and a duplicate merged.', source: SRC_TAKEON })}
      <ul class="mq-ticks" role="list" aria-label="What the design includes">${highlights.map((h) => `<li>${h}</li>`).join('')}</ul>
    </div>
    <ol class="mq-strip" role="list" aria-label="The eleven Take-On screens, in order">
      ${journey.map(([key, t, alt], i) => `<li><p class="mq-strip__t"><span>${String(i + 1).padStart(2, '0')}</span>${t}</p>${shot(ctx, key, `${t}: ${alt}`, { source: SRC_TAKEON, sizes: '(min-width: 1069px) 300px, (min-width: 641px) 40vw, 80vw' })}</li>`).join('')}
    </ol>
    <p class="mq-caveat">The prototype uses simulated AI processing and sample records. Security and compliance wording in it is draft content, not a description of implemented controls.</p>`,
    { mod: 'band' },
  );

// ----------------------------------------------------------- 7 · interface

const showcase = [
  ['mg-open-enquiries', 'Open Enquiries — the whole sales pipeline, from new lead to invoiced, above a filterable list.', 'The redesigned Open Enquiries list with counts for each pipeline stage', 'mq-show--full'],
  ['mg-customers', 'Customers — account type, status and accounting link in one readable list.', 'Redesigned Customers list', 'mq-show--6'],
  ['mg-products', 'Products & Pricing — a dense catalogue with pricing, tax and stock kept scannable.', 'Redesigned Products and Pricing list', 'mq-show--6'],
  ['mg-stock', 'Stock Control — suppliers, orders, stores and movements together as tabs in one module.', 'Redesigned Stock Control dashboard', 'mq-show--7'],
  ['mg-detail-review', 'New Enquiry — a review of everything entered before one clear commit.', 'Review step of the New Enquiry form', 'mq-show--5'],
];

const iface = (ctx) =>
  section(
    'interface',
    `
    ${head({ id: 'interface', n: '06', label: 'The redesigned experience', title: 'One product, read the same way in every module.', intro: 'Select any screen to see it full size.' })}
    <div class="mq-show">
      ${showcase.map(([k, c, a, cls]) => shot(ctx, k, a, { caption: c, cls, sizes: cls === 'mq-show--full' ? '(min-width: 1264px) 1200px, 100vw' : '(min-width: 834px) 700px, 100vw' })).join('')}
    </div>`,
  );

// -------------------------------------------------------------- 8 · status

const statusSection = () =>
  section(
    'status',
    `
    <div class="mq-statusblock">
      <div>
        <p class="mx-kicker"><span class="mx-kicker__n">07</span>Current status</p>
        <h2 class="mx-h2" id="status-h">Designed. Now moving through implementation.</h2>
        <p class="mq-lede">The ManaGEM redesign is currently being implemented by the development team. Rather than releasing individual redesigned screens separately, GEMIS plans to release the redesigned product as a complete experience once the implementation is ready.</p>
        <p class="mq-note">No results are reported yet: the redesigned product has not been released, so its effect has not been measured.</p>
      </div>
      ${statusList()}
    </div>`,
    { mod: 'soft' },
  );

// ----------------------------------------------------------------- 9 · CTA

const invitation = (ctx) => `
  <section class="mq-invite" aria-labelledby="invite-h">
    <div class="wrap">
      <p class="mx-kicker">Full case study · about 8 minutes</p>
      <h2 id="invite-h">Explore the full case study.</h2>
      <p class="mq-invite__copy">Go deeper into the product challenges, design decisions, interface exploration and onboarding experience.</p>
      <a class="btn btn--primary mq-invite__btn" href="${url(ctx, FULL)}"><span>Explore the full case study</span>${icon.arrow}</a>
    </div>
  </section>`;

export default {
  slug: 'managem',
  /** Custom layout — used by renderCase instead of the generic template. */
  render(ctx, { next }) {
    return `
  <article class="case mx mx--quick">
    ${hero(ctx)}
    ${chapterNav(ctx, chapters, { name: 'ManaGEM', cta: `<a class="btn btn--primary mx-chapters__cta" href="${url(ctx, FULL)}">Full case study</a>` })}
    ${glance(ctx)}
    ${challenge(ctx)}
    ${approach(ctx)}
    ${decisionSection(ctx)}
    ${takeon(ctx)}
    ${iface(ctx)}
    ${statusSection(ctx)}
    ${invitation(ctx)}
    ${nextProject(ctx, next)}
  </article>`;
  },
};
