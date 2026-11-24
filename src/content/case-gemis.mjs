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
import { esc, url, img, site, todo, icon } from '../shared.mjs';
import { full } from './managem-parts.mjs';

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

// Source labels, kept short so they read as provenance, not disclaimers.
const SRC = {
  live: 'Live site · Nov 2026',
  ref: 'HTML/CSS reference',
  early: 'First 3D build · Jul 2026',
  repo: 'Brand files · reference repo',
  diagram: 'Reconstructed diagram',
};
const src = (k) => `<span class="gx-src gx-src--${k}">${SRC[k]}</span>`;

const shot = (ctx, key, alt, { cap = '', from = 'live', sizes = '(min-width: 1100px) 900px, 92vw', cls = '', eager = false } = {}) => `
  <figure class="gx-shot${cls ? ` ${cls}` : ''}">
    <a class="gx-shot__frame zoom" href="${full(ctx, `gemis/${key}`)}" data-zoom data-caption="${esc(cap || alt)}" aria-label="Enlarge: ${esc(alt)}">${img(ctx, `gemis/${key}`, alt, { sizes, eager })}</a>
    <figcaption>${cap ? `<span>${cap}</span>` : ''}${src(from)}</figcaption>
  </figure>`;

const chapter = (id, n, label, title, intro) => `
  <header class="gx-head">
    <p class="gx-kicker"><span class="gx-kicker__n">${pad(n)}</span>${label}</p>
    <h2 class="gx-h2" id="${id}-h">${title}</h2>
    <p class="gx-intro">${intro}</p>
  </header>`;

const sec = (id, body, mod = '') => `
  <section class="gx-sec${mod ? ` gx-sec--${mod}` : ''}" id="${id}" aria-labelledby="${id}-h">
    <div class="wrap">${body}</div>
  </section>`;

const part = (id, n, title, desc) => `
  <div class="gx-part" id="${id}">
    <div class="wrap">
      <p class="gx-part__n">Part ${pad(n)}</p>
      <p class="gx-part__t">${title}</p>
      <p class="gx-part__d">${desc}</p>
    </div>
  </div>`;

const path = (items, cls = '') => `<ol class="gx-path${cls ? ` ${cls}` : ''}" role="list">${items.map((s, i) => `<li><span class="gx-path__n">${pad(i + 1)}</span><span>${s}</span></li>`).join('')}</ol>`;

// ===================================================================== HERO

const hero = (ctx) => `
  <header class="gx-hero" aria-labelledby="gx-title">
    <div class="wrap">
      <a class="gx-back" href="${url(ctx, 'index.html#work')}"><span aria-hidden="true">←</span> Selected work</a>
      <div class="gx-hero__grid">
        <div class="gx-hero__copy">
          <p class="gx-eyebrow">Brand Identity · UX Strategy · Website Design</p>
          <h1 class="gx-title" id="gx-title">Building a digital identity for GEMIS.</h1>
          <p class="gx-lede">I led the design of GEMIS’s corporate digital experience, transforming its business requirements into a cohesive brand, structured website and reusable design system.</p>
        </div>
        <dl class="gx-summary">
          <div><dt>Challenge</dt><dd>GEMIS, a South African software company operating since 2014, won most work through referrals and had no digital front door or complete brand identity.</dd></div>
          <div><dt>My role</dt><dd>UI/UX designer and design lead, working with the business manager and a full-stack developer, who built the production site. I also built the working HTML/CSS reference.</dd></div>
          <div><dt>Approach</dt><dd>Brand identity and UX strategy first, a restrained clarity-first website second, a reusable design system underneath both.</dd></div>
          <div class="gx-summary__out"><dt>Headline outcome</dt><dd>A formally adopted design system</dd></div>
        </dl>
      </div>
    </div>
    <div class="gx-stage wrap">
      <div class="gx-stage__desk"><div class="gx-browser"><span class="gx-browser__bar" aria-hidden="true"><i></i><i></i><i></i><b>gemis.co.za</b></span>${img(ctx, 'gemis/live-home', 'The live GEMIS website home page', { sizes: '(min-width: 1100px) 1000px, 92vw', eager: true })}</div></div>
      <div class="gx-stage__phone">${img(ctx, 'gemis/live-m-home', 'The live GEMIS website home page on a phone', { sizes: '240px', eager: true })}</div>
      <p class="gx-stage__cap"><span>The live home page, desktop and phone</span>${src('live')} <a href="${LIVE}" rel="noopener" target="_blank">Visit gemis.co.za<span class="sr-only"> (opens in a new tab)</span></a></p>
    </div>
  </header>`;

