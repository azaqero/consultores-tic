import type { APIRoute } from 'astro';
import { routes, type RouteKey } from '../i18n/ui';
import { identity } from '../config';

/**
 * Hand-written sitemap. No integration and no dependency: the route list is
 * already the source of truth for the site, so the sitemap is derived from it.
 *
 * Every URL is emitted for both locales with `xhtml:link` alternates, matching
 * the hreflang pairs the pages declare. See docs/adr/0003-bilingual-routing.md
 */
export const GET: APIRoute = () => {
  const base = identity.siteUrl;
  const now = new Date().toISOString().slice(0, 10);

  const keys = Object.keys(routes) as RouteKey[];

  const entries = keys.flatMap((key) =>
    (['en', 'es'] as const).map((lang) => {
      const loc = new URL(routes[key][lang], base).href;
      const en = new URL(routes[key].en, base).href;
      const es = new URL(routes[key].es, base).href;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${es}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${en}"/>
  </url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
