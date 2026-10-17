#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════
   build-doors — generates the role-specific homepages
     /product/index.html   /ai-ux/index.html   /web/index.html
   from home.html (the general homepage) + tools/doors.config.json.
   index.html is the direction selection screen that links to them.

   home.html is the single source of truth: edit it, then run
     node tools/build-doors.mjs
   and commit the regenerated files. No dependencies.

   Every edit below is anchored on markup that exists in home.html
   and throws if the anchor is missing or ambiguous, so a later change
   to home.html fails the build loudly instead of shipping a door that
   silently lost a section.
   ═══════════════════════════════════════════════════════════════ */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = join(ROOT, 'home.html');
const CONFIG = join(ROOT, 'tools', 'doors.config.json');

const fail = (msg) => { throw new Error('build-doors: ' + msg); };
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* replace exactly one occurrence of a string or regex */
const replaceOnce = (html, find, repl, what) => {
  const re = typeof find === 'string' ? new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g') : new RegExp(find.source, find.flags.includes('g') ? find.flags : find.flags + 'g');
  const n = (html.match(re) || []).length;
  if (n !== 1) fail(`expected exactly one ${what}, found ${n}`);
  return html.replace(re, repl);
};

/* locate a whole element (open tag → matching close tag) starting at the
   first match of `openRe` at or after `from` */
const findElement = (html, openRe, from = 0, what = String(openRe)) => {
  const re = new RegExp(openRe.source, openRe.flags.replace('g', '') + 'g');
  re.lastIndex = from;
  const m = re.exec(html);
  if (!m) fail(`could not find ${what}`);
  const tag = /^<([a-z0-9]+)/i.exec(m[0]);
  if (!tag) fail(`${what} pattern must start at an opening tag`);
  const name = tag[1].toLowerCase();
  const scan = new RegExp(`<${name}\\b|</${name}\\s*>`, 'gi');
  scan.lastIndex = m.index + 1;
  let depth = 1, s;
  while ((s = scan.exec(html))) {
    depth += s[0][1] === '/' ? -1 : 1;
    if (depth === 0) return { start: m.index, end: s.index + s[0].length, text: html.slice(m.index, s.index + s[0].length) };
  }
  fail(`unclosed <${name}> for ${what}`);
};

/* every direct-or-nested element matching `openRe` inside [start, end) */
const findAll = (html, openRe, start, end) => {
  const out = [];
  let from = start;
  for (;;) {
    const re = new RegExp(openRe.source, 'g');
    re.lastIndex = from;
    const m = re.exec(html);
    if (!m || m.index >= end) return out;
    const el = findElement(html, openRe, m.index);
    out.push(el);
    from = el.end;
  }
};

const splice = (html, start, end, text) => html.slice(0, start) + text + html.slice(end);

/* ── head / meta ─────────────────────────────────────────────── */
const setHead = (html, door, siteUrl) => {
  const url = siteUrl + door.dir + '/';
  const img = siteUrl + door.ogImage;
  const title = esc(door.title);
  const desc = esc(door.description || door.intro);
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`, '<title>');
  html = replaceOnce(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${desc}" />`, 'meta description');
  html = replaceOnce(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`, 'og:title');
  html = replaceOnce(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${desc}" />`, 'og:description');
  html = replaceOnce(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`, 'og:url');
  html = replaceOnce(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`, 'canonical');
  html = replaceOnce(html, /<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${img}" />`, 'og:image');
  html = replaceOnce(html, /<meta name="twitter:card" content="[^"]*" \/>/,
    '<meta name="twitter:card" content="summary_large_image" />\n' +
    `  <meta name="twitter:title" content="${title}" />\n` +
    `  <meta name="twitter:description" content="${desc}" />\n` +
    `  <meta name="twitter:image" content="${img}" />`, 'twitter:card');
  /* app.js reads data-root to build site-relative links one folder up, and
     data-door so case studies can link back to this homepage */
  html = replaceOnce(html, /<html lang="en">/, `<html lang="en" data-root="../" data-door="${door.dir}">`, '<html lang="en">');
  return html;
};

