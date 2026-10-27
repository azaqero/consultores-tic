// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// SITE_BASE lets the same source be built for a subdirectory (staging at
// /new/) and for the document root. OUT_DIR keeps the two builds apart so a
// staging build can never be mistaken for the production artifact.
export default defineConfig({
  site: 'https://www.consultores-tic.com',
  base: process.env.SITE_BASE || '/',
  outDir: process.env.OUT_DIR || 'dist',
  build: {
    // Inline stylesheets: one less render-blocking request, and the built HTML
    // stays self-contained, which is what lets the CV page be printed to PDF
    // from disk without a web server.
    inlineStylesheets: 'always',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      // English lives at the root (/profile), Spanish under /es/profile.
      // Rationale: docs/adr/0003-bilingual-routing.md
      prefixDefaultLocale: false,
    },
  },
});
