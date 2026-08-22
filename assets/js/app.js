/* ═══════════════════════════════════════════════════════════════
   SPHAMANDLA XABA® — portfolio app shell
   Sidebar drawer, scrollspy, reveals, case-study search.
   No dependencies.
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* year */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ── mobile drawer ── */
  const side = $('#side');
  const scrim = $('#scrim');
  const burger = $('#burger');
  const sideClose = $('#sideClose');

  const setDrawer = (open) => {
    if (!side) return;
    side.classList.toggle('is-open', open);
    scrim.classList.toggle('is-on', open);
    scrim.hidden = !open;
    if (burger) burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) { const f = $('.side__link', side); if (f) f.focus({ preventScroll: true }); }
    else if (burger) burger.focus({ preventScroll: true });
  };

  if (burger) burger.addEventListener('click', () => setDrawer(true));
  if (sideClose) sideClose.addEventListener('click', () => setDrawer(false));
  if (scrim) scrim.addEventListener('click', () => setDrawer(false));
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && side && side.classList.contains('is-open')) setDrawer(false);
  });
  /* close the drawer when a nav link is used on small screens */
  $$('.side__link').forEach((a) => a.addEventListener('click', () => {
    if (matchMedia('(max-width: 1024px)').matches) setDrawer(false);
  }));
  /* reset drawer state when growing back to desktop */
  matchMedia('(min-width: 1025px)').addEventListener('change', (e) => { if (e.matches) setDrawer(false); });

  /* ── smooth anchor scrolling ── */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + id);
    });
  });

  /* ── reveals ── */
  const rv = $$('.rv');
  if (reduced || !('IntersectionObserver' in window)) {
    rv.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    rv.forEach((el) => io.observe(el));
  }

  /* ── rail images ──
     The marquee track sits outside the viewport horizontally, so native
     lazy-loading never fires for its right-hand items. Load the whole
     set once the rail itself scrolls into view. */
  const rail = $('.rail');
  if (rail) {
    const loadRail = () => $$('img[data-src]', rail).forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
    if (!('IntersectionObserver' in window)) loadRail();
    else {
      const ro = new IntersectionObserver((entries, obs) => {
        if (entries.some((en) => en.isIntersecting)) { loadRail(); obs.disconnect(); }
      }, { rootMargin: '400px 0px' });
      ro.observe(rail);
    }
  }

  /* ── scrollspy ── */
  const links = $$('.side__link');
  const sections = links
    .map((l) => document.getElementById(l.dataset.spy))
    .filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    const visible = new Set();
    const paint = () => {
      /* the topmost section currently in the band wins, so overlapping
         observers can't leave a stale link highlighted */
      const winner = sections.find((s) => visible.has(s.id));
      const id = winner ? winner.id : (scrollY < 200 ? 'top' : null);
      if (!id) return;
      links.forEach((l) => l.classList.toggle('is-active', l.dataset.spy === id));
    };
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) visible.add(en.target.id);
        else visible.delete(en.target.id);
      });
      paint();
    }, { rootMargin: '-20% 0px -65% 0px' });
    sections.forEach((s) => spy.observe(s));
    addEventListener('scroll', () => { if (scrollY < 200) paint(); }, { passive: true });
  }

  /* ── case-study search ── */
  const q = $('#q');
  const bento = $('#bento');
  const empty = $('#bentoEmpty');
  if (q && bento) {
    const cards = $$('.wcard', bento);
    const rows = $$('.bento__row', bento);
    const segs = $$('.seg');
    const count = $('#workCount');
    let cat = 'all';

    const filter = () => {
      const term = q.value.trim().toLowerCase();
      let shown = 0;
      cards.forEach((card) => {
        const hay = (card.dataset.tags + ' ' + card.textContent).toLowerCase();
        const matchTerm = !term || hay.includes(term);
        const matchCat = cat === 'all' || (card.dataset.cat || '').split(' ').includes(cat);
        const hit = matchTerm && matchCat;
        card.classList.toggle('is-hidden', !hit);
        if (hit) shown++;
      });
      /* collapse rows that have no visible card so the grid stays tidy */
      rows.forEach((row) => {
        const any = $$('.wcard', row).some((c) => !c.classList.contains('is-hidden'));
        row.style.display = any ? '' : 'none';
      });
      if (empty) empty.hidden = shown !== 0;
      if (count) count.textContent = shown + (shown === 1 ? ' case study' : ' case studies');
    };

    q.addEventListener('input', filter);
    q.addEventListener('search', filter);

    segs.forEach((seg) => {
      seg.addEventListener('click', () => {
        cat = seg.dataset.cat;
        segs.forEach((s) => s.setAttribute('aria-selected', String(s === seg)));
        filter();
      });
      /* arrow-key movement across the segmented control */
      seg.addEventListener('keydown', (e) => {
        const i = segs.indexOf(seg);
        const next = e.key === 'ArrowRight' ? segs[i + 1] : e.key === 'ArrowLeft' ? segs[i - 1] : null;
        if (!next) return;
        e.preventDefault();
        next.focus();
        next.click();
      });
    });
    filter();
  }
})();
