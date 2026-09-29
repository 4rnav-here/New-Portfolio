'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef, useState } from 'react';
import { Bot, Loader2, Send, User } from 'lucide-react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

// The model replies in Markdown (bold, lists, occasionally tables). Rendered
// with hand-styled elements since @tailwindcss/typography isn't installed.
const MARKDOWN_COMPONENTS: Components = {
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-bold text-text-primary">{children}</strong>,
  ul: ({ children }) => <ul className="mb-2 last:mb-0 list-disc pl-4 space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="mb-2 last:mb-0 list-decimal pl-4 space-y-1">{children}</ol>,
  a: ({ children, href }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--accent-primary)' }}>
      {children}
    </a>
  ),
  code: ({ children }) => <code className="rounded-sm bg-bg-editor px-1">{children}</code>,
  h1: ({ children }) => <p className="mb-2 font-bold">{children}</p>,
  h2: ({ children }) => <p className="mb-2 font-bold">{children}</p>,
  h3: ({ children }) => <p className="mb-2 font-bold">{children}</p>,
  table: ({ children }) => (
    <div className="mb-2 last:mb-0 overflow-x-auto">
      <table className="border-collapse text-left">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="border border-border px-2 py-1 font-bold">{children}</th>,
  td: ({ children }) => <td className="border border-border px-2 py-1 align-top">{children}</td>,
};

// Shown before the visitor sends their first message — gives them a running
// start instead of a blank input box.
const SUGGESTED_PROMPTS = [
  "What's Arnav working on right now?",
  'What projects has he built?',
  'What are his technical skills?',
  'Is he full-stack or more backend-leaning?',
];

export function ChatSection() {
  // useChat (from @ai-sdk/react) owns the whole conversation: it POSTs to
  // /api/chat by default, reads the streamed response, and keeps
  // `messages`/`status` in sync as tokens arrive — no manual fetch/stream
  // parsing needed here.
  const { messages, sendMessage, status, error } = useChat();
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const isBusy = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isBusy) return;
    sendMessage({ text });
    setInput('');
  };

  const askSuggested = (text: string) => {
    if (isBusy) return;
    sendMessage({ text });
  };

  return (
    <div className="line-numbers animate-fade-in max-w-3xl">
      <div className="line">
        <span className="syntax-comment">{'/* chat.tsx — ask me anything about Arnav */'}</span>
      </div>
      <div className="line">&nbsp;</div>

      <div className="line pl-2 sm:pl-4 py-2">
        <div className="border border-border rounded flex flex-col h-[65vh] bg-bg-editor overflow-hidden">
          {/* header */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-bg-sidebar shrink-0">
            <Bot size={14} style={{ color: 'var(--accent-primary)' }} />
            <span className="text-xs font-mono font-bold text-text-primary">ArnavBot</span>
            <span className="text-[10px] font-mono text-text-muted hidden sm:inline">
              — Llama 3.1 8B via Groq
            </span>
          </div>

          {/* message list */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {messages.length === 0 && (
              <div className="space-y-3 text-xs font-mono text-text-muted">
                <p className="leading-relaxed">
                  Hey — I&apos;m Arnav&apos;s portfolio copilot. Ask about his projects, stack, or
                  work history. I&apos;ll try not to be boring about it.
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => askSuggested(prompt)}
                      className="px-2.5 py-1.5 border border-border rounded-sm text-left hover:border-accent-primary hover:text-text-primary transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <Bot size={16} className="shrink-0 mt-1" style={{ color: 'var(--accent-primary)' }} />
                )}
                <div
                  className={`max-w-[80%] min-w-0 rounded px-3 py-2 text-xs font-mono leading-relaxed ${
                    message.role === 'user'
                      ? 'whitespace-pre-wrap bg-accent-primary text-white'
                      : 'bg-bg-hover text-text-primary'
                  }`}
                >
                  {message.parts.map((part, i) => {
                    if (part.type !== 'text') return null;
                    if (message.role === 'user') return <span key={i}>{part.text}</span>;
                    return (
                      <ReactMarkdown key={i} remarkPlugins={[remarkGfm]} components={MARKDOWN_COMPONENTS}>
                        {part.text}
                      </ReactMarkdown>
                    );
                  })}
                </div>
                {message.role === 'user' && (
                  <User size={16} className="shrink-0 mt-1 text-text-muted" />
                )}
              </div>
            ))}

            {isBusy && (
              <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                <Loader2 size={14} className="animate-spin" />
                thinking of a good comeback...
              </div>
            )}

            {error && (
              <div className="text-xs font-mono text-[#ef4444]">
                {error.message || 'Something broke on my end. Try again in a bit.'}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* composer */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border p-2 shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Arnav's projects, skills, experience..."
              className="flex-1 rounded-sm border border-transparent bg-bg-input px-3 py-2 text-xs font-mono text-text-primary outline-none transition-colors focus:border-accent-primary"
            />
            <button
              type="submit"
              disabled={isBusy || !input.trim()}
              aria-label="Send"
              className="rounded-sm bg-accent-primary p-2 text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
