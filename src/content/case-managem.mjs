// ManaGEM — overview (work/managem/), the default three-minute reading.
// Body-copy budget: 600–800 words (captions, labels and metadata excluded).
// Every factual claim is listed in MANAGEM-CLAIMS-LEDGER.md. Restricted
// material (other original screenshots, the product film, prototype links,
// the Take-On sample company's real name) is deliberately absent.

import { url, icon } from '../shared.mjs';
import { designSystem } from './managem-ds.mjs';
import {
  SRC_CORE, SRC_TAKEON, FULL, DS, REVIEW, ORIGINAL_NAV,
  shot, video, head, section, chapterNav, nextProject, statusList,
} from './managem-parts.mjs';
import { dsApplied } from './managem-parts.mjs';

const chapters = [
  ['glance', 'At a glance'],
  ['challenge', 'Challenge'],
  ['navigation', 'Navigation'],
  ['data', 'Data first'],
  ['system', 'Design system'],
  ['takeon', 'Take-On'],
  ['status', 'Status'],
];

const link = (ctx, href, label) => `<a class="mq-textlink" href="${url(ctx, href)}">${label}<span aria-hidden="true">${icon.arrow}</span></a>`;

// ------------------------------------------------------------- 1 · hero

const meta = [
  ['Product', 'ManaGEM, an established GEMIS ERP'],
  ['My role', 'Led the UX/UI and product design'],
  ['Team', 'Five people'],
  ['Design phase', 'One month'],
  ['Status', 'Approved design in implementation; not yet released'],
  ['Category', 'Enterprise software / ERP'],
];

// The dashboard, split into the layers it is built from. Each layer is the
// same screenshot cropped to one region (x, y, w, h in the 1440 × 900 capture)
// and lifted off the screen in 3D; scrolling lowers them back into place.
const LAYERS = [
  ['Navigation', 0, 0, 240, 900, 150],
  ['Search', 240, 0, 1200, 56, 60],
  ['Messages', 264, 146, 1152, 56, 250],
  ['Headline figures', 264, 216, 1152, 119, 190],
  ['Sales summary', 264, 351, 737, 346, 110],
  ['Performance', 1017, 351, 399, 346, 300],
  ['Current projects', 264, 713, 1152, 187, 80],
];
const pct = (n) => `${(+n).toFixed(3)}%`;
const layer = ([label, x, y, w, h, z], i) => {
  const css = [
    `left:${pct((x / 1440) * 100)}`, `top:${pct((y / 900) * 100)}`, `width:${pct((w / 1440) * 100)}`, `height:${pct((h / 900) * 100)}`,
    `background-size:${pct((1440 / w) * 100)} ${pct((900 / h) * 100)}`,
    `background-position:${pct(w === 1440 ? 0 : (x / (1440 - w)) * 100)} ${pct(h === 900 ? 0 : (y / (900 - h)) * 100)}`,
    `--z:${z}`, `--i:${i}`,
  ].join(';');
  return `<span class="mc-layer" style="${css}"><b>${label}</b></span>`;
};

