'use client';

import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { X, FileCode2, FileText } from 'lucide-react';
import { useTabContext } from '@/lib/TabContext';

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
  const { state, dispatch } = useTabContext();
  const router = useRouter();
  const tabBarRef = useRef<HTMLDivElement>(null);

  // Scroll active tab into view when it changes
  useEffect(() => {
    const activeEl = tabBarRef.current?.querySelector('[aria-selected="true"]');
    activeEl?.scrollIntoView({
      block: 'nearest',
      inline: 'center',
      behavior: 'smooth',
    });
  }, [state.activeTabId]);

  const handleClose = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    const { openTabs, activeTabId } = state;
    const idx = openTabs.findIndex((t) => t.id === id);
    const remaining = openTabs.filter((t) => t.id !== id);

    dispatch({ type: 'CLOSE_TAB', id });

    // Only navigate if we closed the active tab
    if (id === activeTabId && remaining.length > 0) {
      const next = remaining[idx] ?? remaining[idx - 1];
      router.push(next.path);
    }
  };

  if (state.openTabs.length === 0) return null;

  return (
    <div className="tab-bar hidden md:flex" role="tablist" ref={tabBarRef}>
      {state.openTabs.map((tab) => {
        const isActive = tab.id === state.activeTabId;
        return (
          <div
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            className={`tab-item ${isActive ? 'tab-active' : 'tab-inactive'}`}
            onMouseDown={(e) => {
              if (e.button === 1) handleClose(e, tab.id);
            }}
          >
            <Link
              href={tab.path}
              onClick={() => dispatch({ type: 'SET_ACTIVE', id: tab.id })}
              className="tab-link"
            >
              <TabIcon type={tab.icon} />
              <span className="tab-label">{tab.label}</span>
            </Link>
            <button
              className="tab-close"
              onClick={(e) => handleClose(e, tab.id)}
              aria-label={`Close ${tab.label}`}
            >
              <X size={12} strokeWidth={2} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
