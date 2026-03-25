import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Document, DocType } from '@/types';
import { REQUIRED_DOCS, NOMINA_COUNT } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateProfileCompletion(documents: Document[]): number {
  const requiredCount = REQUIRED_DOCS.length + 1; // +1 for the 3 nominas counted as one requirement
  
  const hasNieDni = documents.some(d => d.doc_type === 'nie_dni' && d.status === 'verified');
  const hasContrato = documents.some(d => d.doc_type === 'contrato_trabajo' && d.status === 'verified');
  const hasDeclaracion = documents.some(d => d.doc_type === 'declaracion_renta' && d.status === 'verified');
  const nominasCount = documents.filter(d => d.doc_type === 'nomina' && d.status === 'verified').length;
  const hasNominas = nominasCount >= NOMINA_COUNT;
  
  let completed = 0;
  if (hasNieDni) completed++;
  if (hasContrato) completed++;
  if (hasDeclaracion) completed++;
  if (hasNominas) completed++;
  
  return Math.round((completed / requiredCount) * 100);
}

export function getDocumentCount(documents: Document[], docType: DocType): number {
  return documents.filter(d => d.doc_type === docType).length;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}
