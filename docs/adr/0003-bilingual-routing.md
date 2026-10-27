# 0003 — Bilingual routing

- **Status:** Accepted
- **Date:** 2026-10-27

## Context

The site is published in English and Spanish. English is the primary audience:
the professional positioning targets international backend roles, and technical
communication is in English. Spanish remains available because the company serves
local clients and the brand is regional.

Two properties are required:

1. Each language must be reachable at its own stable, shareable URL.
2. Search engines must see the relationship between the two versions, not two
   unrelated sites.

## Decision

English is the default locale and lives at the site root. Spanish lives under
`/es/`.

```
/              → English home
/profile       → English profile
/es/           → Spanish home
/es/perfil     → Spanish profile
```

Configuration is centralised in `astro.config.mjs`:

```js
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'es'],
  routing: { prefixDefaultLocale: false },
}
```

Every page declares a canonical URL. Both versions of a page link to each other
through `hreflang` alternates (`en`, `es`, `x-default` pointing at English).

Slugs are translated rather than mirrored. `/profile` and `/perfil` describe the
same page in the reader's language; a Spanish reader should not be sent to an
English URL shape.

## Consequences

**Positive**

- English URLs are short and clean, which matters for the primary audience.
- No duplicate content penalty: `hreflang` plus canonical URLs make the pairing
  explicit to crawlers.
- Adding a language later is a config entry plus a directory, not a restructure.

**Negative**

- Slugs must be maintained per locale. A cross-reference table lives with the
  content that generates the language switcher.
- A missing translation is possible. Mitigated by the language switcher falling
  back to the counterpart's home rather than a 404.

## Alternatives considered

| Alternative | Why rejected |
| --- | --- |
| Prefix both languages (`/en/`, `/es/`) | Symmetrical and marginally simpler to reason about, but lengthens every URL for the majority audience to serve the minority one. |
| Mirror slugs (`/es/profile`) | Cheaper to maintain, but reads as machine-translated to a Spanish visitor. |
| Client-side language switching | Requires JavaScript for a routing concern and produces two URLs for one page. Wrong for a static site. |
| Separate domains or subdomains | Splits ranking and doubles the deployment surface for two languages. |
