// GEMIS corporate website and brand identity — product design case study.
//
// Evidence rules for this page (see GEMIS-CASE-STUDY-EVIDENCE.md):
// - Screens are captures of the project's reference build in the
//   Sphamandla-designer/gemis-site repository (corporate site at its root).
//   The live site at gemis.co.za could not be reached from the build
//   environment, so nothing here is presented as a capture of it.
// - The "original direction" images are captures of that repository's own
//   July 2026 commit (21d016d), not mock-ups.
// - Tokens and component values are read from the reference build's
//   stylesheet. No Figma file was available, so none is shown.
// - Facts supplied by Sphamandla (role, collaborators, adoption, live status,
//   discovery topics, audience needs, the business's first preference) are
//   stated as his account. Research findings, wireframes, business cards and
//   brand guidelines are not in evidence; they are logged with todo(), which
//   writes to CONTENT-NEEDED.md and prints nothing on the page.
// - No staff names, client names or personal contact details.

import { readFileSync } from 'node:fs';
import { esc, url, img, site, todo, icon } from '../shared.mjs';
import { full } from './managem-parts.mjs';

const svgFile = (name) => readFileSync(new URL(`../../assets/images/gemis/${name}`, import.meta.url), 'utf8').replace(/role="img"[^>]*?aria-label="[^"]*"/, 'aria-hidden="true" focusable="false"');
const LOGO = svgFile('gemis-logo.svg');
const STACKED = svgFile('gemis-logo-stacked.svg');
const MARK = svgFile('gemis-mark.svg');
const LIVE = 'https://gemis.co.za/';
const REF = 'Reference build';
const EARLY = 'Repository · July 2026';
const arrow = icon.arrow;

const pad = (n) => String(n).padStart(2, '0');

/** A screen, opening in the site's image viewer. */
const shot = (ctx, key, alt, { cap = '', src = REF, sizes = '(min-width: 1100px) 900px, 92vw', cls = '', eager = false } = {}) => `
  <figure class="gx-shot${cls ? ` ${cls}` : ''}" data-reveal>
    <a class="gx-shot__frame zoom" href="${full(ctx, `gemis/${key}`)}" data-zoom data-caption="${esc(cap || alt)}" aria-label="Enlarge: ${esc(alt)}">${img(ctx, `gemis/${key}`, alt, { sizes, eager })}</a>
    ${cap || src ? `<figcaption>${cap ? `<span>${cap}</span>` : ''}${src ? `<span class="gx-src">${src}</span>` : ''}</figcaption>` : ''}
  </figure>`;

/** Evidence badge: what kind of claim a block makes. */
const ev = (kind, label) => `<span class="gx-ev gx-ev--${kind}">${label}</span>`;

/** Numbered section header with the question it answers. */
const head = (id, n, label, title, intro = '', q = '') => `
  <header class="gx-head">
    <p class="gx-kicker"><span class="gx-kicker__n">${pad(n)}</span><span class="gx-kicker__dot" aria-hidden="true">·</span>${label}${q ? `<span class="gx-kicker__q">${q}</span>` : ''}</p>
    <h2 class="gx-h2" id="${id}-h">${title}</h2>
    ${intro ? `<p class="gx-intro">${intro}</p>` : ''}
  </header>`;

const sec = (id, body, mod = '') => `
  <section class="gx-sec${mod ? ` gx-sec--${mod}` : ''}" id="${id}" aria-labelledby="${id}-h">
    <div class="wrap">${body}</div>
  </section>`;

const steps = (items, cls = '') => `<ol class="gx-path${cls ? ` ${cls}` : ''}" role="list">${items.map((s, i) => `<li><span class="gx-path__n">${pad(i + 1)}</span><span class="gx-path__t">${s}</span></li>`).join('')}</ol>`;

// --------------------------------------------------------------- 01 intro

const META = [
  ['My role', 'UI/UX Designer and design lead, from discovery to implementation support'],
  ['Worked with', 'The business manager, a full-stack developer and the GEMIS development team'],
  ['Scope', 'Discovery, UX strategy, information architecture, brand identity, design system, website UX/UI, handoff and QA'],
  ['Status', `Live · <a href="${LIVE}" rel="noopener" target="_blank">gemis.co.za<span class="sr-only"> (opens in a new tab)</span></a>`],
  ['Timeline', 'July – November 2026, from the design reference repository’s history'],
];

const intro = (ctx) => `
  <header class="gx-hero" aria-labelledby="gx-title">
    <span class="gx-hatch" aria-hidden="true"></span>
    <div class="wrap">
      <a class="gx-back" href="${url(ctx, 'index.html#work')}"><span aria-hidden="true">←</span> Selected work</a>
      <div class="gx-hero__panel">
        <p class="gx-eyebrow">Case study · GEMIS corporate website and brand identity</p>
        <h1 class="gx-title" id="gx-title">Giving a decade of technical experience a digital identity.</h1>
      </div>
      <p class="gx-sub">How I led the UX, brand identity and website design for GEMIS — turning a referral-led software business into a clearer, more credible digital experience for prospective clients.</p>
      <dl class="gx-meta">${META.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
    </div>
    <div class="gx-stage wrap">
      <div class="gx-stage__desk">
        <div class="gx-browser"><span class="gx-browser__bar" aria-hidden="true"><i></i><i></i><i></i><b>GEMIS · Home</b></span>${img(ctx, 'gemis/gm-home', 'The GEMIS website home page on desktop', { sizes: '(min-width: 1100px) 1000px, 92vw', eager: true })}</div>
      </div>
      <div class="gx-stage__phone">${img(ctx, 'gemis/gm-home-mobile', 'The GEMIS website home page on a phone', { sizes: '240px', eager: true })}</div>
      <p class="gx-stage__cap"><span>Home page, desktop and mobile</span><span class="gx-src">Captured from the project’s reference build</span></p>
    </div>
    <div class="wrap">
      <ul class="gx-disciplines" role="list" aria-label="Disciplines in this project">${['Business analysis', 'UX strategy', 'Information architecture', 'Brand identity', 'Design system', 'Website UX/UI', 'Developer handoff', 'QA'].map((d) => `<li>${d}</li>`).join('')}</ul>
    </div>
  </header>`;

