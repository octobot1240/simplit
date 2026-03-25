'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { FileText, User, Mail, Settings } from 'lucide-react';

const navItems = [
  { href: '/panel', label: 'Mis Documentos', icon: FileText },
  { href: '/panel/perfil', label: 'Mi Perfil', icon: User },
  { href: '/panel/invitaciones', label: 'Invitaciones', icon: Mail },
  { href: '/panel/ajustes', label: 'Ajustes', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[var(--color-navy)] text-white">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b border-[var(--color-navy-light)] px-[var(--space-6)]">
          <Link href="/" className="text-xl font-semibold">
            Simplit
          </Link>
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
  );
}
