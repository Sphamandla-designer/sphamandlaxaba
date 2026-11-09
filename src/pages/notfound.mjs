import { html, button } from '../shared.mjs';

// GitHub Pages serves 404.html for any missing path, so its links are absolute.

export default {
  path: '404.html',
  page: '404',
  navKey: null,
  title: 'Page not found',
  description: 'This page could not be found.',
  bodyClass: 'page-404',
  noindex: true,
  render: (ctx) => html`
  <section class="hero" aria-labelledby="nf-h">
    <div class="wrap">
      <h1 class="hero__title" id="nf-h">This page doesn’t exist.</h1>
      <div class="btn-row">${button(ctx, { label: 'Go home', href: '' })}</div>
    </div>
  </section>`,
};
