interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'muted';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-bg-hover text-text-primary border-border',
    muted: 'bg-bg-sidebar text-text-muted border-border',
    // accent uses CSS vars directly so it adapts to every theme's badge palette
    accent: '',
  };

  if (variant === 'accent') {
    return (
      <span
        className="inline-flex items-center px-2.5 py-1 text-xs font-mono rounded border"
        style={{
          background: 'var(--badge-bg)',
          borderColor: 'var(--badge-border)',
          color: 'var(--badge-text)',
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs font-mono rounded border ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
