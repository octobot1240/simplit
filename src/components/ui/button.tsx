import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-[var(--color-coral)] text-white hover:bg-[var(--color-coral-dark)] focus-visible:ring-[var(--color-coral)]':
              variant === 'primary',
            'border border-[var(--color-navy)] text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-white focus-visible:ring-[var(--color-navy)]':
              variant === 'secondary',
            'text-[var(--color-navy)] hover:bg-[var(--color-cream-dark)] focus-visible:ring-[var(--color-navy)]':
              variant === 'ghost',
          },
          {
            'rounded-[var(--radius-md)] px-[var(--space-6)] py-[var(--space-3)]':
              size === 'default',
            'rounded-[var(--radius-sm)] px-[var(--space-4)] py-[var(--space-2)] text-sm':
              size === 'sm',
            'rounded-[var(--radius-md)] px-[var(--space-8)] py-[var(--space-4)] text-lg':
              size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
