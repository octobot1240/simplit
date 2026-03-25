import { Upload, ShieldCheck, Building2 } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Sube tus documentos',
    description: 'NIE, nóminas, contrato... todo lo que necesitas para alquilar, en un solo lugar.',
  },
  {
    icon: ShieldCheck,
    title: 'Verificación inteligente',
    description: 'Nuestra IA revisa cada documento y construye tu perfil verificado en minutos.',
  },
  {
    icon: Building2,
    title: 'Las agencias te encuentran',
    description: 'Tu perfil llega a las agencias de Barcelona. Ellas te contactan cuando tienen algo para ti.',
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="px-[var(--space-6)] py-[var(--space-20)] md:px-[var(--space-12)]">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-[var(--space-12)] text-center">Cómo funciona</h2>
        <div className="grid gap-[var(--space-8)] md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="mx-auto mb-[var(--space-6)] flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-coral)] bg-opacity-10">
                  <Icon className="h-8 w-8 text-[var(--color-coral)]" />
                </div>
                <h3 className="mb-[var(--space-3)]">{step.title}</h3>
                <p className="text-[var(--color-text-light)]">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
