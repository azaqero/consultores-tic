# 0004 — Deployment and rollback

- **Status:** Accepted
- **Date:** 2026-10-27

## Context

The domain `consultores-tic.com` currently hosts a WordPress installation on Linux
shared hosting, served from a reseller account under the `consultores-tic.net`
brand (ResellersPanel). Access to files is through the provider's control panel,
FTP/SFTP and a file manager. There is no Git-based deploy pipeline and no shell
access to a build toolchain on the server.

The same domain carries business email, which must not be interrupted.

Two risks dominate:

1. **Losing email.** DNS records, especially MX, must not change as a side effect
   of replacing a website.
2. **Having no way back.** Once files point at the new site, a defective deploy
   must be reversible without waiting on a support ticket.

## Decision

Build locally, upload the static output to the existing hosting, and only move the
WordPress installation aside once a verified backup exists.

The build produces a self-contained directory (`dist/`) of HTML, CSS and assets.
The server only serves files; it never builds them.

Sequence:

1. **Back up first.** Archive the WordPress document root and export the database.
   Download both. A backup that exists only on the same server is not a backup.
2. **Record current DNS.** Snapshot MX, SPF and TXT records. Confirm no step of
   this process touches DNS.
3. **Stage the build.** Upload `dist/` to a temporary subdomain or subdirectory
   and verify navigation, assets, redirects and language switching there.
4. **Promote.** Move the WordPress files aside into a dated archive directory
   rather than deleting them, then upload the verified build to the document root.
5. **Redirect.** Serve 301s from previously indexed WordPress URLs to their new
   equivalents. Publish `sitemap.xml` and `robots.txt`.
6. **Verify.** Confirm the site over HTTPS and confirm email still delivers in both
   directions.

## Rollback

Rollback is a file operation, not a rebuild:

- Move the dated archive directory back to the document root.
- Restore the database export if the WordPress instance is to run again.
- DNS is untouched throughout, so no propagation delay applies.

The rollback window stays open until the new site has run for at least a week with
confirmed email delivery and no reported broken links.

## Consequences

**Positive**

- No DNS changes for the website replacement, which removes the largest single
  failure mode and the slowest one to recover from.
- Rollback is a directory rename measured in seconds.
- The server needs no Node.js, no build tooling and no runtime beyond a web server.
- Email risk is handled explicitly rather than assumed away.

**Negative**

- Deployment is a manual upload, not `git push`. Accepted: the output is a static
  directory, so the step is scriptable later with `rsync` or FTP from CI without
  changing anything else in the design.
- No atomic release on the server. Mitigated by staging first and by keeping the
  previous version on disk.
- The WordPress installation remains on disk during the rollback window, consuming
  space and requiring that it stays unreachable.

## Open question

Whether the reseller control panel exposes SSH. If it does, deployment can be a
single `rsync` command and step 4 becomes scriptable immediately. If it does not,
uploads go over SFTP or the file manager. The rollback strategy is unaffected
either way.

## Alternatives considered

| Alternative | Why rejected |
| --- | --- |
| Move hosting to Netlify, Vercel or Cloudflare Pages | Better deploy story, but requires changing DNS for the apex domain and would separate website hosting from email hosting. Not worth the migration risk for a static site. |
| Build on the server | Requires Node.js in a shared hosting environment that does not provide it, and turns every deploy into a toolchain problem. |
| Keep WordPress live and serve the new site from a subdomain | Splits the canonical URL, damages SEO for the primary domain, and leaves the old stack running indefinitely. |
| Delete WordPress files after backup | Removes the cheapest rollback path for no benefit. |
