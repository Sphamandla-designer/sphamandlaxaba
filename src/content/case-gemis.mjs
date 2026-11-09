// GEMIS corporate website case study.
// Only verified facts are published. Screens, sitemap and details are still
// to come and are tracked in CONTENT-NEEDED.md.

import { todo, button, site } from '../shared.mjs';
import { list } from '../case.mjs';

export default {
  slug: 'gemis',
  lede: 'GEM Information Systems builds enterprise software, websites and business apps. I led the redesign of its corporate website.',
  meta: (ctx) => [
    ['Timeline', todo(ctx, 'GEMIS website: timeline and launch date')],
    ['Live site', todo(ctx, 'GEMIS website: live URL')],
  ],
  cover: (ctx) => `
    <div class="showcase card card--dark">
      <p class="showcase__title">GEMIS</p>
      <p class="showcase__sub">Corporate website redesign</p>
    </div>
    ${todo(ctx, 'GEMIS website: desktop and mobile mockups or screenshots of the live site')}`,

  sections: [
    {
      id: 'context',
      title: 'Context',
      body: (ctx) => `
        <p class="lead">The website has to explain a company that does several things — products, client software and design — without listing everything at once.</p>
        ${todo(ctx, 'GEMIS website: audiences and key messages')}
        ${todo(ctx, 'GEMIS website: real reasons for the redesign')}`,
    },
    {
      id: 'role',
      title: 'My role',
      body: (ctx) => `
        <p class="lead">Led the redesign and worked with a development team.</p>
        ${list(['Site structure and page layouts', 'Visual design', 'Handover to, and support for, the developers who built it'])}
        ${todo(ctx, 'GEMIS website: how the collaboration with developers worked')}
        ${todo(ctx, 'GEMIS website: sitemap, visual direction, key page decisions, responsive screens, reflection')}`,
    },
    {
      id: 'more',
      title: 'Full case study',
      dark: true,
      body: (ctx) => `
        <p class="lead">Screens and the full write-up are being prepared. Ask me for a walkthrough in the meantime.</p>
        <div class="btn-row">${button(ctx, { label: 'Email me', href: `mailto:${site.email}?subject=${encodeURIComponent('GEMIS website')}`, variant: 'secondary' })}</div>`,
    },
  ],
};
