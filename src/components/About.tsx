import { motion } from "framer-motion";
import { skills } from "@/data/projects";
import { Code2, Coffee, Lightbulb, Rocket } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Full Stack Mindset",
    description:
      "Comfortable navigating both frontend and backend, building end-to-end solutions that actually work.",
  },
  {
    icon: Rocket,
    title: "Scalable Systems",
    description:
      "Fascinated by system design principles and building applications that can grow with their users.",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    description:
      "Enjoy breaking down complex problems through DSA practice and logical thinking.",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="max-w-4xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="section-tag">#about-me</span>
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-foreground mt-2">
              Who is Arnav?
            </h2>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6 text-muted-foreground leading-relaxed mb-12"
          >
            <p className="text-lg">
              I'm a Computer Science student from India with a genuine passion
              for building software that solves real problems. Not the "10x
              developer" type—just someone who enjoys the process of turning
              ideas into functional applications.
            </p>
            <p>
              My approach is practical: understand the problem, design a clean
              solution, and iterate until it works well. I believe in writing
              code that future-me (or any other developer) can actually
              understand and maintain.
            </p>
            <p>
              Currently strengthening my fundamentals in data structures and
              algorithms while exploring system design concepts. I find the
              intersection of frontend polish and backend robustness
              particularly interesting.
            </p>
          </motion.div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-bordered p-5"
              >
                <item.icon className="text-primary mb-3" size={24} />
                <h3 className="font-mono text-sm font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-mono text-lg font-semibold text-foreground mb-4">
              Technologies I work with
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="tech-badge"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Fun line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 flex items-center gap-3 text-muted-foreground"
          >
            <Coffee size={18} className="text-primary" />
            <p className="text-sm italic">
              "Coffee may or may not improve code quality — results
              inconclusive."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
