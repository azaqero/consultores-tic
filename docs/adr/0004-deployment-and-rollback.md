# 0004 — Deployment and rollback

- **Status:** Accepted
- **Date:** 2026-10-27

## Context

The domain `consultores-tic.com` currently hosts a WordPress installation on shared
hosting with cPanel. The same domain carries business email, which must not be
interrupted.

Two risks dominate:

1. **Losing email.** DNS records, especially MX, must not change as a side effect
   of replacing a website.
2. **Having no way back.** Once DNS or files point at the new site, a defective
   deploy must be reversible without waiting on a support ticket.

## Decision

Deploy the static build to the existing cPanel hosting, into the document root,
overwriting the WordPress installation only after a verified backup exists.

Sequence:

1. **Back up first.** Archive `public_html` and export the WordPress database.
   Download both. A backup that exists only on the same server is not a backup.
2. **Verify the email path independently.** Record current MX and SPF records.
   Confirm no step of this process touches DNS.
3. **Stage the build.** Upload `dist/` to a subdirectory or a temporary subdomain
   and verify navigation, assets and redirects there.
4. **Promote.** Move the WordPress files aside into a dated archive directory
   rather than deleting them.
5. **Redirect.** Serve 301s from previously indexed WordPress URLs to their new
   equivalents. Publish `sitemap.xml` and `robots.txt`.
6. **Verify.** Confirm the site over HTTPS, confirm email still delivers in both
   directions.

## Rollback

Rollback is a file operation, not a rebuild:

- Restore the dated archive directory to the document root.
- Restore the database export if the WordPress instance is to run again.
- DNS is untouched throughout, so no propagation delay applies.

The rollback window stays open until the new site has run for at least a week with
confirmed email delivery and no reported broken links.

## Consequences

**Positive**

- No DNS changes for the website replacement, which removes the largest single
  failure mode and the slowest one to recover from.
- Rollback is a directory rename measured in seconds.
- Email risk is explicitly handled rather than assumed away.

**Negative**

- Manual file upload instead of a Git-based deploy. Accepted for now; the hosting
  does not offer a first-class pipeline. The build output is a directory, so the
  upload step is trivially automatable later with `rsync` or FTP over CI.
- The WordPress installation remains on disk during the rollback window, consuming
  space and requiring that it stays unpatched but unreachable.

## Alternatives considered

| Alternative | Why rejected |
| --- | --- |
| Move hosting to Netlify, Vercel or Cloudflare Pages | Better deploy story, but requires changing DNS for the apex domain and would separate website hosting from email hosting. Not worth the migration risk for a static site. |
| Keep WordPress live and serve the new site from a subdomain | Splits the canonical URL, damages SEO for the primary domain, and leaves the old stack running indefinitely. |
| Delete WordPress files after backup | Removes the cheapest rollback path for no benefit. |
