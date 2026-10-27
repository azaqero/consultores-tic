# 0005 — Contact channels and email exposure

- **Status:** Accepted
- **Date:** 2026-10-27

## Context

A public site that publishes a personal email address will be scraped. The
address ends up in bulk lists within weeks, and spam is only the visible part:
the same lists feed credential-stuffing attempts against any account sharing
that identifier.

Two contact details were candidates for publication:

- A mailbox on the corporate domain, used daily.
- A personal mobile number.

Both appear, by default, on any CV or profile page. Both are also the two things
an identity thief or a spam operator values most.

Obfuscation was considered and rejected as the primary defence, for reasons
recorded below.

## Decision

**Publish a role alias, never the mailbox.**

```
contacto@consultores-tic.com   published: site, CV, PDF
contacto@consultores-tic.com    private: never rendered anywhere
```

The alias forwards to the private mailbox. If it starts receiving spam, a new
alias is created, the forwarder is repointed, one line changes in `src/config.ts`
and the site is rebuilt. Nothing migrates, because the private address was never
exposed.

**Do not publish the phone number.**

Removed from the site and from the CV. A recruiter writes email; a personal
mobile on a public page reliably attracts unsolicited calls and messaging and
nothing else.

## Why not obfuscate

Techniques considered:

| Technique | Rejected because |
| --- | --- |
| HTML entity encoding (`&#109;&#97;…`) | Trivially decoded. Modern scrapers normalise it before storing. |
| Assembling the address with JavaScript | Requires client-side JavaScript, which contradicts ADR 0001, and any scraper that runs a headless browser reads the final DOM anyway. |
| CSS `direction: rtl` reversal | The DOM contains the address backwards, so screen readers announce it backwards and copy-paste breaks. It costs accessibility and buys little. |
| Rendering the address as an image | Fails accessibility, fails copy-paste, fails at high DPI, and is still readable by OCR. |
| Contact form instead of an address | Requires a backend, which ADR 0001 excludes, and adds a spam target of its own. |

The conclusion is not that obfuscation is useless, but that it is the wrong layer.
Obfuscation tries to hide a value that must remain visible to be useful. An alias
removes the value from the public surface entirely, with no accessibility cost and
no JavaScript.

## Consequences

**Positive**

- The private mailbox is not exposed, so scraping the site cannot reach it.
- Rotation is a one-line change and does not require anyone to update their
  address book.
- No client-side JavaScript, no accessibility regression, no third-party service.
- The CV PDF carries the alias too, so the downloadable document does not leak
  what the site protects.

**Negative**

- The alias has to be created and maintained in the hosting control panel. If the
  forwarder breaks, mail is lost silently. Mitigated by testing delivery after
  creating it.
- A role address is slightly less personal than a named one. Accepted: it reads as
  a company contact point, which is exactly what this site is.
- Anyone who already has the private address keeps using it. That is fine; the
  goal is to stop bulk collection, not to hide from people.

## Verification

The build is checked for leaks, not just the source:

```
grep -ril "<private address>\|<phone>" dist/ public/
```

must return nothing. This is part of the release checklist, because the PDF is a
generated binary and cannot be inspected by reading the source.
