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

    const trows = $$('#wtable tbody tr');
    const filter = () => {
      const term = q.value.trim().toLowerCase();
      const hits = (el) => {
        const hay = ((el.dataset.tags || '') + ' ' + el.textContent).toLowerCase();
        const matchTerm = !term || hay.includes(term);
        const matchCat = cat === 'all' || (el.dataset.cat || '').split(' ').includes(cat);
        return matchTerm && matchCat;
      };
      /* the table view mirrors the same predicate, so both stay in sync */
      trows.forEach((tr) => tr.classList.toggle('is-hidden', !hits(tr)));
      let shown = 0;
      cards.forEach((card) => {
        const hit = hits(card);
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

/* ═══════════════════════════════════════════════════════════════
   DASHBOARD LAYER
   Theme, collapsible rail, view toggle, command palette, toasts.
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const store = (k, v) => { try { v === undefined ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch (e) {} };

  /* ── toasts ── */
  const toasts = $('#toasts');
  const toast = (msg) => {
    if (!toasts) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 12.5 5 5L20 6.5"/></svg>';
    el.appendChild(document.createTextNode(msg));
    toasts.appendChild(el);
    setTimeout(() => {
      el.classList.add('is-out');
      el.addEventListener('animationend', () => el.remove(), { once: true });
    }, 2600);
  };

  /* ── theme ── */
  const themeBtn = $('#themeBtn');
  const setTheme = (dark, announce) => {
    root.classList.add('theming');
    dark ? root.setAttribute('data-theme', 'dark') : root.removeAttribute('data-theme');
    store('sx-theme', dark ? 'dark' : 'light');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#0a0a0c' : '#e4e2e6');
    if (themeBtn) themeBtn.setAttribute('data-tip', dark ? 'Switch to light' : 'Switch to dark');
    setTimeout(() => root.classList.remove('theming'), 320);
    if (announce) toast(dark ? 'Dark theme on' : 'Light theme on');
  };
  if (themeBtn) {
    setTheme(root.getAttribute('data-theme') === 'dark', false);
    themeBtn.addEventListener('click', () => setTheme(root.getAttribute('data-theme') !== 'dark', true));
  }

  /* ── collapsible rail ── */
  const railBtn = $('#railBtn');
  const setRail = (on) => {
    root.classList.toggle('rail-collapsed', on);
    store('sx-rail', on ? '1' : '0');
    if (railBtn) {
      railBtn.setAttribute('aria-pressed', String(on));
      railBtn.setAttribute('data-tip', on ? 'Expand sidebar' : 'Collapse sidebar');
      railBtn.setAttribute('aria-label', on ? 'Expand sidebar' : 'Collapse sidebar');
    }
  };
  if (railBtn) {
    setRail(root.classList.contains('rail-collapsed'));
    railBtn.addEventListener('click', () => setRail(!root.classList.contains('rail-collapsed')));
  }

  /* ── grid / list view ── */
  const gridBtn = $('#viewGrid');
  const listBtn = $('#viewList');
  const setView = (list) => {
    root.classList.toggle('view-list', list);
    store('sx-view', list ? 'list' : 'grid');
    if (gridBtn) gridBtn.setAttribute('aria-pressed', String(!list));
    if (listBtn) listBtn.setAttribute('aria-pressed', String(list));
  };
  if (gridBtn && listBtn) {
    setView(root.classList.contains('view-list'));
    gridBtn.addEventListener('click', () => setView(false));
    listBtn.addEventListener('click', () => setView(true));
  }

  /* ── copy-to-clipboard (email) ── */
  $$('[data-copy]').forEach((el) => {
    el.addEventListener('click', async (e) => {
      if (!navigator.clipboard) return;            /* let the mailto: through */
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(el.dataset.copy);
        toast('Email address copied');
      } catch (err) {
        location.href = el.getAttribute('href');   /* fall back to mailto: */
      }
    });
  });

  /* ── command palette ── */
  const cmdk = $('#cmdk');
  const input = $('#cmdkInput');
  const list = $('#cmdkList');
  const openBtn = $('#cmdkOpen');
  if (!cmdk || !input || !list) return;

  const ICON = {
    work: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg>',
    hash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9h14M5 15h14M10 4 8 20M16 4l-2 16"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7Z"/></svg>',
  };

  /* items are read from the page, so the palette can never drift from it */
  const items = [
    ...$$('#bento .wcard').map((c) => ({
      group: 'Case studies',
      label: c.querySelector('.wcard__t').textContent.trim(),
      meta: c.querySelector('.wcard__cat').textContent.trim(),
      icon: ICON.work,
      keys: c.dataset.tags || '',
      run: () => { location.href = c.getAttribute('href'); },
    })),
    ...$$('.side__link').map((a) => ({
      group: 'Go to',
      label: a.textContent.trim(),
      meta: 'Section',
      icon: ICON.hash,
      keys: 'section jump ' + a.textContent.trim(),
      run: () => {
        const t = document.getElementById(a.getAttribute('href').slice(1));
        if (t) t.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      },
    })),
    { group: 'Actions', label: 'Download CV', meta: 'PDF', icon: ICON.bolt, keys: 'cv resume download pdf',
      run: () => { location.href = 'assets/docs/Sphamandla-Xaba-Resume.pdf'; } },
    { group: 'Actions', label: 'Copy email address', meta: 'sphamandaxaba@gmail.com', icon: ICON.bolt, keys: 'email copy contact mail',
      run: async () => {
        try { await navigator.clipboard.writeText('sphamandaxaba@gmail.com'); toast('Email address copied'); }
        catch (e) { location.href = 'mailto:sphamandaxaba@gmail.com'; }
      } },
    { group: 'Actions', label: 'Message on WhatsApp', meta: '+27 60 938 1313', icon: ICON.bolt, keys: 'whatsapp message chat contact',
      run: () => window.open('https://wa.me/27609381313', '_blank', 'noopener') },
    { group: 'Actions', label: 'Toggle colour theme', meta: 'Light / dark', icon: ICON.bolt, keys: 'theme dark light mode appearance',
      run: () => themeBtn && themeBtn.click() },
  ];

  let shown = [];
  let sel = 0;
  let lastFocus = null;

  const render = (term) => {
    const t = term.trim().toLowerCase();
    shown = items.filter((i) => !t || (i.label + ' ' + i.meta + ' ' + i.keys).toLowerCase().includes(t));
    sel = 0;
    if (!shown.length) {
      list.innerHTML = '<p class="cmdk__none">No results for &ldquo;' + term.replace(/[<>&]/g, '') + '&rdquo;</p>';
      return;
    }
    let html = '', group = '';
    shown.forEach((it, i) => {
      if (it.group !== group) { group = it.group; html += '<p class="cmdk__grouplabel">' + group + '</p>'; }
      html += '<button class="cmdk__item" role="option" aria-selected="false" data-i="' + i + '">' +
              it.icon + '<span>' + it.label + '</span><span class="cmdk__meta">' + it.meta + '</span></button>';
    });
    list.innerHTML = html;
    paintSel();
  };

  const paintSel = () => {
    $$('.cmdk__item', list).forEach((el, i) => {
      const on = i === sel;
      el.classList.toggle('is-sel', on);
      el.setAttribute('aria-selected', String(on));
      if (on) el.scrollIntoView({ block: 'nearest' });
    });
  };

  const open = () => {
    lastFocus = document.activeElement;
    cmdk.hidden = false;
    document.body.style.overflow = 'hidden';
    input.value = '';
    render('');
    input.focus();
  };
  const close = () => {
    cmdk.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  };

  if (openBtn) openBtn.addEventListener('click', open);
  $$('[data-cmdk-close]', cmdk).forEach((el) => el.addEventListener('click', close));
  input.addEventListener('input', () => render(input.value));

  list.addEventListener('click', (e) => {
    const btn = e.target.closest('.cmdk__item');
    if (!btn) return;
    const it = shown[+btn.dataset.i];
    close();
    if (it) it.run();
  });

  addEventListener('keydown', (e) => {
    const mod = e.metaKey || e.ctrlKey;
    if (mod && e.key.toLowerCase() === 'k') { e.preventDefault(); cmdk.hidden ? open() : close(); return; }
    if (cmdk.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); if (shown.length) { sel = (sel + 1) % shown.length; paintSel(); } }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (shown.length) { sel = (sel - 1 + shown.length) % shown.length; paintSel(); } }
    else if (e.key === 'Enter') {
      e.preventDefault();
      const it = shown[sel];
      close();
      if (it) it.run();
    } else if (e.key === 'Tab') {
      e.preventDefault();       /* the dialog owns focus while it is open */
      input.focus();
    }
  });
})();
