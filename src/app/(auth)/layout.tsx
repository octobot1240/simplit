import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b border-[var(--color-border)] bg-white px-[var(--space-6)] py-[var(--space-4)]">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="text-xl font-semibold text-[var(--color-navy)]">
            Simplit
          </Link>
        </div>
      </nav>
      <div className="flex-1 flex items-center justify-center px-[var(--space-6)] py-[var(--space-12)]">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
