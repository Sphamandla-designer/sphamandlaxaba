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
  var revealTargets = document.querySelectorAll('[data-reveal], .decision, .tree__group, .cs-section__title, .shead, .rows .row, .fig, .mx-head, .mx-part, .mx-feat__head, .mx-feat__media, .mx-beats, .mx-card, .mx-chain li, .mx-problem, .mx-steps li, .mx-map, .mx-counts li, .mx-phases > li, .mx-caveats li, .mx-lessons article, .mx-gallery .mx-shot, .mx-status, .mq-seven li, .mq-steps li, .mq-dec__head, .mq-dec__media, .mq-strip li, .mq-show .mx-shot, .mx-statuslist, .mx-flowmap, .mf-legend, .mf-ia__groups, .mf-split, .mf-legacy__item, .mf-modules li, .mf-measures li, .mf-pattern, .mf-approach li');
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

  // ------------------------------- case-study chapters & reading progress
  var chapterNav = document.querySelector('[data-chapters]');
  if (chapterNav) {
    var chapterLinks = Array.prototype.slice.call(chapterNav.querySelectorAll('ol a[href^="#"]'));
    var chapterEls = chapterLinks.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
    var bar = chapterNav.querySelector('[data-progress]');
    var article = chapterNav.closest('article');
    var activeIdx = -1, ticking = false;
    function updateChapters() {
      ticking = false;
      var line = window.innerHeight * 0.35, idx = -1;
      for (var i = 0; i < chapterEls.length; i++) {
        if (chapterEls[i] && chapterEls[i].getBoundingClientRect().top <= line) idx = i;
      }
      if (idx !== activeIdx) {
        if (activeIdx > -1) chapterLinks[activeIdx].removeAttribute('aria-current');
        activeIdx = idx;
        if (idx > -1) {
          var link = chapterLinks[idx], list = link.closest('ol');
          link.setAttribute('aria-current', 'true');
          // Keep the active chapter in view inside the horizontally scrolling list.
          var target = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
          if (list.scrollTo) list.scrollTo({ left: target, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
        }
      }
      if (bar && article) {
        var r = article.getBoundingClientRect();
        var total = r.height - window.innerHeight;
        bar.style.setProperty('--p', total > 0 ? Math.min(1, Math.max(0, -r.top / total)).toFixed(4) : 0);
      }
    }
    function queueChapters() { if (!ticking) { ticking = true; requestAnimationFrame(updateChapters); } }
    window.addEventListener('scroll', queueChapters, { passive: true });
    window.addEventListener('resize', queueChapters, { passive: true });
    updateChapters();
  }

  // ------------------------------------------- horizontal journey rail
  var rail = document.querySelector('[data-rail]');
  if (rail) {
    var prevBtn = document.querySelector('[data-rail-prev]');
    var nextBtn = document.querySelector('[data-rail-next]');
    var railStep = function () {
      var first = rail.children[0], second = rail.children[1];
      return second ? second.offsetLeft - first.offsetLeft : rail.clientWidth;
    };
    var railState = function () {
      if (prevBtn) prevBtn.disabled = rail.scrollLeft <= 2;
      if (nextBtn) nextBtn.disabled = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 2;
    };
    var railMove = function (dir) {
      rail.scrollBy({ left: dir * railStep(), behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    };
    if (prevBtn) prevBtn.addEventListener('click', function () { railMove(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { railMove(1); });
    rail.addEventListener('scroll', railState, { passive: true });
    window.addEventListener('resize', railState, { passive: true });
    railState();
  }

  // ------------------------------------------------- autoplaying videos
  // Muted, looping screen recordings. Each starts when it scrolls into view
  // and pauses when it leaves, so only what is on screen downloads or plays.
  // Phones get the small file via <source media>; slow connections and Data
  // Saver get it everywhere. Data Saver, 2G and reduced-motion users get a
  // poster and a play button instead of autoplay. Without JS: native controls.
  var videoFigs = document.querySelectorAll('[data-video]');
  if (videoFigs.length) {
    var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};
    var saveData = !!conn.saveData;
    var netType = conn.effectiveType || '';
    var slowNet = saveData || /2g|3g/.test(netType);
    var noAutoplay = reduceMotion.matches || saveData || /2g/.test(netType);

    videoFigs.forEach(function (fig) {
      var v = fig.querySelector('video');
      var btn = fig.querySelector('[data-video-toggle]');
      if (!v || !btn) return;
      v.removeAttribute('controls');
      btn.hidden = false;
      var needsLoad = false;
      if (slowNet) {
        var sources = v.querySelectorAll('source');
        if (sources.length > 1) { sources[0].removeAttribute('media'); for (var i = 1; i < sources.length; i++) sources[i].remove(); needsLoad = true; }
      }
      var userPaused = false, inView = false;
      var sync = function () {
        var playing = !v.paused && !v.ended;
        fig.classList.toggle('is-playing', playing);
        btn.setAttribute('aria-label', playing ? 'Pause video' : 'Play video');
      };
      // Re-run source selection only when the video is first needed.
      var play = function () { if (needsLoad) { needsLoad = false; v.load(); } var p = v.play(); if (p && p.catch) p.catch(sync); };
      var toggle = function () { if (v.paused) { userPaused = false; play(); } else { userPaused = true; v.pause(); } };
      v.addEventListener('play', sync);
      v.addEventListener('pause', sync);
      btn.addEventListener('click', toggle);
      v.addEventListener('click', toggle);
      fig._setInView = function (visible) {
        inView = visible;
        if (visible) { if (!noAutoplay && !userPaused) play(); }
        else if (!v.paused) v.pause();
      };
      sync();
    });

    if ('IntersectionObserver' in window) {
      var videoIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.target._setInView(e.isIntersecting && e.intersectionRatio >= 0.2); });
      }, { threshold: [0, 0.2, 0.6] });
      videoFigs.forEach(function (f) { if (f._setInView) videoIO.observe(f); });
    } else if (!noAutoplay) {
      videoFigs.forEach(function (f) { if (f._setInView) f._setInView(true); });
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) videoFigs.forEach(function (f) { var v = f.querySelector('video'); if (v && !v.paused) { v.pause(); f._resume = true; } });
      else videoFigs.forEach(function (f) { if (f._resume) { f._resume = false; var v = f.querySelector('video'); if (v) v.play().catch(function () {}); } });
    });
  }

  // ------------------------------------------------ before / after compare
  document.querySelectorAll('[data-compare]').forEach(function (fig) {
    var bar = fig.querySelector('.mx-compare__bar');
    if (bar) bar.hidden = false;
    fig.querySelectorAll('[data-compare-show]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var view = btn.getAttribute('data-compare-show');
        fig.setAttribute('data-view', view);
        fig.querySelectorAll('[data-compare-show]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      });
    });
  });

  // ------------------------------------------- ManaGEM design-system board
  // Entrance plays once (.ds-seen). Looping demos run only while the board is
  // on screen (.ds-live) and stop when it leaves. Reduced motion gets the
  // final states with no movement (.ds-static).
  document.querySelectorAll('[data-ds]').forEach(function (board) {
    var timers = [], running = false;
    var later = function (fn, ms) { timers.push(setTimeout(fn, ms)); };
    board.querySelectorAll('.ds-tile').forEach(function (t, i) { t.style.setProperty('--t-i', i); });

    var field = board.querySelector('[data-ds-type]');
    var tabSets = board.querySelectorAll('[data-ds-tabs], [data-ds-subtabs]');
    var badge = board.querySelector('[data-ds-badge]');
    var stepper = board.querySelector('[data-ds-stepper]');
    var nav = board.querySelector('[data-ds-nav]');
    var counts = board.querySelectorAll('[data-ds-count]');

    function typeLoop() {
      if (!field || !running) return;
      var text = field.getAttribute('data-ds-type'), out = field.querySelector('.ds-input__v'), i = 0;
      field.classList.add('is-focus'); out.textContent = '';
      (function next() {
        if (!running) return;
        if (i <= text.length) { out.textContent = text.slice(0, i++); later(next, 55 + Math.random() * 70); }
        else { later(function () { field.classList.remove('is-focus'); later(typeLoop, 1400); }, 1800); }
      })();
    }
    // Tabs and sub-tabs: move the active state along, as a user switching views would.
    function tabLoop() {
      if (!running) return;
      tabSets.forEach(function (set) {
        var items = set.children, on = 0;
        for (var k = 0; k < items.length; k++) if (items[k].classList.contains('is-on')) on = k;
        items[on].classList.remove('is-on'); items[(on + 1) % items.length].classList.add('is-on');
      });
      later(tabLoop, 1700);
    }
    var badges = [['ds-badge--sky', 'Unpaid'], ['ds-badge--amber', 'Partial'], ['ds-badge--emerald', 'Paid'], ['ds-badge--red', 'Overdue']], b = 0;
    function badgeLoop() {
      if (!badge || !running) return;
      b = (b + 1) % badges.length;
      badge.className = 'ds-badge ' + badges[b][0] + ' is-swap';
      badge.textContent = badges[b][1];
      later(badgeLoop, 1900);
    }
    function stepLoop(n) {
      if (!stepper || !running) return;
      stepper.setAttribute('data-step', n);
      later(function () { stepLoop(n >= 4 ? 1 : n + 1); }, n >= 4 ? 2000 : 1100);
    }
    function navTo(i) {
      if (!nav) return;
      var item = nav.querySelector('[data-i="' + i + '"]'), bar = nav.querySelector('.ds-nav__bar');
      if (item && bar) bar.style.transform = 'translateY(' + item.offsetTop + 'px)';
      nav.querySelectorAll('.ds-nav__i').forEach(function (el) { el.style.color = el === item ? '#fff' : ''; });
    }
    var navOrder = [1, 2, 3, 4, 0], n = 0;
    function navLoop() { if (!nav || !running) return; navTo(navOrder[n]); n = (n + 1) % navOrder.length; later(navLoop, 1500); }
    function countUp() {
      counts.forEach(function (el) {
        var target = +el.getAttribute('data-ds-count'), t0 = performance.now();
        (function frame(t) { var k = Math.min(1, (t - t0) / 1200); el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))); if (k < 1 && running) requestAnimationFrame(frame); else el.textContent = target; })(t0);
      });
    }

    function start() {
      if (running) return;
      running = true;
      board.classList.add('ds-seen', 'ds-live');
      typeLoop(); later(tabLoop, 1200); later(badgeLoop, 1200); stepLoop(1); navLoop(); countUp();
    }
    function stop() {
      running = false;
      timers.forEach(clearTimeout); timers = [];
      board.classList.remove('ds-live');
    }

    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      board.classList.add('ds-static');
      if (field) field.classList.add('is-focus');
      navTo(1);
      return;
    }
    navTo(1);
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) start(); else stop(); });
    }, { threshold: 0.15 }).observe(board);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { stop(); return; }
      var r = board.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) start();
    });
  });

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

  // ------------------------------------------------ homepage hero stage
  // The product screen tips up into place as it scrolls into view.
  var stage = document.querySelector('[data-hm-stage]');
  if (stage) {
    if (reduceMotion.matches) stage.style.setProperty('--lift', 1);
    else {
      var liftTick = false;
      var lift = function () {
        liftTick = false;
        var r = stage.getBoundingClientRect(), vh = window.innerHeight;
        var p = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.85)));
        stage.style.setProperty('--lift', (1 - Math.pow(1 - p, 3)).toFixed(4));
      };
      window.addEventListener('scroll', function () { if (!liftTick) { liftTick = true; window.requestAnimationFrame(lift); } }, { passive: true });
      window.addEventListener('resize', lift);
      lift();
    }
  }

  // ------------------------------------------- ManaGEM cinematic layer
  // Scroll-linked 3D and text motion for the ManaGEM pages. Each tracked
  // element reports a 0–1 progress from its position in the viewport; the
  // value is eased toward its target every frame (that easing is the "smooth
  // scroll" feel, with native scrolling left alone) and written to a CSS
  // variable. All styling lives in src/styles/06-managem-cine.css.
  (function () {
    if (!document.body.classList.contains('page-case--managem')) return;
    if (reduceMotion.matches || !('IntersectionObserver' in window) || !window.requestAnimationFrame) return;

    var vh = window.innerHeight;
    var tracked = [];
    var raf = 0;
    function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
    function inOut(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function out(t) { return 1 - Math.pow(1 - t, 3); }
    function track(el, measure, apply, k) { tracked.push({ el: el, measure: measure, apply: apply, cur: null, k: k || 0.14 }); }
    function frame() {
      raf = 0;
      var again = false;
      for (var i = 0; i < tracked.length; i++) {
        var t = tracked[i];
        var r = t.el.getBoundingClientRect();
        if (t.cur !== null && (r.bottom < -vh || r.top > vh * 2)) continue;
        var target = t.measure(r);
        if (t.cur === null || Math.abs(target - t.cur) < 0.0006) t.cur = target;
        else { t.cur += (target - t.cur) * t.k; again = true; }
        t.apply(t.cur, t.el);
      }
      if (again) request();
    }
    function request() { if (!raf) raf = window.requestAnimationFrame(frame); }
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', function () { vh = window.innerHeight; request(); });
    var enter = function (r) { return clamp((vh - r.top) / (vh * 0.7)); };
    var through = function (r) { return clamp((vh - r.top) / (vh + r.height)); };

    // Split a plain-text element into words (kept readable for assistive tech).
    function split(el, cls) {
      if (el.children.length) return null;
      var text = el.textContent.trim();
      if (!text) return null;
      el.setAttribute('aria-label', text);
      el.innerHTML = text.split(/\s+/).map(function (w, i) {
        return cls === 'mc-sw'
          ? '<span class="mc-sw" aria-hidden="true">' + w + '</span>'
          : '<span class="mc-w" aria-hidden="true"><span style="--d:' + i + '">' + w + '</span></span>';
      }).join(' ');
      return el.children;
    }

    // Headings: words rise out of a mask when the heading enters.
    var headIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); headIO.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.2 });
    document.querySelectorAll('[data-mc-split], .mx .mx-h2, .mx .mf-title, .mq-invite h2, .mf-return h2').forEach(function (el) {
      if (!split(el)) return;
      if (el.hasAttribute('data-mc-split')) window.setTimeout(function () { el.classList.add('is-in'); }, 120);
      else headIO.observe(el);
    });

    // Hero: the tilted dashboard flattens and its layers settle into place.
    var hero = document.querySelector('[data-mc-hero]');
    if (hero) {
      track(hero, function (r) { return clamp(-r.top / Math.max(1, r.height - vh)); }, function (p) {
        var e = inOut(clamp((p - 0.03) / 0.72));
        hero.style.setProperty('--e', e.toFixed(4));
        hero.style.setProperty('--k', clamp(p / 0.2).toFixed(4));
        hero.classList.toggle('is-flat', e >= 1);
        hero.classList.toggle('is-past', p > 0.2);
        hero._e = e;
      }, 0.12);
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        hero.addEventListener('pointermove', function (ev) {
          var k = 1 - (hero._e || 0);
          hero.style.setProperty('--tx', ((ev.clientX / window.innerWidth - 0.5) * 7 * k).toFixed(2) + 'deg');
          hero.style.setProperty('--ty', ((0.5 - ev.clientY / vh) * 5 * k).toFixed(2) + 'deg');
        });
      }
    }

    // Dark heroes on the full case study and design-system pages: the tilted
    // screen behind the title drifts as the hero scrolls away.
    document.querySelectorAll('[data-mc-dark]').forEach(function (el) {
      track(el, function (r) { return clamp(-r.top / Math.max(1, r.height)); }, function (p) { el.style.setProperty('--hp', p.toFixed(4)); });
    });

    // The question: words light up as the paragraph crosses the viewport.
    document.querySelectorAll('[data-mc-scrub]').forEach(function (el) {
      var words = split(el, 'mc-sw');
      if (!words) return;
      var lit = 0;
      track(el, function (r) { return clamp((vh * 0.82 - r.top) / (r.height + vh * 0.32)); }, function (p) {
        var n = Math.round(p * words.length);
        if (n === lit) return;
        for (var i = Math.min(n, lit); i < Math.max(n, lit); i++) words[i].classList.toggle('is-lit', i < n);
        lit = n;
      }, 0.2);
    });

    // Section numerals drift behind the content.
    document.querySelectorAll('.mx .mx-sec').forEach(function (sec) {
      var n = sec.querySelector('.mx-kicker__n');
      if (!n) return;
      var ghost = document.createElement('span');
      ghost.className = 'mc-ghost';
      ghost.setAttribute('aria-hidden', 'true');
      ghost.textContent = n.textContent;
      sec.classList.add('mc-has-ghost');
      sec.insertBefore(ghost, sec.firstChild);
      track(sec, through, function (p) { ghost.style.setProperty('--gp', p.toFixed(4)); });
    });

    // Larger screens tip up into place as they enter.
    document.querySelectorAll('.mx .mx-shot > .mx-frame-wrap, .mx .mx-video, .mx .ds-board').forEach(function (el) {
      if (el.closest('.mc-hero, .mq-strip, [data-mc-nav], .dsx-x, .dsx-phones, .dsx-navcompare') || el.offsetWidth < 460) return;
      el.classList.add('mc-tilt');
      track(el, enter, function (p) { el.style.setProperty('--sp', out(p).toFixed(4)); });
    });

    // Navigation: the original menus turn away as the redesign steps forward.
    document.querySelectorAll('[data-mc-nav]').forEach(function (el) {
      track(el, function (r) { return clamp((vh * 0.62 - r.top) / (vh * 0.5)); }, function (p) { el.style.setProperty('--np', inOut(p).toFixed(4)); });
    });

    // Take-On steps fan in.
    document.querySelectorAll('.mx .mq-strip').forEach(function (el) {
      el.classList.add('mc-fan');
      track(el, enter, function (p) { el.style.setProperty('--sp', out(p).toFixed(4)); });
    });

    // Module band moves with the scroll.
    document.querySelectorAll('[data-mc-marquee]').forEach(function (el) {
      var trackEl = el.firstElementChild;
      track(el, function (r) { return vh - r.top; }, function (v) { trackEl.style.setProperty('--mx', (-40 - v * 0.42).toFixed(1)); }, 0.1);
    });

    // Count up.
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        countIO.unobserve(e.target);
        var end = +e.target.getAttribute('data-mc-count'), t0 = 0;
        (function tick(now) {
          if (!t0) t0 = now;
          var p = clamp((now - t0) / 1100);
          e.target.textContent = Math.round(out(p) * end);
          if (p < 1) window.requestAnimationFrame(tick);
        })(window.performance.now());
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('[data-mc-count]').forEach(function (el) { countIO.observe(el); });

    request();
  })();

})();