const CHAPTERS = [
  [1, 'opportunity', 'Opportunity'], [1, 'discovery', 'Discovery & strategy'], [1, 'experience', 'Experience design'], [1, 'system', 'Brand & system'],
  [2, 'website', 'Website'], [2, 'delivery', 'Design to development'], [2, 'outcomes', 'Outcomes'],
];

const toc = () => `
    <nav class="gx-toc" aria-label="Case study chapters" data-chapters>
      <span class="gx-toc__bar" data-progress aria-hidden="true"></span>
      <div class="wrap"><ol role="list">${CHAPTERS.map(([p, id, l], i) => `<li${i === 0 || CHAPTERS[i - 1][0] !== p ? ` class="gx-toc__start" data-part="Part ${pad(p)}"` : ''}><a href="#${id}"><span>${pad(i + 1)}</span>${l}</a></li>`).join('')}</ol></div>
    </nav>`;

// ======================================================= 01 · OPPORTUNITY

const opportunity = () => sec('opportunity', `
  ${chapter('opportunity', 1, 'The opportunity', 'A strong reputation, without a front door.', 'GEMIS had more than a decade of work behind it, and no front door a stranger could find.')}
  <div class="gx-cols">
    <div class="gx-prose">
      <p>GEMIS is a South African software and business-systems company, operating since 2014. Its reputation was built through referrals and long relationships, and many clients have stayed for years.</p>
      <p>That model works inside a network and stalls outside it. A prospective client who heard the name had nowhere to discover GEMIS independently, understand what it builds, judge whether it was credible and decide to get in touch. There was also no complete brand to express: navy was a preference, not a system.</p>
      <p>So the opportunity was larger than a website. It was a single digital touchpoint, with an identity behind it, that could carry a visitor from discovery to enquiry without a referral doing the work.</p>
    </div>
    <figure class="gx-journeys">
      <div><p class="gx-label">Before</p>${path(['Referral', 'Introduction', 'Conversation'], 'gx-path--muted')}</div>
      <div><p class="gx-label">The journey the site set out to support</p>${path(['Discover', 'Understand', 'Evaluate', 'Explore work', 'Enquire'])}</div>
      <figcaption><span>An intended journey, not measured behaviour</span>${src('diagram')}</figcaption>
    </figure>
  </div>`);

// =================================================== 02 · DISCOVERY & STRATEGY

const TENSIONS = [
  ['Brand distinction', 'Corporate credibility', 'A distinctive gem mark on a conservative navy-and-white system.'],
  ['Visual richness', 'Clarity', 'Imagery as a ground; the words and the next step lead.'],
  ['Animation', 'Performance', 'Motion only where it explains; anything that advances can be paused.'],
  ['Technical detail', 'Accessible language', 'Nine disciplines in plain names, each with a business outcome.'],
  ['Business ambition', 'Development constraints', 'A static site the team can maintain; the enquiry hands off to email.'],
  ['A memorable experience', 'Practical usability', 'One primary action everywhere: Book a discovery session.'],
];

