# Nexus

**Nexus** is a personal link-in-bio page — a single, static site in the spirit of
[Carrd](https://carrd.co) and [Linktree](https://linktr.ee) — served at
[nexus.altrf.dev](https://nexus.altrf.dev). It puts the links that matter (socials,
projects, contact) behind one clean, fast-loading page.

It's built with [Astro](https://astro.build) and styled with
[Tailwind CSS](https://tailwindcss.com). There's no backend, database, or login —
the site is generated as static HTML and deployed to the subdomain.

## Getting started

Requires [Bun](https://bun.sh) and Node.js 24 (pinned in `.nvmrc`).

```bash
bun install      # install dependencies
bun run dev      # start the dev server at http://localhost:4321
bun run build    # build the static site to ./dist/
bun run preview  # preview the production build locally
```
