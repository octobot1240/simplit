import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-serif font-bold text-navy-deep mb-4">404</div>
        <h1 className="text-3xl font-serif font-bold text-navy-deep mb-4">
          Página no encontrada
        </h1>
        <p className="text-navy-deep/70 mb-8 max-w-md mx-auto">
          La página que buscas no existe o ha sido movida.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-amber-warm text-navy-deep rounded-2xl font-semibold hover:bg-amber-warm/90 transition-all shadow-lg"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
