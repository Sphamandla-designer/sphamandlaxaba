import { esc, url, html, img, figure, status, tags, meta, button, cvButton, sectionHead, placeholder } from '../shared.mjs';
import { projects, moreWork } from '../content/projects.mjs';
import { timeline, closingCta } from './partials.mjs';

const specialisms = ['Enterprise Systems', 'Mobile Applications', 'SaaS & Dashboard Systems', 'Digital Experiences', 'UX/UI Design'];

function hero(ctx) {
  return html`
  <section class="hero" aria-labelledby="hero-h">
    <div class="wrap hero__grid">
      <p class="hero__eyebrow eyebrow">Product Designer · UI/UX · South Africa</p>
      <h1 class="hero__title" id="hero-h">I design digital products that make complex workflows simpler<span class="dot">.</span></h1>
      <div class="hero__aside">
        <p class="hero__copy">I work across enterprise systems, mobile applications and digital experiences, translating complex requirements into clear, practical and intuitive products.</p>
        <div class="btn-row">
          ${button(ctx, { label: 'Explore selected work', href: 'index.html#work' })}
          ${cvButton(ctx)}
        </div>
      </div>
      <nav class="hero__index" aria-label="Selected work index">
        <p class="label">Index — selected work</p>
        <ol role="list">
          ${projects
            .map(
              (p) => `<li><a href="${url(ctx, `work/${p.slug}/`)}"><span class="hero__index-num">${p.num}</span><span class="hero__index-name">${esc(p.name)}</span><span class="hero__index-cat">${esc(p.tags.join(' · '))}</span>${status(p.status.label, p.status.kind)}</a></li>`,
            )
            .join('')}
        </ol>
      </nav>
      <ul class="hero__specs" role="list" aria-label="Specialisations">
        ${specialisms.map((s) => `<li>${esc(s)}</li>`).join('')}
      </ul>
    </div>
  </section>`;
}

