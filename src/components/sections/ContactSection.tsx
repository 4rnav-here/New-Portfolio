'use client';

import { useState } from 'react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { Mail, Copy, Check } from 'lucide-react';
import type { PortfolioData } from '@/lib/parseInfo';

export function ContactSection({ data }: { data: PortfolioData }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(data.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="line-numbers animate-fade-in max-w-2xl">
      {/* File header */}
      <div className="line">
        <span className="syntax-comment">{'/* contact.jsx — Let\'s Connect */'}</span>
      </div>
      <div className="line">&nbsp;</div>

      <div className="line">
        <span className="syntax-keyword">export</span>{' '}
        <span className="syntax-keyword">default</span>{' '}
        <span className="syntax-keyword">function</span>{' '}
        <span className="syntax-function">Contact</span>
        <span className="syntax-operator">() {'{'}</span>
      </div>
      <div className="line">&nbsp;</div>

      {/* Content */}
      <div className="line pl-4">
        <span className="syntax-keyword">return</span>{' '}
        <span className="syntax-operator">(</span>
      </div>
      <div className="line">&nbsp;</div>

      <div className="pl-8 py-4 space-y-6">
        {/* Heading */}
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-text-primary mb-2">
            Let&apos;s build something
            <span className="text-accent-pink">.</span>
          </h2>
          <p className="text-sm text-text-muted font-mono leading-relaxed">
            Have an idea, a project, or just want to say hello? <br />
            I&apos;m always open to interesting conversations and collaborations.
          </p>
        </div>

        {/* Email copy */}
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-bg-tab border border-border rounded-sm px-4 py-2.5 font-mono text-sm text-text-primary">
            {data.socials.email}
          </div>
          <button
            onClick={copyEmail}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-accent-pink text-white text-xs font-mono rounded-sm hover:brightness-110 transition-all cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check size={14} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy
              </>
            )}
          </button>
        </div>

        {/* Social links */}
        <div className="flex gap-3">
          <a
            href={data.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-sm text-xs font-mono text-text-muted hover:text-text-primary hover:border-accent-cyan hover:bg-bg-tab transition-all"
          >
            <GithubIcon size={14} />
            GitHub
          </a>
          <a
            href={data.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-sm text-xs font-mono text-text-muted hover:text-text-primary hover:border-accent-cyan hover:bg-bg-tab transition-all"
          >
            <LinkedinIcon size={14} />
            LinkedIn
          </a>
          <a
            href={`mailto:${data.socials.email}`}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-sm text-xs font-mono text-text-muted hover:text-text-primary hover:border-accent-cyan hover:bg-bg-tab transition-all"
          >
            <Mail size={14} />
            Email
          </a>
        </div>
      </div>

      <div className="line">&nbsp;</div>
      <div className="line pl-4">
        <span className="syntax-operator">)</span>
        <span className="syntax-operator">;</span>
      </div>
      <div className="line">
        <span className="syntax-operator">{'}'}</span>
      </div>
    </div>
  );
}
