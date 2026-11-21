// ManaGEM — full case study (work/managem/full/).
// Body-copy budget: 2,000–2,500 words (captions, labels, metadata excluded).
// Every factual claim is listed in MANAGEM-CLAIMS-LEDGER.md. Restricted
// material is deliberately absent: the nine earlier original screenshots,
// customer records, the product film, links to either prototype, and the
// Take-On sample company's real name (screens and videos use "Sample Trading").

import { esc, url, todo, icon } from '../shared.mjs';
import { projects } from './projects.mjs';
import { designSystem } from './managem-ds.mjs';
import {
  SRC_CORE, SRC_TAKEON, QUICK, DS, REVIEW, ORIGINAL_NAV, glyph,
  shot, video, head, section, note, chapterNav, feature, nextProject, statusList, workflowDiagram,
} from './managem-parts.mjs';
import { dsApplied } from './managem-parts.mjs';

const chapters = [
  ['context', 'Context'],
  ['discovery', 'Discovery'],
  ['existing', 'Existing product'],
  ['navigation', 'Navigation'],
  ['dashboard', 'Dashboard'],
  ['invoices', 'Invoices'],
  ['system', 'Design system'],
  ['takeon', 'Take-On'],
  ['technical', 'Technical'],
  ['status', 'Status'],
];

const link = (ctx, href, label) => `<a class="mq-textlink" href="${url(ctx, href)}">${label}<span aria-hidden="true">${icon.arrow}</span></a>`;

// ------------------------------------------------------------------- hero

const hero = (ctx) => `
  <header class="mf-hero" aria-labelledby="mf-title">
    <div class="wrap">
      <a class="mf-back" href="${url(ctx, QUICK)}">${glyph.back}<span>Back to the overview</span></a>
      <div class="mf-hero__grid">
        <div class="mf-hero__text">
          <p class="mx-eyebrow">ManaGEM · Full case study · about 9 minutes</p>
          <h1 class="mf-title" id="mf-title">Familiar to existing clients. Clear to new ones.</h1>
          <p class="mf-sub">How I approached the redesign of an established ERP: discovery, the navigation trade-off, a data-first dashboard, a design system GEMIS adopted, an AI-assisted onboarding concept, and the technical direction that followed.</p>
        </div>
        <ol class="mf-contents" role="list" aria-label="Contents">
          ${chapters.map(([id, label], i) => `<li><a href="#${id}"><span>${String(i + 1).padStart(2, '0')}</span>${label}</a></li>`).join('')}
        </ol>
      </div>
    </div>
  </header>`;

// ------------------------------------------------------- 1 · context

const context = () =>
  section(
    'context',
    `
    ${head({ id: 'context', n: '01', label: 'Product and business context', title: 'An ERP that businesses already run on.', intro: 'ManaGEM is an established business management platform built and supported by GEMIS, my employer. It began with a template bought around 2015 and grew over the following years. This project redesigned that existing product; it did not build a new one.' })}
    ${workflowDiagram()}
    <div class="mf-why">
      <h3 class="mx-subh mf-left">Why the structure matters</h3>
      <p>An enquiry becomes a quote, a job, stock movements and an invoice, and every step reads records the previous one created. In a product like this, a screen is never only a screen: changing one without understanding its neighbours can break something further down the chain.</p>
    </div>
    <div class="mf-team">
      <div><h3>Me</h3><p>Led the product experience, UX/UI direction, workflow and interface decisions, design exploration, the design system, and collaboration with development.</p></div>
      <div><h3>GEMIS manager</h3><p>Set business expectations, scope, priorities and timeline; reviewed and approved the design direction.</p></div>
      <div><h3>Full-stack developer</h3><p>Brought knowledge of the existing product and reviewed complaints, feature dependencies, proposed workflows and feasibility.</p></div>
      <div><h3>AI strategist and tester</h3><p>Contributed within their own roles on the project.</p></div>
    </div>
    <p class="mx-note">Design phase for the core redesign: one month.</p>`,
    { mod: 'soft' },
  );

