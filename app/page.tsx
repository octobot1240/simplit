import Link from 'next/link'
import { Navbar } from '@/components/navigation/navbar'
import { Upload, CheckCircle2, Users, FileCheck, Shield, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-offwhite">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-navy-deep mb-6 leading-tight">
              Deja de buscar piso. Haz que te encuentren.
            </h1>
            <p className="text-xl sm:text-2xl text-navy-deep/70 mb-10 leading-relaxed">
              Sube tus documentos, verifica tu perfil con IA, y deja que las agencias
              inmobiliarias de Barcelona vengan a ti.
            </p>
            <Link
              href="/login"
              className="inline-block px-8 py-4 bg-amber-warm text-navy-deep text-lg font-semibold rounded-2xl hover:bg-amber-warm/90 transition-all shadow-lg hover:shadow-xl"
            >
              Empezar ahora
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-navy-deep/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-navy-deep/80 text-lg max-w-3xl mx-auto leading-relaxed">
            En Barcelona, un piso recibe +100 solicitudes en 10 minutos. Con Simplit, las
            agencias te buscan a ti.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-navy-deep text-center mb-16">
            Cómo funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-warm rounded-2xl mb-6">
                <Upload className="w-8 h-8 text-navy-deep" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-navy-deep mb-4">
                Paso 1: Sube tus documentos
              </h3>
              <p className="text-navy-deep/70 text-lg leading-relaxed">
                NIE, nóminas, contrato de trabajo, extractos bancarios. Todo en un solo lugar.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-warm rounded-2xl mb-6">
                <CheckCircle2 className="w-8 h-8 text-navy-deep" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-navy-deep mb-4">
                Paso 2: Nuestra IA los verifica
              </h3>
              <p className="text-navy-deep/70 text-lg leading-relaxed">
                Procesamiento inteligente, perfil verificado. Las agencias ven tus badges de
                confianza.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-warm rounded-2xl mb-6">
                <Users className="w-8 h-8 text-navy-deep" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-navy-deep mb-4">
                Paso 3: Las agencias te contactan
              </h3>
              <p className="text-navy-deep/70 text-lg leading-relaxed">
                Tu perfil llega a las mejores agencias. Ellas vienen a ti cuando tienen un piso
                que encaja.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-navy-deep text-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-serif font-bold mb-2">2,847</div>
              <div className="text-offwhite/70 text-lg">Documentos procesados</div>
            </div>
            <div>
              <div className="text-5xl font-serif font-bold mb-2">1,203</div>
              <div className="text-offwhite/70 text-lg">Perfiles verificados</div>
            </div>
            <div>
              <div className="text-5xl font-serif font-bold mb-2">47</div>
              <div className="text-offwhite/70 text-lg">Agencias conectadas</div>
            </div>
          </div>
        </div>
      </section>

      {/* For Agencies */}
      <section className="py-20 sm:py-32 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-navy-deep mb-6">
              ¿Eres una agencia inmobiliaria?
            </h2>
            <p className="text-xl text-navy-deep/70 mb-10 leading-relaxed">
              Accede a perfiles verificados y ahorra horas de filtrado manual. Encuentra
              inquilinos cualificados antes que tu competencia.
            </p>
            <div className="grid sm:grid-cols-3 gap-8 mb-10">
              <div className="flex flex-col items-center">
                <FileCheck className="w-12 h-12 text-amber-warm mb-3" />
                <div className="font-semibold text-navy-deep">Documentación verificada</div>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="w-12 h-12 text-amber-warm mb-3" />
                <div className="font-semibold text-navy-deep">Perfiles de confianza</div>
              </div>
              <div className="flex flex-col items-center">
                <TrendingUp className="w-12 h-12 text-amber-warm mb-3" />
                <div className="font-semibold text-navy-deep">Cierra más rápido</div>
              </div>
            </div>
            <a
              href="mailto:hola@simplit.es"
              className="inline-block px-8 py-4 bg-navy-deep text-offwhite text-lg font-semibold rounded-2xl hover:bg-navy-deep/90 transition-all"
            >
              Contacta con nosotros
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-navy-deep text-center mb-16">
            Precios simples y transparentes
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border-2 border-navy-deep/10">
              <h3 className="text-2xl font-serif font-bold text-navy-deep mb-2">Básico</h3>
              <div className="text-4xl font-serif font-bold text-navy-deep mb-6">Gratis</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-navy-deep/80">3 documentos</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-navy-deep/80">Verificación IA básica</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-navy-deep/80">1 contacto de agencia/mes</span>
                </li>
              </ul>
              <Link
                href="/login"
                className="block w-full px-6 py-3 bg-navy-deep/10 text-navy-deep text-center rounded-xl font-medium hover:bg-navy-deep/20 transition-all"
              >
                Empezar gratis
              </Link>
            </div>

            <div className="bg-amber-warm rounded-2xl p-8 border-2 border-amber-warm shadow-xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-navy-deep text-offwhite text-sm font-semibold rounded-full">
                Recomendado
              </div>
              <h3 className="text-2xl font-serif font-bold text-navy-deep mb-2">Premium</h3>
              <div className="text-4xl font-serif font-bold text-navy-deep mb-1">€19</div>
              <div className="text-navy-deep/70 mb-6">por mes</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-navy-deep mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-navy-deep">Documentos ilimitados</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-navy-deep mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-navy-deep">Verificación IA prioritaria</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-navy-deep mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-navy-deep">Contactos ilimitados</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-navy-deep mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-navy-deep">Perfil destacado</span>
                </li>
              </ul>
              <Link
                href="/login"
                className="block w-full px-6 py-3 bg-navy-deep text-offwhite text-center rounded-xl font-medium hover:bg-navy-deep/90 transition-all"
              >
                Empezar Premium
              </Link>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing" className="text-amber-warm hover:underline font-medium">
              Ver todos los planes
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-deep text-offwhite py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-serif font-bold mb-4">Simplit</div>
            <div className="text-offwhite/70 mb-6">Hecho en Barcelona 🏙️</div>
            <div className="flex justify-center space-x-6">
              <Link href="#" className="text-offwhite/70 hover:text-offwhite transition-colors">
                Términos
              </Link>
              <Link href="#" className="text-offwhite/70 hover:text-offwhite transition-colors">
                Privacidad
              </Link>
              <Link
                href="mailto:hola@simplit.es"
                className="text-offwhite/70 hover:text-offwhite transition-colors"
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
