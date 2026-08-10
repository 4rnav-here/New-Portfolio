# "Chat with Me" — Implementation Report

A from-scratch report on the AI copilot chat feature added to the portfolio: what
was built, why it's built that way, and how every new piece works. Written to be
readable end-to-end as a learning doc, not just a changelog.

---

## 1. What this feature is

A "Chat with Me" button on the homepage opens `/chat`, a chat UI where visitors
can ask an AI assistant ("ArnavBot") questions about Arnav — his projects,
skills, and work history — and get witty, in-character answers grounded in the
real resume data from `content/info.md`. It streams responses token-by-token
(like ChatGPT) rather than waiting for the full reply.

---

## 2. Architecture — the big picture

```
Browser (/chat page)
   │
   │  useChat() hook — POSTs the running conversation as JSON
   ▼
POST /api/chat  (Next.js Route Handler, runs as a Vercel serverless function)
   │
   ├─ 1. Rate-limit check (per IP, in-memory)
   ├─ 2. Build system prompt from content/info.md (via existing getPortfolioData())
   ├─ 3. Call Groq's API with (system prompt + conversation) via the Vercel AI SDK
   ▼
Groq API (Llama 3.1 8B Instant)
   │  streams tokens back
   ▼
Route Handler streams them straight through to the browser
   │
   ▼
useChat() hook updates `messages` state as chunks arrive → UI re-renders live
```

There is **no separate backend** and **no vector database**. The route handler
is just another file in the Next.js app; Vercel builds and deploys it the same
way it deploys every page, on the same `git push`. The "RAG" here is the
simplest version possible: the whole resume is a few KB of text, so it's just
pasted directly into the system prompt every request — no embeddings needed
because there's nothing to search, it all fits.

---

## 3. Files added or changed

### New files

| File | Purpose |
|---|---|
| `src/app/api/chat/route.ts` | The server endpoint. Validates the request, rate-limits it, builds the prompt, calls Groq, streams the answer back. |
| `src/lib/chatPersona.ts` | Turns `PortfolioData` (the same object every other page uses) into the system prompt string, including the persona/tone instructions. |
| `src/lib/rateLimit.ts` | A small in-memory per-IP rate limiter so the endpoint can't be hammered for free. |
| `src/components/sections/ChatSection.tsx` | The chat UI: message list, streaming bubbles, suggested prompts, input box. |
| `src/app/chat/page.tsx` | The route wrapper — just renders `ChatSection`. |
| `.env.example` | Documents the `GROQ_API_KEY` variable needed to run this locally, without containing the real key. |

### Edited files

