const fs = require('fs');
const files = fs.readdirSync('screens').filter(f => f.endsWith('.json') && !f.startsWith('_'));

const ORDER = ['Command_Center','Accounts','Account_Detail','Transactions','Cash_Flow','Bills','Documents',
  'Portfolio','Investments','Risk_Analysis','Ask_FINOS','Insights','Forecasts','Financial_Health',
  'Decision_Room','Scenario_Builder','Decision_History','Automation_Center','AI_Agent','Approvals','Activity',
  'Workspace','Team','Permissions','Integrations','Audit_Log','Settings'];

const svgs = [], svgIx = new Map();
const pal = [], palIx = new Map();
const ty = [], tyIx = new Map();

const key = (o) => JSON.stringify(o);
function colIdx(c) {
  if (!c) return undefined;
  const a = [+c.r.toFixed(4), +c.g.toFixed(4), +c.b.toFixed(4), +c.a.toFixed(3)];
  const k = key(a);
  if (!palIx.has(k)) { palIx.set(k, pal.length); pal.push(a); }
  return palIx.get(k);
}
function tyIdx(t) {
  const fam = /Bebas/.test(t.ff) ? 'Bebas Neue' : 'Inter';
  let w = t.fw; if (w === 450) w = 400;
  const a = [fam, w, +t.fs.toFixed(1), t.lh ? +t.lh.toFixed(1) : 0, t.ls ? +t.ls.toFixed(2) : 0, t.fst ? 1 : 0];
  const k = key(a);
  if (!tyIx.has(k)) { tyIx.set(k, ty.length); ty.push(a); }
  return tyIx.get(k);
}
function svgIdx(s) {
  s = s.replace(/ data-dc-tpl="[^"]*"/g, '').replace(/ style="[^"]*"/g, '').replace(/ aria-hidden="[^"]*"/g, '')
       .replace(/<svg width="\d+" height="\d+" /, '<svg ').replace(/\s+/g, ' ');
  // Figma's SVG parser: drop invalid inline spans, roles and labels, and give
  // every icon concrete pixel dimensions taken from its viewBox.
  s = s.replace(/<span[^>]*>/g, '').replace(/<\/span>/g, '')
       .replace(/ role="[^"]*"/g, '').replace(/ aria-label="[^"]*"/g, '');
  // Size only the root <svg> tag from its viewBox — inner geometry keeps its own
  // width/height attributes.
  const vb = s.match(/viewBox="([\d.\-\s]+)"/);
  if (vb) {
    const p = vb[1].trim().split(/\s+/).map(Number);
    s = s.replace(/<svg[^>]*>/, (tag) =>
      tag.replace(/ width="[^"]*"/g, '').replace(/ height="[^"]*"/g, '')
         .replace('<svg', `<svg width="${p[2]}" height="${p[3]}"`));
  }
  s = s.replace(/\s+/g, ' ').replace(/> </g, '><');
  if (!svgIx.has(s)) { svgIx.set(s, svgs.length); svgs.push(s); }
  return svgIx.get(s);
}
const R = (v) => Math.round(v * 10) / 10;

function conv(n) {
  const o = {};
  o.x = R(n.x); o.y = R(n.y); o.w = R(n.w); o.h = R(n.h);
  if (n.t === 'text') {
    o.t = 'x';
    o.s = n.s.trim();
    if (!o.s) return null;
    o.f = tyIdx(n);
    o.k = colIdx(n.col);
    if (n.multi) o.m = 1;
    if (n.ta) o.a = n.ta;
    if (n.td) o.d = n.td;
    // no explicit line-height in CSS: use the measured single-line box
    if (!n.lh && !n.multi) { const t2 = { ...n, lh: n.h }; o.f = tyIdx(t2); }
    return o;
  }
  if (n.t === 'svg') { o.t = 'v'; o.i = svgIdx(n.svg); if (n.op) o.o = n.op; return o; }
  o.t = 'b';
  if (n.bg) o.k = colIdx(n.bg);
  if (n.grad) o.g = { a: Math.round(n.grad.angle), s: n.grad.stops.map(s => [+s.pos.toFixed(3), colIdx(s.color)]) };
  if (n.r) { const r = n.r.map(R); o.r = (r.every(v => v === r[0])) ? r[0] : r; }
  if (n.bw) { o.bw = n.bw.map(R); o.bk = colIdx(n.bc); }
  if (n.sh) o.sh = n.sh.map(s => [R(s.x), R(s.y), R(s.blur), R(s.spread), colIdx(s.color), s.inset ? 1 : 0]);
  if (n.clip) o.p = 1;
  if (n.op) o.o = n.op;
  if (n.c) { const kids = n.c.map(conv).filter(Boolean); if (kids.length) o.c = kids; }
  return o;
}

fs.mkdirSync('build/screens', { recursive: true });
const index = [];
for (const name of ORDER) {
  const f = name + '.json';
  if (!files.includes(f)) { console.log('MISSING', name); continue; }
  const t = JSON.parse(fs.readFileSync('screens/' + f));
  const c = conv(t);
  c.n = name.replace(/_/g, ' ');
  fs.writeFileSync('build/screens/' + f, JSON.stringify(c));
  let nodes = 0; (function w(x) { nodes++; (x.c || []).forEach(w); })(c);
  index.push({ name: c.n, file: f, w: c.w, h: c.h, nodes, bytes: JSON.stringify(c).length });
}
fs.writeFileSync('build/tokens.json', JSON.stringify({ pal, ty, svgs }));
fs.writeFileSync('build/index.json', JSON.stringify(index, null, 1));
console.log('screens', index.length);
console.log('palette', pal.length, 'typestyles', ty.length, 'svgs', svgs.length);
console.log('tokens kb', Math.round(JSON.stringify({ pal, ty }).length / 1024), 'svg kb', Math.round(JSON.stringify(svgs).length / 1024));
console.log('screens total kb', Math.round(index.reduce((s, i) => s + i.bytes, 0) / 1024));
index.forEach(i => console.log(' ', i.name.padEnd(18), String(i.nodes).padStart(5), Math.round(i.bytes / 1024) + 'kb', i.w + 'x' + i.h));
