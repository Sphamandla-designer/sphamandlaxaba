/* ═══════════════════════════════════════════════════════════
   SPHAMANDLA XABA® — Portfolio 2026 interactions
   GSAP + ScrollTrigger + Lenis choreography
   ═══════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  document.documentElement.classList.add('js');
  gsap.registerPlugin(ScrollTrigger);

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ───────────── smooth scroll ───────────── */
  let lenis = null;
  if (!prefersReduced) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const scrollTo = (target) => {
    if (lenis) lenis.scrollTo(target, { duration: 1.5 });
    else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  };
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        scrollTo(id);
      }
    });
  });

  /* ───────────── clock (SAST) ───────────── */
  const clockEl = $('#clock');
  const clockFoot = $('#clockFoot');
  const dateEl = $('#dateNow');
  const tickClock = () => {
    const now = new Date();
    const time = new Intl.DateTimeFormat('en-ZA', {
      hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Africa/Johannesburg',
    }).format(now).replace(/\s?(am|pm)/i, (m) => m.trim().toLowerCase());
    const date = new Intl.DateTimeFormat('en-ZA', {
      day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Johannesburg',
    }).format(now);
    if (clockEl) clockEl.textContent = time;
    if (clockFoot) clockFoot.textContent = time;
    if (dateEl) dateEl.textContent = date;
  };
  tickClock();
  setInterval(tickClock, 30_000);

  /* ───────────── magnetic elements ───────────── */
  if (!isTouch && !prefersReduced) {
    $$('[data-magnetic]').forEach((el) => {
      const strength = 0.35;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          x: (e.clientX - r.left - r.width / 2) * strength,
          y: (e.clientY - r.top - r.height / 2) * strength,
          duration: 0.5, ease: 'power3.out',
        });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  /* ───────────── tilt cards ───────────── */
  if (!isTouch && !prefersReduced) {
    $$('[data-tilt]').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
        gsap.to(el, { rotateX: rx, rotateY: ry, transformPerspective: 700, duration: 0.5, ease: 'power2.out' });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1, 0.45)' });
      });
    });
  }

  /* ───────────── header hide on scroll ───────────── */
  const header = $('#header');
  let lastY = 0;
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const y = self.scroll();
      header.classList.toggle('is-hidden', y > 140 && y > lastY);
      lastY = y;
    },
  });

  /* ───────────── split helpers ───────────── */
  const splitLines = (el) => {
    // split on <br> boundaries, keep inline markup (em etc.)
    const parts = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = parts
      .map((p) => `<span class="split-line"><span>${p.trim()}</span></span>`)
      .join('');
    return $$('.split-line > span', el);
  };
  const splitWords = (el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w) => `<span class="w">${w}</span>`).join(' ');
    return $$('.w', el);
  };


  /* ───────────── hero widget slider ───────────── */
  const slides = [
    { copy: 'Strategy before<br />screens.' },
    { copy: 'Thinking before<br />designing.' },
    { copy: 'AI + human<br />judgement.' },
    { copy: 'Ship what<br />matters.' },
  ];
  const widgetCopy = $('#widgetCopy');
  const widgetIndex = $('#widgetIndex');
  const widgetBar = $('#widgetBar');
  let slide = 0;
  let slideTimer = null;
  const setSlide = (i, animate = true) => {
    slide = (i + slides.length) % slides.length;
    const apply = () => {
      widgetCopy.innerHTML = slides[slide].copy;
      widgetIndex.textContent = String(slide + 1).padStart(2, '0');
      widgetBar.style.width = `${((slide + 1) / slides.length) * 100}%`;
    };
    if (animate && !prefersReduced) {
      gsap.to(widgetCopy, {
        y: -8, opacity: 0, duration: 0.22, ease: 'power2.in',
        onComplete: () => {
          apply();
          gsap.fromTo(widgetCopy, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' });
        },
      });
    } else apply();
  };
  const armSlideTimer = () => {
    clearInterval(slideTimer);
    if (!prefersReduced) slideTimer = setInterval(() => setSlide(slide + 1), 4200);
  };
  if (widgetCopy) {
    $('#widgetNext')?.addEventListener('click', () => { setSlide(slide + 1); armSlideTimer(); });
    $('#widgetPrev')?.addEventListener('click', () => { setSlide(slide - 1); armSlideTimer(); });
    setSlide(0, false);
    armSlideTimer();
  }

  /* ───────────── intro / loader ───────────── */
  const loader = $('#loader');
  const heroLines = $$('.hero__line em');
  const heroReveals = $$('.hero [data-reveal]');
  const heroBg = $('#heroBg');
  const heroWord = $('#heroWord');
  const heroWidget = $('#heroWidget');

  const heroObjs = $$('.hero__obj');

  if (!prefersReduced) {
    gsap.set(heroLines, { yPercent: 115 });
    gsap.set(heroReveals, { y: 26, opacity: 0 });
    if (heroBg) gsap.set(heroBg, { scale: 1.12, opacity: 0 });
    if (heroWord) gsap.set(heroWord, { yPercent: 30, opacity: 0 });
    if (heroWidget) gsap.set(heroWidget, { y: 30, opacity: 0 });
    if (heroObjs.length) gsap.set(heroObjs, { y: 26, opacity: 0 });
  }

  const introTl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
  if (heroBg) introTl.to(heroBg, { scale: 1, opacity: 1, duration: 2.4, ease: 'power2.out' }, 0);
  if (heroWord) introTl.to(heroWord, { yPercent: 0, opacity: 1, duration: 1.5 }, 0.12);
  introTl
    .to(heroLines, { yPercent: 0, duration: 1.25, stagger: 0.09 }, 0.25)
    .to(heroReveals, { y: 0, opacity: 1, duration: 1, stagger: 0.07 }, 0.55);
  if (heroWidget) introTl.to(heroWidget, { y: 0, opacity: 1, duration: 1 }, 0.7);
  if (heroObjs.length) introTl.to(heroObjs, { y: 0, opacity: 1, duration: 1.4, stagger: 0.18 }, 0.9);

  const finishLoad = () => {
    if (!loader) { introTl.play(); return; }
    if (prefersReduced) {
      loader.remove();
      introTl.progress(1);
      return;
    }
    const tl = gsap.timeline();
    tl.to('#loaderBar', { width: '100%', duration: 0.35, ease: 'power1.inOut' })
      .to('.loader__inner', { y: -26, opacity: 0, duration: 0.45, ease: 'power2.in' })
      .to('.loader__curtain--l', { xPercent: -101, duration: 0.9, ease: 'expo.inOut' }, '-=0.1')
      .to('.loader__curtain--r', { xPercent: 101, duration: 0.9, ease: 'expo.inOut' }, '<')
      .add(() => introTl.play(), '-=0.55')
      .set(loader, { display: 'none' });
  };

  if (loader && !prefersReduced) {
    if (lenis) lenis.stop();
    const counter = { v: 0 };
    const count = $('#loaderCount');
    gsap.to(counter, {
      v: 100,
      duration: 1.4,
      ease: 'power2.inOut',
      onUpdate: () => {
        count.textContent = String(Math.round(counter.v)).padStart(3, '0');
        $('#loaderBar').style.width = `${counter.v}%`;
      },
      onComplete: () => {
        if (lenis) lenis.start();
        finishLoad();
      },
    });
  } else {
    finishLoad();
  }

  /* ───────────── hero parallax ───────────── */
  if (!prefersReduced) {
    // pointer parallax — background drifts against the wordmark
    if (!isTouch && (heroBg || heroWord)) {
      window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        if (heroBg) gsap.to(heroBg, { x: x * 12, y: y * 8, duration: 1.4, ease: 'power2.out' });
        if (heroWord) gsap.to(heroWord, { x: x * -14, duration: 1.3, ease: 'power2.out' });
        if (heroWidget) gsap.to(heroWidget, { x: x * -8, y: y * -6, duration: 1.2, ease: 'power2.out' });
        gsap.to('#heroObjA', { x: x * 24, y: y * 16, duration: 1.6, ease: 'power2.out' });
        gsap.to('#heroObjB', { x: x * -16, y: y * -11, duration: 1.6, ease: 'power2.out' });
      }, { passive: true });
    }
    // scroll parallax
    if (heroBg) gsap.to(heroBg, {
      yPercent: 12, scale: 1.06, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
    });
    if (heroWord) gsap.to(heroWord, {
      yPercent: -40, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('.hero__left', {
      y: -70, opacity: 0.25,
      ease: 'none',
      scrollTrigger: { trigger: '#hero', start: '30% top', end: 'bottom top', scrub: true },
    });
  }

  /* ───────────── cinematic reveals ───────────── */
  if (!prefersReduced) {
    $$('[data-reveal]').forEach((el) => {
      if (el.closest('.hero')) return; // hero handled by intro
      gsap.fromTo(el,
        { y: 40, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
    });

    // grouped staggered reveals (cards, list items)
    $$('[data-reveal-group]').forEach((group) => {
      const kids = [...group.children];
      gsap.fromTo(kids,
        { y: 48, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'expo.out', stagger: 0.09,
          scrollTrigger: { trigger: group, start: 'top 82%' },
        });
    });

    // line-masked titles with a cinematic scale settle
    $$('[data-split]').forEach((el) => {
      const spans = splitLines(el);
      gsap.set(spans, { yPercent: 112 });
      gsap.set(el, { transformOrigin: 'left center' });
      gsap.fromTo(el, { scale: 1.06 }, {
        scale: 1, duration: 1.4, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 86%' },
      });
      gsap.to(spans, {
        yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.09,
        scrollTrigger: { trigger: el, start: 'top 86%' },
      });
    });

    // scroll parallax on decorative / flagged elements
    $$('[data-parallax]').forEach((el) => {
      const depth = parseFloat(el.dataset.parallax) || 0.15;
      gsap.fromTo(el,
        { yPercent: -depth * 60 },
        {
          yPercent: depth * 60, ease: 'none',
          scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true },
        });
    });

    // section-scoped soft-zoom on media (cinematic push-in)
    $$('[data-kenburns] img').forEach((img) => {
      gsap.fromTo(img,
        { scale: 1.12 },
        {
          scale: 1, ease: 'none',
          scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true },
        });
    });
  }

  /* ───────────── marquee (velocity reactive) ───────────── */
  const marqueeRow = $('#marqueeRow');
  if (marqueeRow && !prefersReduced) {
    const third = () => marqueeRow.scrollWidth / 3;
    let x = 0;
    let speed = 1.1;
    gsap.ticker.add(() => {
      x -= speed;
      if (-x >= third()) x += third();
      marqueeRow.style.transform = `translate3d(${x}px,0,0)`;
    });
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        speed = gsap.utils.clamp(0.6, 9, 1.1 + Math.abs(self.getVelocity()) / 260);
      },
    });
  }

  /* ───────────── manifesto word scrub ───────────── */
  const manifesto = $('#manifestoText');
  if (manifesto) {
    const words = splitWords(manifesto);
    if (!prefersReduced) {
      ScrollTrigger.create({
        trigger: manifesto,
        start: 'top 78%',
        end: 'bottom 45%',
        scrub: 0.4,
        onUpdate: (self) => {
          const n = Math.floor(self.progress * words.length);
          words.forEach((w, i) => w.classList.toggle('is-on', i <= n));
        },
      });
    } else {
      words.forEach((w) => w.classList.add('is-on'));
    }
  }

  /* ───────────── stats counters ───────────── */
  $$('.stat__num[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    if (prefersReduced) { el.textContent = target; return; }
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: target, duration: 1.6, ease: 'power3.out',
          onUpdate: () => { el.textContent = Math.round(obj.v); },
        });
      },
    });
  });

  /* ───────────── selected work — auto-slide glass carousel ───────────── */
  const wcViewport = $('#workViewport');
  const wcTrack = $('#workTrack');
  if (wcViewport && wcTrack) {
    let x = 0;
    let speed = 0.55;                 // px per frame, base drift
    let targetSpeed = 0.55;
    let half = wcTrack.scrollWidth / 2; // one full set (track holds two)
    let paused = false;
    let dragging = false;
    let dragStartX = 0;
    let dragStartOffset = 0;
    let lastPointerX = 0;
    let dragVel = 0;

    const measure = () => { half = wcTrack.scrollWidth / 2; };
    window.addEventListener('load', measure);
    window.addEventListener('resize', measure);

    const wrap = () => {
      if (half <= 0) return;
      if (-x >= half) x += half;
      else if (x > 0) x -= half;
    };

    if (!prefersReduced) {
      gsap.ticker.add(() => {
        if (dragging) return;
        speed += (targetSpeed - speed) * 0.06;
        x -= speed;
        wrap();
        wcTrack.style.transform = `translate3d(${x}px,0,0)`;
      });

      // pause on hover
      wcViewport.addEventListener('mouseenter', () => { paused = true; targetSpeed = 0; });
      wcViewport.addEventListener('mouseleave', () => { if (!dragging) { paused = false; targetSpeed = 0.55; } });

      // velocity-reactive to page scroll
      ScrollTrigger.create({
        start: 0, end: 'max',
        onUpdate: (self) => {
          if (paused || dragging) return;
          targetSpeed = gsap.utils.clamp(0.55, 4.5, 0.55 + Math.abs(self.getVelocity()) / 400);
        },
      });

      // drag to explore
      const onDown = (e) => {
        dragging = true;
        wcViewport.classList.add('is-drag');
        dragStartX = lastPointerX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
        dragStartOffset = x;
        dragVel = 0;
      };
      const onMove = (e) => {
        if (!dragging) return;
        const px = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
        dragVel = px - lastPointerX;
        lastPointerX = px;
        x = dragStartOffset + (px - dragStartX);
        wrap();
        wcTrack.style.transform = `translate3d(${x}px,0,0)`;
      };
      const onUp = (e) => {
        if (!dragging) return;
        dragging = false;
        wcViewport.classList.remove('is-drag');
        // suppress click if it was a real drag
        if (Math.abs((e.clientX ?? lastPointerX) - dragStartX) > 6) {
          const kill = (ev) => { ev.preventDefault(); ev.stopPropagation(); wcViewport.removeEventListener('click', kill, true); };
          wcViewport.addEventListener('click', kill, true);
        }
        speed = gsap.utils.clamp(-6, 6, -dragVel);
        if (!paused) targetSpeed = 0.55;
      };
      wcViewport.addEventListener('pointerdown', onDown);
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerup', onUp);
    }

    // reveal cards on entry
    if (!prefersReduced) {
      gsap.fromTo('#workTrack > .wcard',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: 0.06,
          scrollTrigger: { trigger: '#work', start: 'top 78%' },
        });
    }
  }

  if (!prefersReduced) {
    /* services glass cards */
    gsap.fromTo('.service-card',
      { y: 44, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08,
        scrollTrigger: { trigger: '.services__grid', start: 'top 82%' },
      });

    /* footer word */
    const footerWord = $('#footerWord');
    if (footerWord) {
      gsap.fromTo(footerWord,
        { yPercent: 42 },
        {
          yPercent: 12, ease: 'none',
          scrollTrigger: { trigger: '.footer', start: 'top 80%', end: 'bottom bottom', scrub: true },
        });
    }
  }

  /* ───────────── tools & stack marquee ───────────── */
  const stackTrack = $('#stackTrack');
  if (stackTrack) {
    const src = stackTrack.children[0];
    const copy = stackTrack.children[1];
    if (src && copy) copy.innerHTML = src.innerHTML;
    if (!prefersReduced) {
      let x = 0, sp = 0.5, target = 0.5, half = 0;
      const measure = () => { half = stackTrack.scrollWidth / 2; };
      window.addEventListener('load', measure);
      window.addEventListener('resize', measure);
      measure();
      gsap.ticker.add(() => {
        sp += (target - sp) * 0.07;
        x -= sp;
        if (half > 0 && -x >= half) x += half;
        stackTrack.style.transform = `translate3d(${x}px,0,0)`;
      });
      const vp = $('#stackViewport');
      vp.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') target = 0.07; });
      vp.addEventListener('pointerleave', () => { target = 0.5; });
      vp.addEventListener('touchstart', () => { target = 0; }, { passive: true });
      vp.addEventListener('touchend', () => { target = 0.5; }, { passive: true });
    }
  }

  /* ───────────── active nav link ───────────── */
  const navLinks = $$('.header__link');
  const sections = ['#hero', '#work', '#about', '#services', '#contact'];
  const linkFor = { '#hero': '#top', '#work': '#work', '#about': '#about', '#services': '#services', '#contact': '#contact' };
  sections.forEach((sel) => {
    const el = document.querySelector(sel);
    if (!el) return;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 45%',
      end: 'bottom 45%',
      onToggle: (self) => {
        if (!self.isActive) return;
        navLinks.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === linkFor[sel]));
      },
    });
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
