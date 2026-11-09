import { html, button } from '../shared.mjs';

// GitHub Pages serves 404.html for any missing path, at any depth, so its
// links must be absolute. The build gives it ctx.absolute = true.

export default {
  path: '404.html',
  page: '404',
  navKey: null,
  title: 'Page not found',
  description: 'This page could not be found.',
  bodyClass: 'page-404',
  noindex: true,
  render: (ctx) => html`
  <section class="wrap notfound" aria-labelledby="nf-h">
    <p class="eyebrow">Error 404</p>
    <h1 class="page-hero__title" id="nf-h">This page doesn’t exist.</h1>
    <p class="lead">The link may be out of date — the portfolio was rebuilt recently.</p>
    <div class="btn-row">
      ${button(ctx, { label: 'Go to the homepage', href: '' })}
      ${button(ctx, { label: 'Selected work', href: 'index.html#work', variant: 'secondary' })}
    </div>
  </section>`,
};