// ----------------------------------------------------- 02 business context

const context = () => sec('context', `
  ${head('context', 2, 'Business context', 'A strong network, and no front door.', '', 'What was the problem?')}
  <div class="gx-cols">
    <div class="gx-prose">
      <p>GEMIS is a South African software and business systems company, operating since 2014. Most of its new work came through referrals and long-standing client relationships, and many of those relationships had grown into long-term partnerships.</p>
      <p>That network was an asset, but it had a limit. Someone outside it had nowhere to go to learn what GEMIS does, see what it has built and decide whether to get in touch. There was no website experience that brought the company’s capabilities, history and work together for a first-time visitor.</p>
      <p>The opportunity was to build that front door: a place where a prospective client could discover GEMIS on their own, understand what it offers and judge whether it could support their organisation.</p>
    </div>
    <div class="gx-journeys" data-reveal aria-label="How a new client found GEMIS, and the experience the project set out to support">
      <div class="gx-journey">
        <p class="gx-label">Before · referral-led</p>
        ${steps(['Referral', 'Introduction', 'Conversation'], 'gx-path--muted')}
      </div>
      <div class="gx-journey gx-journey--new">
        <p class="gx-label">Intended digital experience</p>
        ${steps(['Discover', 'Understand', 'Evaluate', 'Explore work', 'Enquire'])}
      </div>
      <p class="gx-note">The second path is the experience the project was designed to support. It is not measured evidence of a change in how clients behave.</p>
    </div>
  </div>
  <div class="gx-goals">
    <p class="gx-label">What the business needed the digital presence to do</p>
    <ol role="list">${['Establish a stronger, recognisable brand identity', 'Communicate what GEMIS does and the problems it solves', 'Show the experience and work built up over the years', 'Build credibility with prospective clients', 'Support new-client acquisition through a clear experience', 'Give visitors a straightforward path to an enquiry'].map((g, i) => `<li><span>${pad(i + 1)}</span>${g}</li>`).join('')}</ol>
  </div>`);

// ------------------------------------------------------- 03 the challenge

const TENSIONS = [
  ['Brand distinction', 'Corporate credibility', 'A distinctive gem mark and hatch-line pictograms, set on a conservative navy-and-white system.'],
  ['Visual richness', 'Clarity', 'Imagery works as a ground; the words and the next step always lead.'],
  ['Animation', 'Performance', 'Motion is kept to transitions that explain something, and anything that advances by itself can be paused.'],
  ['Technical detail', 'Accessible language', 'Nine disciplines in plain names, each with a one-line outcome for the business.'],
  ['Business ambition', 'Development constraints', 'A static site the team can maintain, with the enquiry handed to email rather than a back end.'],
  ['A memorable experience', 'Practical usability', 'One primary action, the same everywhere: Book a discovery session.'],
];

const challenge = () => sec('challenge', `
  ${head('challenge', 3, 'The design challenge', 'One question, six tensions.', '', 'Why did it matter?')}
  <blockquote class="gx-question"><p>How might we create a credible digital experience that communicates GEMIS’s technical capability, makes its work easier to understand and gives prospective clients a clear path from discovery to enquiry?</p></blockquote>
  <div class="gx-tensions" data-reveal>
    ${TENSIONS.map(([a, b, how], i) => `
    <div class="gx-tension">
      <p class="gx-tension__pair"><span>${a}</span><i aria-hidden="true"></i><span>${b}</span></p>
      <p class="gx-tension__how"><span class="gx-label">How the design resolved it</span>${how}</p>
    </div>`).join('')}
  </div>`, 'band');

// ------------------------------------------------------ 04 discovery

const TOPICS = ['Business objectives', 'Stakeholder expectations', 'How new clients arrived', 'Current positioning', 'Pain points and priorities', 'Target clients', 'Available budget', 'Project scope', 'Existing brand assets', 'Technical constraints', 'Development expectations'];
const MATRIX = [
  ['Communicate technical capabilities', 'A clear service architecture and content hierarchy'],
  ['Establish credibility', 'Company history, relevant work and a professional visual language'],
  ['Support prospective enquiries', 'A visible, understandable enquiry path from every page'],
  ['Create brand consistency', 'Identity guidelines and reusable components'],
  ['Support development', 'Clear documentation and an organised handoff'],
];