const discovery = (ctx) => sec('discovery', `
  ${chapter('discovery', 2, 'Discovery & strategy', 'Starting with the business, not the homepage.', 'Before drawing a screen, I worked out what the site had to achieve, for whom, and within which limits.')}
  <div class="gx-cols">
    <div class="gx-prose">
      <p>I began with the business manager and the full-stack developer: objectives, target clients, positioning, existing brand assets, budget, scope and technical constraints.</p>
      <p>I reviewed comparable software and technology companies for four things: how they group services, what they show to be believed, how they present past work, and when they invite contact. It set the conventions visitors already expect, and showed where GEMIS could be plainer.</p>
      <p>From those conversations I drafted audience profiles, labelled as stakeholder-informed working assumptions rather than research findings. Each pointed at the same needs: understand what GEMIS does, find a relevant service, judge its experience, and start a conversation easily.</p>
      <p>The strategy came down to one question and six tensions the design had to resolve.</p>
    </div>
    <figure class="gx-tensions">
      <p class="gx-question">How might we give prospective clients a credible, clear path from discovering GEMIS to starting a conversation?</p>
      <ol role="list">${TENSIONS.map(([a, b, how]) => `<li><p class="gx-tension__pair"><span>${a}</span><i aria-hidden="true">↔</i><span>${b}</span><span class="sr-only"> — resolved by: </span></p><p class="gx-tension__how">${how}</p></li>`).join('')}</ol>
      <figcaption><span>One question, six tensions, and how each was resolved</span>${src('diagram')}</figcaption>
    </figure>
  </div>
  ${todo(ctx, 'GEMIS case study: competitor review findings', '— optional; the chapter describes the review without screenshots or names.')}`, 'soft');

// =================================================== 03 · EXPERIENCE DESIGN

const SITEMAP = [['Home', 'Discover'], ['Solutions', 'Understand'], ['Products', 'Understand'], ['Our Story', 'Evaluate'], ['Case Studies', 'Explore work'], ['Insights', 'Explore work'], ['Contact', 'Enquire']];
const HIERARCHY = [['Proposition', 'What GEMIS does and for whom', 'Discover'], ['Proof', 'Since 2014, figures, partner line', 'Evaluate'], ['Solutions', 'Nine disciplines, plain names', 'Understand'], ['How we work', 'Four stages', 'Understand'], ['Work', 'Systems in production', 'Explore work'], ['One action', 'Book a discovery session', 'Enquire']];

const experience = (ctx) => sec('experience', `
  ${chapter('experience', 3, 'Experience design', 'Clarity over a 3D showcase.', 'The defining decision was to recommend against the direction the business first asked for.')}
  <div class="gx-cols">
    <div class="gx-prose">
      <p>The business’s first preference was futuristic: extensive 3D, animation and scroll effects. The first build explored exactly that, with a preloader, a real-time 3D object and scroll-driven sequences.</p>
      <p>I evaluated it against who the site was for. People assessing a technology partner want to understand the company quickly; heavy assets add performance risk where connections vary; and constant motion competes with the information people came for.</p>
      <p>I recommended a restrained, clarity-first direction. The business gave up some spectacle and gained a site where nothing stands between a visitor and the content. Character moved into the gem, the hatch-line imagery and the navy bands.</p>
      <p>The structure followed the same logic: seven destinations ordered by the questions a client asks, a home page that walks the journey from Discover to Enquire, and one action, Book a discovery session, on every page.</p>
    </div>
    <div class="gx-versus">
      <div class="gx-versus__col">
        <p class="gx-label">First build · 3D-heavy</p>
        ${shot(ctx, 'early-preloader', 'First build: a full-screen preloader counting up before any content', { cap: 'A preloader before any content', from: 'early', sizes: '(min-width: 1100px) 300px, 46vw' })}
        ${shot(ctx, 'early-motion', 'First build: a 3D object moving over placeholder copy', { cap: 'A 3D object over the copy', from: 'early', sizes: '(min-width: 1100px) 300px, 46vw' })}
      </div>
      <div class="gx-versus__col gx-versus__col--new">
        <p class="gx-label">Final direction · clarity first</p>
        ${shot(ctx, 'live-home', 'The live home page: proposition, proof and two actions in the first view', { cap: 'Proposition and proof first', sizes: '(min-width: 1100px) 300px, 46vw' })}
        ${shot(ctx, 'live-sec-process', 'Live How we work section: four stages and one action', { cap: 'Structure carries the page', sizes: '(min-width: 1100px) 300px, 46vw' })}
      </div>
      <p class="gx-weight"><span><b>≈ 895 KB</b> JavaScript on the first build’s home page, including a 3D engine</span><span><b>≈ 43 KB</b> on the final direction’s</span></p>
      <p class="gx-weight__note">A local script-weight comparison of the two builds in the reference repository, uncompressed. Not a page-speed measure.</p>
    </div>
  </div>
  <div class="gx-ia">
    <figure class="gx-map">
      <p class="gx-label">Sitemap, mapped to the journey</p>
      <div class="gx-map__root"><span class="gx-mark">${MARK}</span>GEMIS</div>
      <ul role="list">${SITEMAP.map(([n, j]) => `<li><b>${n}</b><span>${j}</span></li>`).join('')}</ul>
      <p class="gx-map__cta">Book a discovery session · on every page</p>
      <figcaption><span>Drawn from the live navigation</span>${src('diagram')}</figcaption>
    </figure>
    <figure class="gx-map">
      <p class="gx-label">Home-page hierarchy, top to bottom</p>
      <ol role="list" class="gx-hier">${HIERARCHY.map(([s, d, j]) => `<li><b>${s}</b><span>${d}</span><em>${j}</em></li>`).join('')}</ol>
      <figcaption><span>Drawn from the live home page</span>${src('diagram')}</figcaption>
    </figure>
  </div>
  ${todo(ctx, 'GEMIS case study: original wireframes or early flows', '— none are available; add if found.')}`);

