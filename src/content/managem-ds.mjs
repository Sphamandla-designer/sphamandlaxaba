// The ManaGEM design system, rendered live on the case-study pages.
//
// Every value here is taken from the redesign's own stylesheet in
// prototypes/managem.html: colour tokens, the Outfit and JetBrains Mono
// typefaces, radii, button, badge, field, KPI, chip and navigation styles.
// The components are rebuilt in HTML and CSS (src/styles/05-managem-ds.css)
// and animated by assets/js/main.js ([data-ds]) so the system can be seen
// working rather than as a static spec sheet.
//
// The save-state component (saving / saved / error) is specified here as part
// of the system; the prototype screens themselves show the review-and-commit
// flow. That distinction is stated on the page.

import { esc } from '../shared.mjs';

const COLOURS = {
  brand: [
    ['Navy 900', '#0F172A', 'Sidebar, primary text'],
    ['Navy 800', '#1E293B', 'Sidebar hover'],
    ['Sky 500', '#0EA5E9', 'Primary action, focus'],
    ['Sky 100', '#E0F2FE', 'Selected, info fill'],
  ],
  neutrals: [
    ['Slate 50', '#F8FAFC'], ['Slate 100', '#F1F5F9'], ['Slate 200', '#E2E8F0'], ['Slate 300', '#CBD5E1'],
    ['Slate 400', '#94A3B8'], ['Slate 500', '#64748B'], ['Slate 600', '#475569'], ['Slate 700', '#334155'],
  ],
  status: [
    ['Emerald', '#10B981', '#D1FAE5', 'Paid · Verified'],
    ['Amber', '#F59E0B', '#FEF3C7', 'Partial · Review'],
    ['Red', '#EF4444', '#FEE2E2', 'Overdue · Error'],
    ['Purple', '#8B5CF6', '#EDE9FE', 'Duplicate'],
  ],
};

const TYPE = [
  ['Page title', '24 / 600', 'ds-t-page', 'Invoices'],
  ['Section', '16 / 600', 'ds-t-section', 'Customer information'],
  ['Body', '13 / 400', 'ds-t-body', 'Eight invoices, R 535,000 outstanding'],
  ['Label', '11 / 500 · caps', 'ds-t-label', 'Total billed'],
  ['Figures', 'JetBrains Mono', 'ds-t-mono', 'INV-2026-0142 · R 425,000'],
];

const tile = (cls, title, meta, body) => `
  <section class="ds-tile ${cls}" aria-label="${esc(title)}">
    <header class="ds-tile__head"><h4>${title}</h4>${meta ? `<span>${meta}</span>` : ''}</header>
    ${body}
  </section>`;

const colour = () =>
  tile('ds-tile--colour', 'Colour', 'One accent, one neutral ramp, four status pairs', `
    <div class="ds-brand">
      ${COLOURS.brand.map(([n, hex, use], i) => `<div class="ds-sw" style="--c:${hex};--i:${i}"><span class="ds-sw__chip"></span><strong>${n}</strong><code>${hex}</code><em>${use}</em></div>`).join('')}
    </div>
    <div class="ds-ramp" aria-label="Slate neutral ramp, 50 to 700">
      ${COLOURS.neutrals.map(([n, hex], i) => `<span style="--c:${hex};--i:${i}" title="${n} ${hex}"><b>${n.replace('Slate ', '')}</b></span>`).join('')}
    </div>
    <div class="ds-status">
      ${COLOURS.status.map(([n, hex, light, use], i) => `<div class="ds-pair" style="--c:${hex};--l:${light};--i:${i}"><span class="ds-pair__chip"><i></i></span><strong>${n}</strong><em>${use}</em></div>`).join('')}
    </div>`);

const type = () =>
  tile('ds-tile--type', 'Typography', 'Outfit for interface, JetBrains Mono for figures', `
    <div class="ds-aa" aria-hidden="true"><span class="ds-aa__glyph">Aa</span><span class="ds-aa__meta">Outfit<br><b data-ds-weight>400 → 700</b></span></div>
    <ul class="ds-scale" role="list">
      ${TYPE.map(([n, spec, cls, sample]) => `<li><span class="ds-scale__k">${n}<small>${spec}</small></span><span class="${cls}">${sample}</span></li>`).join('')}
    </ul>`);

const buttons = () =>
  tile('ds-tile--buttons', 'Buttons', '7px radius · 13 / 500', `
    <div class="ds-btns">
      <span class="ds-btn ds-btn--primary ds-press"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>New invoice</span>
      <span class="ds-btn ds-btn--secondary"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>Export</span>
      <span class="ds-btn ds-btn--ghost">Cancel</span>
      <span class="ds-cursor" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 2l15 9.5-6.6 1.4L9 19.5z" fill="#0F172A" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg></span>
    </div>
    <div class="ds-chips"><span class="ds-chip">Status: All <i>×</i></span><span class="ds-chip">Customer: All <i>×</i></span><span class="ds-chip ds-chip--add">+ Add filter</span></div>`);

const status = () =>
  tile('ds-tile--status', 'Status badges', 'Words and colour, never colour alone', `
    <div class="ds-badges">
      <span class="ds-badge ds-badge--emerald">Paid</span>
      <span class="ds-badge ds-badge--amber">Partial</span>
      <span class="ds-badge ds-badge--sky">Unpaid</span>
      <span class="ds-badge ds-badge--red">Overdue</span>
      <span class="ds-badge ds-badge--purple">Duplicate</span>
    </div>
    <div class="ds-row" aria-hidden="true">
      <span class="ds-t-mono ds-row__id">INV-2026-0141</span>
      <span class="ds-row__name">Parkside Estates</span>
      <span class="ds-t-mono ds-row__amt">R 182,000</span>
      <span class="ds-badge ds-badge--amber" data-ds-badge>Partial</span>
    </div>
    <p class="ds-cap">Live row: the status updates as the invoice is paid.</p>`);

