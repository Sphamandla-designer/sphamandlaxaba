/* ═══════════════════════════════════════════════════════════
   SPHAMANDLA XABA® — portfolio interactions
   GSAP + ScrollTrigger + Lenis
   ═══════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  /* ───────────── split helpers ───────────── */
  const splitChars = (el) => {
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach((ch) => {
      const s = document.createElement('span');
      s.className = 'char';
      s.innerHTML = ch === ' ' ? '&nbsp;' : ch;
      el.appendChild(s);
    });
    return el.querySelectorAll('.char');
  };
  const splitWords = (el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((w, i) => {
      const s = document.createElement('span');
      s.className = 'word';
      s.textContent = w;
      el.appendChild(s);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
    return el.querySelectorAll('.word');
  };

  document.querySelectorAll('[data-split-chars]').forEach(splitChars);

  /* ───────────── smooth scroll ───────────── */
  let lenis = null;
  if (!prefersReduced) {
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const scrollTo = (target) => {
    if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.6 });
    else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  };
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        scrollTo(id);
      }
    });
  });

  /* ───────────── clock (SAST) ───────────── */
  const clock = document.getElementById('clock');
  if (clock) {
    const tick = () => {
      const t = new Date().toLocaleTimeString('en-ZA', {
        timeZone: 'Africa/Johannesburg', hour12: false,
        hour: '2-digit', minute: '2-digit', second: '2-digit',
      });
      clock.textContent = `${t} SAST`;
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ───────────── custom cursor ───────────── */
  const cursor = document.getElementById('cursor');
  if (cursor && !isTouch) {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    const label = document.getElementById('cursorLabel');
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });
    window.addEventListener('mousemove', (e) => {
      cursor.classList.add('is-live');
      dotX(e.clientX); dotY(e.clientY);
      ringX(e.clientX); ringY(e.clientY);
    });
    document.querySelectorAll('[data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        label.textContent = el.dataset.cursor || 'View';
        cursor.classList.add('is-hover');
      });
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });
  }

  /* ───────────── magnetic elements ───────────── */
  if (!isTouch && !prefersReduced) {
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.35);
        yTo((e.clientY - r.top - r.height / 2) * 0.35);
      });
      el.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
    });
  }

  /* ───────────── preloader ───────────── */
  const loader = document.getElementById('loader');
  const heroChars = document.querySelectorAll('.hero__title .char');
  const heroIntro = () => {
    const tl = gsap.timeline();
    tl.to(heroChars, {
      y: 0, duration: 1.1, ease: 'power4.out',
      stagger: { each: 0.035, from: 'start' },
    })
      .from('.hero__eyebrow', { autoAlpha: 0, y: 16, duration: 0.7, ease: 'power2.out' }, '-=0.7')
      .from('.hero__blurb, .hero__status', { autoAlpha: 0, y: 20, duration: 0.7, ease: 'power2.out', stagger: 0.08 }, '-=0.5')
      .from('.hero__scroll, .hero__ticker', { autoAlpha: 0, duration: 0.8 }, '-=0.4');
    return tl;
  };

  if (loader && !prefersReduced) {
    document.body.classList.add('is-locked');
    const count = document.getElementById('loaderCount');
    const bar = document.getElementById('loaderBar');
    const roles = loader.querySelectorAll('[data-loader-role]');
    const state = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove('is-locked');
        loader.remove();
        ScrollTrigger.refresh();
      },
    });
    tl.to('.ln-char', { y: 0, duration: 0.9, ease: 'power4.out', stagger: 0.05 }, 0.2);
    roles.forEach((r, i) => {
      tl.to(r, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.5 + i * 0.75)
        .to(r, { opacity: 0, y: '-0.6rem', duration: 0.35, ease: 'power2.in' }, 0.5 + i * 0.75 + 0.55);
    });
    tl.to(state, {
      v: 100, duration: 2.6, ease: 'power2.inOut',
      onUpdate: () => {
        count.textContent = String(Math.round(state.v)).padStart(3, '0');
        bar.style.width = `${state.v}%`;
      },
    }, 0.15);
    tl.to('.loader__inner', { autoAlpha: 0, y: -30, duration: 0.5, ease: 'power2.in' }, '+=0.15')
      .to('.loader__panel--a', { yPercent: -101, duration: 0.9, ease: 'power4.inOut' }, '<0.2')
      .to('.loader__panel--b', { yPercent: 101, duration: 0.9, ease: 'power4.inOut' }, '<')
      .add(heroIntro(), '-=0.45');
  } else if (loader) {
    loader.remove();
    gsap.set(heroChars, { y: 0 });
  }

  /* ───────────── header theme + hide on scroll down ───────────── */
  const header = document.getElementById('header');
  document.querySelectorAll('[data-header-theme]').forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 60px',
      end: 'bottom 60px',
      onToggle: (self) => {
        if (self.isActive) header.classList.toggle('on-light', sec.dataset.headerTheme === 'light');
      },
    });
  });

  /* ───────────── overlay menu ───────────── */
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  if (burger && menu) {
    let open = false;
    const words = menu.querySelectorAll('.menu__word');
    const foot = menu.querySelector('.menu__foot');
    const menuTl = gsap.timeline({ paused: true })
      .set(menu, { visibility: 'visible' })
      .to('.menu__bg', { yPercent: 101, duration: 0.7, ease: 'power4.inOut' })
      .to(words, { y: 0, duration: 0.7, ease: 'power4.out', stagger: 0.06 }, '-=0.25')
      .to(foot, { opacity: 1, duration: 0.5 }, '-=0.4');
    const setOpen = (v) => {
      open = v;
      burger.classList.toggle('is-open', v);
      burger.setAttribute('aria-expanded', String(v));
      menu.setAttribute('aria-hidden', String(!v));
      menu.classList.toggle('is-open', v);
      if (v) { menuTl.timeScale(1).play(); lenis?.stop(); }
      else { menuTl.timeScale(1.6).reverse(); lenis?.start(); }
    };
    burger.addEventListener('click', () => setOpen(!open));
    menu.querySelectorAll('[data-menu-close]').forEach((a) =>
      a.addEventListener('click', () => setOpen(false)));
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) setOpen(false); });
  }

  /* ───────────── tickers (velocity-reactive) ───────────── */
  const tickers = [...document.querySelectorAll('[data-ticker]')].map((el) => ({
    track: el.querySelector('.ticker__track'),
    speed: parseFloat(el.dataset.speed || '1'),
    x: 0, half: 0,
  }));
  const measure = () => tickers.forEach((t) => { t.half = t.track.scrollWidth / 2; });
  measure();
  window.addEventListener('resize', measure);
  let velo = 0;
  if (!prefersReduced) {
    ScrollTrigger.create({
      onUpdate: (self) => { velo = self.getVelocity() / 1200; },
    });
    gsap.ticker.add(() => {
      const boost = gsap.utils.clamp(-4, 4, velo);
      velo *= 0.92;
      tickers.forEach((t) => {
        if (!t.half) return;
        t.x -= (t.speed + boost * t.speed) * 1.1;
        const m = ((t.x % t.half) + t.half) % t.half;
        t.track.style.transform = `translate3d(${-m}px,0,0)`;
      });
    });
  }

  /* ───────────── hero scroll-out ───────────── */
  if (!prefersReduced) {
    gsap.to('.hero__content', {
      yPercent: -18, autoAlpha: 0.25, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 30%', scrub: true },
    });
    gsap.to('.hero__video', {
      scale: 1.12, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  /* ───────────── manifesto word scrub ───────────── */
  const manifesto = document.getElementById('manifestoText');
  if (manifesto) {
    const words = splitWords(manifesto);
    if (!prefersReduced) {
      gsap.to(words, {
        opacity: 1, stagger: 0.06, ease: 'none',
        scrollTrigger: {
          trigger: manifesto,
          start: 'top 78%',
          end: 'bottom 45%',
          scrub: 0.6,
        },
      });
    } else {
      gsap.set(words, { opacity: 1 });
    }
  }

  /* ───────────── generic reveals + line masks ───────────── */
  document.querySelectorAll('.reveal').forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%' },
    });
  });
  document.querySelectorAll('.line-mask .line-inner').forEach((el) => {
    gsap.to(el, {
      y: 0, duration: 1.1, ease: 'power4.out',
      scrollTrigger: { trigger: el.closest('section') || el, start: 'top 75%' },
    });
  });

  /* ───────────── horizontal work gallery ───────────── */
  const track = document.getElementById('workTrack');
  if (track && !prefersReduced) {
    const getAmount = () => track.scrollWidth - window.innerWidth;
    const horiz = gsap.to(track, {
      x: () => -getAmount(),
      ease: 'none',
      scrollTrigger: {
        trigger: '.work',
        start: 'top top',
        end: () => `+=${getAmount()}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    // inner image parallax against the horizontal movement
    document.querySelectorAll('.wcard__img').forEach((img) => {
      gsap.fromTo(img, { xPercent: -6 }, {
        xPercent: 6, ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.wcard'),
          containerAnimation: horiz,
          start: 'left right',
          end: 'right left',
          scrub: true,
        },
      });
    });
  }

  /* ───────────── principles stacked cards ───────────── */
  if (!prefersReduced) {
    const cards = gsap.utils.toArray('.pcard');
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      gsap.to(card, {
        scale: 0.92 - (cards.length - 1 - i) * 0.008,
        autoAlpha: 0.55,
        transformOrigin: 'center top',
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top 16%',
          end: () => `+=${window.innerHeight * 0.6}`,
          scrub: true,
        },
      });
    });
  }

  /* ───────────── expertise accordion (touch) ───────────── */
  document.querySelectorAll('.xp').forEach((xp) => {
    xp.querySelector('.xp__row').addEventListener('click', () => {
      document.querySelectorAll('.xp.is-open').forEach((o) => { if (o !== xp) o.classList.remove('is-open'); });
      xp.classList.toggle('is-open');
    });
  });

  /* ───────────── brand card tilt ───────────── */
  if (!isTouch && !prefersReduced) {
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' });
      const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 7);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 7);
      });
      card.addEventListener('mouseleave', () => { rx(0); ry(0); });
    });
  }

  /* ───────────── footer title reveal + wordmark drift ───────────── */
  if (!prefersReduced) {
    const footChars = document.querySelectorAll('.footer__title .char');
    gsap.set(footChars, { y: '115%' });
    gsap.to(footChars, {
      y: 0, duration: 1, ease: 'power4.out', stagger: 0.025,
      scrollTrigger: { trigger: '.footer__cta', start: 'top 60%' },
    });
    gsap.fromTo('.footer__wordmark span', { yPercent: 40 }, {
      yPercent: 0, ease: 'none',
      scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true },
    });
  }
  document.getElementById('badge')?.addEventListener('click', () => scrollTo('#top'));

  /* ───────────── videos: play only in view ───────────── */
  document.querySelectorAll('video').forEach((v) => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) v.play().catch(() => {});
        else v.pause();
      });
    }, { threshold: 0.08 });
    io.observe(v);
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
