'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { X, FileCode2, FileText } from 'lucide-react';

interface Tab {
  name: string;
  path: string;
  icon: 'tsx' | 'md' | 'jsx' | 'ts';
}

const tabs: Tab[] = [
  { name: 'home.tsx', path: '/', icon: 'tsx' },
  { name: 'about.md', path: '/about', icon: 'md' },
  { name: 'toolkit.jsx', path: '/skills', icon: 'jsx' },
  { name: 'showcase.jsx', path: '/projects', icon: 'jsx' },
  { name: 'experience.ts', path: '/experience', icon: 'ts' },
  { name: 'contact.jsx', path: '/contact', icon: 'jsx' },
];

const iconColors: Record<string, string> = {
  tsx: 'text-blue-400',
  jsx: 'text-yellow-400',
  ts: 'text-blue-500',
  md: 'text-orange-400',
};

function TabIcon({ type }: { type: string }) {
  if (type === 'md') return <FileText size={12} className={iconColors[type]} />;
  return <FileCode2 size={12} className={iconColors[type] || 'text-text-muted'} />;
}

export function TabBar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center bg-bg-tab border-b border-border overflow-x-auto shrink-0">
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <Link
            key={tab.path}
            href={tab.path}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border-r border-border shrink-0 transition-colors ${
              isActive
                ? 'bg-bg-tab-active text-text-primary border-t-2 border-t-accent-pink'
                : 'text-text-muted hover:text-text-primary hover:bg-bg-editor/50'
            }`}
          >
            <TabIcon type={tab.icon} />
            <span>{tab.name}</span>
            <X
              size={12}
              className="ml-1.5 opacity-0 hover:opacity-100 text-text-muted hover:text-text-primary transition-opacity"
            />
          </Link>
        );
      })}
    </div>
  );
}
