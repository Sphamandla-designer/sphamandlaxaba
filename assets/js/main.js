// Site behaviour. No dependencies. Everything here is an enhancement:
// the site reads and navigates fully without JavaScript.
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ---------------------------------------------------------------- theme
  var toggle = document.querySelector('[data-theme-toggle]');
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function saved() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }
  function apply(theme) {
    root.dataset.theme = theme;
    if (toggle) toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
  apply(root.dataset.theme || 'light');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode: still switches */ }
    });
  }
  // Follow the OS until the visitor has made a choice of their own.
  systemDark.addEventListener('change', function (e) {
    var s = saved();
    if (s !== 'light' && s !== 'dark') apply(e.matches ? 'dark' : 'light');
  });

  // ------------------------------------------------------------ header
  var header = document.querySelector('[data-header]');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // -------------------------------------------------------- mobile menu
  var navToggle = document.querySelector('[data-nav-toggle]');
  var menu = document.querySelector('[data-nav-menu]');

  function setMenu(open) {
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (navToggle && menu) {
    navToggle.addEventListener('click', function () {
      setMenu(navToggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        navToggle.focus();
      }
    });
    window.matchMedia('(min-width: 1120px)').addEventListener('change', function (e) {
      if (e.matches) setMenu(false);
    });
  }

  // ------------------------------------------------------ scroll reveal
  var revealTargets = document.querySelectorAll('[data-reveal], .decision, .tree__group, .cs-section__title, .shead, .rows .row, .fig');
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    revealTargets.forEach(function (el) {
      el.setAttribute('data-reveal', '');
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) { el.classList.add('is-in'); return; }
      io.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-in'); });
  }

  // ------------------------------------------------- headline word reveal
  document.querySelectorAll('[data-words]').forEach(function (el) {
    if (reduceMotion.matches) return;
    var words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', el.textContent.trim());
    el.innerHTML = words.map(function (w, i) {
      return '<span class="w" aria-hidden="true"><span style="--d:' + i + '">' + w + '</span></span>';
    }).join(' ');
  });

  // ---------------------------------------------------- lazy image fade
  document.querySelectorAll('img[loading="lazy"]').forEach(function (im) {
    var mark = function () { im.classList.add('is-loaded'); };
    if (im.complete) mark(); else { im.addEventListener('load', mark); im.addEventListener('error', mark); }
  });

  // ------------------------------------------- hero visual: workflow nodes
  var canvas = document.querySelector('[data-hero-canvas]');
  if (canvas && !reduceMotion.matches && canvas.getContext) {
    var ctx2 = canvas.getContext('2d');
    var wrap = canvas.parentElement;
    var nodes = [], W = 0, H = 0, dpr = 1, mouse = { x: -1e4, y: -1e4 }, raf;
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = wrap.clientWidth; H = wrap.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx2.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.round(Math.min(140, Math.max(40, (W * H) / 12000)));
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: 1.4 + Math.random() * 2.2 });
      }
    }
    function ink() { return getComputedStyle(root).getPropertyValue('--ink').trim() || '#000'; }
    function draw() {
      ctx2.clearRect(0, 0, W, H);
      var c = ink(), link = 170;
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < -20) n.x = W + 20; if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20; if (n.y > H + 20) n.y = -20;
        var dx = mouse.x - n.x, dy = mouse.y - n.y, d2 = dx * dx + dy * dy;
        if (d2 < 32000) { n.x -= dx * 0.004; n.y -= dy * 0.004; }
      }
      ctx2.lineWidth = 1;
      for (var a = 0; a < nodes.length; a++) {
        for (var b = a + 1; b < nodes.length; b++) {
          var p = nodes[a], q = nodes[b], ddx = p.x - q.x, ddy = p.y - q.y, dist = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dist < link) {
            ctx2.globalAlpha = (1 - dist / link) * 0.5;
            ctx2.strokeStyle = c;
            ctx2.beginPath(); ctx2.moveTo(p.x, p.y); ctx2.lineTo(q.x, q.y); ctx2.stroke();
          }
        }
      }
      ctx2.globalAlpha = 0.9; ctx2.fillStyle = c;
      for (var k = 0; k < nodes.length; k++) { ctx2.beginPath(); ctx2.arc(nodes[k].x, nodes[k].y, nodes[k].r, 0, Math.PI * 2); ctx2.fill(); }
      ctx2.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }
    size(); draw();
    window.addEventListener('resize', function () { size(); }, { passive: true });
    window.addEventListener('pointermove', function (e) { var r = wrap.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; }, { passive: true });
    window.addEventListener('pointerleave', function () { mouse.x = mouse.y = -1e4; });
    document.addEventListener('visibilitychange', function () { if (document.hidden) cancelAnimationFrame(raf); else draw(); });
    // Pause when the hero is off screen.
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { cancelAnimationFrame(raf); draw(); } else cancelAnimationFrame(raf); }); }).observe(wrap);
    }
  }

  // -------------------------------------------------------- image viewer
  var viewer = document.querySelector('[data-viewer]');
  if (viewer && typeof viewer.showModal === 'function') {
    var vImg = viewer.querySelector('[data-viewer-img]');
    var vCap = viewer.querySelector('[data-viewer-caption]');
    var opener = null;
    document.addEventListener('click', function (e) {
      var link = e.target.closest('[data-zoom]');
      if (!link || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      opener = link;
      var inner = link.querySelector('img');
      vImg.src = link.getAttribute('href');
      vImg.alt = inner ? inner.alt : '';
      vCap.textContent = link.dataset.caption || '';
      viewer.showModal();
    });
    viewer.addEventListener('click', function (e) {
      if (e.target === viewer || e.target.classList.contains('viewer__stage')) viewer.close();
    });
    viewer.addEventListener('close', function () {
      vImg.removeAttribute('src');
      if (opener) opener.focus();
    });
  }

  // ------------------------------------------------------ copy email
  var status = document.querySelector('[data-copy-status]');
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    var label = btn.querySelector('[data-copy-label]');
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      var done = function (ok) {
        label.textContent = ok ? 'Copied' : 'Copy failed';
        btn.classList.toggle('is-done', ok);
        if (status) status.textContent = ok ? 'Email address copied to clipboard.' : 'Could not copy. The address is ' + text + '.';
        setTimeout(function () { label.textContent = 'Copy'; btn.classList.remove('is-done'); }, 2400);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
      } else {
        done(false);
      }
    });
  });

})();
