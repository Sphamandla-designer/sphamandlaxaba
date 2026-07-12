/* GEMIS — ManaGem platform story: chapter scene choreography */
(function () {
  if (!document.body.classList.contains('page-managem')) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mm = gsap.matchMedia();

  /* chapter copy reveals */
  document.querySelectorAll('.ch__copy').forEach((copy) => {
    const inners = copy.querySelectorAll('.line-inner');
    if (reduced) { gsap.set(inners, { y: 0, yPercent: 0 }); return; }
    gsap.set(inners, { y: 0, yPercent: 110 });
    gsap.timeline({ scrollTrigger: { trigger: copy, start: 'top 72%' } })
      .from(copy.querySelector('.ch__kicker'), { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, 0)
      .to(inners, { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.12 }, 0.1)
      .from(copy.querySelector('.ch__text'), { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, 0.45)
      .from(copy.querySelector('.ch__caption'), { opacity: 0, duration: 0.8 }, 0.8);
  });

  if (reduced) {
    document.querySelectorAll('.gwin, .pcard, .aibub, .mch5__actions, .glass--sat').forEach((el) => { el.style.opacity = 1; });
    document.querySelectorAll('#modList li').forEach((li) => li.classList.add('is-on'));
    document.querySelectorAll('#netNodes circle').forEach((c) => { c.style.opacity = 1; });
    return;
  }

  const splits = gsap.utils.toArray('.mch1__split');
  splits.forEach((p) => {
    const len = p.getTotalLength();
    p.style.strokeDasharray = `${len}`;
    p.style.strokeDashoffset = `${len}`;
  });

  mm.add('(min-width: 821px)', () => {

    /* ── MCH1: one stream fragments into many ── */
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: '.mch1', start: 'top top', end: '+=200%',
        scrub: 0.6, pin: '.mch1__pin', anticipatePin: 1,
      },
    });
    tl1.to(splits, { strokeDashoffset: 0, ease: 'none', duration: 2.4, stagger: 0.3 }, 0.4);
    gsap.utils.toArray('.gwin').forEach((win, i) => {
      tl1.fromTo(win, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, 0.9 + i * 0.5)
        .to(win, { y: (i % 2 ? -22 : 22), rotate: (i % 2 ? 2.5 : -2.5), duration: 1.6, ease: 'none' }, 2.6);
    });
    tl1.to('.ch__scrollhint', { opacity: 0, duration: 0.4 }, 0.4);

    /* ── MCH2: enterprise chaos accumulates ── */
    const pcards = gsap.utils.toArray('.mch2 .pcard');
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.mch2', start: 'top top', end: '+=200%',
        scrub: 0.6, pin: '.mch2 .ch2__pin', anticipatePin: 1,
      },
    });
    pcards.forEach((card, i) => {
      tl2.fromTo(card,
        { opacity: 0, y: 90, rotate: (i % 2 ? 12 : -10) },
        { opacity: 1, y: 0, rotate: gsap.utils.random(-6, 6), duration: 0.5, ease: 'power2.out' },
        i * 0.34);
    });
    tl2.to('#mch2Stage', { scale: 1.06, ease: 'none', duration: 3.2 }, 0);

    /* ── MCH3: workshops → architecture → platform ── */
    gsap.timeline({
      scrollTrigger: {
        trigger: '.mch3', start: 'top top', end: '+=220%',
        scrub: 0.6, pin: '.mch3 .ch3__pin', anticipatePin: 1,
      },
    })
      .fromTo('.mch3 .ch3__stage--journey', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.1)
      .to('.mch3 .ch3__stage--journey', { opacity: 0, y: -24, duration: 0.6 }, 1.4)
      .fromTo('.mch3 .ch3__stage--wire', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 1.8)
      .to('.mch3 .ch3__stage--wire', { opacity: 0, y: -24, duration: 0.6 }, 3.0)
      .fromTo('.mch3 .ch3__stage--ui', { opacity: 0, y: 30, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.9 }, 3.4);

    /* ── MCH4: the reveal + module walkthrough ── */
    const mods = gsap.utils.toArray('#modList li');
    const panels = gsap.utils.toArray('.mmod');
    let liveMod = 0;
    function showMod(idx) {
      if (idx === liveMod) return;
      panels[liveMod] && panels[liveMod].classList.remove('is-live');
      panels[idx] && panels[idx].classList.add('is-live');
      gsap.fromTo(panels[idx], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
      liveMod = idx;
    }
    gsap.timeline({
      scrollTrigger: {
        trigger: '.mch4', start: 'top top', end: '+=380%',
        scrub: 0.6, pin: '.mch4__pin', anticipatePin: 1,
        onUpdate: (self) => {
          const assembleEnd = 0.22;
          if (self.progress > assembleEnd) {
            const step = Math.min(mods.length - 1,
              Math.floor(((self.progress - assembleEnd) / (1 - assembleEnd)) * mods.length));
            mods.forEach((li, i) => li.classList.toggle('is-on', i <= step));
            showMod(step);
          } else {
            mods.forEach((li, i) => li.classList.toggle('is-on', i === 0));
            showMod(0);
          }
        },
      },
    })
      .fromTo('#mcore', { y: 140, opacity: 0, rotateX: 18 }, { y: 0, opacity: 1, rotateX: 0, duration: 1.6, ease: 'power2.out' }, 0)
      .fromTo('.glass--sat1', { opacity: 0, x: -120, y: -60 }, { opacity: 1, x: 0, y: 0, duration: 0.8 }, 0.7)
      .fromTo('.glass--sat2', { opacity: 0, x: 120, y: -60 }, { opacity: 1, x: 0, y: 0, duration: 0.8 }, 0.9)
      .fromTo('.glass--sat3', { opacity: 0, x: -120, y: 60 }, { opacity: 1, x: 0, y: 0, duration: 0.8 }, 1.1)
      .fromTo('.glass--sat4', { opacity: 0, x: 120, y: 60 }, { opacity: 1, x: 0, y: 0, duration: 0.8 }, 1.3);

    /* mouse depth on the platform stage */
    const stage = document.getElementById('mstage');
    const core = document.getElementById('mcore');
    if (stage && core) {
      const rx = gsap.quickTo(core, 'rotationX', { duration: 0.7, ease: 'power2.out' });
      const ry = gsap.quickTo(core, 'rotationY', { duration: 0.7, ease: 'power2.out' });
      stage.closest('.mch4__pin').addEventListener('pointermove', (e) => {
        const r = stage.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 7);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 6);
      });
    }

    /* ── MCH5: copilot conversation + pipeline ── */
    const pipe = document.getElementById('pipePath');
    gsap.timeline({
      scrollTrigger: {
        trigger: '.mch5', start: 'top top', end: '+=160%',
        scrub: 0.6, pin: '.mch5__pin', anticipatePin: 1,
      },
    })
      .fromTo('.aibub--user', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5 }, 0.2)
      .fromTo('.aibub--ai', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5 }, 0.9)
      .fromTo('.mch5__actions', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 1.6)
      .to(pipe, { strokeDashoffset: 0, ease: 'none', duration: 1.6 }, 1.9);

    /* ── MCH6: network assembles ── */
    gsap.timeline({
      scrollTrigger: {
        trigger: '.mch6', start: 'top top', end: '+=180%',
        scrub: 0.6, pin: '.mch6__pin', anticipatePin: 1,
      },
    })
      .to('#netLines path', { strokeDashoffset: 0, ease: 'none', duration: 2, stagger: 0.18 }, 0.3)
      .to('#netNodes circle', { opacity: 1, duration: 0.4, stagger: 0.14 }, 0.8);

    return () => {};
  });

  /* mobile: unpinned, everything simply reveals */
  mm.add('(max-width: 820px)', () => {
    gsap.set(splits, { strokeDashoffset: 0 });
    document.querySelectorAll('.gwin, .glass--sat').forEach((el, i) => {
      gsap.fromTo(el, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7,
        scrollTrigger: { trigger: el.closest('.ch'), start: `top+=${i * 50} 78%` },
      });
    });
    gsap.utils.toArray('.mch2 .pcard').forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.7,
        scrollTrigger: { trigger: '.mch2', start: `top+=${i * 60} 80%` },
      });
    });
    gsap.set('.mch3 .ch3__stage--ui', { opacity: 1 });
    document.querySelectorAll('#modList li').forEach((li) => li.classList.add('is-on'));
    gsap.set('#mcore', { opacity: 1, y: 0 });
    gsap.set('.aibub, .mch5__actions', { opacity: 1 });
    const pipe = document.getElementById('pipePath');
    if (pipe) { pipe.style.strokeDasharray = 'none'; pipe.style.strokeDashoffset = 0; }
    gsap.set('#netLines path', { strokeDashoffset: 0 });
    gsap.set('#netNodes circle', { opacity: 1 });
  });
})();
