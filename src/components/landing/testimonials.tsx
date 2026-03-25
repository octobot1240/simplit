import { Card } from '@/components/ui/card';

const testimonials = [
  {
    quote: 'Llevaba 3 meses buscando piso. Con Simplit, una agencia me contactó en 5 días.',
    author: 'María L.',
    location: 'Eixample',
  },
  {
    quote: 'Subí mis documentos en 10 minutos. Sin estrés, sin colas.',
    author: 'Carlos R.',
    location: 'Gràcia',
  },
  {
    quote: 'Por fin un servicio que entiende lo frustrante que es alquilar en Barcelona.',
    author: 'Ana P.',
    location: 'Sant Martí',
  },
];

export function Testimonials() {
  return (
    <section className="bg-[var(--color-cream-dark)] px-[var(--space-6)] py-[var(--space-20)] md:px-[var(--space-12)]">
      <div className="mx-auto max-w-6xl">
        <p className="mb-[var(--space-3)] text-center text-sm text-[var(--color-text-muted)]">
          Más de 200 agencias en Barcelona ya usan Simplit
        </p>
        <div className="mt-[var(--space-12)] grid gap-[var(--space-6)] md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <p className="mb-[var(--space-4)] text-[var(--color-text-light)] italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <p className="font-medium text-[var(--color-navy)]">
                — {testimonial.author}, {testimonial.location}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
