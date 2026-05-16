import type { PortfolioData } from '@/lib/parseInfo';

export function ExperienceSection({ data }: { data: PortfolioData }) {
  return (
    <div className="line-numbers animate-fade-in max-w-3xl">
      {/* File header */}
      <div className="line">
        <span className="syntax-comment">{'/* experience.ts — Journey & Growth */'}</span>
      </div>
      <div className="line">&nbsp;</div>

      <div className="line">
        <span className="syntax-keyword">interface</span>{' '}
        <span className="syntax-type">Experience</span>{' '}
        <span className="syntax-operator">{'{'}</span>
      </div>
      <div className="line pl-4">
        <span className="syntax-function">role</span>
        <span className="syntax-operator">:</span>{' '}
        <span className="syntax-type">string</span>
        <span className="syntax-operator">;</span>
      </div>
      <div className="line pl-4">
        <span className="syntax-function">company</span>
        <span className="syntax-operator">:</span>{' '}
        <span className="syntax-type">string</span>
        <span className="syntax-operator">;</span>
      </div>
      <div className="line pl-4">
        <span className="syntax-function">period</span>
        <span className="syntax-operator">:</span>{' '}
        <span className="syntax-type">string</span>
        <span className="syntax-operator">;</span>
      </div>
      <div className="line">
        <span className="syntax-operator">{'}'}</span>
      </div>
      <div className="line">&nbsp;</div>

      <div className="line">
        <span className="syntax-keyword">const</span>{' '}
        <span className="syntax-function">timeline</span>
        <span className="syntax-operator">:</span>{' '}
        <span className="syntax-type">Experience[]</span>{' '}
        <span className="syntax-operator">=</span>{' '}
        <span className="syntax-operator">[</span>
      </div>
      <div className="line">&nbsp;</div>

      {/* Timeline */}
      <div className="pl-4 py-2 space-y-0">
        {data.experience.map((exp, i) => (
          <div key={i} className="flex gap-4 group">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full border-2 border-bg-editor shrink-0 mt-1 group-hover:scale-125 transition-transform" style={{ background: 'var(--accent-primary)' }} />
              {i < data.experience.length - 1 && (
                <div className="w-px flex-1 bg-border min-h-[40px]" />
              )}
            </div>

            {/* Content */}
            <div className="pb-6 -mt-0.5">
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <span className="text-sm font-mono font-bold text-text-primary">
                  {exp.role}
                </span>
                <span className="text-xs font-mono text-accent-cyan">
                  @ {exp.company}
                </span>
              </div>
              <span className="text-[10px] font-mono text-text-muted tracking-wider uppercase">
                {exp.period}
              </span>
              <ul className="mt-2 space-y-1">
                {exp.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    className="text-xs text-text-muted leading-relaxed flex gap-2"
                  >
                    <span className="shrink-0" style={{ color: 'var(--accent-primary)' }}>•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="line">
        <span className="syntax-operator">];</span>
      </div>
    </div>
  );
}
