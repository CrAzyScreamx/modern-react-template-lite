# Containerize, redesign layout, add GHCR workflow

## Overview

Add Tailwind CSS v4 to the project, replace the bare "Hello World" with a full app-shell layout (navbar, sidebar, main content area, footer), create a multi-stage Dockerfile that builds the Vite app and serves it with nginx, and add a GitHub Actions workflow that publishes the Docker image to GHCR on every push to `main`. The `vite.config.ts` base path will also be updated since the app will now be served from a container at `/` rather than a GitHub Pages subdirectory.

## Files to touch

- **package.json** — add `tailwindcss` and `@tailwindcss/vite` as dev dependencies
- **vite.config.ts** — register the Tailwind Vite plugin; change production `base` to `"/"`
- **src/index.css** *(new)* — Tailwind entrypoint (`@import "tailwindcss"`)
- **src/main.tsx** — import `./index.css`
- **src/App.tsx** — replace with the app-shell layout (Navbar, Sidebar, MainContent, Footer)
- **src/components/Navbar.tsx** *(new)* — top navigation bar with logo area and nav links
- **src/components/Sidebar.tsx** *(new)* — collapsible sidebar with placeholder menu items using lucide-react icons
- **src/components/MainContent.tsx** *(new)* — main content area with welcome/dashboard placeholder cards
- **src/components/Footer.tsx** *(new)* — simple footer with copyright
- **src/App.test.tsx** — update to match the new rendered output
- **Dockerfile** *(new)* — multi-stage build (node + nginx)
- **.dockerignore** *(new)* — exclude node_modules, .git, dist, etc.
- **.github/workflows/ghcr-publish.yml** *(new)* — build and push to GHCR
- **nginx.conf** *(new)* — custom nginx config for SPA serving

## Implementation steps

### Phase 1 — Tailwind CSS setup

1. Install `tailwindcss` and `@tailwindcss/vite` as dev dependencies via `npm install -D`.
2. In `vite.config.ts`, import `tailwindcss` from `@tailwindcss/vite` and add it to the `plugins` array. Change the production `base` from `'/modern-react-template-lite/'` to `'/'`.
3. Create `src/index.css` containing only `@import "tailwindcss";`.
4. In `src/main.tsx`, add `import './index.css';` before the App import.

### Phase 2 — App-shell layout components

5. Create `src/components/Navbar.tsx` — a horizontal top bar with a logo/app-name on the left and placeholder nav links (Home, Settings, About) on the right. Use lucide-react icons (e.g. `Home`, `Settings`, `Info`). Style with Tailwind utilities: fixed top, dark background (`bg-gray-900`), white text, flex layout, h-16.
6. Create `src/components/Sidebar.tsx` — a vertical sidebar on the left beneath the navbar. Include 4-5 placeholder menu items with lucide-react icons (e.g. `LayoutDashboard`, `FileText`, `Users`, `BarChart3`, `Settings`). Style: fixed left, `w-64`, `bg-gray-800`, text-gray-300, full remaining height. Active item gets a highlight.
7. Create `src/components/MainContent.tsx` — the main content area offset by the sidebar and navbar. Show a heading ("Dashboard") and 3-4 placeholder stat/info cards in a responsive grid. Cards should have subtle borders/shadows and rounded corners.
8. Create `src/components/Footer.tsx` — a simple footer pinned to the bottom of the content area with a copyright line and the current year.
9. Rewrite `src/App.tsx` to compose Navbar, Sidebar, a main wrapper (containing MainContent and Footer). The layout should use a flex column for the full viewport, with the sidebar and content area in a flex row.

### Phase 3 — Update tests

10. Update `src/App.test.tsx` to verify the new layout renders without crashing. Assert that key elements are present (e.g. the navbar text, the "Dashboard" heading).

### Phase 4 — Docker and nginx

11. Create `nginx.conf` with: listen on port 80, serve from `/usr/share/nginx/html`, `try_files $uri $uri/ /index.html` for SPA routing, gzip enabled for JS/CSS/HTML/SVG.
12. Create `Dockerfile` with two stages. Stage 1 ("build"): `node:22-alpine`, set workdir, copy `package.json` and `package-lock.json`, run `npm ci`, copy the rest, run `npm run build`. Stage 2: `nginx:stable-alpine`, copy the custom `nginx.conf` to `/etc/nginx/conf.d/default.conf`, copy build output from stage 1 (`/app/dist`) to `/usr/share/nginx/html`, expose port 80, use default nginx CMD.
13. Create `.dockerignore` excluding `node_modules`, `.git`, `dist`, `*.md`, `.env*`, `.husky`.

### Phase 5 — GHCR publish workflow

14. Create `.github/workflows/ghcr-publish.yml`. Trigger on push to `main`. Jobs: single `build-and-push` job on `ubuntu-latest`. Steps: checkout, log in to `ghcr.io` using `GITHUB_TOKEN`, set up Docker Buildx, build and push with tag `ghcr.io/crazyscreamx/modern-react-template-lite:latest` and a SHA-tagged version. Use `docker/build-push-action@v6`.

## FE/BE split

**Frontend worker**: all files (no backend in this project).
**Backend worker**: none.
