import { html, site } from '../shared.mjs';
import { contactLinks } from './partials.mjs';

// No form: no backend is configured, and email does the job.

export default {
  path: 'contact/index.html',
  page: 'Contact',
  navKey: 'contact',
  title: 'Contact',
  description: 'Contact Sphamandla Xaba, Product Designer (UI/UX) in Johannesburg — email, LinkedIn and CV.',
  bodyClass: 'page-contact',
  render: (ctx) => html`
  <section class="hero" aria-labelledby="contact-h">
    <div class="wrap hero__grid">
      <div class="hero__text">
        <h1 class="hero__title" id="contact-h">Let’s talk.</h1>
        <p class="hero__copy">Open to product designer and UI/UX roles. Email is the quickest way to reach me.</p>
        <p class="muted small">${site.location} · UTC+2 · <a class="link-mute" href="tel:${site.phone.replace(/\s/g, '')}">${site.phone}</a></p>
      </div>
      <div class="card card--form">${contactLinks(ctx)}</div>
    </div>
  </section>`,
};
