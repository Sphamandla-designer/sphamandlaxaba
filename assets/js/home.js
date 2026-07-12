/* ═══════════════════════════════════════════════════════════
   SPHAMANDLA XABA® — portfolio v2 interactions
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

  /* ───────────── clock + date (SAST) ───────────── */
  const clock = document.getElementById('clock');
  const dateNow = document.getElementById('dateNow');
  if (clock) {
    const tick = () => {
      const now = new Date();
      clock.textContent = `${now.toLocaleTimeString('en-ZA', {
        timeZone: 'Africa/Johannesburg', hour12: false, hour: '2-digit', minute: '2-digit',
      })} SAST`;
      if (dateNow) {
        dateNow.textContent = now.toLocaleDateString('en-ZA', {
          timeZone: 'Africa/Johannesburg', day: 'numeric', month: 'long', year: 'numeric',
        });
      }
    };
    tick();
    setInterval(tick, 30000);
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

  /* ───────────── hero intro ───────────── */
  const heroIntro = () => {
    const tl = gsap.timeline();
    tl.to('.hero__title .line-inner', { y: 0, duration: 1.1, ease: 'power4.out', stagger: 0.09 })
      .from('.hero__eyebrow', { autoAlpha: 0, y: 14, duration: 0.6, ease: 'power2.out' }, '-=0.8')
      .from('.hero__figure', { yPercent: 16, autoAlpha: 0, duration: 1.3, ease: 'power3.out' }, '-=1.05')
      .from('.hero__wordmark span', { yPercent: 60, autoAlpha: 0, duration: 1.2, ease: 'power3.out' }, '-=1.15')
      .from('.hero__proof, .hero__actions', { autoAlpha: 0, y: 18, duration: 0.6, ease: 'power2.out', stagger: 0.08 }, '-=0.7')
      .from('.hero__right > *', { autoAlpha: 0, x: 26, duration: 0.7, ease: 'power3.out', stagger: 0.1 }, '-=0.6')
      .from('.hero__strip', { autoAlpha: 0, y: 20, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from('.header', { autoAlpha: 0, y: -16, duration: 0.6 }, '-=0.6');
    return tl;
  };

  /* ───────────── preloader ───────────── */
  const loader = document.getElementById('loader');
  if (loader && !prefersReduced) {
    document.body.classList.add('is-locked');
    const count = document.getElementById('loaderCount');
    const bar = document.getElementById('loaderBar');
    const state = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove('is-locked');
        loader.remove();
        ScrollTrigger.refresh();
      },
    });
    tl.to('#loaderWordA', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.15)
      .to('#loaderWordB', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.35)
      .to(state, {
        v: 100, duration: 2.3, ease: 'power2.inOut',
        onUpdate: () => {
          count.textContent = String(Math.round(state.v)).padStart(3, '0');
          bar.style.width = `${state.v}%`;
        },
      }, 0.2)
      .to('.loader__inner', { autoAlpha: 0, scale: 0.96, duration: 0.45, ease: 'power2.in' }, '+=0.2')
      .to('.loader__panel--l', { xPercent: -101, duration: 0.85, ease: 'power4.inOut' }, '<0.15')
      .to('.loader__panel--r', { xPercent: 101, duration: 0.85, ease: 'power4.inOut' }, '<')
      .add(heroIntro(), '-=0.4');
  } else if (loader) {
    loader.remove();
    gsap.set('.hero__title .line-inner', { y: 0 });
  }

  /* ───────────── header theme ───────────── */
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

  /* ───────────── nav active link ───────────── */
  const navLinks = [...document.querySelectorAll('.header__link')];
  const sectionsForNav = navLinks
    .map((l) => ({ link: l, sec: document.querySelector(l.getAttribute('href')) }))
    .filter((x) => x.sec);
  sectionsForNav.forEach(({ link, sec }) => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 45%',
      end: 'bottom 45%',
      onToggle: (self) => {
        if (self.isActive) {
          navLinks.forEach((l) => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      },
    });
  });

  /* ───────────── overlay menu (drawer) ───────────── */
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  if (burger && menu) {
    let open = false;
    const words = menu.querySelectorAll('.menu__word');
    const menuTl = gsap.timeline({ paused: true })
      .set(menu, { visibility: 'visible' })
      .to('.menu__scrim', { opacity: 1, duration: 0.4 }, 0)
      .fromTo('.menu__panel', { xPercent: 102 }, { xPercent: 0, duration: 0.65, ease: 'power4.inOut' }, 0)
      .to(words, { y: 0, duration: 0.6, ease: 'power4.out', stagger: 0.05 }, 0.25)
      .to('.menu__foot', { opacity: 1, duration: 0.4 }, 0.55);
    const setOpen = (v) => {
      open = v;
      burger.classList.toggle('is-open', v);
      burger.setAttribute('aria-expanded', String(v));
      menu.setAttribute('aria-hidden', String(!v));
      menu.classList.toggle('is-open', v);
      if (v) { menuTl.timeScale(1).play(); lenis?.stop(); }
      else { menuTl.timeScale(1.5).reverse(); lenis?.start(); }
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
    ScrollTrigger.create({ onUpdate: (self) => { velo = self.getVelocity() / 1200; } });
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

  /* ───────────── hero parallax (mouse + scroll) ───────────── */
  if (!prefersReduced && !isTouch) {
    const fig = document.getElementById('heroFigure');
    const mark = document.getElementById('heroWordmark');
    const card = document.getElementById('glassCard');
    const figX = gsap.quickTo(fig, 'x', { duration: 0.9, ease: 'power3.out' });
    const markX = gsap.quickTo(mark, 'x', { duration: 1.1, ease: 'power3.out' });
    const cardX = gsap.quickTo(card, 'x', { duration: 0.8, ease: 'power3.out' });
    const cardY = gsap.quickTo(card, 'y', { duration: 0.8, ease: 'power3.out' });
    window.addEventListener('mousemove', (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      figX(nx * -14);
      markX(nx * 26);
      cardX(nx * -10);
      cardY(ny * -8);
    }, { passive: true });
  }
  if (!prefersReduced) {
    gsap.to('.hero__figure', {
      yPercent: 12, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 20%', scrub: true },
    });
    gsap.to('.hero__wordmark', {
      yPercent: 40, autoAlpha: 0.3, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 30%', scrub: true },
    });
    gsap.to('.hero__left, .hero__right', {
      autoAlpha: 0, y: -40, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: '12% top', end: '55% top', scrub: true },
    });
    gsap.to('.hero__video', {
      scale: 1.1, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
    // glass card progress bar loop
    gsap.fromTo('#glassBar', { xPercent: -110 }, {
      xPercent: 340, duration: 2.6, ease: 'power1.inOut', repeat: -1, repeatDelay: 0.6,
    });
  }
  document.getElementById('scrollDown')?.addEventListener('click', () => scrollTo('#manifesto'));

  /* ───────────── manifesto word scrub ───────────── */
  const manifesto = document.getElementById('manifestoText');
  if (manifesto) {
    const words = splitWords(manifesto);
    if (!prefersReduced) {
      gsap.to(words, {
        opacity: 1, stagger: 0.06, ease: 'none',
        scrollTrigger: { trigger: manifesto, start: 'top 78%', end: 'bottom 45%', scrub: 0.6 },
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
    if (el.closest('.hero')) return; // hero handled by intro timeline
    gsap.to(el, {
      y: 0, duration: 1.1, ease: 'power4.out',
      scrollTrigger: { trigger: el.closest('section') || el, start: 'top 75%' },
    });
  });

  /* ───────────── stat counters ───────────── */
  document.querySelectorAll('.stat__num').forEach((el) => {
    const target = parseFloat(el.dataset.count || '0');
    const suffix = el.dataset.suffix || '';
    const state = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter: () => gsap.to(state, {
        v: target, duration: 1.6, ease: 'power2.out',
        onUpdate: () => { el.textContent = `${Math.round(state.v)}${suffix}`; },
      }),
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

  /* ───────────── expertise hover preview + accordion ───────────── */
  const preview = document.getElementById('xpPreview');
  const previewImg = document.getElementById('xpPreviewImg');
  if (preview && !isTouch && !prefersReduced) {
    const px = gsap.quickTo(preview, 'x', { duration: 0.5, ease: 'power3.out' });
    const py = gsap.quickTo(preview, 'y', { duration: 0.5, ease: 'power3.out' });
    const list = document.getElementById('xpList');
    list.addEventListener('mousemove', (e) => {
      px(e.clientX + 30);
      py(e.clientY - 100);
    });
    document.querySelectorAll('.xp').forEach((xp) => {
      xp.addEventListener('mouseenter', () => {
        previewImg.src = xp.dataset.preview;
        gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power3.out' });
      });
      xp.addEventListener('mouseleave', () => {
        gsap.to(preview, { autoAlpha: 0, scale: 0.9, duration: 0.3, ease: 'power2.in' });
      });
    });
  }
  document.querySelectorAll('.xp').forEach((xp) => {
    xp.querySelector('.xp__row').addEventListener('click', () => {
      document.querySelectorAll('.xp.is-open').forEach((o) => { if (o !== xp) o.classList.remove('is-open'); });
      xp.classList.toggle('is-open');
    });
  });

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

  /* ───────────── footer title + wordmark ───────────── */
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
