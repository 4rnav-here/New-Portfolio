'use client';

import { useState, useEffect, useRef } from 'react';
import { Palette } from 'lucide-react';

interface ThemeOption {
  key: string;
  name: string;
  category: 'dark' | 'light';
  swatches: [string, string, string];
  tagline: string;
}

const THEMES: ThemeOption[] = [
  {
    key: 'catppuccin-mocha',
    name: 'Catppuccin Mocha',
    tagline: 'The arch way — cozy pastels',
    category: 'dark',
    swatches: ['#1e1e2e', '#cba6f7', '#89b4fa'],
  },
  {
    key: 'midnight-void',
    name: 'Midnight Void',
    tagline: 'The original darkness',
    category: 'dark',
    swatches: ['#0d0d0d', '#7c3aed', '#2e7de9'],
  },
  {
    key: 'matcha-earthy',
    name: 'Matcha Earthy',
    tagline: 'Forest floor after rain',
    category: 'dark',
    swatches: ['#1c2016', '#8aad6b', '#d4a96a'],
  },
  {
    key: 'catppuccin-latte',
    name: 'Catppuccin Latte',
    tagline: 'Morning light in Kyoto',
    category: 'light',
    swatches: ['#eff1f5', '#8839ef', '#1e66f5'],
  },
  {
    key: 'matcha-parchment',
    name: 'Matcha Parchment',
    tagline: 'Handwritten on rice paper',
    category: 'light',
    swatches: ['#f4f1e8', '#4a7c3f', '#8d6534'],
  },
];

export type ThemeKey = typeof THEMES[number]['key'];

export function ThemeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string>('catppuccin-mocha');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme');
    const valid = THEMES.map((t) => t.key);
    const initial = (saved && valid.includes(saved)) ? saved : 'catppuccin-mocha';
    setCurrentTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectTheme = (key: string) => {
    setCurrentTheme(key);
    document.documentElement.setAttribute('data-theme', key);
    localStorage.setItem('portfolio-theme', key);
    setIsOpen(false);
  };

  const activeTheme = THEMES.find((t) => t.key === currentTheme);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2 hover:bg-white/10 rounded transition-colors cursor-pointer outline-none"
        title="Change Theme"
      >
        <Palette size={11} />
        <span>{activeTheme?.name ?? 'Theme'}</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-64 bg-bg-editor border border-border shadow-2xl rounded overflow-hidden z-[1000] font-mono text-xs">
          <div className="px-3 py-2 bg-bg-sidebar border-b border-border text-text-muted font-bold text-[10px] tracking-wider uppercase">
            Dark Themes
          </div>
          {THEMES.filter((t) => t.category === 'dark').map((theme) => (
            <ThemeItem
              key={theme.key}
              theme={theme}
              isActive={currentTheme === theme.key}
              onClick={() => selectTheme(theme.key)}
            />
          ))}

          <div className="px-3 py-2 bg-bg-sidebar border-y border-border text-text-muted font-bold text-[10px] tracking-wider uppercase">
            Light Themes
          </div>
          {THEMES.filter((t) => t.category === 'light').map((theme) => (
            <ThemeItem
              key={theme.key}
              theme={theme}
              isActive={currentTheme === theme.key}
              onClick={() => selectTheme(theme.key)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ThemeItem({
  theme,
  isActive,
  onClick,
}: {
  theme: ThemeOption;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-bg-hover transition-colors border-l-2 ${
        isActive
          ? 'border-accent-primary bg-bg-hover/50 text-text-primary'
          : 'border-transparent text-text-secondary'
      }`}
    >
      <div className="flex flex-col gap-0.5">
        <span className={isActive ? 'text-text-primary font-medium' : 'text-text-secondary'}>
          {theme.name}
        </span>
        <span className="text-[9px] text-text-muted italic">{theme.tagline}</span>
      </div>
      <div className="flex gap-1 shrink-0">
        {theme.swatches.map((color, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full border border-black/20 shadow-sm"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </button>
  );
}
