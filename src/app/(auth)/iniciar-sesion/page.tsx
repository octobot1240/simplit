'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push('/panel');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h1 className="mb-[var(--space-6)] text-center">Bienvenido de nuevo</h1>
      
      <form onSubmit={handleLogin} className="space-y-[var(--space-4)]">
        <div>
          <label htmlFor="email" className="mb-[var(--space-2)] block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="mb-[var(--space-2)] block text-sm font-medium">
            Contraseña
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end">
          <Link href="#" className="text-sm text-[var(--color-coral)] hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {error && (
          <div className="rounded-[var(--radius-md)] border border-[var(--color-error)] p-[var(--space-3)] text-sm text-[var(--color-error)]" style={{ backgroundColor: 'rgba(231, 76, 60, 0.08)' }}>
            {error}
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>
      </form>

      <p className="mt-[var(--space-4)] text-center text-sm text-[var(--color-text-muted)]">
        ¿No tienes cuenta?{' '}
        <Link href="/registro" className="text-[var(--color-coral)] hover:underline">
          Regístrate
        </Link>
      </p>
    </Card>
  );
}
