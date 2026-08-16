const fs = require('fs');
const THRESH = parseInt(process.argv[2] || '3', 10); // keep unpainted boxes with >= THRESH children
const R = (v) => Math.round(v * 10) / 10;
function painted(x) { return x.t !== 'b' || x.k !== undefined || x.g || x.bw || x.sh || x.p || x.o !== undefined; }
function hoist(n) {
  if (!n.c) return n;
  const out = [];
  for (let kid of n.c) {
    kid = hoist(kid);
    if (!painted(kid) && kid.c && kid.c.length < THRESH) {
      for (const g of kid.c) { g.x = R(g.x + kid.x); g.y = R(g.y + kid.y); out.push(g); }
    } else if (!painted(kid) && !kid.c) {
      // empty layout box — drop
    } else out.push(kid);
  }
  n.c = out.length ? out : undefined;
  if (!n.c) delete n.c;
  return n;
}
let before = 0, after = 0, bb = 0, ab = 0;
fs.mkdirSync('build2/screens', { recursive: true });
for (const f of fs.readdirSync('build/screens')) {
  const t = JSON.parse(fs.readFileSync('build/screens/' + f));
  let n0 = 0; (function w(x) { n0++; (x.c || []).forEach(w); })(t);
  bb += JSON.stringify(t).length;
  const h = hoist(t);
  let n1 = 0; (function w(x) { n1++; (x.c || []).forEach(w); })(h);
  before += n0; after += n1;
  const s = JSON.stringify(h); ab += s.length;
  fs.writeFileSync('build2/screens/' + f, s);
}
console.log('THRESH', THRESH, 'nodes', before, '->', after, '| kb', Math.round(bb / 1024), '->', Math.round(ab / 1024));
