import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Titlebar() {
  return (
    <div className="flex items-center justify-between h-9 px-3 bg-bg-tab border-b border-border select-none shrink-0">
      {/* Traffic light dots */}
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>

      {/* Title */}
      <span className="text-xs text-text-muted font-mono tracking-wide">
        arnavtrivedi : portfolio
      </span>

      {/* Theme toggle */}
      <ThemeToggle />
    </div>
  );
}
