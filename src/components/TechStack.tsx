import { motion } from "framer-motion";
import { 
  Code2, 
  Server, 
  Database, 
  Brain, 
  Wrench,
  Palette
} from "lucide-react";

const techCategories = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Palette,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "hover:border-blue-500/50",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "hover:border-green-500/50",
    technologies: ["Node.js", "Express", "Python", "REST APIs", "GraphQL"],
  },
  {
    id: "database",
    title: "Databases",
    icon: Database,
    color: "from-orange-500/20 to-amber-500/20",
    borderColor: "hover:border-orange-500/50",
    technologies: ["MongoDB", "PostgreSQL", "Redis", "Prisma"],
  },
  {
    id: "ai-ml",
    title: "AI / ML",
    icon: Brain,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "hover:border-purple-500/50",
    technologies: ["LangChain", "LangGraph", "OpenAI", "Scikit-learn", "Pandas"],
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    icon: Wrench,
    color: "from-rose-500/20 to-red-500/20",
    borderColor: "hover:border-rose-500/50",
    technologies: ["Git", "Docker", "Vercel", "Linux", "VS Code"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export const TechStack = () => {
  return (
    <section id="tech" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-20 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="section-tag">#tech-stack</span>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Technologies I Work With
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A curated collection of tools and technologies that power my projects
          </p>
        </motion.div>

        {/* Tech Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {techCategories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                transition: { duration: 0.2 } 
              }}
              className={`group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 ${category.borderColor}`}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Noise texture overlay */}
              <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-noise" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="p-2 rounded-lg bg-primary/10 text-primary"
                  >
                    <category.icon size={24} />
                  </motion.div>
                  <h3 className="font-mono text-lg font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * techIndex }}
                      viewport={{ once: true }}
                      className="px-3 py-1.5 text-xs font-medium bg-secondary/80 text-secondary-foreground rounded-md border border-border/50 backdrop-blur-sm"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              {/* Hover glow effect */}
              <motion.div
                className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
