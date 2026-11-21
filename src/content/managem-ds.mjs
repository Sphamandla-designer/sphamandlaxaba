// The ManaGEM design system — created by Sphamandla Xaba, approved by the
// GEMIS manager and formally adopted by GEMIS for the ManaGEM product redesign,
// the Take-On onboarding experience and the ManaGEM landing page.
//
// Every value below is read from the built experiences, not invented:
//   - redesign prototype:   prototypes/managem.html (:root tokens + component CSS)
//   - Take-On prototype:    "ManaGem Take-On (Standalone).html" (identical :root)
//   - landing page:         github.com/Sphamandla-designer/managem assets/css/site.css
// Live components are rebuilt in HTML/CSS (src/styles/05-managem-ds.css) with
// those values and animated by the [data-ds] controller in assets/js/main.js.
// Only states that exist in the prototypes are shown.

import { esc } from '../shared.mjs';

export const TOKENS = {
  brand: [
    ['Navy 900', '--navy', '#0F172A', 'Sidebar, primary text'],
    ['Navy 800', '--navy-mid', '#1E293B', 'Sidebar hover'],
    ['Sky 500', '--sky', '#0EA5E9', 'Primary action, focus, active'],
    ['Sky 600', 'hover', '#0284C7', 'Primary hover'],
    ['Sky 100', '--sky-light', '#E0F2FE', 'Selected, info fill'],
    ['Sky 50', '--sky-50', '#F0F9FF', 'Selected rows'],
  ],
  neutrals: [
    ['Canvas', '--canvas', '#F8FAFC'], ['Slate 100', '--slate-100', '#F1F5F9'], ['Border', '--border', '#E2E8F0'], ['Slate 300', '--slate-300', '#CBD5E1'],
    ['Text 3', '--text-3', '#94A3B8'], ['Text 2', '--text-2', '#64748B'], ['Slate 600', '--slate-600', '#475569'], ['Slate 700', '--slate-700', '#334155'],
  ],
  semantic: [
    ['Emerald', '#10B981', '#D1FAE5', '#047857', 'Paid · Verified · up'],
    ['Amber', '#F59E0B', '#FEF3C7', '#B45309', 'Partial · Needs review'],
    ['Red', '#EF4444', '#FEE2E2', '#B91C1C', 'Overdue · Error · down'],
    ['Purple', '#8B5CF6', '#EDE9FE', '#6D28D9', 'Possible duplicate'],
  ],
  landing: [
    ['GEM teal', '#00BFA6', 'Landing primary action and highlights'],
    ['Navy 950', '#070B15', 'Landing dark bands'],
    ['Navy (site)', '#0B1222', 'Landing hero background'],
  ],
};

export const TYPE_SCALE = [
  ['KPI value', '32 / 700 · −0.02em', 'ds-t-kpi', 'R 535K'],
  ['Page title', '24 / 600 · −0.01em', 'ds-t-page', 'Invoices'],
  ['Pipeline count', '24 / 700', 'ds-t-count', '18'],
  ['Drawer title', '16 / 600', 'ds-t-drawer', 'Invite new user'],
  ['Card heading', '15 / 600', 'ds-t-section', 'Current projects'],
  ['Body · table', '13 / 400', 'ds-t-body', 'Eight invoices, R 535,000 outstanding'],
  ['Field label', '12 / 500', 'ds-t-flabel', 'Contact person'],
  ['KPI label', '11 / 600 · caps · 0.05em', 'ds-t-label', 'Total billed'],
  ['Badge', '11 / 500 · caps · 0.04em', 'ds-t-badge', 'Overdue'],
  ['Nav section', '10 / 600 · caps · 0.08em', 'ds-t-navsec', 'Operations'],
  ['Figures', 'JetBrains Mono', 'ds-t-mono', 'INV-2026-0142 · R 425,000'],
];

export const RADII = [['4', 'Checkbox, kbd'], ['6', 'Nav item, pager'], ['7', 'Buttons, inputs, sub-tabs'], ['8', 'Search, icon tiles'], ['10', 'Toolbar, mini stats'], ['12', 'Cards, tables, KPIs'], ['999', 'Badges, chips, toggle']];

export const SHADOWS = [
  ['Small', '0 1px 2px rgba(15,23,42,.04)', 'Cards at rest'],
  ['Medium', '0 4px 12px rgba(15,23,42,.06)', 'KPI and quick-action hover'],
  ['Large', '0 12px 32px rgba(15,23,42,.10)', 'Raised surfaces'],
  ['Drawer', '−10px 0 30px rgba(15,23,42,.12)', 'Side drawer'],
  ['Focus ring', '0 0 0 3px rgba(14,165,233,.12)', 'Focused inputs'],
];

// ------------------------------------------------------------ live board

const tile = (cls, title, meta, body) => `
  <section class="ds-tile ${cls}" aria-label="${esc(title)}">
    <header class="ds-tile__head"><h4>${title}</h4>${meta ? `<span>${meta}</span>` : ''}</header>
    ${body}
  </section>`;

