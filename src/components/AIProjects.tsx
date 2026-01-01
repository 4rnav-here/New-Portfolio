import { motion } from "framer-motion";
import { Github, Sparkles } from "lucide-react";
import { aiProjects } from "@/data/projects";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
      type: "spring" as const,
      stiffness: 100,
    },
  }),
};

export const AIProjects = () => {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-secondary/50 to-secondary/30 pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-20 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="text-primary" size={20} />
            <span className="section-tag">#ai-projects</span>
          </div>
          <h2 className="font-mono text-2xl md:text-3xl font-bold text-foreground mt-2">
            Machine Learning & AI Work
          </h2>
          <p className="text-muted-foreground mt-2 max-w-xl">
            Experiments and projects exploring the intersection of AI and practical applications
          </p>
        </motion.div>

        {/* AI Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {aiProjects.map((project, index) => (
            <motion.article
              key={project.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 40px -20px hsl(var(--primary) / 0.3)",
              }}
              className="group relative bg-card border border-border rounded-xl p-5 overflow-hidden cursor-hover"
            >
              {/* Hover gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Language Tag */}
                <div className="flex items-center gap-2 mb-3">
                  <motion.span 
                    className="w-3 h-3 rounded-full bg-terminal-yellow"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs font-mono text-muted-foreground">
                    Python
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-mono text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-badge text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Code Link */}
                <motion.a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-xs inline-flex"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={14} className="mr-1.5" />
                  Code
                </motion.a>
              </div>
              
              {/* Corner decoration */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
