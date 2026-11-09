// ManaGEM ERP case study.
// Sources: the ManaGEM screens in assets/images/managem (captured from the
// design, populated with demo data), and the designer's own project notes.

import { figure, placeholder, phInline, button, site } from '../shared.mjs';
import { decision, flow, tree } from '../case.mjs';

export default {
  slug: 'managem',
  lede:
    'ManaGEM is an ERP for trade businesses. My job was to make a product with a lot of moving parts — enquiries, quotes, production, stock, invoices, staff — feel like one coherent tool that people can find their way around without training.',
  intro: [],
  introCtx: (ctx) => [
    ['Team', phInline(ctx, 'ManaGEM: team and collaborators (product owner, developers, others) — names or roles')],
    ['Timeline', phInline(ctx, 'ManaGEM: project timeline (start date, key milestones, launch date)')],
  ],
  cover: (ctx) =>
    figure(ctx, {
      key: 'managem/mg-dashboard',
      alt: 'ManaGEM dashboard: enquiry, quote, sales and opportunity totals, a sales summary chart, monthly performance bars and current project cards',
      caption: 'The ManaGEM dashboard. All screens in this case study use demo data (“Demo Waterproofing”), not client data.',
      eager: true,
      sizes: '(min-width: 1280px) 1200px, 100vw',
    }),

  sections: [
    {
      id: 'context',
      title: 'Product context',
      short: 'Context',
      body: (ctx) => `
        <div class="prose">
          <p class="lead">GEM Information Systems builds ManaGEM, a management platform for trade businesses: companies that run one continuous chain from a customer’s first enquiry through to a paid invoice.</p>
          <p>A single company might take an enquiry, send a quote, build the order in its factory, draw down stock, invoice the customer and chase the payment. In many businesses those steps live in separate spreadsheets, inboxes and accounting tools. ManaGEM brings them into one system, with modules for customers, sales, operations and administration, and support for running more than one company from the same login.</p>
          <p>Because the product follows that chain, its structure matters: if customers are in the system but products are not, sales can’t quote; if staff records are missing, work can’t be assigned. The interface has to make those connections easy to follow.</p>
        </div>
        ${placeholder(ctx, {
          need: 'Who uses ManaGEM day to day, and in which industries.',
          detail: 'Confirm the primary user roles (for example sales managers, factory leads, bookkeepers) and the type of businesses using the live product. Do not include client names without approval.',
        })}`,
    },
    {
      id: 'challenge',
      title: 'The challenge',
      short: 'Challenge',
      body: (ctx) => `
        <div class="prose">
          <p class="lead">The challenge wasn’t a single screen. It was keeping a large product understandable as it grew.</p>
        </div>
        <ul class="points" role="list">
          <li><h3>Depth without getting lost</h3><p>An ERP like this has dozens of areas. Traditional ERPs hide work behind deep navigation trees that people only learn through training.</p></li>
          <li><h3>Status people can actually read</h3><p>Every record — an enquiry, a build, an invoice — moves through states. Legacy systems tend to express those in codes and abbreviations only long-time users can decode.</p></li>
          <li><h3>Related actions in one place</h3><p>ERP workflows often scatter the actions for one record across menus, screens and modes, so the next step is hard to find.</p></li>
          <li><h3>Getting a new client running</h3><p>Before a client could use ManaGEM, their customer lists, price lists and staff registers had to be interpreted and re-typed by hand — weeks of manual work between signing and using the system.</p></li>
        </ul>`,
    },
    {
      id: 'role',
      title: 'My role',
      short: 'My role',
      body: (ctx) => `
        <p class="statement">Owned most UX/UI and product design decisions.</p>
        <div class="split">
          <div class="prose">
            <h3 class="h4">What that meant in practice</h3>
            <ul>
              <li>Structured the information architecture and navigation model — how modules are grouped and how people move between them.</li>
              <li>Designed the shared patterns that every module uses: list views, tables, filters, status chips, forms and dashboard cards.</li>
              <li>Designed the core workflows shown here, including the dashboard, enquiries, invoicing, products and pricing, factory, stock control and staff records.</li>
              <li>Designed Take-On, the guided onboarding flow for bringing a new client’s data into ManaGEM.</li>
              <li>Maintained the design system the product is built from, scoped to what the engineering team could build.</li>
            </ul>
          </div>
          <div class="prose">
            <h3 class="h4">Where others contributed</h3>
            <p>Design direction was reviewed through platform walkthroughs with the product owner, the onboarding team and the director. Development was carried out by the engineering team.</p>
          </div>
        </div>
        ${placeholder(ctx, {
          need: 'Which ManaGEM decisions were shared, and who built what.',
          detail: 'List any product areas designed by someone else, decisions made jointly with the product owner, and the size or make-up of the development team.',
        })}`,
    },
    {
      id: 'structure',
      title: 'Product structure',
      short: 'Structure',
      body: (ctx) => `
        <div class="prose">
          <p class="lead">Navigation is grouped by how the business works, not by how the data is stored.</p>
          <p>The sidebar has five groups. A company switcher at the top lets people who manage more than one business change context without logging out.</p>
        </div>
        ${tree('ManaGEM', [
          { name: 'Core', items: ['Dashboard'] },
          { name: 'Customers', items: ['Customers', 'Customer contacts', 'Warranties'] },
          { name: 'Sales', items: ['New enquiry', 'Open enquiries', 'Closed enquiries', 'Invoices', 'Sage invoices', 'Inspection reports', 'Sales targets', 'Quote templates', 'Reports', 'Master data'] },
          { name: 'Operations', items: ['Debtors management', 'Products & pricing', 'Projects', 'Factory', 'Stock control'] },
          { name: 'Admin', items: ['Staff records', 'My companies'] },
        ], 'Taken from the live navigation. Counts in the sidebar (for example open enquiries, factory alerts) show where work is waiting.')}
        <div class="split split--media">
          <div class="prose">
            <h3 class="h4">The chain the product follows</h3>
            ${flow(['Customer', 'Enquiry & quote', 'Production', 'Stock', 'Invoice', 'Payment'], { label: 'Business chain', dense: true })}
            <h3 class="h4">One workflow, step by step</h3>
            <p>Capturing a new enquiry is split into four steps, with progress always visible, so a long form never arrives as one wall of fields:</p>
            ${flow([{ t: 'Customer', d: 'Who it is, and where the lead came from' }, { t: 'Site & scope', d: 'Where the work is and what it involves' }, { t: 'Schedule', d: 'When it needs to happen' }, { t: 'Review', d: 'Check before it is created' }], { label: 'New enquiry steps' })}
          </div>
          ${figure(ctx, { key: 'managem/mg-sidebar', alt: 'ManaGEM sidebar navigation grouped into Core, Customers, Sales, Operations and Admin', caption: 'The sidebar, with the company switcher at the top.', frame: 'plain', sizes: '220px', cls: 'fig--narrow' })}
        </div>`,
    },
    {
      id: 'decisions',
      title: 'Key design decisions',
      short: 'Decisions',
      body: (ctx) => [
        decision(ctx, {
          n: '01',
          title: 'Lead every list with search and live counts',
          challenge: 'People were expected to remember where things lived in a deep menu before the product was useful to them.',
          considerations: 'Deeper menus and saved filters would help experienced users but do little for someone new. Search only helps if it is the first thing you see.',
          decision: 'Every list view opens with a search field and a row of live counts for the stages of that workflow, followed by tabs, filters and export.',
          rationale: 'People can type what they want instead of navigating to it, and the counts answer “how much is waiting?” before they scroll.',
          evidence: figure(ctx, { key: 'managem/mg-open-enquiries', alt: 'Open enquiries list with stage counts, search, filters and a table of enquiries with status chips', caption: 'Open enquiries — stage counts and search come before the table.', sizes: '(min-width: 1024px) 760px, 100vw' }),
        }),
        decision(ctx, {
          n: '02',
          title: 'One plain-language status system across every module',
          challenge: 'Each module had its own way of describing state, so the same idea could look different from one screen to the next.',
          considerations: 'Module-specific colours would allow more variety, but people would have to relearn them on every screen.',
          decision: 'A single set of status chips with plain words — Paid, Partial, Unpaid, Overdue; Repeat customer, Scheduled, Quoted — and consistent colour meaning everywhere.',
          rationale: 'Status is the thing people scan for most. Words carry the meaning, so the chips still work for people who can’t distinguish the colours, and the same colour means the same thing in every module.',
          evidence: figure(ctx, { key: 'managem/mg-invoices', alt: 'Invoices screen with totals for billed, paid, outstanding and overdue, and a table where each invoice has a status chip', caption: 'Invoices — status reads as words first, colour second.', sizes: '(min-width: 1024px) 760px, 100vw' }),
        }),
        decision(ctx, {
          n: '03',
          title: 'Put actions where the work happens',
          challenge: 'Related actions were spread across menus, so finding the next step meant leaving the record you were working on.',
          considerations: 'A global action menu is consistent but far from the record. Inline actions are closer but can clutter tables.',
          decision: 'Primary page actions (New product, New job) sit at the top right of each page; sync, export and record-level actions sit beside the lists they affect.',
          rationale: 'The next step is always within reach of the thing it acts on, and the page-level button is always in the same place.',
          evidence: figure(ctx, { key: 'managem/mg-products', alt: 'Products and pricing list with tabs for variations, components and kits, and actions beside the table', caption: 'Products & pricing — actions sit beside the records they change.', sizes: '(min-width: 1024px) 760px, 100vw' }),
        }),
        decision(ctx, {
          n: '04',
          title: 'Show production as a pipeline, not a list',
          challenge: 'Factory work moves through clear stages, and people outside production need to know where an order is without opening it.',
          considerations: 'A plain table of jobs is complete but makes it hard to see bottlenecks at a glance.',
          decision: 'The factory dashboard leads with counts for pending jobs, active builds and work ready to invoice, then a five-stage pipeline: Pending, In build, QC check, Ready, Invoiced.',
          rationale: 'The pipeline mirrors how the work actually moves, and the “Not invoiced” count links production straight back to finance.',
          evidence: figure(ctx, { key: 'managem/mg-factory', alt: 'Factory dashboard with counts for pending, active, ready-to-invoice and completed jobs, a production pipeline and recent activity', caption: 'Factory — the production pipeline, with recent activity below.', sizes: '(min-width: 1024px) 760px, 100vw' }),
        }),
        decision(ctx, {
          n: '05',
          title: 'Make onboarding a guided, reviewable flow',
          challenge: 'Getting a new client running meant weeks of re-typing their customer, product and staff records by hand.',
          considerations: 'A fully automatic import would be quicker to demonstrate, but a business owner has to trust what goes into their system. A black box would fail that test.',
          decision: 'Take-On: the client uploads their existing documents, records are extracted for review, each one carries a plain-language state, and nothing goes live until the client confirms it and the GEMIS team completes a final check.',
          rationale: 'Automation only helps if people can understand, correct and approve what it did. Two human checks keep the client in control of their own data.',
          evidence: `<div class="duo">${figure(ctx, { key: 'managem/to-06-validation', alt: 'Take-On validation screen summarising records as verified, needing review or possible duplicates', caption: 'Each record is marked verified, needs review or possible duplicate.', sizes: '(min-width: 1024px) 380px, 100vw' })}${figure(ctx, { key: 'managem/to-10-confirm', alt: 'Take-On confirmation screen where the client approves each category of data', caption: 'The client confirms each category before anything goes live.', sizes: '(min-width: 1024px) 380px, 100vw' })}</div>
          ${placeholder(ctx, { need: 'Current status of Take-On.', detail: 'Confirm whether Take-On is live in the product, in development or a design direction, and update this decision’s wording to match.' })}`,
        }),
      ].join(''),
    },
    {
      id: 'interface',
      title: 'Interface design',
      short: 'Interface',
      body: (ctx) => `
        <div class="prose"><p class="lead">The screens below are grouped by workflow. They share one layout: breadcrumbs and global search at the top, the page title and primary action, summary counts, then the work itself.</p></div>
        <div class="workflow">
          <h3 class="workflow__title"><span>Sales</span> From a new lead to an open enquiry</h3>
          <div class="duo">
            ${figure(ctx, { key: 'managem/mg-new-enquiry', alt: 'New enquiry form, step one of four: customer information', caption: 'New enquiry — a four-step form with progress at the top.', sizes: '(min-width: 1024px) 480px, 100vw' })}
            ${figure(ctx, { key: 'managem/mg-open-enquiries', alt: 'Open enquiries table with status chips and sales reps', caption: 'Open enquiries — every lead, its stage and its owner.', sizes: '(min-width: 1024px) 480px, 100vw' })}
          </div>
        </div>
        <div class="workflow">
          <h3 class="workflow__title"><span>Operations</span> Building and stocking the order</h3>
          <div class="duo">
            ${figure(ctx, { key: 'managem/mg-factory', alt: 'Factory production dashboard and pipeline', caption: 'Factory — jobs by stage.', sizes: '(min-width: 1024px) 480px, 100vw' })}
            ${figure(ctx, { key: 'managem/mg-stock', alt: 'Stock control dashboard with stock value, low stock items, warehouse capacity and recent movements', caption: 'Stock control — value, low-stock alerts and recent movements.', sizes: '(min-width: 1024px) 480px, 100vw' })}
          </div>
        </div>
        <div class="workflow">
          <h3 class="workflow__title"><span>Admin</span> The people doing the work</h3>
          ${figure(ctx, { key: 'managem/mg-staff', alt: 'Staff members table with department, employment type and job title', caption: 'Staff records — department and employment type use the same chip pattern as sales and finance.', sizes: '(min-width: 1280px) 960px, 100vw' })}
        </div>`,
    },
    {
      id: 'demo',
      title: 'Live product demonstration',
      short: 'Demo',
      body: (ctx) => `
        <div class="demo">
          <div class="demo__media">
            ${figure(ctx, { key: 'managem/mg-login', alt: 'ManaGEM sign-in screen with the line “Run your business with clarity.”', caption: 'The ManaGEM sign-in screen.', sizes: '(min-width: 1024px) 640px, 100vw' })}
          </div>
          <div class="demo__text prose">
            <p class="label">Walkthrough</p>
            <h3 class="h3">See ManaGEM working</h3>
            <p>ManaGEM is a live product, so the full system isn’t public. I’m happy to walk you through it on a call — the navigation, the sales-to-invoice workflow and the decisions behind them — using demo data.</p>
            <div class="btn-row">
              ${button(ctx, { label: 'Request a product walkthrough', href: `mailto:${site.email}?subject=${encodeURIComponent('ManaGEM walkthrough request')}`, variant: 'primary' })}
              ${button(ctx, { label: 'Open the design prototype', href: 'prototypes/managem.html', variant: 'secondary', ic: 'external', external: true })}
            </div>
            <p class="small muted">The design prototype is a high-fidelity, partly interactive model of the product with demo data. Some actions show the pattern without carrying it out.</p>
          </div>
        </div>
        ${placeholder(ctx, {
          need: 'An approved demonstration of the live product.',
          detail: 'Supply either a public or approved demo link, or a short screen recording (MP4/WebM, under 60 seconds, demo data only). Never use a client’s data.',
        })}`,
    },
    {
      id: 'outcome',
      title: 'Outcome and reflection',
      short: 'Reflection',
      body: (ctx) => `
        <div class="split">
          <div class="prose">
            <h3 class="h4">What was delivered</h3>
            <ul>
              <li>An information architecture and navigation model covering customers, sales, operations and admin.</li>
              <li>Designs for the core workflows, from a new enquiry through production, stock and invoicing.</li>
              <li>One set of shared patterns — search-first lists, plain-language status, contextual actions, step-by-step forms.</li>
              <li>The Take-On onboarding flow and the design system used across both.</li>
            </ul>
          </div>
          <div class="prose">
            <h3 class="h4">What I learned</h3>
            <p>I started out treating this as an interface update and finished treating it as a problem of trust and structure. People don’t need more features on screen; they need to know where they are, what state their work is in and what happens next.</p>
            <p>Enterprise design is negotiated. The constraints — a small engineering team, new modules phasing in next to older ones — pushed me towards a smaller set of patterns that work everywhere, which turned out to be the most useful thing I designed.</p>
            <h3 class="h4">What I’d do next</h3>
            <p>Watch people use the product with their own work: how they find things, where the status language helps or confuses, and how long it takes a new client to get running.</p>
          </div>
        </div>
        ${placeholder(ctx, {
          need: 'Verified outcome for ManaGEM.',
          detail: 'Confirm the launch date and what is live today. Add usage figures or feedback only if they can be verified and shared.',
        })}`,
    },
  ],
};
