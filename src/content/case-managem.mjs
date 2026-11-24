// ManaGEM — case study (work/managem/). Built on the shared case-study system
// (cs.mjs). Every factual claim is listed in MANAGEM-CLAIMS-LEDGER.md.
// Screens are the core redesign prototype (demo data) and the Take-On
// prototype (sample data); the three original-navigation captures are the
// ones approved for publication. The Take-On prototype is not linked.

import { url, status } from '../shared.mjs';
import { SRC_CORE, SRC_TAKEON, FULL, DS, REVIEW, ORIGINAL_NAV, STATUS } from './managem-parts.mjs';
import { shot, stage, header, cover, glance, toc, sec, points, rows, note, textlink, close, action, pad } from './cs.mjs';

const PROTO = 'prototypes/managem.html';
const mg = (ctx, key, alt, o = {}) => shot(ctx, `managem/${key}`, alt, { src: SRC_CORE, ...o });

const SECTIONS = [['discovery', 'Discovery'], ['navigation', 'Navigation'], ['data', 'Data first'], ['system', 'Design system'], ['takeon', 'Take-On'], ['status', 'Status']];

const JOURNEY = [
  ['to-04-upload', 'Upload', 'Upload areas for customers, products, staff and suppliers'],
  ['to-05-extraction', 'Extract', 'Processing explained document by document'],
  ['to-07-record', 'Review', 'A record’s source, missing fields and editable values'],
  ['to-11-complete', 'GEMIS check', 'Submitted for GEMIS review'],
];

