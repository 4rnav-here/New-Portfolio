'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight,
  ChevronDown,
  FileCode2,
  FileText,
  FolderOpen,
  Folder,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

interface FileItem {
  name: string;
  path: string;
  icon: 'tsx' | 'md' | 'jsx' | 'ts' | 'json';
}

interface FolderItem {
  name: string;
  children: FileItem[];
}

type TreeItem = FileItem | FolderItem;

function isFolder(item: TreeItem): item is FolderItem {
  return 'children' in item;
}

const fileTree: TreeItem[] = [
  { name: 'home.tsx', path: '/', icon: 'tsx' },
  { name: 'about.md', path: '/about', icon: 'md' },
  {
    name: 'skills',
    children: [{ name: 'toolkit.jsx', path: '/skills', icon: 'jsx' }],
  },
  {
    name: 'projects',
    children: [{ name: 'showcase.jsx', path: '/projects', icon: 'jsx' }],
  },
  { name: 'experience.ts', path: '/experience', icon: 'ts' },
  { name: 'contact.jsx', path: '/contact', icon: 'jsx' },
];

const iconColors: Record<string, string> = {
  tsx: 'text-blue-400',
  jsx: 'text-yellow-400',
  ts: 'text-blue-500',
  md: 'text-orange-400',
  json: 'text-yellow-300',
};

function FileIcon({ type }: { type: string }) {
  if (type === 'md') return <FileText size={14} className={iconColors[type]} />;
  return <FileCode2 size={14} className={iconColors[type] || 'text-text-muted'} />;
}

function SidebarFileItem({
  item,
  isActive,
  depth = 0,
  onNavigate,
}: {
  item: FileItem;
  isActive: boolean;
  depth?: number;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={item.path}
      onClick={onNavigate}
      className={`flex items-center gap-2 px-2 py-1 text-xs font-mono cursor-pointer rounded-sm transition-colors ${
        isActive
          ? 'bg-bg-editor text-text-primary'
          : 'text-text-muted hover:text-text-primary hover:bg-bg-tab'
      }`}
      style={{ paddingLeft: `${12 + depth * 16}px` }}
    >
      <FileIcon type={item.icon} />
      <span className="truncate">{item.name}</span>
    </Link>
  );
}

function SidebarFolder({
  folder,
  pathname,
  depth = 0,
  onNavigate,
}: {
  folder: FolderItem;
  pathname: string;
  depth?: number;
  onNavigate?: () => void;
}) {
  const hasActive = folder.children.some((c) => c.path === pathname);
  const [open, setOpen] = useState(hasActive);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1 text-xs font-mono text-text-muted hover:text-text-primary w-full cursor-pointer rounded-sm hover:bg-bg-tab transition-colors"
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        {open ? (
          <FolderOpen size={14} className="text-accent-yellow" />
        ) : (
          <Folder size={14} className="text-accent-yellow" />
        )}
        <span>{folder.name}</span>
      </button>
      {open && (
        <div>
          {folder.children.map((child) => (
            <SidebarFileItem
              key={child.path}
              item={child}
              isActive={pathname === child.path}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const tree = (
    <div className="flex flex-col h-full">
      {/* Explorer header */}
      <div className="px-3 py-2 text-[10px] tracking-[0.15em] uppercase text-text-muted font-mono border-b border-border">
        Explorer
      </div>

      {/* Section label */}
      <div className="px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase text-text-muted/70 font-mono flex items-center gap-1.5">
        <ChevronDown size={10} />
        Portfolio
      </div>

      {/* File tree */}
      <nav className="flex-1 overflow-y-auto py-1 space-y-0.5">
        {fileTree.map((item) => {
          if (isFolder(item)) {
            return (
              <SidebarFolder
                key={item.name}
                folder={item}
                pathname={pathname}
                onNavigate={() => setMobileOpen(false)}
              />
            );
          }
          return (
            <SidebarFileItem
              key={item.path}
              item={item}
              isActive={pathname === item.path}
              onNavigate={() => setMobileOpen(false)}
            />
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-1.5 left-2 z-50 p-1.5 rounded bg-bg-tab border border-border"
        aria-label="Open sidebar"
      >
        <Menu size={16} />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-[220px] bg-bg-sidebar border-r border-border shrink-0 h-full">
        {tree}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-[260px] bg-bg-sidebar border-r border-border flex flex-col">
            <div className="flex items-center justify-between px-3 py-2 border-b border-border">
              <span className="text-xs text-text-muted font-mono">Explorer</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 rounded hover:bg-border"
                aria-label="Close sidebar"
              >
                <X size={14} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{tree}</div>
          </aside>
        </div>
      )}
    </>
  );
}
