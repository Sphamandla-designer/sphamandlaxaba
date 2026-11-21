// Shared building blocks for the two ManaGEM case-study pages:
//   work/managem/       — the quick, recruiter-first case study (case-managem.mjs)
//   work/managem/full/  — the full case study (case-managem-full.mjs)
//
// Evidence rules for both pages:
//  - Screenshots and flow videos are captured from the two supplied prototypes
//    (prototypes/managem.html and "ManaGem Take-On (Standalone).html") and show
//    demo / sample data, never client data.
//  - The opening film is the ManaGEM product film supplied in the repository;
//    its promotional lines are GEMIS marketing, not results of this project.
//  - Problems are the items in the redesign brief. No research, testing,
//    quotes or metrics are claimed. Counts are counts of what the prototypes
//    contain, not outcomes.
//  - Take-On is a designed prototype with development underway; its AI
//    processing is simulated and its legal/security copy is prototype content.

import { readFileSync } from 'node:fs';
import { esc, url, img, icon } from '../shared.mjs';

export const SRC_CORE = 'Core redesign prototype · demo data';
export const SRC_TAKEON = 'Take-On prototype · sample data';
export const TAKEON_FILE = 'ManaGem%20Take-On%20(Standalone).html';
export const QUICK = 'work/managem/';
export const FULL = 'work/managem/full/';
const VID = 'assets/video/managem/';

export const glyph = {
  play: '<svg class="i i-play" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.2v9.6L13 8z" fill="currentColor"/></svg>',
  pause: '<svg class="i i-pause" viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 3h2.4v10H4.5zM9.1 3h2.4v10H9.1z" fill="currentColor"/></svg>',
  maze: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4zM4 9h7M15 4v7M9 14h11M9 14v6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  doc: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  bell: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  layers: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  inbox: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13l2.5-8h11L20 13v6H4zM4 13h5l1 2h4l1-2h5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  back: '<svg class="i" viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8H3M7 4 3 8l4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
};

const imgMeta = JSON.parse(readFileSync(new URL('./images.json', import.meta.url), 'utf8'));
/** The largest file for an image: images with one size have no width suffix. */
const full = (ctx, key) => {
  const m = imgMeta[key];
  const suffix = m && m.sizes.length > 1 ? `-${Math.max(...m.sizes)}` : '';
  return url(ctx, `assets/images/${key}${suffix}.webp`);
};

/** A real product screenshot; every shot opens in the image viewer. */
export function shot(ctx, key, alt, { caption = '', source = SRC_CORE, sizes = '(min-width: 1264px) 1200px, 100vw', cls = '', inner = '', eager = false } = {}) {
  const k = `managem/${key}`;
  return `<figure class="mx-shot${cls ? ` ${cls}` : ''}">
    <div class="mx-frame-wrap"><a class="zoom mx-frame" href="${full(ctx, k)}" data-zoom data-caption="${esc(caption || alt)}" aria-label="Enlarge: ${esc(alt)}">${img(ctx, k, alt, { sizes, eager })}</a>${inner}</div>
    <figcaption>${caption ? `<span>${esc(caption)}</span>` : ''}<span class="mx-src">${esc(source)}</span></figcaption>
  </figure>`;
}

/**
 * An autoplaying, muted, looping screen recording. Nothing downloads until it
 * nears the viewport (preload="none"); assets/js/main.js picks the small file
 * on phones and slow connections, pauses it off screen, and leaves it paused
 * for reduced-motion and Data Saver users. Without JavaScript it shows native
 * controls. The pause button satisfies WCAG 2.2.2 for moving content.
 */
