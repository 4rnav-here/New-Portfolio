import { groq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { getPortfolioData } from '@/lib/parseInfo';
import { buildSystemPrompt } from '@/lib/chatPersona';
import { checkRateLimit } from '@/lib/rateLimit';

/**
 * Route Handler for the chat feature — receives the running conversation
 * from the client, adds Arnav's resume data as a system prompt, and streams
 * the model's reply back token-by-token.
 *
 * Runtime note: this deliberately does NOT set `export const runtime =
 * 'edge'`. getPortfolioData() reads content/info.md off disk with Node's
 * `fs` module, which the Edge runtime doesn't support. Groq's own inference
 * is fast enough that the couple hundred ms difference between a Node
 * serverless function and an Edge function is not the bottleneck here — so
 * we keep the Node runtime (Next's default) rather than fight it.
 */

export const maxDuration = 30; // seconds a single request may stream for

// The system prompt is rebuilt from content/info.md on first use per warm
// instance, then cached in memory — avoids re-reading the file on every
// single chat message while a function instance stays warm.
let cachedSystemPrompt: string | null = null;

async function getSystemPrompt(): Promise<string> {
  if (cachedSystemPrompt) return cachedSystemPrompt;
  const data = await getPortfolioData();
  cachedSystemPrompt = buildSystemPrompt(data);
  return cachedSystemPrompt;
}

const MAX_MESSAGE_LENGTH = 2000; // guard against absurdly long/expensive prompts
const MAX_HISTORY_MESSAGES = 12; // how much prior conversation we forward to the model

export async function POST(req: Request) {
  // Best-effort caller identity for rate limiting. `x-forwarded-for` is set
  // by Vercel's proxy; if it's ever missing everyone shares one bucket,
  // which just makes the limiter stricter, not broken.
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';

  const { allowed, retryAfterSeconds } = checkRateLimit(ip);
  if (!allowed) {
    return new Response(
      JSON.stringify({
        error: `Okay that's a lot of questions. Give it ${retryAfterSeconds}s and try again.`,
      }),
      { status: 429, headers: { 'Content-Type': 'application/json' } },
    );
  }

  let messages: UIMessage[];
  try {
    ({ messages } = await req.json());
  } catch {
    return new Response(JSON.stringify({ error: 'Malformed request.' }), { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'No messages provided.' }), { status: 400 });
  }

  const lastMessage = messages[messages.length - 1];
  const lastMessageText = lastMessage.parts
    ?.map((p) => (p.type === 'text' ? p.text : ''))
    .join('') ?? '';

  if (lastMessageText.length > MAX_MESSAGE_LENGTH) {
    return new Response(
      JSON.stringify({ error: "That's a novel, not a question. Try something shorter." }),
      { status: 400 },
    );
  }

  const recentMessages = messages.slice(-MAX_HISTORY_MESSAGES);
  const [system, modelMessages] = await Promise.all([
    getSystemPrompt(),
    convertToModelMessages(recentMessages),
  ]);

  const result = streamText({
    model: groq('llama-3.1-8b-instant'),
    system,
    messages: modelMessages,
    temperature: 0.6, // enough range to not sound robotic, low enough to stay mostly straightforward
    maxOutputTokens: 400,
  });

  return result.toUIMessageStreamResponse();
}
