import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { useRef, memo, useCallback } from "react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * Performance-optimized ProjectCard
 * - No complex motion values or springs
 * - Simple CSS transitions for hover
 * - Memoized to prevent re-renders
 */
export const ProjectCard = memo(({ project, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Simple CSS variable update for glow - no state
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--mouse-x", `${x}%`);
    cardRef.current.style.setProperty("--mouse-y", `${y}%`);
  }, []);

  const directions = [
    { x: -30, y: 0 },
    { x: 30, y: 0 },
    { x: 0, y: 30 },
    { x: 0, y: -30 },
  ];
  const dir = directions[index % directions.length];

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, x: dir.x, y: dir.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      viewport={{ once: true, amount: 0.2 }}
      onMouseMove={handleMouseMove}
      className="card-bordered p-6 group"
    >
      {/* Project Title */}
      <h3 className="font-mono text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {project.description}
      </p>

      {/* Tech Stack - no individual animations */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.techStack.map((tech) => (
          <span key={tech} className="tech-badge">
            {tech}
          </span>
        ))}
      </div>

      {/* Action Buttons - CSS transitions only */}
      <div className="flex items-center gap-3">
        <a
          href={project.codeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline text-sm hover:scale-105 active:scale-95 transition-transform"
        >
          <Github size={16} className="mr-2" />
          Code
        </a>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm hover:scale-105 active:scale-95 transition-transform"
          >
            <ExternalLink size={16} className="mr-2" />
            Live
          </a>
        ) : (
          <span className="btn-outline text-sm opacity-50 cursor-not-allowed">
            <ExternalLink size={16} className="mr-2" />
            Live
          </span>
        )}
      </div>
    </motion.article>
  );
});

ProjectCard.displayName = "ProjectCard";
