#!/usr/bin/env node
/**
 * Generates both CV PDFs from the built pages.
 *
 *   dist/cv/index.html    → public/cv.pdf
 *   dist/es/cv/index.html → public/es/cv.pdf
 *
 * The CV is authored once per language in src/content/cv.ts and rendered by
 * src/components/Cv.astro. This script prints those pages with headless Chrome,
 * so a PDF can never drift from the HTML it came from.
 *
 * It also fails the build when the two languages disagree. Two CVs that say
 * different things are worse than one CV: the guard compares bullet counts and
 * requires every numeric claim to appear in both.
 *
 * Requirements: a `google-chrome`, `chromium` or `chromium-browser` binary.
 * Usage: npm run cv:pdf   (runs the build first)
 */
import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const targets = [
  { label: 'en', source: join(root, 'dist', 'cv', 'index.html'), output: join(root, 'public', 'cv.pdf') },
  {
    label: 'es',
    source: join(root, 'dist', 'es', 'cv', 'index.html'),
    output: join(root, 'public', 'es', 'cv.pdf'),
  },
];

/** Numeric claims that must be identical in both languages. */
const REQUIRED_TOKENS = ['18', '~10k', '~4', '~30', '~300', '50'];

const candidates = ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser'];

function findChrome() {
  for (const bin of candidates) {
    const probe = spawnSync('which', [bin], { encoding: 'utf8' });
    if (probe.status === 0 && probe.stdout.trim()) return probe.stdout.trim();
  }
  return null;
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ');
}

// --- Drift guard --------------------------------------------------------------

const texts = {};
const bulletCounts = {};

for (const target of targets) {
  if (!existsSync(target.source)) {
    console.error(`Missing ${target.source}. Run "npm run build" first (or use "npm run cv:pdf").`);
    process.exit(1);
  }
  const html = readFileSync(target.source, 'utf8');
  texts[target.label] = visibleText(html);
  bulletCounts[target.label] = (html.match(/<li>/g) || []).length;
}

const problems = [];

if (bulletCounts.en !== bulletCounts.es) {
  problems.push(`bullet count differs: en=${bulletCounts.en}, es=${bulletCounts.es}`);
}

for (const token of REQUIRED_TOKENS) {
  const inEn = texts.en.includes(token);
  const inEs = texts.es.includes(token);
  if (!inEn || !inEs) {
    problems.push(`claim "${token}" missing from ${!inEn ? 'en' : ''}${!inEn && !inEs ? ' and ' : ''}${!inEs ? 'es' : ''}`);
  }
}

if (problems.length) {
  console.error('CV drift detected between languages:\n');
  for (const p of problems) console.error(`  - ${p}`);
  console.error('\nBoth versions must carry the same claims. Fix src/content/cv.ts.');
  process.exit(1);
}

// --- Render -------------------------------------------------------------------

const chrome = findChrome();
if (!chrome) {
  console.error(`No Chrome or Chromium binary found. Tried: ${candidates.join(', ')}`);
  process.exit(1);
}

for (const target of targets) {
  mkdirSync(dirname(target.output), { recursive: true });

  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--no-pdf-header-footer',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=4000',
    `--print-to-pdf=${target.output}`,
    `file://${target.source}`,
  ];

  const result = spawnSync(chrome, args, { encoding: 'utf8' });

  if (result.status !== 0) {
    console.error(result.stderr || result.stdout || 'Chrome exited with a non-zero status.');
    process.exit(result.status ?? 1);
  }

  if (!existsSync(target.output)) {
    console.error(`Chrome reported success but wrote no PDF for ${target.label}.`);
    process.exit(1);
  }

  const { size } = statSync(target.output);
  console.log(`Wrote ${target.output} (${(size / 1024).toFixed(1)} KB)`);

  // `npm run build` runs before this script, so it copied the *previous* PDF
  // into dist/. Without this copy, the deployed file is one generation behind.
  const distCopy = target.output.replace(join(root, 'public'), join(root, 'dist'));
  copyFileSync(target.output, distCopy);
  console.log(`Synced ${distCopy}`);
}

console.log(`Drift check passed: ${bulletCounts.en} list items per language, ${REQUIRED_TOKENS.length} claims matched.`);
