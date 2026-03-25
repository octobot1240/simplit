'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { FileText, User, Mail, Settings, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { href: '/panel', label: 'Mis Documentos', icon: FileText },
  { href: '/panel/perfil', label: 'Mi Perfil', icon: User },
  { href: '/panel/invitaciones', label: 'Invitaciones', icon: Mail },
  { href: '/panel/ajustes', label: 'Ajustes', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-[var(--space-4)] top-[var(--space-4)] z-50 flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-navy)] text-white shadow-[var(--shadow-md)] md:hidden"
        aria-label="Abrir menú"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-64 bg-[var(--color-navy)] text-white transition-transform duration-200',
          'md:translate-x-0 md:z-40',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-[var(--color-navy-light)] px-[var(--space-6)]">
            <Link href="/" className="text-xl font-semibold">
              Simplit
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] hover:bg-[var(--color-navy-light)] md:hidden"
              aria-label="Cerrar menú"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-[var(--space-3)] py-[var(--space-6)]">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-[var(--space-3)] rounded-[var(--radius-md)] px-[var(--space-4)] py-[var(--space-3)] text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[var(--color-navy-light)] border-l-4 border-[var(--color-coral)]'
                      : 'hover:bg-[var(--color-navy-light)]'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
