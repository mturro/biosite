# Testing Biosite (mturro.com)

Personal website built with Next.js 16 (App Router), React 19, Tailwind CSS, deployed on Netlify.

## Quick Start

```bash
yarn install
npm run dev          # starts dev server on localhost:3000
npm run build        # production build
```

## Running Cypress Tests

1. Start the dev server first: `npm run dev`
2. Run all tests: `npx cypress run`
3. Run a specific spec: `npx cypress run --spec cypress/e2e/journal.cy.js`

Cypress baseUrl is configured to `http://localhost:3000/` in `cypress.config.js`.

## Test Suites

| Spec | What it tests |
|------|---------------|
| `home.cy.js` | Home page title, links, GitHub calendar, navigation |
| `about.cy.js` | About page header, markdown content, footer |
| `journal.cy.js` | Journal posts from local markdown files, sort order, navigation |
| `navigation.cy.js` | Hamburger menu open/close, link navigation |

## Architecture Notes for Testing

- **Journal page** reads posts from local markdown files in `content/journal/` via `getPosts()` in `lib/journal.js`. It does NOT fetch from the write.as API at runtime. Do not try to intercept API calls in Cypress tests for this page.
- **About page** reads `content/bio.md` via Node `fs` in a server component.
- **Home page** is a client component (`'use client'`) with the GitHub calendar widget.
- The journal sync script (`npm run sync-journal`) fetches from the write.as API and writes to `content/journal/`. This is run manually, not at build time.

## Deploy Preview

Netlify generates deploy previews for PRs at `https://deploy-preview-{PR_NUMBER}--mturro.netlify.app`.

## Common Pitfalls

- The journal page is a server component that reads files at build/request time. Cypress `cy.intercept()` cannot mock server-side file reads — tests should assert against real rendered content from `content/journal/*.md`.
- `cypress/screenshots` and `cypress/videos` are gitignored. Do not commit test artifacts.
- The project uses `yarn` (v1) as its package manager. Use `yarn install` not `npm install`.
