import type { PortfolioData } from '@/lib/parseInfo';

export function AboutSection({ data }: { data: PortfolioData }) {
  return (
    <div className="line-numbers animate-fade-in max-w-3xl">
      {/* File header */}
      <div className="line">
        <span className="syntax-comment">{'/* about.md */'}</span>
      </div>
      <div className="line">
        <span className="syntax-comment">{'// Who I am, what I do, why it matters'}</span>
      </div>
      <div className="line">&nbsp;</div>

      {/* Photo + About content layout */}
      <div className="line">
        <span className="syntax-keyword">import</span>{' '}
        <span className="syntax-type">{'{ Profile }'}</span>{' '}
        <span className="syntax-keyword">from</span>{' '}
        <span className="syntax-string">&quot;@/arnav&quot;</span>
        <span className="syntax-operator">;</span>
      </div>
      <div className="line">&nbsp;</div>

      {/* About content */}
      <div className="line">
        <span className="syntax-keyword">export</span>{' '}
        <span className="syntax-keyword">default</span>{' '}
        <span className="syntax-keyword">function</span>{' '}
        <span className="syntax-function">About</span>
        <span className="syntax-operator">() {'{'}</span>
      </div>
      <div className="line pl-8">
        <span className="syntax-keyword">return</span>{' '}
        <span className="syntax-operator">(</span>
      </div>

      {/* Rendered markdown content */}
      <div className="line pl-12 py-4">
        <div
          className="prose-custom text-sm leading-relaxed text-text-primary/90 space-y-4 [&_strong]:text-accent-cyan [&_strong]:font-semibold [&_p]:my-3 [&_h2]:text-lg [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-accent-pink [&_h2]:mt-6 [&_h2]:mb-3"
          dangerouslySetInnerHTML={{ __html: data.aboutHtml }}
        />
      </div>

      <div className="line pl-8">
        <span className="syntax-operator">)</span>
        <span className="syntax-operator">;</span>
      </div>
      <div className="line">
        <span className="syntax-operator">{'}'}</span>
      </div>
    </div>
  );
}