const hero = (ctx) => `
  <header class="mc-hero" data-mc-hero aria-labelledby="mq-title" style="--mc-img:url('${url(ctx, 'assets/images/managem/mg-dashboard-1600.webp')}');--mc-img-s:url('${url(ctx, 'assets/images/managem/mg-dashboard-960.webp')}')">
    <div class="mc-hero__pin">
      <div class="mc-hero__glow" aria-hidden="true"></div>
      <div class="wrap mc-hero__copy">
        <a class="back" href="${url(ctx, 'index.html#work')}">← Selected work</a>
        <p class="mq-hero__cat">Case study · ManaGEM ERP redesign</p>
        <h1 class="mq-title" id="mq-title" data-mc-split>Reimagining the experience behind everyday business operations.</h1>
        <p class="mc-hero__cue" aria-hidden="true"><span></span>Scroll to assemble the interface</p>
      </div>
      <div class="mc-stage">
        <div class="mc-plane" data-mc-plane>
          <div class="mq-browser__bar" aria-hidden="true"><i></i><i></i><i></i><span>ManaGEM · Dashboard</span></div>
          <div class="mc-screen">
            ${shot(ctx, 'mg-dashboard', 'The redesigned ManaGEM dashboard: grouped navigation, a messages banner, four headline figures, a sales summary and current projects', { sizes: '(min-width: 1264px) 1200px, 100vw', eager: true })}
            <div class="mc-layers" aria-hidden="true">${LAYERS.map(layer).join('')}</div>
          </div>
        </div>
      </div>
      <p class="mc-hero__cap"><span>The redesigned dashboard.</span><span class="mx-src">${SRC_CORE}</span></p>
    </div>
  </header>
  <section class="mc-statement" aria-label="The design question">
    <div class="wrap">
      <p class="mc-statement__k">The question</p>
      <p class="mc-statement__q" data-mc-scrub>How do you make an established ERP easier for new clients to understand, without disrupting the familiarity existing clients depend on?</p>
      <dl class="mq-herometa">${meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      <p class="mc-statement__more">${link(ctx, FULL, 'Read the full case study')}</p>
    </div>
  </section>`;

// ------------------------------------------------------- 2 · at a glance

const glance = () =>
  section(
    'glance',
    `
    <div class="mq-glance">
      <div class="mq-glance__lead">
        <p class="mx-kicker"><span class="mx-kicker__n">01</span>At a glance</p>
        <h2 class="mx-h2" id="glance-h">A redesign of a product clients already use every day.</h2>
        <p class="mq-lede">ManaGEM is GEMIS’s business management platform, covering enquiries, quotes, jobs, stock, invoicing and debtors. I led the UX/UI and product design for its redesign: reconsidering navigation, information hierarchy, workflows and consistency, and designing a new onboarding experience.</p>
      </div>
      <dl class="mq-glance__facts">
        <div><dt>My role</dt><dd>Product experience, UX/UI direction, workflow and interface decisions, and the design system.</dd></div>
        <div><dt>Team</dt><dd>Me, the GEMIS manager, a full-stack developer, an AI strategist and a tester.</dd></div>
        <div><dt>Manager</dt><dd>Set business expectations, scope, priorities and timeline, and approved the design direction.</dd></div>
        <div><dt>Timeline</dt><dd>One month for the core redesign design phase.</dd></div>
        <div><dt>Scope</dt><dd>The existing product, a design system, and Take-On, a new onboarding flow.</dd></div>
      </dl>
    </div>`,
  );

// ---------------------------------------------------- 3 · challenge

const challenge = () =>
  section(
    'challenge',
    `
    ${head({ id: 'challenge', n: '02', label: 'The challenge and discovery', title: 'Familiar to some clients, confusing to new ones.', intro: 'ManaGEM had grown feature by feature. Existing clients knew where everything was; new clients struggled to find functions and see how the system fitted together.' })}
    <div class="mq-discovery">
      <div class="mq-discovery__item"><span class="mq-n mc-count" data-mc-count="6">6</span><h3>Client phone conversations</h3><p>Conversations with six existing clients showed they wanted important business information visible immediately, instead of searching through several screens.</p></div>
      <div class="mq-discovery__item"><span class="mq-n">↳</span><h3>Product and complaints review</h3><p>With the manager and the full-stack developer, I reviewed existing complaints and the current product, including how features depend on one another.</p></div>
      <div class="mq-discovery__item"><span class="mq-n">→</span><h3>What it informed</h3><p>Dashboard KPIs, invoice presentation, visible messages, semantic status colours, and removing complexity that did not serve a task.</p></div>
    </div>`,
    { mod: 'soft' },
  );

// A moving band of the modules ManaGEM covers (decorative; the same list is
// in the At a glance paragraph).
const MODULES = ['Enquiries', 'Quotes', 'Jobs', 'Stock', 'Invoicing', 'Debtors'];
const marquee = () => `
  <div class="mc-marquee" aria-hidden="true" data-mc-marquee>
    <div class="mc-marquee__track">${[0, 1, 2].map(() => MODULES.map((m, i) => `<span${i % 2 ? ' class="is-fill"' : ''}>${m}</span>`).join('')).join('')}</div>
  </div>`;

