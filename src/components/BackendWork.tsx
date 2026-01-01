import { motion } from "framer-motion";
import { Database, Server, Shield, Zap } from "lucide-react";

const backendProjects = [
  {
    title: "PostgreSQL + Redis Backend",
    description: "Performance-focused backend with caching layer and optimized queries for high-throughput applications.",
    tags: ["PostgreSQL", "Redis", "Node.js"],
    icon: Database,
  },
  {
    title: "Raw SQL Node.js Backend",
    description: "No ORM approach — direct SQL queries for maximum control and understanding of database operations.",
    tags: ["SQL", "Node.js", "Express"],
    icon: Server,
  },
  {
    title: "Multi-Database Architecture",
    description: "Experience designing systems that coordinate between different database types based on use case.",
    tags: ["MongoDB", "PostgreSQL", "Redis"],
    icon: Shield,
  },
];

export const BackendWork = () => {
  return (
    <section id="backend" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="section-tag">#backend-work</span>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Backend & Systems
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Focused on performance, reliability, and understanding what happens under the hood.
          </p>
        </motion.div>

        {/* Backend Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {backendProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.15,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              className="group p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <project.icon size={20} />
                </div>
                <h3 className="font-mono text-lg font-semibold text-foreground">
                  {project.title}
                </h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded border border-border/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
