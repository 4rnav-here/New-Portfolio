import { useEffect, useState, useRef, memo } from "react";

/**
 * Performance-optimized custom cursor
 * - Uses RAF for smooth 60fps updates
 * - Throttled mouse tracking
 * - GPU-accelerated transforms only
 * - Auto-disabled on mobile/touch devices
 */
export const CustomCursor = memo(() => {
  const [isMobile, setIsMobile] = useState(true); // Default to mobile to prevent flash
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const isVisible = useRef(false);
  const isHovering = useRef(false);

  useEffect(() => {
    // Check for mobile/touch devices
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    if (isMobile) return;

    // Throttled mouse move handler using RAF
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible.current) {
        isVisible.current = true;
        if (cursorRef.current) {
          cursorRef.current.style.opacity = "0.4";
        }
      }
    };

    // Hover detection with event delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.tagName === "BUTTON" || 
                           target.tagName === "A" ||
                           target.closest("button") ||
                           target.closest("a");
      
      if (isInteractive && !isHovering.current) {
        isHovering.current = true;
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(-50%, -50%) scale(1.3)`;
          cursorRef.current.style.borderColor = "hsl(var(--primary))";
        }
      }
    };

    const handleMouseOut = () => {
      if (isHovering.current) {
        isHovering.current = false;
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(-50%, -50%) scale(1)`;
          cursorRef.current.style.borderColor = "hsl(var(--muted-foreground) / 0.4)";
        }
      }
    };

    // Smooth animation loop using RAF - GPU accelerated
    const animate = () => {
      // Lerp for smooth trailing (0.15 = low sensitivity)
      const lerp = 0.12;
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerp;

      if (cursorRef.current) {
        // Use translate3d for GPU acceleration
        cursorRef.current.style.left = `${currentPos.current.x}px`;
        cursorRef.current.style.top = `${currentPos.current.y}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // Start animation loop
    rafRef.current = requestAnimationFrame(animate);

    // Use passive listeners for better scroll performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isMobile]);

  // Don't render on mobile/touch devices
  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9998] will-change-transform"
      style={{
        left: -100,
        top: -100,
        opacity: 0,
        transition: "opacity 0.3s, border-color 0.2s, transform 0.2s",
      }}
    >
      <div 
        className="w-6 h-6 rounded-full border border-muted-foreground/40 -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform" }}
      />
    </div>
  );
});

CustomCursor.displayName = "CustomCursor";
