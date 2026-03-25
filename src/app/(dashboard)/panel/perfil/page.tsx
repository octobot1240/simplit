'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProfilePreview } from '@/components/dashboard/profile-preview';
import { createClient } from '@/lib/supabase/client';
import type { Profile, Document, Subscription } from '@/types';

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [profileRes, docsRes, subRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('documents').select('*').eq('user_id', user.id),
        supabase.from('subscriptions').select('*').eq('user_id', user.id).single(),
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (docsRes.data) setDocuments(docsRes.data);
      if (subRes.data) setSubscription(subRes.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  const isPremium = subscription?.plan === 'premium_monthly' || subscription?.plan === 'premium_annual';

  return (
    <div className="max-w-3xl space-y-[var(--space-8)]">
      <h1>Tu Perfil</h1>

      <ProfilePreview profile={profile!} documents={documents} />

      {profile?.profile_complete && !isPremium && (
        <div className="rounded-[var(--radius-lg)] border-2 border-[var(--color-coral)] bg-[var(--color-coral)] bg-opacity-5 p-[var(--space-6)]">
          <h3 className="mb-[var(--space-2)]">Actualiza a Premium</h3>
          <p className="mb-[var(--space-4)] text-[var(--color-text-light)]">
            Tu perfil está completo pero no es visible para las agencias. Actualiza a Premium para que las agencias puedan encontrarte.
          </p>
          <Link href="/panel/ajustes">
            <Button>Activar Premium</Button>
          </Link>
        </div>
      )}

      {isPremium && profile?.profile_visible && (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-success)] bg-[var(--color-success)] bg-opacity-5 p-[var(--space-6)]">
          <h3 className="mb-[var(--space-2)] text-[var(--color-success)]">
            Perfil visible para agencias
          </h3>
          <p className="text-[var(--color-text-light)]">
            Tu perfil está activo y las agencias pueden contactarte cuando tengan pisos disponibles que encajen con tu perfil.
          </p>
        </div>
      )}
    </div>
  );
}
