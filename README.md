# Biosite — mturro.com

[![Netlify Status](https://api.netlify.com/api/v1/badges/46648482-644c-4c80-bafb-872057e51b6b/deploy-status)](https://app.netlify.com/sites/next-dev-starter/deploys)

Personal website for [mturro.com](https://mturro.com), built with [Next.js](https://nextjs.org/) 16 (App Router), [React](https://react.dev/) 19, and [Tailwind CSS](https://tailwindcss.com/). Deployed on [Netlify](https://www.netlify.com/).

Originally bootstrapped from the [Next + Netlify Starter](https://github.com/netlify-templates/next-netlify-starter) template, the project has since been substantially rewritten — migrated from the Pages Router to the App Router, updated to Next.js 16 / React 19, and extended with custom content, typography, and a journal sync workflow.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Architecture](#architecture)
- [Styling & Typography](#styling--typography)
- [Journal Sync](#journal-sync)
- [Testing](#testing)
- [Deployment](#deployment)

## Getting Started

**Prerequisites:** Node.js (see `.nvmrc` for the expected version — currently 25.x)

```bash
# Install dependencies
npm install

# Start the dev server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
app/                  # Next.js App Router pages and layouts
  layout.js           # Root layout (global styles, font CSS variables)
  page.js             # Home page — GitHub calendar, link hub
  about/              # /about — bio page (reads content/bio.md)
  journal/            # /journal — journal entries from local markdown
components/           # Reusable UI components
  Header.js           # Page header with optional Navigation
  Navigation.js       # Client-side hamburger menu
  Footer.js           # Site footer
content/              # Markdown content
  bio.md              # About page content
  journal/            # Journal post markdown files (synced from write.as)
lib/                  # Shared utilities
  fonts.js            # Google Fonts config (Fraunces, Inter, JetBrains Mono)
  journal.js          # Journal post reader with frontmatter parsing
scripts/
  sync-journal.mjs    # Fetches journal posts from write.as API
styles/
  globals.css         # Global styles, CSS variables, Tailwind directives
  Navigation.module.css  # Navigation component styles
public/               # Static assets (favicon, logos)
netlify.toml          # Netlify build configuration
tailwind.config.js    # Tailwind CSS configuration
jsconfig.json         # Path aliases (@components, @styles, @lib)
```

## Routes

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.js` | Home page — GitHub contribution calendar and links to internal pages and social profiles. Client component. |
| `/about` | `app/about/page.js` | Bio page — reads `content/bio.md` at request time via Node `fs`. Server component. |
| `/journal` | `app/journal/page.js` | Journal — displays posts from local markdown files in `content/journal/`. Server component. |

## Architecture

- **App Router** — The site uses Next.js App Router exclusively (`app/` directory). There is no Pages Router.
- **Server & client components** — Pages are server components by default. Components that need interactivity (`Navigation`, `AboutContent`, home page with `GitHubCalendar`) are marked with `'use client'`.
- **Path aliases** — `@components/*`, `@styles/*`, `@lib/*` are configured in `jsconfig.json` for clean imports.
- **Markdown rendering** — The about page reads `content/bio.md` from disk using Node `fs` in a server component, then passes it to an `AboutContent` client component that renders it with `react-markdown` and `remark-gfm`.
- **Journal data** — Journal posts are read from local markdown files in `content/journal/` via `getPosts()` in `lib/journal.js`. Each file has YAML frontmatter (`id`, `slug`, `created`) followed by the post body. Posts are sorted by date, newest first.
- **ESM note** — `next.config.js` and `tailwind.config.js` use CommonJS (`module.exports`). Scripts that need ESM syntax use the `.mjs` extension. There is no `"type": "module"` in `package.json`.

## Styling & Typography

The site uses **Tailwind CSS** alongside a detailed global stylesheet (`styles/globals.css`) that defines CSS custom properties for colors, spacing, and a typographic scale.

**Fonts** (via `next/font/google`, defined in `lib/fonts.js`):

| Font | Usage |
|------|-------|
| **Inter** | Body text and UI (applied via `--font-sans` CSS variable) |
| **Fraunces** | Page title, headings, journal dates (applied via `--font-display`) |
| **JetBrains Mono** | Code (applied via `--font-mono`) |

The three fonts are loaded as CSS variables on `<html>` in the root layout and consumed in `styles/globals.css`. Components do not import font objects directly.

**Design notes:**
- Light mode only — no dark mode toggle or media query.
- Header scale uses a 1.25x major-third progression for `h1`–`h6`.
- Navigation uses a hamburger menu pattern (CSS Modules + React state) for a minimal, mobile-friendly UI.

## Journal Sync

Journal posts originate on [write.as](https://write.as) and are synced locally as markdown files.

```bash
# Fetch latest posts from write.as and write to content/journal/
npm run sync-journal
```

The sync script (`scripts/sync-journal.mjs`) fetches from the [write.as API](https://write.as/api/collections/mturro/posts), generates markdown files with frontmatter, and writes them to `content/journal/<id>.md`. It is idempotent — existing files are overwritten, but removed posts are not deleted.

**Workflow:** After publishing a new post on write.as, run `npm run sync-journal` locally, then commit and push the new markdown file(s). Netlify will deploy automatically.

## Testing

The project includes [Cypress](https://www.cypress.io/) for end-to-end testing and [Renovate](https://www.mend.io/free-developer-tools/renovate/) for automated dependency updates.

Cypress tests are configured in `cypress.config.js` and live in the `cypress/` directory. They run against `http://localhost:3000`.

## Deployment

The site is deployed on **Netlify**. The build configuration lives in `netlify.toml`:

- **Build command:** `npm run build`
- **Publish directory:** `.next`

Deploys are triggered automatically by pushes to `main`.
