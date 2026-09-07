const { chromium } = require('playwright');
const fs = require('fs');
const OUT = '/tmp/claude-0/-home-user-sphamandlaxaba/a579694a-a8d4-5515-96d1-19028b0f00e7/scratchpad/shots';

const STEPS = [
  ['01','welcome','Welcome'],
  ['02','trust','Trust and Compliance'],
  ['03','profile','Company Profile'],
  ['04','upload','Upload Documents'],
  ['05','processing','AI Extraction'],
  ['06','validation','Validation Summary'],
  ['07','customers','Review Customers'],
  ['08','products','Review Products'],
  ['09','staff','Review Staff'],
  ['10','summary','Confirm and Submit'],
  ['11','success','Complete'],
];

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
  page.on('pageerror', e => console.log('PAGEERROR', e.message));
  await page.goto('http://127.0.0.1:8777/ManaGem%20Take-On%20(Standalone).html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);

  // Seed a realistic session: consents accepted, documents uploaded per category.
  await page.evaluate(() => {
    const mk = n => ({ name: n, size: '412 KB', time: '09:14', secured: true });
    state.uploads = {
      company: [mk('CIPC_Registration.pdf'), mk('Logo.png')],
      customers: [mk('Client_Ledger_2025.xlsx'), mk('Invoice_Batch_Mar.pdf')],
      products: [mk('Price_List_2026.pdf'), mk('Supplier_Catalog_Sika.pdf')],
      staff: [mk('Staff_Register.xlsx')],
      suppliers: [mk('Supplier_Contacts.xlsx')],
    };
    state.consents = { authorised: true, processing: true, aiUnderstanding: true, reviewUnderstanding: true, policies: true };
    state.finalApproval = true;
    state.submittedRef = 'TO-2026-0418';
    render();
  });

  const results = [];
  const shoot = async (n, id, label, waitMs = 900) => {
    await page.waitForTimeout(waitMs);
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    const clipH = Math.min(Math.max(h, 1000), 2200);
    await page.setViewportSize({ width: 1440, height: clipH });
    await page.waitForTimeout(400);
    const file = `${OUT}/takeon-${n}-${id}.png`;
    await page.screenshot({ path: file, clip: { x: 0, y: 0, width: 1440, height: clipH } });
    await page.setViewportSize({ width: 1440, height: 1000 });
    results.push({ n, id, label, file, w: 1440, h: clipH });
    console.log('shot', id, clipH);
  };

  for (const [n, id, label] of STEPS) {
    if (id === 'processing') {
      await page.evaluate(() => { startProcessing(); });
      await page.waitForTimeout(6500);
      await shoot(n, id, label, 200);
    } else {
      await page.evaluate(i => { state.screen = i; state.showReport = false; render(); }, id);
      await shoot(n, id, label);
    }
  }
  // Compliance report + GEMIS admin queue
  await page.evaluate(() => { state.screen = 'success'; state.showReport = true; render(); });
  await shoot('12', 'report', 'Compliance Report');
  await page.evaluate(() => { state.showReport = false; state.view = 'admin'; render(); });
  await shoot('13', 'admin', 'GEMIS Admin Take-On Queue');

  fs.writeFileSync(OUT + '/takeon-manifest.json', JSON.stringify(results, null, 2));
  await browser.close();
})();
