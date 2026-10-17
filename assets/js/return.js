/* ═══════════════════════════════════════════════════════════════
   Case-study back-links
   A visitor who reached this case study through a role-specific
   homepage (/product/, /ai-ux/, /web/) is sent back to that homepage
   rather than the general one. app.js records the homepage per tab in
   sessionStorage. With nothing recorded (direct entry, new tab), plain
   links go to the direction selection screen (index.html) and section
   links go to the general homepage (home.html).
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const DOORS = ['product', 'ai-ux', 'web'];
  let door = null;
  try { door = sessionStorage.getItem('sx-door'); } catch (e) {}
  const known = DOORS.includes(door);
  document.querySelectorAll('a[href]').forEach((a) => {
    const m = /^index\.html(#.*)?$/.exec(a.getAttribute('href'));
    if (!m) return;
    if (known) a.setAttribute('href', door + '/' + (m[1] || ''));
    /* no homepage recorded: index.html is now the direction selection
       screen, so section links go to the general homepage that has them */
    else if (m[1]) a.setAttribute('href', 'home.html' + m[1]);
  });
})();
