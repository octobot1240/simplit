import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardNav } from '@/components/navigation/dashboard-nav'
import Link from 'next/link'
import { FileText, Upload, CheckCircle2, Clock, AlertCircle } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()

  if (!supabase) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg">
          <h1 className="text-2xl font-serif font-bold text-navy-deep mb-4">
            Configuración necesaria
          </h1>
          <p className="text-navy-deep/70">
            Supabase no está configurado. Por favor, añade las variables de entorno necesarias.
          </p>
        </div>
      </div>
    )
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Fetch documents
  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // Fetch agency contacts
  const { data: contacts } = await supabase
    .from('agency_contacts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const profileCompletion = profile?.profile_completion || 0
  const totalDocs = documents?.length || 0
  const verifiedDocs = documents?.filter((d) => d.status === 'verificado').length || 0
  const pendingContacts = contacts?.filter((c) => c.status === 'pending').length || 0

  return (
    <div className="min-h-screen bg-offwhite">
      <DashboardNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-navy-deep mb-2">
            ¡Hola de nuevo! 👋
          </h1>
          <p className="text-navy-deep/70">
            Aquí tienes un resumen de tu progreso y actividad reciente.
          </p>
        </div>

        {/* Profile Completion */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-navy-deep/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy-deep">Perfil completado</h3>
              <div className="text-2xl font-serif font-bold text-amber-warm">
                {profileCompletion}%
              </div>
            </div>
            <div className="w-full bg-navy-deep/10 rounded-full h-3 mb-3">
              <div
                className="bg-amber-warm h-3 rounded-full transition-all duration-500"
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
            {profileCompletion < 100 && (
              <Link
                href="/profile"
                className="text-sm text-amber-warm hover:underline font-medium"
              >
                Completa tu perfil →
              </Link>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-navy-deep/5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-navy-deep">Documentos</h3>
              <FileText className="w-5 h-5 text-navy-deep/40" />
            </div>
            <div className="text-3xl font-serif font-bold text-navy-deep mb-1">
              {verifiedDocs} / {totalDocs}
            </div>
            <p className="text-sm text-navy-deep/70">verificados</p>
            <Link
              href="/documents"
              className="inline-block mt-3 text-sm text-amber-warm hover:underline font-medium"
            >
              Ver documentos →
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-navy-deep/5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-navy-deep">Contactos de agencias</h3>
              <AlertCircle className="w-5 h-5 text-navy-deep/40" />
            </div>
            <div className="text-3xl font-serif font-bold text-navy-deep mb-1">
              {pendingContacts}
            </div>
            <p className="text-sm text-navy-deep/70">pendientes</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-serif font-bold text-navy-deep mb-4">Acciones rápidas</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/profile"
              className="bg-amber-warm rounded-2xl p-6 hover:bg-amber-warm/90 transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-navy-deep/10 rounded-xl flex items-center justify-center group-hover:bg-navy-deep/20 transition-all">
                  <CheckCircle2 className="w-6 h-6 text-navy-deep" />
                </div>
                <div>
                  <div className="font-semibold text-navy-deep">Completa tu perfil</div>
                  <div className="text-sm text-navy-deep/70">Aumenta tu visibilidad</div>
                </div>
              </div>
            </Link>

            <Link
              href="/documents"
              className="bg-white border-2 border-navy-deep/10 rounded-2xl p-6 hover:border-amber-warm transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-warm/10 rounded-xl flex items-center justify-center group-hover:bg-amber-warm/20 transition-all">
                  <Upload className="w-6 h-6 text-amber-warm" />
                </div>
                <div>
                  <div className="font-semibold text-navy-deep">Sube documentos</div>
                  <div className="text-sm text-navy-deep/70">Verifica tu perfil</div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-serif font-bold text-navy-deep mb-4">Actividad reciente</h2>
          <div className="bg-white rounded-2xl border border-navy-deep/5 divide-y divide-navy-deep/5">
            {contacts && contacts.length > 0 ? (
              contacts.map((contact) => (
                <div key={contact.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="font-semibold text-navy-deep">{contact.agency_name}</div>
                        {contact.status === 'pending' && (
                          <span className="px-2 py-0.5 bg-amber-warm/20 text-amber-warm text-xs font-medium rounded-full">
                            Nuevo
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-navy-deep/70 mb-2">
                        {contact.neighborhood} • {contact.property_type} • {contact.budget_range}
                      </p>
                      {contact.message && (
                        <p className="text-sm text-navy-deep/80 line-clamp-2">
                          {contact.message}
                        </p>
                      )}
                    </div>
                    <div className="text-xs text-navy-deep/60 ml-4">
                      {new Date(contact.created_at).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <Clock className="w-12 h-12 text-navy-deep/20 mx-auto mb-3" />
                <p className="text-navy-deep/60">
                  Aún no tienes contactos de agencias. Completa tu perfil y sube tus documentos
                  para aumentar tu visibilidad.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
