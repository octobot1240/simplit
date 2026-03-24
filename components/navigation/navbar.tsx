'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-offwhite border-b border-navy-deep/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-serif font-bold text-navy-deep">
            Simplit
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/pricing"
              className="text-navy-deep hover:text-amber-warm transition-colors"
            >
              Precios
            </Link>
            <Link
              href="/login"
              className="px-6 py-2.5 bg-amber-warm text-navy-deep rounded-xl font-medium hover:bg-amber-warm/90 transition-all shadow-sm"
            >
              Empezar
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-navy-deep" />
            ) : (
              <Menu className="w-6 h-6 text-navy-deep" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-navy-deep/10">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/pricing"
              className="block py-2 text-navy-deep hover:text-amber-warm transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Precios
            </Link>
            <Link
              href="/login"
              className="block w-full px-6 py-2.5 bg-amber-warm text-navy-deep rounded-xl font-medium text-center hover:bg-amber-warm/90 transition-all shadow-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              Empezar
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
