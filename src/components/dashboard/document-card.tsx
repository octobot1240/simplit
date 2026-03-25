import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { FileText, Upload } from 'lucide-react';
import type { Document, DocStatus } from '@/types';
import Link from 'next/link';

interface DocumentCardProps {
  docType: string;
  label: string;
  documents: Document[];
  requiredCount?: number;
}

const statusVariants: Record<DocStatus, 'verified' | 'pending' | 'rejected'> = {
  verified: 'verified',
  pending: 'pending',
  rejected: 'rejected',
};

const statusLabels: Record<DocStatus, string> = {
  verified: 'Verificado',
  pending: 'Pendiente',
  rejected: 'Rechazado',
};

export function DocumentCard({ docType, label, documents, requiredCount = 1 }: DocumentCardProps) {
  const currentCount = documents.length;
  const hasDocuments = currentCount > 0;
  const latestDoc = hasDocuments ? documents[0] : null;

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-[var(--space-3)]">
          <FileText className="h-6 w-6 text-[var(--color-navy)]" />
          <div>
            <h3 className="text-base">{label}</h3>
            {requiredCount > 1 && (
              <p className="text-sm text-[var(--color-text-muted)]">
                {currentCount}/{requiredCount}
              </p>
            )}
          </div>
        </div>
        {latestDoc ? (
          <Badge variant={statusVariants[latestDoc.status]}>
            {statusLabels[latestDoc.status]}
          </Badge>
        ) : (
          <Badge variant="default">Sin subir</Badge>
        )}
      </div>
      
      {latestDoc ? (
        <div className="mt-[var(--space-4)] space-y-[var(--space-2)]">
          <p className="text-sm text-[var(--color-text-light)]">
            Subido el {formatDate(latestDoc.created_at)}
          </p>
          {latestDoc.status === 'rejected' && latestDoc.rejection_reason && (
            <p className="text-sm text-[var(--color-error)]">
              Motivo: {latestDoc.rejection_reason}
            </p>
          )}
        </div>
      ) : (
        <div className="mt-[var(--space-4)]">
          <p className="text-sm text-[var(--color-text-muted)] mb-[var(--space-3)]">
            Aún no has subido este documento
          </p>
        </div>
      )}
      
      <Link href={`/panel/subir?type=${docType}`} className="mt-[var(--space-4)] block">
        <Button variant="ghost" size="sm" className="w-full">
          <Upload className="mr-2 h-4 w-4" />
          {hasDocuments ? 'Subir nuevo' : 'Subir documento'}
        </Button>
      </Link>
    </Card>
  );
}
