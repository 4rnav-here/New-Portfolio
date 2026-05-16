'use client';

import { useTabContext } from '@/lib/TabContext';
import { useState } from 'react';
import { EasterEggModal } from './EasterEggModal';
import { easterEggs } from '@/lib/easterEggs';

const breadcrumbs: Record<string, string[]> = {
  '/':           ['src', 'app', 'home.tsx'],
  '/about':      ['content', 'info.md'],
  '/projects':   ['src', 'app', 'projects', 'page.tsx'],
  '/skills':     ['src', 'app', 'skills', 'page.tsx'],
  '/experience': ['src', 'app', 'experience', 'page.tsx'],
  '/contact':    ['src', 'app', 'contact', 'page.tsx'],
};

export function BreadcrumbBar() {
  const { state } = useTabContext();
  const [eggState, setEggState] = useState<{ feature: string; message: string } | null>(null);

  const activeTab = state.openTabs.find((t) => t.id === state.activeTabId);
  const parts = activeTab ? (breadcrumbs[activeTab.path] ?? [activeTab.label]) : [];

  if (parts.length === 0) return null;

  const openEgg = () => {
    setEggState({ feature: 'Breadcrumb', message: easterEggs.breadcrumb });
  };

  return (
    <>
      <div className="flex items-center h-7 px-3 bg-bg-editor border-b border-border text-[11px] font-mono text-text-muted select-none shrink-0 overflow-x-auto scrollbar-none">
        {parts.map((part, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <span className="mx-1 opacity-40">›</span>}
            <button
              onClick={openEgg}
              className={`hover:text-text-primary transition-colors cursor-pointer ${
                i === parts.length - 1 ? 'text-text-primary' : ''
              }`}
            >
              {part}
            </button>
          </span>
        ))}
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
