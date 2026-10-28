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
 * Chrome prints over a local HTTP server rather than file://. Under file://, an
 * absolute asset path such as /portrait.jpg resolves to the filesystem root and
 * silently fails, and Chrome prints its broken-image placeholder into the PDF
 * at 14x16 pixels. Serving the build keeps every absolute path meaningful.
 *
 * It also fails the build when the two languages disagree. Two CVs that say
 * different things are worse than one CV: the guard compares bullet counts and
 * requires every numeric claim to appear in both.
 *
 * Requirements: a `google-chrome`, `chromium` or `chromium-browser` binary,
 * plus `exiftool` and `qpdf` to make the output reproducible.
 * Usage: npm run cv:pdf   (runs the build first)
 */
import { spawn, spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = join(root, 'dist');

const pages = [
  { label: 'en', path: '/cv/', output: join(root, 'public', 'cv.pdf') },
  { label: 'es', path: '/es/cv/', output: join(root, 'public', 'es', 'cv.pdf') },
];

/** Numeric claims that must be identical in both languages. */
const REQUIRED_TOKENS = ['2008', '~10k', '~4', '~30', '~300', '50'];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

const candidates = ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser'];

function findChrome() {
  for (const bin of candidates) {
    const probe = spawnSync('which', [bin], { encoding: 'utf8' });
    if (probe.status === 0 && probe.stdout.trim()) return probe.stdout.trim();
  }
  return null;
}

function requireTool(name) {
  const probe = spawnSync('which', [name], { encoding: 'utf8' });
  if (probe.status !== 0 || !probe.stdout.trim()) {
    console.error(
      `Missing "${name}". It is required to make the CV PDFs reproducible; install it and retry.`,
    );
    process.exit(1);
  }
}

/**
 * Chrome stamps every printed PDF with the current time and a random document
 * ID, so two runs over identical content produce different bytes. That makes
 * the committed PDFs dirty on every release even when the CV did not change.
 *
 * The dates are pinned to the last commit that touched the CV source, which is
 * stable across clones and changes only when the content does. qpdf then
 * recomputes the document ID from the normalised content.
 */
const FALLBACK_DATE = '1970:01:01 00:00:00Z';

function pinnedDate() {
  const probe = spawnSync('git', ['log', '-1', '--format=%cs', '--', 'src/content/cv.ts'], {
    cwd: root,
    encoding: 'utf8',
  });
  const day = probe.status === 0 ? probe.stdout.trim() : '';
  return /^\d{4}-\d{2}-\d{2}$/.test(day) ? `${day.replace(/-/g, ':')} 00:00:00Z` : FALLBACK_DATE;
}

function normalisePdf(file, date) {
  const stamped = spawnSync(
    'exiftool',
    ['-overwrite_original', `-CreateDate=${date}`, `-ModifyDate=${date}`, file],
    { encoding: 'utf8' },
  );
  if (stamped.status !== 0) {
    console.error(stamped.stderr || 'exiftool failed to pin the PDF dates.');
    process.exit(1);
  }

  const identified = spawnSync('qpdf', ['--deterministic-id', '--replace-input', file], {
    encoding: 'utf8',
  });
  if (identified.status !== 0) {
    console.error(identified.stderr || 'qpdf failed to normalise the PDF document ID.');
    process.exit(1);
  }
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

for (const page of pages) {
  const file = join(distRoot, page.path, 'index.html');
  if (!existsSync(file)) {
    console.error(`Missing ${file}. Run "npm run build" first (or use "npm run cv:pdf").`);
    process.exit(1);
  }
  const html = readFileSync(file, 'utf8');
  texts[page.label] = visibleText(html);
  bulletCounts[page.label] = (html.match(/<li>/g) || []).length;
}

const problems = [];

if (bulletCounts.en !== bulletCounts.es) {
  problems.push(`bullet count differs: en=${bulletCounts.en}, es=${bulletCounts.es}`);
}

for (const token of REQUIRED_TOKENS) {
  const inEn = texts.en.includes(token);
  const inEs = texts.es.includes(token);
  if (!inEn || !inEs) {
    const missing = [!inEn ? 'en' : '', !inEs ? 'es' : ''].filter(Boolean).join(' and ');
    problems.push(`claim "${token}" missing from ${missing}`);
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
requireTool('exiftool');
requireTool('qpdf');

const pdfDate = pinnedDate();

/**
 * Run Chrome without blocking the event loop.
 *
 * spawnSync would deadlock here: the static server that serves the page runs in
 * this same process, so blocking Node means Chrome never receives the HTML it is
 * waiting for, while this process waits for Chrome to exit.
 */
function runChrome(args) {
  return new Promise((resolve) => {
    const child = spawn(chrome, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    const timer = setTimeout(() => {
      child.kill('SIGKILL');
    }, 60_000);
    child.on('close', (code) => {
      clearTimeout(timer);
      resolve({ code, stderr });
    });
  });
}

const server = createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    let filePath = join(distRoot, urlPath);
    if (urlPath.endsWith('/')) filePath = join(filePath, 'index.html');
    const data = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('not found');
  }
});

await new Promise((r) => server.listen(0, '127.0.0.1', r));
const { port } = server.address();

try {
  for (const page of pages) {
    mkdirSync(dirname(page.output), { recursive: true });

    const args = [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--no-pdf-header-footer',
      '--run-all-compositor-stages-before-draw',
      '--virtual-time-budget=5000',
      `--print-to-pdf=${page.output}`,
      `http://127.0.0.1:${port}${page.path}`,
    ];

    const result = await runChrome(args);

    if (result.code !== 0) {
      console.error(result.stderr || `Chrome exited with status ${result.code}.`);
      process.exit(result.code ?? 1);
    }

    if (!existsSync(page.output)) {
      console.error(`Chrome reported success but wrote no PDF for ${page.label}.`);
      process.exit(1);
    }

    normalisePdf(page.output, pdfDate);

    const { size } = statSync(page.output);
    console.log(`Wrote ${page.output} (${(size / 1024).toFixed(1)} KB)`);

    // `npm run build` runs before this script, so it copied the *previous* PDF
    // into dist/. Without this copy, the deployed file is one generation behind.
    const distCopy = page.output.replace(join(root, 'public'), distRoot);
    copyFileSync(page.output, distCopy);
    console.log(`Synced ${distCopy}`);
  }
} finally {
  server.closeAllConnections?.();
  server.close();
}

console.log(
  `Drift check passed: ${bulletCounts.en} list items per language, ${REQUIRED_TOKENS.length} claims matched.`,
);
