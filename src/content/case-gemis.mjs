// GEMIS — Building a digital identity for GEMIS (work/gemis/).
//
// Two parts, seven chapters, written for a recruiter's scan:
//   Part 01 · The story behind the experience  (01–04)
//   Part 02 · The experience in practice       (05–07)
// Each chapter has a one-line intro, about 120–150 words of body copy and one
// anchor visual. Every image is a real asset: the live site (gemis.co.za,
// captured Nov 2026, client-logo row cropped out), the HTML/CSS reference in
// Sphamandla-designer/gemis-site, its first 3D build, or brand files from that
// repository. Diagrams are labelled as reconstructed. No staff or client names.
// Facts resting on Sphamandla's account are listed in GEMIS-CASE-STUDY-EVIDENCE.md.

import { readFileSync } from 'node:fs';
import { esc, url, site, todo, icon, status } from '../shared.mjs';
import * as cx from './cs.mjs';

const svgFile = (name) => readFileSync(new URL(`../../assets/images/gemis/${name}`, import.meta.url), 'utf8').replace(/role="img"[^>]*?aria-label="[^"]*"/, 'aria-hidden="true" focusable="false"');
const LOGO = svgFile('gemis-logo.svg');
const STACKED = svgFile('gemis-logo-stacked.svg');
const MARK = svgFile('gemis-mark.svg');
const LIVE = 'https://gemis.co.za/';
const arrow = icon.arrow;
const pad = (n) => String(n).padStart(2, '0');

// ---------------------------------------------------------------- placeholders
// TESTIMONIAL: a genuine statement from the GEMIS business manager, once
// supplied and cleared. Set it to { text: '…', who: 'Business manager, GEMIS' }
// and it renders at the end of chapter 07. While null, nothing renders.
const TESTIMONIAL = null;

// STUDY_RESULTS: findings of the retrospective usability study on the live
// site, once it has run. Each entry is one plain sentence. While empty,
// nothing renders; chapter 07 carries one sentence saying the study is planned.
const STUDY_RESULTS = [];

// HINDSIGHT: the one specific decision Sphamandla would make differently.
// Supplied by Sphamandla only; never invent it. While null, nothing renders.
const HINDSIGHT = null;


const SRC = { live: 'Live site · Nov 2026', ref: 'HTML/CSS reference', early: 'First 3D build · Jul 2026', repo: 'Brand files · reference repo', diagram: 'Reconstructed diagram' };
const g = (ctx, key, alt, o = {}) => cx.shot(ctx, `gemis/${key}`, alt, { src: SRC[o.from || 'live'], ...o });
const path = (items, cls = '') => `<ol class="gx-path${cls ? ` ${cls}` : ''}" role="list">${items.map((t, i) => `<li><span class="gx-path__n">${pad(i + 1)}</span><span>${t}</span></li>`).join('')}</ol>`;
const fig = (inner, cap, from = 'diagram', cls = '') => `<figure class="gx-fig${cls ? ` ${cls}` : ''}">${inner}<figcaption><span>${cap}</span><small>${SRC[from]}</small></figcaption></figure>`;

