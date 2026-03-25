import type { DocType } from '@/types';

export const DOC_TYPES: Record<DocType, { label: string; description: string }> = {
  nie_dni: {
    label: 'NIE/DNI',
    description: 'Número de Identidad de Extranjero o DNI',
  },
  nomina: {
    label: 'Nóminas',
    description: 'Últimas 3 nóminas',
  },
  contrato_trabajo: {
    label: 'Contrato de trabajo',
    description: 'Contrato laboral vigente',
  },
  declaracion_renta: {
    label: 'Declaración de la renta',
    description: 'Última declaración de la renta',
  },
};

export const PLAN_FEATURES = {
  free: [
    'Upload ilimitado',
    'Verificación IA',
    'Perfil básico',
  ],
  premium: [
    'Todo lo del plan Básico',
    'Perfil visible para agencias',
    'Notificaciones de invitaciones',
    'Prioridad en el matching',
    'Soporte prioritario',
  ],
};

export const REQUIRED_DOCS: DocType[] = ['nie_dni', 'contrato_trabajo', 'declaracion_renta'];
export const NOMINA_COUNT = 3;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
