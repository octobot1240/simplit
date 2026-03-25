'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      router.push('/panel');
    } catch (err: any) {
      setError(err.message || 'Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/panel`,
        },
      });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión con Google');
    }
  };

  return (
    <Card>
      <h1 className="mb-[var(--space-6)] text-center">Crea tu cuenta</h1>
      
      <form onSubmit={handleSignup} className="space-y-[var(--space-4)]">
        <div>
          <label htmlFor="fullName" className="mb-[var(--space-2)] block text-sm font-medium">
            Nombre completo
          </label>
          <Input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        
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
            minLength={8}
          />
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="mb-[var(--space-2)] block text-sm font-medium">
            Confirmar contraseña
          </label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        {error && (
          <div className="rounded-[var(--radius-md)] border border-[var(--color-error)] p-[var(--space-3)] text-sm text-[var(--color-error)]" style={{ backgroundColor: 'rgba(231, 76, 60, 0.08)' }}>
            {error}
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      <p className="mt-[var(--space-4)] text-center text-sm text-[var(--color-text-muted)]">
        ¿Ya tienes cuenta?{' '}
        <Link href="/iniciar-sesion" className="text-[var(--color-coral)] hover:underline">
          Inicia sesión
        </Link>
      </p>

      <div className="relative my-[var(--space-6)]">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--color-border)]"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-[var(--space-3)] text-[var(--color-text-muted)]">
            O
          </span>
        </div>
      </div>

      <Button onClick={handleGoogleSignup} variant="secondary" className="w-full">
        Continuar con Google
      </Button>
    </Card>
  );
}
