import { DocumentCard } from './document-card';
import { DOC_TYPES, NOMINA_COUNT } from '@/lib/constants';
import type { Document } from '@/types';

interface DocumentGridProps {
  documents: Document[];
}

export function DocumentGrid({ documents }: DocumentGridProps) {
  const docsByType = {
    nie_dni: documents.filter(d => d.doc_type === 'nie_dni'),
    nomina: documents.filter(d => d.doc_type === 'nomina'),
    contrato_trabajo: documents.filter(d => d.doc_type === 'contrato_trabajo'),
    declaracion_renta: documents.filter(d => d.doc_type === 'declaracion_renta'),
  };

  return (
    <div className="grid gap-[var(--space-6)] md:grid-cols-2">
      <DocumentCard
        docType="nie_dni"
        label={DOC_TYPES.nie_dni.label}
        documents={docsByType.nie_dni}
      />
      <DocumentCard
        docType="nomina"
        label={DOC_TYPES.nomina.label}
        documents={docsByType.nomina}
        requiredCount={NOMINA_COUNT}
      />
      <DocumentCard
        docType="contrato_trabajo"
        label={DOC_TYPES.contrato_trabajo.label}
        documents={docsByType.contrato_trabajo}
      />
      <DocumentCard
        docType="declaracion_renta"
        label={DOC_TYPES.declaracion_renta.label}
        documents={docsByType.declaracion_renta}
      />
    </div>
  );
}