// ----------------------------------------------------- 2 · discovery

const discovery = () =>
  section(
    'discovery',
    `
    ${head({ id: 'discovery', n: '02', label: 'Discovery and research', title: 'Six conversations, one clear need.', intro: 'I spoke with six existing ManaGEM clients by phone. These were conversations, not a formal usability study, and the finding was consistent: clients wanted to see important business information immediately instead of searching through several screens.' })}
    <div class="mf-informed">
      <p class="mx-card__k">What the conversations informed</p>
      <ul role="list">
        <li><strong>Dashboard</strong>Which information and KPIs belong on the first screen.</li>
        <li><strong>Invoices</strong>How invoice information is presented.</li>
        <li><strong>Messages</strong>Making messages and important updates visible.</li>
        <li><strong>Status colour</strong>Semantic colours for statuses and errors.</li>
        <li><strong>Simplicity</strong>Removing interface complexity that did not serve a task.</li>
      </ul>
    </div>
    <p class="mf-body">Alongside the calls, I reviewed existing complaints and the current product with the manager and the full-stack developer. The developer’s knowledge of how features depend on each other kept the redesign grounded in what the system actually does.</p>`,
  );

// ---------------------------------------------- 3 · existing product

const existing = () =>
  section(
    'existing',
    `
    ${head({ id: 'existing', n: '03', label: 'Understanding the existing product', title: 'Two kinds of client, two kinds of difficulty.', intro: 'Existing clients had learned where everything was. New clients met the same structure without that history, and struggled to find functions and to understand how the parts of the system fitted together.' })}
    <div class="mf-tension">
      <div><p class="mx-card__k">Existing clients</p><h3>Familiarity</h3><p>Years of habit in a navigation that expanded section by section. Moving things risks slowing down people who already work quickly.</p></div>
      <div class="mf-tension__vs" aria-hidden="true">↔</div>
      <div><p class="mx-card__k">New clients</p><h3>Discoverability</h3><p>Long, nested menus with no sense of grouping, and important information spread across separate screens.</p></div>
    </div>
    <p class="mf-body">The redesign brief also included invoice information that did not always reflect as expected, messages and updates that were easy to miss, an interface without a consistent GEMIS identity, unnecessary complexity, and forms that did not make it clear a save had worked. The decisions below take these one at a time.</p>
    <p class="mf-body">The navigation shows the problem most clearly. In the original sidebar, Sales alone opened into twelve items, two of which expanded again. Products & Pricing opened into nine. Projects Module opened into three separate blocks of links. Each section was reasonable on its own; together they made a menu whose length and order changed every time it was used.</p>`,
    { mod: 'soft' },
  );

// ------------------------------------------------- 4 · navigation