export function video(ctx, name, label, { caption = '', source = SRC_CORE, big = '1280', small = '768', poster = `${name}-poster.webp`, w = 1280, h = 800, hero = false, cls = '' } = {}) {
  const src = (s) => url(ctx, `${VID}${name}-${s}.mp4`);
  return `<figure class="mx-video${hero ? ' mx-video--hero' : ''}${cls ? ` ${cls}` : ''}" data-video>
    <div class="mx-frame mx-video__frame">
      <video muted loop playsinline controls preload="none" width="${w}" height="${h}" poster="${url(ctx, VID + poster)}" aria-label="${esc(label)}">
        <source src="${src(small)}" type="video/mp4" media="(max-width: 767px)">
        <source src="${src(big)}" type="video/mp4">
      </video>
      <button class="mx-video__toggle" type="button" data-video-toggle aria-label="Play video" hidden>${glyph.play}${glyph.pause}</button>
    </div>
    <figcaption>${caption ? `<span>${esc(caption)}</span>` : ''}<span class="mx-src">${esc(source)}</span></figcaption>
  </figure>`;
}

export const filmVideo = (ctx) =>
  video(ctx, 'film', 'ManaGEM product film: the redesigned dashboard, navigation, stock, factory, debtors and invoicing screens', {
    caption: 'ManaGEM product film, featuring the redesigned interface. Its promotional lines are GEMIS marketing, not results of this project.',
    source: 'Product film',
    small: '640',
    poster: 'film-poster-1280.webp',
    w: 1280,
    h: 720,
    hero: true,
  });

/** Centred headline stack with a numbered kicker. */
export const head = ({ id, n, label, title, intro = '', align = 'center' }) => `
  <header class="mx-head mx-head--${align}">
    <p class="mx-kicker">${n ? `<span class="mx-kicker__n">${n}</span>` : ''}${esc(label)}</p>
    <h2 class="mx-h2" id="${id}-h">${title}</h2>
    ${intro ? `<p class="mx-intro">${intro}</p>` : ''}
  </header>`;

/** A full-bleed tile. mod: '' (white) | 'soft' (parchment) | 'band' (near-black). */
export const section = (id, body, { mod = '', label = `${id}-h`, chapter = true } = {}) => `
  <section class="mx-sec${mod ? ` mx-sec--${mod}` : ''}" id="${id}" aria-labelledby="${label}"${chapter ? ' data-chapter' : ''}>
    <div class="wrap">${body}</div>
  </section>`;

export const note = (text) => `<p class="mx-note">${text}</p>`;
export const ticks = (items) => `<ul class="mx-ticks" role="list">${items.map((d) => `<li>${d}</li>`).join('')}</ul>`;

/** Frosted sub-nav: project name, chapter links with scroll-spy, one action. */
export const chapterNav = (ctx, chapters, { name, cta }) => `
    <nav class="mx-chapters" aria-label="Case study sections" data-chapters>
      <div class="wrap">
        <p class="mx-chapters__name" aria-hidden="true">${name}</p>
        <ol role="list">${chapters.map(([id, label]) => `<li><a href="#${id}">${label}</a></li>`).join('')}</ol>
        ${cta}
      </div>
      <span class="mx-progress" aria-hidden="true" data-progress></span>
    </nav>`;

/** A design decision as a feature tile: header, one big visual, beats. */
export function feature({ id, tag, title, lede, media, beats, shows }) {
  return `
    <article class="mx-feat" aria-labelledby="${id}-t">
      <header class="mx-feat__head">
        <p class="mx-feat__tag">${tag}</p>
        <h3 class="mx-feat__title" id="${id}-t">${title}</h3>
        <p class="mx-feat__lede">${lede}</p>
      </header>
      <div class="mx-feat__media">${media}</div>
      <dl class="mx-beats">${beats.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      ${shows ? `<p class="mx-shows"><span>Demonstrates</span> ${shows}</p>` : ''}
    </article>`;
}

/** The next project, as a quiet closing link. */
export const nextProject = (ctx, next) => `
    <nav class="mx-next" aria-label="Next case study">
      <div class="wrap">
        <a class="mx-next__link" href="${url(ctx, `work/${next.slug}/`)}">
          <span class="mx-next__label">Next project</span>
          <span class="mx-next__name">${esc(next.name)}</span>
          <span class="mx-next__sum">${esc(next.title)}</span>
          <span class="mx-next__btn"><span>View case study</span>${icon.arrow}</span>
        </a>
      </div>
    </nav>`;

