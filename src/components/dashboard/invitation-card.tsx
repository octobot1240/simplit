import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { Building2, CheckCircle } from 'lucide-react';
import type { AgencyInvitation } from '@/types';

interface InvitationCardProps {
  invitation: AgencyInvitation;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export function InvitationCard({ invitation, onAccept, onReject }: InvitationCardProps) {
  const isPending = invitation.status === 'pending';
  
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-[var(--space-3)]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-navy)] bg-opacity-10">
            <Building2 className="h-5 w-5 text-[var(--color-navy)]" />
          </div>
          <div>
            <div className="flex items-center gap-[var(--space-2)]">
              <h3 className="text-base font-semibold">{invitation.agency_name}</h3>
              <CheckCircle className="h-4 w-4 text-[var(--color-success)]" />
            </div>
            <p className="text-sm text-[var(--color-text-muted)]">
              {formatDate(invitation.created_at)}
            </p>
          </div>
        </div>
        {!isPending && (
          <Badge variant={invitation.status === 'accepted' ? 'verified' : 'rejected'}>
            {invitation.status === 'accepted' ? 'Aceptada' : 'Rechazada'}
          </Badge>
        )}
      </div>
      
      <p className="mt-[var(--space-4)] text-[var(--color-text-light)]">
        {invitation.message}
      </p>
      
      {invitation.property_type && invitation.neighborhood && (
        <p className="mt-[var(--space-2)] text-sm text-[var(--color-text-muted)]">
          {invitation.property_type} • {invitation.neighborhood}
        </p>
      )}
      
      {isPending && (
        <div className="mt-[var(--space-6)] flex gap-[var(--space-3)]">
          <Button onClick={() => onAccept(invitation.id)} className="flex-1">
            Aceptar
          </Button>
          <Button onClick={() => onReject(invitation.id)} variant="secondary" className="flex-1">
            Rechazar
          </Button>
        </div>
      )}
    </Card>
  );
}