const discovery = (ctx) => sec('discovery', `
  ${head('discovery', 4, 'Discovery and stakeholder alignment', 'Starting with the business, not the homepage.', '', 'What did you investigate?')}
  <div class="gx-cols">
    <div class="gx-prose">
      <p>I began with the business manager and the full-stack developer: what the business wanted the site to achieve, how new clients currently found GEMIS, where the company stood today, and what budget, scope and technical limits the work had to respect.</p>
      <p>One finding shaped everything after it. GEMIS did not have a fully developed brand identity. Navy was the existing colour preference, but there was no complete visual system behind it. The website could not be designed well until there was an identity for it to express, so brand work became part of the project.</p>
    </div>
    <div>
      <p class="gx-label">What I gathered</p>
      <ul class="gx-chips" role="list">${TOPICS.map((t) => `<li>${t}</li>`).join('')}</ul>
    </div>
  </div>
  <div class="gx-table" data-reveal role="region" aria-label="Requirements matrix" tabindex="0">
    <table>
      <caption><span>Requirements matrix</span>${ev('interp', 'My design interpretation of the brief')}</caption>
      <thead><tr><th scope="col">Business requirement</th><th scope="col">Design implication</th></tr></thead>
      <tbody>${MATRIX.map(([r, d]) => `<tr><th scope="row">${r}</th><td>${d}</td></tr>`).join('')}</tbody>
    </table>
  </div>
  ${todo(ctx, 'GEMIS case study: confirm the project start and launch dates', '— the page shows July–November 2026 from the reference repository history.')}`);

// ------------------------------------------------------- 05 research

const QUESTIONS = [
  ['Capabilities', 'How do comparable companies present what they can do?'],
  ['Services', 'How are services grouped and named?'],
  ['Value', 'How is the value proposition put into words?'],
  ['Credibility', 'What do they show to be believed: history, clients, partners, proof?'],
  ['Work', 'How is previous work shown, and how much of it?'],
  ['Contact', 'How, and how early, are visitors invited to get in touch?'],
];
const AUDIENCE = [
  ['Business owners and decision-makers', 'Need to understand what GEMIS can deliver for an organisation like theirs.', 'Solutions, in plain names, from the home page'],
  ['Prospective clients', 'Need credible evidence of relevant experience before they reach out.', 'Case studies, company history, proof near the top'],
  ['Visitors without a technical background', 'Need technical services explained in accessible language.', 'One-line outcomes per discipline; jargon kept out of headlines'],
  ['People evaluating a partner', 'Need a straightforward route to contact the company.', 'One action, Book a discovery session, on every page'],
];

const research = (ctx) => sec('research', `
  ${head('research', 5, 'Market and audience research', 'What comparable companies do, and who the site is for.', '', 'What did you discover?')}
  <div class="gx-cols gx-cols--wide">
    <div class="gx-prose">
      <p>I reviewed the websites of comparable software and technology businesses to understand the conventions prospective clients would already expect, and where GEMIS could be clearer than its peers. I looked at each site through the same six questions.</p>
      <p class="gx-aside">${ev('repo', 'Repository evidence')} Reference captures of other companies’ websites, collected in September 2026, are kept in the project repository. They are not reproduced here, because they show other companies’ work.</p>
    </div>
    <ol class="gx-qgrid" role="list" aria-label="Competitor review framework">${QUESTIONS.map(([k, q], i) => `<li><span class="gx-qgrid__n">${pad(i + 1)}</span><b>${k}</b><span>${q}</span></li>`).join('')}</ol>
  </div>
  ${todo(ctx, 'GEMIS case study: the competitor review findings', '— the six-question framework is shown; add what the review found, without naming companies unless you are comfortable doing so.')}
  <div class="gx-aud">
    <div class="gx-aud__head"><p class="gx-label">Working audience profiles</p>${ev('assume', 'Stakeholder-informed assumptions · not validated with users')}</div>
    <div class="gx-aud__grid">${AUDIENCE.map(([who, need, answer], i) => `
      <article class="gx-persona"><p class="gx-persona__n">${pad(i + 1)}</p><h3>${who}</h3><p>${need}</p><p class="gx-persona__a"><span class="gx-label">Answered by</span>${answer}</p></article>`).join('')}
    </div>
    <p class="gx-note">These profiles came from discovery with the business and from desk research. They were not tested through user interviews or usability sessions, and the page does not present them as if they were.</p>
  </div>`, 'soft');

// --------------------------------------------------------------- 06 IA

const SITEMAP = [
  ['Home', 'Introduce the business', []],
  ['Case Studies', 'Show the work', ['Six systems in production, each with its story']],
  ['Solutions', 'Explain the capabilities', ['Overview', 'Nine disciplines, one page each']],
  ['Products', 'Show what GEMIS owns', ['ManaGEM', 'Design Studio', 'Technical Academy']],
  ['Insights', 'Show the thinking', ['Three articles']],
  ['Our Story', 'Build credibility', ['History and relationships']],
  ['Contact', 'Start the conversation', ['Book a discovery session']],
];
const HOME = [
  ['Hero', 'What GEMIS builds, for whom, and the proof', 'Discover'],
  ['Proof strip', 'Partner line and client marks', 'Discover'],
  ['Solutions', 'Nine disciplines, one accountable team', 'Understand'],
  ['How we work', 'Understand · Design · Build · Evolve', 'Understand'],
  ['Selected work', 'Systems in production, each with its story', 'Explore work'],
  ['In their words', 'Clients on the relationship', 'Evaluate'],
  ['Thinking', 'The same four decisions across systems', 'Evaluate'],
  ['Insights', 'Notes from building systems', 'Evaluate'],
  ['Discovery session', 'The enquiry, at the end of the story', 'Enquire'],
];