// ================================================ 04 · BRAND & DESIGN SYSTEM

const COLOURS = [['Navy', '#0A1230'], ['Navy 2', '#0D1636'], ['White', '#FFFFFF'], ['Ink 64%', 'rgba(10,18,48,.64)'], ['Line', 'rgba(255,255,255,.16)'], ['Error', '#B4453A']];

const system = (ctx) => sec('system', `
  ${chapter('system', 4, 'Brand & design system', 'From a colour preference to a shared foundation.', 'GEMIS needed an identity it could use everywhere, not a website palette.')}
  <div class="gx-cols gx-cols--wide">
    <div class="gx-prose">
      <p>I started from the one thing that existed, a preference for navy, and built the identity around it: a cut gem in flat facets beside a tracked wordmark, legible at favicon size and in one colour, with Montserrat for its range from a light display cut to a firm label.</p>
      <p>The identity then became a system: colour and type tokens, a square uppercase button in three treatments, a numbered section pattern, navigation with drop-downs and a full-height phone menu, and form fields with a visible error state. The same parts produced the email signatures and the social share card.</p>
      <p>Because the parts are documented as tokens and rules rather than as finished pages, the same foundation can carry the next interface. GEMIS formally adopted it as the company’s design system.</p>
    </div>
    <div class="gx-adopted">
      <p class="gx-label">Outcome</p>
      <p class="gx-adopted__t">Formally adopted by GEMIS as its design system.</p>
    </div>
  </div>
  <div class="gx-board">
    <div class="gx-brand">
      <div class="gx-brand__logo gx-brand__logo--light">${LOGO}<span class="gx-label">Primary lock-up</span></div>
      <div class="gx-brand__logo gx-brand__logo--navy">${LOGO}<span class="gx-label">Reversed</span></div>
      <div class="gx-brand__logo gx-brand__logo--light gx-brand__logo--stacked">${STACKED}<span class="gx-label">Stacked</span></div>
      <div class="gx-brand__logo gx-brand__logo--navy gx-brand__logo--mark">${MARK}<span class="gx-label">Mark</span></div>
    </div>
    <div class="gx-ds">
      <div class="gx-ds__col">
        <p class="gx-label">Colour tokens</p>
        <ul class="gx-swatches" role="list">${COLOURS.map(([n, h]) => `<li><i style="--c:${h}"></i><b>${n}</b><code>${h}</code></li>`).join('')}</ul>
        <p class="gx-label gx-ds__gap">Type · Montserrat</p>
        <div class="gx-type">
          <p class="gx-type__d">Systems built to last</p>
          <p class="gx-type__h">Nine disciplines. One team.</p>
          <p class="gx-type__b">Body text at 16px, with a held line length.</p>
          <p class="gx-type__l">Book a discovery session</p>
        </div>
      </div>
      <div class="gx-ds__col gx-ds__col--navy">
        <p class="gx-label">Components</p>
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
    <p class="gx-caption"><span>Logo files, and specimens rendered from the tokens and component rules in the reference stylesheet</span>${src('repo')}</p>
    <div class="gx-pair gx-pair--even">
      ${shot(ctx, 'signature', 'GEMIS email signature with the mark and a discovery-session link', { cap: 'Email signature', from: 'repo', sizes: '(min-width: 1100px) 620px, 92vw' })}
      ${shot(ctx, 'share-card', 'GEMIS social share card: Systems built to last. Partners built to stay.', { cap: 'Social share card', from: 'repo', sizes: '(min-width: 1100px) 620px, 92vw' })}
    </div>
  </div>
  ${todo(ctx, 'GEMIS case study: business cards, social banners or Figma exports of the system', '— optional; the chapter renders the system from the reference stylesheet.')}`, 'soft');

