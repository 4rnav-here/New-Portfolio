/**
 * Minimal in-memory rate limiter, used to keep /api/chat from being hammered
 * (it costs real API quota on every call).
 *
 * CAVEAT — read before relying on this for anything serious: Vercel
 * Serverless Functions are stateless and can run on several instances in
 * parallel, and an idle instance eventually gets recycled. This Map only
 * lives as long as one warm instance, so a determined abuser spread across
 * instances could exceed the limit. It's a "stop accidental loops and
 * casual abuse" guard, not a hardened defense. For a limit shared across
 * every instance, swap this for `@upstash/ratelimit` backed by Upstash
 * Redis (free tier, a few lines to wire up) — noted in CHATBOT.md.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 20;

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();

  // Opportunistic cleanup so `buckets` doesn't grow forever on a long-lived
  // warm instance — cheap enough to run on a small fraction of requests.
  if (Math.random() < 0.02) sweepExpired(now);

  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

function sweepExpired(now: number) {
  for (const [key, bucket] of buckets) {
    if (now > bucket.resetAt) buckets.delete(key);
  }
}
