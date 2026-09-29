# Arnav Trivedi — Portfolio

> Honestly, you shouldn't be reading this. It's a portfolio. The entire point is that you look at it.
> Go see the damn website.

Still here? Fine. It's a personal portfolio built as a fake VS Code IDE, where every page is a "file"
open in the editor, plus an AI chatbot that answers questions about me.

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack) + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, with themes built on CSS custom properties
- **Content:** a single Markdown file (`content/info.md`) parsed with `gray-matter` + `remark`
- **AI chat:** Vercel AI SDK (`ai`, `@ai-sdk/react`) streaming from Groq, with replies rendered by
  `react-markdown` + `remark-gfm`
- **Icons:** `lucide-react`
- **Fonts:** JetBrains Mono + Syne via `next/font`

## Running it locally

```bash
npm install
echo "GROQ_API_KEY=your-key-here" > .env.local   # needed for the chat
npm run dev
```

Then open the URL it prints. Or, again, just look at the website.
