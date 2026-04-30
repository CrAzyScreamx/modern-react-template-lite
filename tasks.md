# Plan

## Description

Add a dark/light mode toggle to the top navbar. Backed by a typed `ThemeContext` with localStorage persistence (`theme-pref` key) and `prefers-color-scheme` fallback. Colors driven by a `[data-theme]` CSS attribute on `<html>` plus MUI's dynamic `ThemeProvider`. Toggle is fully keyboard-accessible with `aria-pressed` and `aria-label`. No flash on load — initial state read synchronously via lazy `useState` initializer, no `useEffect` race.

## Flow

1. `src/context/ThemeContext.tsx` (new) — `ThemeContextProvider` + `useColorTheme` hook
2. `src/lib/theme.ts` — change static export to `createAppTheme(mode: 'light' | 'dark')` factory
3. `src/main.tsx` — replace static MUI `ThemeProvider` with `ThemeContextProvider` (which internally provides MUI theme + sets `[data-theme]` on `<html>`)
4. `src/components/Navbar.tsx` — add `DarkModeToggle` button consuming the context
5. `src/index.css` — add `[data-theme="light"]` and `[data-theme="dark"]` CSS variable blocks
6. `src/test/useColorTheme.test.tsx` (new) — Vitest + RTL unit tests for the hook

## Frontend touches

- All 6 files above are `src/**/*.tsx` / `src/**/*.ts` / `src/**/*.css` — frontend only.

## Backend touches

None.

## Disadvantages

- Hook named `useColorTheme` to avoid collision with MUI's `useTheme` — consumers need a different import.
- Two theme layers (MUI ThemeProvider + `[data-theme]` CSS) must stay in sync; the provider owns both writes.

## Key Points

- **No flash / no race:** `useState(() => readInitialTheme())` reads localStorage synchronously in the initializer; no `useEffect` needed for initial hydration.
- **No inline handlers:** `toggleTheme` wrapped in `useCallback`.
- **Strict types:** context value typed as `{ mode: 'light' | 'dark'; toggleTheme: () => void }` — no `any`.
- **`[data-theme]` sync:** `document.documentElement.setAttribute('data-theme', mode)` called inside `ThemeContextProvider` on every mode change, in the same render cycle as state update (via `useLayoutEffect` to avoid flash).
- **MUI integration:** `createAppTheme(mode)` called with current mode; result memoized with `useMemo` so MUI theme object is stable.
- **Accessibility:** toggle button has `aria-pressed={mode === 'dark'}`, `aria-label="Toggle dark mode"`, visible `:focus-visible` ring.
- No new npm packages.

## Areas:

- frontend

## Files to touch

- **`src/context/ThemeContext.tsx`** *(new)* — context type, provider, `useColorTheme` hook
- **`src/lib/theme.ts`** — refactor to `createAppTheme(mode)` factory; remove static singleton export
- **`src/main.tsx`** — import `ThemeContextProvider`, remove direct MUI `ThemeProvider` + `theme` import
- **`src/components/Navbar.tsx`** — add `DarkModeToggle` `IconButton` (Moon/Sun icon from lucide-react) consuming `useColorTheme`
- **`src/index.css`** — append `[data-theme="dark"]` and `[data-theme="light"]` blocks with CSS custom properties
- **`src/test/useColorTheme.test.tsx`** *(new)* — tests: reads localStorage, falls back to media query, toggles mode, persists to localStorage

## Preview pages

- `/` (capture: dark-default)
- `/ — find aria-label "Toggle dark mode" click; wait 300 (capture: light-toggled)`
