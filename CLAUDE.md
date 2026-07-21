## Project

**Nexus** is a personal link-in-bio page — a single static site in the spirit of
Carrd / Linktree — served at **nexus.altrf.dev**. One page, a curated set of links,
no backend.

Stack and conventions follow the sibling project `digital-garden-2024`
(`D:\code\digital-garden-2024`) — refer to it for patterns not covered here.

## Stack

- **Astro 7** — static output (no SSR adapter)
- **TypeScript** — strict (`astro/tsconfigs/strict`)
- **Tailwind CSS v4** — Vite plugin (`@tailwindcss/vite`), CSS-first (no `tailwind.config.*`)
- **MDX** — `@astrojs/mdx` (content-collection entries are authored as `.mdx`)
- **Icons** — `astro-icon` + Iconify (`@iconify-json/simple-icons`, `@iconify-json/lucide`)
- **Bun** — package manager (preferred over npm)

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

### Imports

Always use the `@/` alias (maps to `src/`), configured in `tsconfig.json`:

```ts
import Layout from '@/layouts/Layout.astro'   // ✅
import Layout from '../layouts/Layout.astro'  // ❌ avoid relative paths
```

### Styling & design tokens

- **Tailwind v4:** use `@import 'tailwindcss'` in `src/styles/globals.css` — no
  `@tailwind` directives, no `tailwind.config.*`.
- **Design tokens:** colors are **oklch** CSS variables defined in
  `src/styles/presets/nexus.css` (a light theme — indigo `--primary`, orange
  `--accent`). They are exposed to Tailwind utilities (`bg-background`,
  `text-foreground`, `bg-primary`, …) via the `@theme inline` block in `globals.css`.
- **Never hardcode colors** — use the token utilities / CSS variables. To retheme,
  edit `presets/nexus.css`.

### Fonts

- **Font loading:** Astro Font API (`astro.config.mjs` → `fonts[]` with
  `fontProviders.google()`) + the `FontLoader.astro` component injected in
  `Layout.astro` `<head>`. CSS variables follow the `--font-<kebab-name>` convention
  (e.g. `--font-lato`), mapped to `--font-sans` / `--font-mono` in `globals.css`
  `@theme`.
- **Do not** add Google Fonts `@import` to CSS. To add a font: add an entry to
  `fonts[]` in `astro.config.mjs`, then a `<Font cssVariable="…" />` line in
  `FontLoader.astro`.
- Current fonts: **Lato** (sans / body) · **Inconsolata** (mono).

## Architecture

```
src/
  pages/
    index.astro          # the link-in-bio page — composes the sections below
  layouts/
    Layout.astro         # root HTML shell (<html>, <head>, meta, FontLoader)
  components/
    FontLoader.astro     # <Font> tags for the Astro Font API
    Profile.astro        # header card: greeting + tagline + intros + avatar + GitHub + time blocks
    TimeCard.astro       # compact live-clock block (Your time / My time), used inside Profile
    LinkCard.astro       # one link rendered as a card (icon + label + optional MDX description)
  content/
    collection-definitions/
      link.ts            # `links` collection — glob loader + zod schema
    links/               # one .mdx per link (frontmatter: label, url, icon, order)
  content.config.ts      # registers collections (imports the definitions)
  data/
    site.config.ts       # profile: name, tagline, intros, avatar, github, timezone (not a collection)
  styles/
    globals.css          # @import 'tailwindcss' + @theme token mapping + base layer
    presets/
      nexus.css          # oklch design tokens (light theme)
  assets/                # images / SVGs imported by components
public/                  # static assets served at / (lucy.jpg avatar, favicons)
```

- `index.astro` reads the `links` collection via `getCollection('links')`, sorts by
  `order`, and renders each `LinkCard` (the MDX body becomes the description). It also
  hosts an inline client `<script>` that ticks every `[data-timecard]` once a second
  (`Intl.DateTimeFormat` per IANA timezone — "My time" is fixed to `site.timezone`,
  "Your time" resolves the visitor's local zone).
- `src/styles/globals.css` is imported once in `Layout.astro`; it wires the design
  tokens into Tailwind and sets base `body` styles.
- Fonts are configured in `astro.config.mjs` and emitted by `FontLoader.astro`.

## Content

Links are an Astro **content collection** — one `.mdx` file per link in
`src/content/links/`:

```mdx
---
label: Digital Garden
url: https://altrf.dev
icon: lucide:sprout   # Iconify id (simple-icons / lucide)
order: 1              # ascending sort
---

Optional MDX body — renders as a short description inside the card.
```

- **Add a link:** drop a new `.mdx` into `src/content/links/`. The schema lives in
  `src/content/collection-definitions/link.ts`; collections are registered in
  `src/content.config.ts`.
- **Naming convention** (from `digital-garden-2024`): the definition file is
  **singular** (`link.ts`); the exported variable and content folder are **plural**
  (`linksCollection`, `links/`).
- **Profile** is *not* a collection — edit `src/data/site.config.ts`
  (name, `firstName`, tagline, intros, avatar, `github`, `timezone`). The `timezone`
  drives the "My time" clock in the header card.