const TENSIONS = [
  ['Brand distinction', 'Corporate credibility', 'A distinctive gem mark on a conservative navy-and-white system.'],
  ['Visual richness', 'Clarity', 'Imagery as a ground; the words and the next step lead.'],
  ['Animation', 'Performance', 'Motion only where it explains; anything that advances can be paused.'],
  ['Technical detail', 'Accessible language', 'Nine disciplines in plain names, each with a business outcome.'],
  ['Business ambition', 'Development constraints', 'A static site the team can maintain; the enquiry hands off to email.'],
  ['A memorable experience', 'Practical usability', 'One primary action everywhere: Book a discovery session.'],
];
const SITEMAP = [['Home', 'Discover'], ['Solutions', 'Understand'], ['Products', 'Understand'], ['Our Story', 'Evaluate'], ['Case Studies', 'Explore work'], ['Insights', 'Explore work'], ['Contact', 'Enquire']];
const HIERARCHY = [['Proposition', 'What GEMIS does and for whom', 'Discover'], ['Proof', 'Since 2014, figures, partner line', 'Evaluate'], ['Solutions', 'Nine disciplines, plain names', 'Understand'], ['How we work', 'Four stages', 'Understand'], ['Work', 'Systems in production', 'Explore work'], ['One action', 'Book a discovery session', 'Enquire']];
const COLOURS = [['Navy', '#0A1230'], ['Navy 2', '#0D1636'], ['White', '#FFFFFF'], ['Ink 64%', 'rgba(10,18,48,.64)'], ['Line', 'rgba(255,255,255,.16)'], ['Error', '#B4453A']];
const SCREENS = [
  ['live-solutions', 'Solutions', 'Nine disciplines in plain names, all connected to one accountable team.'],
  ['live-work', 'Case Studies', 'Company figures first, then the systems in production, each with its story.'],
  ['live-story', 'Our Story', 'Since 2014, told through relationships, with the discovery action beside it.'],
  ['live-contact', 'Contact', 'What to send, how quickly GEMIS replies, and a short form.'],
];
const TREE = [
  ['index.html', 'Home'], ['solutions/', 'Overview and nine discipline pages'], ['products/', 'Products'], ['work/', 'Case studies'],
  ['our-story/', 'Company'], ['contact.html', 'Enquiry form and its states'],
  ['assets/css/site.css', 'Tokens and components'], ['assets/js/site.js', 'Menus, pause controls, form validation'],
  ['docs/', 'Decisions and UX review'], ['qa/', 'QA report and captures'],
];
const CSS = `<span class="c">/* tokens — gemis-site/assets/css/site.css */</span>
<b>.hx</b> { <i>--hxn</i>: #0a1230; <i>--hxn-2</i>: #0d1636; <i>--hxw</i>: #ffffff;
      <i>--hxm</i>: rgba(255, 255, 255, .62); <i>--hxl</i>: rgba(255, 255, 255, .16);
      <i>--hxil</i>: rgba(10, 18, 48, .14); <i>--hxim</i>: rgba(10, 18, 48, .64); … }

<b>.hx-btn</b> { display: inline-flex; min-height: 48px; padding: 15px 26px;
  border: 1px solid currentColor; border-radius: 0; font-size: 11px;
  font-weight: 500; letter-spacing: .18em; text-transform: uppercase; … }
<b>.hx-btn--light</b> { background: var(--hxw); border-color: var(--hxw);
  color: var(--hxn); }
<b>.hx-btn--light:hover</b> { background: transparent; color: var(--hxw); }`;
const REVIEW = [
  ['Four names for one action', 'One name everywhere: Book a discovery session'],
  ['Validation only on submit, no summary', 'Checks on leaving a field, and an error summary that takes focus'],
  ['Current page not marked', 'Marked in the navigation, including the drop-down triggers'],
  ['Auto-advancing stages could not be paused', 'A pause control on each'],
  ['Body copy at 14px', '16px body, with a readable line length'],
];
const OUTCOMES = [
  ['A formally adopted design system', 'Tokens, components and patterns adopted by GEMIS.'],
  ['A complete brand identity', 'Logo, lock-ups, colour, type, email signatures and a share card.'],
  ['A live corporate website', 'gemis.co.za, built and hosted by the development team.'],
  ['An inspectable handoff', 'Organised Figma assets and a working HTML/CSS reference on GitHub.'],
];

const SECTIONS = [['opportunity', 'Opportunity'], ['discovery', 'Strategy'], ['experience', 'Key decision'], ['system', 'Brand & system'], ['website', 'Website'], ['delivery', 'Handoff'], ['outcomes', 'Outcomes']];

const opportunity = () => cx.sec('opportunity', { label: 'Part 01 · Opportunity', title: 'A strong reputation, without a front door.', intro: 'GEMIS has built business systems since 2014 and won most of its work through referrals. A prospective client outside that network had nowhere to discover it, and there was no complete brand to show them.' },
  `${fig(`<div class="gx-journeys"><div><p class="cx-label">Before</p>${path(['Referral', 'Introduction', 'Conversation'], 'gx-path--muted')}</div><div><p class="cx-label">The journey the site set out to support</p>${path(['Discover', 'Understand', 'Evaluate', 'Explore work', 'Enquire'])}</div></div>`, 'An intended journey, not measured behaviour')}
  ${cx.points([
    ['The gap', 'No single place for a stranger to learn what GEMIS builds and judge whether to get in touch.'],
    ['The missing brand', 'Navy was a preference, not a visual system.'],
    ['The opportunity', 'One digital touchpoint, with an identity behind it, that carries a visitor from discovery to enquiry.'],
  ])}`);