// ------------------------------------------------- before / after compare

export const SRC_LEGACY = 'Original interface · client data redacted';

/** One frame, two versions. Without JavaScript both are shown, stacked. */
export function compare(ctx, { before, after, caption = '', view = 'after', sizes = '(min-width: 1264px) 1200px, 100vw' }) {
  const pane = (which, [key, alt], label) => {
    const k = `managem/${key}`;
    return `<div class="mx-compare__pane" data-pane="${which}">
        <p class="mx-compare__label"><span class="mx-compare__dot mx-compare__dot--${which}" aria-hidden="true"></span>${label}</p>
        <a class="zoom mx-frame" href="${full(ctx, k)}" data-zoom data-caption="${esc(`${label}: ${alt}`)}" aria-label="Enlarge: ${esc(alt)}">${img(ctx, k, alt, { sizes })}</a>
      </div>`;
  };
  return `<figure class="mx-compare" data-compare data-view="${view}">
    <div class="mx-compare__bar" hidden>
      <div class="mx-seg" role="group" aria-label="Choose which version to show">
        <button type="button" data-compare-show="before" aria-pressed="${view === 'before'}">Original</button>
        <button type="button" data-compare-show="after" aria-pressed="${view === 'after'}">Redesign</button>
      </div>
    </div>
    <div class="mx-compare__panes">
      ${pane('before', before, SRC_LEGACY)}
      ${pane('after', after, 'Redesign · demo data')}
    </div>
    ${caption ? `<figcaption><span>${esc(caption)}</span></figcaption>` : ''}
  </figure>`;
}

// ------------------------------------------------------- project status

/** The agreed status of every part of the project. One source for both pages. */
export const STATUS = [
  ['Product redesign', 'Design completed', 'live'],
  ['Core product', 'Development underway', 'progress'],
  ['Customer release', 'Awaiting coordinated release', 'pending'],
  ['Take-On', 'UX/UI prototype completed; development underway', 'progress'],
  ['Production validation', 'Pending release', 'pending'],
];

export const statusList = () => `
  <dl class="mx-statuslist">
    ${STATUS.map(([k, v, kind]) => `<div><dt>${k}</dt><dd><span class="status status--${kind}"><span class="status__mark" aria-hidden="true"></span>${v}</span></dd></div>`).join('')}
  </dl>`;

/** Simplified business workflow. */
export const WORKFLOW = [
  ['Enquiry', 'A lead is captured and tracked.'],
  ['Quotation', 'The work is priced from the product catalogue.'],
  ['Job', 'Accepted work becomes a project or a factory build.'],
  ['Stock / Production', 'Materials are bought, stored, dispatched or built.'],
  ['Invoice', 'Completed work is billed and synced to accounting.'],
  ['Payment', 'Outstanding balances are followed up.'],
];

export const workflowDiagram = (label = 'A simplified business workflow in ManaGEM') => `
  <figure class="mx-flowmap">
    <ol class="mx-flowmap__steps" role="list" aria-label="${esc(label)}">
      ${WORKFLOW.map(([t, d], i) => `<li><span class="mx-flowmap__n">${String(i + 1).padStart(2, '0')}</span><strong>${t}</strong><span class="mx-flowmap__d">${d}</span></li>`).join('')}
    </ol>
    <div class="mx-flowmap__shared" aria-label="Records shared by every stage">
      <span>Shared records</span>
      <ul role="list"><li>Customers & suppliers</li><li>Products & pricing</li><li>Staff</li><li>Reports</li><li>Accounting sync</li></ul>
    </div>
    <figcaption>A simplified view. Not every business uses every stage, or in this order — but each stage reads records created by the one before it.</figcaption>
  </figure>`;