function snapshot() {
  const facts = [
    ['Product design', 'Information architecture, workflows and design systems for an ERP and a field-operations app.'],
    ['UX/UI design', 'Websites, landing pages and business platforms since 2023.'],
    ['Enterprise software', 'Designing ERP and business systems at Gem Information Systems since 2025.'],
    ['Design to development', 'Designs handed over to — and built with — development teams.'],
  ];
  return html`
  <section class="snapshot section" aria-labelledby="snap-h">
    <div class="wrap snapshot__grid">
      <h2 class="sr-only" id="snap-h">Professional snapshot</h2>
      <p class="label snapshot__label">01 — Snapshot</p>
      <p class="snapshot__statement">I approach design as more than the interface. I focus on understanding the underlying problem, structuring the experience and making thoughtful decisions that help digital products work better for the people using them.</p>
      <dl class="facts">
        ${facts.map(([k, v]) => `<div class="facts__item"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}
      </dl>
    </div>
  </section>`;
}

function feature(ctx, p) {
  const metaBlock = meta([
    ['Category', esc(p.category)],
    ['Status', status(p.status.label, p.status.kind)],
    ['Role', esc(p.role)],
  ], 'meta--compact');
  const text = html`
    <div class="feature__text">
      <p class="feature__name">${esc(p.name)}</p>
      <h3 class="feature__title" id="f-${p.slug}"><a href="${url(ctx, `work/${p.slug}/`)}">${esc(p.title)}</a></h3>
      <p class="feature__summary">${esc(p.summary)}</p>
      ${metaBlock}
      <a class="link-arrow" href="${url(ctx, `work/${p.slug}/`)}" aria-label="Explore case study: ${esc(p.name)}">Explore case study <svg class="i" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></a>
    </div>`;

  let media = '';
  if (p.slug === 'managem') {
    media = `<div class="feature__media"><a href="${url(ctx, 'work/managem/')}" tabindex="-1" aria-hidden="true" class="feature__imglink"><div class="frame frame--browser"><div class="frame__bar"><i></i><i></i><i></i></div>${img(ctx, p.cover.key, '', { sizes: '(min-width: 1024px) 66vw, 100vw' })}</div></a></div>`;
  } else if (p.slug === 'wastemart') {
    const phones = ['wastemart/04-startday-ready', 'wastemart/06-jobs', 'wastemart/07-job-detail'];
    media = `<div class="feature__media feature__media--phones"><a href="${url(ctx, 'work/wastemart/')}" tabindex="-1" aria-hidden="true" class="feature__imglink">${phones
      .map((k) => `<div class="frame frame--phone">${img(ctx, k, '', { sizes: '(min-width: 1024px) 220px, 30vw' })}</div>`)
      .join('')}</a></div>`;
  } else {
    media = `<div class="feature__media feature__media--type" aria-hidden="true">
      <div class="typeplate"><span>GEMIS</span><span class="typeplate__sub">Corporate website · redesign</span></div>
    </div>`;
  }

  return html`
  <article class="feature feature--${p.slug}" aria-labelledby="f-${p.slug}">
    <p class="feature__num" aria-hidden="true">${p.num}</p>
    ${media}
    ${text}
  </article>`;
}

function work(ctx) {
  return html`
  <section class="work section" id="work" aria-labelledby="work-h" tabindex="-1">
    <div class="wrap">
      ${sectionHead({ num: '02', kicker: 'Selected work', title: 'Three products, three kinds of complexity.', id: 'work-h', intro: 'An enterprise ERP, a mobile app for field operations and a corporate website — each with a case study showing what I owned and why I made the decisions I did.' })}
      <div class="features">${projects.map((p) => feature(ctx, p)).join('')}</div>
      <div class="more">
        <h3 class="more__title">More work</h3>
        <ul class="more__list" role="list">
          ${moreWork
            .map(
              (m) => `<li class="more__item">
            <div class="more__media">${m.image ? img(ctx, m.image.key, m.image.alt, { sizes: '(min-width: 1024px) 200px, 40vw' }) : '<span class="more__blank" aria-hidden="true">Supports<br>ManaGEM</span>'}</div>
            <div class="more__text">
              <p class="more__meta">${esc(m.meta)}</p>
              <h4 class="more__name">${m.href ? `<a href="${m.href}" target="_blank" rel="noopener">${esc(m.name)} <svg class="i" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg><span class="sr-only"> (opens in a new tab)</span></a>` : esc(m.name)}</h4>
              <p class="more__note">${esc(m.note)}</p>
            </div>
          </li>`,
            )
            .join('')}
        </ul>
      </div>
    </div>
  </section>`;
}

function approach(ctx) {
  const stages = [
    ['Understand', 'Understand the product, business context, users and requirements.', 'On WasteMart, I started from four questions a driver must be able to answer at any moment — what now, what’s done, what’s left, what if it goes wrong.', 'work/wastemart/#challenge'],
    ['Structure', 'Organise information, define navigation and map meaningful user journeys.', 'ManaGEM’s navigation is grouped the way the business runs — customers, sales, operations, admin — not the way its data is stored.', 'work/managem/#structure'],
    ['Design', 'Translate requirements into intuitive interfaces and interaction patterns.', 'WasteMart’s primary button changes with the job’s state, so the next action is always the obvious one.', 'work/wastemart/#decisions'],
    ['Refine', 'Review the experience, resolve inconsistencies and improve usability.', 'ManaGEM’s statuses were brought into one plain-language set, so the same colour means the same thing in every module.', 'work/managem/#decisions'],
    ['Collaborate', 'Work towards implementation through clear communication and collaboration.', 'The GEMIS website redesign was built by a development team working from my designs.', 'work/gemis/#role'],
  ];
  return html`
  <section class="approach section section--alt" id="approach" aria-labelledby="approach-h" tabindex="-1">
    <div class="wrap">
      ${sectionHead({ num: '03', kicker: 'Approach', title: 'A thoughtful approach to designing digital products.', id: 'approach-h', intro: 'Good product design requires more than attractive interfaces. It requires understanding the problem, making informed decisions and creating experiences that work in practice.' })}
      <ol class="stages" role="list">
        ${stages
          .map(
            ([t, d, ex, href], i) => `<li class="stage">
          <p class="stage__num">${String(i + 1).padStart(2, '0')}</p>
          <h3 class="stage__title">${t}</h3>
          <p class="stage__desc">${d}</p>
          <p class="stage__example"><span class="label">In practice</span>${esc(ex)} <a href="${url(ctx, href)}" class="stage__link">See it<span class="sr-only">: ${t} example</span> →</a></p>
        </li>`,
          )
          .join('')}
      </ol>
      <p class="small muted approach__note">This is how I like to work. Not every project had room for every stage; each case study says what actually happened.</p>
    </div>
  </section>`;
}

function capabilities() {
  const groups = {
    'Product Design': ['Product thinking', 'Workflow design', 'Information architecture', 'User journeys', 'Product structure'],
    'UX/UI Design': ['User experience design', 'Interface design', 'Interaction design', 'Wireframing', 'Prototyping', 'Responsive design'],
    'Enterprise & SaaS': ['ERP interfaces', 'Dashboard systems', 'Data-heavy interfaces', 'Business workflows', 'Complex application experiences'],
    'Digital Experiences': ['Corporate websites', 'Website redesigns', 'Mobile applications', 'Digital interface systems'],
  };
  return html`
  <section class="capabilities section" aria-labelledby="cap-h">
    <div class="wrap">
      ${sectionHead({ num: '04', kicker: 'Capabilities', title: 'What I bring to a product team.', id: 'cap-h' })}
      <div class="caps">
        ${Object.entries(groups)
          .map(
            ([k, list], i) => `<div class="caps__col"><p class="caps__num">${String.fromCharCode(65 + i)}</p><h3 class="caps__title">${k}</h3><ul role="list">${list.map((x) => `<li>${x}</li>`).join('')}</ul></div>`,
          )
          .join('')}
      </div>
    </div>
  </section>`;
}

function experienceSection(ctx) {
  return html`
  <section class="experience section section--alt" aria-labelledby="exp-h">
    <div class="wrap">
      ${sectionHead({ num: '05', kicker: 'Experience', title: 'Where I’ve done the work.', id: 'exp-h' })}
      ${timeline(ctx)}
      <div class="btn-row">${cvButton(ctx, 'secondary', 'Download full CV')}</div>
    </div>
  </section>`;
}

function aboutPreview(ctx) {
  return html`
  <section class="about-preview section" aria-labelledby="about-h">
    <div class="wrap about-preview__grid">
      <div class="about-preview__media">${img(ctx, 'about/portrait-spha', 'Portrait of Sphamandla Xaba', { sizes: '(min-width: 1024px) 380px, 70vw' })}</div>
      <div class="about-preview__text">
        <p class="label">06 — About</p>
        <h2 class="about-preview__title" id="about-h">Hi, I’m Sphamandla.</h2>
        <p>I’m a product designer in Johannesburg. I started out designing websites and landing pages for clients at a design studio, and now design enterprise software, mobile apps and websites at Gem Information Systems.</p>
        <p>The work I enjoy most is the messy middle: taking a product with lots of moving parts and finding the structure that makes it feel simple. I like working close to developers, because a design only counts once it works in someone’s hands.</p>
        ${button(ctx, { label: 'More about me', href: 'about/', variant: 'secondary' })}
      </div>
    </div>
  </section>`;
}

export default {
  path: 'index.html',
  page: 'Home',
  navKey: null,
  title: '',
  description:
    'Sphamandla Xaba is a South African Product Designer (UI/UX) designing enterprise systems, mobile applications and digital experiences that make complex workflows simpler.',
  bodyClass: 'page-home',
  render: (ctx) =>
    [hero(ctx), snapshot(), work(ctx), approach(ctx), capabilities(), experienceSection(ctx), aboutPreview(ctx), closingCta(ctx)].join(''),
};
