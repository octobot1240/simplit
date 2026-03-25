'use client';

import { useEffect, useState } from 'react';
import { InvitationCard } from '@/components/dashboard/invitation-card';
import { createClient } from '@/lib/supabase/client';
import type { AgencyInvitation } from '@/types';

export default function InvitationsPage() {
  const [invitations, setInvitations] = useState<AgencyInvitation[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchInvitations();
  }, []);

  const fetchInvitations = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('agency_invitations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) setInvitations(data);
    setLoading(false);
  };

  const handleAccept = async (id: string) => {
    const res = await fetch(`/api/invitations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'accepted' }),
    });

    if (res.ok) {
      fetchInvitations();
    }
  };

  const handleReject = async (id: string) => {
    const res = await fetch(`/api/invitations/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'rejected' }),
    });

    if (res.ok) {
      fetchInvitations();
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="max-w-3xl space-y-[var(--space-6)]">
      <h1>Tus Invitaciones</h1>

      {invitations.length === 0 ? (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-cream-dark)] p-[var(--space-12)] text-center">
          <p className="text-[var(--color-text-muted)]">
            Aún no tienes invitaciones. Cuando una agencia tenga un piso para ti, aparecerá aquí.
          </p>
        </div>
      ) : (
        <div className="space-y-[var(--space-4)]">
          {invitations.map((invitation) => (
            <InvitationCard
              key={invitation.id}
              invitation={invitation}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
