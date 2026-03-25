import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'verified' | 'pending' | 'rejected' | 'default';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-[var(--radius-full)] px-[var(--space-3)] py-[var(--space-1)] text-xs font-medium uppercase',
        {
          'bg-[var(--color-success)] bg-opacity-10 text-[var(--color-success)]':
            variant === 'verified',
          'bg-[var(--color-warning)] bg-opacity-10 text-[var(--color-warning)]':
            variant === 'pending',
          'bg-[var(--color-error)] bg-opacity-10 text-[var(--color-error)]':
            variant === 'rejected',
          'bg-[var(--color-sand)] text-[var(--color-text-muted)]':
            variant === 'default',
        },
        className
      )}
      {...props}
    />
  );
}
