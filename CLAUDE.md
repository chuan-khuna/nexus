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
  `src/styles/presets/nexus.css` (a dark theme — purple `--primary`, orange
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
    index.astro          # the single link-in-bio page
  layouts/
    Layout.astro         # root HTML shell (<html>, <head>, meta, FontLoader)
  components/
    FontLoader.astro     # <Font> tags for the Astro Font API
    Welcome.astro        # default scaffold component (to be replaced)
  styles/
    globals.css          # @import 'tailwindcss' + @theme token mapping + base layer
    presets/
      nexus.css          # oklch design tokens (dark theme)
  assets/                # images / SVGs imported by components
public/                  # static assets served at / (favicons, etc.)
```

- `src/styles/globals.css` is imported once in `Layout.astro`; it wires the design
  tokens into Tailwind and sets base `body` styles.
- Fonts are configured in `astro.config.mjs` and emitted by `FontLoader.astro`.
