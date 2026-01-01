import { motion } from "framer-motion";
import { mainProjects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  return (
    <section id="works" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="font-mono text-primary text-sm mb-2 flex items-center gap-2"
          >
            <span className="w-8 h-px bg-primary" />
            /my-projects
          </motion.div>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-foreground mb-4">
            List of my work
          </h2>
          <span className="section-tag">#projects</span>
        </motion.div>

        {/* Projects Grid - Staggered Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {mainProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={index % 3 === 1 ? "md:translate-y-8" : ""}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
