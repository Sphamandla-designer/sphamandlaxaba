const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const LIB = fs.readFileSync('lib-extract.body.js', 'utf8');

const EXTRACT_FN = `(() => { ${LIB}
  const body = document.body;
  const br = body.getBoundingClientRect();
  const tree = walk(body, { left: br.left, top: br.top });
  return prune(tree);
})()`;

const NAV = ['Command Center','Accounts','Transactions','Cash Flow','Bills & Commitments','Documents','Portfolio','Investments','Risk','Ask FINOS','Insights','Forecasts','Decision Room','Scenarios','Decision History','AI Agents','Approvals','Activity','Overview','Team','Permissions','Integrations','Audit Log','Settings'];

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:8899/finos-proto.html', { waitUntil: 'networkidle', timeout: 60000 });
  await p.waitForTimeout(4000);
  fs.mkdirSync('screens', { recursive: true });
  const index = [];

  async function clickNav(label) {
    const ok = await p.evaluate((label) => {
      const els = [...document.querySelectorAll('div')].filter(e => {
        const r = e.getBoundingClientRect();
        return r.left < 340 && r.width > 100 && r.height > 20 && r.height < 60 && e.children.length <= 2 &&
          (e.textContent || '').trim().replace(/\d+$/, '').trim() === label;
      });
      if (!els.length) return false;
      els[0].click();
      return true;
    }, label);
    return ok;
  }

  async function capture(key) {
    await p.waitForTimeout(900);
    // grow viewport to full content height so nothing is clipped
    const h = await p.evaluate(() => {
      let m = 0;
      document.querySelectorAll('*').forEach(e => {
        const s = getComputedStyle(e);
        if (/auto|scroll/.test(s.overflowY)) m = Math.max(m, e.scrollHeight + e.getBoundingClientRect().top);
      });
      return Math.max(m, document.documentElement.scrollHeight, 1000);
    });
    const H = Math.min(Math.ceil(h) + 40, 5200);
    await p.setViewportSize({ width: 1440, height: H });
    await p.waitForTimeout(700);
    const label = await p.evaluate(() => {
      const e = document.querySelector('[data-screen-label]');
      return e ? e.dataset.screenLabel : null;
    });
    const tree = await p.evaluate(EXTRACT_FN);
    const name = label || key;
    const file = 'screens/' + name.replace(/[^a-zA-Z0-9]+/g, '_') + '.json';
    fs.writeFileSync(file, JSON.stringify(tree));
    await p.screenshot({ path: file.replace('.json', '.png'), fullPage: false });
    let count = 0; (function c(n) { count++; (n.c || []).forEach(c); })(tree);
    index.push({ nav: key, label: name, file, h: H, nodes: count, bytes: fs.statSync(file).size });
    console.log(name.padEnd(20), 'h=' + H, 'nodes=' + count, 'kb=' + Math.round(fs.statSync(file).size / 1024));
    await p.setViewportSize({ width: 1440, height: 1000 });
    await p.waitForTimeout(400);
  }

  for (const label of NAV) {
    const ok = await clickNav(label);
    if (!ok) { console.log('MISS nav:', label); continue; }
    await capture(label);
  }
  fs.writeFileSync('screens/_index.json', JSON.stringify(index, null, 1));
  await b.close();
})();