const navigation = (ctx) =>
  section(
    'navigation',
    `
    ${head({ id: 'navigation', n: '04', label: 'Navigation and information architecture', title: 'From expanding menus to five labelled groups.', intro: 'This was the central decision of the redesign, and a real trade-off between the two kinds of client.' })}
    <div class="mf-navcmp">
      <div>
        <p class="mx-compare__label"><span class="mx-compare__dot mx-compare__dot--before" aria-hidden="true"></span>Original interface</p>
        <div class="mq-navcmp__row">
          ${shot(ctx, 'nav-original-sales', 'Original sidebar with Sales expanded into twelve items, two of them nested further', { caption: 'Sales: twelve items', source: ORIGINAL_NAV, sizes: '220px' })}
          ${shot(ctx, 'nav-original-products', 'Original sidebar with Products and Pricing expanded into nine items', { caption: 'Products & Pricing: nine', source: ORIGINAL_NAV, sizes: '220px' })}
          ${shot(ctx, 'nav-original-projects', 'Original sidebar with Projects Module expanded into three sub-blocks', { caption: 'Projects: three sub-blocks', source: ORIGINAL_NAV, sizes: '220px' })}
        </div>
      </div>
      <div>
        <p class="mx-compare__label"><span class="mx-compare__dot mx-compare__dot--after" aria-hidden="true"></span>Redesign</p>
        <div class="mf-navcmp__new">
          ${shot(ctx, 'ds-sidebar-expanded', 'Redesigned sidebar with five labelled groups', { caption: 'Five groups', sizes: '240px' })}
          ${video(ctx, 'flow-navigation', 'Moving through the redesigned sidebar between connected modules', { caption: 'Moving between modules' })}
        </div>
      </div>
    </div>
    <dl class="mf-story__beats mf-story__beats--4">
      <div><dt>The starting point</dt><dd>Each section expanded in place, so finding a page meant opening the right section first and scanning a long list.</dd></div>
      <div><dt>The conversation</dt><dd>The manager initially preferred to keep the expanding navigation, because existing clients were used to it — a fair concern for a product people use daily.</dd></div>
      <div><dt>My proposal</dt><dd>Group related functions so users can move around without repeatedly expanding nested sections, keeping the same destinations and names so familiar functions stay findable.</dd></div>
      <div><dt>The direction</dt><dd>Five groups — Core, Customers, Sales, Operations, Admin — with the current page marked, a breadcrumb, and counts on items with open work.</dd></div>
    </dl>
    <div class="mf-why">
      <h3 class="mx-subh mf-left">Why grouping, rather than a new menu</h3>
      <p>Grouping kept every destination and its familiar name, so an existing client could still find Invoices or Stock Control where they expected it by name — only the path became shorter. The groups follow the order work moves through the business, which helps a new client understand how the system fits together just by reading the sidebar. Counts beside items with open work, such as open enquiries, turn the menu into a light status board as well.</p>
    </div>
    <p class="mf-review">${REVIEW}</p>`,
  );

// ------------------------------------------------- 5 · dashboard

const dashboard = (ctx) =>
  section(
    'dashboard',
    `
    ${head({ id: 'dashboard', n: '05', label: 'Dashboard, data visibility and communication', title: 'Bring the important things to the first screen.', intro: 'The client conversations pointed to the dashboard. Information that previously sat in individual screens now appears as KPIs and messages the moment someone signs in.' })}
    ${shot(ctx, 'mg-dashboard', 'The redesigned dashboard: messages banner, four KPIs, sales summary, monthly performance and current projects', { caption: 'The redesigned dashboard' })}
    <div class="mf-decisions">
      <div><h3>Pop-ups, considered and set aside</h3><p>I first explored grouping enquiries and using pop-ups for important or urgent actions. I didn’t pursue it: pop-ups would interrupt the task someone was doing and add confusion rather than remove it.</p></div>
      <div><h3>Visible messages and search instead</h3><p>A messages banner sits at the top of the first dashboard, and a single search field in the top bar works from every screen, so finding something no longer depends on remembering the menu.</p></div>
      <div><h3>Who is signed in</h3><p>ManaGEM lets clients add their own staff, including decision-makers. The sidebar shows the signed-in person’s name and role, so it is always clear whose view this is.</p></div>
    </div>
    <p class="mf-body">The first screen now leads with four headline figures — enquiries, quotes, sales and the value of outstanding quotes — each compared with the previous period. Below them sit the monthly sales summary, current projects with their progress and due dates, recent sales activity and the week’s bookings: information that previously meant opening separate modules.</p>
    <div class="mf-pair">
      ${shot(ctx, 'ds-topbar', 'Top bar with breadcrumb, search with keyboard shortcut, bell and avatar', { caption: 'Search on every screen', sizes: '(min-width: 1264px) 860px, 100vw' })}
      ${shot(ctx, 'ds-user', 'Signed-in user with name and role', { caption: 'Name and role', sizes: '240px' })}
    </div>`,
    { mod: 'soft' },
  );

// --------------------------------------------------- 6 · invoices