const ia = (ctx) => sec('ia', `
  ${head('ia', 6, 'UX strategy and information architecture', 'A structure a first-time visitor can predict.', '', 'What did you decide?')}
  <div class="gx-prose gx-prose--wide">
    <p>I grouped the content around the questions a prospective client asks, in the order they ask them: what do you do, how do you work, what have you built, who are you, and how do I start. Each question became a top-level destination. Services are presented as nine disciplines under one accountable team, so a visitor sees the range without having to understand the company’s internal structure.</p>
  </div>
  <figure class="gx-sitemap" data-reveal aria-labelledby="sitemap-cap">
    <div class="gx-sitemap__root"><span class="gx-mark">${MARK}</span>GEMIS</div>
    <ul class="gx-sitemap__row" role="list">${SITEMAP.map(([n, job, kids]) => `<li><b>${n}</b><span class="gx-sitemap__job">${job}</span>${kids.length ? `<ul role="list">${kids.map((k) => `<li>${k}</li>`).join('')}</ul>` : ''}</li>`).join('')}</ul>
    <p class="gx-sitemap__cta"><span class="gx-label">On every page</span>Book a discovery session — in the bar on desktop, last in the phone menu</p>
    <figcaption id="sitemap-cap"><span>Sitemap</span><span class="gx-src">Read from the reference build’s navigation</span></figcaption>
  </figure>
  <div class="gx-cols">
    <div>
      <h3 class="gx-h3">Navigation model</h3>
      <ul class="gx-list" role="list">
        <li>Seven primary destinations, with Solutions and Products as drop-downs so their detail stays one step away.</li>
        <li>One action at the end of the bar on every page, so the route to an enquiry never depends on where someone lands.</li>
        <li>The current page is marked in the navigation, and pages three levels deep carry a breadcrumb.</li>
        <li>On phones the same structure folds into a full-height menu, with the action as its last item.</li>
      </ul>
    </div>
    <div>
      <h3 class="gx-h3">Home page hierarchy</h3>
      <ol class="gx-hier" role="list">${HOME.map(([b, d, stage]) => `<li><b>${b}</b><span>${d}</span><i>${stage}</i></li>`).join('')}</ol>
    </div>
  </div>
  <div class="gx-pair">
    ${shot(ctx, 'sec-solutions', 'Home page Solutions section: nine disciplines with an interactive index', { cap: 'Service architecture on the home page: nine disciplines, one accountable team', sizes: '(min-width: 1100px) 640px, 92vw' })}
    ${shot(ctx, 'mob-menu', 'The phone menu with seven destinations and the discovery session action last', { cap: 'The same structure on a phone', sizes: '260px', cls: 'gx-shot--phone' })}
  </div>
  ${todo(ctx, 'GEMIS case study: wireframes', '— none were available; add selected wireframes from Figma if you have them.')}`);

// ------------------------------------------------------ 07 journeys

const JOURNEY = [
  ['Discover', 'Home hero', 'What GEMIS builds, for whom, on what platform, and the proof beside it.'],
  ['Understand', 'Solutions', 'Nine disciplines in plain names; each discipline has its own page.'],
  ['Evaluate', 'How we work · Our Story', 'The four stages every engagement follows, and the company’s history.'],
  ['Explore work', 'Case Studies', 'Systems in production. Each solution page links to the work where it was used.'],
  ['Enquire', 'Book a discovery session', 'A short form with one required decision: what are you looking to do?'],
];

const journeys = (ctx) => sec('journeys', `
  ${head('journeys', 7, 'User journeys and interaction design', 'From a first visit to a first conversation, including what goes wrong.', '', 'Why did you make that decision?')}
  <ol class="gx-flow" data-reveal role="list" aria-label="The main intended journey">
    ${JOURNEY.map(([stage, where, what], i) => `<li><span class="gx-flow__n">${pad(i + 1)}</span><b>${stage}</b><span class="gx-flow__where">${where}</span><p>${what}</p></li>`).join('')}
  </ol>
  <div class="gx-routes">
    <div><p class="gx-label">Shortcut</p><p>Someone who is already convinced does not need the whole story. The action in the bar takes them straight to the enquiry from any page.</p></div>
    <div><p class="gx-label">Alternative route</p><p>A visitor who arrives on a service page, from search for example, can go straight to the case studies where that discipline was used.</p></div>
    <div><p class="gx-label">When something goes wrong</p><p>The form checks each field when the visitor leaves it. If a send fails, a summary at the top lists every problem, links each to its field and takes focus, so keyboard and screen-reader users land on it too.</p></div>
  </div>
  <div class="gx-pair gx-pair--form">
    ${shot(ctx, 'form', 'The enquiry form: name, work email, company, what are you looking to do, timeline, notes and consent', { cap: 'The enquiry: short, with one required decision', sizes: '(min-width: 1100px) 460px, 92vw' })}
    ${shot(ctx, 'form-errors', 'The enquiry form after a failed send, with an error summary listing five fields and a message under each', { cap: 'After a failed send: a summary that links to each field', sizes: '(min-width: 1100px) 460px, 92vw' })}
  </div>
  <p class="gx-note">These states are captured from the reference build. The build is a static site, so sending opens a pre-filled email and the page says so plainly. I have not verified here how the live implementation handles each state.</p>`, 'soft');

// --------------------------------------------------------- 08 identity

