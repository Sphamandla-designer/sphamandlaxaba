// SX / INTELLIGENCE — homepage behaviour. No dependencies.
// Everything here is an enhancement: all content is in the HTML and readable
// without JavaScript. Nothing is fetched; no data on the page is "live" except
// the Johannesburg clock, which is computed from the visitor's own clock.
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // ------------------------------------------------------------- intro
  // Plays once (at most every 12 hours), never with reduced motion, never
  // when arriving at an anchor. Skip with the button, Escape, a click, a key
  // press or a scroll. The page behind it is already complete.
  var intro = $('[data-intro]');
  function ready() { root.classList.add('sx-ready'); }
  function endIntro() {
    if (!intro || intro._done) return;
    intro._done = true;
    try { localStorage.setItem('sx-intro', String(Date.now())); } catch (e) {}
    intro.classList.add('is-out');
    ready();
    window.setTimeout(function () { root.classList.remove('sx-intro'); }, 720);
    ['keydown', 'wheel', 'touchmove'].forEach(function (ev) { window.removeEventListener(ev, endIntro); });
  }
  if (root.classList.contains('sx-intro') && intro) {
    var skip = $('[data-intro-skip]', intro);
    skip.tabIndex = 0;
    intro.addEventListener('click', endIntro);
    ['keydown', 'wheel', 'touchmove'].forEach(function (ev) { window.addEventListener(ev, endIntro, { passive: true }); });
    window.setTimeout(endIntro, 2300);
  } else {
    window.requestAnimationFrame(function () { window.requestAnimationFrame(ready); });
  }

  // ------------------------------------------------------------- clock
  var clocks = $$('[data-clock]');
  function tickClock() {
    var t;
    try { t = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Africa/Johannesburg' }).format(new Date()); } catch (e) { return; }
    clocks.forEach(function (c) { c.textContent = t; });
  }
  if (clocks.length) { tickClock(); window.setInterval(tickClock, 20000); }

  // -------------------------------------------------- navigation state
  var sections = $$('[data-sec]');
  var navLinks = $$('[data-nav]');
  var railLinks = $$('[data-rail-link]');
  var railFill = $('[data-rail-fill]');
  // The top bar has five destinations; sections without one light the nearest.
  var navFor = { overview: 'overview', approach: 'approach', work: 'work', architecture: 'approach', experience: 'experience', contact: 'contact' };
  function setCurrent(id) {
    navLinks.forEach(function (a) { if (a.getAttribute('data-nav') === navFor[id]) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    railLinks.forEach(function (a) { if (a.getAttribute('data-rail-link') === id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
  }
  function onScroll() {
    var y = window.scrollY, vh = window.innerHeight, cur = sections[0];
    sections.forEach(function (s) { if (s.getBoundingClientRect().top <= vh * 0.4) cur = s; });
    if (cur) setCurrent(cur.id);
    var max = document.documentElement.scrollHeight - vh;
    if (railFill) railFill.style.setProperty('--p', max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
    projectNav(vh);
  }

  // The case-study navigator marks the panel currently being read.
  var pnavLinks = $$('[data-pnav-link]'), projEls = $$('[data-proj]');
  function projectNav(vh) {
    var cur = null, hit = [], target = window.location.hash.replace('#case-', '');
    projEls.forEach(function (p) { var r = p.getBoundingClientRect(); if (r.top <= vh * 0.5 && r.bottom > vh * 0.25) hit.push(p.getAttribute('data-proj')); });
    // Two panels can share a row on wide screens: prefer the one that was asked for.
    if (hit.length) cur = hit.indexOf(target) > -1 ? target : hit[0];
    pnavLinks.forEach(function (a) { if (a.getAttribute('data-pnav-link') === cur) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
  }
  var ticking = false;
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; window.requestAnimationFrame(function () { ticking = false; onScroll(); }); } }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  // ------------------------------------------------------------ reveal
  // Headings are split into their rendered lines so each can rise on its own.
  function splitLines(el) {
    var words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', el.textContent.trim());
    el.innerHTML = words.map(function (w) { return '<span class="wd" aria-hidden="true">' + w + '</span>'; }).join(' ');
    var lines = [], top = null;
    $$('.wd', el).forEach(function (w) { if (w.offsetTop !== top) { top = w.offsetTop; lines.push([]); } lines[lines.length - 1].push(w.textContent); });
    el.innerHTML = lines.map(function (l, i) { return '<span class="ln" aria-hidden="true"><span style="--l:' + i + '">' + l.join(' ') + '</span></span>'; }).join('');
  }
  var revealables = $$('[data-r], [data-split]');
  if (!reduce && 'IntersectionObserver' in window) {
    var splitEls = $$('[data-split]');
    var doSplit = function () { splitEls.forEach(splitLines); };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(doSplit); else doSplit();
    var rt;
    window.addEventListener('resize', function () { window.clearTimeout(rt); rt = window.setTimeout(function () { splitEls.forEach(function (el) { el.textContent = el.getAttribute('aria-label'); splitLines(el); }); }, 200); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  }

  // ------------------------------------------- generic selector groups
  // One pressed button at a time; the matching panel is shown.
  function selector(buttons, panels, attrB, attrP, onChange) {
    function select(key, focus) {
      buttons.forEach(function (b) {
        var on = b.getAttribute(attrB) === key;
        b.setAttribute('aria-pressed', String(on));
        var strip = b.closest('[data-strip]');
        if (on && strip && strip.scrollWidth > strip.clientWidth) strip.scrollTo({ left: b.offsetLeft - (strip.clientWidth - b.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
      });
      panels.forEach(function (p) { p.hidden = p.getAttribute(attrP) !== key; });
      if (onChange) onChange(key);
      if (focus) { var b = buttons.filter(function (x) { return x.getAttribute(attrB) === key; })[0]; if (b) b.focus(); }
    }
    buttons.forEach(function (b, i) {
      b.addEventListener('click', function () { select(b.getAttribute(attrB)); });
      b.addEventListener('keydown', function (e) {
        var d = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? 1 : (e.key === 'ArrowUp' || e.key === 'ArrowLeft') ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        select(buttons[(i + d + buttons.length) % buttons.length].getAttribute(attrB), true);
      });
    });
    return select;
  }

  // ------------------------------------------- spatial intelligence map
  var map = $('[data-map]');
  if (map) {
    var dims = $$('[data-dim]', map), edges = $$('[data-edge]', map), pads = $$('[data-pad]', map);
    var paint = function (key) {
      edges.forEach(function (e) { e.classList.toggle('is-on', e.getAttribute('data-edge').split(' ').indexOf(key) > -1); });
      pads.forEach(function (p) { p.classList.toggle('is-on', p.getAttribute('data-pad') === key); });
    };
    var selectDim = selector(dims, $$('[data-dim-panel]', map), 'data-dim', 'data-dim-panel', paint);
    paint(dims[0].getAttribute('data-dim'));
    // Until someone interacts, the map steps through its four dimensions.
    var auto = null, i = 0;
    var read = $('#map-read'), seen = true;
    var stop = function () { if (auto) { window.clearInterval(auto); auto = null; } read.setAttribute('aria-live', 'polite'); };
    if (!reduce) auto = window.setInterval(function () { if (document.hidden || !seen) return; i = (i + 1) % dims.length; selectDim(dims[i].getAttribute('data-dim')); }, 4200);
    ['pointerdown', 'keydown', 'focusin'].forEach(function (ev) { map.addEventListener(ev, stop); });
    if (fine) dims.forEach(function (b) { b.addEventListener('pointerenter', function () { stop(); selectDim(b.getAttribute('data-dim')); }); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { seen = en[0].isIntersecting; }).observe(map);
  }

  // ------------------------------------------------------ capabilities
  var cap = $('[data-cap]');
  if (cap) {
    var selectCap = selector($$('[data-cap-tab]', cap), $$('[data-cap-panel]', cap), 'data-cap-tab', 'data-cap-panel');
    // A dimension on the hero map opens its capability domain.
    $$('[data-goto-cap]').forEach(function (a) { a.addEventListener('click', function () { selectCap(a.getAttribute('data-goto-cap')); }); });
  }

  // ------------------------------------------------------ architecture
  var arch = $('[data-arch]');
  if (arch) {
    var plates = $$('[data-plate]', arch);
    var lift = function (key) { plates.forEach(function (p) { var n = +p.getAttribute('data-plate'); p.classList.toggle('is-on', n === +key); p.classList.toggle('is-above', n < +key); }); };
    var selectLayer = selector($$('[data-layer]', arch), $$('[data-layer-panel]', arch), 'data-layer', 'data-layer-panel', lift);
    // Walk the sequence from inside the panel; focus follows to the new layer.
    $$('[data-layer-go]', arch).forEach(function (b) { b.addEventListener('click', function () { selectLayer(b.getAttribute('data-layer-go'), true); }); });
    // The plates are a pointer shortcut to the same layers.
    plates.forEach(function (pl) { pl.addEventListener('click', function () { selectLayer(pl.getAttribute('data-plate')); }); });
    lift(0);
  }

  // ---------------------------------- projects ↔ discipline matrix link
  var matrix = $('[data-matrix]');
  function col(slug, on) { if (matrix) $$('[data-col="' + slug + '"]', matrix).forEach(function (c) { c.classList.toggle('is-col', on); }); }
  if (matrix) $$('thead [data-col]', matrix).forEach(function (th) {
    var slug = th.getAttribute('data-col');
    th.addEventListener('pointerenter', function () { col(slug, true); });
    th.addEventListener('pointerleave', function () { col(slug, false); });
    th.addEventListener('focusin', function () { col(slug, true); });
    th.addEventListener('focusout', function () { col(slug, false); });
  });

  // ------------------------------------------- cursor label on projects
  var cursor = $('[data-cursor]');
  if (cursor && fine && !reduce) {
    $$('[data-proj]').forEach(function (p) {
      p.addEventListener('pointermove', function (e) { cursor.style.setProperty('--x', e.clientX + 'px'); cursor.style.setProperty('--y', e.clientY + 'px'); cursor.classList.add('is-on'); });
      p.addEventListener('pointerleave', function () { cursor.classList.remove('is-on'); });
    });
  }

  // ---------------------------------------------------------- copy email
  $$('[data-copy]').forEach(function (b) {
    var label = $('[data-copy-label]', b), orig = label.textContent;
    b.addEventListener('click', function () {
      var done = function (ok) { label.textContent = ok ? 'Copied' : 'Press Ctrl+C'; window.setTimeout(function () { label.textContent = orig; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(b.getAttribute('data-copy')).then(function () { done(true); }, function () { done(false); });
      else done(false);
    });
  });

  // -------------------------------------------------- hero spatial field
  // A perspective grid drawn on canvas: a floor of lines receding to a
  // horizon, drifting slowly toward the viewer. Decorative only.
  var canvas = $('[data-field]');
  if (canvas && canvas.getContext && !reduce) {
    var ctx = canvas.getContext('2d'), w = 0, h = 0, dpr = 1, raf = 0, t0 = 0, px = 0, tx = 0;
    var size = function () {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    var draw = function (now) {
      raf = window.requestAnimationFrame(draw);
      if (!t0) t0 = now;
      var t = (now - t0) / 1000;
      px += (tx - px) * 0.05;
      ctx.clearRect(0, 0, w, h);
      var hz = h * 0.42, vx = w * (0.62 + px * 0.04), rows = 22, cols = 26, spread = w * 1.9;
      ctx.lineWidth = 1;
      for (var r = 0; r < rows; r++) {
        var z = ((r + (t * 0.22) % 1) / rows);
        var y = hz + Math.pow(z, 2.2) * (h - hz) * 1.05;
        ctx.strokeStyle = 'rgba(146,155,169,' + (0.02 + z * 0.13).toFixed(3) + ')';
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      for (var c = -cols; c <= cols; c++) {
        ctx.strokeStyle = 'rgba(146,155,169,' + (c % 4 === 0 ? 0.13 : 0.06) + ')';
        ctx.beginPath(); ctx.moveTo(vx, hz); ctx.lineTo(vx + (c / cols) * spread * 1.6, h); ctx.stroke();
      }
      // one red marker travelling along a grid line
      var m = (t * 0.07) % 1, my = hz + Math.pow(m, 2.2) * (h - hz) * 1.05, mx = vx + 0.25 * spread * 1.6 * Math.pow(m, 2.2) * 1.05;
      ctx.fillStyle = 'rgba(227,75,75,' + (0.25 + m * 0.6).toFixed(3) + ')';
      ctx.fillRect(mx - 2, my - 2, 4 + m * 3, 4 + m * 3);
    };
    size();
    window.addEventListener('resize', size);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { en.forEach(function (e) { window.cancelAnimationFrame(raf); if (e.isIntersecting) raf = window.requestAnimationFrame(draw); }); }).observe(canvas);
    } else raf = window.requestAnimationFrame(draw);
  }
})();
