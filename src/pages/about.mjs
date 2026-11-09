import { esc, url, html, img, button, cvButton, sectionHead } from '../shared.mjs';
import { education, learning, tools } from '../content/experience.mjs';
import { timeline, closingCta } from './partials.mjs';

export default {
  path: 'about/index.html',
  page: 'About',
  navKey: 'about',
  title: 'About',
  description:
    'About Sphamandla Xaba — a Johannesburg-based Product Designer working on enterprise software, mobile apps and websites at Gem Information Systems.',
  bodyClass: 'page-about',
  render: (ctx) => html`
  <header class="page-hero wrap">
    <p class="eyebrow">About</p>
    <h1 class="page-hero__title">Designing digital experiences with clarity, structure and purpose.</h1>
  </header>

  <section class="section about-intro" aria-label="Introduction">
    <div class="wrap about-intro__grid">
      <figure class="about-intro__portrait">
        ${img(ctx, 'about/portrait-spha', 'Portrait of Sphamandla Xaba', { sizes: '(min-width: 1024px) 420px, 90vw', eager: true })}
        <figcaption class="small muted">Sphamandla Xaba · Johannesburg</figcaption>
      </figure>
      <div class="prose about-intro__text">
        <p class="lead">I’m Sphamandla Xaba, a product designer based in Johannesburg, South Africa. I design enterprise systems, mobile applications and websites — and I’m happiest when a product has a lot going on and needs someone to find the structure in it.</p>
        <p>Alongside a BA in Environmental Studies &amp; Geography from the University of the Witwatersrand, I’ve completed professional courses in UX design, design psychology and product design.</p>
        <p>I started in 2023 at AX-Channels Studio, designing websites, landing pages and business platforms for clients, many of them built in WordPress. Working directly with clients taught me to turn loose business requirements into something concrete, and to explain design decisions in plain language.</p>
        <p>Since 2025 I’ve been a UI/UX designer at Gem Information Systems, where I design enterprise software, internal business applications and websites. That’s where I’ve worked on the ManaGEM ERP and led the redesign of the GEMIS website.</p>
        <div class="btn-row">${cvButton(ctx, 'primary')}${button(ctx, { label: 'Get in touch', href: 'contact/', variant: 'secondary' })}</div>
      </div>
    </div>
  </section>

  <section class="section section--alt" aria-labelledby="exp-h">
    <div class="wrap">
      ${sectionHead({ num: '01', kicker: 'Experience', title: 'Experience and responsibilities.', id: 'exp-h' })}
      ${timeline(ctx)}
    </div>
  </section>

  <section class="section" aria-labelledby="phil-h">
    <div class="wrap">
      ${sectionHead({ num: '02', kicker: 'Design philosophy', title: 'What I hold myself to.', id: 'phil-h' })}
      <ol class="principles" role="list">
        <li><h3>Understand before designing</h3><p>What problem are we solving, for whom, and how do people work today? The answers decide the design more than any visual choice.</p></li>
        <li><h3>Complex systems should feel simple</h3><p>Complexity belongs in the system, not in the user’s head. People should never have to wonder where they are or what happens next.</p></li>
        <li><h3>Every interaction should build trust</h3><p>Especially in business software: show what the system did, let people check it, and make it easy to correct.</p></li>
        <li><h3>Design for the build</h3><p>A small set of patterns that a team can actually build beats a beautiful one-off. I design with developers, not just for them.</p></li>
      </ol>
    </div>
  </section>

  <section class="section section--alt" aria-labelledby="int-h">
    <div class="wrap about-two">
      <div>
        ${sectionHead({ num: '03', kicker: 'Interests', title: 'The problems I’m drawn to.', id: 'int-h' })}
        <ul class="interest-list" role="list">
          <li>Enterprise and operational software that people use all day</li>
          <li>Information architecture for products with many modules</li>
          <li>Mobile tools for people working away from a desk</li>
          <li>Design systems that keep a growing product consistent</li>
          <li>Using AI where it genuinely helps — and keeping people in control of it</li>
        </ul>
      </div>
      <div>
        ${sectionHead({ num: '04', kicker: 'Tools & methods', title: 'How I work day to day.', id: 'tools-h' })}
        <dl class="tools">
          ${Object.entries(tools).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v.map(esc).join(' · ')}</dd></div>`).join('')}
          <div><dt>Methods</dt><dd>Information architecture · User flows · Wireframing · Interactive prototyping · Design systems · Developer handoff</dd></div>
        </dl>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="edu-h">
    <div class="wrap about-two">
      <div>
        ${sectionHead({ num: '05', kicker: 'Education', title: 'Education.', id: 'edu-h' })}
        <p class="edu"><strong>${esc(education.school)}</strong><br>${esc(education.qualification)}</p>
      </div>
      <div>
        ${sectionHead({ num: '06', kicker: 'Learning', title: 'Professional development.', id: 'learn-h' })}
        <ul class="learning" role="list">${learning.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
      </div>
    </div>
  </section>
  ${closingCta(ctx)}`,
};
