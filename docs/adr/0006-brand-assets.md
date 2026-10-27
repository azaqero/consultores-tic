# 0006 — Brand assets: logo and portrait

- **Status:** Accepted
- **Date:** 2026-10-27

## Context

Two brand assets exist, both raster and both low resolution:

| Asset | Size | Format |
| --- | --- | --- |
| Wordmark | 275 × 73 | PNG, transparent, single colour at ~50% opacity |
| Portrait | 131 × 177 | PNG, cropped from a group photograph |

The site runs in two colour modes, driven by `prefers-color-scheme`. A dark logo
disappears on a dark background, which makes the dark mode broken rather than
merely imperfect.

## Decision

**The header keeps the typographic mark, not the wordmark.**

At the 30–40px height a site header allows, the 275 × 73 wordmark renders at
roughly a third of its intended size and its letterforms stop being legible. A
logo that cannot be read is worse than no logo. The current treatment — a "CT"
monogram plus the company name set in the site's own type — stays legible at
every size, inherits the colour tokens of both modes for free, and costs nothing
to download.

The wordmark is not used on the site. It remains available for contexts where it
is displayed at its designed size: print, invoices, the OG card, external profiles.

**A portrait is optional, and the page does not break without one.**

`src/components/Profile.astro` renders `/public/portrait.jpg` when it exists and a
monogram otherwise. Absence is a supported state, not a missing file.

## Why no sketched or illustrated portrait

Considered and rejected. For a senior engineering role:

1. An illustration where a face is expected reads as evasion, not as style.
2. It contradicts the site's own claim of directness and accountability.
3. The privacy argument does not apply: a photograph on a professional profile
   does not produce spam, which is what the contact decisions in ADR 0005 were
   about.

The ranking is: **real photograph > no photograph > illustration**. A missing
photo is a normal choice for a backend engineer. An illustrated one is a question
mark nobody asked for.

## Why the logo was not vectorised

Tracing the PNG with potrace works, and a traced copy was produced. It was not
adopted, for two reasons:

1. The source is 73px tall. A trace reproduces its antialiasing artefacts as
   geometry rather than removing them: vectorising a low-resolution raster gives
   you a sharp version of a blurry drawing.
2. A trace cannot be verified without visual review. Shipping artwork nobody has
   looked at — with the original now replaced — is how a logo silently degrades.

When a real vector exists from the original designer, it should replace the PNG
and this decision should be revisited. A single-colour SVG with
`fill="currentColor"` would then solve the dark-mode problem natively instead of
through a CSS filter.

If the PNG ever needs to appear on the site, the correct treatment is a CSS filter
that normalises it per mode (`filter: brightness(0)` in light, `brightness(0)
invert(1)` in dark) rather than a second asset.

## Portrait requirements

Not met by the current file, recorded so the eventual replacement is right:

- Square, 1:1 aspect.
- At least 400 × 400; 800 × 800 preferred for high-density screens.
- A crop dedicated to this purpose. A crop taken from a group photograph is
  visible as one: the framing, the lighting direction and the background are all
  decided by the original composition.
- Head occupying roughly 55–65% of the frame height, eyes in the upper third.
- Plain background preferred. No other people, no cropped shoulders at the edges.

## Consequences

**Positive**

- Dark mode cannot break the brand.
- No new asset pipeline, no second logo file to keep in sync.
- The portrait slot can be filled whenever a suitable photograph exists, with no
  layout change and no broken-image state.

**Negative**

- The wordmark is not on the site, which some would expect from a corporate
  presence.
- The monogram "GA" is a stand-in until a real portrait exists, not a design.
