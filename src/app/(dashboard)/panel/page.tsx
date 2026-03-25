'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { ProgressRing } from '@/components/ui/progress-ring';
import { DocumentGrid } from '@/components/dashboard/document-grid';
import { createClient } from '@/lib/supabase/client';
import { calculateProfileCompletion } from '@/lib/utils';
import type { Profile, Document } from '@/types';

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [profileRes, docsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('documents').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (docsRes.data) setDocuments(docsRes.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  const completion = calculateProfileCompletion(documents);
  const today = new Date().toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-[var(--space-8)]">
      <div>
        <h1 className="mb-[var(--space-2)]">
          Hola, {profile?.full_name || 'Usuario'}
        </h1>
        <p className="text-[var(--color-text-muted)] capitalize">{today}</p>
      </div>

      <Card className="bg-gradient-to-br from-[var(--color-navy)] to-[var(--color-navy-light)] text-white border-none">
        <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-[var(--space-8)]">
          <ProgressRing progress={completion} />
          <div className="flex-1">
            <h2 className="text-white mb-[var(--space-2)]">
              Tu perfil está al {completion}%
            </h2>
            <p className="text-white/80">
              {completion === 100 
                ? '¡Perfil completo! Las agencias pueden verte ahora.' 
                : 'Sube todos tus documentos para activar tu perfil'}
            </p>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="mb-[var(--space-6)]">Tus Documentos</h2>
        <DocumentGrid documents={documents} />
      </div>
    </div>
  );
}
