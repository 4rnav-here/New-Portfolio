interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="flex flex-col items-center gap-1 px-4 py-3 border border-border rounded-sm bg-bg-tab/50 min-w-[100px]">
      <span className="text-xl font-bold text-accent-pink font-display">
        {value}
      </span>
      <span className="text-[10px] tracking-[0.2em] uppercase text-text-muted font-mono">
        {label}
      </span>
    </div>
  );
}
