// Homepage behaviour and motion. No dependencies; all content is in the HTML.
// Motion model: one scroll handler writes a 0–1 progress value (--p: through
// the viewport, --s: scrolled past the top) on every [data-scroll] element and
// the stylesheet turns those into transforms. Everything here is an
// enhancement: with JavaScript off, or with reduced motion, the page is static
// and complete.
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (n) { return n < 0 ? 0 : n > 1 ? 1 : n; };
  var root = document.documentElement;
  if (!reduce) root.classList.add('motion');

  // Johannesburg clock (computed from the visitor's own clock).
  var clocks = $$('[data-clock]');
  function tick() { try { var t = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Africa/Johannesburg' }).format(new Date()); clocks.forEach(function (c) { c.textContent = t; }); } catch (e) {} }
  tick(); window.setInterval(tick, 20000);
  // Today's day and date in Johannesburg (the HTML carries the place as a fallback).
  try {
    var jhb = { timeZone: 'Africa/Johannesburg' }, now = new Date();
    $$('[data-day]').forEach(function (el) { el.textContent = new Intl.DateTimeFormat('en-GB', { weekday: 'long', timeZone: jhb.timeZone }).format(now); });
    $$('[data-date]').forEach(function (el) { el.textContent = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric', timeZone: jhb.timeZone }).format(now); });
  } catch (e) {}

  // Words that light up as the paragraph is read.
  $$('[data-words]').forEach(function (el) {
    if (reduce) return;
    var text = el.textContent.trim(), words = text.split(/\s+/);
    el.innerHTML = words.map(function (w) { return '<span>' + w + '</span>'; }).join(' ');
    el._words = $$('span', el);
  });

  // Pinned horizontal rail (process). Falls back to a native scroll-snap row.
  var rail = $('[data-rail]'), track = rail && $('[data-rail-track]', rail), railN = rail && $('[data-rail-n]', rail), railBar = rail && $('[data-rail-bar]', rail), railMax = 0, railOn = false;
  function sizeRail() {
    if (!rail) return;
    railOn = !reduce && window.innerWidth >= 1000 && window.innerHeight >= 620;
    rail.classList.toggle('is-pinned', railOn);
    if (railOn) { track.scrollLeft = 0; railMax = Math.max(0, track.scrollWidth - window.innerWidth); rail.style.height = (window.innerHeight + railMax) + 'px'; }
    else { rail.style.height = ''; track.style.transform = ''; }
  }
  function railStep(f) { var n = track.children.length, i = Math.min(n - 1, Math.round(f * (n - 1))); railN.textContent = (i + 1 < 10 ? '0' : '') + (i + 1); railBar.style.transform = 'scaleX(' + (1 / n + f * (1 - 1 / n)).toFixed(4) + ')'; }
  if (track) track.addEventListener('scroll', function () { if (!railOn) { var m = track.scrollWidth - track.clientWidth; railStep(m > 0 ? track.scrollLeft / m : 0); } }, { passive: true });

  // Scroll: section spy, per-section progress, word fill, rail.
  var secs = $$('[data-sec]'), navs = $$('[data-nav]'), scrolls = $$('[data-scroll]'), bar = $('[data-nav-bar]'), busy = false;
  function frame() {
    busy = false;
    var vh = window.innerHeight, y = window.scrollY;
    var cur = secs[0];
    secs.forEach(function (s) { if (s.getBoundingClientRect().top <= vh * 0.4) cur = s; });
    if (vh + y >= root.scrollHeight - 4) cur = secs[secs.length - 1];
    navs.forEach(function (a) { if (a.getAttribute('data-nav') === cur.id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    if (bar) bar.classList.toggle('is-scrolled', y > 8);
    if (!reduce) scrolls.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      el.style.setProperty('--p', clamp((vh - r.top) / (vh + r.height)).toFixed(4));
      el.style.setProperty('--s', clamp(-r.top / r.height).toFixed(4));
      var t = $('[data-words]', el);
      if (t && t._words) { var f = clamp((vh * 0.82 - t.getBoundingClientRect().top) / (vh * 0.5 + t.offsetHeight)), k = Math.round(f * t._words.length); t._words.forEach(function (w, i) { w.classList.toggle('on', i < k); }); }
    });
    if (railOn) { var rr = rail.getBoundingClientRect(), f = railMax ? clamp(-rr.top / railMax) : 0; track.style.transform = 'translate3d(' + (-f * railMax).toFixed(1) + 'px,0,0)'; railStep(f); }
  }
  function queue() { if (!busy) { busy = true; window.requestAnimationFrame(frame); } }
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', function () { sizeRail(); queue(); });
  window.addEventListener('load', function () { sizeRail(); queue(); });
  sizeRail(); frame();

  // Rise: headings and blocks settle in when they enter the viewport.
  var rises = $$('[data-rise]');
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    rises.forEach(function (el) { io.observe(el); });
  } else rises.forEach(function (el) { el.classList.add('is-in'); });

  // Pointer: the ember glow leans toward the cursor; pill buttons pull slightly.
  if (!reduce && fine) {
    $$('[data-pointer]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) { var r = el.getBoundingClientRect(); el.style.setProperty('--mx', ((e.clientX - r.left) / r.width).toFixed(3)); el.style.setProperty('--my', ((e.clientY - r.top) / r.height).toFixed(3)); });
    });
    $$('[data-magnet]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) { var r = el.getBoundingClientRect(); el.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1) + 'px)'; });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  // Project cards: each plays through its screens. The active bar's fill
  // animation is the timer, so pausing it pauses the player exactly.
  // Click a bar to jump, click the screen for the next one. Playback holds
  // on hover and keyboard focus, stops off screen, and never starts with
  // reduced motion (the controls still work).
  $$('[data-player]').forEach(function (root) {
    var slides = $$('[data-slide]', root), bars = $$('[data-bar]', root), cap = $('[data-cap]', root), count = $('[data-count]', root), toggle = $('[data-toggle]', root);
    var at = 0, userPaused = false, visible = false, hover = false;
    function sync() {
      var play = !reduce && !userPaused && visible;
      root.classList.toggle('is-playing', play);
      root.classList.toggle('is-held', play && hover);
    }
    function show(n) {
      at = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('is-on', i === at); });
      bars.forEach(function (b, i) {
        b.setAttribute('aria-pressed', String(i === at));
        b.classList.toggle('is-done', i < at);
        var fill = b.firstElementChild; fill.style.animation = 'none'; void fill.offsetWidth; fill.style.animation = '';
      });
      cap.textContent = bars[at].getAttribute('aria-label');
      count.textContent = (at + 1) + ' / ' + slides.length;
    }
    bars.forEach(function (b, i) {
      b.addEventListener('click', function () { show(i); });
      b.firstElementChild.addEventListener('animationend', function () { if (i === at) show(at + 1); });
    });
    $('[data-next]', root).addEventListener('click', function () { show(at + 1); });
    root.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); show(at + 1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); show(at - 1); } });
    if (!reduce) {
      toggle.hidden = false;
      toggle.addEventListener('click', function () { userPaused = !userPaused; toggle.setAttribute('aria-label', userPaused ? 'Play' : 'Pause'); sync(); });
      root.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { hover = true; sync(); } });
      root.addEventListener('pointerleave', function () { hover = false; sync(); });
      root.addEventListener('focusin', function (e) { if (e.target.matches(':focus-visible')) { hover = true; sync(); } });
      root.addEventListener('focusout', function () { hover = false; sync(); });
      if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; sync(); }, { threshold: 0.5 }).observe(root);
      else { visible = true; sync(); }
    }
  });

  // Copy email.
  $$('[data-copy]').forEach(function (b) {
    var label = $('[data-copy-label]', b), orig = label.textContent;
    b.addEventListener('click', function () {
      var done = function (ok) { label.textContent = ok ? 'Copied' : 'Press Ctrl+C'; window.setTimeout(function () { label.textContent = orig; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(b.getAttribute('data-copy')).then(function () { done(true); }, function () { done(false); }); else done(false);
    });
  });

})();
