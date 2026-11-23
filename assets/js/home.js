// Homepage dashboard behaviour. No dependencies; all content is in the HTML.
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // Johannesburg clock (computed from the visitor's own clock).
  var clocks = $$('[data-clock]');
  function tick() { try { var t = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Africa/Johannesburg' }).format(new Date()); clocks.forEach(function (c) { c.textContent = t; }); } catch (e) {} }
  tick(); window.setInterval(tick, 20000);

  // Sidebar / dock: mark the section being read.
  var secs = $$('[data-sec]'), navs = $$('[data-nav]'), busy = false;
  function spy() {
    busy = false;
    var cur = secs[0], vh = window.innerHeight;
    secs.forEach(function (s) { if (s.getBoundingClientRect().top <= vh * 0.4) cur = s; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = secs[secs.length - 1];
    navs.forEach(function (a) { if (a.getAttribute('data-nav') === cur.id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
  }
  window.addEventListener('scroll', function () { if (!busy) { busy = true; window.requestAnimationFrame(spy); } }, { passive: true });
  spy();

  // Pickers: one pressed button, one visible pane (projects, capabilities, process).
  $$('[data-pick]').forEach(function (root) {
    var scope = root.parentElement;
    var btns = $$('[data-pick-btn]', root), panes = $$('[data-pick-pane]', scope);
    function pick(key, focus) {
      btns.forEach(function (b, i) {
        var on = b.getAttribute('data-pick-btn') === String(key);
        b.setAttribute('aria-pressed', String(on));
        var li = b.closest('li'); if (li) li.classList.toggle('is-past', btns.map(function (x) { return x.getAttribute('data-pick-btn'); }).indexOf(String(key)) > i);
        var strip = b.closest('[data-strip]');
        if (on && strip && strip.scrollWidth > strip.clientWidth) strip.scrollTo({ left: b.offsetLeft - (strip.clientWidth - b.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
        if (on && focus) b.focus();
      });
      panes.forEach(function (p) { p.hidden = p.getAttribute('data-pick-pane') !== String(key); });
    }
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () { pick(b.getAttribute('data-pick-btn')); });
      b.addEventListener('keydown', function (e) {
        var d = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? 1 : (e.key === 'ArrowUp' || e.key === 'ArrowLeft') ? -1 : 0;
        if (!d) return; e.preventDefault();
        pick(btns[(i + d + btns.length) % btns.length].getAttribute('data-pick-btn'), true);
      });
    });
    $$('[data-pick-go]', scope).forEach(function (g) { g.addEventListener('click', function () { pick(g.getAttribute('data-pick-go'), true); }); });
  });

  // Search: filter the list of destinations; Enter opens the highlighted one.
  var find = $('[data-find]');
  if (find) {
    var input = $('[data-find-input]', find), list = $('.find__list', find), items = $$('li', list), active = -1;
    var none = document.createElement('li'); none.className = 'find__none'; none.textContent = 'Nothing matches.'; none.hidden = true; list.appendChild(none);
    var shown = function () { return items.filter(function (li) { return !li.hidden; }); };
    function open(on) { list.hidden = !on; input.setAttribute('aria-expanded', String(on)); if (!on) setActive(-1); }
    function setActive(n) { var v = shown(); active = n; items.forEach(function (li) { li.classList.remove('is-active'); }); if (v[n]) { v[n].classList.add('is-active'); input.setAttribute('aria-activedescendant', v[n].id); v[n].scrollIntoView({ block: 'nearest' }); } else input.removeAttribute('aria-activedescendant'); }
    function filter() { var q = input.value.trim().toLowerCase(); items.forEach(function (li) { li.hidden = q && li.textContent.toLowerCase().indexOf(q) < 0; }); none.hidden = shown().length > 0; open(true); setActive(shown().length ? 0 : -1); }
    input.addEventListener('focus', filter);
    input.addEventListener('input', filter);
    input.addEventListener('keydown', function (e) {
      var v = shown();
      if (e.key === 'ArrowDown') { e.preventDefault(); if (list.hidden) filter(); else setActive((active + 1) % v.length); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((active - 1 + v.length) % v.length); }
      else if (e.key === 'Enter' && v[active]) { e.preventDefault(); go(v[active]); }
      else if (e.key === 'Escape') { open(false); input.blur(); }
    });
    function go(li) { var a = $('a', li); open(false); input.value = ''; input.blur(); a.click(); }
    items.forEach(function (li) { li.addEventListener('mousedown', function (e) { e.preventDefault(); }); li.addEventListener('click', function () { open(false); input.value = ''; }); });
    document.addEventListener('click', function (e) { if (!find.contains(e.target)) open(false); });
    document.addEventListener('keydown', function (e) { if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); input.focus(); } });
  }

  // Copy email.
  $$('[data-copy]').forEach(function (b) {
    var label = $('[data-copy-label]', b), orig = label.textContent;
    b.addEventListener('click', function () {
      var done = function (ok) { label.textContent = ok ? 'Copied' : 'Press Ctrl+C'; window.setTimeout(function () { label.textContent = orig; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(b.getAttribute('data-copy')).then(function () { done(true); }, function () { done(false); }); else done(false);
    });
  });

  // Cards settle in as they enter the viewport.
  var cards = $$('.card, .sec__head');
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -6% 0px' });
    cards.forEach(function (c, i) { c.setAttribute('data-in', ''); c.style.setProperty('--d', i % 4); io.observe(c); });
  }
})();
