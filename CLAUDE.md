## Project

**Nexus** is a personal link-in-bio page — a single static site in the spirit of
Carrd / Linktree — served at **nexus.altrf.dev**. One page, a curated set of links,
no backend.

## Stack

- **Astro 7** — static output (no SSR adapter)
- **TypeScript** — strict (`astro/tsconfigs/strict`)
- **Tailwind CSS** — the intended styling approach _(not yet installed — see note below)_
- **Bun** — package manager (preferred over npm)

> Right now the repo is the default Astro `basics` scaffold. Tailwind is **not wired
> up yet**; when adding it, use **Tailwind v4** (CSS-first, no `tailwind.config.*`) to
> stay consistent with the sibling `altr-matcha` project.

## Commands

Use `bun` (preferred; `npm` / `npx` also work).

```bash
bun install      # install dependencies
bun run dev      # dev server at localhost:4321
bun run build    # build the static site to ./dist/
bun run preview  # preview the build locally
```

The dev server can run in background mode: `bunx astro dev --background`, managed with
`astro dev stop`, `astro dev status`, and `astro dev logs`.

## Conventions

- **Package manager:** prefer `bun` over `npm`.
- **Styling:** Tailwind utility classes (once installed); avoid custom CSS where
  Tailwind can cover it.
- **Components:** `PascalCase.astro` (e.g. `Welcome.astro`).
- **Pages:** `kebab-case.astro` under `src/pages/` (e.g. `index.astro`).
- **Imports:** currently relative paths; a `@/` → `src/` alias is **not** configured yet.

## Architecture

```
src/
  pages/
    index.astro       # the single link-in-bio page
  layouts/
    Layout.astro      # root HTML shell (<html>, <head>, global meta)
  components/
    Welcome.astro     # default scaffold component (to be replaced)
  assets/             # images / SVGs imported by components
public/                # static assets served at / (favicons, etc.)
```

- `src/pages/index.astro` composes `<Layout>` and the page content.
- `src/layouts/Layout.astro` provides the HTML shell and global `<head>` meta.
- Imported/optimized assets live in `src/assets/`; files served as-is live in `public/`.