const invoices = (ctx) =>
  section(
    'invoices',
    `
    ${head({ id: 'invoices', n: '06', label: 'Invoice clarity and interface consistency', title: 'Totals first, and every status in words.', intro: 'Invoice information did not always reflect as expected, and clients wanted it clearer. The redesign changes how invoices are presented; it does not claim to change the accounting logic or the Sage integration behind them.' })}
    ${shot(ctx, 'mg-invoices', 'Redesigned invoices: four totals, filters and a status on every row', { caption: 'Billed, paid, outstanding and overdue before any rows; Paid, Partial, Unpaid or Overdue on each invoice' })}
    <div class="mf-decisions">
      <div><h3>Semantic status</h3><p>Emerald, amber, sky and red badges, each with a word, used the same way in every module, as the client conversations asked.</p></div>
      <div><h3>Sync state you can see</h3><p>The Sage invoice view shows how many invoices are synced, pending or in error, so a problem is visible before it is a surprise.</p></div>
      <div><h3>One structure everywhere</h3><p>Every list follows the same order — title, KPIs, tabs, toolbar, table, pager — so learning one module teaches the rest.</p></div>
    </div>
    ${shot(ctx, 'ds-kpi-sage', 'Sage invoice KPIs: synced, pending, errors and VAT', { caption: 'Sage invoices: sync state as KPIs' })}
    <p class="mf-body">Consistency also covers smaller habits. The main action on every screen sits in the same top-right position. Filters appear as removable chips, so it is always visible what a list is showing. Every list can be exported to CSV, Excel or PDF from the same place. None of this is new functionality; it is the existing functionality arranged so it behaves the same way everywhere.</p>`,
  );

// ------------------------------------------------ 7 · design system

const system = (ctx) =>
  section(
    'system',
    `
    ${head({ id: 'system', n: '07', label: 'Design system and developer collaboration', title: 'One foundation, adopted by GEMIS.', intro: 'The redesign needed screens that behaved alike. I created the design system for it: colour, type, spacing, components and their states. The manager approved it, GEMIS formally adopted it, and I applied it to the ManaGEM redesign, Take-On and the ManaGEM landing page.' })}
    ${designSystem({ compact: true })}
    ${dsApplied(ctx)}
    <p class="mf-body">In practice, the same decisions carry across all three experiences. Take-On reuses the product’s colours, type, fields, cards and status language, adding only a stepper, an upload area and confidence indicators for its AI-assisted review. The landing page keeps Outfit, the navy structure and the status colours, and adds GEM teal for sign-up and larger type for marketing. Where the experiences differ, the difference is deliberate and documented on the design-system page.</p>
    <div class="mf-decisions">
      <div><h3>A GEMIS identity</h3><p>A navy and slate structure with a single sky accent replaced an interface that did not reflect GEMIS.</p></div>
      <div><h3>Reusable patterns</h3><p>KPI cards, toolbars, tables, tabs and drawers are defined once and reused across the redesign, Take-On and the landing page.</p></div>
      <div><h3>Working with development</h3><p>Designs were reviewed with the full-stack developer, who checked them against the existing system and its dependencies.</p></div>
    </div>
    <p class="mq-more">${link(ctx, `${DS}#in-action`, 'See the design system in action: shared decisions, foundations, components and accessibility')}</p>`,
    { mod: 'soft' },
  );

// ------------------------------------------------------ 8 · Take-On

