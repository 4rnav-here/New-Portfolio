import { memo } from "react";

/**
 * Performance-optimized background effects
 * - Uses CSS animations instead of Framer Motion (no JS overhead)
 * - GPU-accelerated transforms only
 * - Reduced blur complexity for mobile
 */
export const BackgroundEffects = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-noise" />
      
      {/* Gradient orbs - CSS animations for better performance */}
      <div 
        className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl will-change-transform animate-float-slow"
      />
      
      <div 
        className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl will-change-transform animate-float-slower"
      />
      
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl will-change-transform animate-pulse-slow"
      />
      
      {/* Grid pattern - static, no animation needed */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
});

BackgroundEffects.displayName = "BackgroundEffects";
