# Letters from the Floor

The infrastructure for *Letters from the Floor*, a weekly publication about the
human texture of business. This repo is the site, the deploy pipeline, and a
small set of editorial working files. The publication itself lives at
[lettersfromthefloor.com](https://lettersfromthefloor.com).

Editorial reference documents — voice, beat, standards, the publication plan —
live in [`/docs/`](./docs). Read those before drafting.

## Stack

- **Astro** (blog template, TypeScript strict) for the static site
- **MDX** for any rich-content posts
- **GitHub Pages** for hosting, served from the apex domain via `public/CNAME`
- **GitHub Actions** (`.github/workflows/deploy.yml`) builds and deploys on push to `main`

## Writing a post

Posts live in `src/content/posts/` as `.md` or `.mdx` files. Each file's slug
becomes its URL: `/posts/<slug>/`.

Use this frontmatter shape (see `src/content/posts/_placeholder.md.example` for
a fuller template):

```yaml
---
title: The Long Memory of Strangers
dek: A one-line italic summary that sits below the title.
publishDate: 2026-05-12
register: atlantic  # gladwell | atlantic | newyorker | mixed
form: essay         # essay | profile | reportage | history | capstone
wordTarget: 2400
draft: true         # set to false to publish
sources:            # optional
  - Jane Doe (CEO, Example Corp)
corrections:        # optional, append-only
  - date: 2026-05-14
    note: Earlier version misspelled the subject's name.
---
```

The Zod schema in [`src/content.config.ts`](./src/content.config.ts) enforces
the shape. Setting `draft: false` requires a `publishDate` of today or earlier.

In `pnpm run dev`, **all posts including drafts are visible** so you can
iterate. In production builds, drafts are filtered out of the archive, RSS, and
post routes.

## Publishing a post

1. Set `draft: false` and confirm `publishDate`
2. Commit and push to `main`
3. GitHub Actions builds and deploys

```sh
git add src/content/posts/<slug>.md
git commit -m "Publish: <title>"
git push origin main
gh run watch              # follow the deploy
```

## Local development

```sh
pnpm install
pnpm run dev              # http://localhost:4321
pnpm run build            # static site to ./dist
pnpm run preview          # serve the built site locally
```

## Working files (`.pub/`)

The `.pub/` directory holds the editor's working state:

- `current-state.md` — weekly working file: in flight, queued, source pipeline (tracked)
- `ideas.md` — running idea backlog (tracked)
- `sources.yaml.example` — schema for the sources file (tracked)
- `sources.yaml` — real source list (**gitignored**)
- `announcements/` — drafts for LinkedIn / X posts (**gitignored**)

## Deployment notes

- The site is served at the apex domain `lettersfromthefloor.com` via
  `public/CNAME`. No `base` path is set in `astro.config.mjs` — leave it as
  root.
- DNS: A records to GitHub's IPs, plus CNAME for `www`.
- HTTPS is enforced via the Pages settings; the workflow uses the standard
  `actions/deploy-pages@v4` action.
- **Note:** this repo is currently private and GitHub Pages on private repos
  requires GitHub Pro or an org plan. Make the repo public, or upgrade, before
  the first deploy will succeed.

## Editorial standards

Read [`docs/voice-guide.md`](./docs/voice-guide.md) before writing, and the
[`docs/editorial-package.md`](./docs/editorial-package.md) for the
publication-facing standards pages.
