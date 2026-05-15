import { Badge } from '@/components/ui/Badge';
import { ExternalLink } from 'lucide-react';
import type { PortfolioData } from '@/lib/parseInfo';

export function ProjectsSection({ data }: { data: PortfolioData }) {
  return (
    <div className="line-numbers animate-fade-in">
      {/* File header */}
      <div className="line">
        <span className="syntax-comment">{'/* showcase.jsx — Featured Projects */'}</span>
      </div>
      <div className="line">&nbsp;</div>

      <div className="line">
        <span className="syntax-keyword">const</span>{' '}
        <span className="syntax-function">projects</span>{' '}
        <span className="syntax-operator">=</span>{' '}
        <span className="syntax-operator">[</span>
      </div>
      <div className="line">&nbsp;</div>

      {/* Project cards grid */}
      <div className="line pl-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
          {data.projects.map((project, i) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-bg-tab/30 border border-border rounded-sm overflow-hidden hover:-translate-y-1 hover:border-accent-pink/50 transition-all duration-150"
            >
              {/* Colored header bar */}
              <div className="h-1.5 bg-gradient-to-r from-accent-pink via-accent-cyan to-accent-yellow" />

              <div className="p-4">
                {/* Project number + title */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-[10px] text-text-muted font-mono">
                      {`project_${String(i).padStart(2, '0')}`}
                    </span>
                    <h3 className="text-sm font-mono font-bold text-text-primary group-hover:text-accent-pink transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <ExternalLink
                    size={14}
                    className="text-text-muted group-hover:text-accent-cyan transition-colors mt-1 shrink-0"
                  />
                </div>

                {/* Description */}
                <p className="text-xs text-text-muted leading-relaxed mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="muted">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="line">&nbsp;</div>
      <div className="line">
        <span className="syntax-operator">];</span>
      </div>
    </div>
  );
}
