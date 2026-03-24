# Simplit

**Deja de buscar piso. Haz que te encuentren.**

Simplit es una plataforma que ayuda a inquilinos en Barcelona a procesar y verificar sus documentos de alquiler con IA. Las agencias inmobiliarias encuentran a los inquilinos, no al revés.

## ¿Qué hace Simplit?

1. **Usuarios suben documentos** (NIE, nóminas, contrato, extractos bancarios, etc.)
2. **IA verifica los documentos** y genera un perfil con badges de confianza
3. **Agencias ven perfiles verificados** (nunca los documentos originales)
4. **Agencias contactan directamente** cuando tienen un piso que encaja

**NO es una plataforma de búsqueda de pisos.** NO hay listados de apartamentos. Es un marketplace invertido: las agencias encuentran a los inquilinos.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** (modo estricto)
- **Supabase** (auth, DB, storage, RLS)
- **Stripe** (suscripciones)
- **Resend** (emails transaccionales)
- **PostHog** (analytics)
- **Tailwind CSS** (diseño custom)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copia `.env.example` a `.env.local` y completa las variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PRICE_MONTHLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_ANNUAL=price_...
RESEND_API_KEY=re_...
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### 3. Set up Supabase

Ejecuta el SQL en `supabase-schema.sql` en tu proyecto de Supabase para crear las tablas:

- `profiles`
- `documents`
- `subscriptions`
- `agency_contacts`

Configura RLS (Row Level Security) para que los usuarios solo vean sus propios datos.

Crea un bucket de storage llamado `documents` con políticas de acceso apropiadas.

### 4. Set up Stripe

Crea dos productos en Stripe:
- **Básico** (free tier, no payment)
- **Premium** (€19/mes o €149/año)

Copia los Price IDs a las variables de entorno.

### 5. Run locally

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

```bash
vercel --prod --yes
```

O conecta el repo de GitHub a Vercel para deploys automáticos.

## Design System

- **Colores:**
  - Amber warm: `#D4A574` (primary accent)
  - Navy deep: `#1a2332` (text, headers)
  - Offwhite: `#FAFAF8` (background)
  - Success green: `#22C55E` (verified badges)

- **Fuentes:**
  - DM Sans (body, 400/500/600)
  - DM Serif Display (headings)

- **Estética:** Cálido, profesional, confiable. NO corporativo genérico. NO glassmorphism, NO gradientes pesados, NO emojis como iconos.

## Pages

1. `/` — Landing page
2. `/login` — Login/Signup (email + Google OAuth)
3. `/dashboard` — Dashboard principal
4. `/profile` — Profile builder (info personal, preferencias, empleo)
5. `/documents` — Document upload center
6. `/my-profile` — Vista de cómo te ven las agencias
7. `/pricing` — Planes y precios
8. `/account` — Account settings

## License

Propiedad de Simplit. Todos los derechos reservados.
