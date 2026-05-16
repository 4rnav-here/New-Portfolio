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
  FileJson,
  FileType,
  GitCommitVertical,
  FileImage,
} from 'lucide-react';
import { useState } from 'react';
import { useTabContext } from '@/lib/TabContext';
import { getTabByPath } from '@/lib/tabs';
import { EasterEggModal } from './EasterEggModal';
import { easterEggs } from '@/lib/easterEggs';

/* === types === */

type FileIcon = 'tsx' | 'jsx' | 'ts' | 'md' | 'json' | 'css' | 'pdf' | 'ico' | 'git';

interface NavFile {
  kind: 'nav';
  name: string;
  path: string;
  icon: FileIcon;
}
interface EggFile {
  kind: 'egg';
  name: string;
  eggKey: string;
  icon: FileIcon;
}
interface DownloadFile {
  kind: 'download';
  name: string;
  href: string;
  downloadAs: string;
  icon: FileIcon;
  eggKey?: string; // shown if download 404s
}
interface FolderNode {
  kind: 'folder';
  name: string;
  defaultOpen?: boolean;
  children: TreeNode[];
}
interface Divider {
  kind: 'divider';
}

type TreeNode = NavFile | EggFile | DownloadFile | FolderNode | Divider;

/* ───────────────── file tree data ───────────────── */

const fileTree: TreeNode[] = [
  {
    kind: 'folder',
    name: 'src',
    defaultOpen: true,
    children: [
      {
        kind: 'folder',
        name: 'app',
        defaultOpen: true,
        children: [
          { kind: 'nav',  name: 'home.tsx',       path: '/',           icon: 'tsx' },
          { kind: 'nav',  name: 'about.md',        path: '/about',      icon: 'md'  },
          { kind: 'nav',  name: 'projects.tsx',    path: '/projects',   icon: 'tsx' },
          { kind: 'nav',  name: 'experience.ts',   path: '/experience', icon: 'ts'  },
          { kind: 'nav',  name: 'contact.jsx',     path: '/contact',    icon: 'jsx' },
          { kind: 'nav',  name: 'skills.jsx',      path: '/skills',     icon: 'jsx' },
        ],
      },
      {
        kind: 'folder',
        name: 'components',
        defaultOpen: false,
        children: [
          { kind: 'egg', name: 'ide/',      eggKey: 'components_dir', icon: 'tsx' },
          { kind: 'egg', name: 'sections/', eggKey: 'components_dir', icon: 'tsx' },
          { kind: 'egg', name: 'ui/',       eggKey: 'components_dir', icon: 'tsx' },
        ],
      },
      {
        kind: 'folder',
        name: 'lib',
        defaultOpen: false,
        children: [
          { kind: 'egg', name: 'TabContext.tsx', eggKey: 'components_dir', icon: 'tsx' },
          { kind: 'egg', name: 'tabs.ts',        eggKey: 'components_dir', icon: 'ts'  },
          { kind: 'egg', name: 'parseInfo.ts',   eggKey: 'components_dir', icon: 'ts'  },
          { kind: 'egg', name: 'easterEggs.ts',  eggKey: 'components_dir', icon: 'ts'  },
        ],
      },
    ],
  },
  {
    kind: 'folder',
    name: 'content',
    defaultOpen: false,
    children: [
      { kind: 'egg', name: 'info.md', eggKey: 'components_dir', icon: 'md' },
    ],
  },
  {
    kind: 'folder',
    name: 'public',
    defaultOpen: false,
    children: [
      {
        kind: 'download',
        name: 'resume.pdf',
        href: '/resume.pdf',
        downloadAs: 'Arnav Trivedi.pdf',
        icon: 'pdf',
        eggKey: 'resume_missing',
      },
      { kind: 'egg', name: 'favicon.ico', eggKey: 'components_dir', icon: 'ico' },
    ],
  },
  { kind: 'divider' },
  { kind: 'egg', name: '.gitignore',         eggKey: 'gitignore',       icon: 'git'  },
  { kind: 'egg', name: 'package.json',        eggKey: 'package_json',    icon: 'json' },
  { kind: 'egg', name: 'tsconfig.json',       eggKey: 'tsconfig',        icon: 'json' },
  { kind: 'egg', name: 'tailwind.config.ts',  eggKey: 'tailwind_config', icon: 'ts'   },
  { kind: 'egg', name: 'README.md',           eggKey: 'readme',          icon: 'md'   },
];

