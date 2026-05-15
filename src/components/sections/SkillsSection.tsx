import { Badge } from '@/components/ui/Badge';
import type { PortfolioData } from '@/lib/parseInfo';

const categoryColors: Record<string, string> = {
  Languages: 'border-l-blue-400',
  Frontend: 'border-l-yellow-400',
  Backend: 'border-l-green-400',
  Databases: 'border-l-orange-400',
  'AI / ML': 'border-l-purple-400',
  'DevOps & Tools': 'border-l-cyan-400',
};

export function SkillsSection({ data }: { data: PortfolioData }) {
  return (
    <div className="line-numbers animate-fade-in">
      {/* File header */}
      <div className="line">
        <span className="syntax-comment">{'/* toolkit.jsx — Skills & Technologies */'}</span>
      </div>
      <div className="line">&nbsp;</div>

      <div className="line">
        <span className="syntax-keyword">const</span>{' '}
        <span className="syntax-function">techStack</span>{' '}
        <span className="syntax-operator">=</span>{' '}
        <span className="syntax-operator">{'{'}</span>
      </div>
      <div className="line">&nbsp;</div>

      {/* Skill categories grid */}
      <div className="line pl-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-2">
          {data.skills.map((cat) => (
            <div
              key={cat.category}
              className={`bg-bg-tab/50 border border-border rounded-sm p-4 border-l-2 ${
                categoryColors[cat.category] || 'border-l-accent-pink'
              } hover:bg-bg-tab transition-colors`}
            >
              <div className="text-xs font-mono text-accent-cyan mb-3 flex items-center gap-2">
                <span className="syntax-string">&quot;{cat.category}&quot;</span>
                <span className="syntax-operator">:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <Badge key={item} variant="muted">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="line">&nbsp;</div>
      <div className="line">
        <span className="syntax-operator">{'}'}</span>
        <span className="syntax-operator">;</span>
      </div>
    </div>
  );
}
