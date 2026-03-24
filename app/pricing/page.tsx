import Link from 'next/link'
import { Navbar } from '@/components/navigation/navbar'
import { CheckCircle2, HelpCircle } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-offwhite">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-navy-deep mb-4">
            Precios simples y transparentes
          </h1>
          <p className="text-xl text-navy-deep/70">
            Elige el plan que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl p-8 border-2 border-navy-deep/10 hover:border-navy-deep/20 transition-all">
            <h3 className="text-2xl font-serif font-bold text-navy-deep mb-2">Básico</h3>
            <div className="text-5xl font-serif font-bold text-navy-deep mb-1">Gratis</div>
            <p className="text-navy-deep/60 mb-8">Para empezar</p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-navy-deep">Hasta 3 documentos</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-navy-deep">Verificación IA básica</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-navy-deep">1 contacto de agencia por mes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-navy-deep">Perfil estándar</span>
              </li>
            </ul>

            <Link
              href="/login"
              className="block w-full px-6 py-4 bg-navy-deep/10 text-navy-deep text-center rounded-xl font-semibold hover:bg-navy-deep/20 transition-all"
            >
              Empezar gratis
            </Link>
          </div>

          {/* Premium Plan */}
          <div className="bg-amber-warm rounded-2xl p-8 border-2 border-amber-warm shadow-2xl relative transform md:scale-105">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-navy-deep text-offwhite text-sm font-bold rounded-full">
              Recomendado
            </div>
            <h3 className="text-2xl font-serif font-bold text-navy-deep mb-2">Premium</h3>
            <div className="flex items-baseline mb-1">
              <div className="text-5xl font-serif font-bold text-navy-deep">€19</div>
              <div className="text-navy-deep/70 ml-2">/ mes</div>
            </div>
            <p className="text-navy-deep/70 mb-2">o €149/año (ahorra €79)</p>
            <p className="text-navy-deep/60 mb-8">Para inquilinos serios</p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-navy-deep mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-navy-deep font-medium">Documentos ilimitados</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-navy-deep mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-navy-deep font-medium">Verificación IA prioritaria</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-navy-deep mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-navy-deep font-medium">Contactos ilimitados</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-navy-deep mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-navy-deep font-medium">
                  Perfil destacado (priority badge)
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-navy-deep mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-navy-deep font-medium">
                  Analíticas de visitas a tu perfil
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-navy-deep mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-navy-deep font-medium">Soporte prioritario</span>
              </li>
            </ul>

            <Link
              href="/login"
              className="block w-full px-6 py-4 bg-navy-deep text-offwhite text-center rounded-xl font-semibold hover:bg-navy-deep/90 transition-all shadow-lg"
            >
              Empezar Premium
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-navy-deep text-center mb-12">
            Preguntas frecuentes
          </h2>
          <div className="space-y-6">
            {[
              {
                q: '¿Puedo cambiar de plan en cualquier momento?',
                a: 'Sí, puedes actualizar o cancelar tu suscripción en cualquier momento desde tu cuenta.',
              },
              {
                q: '¿Cómo funciona la verificación con IA?',
                a: 'Nuestra IA analiza tus documentos para confirmar su validez y extrae información clave. Las agencias solo ven tus badges de verificación, nunca tus documentos originales.',
              },
              {
                q: '¿Qué pasa con mis documentos después de cancelar?',
                a: 'Tus documentos permanecen encriptados en tu cuenta. Puedes descargarlos o eliminarlos en cualquier momento desde la sección de privacidad.',
              },
              {
                q: '¿Cómo me contactan las agencias?',
                a: 'Las agencias pueden ver tu perfil verificado y enviarte una solicitud de contacto. Tú decides si aceptar o rechazar cada solicitud.',
              },
              {
                q: '¿Es seguro subir mis documentos?',
                a: 'Sí. Todos los documentos están encriptados y almacenados de forma segura. Las agencias nunca tienen acceso a tus documentos originales, solo ven badges de verificación.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-navy-deep/5">
                <div className="flex items-start space-x-3">
                  <HelpCircle className="w-5 h-5 text-amber-warm mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-navy-deep mb-2">{faq.q}</h3>
                    <p className="text-navy-deep/70">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-navy-deep/70 mb-4">¿Tienes más preguntas?</p>
          <a
            href="mailto:hola@simplit.es"
            className="inline-block px-8 py-3 bg-navy-deep text-offwhite rounded-xl font-semibold hover:bg-navy-deep/90 transition-all"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </div>
  )
}
