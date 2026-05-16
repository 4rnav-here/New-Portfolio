'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

interface EasterEggModalProps {
  feature: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export function EasterEggModal({ feature, message, isOpen, onClose }: EasterEggModalProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[2000] w-80 bg-bg-editor border border-accent-primary shadow-xl rounded-md overflow-hidden animate-fade-in font-mono text-xs">
      <div className="flex items-center justify-between px-3 py-2 bg-bg-sidebar border-b border-border">
        <span className="text-text-muted font-bold tracking-wider uppercase text-[10px]">
          {feature}
        </span>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-border text-text-muted hover:text-text-primary transition-colors"
        >
          <X size={14} />
        </button>
      </div>
      <div className="p-4 text-text-primary leading-relaxed">
        {message}
      </div>
    </div>
  );
}
