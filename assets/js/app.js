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

    /* the command palette drives the same filter, so a skill result and a
       toolbar click land on exactly the same state */
    window.__sxFilterWork = (term, category) => {
      q.value = term || '';
      if (category) {
        cat = category;
        segs.forEach((s) => s.setAttribute('aria-selected', String(s.dataset.cat === category)));
      }
      filter();
    };

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
      /* read the link's own text, ignoring any appended micro-label */
      label: [...a.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim(),
      meta: a.getAttribute('href'),
      icon: ICON.hash,
      keys: 'section jump ' + a.textContent.trim(),
      run: () => {
        const t = document.getElementById(a.getAttribute('href').slice(1));
        if (t && window.__sxFlashTo) window.__sxFlashTo(t);
        else if (t) t.scrollIntoView({ block: 'start' });
      },
    })),
    /* skills jump to the work panel with the matching filter applied */
    ...[
      { label: 'AI UX', term: 'ai', cat: 'ai' },
      { label: 'Enterprise', term: 'enterprise', cat: 'all' },
      { label: 'WhatsApp', term: 'whatsapp', cat: 'all' },
      { label: 'Conversational UX', term: 'conversational', cat: 'all' },
      { label: 'Fintech', term: 'fintech', cat: 'all' },
      { label: 'Mobile', term: 'mobile', cat: 'all' },
      { label: 'Design systems', term: 'design systems', cat: 'all' },
      { label: 'Product design', term: '', cat: 'product' },
      { label: 'Web', term: '', cat: 'web' },
    ].map((s) => ({
      group: 'Skills',
      label: s.label,
      meta: 'Filter work',
      icon: ICON.bolt,
      cls: 'cmdk__item--skill',
      keys: 'skill tag filter ' + s.label,
      run: () => {
        if (window.__sxFilterWork) window.__sxFilterWork(s.term, s.cat);
        const t = document.getElementById('work');
        if (t && window.__sxFlashTo) window.__sxFlashTo(t);
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
      html += '<button class="cmdk__item ' + (it.cls || '') + '" role="option" aria-selected="false" data-i="' + i + '">' +
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

/* ═══════════════════════════════════════════════════════════════
   SYSTEM LAYER
   Session memory, activity log, status, count-up, jump-flash.
   Every element here is driven by real state or real data.
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── config: single source of truth for availability ── */
  const STATUS = {
    available: true,
    labelOn: 'open to work',
    labelOff: 'not taking new work',
  };

  /* ── BUILD 4 — status indicator ── */
  const status = $('#status');
  if (status) {
    $('#statusLabel').textContent = STATUS.available ? STATUS.labelOn : STATUS.labelOff;
    status.classList.toggle('status--on', STATUS.available);
    status.hidden = false;
    /* one deliberate underline draw, never a loop */
    requestAnimationFrame(() => status.classList.add('is-drawn'));
  }

  /* ── BUILD 1 — session memory ──
     Reads the PREVIOUS visit before writing this one, so "last seen"
     describes the last visit and not the current one. */
  (() => {
    const line = $('#sessionLine');
    if (!line) return;
    let visits, prev;
    try {
      visits = parseInt(localStorage.getItem('sx-visits') || '0', 10) || 0;
      prev = localStorage.getItem('sx-last');
      localStorage.setItem('sx-visits', String(visits + 1));
      localStorage.setItem('sx-last', new Date().toISOString());
    } catch (e) {
      return;                       /* private browsing: stay silent */
    }
    if (visits < 1 || !prev) return;  /* first visit earns nothing */

    const ago = (iso) => {
      const secs = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
      const units = [['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]];
      for (const [name, size] of units) {
        const n = Math.floor(secs / size);
        if (n >= 1) return n + ' ' + name + (n > 1 ? 's' : '') + ' ago';
      }
      return 'moments ago';
    };
    const n = String(visits + 1).padStart(2, '0');
    line.innerHTML = 'session_' + n + ' · last seen <b>' + ago(prev) + '</b>';
    line.classList.add('is-on');
  })();

  /* ── BUILD 7 — discipline chart ──
     Counts are derived from the case-study cards themselves, so the chart
     can never disagree with the grid it filters. */
  const DISCIPLINES = [
    { key: 'product', label: 'Product design', color: 'var(--gold-live)' },
    { key: 'ai',      label: 'AI UX',          color: '#5b5b66' },
    { key: 'web',     label: 'Web',            color: '#b6b6bf' },
  ];
  const donut = $('#donut');
  if (donut) {
    const cards = $$('#bento .wcard');
    const counts = DISCIPLINES.map((d) => ({
      ...d,
      n: cards.filter((c) => (c.dataset.cat || '').split(' ').includes(d.key)).length,
    }));
    const total = counts.reduce((a, c) => a + c.n, 0) || 1;
    const R = 60, C = 2 * Math.PI * R;
    let offset = 0;
    const segs = counts.map((c) => {
      const len = (c.n / total) * C;
      const gap = 2.5;
      const seg = '<circle class="donut__seg" data-key="' + c.key + '" role="button" tabindex="0" aria-pressed="false"' +
        ' aria-label="' + c.label + ': ' + c.n + ' of ' + cards.length + ' case studies. Filter the work grid."' +
        ' cx="80" cy="80" r="' + R + '" stroke="' + c.color + '"' +
        ' stroke-dasharray="' + (len - gap).toFixed(2) + ' ' + (C - len + gap).toFixed(2) + '"' +
        ' style="--dash-start:' + C.toFixed(2) + 'px; --dash-end:' + (-offset).toFixed(2) + 'px;"></circle>';
      offset += len;
      return seg;
    }).join('');

    donut.innerHTML =
      '<svg class="donut__svg" viewBox="0 0 160 160" role="img" aria-label="Case studies by discipline">' +
      '<circle cx="80" cy="80" r="60" fill="none" stroke="var(--muted-surface)" stroke-width="17"></circle>' +
      '<g transform="rotate(-90 80 80)">' + segs + '</g>' +
      '<g class="donut__hole">' +
      '<text x="80" y="76" text-anchor="middle" class="donut__num" id="donutNum">' + cards.length + '</text>' +
      '<text x="80" y="93" text-anchor="middle" class="donut__cap" id="donutCap">CASE STUDIES</text>' +
      '</g></svg>' +
      '<div class="donut__key">' + counts.map((c) =>
        '<button class="donut__item" data-key="' + c.key + '" aria-pressed="false">' +
        '<span class="donut__swatch" style="background:' + c.color + '"></span>' +
        '<span>' + c.label + '</span>' +
        '<span class="donut__n">' + c.n + ' · ' + Math.round((c.n / total) * 100) + '%</span>' +
        '<span class="donut__bar"><i class="donut__fill" style="--pct:' + ((c.n / total) * 100).toFixed(1) + '%; background:' + c.color + '"></i></span>' +
        '</button>').join('') +
        '<button class="donut__clear" id="donutClear" hidden>× clear filter</button></div>';

    const svg = $('.donut__svg', donut);
    const numEl = $('#donutNum'), capEl = $('#donutCap');
    const clearBtn = $('#donutClear');
    const nodes = (key) => $$('[data-key="' + key + '"]', donut);

    /* the centre of the ring is a live readout, not a static total */
    const setHole = (n, cap) => {
      svg.classList.add('is-swapping');
      setTimeout(() => {
        numEl.textContent = n;
        capEl.textContent = cap;
        svg.classList.remove('is-swapping');
      }, 130);
    };
    let sel = null;
    const resetHole = () => {
      const c = counts.find((x) => x.key === sel);
      setHole(c ? c.n : cards.length, c ? c.label.toUpperCase() : 'CASE STUDIES');
    };

    /* hovering either the ring or the legend highlights both */
    const hot = (key, on) => {
      donut.classList.toggle('has-hot', on && key !== sel);
      $$('[data-key]', donut).forEach((el) => el.classList.toggle('is-hot', on && el.dataset.key === key));
      if (on) {
        const c = counts.find((x) => x.key === key);
        setHole(c.n, c.label.toUpperCase());
      } else resetHole();
    };

    const pick = (key) => {
      sel = sel === key ? null : key;
      donut.classList.toggle('has-sel', !!sel);
      $$('[data-key]', donut).forEach((el) => el.setAttribute('aria-pressed', String(el.dataset.key === sel)));
      if (clearBtn) clearBtn.hidden = !sel;
      resetHole();
      if (window.__sxFilterWork) window.__sxFilterWork('', sel || 'all');
      const w = document.getElementById('work');
      if (w && window.__sxFlashTo) window.__sxFlashTo(w);
    };

    const keys = counts.map((c) => c.key);
    $$('[data-key]', donut).forEach((el) => {
      const k = el.dataset.key;
      el.addEventListener('click', () => pick(k));
      el.addEventListener('mouseenter', () => hot(k, true));
      el.addEventListener('mouseleave', () => hot(k, false));
      el.addEventListener('focus', () => hot(k, true));
      el.addEventListener('blur', () => hot(k, false));
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(k); return; }
        const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1
                  : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (!dir) return;
        e.preventDefault();
        const i = keys.indexOf(k);
        const next = keys[(i + dir + keys.length) % keys.length];
        const peer = $$('[data-key="' + next + '"]', donut).find((n) => n.tagName === el.tagName) || nodes(next)[0];
        if (peer) peer.focus();
      });
    });
    if (clearBtn) clearBtn.addEventListener('click', () => { if (sel) pick(sel); });

    /* draw the ring and the bars once the panel is on screen */
    if (!reduced && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((es, obs) => {
        if (es.some((e) => e.isIntersecting)) { donut.classList.add('is-in'); obs.disconnect(); }
      }, { rootMargin: '0px 0px -12% 0px' });
      io.observe(donut);
    } else donut.classList.add('is-in');
  }

  /* recent activity — plain language, capped, with a view-more */
  const ENTRIES = [
    { date: 'Aug 2026', label: 'Rebuilt the portfolio as a stateful dashboard' },
    { date: 'Aug 2026', label: 'Rebuilt the ManaGem case study' },
    { date: 'Aug 2026', label: 'Published the CMAXX connectivity redesign' },
    { date: 'Aug 2026', label: 'Published the FINOS case study' },
    { date: 'Jul 2026', label: 'Published WhatsApp Home Assist' },
    { date: 'Jul 2026', label: 'Published the WasteMart concept' },
    { date: 'Jul 2026', label: 'Published studio identity work' },
  ];
  const CAP = 5;
  const recent = $('#recentFeed');
  const moreBtn = $('#recentMore');
  if (recent) {
    recent.innerHTML = ENTRIES.map((e, i) =>
      '<div class="recent__row"' + (i >= CAP ? ' hidden' : '') + '>' +
      '<span class="recent__date">' + e.date + '</span>' +
      '<span>' + e.label + '</span></div>').join('');
    if (moreBtn && ENTRIES.length > CAP) {
      let open = false;
      const paint = () => {
        $$('.recent__row', recent).forEach((r, i) => { r.hidden = !open && i >= CAP; });
        moreBtn.textContent = open ? '– show less' : '+ view ' + (ENTRIES.length - CAP) + ' more';
      };
      moreBtn.hidden = false;
      paint();
      moreBtn.addEventListener('click', () => { open = !open; paint(); });
    }
  }

  /* stat cards jump to the breakdown they summarise */
  $$('.stat--link').forEach((b) => b.addEventListener('click', () => {
    const t = document.getElementById('log');
    if (t) flashTo(t);
  }));

  /* ── jump + flash, shared by the palette and the stat cards ── */
  const flashTo = (el) => {
    if (!el) return;
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    el.classList.remove('is-flash');
    void el.offsetWidth;                 /* restart the animation */
    el.classList.add('is-flash');
    setTimeout(() => el.classList.remove('is-flash'), 1100);
  };
  window.__sxFlashTo = flashTo;          /* the palette module uses this */

  /* ── BUILD 6 — count-up on scroll into view ── */
  const nums = $$('.stat__v[data-count]');
  if (nums.length) {
    const run = (el) => {
      const target = +el.dataset.count;
      const pad = +(el.dataset.pad || 0);
      const suffix = el.dataset.suffix || '';
      const fmt = (v) => String(v).padStart(pad, '0') + suffix;
      if (reduced) { el.textContent = fmt(target); return; }
      const dur = 620, t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (!('IntersectionObserver' in window)) nums.forEach(run);
    else {
      const io = new IntersectionObserver((es, obs) => {
        es.forEach((en) => { if (en.isIntersecting) { run(en.target); obs.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -10% 0px' });
      nums.forEach((n) => io.observe(n));
    }
  }

  /* ── BUILD 6 — nav micro-labels ── */
  $$('.side__link').forEach((a, i) => {
    const name = a.getAttribute('href').slice(1);
    const m = document.createElement('span');
    m.className = 'micro';
    m.setAttribute('aria-hidden', 'true');
    m.textContent = '§ ' + String(i + 1).padStart(2, '0') + ' / ' + name;
    a.appendChild(m);
  });
})();

/* ═══════════════════════════════════════════════════════════════
   BOOT SEQUENCE + PAGE TRANSITIONS
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── BUILD 2 — boot sequence ──
     First visit gets the full sequence; returning visitors get a single
     fast fade. The flag is set in <head> before the visit counter moves. */
  const boot = document.getElementById('boot');
  if (boot) {
    const full = root.classList.contains('boot-full') && !reduced;
    const lines = [...boot.querySelectorAll('[data-boot]')];
    const finish = () => {
      boot.classList.add('is-done');
      setTimeout(() => { boot.hidden = true; document.body.style.overflow = ''; }, 300);
    };
    if (!full) {
      /* abbreviated: never make a returning visitor wait */
      boot.hidden = false;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => setTimeout(finish, 120));
    } else {
      boot.hidden = false;
      document.body.style.overflow = 'hidden';
      lines.forEach((l, i) => setTimeout(() => l.classList.add('is-on'), 120 + i * 300));
      setTimeout(finish, 120 + lines.length * 300 + 220);
    }
  }

  /* ── BUILD 1 — page transition into case studies ──
     Uses the View Transitions API where available; otherwise fades the
     shell out before navigating so it is never a hard cut. */
  const internal = (a) => {
    const href = a.getAttribute('href') || '';
    return /^[\w-]+\.html(#.*)?$/.test(href) && a.target !== '_blank' && !a.hasAttribute('download');
  };
  if (!reduced && !('startViewTransition' in document)) {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a || !internal(a) || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      root.classList.add('leaving');
      setTimeout(() => { location.href = a.getAttribute('href'); }, 190);
    });
    /* a cached back-navigation must not land on a faded-out page */
    addEventListener('pageshow', () => root.classList.remove('leaving'));
  }

  /* ── BUILD 2 — image skeletons ── */
  document.querySelectorAll('img[loading="lazy"], img[data-src]').forEach((img) => {
    if (img.complete && img.naturalWidth) return;
    img.setAttribute('data-skel', '');
    const done = () => img.classList.add('is-loaded');
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', done, { once: true });
  });
})();