const takeon = (ctx) =>
  section(
    'takeon',
    `
    <div class="mx-part">
      <p class="mx-part__n">08 · ManaGEM Take-On</p>
      <h2 class="mx-part__name" id="takeon-h">AI-assisted onboarding, with people in control</h2>
      <p class="mx-part__desc">Onboarding a new client meant collecting their information manually, often in Excel, with repeated back-and-forth to verify company details. It took time, and some prospective clients reportedly lost interest along the way. Take-On makes collection, correction and entry more structured, while keeping declarations, trust information and a human check.</p>
      <p class="mx-part__status"><span class="status status--progress"><span class="status__mark" aria-hidden="true"></span>UX/UI prototype complete; development underway</span></p>
    </div>
    ${video(ctx, 'flow-takeon-upload', 'Uploading files, running the extraction and arriving at the validation summary', { caption: 'Upload, processing and validation. Processing is simulated in the prototype.', source: SRC_TAKEON })}
    <ol class="mf-journey" role="list" aria-label="The Take-On journey">
      ${['Welcome', 'Trust & compliance', 'Company profile', 'Document upload', 'AI-assisted extraction', 'Validation summary', 'Customer review', 'Product review', 'Staff review', 'Confirm & submit', 'Completion'].map((t, i) => `<li><span>${String(i + 1).padStart(2, '0')}</span>${t}</li>`).join('')}
    </ol>
    <div class="mf-uncertain">
      ${shot(ctx, 'to-06-validation', 'Validation summary separating clean records from those needing a look', { caption: 'Uncertainty made visible: how confident the extraction is, overall', source: SRC_TAKEON, sizes: '(min-width: 1264px) 600px, 100vw' })}
      ${shot(ctx, 'to-07-record', 'Review drawer showing a record’s source, a missing email and editable fields', { caption: 'Missing information called out, every field correctable', source: SRC_TAKEON, sizes: '(min-width: 1264px) 600px, 100vw' })}
      ${shot(ctx, 'to-07-duplicate', 'Review drawer explaining a possible duplicate with merge, keep or discard', { caption: 'A possible duplicate explained; the client decides', source: SRC_TAKEON, sizes: '(min-width: 1264px) 600px, 100vw' })}
      ${shot(ctx, 'to-11-complete', 'Completion screen: submitted for GEMIS review', { caption: 'Submitted for a GEMIS check, not “done”', source: SRC_TAKEON, sizes: '(min-width: 1264px) 600px, 100vw' })}
    </div>
    <div class="mf-tech mf-tech--4">
      <div><span class="mq-n">01</span><h3>Bring what you have</h3><p>One upload area per kind of information, with the accepted formats stated, and a manual-entry fallback for anything without a document.</p></div>
      <div><span class="mq-n">02</span><h3>Show how sure it is</h3><p>A validation summary separates records extracted cleanly from those needing a look, before the client reviews anything in detail.</p></div>
      <div><span class="mq-n">03</span><h3>Make correction easy</h3><p>Each record shows its source document and original text, calls out missing fields, and stays editable. Possible duplicates offer merge, keep both or discard.</p></div>
      <div><span class="mq-n">04</span><h3>Keep a person responsible</h3><p>The client confirms a declaration, and the submission goes to GEMIS for a final check. The last screen says “Submitted for GEMIS review”, not “Done”.</p></div>
    </div>
    <p class="mq-caveat">The prototype simulates AI processing and uses sample records, including an anonymised sample company. It demonstrates the proposed experience; it is not an operational AI system, and its security and compliance wording does not describe implemented controls.</p>`,
    { mod: 'band' },
  );

// --------------------------------------------------- 9 · technical

const technical = () =>
  section(
    'technical',
    `
    ${head({ id: 'technical', n: '09', label: 'Technical collaboration and implementation direction', title: 'A design direction that changed the build approach.', intro: 'The redesign was initially planned to be implemented in Power BI.' })}
    <div class="mf-tech">
      <div><span class="mq-n">01</span><h3>The initial plan</h3><p>Implement the redesigned system in Power BI.</p></div>
      <div><span class="mq-n">02</span><h3>What changed</h3><p>As the design developed, its interaction and animation requirements — drawers, a collapsible sidebar, live filters, multi-step forms — made a custom frontend and UI a better fit.</p></div>
      <div><span class="mq-n">03</span><h3>How it was decided</h3><p>A collaborative technical decision by the team. My part was the design direction and its interaction needs; the engineering choice and the frontend build belong to the team.</p></div>
    </div>
    <p class="mf-body">Throughout, the full-stack developer’s understanding of the existing system and its dependencies shaped what was feasible, and proposed workflows were checked against it before they were approved.</p>`,
  );

// ------------------------------------------ 10 · status & reflection

const measures = [
  ['Finding information', 'Time to locate key records, such as an overdue invoice'],
  ['Messages', 'Whether important updates are seen and acted on'],
  ['Repeat saves', 'How often forms are submitted more than once'],
  ['Onboarding', 'Time from Take-On start to GEMIS approval'],
  ['Corrections', 'How many extracted records clients need to correct'],
  ['New clients', 'Whether new clients find functions without help'],
];

