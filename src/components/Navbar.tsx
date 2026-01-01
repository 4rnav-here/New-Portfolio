import { useState, useEffect, useRef, useCallback, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Works", href: "#works" },
  { label: "About Me", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/**
 * Performance-optimized Navbar
 * - Throttled scroll handler with RAF
 * - IntersectionObserver for active section detection
 * - Memoized to prevent re-renders
 */
export const Navbar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const rafRef = useRef<number>();
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Throttled scroll handler for background effect only
    const handleScroll = () => {
      if (rafRef.current) return;
      
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        // Only update if crossed threshold
        if ((scrollY > 50) !== scrolled) {
          setScrolled(scrollY > 50);
        }
        lastScrollY.current = scrollY;
        rafRef.current = undefined;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrolled]);

  // Use IntersectionObserver for active section detection (more performant than scroll)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" } // Trigger when section is in middle of viewport
    );

    navLinks.forEach((link) => {
      const element = document.getElementById(link.href.slice(1));
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const handleNavClick = useCallback((href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : ""
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="font-mono text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            &lt;arnav /&gt;
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`nav-link ${
                  activeSection === link.href.slice(1) ? "active" : ""
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => setIsDark(!isDark)}
              className="social-icon"
              aria-label="Toggle dark mode"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <Moon size={20} /> : <Sun size={20} />}
              </motion.div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden social-icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4 border-t border-border"
            >
              <div className="flex flex-col gap-4 pt-4">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-left nav-link ${
                      activeSection === link.href.slice(1) ? "active" : ""
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isDark ? <Moon size={20} /> : <Sun size={20} />}
                  <span>{isDark ? "Dark" : "Light"} Mode</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
});

Navbar.displayName = "Navbar";
