# 0002 — Use Astro as the site generator

- **Status:** Accepted
- **Date:** 2026-10-27

## Context

ADR 0001 establishes that the site is statically generated. This record covers the
choice of generator.

Constraints that matter:

- The site is small: four routes in two languages, eight pages total.
- The output must be plain HTML and CSS. The point of the rebuild is to remove
  runtime complexity, not to relocate it into a JavaScript bundle.
- Bilingual routing has to be maintainable. Navigations, metadata and footer links
  must not be duplicated by hand across languages.
- The person maintaining it writes TypeScript and has production experience with
  React and Next.js. The tool should build on that knowledge rather than require
  learning a new template language for an eight-page site.
- The choice has to be defensible in one sentence to another engineer.

## Decision

Use Astro, configured for static output with no client-side hydration.

Rationale:

1. **Zero client-side JavaScript by default.** Components render to HTML at build
   time. Interactivity is opt-in and there is none in scope. The delivered artifact
   matches the intent of ADR 0001.
2. **TypeScript and a component model already familiar.** Coming from React and
   Next.js, the authoring model requires no new mental overhead.
3. **Built-in i18n routing.** `defaultLocale`, `locales` and `prefixDefaultLocale`
   are configured in one place instead of being replicated across every page.
4. **Content collections** handle the CV and project entries as typed data rather
   than hand-edited HTML.

## Consequences

**Positive**

- Bilingual routing is a configuration concern, not a copy-paste concern.
- Shared layout, header and footer exist once.
- The build fails on broken content through schema validation.
- Deploy is `npm run build` and copy `dist/`.

**Negative**

- Adds a build step and `node_modules`. Accepted: the cost is at authoring and
  deploy time, never at request time.
- Astro's release cadence requires occasional upgrades. Bounded by the small
  surface actually used.

## Alternatives considered

| Alternative | Why rejected |
| --- | --- |
| Next.js | Already known, and that is the only advantage. It ships a React runtime, a routing model designed for server rendering, and a build pipeline justified by applications this site is not. Choosing it invites "why a framework with a server for four static pages?" and the question has no good answer. |
| Eleventy | The closest competitor on output quality: also static, also minimal. Rejected because its templating and data model are a new language to learn for an eight-page site, with no offsetting benefit over Astro given existing TypeScript and React experience. |
| Hand-written HTML | Zero dependencies and zero build. Rejected once bilingual content is in scope: eight files with shared navigation, metadata and language switchers must be kept in sync manually. That is a defect generator, not a simplification. |
| Hugo | Excellent build speed and a mature i18n story. Rejected on authoring model: Go templates plus a content layout convention is another new language for a small site. |
