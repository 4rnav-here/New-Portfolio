import { motion } from "framer-motion";
import { Trophy, Briefcase, GraduationCap, Award } from "lucide-react";

const experiences = [
  {
    type: "hackathon",
    icon: Trophy,
    title: "Hackathon Participation",
    description: "Participated in multiple hackathons, building MVPs under time pressure and learning to ship fast.",
  },
  {
    type: "learning",
    icon: GraduationCap,
    title: "CS Coursework",
    description: "Studying Computer Science with focus on algorithms, data structures, and system design fundamentals.",
  },
  {
    type: "project",
    icon: Briefcase,
    title: "Real-World Projects",
    description: "Building production-ready applications with proper authentication, databases, and deployment pipelines.",
  },
  {
    type: "growth",
    icon: Award,
    title: "Continuous Learning",
    description: "Regularly practicing DSA, exploring new technologies, and contributing to open-source when possible.",
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="section-tag">#experience</span>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Learning Journey
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Growing as a developer through practice, projects, and continuous learning.
          </p>
        </motion.div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              className="group flex gap-4 p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex-shrink-0 p-3 rounded-lg bg-primary/10 text-primary h-fit">
                <exp.icon size={24} />
              </div>
              <div>
                <h3 className="font-mono text-lg font-semibold text-foreground mb-2">
                  {exp.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