const COLOURS = [
  ['Navy', '#0A1230', 'Ground for dark bands, and ink on light'],
  ['Navy 2', '#0D1636', 'Raised panels on navy'],
  ['Bar', '#071B31', 'The navigation bar'],
  ['White', '#FFFFFF', 'Light grounds, and the action on navy'],
  ['Slate', '#4A5170', 'Secondary text on light'],
  ['Slate 2', '#5D6480', 'Tertiary text on light'],
];
const TYPE = [
  ['Display', '300 · uppercase · tracked', 'Custom business software'],
  ['Section title', '300 · uppercase', 'Nine disciplines'],
  ['Card title', '600 · 19px', 'Understand. Design. Build.'],
  ['Body', '400 · 16–17px', 'GEMIS designs, builds and supports the business systems South African companies run on.'],
  ['Label', '500 · 11–12px · uppercase · 0.16em', 'Book a discovery session'],
];

const identity = (ctx) => sec('identity', `
  ${head('identity', 8, 'Building the GEMIS brand identity', 'From a colour preference to a system.', 'The company needed a consistent foundation to build on, not just a palette for a website. I developed the identity, then turned it into a design system the website, and the work after it, could be built from.', 'What did you personally contribute?')}
  <ol class="gx-evo" role="list" aria-label="How the identity developed">
    ${[['Starting point', 'A preference for navy, and no complete identity'], ['Identity', 'Mark, lock-ups, typeface and palette'], ['System', 'Tokens and reusable components'], ['Applications', 'Website, email signatures and social sharing']].map(([t, d], i) => `<li><span class="gx-evo__n">${pad(i + 1)}</span><b>${t}</b><span>${d}</span></li>`).join('')}
  </ol>
  <div class="gx-brand">
    <div class="gx-brand__logo gx-brand__logo--light">${LOGO}<span class="gx-label">Primary lock-up</span></div>
    <div class="gx-brand__logo gx-brand__logo--dark">${LOGO}<span class="gx-label">Reversed, on navy</span></div>
    <div class="gx-brand__logo gx-brand__logo--light gx-brand__logo--stacked">${STACKED}<span class="gx-label">Stacked</span></div>
    <div class="gx-brand__logo gx-brand__logo--dark gx-brand__logo--mark">${MARK}<span class="gx-label">The mark</span></div>
  </div>
  <p class="gx-caption"><span>A cut gem, drawn as flat facets, beside a tracked GEMIS wordmark and GEM INFORMATION SYSTEMS beneath it. Flat shapes keep it legible at favicon size and in one colour.</span><span class="gx-src">Logo files from the project repository</span></p>

  <div class="gx-adopted">
    <p class="gx-adopted__k">Confirmed outcome</p>
    <p class="gx-adopted__t">GEMIS formally adopted the design system.</p>
    <p class="gx-adopted__d">Adoption makes the system the shared starting point for future work. New pages, documents and products start from agreed patterns instead of one-off decisions that drift apart over time.</p>
  </div>

  <div class="gx-ds" data-reveal aria-label="The design system, rendered from its own values">
    <div class="gx-ds__block gx-ds__colour">
      <p class="gx-label">Colour</p>
      <ul role="list">${COLOURS.map(([n, hex, use]) => `<li><i style="--c:${hex}"></i><b>${n}</b><code>${hex}</code><span>${use}</span></li>`).join('')}</ul>
      <p class="gx-ds__note">On navy, secondary text is white at 62% and dividers are white at 16%.</p>
    </div>
    <div class="gx-ds__block gx-ds__type">
      <p class="gx-label">Typography · Montserrat</p>
      <ul role="list">${TYPE.map(([n, spec, sample], i) => `<li class="gx-t${i}"><span class="gx-ds__k">${n}<small>${spec}</small></span><span class="gx-ds__s">${sample}</span></li>`).join('')}</ul>
    </div>
    <div class="gx-ds__block gx-ds__comp">
      <p class="gx-label">Components</p>
      <div class="gx-ds__row gx-ds__row--navy">
        <span class="gx-b gx-b--light">Book a discovery session</span>
        <span class="gx-b gx-b--ghost">Explore the work</span>
        <span class="gx-circle" aria-hidden="true">${arrow}</span>
      </div>
      <div class="gx-ds__row gx-ds__row--white">
        <span class="gx-b gx-b--ink">Book a discovery session</span>
        <span class="gx-open"><span class="gx-badge">04</span><span>How we work</span></span>
      </div>
      <div class="gx-ds__row gx-ds__row--white gx-ds__row--field">
        <span class="gx-field"><span class="gx-field__l">Work email *</span><span class="gx-field__i">jane@company.co.za</span></span>
        <span class="gx-field gx-field--err"><span class="gx-field__l">Company *</span><span class="gx-field__i">&nbsp;</span><span class="gx-field__e">Please enter your company name.</span></span>
      </div>
      <dl class="gx-specs">
        <div><dt>Buttons</dt><dd>48px minimum height, square corners, 12px uppercase labels; light, ghost and ink variants</dd></div>
        <div><dt>Arrow controls</dt><dd>44px circles for carousels and stepping through stages</dd></div>
        <div><dt>Section opener</dt><dd>A numbered badge and a light uppercase title</dd></div>
        <div><dt>Fields</dt><dd>Label above, underline input, message below on error</dd></div>
      </dl>
    </div>
  </div>
  <p class="gx-caption"><span>Rendered from the values in the reference build’s stylesheet: the same colours, typeface, sizes and states.</span><span class="gx-src">${ev('repo', 'Repository evidence')}</span></p>

  <div class="gx-apps">
    ${shot(ctx, 'signature', 'GEMIS email signature for Sphamandla Xaba, UI/UX Designer, with the mark, the SX monogram and a Book a discovery session link', { cap: 'Email signature, one of a set for the team', src: 'Repository', sizes: '(min-width: 1100px) 560px, 92vw' })}
    ${shot(ctx, 'share-card', 'GEMIS social share card: Systems built to last. Partners built to stay.', { cap: 'Social share card, 1200 × 630', src: 'Repository', sizes: '(min-width: 1100px) 560px, 92vw' })}
  </div>
  ${todo(ctx, 'GEMIS case study: Figma evidence of the identity and design system', '— logo explorations, colour and type styles, spacing, component library and states. The page currently renders the system from the built stylesheet.')}
  ${todo(ctx, 'GEMIS case study: business cards, social media banners and the brand guidelines document', '— none were in the repository.')}
  ${todo(ctx, 'GEMIS case study: how stakeholder feedback refined the identity', '— one or two concrete examples, without quoting anyone you have not cleared.')}`, 'band');

