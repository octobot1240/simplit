import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import type { Profile, Document } from '@/types';

interface ProfilePreviewProps {
  profile: Profile;
  documents: Document[];
}

export function ProfilePreview({ profile, documents }: ProfilePreviewProps) {
  const verifiedCount = documents.filter(d => d.status === 'verified').length;
  
  return (
    <Card>
      <div className="space-y-[var(--space-4)]">
        <div className="flex items-center justify-between">
          <h3>Vista previa del perfil</h3>
          {profile.profile_visible ? (
            <Badge variant="verified">Perfil activo</Badge>
          ) : profile.profile_complete ? (
            <Badge variant="pending">Perfil completo</Badge>
          ) : (
            <Badge variant="default">Perfil incompleto</Badge>
          )}
        </div>
        
        <p className="text-sm text-[var(--color-text-muted)]">
          Esto es lo que ven las agencias:
        </p>
        
        <div className="space-y-[var(--space-3)] border-t border-[var(--color-border)] pt-[var(--space-4)]">
          <div className="flex items-center gap-[var(--space-2)]">
            <CheckCircle className="h-4 w-4 text-[var(--color-success)]" />
            <span className="text-sm">
              <strong>Documentos verificados:</strong> {verifiedCount}/4
            </span>
          </div>
          
          {profile.income_range && (
            <div className="flex items-center gap-[var(--space-2)]">
              <CheckCircle className="h-4 w-4 text-[var(--color-success)]" />
              <span className="text-sm">
                <strong>Rango de ingresos:</strong> {profile.income_range}
              </span>
            </div>
          )}
          
          {profile.employment_type && (
            <div className="flex items-center gap-[var(--space-2)]">
              <CheckCircle className="h-4 w-4 text-[var(--color-success)]" />
              <span className="text-sm">
                <strong>Tipo de empleo:</strong> {profile.employment_type}
              </span>
            </div>
          )}
          
          {profile.employment_duration && (
            <div className="flex items-center gap-[var(--space-2)]">
              <CheckCircle className="h-4 w-4 text-[var(--color-success)]" />
              <span className="text-sm">
                <strong>Antigüedad:</strong> {profile.employment_duration}
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
