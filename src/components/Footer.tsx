import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/4rnav-here",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/arnavtrivedi2004",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:arnavtrivediofficial@gmail.com",
    label: "Email",
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-border">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / Name */}
          <motion.a
            href="#home"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-lg font-bold text-foreground hover:text-primary transition-colors"
          >
            &lt;arnav /&gt;
          </motion.a>

          {/* Social Links (visible on mobile) */}
          <div className="flex items-center gap-4 lg:hidden">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label={link.label}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground flex items-center gap-1"
          >
            © {currentYear} Arnav. Engineered, not assembled.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};