const colour = () =>
  tile('ds-tile--colour', 'Colour', 'Navy and slate structure · one sky accent · four semantic pairs', `
    <div class="ds-brand">
      ${TOKENS.brand.slice(0, 4).map(([n, tok, hex, use], i) => `<div class="ds-sw" style="--c:${hex};--i:${i}"><span class="ds-sw__chip"></span><strong>${n}</strong><code>${hex}</code><em>${use}</em></div>`).join('')}
    </div>
    <div class="ds-ramp" aria-label="Neutral ramp">
      ${TOKENS.neutrals.map(([n, tok, hex], i) => `<span style="--c:${hex};--i:${i}" title="${n} ${hex}"><b>${n}</b></span>`).join('')}
    </div>
    <div class="ds-status">
      ${TOKENS.semantic.map(([n, hex, light, text, use], i) => `<div class="ds-pair" style="--c:${hex};--l:${light};--i:${i}"><span class="ds-pair__chip"><i></i></span><strong>${n}</strong><em>${use}</em></div>`).join('')}
    </div>`);

const type = () =>
  tile('ds-tile--type', 'Typography', 'Outfit for the interface · JetBrains Mono for figures', `
    <div class="ds-aa" aria-hidden="true"><span class="ds-aa__glyph">Aa</span><span class="ds-aa__meta">Outfit<br><b>400 · 500 · 600 · 700</b></span></div>
    <ul class="ds-scale" role="list">
      ${TYPE_SCALE.filter((_, i) => [0, 1, 4, 5, 7, 10].includes(i)).map(([n, spec, cls, sample]) => `<li><span class="ds-scale__k">${n}<small>${spec}</small></span><span class="${cls}">${sample}</span></li>`).join('')}
    </ul>`);

const navigation = () =>
  tile('ds-tile--nav', 'Navigation', 'Grouped sections · active · count · alert', `
    <div class="ds-nav" data-ds-nav data-active="1">
      <p class="ds-nav__g">Sales</p>
      <span class="ds-nav__i" data-i="0">New Enquiry</span>
      <span class="ds-nav__i" data-i="1">Open Enquiries <b>51</b></span>
      <span class="ds-nav__i" data-i="2">Invoices</span>
      <p class="ds-nav__g">Operations</p>
      <span class="ds-nav__i" data-i="3">Debtors Management</span>
      <span class="ds-nav__i" data-i="4">Factory <b class="ds-nav__warn">3</b></span>
      <span class="ds-nav__bar" aria-hidden="true"></span>
      <div class="ds-nav__user"><span class="ds-av">AC</span><span><b>Alex Carter</b><small>Sales Manager</small></span></div>
    </div>`);

const buttons = () =>
  tile('ds-tile--buttons', 'Buttons', '7px radius · 13 / 500 · 120ms', `
    <div class="ds-btns">
      <span class="ds-btn ds-btn--primary ds-press"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>New invoice</span>
      <span class="ds-btn ds-btn--secondary"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>Export</span>
      <span class="ds-btn ds-btn--emerald">Sync with Sage</span>
      <span class="ds-btn ds-btn--ghost">Cancel</span>
      <span class="ds-btn ds-btn--secondary ds-btn--sm">Small</span>
      <span class="ds-cursor" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 2l15 9.5-6.6 1.4L9 19.5z" fill="#0F172A" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg></span>
    </div>
    <p class="ds-cap">Primary, secondary, emerald, ghost and small. Hover darkens or tints; the cursor shows the primary hover.</p>`);

const fields = () =>
  tile('ds-tile--field', 'Form fields', 'Label above · focus ring · two-column rows', `
    <div class="ds-fieldrow">
      <div class="ds-field" data-ds-type="Maria Santos">
        <label>Contact person <b>*</b></label>
        <div class="ds-input"><span class="ds-input__v">Maria Santos</span><span class="ds-input__caret" aria-hidden="true"></span></div>
      </div>
      <div class="ds-field">
        <label>Role</label>
        <div class="ds-input ds-input--ph">e.g. Project Manager</div>
      </div>
    </div>
    <div class="ds-field">
      <label>Customer type <b>*</b></label>
      <div class="ds-input ds-input--select">Repeat Customer<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></div>
    </div>
    <div class="ds-toggle-row"><span class="ds-toggle" aria-hidden="true"><i></i></span>Send confirmation email to customer</div>`);

const badges = () =>
  tile('ds-tile--status', 'Status badges', 'Words and colour, never colour alone', `
    <div class="ds-badges">
      <span class="ds-badge ds-badge--emerald">Paid</span>
      <span class="ds-badge ds-badge--amber">Partial</span>
      <span class="ds-badge ds-badge--sky">Unpaid</span>
      <span class="ds-badge ds-badge--red">Overdue</span>
      <span class="ds-badge ds-badge--purple">Duplicate</span>
      <span class="ds-badge ds-badge--slate ds-badge--dot">Dormant</span>
    </div>
    <div class="ds-row" aria-hidden="true">
      <span class="ds-check is-on"><svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2"/></svg></span>
      <span class="ds-t-mono ds-row__id">INV-2026-0141</span>
      <span class="ds-row__name">Parkside Estates</span>
      <span class="ds-t-mono ds-row__amt">R 182,000</span>
      <span class="ds-badge ds-badge--amber" data-ds-badge>Partial</span>
    </div>
    <p class="ds-cap">A selected row (sky-50 fill, checked box) whose status moves through the invoice states.</p>`);

