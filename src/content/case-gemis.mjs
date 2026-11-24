// GEMIS corporate website case study.
// Only verified facts are published. Screens are captures of the GEMIS site
// (Sphamandla-designer/gemis-site, repository root). Sitemap and details are still
// to come and are tracked in CONTENT-NEEDED.md.

import { todo, button, site, figure } from '../shared.mjs';
import { list } from '../case.mjs';

export default {
  slug: 'gemis',
  lede: 'GEM Information Systems builds enterprise software, websites and business apps. I led the redesign of its corporate website.',
  meta: (ctx) => [
    ['Timeline', todo(ctx, 'GEMIS website: timeline and launch date')],
    ['Live site', todo(ctx, 'GEMIS website: live URL')],
  ],
  cover: (ctx) => `
    <div class="gm-cover">
      ${figure(ctx, { key: 'gemis/gm-home', alt: 'The redesigned GEMIS website home page on desktop', caption: 'Home page, desktop', kind: 'screen', sizes: '(min-width: 1100px) 860px, 92vw', eager: true })}
      ${figure(ctx, { key: 'gemis/gm-home-mobile', alt: 'The redesigned GEMIS website home page on a phone', caption: 'Home page, mobile', kind: 'phone', sizes: '240px' })}
    </div>
    <div class="gm-pages">
      ${figure(ctx, { key: 'gemis/gm-solutions', alt: 'GEMIS website: Solutions page', caption: 'Solutions', kind: 'screen', sizes: '(min-width: 1100px) 400px, 92vw' })}
      ${figure(ctx, { key: 'gemis/gm-managem', alt: 'GEMIS website: ManaGEM product page', caption: 'ManaGEM product page', kind: 'screen', sizes: '(min-width: 1100px) 400px, 92vw' })}
      ${figure(ctx, { key: 'gemis/gm-story', alt: 'GEMIS website: Our Story page', caption: 'Our story', kind: 'screen', sizes: '(min-width: 1100px) 400px, 92vw' })}
    </div>`,

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
