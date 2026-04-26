# Biosite - mturro.com

Personal website built with Next.js 16 (App Router), React 19, and Tailwind CSS. Deployed on Netlify.

## Commands

- `npm run dev` — Start dev server (Turbopack) at localhost:3000
- `npm run build` — Production build
- `npm run sync-journal` — Fetch posts from write.as API and write to `content/journal/`

## Architecture

- **App Router** (`app/`) — No Pages Router. Uses server components by default.
- **Fonts** — Defined in `lib/fonts.js` (Fraunces display, Inter sans, JetBrains Mono via `next/font/google`). The three font objects are applied as CSS variables on `<html>` in `app/layout.js` and consumed in `styles/globals.css` via `--font-sans`, `--font-display`, `--font-mono`. Use the CSS vars in stylesheets — don't import font objects into individual components.
- **Path aliases** — `@components/*`, `@styles/*`, `@lib/*` (configured in `jsconfig.json`)
- **Styling** — Tailwind CSS + CSS Modules + custom CSS variables in `styles/globals.css`
- **Markdown** — `content/bio.md` read via Node `fs` in server component (no build-time loader)
- **No dark mode** — Site always renders in light mode. GitHub calendar uses `colorScheme="light"`.
- **ESM note** — `next.config.js` and `tailwind.config.js` use CommonJS (`module.exports`). Do not add `"type": "module"` to `package.json`. Scripts that use ESM syntax should use the `.mjs` extension.

## Routes

| Route | File | Type |
|-------|------|------|
| `/` | `app/page.js` | Client component (GitHubCalendar widget) |
| `/about` | `app/about/page.js` | Server component (reads bio.md with fs) |
| `/journal` | `app/journal/page.js` | Server component (reads from `content/journal/` via `lib/journal.js`) |

## Key Patterns

- `Header` takes a `showNavigation` prop (default `true`). Home page passes `false`.
- `Navigation` is a client component (`'use client'`) with hamburger menu state.
- Journal data is read from local markdown files in `content/journal/` via `getPosts()` in `lib/journal.js`. The write.as API has no CORS headers, so it cannot be fetched client-side.
- `AboutContent` is a `'use client'` wrapper for `react-markdown` rendering.

## Journal Sync

Journal posts are fetched from `https://write.as/api/collections/mturro/posts` and stored locally as markdown files in `content/journal/<id>.md`. These files are committed to git.

**Frontmatter format:**
```
---
id: <post id>
slug: <post slug>
created: <ISO 8601 timestamp>
---

Post body content.
```

**Sync script:** `scripts/sync-journal.mjs` — idempotent, overwrites existing files, does not delete removed posts.

**Sync:** Run `npm run sync-journal` locally after publishing a new post, then commit and push the resulting `.md` file.

## Deployment

Netlify — builds with `npm run build`, publishes `.next` directory. Deploys are triggered automatically by git pushes to `main` (including automated journal sync commits).
