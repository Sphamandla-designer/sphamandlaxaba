const { chromium } = require('playwright');
const fs = require('fs');
const OUT = '/tmp/claude-0/-home-user-sphamandlaxaba/a579694a-a8d4-5515-96d1-19028b0f00e7/scratchpad/shots';
fs.mkdirSync(OUT, { recursive: true });

const SCREENS = [
  ['00','login','Login'],
  ['01','dashboard','Dashboard'],
  ['02','customers','Customers'],
  ['03','contacts','Customer Contacts'],
  ['04','warranties','Warranties'],
  ['05','new-enquiry','New Enquiry'],
  ['06','enquiries','Open Enquiries'],
  ['07','enquiry-detail','Enquiry Detail'],
  ['08','closed','Closed Enquiries'],
  ['09','invoices','Invoices'],
  ['10','sage','Sage Invoices'],
  ['11','inspections','Inspection Reports'],
  ['12','targets','Sales Targets'],
  ['13','templates','Quote Templates'],
  ['14','reports','Reports'],
  ['15','sales-master-data','Sales Master Data'],
  ['16','debtors','Debtors Management'],
  ['17','products','Products and Pricing'],
  ['18','projects','Projects Module'],
  ['19','factory','Factory'],
  ['20','stock','Stock Control'],
  ['21','staff','Staff Records'],
  ['22','users','Manage Users'],
  ['23','master-data','Master Data'],
];

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
  page.on('pageerror', e => console.log('PAGEERROR', e.message));
  await page.goto('http://127.0.0.1:8777/ManaGem.html#login', { waitUntil: 'networkidle' });
  await page.waitForSelector('#root .app, #root', { timeout: 60000 });
  await page.waitForTimeout(4000);
  const results = [];
  for (const [n, route, label] of SCREENS) {
    await page.evaluate(r => { window.location.hash = r; }, route);
    await page.waitForTimeout(1400);
    const file = `${OUT}/app-${n}-${route}.png`;
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    const clipH = Math.min(Math.max(h, 1000), 1900);
    await page.setViewportSize({ width: 1440, height: clipH });
    await page.waitForTimeout(500);
    await page.screenshot({ path: file, clip: { x: 0, y: 0, width: 1440, height: clipH } });
    await page.setViewportSize({ width: 1440, height: 1000 });
    results.push({ n, route, label, file, w: 1440, h: clipH });
    console.log('shot', route, clipH);
  }
  fs.writeFileSync(OUT + '/app-manifest.json', JSON.stringify(results, null, 2));
  await browser.close();
})();
