# Biosite - mturro.com

Personal website built with Next.js 16 (App Router), React 19, and Tailwind CSS. Deployed on Netlify.

## Commands

- `npm run dev` — Start dev server (Turbopack) at localhost:3000
- `npm run build` — Production build

## Architecture

- **App Router** (`app/`) — No Pages Router. Uses server components by default.
- **Fonts** — Defined in `lib/fonts.js` (Lora, Merriweather, Playfair_Display via `next/font/google`). Import from `@lib/fonts`.
- **Path aliases** — `@components/*`, `@styles/*`, `@lib/*` (configured in `jsconfig.json`)
- **Styling** — Tailwind CSS + CSS Modules + custom CSS variables in `styles/globals.css`
- **Markdown** — `content/bio.md` read via Node `fs` in server component (no build-time loader)
- **No dark mode** — Site always renders in light mode. GitHub calendar uses `colorScheme="light"`.

## Routes

| Route | File | Type |
|-------|------|------|
| `/` | `app/page.js` | Client component (GitHubCalendar widget) |
| `/about` | `app/about/page.js` | Server component (reads bio.md with fs) |
| `/journal` | `app/journal/page.js` | Async server component (fetches from write.as API) |

## Key Patterns

- `Header` takes a `showNavigation` prop (default `true`). Home page passes `false`.
- `Navigation` is a client component (`'use client'`) with hamburger menu state.
- Journal data comes from `https://write.as/api/collections/mturro/posts` with `cache: 'no-store'`.
- `AboutContent` is a `'use client'` wrapper for `react-markdown` rendering.

## Deployment

Netlify — builds with `npm run build`, publishes `.next` directory.