// -------------------------------------------------- 4 · navigation

const navigation = (ctx) =>
  section(
    'navigation',
    `
    ${head({ id: 'navigation', n: '03', label: 'The signature decision', title: 'Navigation that new clients can read, and existing clients still recognise.', intro: 'The original sidebar expanded each section in place into long lists of sub-pages. The manager initially preferred to keep it, because existing clients were used to it. I proposed grouping related functions so people could reach them without opening nested sections.' })}
    <div class="mq-navcmp" data-mc-nav>
      <div class="mq-navcmp__orig">
        <p class="mx-compare__label"><span class="mx-compare__dot mx-compare__dot--before" aria-hidden="true"></span>Original interface</p>
        <div class="mq-navcmp__row">
          ${shot(ctx, 'nav-original-sales', 'Original sidebar with Sales expanded into twelve items', { caption: 'Sales', source: ORIGINAL_NAV, sizes: '200px' })}
          ${shot(ctx, 'nav-original-products', 'Original sidebar with Products and Pricing expanded', { caption: 'Products & Pricing', source: ORIGINAL_NAV, sizes: '200px' })}
          ${shot(ctx, 'nav-original-projects', 'Original sidebar with Projects Module expanded into three sub-blocks', { caption: 'Projects Module', source: ORIGINAL_NAV, sizes: '200px' })}
        </div>
      </div>
      <div class="mq-navcmp__new">
        <p class="mx-compare__label"><span class="mx-compare__dot mx-compare__dot--after" aria-hidden="true"></span>Redesign</p>
        ${shot(ctx, 'ds-sidebar-expanded', 'Redesigned sidebar with five labelled groups and every destination visible', { caption: 'Five groups, every destination visible', sizes: '240px' })}
      </div>
    </div>
    <div class="mq-navwhy">
      <div><h3>The trade-off</h3><p>Keep what existing clients know, or make the structure easier to learn. Grouping kept the same destinations and labels, so familiar functions stayed findable.</p></div>
      <div><h3>The direction</h3><p>Five groups — Core, Customers, Sales, Operations, Admin — with the current page marked, a breadcrumb and a search field on every screen.</p></div>
      <div><h3>Review and approval</h3><p>${REVIEW}</p></div>
    </div>`,
  );

// --------------------------------------------------- 5 · data first

const data = (ctx) =>
  section(
    'data',
    `
    ${head({ id: 'data', n: '04', label: 'A data-first experience', title: 'Important information on the first screen, not five clicks away.', intro: 'Clients wanted to see their business at a glance. I first considered pop-ups for urgent actions, but they would interrupt the task in hand, so I chose visible messages and a search field that works from anywhere.' })}
    <div class="mq-datagrid">
      ${shot(ctx, 'mg-detail-attention', 'Dashboard messages banner above four headline figures', { caption: 'Messages and KPIs first', sizes: '(min-width: 1264px) 700px, 100vw', cls: 'mq-datagrid__main' })}
      ${shot(ctx, 'ds-topbar', 'Top bar with breadcrumb, search, notification bell and avatar', { caption: 'Search on every screen', sizes: '(min-width: 1264px) 500px, 100vw' })}
      ${shot(ctx, 'ds-user', 'Signed-in user name and role in the sidebar', { caption: 'Who is signed in, and their role', sizes: '240px' })}
      ${shot(ctx, 'mg-invoices', 'Invoices with totals first and a plain-word status on every row', { caption: 'Invoices: totals, then a status in words', sizes: '(min-width: 1264px) 1200px, 100vw', cls: 'mq-datagrid__wide' })}
    </div>
    <p class="mq-note">ManaGEM lets clients add their own staff, including decision-makers, so the sidebar always shows the signed-in person’s name and role.</p>`,
    { mod: 'soft' },
  );

// ------------------------------------------------ 6 · design system

