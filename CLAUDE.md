# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start the dev server (Turbopack). If port 3000 is already taken by another running instance, Next.js will pick the next free port (e.g. 3001) rather than fail — check terminal output for the actual URL before assuming a port.
- `npm run build` — production build.
- `npm run start` — serve the production build.
- `npm run lint` — ESLint (flat config: `eslint-config-next` core-web-vitals + typescript rules).
- `npx tsc --noEmit` — typecheck only (no `typecheck` script defined).

No test runner is configured in this project.

## Architecture

This is a personal portfolio built as a **fake VS Code IDE** — the entire UI chrome (title bar, activity bar, file-explorer sidebar, tab bar, breadcrumb, status bar, minimap) is custom-built to look like an editor, and each real route masquerades as a "file" being viewed.

### The "file" convention

Every page in `src/app/` corresponds to a fake filename shown in the IDE chrome, defined centrally in `src/lib/tabs.ts` (`ALL_TABS`): e.g. the home route (`/`) is `home.tsx`, `/about` is `about.md`, `/skills` is `toolkit.jsx`, `/experience` is `experience.ts`, `/chat` is `chat.tsx`. Adding a real route means updating several UI registries in lockstep, all keyed off this same tab id/path:

- `src/lib/tabs.ts` — the tab definition itself (id, label, path, icon).
- `src/components/ide/Sidebar.tsx` — file-explorer tree entry.
- `src/components/ide/BreadcrumbBar.tsx` — breadcrumb path.
- `src/components/ide/StatusBar.tsx` — fake "file type" indicator per route.

Tab open/close/active state is managed by `src/lib/TabContext.tsx` + `src/lib/tabs.ts`'s `tabReducer` (a `useReducer` state machine), persisted to `sessionStorage`, and synced to the real Next.js route via `usePathname()`. Closing a tab does not navigate away by itself — it's purely cosmetic IDE-tab state layered on top of real routing.

### Page → Section pattern

Route files under `src/app/*/page.tsx` are thin server components that just fetch data and render a matching `*Section` component from `src/components/sections/`:

```tsx
export default async function AboutPage() {
  const data = await getPortfolioData();
  return <AboutSection data={data} />;
}
```

All content-bearing sections take the same `PortfolioData` shape.

### Content is one Markdown file

`content/info.md` is the single source of truth for all resume/portfolio content (name, tagline, bio, roles, stats, socials, projects, skills, experience) as YAML frontmatter, with a Markdown body for the About prose. `src/lib/parseInfo.ts`'s `getPortfolioData()` reads and parses it (via `gray-matter` + `remark`) into the `PortfolioData` interface consumed by every page and by the chat feature's system prompt. Editing portfolio content means editing this one file — no code changes needed for content updates.

### Theme system

Five named themes (`midnight-void` default dark, `catppuccin-mocha`, `catppuccin-latte`, `matcha-earthy`, `matcha-parchment`) are implemented as CSS custom-property blocks in `src/app/globals.css`, selected via `data-theme` on `<html>`. `midnight-void` is paired with bare `:root` as the fallback and must stay physically first in the file so cascade order lets later theme blocks win. Theme choice is read from `localStorage` (`portfolio-theme` key) and applied via an inline blocking script in `src/app/layout.tsx`'s `<head>` before paint, to avoid a flash of the wrong theme; `ThemeToggle.tsx` handles runtime switching.

### Fonts

`src/lib/fonts.ts` defines two `next/font/google` fonts exposed as CSS variables: `mono` (JetBrains Mono, `--font-mono`, used for nearly all UI text via `font-mono` on `<body>`) and `display` (Syne, `--font-display`, for large headings). Both use `display: 'block'` rather than the default `swap`.

### Chat feature ("Chat with Me")

An AI copilot at `/chat` that answers visitor questions about Arnav, grounded in `content/info.md`. Full implementation writeup, including design rationale and revision history, lives in `CHATBOT.md` — read it before touching any chat-related file. Summary:

- `src/app/api/chat/route.ts` — Node.js (not Edge — needs `fs` for `getPortfolioData()`) Route Handler. Rate-limits by IP, trims history to the last 12 messages, builds/caches the system prompt, calls Groq (`llama-3.1-8b-instant`) via the Vercel AI SDK's `streamText`, and streams the response back with `toUIMessageStreamResponse()`.
- `src/lib/chatPersona.ts` — `buildSystemPrompt(data)` turns `PortfolioData` into the system prompt (persona/tone + facts + boundaries). This is the file to edit to change ArnavBot's personality; keep tone changes isolated to the `PERSONA` constant so facts/boundaries stay untouched.
- `src/lib/rateLimit.ts` — in-memory per-IP rate limiter (20 req / 10 min window). Explicitly best-effort: state doesn't survive across serverless instances/cold starts. Documented upgrade path if ever needed is Upstash Redis.
- `src/components/sections/ChatSection.tsx` — client component using `@ai-sdk/react`'s `useChat()` for the streaming UI state machine.
- Requires `GROQ_API_KEY` in `.env`/`.env.local` (see `.env.example`); read only server-side inside `route.ts`, never sent to the client.
- New chat-related routes/files must still be wired into the tab conventions above (`tabs.ts`, `Sidebar.tsx`, `BreadcrumbBar.tsx`, `StatusBar.tsx`) to match the existing pattern.

### Path alias

`@/*` maps to `src/*` (see `tsconfig.json`).
