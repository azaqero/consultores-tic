#!/usr/bin/env node
/**
 * Generates public/og-default.png — the 1200x630 social preview card.
 *
 * Same approach as the CV PDF: a self-contained HTML file rendered by headless
 * Chrome, so the image is reproducible from source instead of being a binary
 * someone has to remember to update.
 *
 * Usage: npm run og:image
 */
import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = join(root, '.tmp', 'og-card.html');
const output = join(root, 'public', 'og-default.png');

const candidates = ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser'];

function findChrome() {
  for (const bin of candidates) {
    const probe = spawnSync('which', [bin], { encoding: 'utf8' });
    if (probe.status === 0 && probe.stdout.trim()) return probe.stdout.trim();
  }
  return null;
}

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 72px 80px;
    background: #fbfaf8;
    color: #1a1a19;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    position: relative;
    overflow: hidden;
  }
  .rule {
    position: absolute;
    left: 0;
    top: 0;
    width: 14px;
    height: 100%;
    background: #1f5f4e;
  }
  .eyebrow {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 21px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #1f5f4e;
  }
  h1 {
    font-size: 66px;
    line-height: 1.1;
    letter-spacing: -0.03em;
    max-width: 950px;
    margin-top: 26px;
    font-weight: 700;
  }
  h1 em { font-style: normal; color: #1f5f4e; }
  .footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    border-top: 1px solid #e2ded7;
    padding-top: 26px;
  }
  .who { font-size: 27px; font-weight: 600; }
  .who span { display: block; font-weight: 400; font-size: 21px; color: #5c5a56; margin-top: 6px; }
  .mark {
    width: 76px; height: 76px;
    border-radius: 14px;
    background: #1f5f4e;
    color: #fbfaf8;
    display: grid; place-items: center;
    font-family: ui-monospace, monospace;
    font-size: 27px; font-weight: 700; letter-spacing: 0.02em;
  }
</style>
</head>
<body>
  <div class="rule"></div>
  <div>
    <p class="eyebrow">Senior Software Engineer</p>
    <h1>I build backend systems that <em>hold up under real traffic</em>.</h1>
  </div>
  <div class="footer">
    <p class="who">Gustavo Azañero <span>Consultores TIC · consultores-tic.com</span></p>
    <div class="mark">CT</div>
  </div>
</body>
</html>`;

const chrome = findChrome();
if (!chrome) {
  console.error(`No Chrome or Chromium binary found. Tried: ${candidates.join(', ')}`);
  process.exit(1);
}

mkdirSync(dirname(htmlPath), { recursive: true });
mkdirSync(join(root, 'public'), { recursive: true });
writeFileSync(htmlPath, html, 'utf8');

const result = spawnSync(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    `--screenshot=${output}`,
    '--virtual-time-budget=3000',
    `file://${htmlPath}`,
  ],
  { encoding: 'utf8' },
);

if (result.status !== 0) {
  console.error(result.stderr || result.stdout || 'Chrome exited with a non-zero status.');
  process.exit(result.status ?? 1);
}

if (!existsSync(output)) {
  console.error('Chrome reported success but no image was written.');
  process.exit(1);
}

const { size } = statSync(output);
console.log(`Wrote ${output} (${(size / 1024).toFixed(1)} KB)`);

const distCopy = join(root, 'dist', 'og-default.png');
if (existsSync(join(root, 'dist'))) {
  copyFileSync(output, distCopy);
  console.log(`Synced ${distCopy}`);
}