// ------------------------------------------------------- 09 key decision

const COMPARE = [
  ['First impression', 'A full-screen preloader counting to 100 before any content', 'The proposition, the audience and the proof in the first view'],
  ['Motion', 'A real-time 3D knot, scroll-scrubbed sequences, smooth-scroll and a custom cursor', 'Transitions that explain a change of state; auto-advancing parts can be paused'],
  ['Hierarchy', 'The 3D object travels across and over the copy', 'Text and the next action stay unobstructed'],
  ['Script on the home page', '≈ 895 KB of JavaScript, including a 3D engine', '≈ 43 KB of JavaScript'],
];

const decision = (ctx) => sec('decision', `
  ${head('decision', 9, 'A key design decision', 'Clarity over complexity.', '', 'How did you deal with constraints?')}
  <div class="gx-cols">
    <div class="gx-prose">
      <p>The business’s first preference was a futuristic site: extensive 3D, animation and scroll effects. The earliest build in the project repository explored exactly that, with a preloader, a real-time 3D object and scroll-driven sequences.</p>
      <p>I evaluated that direction against who the site was for and what it had to do. People assessing a potential technology partner usually want to understand the company quickly. Heavy visual assets add performance risk, and connection quality varies, so an experience that depends on them is less dependable for some visitors. And motion that runs constantly competes with the information it surrounds.</p>
      <p>I recommended a more restrained, performance-conscious direction, where the visual design supports the message rather than performing alongside it. The site still has character, in the gem, the hatch-line pictograms and the navy bands, but nothing stands between a visitor and the content.</p>
    </div>
    <ul class="gx-reasons" role="list" aria-label="What I weighed">
      ${['Corporate visitors often need to understand capabilities quickly', 'Heavy visual assets introduce performance risk', 'Connectivity varies, so heavy experiences are less reliable for some visitors', 'Constant motion competes with the information people came for', 'The site had to feel professional, credible and direct'].map((r) => `<li>${r}</li>`).join('')}
    </ul>
  </div>
  <div class="gx-versus">
    <div class="gx-versus__col">
      <p class="gx-label gx-label--muted">Original direction · 3D-heavy, highly animated</p>
      ${shot(ctx, 'early-preloader', 'Early exploration: a full-screen preloader with a large GEMIS wordmark and a percentage counter', { cap: 'A preloader before any content', src: EARLY, sizes: '(min-width: 1100px) 560px, 92vw' })}
      ${shot(ctx, 'early-motion', 'Early exploration: a glossy 3D knot moving over the company description', { cap: 'A 3D object moving over the copy (placeholder content)', src: EARLY, sizes: '(min-width: 1100px) 560px, 92vw' })}
    </div>
    <div class="gx-versus__col gx-versus__col--new">
      <p class="gx-label">Design direction · clear, purposeful, performance-conscious</p>
      ${shot(ctx, 'gm-home', 'The final home page: proposition, proof and two actions in the first view', { cap: 'The proposition first, with the proof beside it', sizes: '(min-width: 1100px) 560px, 92vw' })}
      ${shot(ctx, 'sec-process', 'How we work: four stages, Understand, Design, Build, Evolve, with one action', { cap: 'Structure carries the page, not effects', sizes: '(min-width: 1100px) 560px, 92vw' })}
    </div>
  </div>
  <div class="gx-table" data-reveal role="region" aria-label="The two directions compared" tabindex="0">
    <table>
      <thead><tr><th scope="col"></th><th scope="col">Original direction</th><th scope="col">Design direction</th></tr></thead>
      <tbody>${COMPARE.map(([k, a, b]) => `<tr><th scope="row">${k}</th><td>${a}</td><td>${b}</td></tr>`).join('')}</tbody>
    </table>
  </div>
  <p class="gx-note">Script sizes are the uncompressed JavaScript each home page requested, measured locally on the two builds in the repository. They compare script weight only; they are not a page-speed measurement of the live site.</p>`);

// ------------------------------------------------------ 10 website design

const SCREENS = [
  ['gm-home', 'Home', 'What does this company do, for whom, and can I trust it?', 'Names the work, the market and the platform in one sentence, with three company figures and the partner line beside it. Two actions, one primary.'],
  ['gm-solutions', 'Solutions', 'Can they build what I need?', 'Nine disciplines on one map, all connected to one accountable team. Each discipline has its own page with deliverables and the work where it was used.'],
  ['gm-managem', 'Product: ManaGEM', 'What do they own, beyond client projects?', 'The company’s own product, explained by what it does for a business, with a short video story and the same discovery action.'],
  ['gm-story', 'Our Story', 'Who are they, and will they still be here?', 'History and long-term relationships, told through the systems the company has built since 2014.'],
  ['gm-insights', 'Insights', 'Do they understand problems like mine?', 'Articles written for operations and finance leads, each linked to the case study behind it.'],
];