/* ── hero + stats ────────────────────────────────────────────── */
const setHero = (html, door, shared) => {
  if (shared.removeEyebrow) {
    html = replaceOnce(html, new RegExp(`\\n[ \\t]*<p class="eyebrow">${shared.removeEyebrow}</p>`), '', `"${shared.removeEyebrow}" eyebrow`);
  }
  html = replaceOnce(html, /<h1>[\s\S]*?<\/h1>/, `<h1>${esc(door.h1)}</h1>`, '<h1>');
  html = replaceOnce(html, /<p class="hero__lead">[\s\S]*?<\/p>/, `<p class="hero__lead">${esc(door.intro)}</p>`, 'hero lead');
  return html;
};

const setStats = (html, shared) => {
  for (const key of shared.removeStats || []) {
    const el = findElement(html, new RegExp(`<button class="stat[^"]*" data-sheet="${key}"`), 0, `stat "${key}"`);
    const lineStart = html.lastIndexOf('\n', el.start);
    html = splice(html, lineStart, el.end, '');
  }
  for (const [from, to] of Object.entries(shared.statHints || {})) {
    html = replaceOnce(html, `<span class="stat__hint">${from}</span>`, `<span class="stat__hint">${to}</span>`, `stat hint "${from}"`);
  }
  const stats = findElement(html, /<section class="stats[^"]*"/, 0, 'stats section');
  const n = (stats.text.match(/<button class="stat\b/g) || []).length;
  if (n === 3) html = splice(html, stats.start, stats.end, stats.text.replace('class="stats ', 'class="stats stats--3 '));
  return html;
};

/* ── case-study cards + table ────────────────────────────────── */
const hrefOf = (text) => (/href="([^"]+)"/.exec(text) || fail('element without href'))[1];

const rewriteCard = (text, copy, first) => {
  if (copy.title) text = replaceOnce(text, /<h3 class="wcard__t">[\s\S]*?<\/h3>/, `<h3 class="wcard__t">${esc(copy.title)}</h3>`, 'card title');
  if (copy.desc) text = replaceOnce(text, /<p class="wcard__d">[\s\S]*?<\/p>/, `<p class="wcard__d">${esc(copy.desc)}</p>`, 'card description');
  /* status labels are not configurable here: they come from home.html, so a
     project's status is stated in exactly one place */
  if (!/<p class="wcard__status[^"]*">/.test(text)) fail('card without a status label in home.html');
  /* the first card is the LCP image; the rest load lazily */
  text = text.replace(/\s(fetchpriority="high"|loading="lazy")/g, '');
  return replaceOnce(text, /(<img class="wcard__img"[^>]*?)( decoding="async")/,
    `$1 ${first ? 'fetchpriority="high"' : 'loading="lazy"'}$2`, 'card image');
};

const setCards = (html, door, cards) => {
  /* grid */
  const bento = findElement(html, /<div class="bento" id="bento">/, 0, '#bento');
  const byHref = new Map(findAll(html, /<a class="wcard"/, bento.start, bento.end).map((c) => [hrefOf(c.text), c.text]));
  const rows = [];
  door.cards.forEach((href, i) => {
    if (!byHref.has(href)) fail(`card "${href}" not found in home.html`);
    const card = rewriteCard(byHref.get(href), cards[href] || {}, i === 0);
    if (i % 2 === 0) rows.push([card]); else rows[rows.length - 1].push(card);
  });
  /* pairs alternate wide-left / wide-right; a lone last card spans the row */
  const rowHtml = rows.map((r, i) => {
    const cls = r.length === 1 ? 'bento__row bento__row--wide' : i % 2 ? 'bento__row bento__row--flip' : 'bento__row';
    return `            <div class="${cls}">\n` + r.map((c) => '              ' + c).join('\n') + '\n            </div>';
  }).join('\n\n');
  html = splice(html, bento.start, bento.end, `<div class="bento" id="bento">\n${rowHtml}\n          </div>`);

  /* table view: same order, same titles */
  const tbody = findElement(html, /<tbody>/, html.indexOf('id="wtable"'), '#wtable tbody');
  const trs = new Map(findAll(html, /<tr\b/, tbody.start, tbody.end).map((t) => [hrefOf(t.text), t.text]));
  const body = door.cards.map((href) => {
    let tr = trs.get(href) || fail(`table row "${href}" not found in home.html`);
    const copy = cards[href] || {};
    if (copy.title) tr = replaceOnce(tr, /(<a href="[^"]+">)[\s\S]*?(<\/a>)/, `$1${esc(copy.title)}$2`, 'table title');
    return '              ' + tr;
  }).join('\n');
  html = splice(html, tbody.start, tbody.end, `<tbody>\n${body}\n            </tbody>`);

  /* counts written into the markup */
  const n = door.cards.length;
  html = replaceOnce(html, /(<p class="toolbar__count" id="workCount"[^>]*>)\d+ case studies(<\/p>)/, `$1${n} case studies$2`, 'work count');
  return html;
};

/* ── What I Design ───────────────────────────────────────────── */
const setDesign = (html, door, keys) => {
  const list = findElement(html, /<div class="plist plist--dark">/, 0, 'What I Design list');
  const blocks = findAll(html, /<details class="pill-x">/, list.start, list.end);
  const byKey = new Map();
  for (const [key, summary] of Object.entries(keys)) {
    const b = blocks.find((x) => x.text.includes(`<summary class="pill">${summary}<`));
    if (!b) fail(`What I Design block "${summary}" not found`);
    byKey.set(key, b.text);
  }
  if (door.design.length !== blocks.length) fail(`door "${door.dir}" orders ${door.design.length} design blocks, home.html has ${blocks.length}`);
  const body = door.design.map((k) => '              ' + (byKey.get(k) || fail(`unknown design key "${k}"`))).join('\n');
  return splice(html, list.start, list.end, `<div class="plist plist--dark">\n${body}\n            </div>`);
};

/* ── paths: one folder deeper, cache-busted by content ───────── */
const hashes = new Map();
const contentHash = (path) => {
  if (!hashes.has(path)) {
    const file = join(ROOT, path);
    if (!existsSync(file)) fail(`asset "${path}" does not exist`);
    hashes.set(path, createHash('sha1').update(readFileSync(file)).digest('hex').slice(0, 8));
  }
  return hashes.get(path);
};

const isRelative = (v) => v !== '' && !/^(#|[a-z][a-z0-9+.-]*:|\/\/|\/)/i.test(v);

const rewritePaths = (html) => {
  /* a door may be cached separately from home.html, so its CSS/JS
     query string follows the file's content rather than a hand-bumped tag */
  html = html.replace(/\b(href|src)="(assets\/[^"?#]+\.(?:css|js))\?v=[^"]*"/g, (m, attr, path) => `${attr}="${path}?v=${contentHash(path)}"`);
  return html.replace(/\b(href|src|data-src|poster|srcset)="([^"]*)"/g, (m, attr, value) => {
    if (attr === 'srcset') return `${attr}="${value.split(',').map((s) => s.trim()).map((s) => isRelative(s) ? '../' + s : s).join(', ')}"`;
    return isRelative(value) ? `${attr}="../${value}"` : m;
  });
};

/* ── build ───────────────────────────────────────────────────── */
const config = JSON.parse(readFileSync(CONFIG, 'utf8'));
const source = readFileSync(SOURCE, 'utf8');
const siteUrl = config.siteUrl.replace(/\/?$/, '/');

for (const door of config.doors) {
  if (!existsSync(join(ROOT, door.ogImage))) fail(`og image "${door.ogImage}" for "${door.dir}" does not exist`);
  let html = source;
  html = setHead(html, door, siteUrl);
  html = setHero(html, door, config.shared);
  html = setStats(html, config.shared);
  html = setCards(html, door, config.cards);
  html = setDesign(html, door, config.designKeys);
  html = rewritePaths(html);
  html = replaceOnce(html, '<!DOCTYPE html>\n',
    '<!DOCTYPE html>\n<!-- Generated by tools/build-doors.mjs from home.html + tools/doors.config.json. Do not edit by hand. -->\n', 'doctype');

  const out = join(ROOT, door.dir, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log(`✓ ${door.dir}/index.html  (${door.cards.length} case studies)`);
}
