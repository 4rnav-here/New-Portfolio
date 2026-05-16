export function Titlebar() {
  return (
    <div className="flex items-center justify-center h-9 px-3 bg-bg-tab border-b border-border select-none shrink-0 relative">
      {/* Traffic light dots */}
      <div className="flex items-center gap-1.5 absolute left-3">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>

      {/* Title */}
      <span className="text-xs text-text-muted font-mono tracking-wide">
        arnavtrivedi : portfolio — IDE
      </span>
    </div>
  );
}
