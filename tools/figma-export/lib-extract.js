// Injected into the page: serialize the rendered DOM into a compact Figma-ready tree.
module.exports = function () {
  const root = document.body;
  const rootRect = { left: 0, top: 0 };

  const px = (v) => { const n = parseFloat(v); return isNaN(n) ? 0 : n; };
  function parseColor(c) {
    if (!c || c === 'transparent' || c === 'none') return null;
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(',').map(s => parseFloat(s));
    const a = p.length > 3 ? p[3] : 1;
    if (a === 0) return null;
    return { r: +(p[0] / 255).toFixed(4), g: +(p[1] / 255).toFixed(4), b: +(p[2] / 255).toFixed(4), a: +a.toFixed(3) };
  }
  function parseGradient(bg) {
    const m = bg.match(/linear-gradient\(([^]*)\)$/);
    if (!m) return null;
    const inner = m[1];
    // split top level commas
    const parts = []; let depth = 0, cur = '';
    for (const ch of inner) {
      if (ch === '(') depth++;
      if (ch === ')') depth--;
      if (ch === ',' && depth === 0) { parts.push(cur.trim()); cur = ''; } else cur += ch;
    }
    if (cur.trim()) parts.push(cur.trim());
    let angle = 180; let i = 0;
    if (/^(to |[-\d.]+deg)/.test(parts[0])) {
      const a = parts[0];
      if (a.endsWith('deg')) angle = parseFloat(a);
      else if (/to right/.test(a)) angle = 90;
      else if (/to left/.test(a)) angle = 270;
      else if (/to top/.test(a)) angle = 0;
      else if (/to bottom/.test(a)) angle = 180;
      i = 1;
    }
    const stops = [];
    const n = parts.length - i;
    parts.slice(i).forEach((s, k) => {
      const cm = s.match(/(rgba?\([^)]+\)|#[0-9a-f]+)/i);
      const pm = s.match(/([\d.]+)%/);
      const col = parseColor(cm ? cm[1] : s);
      if (col) stops.push({ pos: pm ? parseFloat(pm[1]) / 100 : (n === 1 ? 0 : k / (n - 1)), color: col });
    });
    if (stops.length < 2) return null;
    return { angle, stops };
  }
  function parseShadows(bs, isText) {
    if (!bs || bs === 'none') return null;
    const out = []; const parts = [];
    let depth = 0, cur = '';
    for (const ch of bs) {
      if (ch === '(') depth++; if (ch === ')') depth--;
      if (ch === ',' && depth === 0) { parts.push(cur.trim()); cur = ''; } else cur += ch;
    }
    if (cur.trim()) parts.push(cur.trim());
    for (const p of parts) {
      const cm = p.match(/rgba?\([^)]+\)/);
      const color = parseColor(cm ? cm[0] : null) || { r: 0, g: 0, b: 0, a: 0.15 };
      const nums = p.replace(/rgba?\([^)]+\)/, '').match(/-?[\d.]+px/g) || [];
      const v = nums.map(px);
      if (!v.length) continue;
      const inset = /inset/.test(p);
      out.push({ x: v[0] || 0, y: v[1] || 0, blur: v[2] || 0, spread: v[3] || 0, color, inset });
    }
    return out.length ? out : null;
  }

  const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'HELMET', 'LINK', 'META', 'TITLE', 'BR']);
  let idc = 0;

  function textRects(node) {
    // returns array of client rects for a text node
    const r = document.createRange();
    r.selectNodeContents(node);
    return [...r.getClientRects()].filter(x => x.width > 0.5 && x.height > 0.5);
  }

  function styleOf(el) {
    const cs = getComputedStyle(el);
    return cs;
  }

  function walk(el, parentAbs) {
    if (SKIP_TAGS.has(el.tagName)) return null;
    const cs = styleOf(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return null;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) {
      // still may contain positioned children (rare) — skip
      return null;
    }
    const opacity = parseFloat(cs.opacity);
    if (opacity === 0) return null;

    // SVG → vector
    if (el.tagName === 'svg') {
      let s = el.outerHTML;
      // normalise the framework's camel attr rewriting
      s = s.replace(/sc-camel-view-box/g, 'viewBox');
      if (!/viewBox/.test(s) && rect.width && rect.height) {
        s = s.replace(/<svg/, `<svg viewBox="0 0 ${Math.round(rect.width)} ${Math.round(rect.height)}"`);
      }
      s = s.replace(/<svg/, `<svg width="${Math.round(rect.width)}" height="${Math.round(rect.height)}"`);
      return {
        id: ++idc, t: 'svg', n: (el.getAttribute('aria-label') || 'icon').slice(0, 30),
        x: +(rect.left - parentAbs.left).toFixed(1), y: +(rect.top - parentAbs.top).toFixed(1),
        w: +rect.width.toFixed(1), h: +rect.height.toFixed(1),
        svg: s, op: opacity < 1 ? +opacity.toFixed(2) : undefined,
      };
    }

    const node = {
      id: ++idc, t: 'box', n: el.tagName.toLowerCase() + (el.getAttribute('data-screen-label') ? ':' + el.getAttribute('data-screen-label') : ''),
      x: +(rect.left - parentAbs.left).toFixed(1), y: +(rect.top - parentAbs.top).toFixed(1),
      w: +rect.width.toFixed(1), h: +rect.height.toFixed(1),
      c: [],
    };
    if (opacity < 1) node.op = +opacity.toFixed(2);

    // fill
    const bgImg = cs.backgroundImage;
    const grad = bgImg && bgImg !== 'none' ? parseGradient(bgImg) : null;
    if (grad) node.grad = grad;
    else {
      const bc = parseColor(cs.backgroundColor);
      if (bc) node.bg = bc;
    }
    // radius
    const r = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].map(px);
    if (r.some(v => v > 0)) node.r = r;
    // borders
    const bw = [cs.borderTopWidth, cs.borderRightWidth, cs.borderBottomWidth, cs.borderLeftWidth].map(px);
    if (bw.some(v => v > 0)) {
      const bcol = parseColor(cs.borderTopColor) || parseColor(cs.borderLeftColor);
      if (bcol) { node.bw = bw; node.bc = bcol; }
    }
    // shadow
    const sh = parseShadows(cs.boxShadow);
    if (sh) node.sh = sh;
    if (cs.overflow === 'hidden' || cs.overflowX === 'hidden' || cs.overflowY === 'hidden') node.clip = 1;

    // children: elements + text nodes, in document order
    for (const ch of el.childNodes) {
      if (ch.nodeType === 3) {
        const raw = ch.textContent;
        if (!raw || !raw.trim()) continue;
        const rects = textRects(ch);
        if (!rects.length) continue;
        const tcs = cs;
        const color = parseColor(tcs.color) || { r: 0, g: 0, b: 0, a: 1 };
        let content = raw.replace(/\s+/g, ' ');
        if (tcs.textTransform === 'uppercase') content = content.toUpperCase();
        else if (tcs.textTransform === 'lowercase') content = content.toLowerCase();
        // union of rects = the text block box
        const left = Math.min(...rects.map(x => x.left));
        const top = Math.min(...rects.map(x => x.top));
        const right = Math.max(...rects.map(x => x.right));
        const bottom = Math.max(...rects.map(x => x.bottom));
        const lh = tcs.lineHeight === 'normal' ? null : px(tcs.lineHeight);
        const ls = tcs.letterSpacing === 'normal' ? 0 : px(tcs.letterSpacing);
        node.c.push({
          id: ++idc, t: 'text',
          x: +(left - rect.left).toFixed(1), y: +(top - rect.top).toFixed(1),
          w: +(right - left).toFixed(1), h: +(bottom - top).toFixed(1),
          s: content.length > 400 ? content.slice(0, 400) : content,
          ff: tcs.fontFamily.split(',')[0].replace(/["']/g, '').trim(),
          fs: +px(tcs.fontSize).toFixed(1),
          fw: parseInt(tcs.fontWeight) || 400,
          fst: tcs.fontStyle === 'italic' ? 1 : undefined,
          lh: lh ? +lh.toFixed(1) : undefined,
          ls: ls ? +ls.toFixed(2) : undefined,
          col: color,
          ta: tcs.textAlign === 'center' ? 'C' : tcs.textAlign === 'right' ? 'R' : undefined,
          multi: rects.length > 1 ? 1 : undefined,
          td: /line-through/.test(tcs.textDecorationLine) ? 'S' : /underline/.test(tcs.textDecorationLine) ? 'U' : undefined,
        });
      } else if (ch.nodeType === 1) {
        const sub = walk(ch, rect);
        if (sub) node.c.push(sub);
      }
    }
    if (!node.c.length) delete node.c;
    return node;
  }

  // Prune: collapse boxes that have no paint and exactly one child, hoisting the child.
  function prune(n) {
    if (n.c) {
      n.c = n.c.map(prune).filter(Boolean);
      if (!n.c.length) delete n.c;
    }
    const painted = n.bg || n.grad || n.bw || n.sh || n.clip || n.t !== 'box';
    if (!painted && n.c && n.c.length === 1 && n.c[0].t === 'box') {
      const kid = n.c[0];
      kid.x = +(kid.x + n.x).toFixed(1); kid.y = +(kid.y + n.y).toFixed(1);
      if (n.op) kid.op = (kid.op || 1) * n.op;
      return kid;
    }
    if (!painted && !n.c) return null;
    return n;
  }

  return { prune, walk, rootRect };
};
