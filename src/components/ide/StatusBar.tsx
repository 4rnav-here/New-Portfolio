'use client';

import { usePathname } from 'next/navigation';
import { GitBranch } from 'lucide-react';

const pageNames: Record<string, string> = {
  '/': 'home.tsx',
  '/about': 'about.md',
  '/skills': 'toolkit.jsx',
  '/projects': 'showcase.jsx',
  '/experience': 'experience.ts',
  '/contact': 'contact.jsx',
};

export function StatusBar() {
  const pathname = usePathname();
  const fileName = pageNames[pathname] || 'unknown';

  return (
    <div className="flex items-center justify-between h-6 px-3 bg-accent-pink text-white text-[10px] font-mono shrink-0 select-none">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <GitBranch size={11} />
          main
        </span>
        <span className="hidden sm:inline">⟳ 0↓ 0↑</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline">{fileName}</span>
        <span>UTF-8</span>
        <span className="hidden sm:inline">Ln 1, Col 1</span>
        <span className="hidden sm:inline">Spaces: 2</span>
      </div>
    </div>
  );
}
