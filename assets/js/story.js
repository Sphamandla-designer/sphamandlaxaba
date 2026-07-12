/* GEMIS — WasteMart transformation story: chapter scene choreography */
(function () {
  if (!document.body.classList.contains('page-story')) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mm = gsap.matchMedia();

  /* shared: chapter copy reveals (all breakpoints) */
  document.querySelectorAll('.ch__copy').forEach((copy) => {
    const inners = copy.querySelectorAll('.line-inner');
    if (reduced) { gsap.set(inners, { y: 0, yPercent: 0 }); return; }
    gsap.set(inners, { y: 0, yPercent: 110 });
    gsap.timeline({
      scrollTrigger: { trigger: copy, start: 'top 72%' },
    })
      .from(copy.querySelector('.ch__kicker'), { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, 0)
      .to(inners, { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.12 }, 0.1)
      .from(copy.querySelector('.ch__text'), { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, 0.45)
      .from(copy.querySelector('.ch__caption'), { opacity: 0, duration: 0.8 }, 0.8);
  });

  if (reduced) return; // scenes stay static under reduced motion

  mm.add('(min-width: 821px)', () => {

    /* ── CH1: sunrise + truck route ── */
    gsap.timeline({
      scrollTrigger: {
        trigger: '.ch1', start: 'top top', end: '+=220%',
        scrub: 0.6, pin: '.ch1__pin', anticipatePin: 1,
      },
    })
      .to('.ch1__sky--dawn', { opacity: 1, ease: 'none', duration: 3 }, 0)
      .to('.ch1__sun', { y: 0, ease: 'none', duration: 3 }, 0)
      .to('.ch1__layer--far', { xPercent: -3, ease: 'none', duration: 4 }, 0)
      .to('.ch1__layer--near', { xPercent: 4, ease: 'none', duration: 4 }, 0)
      .to('#truck1', { x: () => window.innerWidth * 1.25, ease: 'none', duration: 4 }, 0)
      .to('.ch1__routes', { opacity: 1, duration: 1 }, 1.2)
      .to('.ch1__routes', { opacity: 0.25, duration: 1 }, 3)
      .to('.ch__scrollhint', { opacity: 0, duration: 0.5 }, 0.4);

    /* ── CH2: accumulating operational chaos ── */
    const pcards = gsap.utils.toArray('.pcard');
    const ch2tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.ch2', start: 'top top', end: '+=200%',
        scrub: 0.6, pin: '.ch2__pin', anticipatePin: 1,
      },
    });
    pcards.forEach((card, i) => {
      ch2tl.fromTo(card,
        { opacity: 0, y: 90, rotate: (i % 2 ? 14 : -12) },
        { opacity: 1, y: 0, rotate: gsap.utils.random(-7, 7), duration: 0.5, ease: 'power2.out' },
        i * 0.32);
    });
    ch2tl.to('#ch2Stage', { scale: 1.07, ease: 'none', duration: 3.2 }, 0);

    /* ── CH3: journey map → wireframe → prototype ── */
    gsap.timeline({
      scrollTrigger: {
        trigger: '.ch3', start: 'top top', end: '+=220%',
        scrub: 0.6, pin: '.ch3__pin', anticipatePin: 1,
      },
    })
      .fromTo('.ch3__stage--journey', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.1)
      .to('.ch3__stage--journey', { opacity: 0, y: -24, duration: 0.6 }, 1.4)
      .fromTo('.ch3__stage--wire', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 1.8)
      .to('.ch3__stage--wire', { opacity: 0, y: -24, duration: 0.6 }, 3.0)
      .fromTo('.ch3__stage--ui', { opacity: 0, y: 30, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.9 }, 3.4);

    /* ── CH4: live map + capabilities ── */
    const caps = gsap.utils.toArray('#capList li');
    const route = document.getElementById('opsRoute');
    const mapTruck = document.getElementById('mapTruck');
    const routeLen = route.getTotalLength();
    route.style.strokeDasharray = routeLen;
    route.style.strokeDashoffset = routeLen;

    const ch4tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.ch4', start: 'top top', end: '+=320%',
        scrub: 0.6, pin: '.ch4__pin', anticipatePin: 1,
        onUpdate: (self) => {
          // truck rides the route as it draws
          const p = gsap.utils.clamp(0, 1, self.progress * 1.15);
          const pt = route.getPointAtLength(routeLen * p);
          mapTruck.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
          // capability steps
          const step = Math.min(caps.length - 1, Math.floor(self.progress * caps.length * 1.05));
          caps.forEach((li, i) => li.classList.toggle('is-on', i <= step));
        },
      },
    });
    ch4tl.to(route, { strokeDashoffset: 0, ease: 'none', duration: 8 }, 0)
      .to('.ch4__toast--a', { opacity: 1, y: 0, duration: 0.4 }, 1.6)
      .to('.ch4__toast--b', { opacity: 1, y: 0, duration: 0.4 }, 3.6)
      .to('.ch4__toast--c', { opacity: 1, y: 0, duration: 0.4 }, 5.8);

    /* ── CH6: golden hour fleet + rising camera ── */
    gsap.timeline({
      scrollTrigger: {
        trigger: '.ch6', start: 'top top', end: '+=220%',
        scrub: 0.6, pin: '.ch6__pin', anticipatePin: 1,
      },
    })
      .fromTo('#ch6Scene', { scale: 1.14 }, { scale: 1, ease: 'none', duration: 4 }, 0)
      .to('.ch6__truck--a', { x: () => window.innerWidth * 1.4, ease: 'none', duration: 4 }, 0)
      .to('.ch6__truck--b', { x: () => window.innerWidth * 1.55, ease: 'none', duration: 4 }, 0.15)
      .to('.ch6__truck--c', { x: () => window.innerWidth * 1.75, ease: 'none', duration: 4 }, 0.3);

    return () => {};
  });

  /* mobile: lighter treatment — no pinning, scenes reveal in place */
  mm.add('(max-width: 820px)', () => {
    gsap.utils.toArray('.pcard').forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.ch2', start: `top+=${i * 60} 80%` },
      });
    });
    gsap.set('.ch3__stage--ui', { opacity: 1 });
    gsap.set('.ch1__sky--dawn', { opacity: 1 });
    gsap.set('.ch1__sun', { y: 0 });
    gsap.to('#truck1', {
      x: () => window.innerWidth * 1.3, ease: 'none',
      scrollTrigger: { trigger: '.ch1', start: 'top top', end: 'bottom top', scrub: true },
    });
    const route = document.getElementById('opsRoute');
    if (route) { route.style.strokeDasharray = 'none'; route.style.strokeDashoffset = 0; }
    document.querySelectorAll('#capList li').forEach((li) => li.classList.add('is-on'));
    gsap.set('.ch4__toast', { opacity: 1, y: 0 });
    gsap.set('.ch6__truck--a', { x: '55vw' });
    gsap.set('.ch6__truck--b', { x: '75vw' });
    gsap.set('.ch6__truck--c', { x: '95vw' });
  });

  /* CH5 shift rows — all breakpoints */
  gsap.utils.toArray('.shift').forEach((row) => {
    gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 85%' } })
      .from(row.querySelector('.shift__old'), { x: -40, opacity: 0, duration: 0.6, ease: 'power2.out' }, 0)
      .from(row.querySelector('.shift__arrow'), { opacity: 0, duration: 0.4 }, 0.25)
      .from(row.querySelector('.shift__new'), { x: 50, opacity: 0, duration: 0.7, ease: 'power3.out' }, 0.3);
  });
})();
