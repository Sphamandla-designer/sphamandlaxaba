// GEMIS corporate website case study.
// Verified so far: the company (from the CV and the ManaGEM / GEMIS Studio
// work), the project status and the designer's role (supplied by the
// designer). Screenshots, sitemap and timeline are still to come, so those
// sections are explicit placeholders.

import { placeholder, phInline, esc } from '../shared.mjs';
import { pair } from '../case.mjs';

const shotPlaceholder = (ctx, need, ratio = 'wide') =>
  `<div class="shot-ph shot-ph--${ratio}">${placeholder(ctx, { need, detail: 'Use a real screenshot of the live website (PNG or JPG, at least 1600px wide for desktop, 780px for mobile).', shape: 'fill' })}</div>`;

export default {
  slug: 'gemis',
  lede:
    'GEM Information Systems designs and builds enterprise software, websites and internal business applications for corporate clients. I led the redesign of its corporate website and worked with the development team that built it.',
  introCtx: (ctx) => [
    ['Business', 'GEM Information Systems (GEMIS), a South African software company'],
    ['Development', 'Built by a development team, working from my designs'],
    ['Timeline', phInline(ctx, 'GEMIS website: project timeline and launch date')],
    ['Live site', phInline(ctx, 'GEMIS website: the live URL')],
  ],
  cover: (ctx) => shotPlaceholder(ctx, 'Cover image: the redesigned GEMIS homepage on desktop.'),

  sections: [
    {
      id: 'business',
      title: 'Business context',
      short: 'Context',
      body: (ctx) => `
        <div class="prose">
          <p class="lead">GEMIS is a software company: it builds products such as the ManaGEM ERP, designs and builds enterprise platforms and websites for corporate clients, and runs an in-house product and interface design practice, GEMIS Studio.</p>
          <p>The corporate website is the company’s main front door, so it has to explain a business that does several things — products, client software and design services — without becoming a list of everything at once.</p>
        </div>
        ${placeholder(ctx, {
          need: 'What the GEMIS corporate website needed to communicate.',
          detail: 'The audiences it serves (for example prospective clients, partners, job seekers) and the main messages or offers the site had to carry.',
        })}`,
    },
    {
      id: 'challenge',
      title: 'The challenge',
      short: 'Challenge',
      body: (ctx) => `
        ${placeholder(ctx, {
          need: 'The real reasons for the redesign.',
          detail: 'What prompted it — for example a new offer, outdated content, a rebrand or structural problems. Only include issues that genuinely applied; do not invent problems with the previous site.',
        })}`,
    },
    {
      id: 'role',
      title: 'My role',
      short: 'My role',
      body: (ctx) => `
        <p class="statement">Led the redesign and worked with a development team.</p>
        ${pair(
          `<h3 class="h4">What I led</h3><p>The UX and UI design of the new site: its structure, page layouts and visual design, and the design decisions behind them.</p>`,
          `<h3 class="h4">Working with development</h3><p>The site was built by a development team. My part was to hand over designs they could build from and to stay involved while it was implemented.</p>`,
        )}
        ${placeholder(ctx, {
          need: 'How the collaboration with the development team worked.',
          detail: 'Team size, how designs were handed over (Figma, specs, reviews), how often you met, and any decisions you made together during the build.',
        })}`,
    },
    {
      id: 'ia',
      title: 'Information architecture',
      short: 'Structure',
      body: (ctx) => `
        ${placeholder(ctx, {
          need: 'The site map and navigation of the redesigned website.',
          detail: 'A list of the pages and how they are grouped, the main navigation labels, and one or two key journeys (for example “a prospective client looking for a service”). A FigJam or Figma export is ideal.',
        })}`,
    },
    {
      id: 'visual',
      title: 'Visual direction',
      short: 'Visual direction',
      body: (ctx) => `
        ${placeholder(ctx, {
          need: 'The visual language of the redesigned site.',
          detail: 'Typefaces, colour palette, layout grid, image treatment and the main component patterns — ideally exported from the design file.',
        })}`,
    },
    {
      id: 'pages',
      title: 'Key page decisions',
      short: 'Pages',
      body: (ctx) => `
        <div class="duo">
          ${shotPlaceholder(ctx, 'Homepage screenshot, with the decisions behind its structure.')}
          ${shotPlaceholder(ctx, 'Two or three important inner pages (for example services, products, about), each with its main design decision.')}
        </div>`,
    },
    {
      id: 'responsive',
      title: 'Responsive experience',
      short: 'Responsive',
      body: (ctx) => `
        <div class="duo duo--mobile">
          ${shotPlaceholder(ctx, 'Desktop screenshots of the live site.')}
          ${shotPlaceholder(ctx, 'Mobile screenshots of the live site, and any responsive decisions worth explaining (navigation, content order).', 'tall')}
        </div>`,
    },
    {
      id: 'live',
      title: 'Live implementation',
      short: 'Live site',
      body: (ctx) => `
        ${placeholder(ctx, {
          need: 'A link to the live website, and evidence of the implementation.',
          detail: 'The public URL, plus one or two screenshots of the built site that show where it matches the design.',
        })}`,
    },
    {
      id: 'reflection',
      title: 'Reflection',
      short: 'Reflection',
      body: (ctx) => `
        ${placeholder(ctx, {
          need: 'Your reflection on the GEMIS redesign.',
          detail: 'What you learned about leading a redesign, what you would improve, and what the project shows about working with developers.',
        })}`,
    },
  ],
};

export { esc };
