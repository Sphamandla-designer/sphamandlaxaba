const fs = require('fs');
const tokens = JSON.parse(fs.readFileSync('build/tokens.json'));
const index = JSON.parse(fs.readFileSync('build/index.json'));

function trim(a) { while (a.length && (a[a.length - 1] === null || a[a.length - 1] === undefined)) a.pop(); return a; }
const N = (v) => (v === undefined ? null : v);
function enc(n) {
  if (n.t === 'x') return trim([1, n.x, n.y, n.w, n.h, n.s, N(n.f), N(n.k), N(n.m), N(n.a), N(n.d)]);
  if (n.t === 'v') return trim([2, n.x, n.y, n.w, n.h, N(n.i), N(n.o)]);
  const c = n.c ? n.c.map(enc) : null;
  return trim([0, n.x, n.y, n.w, n.h, c, N(n.k), N(n.r), N(n.p), N(n.o), N(n.bw), N(n.bk), N(n.sh), null, N(n.nm)]);
}
const sz = (v) => JSON.stringify(v).length;

// ---------- 1. the sidebar component, taken from the one screen with no active row ----------
const fh = JSON.parse(fs.readFileSync('build2/screens/Financial_Health.json'));
const side = fh.c[0].c.find(n => n.x === 0 && n.w === 240);
// name each nav row after its label so instances can address it
(function nameRows(n) {
  if (n.t === 'b' && n.h === 32) {
    const txt = [];
    (function t(x) { if (x.t === 'x') txt.push(x.s); (x.c || []).forEach(t); })(n);
    if (txt.length) n.nm = 'nav/' + txt[0];
  }
  (n.c || []).forEach(nameRows);
})(side);
fs.writeFileSync('build2/sidebar.json', JSON.stringify(enc(side)));
console.log('sidebar component kb', Math.round(sz(enc(side)) / 1024), 'height', side.h);

// ---------- 2. screens with the sidebar replaced by an instance marker ----------
const DONE = new Set(['Command Center', 'Accounts', 'Account Detail', 'Transactions']);
const GAP = 160, PER_ROW = 5;
const placed = []; let cx = 0, cy = 0, rowH = 0, col = 0;
for (const s of index) {
  if (col === PER_ROW) { col = 0; cx = 0; cy += rowH + GAP; rowH = 0; }
  placed.push({ ...s, X: cx, Y: cy });
  cx += s.w + GAP; rowH = Math.max(rowH, s.h); col++;
}

let labelSeq = 0;
const units = [];
const SPEC_BUDGET = 33000, NODE_BUDGET = 30000;
function planList(ref, nodes) {
  let batch = [], bytes = 0;
  const flush = () => { if (batch.length) { units.push({ t: 'nodes', r: ref, s: batch }); batch = []; bytes = 0; } };
  for (const node of nodes) {
    const s = sz(node);
    if (s <= NODE_BUDGET) { if (bytes + s > NODE_BUDGET) flush(); batch.push(node); bytes += s; continue; }
    const kids = node[5] || [];
    const label = 'L' + (++labelSeq);
    const shell = node.slice(); shell[5] = null;
    while (shell.length < 14) shell.push(null);
    shell[13] = label;
    if (bytes + sz(shell) > NODE_BUDGET) flush();
    batch.push(shell); bytes += sz(shell);
    flush();
    planList(label, kids);
  }
  flush();
}

function activeLabel(sd) {
  let found = null;
  (function walk(n) {
    if (n.t === 'b' && n.h === 32 && n.k !== undefined) {
      const txt = [];
      (function t(x) { if (x.t === 'x') txt.push(x.s); (x.c || []).forEach(t); })(n);
      if (txt.length) found = txt[0];
    }
    (n.c || []).forEach(walk);
  })(sd);
  return found;
}

const pending = [];
for (const p of placed) {
  if (DONE.has(p.name)) continue;
  const root = JSON.parse(fs.readFileSync('build2/screens/' + p.file));
  const shell = root.c[0];
  const sd = shell.c.find(n => n.x === 0 && n.w === 240);
  const act = activeLabel(sd);
  const rest = shell.c.filter(n => n !== sd);
  const ref = 'S' + p.name.replace(/\W/g, '');
  if (p.name !== 'Cash Flow') {
    units.push({ t: 'frame', r: ref, n: p.name, x: p.X, y: p.Y, w: p.w, h: p.h, k: N(root.k) });
  }
  // shell wrapper is a plain full-bleed box; emit sidebar marker + the rest directly under the frame
  const marker = trim([3, sd.x, sd.y, sd.w, sd.h, act]);
  planList(ref, [marker, ...rest.map(enc)]);
  pending.push(p.name);
}

const calls = [];
let cur = [], curBytes = 0;
for (const u of units) {
  const s = sz(u);
  if (cur.length && curBytes + s > SPEC_BUDGET) { calls.push(cur); cur = []; curBytes = 0; }
  cur.push(u); curBytes += s;
}
if (cur.length) calls.push(cur);

const createdIn = {};
calls.forEach((c, i) => c.forEach(u => {
  if (u.t === 'frame') createdIn[u.r] = i;
  if (u.t === 'nodes') u.s.forEach(function scan(n) { if (n[0] === 0) { if (n[13]) createdIn[n[13]] = i; (n[5] || []).forEach(scan); } });
}));
const needs = calls.map((c, i) => [...new Set(c.filter(u => u.t === 'nodes' && createdIn[u.r] !== i).map(u => u.r))]);

fs.writeFileSync('build2/calls2.json', JSON.stringify({ calls, needs }));
calls.forEach((c, i) => console.log(String(i).padStart(2), Math.round(sz(c) / 1024) + 'kb', 'needs=[' + needs[i] + ']', c.filter(u => u.t === 'frame').map(u => u.n).join(', ')));
console.log('CALLS', calls.length, 'total kb', Math.round(calls.reduce((a, c) => a + sz(c), 0) / 1024), '| screens', pending.length);