const discovery = (ctx) => cx.sec('discovery', { label: 'Part 01 · Strategy', title: 'Starting with the business, not the homepage.', intro: 'Before drawing a screen, I worked out what the site had to achieve, for whom, and within which limits.' },
  `${cx.points([
    ['Stakeholder discovery', 'With the business manager and the full-stack developer: objectives, target clients, positioning, brand assets, budget, scope and technical constraints.'],
    ['Competitor review', 'How comparable software companies group services, show credibility, present past work and invite contact.'],
    ['Audience profiles', 'Stakeholder-informed working assumptions, not research findings. Each pointed at the same needs: understand, find a service, judge experience, start a conversation.'],
  ])}
  ${fig(`<p class="gx-question">How might we give prospective clients a credible, clear path from discovering GEMIS to starting a conversation?</p>
    <ol class="gx-tensions" role="list">${TENSIONS.map(([a, b, how]) => `<li><p class="gx-tension__pair"><span>${a}</span><i aria-hidden="true">↔</i><span>${b}</span><span class="sr-only"> — resolved by: </span></p><p class="gx-tension__how">${how}</p></li>`).join('')}</ol>`, 'One question, six tensions, and how each was resolved')}
  ${todo(ctx, 'GEMIS case study: competitor review findings', '— optional; the chapter describes the review without screenshots or names.')}`);

const experience = (ctx) => cx.sec('experience', { label: 'Part 01 · Key decision', title: 'Clarity over a 3D showcase.', intro: 'The business first asked for a futuristic site: extensive 3D, animation and scroll effects. I built that direction, evaluated it against who the site was for, and recommended against it.' },
  `<div class="cx-stage"><div class="gx-versus">
      <div class="gx-versus__col">
        <p class="cx-ba__tag">First build <span>· 3D-heavy</span></p>
        ${g(ctx, 'early-preloader', 'First build: a full-screen preloader counting up before any content', { cap: 'A preloader before any content', from: 'early', frame: 'crop', sizes: '(min-width: 1200px) 520px, 92vw' })}
        ${g(ctx, 'early-motion', 'First build: a 3D object moving over placeholder copy', { cap: 'A 3D object over the copy', from: 'early', frame: 'crop', sizes: '(min-width: 1200px) 520px, 92vw' })}
        <p class="gx-weight"><b>≈ 895 KB</b><span>JavaScript on the home page, including a 3D engine</span></p>
      </div>
      <div class="gx-versus__col gx-versus__col--new">
        <p class="cx-ba__tag">Final direction <span>· clarity first</span></p>
        ${g(ctx, 'live-home', 'The live home page: proposition, proof and two actions in the first view', { cap: 'Proposition and proof first', frame: 'crop', sizes: '(min-width: 1200px) 520px, 92vw' })}
        ${g(ctx, 'live-solutions', 'Live Solutions page: nine disciplines connected to one team', { cap: 'Structure carries the page', frame: 'crop', sizes: '(min-width: 1200px) 520px, 92vw' })}
        <p class="gx-weight"><b>≈ 43 KB</b><span>JavaScript on the home page</span></p>
      </div>
    </div><p class="cx-stage__note">Script weight is a local comparison of the two builds in the reference repository, uncompressed. It is not a page-speed measure.</p></div>
  ${cx.points([
    ['Who it is for', 'People assessing a technology partner want to understand the company quickly.'],
    ['What it risked', 'Heavy assets add performance risk where connections vary, and constant motion competes with the content.'],
    ['The trade-off', 'Less spectacle; nothing between a visitor and the information. Character moved into the gem, the hatch-line imagery and the navy bands.'],
  ])}
  <div class="gx-ia">
    ${fig(`<p class="cx-label">Sitemap, mapped to the journey</p><ul class="gx-map" role="list">${SITEMAP.map(([n, j]) => `<li><b>${n}</b><span>${j}</span></li>`).join('')}</ul><p class="gx-map__cta">Book a discovery session · on every page</p>`, 'Drawn from the live navigation')}
    ${fig(`<p class="cx-label">Home-page hierarchy, top to bottom</p><ol role="list" class="gx-hier">${HIERARCHY.map(([t, d, j]) => `<li><b>${t}</b><span>${d}</span><em>${j}</em></li>`).join('')}</ol>`, 'Drawn from the live home page')}
  </div>
  ${todo(ctx, 'GEMIS case study: original wireframes or early flows', '— none are available; add if found.')}`);

