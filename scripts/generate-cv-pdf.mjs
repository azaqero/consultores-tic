#!/usr/bin/env node
/**
 * Generates public/cv.pdf from the built /cv/ page.
 *
 * The CV is authored once in src/content/cv.ts and rendered by
 * src/components/Cv.astro. This script prints that rendered page with headless
 * Chrome, so the PDF can never drift from the HTML.
 *
 * Requirements: a `google-chrome`, `chromium` or `chromium-browser` binary.
 * Usage: npm run cv:pdf   (runs the build first)
 */
import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'dist', 'cv', 'index.html');
const output = join(root, 'public', 'cv.pdf');

const candidates = ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser'];

function findChrome() {
  for (const bin of candidates) {
    const probe = spawnSync('which', [bin], { encoding: 'utf8' });
    if (probe.status === 0 && probe.stdout.trim()) return probe.stdout.trim();
  }
  return null;
}

if (!existsSync(source)) {
  console.error(`Missing ${source}. Run "npm run build" first (or use "npm run cv:pdf").`);
  process.exit(1);
}

const chrome = findChrome();
if (!chrome) {
  console.error(`No Chrome or Chromium binary found. Tried: ${candidates.join(', ')}`);
  process.exit(1);
}

mkdirSync(join(root, 'public'), { recursive: true });

const args = [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--no-pdf-header-footer',
  '--run-all-compositor-stages-before-draw',
  '--virtual-time-budget=4000',
  `--print-to-pdf=${output}`,
  `file://${source}`,
];

const result = spawnSync(chrome, args, { encoding: 'utf8' });

if (result.status !== 0) {
  console.error(result.stderr || result.stdout || 'Chrome exited with a non-zero status.');
  process.exit(result.status ?? 1);
}

if (!existsSync(output)) {
  console.error('Chrome reported success but no PDF was written.');
  process.exit(1);
}

const { size } = statSync(output);
console.log(`Wrote ${output} (${(size / 1024).toFixed(1)} KB)`);

// `npm run build` runs before this script, so it copied the *previous* PDF into
// dist/. Without this copy, `dist/cv.pdf` is one generation behind and deploying
// dist/ would ship a stale document.
const distCopy = join(root, 'dist', 'cv.pdf');
copyFileSync(output, distCopy);
console.log(`Synced ${distCopy}`);
