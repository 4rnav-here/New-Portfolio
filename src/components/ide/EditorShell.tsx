'use client';

import { useTabContext } from '@/lib/TabContext';
import { EmptyEditor } from './EmptyEditor';

export function EditorShell({ children }: { children: React.ReactNode }) {
  const { state } = useTabContext();
  const isEmpty = state.openTabs.length === 0;

  return (
    <main className="flex-1 overflow-y-auto bg-bg-editor p-6 md:p-8">
      {isEmpty ? <EmptyEditor /> : children}
    </main>
  );
}