// ================================================= 05 · WEBSITE EXPERIENCE

const SCREENS = [
  ['live-home', 'Home', 'Proposition, proof and two actions in the first view. Nothing moves until the visitor does.'],
  ['live-solutions', 'Solutions', 'Nine disciplines in plain names, all connected to one accountable team.'],
  ['live-work', 'Case Studies', 'Company figures first, then the systems in production, each with its story.'],
  ['live-story', 'Our Story', 'Since 2014, told through relationships, with the discovery action beside it.'],
];

const website = (ctx) => sec('website', `
  ${chapter('website', 5, 'The website experience', 'Every page answers one question.', 'The live site, as a prospective client meets it on a desk or a phone.')}
  <div class="gx-cols gx-cols--wide">
    <div class="gx-prose">
      <p>Each page is composed around the question a client brings to it: what do you do, can you build what I need, have you done it before, will you still be here, and how do I start. Pages open with the answer and the proof beside it, then the detail, then the next step.</p>
      <p>Interface decisions stay consistent. The current page is always marked, including on the Solutions and Products drop-downs. Anything that advances on its own can be paused. On a phone, navigation folds into a full-height menu and fields stack without losing the 44-pixel targets.</p>
      <p>The enquiry is the end of every journey, so it got the most care: one required decision, checks as each field is left, and after a failed send an error summary that lists every problem and links to its field.</p>
    </div>
    ${shot(ctx, 'live-form-errors', 'The live enquiry form after a failed send, with an error summary listing five fields', { cap: 'The enquiry form’s error summary', sizes: '(min-width: 1100px) 520px, 92vw', cls: 'gx-shot--form' })}
  </div>
  <div class="gx-gallery">
    ${SCREENS.map(([key, name, note]) => `
    <div class="gx-gallery__item">
      ${shot(ctx, key, `Live GEMIS website: ${name}`, { cap: name, sizes: '(min-width: 1100px) 620px, 92vw' })}
      <p>${note}</p>
    </div>`).join('')}
  </div>
  <div class="gx-phones__row">${[['live-m-home', 'Home'], ['live-m-menu', 'Menu'], ['live-m-solutions', 'Solutions'], ['live-m-contact', 'Enquiry']].map(([k, l]) => shot(ctx, k, `Live GEMIS website on a phone: ${l}`, { cap: l, sizes: '220px', cls: 'gx-shot--phone' })).join('')}</div>`);

// ============================================ 06 · DESIGN TO DEVELOPMENT

