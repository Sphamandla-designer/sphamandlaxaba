const fs = require('fs');
const tokens = JSON.parse(fs.readFileSync('build/tokens.json'));
const { calls, needs } = JSON.parse(fs.readFileSync('build2/calls2.json'));
const J = JSON.stringify;

function remap(units) {
  const pM = new Map(), yM = new Map();
  const pi = (i) => { if (i == null) return i; if (!pM.has(i)) pM.set(i, pM.size); return pM.get(i); };
  const yi = (i) => { if (i == null) return i; if (!yM.has(i)) yM.set(i, yM.size); return yM.get(i); };
  const walk = (n) => {
    if (n[0] === 1) { if (n[6] != null) n[6] = yi(n[6]); if (n[7] != null) n[7] = pi(n[7]); return; }
    if (n[0] === 2 || n[0] === 3) return;
    if (n[6] != null) n[6] = pi(n[6]);
    if (n[11] != null) n[11] = pi(n[11]);
    if (n[12]) n[12].forEach(e => { e[4] = pi(e[4]); });
    (n[5] || []).forEach(walk);
  };
  units.forEach(u => { if (u.t === 'frame') { if (u.k != null) u.k = pi(u.k); } else u.s.forEach(walk); });
  const p = []; for (const [o, i] of pM) p[i] = tokens.pal[o];
  const y = []; for (const [o, i] of yM) y[i] = tokens.ty[o];
  return { p, y };
}

const usedIcons = new Set();
calls.forEach(units => units.forEach(u => {
  if (u.t !== 'nodes') return;
  u.s.forEach(function w(n) { if (n[0] === 2) usedIcons.add(n[5]); if (n[0] === 0) (n[5] || []).forEach(w); });
}));
fs.writeFileSync('build2/used-icons.json', J([...usedIcons].sort((a, b) => a - b)));

const RUNTIME = `const P=T.p,Y=T.y,W={400:'Regular',500:'Medium',600:'Semi Bold',700:'Bold'},LBL={};
const FL=i=>[{type:'SOLID',color:{r:P[i][0],g:P[i][1],b:P[i][2]},opacity:P[i][3]}];
async function mk(s,q){const t=s[0];let n;
if(t===1){n=figma.createText();const y=Y[s[6]];n.fontName={family:y[0],style:W[y[1]]};n.fontSize=y[2];
if(y[3])n.lineHeight={unit:'PIXELS',value:y[3]};if(y[4])n.letterSpacing={unit:'PIXELS',value:y[4]};
n.characters=s[5];n.name=s[5].slice(0,40);n.fills=FL(s[7]);
if(s[10])n.textDecoration=s[10]==='S'?'STRIKETHROUGH':'UNDERLINE';q.appendChild(n);
if(s[8]){n.textAutoResize='HEIGHT';n.resize(Math.max(s[3]+1,1),Math.max(s[4],1));if(s[9])n.textAlignHorizontal=s[9]==='C'?'CENTER':'RIGHT';}
else n.textAutoResize='WIDTH_AND_HEIGHT';n.x=s[1];n.y=s[2];return n;}
if(t===2){const c=IC[s[5]],m=c?await figma.getNodeByIdAsync(c):null;n=m?m.createInstance():figma.createFrame();
q.appendChild(n);n.resize(Math.max(s[3],.01),Math.max(s[4],.01));n.x=s[1];n.y=s[2];if(s[6]!=null)n.opacity=s[6];return n;}
if(t===3){const m=await figma.getNodeByIdAsync(SB);n=m.createInstance();q.appendChild(n);
n.resize(s[3],s[4]);n.x=s[1];n.y=s[2];n.name='App/Sidebar';
const a=s[5];
if(a){const row=n.findOne(x=>x.name==='nav/'+a);
if(row){row.fills=[{type:'SOLID',color:{r:.149,g:.149,b:.149}}];
const tx=row.findOne(x=>x.type==='TEXT');
if(tx){tx.fontName={family:'Inter',style:'Semi Bold'};tx.fills=[{type:'SOLID',color:{r:1,g:1,b:1}}];}
const ic=row.findOne(x=>x.type==='INSTANCE');
if(ic&&ON[a]){const oc=await figma.getNodeByIdAsync(ON[a]);ic.swapComponent(oc);}}}
return n;}
n=figma.createFrame();n.name='box';q.appendChild(n);n.resize(Math.max(s[3],.01),Math.max(s[4],.01));n.x=s[1];n.y=s[2];
n.fills=s[6]!=null?FL(s[6]):[];n.clipsContent=!!s[8];if(s[9]!=null)n.opacity=s[9];
const r=s[7];if(r!=null){if(Array.isArray(r)){n.topLeftRadius=r[0];n.topRightRadius=r[1];n.bottomRightRadius=r[2];n.bottomLeftRadius=r[3];}else n.cornerRadius=r;}
if(s[10]){const b=s[10];n.strokes=FL(s[11]);n.strokeAlign='INSIDE';
if(b[0]===b[1]&&b[1]===b[2]&&b[2]===b[3])n.strokeWeight=b[0];
else{n.strokeTopWeight=b[0];n.strokeRightWeight=b[1];n.strokeBottomWeight=b[2];n.strokeLeftWeight=b[3];}}
if(s[12])n.effects=s[12].map(e=>({type:e[5]?'INNER_SHADOW':'DROP_SHADOW',color:{r:P[e[4]][0],g:P[e[4]][1],b:P[e[4]][2],a:P[e[4]][3]},offset:{x:e[0],y:e[1]},radius:e[2],spread:e[3],visible:true,blendMode:'NORMAL'}));
if(s[13])LBL[s[13]]=n.id;const k=s[5];if(k)for(const c of k)await mk(c,n);return n;}`;

calls.forEach((units, i) => {
  const T = remap(units);
  const needed = {};
  needs[i].forEach(r => { needed[r] = '@@' + r + '@@'; });
  const code = `const T={p:${J(T.p)},y:${J(T.y)}};
const IC=__ICONS__;
const SB='80:157';
const ON=__ON__;
const R=${J(needed)};
const U=${J(units)};
${RUNTIME}
await Promise.all([["Inter","Regular"],["Inter","Medium"],["Inter","Semi Bold"],["Inter","Bold"],["Bebas Neue","Regular"]].map(f=>figma.loadFontAsync({family:f[0],style:f[1]})));
const pg=await figma.getNodeByIdAsync('0:1');
await figma.setCurrentPageAsync(pg);
const frames=[];
for(const u of U){
  if(u.t==='frame'){
    const f=figma.createFrame();f.name=u.n;pg.appendChild(f);f.resize(u.w,u.h);f.x=u.x;f.y=u.y;
    f.fills=u.k!=null?FL(u.k):[];f.clipsContent=true;R[u.r]=f.id;frames.push(u.n);
  } else {
    const p=await figma.getNodeByIdAsync(R[u.r]||LBL[u.r]);
    for(const s of u.s)await mk(s,p);
  }
}
return {frames,refs:Object.assign({},R,LBL)};`;
  fs.writeFileSync(`build2/calls/n${i}.js`, code);
  console.log('n' + i + '.js', code.length, code.length > 49000 ? 'TOO BIG' : 'ok');
});
console.log('icons used in these calls:', [...usedIcons].sort((a, b) => a - b).join(','));
