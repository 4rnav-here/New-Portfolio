'use client';

import { useState } from 'react';
import {
  Files,
  Search,
  GitBranch,
  Play,
  Puzzle,
  Settings,
} from 'lucide-react';
import { EasterEggModal } from './EasterEggModal';
import { easterEggs } from '@/lib/easterEggs';

interface ActivityItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  eggKey?: string;
  active?: boolean;
}

const items: ActivityItem[] = [
  { id: 'explorer',  icon: <Files   size={22} />, label: 'Explorer',       active: true },
  { id: 'search',    icon: <Search  size={22} />, label: 'Search',         eggKey: 'search' },
  { id: 'git',       icon: <GitBranch size={22} />, label: 'Source Control', eggKey: 'sourceControl' },
  { id: 'debug',     icon: <Play    size={22} />, label: 'Run & Debug',    eggKey: 'debug' },
  { id: 'extensions',icon: <Puzzle  size={22} />, label: 'Extensions',     eggKey: 'extensions' },
];

const bottomItems: ActivityItem[] = [
  { id: 'settings', icon: <Settings size={22} />, label: 'Settings', eggKey: 'settings' },
];

export function ActivityBar() {
  const [eggState, setEggState] = useState<{ feature: string; message: string } | null>(null);
  const [active, setActive] = useState('explorer');
  const [tooltip, setTooltip] = useState<string | null>(null);

  const handleClick = (item: ActivityItem) => {
    if (item.eggKey) {
      const message = easterEggs[item.eggKey] ?? 'Nothing to see here.';
      setEggState({ feature: item.label, message });
    } else {
      setActive(item.id);
    }
  };

  const renderItem = (item: ActivityItem) => (
    <div key={item.id} className="relative group">
      <button
        onClick={() => handleClick(item)}
        onMouseEnter={() => setTooltip(item.label)}
        onMouseLeave={() => setTooltip(null)}
        className={`flex items-center justify-center w-12 h-12 transition-colors relative ${
          active === item.id && !item.eggKey
            ? 'text-text-primary before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-accent-primary'
            : 'text-text-muted hover:text-text-primary'
        }`}
        aria-label={item.label}
      >
        {item.icon}
      </button>
      {/* Tooltip */}
      {tooltip === item.label && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 bg-bg-editor border border-border rounded px-2 py-1 text-[11px] font-mono text-text-primary whitespace-nowrap shadow-lg pointer-events-none">
          {item.label}
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="hidden md:flex flex-col justify-between w-12 bg-bg-sidebar border-r border-border shrink-0 h-full">
        <div className="flex flex-col">
          {items.map(renderItem)}
        </div>
        <div className="flex flex-col mb-2">
          {bottomItems.map(renderItem)}
        </div>
      </div>

      <EasterEggModal
        feature={eggState?.feature ?? ''}
        message={eggState?.message ?? ''}
        isOpen={!!eggState}
        onClose={() => setEggState(null)}
      />
    </>
  );
}
