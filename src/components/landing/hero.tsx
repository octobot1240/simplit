import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[var(--color-cream)] to-[var(--color-cream-dark)] px-[var(--space-6)] py-[var(--space-24)] md:px-[var(--space-12)]">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="display mb-[var(--space-6)]">
            Deja de buscar piso.
          </h1>
          <p className="display mb-[var(--space-8)] text-[var(--color-coral)]">
            Haz que te encuentren.
          </p>
          <p className="mx-auto mb-[var(--space-8)] max-w-2xl text-lg text-[var(--color-text-light)]">
            Sube tus documentos, nuestra IA los verifica, y las agencias inmobiliarias te contactan con pisos que encajan contigo.
          </p>
          <div className="flex flex-col items-center gap-[var(--space-4)] sm:flex-row sm:justify-center">
            <Link href="/registro">
              <Button size="lg">Empieza gratis</Button>
            </Link>
            <a href="#como-funciona">
              <Button variant="ghost" size="lg">
                ¿Cómo funciona?
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
