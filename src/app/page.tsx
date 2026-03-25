import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Hero } from '@/components/landing/hero';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Testimonials } from '@/components/landing/testimonials';
import { Pricing } from '@/components/landing/pricing';
import { Footer } from '@/components/landing/footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-white/80 backdrop-blur-md px-[var(--space-6)] py-[var(--space-4)] md:px-[var(--space-12)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-[var(--color-navy)]">
            Simplit
          </Link>
          <div className="flex items-center gap-[var(--space-6)]">
            <a href="#como-funciona" className="hidden text-sm text-[var(--color-text-light)] hover:text-[var(--color-navy)] md:block">
              Cómo funciona
            </a>
            <a href="#precios" className="hidden text-sm text-[var(--color-text-light)] hover:text-[var(--color-navy)] md:block">
              Precios
            </a>
            <Link href="/iniciar-sesion" className="text-sm text-[var(--color-text-light)] hover:text-[var(--color-navy)]">
              Iniciar sesión
            </Link>
            <Link href="/registro">
              <Button size="sm">Empieza gratis</Button>
            </Link>
          </div>
        </div>
      </nav>
      
      <Hero />
      <HowItWorks />
      <Testimonials />
      <div id="precios">
        <Pricing />
      </div>
      <Footer />
    </main>
  );
}
