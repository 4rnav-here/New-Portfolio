'use client';

import { usePathname } from 'next/navigation';
import { GitBranch, Download } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { EasterEggModal } from './EasterEggModal';
import { easterEggs } from '@/lib/easterEggs';
import { useState } from 'react';
import { useTabContext } from '@/lib/TabContext';

const fileTypes: Record<string, string> = {
  '/':           'TypeScript JSX',
  '/about':      'Markdown',
  '/skills':     'JavaScript JSX',
  '/projects':   'JavaScript JSX',
  '/experience': 'TypeScript',
  '/contact':    'JavaScript JSX',
};

export function StatusBar() {
  const pathname = usePathname();
  const { state } = useTabContext();
  const activeTab = state.openTabs.find((t) => t.id === state.activeTabId);
  const fileType = fileTypes[pathname] ?? 'TypeScript';

  const [eggState, setEggState] = useState<{ feature: string; message: string } | null>(null);

  const openEgg = (key: string, feature?: string) => {
    const message = easterEggs[key] ?? 'Nothing here.';
    setEggState({ feature: feature ?? key.replace(/_/g, ' '), message });
  };

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Arnav Trivedi.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // check if missing
    fetch('/resume.pdf', { method: 'HEAD' }).then((r) => {
      if (!r.ok) openEgg('resume_missing', 'Resume');
    }).catch(() => openEgg('resume_missing', 'Resume'));
  };

  return (
    <>
      <div className="flex items-center justify-between h-6 px-2 bg-bg-statusbar text-text-statusbar text-[11px] font-mono shrink-0 select-none">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 px-1">
            <GitBranch size={11} />
            main
          </span>
          <button
            onClick={() => openEgg('status_errors', 'Problems')}
            className="hidden sm:flex items-center gap-1.5 px-1 hover:bg-white/10 rounded transition-colors cursor-pointer"
          >
            <span>○ 0</span>
            <span>△ 0</span>
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-0">
          <button
            onClick={handleResumeDownload}
            className="hidden sm:flex items-center gap-1 px-2 hover:bg-white/10 rounded transition-colors cursor-pointer"
            title="Download Resume"
          >
            <Download size={11} />
            <span>Resume</span>
          </button>

          {activeTab && (
            <button
              onClick={() => openEgg('status_filetype', 'File Type')}
              className="hidden md:block px-2 hover:bg-white/10 rounded transition-colors cursor-pointer"
            >
              {fileType}
            </button>
          )}

          <button
            onClick={() => openEgg('status_encoding', 'Encoding')}
            className="px-2 hover:bg-white/10 rounded transition-colors cursor-pointer"
          >
            UTF-8
          </button>

          <button
            onClick={() => openEgg('status_ln_col', 'Cursor')}
            className="hidden sm:block px-2 hover:bg-white/10 rounded transition-colors cursor-pointer"
          >
            Ln 1, Col 1
          </button>

          <button
            onClick={() => openEgg('status_spaces', 'Indentation')}
            className="hidden md:block px-2 hover:bg-white/10 rounded transition-colors cursor-pointer"
          >
            Spaces: 2
          </button>

          <div className="pl-1 border-l border-white/20 ml-1">
            <ThemeToggle />
          </div>
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
