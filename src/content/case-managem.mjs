// ManaGEM — the quick case study (work/managem/), the default experience.
// Written for a recruiter with three minutes: what ManaGEM is, what needed to
// improve, my role, four decisions with evidence, Take-On, the final interface
// and the honest status — then an invitation to the full case study
// (case-managem-full.mjs). Evidence rules are documented in managem-parts.mjs.

import { url, status, icon } from '../shared.mjs';
import { SRC_CORE, SRC_TAKEON, FULL, shot, video, filmVideo, head, section, chapterNav, nextProject } from './managem-parts.mjs';

const chapters = [
  ['overview', 'Overview'],
  ['challenge', 'Challenge'],
  ['approach', 'Approach'],
  ['decisions', 'Decisions'],
  ['takeon', 'Take-On'],
  ['interface', 'Interface'],
  ['status', 'Status'],
];

const fullLink = (ctx, label = 'View full case study') => `<a class="mq-textlink" href="${url(ctx, FULL)}">${label}<span aria-hidden="true">${icon.arrow}</span></a>`;

// ------------------------------------------------------------ A · hero

const hero = (ctx) => `
  <header class="mq-hero" aria-labelledby="mq-title">
    <div class="wrap">
      <a class="back" href="${url(ctx, 'index.html#work')}">← Selected work</a>
      <div class="mq-hero__grid">
        <div class="mq-hero__text">
          <p class="mq-hero__cat">Enterprise ERP · Product redesign</p>
          <h1 class="mq-title" id="mq-title">Reimagining ManaGEM</h1>
          <p class="mq-sub">Redesigning an established ERP experience and creating a more structured approach to client onboarding.</p>
          <p class="mq-hero__role"><span>My role</span>Product Design, UX/UI Design, Workflow Redesign</p>
          <p class="mq-hero__links">${fullLink(ctx)}<span class="mq-hero__time">3 min overview · 8 min full</span></p>
        </div>
        <div class="mq-hero__film">${filmVideo(ctx)}</div>
      </div>
    </div>
  </header>`;

// -------------------------------------------------------- B · overview

const overview = () => `
  <section class="mq-meta" id="overview" aria-label="Project overview" data-chapter>
    <div class="wrap">
      <dl>
        <div><dt>Product</dt><dd>ManaGEM</dd></div>
        <div><dt>Organisation</dt><dd>GEMIS</dd></div>
        <div><dt>Role</dt><dd>Product Design, UX/UI Design, Workflow Redesign</dd></div>
        <div><dt>Scope</dt><dd>ERP redesign and onboarding experience design</dd></div>
        <div><dt>Take-On</dt><dd>${status('Prototype completed; development underway', 'progress')}</dd></div>
      </dl>
    </div>
  </section>`;

// ------------------------------------------------------- C · challenge

const problems = [
  ['Complexity', 'The system was difficult for new clients to navigate.'],
  ['Operational clarity', 'Certain information — invoices in particular — did not always reflect as expected.'],
  ['Interaction feedback', 'Users needed clearer visibility of tasks, and clear confirmation that a form had saved.'],
  ['Product consistency', 'The interface needed stronger GEMIS branding and a more considered feature experience.'],
];