export default {
  slug: 'managem',
  render(ctx, { p, next }) {
    const proto = { label: 'View prototype', href: url(ctx, PROTO), primary: true, external: true };
    const fullCase = { label: 'Full case study', href: url(ctx, FULL) };
    const tall = (key, alt, cap, o = {}) => mg(ctx, key, alt, { cap, frame: 'tall', sizes: '240px', src: '', ...o });
    return `
  <article class="cx">
    ${header(ctx, {
      kicker: 'Enterprise software · ERP redesign',
      title: p.title,
      summary: 'ManaGEM is an established ERP that clients use every day. I led its UX/UI redesign so new clients can learn it quickly, without existing clients losing what they know.',
      actions: [proto, fullCase],
      facts: [
        ['Role', 'Lead UX/UI and product designer'],
        ['Team', 'Five people'],
        ['Timeline', 'One-month design phase'],
        ['Status', status('Design approved · In development', 'progress')],
      ],
    })}
    ${cover(mg(ctx, 'mg-dashboard', 'The redesigned ManaGEM dashboard: grouped navigation, a messages banner, four headline figures, a sales summary and current projects', { frame: 'browser', bar: 'ManaGEM · Dashboard', cap: 'The redesigned dashboard', eager: true }))}
    ${glance([
      ['Problem', 'ManaGEM grew feature by feature. Existing clients knew where everything was; new clients struggled to find functions.'],
      ['My part', 'Navigation, information hierarchy, workflows, a design system, and Take-On, a new onboarding flow.'],
      ['Outcome', 'The GEMIS manager approved the design and it is being built. Not yet released, so no impact is measured.'],
    ])}
    ${toc(SECTIONS, action(proto))}

    ${sec('discovery', { label: 'Discovery', title: 'Familiar to existing clients, confusing to new ones.', intro: 'I started with the people who use the product and the people who support it.' },
      points([
        ['Six client conversations', 'Phone calls with existing clients, not a formal usability study. They wanted key business information visible immediately.'],
        ['Complaints and product review', 'With the manager and the full-stack developer, I reviewed existing complaints and how features depend on one another.'],
        ['What it shaped', 'Dashboard KPIs, clearer invoices, visible messages, status colours with meaning, and less complexity.'],
      ]))}

    ${sec('navigation', { label: 'Key decision', title: 'Navigation new clients can read, and existing clients still recognise.', intro: 'The original sidebar expanded each section in place into long lists. The manager first preferred to keep it, because clients were used to it. I proposed grouping related functions instead.' },
      `<div class="cx-stage"><div class="cx-ba">
        <div class="cx-ba__col">
          <p class="cx-ba__tag">Before <span>· sections expand into long lists</span></p>
          <div class="cx-ba__row">
            ${tall('nav-original-sales', 'Original sidebar with Sales expanded into twelve items', 'Sales')}
            ${tall('nav-original-products', 'Original sidebar with Products and Pricing expanded', 'Products & Pricing')}
            ${tall('nav-original-projects', 'Original sidebar with Projects Module expanded into three sub-blocks', 'Projects Module')}
          </div>
        </div>
        <div class="cx-ba__col cx-ba__col--after">
          <p class="cx-ba__tag">After <span>· five groups</span></p>
          ${tall('ds-sidebar-expanded', 'Redesigned sidebar with five labelled groups and every destination visible', 'Every destination visible')}
        </div>
      </div><p class="cx-stage__note">${ORIGINAL_NAV}. Redesign: ${SRC_CORE.toLowerCase()}.</p></div>
      ${points([
        ['The trade-off', 'Keep what existing clients know, or make the structure easier to learn. Grouping kept the same destinations and labels.'],
        ['The direction', 'Five groups: Core, Customers, Sales, Operations, Admin. The current page is marked, with a breadcrumb and search on every screen.'],
        ['Review and approval', REVIEW],
      ])}`)}

    ${sec('data', { label: 'Data first', title: 'Important information on the first screen, not five clicks away.', intro: 'Clients wanted to see their business at a glance. I considered pop-ups for urgent actions, but they interrupt the task in hand, so I chose visible messages and search from anywhere.' },
      `${stage(mg(ctx, 'mg-detail-attention', 'Dashboard messages banner above four headline figures', { cap: 'Messages and headline figures come first', sizes: '(min-width: 1200px) 1100px, 92vw' }), 'strip')}
      ${stage(mg(ctx, 'mg-invoices', 'Invoices with totals first and a plain-word status on every row', { frame: 'browser', bar: 'ManaGEM · Invoices', cap: 'Invoices: totals first, then a status in plain words' }))}
      ${points([
        ['Messages, not pop-ups', 'Urgent items sit at the top of the dashboard and never block the task in hand.'],
        ['Search on every screen', 'One search field in the top bar, reachable from anywhere.'],
        ['Who is signed in', 'Clients add their own staff, so the sidebar always shows the person’s name and role.'],
      ])}`)}

    ${sec('system', { label: 'Design system', title: 'A design system GEMIS adopted beyond this product.', intro: 'ManaGEM needed screens that behave alike. I created the design system, the manager approved it and GEMIS formally adopted it.' },
      `${stage(
        mg(ctx, 'mg-dashboard', 'The redesigned ManaGEM dashboard', { cap: 'Product redesign', frame: 'crop', sizes: '(min-width: 1200px) 350px, 92vw' })
        + mg(ctx, 'to-06-validation', 'The Take-On validation summary', { cap: 'Take-On onboarding', src: SRC_TAKEON, frame: 'crop', sizes: '(min-width: 1200px) 350px, 92vw' })
        + mg(ctx, 'ds-land-hero', 'The ManaGEM landing page hero', { cap: 'Landing page', src: 'ManaGEM landing page', frame: 'crop', sizes: '(min-width: 1200px) 350px, 92vw' }),
        'trio')}
      ${points([
        ['One foundation, three experiences', 'I applied the system to the product redesign, Take-On and the ManaGEM landing page.'],
        ['A technical direction reached together', 'The redesign was first planned for Power BI. Its interaction needs made a custom frontend the better fit, shaped by the developer’s knowledge of the existing system.'],
      ], 2)}
      ${textlink(url(ctx, DS), 'See the design system')}`)}

    ${sec('takeon', { label: 'Take-On', title: 'From spreadsheets and back-and-forth to guided onboarding.', intro: 'Onboarding meant collecting company information by hand, in Excel, with repeated checking. Take-On lets a client upload what they have, review what an AI-assisted step extracts, correct it and submit it for a GEMIS check.' },
      `${stage(JOURNEY.map(([key, t, alt], i) => mg(ctx, key, `${t}: ${alt}`, { cap: `${pad(i + 1)} · ${t}`, src: '', frame: 'browser', sizes: '(min-width: 1200px) 520px, 92vw' })).join(''), 'quad', { note: `${SRC_TAKEON}. The prototype simulates the AI processing; it demonstrates the proposed experience, not a working AI system.` })}
      ${points([
        ['People stay in control', 'Every extracted record shows its source and can be corrected before anything is submitted.'],
        ['Status', 'UX/UI prototype complete; development underway.'],
      ], 2)}`)}

    ${sec('status', { label: 'Status', title: 'Approved, and now being built.', intro: 'GEMIS plans to release the redesigned product as a complete experience, not screen by screen. It has not been released to customers, so its effect has not been measured.' },
      `${rows(STATUS.map(([k, v, kind]) => [k, status(v, kind)]))}
      ${textlink(url(ctx, FULL), 'Read the full case study')}`)}

    ${close(ctx, next, [proto, fullCase])}
  </article>`;
  },
};