const system = (ctx) =>
  section(
    'system',
    `
    ${head({ id: 'system', n: '05', label: 'Design system and implementation', title: 'A design system GEMIS adopted beyond this product.', intro: 'ManaGEM needed screens that behaved alike. I created a design system to give it that foundation; GEMIS formally adopted it, and I applied it to the redesign, Take-On and the ManaGEM landing page.' })}
    ${designSystem({ compact: true })}
    ${dsApplied(ctx)}
    <div class="mq-impl">
      <p>The redesign was first planned for Power BI. As the design developed, its interaction and animation needs made a custom frontend the better fit — a technical direction the team reached together, with the full-stack developer’s knowledge of the existing system shaping what was feasible.</p>
      <p class="mq-more">${link(ctx, `${DS}#in-action`, 'See the design system in action')}</p>
    </div>`,
  );

// ------------------------------------------------------- 7 · Take-On

const journey = [
  ['to-04-upload', 'Upload', 'Upload areas for customers, products, staff and suppliers'],
  ['to-05-extraction', 'Extract', 'Processing explained document by document'],
  ['to-07-record', 'Review', 'A record’s source, missing fields and editable values'],
  ['to-11-complete', 'GEMIS check', 'Submitted for GEMIS review'],
];

const takeon = (ctx) =>
  section(
    'takeon',
    `
    ${head({ id: 'takeon', n: '06', label: 'ManaGEM Take-On', title: 'From spreadsheets and back-and-forth to guided onboarding.', intro: 'Onboarding relied on collecting company information by hand, in Excel, with repeated rounds of checking. Take-On lets a client upload what they have, review what an AI-assisted step extracts, correct it, and submit it for a GEMIS check.' })}
    <p class="mq-status-pill"><span class="status status--progress"><span class="status__mark" aria-hidden="true"></span>UX/UI prototype complete; development underway</span></p>
    ${video(ctx, 'flow-takeon-review', 'Filtering extracted customers, opening a record with a missing email, then merging a possible duplicate', { caption: 'Reviewing extracted records: the source, what is missing, and a duplicate merged.', source: SRC_TAKEON })}
    <ol class="mq-strip mq-strip--4" role="list" aria-label="Key Take-On steps">
      ${journey.map(([key, t, alt], i) => `<li><p class="mq-strip__t"><span>${String(i + 1).padStart(2, '0')}</span>${t}</p>${shot(ctx, key, `${t}: ${alt}`, { source: SRC_TAKEON, sizes: '(min-width: 1069px) 300px, 50vw' })}</li>`).join('')}
    </ol>
    <p class="mq-caveat">The prototype simulates the AI processing and uses sample records. It demonstrates the proposed experience, not a working AI system.</p>`,
    { mod: 'band' },
  );

// -------------------------------------------------------- 8 · status

const statusSection = (ctx) =>
  section(
    'status',
    `
    <div class="mq-statusblock">
      <div>
        <p class="mx-kicker"><span class="mx-kicker__n">07</span>Status and next steps</p>
        <h2 class="mx-h2" id="status-h">Approved, and now being built.</h2>
        <p class="mq-lede">The development team is implementing the approved design. GEMIS plans to release the redesigned product as a complete experience rather than screen by screen. It has not yet been released to customers, so its effect has not been measured.</p>
        <p class="mq-more">${link(ctx, FULL, 'Read the full case study')}</p>
      </div>
      ${statusList()}
    </div>`,
    { mod: 'soft' },
  );

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
    ${marquee()}
    ${navigation(ctx)}
    ${data(ctx)}
    ${system(ctx)}
    ${takeon(ctx)}
    ${statusSection(ctx)}
    <section class="mq-invite" aria-labelledby="invite-h">
      <div class="wrap">
        <p class="mx-kicker">Full case study · about 9 minutes</p>
        <h2 id="invite-h">Explore the full case study.</h2>
        <p class="mq-invite__copy">The discovery, the navigation trade-off in detail, invoice clarity, the design system, Take-On and the technical direction.</p>
        <a class="btn btn--primary mq-invite__btn" href="${url(ctx, FULL)}"><span>Explore the full case study</span>${icon.arrow}</a>
      </div>
    </section>
    ${nextProject(ctx, next)}
  </article>`;
  },
};
