import { esc, html, img, button, cvButton, sectionHead } from '../shared.mjs';
import { education, learning, tools } from '../content/experience.mjs';
import { timeline, closingCta } from './partials.mjs';

export default {
  path: 'about/index.html',
  page: 'About',
  navKey: 'about',
  title: 'About',
  description: 'About Sphamandla Xaba — Johannesburg-based Product Designer working on enterprise software, mobile apps and websites.',
  bodyClass: 'page-about',
  render: (ctx) => html`
  <section class="hero" aria-labelledby="about-h">
    <div class="wrap hero__grid hero__grid--about">
      <div class="hero__text">
        <h1 class="hero__title" id="about-h">Designing with clarity, structure and purpose.</h1>
        <p class="hero__copy">I’m a product designer in Johannesburg. Since 2025 I’ve designed enterprise software, business apps and websites at Gem Information Systems. Before that, from 2023, I designed websites and platforms for clients at AX-Channels Studio.</p>
        <div class="btn-row">${cvButton(ctx, 'primary')}${button(ctx, { label: 'Contact', href: 'contact/', variant: 'subtle' })}</div>
      </div>
      <div class="hero__portrait">${img(ctx, 'about/portrait-spha', 'Portrait of Sphamandla Xaba', { sizes: '(min-width: 1120px) 480px, 100vw', eager: true })}</div>
    </div>
  </section>

  <section class="section" aria-labelledby="exp-h">
    <div class="wrap">
      ${sectionHead({ title: 'Experience', id: 'exp-h' })}
      ${timeline(ctx)}
    </div>
  </section>

  <section class="section" aria-labelledby="phil-h">
    <div class="wrap">
      <div class="card card--dark principles">
        ${sectionHead({ title: 'What I believe', id: 'phil-h' })}
        <ol class="steps steps--four" role="list">
          <li><span class="steps__n">1</span><h3>Understand first</h3><p>The problem decides the design.</p></li>
          <li><span class="steps__n">2</span><h3>Keep it simple</h3><p>Complexity belongs in the system, not the user’s head.</p></li>
          <li><span class="steps__n">3</span><h3>Build trust</h3><p>Show what happened; make it easy to correct.</p></li>
          <li><span class="steps__n">4</span><h3>Design for the build</h3><p>Patterns a team can actually ship.</p></li>
        </ol>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="tools-h">
    <div class="wrap two">
      <div>
        ${sectionHead({ title: 'Tools', id: 'tools-h' })}
        <dl class="meta meta--rows">${Object.entries(tools).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v.map(esc).join(', ')}</dd></div>`).join('')}</dl>
      </div>
      <div>
        ${sectionHead({ title: 'Education', id: 'edu-h' })}
        <dl class="meta meta--rows">
          <div><dt>Degree</dt><dd>${esc(education.qualification)}, ${esc(education.school)}</dd></div>
          <div><dt>Courses</dt><dd>${learning.map(esc).join('<br>')}</dd></div>
        </dl>
      </div>
    </div>
  </section>
  ${closingCta(ctx)}`,
};
