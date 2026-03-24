'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardNav } from '@/components/navigation/dashboard-nav'
import { createClient } from '@/lib/supabase/client'
import { posthog } from '@/lib/posthog'
import { Upload, FileText, CheckCircle2, Clock, AlertCircle, X } from 'lucide-react'

const DOCUMENT_TYPES = [
  { id: 'nie', label: 'NIE / TIE', description: 'Número de Identidad de Extranjero' },
  { id: 'nominas', label: 'Nóminas', description: 'Últimas 3 nóminas' },
  { id: 'contrato', label: 'Contrato de trabajo', description: 'Contrato laboral vigente' },
  { id: 'extractos', label: 'Extractos bancarios', description: 'Últimos 3 meses' },
  { id: 'padron', label: 'Padrón', description: 'Certificado de empadronamiento' },
  { id: 'pasaporte', label: 'Pasaporte / DNI', description: 'Documento de identidad' },
  { id: 'irpf', label: 'Declaración IRPF', description: 'Última declaración de la renta' },
]

const STATUS_CONFIG = {
  pendiente: { label: 'Pendiente', icon: Clock, color: 'text-gray-500' },
  procesando: { label: 'Procesando', icon: Clock, color: 'text-blue-600' },
  verificado: { label: 'Verificado', icon: CheckCircle2, color: 'text-green-600' },
  necesita_atencion: { label: 'Necesita atención', icon: AlertCircle, color: 'text-red-600' },
}

export default function DocumentsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [documents, setDocuments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedType, setSelectedType] = useState('')

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    if (!supabase) return

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const { data } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (data) {
      setDocuments(data)
    }

    setLoading(false)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !selectedType || !supabase) return

    const file = e.target.files[0]
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png']

    if (file.size > maxSize) {
      alert('El archivo es demasiado grande. Máximo 10MB.')
      return
    }

    if (!allowedTypes.includes(file.type)) {
      alert('Tipo de archivo no válido. Solo PDF, JPG, PNG.')
      return
    }

    setUploading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const filePath = `${user.id}/${selectedType}/${Date.now()}-${file.name}`

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file)

    if (uploadError) {
      console.error('Upload error:', uploadError)
      alert('Error al subir el archivo')
      setUploading(false)
      return
    }

    const { error: dbError } = await supabase.from('documents').insert({
      user_id: user.id,
      type: selectedType,
      file_path: filePath,
      file_name: file.name,
      file_size: file.size,
      status: 'pendiente',
    })

    if (!dbError) {
      posthog.capture('document_uploaded', { type: selectedType })
      await loadDocuments()
      setSelectedType('')
    }

    setUploading(false)
  }

  const getDocumentsByType = (type: string) => {
    return documents.filter((doc) => doc.type === type)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-offwhite">
        <DashboardNav />
        <div className="flex items-center justify-center py-20">
          <div className="text-navy-deep/60">Cargando...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <DashboardNav />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-navy-deep mb-2">
            Centro de documentos
          </h1>
          <p className="text-navy-deep/70 mb-4">
            Sube tus documentos para verificar tu perfil con IA.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-900">
              🔒 <strong>Privacidad:</strong> Tus documentos están encriptados. Las agencias solo
              ven tus badges de verificación, nunca tus documentos originales.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {DOCUMENT_TYPES.map((docType) => {
            const userDocs = getDocumentsByType(docType.id)
            const hasVerified = userDocs.some((d) => d.status === 'verificado')

            return (
              <div
                key={docType.id}
                className="bg-white rounded-2xl border border-navy-deep/5 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-lg font-semibold text-navy-deep">{docType.label}</h3>
                        {hasVerified && (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <p className="text-sm text-navy-deep/60">{docType.description}</p>
                    </div>

                    {selectedType === docType.id ? (
                      <div className="flex items-center space-x-2">
                        <label className="cursor-pointer px-4 py-2 bg-amber-warm text-navy-deep rounded-xl font-medium hover:bg-amber-warm/90 transition-all">
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleFileUpload}
                            disabled={uploading}
                          />
                          {uploading ? 'Subiendo...' : 'Seleccionar archivo'}
                        </label>
                        <button
                          onClick={() => setSelectedType('')}
                          className="p-2 hover:bg-navy-deep/5 rounded-lg"
                        >
                          <X className="w-5 h-5 text-navy-deep" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedType(docType.id)}
                        className="flex items-center space-x-2 px-4 py-2 border-2 border-navy-deep/20 text-navy-deep rounded-xl font-medium hover:border-amber-warm transition-all"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Subir</span>
                      </button>
                    )}
                  </div>

                  {userDocs.length > 0 && (
                    <div className="space-y-2 mt-4 pt-4 border-t border-navy-deep/5">
                      {userDocs.map((doc) => {
                        const StatusIcon = STATUS_CONFIG[doc.status as keyof typeof STATUS_CONFIG]
                          ?.icon || FileText
                        const statusColor = STATUS_CONFIG[doc.status as keyof typeof STATUS_CONFIG]
                          ?.color || 'text-gray-500'
                        const statusLabel = STATUS_CONFIG[doc.status as keyof typeof STATUS_CONFIG]
                          ?.label || doc.status

                        return (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between p-3 bg-navy-deep/5 rounded-xl"
                          >
                            <div className="flex items-center space-x-3 flex-1">
                              <FileText className="w-5 h-5 text-navy-deep/40" />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-navy-deep truncate">
                                  {doc.file_name}
                                </div>
                                <div className="text-xs text-navy-deep/60">
                                  {new Date(doc.created_at).toLocaleDateString('es-ES')}
                                </div>
                              </div>
                            </div>
                            <div className={`flex items-center space-x-2 ${statusColor}`}>
                              <StatusIcon className="w-4 h-4" />
                              <span className="text-sm font-medium">{statusLabel}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-semibold text-navy-deep mb-2">
            Formatos aceptados
          </h3>
          <p className="text-sm text-navy-deep/70">
            PDF, JPG, PNG • Máximo 10MB por archivo
          </p>
        </div>
      </div>
    </div>
  )
}
