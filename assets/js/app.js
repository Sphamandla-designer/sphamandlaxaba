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

  /* the site is a single homepage at the root, so site-relative paths
     need no prefix. Kept as a hook in case a page is ever nested again. */
  window.__sxRoot = document.documentElement.dataset.root || '';

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
  /* #top wraps the whole page and is always in view, so it is not observed:
     it is the active link only while nothing else is in the band */
  const sections = links
    .filter((l) => l.dataset.spy !== 'top')
    .map((l) => document.getElementById(l.dataset.spy))
    .filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    const visible = new Set();
    const paint = () => {
      /* the lowest section in the band wins: near the end of the page two
         short sections can share the band, and the one being scrolled to is
         the later one. Deterministic either way, so no stale highlight. */
      const winner = sections.filter((s) => visible.has(s.id)).pop();
      const id = scrollY < 200 && !winner ? 'top' : winner ? winner.id : null;
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
    /* the band can sit below the last section at the very bottom of the page */
    addEventListener('scroll', () => {
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) {
        const last = sections[sections.length - 1];
        links.forEach((l) => l.classList.toggle('is-active', l.dataset.spy === last.id));
      }
    }, { passive: true });
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
        segs.forEach((s) => s.setAttribute('aria-pressed', String(s.dataset.cat === category)));
      }
      filter();
    };

    /* the three specialism cards are the same filter by another route:
       picking one narrows the grid and scrolls to it */
    $$('.spec[data-filter]').forEach((spec) => {
      spec.setAttribute('aria-pressed', 'false');
      spec.addEventListener('click', () => {
        const want = spec.dataset.filter;
        const already = spec.getAttribute('aria-pressed') === 'true';
        /* AI UX cuts across the three categories, so it narrows by theme
           instead of by category and leaves the segments on "All" */
        if (want === 'ai') window.__sxFilterWork(already ? '' : 'aiux', 'all');
        else window.__sxFilterWork('', already ? 'all' : want);
        $$('.spec[data-filter]').forEach((s) => s.setAttribute('aria-pressed', String(!already && s === spec)));
        const t = document.getElementById('work');
        if (t && window.__sxFlashTo) window.__sxFlashTo(t);
        else if (t) t.scrollIntoView({ block: 'start' });
      });
    });

    segs.forEach((seg) => {
      seg.addEventListener('click', () => {
        cat = seg.dataset.cat;
        segs.forEach((s) => s.setAttribute('aria-pressed', String(s === seg)));
        /* a direct toolbar choice clears any specialism card selection */
        $$('.spec[data-filter]').forEach((s) =>
          s.setAttribute('aria-pressed', String(s.dataset.filter === cat)));
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
    ...$$('#bento .wcard[href]').map((c) => ({
      group: 'Case studies',
      label: c.querySelector('.wcard__t').textContent.trim(),
      meta: c.querySelector('.wcard__cat').textContent.trim(),
      icon: ICON.work,
      keys: c.dataset.tags || '',
      run: () => { location.href = c.getAttribute('href'); },
    })),
    ...$$('.side__link').map((a) => ({
      group: 'Go to',
      /* the label lives in .lbl so the collapsed rail can hide it */
      label: (a.querySelector('.lbl') || a).textContent.trim(),
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
      { label: 'SaaS dashboards', term: '', cat: 'saas' },
      { label: 'Mobile apps', term: '', cat: 'mobile' },
      { label: 'Websites', term: '', cat: 'web' },
      { label: 'AI UX', term: 'aiux', cat: 'all' },
      { label: 'Enterprise', term: 'enterprise', cat: 'all' },
      { label: 'WhatsApp', term: 'whatsapp', cat: 'all' },
      { label: 'Fintech', term: 'fintech', cat: 'all' },
      { label: 'Field operations', term: 'field operations', cat: 'all' },
      { label: 'Design systems', term: 'design system', cat: 'all' },
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
      run: () => { location.href = (window.__sxRoot || '') + 'assets/docs/Sphamandla-Xaba-Resume.pdf'; } },
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
   Count-up, jump-flash, nav micro-labels.
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* the visit counter behind the old boot sequence and session line is
     gone; clear what earlier versions stored in this browser */
  try { localStorage.removeItem('sx-visits'); localStorage.removeItem('sx-last'); } catch (e) {}

  /* only the card without a sheet jumps to the breakdown it summarises */
  $$('.stat--link[data-jump]').forEach((b) => b.addEventListener('click', () => {
    const t = document.getElementById(b.dataset.jump);
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
   PAGE TRANSITIONS + IMAGE SKELETONS
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── BUILD 1 — page transition into case studies ──
     Uses the View Transitions API where available; otherwise fades the
     shell out before navigating so it is never a hard cut. */
  const internal = (a) => {
    const href = a.getAttribute('href') || '';
    return /^(\.\.\/)*[\w-]+\.html(#.*)?$/.test(href) && a.target !== '_blank' && !a.hasAttribute('download');
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

/* ═══════════════════════════════════════════════════════════════
   KPI DETAIL SHEETS
   Each stat card opens the record behind the number. Every fact here
   comes from the CV or from work already published on this site.
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const url = (href) => (window.__sxRoot || '') + href;

  const ROLES = [
    {
      co: 'Gem Information Systems', when: '2025 — Present', title: 'UI/UX Designer',
      points: [
        'Design enterprise SaaS platforms, websites and internal business applications for corporate clients.',
        'Lead UX and UI design from discovery and wireframing through prototyping and developer handoff.',
        'Built and maintain a scalable Figma design system used across multiple teams.',
      ],
      stats: [
        ['+50%', 'task success rate'],
        ['−25%', 'support tickets'],
        ['−60%', 'design-to-dev friction'],
      ],
    },
    {
      co: 'AX-Channels Studio', when: '2023 — 2025', title: 'UI/UX Designer & WordPress Designer',
      points: [
        'Delivered digital projects across websites, landing pages and business platforms.',
        'Led end-to-end design projects from discovery through implementation.',
        'Ran UX audits to identify usability issues and improve user journeys.',
        'Designed responsive WordPress sites focused on usability, accessibility and conversion.',
        'Worked directly with clients to translate business requirements into digital experiences.',
      ],
      stats: [
        ['16+', 'projects delivered'],
        ['4+', 'projects led end-to-end'],
      ],
    },
  ];

  /* href only where a case study actually exists on this site */
  const PROJECTS = [
    { g: 'Web platforms', items: [
      ['FINOS', 'Self-initiated concept', 'finos.html'],
      ['ManaGem', 'Web platform', 'managem.html'],
      ['ECD Connect', 'Web platform'],
    ]},
    { g: 'Mobile apps', items: [
      ['WasteMart', 'Mobile app · Client work', 'wastemart.html'],
      ['NuraCoach', 'Mobile app'],
      ['ECD Connect', 'Mobile app'],
      ['Lungelo', 'Mobile app'],
      ['ELP App', 'Mobile app'],
      ['Funda', 'Mobile app'],
    ]},
    { g: 'Conversational', items: [
      ['WhatsApp claims verification', 'WhatsApp · GEMIS pilot', 'whatsapp-ai.html'],
    ]},
    { g: 'Systems', items: [
      ['ManaGem Take-On', 'Onboarding system · Approved for implementation', 'managem.html'],
    ]},
    { g: 'Websites', items: [
      ['GEMIS Studio', 'Official GEMIS website', 'gemis-studio.html'],
      ['CMAXX', 'Website', 'cmaxx.html'],
      ['GEMIS', 'Website'],
      ['AX-Channels', 'Studio website · Pre-launch', 'ax-channels.html'],
      ['Kiy Trucking', 'Website'],
      ['SmartStart', 'Learning website'],
      ['SG Coal', 'Redesign concept'],
    ]},
  ];

  const LED = [
    { n: 'FINOS', meta: 'AI-powered financial operating system. Owned the product model, the AI interaction patterns and the end-to-end UI.',
      facts: ['Web platform', 'AI UX', 'Self-initiated concept'], href: 'finos.html' },
    { n: 'ManaGem Take-On', meta: 'AI-assisted client onboarding for an enterprise ERP. Owned the confidence model, source traceability and the two-gate human review.',
      facts: ['Onboarding system', 'Human-in-the-loop', 'Approved for implementation'], href: 'managem.html' },
    { n: 'WasteMart', meta: 'Service and operations product connecting customers, drivers and back-office workflows.',
      facts: ['Mobile app', 'Client work', '29-screen prototype'], href: 'wastemart.html' },
    { n: 'SmartStart', meta: 'Learning website. Led the structure, content hierarchy and responsive build.',
      facts: ['Learning website', 'IA', 'Responsive'] },
    { n: 'Lungelo', meta: 'Multilingual field application designed for low-bandwidth, on-site use.',
      facts: ['Mobile app', 'Multilingual', 'Field use'] },
  ];


  const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>';

  const VIEWS = {
    experience: {
      title: 'Three years, two companies',
      sub: 'Where the experience comes from, and what I owned. Figures are as stated on my CV.',
      html: () => ROLES.map((r) =>
        '<div class="role"><div class="role__top"><span class="role__co">' + esc(r.co) + '</span>' +
        '<span class="role__when">' + esc(r.when) + '</span></div>' +
        '<p class="role__title">' + esc(r.title) + '</p>' +
        (r.href ? '<a class="prow__t" href="' + url(r.href) + '">' + esc(r.cta) + '</a>' : '') +
        '<ul class="role__list">' + r.points.map((x) => '<li><span>' + esc(x) + '</span></li>').join('') + '</ul>' +
        (r.stats ? '<div class="role__stats">' + r.stats.map((st) =>
          '<span class="role__stat"><b>' + esc(st[0]) + '</b>' + esc(st[1]) + '</span>').join('') + '</div>' : '') + '</div>'
      ).join(''),
    },
    delivered: {
      title: 'Project history',
      sub: 'Across enterprise platforms, mobile products, conversational systems and websites.',
      html: () => PROJECTS.map((grp) =>
        '<p class="sheet__group">' + esc(grp.g) + ' · ' + grp.items.length + '</p><div class="plist7">' +
        grp.items.map(([n, t, href, soon]) => {
          const badge = soon ? '<span class="wcard__soon wcard__soon--inline">Coming soon</span>' : '';
          const inner = '<span class="prow__n">' + esc(n) + badge + (href ? ARROW : '') + '</span>' +
                        '<span class="prow__t">' + esc(t) + '</span>';
          return href ? '<a class="prow" href="' + url(href) + '">' + inner + '</a>'
                      : '<div class="prow">' + inner + '</div>';
        }).join('') + '</div>'
      ).join('') +
      '<p class="sheet__note">Case studies are linked where one is published on this site, with their status. The rest are client and studio projects from Gem Information Systems and AX-Channels Studio that have no published case study. The 16+ delivered figure is my AX-Channels Studio total, as stated on my CV; this list also includes GEMIS work.</p>',
    },
    led: {
      title: 'Projects led',
      sub: 'Projects where I led the design. Status is shown on each.',
      html: () => LED.map((l) =>
        '<div class="led"><div class="led__top"><span class="led__n">' + esc(l.n) + '</span>' +
        (l.href ? '<a class="prow__t" href="' + url(l.href) + '" style="margin-left:auto">View case study →</a>' : '') + '</div>' +
        '<p class="led__meta">' + esc(l.meta) + '</p>' +
        '<div class="led__facts">' + l.facts.map((f) => '<span class="led__fact">' + esc(f) + '</span>').join('') + '</div></div>'
      ).join('') +
      '<p class="sheet__note">The 4+ figure is my AX-Channels Studio total, as stated on my CV; this list also includes GEMIS and self-initiated work.</p>',
    },
  };

  const sheet = $('#sheet');
  if (!sheet) return;
  const titleEl = $('#sheetTitle'), subEl = $('#sheetSub'), bodyEl = $('#sheetBody');
  let lastFocus = null;

  const open = (key) => {
    const v = VIEWS[key];
    if (!v) return;
    lastFocus = document.activeElement;
    titleEl.textContent = v.title;
    subEl.textContent = v.sub;
    bodyEl.innerHTML = v.html();
    bodyEl.scrollTop = 0;
    sheet.hidden = false;
    document.body.style.overflow = 'hidden';
    $('#sheetX').focus();
  };
  const close = () => {
    sheet.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  };

  $$('.stat--link').forEach((b) => {
    const key = b.dataset.sheet;
    if (!key) return;
    b.addEventListener('click', (e) => { e.stopImmediatePropagation(); open(key); });
  });
  $$('[data-sheet-close]', sheet).forEach((el) => el.addEventListener('click', close));
  addEventListener('keydown', (e) => {
    if (sheet.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    if (e.key === 'Tab') {
      /* keep focus inside the dialog */
      const f = $$('a[href],button,[tabindex]:not([tabindex="-1"])', sheet).filter((el) => el.offsetParent);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