const website = (ctx) => sec('website', `
  ${head('website', 10, 'Website design and experience', 'Every page answers one question.', 'I designed each page around the question a prospective client brings to it. The design system keeps them consistent, so a visitor learns the interface once.', 'What was actually delivered?')}
  <div class="gx-screens">
    ${SCREENS.map(([key, name, q, why], i) => `
    <article class="gx-screen${i % 2 ? ' gx-screen--flip' : ''}">
      ${shot(ctx, key, `GEMIS website: ${name} page`, { cap: name, sizes: '(min-width: 1100px) 760px, 92vw' })}
      <div class="gx-screen__text">
        <p class="gx-screen__n">${pad(i + 1)}</p>
        <h3>${name}</h3>
        <p class="gx-screen__q"><span class="gx-label">The visitor asks</span>${q}</p>
        <p>${why}</p>
      </div>
    </article>`).join('')}
  </div>
  <div class="gx-phones">
    <p class="gx-label">Responsive layouts</p>
    <div class="gx-phones__row">
      ${[['gm-home-mobile', 'Home'], ['mob-menu', 'Menu'], ['mob-solutions', 'Solutions'], ['mob-contact', 'Enquiry']].map(([k, l]) => shot(ctx, k, `GEMIS website on a phone: ${l}`, { cap: l, src: '', sizes: '220px', cls: 'gx-shot--phone' })).join('')}
    </div>
    <p class="gx-caption"><span>The same structure and components at phone width: navigation folds into a menu, fields stack, and every target stays at least 44 pixels.</span><span class="gx-src">${REF}</span></p>
  </div>`, 'soft');

// ------------------------------------------------------- 11 handoff

const handoff = () => sec('handoff', `
  ${head('handoff', 11, 'Developer collaboration and handoff', 'Designing what can be built, then making it easy to build.', '', 'How did you work with other people?')}
  <div class="gx-cols">
    <div class="gx-prose">
      <p>I worked with the full-stack developer from the early design stages, so technical constraints shaped the design before it reached handoff rather than after. Choices like a static site, and an enquiry that hands off to email, came from that conversation.</p>
      <p>The development team was less familiar with navigating Figma. So, alongside the organised Figma files, I prepared a GitHub repository as an additional implementation reference: a working build of the design that anyone could open in a browser, or read as HTML and CSS.</p>
      <p>The repository did not replace the team’s own codebase. It gave design and development a shared, inspectable reference: the tokens in one stylesheet, every page as it should look and behave, and written notes on the decisions behind them.</p>
    </div>
    <ol class="gx-handoff" role="list" aria-label="How the design reached development">
      <li><b>Figma</b><span>Screens, design-system assets and reusable components, organised for handoff</span></li>
      <li><b>GitHub reference</b><span>The design as a working static build: tokens, components, every page and its states</span></li>
      <li><b>Documentation</b><span>Notes on structure, decisions, accessibility and QA, kept with the build</span></li>
      <li><b>Development team</b><span>Implementation, with design reviews along the way</span></li>
    </ol>
  </div>`);

// --------------------------------------------------------------- 12 QA

const CHECKS = [
  ['Accessibility', 'axe-core against WCAG A and AA on every corporate page, at 1440 and 390 pixels', 'Zero violations after the second round (one colour token darkened)'],
  ['Links', 'Every internal link and anchor', '236 checked, none broken (September); 2,161 checked, none broken (November)'],
  ['Layout', 'Full-page captures at 1440 and 390, before and after each pass', 'No horizontal overflow from 320 to 1920 pixels'],
  ['Performance', 'Lighthouse, mobile, on the corporate pages', 'Performance 96–99 on the reference build'],
  ['Interaction', 'Form validation, pause controls and the current-page mark, in the browser', 'Verified; also with JavaScript off and reduced motion'],
];
const REVIEW = [
  ['Four names for one action', 'One: Book a discovery session, everywhere'],
  ['The form validated only on submit, with no summary', 'Checks on leaving a field, and an error summary that takes focus'],
  ['The current page was not marked', 'Marked in the navigation, including the Solutions and Products triggers'],
  ['Auto-advancing stages could not be paused', 'A pause control on each'],
  ['Body copy at 14 pixels', '16-pixel body, with line length held to a readable measure'],
];

