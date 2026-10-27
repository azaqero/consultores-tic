# Deployment runbook

Companion to [ADR 0004](adr/0004-deployment-and-rollback.md), which records *why*
this is done this way. This file is the *how*, in order, with verification at every
step.

The site is a static build uploaded to Linux shared hosting over SFTP. The server
never builds anything; it serves files.

---

## 0. Pre-flight (local, before touching the server)

```bash
npm run cv:pdf          # build + regenerate the CV PDF
node scripts/verify-deploy.mjs https://www.consultores-tic.com   # after upload only
```

Confirm before continuing:

| Check | Command | Expected |
| --- | --- | --- |
| No personal data in the build | `grep -ril "<private-email>\|<private-phone>" dist/ public/` | no output |
| No dead internal links | see `scripts/verify-deploy.mjs` | 0 failures |
| Build size | `du -sh dist` | under 1 MB |
| Critical files present | `ls dist/.htaccess dist/404.html dist/sitemap.xml dist/cv.pdf` | all present |

The build output is `dist/`. That directory is the entire deployable artifact.

---

## 1. Backups — nothing else starts until these exist

Three things get backed up, and **all three must be downloaded to the local
machine**. A backup that lives only on the server is not a backup.

1. **Document root** (`public_html`): compress and download.
2. **WordPress database**: export via the hosting panel or phpMyAdmin, download.
3. **Existing `.htaccess`**: it contains the current redirect rules. Save it
   separately — the new one replaces it.

Verify: open the downloaded archive and confirm it contains files. Open the `.sql`
dump and confirm it has `CREATE TABLE` statements.

---

## 2. Stage

Upload `dist/` to a temporary location — a subdomain or a subdirectory that is not
the document root.

Verify on the staged copy:

- Navigation between all six sections, in both languages.
- The language switcher lands on the translated counterpart, not the home page.
- `/cv.pdf` downloads and opens.
- No mixed-content warnings (everything over HTTPS).

`node scripts/verify-deploy.mjs https://<staging-url>` is the fastest way to check
all of it at once. Redirect rules will fail on staging; pages and assets should not.

---

## 3. Promote

1. **Rename**, do not delete, the WordPress files:
   `public_html` → `public_html-backup-YYYY-MM-DD`.
2. Upload `dist/` contents into the document root.
3. Confirm `.htaccess` arrived. **SFTP clients hide dotfiles by default** — this is
   the single most common way to deploy a site with no redirects and no HTTPS.

---

## 4. Verify (live)

```bash
node scripts/verify-deploy.mjs https://www.consultores-tic.com
```

Expected: every check passes. What it covers:

- All six pages, both languages, return 200.
- `cv.pdf`, `og-default.png`, `portrait.jpg`, `sitemap.xml`, `robots.txt` return 200
  with the right content type.
- Canonical, hreflang and JSON-LD are present.
- Legacy URLs redirect with **301**, not 302.
- Removed blog content returns **410**, not a redirect to the homepage.
- Non-www redirects to www.
- An unknown URL returns **404**, not 200.

Then, manually:

- [ ] Email still sends and receives. **This is the check that matters most and the
      one nobody remembers.** DNS was not touched, so any failure here is not from
      this deployment — which is exactly why it is worth confirming.
- [ ] `https://www.consultores-tic.com/cv.pdf` opens on a phone.
- [ ] The contact button opens a mail client addressed to `contacto@consultores-tic.com`.
- [ ] Send a test message to that alias and confirm it lands in the private inbox.

---

## 5. Rollback

Rollback is a directory rename, measured in seconds. No DNS, no rebuild.

1. Move the current document root aside.
2. Rename `public_html-backup-YYYY-MM-DD` back to `public_html`.
3. If WordPress must run again, restore the database dump.

**The backup directory stays on the server for at least a week**, with no reported
broken links and confirmed email delivery, before it is deleted.

---

## Notes

- The certificate currently covers both `consultores-tic.com` and
  `www.consultores-tic.com`, issued by Let's Encrypt, expiring 21 Nov 2026. Renewal
  is handled by the host. The `.htaccess` forces `www` and HTTPS, which depends on
  that certificate staying valid.
- `dist/` contains `.htaccess`. Some SFTP clients skip dotfiles silently. Verify
  after upload.
- `public/cv.pdf` is generated, committed, and copied into `dist/` by
  `npm run cv:pdf`. Never upload a PDF edited by hand.
