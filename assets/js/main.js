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
    navToggle.querySelector('.nav-toggle__label').textContent = open ? 'Close' : 'Menu';
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
    window.matchMedia('(min-width: 900px)').addEventListener('change', function (e) {
      if (e.matches) setMenu(false);
    });
  }

  // ------------------------------------------------------ scroll reveal
  var revealTargets = document.querySelectorAll(
    '.shead, .snapshot__statement, .facts__item, .feature, .more__item, .stage, .caps__col, .timeline__item, .about-preview__grid > *, .cs-section__head, .decision, .fig, .flow, .tree, .points li, .principles li, .closing__title'
  );
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealTargets.forEach(function (el) {
      // Anything already on screen at load is shown immediately.
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) return;
      el.setAttribute('data-reveal', '');
      io.observe(el);
    });
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

  // ---------------------------------------- case-study contents highlight
  var tocLinks = document.querySelectorAll('.cs-toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var current = null;
    var tocIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (current) { current.classList.remove('is-active'); current.removeAttribute('aria-current'); }
          current = map[entry.target.id];
          if (current) { current.classList.add('is-active'); current.setAttribute('aria-current', 'location'); }
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('.cs-section').forEach(function (s) { tocIO.observe(s); });
  }
})();