const system = (ctx) => cx.sec('system', { label: 'Part 01 · Brand & system', title: 'From a colour preference to a shared foundation.', intro: 'GEMIS needed an identity it could use everywhere. I designed the mark and lock-ups, then turned the identity into tokens and components. GEMIS formally adopted it as its design system.' },
  `<div class="gx-board">
    <div class="gx-brand">
      <div class="gx-brand__logo gx-brand__logo--light">${LOGO}<span>Primary lock-up</span></div>
      <div class="gx-brand__logo gx-brand__logo--navy">${LOGO}<span>Reversed</span></div>
      <div class="gx-brand__logo gx-brand__logo--light gx-brand__logo--stacked">${STACKED}<span>Stacked</span></div>
      <div class="gx-brand__logo gx-brand__logo--navy gx-brand__logo--mark">${MARK}<span>Mark</span></div>
    </div>
    <div class="gx-ds">
      <div class="gx-ds__col">
        <p class="gx-ds__label">Colour tokens</p>
        <ul class="gx-swatches" role="list">${COLOURS.map(([n, h]) => `<li><i style="--c:${h}"></i><b>${n}</b><code>${h}</code></li>`).join('')}</ul>
        <p class="gx-ds__label gx-ds__gap">Type · Montserrat</p>
        <div class="gx-type">
          <p class="gx-type__d">Systems built to last</p>
          <p class="gx-type__h">Nine disciplines. One team.</p>
          <p class="gx-type__b">Body text at 16px, with a held line length.</p>
          <p class="gx-type__l">Book a discovery session</p>
        </div>
      </div>
      <div class="gx-ds__col gx-ds__col--navy">
        <p class="gx-ds__label">Components</p>
        <div class="gx-specimen">
          <span class="gx-b gx-b--light">Book a discovery session</span>
          <span class="gx-b gx-b--ghost">Explore the work</span>
          <span class="gx-circle" aria-hidden="true">${arrow}</span>
        </div>
        <div class="gx-specimen gx-specimen--white">
          <span class="gx-open"><span class="gx-badge">04</span>How we work</span>
          <span class="gx-b gx-b--ink">Book a session</span>
        </div>
        <div class="gx-specimen gx-specimen--white gx-specimen--fields">
          <span class="gx-field"><span class="gx-field__l">Work email *</span><span class="gx-field__i">name@company.co.za</span></span>
          <span class="gx-field gx-field--err"><span class="gx-field__l">Company *</span><span class="gx-field__i">&nbsp;</span><span class="gx-field__e">Please enter your company name.</span></span>
        </div>
      </div>
    </div>
    <p class="gx-board__cap"><span>Logo files, and specimens rendered from the tokens and component rules in the reference stylesheet</span><small>${SRC.repo}</small></p>
  </div>
  ${cx.stage(g(ctx, 'signature', 'GEMIS email signature with the mark and a discovery-session link', { cap: 'Email signature', from: 'repo', sizes: '(min-width: 1200px) 520px, 92vw' }) + g(ctx, 'share-card', 'GEMIS social share card: Systems built to last. Partners built to stay.', { cap: 'Social share card', from: 'repo', sizes: '(min-width: 1200px) 520px, 92vw' }), 'duo')}
  ${cx.points([
    ['The mark', 'A cut gem in flat facets beside a tracked wordmark, legible at favicon size and in one colour.'],
    ['The system', 'Colour and type tokens, a square uppercase button in three treatments, a numbered section pattern, navigation and form fields with an error state.'],
    ['The outcome', 'Formally adopted by GEMIS as its design system.'],
  ])}
  ${todo(ctx, 'GEMIS case study: business cards, social banners or Figma exports of the system', '— optional; the chapter renders the system from the reference stylesheet.')}`);

