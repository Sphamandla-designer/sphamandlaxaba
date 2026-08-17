/* ═══════════════════════════════════════════════════════════
   SPHAMANDLA XABA® — studio interactions
   Lenis smooth scrolling, pinned horizontal case-study rail
   (GSAP ScrollTrigger), reveals, nav + drawer.
   ═══════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;

  /* year */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* nav shadow */
  const nav = $('#nav');
  addEventListener('scroll', () => nav.classList.toggle('is-stuck', scrollY > 12), { passive: true });

  /* drawer */
  const drawer = $('#drawer');
  const burger = $('#burger');
  const setDrawer = (open) => {
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setDrawer(true));
  $$('[data-close]', drawer).forEach((el) => el.addEventListener('click', () => setDrawer(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setDrawer(false); });

  /* ── smooth scrolling (Lenis) + GSAP ScrollTrigger ── */
  const hasGsap = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  let lenis = null;

  if (!reduced && typeof Lenis !== 'undefined' && hasGsap) {
    gsap.registerPlugin(ScrollTrigger);
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1.0 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* anchor links play nice with Lenis */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.getElementById(a.getAttribute('href').slice(1));
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -96, duration: 1.4 });
      else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    });
  });

  /* ── pinned horizontal case-study rail (Trionn-style) ── */
  const work = $('#work');
  const track = $('#workTrack');
  const pinOK = hasGsap && !reduced && !coarse && innerWidth >= 1024;

  if (pinOK && work && track) {
    const amount = () => Math.max(0, track.scrollWidth - innerWidth + 2 * parseFloat(getComputedStyle(track).paddingLeft));
    gsap.to(track, {
      x: () => -amount(),
      ease: 'none',
      scrollTrigger: {
        trigger: '#workpin',
        start: 'top top',
        end: () => '+=' + amount(),
        scrub: 1.1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    addEventListener('load', () => ScrollTrigger.refresh());
  } else if (work) {
    work.classList.add('no-pin');
  }

  /* ── reveals ── */
  if (!reduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    $$('.rv').forEach((el) => io.observe(el));
  } else {
    $$('.rv').forEach((el) => el.classList.add('is-in'));
  }

  /* scrollspy */
  const spyIds = ['work', 'what', 'capabilities', 'about', 'contact'];
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          $$('.nav__link').forEach((l) => l.classList.toggle('is-active', l.dataset.spy === en.target.id));
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    spyIds.map((id) => document.getElementById(id)).filter(Boolean).forEach((s) => spy.observe(s));
  }
})();

/* ── extruded 3D "S": stacked layers spun with preserve-3d ── */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.s-img').forEach((img) => {
    const LAYERS = 12;
    const wrap = document.createElement('div');
    wrap.className = 's3d' + (reduced ? ' s3d--still' : '');
    wrap.setAttribute('aria-hidden', 'true');
    img.parentNode.replaceChild(wrap, img);
    for (let k = 0; k < LAYERS; k++) {
      const layer = img.cloneNode();
      layer.className = 's3d__layer ' + (k === LAYERS - 1 ? 's3d__layer--front' : 's3d__layer--body');
      layer.style.transform = 'translateZ(' + ((k - (LAYERS - 1) / 2) * 2.4).toFixed(1) + 'px)';
      layer.removeAttribute('id');
      wrap.appendChild(layer);
    }
  });
})();
