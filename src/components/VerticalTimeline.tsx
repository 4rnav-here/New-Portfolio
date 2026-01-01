import { memo, useEffect, useRef, useState } from "react";

/**
 * Performance-optimized vertical timeline
 * - Uses CSS transforms only (GPU accelerated)
 * - Passive scroll listener with RAF throttling
 * - No Framer Motion scroll hooks (causes jank)
 */
export const VerticalTimeline = memo(() => {
  const progressRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number>();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    
    if (isMobile) return;

    const updateProgress = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / docHeight, 1);
      
      // Only update if scroll position changed significantly
      if (Math.abs(scrollY - lastScrollY.current) < 2) return;
      lastScrollY.current = scrollY;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleY(${progress})`;
      }
      
      if (dotRef.current) {
        // Calculate dot position (96px from top to 96px from bottom)
        const topOffset = 96;
        const bottomOffset = 96;
        const availableHeight = window.innerHeight - topOffset - bottomOffset;
        const dotY = topOffset + (availableHeight * progress);
        dotRef.current.style.transform = `translateY(${dotY}px)`;
        dotRef.current.style.opacity = `${0.3 + progress * 0.4}`;
      }
    };

    const handleScroll = () => {
      if (rafRef.current) return; // Throttle with RAF
      rafRef.current = requestAnimationFrame(() => {
        updateProgress();
        rafRef.current = undefined;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress(); // Initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div className="fixed left-8 top-0 bottom-0 flex flex-col items-center z-40 pointer-events-none">
      {/* Static background line */}
      <div className="absolute top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
      
      {/* Animated progress line - GPU accelerated with scaleY */}
      <div
        ref={progressRef}
        className="absolute top-24 bottom-24 w-px bg-gradient-to-b from-primary via-primary to-transparent origin-top will-change-transform"
        style={{ transform: "scaleY(0)" }}
      />
      
      {/* Glowing dot - GPU accelerated with translateY */}
      <div
        ref={dotRef}
        className="absolute left-1/2 -ml-1.5 w-3 h-3 rounded-full bg-primary will-change-transform"
        style={{ 
          transform: "translateY(96px)",
          boxShadow: "0 0 20px hsl(var(--primary) / 0.5)",
          transition: "opacity 0.1s",
        }}
      />
      
      {/* Static section markers - no animation needed */}
      {[20, 40, 60, 80].map((pos) => (
        <div
          key={pos}
          className="absolute w-2 h-2 rounded-full bg-muted border border-border hover:scale-150 hover:bg-primary transition-transform"
          style={{ top: `${pos}%` }}
        />
      ))}
    </div>
  );
});

VerticalTimeline.displayName = "VerticalTimeline";
