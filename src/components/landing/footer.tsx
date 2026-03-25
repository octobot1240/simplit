import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-cream-dark)] px-[var(--space-6)] py-[var(--space-12)] md:px-[var(--space-12)]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-[var(--space-6)] md:flex-row">
          <div>
            <Link href="/" className="text-xl font-semibold text-[var(--color-navy)]">
              Simplit
            </Link>
          </div>
          <nav className="flex gap-[var(--space-6)]">
            <Link href="#" className="text-[var(--color-text-light)] hover:text-[var(--color-navy)]">
              Términos
            </Link>
            <Link href="#" className="text-[var(--color-text-light)] hover:text-[var(--color-navy)]">
              Privacidad
            </Link>
            <Link href="#" className="text-[var(--color-text-light)] hover:text-[var(--color-navy)]">
              Contacto
            </Link>
          </nav>
        </div>
        <div className="mt-[var(--space-6)] text-center text-sm text-[var(--color-text-muted)]">
          Hecho en Barcelona 🏙️
        </div>
      </div>
    </footer>
  );
}