const website = (ctx) => cx.sec('website', { label: 'Part 02 · Website', title: 'Every page answers one question.', intro: 'The live site, as a prospective client meets it. Each page opens with the answer and the proof beside it, then the detail, then the next step.' },
  `${cx.stage(SCREENS.map(([key, name, n]) => g(ctx, key, `Live GEMIS website: ${name}`, { cap: `<strong>${name}.</strong> ${n}`, src: '', frame: 'browser', bar: 'gemis.co.za', sizes: '(min-width: 1200px) 520px, 92vw' })).join(''), 'quad', { note: SRC.live })}
  ${cx.stage([['live-m-home', 'Home'], ['live-m-menu', 'Menu'], ['live-m-solutions', 'Solutions'], ['live-m-contact', 'Enquiry']].map(([k, l]) => g(ctx, k, `Live GEMIS website on a phone: ${l}`, { cap: l, src: '', frame: 'phone', sizes: '220px' })).join(''), 'phones', { note: 'The same structure on a phone: navigation folds into a full-height menu and fields stack.' })}
  ${cx.split(
    `<h3 class="cx-h3">The enquiry got the most care</h3>
    ${cx.rows([
      ['One decision', 'A single required choice starts the form.'],
      ['Early checks', 'Each field is checked as the visitor leaves it.'],
      ['Recovery', 'After a failed send, an error summary lists every problem and links to its field.'],
      ['Consistency', 'The current page is always marked, and anything that advances on its own can be paused.'],
    ])}`,
    cx.stage(g(ctx, 'live-form-errors', 'The live enquiry form after a failed send, with an error summary listing five fields', { cap: 'The error summary', frame: 'tall', sizes: '(min-width: 1200px) 420px, 92vw' }), 'form'))}`);

const delivery = (ctx, qa) => cx.sec('delivery', { label: 'Part 02 · Handoff', title: 'I led design. The developers built production.', intro: 'The development team was less familiar with Figma, so alongside the Figma files I built a working HTML/CSS reference and shared it on GitHub. The full-stack developer and the team built and host the production site.' },
  `<figure class="gx-fig gx-code">
    <div class="gx-code__grid">
      <pre tabindex="0" aria-label="Excerpt from the reference stylesheet"><code>${CSS}</code></pre>
      <div class="gx-tree"><p class="gx-tree__root">gemis-site/ <span>selected files</span></p><ul role="list">${TREE.map(([f, d]) => `<li><code>${f}</code><span>${d}</span></li>`).join('')}</ul></div>
    </div>
    <figcaption><span>Actual CSS and file tree from the reference repository</span><small>${SRC.ref}</small></figcaption>
  </figure>
  ${cx.points([
    ['Figma', 'Screens, design-system assets and components, organised for handoff.'],
    ['HTML/CSS reference', 'Every page, its responsive behaviour, the menu, the form and its error states, with the system as tokens in one stylesheet.'],
    ['After handoff', 'I reviewed the implementation against the approved design and took part in testing.'],
  ])}
  <div class="gx-review">
    <h3 class="cx-h3">A UX review on the reference, and what it changed</h3>
    <ul class="gx-fixes" role="list">${REVIEW.map(([f, c]) => `<li><span class="gx-fixes__f">${f}</span><span class="gx-fixes__arrow" aria-hidden="true">→</span><span class="gx-fixes__c">${c}</span></li>`).join('')}</ul>
  </div>
  <div class="gx-qa2">
    <div class="gx-qa2__col">
      <p class="cx-label">Reference build · documented in the repository, Sept–Nov 2026</p>
      <ul role="list">
        <li><b>axe-core, WCAG A/AA</b><span>No violations on the corporate pages at 1440 and 390px, after the second round</span></li>
        <li><b>Link audit</b><span>2,161 internal links and anchors checked, none broken</span></li>
        <li><b>Lighthouse, mobile</b><span>Performance 96–99 on the corporate pages</span></li>
      </ul>
    </div>
    ${qa ? `<div class="gx-qa2__col">
      <p class="cx-label">Live site · gemis.co.za, run ${qa.date}</p>
      <ul role="list">${qa.rows.map(([a, b]) => `<li><b>${a}</b><span>${b}</span></li>`).join('')}</ul>
    </div>` : ''}
  </div>
  ${todo(ctx, 'GEMIS case study: one or two issues found in the implementation review', '— with how they were resolved.')}`);

