import { html, site, cvButton } from '../shared.mjs';
import { contactLinks } from './partials.mjs';

// No form: there is no backend or form service configured, and a form that
// looks like it sends but doesn't would be worse than none. Email does the job.

export default {
  path: 'contact/index.html',
  page: 'Contact',
  navKey: 'contact',
  title: 'Contact',
  description: 'Contact Sphamandla Xaba, Product Designer (UI/UX) in Johannesburg — email, LinkedIn and CV.',
  bodyClass: 'page-contact',
  render: (ctx) => html`
  <section class="contact-page wrap" aria-labelledby="contact-h">
    <p class="eyebrow">Contact</p>
    <h1 class="page-hero__title" id="contact-h">Let’s talk about your product.</h1>
    <div class="contact-page__grid">
      <div class="contact-page__intro prose">
        <p class="lead">I’m open to product designer and UI/UX designer roles, and to collaborating with teams building better digital experiences.</p>
        <p>Email is the best way to reach me. If you’re hiring, a line about the role and the team is plenty to start with. If you’d like to see ManaGEM working, ask for a walkthrough.</p>
        <dl class="meta meta--compact">
          <div class="meta__row"><dt>Based in</dt><dd>${site.location}</dd></div>
          <div class="meta__row"><dt>Time zone</dt><dd>South Africa Standard Time (UTC+2)</dd></div>
          <div class="meta__row"><dt>Phone</dt><dd><a href="tel:${site.phone.replace(/\s/g, '')}">${site.phone}</a></dd></div>
        </dl>
      </div>
      <div class="contact-page__links">${contactLinks(ctx)}</div>
    </div>
  </section>`,
};
