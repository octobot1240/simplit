'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardNav } from '@/components/navigation/dashboard-nav'
import { createClient } from '@/lib/supabase/client'
import { posthog } from '@/lib/posthog'
import { Save, CheckCircle2 } from 'lucide-react'

const BARCELONA_NEIGHBORHOODS = [
  'Eixample',
  'Gràcia',
  'Born',
  'Poblenou',
  'Sants',
  'Sant Antoni',
  'Barceloneta',
  'Ciutat Vella',
  'Sarrià-Sant Gervasi',
  'Les Corts',
  'Horta-Guinardó',
  'Nou Barris',
  'Sant Andreu',
  'Sant Martí',
]

export default function ProfilePage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  // Personal info
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [nationality, setNationality] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [phone, setPhone] = useState('')

  // Rental preferences
  const [preferredNeighborhoods, setPreferredNeighborhoods] = useState<string[]>([])
  const [budgetMin, setBudgetMin] = useState(800)
  const [budgetMax, setBudgetMax] = useState(1500)
  const [propertyType, setPropertyType] = useState('')
  const [desiredMoveDate, setDesiredMoveDate] = useState('')
  const [occupants, setOccupants] = useState(1)

  // Employment
  const [employmentStatus, setEmploymentStatus] = useState('')
  const [company, setCompany] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [employmentDuration, setEmploymentDuration] = useState('')
  const [monthlyIncomeRange, setMonthlyIncomeRange] = useState('')

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    if (!supabase) return

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profile) {
      setFirstName(profile.first_name || '')
      setLastName(profile.last_name || '')
      setNationality(profile.nationality || '')
      setBirthDate(profile.birth_date || '')
      setPhone(profile.phone || '')
      setPreferredNeighborhoods(profile.preferred_neighborhoods || [])
      setBudgetMin(profile.budget_min || 800)
      setBudgetMax(profile.budget_max || 1500)
      setPropertyType(profile.property_type || '')
      setDesiredMoveDate(profile.desired_move_date || '')
      setOccupants(profile.occupants || 1)
      setEmploymentStatus(profile.employment_status || '')
      setCompany(profile.company || '')
      setJobTitle(profile.job_title || '')
      setEmploymentDuration(profile.employment_duration || '')
      setMonthlyIncomeRange(profile.monthly_income_range || '')
    }

    setLoading(false)
  }

  const calculateCompletion = () => {
    let completed = 0
    const fields = [
      firstName,
      lastName,
      nationality,
      birthDate,
      phone,
      preferredNeighborhoods.length > 0,
      budgetMin,
      budgetMax,
      propertyType,
      desiredMoveDate,
      occupants,
      employmentStatus,
    ]

    fields.forEach((field) => {
      if (field) completed++
    })

    return Math.round((completed / fields.length) * 100)
  }

  const handleSave = async () => {
    if (!supabase) return

    setSaving(true)
    setSuccess(false)

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const profileData = {
      id: user.id,
      first_name: firstName,
      last_name: lastName,
      nationality,
      birth_date: birthDate || null,
      phone,
      preferred_neighborhoods: preferredNeighborhoods,
      budget_min: budgetMin,
      budget_max: budgetMax,
      property_type: propertyType,
      desired_move_date: desiredMoveDate || null,
      occupants,
      employment_status: employmentStatus,
      company,
      job_title: jobTitle,
      employment_duration: employmentDuration,
      monthly_income_range: monthlyIncomeRange,
      profile_completion: calculateCompletion(),
      updated_at: new Date().toISOString(),
    }

    const { error } = await supabase.from('profiles').upsert(profileData)

    if (!error) {
      setSuccess(true)
      if (calculateCompletion() === 100) {
        posthog.capture('profile_completed')
      }
      setTimeout(() => setSuccess(false), 3000)
    }

    setSaving(false)
  }

  const toggleNeighborhood = (neighborhood: string) => {
    if (preferredNeighborhoods.includes(neighborhood)) {
      setPreferredNeighborhoods(preferredNeighborhoods.filter((n) => n !== neighborhood))
    } else {
      setPreferredNeighborhoods([...preferredNeighborhoods, neighborhood])
    }
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

  const personalCompletion = [firstName, lastName, nationality, birthDate, phone].filter(Boolean)
    .length
  const rentalCompletion = [
    preferredNeighborhoods.length > 0,
    budgetMin,
    budgetMax,
    propertyType,
    desiredMoveDate,
    occupants,
  ].filter(Boolean).length
  const employmentCompletion = [
    employmentStatus,
    company,
    jobTitle,
    employmentDuration,
    monthlyIncomeRange,
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-offwhite">
      <DashboardNav />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-navy-deep mb-2">Tu perfil</h1>
          <p className="text-navy-deep/70">
            Completa tu información para que las agencias puedan encontrarte.
          </p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Perfil guardado correctamente</span>
          </div>
        )}

        {/* Personal Info */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-navy-deep/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif font-bold text-navy-deep">Información personal</h2>
            <div className="text-sm text-navy-deep/60">{personalCompletion} / 5 campos</div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-navy-deep mb-2">Nombre</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 border border-navy-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-warm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-deep mb-2">Apellidos</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 border border-navy-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-warm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-deep mb-2">
                Nacionalidad
              </label>
              <input
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="w-full px-4 py-3 border border-navy-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-warm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-deep mb-2">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 border border-navy-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-warm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-navy-deep mb-2">Teléfono</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-navy-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-warm"
              />
            </div>
          </div>
        </div>

        {/* Rental Preferences */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-navy-deep/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif font-bold text-navy-deep">
              Preferencias de alquiler
            </h2>
            <div className="text-sm text-navy-deep/60">{rentalCompletion} / 6 campos</div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-navy-deep mb-3">
                Barrios preferidos
              </label>
              <div className="flex flex-wrap gap-2">
                {BARCELONA_NEIGHBORHOODS.map((neighborhood) => (
                  <button
                    key={neighborhood}
                    onClick={() => toggleNeighborhood(neighborhood)}
                    className={`px-4 py-2 rounded-xl border-2 transition-all ${
                      preferredNeighborhoods.includes(neighborhood)
                        ? 'bg-amber-warm border-amber-warm text-navy-deep font-medium'
                        : 'border-navy-deep/20 text-navy-deep/70 hover:border-amber-warm'
                    }`}
                  >
                    {neighborhood}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-deep mb-3">
                Presupuesto mensual: €{budgetMin} - €{budgetMax}
              </label>
              <div className="space-y-3">
                <input
                  type="range"
                  min="400"
                  max="3000"
                  step="50"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(Number(e.target.value))}
                  className="w-full"
                />
                <input
                  type="range"
                  min="400"
                  max="3000"
                  step="50"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-deep mb-2">
                Tipo de vivienda
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['piso', 'estudio', 'habitacion'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPropertyType(type)}
                    className={`px-4 py-3 rounded-xl border-2 transition-all capitalize ${
                      propertyType === type
                        ? 'bg-amber-warm border-amber-warm text-navy-deep font-medium'
                        : 'border-navy-deep/20 text-navy-deep/70 hover:border-amber-warm'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy-deep mb-2">
                  Fecha deseada de mudanza
                </label>
                <input
                  type="date"
                  value={desiredMoveDate}
                  onChange={(e) => setDesiredMoveDate(e.target.value)}
                  className="w-full px-4 py-3 border border-navy-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-warm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-deep mb-2">
                  Número de ocupantes
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={occupants}
                  onChange={(e) => setOccupants(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-navy-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-warm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Employment */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-navy-deep/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-serif font-bold text-navy-deep">Situación laboral</h2>
            <div className="text-sm text-navy-deep/60">{employmentCompletion} / 5 campos</div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-deep mb-2">
                Situación laboral
              </label>
              <select
                value={employmentStatus}
                onChange={(e) => setEmploymentStatus(e.target.value)}
                className="w-full px-4 py-3 border border-navy-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-warm"
              >
                <option value="">Selecciona una opción</option>
                <option value="empleado">Empleado</option>
                <option value="autonomo">Autónomo</option>
                <option value="estudiante">Estudiante</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy-deep mb-2">Empresa</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 border border-navy-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-warm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-deep mb-2">Cargo</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-navy-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-warm"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-navy-deep mb-2">
                  Antigüedad
                </label>
                <input
                  type="text"
                  value={employmentDuration}
                  onChange={(e) => setEmploymentDuration(e.target.value)}
                  placeholder="Ej: 2 años"
                  className="w-full px-4 py-3 border border-navy-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-warm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-deep mb-2">
                  Ingresos mensuales
                </label>
                <select
                  value={monthlyIncomeRange}
                  onChange={(e) => setMonthlyIncomeRange(e.target.value)}
                  className="w-full px-4 py-3 border border-navy-deep/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-warm"
                >
                  <option value="">Selecciona un rango</option>
                  <option value="<1500">Menos de €1,500</option>
                  <option value="1500-2500">€1,500 - €2,500</option>
                  <option value="2500-3500">€2,500 - €3,500</option>
                  <option value="3500+">Más de €3,500</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-navy-deep/60">
            Perfil completado: <span className="font-semibold">{calculateCompletion()}%</span>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-3 bg-amber-warm text-navy-deep rounded-xl font-semibold hover:bg-amber-warm/90 transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Guardando...' : 'Guardar cambios'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
