#!/usr/bin/env node
/**
 * Post-deployment verification.
 *
 * Run against the live site after the upload, and against staging before it.
 * Checks the things that break silently: redirects that point at 404s, a 404
 * that returns 200, a sitemap that was never uploaded, an OG image that 404s.
 *
 * Usage: node scripts/verify-deploy.mjs https://www.consultores-tic.com
 */
const base = (process.argv[2] || 'https://www.consultores-tic.com').replace(/\/$/, '');

let pass = 0;
let fail = 0;
const failures = [];

function check(name, ok, detail = '') {
  if (ok) {
    pass++;
    console.log(`  ok    ${name}${detail ? ' — ' + detail : ''}`);
  } else {
    fail++;
    failures.push(name);
    console.log(`  FAIL  ${name}${detail ? ' — ' + detail : ''}`);
  }
}

async function get(url, opts = {}) {
  try {
    const res = await fetch(url, { redirect: 'manual', ...opts });
    return { status: res.status, headers: res.headers, body: opts.body ? '' : await res.text() };
  } catch (e) {
    return { status: 0, headers: new Headers(), body: '', error: e.message };
  }
}

function locationOf(res) {
  return res.headers.get('location') || '';
}

console.log(`\nVerifying ${base}\n`);

console.log('Pages');
for (const path of ['/', '/es/', '/projects/', '/method/', '/profile/', '/cv/', '/contact/']) {
  const res = await get(base + path);
  check(`GET ${path}`, res.status === 200, `status ${res.status}`);
}

console.log('\nAssets');
for (const [path, type] of [
  ['/cv.pdf', 'pdf'],
  ['/og-default.png', 'png'],
  ['/portrait.jpg', 'jpeg'],
  ['/favicon.svg', 'svg'],
  ['/sitemap.xml', 'xml'],
  ['/robots.txt', 'text/plain'],
]) {
  const res = await get(base + path);
  const ct = res.headers.get('content-type') || '';
  check(
    `GET ${path}`,
    res.status === 200 && ct.includes(type),
    `status ${res.status}, type "${ct}"`,
  );
}

console.log('\nHead tags');
{
  const res = await get(base + '/');
  const body = res.body;
  check('canonical', /rel="canonical" href="https:\/\/www\.consultores-tic\.com\/"/.test(body));
  check('hreflang en/es/x-default', (body.match(/hreflang="/g) || []).length >= 3);
  check('og:image present', body.includes('og:image'));
  check('JSON-LD Person', body.includes('"@type":"Person"'));
  check('single h1', (body.match(/<h1/g) || []).length === 1);
}

console.log('\nLegacy redirects (expect 301)');
for (const [from, to] of [
  ['/en/', '/'],
  ['/en/about-us/', '/profile/'],
  ['/es/nosotros/', '/es/perfil/'],
  ['/en/contact-us/', '/contact/'],
  ['/es/contactanos/', '/es/contacto/'],
  ['/en/portfolio/', '/projects/'],
  ['/es/portafolio/', '/es/proyectos/'],
  ['/en/services/seo/', '/projects/'],
]) {
  const res = await get(base + from);
  const loc = locationOf(res);
  check(
    `301 ${from} → ${to}`,
    res.status === 301 && loc.endsWith(to),
    `status ${res.status}, location "${loc}"`,
  );
}

console.log('\nRemoved legacy content (expect 410)');
for (const path of [
  '/en/2017/09/26/this-working-nintendo-switch-helmet-raises-the-bar-for-cosplayers-everywhere/',
  '/en/blog/',
  '/es/blog-espanol/',
  '/wp-json/',
]) {
  const res = await get(base + path);
  check(`410 ${path.slice(0, 40)}`, res.status === 410 || res.status === 404, `status ${res.status}`);
}

console.log('\nCanonical host');
{
  const bare = base.replace('https://www.', 'https://');
  const res = await get(bare + '/');
  check('non-www → www', res.status === 301 && locationOf(res).includes('www.'), `status ${res.status}`);
}

console.log('\n404 handling');
{
  const res = await get(base + '/this-page-does-not-exist-' + Date.now());
  check('unknown URL returns 404', res.status === 404, `status ${res.status}`);
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) {
  console.log('\nFailures:');
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
}
