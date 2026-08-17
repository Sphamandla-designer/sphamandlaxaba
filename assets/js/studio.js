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

/* ── smart preloader: a glass sheet cracks and shatters in 3D ──
   Smart: skips repeat visits in the same session, skips for
   reduced motion, waits for the page to actually load (with a
   minimum dwell and a hard timeout), and can never trap the page
   thanks to a CSS auto-hide fallback. */
(() => {
  'use strict';
  const pre = document.getElementById('preloader');
  if (!pre) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let seen = false;
  try { seen = sessionStorage.getItem('sx-pre') === '1'; sessionStorage.setItem('sx-pre', '1'); } catch (e) {}
  if (reduced || seen) { pre.remove(); return; }

  document.body.style.overflow = 'hidden';
  const started = Date.now();
  const MIN_DWELL = 1200, HARD_CAP = 3200;

  /* impact point, slightly off-centre like a real strike */
  const CX = 54, CY = 44;

  const buildShards = () => {
    const N = 11;
    const angles = [];
    for (let i = 0; i < N; i++) {
      angles.push((i / N) * Math.PI * 2 + (Math.sin(i * 12.9898) * 0.5) * 0.5);
    }
    const ring1 = angles.map((a, i) => [
      CX + Math.cos(a) * (16 + (i % 3) * 7),
      CY + Math.sin(a) * (14 + ((i + 1) % 3) * 6),
    ]);
    const ring2 = angles.map((a, i) => [
      CX + Math.cos(a + 0.16) * 160,
      CY + Math.sin(a + 0.16) * 160,
    ]);
    const frag = document.createDocumentFragment();
    const shards = [];
    const poly = (pts) => pts.map(([x, y]) => x.toFixed(2) + '% ' + y.toFixed(2) + '%').join(', ');
    for (let i = 0; i < N; i++) {
      const j = (i + 1) % N;
      const defs = [
        [[CX, CY], ring1[i], ring1[j]],                    /* inner triangle */
        [ring1[i], ring2[i], ring2[j], ring1[j]],          /* outer slab */
      ];
      defs.forEach((pts, k) => {
        const d = document.createElement('div');
        d.className = 'preloader__shard';
        d.style.clipPath = 'polygon(' + poly(pts) + ')';
        const mx = pts.reduce((s2, p2) => s2 + p2[0], 0) / pts.length;
        const my = pts.reduce((s2, p2) => s2 + p2[1], 0) / pts.length;
        const dx = mx - CX, dy = my - CY;
        const dist = Math.hypot(dx, dy) || 1;
        const power = k === 0 ? 1.4 : 2.4;
        d.dataset.tx = (dx / dist * (26 + dist * power) * 1.6).toFixed(1);
        d.dataset.ty = (dy / dist * (22 + dist * power) * 1.4 + 46).toFixed(1);  /* gravity pulls down */
        d.dataset.tz = (240 + (i % 5) * 130).toFixed(0);
        d.dataset.rx = ((dy / dist) * 70 + (i % 2 ? 24 : -18)).toFixed(0);
        d.dataset.ry = ((dx / dist) * -60 + (i % 3 ? -20 : 26)).toFixed(0);
        d.dataset.delay = (Math.min(dist, 60) * 3.2).toFixed(0);
        frag.appendChild(d);
        shards.push(d);
      });
    }
    pre.insertBefore(frag, document.getElementById('preCracks'));
    return { shards, ring1, ring2 };
  };

  const drawCracks = (ring1, ring2) => {
    const svg = document.getElementById('preCracks');
    const ns = 'http://www.w3.org/2000/svg';
    const add = (x1, y1, x2, y2, delay) => {
      const l = document.createElementNS(ns, 'line');
      l.setAttribute('x1', x1); l.setAttribute('y1', y1);
      l.setAttribute('x2', x2); l.setAttribute('y2', y2);
      l.style.animationDelay = delay + 'ms';
      svg.appendChild(l);
    };
    ring1.forEach(([x, y], i) => {
      add(CX, CY, x, y, i * 12);
      const [ox, oy] = ring2[i];
      add(x, y, ox, oy, 60 + i * 14);
      const [nx, ny] = ring1[(i + 1) % ring1.length];
      add(x, y, nx, ny, 90 + i * 10);
    });
  };

  const shatter = () => {
    const { shards, ring1, ring2 } = buildShards();
    drawCracks(ring1, ring2);
    pre.classList.add('is-cracking');
    setTimeout(() => {
      document.getElementById('prePane').style.display = 'none';
      requestAnimationFrame(() => {
        shards.forEach((d) => {
          d.style.transitionDelay = d.dataset.delay + 'ms, ' + d.dataset.delay + 'ms';
          d.style.transform =
            'translate3d(' + d.dataset.tx + 'vw, ' + d.dataset.ty + 'vh, ' + d.dataset.tz + 'px)' +
            ' rotateX(' + d.dataset.rx + 'deg) rotateY(' + d.dataset.ry + 'deg)';
          d.style.opacity = '0';
        });
      });
      document.body.style.overflow = '';
      setTimeout(() => pre.remove(), 1600);
    }, 320);
  };

  let fired = false;
  const fire = () => {
    if (fired) return;
    fired = true;
    setTimeout(shatter, Math.max(0, MIN_DWELL - (Date.now() - started)));
  };
  if (document.readyState === 'complete') fire();
  else addEventListener('load', fire);
  setTimeout(fire, HARD_CAP);
})();
