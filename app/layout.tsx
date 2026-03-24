import type { Metadata } from 'next'
import './globals.css'
import { PostHogProvider } from '@/components/providers/posthog-provider'

export const metadata: Metadata = {
  title: 'Simplit — Deja de buscar piso. Haz que te encuentren.',
  description:
    'Verifica tus documentos de alquiler con IA y deja que las agencias inmobiliarias de Barcelona te contacten. Procesamiento inteligente de NIE, nóminas, contratos y más.',
  keywords:
    'alquiler Barcelona, documentos alquiler, verificación documentos, agencias inmobiliarias, piso Barcelona',
  openGraph: {
    title: 'Simplit — Deja de buscar piso. Haz que te encuentren.',
    description:
      'Verifica tus documentos de alquiler con IA y deja que las agencias inmobiliarias de Barcelona te contacten.',
    type: 'website',
    locale: 'es_ES',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  )
}