/* === icon renderer === */

const iconColor: Record<FileIcon, string> = {
  tsx:  'text-[#61dafb]',
  jsx:  'text-[#f0db4f]',
  ts:   'text-[#3178c6]',
  md:   'text-[#9ca3af]',
  json: 'text-[#f59e0b]',
  css:  'text-[#38bdf8]',
  pdf:  'text-[#ef4444]',
  ico:  'text-[#9ca3af]',
  git:  'text-[#f14e32]',
};

function FileIcon({ type }: { type: FileIcon }) {
  const cls = `${iconColor[type]} shrink-0`;
  if (type === 'md')   return <FileText size={14} className={cls} />;
  if (type === 'json') return <FileJson size={14} className={cls} />;
  if (type === 'ts' || type === 'tsx') return <FileType size={14} className={cls} />;
  if (type === 'git')  return <GitCommitVertical size={14} className={cls} />;
  if (type === 'ico')  return <FileImage size={14} className={cls} />;
  if (type === 'pdf')  return <FileCode2 size={14} className={`text-[#ef4444] shrink-0`} />;
  return <FileCode2 size={14} className={cls} />;
}

/* === leaf file items === */

function SidebarNavItem({
  item,
  isActive,
  depth,
  onNavigate,
}: {
  item: NavFile;
  isActive: boolean;
  depth: number;
  onNavigate?: () => void;
}) {
  const { dispatch } = useTabContext();

  const handleClick = () => {
    const tab = getTabByPath(item.path);
    if (tab) dispatch({ type: 'OPEN_TAB', tab });
    onNavigate?.();
  };

  return (
    <Link
      href={item.path}
      onClick={handleClick}
      className={`flex items-center gap-2 py-[3px] text-[13px] font-mono cursor-pointer rounded-sm transition-colors ${
        isActive
          ? 'bg-bg-editor text-text-primary'
          : 'text-text-muted hover:text-text-primary hover:bg-bg-hover'
      }`}
      style={{ paddingLeft: `${8 + depth * 12}px`, paddingRight: '8px' }}
    >
      <FileIcon type={item.icon} />
      <span className="truncate">{item.name}</span>
    </Link>
  );
}

function SidebarEggItem({
  item,
  depth,
  onEgg,
}: {
  item: EggFile;
  depth: number;
  onEgg: (key: string) => void;
}) {
  return (
    <button
      onClick={() => onEgg(item.eggKey)}
      className="flex items-center gap-2 py-[3px] text-[13px] font-mono cursor-pointer rounded-sm transition-colors text-text-muted hover:text-text-primary hover:bg-bg-hover w-full text-left"
      style={{ paddingLeft: `${8 + depth * 12}px`, paddingRight: '8px' }}
    >
      <FileIcon type={item.icon} />
      <span className="truncate">{item.name}</span>
    </button>
  );
}

