import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-[var(--space-4)] py-[var(--space-3)] text-base transition-colors',
          'placeholder:text-[var(--color-text-muted)]',
          'focus-visible:outline-none focus-visible:border-[var(--color-coral)] focus-visible:ring-2 focus-visible:ring-[var(--color-coral)] focus-visible:ring-offset-1',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
