import { motion } from "framer-motion";
import { User, BookOpen, Rocket, Code2, Lightbulb } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    text: "Full stack developer & CS student",
  },
  {
    icon: BookOpen,
    text: "Actively improving DSA and system design",
  },
  {
    icon: Rocket,
    text: "Interested in products that go from idea → deployment",
  },
  {
    icon: User,
    text: "Enjoys backend + frontend equally",
  },
  {
    icon: Lightbulb,
    text: "Learning-driven mindset",
  },
];

export const WhoIsArnav = () => {
  return (
    <section id="who" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto"
        >
          {/* Section Header */}
          <div className="mb-12">
            <span className="section-tag">#who-is-arnav</span>
            <h2 className="font-mono text-3xl md:text-4xl font-bold text-foreground mt-3">
              A bit about me
            </h2>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground mb-12 leading-relaxed"
          >
            I'm a developer who believes in building things that actually work — 
            not just look pretty in a demo. Currently focused on strengthening my 
            fundamentals while shipping real projects that solve real problems.
          </motion.p>

          {/* Highlights */}
          <div className="space-y-4">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.3 + index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                className="flex items-center gap-4 group"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                  <item.icon size={18} />
                </div>
                <span className="text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
