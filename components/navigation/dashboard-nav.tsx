'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, User, FileText, Eye, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Panel', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Mi Perfil', href: '/profile', icon: User },
  { name: 'Documentos', href: '/documents', icon: FileText },
  { name: 'Vista Agencias', href: '/my-profile', icon: Eye },
  { name: 'Cuenta', href: '/account', icon: Settings },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="bg-offwhite border-b border-navy-deep/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/dashboard" className="text-2xl font-serif font-bold text-navy-deep">
            Simplit
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all',
                    isActive
                      ? 'bg-amber-warm text-navy-deep font-medium'
                      : 'text-navy-deep/70 hover:text-navy-deep hover:bg-navy-deep/5'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden pb-3 flex space-x-2 overflow-x-auto">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap',
                  isActive
                    ? 'bg-amber-warm text-navy-deep font-medium'
                    : 'text-navy-deep/70 hover:text-navy-deep hover:bg-navy-deep/5'
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