const tabs = () =>
  tile('ds-tile--tabs', 'Tabs and sub-tabs', 'Counts · warning dot · active state', `
    <div class="ds-tabs" data-ds-tabs>
      <span class="ds-tab is-on">Dashboard</span><span class="ds-tab">Pending <i>4</i></span><span class="ds-tab">Product builds <i>7</i></span><span class="ds-tab">Not invoiced <i>3</i><u></u></span>
    </div>
    <div class="ds-subtabs" data-ds-subtabs>
      <span class="ds-subtab is-on">Dashboard</span><span class="ds-subtab">Suppliers <i>6</i></span><span class="ds-subtab">Purchase orders <i>6</i></span><span class="ds-subtab">Receive <i>4</i></span>
    </div>
    <div class="ds-pager"><span>Showing 1–10 of 243</span><span class="ds-pager__p"><b class="is-on">1</b><b>2</b><b>3</b><b>…</b><b>25</b></span></div>`);

const kpi = () =>
  tile('ds-tile--kpi', 'KPI card', 'Label · value · delta · icon · hover lift', `
    <div class="ds-kpis">
      <div class="ds-kpi"><div class="ds-kpi__top"><span class="ds-t-label">Quotes</span><span class="ds-kpi__icon ds-kpi__icon--em"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5h6l2.5 2.5v8.5h-8.5z M6.5 8h4M6.5 10.5h3" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></span></div><p class="ds-kpi__v">R <span data-ds-count="3348">3348</span>K</p><p class="ds-kpi__d ds-kpi__d--up">↑ +8% vs prior</p></div>
      <div class="ds-kpi ds-kpi--lift"><div class="ds-kpi__top"><span class="ds-t-label">Sales</span><span class="ds-kpi__icon"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 5v3.2l2 1.3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></span></div><p class="ds-kpi__v">R <span data-ds-count="955">955</span>K</p><p class="ds-kpi__d ds-kpi__d--down">↓ −2% vs prior</p></div>
    </div>
    <p class="ds-cap">Demo values from the prototype. Hover raises the card by 1px with the medium shadow.</p>`);

const stepper = () =>
  tile('ds-tile--stepper', 'Progress stepper', 'Multi-step forms · completed steps show a tick', `
    <ol class="ds-steps" data-ds-stepper data-step="4" role="list">
      ${['Customer', 'Site & scope', 'Schedule', 'Review'].map((t, i) => `<li data-n="${i + 1}"><span class="ds-steps__dot"><b>${i + 1}</b><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2"/></svg></span><span class="ds-steps__t"><small>Step ${i + 1}</small>${t}</span></li>`).join('')}
    </ol>`);

const shape = () =>
  tile('ds-tile--shape', 'Radius and elevation', 'Seven radii · four shadows and a focus ring', `
    <div class="ds-radii">
      ${RADII.map(([r, n]) => `<span style="--r:${Math.min(+r, 28)}px"><i></i><code>${r}</code><small>${n}</small></span>`).join('')}
    </div>
    <div class="ds-shadows">
      ${SHADOWS.slice(0, 3).concat([SHADOWS[4]]).map(([n, v, use]) => `<span style="--sh:${v.replace('−', '-')}"><i></i><small><b>${n}</b>${use}</small></span>`).join('')}
    </div>`);

/** The live board. compact = the case-study preview; otherwise the full set. */
export function designSystem({ compact = false } = {}) {
  const tiles = compact
    ? [colour(), type(), navigation(), buttons(), badges(), fields()]
    : [colour(), type(), navigation(), buttons(), badges(), fields(), tabs(), kpi(), stepper(), shape()];
  return `
  <figure class="ds${compact ? ' ds--compact' : ''}" data-ds>
    <div class="ds-board">
      <div class="ds-board__bar" aria-hidden="true">
        <span class="ds-board__logo">G</span>
        <span class="ds-board__name">ManaGEM <b>Design system</b></span>
        <span class="ds-board__tabs"><i class="is-on">Foundations</i><i>Components</i><i>Patterns</i></span>
        <span class="ds-board__live"><i></i>Live components</span>
      </div>
      <div class="ds-grid">${tiles.join('')}</div>
    </div>
    <figcaption class="ds-cap-outer">Live components rendered with the system’s own tokens and typefaces, as used in the ManaGEM redesign and Take-On. Names and figures are the prototypes’ demo data.</figcaption>
  </figure>`;
}

export const DS_PRINCIPLES = [
  ['One accent', 'Sky blue marks the primary action, focus and the active place in the product. Navy and slate carry everything else.'],
  ['Status in words', 'Every state has a label as well as a colour: Paid, Partial, Overdue, Needs review.'],
  ['Figures in mono', 'Amounts and reference numbers use a monospaced face, so columns of numbers line up.'],
  ['Calm density', '13px body text and compact rows for data-heavy screens, with space between groups rather than borders everywhere.'],
];
