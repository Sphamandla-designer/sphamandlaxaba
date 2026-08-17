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

/* ── mockup carousel: large image, arrows, dots, smooth auto-advance ── */
(() => {
  'use strict';
  const track = document.getElementById('carTrack');
  if (!track) return;
  const slides = [...track.children];
  const dotsBox = document.getElementById('carDots');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let i = 0, timer = null;

  slides.forEach((_, n) => {
    const d = document.createElement('button');
    d.className = 'car__dot' + (n === 0 ? ' is-on' : '');
    d.setAttribute('aria-label', 'Go to mockup ' + (n + 1));
    d.addEventListener('click', () => { go(n); restart(); });
    dotsBox.appendChild(d);
  });
  const dots = [...dotsBox.children];

  const go = (n) => {
    i = (n + slides.length) % slides.length;
    track.style.transform = 'translateX(' + (-i * 100) + '%)';
    dots.forEach((d, k) => d.classList.toggle('is-on', k === i));
  };
  const restart = () => {
    if (reduced) return;
    clearInterval(timer);
    timer = setInterval(() => go(i + 1), 4500);
  };

  document.getElementById('carPrev').addEventListener('click', () => { go(i - 1); restart(); });
  document.getElementById('carNext').addEventListener('click', () => { go(i + 1); restart(); });
  const car = document.getElementById('car');
  car.addEventListener('mouseenter', () => clearInterval(timer));
  car.addEventListener('mouseleave', restart);

  /* swipe */
  let x0 = null;
  car.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  car.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) { go(i + (dx < 0 ? 1 : -1)); restart(); }
    x0 = null;
  }, { passive: true });

  restart();
})();