const status = (ctx) =>
  section(
    'status',
    `
    <div class="mq-statusblock">
      <div>
        <p class="mx-kicker"><span class="mx-kicker__n">10</span>Status, reflection and future evaluation</p>
        <h2 class="mx-h2" id="status-h">Approved, in implementation, not yet measured.</h2>
        <p class="mq-lede">The approved design is being implemented. GEMIS intends to release the redesigned product as one complete experience when implementation is ready. It has not been released or validated with customers, so no outcomes are reported.</p>
      </div>
      ${statusList()}
    </div>
    <h3 class="mx-subh">How we plan to evaluate it</h3>
    <ol class="mf-measures" role="list">
      ${measures.map(([t, d]) => `<li><span class="mf-measures__tag">Proposed</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
    </ol>
    <p class="mf-body">These measures need a baseline from the current product before release, so the comparison is meaningful. That is the first thing I would put in place with the team.</p>
    <h3 class="mx-subh">What I learned</h3>
    <div class="mx-lessons mx-lessons--3">
      <article><h3>Familiarity and discoverability have to be balanced</h3><p>An established product can’t be redesigned as if its clients have no habits. Keeping names and destinations while changing the structure was how I tried to serve both kinds of client.</p></article>
      <article><h3>Enterprise UX lives between screens</h3><p>A dashboard, a table or a form is part of a wider workflow. Working with the developer on dependencies kept me from improving one screen at the expense of another.</p></article>
      <article><h3>AI-assisted flows need visible uncertainty</h3><p>Extracting information isn’t enough. In Take-On, people need to see what the system found, how sure it is and what is missing — and stay responsible for the final answer.</p></article>
    </div>
    ${todo(ctx, 'ManaGEM: publication clearance for the other nine original screenshots', '— only the three navigation crops are approved; the nine remain unused.')}
    ${todo(ctx, 'ManaGEM: publication clearance for the product film and the linked redesign / Take-On prototypes', '— none is embedded or linked on the three ManaGEM pages; the raw files are still served from the repository root.')}
    ${todo(ctx, 'ManaGEM: confirm whether the original client company and its records may be named', '— all Take-On captures and videos use "Sample Trading (Pty) Ltd"; the redesign\'s company switcher reads "Demo Waterproofing".')}
    ${todo(ctx, 'ManaGEM: decide on git-history exposure of the nine unredacted screenshots (commit e0b5bd7, public repository)', '— no history rewrite has been done; it needs explicit authorisation.')}
    ${todo(ctx, 'ManaGEM: root file "Screenshot 2026-11-21 235617.png" still shows the username', '— the published crop removes it; the raw file in the root is still served publicly.')}
    ${todo(ctx, 'ManaGEM: confirm that the names and contact details in the redesign and Take-On prototypes are fictitious', '— e.g. Delta Group, Alex Carter, Mzansi Construct CC, MST Group, phone numbers and emails in Take-On captures; only the client company was anonymised.')}
    ${todo(ctx, 'ManaGEM: confirm the onboarding detail that some prospective clients reportedly disengaged', '— used once, as "reportedly", in the full case study.')}`,
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
    ${discovery(ctx)}
    ${existing(ctx)}
    ${navigation(ctx)}
    ${dashboard(ctx)}
    ${invoices(ctx)}
    ${system(ctx)}
    ${takeon(ctx)}
    ${technical(ctx)}
    ${status(ctx)}
    <section class="mf-return" aria-labelledby="mf-return-h">
      <div class="wrap">
        <h2 id="mf-return-h">That’s the full story.</h2>
        <p>The overview covers the role, the navigation decision and the outcome in about three minutes.</p>
        <a class="btn btn--secondary" href="${url(ctx, QUICK)}">${glyph.back}<span>Back to the overview</span></a>
      </div>
    </section>
    ${nextProject(ctx, next)}
  </article>`;
  },
};
