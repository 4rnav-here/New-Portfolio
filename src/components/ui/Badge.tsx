interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'muted';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-bg-tab text-text-primary border-border',
    accent: 'bg-accent-pink/10 text-accent-pink border-accent-pink/30',
    muted: 'bg-bg-sidebar text-text-muted border-border',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-mono rounded border ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