const TREE = [
  ['index.html', 'Home'], ['solutions/', 'Overview and nine discipline pages'], ['products/', 'Products'], ['work/', 'Case studies'],
  ['our-story/', 'Company'], ['contact.html', 'Enquiry form and its states'],
  ['assets/css/site.css', 'Tokens and components'], ['assets/js/site.js', 'Menus, pause controls, form validation'],
  ['docs/', 'Decisions and UX review'], ['qa/', 'QA report and captures'],
];
// Verbatim excerpts from gemis-site assets/css/site.css (lines 5790 and 5799–5801).
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

const delivery = (ctx, qa) => sec('delivery', `
  ${chapter('delivery', 6, 'From design to development', 'I led design. The developers built production.', 'The handoff was designed as carefully as the screens.')}
  <div class="gx-cols">
    <div class="gx-prose">
      <p>I designed the screens, the design-system assets and components in Figma, organised for handoff. The development team was less familiar with navigating Figma, so I also built a working HTML/CSS reference of the design and shared it as a GitHub repository: every page, its responsive behaviour, the menu, the form and its error states, with the system as tokens in one stylesheet.</p>
      <p>The reference did not replace the team’s codebase. The full-stack developer and the development team built and host the production site; the live pages share the reference’s structure and file names.</p>
      <p>Before handoff I ran a UX review on the reference and fixed what it found. After handoff I reviewed the implementation against the approved design and took part in testing: consistency, responsive layouts, navigation and links, calls to action, interactive elements and content.</p>
    </div>
    <figure class="gx-code">
      <pre tabindex="0" aria-label="Excerpt from the reference stylesheet"><code>${CSS}</code></pre>
      <div class="gx-tree">
        <p class="gx-tree__root">gemis-site/ <span>selected files</span></p>
        <ul role="list">${TREE.map(([f, d]) => `<li><code>${f}</code><span>${d}</span></li>`).join('')}</ul>
      </div>
      <figcaption><span>Actual CSS and file tree from the reference repository</span>${src('ref')}</figcaption>
    </figure>
  </div>
  <div class="gx-review">
    <p class="gx-label">UX review on the reference: what changed</p>
    <ul class="gx-fixes" role="list">${REVIEW.map(([f, c]) => `<li><span class="gx-fixes__f">${f}</span><span class="gx-fixes__arrow" aria-hidden="true">→</span><span class="gx-fixes__c">${c}</span></li>`).join('')}</ul>
  </div>
  <div class="gx-qa2">
    <div class="gx-qa2__col">
      <p class="gx-label">Reference build · documented in the repository, Sept–Nov 2026</p>
      <ul role="list">
        <li><b>axe-core, WCAG A/AA</b><span>No violations on the corporate pages at 1440 and 390px, after the second round</span></li>
        <li><b>Link audit</b><span>2,161 internal links and anchors checked, none broken</span></li>
        <li><b>Lighthouse, mobile</b><span>Performance 96–99 on the corporate pages</span></li>
      </ul>
    </div>
    ${qa ? `<div class="gx-qa2__col gx-qa2__col--live">
      <p class="gx-label">Live site · gemis.co.za, run ${qa.date}</p>
      <ul role="list">${qa.rows.map(([a, b]) => `<li><b>${a}</b><span>${b}</span></li>`).join('')}</ul>
    </div>` : ''}
  </div>
  ${todo(ctx, 'GEMIS case study: one or two issues found in the implementation review', '— with how they were resolved.')}`, 'soft');

// ============================================= 07 · OUTCOMES & REFLECTION

const OUTCOMES = [
  ['A formally adopted design system', 'Tokens, components and patterns adopted by GEMIS.'],
  ['A complete brand identity', 'Logo, lock-ups, colour, type, email signatures and a share card.'],
  ['A live corporate website', 'gemis.co.za, built and hosted by the development team.'],
  ['An inspectable handoff', 'Organised Figma assets and a working HTML/CSS reference on GitHub.'],
];

