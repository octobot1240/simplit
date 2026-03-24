import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardNav } from '@/components/navigation/dashboard-nav'
import { CheckCircle2, Eye, EyeOff } from 'lucide-react'

export default async function MyProfilePage() {
  const supabase = await createClient()

  if (!supabase) {
    return <div>Supabase no configurado</div>
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', user.id)

  const verifiedDocs = documents?.filter((d) => d.status === 'verificado') || []
  const verificationScore = documents && documents.length > 0
    ? Math.round((verifiedDocs.length / documents.length) * 100)
    : 0

  const verifiedTypes = new Set(verifiedDocs.map((d) => d.type))

  return (
    <div className="min-h-screen bg-offwhite">
      <DashboardNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-serif font-bold text-navy-deep">
              Así te ven las agencias
            </h1>
            <Eye className="w-6 h-6 text-navy-deep/40" />
          </div>
          <p className="text-navy-deep/70">
            Esta es la información que las agencias inmobiliarias ven de tu perfil.
          </p>
        </div>

        {/* Visibility Toggle */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-navy-deep/5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-navy-deep mb-1">Visibilidad del perfil</h3>
              <p className="text-sm text-navy-deep/60">
                {profile?.profile_visible
                  ? 'Tu perfil es visible para agencias'
                  : 'Tu perfil está oculto'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {profile?.profile_visible ? (
                <Eye className="w-5 h-5 text-green-600" />
              ) : (
                <EyeOff className="w-5 h-5 text-gray-400" />
              )}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  profile?.profile_visible
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {profile?.profile_visible ? 'Visible' : 'Oculto'}
              </span>
            </div>
          </div>
        </div>

        {/* Verification Score */}
        <div className="bg-amber-warm rounded-2xl p-8 mb-6 text-center">
          <div className="text-6xl font-serif font-bold text-navy-deep mb-2">
            {verificationScore}%
          </div>
          <div className="text-xl font-medium text-navy-deep">Nivel de verificación</div>
        </div>

        {/* Verification Badges */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-navy-deep/5">
          <h3 className="text-xl font-serif font-bold text-navy-deep mb-4">
            Documentos verificados
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { id: 'nie', label: 'NIE / TIE' },
              { id: 'nominas', label: 'Nóminas' },
              { id: 'contrato', label: 'Contrato de trabajo' },
              { id: 'extractos', label: 'Extractos bancarios' },
              { id: 'padron', label: 'Padrón' },
              { id: 'pasaporte', label: 'Pasaporte / DNI' },
              { id: 'irpf', label: 'Declaración IRPF' },
            ].map((doc) => {
              const isVerified = verifiedTypes.has(doc.id)
              return (
                <div
                  key={doc.id}
                  className={`flex items-center space-x-3 p-4 rounded-xl border-2 ${
                    isVerified
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  {isVerified ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                  )}
                  <span
                    className={`font-medium ${
                      isVerified ? 'text-green-900' : 'text-gray-500'
                    }`}
                  >
                    {doc.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Profile Summary */}
        <div className="bg-white rounded-2xl p-6 border border-navy-deep/5">
          <h3 className="text-xl font-serif font-bold text-navy-deep mb-4">
            Resumen del perfil
          </h3>
          <div className="space-y-4">
            {profile?.preferred_neighborhoods && profile.preferred_neighborhoods.length > 0 && (
              <div>
                <div className="text-sm font-medium text-navy-deep/60 mb-1">
                  Barrios preferidos
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.preferred_neighborhoods.map((n: string) => (
                    <span
                      key={n}
                      className="px-3 py-1 bg-amber-warm/20 text-navy-deep rounded-full text-sm"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profile?.budget_min && profile?.budget_max && (
              <div>
                <div className="text-sm font-medium text-navy-deep/60 mb-1">
                  Presupuesto mensual
                </div>
                <div className="text-lg font-semibold text-navy-deep">
                  €{profile.budget_min} - €{profile.budget_max}
                </div>
              </div>
            )}

            {profile?.property_type && (
              <div>
                <div className="text-sm font-medium text-navy-deep/60 mb-1">
                  Tipo de vivienda
                </div>
                <div className="text-lg font-semibold text-navy-deep capitalize">
                  {profile.property_type}
                </div>
              </div>
            )}

            {profile?.employment_status && (
              <div>
                <div className="text-sm font-medium text-navy-deep/60 mb-1">
                  Situación laboral
                </div>
                <div className="text-lg font-semibold text-navy-deep capitalize">
                  {profile.employment_status}
                </div>
              </div>
            )}

            {profile?.occupants && (
              <div>
                <div className="text-sm font-medium text-navy-deep/60 mb-1">Ocupantes</div>
                <div className="text-lg font-semibold text-navy-deep">
                  {profile.occupants} {profile.occupants === 1 ? 'persona' : 'personas'}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-900">
            🔒 Las agencias nunca ven tus documentos originales. Solo ven estos badges de
            verificación y tu resumen de perfil.
          </p>
        </div>
      </div>
    </div>
  )
}
