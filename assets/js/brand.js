/* GEMIS Brand Studio — page-specific scroll choreography */
(function () {
  if (!document.body.classList.contains('page-brand')) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* tiles: staggered rise */
  const tiles = gsap.utils.toArray('.tile');
  if (tiles.length && !reduced) {
    tiles.forEach((tile, i) => {
      gsap.from(tile, {
        y: 70, opacity: 0, duration: 0.9, ease: 'power3.out', delay: (i % 3) * 0.1,
        scrollTrigger: { trigger: tile, start: 'top 88%' },
      });
    });
  }

  /* sticky identity cards: each new card presses the previous one back */
  const bcards = gsap.utils.toArray('.bcard');
  if (bcards.length && !reduced) {
    bcards.forEach((card, i) => {
      const next = bcards[i + 1];
      if (next) {
        gsap.fromTo(card,
          { scale: 1, yPercent: 0, filter: 'brightness(1)' },
          {
            scale: 0.94, yPercent: -2.5, filter: 'brightness(0.86)',
            ease: 'none',
            scrollTrigger: {
              trigger: next,
              start: 'top bottom',
              end: 'top 12%',
              scrub: true,
            },
          });
      }
      // mark wobble on hover
      const mark = card.querySelector('.bcard__mark');
      card.addEventListener('mouseenter', () => {
        gsap.fromTo(mark, { rotate: 0 }, { rotate: -4, yoyo: true, repeat: 1, duration: 0.22, ease: 'power2.inOut' });
      });
    });
  }

  /* process: rail draws down + steps light up */
  const line = document.getElementById('processLine');
  if (line && !reduced) {
    gsap.fromTo(line, { scaleY: 0 }, {
      scaleY: 1, ease: 'none', transformOrigin: 'top center',
      scrollTrigger: {
        trigger: '.process__wrap',
        start: 'top 70%',
        end: 'bottom 45%',
        scrub: 0.4,
      },
    });
    gsap.utils.toArray('.pstep').forEach((step) => {
      gsap.from(step, {
        x: -50, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: step, start: 'top 82%' },
      });
      ScrollTrigger.create({
        trigger: step,
        start: 'top 60%',
        end: 'bottom 40%',
        onToggle: (self) => step.classList.toggle('is-lit', self.isActive),
      });
    });
  }

  /* lead name line reveal */
  const leadInners = document.querySelectorAll('.lead__name .line-inner');
  if (leadInners.length && !reduced) {
    gsap.set(leadInners, { y: 0, yPercent: 110 });
    gsap.to(leadInners, {
      yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12,
      scrollTrigger: { trigger: '.lead', start: 'top 70%' },
    });
    gsap.from('.lead__ring', {
      scale: 0.6, opacity: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.lead', start: 'top 70%' },
    });
  } else if (leadInners.length) {
    gsap.set(leadInners, { y: 0, yPercent: 0 });
  }
})();
