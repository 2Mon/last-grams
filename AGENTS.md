You are an experienced, pragmatic software engineering AI agent. Do not over-engineer a solution when a simple one is possible. Keep edits minimal. If you want an exception to ANY rule, you MUST stop and get permission first.

# Last Grams

A Hack Club YSWS (You Ship, We Ship) website where users submit 3D-printable designs under 25 grams to earn rewards. Deployed via GitHub Pages (CI) and also Dockerized for Node server hosting.

## Technology

- **Framework**: SvelteKit 2 with Svelte 5 (runes mode enabled)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 (via Vite plugin, not PostCSS)
- **Build**: Vite 7, Node adapter (`@sveltejs/adapter-node`) → output in `build/`
- **Package manager**: npm (bun.lock also present; CI uses npm)
- **Formatting**: Prettier with `prettier-plugin-svelte`
- **Deployment**: GitHub Pages via `.github/workflows/static.yml` on `master` branch; also a `Dockerfile` that runs `node build` on port 3000

## Project Structure

```
src/
├── app.html              # HTML shell
├── app.d.ts              # SvelteKit type declarations
├── layout.css            # Global CSS (Tailwind imports)
├── lib/
│   ├── index.ts          # Shared library exports
│   └── assets/           # Static assets (favicon)
├── routes/
│   ├── +error.svelte           # Error page
│   ├── +layout.svelte          # Root layout
│   ├── +layout.ts              # Layout config (prerender, trailing slash)
│   ├── +page.svelte            # Home page (hero, project showcase)
│   ├── api/subscribe/+server.ts  # POST endpoint — saves email to Airtable
│   ├── gallery/+page.svelte    # Gallery of submissions
│   └── submission/+page.svelte # Submission form
static/                   # Served as-is (robots.txt)
svelte.config.js          # SvelteKit config (node adapter, relative: false)
```

## Essential Commands

```sh
npm install          # Install dependencies
npm run dev          # Dev server (Vite)
npm run build        # Production build (static output to build/)
npm run preview      # Preview production build locally
npm run check        # Type-check with svelte-check
npm run check:watch  # Type-check in watch mode
npx prettier --check .          # Check formatting
npx prettier --write .          # Fix formatting
```

## Reference

- **No base path**: `svelte.config.js` sets `paths.relative: false` but no `base` path. Do not use `$app/paths` base prefixes.
- **Svelte 5 runes**: All components use runes mode (`$state`, `$derived`, `$effect`). Do not use legacy Svelte 4 reactive syntax (`$:`, `export let`).
- **Mostly prerendered**: `+layout.ts` sets `export const prerender = true`. The `api/subscribe` route is server-side only and not prerendered.
- **Airtable integration**: The subscribe API requires env vars `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, and `AIRTABLE_TABLE_NAME` (see `.env.example`).
- **canvas-confetti**: Used as a runtime dependency for confetti animations.

## Patterns

- **Styling**: Uses a neobrutalist design system with hard shadows, bold borders, and uppercase headlines. Tailwind utility classes inline; custom CSS classes like `hard-shadow` and `active-press` are defined in `layout.css`.
- **Navigation**: Active route detection via `$app/state` (`page.url.pathname`).
- **Images**: Project images are external URLs (Printables, Thangs CDN). No local image pipeline.

## Code Style

- Tabs for indentation, single quotes, no trailing commas (see `.prettierrc`).
- `printWidth: 100`.
- Svelte files use the `svelte` Prettier parser.

## Commit & Pull Request Guidelines

1. Run `npm run check` and fix any type errors before committing.
2. Run `npx prettier --check .` and fix formatting issues.
3. Run `npm run build` to verify the build succeeds.
4. Commit messages: `type: message` (e.g., `fix: correct base path on gallery link`).
5. PR descriptions should summarize what changed and why.
