import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { PLAN_FEATURES } from '@/lib/constants';

export function Pricing() {
  return (
    <section className="px-[var(--space-6)] py-[var(--space-20)] md:px-[var(--space-12)]">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-[var(--space-12)] text-center">Planes simples, sin sorpresas</h2>
        <div className="grid gap-[var(--space-8)] md:grid-cols-2 md:gap-[var(--space-6)] mx-auto max-w-4xl">
          {/* Free Plan */}
          <Card>
            <div className="mb-[var(--space-6)]">
              <h3 className="mb-[var(--space-2)]">Básico</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[var(--color-navy)]">€0</span>
                <span className="text-[var(--color-text-muted)]">/mes</span>
              </div>
              <p className="mt-[var(--space-2)] text-[var(--color-text-light)]">
                Sube y verifica tus documentos
              </p>
            </div>
            <ul className="mb-[var(--space-6)] space-y-[var(--space-3)]">
              {PLAN_FEATURES.free.map((feature, index) => (
                <li key={index} className="flex items-center gap-[var(--space-2)]">
                  <Check className="h-5 w-5 text-[var(--color-success)]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/registro" className="block">
              <Button variant="secondary" className="w-full">
                Empieza gratis
              </Button>
            </Link>
          </Card>

          {/* Premium Plan */}
          <Card className="border-2 border-[var(--color-coral)] relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-coral)] text-white px-[var(--space-4)] py-[var(--space-1)] rounded-full text-xs font-medium uppercase">
              Popular
            </div>
            <div className="mb-[var(--space-6)]">
              <h3 className="mb-[var(--space-2)]">Premium</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[var(--color-navy)]">€9,99</span>
                <span className="text-[var(--color-text-muted)]">/mes</span>
              </div>
              <p className="mt-[var(--space-2)] text-[var(--color-text-light)]">
                Haz que las agencias te encuentren
              </p>
            </div>
            <ul className="mb-[var(--space-6)] space-y-[var(--space-3)]">
              {PLAN_FEATURES.premium.map((feature, index) => (
                <li key={index} className="flex items-center gap-[var(--space-2)]">
                  <Check className="h-5 w-5 text-[var(--color-success)]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/registro" className="block">
              <Button className="w-full">Activa Premium</Button>
            </Link>
            <p className="mt-[var(--space-3)] text-center text-sm text-[var(--color-text-muted)]">
              o €79,99/año (ahorra 33%)
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
