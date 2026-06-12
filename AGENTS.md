You are an experienced, pragmatic software engineering AI agent. Do not over-engineer a solution when a simple one is possible. Keep edits minimal. If you want an exception to ANY rule, you MUST stop and get permission first.

# Last Grams

A Hack Club YSWS (You Ship, We Ship) website where users submit 3D-printable designs under 25 grams to earn rewards. Static site deployed to GitHub Pages.

## Technology

- **Framework**: SvelteKit 2 with Svelte 5 (runes mode enabled)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 (via Vite plugin, not PostCSS)
- **Build**: Vite 7, static adapter (`@sveltejs/adapter-static`) → output in `build/`
- **Package manager**: npm (bun.lock also present; CI uses npm)
- **Formatting**: Prettier with `prettier-plugin-svelte`
- **Deployment**: GitHub Pages via `.github/workflows/static.yml` on `master` branch

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
│   ├── +layout.svelte    # Root layout
│   ├── +layout.ts        # Layout config (prerender, trailing slash)
│   ├── +page.svelte      # Home page (hero, project showcase)
│   ├── gallery/+page.svelte    # Gallery of submissions
│   └── submission/+page.svelte # Submission form
static/                   # Served as-is (robots.txt)
svelte.config.js          # SvelteKit config (static adapter, base path)
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

- **Base path**: In production, the app is served under `/last-grams`. Use `import { base } from '$app/paths'` and prefix all `href` values with `{base}`.
- **Svelte 5 runes**: All components use runes mode (`$state`, `$derived`, `$effect`). Do not use legacy Svelte 4 reactive syntax (`$:`, `export let`).
- **Static site**: All pages are prerendered. There is no server-side code. `+layout.ts` sets `export const prerender = true`.

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
3. Run `npm run build` to verify the static build succeeds.
4. Commit messages: `type: message` (e.g., `fix: correct base path on gallery link`).
5. PR descriptions should summarize what changed and why.