const challenge = () =>
  section(
    'challenge',
    `
    ${head({ id: 'challenge', n: '01', label: 'The challenge', title: 'An established product that had become hard to learn.', intro: 'ManaGEM began with a template bought around 2015 and grew into the system GEMIS clients run their businesses on — enquiries, quotes, jobs, stock, invoicing and debtors.' })}
    <ol class="mq-problems" role="list">
      ${problems.map(([t, d], i) => `<li><span class="mq-n">0${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
    </ol>
    <p class="mq-also"><strong>And before any of that:</strong> new clients relied on manual information collection and entry to get started — the reason for Take-On.</p>`,
    { mod: 'soft' },
  );

// -------------------------------------------------------- D · approach

const steps = [
  ['Understand the existing system', 'Map every function the business relies on, and how records move between them.'],
  ['Rethink workflows', 'Reconsider how existing functionality connects, screen by screen and workflow by workflow.'],
  ['Redesign the interface', 'One navigation model, one page anatomy and one status language across modules.'],
  ['Extend onboarding', 'Design Take-On, so new clients arrive through a guided flow instead of manual capture.'],
];

const approach = () =>
  section(
    'approach',
    `
    <div class="mq-approach">
      <div class="mq-approach__text">
        <p class="mx-kicker"><span class="mx-kicker__n">02</span>My approach</p>
        <h2 class="mx-h2" id="approach-h">I owned the product experience, not just its surface.</h2>
        <p class="mq-lede">I rethought ManaGEM screen by screen and workflow by workflow — keeping the functionality the business depended on, simplifying what was unnecessarily complicated, and making the product and workflow decisions that shaped the redesign.</p>
      </div>
      <ol class="mq-process" role="list">
        ${steps.map(([t, d], i) => `<li><span class="mq-n">0${i + 1}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
      </ol>
    </div>`,
  );

// ------------------------------------------------------- E · decisions

const decisionRows = (ctx) => [
  {
    title: 'Simplifying navigation and the overall experience',
    problem: 'Twenty-four destinations and scattered functions made the product hard to learn.',
    response: 'Five navigation groups by business area, a breadcrumb and search on every screen, and related functions brought together as tabs inside each module.',
    media: video(ctx, 'flow-navigation', 'Moving through the grouped sidebar from the dashboard to Open Enquiries, Invoices, Debtors, Factory and Stock Control', { caption: 'One grouped sidebar across connected modules.' }),
  },
  {
    title: 'Improving operational clarity',
    problem: 'Dense records, and invoice information that did not always reflect as expected.',
    response: 'Totals before rows, and the state of every record in plain words — Paid, Partial, Unpaid, Overdue — with per-invoice sync status in the accounting view.',
    media: shot(ctx, 'mg-invoices', 'Invoices with billed, paid, outstanding and overdue totals above a table with a plain-word status on every row', { caption: 'Invoices: four totals first, then a status on every row.' }),
  },
  {
    title: 'Clearer interaction and save feedback',
    problem: 'Forms did not confirm a save, so people saved twice; tasks needing attention were easy to miss.',
    response: 'A visible four-step form, a review of everything entered, and one final action that returns to the list. Messages and open-work counts are surfaced where people already look.',
    media: video(ctx, 'flow-enquiry', 'Filling in the four-step New Enquiry form, reviewing it and pressing Create Enquiry, which returns to the enquiry list', { caption: 'New Enquiry: steps, review, then a single commit.' }),
  },
  {
    title: 'Connecting existing workflows',
    problem: 'Work moves from enquiry to invoice across several modules, and the links between them were hard to follow.',
    response: 'Each list shows where its records sit in the wider flow: the enquiry pipeline runs from New lead to Invoiced, and Debtors rows carry the enquiry, invoice and reference together.',
    media: shot(ctx, 'mg-open-enquiries', 'Open Enquiries with stage counts from New lead to Invoiced above the list of leads', { caption: 'Open Enquiries: the whole sales pipeline, New lead to Invoiced.' }),
  },
];

const decisions = (ctx) =>
  section(
    'decisions',
    `
    ${head({ id: 'decisions', n: '03', label: 'Key UX decisions', title: 'Four decisions that shaped the redesign.' })}
    <div class="mq-decisions">
      ${decisionRows(ctx)
        .map(
          (d, i) => `
      <article class="mq-dec${i % 2 ? ' mq-dec--flip' : ''}" aria-labelledby="dec-${i + 1}">
        <div class="mq-dec__text">
          <span class="mq-n mq-n--lg">0${i + 1}</span>
          <h3 id="dec-${i + 1}">${d.title}</h3>
          <dl>
            <div><dt>Problem</dt><dd>${d.problem}</dd></div>
            <div><dt>Design response</dt><dd>${d.response}</dd></div>
          </dl>
        </div>
        <div class="mq-dec__media">${d.media}</div>
      </article>`,
        )
        .join('')}
    </div>
    <p class="mq-more">${fullLink(ctx, 'See all six decisions, with the reasoning behind each')}</p>`,
    { mod: 'soft' },
  );

// ---------------------------------------------------------- F · Take-On

const journey = [
  ['Upload', 'Customer lists, price lists and staff records, in the formats clients already have.', 'to-04-upload', 'Upload screen with separate areas for customers, products, staff and suppliers'],
  ['Extract', 'Processing is explained as it happens, document by document.', 'to-05-extraction', 'Extraction screen with running counts and an extraction log'],
  ['Validate', 'A summary separates clean records from those needing a look.', 'to-06-validation', 'Validation summary with a confidence breakdown'],
  ['Review', 'Every record shows its source, what is missing, and can be corrected.', 'to-07-record', 'Review panel showing the source document, a missing email warning and editable fields'],
  ['Confirm', 'Outstanding issues are listed before the client submits.', 'to-10-confirm', 'Final confirmation with readiness, totals and issues to fix'],
  ['GEMIS verification', 'A person at GEMIS checks the submission before anything goes live.', 'to-12-admin', 'GEMIS take-on queue of companies awaiting sign-off'],
];

const takeon = (ctx) =>
  section(
    'takeon',
    `
    ${head({ id: 'takeon', n: '04', label: 'ManaGEM Take-On', title: 'From manual information capture to guided onboarding.', intro: 'Instead of collecting and typing in a new client’s records by hand, clients upload what they already have. The system structures it, the client reviews and corrects every record, and GEMIS verifies the result. The AI assists; people stay in control.' })}
    <p class="mq-status-pill">${status('UX/UI prototype completed. Development underway.', 'progress')}</p>
    ${video(ctx, 'flow-takeon-upload', 'Uploading a customer list, price lists, staff and supplier files, running the extraction, and arriving at the validation summary', { caption: 'Upload, processing and validation. The processing in the prototype is simulated, with sample records.', source: SRC_TAKEON })}
    <ol class="mq-journey" role="list" aria-label="The Take-On journey">
      ${journey.map(([t, d, key, alt], i) => `<li><p class="mq-journey__t"><span class="mq-n">0${i + 1}</span>${t}</p><p class="mq-journey__d">${d}</p>${shot(ctx, key, alt, { source: SRC_TAKEON, sizes: '(min-width: 1069px) 380px, (min-width: 641px) 45vw, 100vw' })}</li>`).join('')}
    </ol>`,
    { mod: 'band' },
  );

// -------------------------------------------------------- G · interface

const showcase = [
  ['mg-dashboard', 'Dashboard — messages, headline figures, sales and current projects on the first screen after sign-in.', 'The redesigned dashboard', 'mq-show--full'],
  ['mg-stock', 'Stock Control — twelve related areas as tabs in one module, with alerts beside daily activity.', 'Stock Control with tabs, figures, movements and low stock alerts', 'mq-show--7'],
  ['mg-detail-review', 'New Enquiry — a review of everything entered before one clear commit.', 'The review step of the New Enquiry form', 'mq-show--5'],
  ['mg-login', 'Sign-in — the GEMIS identity from the first screen.', 'ManaGEM sign-in screen', 'mq-show--5'],
  ['mg-products', 'Products & Pricing — a dense catalogue kept readable.', 'Products and Pricing catalogue table', 'mq-show--7'],
  ['to-07-duplicate', 'Take-On — a possible duplicate, explained, with merge, keep or discard.', 'Take-On review panel for a possible duplicate', 'mq-show--6'],
  ['to-11-complete', 'Take-On — submitted, and waiting for a GEMIS check rather than “done”.', 'Take-On completion screen saying the submission was sent for GEMIS review', 'mq-show--6'],
];

const iface = (ctx) =>
  section(
    'interface',
    `
    ${head({ id: 'interface', n: '05', label: 'The redesigned interface', title: 'One product, read the same way in every module.', intro: 'Select any screen to open it full size.' })}
    <div class="mq-show">
      ${showcase.map(([k, c, a, cls]) => shot(ctx, k, a, { caption: c, source: k.startsWith('to-') ? SRC_TAKEON : SRC_CORE, cls, sizes: cls === 'mq-show--full' ? '(min-width: 1264px) 1200px, 100vw' : '(min-width: 834px) 700px, 100vw' })).join('')}
    </div>`,
  );

// ----------------------------------------------------------- H · status

const statusSection = () =>
  section(
    'status',
    `
    ${head({ id: 'status', n: '06', label: 'Outcome and status', title: 'What is complete, and what is still being built.' })}
    <div class="mq-status">
      <div>
        <p class="mq-status__k">Core ManaGEM redesign</p>
        <p class="mq-status__v">${status('Design complete', 'live')}</p>
        <p>Navigation, information presentation, forms and workflows redesigned across dashboard, sales, invoicing, debtors, products, projects, factory, stock and staff — delivered as an interactive prototype.</p>
      </div>
      <div>
        <p class="mq-status__k">ManaGEM Take-On</p>
        <p class="mq-status__v">${status('Prototype complete · in development', 'progress')}</p>
        <p>The UX/UI prototype is complete and development is underway. Its AI processing is simulated with sample records; it is not presented as live.</p>
      </div>
    </div>
    <p class="mx-unclaimed">No business metrics or user-testing results are claimed — only the design work and its current status.</p>`,
  );

// ------------------------------------------------- I · full invitation

const invitation = (ctx) => `
  <section class="mq-invite" aria-labelledby="invite-h">
    <div class="wrap">
      <p class="mx-kicker">Full case study · about 8 minutes</p>
      <h2 id="invite-h">Want to explore the thinking behind the design?</h2>
      <p class="mq-invite__copy">Explore the full case study for a deeper look at the product challenges, workflow decisions, UX reasoning, and ManaGEM Take-On experience.</p>
      <ul class="mq-invite__inside" role="list" aria-label="Inside the full case study">
        <li>Product context</li><li>Workflow analysis</li><li>Anatomy of a screen</li><li>All six decisions</li><li>The full Take-On journey</li><li>Reflection</li>
      </ul>
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
    ${overview(ctx)}
    ${challenge(ctx)}
    ${approach(ctx)}
    ${decisions(ctx)}
    ${takeon(ctx)}
    ${iface(ctx)}
    ${statusSection(ctx)}
    ${invitation(ctx)}
    ${nextProject(ctx, next)}
  </article>`;
  },
};
