# 0001 — Replace WordPress with a static site

- **Status:** Accepted
- **Date:** 2026-10-27

## Context

consultores-tic.com has run on WordPress for years. The site is a corporate
presence: a handful of pages describing who I am, what I have built and how to get
in touch. It receives no user-generated content, has no authentication, no
transactional workflow and no interactive features beyond a contact email link.

WordPress for this workload brings a set of costs that scale with time rather than
with value delivered:

- A PHP runtime, a database and a plugin ecosystem to keep patched.
- A CMS whose editing surface is used a few times a year.
- Security exposure from third-party plugins that are not needed for static copy.
- A rendering pipeline that hides the actual HTML being served.

The site also needs to be rebuilt anyway: the positioning is changing and the
current structure no longer reflects the work.

## Decision

Replace WordPress with a statically generated site. The build produces plain HTML,
CSS and — where genuinely required — minimal JavaScript. There is no backend, no
database and no runtime other than the web server that serves files.

Content lives in Git. Changing the site means changing files and rebuilding, not
editing rows in a database.

## Consequences

**Positive**

- No database to back up, no PHP runtime to patch, no plugin surface to audit.
- The deployed artifact is readable: what you review is what is served.
- Full version history and reviewability through Git.
- Cost drops to shared hosting of static files.
- Page weight and load time become properties of the build, not of a plugin stack.

**Negative**

- Editing requires a text editor and a deploy cycle. No WYSIWYG.
- Non-technical authors cannot contribute. Acceptable: there are none.
- Features WordPress provides for free (comments, search, feeds) must be built or
  omitted. They are not in scope.

**Neutral**

- Migration carries risk regardless of destination. It is bounded by ADR 0004.

## Alternatives considered

| Alternative | Why rejected |
| --- | --- |
| Stay on WordPress, retheme | Keeps every cost listed above and adds a redesign on top of it. |
| Headless CMS (Strapi, Sanity) with a static front end | Adds a service, a database and an external dependency to manage six static pages. |
| Server-rendered PHP without WordPress | Keeps the runtime that this change exists to remove, and reintroduces a bespoke PHP application with no framework. |
| Fully hand-written HTML | Viable, and reconsidered in ADR 0002. Rejected on maintenance grounds once bilingual content is in scope. |
