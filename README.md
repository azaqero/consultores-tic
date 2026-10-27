# consultores-tic-web

Source for [consultores-tic.com](https://www.consultores-tic.com).

A static site built with [Astro](https://astro.build): semantic HTML, no client-side
JavaScript, no backend, no database. Content is versioned in Git.

## Why this repository exists

The company site previously ran on WordPress. This repository replaces it with a
static build that is simpler to reason about, cheaper to maintain and easier to
audit. The reasoning behind each significant choice is recorded as an Architecture
Decision Record in [`docs/adr/`](docs/adr/).

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

See [ADR 0004](docs/adr/0004-deployment-and-rollback.md). The build is uploaded to
Linux shared hosting (reseller account under `consultores-tic.net`), with a
documented rollback path to the previous WordPress installation. The server never
builds: it only serves files.
