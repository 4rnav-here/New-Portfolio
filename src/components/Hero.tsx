import { motion } from "framer-motion";
import { ArrowDown, Terminal } from "lucide-react";
import { useRef, useEffect, useState, memo, useCallback } from "react";

/**
 * Performance-optimized Hero section
 * - Reduced parallax sensitivity
 * - Throttled mouse tracking with RAF
 * - GPU-accelerated transforms
 * - Fewer animated elements
 */
export const Hero = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);
  const rafRef = useRef<number>();
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Optimized mouse move handler with RAF throttling
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile || !containerRef.current || rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const rect = containerRef.current!.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Very subtle movement (max 5px)
        const x = (e.clientX - centerX) * 0.01;
        const y = (e.clientY - centerY) * 0.01;
        mousePos.current = { x, y };

        if (imageRef.current) {
          imageRef.current.style.transform = `translate(${x}px, ${y}px)`;
        }

        rafRef.current = undefined;
      });
    },
    [isMobile]
  );

  const handleContactClick = useCallback(() => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text Content */}
          <div className="order-2 lg:order-1">
            {/* Terminal-style intro - simplified animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 mb-6"
            >
              <Terminal className="text-primary" size={20} />
              <span className="font-mono text-muted-foreground text-sm">
                ~/developer
              </span>
              <span className="w-2 h-4 bg-primary ml-1 animate-blink" />
            </motion.div>

            {/* Main heading - faster animation */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-foreground">Hi 👋, I'm </span>
              <span className="gradient-text glow-text">Arnav</span>
              <br />
              <span className="text-muted-foreground">—</span>{" "}
              <span className="text-foreground">a </span>
              <span className="text-primary">Full Stack</span>
              <br />
              <span className="text-foreground">Developer</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl"
            >
              A passionate full stack developer from{" "}
              <span className="text-primary font-medium">India</span> who enjoys
              building clean, scalable, and real-world software.
            </motion.p>

            {/* Description list - simplified animations */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-3 mb-10 text-muted-foreground"
            >
              {[
                "Actively improving DSA and system design",
                "Building projects from idea → production",
                "Creating tools, dashboards, and learning apps",
                "Curious about scalable architectures",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 group"
                  style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                >
                  <span className="text-primary font-mono group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                  <span className="group-hover:text-foreground transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Button - simplified */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <button
                onClick={handleContactClick}
                className="btn-primary group relative overflow-hidden"
              >
                <span className="relative z-10">Contact me !!</span>
                <span className="ml-2 inline-block relative z-10 animate-bounce-x">
                  →
                </span>
              </button>
            </motion.div>
          </div>

          {/* Right Column - Profile Image - simplified animations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow effect - CSS animation instead of Framer */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-primary blur-3xl opacity-30 animate-pulse-slow" />

              {/* Profile image container */}
              <div
                ref={imageRef}
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 will-change-transform"
                style={{ transition: "transform 0.1s ease-out" }}
              >
                {/* Rotating border ring - CSS animation */}
                <div
                  className="absolute inset-0 rounded-full animate-spin-slow"
                  style={{
                    background:
                      "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))",
                    padding: "3px",
                  }}
                >
                  <div className="w-full h-full rounded-full bg-background" />
                </div>

                {/* Profile image */}
                <div className="absolute inset-3 rounded-full overflow-hidden border border-border bg-background">
                  <img
                    src="/profilepic.jpg"
                    alt="Arnav profile photo"
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating decorations - CSS animations */}
                <div className="absolute -top-4 -right-4 px-3 py-1 bg-card border border-border rounded-full font-mono text-xs text-primary shadow-lg animate-float">
                  &lt;/&gt;
                </div>

                <div className="absolute -bottom-2 -left-4 px-3 py-1 bg-card border border-border rounded-full font-mono text-xs text-accent shadow-lg animate-float-delayed">
                  🚀 Building
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - CSS animation */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="text-muted-foreground flex flex-col items-center gap-2 animate-bounce-slow">
          <span className="text-xs font-mono">scroll</span>
          <ArrowDown size={20} />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