const outcomes = (ctx) => cx.sec('outcomes', { label: 'Part 02 · Outcomes', title: 'What was delivered, and what I would change.', intro: 'Confirmed outcomes only.' },
  `${cx.points(OUTCOMES, 2)}
  ${TESTIMONIAL ? `<blockquote class="gx-quote"><p>${esc(TESTIMONIAL.text)}</p><footer>${esc(TESTIMONIAL.who)}</footer></blockquote>` : ''}
  ${cx.prose(
    'The most useful thing I did was ask what the site was for before deciding how it should look. That question turned a website request into brand work, and gave me grounds to recommend a calmer direction than the one first requested.',
    '<strong>What I would do differently.</strong> Engage prospective users earlier: a few short comprehension sessions before the structure was fixed would have tested the audience profiles directly. And agree a post-launch measurement plan from the start, covering enquiries, service discovery and content engagement.',
    ...(HINDSIGHT ? [esc(HINDSIGHT)] : []),
    'A retrospective usability study on the live site is planned.',
  )}
  ${STUDY_RESULTS.length ? `<ul class="cx-points cx-points--2" role="list">${STUDY_RESULTS.map((f) => `<li><span>${esc(f)}</span></li>`).join('')}</ul>` : ''}
  ${cx.note('<strong>Evidence and limits.</strong> Screens are the live site, captured November 2026, or the HTML/CSS reference and its first build. Diagrams are reconstructed from the live site and the project brief. Audience profiles were working assumptions. No traffic, conversion, revenue or user-testing results are claimed.')}
  ${todo(ctx, 'GEMIS case study: the one decision you would make differently', '— set HINDSIGHT in case-gemis.mjs; nothing renders until then.')}
  ${todo(ctx, 'GEMIS case study: a statement from the business manager', '— set TESTIMONIAL in case-gemis.mjs; nothing renders until then.')}
  ${todo(ctx, 'GEMIS case study: retrospective usability study results', '— add to STUDY_RESULTS in case-gemis.mjs once the study has run.')}`);

// Dated results of axe and Lighthouse run against https://gemis.co.za/ — kept
// separate from the reference-build results. null hides the column.
let LIVE_QA = null;
try { LIVE_QA = JSON.parse(readFileSync(new URL('./gemis-live-qa.json', import.meta.url), 'utf8')); } catch { /* not run */ }


export default {
  slug: 'gemis',
  render(ctx, { p, next }) {
    const live = { label: 'View live site', href: LIVE, primary: true, external: true };
    return `
  <article class="cx">
    ${cx.header(ctx, {
      kicker: 'Brand Identity · UX Strategy · Website Design',
      title: p.title,
      summary: 'I led the design of GEMIS’s corporate digital experience, transforming its business requirements into a cohesive brand, structured website and reusable design system.',
      actions: [live, { label: 'Ask me about this project', href: `mailto:${site.email}?subject=${encodeURIComponent('GEMIS case study')}` }],
      facts: [
        ['Role', 'UI/UX designer and design lead. I also built the HTML/CSS reference.'],
        ['Team', 'Business manager and a full-stack developer, who built the production site'],
        ['Approach', 'Brand and UX strategy first, a clarity-first website second, one design system under both'],
        ['Status', status('Live website', 'live')],
      ],
    })}
    ${cx.cover(g(ctx, 'live-home', 'The live GEMIS website home page', { frame: 'browser', bar: 'gemis.co.za', cap: 'The live home page', eager: true }))}
    ${cx.glance([
      ['Challenge', 'GEMIS, a South African software company operating since 2014, won most work through referrals and had no digital front door or complete brand identity.'],
      ['My part', 'Discovery, UX strategy, information architecture, brand identity, the design system, website design and the HTML/CSS reference.'],
      ['Headline outcome', 'A formally adopted design system, a complete brand identity and a live corporate website.'],
    ])}
    ${cx.toc(SECTIONS, cx.action(live))}
    ${opportunity(ctx)}
    ${discovery(ctx)}
    ${experience(ctx)}
    ${system(ctx)}
    ${website(ctx)}
    ${delivery(ctx, LIVE_QA)}
    ${outcomes(ctx)}
    ${cx.close(ctx, next, [live])}
  </article>`;
  },
};