function SidebarDownloadItem({
  item,
  depth,
  onEgg,
}: {
  item: DownloadFile;
  depth: number;
  onEgg: (key: string) => void;
}) {
  const handleClick = () => {
    const link = document.createElement('a');
    link.href = item.href;
    link.download = item.downloadAs;
    // detect 404
    link.onerror = () => {
      if (item.eggKey) onEgg(item.eggKey);
    };
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // fallback: check if fetch 404s
    fetch(item.href, { method: 'HEAD' }).then((r) => {
      if (!r.ok && item.eggKey) onEgg(item.eggKey);
    }).catch(() => {
      if (item.eggKey) onEgg(item.eggKey);
    });
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 py-[3px] text-[13px] font-mono cursor-pointer rounded-sm transition-colors text-[#ef4444]/80 hover:text-[#ef4444] hover:bg-bg-hover w-full text-left"
      style={{ paddingLeft: `${8 + depth * 12}px`, paddingRight: '8px' }}
      title="Download resume"
    >
      <FileIcon type={item.icon} />
      <span className="truncate">{item.name}</span>
    </button>
  );
}

/* === folder === */

function SidebarFolderNode({
  folder,
  pathname,
  depth,
  onNavigate,
  onEgg,
}: {
  folder: FolderNode;
  pathname: string;
  depth: number;
  onNavigate?: () => void;
  onEgg: (key: string) => void;
}) {
  const hasActive = (nodes: TreeNode[]): boolean =>
    nodes.some((n) => {
      if (n.kind === 'nav') return n.path === pathname;
      if (n.kind === 'folder') return hasActive(n.children);
      return false;
    });
  const [open, setOpen] = useState(folder.defaultOpen ?? hasActive(folder.children));

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 py-[3px] text-[13px] font-mono text-text-muted hover:text-text-primary w-full cursor-pointer rounded-sm hover:bg-bg-hover transition-colors"
        style={{ paddingLeft: `${8 + depth * 12}px`, paddingRight: '8px' }}
      >
        {open ? <ChevronDown size={12} className="shrink-0" /> : <ChevronRight size={12} className="shrink-0" />}
        {open
          ? <FolderOpen size={14} className="text-accent-yellow shrink-0" />
          : <Folder    size={14} className="text-accent-yellow shrink-0" />}
        <span>{folder.name}</span>
      </button>
      {open && (
        <div>
          {folder.children.map((child, i) =>
            renderNode(child, pathname, depth + 1, onNavigate, onEgg, i)
          )}
        </div>
      )}
    </div>
  );
}

function renderNode(
  node: TreeNode,
  pathname: string,
  depth: number,
  onNavigate: (() => void) | undefined,
  onEgg: (key: string) => void,
  key: number | string,
) {
  if (node.kind === 'divider') {
    return <div key={`div-${key}`} className="border-t border-border my-1 mx-2" />;
  }
  if (node.kind === 'nav') {
    return (
      <SidebarNavItem
        key={node.path}
        item={node}
        isActive={pathname === node.path}
        depth={depth}
        onNavigate={onNavigate}
      />
    );
  }
  if (node.kind === 'egg') {
    return (
      <SidebarEggItem
        key={`${node.name}-${key}`}
        item={node}
        depth={depth}
        onEgg={onEgg}
      />
    );
  }
  if (node.kind === 'download') {
    return (
      <SidebarDownloadItem
        key={node.name}
        item={node}
        depth={depth}
        onEgg={onEgg}
      />
    );
  }
  if (node.kind === 'folder') {
    return (
      <SidebarFolderNode
        key={node.name}
        folder={node}
        pathname={pathname}
        depth={depth}
        onNavigate={onNavigate}
        onEgg={onEgg}
      />
    );
  }
  return null;
}

/* === main export === */

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [eggState, setEggState] = useState<{ feature: string; message: string } | null>(null);

  const openEgg = (key: string) => {
    const message = easterEggs[key] ?? "Nothing to see here. Just vibes.";
    setEggState({ feature: key.replace(/_/g, ' '), message });
  };

  const tree = (
    <div className="flex flex-col h-full">
      {/* Explorer header */}
      <div className="px-3 py-2 text-[10px] tracking-[0.15em] uppercase text-text-muted font-mono border-b border-border shrink-0">
        Explorer
      </div>

      {/* PORTFOLIO label */}
      <div className="px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase text-text-muted/70 font-mono flex items-center gap-1.5 shrink-0">
        <ChevronDown size={10} />
        Portfolio
      </div>

      {/* File tree */}
      <nav className="flex-1 overflow-y-auto py-1 space-y-0">
        {fileTree.map((node, i) =>
          renderNode(node, pathname, 0, () => setMobileOpen(false), openEgg, i)
        )}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-1.5 left-14 z-50 p-1.5 rounded bg-bg-tab border border-border"
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
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-[260px] bg-bg-sidebar border-r border-border flex flex-col">
            <div className="flex items-center justify-between px-3 py-2 border-b border-border">
              <span className="text-xs text-text-muted font-mono">Explorer</span>
              <button onClick={() => setMobileOpen(false)} className="p-1 rounded hover:bg-border" aria-label="Close sidebar">
                <X size={14} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{tree}</div>
          </aside>
        </div>
      )}

      {/* Easter egg modal */}
      <EasterEggModal
        feature={eggState?.feature ?? ''}
        message={eggState?.message ?? ''}
        isOpen={!!eggState}
        onClose={() => setEggState(null)}
      />
    </>
  );
}
