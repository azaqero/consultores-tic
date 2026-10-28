# consultores-tic-web

Source for [consultores-tic.com](https://www.consultores-tic.com).

A static site built with [Astro](https://astro.build): semantic HTML, no client-side
JavaScript, no backend, no database. Content is versioned in Git.

## Why this repository exists

The company site previously ran on WordPress. This repository replaces it with a
static build that is simpler to reason about, cheaper to maintain and easier to
audit. The reasoning behind each significant choice is recorded as an Architecture
Decision Record in [`docs/adr/`](docs/adr/).

## Standards

The rules this project follows — language, privacy, metadata, release gates,
deploy and review — live in [`docs/PROJECT_STANDARDS.md`](docs/PROJECT_STANDARDS.md).
It is written to be copied into a new project and adapted where marked
**[ADAPT]**. This repository is one implementation of it, not the source of truth.

## Requirements

- Node.js 22+
- npm 10+

## Commands

| Command           | Action                                       |
| ----------------- | -------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start the dev server at `localhost:4321`     |
| `npm run build`   | Build the production site into `./dist/`     |
| `npm run preview` | Preview the production build locally         |
| `npm run cv:pdf`  | Rebuild and regenerate both CV PDFs          |
| `npm run release` | Build, regenerate CVs, and check for leaks   |
| `npm run check:leaks` | Scan `dist/` for unexpected personal data |
| `npm run check:copy`  | Reject Rioplatense Spanish in `src/`    |

## The CV

The curriculum exists in exactly one place: [`src/content/cv.ts`](src/content/cv.ts).
The page at `/cv/` renders it, and `npm run cv:pdf` prints that page with headless
Chrome into `public/cv.pdf`.

The generated PDF is committed on purpose. The host serves files and never builds,
so the artifact has to exist in the repository for the download link to work.

Regenerating the PDF requires a `google-chrome`, `chromium` or `chromium-browser`
binary, plus `exiftool` and `qpdf`. The last two pin the document dates and the
document ID so repeated runs over unchanged content produce identical bytes; a
missing tool exits with an explanatory error instead of writing a stale file.

## Structure

```
src/
  layouts/       Shared page shell
  components/    Reusable UI pieces
  pages/         Routes — English at the root, Spanish under /es/
docs/adr/        Architecture Decision Records
public/          Static assets served as-is
```

## Languages

English is the default locale and lives at the site root. Spanish lives under `/es/`.
The routing decision is documented in
[ADR 0003](docs/adr/0003-bilingual-routing.md).

## Deployment

Step-by-step: [docs/deploy-checklist.md](docs/deploy-checklist.md). Reasoning:
[ADR 0004](docs/adr/0004-deployment-and-rollback.md). The build is uploaded to
Linux shared hosting (reseller account under `consultores-tic.net`), with a
documented rollback path to the previous WordPress installation. The server never
builds: it only serves files.
