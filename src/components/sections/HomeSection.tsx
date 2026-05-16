'use client';

import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { Mail, FolderOpen, User, Send, Download } from 'lucide-react';
import Link from 'next/link';
import type { PortfolioData } from '@/lib/parseInfo';

export function HomeSection({ data }: { data: PortfolioData }) {
  const firstName = data.name.split(' ')[0];
  const lastName = data.name.split(' ').slice(1).join(' ');

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Arnav Trivedi.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="line-numbers animate-fade-in">
      {/* Comment header */}
      <div className="line">
        <span className="syntax-comment">{'// hello world !! Welcome to my portfolio'}</span>
      </div>
      <div className="line">&nbsp;</div>

      {/* Name */}
      <div className="line">
        <span className="syntax-keyword">const</span>{' '}
        <span className="syntax-function">developer</span>{' '}
        <span className="syntax-operator">=</span>{' '}
        <span className="syntax-string">&quot;{firstName}</span>
      </div>
      <div className="line pl-8">
        <span className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight" style={{ color: 'var(--accent-primary)' }}>
          {lastName}
        </span>
        <span className="syntax-string">&quot;</span>
        <span className="syntax-operator">;</span>
      </div>
      <div className="line">&nbsp;</div>

      {/* Roles */}
      <div className="line">
        <span className="syntax-keyword">const</span>{' '}
        <span className="syntax-function">roles</span>{' '}
        <span className="syntax-operator">=</span>{' '}
        <span className="syntax-operator">[</span>
      </div>
      <div className="line pl-8 flex flex-wrap gap-2 items-center py-2">
        {data.roles.map((role) => (
          <Badge key={role} variant="accent">
            {role}
          </Badge>
        ))}
      </div>
      <div className="line">
        <span className="syntax-operator">];</span>
      </div>
      <div className="line">&nbsp;</div>

      {/* Tagline with typewriter */}
      <div className="line">
        <span className="syntax-comment">{'// '}</span>
        <span className="syntax-comment typewriter">{data.tagline}</span>
      </div>
      <div className="line">&nbsp;</div>

      {/* Bio short */}
      {data.bio_short && (
        <>
          <div className="line">
            <span className="syntax-comment">{'/** bio'}</span>
          </div>
          <div className="line pl-4">
            <span className="syntax-comment">{' * '}</span>
            <span className="text-text-secondary text-xs leading-relaxed">{data.bio_short}</span>
          </div>
          <div className="line">
            <span className="syntax-comment">{' */'}</span>
          </div>
          <div className="line">&nbsp;</div>
        </>
      )}
      <div className="line">&nbsp;</div>

      {/* Navigation buttons */}
      <div className="line">
        <span className="syntax-keyword">export</span>{' '}
        <span className="syntax-keyword">default</span>{' '}
        <span className="syntax-keyword">function</span>{' '}
        <span className="syntax-function">navigate</span>
        <span className="syntax-operator">() {'{'}</span>
      </div>
      <div className="line pl-8 flex flex-wrap gap-3 py-3">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary text-white text-xs font-mono rounded-sm hover:brightness-110 transition-all"
        >
          <FolderOpen size={14} />
          Projects
        </Link>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 px-4 py-2 border border-border text-text-primary text-xs font-mono rounded-sm hover:bg-bg-hover transition-colors"
        >
          <User size={14} />
          About Me
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-4 py-2 border border-border text-text-primary text-xs font-mono rounded-sm hover:bg-bg-hover transition-colors"
        >
          <Send size={14} />
          Contact
        </Link>
        <button
          onClick={handleResumeDownload}
          className="inline-flex items-center gap-2 px-4 py-2 border border-[#ef4444]/40 text-[#ef4444] text-xs font-mono rounded-sm hover:bg-[#ef4444]/10 hover:border-[#ef4444] transition-all"
        >
          <Download size={14} />
          Resume.pdf
        </button>
      </div>
      <div className="line">
        <span className="syntax-operator">{'}'}</span>
      </div>
      <div className="line">&nbsp;</div>

      {/* Divider */}
      <div className="line">
        <span className="syntax-comment">{'// ─────────────────────────────────────────────────'}</span>
      </div>
      <div className="line">&nbsp;</div>

      {/* Stats */}
      <div className="line">
        <span className="syntax-keyword">const</span>{' '}
        <span className="syntax-function">stats</span>{' '}
        <span className="syntax-operator">=</span>{' '}
        <span className="syntax-operator">{'{'}</span>
      </div>
      <div className="line pl-8 flex flex-wrap gap-3 py-3">
        {data.stats.map((stat) => (
          <StatCard key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
      <div className="line">
        <span className="syntax-operator">{'}'}</span>
        <span className="syntax-operator">;</span>
      </div>
      <div className="line">&nbsp;</div>

      {/* Divider */}
      <div className="line">
        <span className="syntax-comment">{'// ─────────────────────────────────────────────────'}</span>
      </div>
      <div className="line">&nbsp;</div>

      {/* Socials */}
      <div className="line">
        <span className="syntax-keyword">const</span>{' '}
        <span className="syntax-function">socials</span>{' '}
        <span className="syntax-operator">=</span>{' '}
        <span className="syntax-operator">[</span>
      </div>
      <div className="line pl-8 flex flex-wrap gap-3 py-3">
        <a
          href={data.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-text-muted hover:text-text-primary border border-border rounded-sm hover:bg-bg-hover hover:border-accent-secondary transition-all"
        >
          <GithubIcon size={14} />
          GitHub
        </a>
        <a
          href={data.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-text-muted hover:text-text-primary border border-border rounded-sm hover:bg-bg-hover hover:border-accent-secondary transition-all"
        >
          <LinkedinIcon size={14} />
          LinkedIn
        </a>
        <a
          href={`mailto:${data.socials.email}`}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-text-muted hover:text-text-primary border border-border rounded-sm hover:bg-bg-hover hover:border-accent-secondary transition-all"
        >
          <Mail size={14} />
          Email
        </a>
      </div>
      <div className="line">
        <span className="syntax-operator">];</span>
      </div>
    </div>
  );
}