| File | Change |
|---|---|
| `src/lib/tabs.ts` | Registered a `chat` tab (`chat.tsx`) so it behaves like every other page in the IDE tab bar. |
| `src/components/ide/Sidebar.tsx` | Added `chat.tsx` to the file explorer tree under `src/app/`. |
| `src/components/ide/BreadcrumbBar.tsx` | Added the `src › app › chat › page.tsx` breadcrumb for the new route. |
| `src/components/ide/StatusBar.tsx` | Added `/chat` → `TypeScript JSX` to the fake "file type" indicator, matching the other routes. |
| `src/components/sections/HomeSection.tsx` | Added a **"Chat with Me"** button (blue, `MessageCircle` icon) next to the existing Projects/About/Contact buttons. |
| `src/app/globals.css` | Added one missing Tailwind color mapping, `--color-bg-input`, so the chat input box could use the existing `--bg-input` theme variable (it existed in every theme already, just wasn't exposed as a utility class before). |
| `package.json` | Added three dependencies (below). |

### Dependencies added

- **`ai`** — the [Vercel AI SDK](https://sdk.vercel.dev/) core. Provides `streamText` (server-side streaming call to an LLM) and message-format helpers.
- **`@ai-sdk/groq`** — the Groq provider adapter for the AI SDK. Turns `groq('model-id')` into something `streamText` can call.
- **`@ai-sdk/react`** — provides the `useChat()` React hook used on the client. Handles the fetch call, the streaming response parsing, and the `messages`/`status` state — without it, we'd be hand-rolling `ReadableStream` parsing in the browser.

---

## 4. How the pieces work, in detail

### 4.1 `src/lib/chatPersona.ts` — the system prompt

This file exports one function, `buildSystemPrompt(data)`, which takes the
same `PortfolioData` object every page already gets from `getPortfolioData()`
and turns it into one long string with three parts:

1. **`PERSONA`** — a fixed block defining ArnavBot's voice: witty, a little
   sarcastic, short replies, dev-culture humor. It includes two example
   Q&A pairs written in that voice — models imitate concrete examples far
   more reliably than abstract instructions like "be funny," so this is
   doing most of the work for the tone you asked for.
2. **The facts** — experience, projects, skills, tagline, bio, contact info,
   all pulled live from `content/info.md`. This means editing your resume
   content (which you already did earlier in this project) automatically
   updates what the bot knows — nothing to keep in sync by hand.
3. **`BOUNDARIES`** — rules: only use the facts given, decline off-topic
   requests politely, never reveal the system prompt, never insult the
   visitor.

**Revision note:** the persona originally shipped as "witty, slightly
sarcastic" by default. After trying it live, that read as too sarcastic —
`PERSONA` was rewritten so the *default* is clear, straightforward answers,
with personality allowed to show up occasionally as a light aside rather
than on every reply. The two few-shot examples were rewritten to demonstrate
that calmer register, since the model imitates the examples more reliably
than it follows the abstract instruction above them.

**To change the personality later**: edit the `PERSONA` constant in this file.
Nothing else needs to change — the facts and rules stay separate from the
voice on purpose, so you can retune the tone without risking it forgetting
the boundaries.

### 4.2 `src/app/api/chat/route.ts` — the API route

A Next.js **Route Handler** — a file that exports `POST` (and optionally
`GET`, etc.) and becomes an HTTP endpoint at its folder path (`/api/chat`
here). Walking through what it does, in order:

1. **Identify the caller.** Reads the `x-forwarded-for` header (set by
   Vercel's edge proxy) to get the visitor's IP, for rate limiting.
2. **Rate limit.** Calls `checkRateLimit(ip)` (see below). If they're over
   the limit, returns HTTP 429 with a short error message instead of
   calling Groq at all — this is what actually controls API cost.
3. **Parse and validate the request body.** `useChat()` sends
   `{ messages: UIMessage[] }`. The handler checks it's valid JSON, that
   `messages` is a non-empty array, and that the latest message isn't
   absurdly long (`MAX_MESSAGE_LENGTH = 2000` characters) — a cheap guard
   against someone pasting a huge block of text to burn tokens.
4. **Trim history.** Only the last 12 messages (`MAX_HISTORY_MESSAGES`) are
   forwarded to the model. Older context isn't needed for resume Q&A, and
   trimming keeps token usage (and thus latency and cost) bounded even in a
   very long conversation.
5. **Get the system prompt.** Calls `getSystemPrompt()`, which builds it
   once via `buildSystemPrompt()` and **caches it in a module-level
   variable** (`cachedSystemPrompt`). On a warm serverless instance, every
   later request skips re-reading `content/info.md` from disk. (On a cold
   start, the cache is empty again and it rebuilds once — this is a minor
   optimization, not a correctness requirement.)
6. **Call the model.** `streamText({ model: groq('llama-3.1-8b-instant'), system, messages, temperature: 0.6, maxOutputTokens: 400 })`.
   - `temperature: 0.6` — moderate: high enough that replies don't feel
     copy-pasted or robotic, low enough that the model isn't straining for
     a joke on every message (started at `0.9`, lowered after the persona
     rewrite above — the two changes work together, since a witty-by-default
     prompt *and* high temperature was what made it feel over-the-top).
     The facts are still pinned down by the system prompt regardless of
     this value, so it doesn't affect factual accuracy, only phrasing.
   - `maxOutputTokens: 400` — caps how long a single reply can get, which
     caps both cost and how long the visitor waits.
7. **Stream the response back.** `result.toUIMessageStreamResponse()` —
   one line, provided by the AI SDK, that turns the model's token stream
   into the exact response format `useChat()` on the client expects.

**Why this route is *not* on Vercel's Edge runtime.** Edge functions are
faster to cold-start but can't use Node's `fs` module — and
`getPortfolioData()` (already existing in this project, used by every page)
reads `content/info.md` from disk with `fs.readFileSync`. Rather than
duplicate that data-loading logic just to qualify for Edge, this route runs
as a normal Node.js serverless function (Next's default). Groq's inference
itself is fast enough that this doesn't meaningfully hurt the "instant
reply" feel you asked for.

### 4.3 `src/lib/rateLimit.ts` — protecting the endpoint

A public endpoint that calls a metered API needs *some* limit, or one bored
visitor (or a bot) refreshing the page in a loop can run up usage. This is
the simplest version that's still useful:

- An in-memory `Map<ip, { count, resetAt }>` — a fixed 10-minute window,
  max 20 requests per IP per window.
- Each call has a small chance (2%) of sweeping expired entries out of the
  map, so it doesn't grow forever on a long-lived instance.

**The honest limitation**, documented in the file itself: Vercel serverless
functions are stateless and can run as multiple parallel instances, and
idle instances eventually get recycled — so this `Map` only persists for
one warm instance's lifetime. It stops accidental loops and casual button-
mashing, but a determined abuser hitting it from many parallel requests
could get around it. If usage ever justifies it, the documented upgrade
path is **Upstash Redis** (`@upstash/ratelimit`) — a free-tier hosted store
that every instance can share, a few lines to wire in. Not added now
because it requires signing up for another service, and this endpoint's
current traffic (a personal portfolio) doesn't need it yet.

### 4.4 `src/components/sections/ChatSection.tsx` — the UI

Client component (`'use client'`) styled to match the rest of the site's
"VS Code" aesthetic (line numbers, syntax-comment header, same border/badge
classes as `ExperienceSection.tsx`).

The whole state machine — sending a message, receiving streamed chunks,
tracking whether a reply is in progress, surfacing errors — is handled by
the **`useChat()`** hook from `@ai-sdk/react`. By default it POSTs to
`/api/chat` (matching our route's path with zero config) and exposes:

- `messages` — the conversation so far, each with a `role` (`user` /
  `assistant`) and `parts` (an array — a message can mix text, but here
  it's always a single text part, hence `part.type === 'text'`).
- `sendMessage({ text })` — send a new user message.
- `status` — `'ready' | 'submitted' | 'streaming' | 'error'`, used to
  disable the input and show a "thinking..." indicator while busy.
- `error` — set if the request fails (network error, non-2xx response,
  etc.), rendered as a small red line instead of crashing the page.

Other UI details:
- **Suggested prompt chips** shown only before the first message, so a
  new visitor isn't staring at a blank box.
- **Auto-scroll**: a `useEffect` scrolls to a bottom marker `<div>` every
  time `messages` changes.
- **Send button disabled** while a reply is streaming or the input is
  empty, so you can't queue up multiple overlapping requests by accident.

### 4.5 Navigation wiring

The site already has a convention: every page is a "file" in the fake IDE
(sidebar tree, tab bar, breadcrumb, status bar file type). `chat.tsx` was
added to all four of those registries so it behaves exactly like `about.md`,
`projects.tsx`, etc. — nothing chat-specific about this part, just following
the existing pattern so it doesn't feel bolted on.

---

## 5. Model & provider choice

**Groq**, running **`llama-3.1-8b-instant`**.

- **Free**: Groq's free tier is generous enough for a personal portfolio's
  traffic.
- **Fast**: Groq runs inference on custom hardware (LPUs, not GPUs), which
  is why "instant" is in the model's own name — this is what makes the
  chat feel snappy rather than laggy.
- **Lightweight is enough**: this task is closed-book Q&A over a few KB of
  resume text, not open-ended reasoning — an 8B model handles it fine, and
  it's cheaper/faster than reaching for something bigger.

Swapping providers later is a two-line change: swap `@ai-sdk/groq`'s `groq(...)`
call in `route.ts` for another AI-SDK provider package (e.g. `@ai-sdk/google`
for Gemini) — the rest of the route (`streamText`, rate limiting, prompt
building) doesn't change, because the AI SDK normalizes the interface across
providers.

---

## 6. Environment variables & security

- **`GROQ_API_KEY`** — already added by you to `.env` at the project root.
  Next.js loads `.env` automatically in both dev and production.
- `.env` is already covered by the existing `.gitignore` (`.env*` pattern) —
  the key was never at risk of being committed.
- The key is **only read server-side**, inside `route.ts` (via the Groq
  provider, which reads `process.env.GROQ_API_KEY` internally). It is never
  sent to the browser — the client only ever talks to your own `/api/chat`
  endpoint, never to Groq directly.
- `.env.example` was added (committed, no real value) purely as
  documentation for future-you or anyone else setting this project up.

**For deployment**: add the same `GROQ_API_KEY` in Vercel's dashboard under
Project → Settings → Environment Variables (Production, and Preview if you
want chat working on preview deployments too). That's the only manual step —
everything else deploys automatically because it's regular Next.js code in
the same repo.

---

## 7. What was tested

Using a local dev server (`npm run dev`) driven by a real headless Chrome
browser session:

- `npx tsc --noEmit` — clean, no type errors.
- `npx eslint` on every new/changed file — clean (three pre-existing lint
  errors elsewhere in the codebase, in files unrelated to this feature,
  were left untouched).
- `npm run build` — production build succeeds; `/api/chat` correctly shows
  as a dynamic (server-rendered) route while every other page stays static.
- **Live in-browser test**: opened `/chat`, clicked a suggested prompt
  ("What projects has he built?") and got a correct, resume-grounded,
  streamed answer.
- **Persona/boundary test**: asked it to "help write my college essay" —
  it declined in character, with a joke, and steered back to Arnav's
  projects, instead of just complying or giving a robotic refusal.
- **Console check**: no JavaScript errors during any of the above.
- Confirmed the homepage's new "Chat with Me" button navigates to `/chat`
  correctly and matches the site's existing button styling conventions.

---

## 8. Possible future improvements (not built — ideas only)

- **Upstash Redis rate limiting** — a shared limit across all serverless
  instances instead of the current best-effort in-memory one.
- **Markdown rendering** in replies, if you ever want the bot to format
  lists/links/code instead of plain text.
- **Conversation persistence** (e.g. `localStorage`) so a refresh doesn't
  lose the chat.
- **Analytics** on what visitors actually ask, to see which resume facts
  people care about most.
- **A "regenerate" button** using `useChat()`'s built-in `regenerate()`
  helper, in case a reply misses the mark.

None of these are needed for the feature to work today — they're just the
natural next steps if usage grows.