const qa = (ctx) => sec('qa', `
  ${head('qa', 12, 'Implementation and quality assurance', 'Staying involved until the work was built.', '', 'How did you know the work was ready?')}
  <div class="gx-prose gx-prose--wide">
    <p>After handoff I kept working with the development team to make sure the implementation matched the approved design, and I took part in testing. Before that, I tested the design itself in the reference build, so the problems I could find were fixed before they reached development.</p>
  </div>
  <div class="gx-table" data-reveal role="region" aria-label="Documented checks on the reference build" tabindex="0">
    <table>
      <caption><span>Documented checks on the reference build</span>${ev('repo', 'QA report and UX review, Sept – Nov 2026')}</caption>
      <thead><tr><th scope="col">Area</th><th scope="col">What was checked</th><th scope="col">Result</th></tr></thead>
      <tbody>${CHECKS.map(([a, w, r]) => `<tr><th scope="row">${a}</th><td>${w}</td><td>${r}</td></tr>`).join('')}</tbody>
    </table>
  </div>
  <h3 class="gx-h3">A UX review, and what it changed</h3>
  <ul class="gx-fixes" role="list">${REVIEW.map(([f, c]) => `<li><span class="gx-fixes__f">${f}</span><span class="gx-fixes__arrow" aria-hidden="true">→</span><span class="gx-fixes__c">${c}</span></li>`).join('')}</ul>
  <p class="gx-note">These results describe the reference build, not the live site. I have not included a design-versus-live comparison, because the live site could not be captured for this page.</p>
  ${todo(ctx, 'GEMIS case study: the checks you ran on the live implementation', '— what you reviewed with the development team after handoff, on which devices, and one or two issues found and resolved.')}
  ${todo(ctx, 'GEMIS case study: a design-versus-live comparison', '— a screenshot of gemis.co.za beside the matching design.')}`, 'band');

// ----------------------------------------------------------- 13 outcome

const OUTCOMES = [
  ['Live website', 'The corporate website is publicly accessible.'],
  ['Formally adopted design system', 'A reusable design foundation accepted by GEMIS.'],
  ['Complete brand foundation', 'An identity and supporting business assets.'],
  ['Development handoff', 'Organised Figma assets, and a GitHub reference build.'],
  ['Design-to-implementation involvement', 'Continued collaboration, and a part in testing.'],
];

const outcome = () => sec('outcome', `
  ${head('outcome', 13, 'The outcome', 'What was delivered.', 'GEMIS now has a front door that matches its experience: a brand people can recognise, services they can understand, work they can explore and a clear way to start a conversation.')}
  <ul class="gx-outcomes" data-reveal role="list">${OUTCOMES.map(([t, d], i) => `<li><span class="gx-outcomes__n">${pad(i + 1)}</span><b>${t}</b><span>${d}</span></li>`).join('')}</ul>
  <p class="gx-note">I have not included traffic, conversion, lead or revenue figures. None have been measured or shared with me, and the outcomes above are the ones I can stand behind.</p>`);

// -------------------------------------------------------- 14 reflection

const reflection = (ctx, next) => sec('reflection', `
  ${head('reflection', 14, 'Reflection', 'What this project taught me.')}
  <div class="gx-reflect">
    <div>
      <h3>The brief is a starting point, not the answer</h3>
      <p>The most useful thing I did was ask what the site was for before deciding what it should look like. That question turned a website request into brand work, and it gave me the grounds to recommend a calmer direction than the one first requested.</p>
    </div>
    <div>
      <h3>Technical companies need plain language</h3>
      <p>GEMIS does complex work. Its prospective clients mostly want to know whether it can solve their problem. Translating nine disciplines into outcomes a business owner recognises was as much design work as any screen.</p>
    </div>
    <div>
      <h3>Identity and experience are one piece of work</h3>
      <p>Building the brand and the website together meant the system was designed for real interface needs, such as states, fields and dense pages, not only for a logo sheet. That is also why it could be adopted.</p>
    </div>
    <div>
      <h3>Handoff is a design problem too</h3>
      <p>The team worked best from something they could open and read. Meeting them there with a working reference, and staying involved through testing, did more for implementation quality than another round of polished screens would have.</p>
    </div>
  </div>
  <blockquote class="gx-closing"><p>I approach design as a connected process — understanding the business, understanding the people it serves, structuring the experience, building the system behind the interface and staying involved until the work is implemented.</p></blockquote>
  <div class="gx-end">
    <a class="gx-btn gx-btn--accent" href="${LIVE}" rel="noopener" target="_blank"><span>Visit gemis.co.za</span>${icon.external}<span class="sr-only"> (opens in a new tab)</span></a>
    <a class="gx-btn" href="${url(ctx, `work/${next.slug}/`)}"><span>Next case study: ${esc(next.name)}</span>${arrow}</a>
    <a class="gx-btn" href="mailto:${site.email}?subject=${encodeURIComponent('GEMIS case study')}"><span>Ask me about this project</span>${arrow}</a>
  </div>`, 'soft');

// --------------------------------------------------------- chapter nav

const CHAPTERS = [['context', 'Context'], ['challenge', 'Challenge'], ['discovery', 'Discovery'], ['research', 'Research'], ['ia', 'Structure'], ['journeys', 'Journeys'], ['identity', 'Identity'], ['decision', 'Decision'], ['website', 'Website'], ['handoff', 'Handoff'], ['qa', 'QA'], ['outcome', 'Outcome']];

export default {
  slug: 'gemis',
  render(ctx, { next }) {
    return `
  <article class="gx">
    ${intro(ctx)}
    <nav class="gx-toc" aria-label="Case study sections" data-chapters>
      <span class="gx-toc__bar" data-progress aria-hidden="true"></span>
      <div class="wrap"><ol role="list">${CHAPTERS.map(([id, l], i) => `<li><a href="#${id}"><span>${pad(i + 2)}</span>${l}</a></li>`).join('')}</ol></div>
    </nav>
    ${context(ctx)}
    ${challenge(ctx)}
    ${discovery(ctx)}
    ${research(ctx)}
    ${ia(ctx)}
    ${journeys(ctx)}
    ${identity(ctx)}
    ${decision(ctx)}
    ${website(ctx)}
    ${handoff(ctx)}
    ${qa(ctx)}
    ${outcome(ctx)}
    ${reflection(ctx, next)}
  </article>`;
  },
};
