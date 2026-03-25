# Simplit

**Deja de buscar piso. Haz que te encuentren.**

Simplit helps renters in Barcelona prepare their rental documents and get found by agencies. Users upload docs, AI verifies them, agencies contact users with available apartments.

## Quick Start

```bash
# 1. Install dependencies (already done)
npm install

# 2. Run database migrations
# Go to https://supabase.com/dashboard/project/eeywlnvxbhpzutenukqb
# SQL Editor → Paste scripts/migrate.sql → Run
# See MIGRATION_INSTRUCTIONS.md for details

# 3. Start development server
npm run dev

# 4. Open http://localhost:3000
```

## Tech Stack

- **Next.js 16** — App Router, TypeScript, Tailwind CSS
- **Supabase** — Auth, Postgres, Storage, RLS
- **Stripe** — Subscriptions (optional, gracefully degraded)
- **Lucide React** — Icons
- **Google Fonts** — DM Serif Display + Inter

## Features

- ✅ Document upload & verification
- ✅ Profile completion tracking
- ✅ Agency matching system
- ✅ Stripe subscriptions (Premium plan)
- ✅ Mobile responsive
- ✅ All Spanish UI

## Documentation

- [BUILD_COMPLETE.md](./BUILD_COMPLETE.md) — Full build report
- [MIGRATION_INSTRUCTIONS.md](./MIGRATION_INSTRUCTIONS.md) — Database setup

## Environment Variables

See `.env.local` (already configured for Supabase).

For Stripe integration, add:
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_STRIPE_PRICE_MONTHLY`
- `NEXT_PUBLIC_STRIPE_PRICE_ANNUAL`

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

## License

Proprietary
