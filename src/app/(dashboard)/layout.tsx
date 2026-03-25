'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/ui/sidebar';
import { createClient } from '@/lib/supabase/client';
import { User, LogOut, ChevronDown } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      {/* Main content: full width on mobile, offset by sidebar on md+ */}
      <div className="flex-1 w-full md:ml-64">
        <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-white px-[var(--space-4)] py-[var(--space-4)] md:px-[var(--space-8)]">
          <div className="flex items-center justify-between">
            {/* Spacer for mobile hamburger button */}
            <div className="w-10 md:hidden" />
            <h2 className="text-lg font-semibold text-[var(--color-navy)]">Panel</h2>
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-[var(--space-2)] rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-[var(--space-3)] py-[var(--space-2)] hover:bg-[var(--color-cream-dark)] transition-colors"
              >
                <User className="h-5 w-5" />
                <span className="hidden text-sm sm:inline">{user?.email?.split('@')[0] || 'Usuario'}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-lg)] py-[var(--space-2)]">
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-[var(--space-2)] px-[var(--space-4)] py-[var(--space-2)] text-left text-sm hover:bg-[var(--color-cream-dark)] transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="p-[var(--space-4)] md:p-[var(--space-8)]">
          {children}
        </main>
      </div>
    </div>
  );
}
