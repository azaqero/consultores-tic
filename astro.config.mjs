// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.consultores-tic.com',
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
