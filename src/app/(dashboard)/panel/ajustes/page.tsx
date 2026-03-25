'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase/client';
import { isStripeEnabled } from '@/lib/stripe';
import type { Subscription } from '@/types';

export default function SettingsPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setEmail(user.email || '');

      const { data } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) setSubscription(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleManageSubscription = async () => {
    const res = await fetch('/api/billing/portal', {
      method: 'POST',
    });

    const data = await res.json();
    if (data.success) {
      window.location.href = data.data.url;
    }
  };

  const handleUpgrade = async (priceId: string) => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json();
    if (data.success) {
      window.location.href = data.data.url;
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  const isPremium = subscription?.plan === 'premium_monthly' || subscription?.plan === 'premium_annual';

  return (
    <div className="max-w-3xl space-y-[var(--space-8)]">
      <h1>Ajustes</h1>

      <div className="space-y-[var(--space-6)]">
        <h2>Cuenta</h2>
        <Card>
          <div className="space-y-[var(--space-4)]">
            <div>
              <label className="mb-[var(--space-2)] block text-sm font-medium text-[var(--color-text-muted)]">
                Email
              </label>
              <p className="text-[var(--color-text)]">{email}</p>
            </div>
            <Button variant="secondary" size="sm">
              Cambiar contraseña
            </Button>
          </div>
        </Card>
      </div>

      <div className="space-y-[var(--space-6)]">
        <h2>Suscripción</h2>
        <Card>
          <div className="space-y-[var(--space-4)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--color-text-muted)]">Plan actual</p>
                <p className="text-lg font-semibold text-[var(--color-navy)]">
                  {isPremium ? 'Premium' : 'Básico'}
                </p>
              </div>
              <Badge variant={isPremium ? 'verified' : 'default'}>
                {subscription?.status || 'active'}
              </Badge>
            </div>

            {subscription?.current_period_end && (
              <p className="text-sm text-[var(--color-text-muted)]">
                Renovación: {new Date(subscription.current_period_end).toLocaleDateString('es-ES')}
              </p>
            )}

            {!isStripeEnabled ? (
              <div className="rounded-[var(--radius-md)] bg-[var(--color-warning)] bg-opacity-10 p-[var(--space-3)] text-sm text-[var(--color-warning)]">
                Los pagos no están configurados. Próximamente.
              </div>
            ) : isPremium ? (
              <Button onClick={handleManageSubscription} variant="secondary">
                Gestionar suscripción
              </Button>
            ) : (
              <div className="space-y-[var(--space-3)]">
                <Button
                  onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY!)}
                  className="w-full"
                >
                  Actualizar a Premium (€9,99/mes)
                </Button>
                <Button
                  onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_STRIPE_PRICE_ANNUAL!)}
                  variant="secondary"
                  className="w-full"
                >
                  Actualizar a Premium (€79,99/año)
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="space-y-[var(--space-6)]">
        <h2>Notificaciones</h2>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notificaciones por email</p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Recibe emails cuando las agencias te contacten
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" defaultChecked />
              <div className="peer h-6 w-11 rounded-full bg-[var(--color-sand)] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[var(--color-coral)] peer-checked:after:translate-x-5"></div>
            </label>
          </div>
        </Card>
      </div>

      <div className="space-y-[var(--space-6)]">
        <h2 className="text-[var(--color-error)]">Zona de peligro</h2>
        <Card className="border-[var(--color-error)]">
          <div className="space-y-[var(--space-4)]">
            <div>
              <p className="font-medium text-[var(--color-error)]">Eliminar mi cuenta</p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Esta acción no se puede deshacer
              </p>
            </div>
            <Button variant="secondary" size="sm" className="border-[var(--color-error)] text-[var(--color-error)]">
              Eliminar cuenta
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