const field = () =>
  tile('ds-tile--field', 'Form field', 'Label above, focus ring, inline validation', `
    <div class="ds-field" data-ds-type="maria@deltagroup.co.za">
      <label>Email <b>*</b></label>
      <div class="ds-input"><span class="ds-input__v">maria@deltagroup.co.za</span><span class="ds-input__caret" aria-hidden="true"></span><span class="ds-input__ok" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></span></div>
      <p class="ds-field__help"><span class="ds-help--idle">We send the quote to this address.</span><span class="ds-help--ok">Looks good.</span></p>
    </div>
    <div class="ds-toggle-row"><span class="ds-toggle" aria-hidden="true"><i></i></span>Send confirmation email to customer</div>`);

const save = () =>
  tile('ds-tile--save', 'Save states', 'One commit, always confirmed', `
    <div class="ds-save" data-ds-save data-state="saved">
      <div class="ds-save__form">
        <span class="ds-save__line"></span><span class="ds-save__line ds-save__line--short"></span>
        <span class="ds-btn ds-btn--primary ds-save__btn">
          <span class="ds-save__lbl ds-save__lbl--idle">Create enquiry</span>
          <span class="ds-save__lbl ds-save__lbl--saving"><i class="ds-spin" aria-hidden="true"></i>Saving…</span>
          <span class="ds-save__lbl ds-save__lbl--saved"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>Saved</span>
        </span>
      </div>
      <div class="ds-toast" role="presentation"><span class="ds-toast__icon"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></span><span><strong>Enquiry L04/26-125 created</strong><small>Added to Open Enquiries</small></span></div>
      <ol class="ds-save__steps" role="list"><li data-s="idle">Ready</li><li data-s="saving">Saving · button locked</li><li data-s="saved">Saved · confirmed</li></ol>
    </div>`);

const kpi = () =>
  tile('ds-tile--kpi', 'Summary card', 'Label, figure, icon', `
    <div class="ds-kpi">
      <div class="ds-kpi__top"><span class="ds-t-label">Outstanding</span><span class="ds-kpi__icon"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 5v3.2l2 1.3" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></span></div>
      <p class="ds-kpi__v">R <span data-ds-count="535">535</span>K</p>
      <span class="ds-kpi__bar"><i></i></span>
      <p class="ds-cap">35% of R 1,523K billed</p>
    </div>`);

const stepper = () =>
  tile('ds-tile--stepper', 'Progress', 'For any form longer than one screen', `
    <ol class="ds-steps" data-ds-stepper data-step="4" role="list">
      ${['Customer', 'Site & scope', 'Schedule', 'Review'].map((t, i) => `<li data-n="${i + 1}"><span class="ds-steps__dot">${i + 1}</span><span class="ds-steps__t"><small>Step ${i + 1}</small>${t}</span></li>`).join('')}
    </ol>`);

const spacing = () =>
  tile('ds-tile--spacing', 'Spacing and radius', '4px base grid', `
    <ul class="ds-space" role="list">
      ${[4, 8, 12, 16, 24, 32].map((v, i) => `<li style="--v:${v};--i:${i}"><code>${v}</code><span></span></li>`).join('')}
    </ul>
    <div class="ds-radii">
      ${[['4', 'Badge inner'], ['7', 'Buttons'], ['8', 'Inputs'], ['12', 'Cards'], ['999', 'Pills']].map(([r, n]) => `<span style="--r:${Math.min(+r, 28)}px"><i></i><code>${r}</code><small>${n}</small></span>`).join('')}
    </div>`);

const nav = () =>
  tile('ds-tile--nav', 'Navigation', 'Grouped, with location and open work', `
    <div class="ds-nav" data-ds-nav data-active="1">
      <p class="ds-nav__g">Sales</p>
      <span class="ds-nav__i" data-i="0">New Enquiry</span>
      <span class="ds-nav__i" data-i="1">Open Enquiries <b>51</b></span>
      <span class="ds-nav__i" data-i="2">Invoices</span>
      <p class="ds-nav__g">Operations</p>
      <span class="ds-nav__i" data-i="3">Debtors Management</span>
      <span class="ds-nav__i" data-i="4">Factory <b class="ds-nav__warn">3</b></span>
      <span class="ds-nav__bar" aria-hidden="true"></span>
    </div>`);

/**
 * The design-system board. compact = the overview's six-tile version;
 * otherwise the full board with spacing, progress, summary card and navigation.
 */
export function designSystem({ compact = false } = {}) {
  const tiles = compact
    ? [colour(), type(), buttons(), status(), field(), save()]
    : [colour(), type(), buttons(), status(), field(), save(), kpi(), stepper(), nav(), spacing()];
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
    <figcaption class="ds-cap-outer">Rebuilt in code from the redesign’s own tokens — colours, typefaces, radii and component styles are taken from the design prototype. The save states are specified in the system; the prototype screens show the review-and-commit flow.</figcaption>
  </figure>`;
}

export const DS_PRINCIPLES = [
  ['One accent', 'Sky blue marks the single primary action and focus. Everything else is navy and slate.'],
  ['Status in words', 'Every state has a label as well as a colour, so it survives colour blindness and print.'],
  ['Figures in mono', 'Amounts and reference numbers use JetBrains Mono, so columns of numbers line up.'],
  ['Calm density', 'Small type and tight rows for data-heavy screens, with whitespace between groups rather than borders everywhere.'],
];
