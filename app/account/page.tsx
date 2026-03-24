'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardNav } from '@/components/navigation/dashboard-nav'
import { createClient } from '@/lib/supabase/client'
import { Settings, CreditCard, Bell, Shield, LogOut } from 'lucide-react'

export default function AccountPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    if (!supabase) return

    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()

    if (!authUser) {
      router.push('/login')
      return
    }

    setUser(authUser)

    const { data: sub } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', authUser.id)
      .single()

    if (sub) {
      setSubscription(sub)
    }

    setLoading(false)
  }

  const handleSignOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleStripePortal = () => {
    alert('Stripe Customer Portal no está configurado aún. Necesitas configurar las variables de entorno de Stripe.')
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-navy-deep mb-2">Configuración</h1>
          <p className="text-navy-deep/70">Gestiona tu cuenta y preferencias</p>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-navy-deep/5">
          <div className="flex items-center space-x-3 mb-6">
            <Settings className="w-5 h-5 text-navy-deep" />
            <h2 className="text-xl font-serif font-bold text-navy-deep">Información de cuenta</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-deep/60 mb-1">Email</label>
              <div className="text-lg text-navy-deep">{user?.email}</div>
            </div>
            <div className="pt-4 border-t border-navy-deep/5">
              <button className="text-amber-warm hover:underline font-medium">
                Cambiar contraseña
              </button>
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-navy-deep/5">
          <div className="flex items-center space-x-3 mb-6">
            <CreditCard className="w-5 h-5 text-navy-deep" />
            <h2 className="text-xl font-serif font-bold text-navy-deep">Suscripción</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-deep/60 mb-1">
                Plan actual
              </label>
              <div className="text-lg font-semibold text-navy-deep capitalize">
                {subscription?.plan || 'Básico'}
              </div>
            </div>
            {subscription?.plan === 'premium' && subscription?.current_period_end && (
              <div>
                <label className="block text-sm font-medium text-navy-deep/60 mb-1">
                  Próxima renovación
                </label>
                <div className="text-lg text-navy-deep">
                  {new Date(subscription.current_period_end).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
              </div>
            )}
            <div className="pt-4 border-t border-navy-deep/5 space-y-3">
              {subscription?.plan === 'free' || !subscription ? (
                <a
                  href="/pricing"
                  className="inline-block px-6 py-3 bg-amber-warm text-navy-deep rounded-xl font-semibold hover:bg-amber-warm/90 transition-all"
                >
                  Actualizar a Premium
                </a>
              ) : (
                <button
                  onClick={handleStripePortal}
                  className="inline-block px-6 py-3 border-2 border-navy-deep/20 text-navy-deep rounded-xl font-semibold hover:border-amber-warm transition-all"
                >
                  Gestionar suscripción
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-navy-deep/5">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-5 h-5 text-navy-deep" />
            <h2 className="text-xl font-serif font-bold text-navy-deep">Notificaciones</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="font-medium text-navy-deep">Contactos de agencias</div>
                <div className="text-sm text-navy-deep/60">
                  Recibe un email cuando una agencia te contacte
                </div>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-amber-warm" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="font-medium text-navy-deep">Documentos verificados</div>
                <div className="text-sm text-navy-deep/60">
                  Notificación cuando un documento sea verificado
                </div>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-amber-warm" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="font-medium text-navy-deep">Novedades y actualizaciones</div>
                <div className="text-sm text-navy-deep/60">Recibe nuestro newsletter mensual</div>
              </div>
              <input type="checkbox" className="w-5 h-5 text-amber-warm" />
            </label>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-navy-deep/5">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-5 h-5 text-navy-deep" />
            <h2 className="text-xl font-serif font-bold text-navy-deep">Privacidad y datos</h2>
          </div>
          <div className="space-y-3">
            <button className="text-amber-warm hover:underline font-medium">
              Descargar mis datos
            </button>
            <div className="border-t border-navy-deep/5 pt-3">
              <button className="text-red-600 hover:underline font-medium">
                Eliminar mi cuenta
              </button>
            </div>
          </div>
        </div>

        {/* Sign Out */}
        <div className="bg-white rounded-2xl p-6 border border-navy-deep/5">
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 text-navy-deep hover:text-amber-warm transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </div>
  )
}