const outcomes = (ctx, next) => sec('outcomes', `
  ${chapter('outcomes', 7, 'Outcomes & reflection', 'What was delivered, and what I would change.', 'Confirmed outcomes only.')}
  <ol class="gx-outcomes" role="list">${OUTCOMES.map(([t, d], i) => `<li${i === 0 ? ' class="gx-outcomes__lead"' : ''}><span class="gx-outcomes__n">${pad(i + 1)}</span><b>${t}</b><span>${d}</span></li>`).join('')}</ol>
  ${TESTIMONIAL ? `<blockquote class="gx-quote"><p>${esc(TESTIMONIAL.text)}</p><footer>${esc(TESTIMONIAL.who)}</footer></blockquote>` : ''}
  <div class="gx-reflect">
    <div class="gx-prose">
      <p>The most useful thing I did was ask what the site was for before deciding how it should look. That question turned a website request into brand work, and gave me grounds to recommend a calmer direction than the one first requested.</p>
      <p>Two things I would do differently. I would engage prospective users earlier: the audience profiles came from the business and the market, and a few short comprehension sessions before the structure was fixed would have tested them directly. And I would agree a post-launch measurement plan from the start, covering enquiries, service discovery and content engagement, so the site’s effect could be read rather than assumed.</p>
      ${HINDSIGHT ? `<p>${esc(HINDSIGHT)}</p>` : ''}
      <p>A retrospective usability study on the live site is planned.</p>
    </div>
    ${STUDY_RESULTS.length ? `<ul class="gx-findings" role="list">${STUDY_RESULTS.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
  </div>
  <aside class="gx-limit" aria-label="Evidence and limits">
    <p class="gx-label">Evidence and limits</p>
    <p>Screens are the live site, captured November 2026, or the HTML/CSS reference and its first build. Diagrams are reconstructed from the live site and the project brief. Audience profiles were working assumptions. No traffic, conversion, revenue or user-testing results are claimed.</p>
  </aside>
  <div class="gx-end">
    <a class="gx-btn gx-btn--accent" href="${LIVE}" rel="noopener" target="_blank"><span>Visit gemis.co.za</span>${icon.external}<span class="sr-only"> (opens in a new tab)</span></a>
    <a class="gx-btn" href="${url(ctx, `work/${next.slug}/`)}"><span>Next: ${esc(next.name)}</span>${arrow}</a>
    <a class="gx-btn" href="mailto:${site.email}?subject=${encodeURIComponent('GEMIS case study')}"><span>Ask me about this project</span>${arrow}</a>
  </div>
  ${todo(ctx, 'GEMIS case study: the one decision you would make differently', '— set HINDSIGHT in case-gemis.mjs; nothing renders until then.')}
  ${todo(ctx, 'GEMIS case study: a statement from the business manager', '— set TESTIMONIAL in case-gemis.mjs; nothing renders until then.')}
  ${todo(ctx, 'GEMIS case study: retrospective usability study results', '— add to STUDY_RESULTS in case-gemis.mjs once the study has run.')}`);

// Dated results of axe and Lighthouse run against https://gemis.co.za/ — kept
// separate from the reference-build results. null hides the column.
let LIVE_QA = null;
try { LIVE_QA = JSON.parse(readFileSync(new URL('./gemis-live-qa.json', import.meta.url), 'utf8')); } catch { /* not run */ }

export default {
  slug: 'gemis',
  render(ctx, { next }) {
    return `
  <article class="gx">
    ${hero(ctx)}
    ${toc()}
    ${part('part-1', 1, 'The story behind the experience', 'The opportunity, the strategy, the defining decision and the identity it rests on.')}
    ${opportunity(ctx)}
    ${discovery(ctx)}
    ${experience(ctx)}
    ${system(ctx)}
    ${part('part-2', 2, 'The experience in practice', 'The live website, how it reached development, and what it delivered.')}
    ${website(ctx)}
    ${delivery(ctx, LIVE_QA)}
    ${outcomes(ctx, next)}
  </article>`;
  },
};
