'use client';

import { useEffect, useRef, useState } from 'react';

// Deterministic pseudo-random widths from a seed
function seededWidth(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return 20 + Math.floor((x - Math.floor(x)) * 70); // 20–90%
}

// Generate stable line data
const LINES = Array.from({ length: 80 }, (_, i) => ({
  width: seededWidth(i),
  opacity: 0.08 + seededWidth(i + 100) / 1000,
}));

export function Minimap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Element | null>(null);
  const [viewportTop, setViewportTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(20);

  useEffect(() => {
    // Find the scrollable editor main element
    const editor = document.querySelector('main');
    editorRef.current = editor;

    const update = () => {
      if (!editor || !containerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = editor;
      const ratio = scrollHeight > 0 ? clientHeight / scrollHeight : 1;
      const topRatio = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      const minimapH = containerRef.current.clientHeight;
      setViewportTop(topRatio * minimapH);
      setViewportHeight(Math.max(ratio * minimapH, 24));
    };

    editor?.addEventListener('scroll', update);
    update();
    return () => editor?.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden lg:flex flex-col w-[90px] bg-bg-editor border-l border-border shrink-0 h-full overflow-hidden relative select-none"
      aria-hidden="true"
    >
      {/* Viewport indicator */}
      <div
        className="absolute left-0 right-0 z-10 pointer-events-none"
        style={{
          top: `${viewportTop}px`,
          height: `${viewportHeight}px`,
          background: 'var(--text-primary)',
          opacity: 0.06,
        }}
      />

      {/* Fake code lines */}
      <div className="flex flex-col pt-3 px-2 gap-[3px]">
        {LINES.map((line, i) => (
          <div
            key={i}
            style={{
              width: `${line.width}%`,
              height: '2px',
              borderRadius: '1px',
              background: 'var(--syntax-function)',
              opacity: line.opacity,
            }}
          />
        ))}
      </div>
    </div>
  );
}
