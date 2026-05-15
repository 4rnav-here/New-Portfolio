'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTabContext } from '@/lib/TabContext';
import { ALL_TABS, type Tab } from '@/lib/tabs';
import { FileCode2, FileText } from 'lucide-react';

const EMPTY_MESSAGES = [
  '// No files open. Try the explorer →',
  '// git status: nothing to commit, nothing to see',
  '// undefined is not a portfolio section',
  '// 404: content not found in this pane',
  '// You closed everything. Respect.',
  '// Awaiting input... like a good async function',
  '// This space intentionally left null',
  '// try { openFile() } catch { stareAtVoid() }',
];

const iconColors: Record<string, string> = {
  tsx: 'text-blue-400',
  jsx: 'text-yellow-400',
  ts: 'text-blue-500',
  md: 'text-orange-400',
};

function FileIcon({ type }: { type: string }) {
  if (type === 'md') return <FileText size={12} className={iconColors[type]} />;
  return <FileCode2 size={12} className={iconColors[type] || 'text-text-muted'} />;
}

export function EmptyEditor() {
  const { dispatch } = useTabContext();
  const router = useRouter();

  // Pick a random message once on mount — useMemo with empty deps
  const msg = useMemo(
    () => EMPTY_MESSAGES[Math.floor(Math.random() * EMPTY_MESSAGES.length)],
    []
  );

  const openTab = (tab: Tab) => {
    dispatch({ type: 'OPEN_TAB', tab });
    router.push(tab.path);
  };

  return (
    <div className="empty-editor">
      {/* Blinking cursor prompt */}
      <div className="empty-prompt">
        <span className="syntax-keyword">const</span>{' '}
        <span className="syntax-function">portfolio</span>{' '}
        <span className="syntax-keyword">=</span>{' '}
        <span className="syntax-string">&quot;arnavtrivedi&quot;</span>
        <span className="cursor-blink">_</span>
      </div>

      <p className="empty-message">{msg}</p>

      {/* Quick-open buttons */}
      <div className="empty-quickopen">
        {ALL_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => openTab(tab)}
            className="empty-file-btn"
          >
            <FileIcon type={tab.icon} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Keyboard shortcut hint */}
      <p className="empty-hint">
        <span>
          <kbd>Ctrl</kbd>+<kbd>P</kbd> to open a file
        </span>
        <span className="empty-hint-sub">
          (it won&apos;t do anything, but it&apos;s the vibe)
        </span>
      </p>
    </div>
  );
}
