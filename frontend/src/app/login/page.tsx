'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { ApiError } from '@/services/api';

export default function LoginPage() {
  const { login, user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('professor@paif.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user?.role === 'teacher') {
      router.replace('/admin');
    }
  }, [authLoading, user, router]);

  if (!authLoading && user?.role === 'teacher') {
    return <p className="text-zinc-500">Redirecionando...</p>;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ email, password });
      router.push('/admin');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Não foi possível fazer login. Verifique suas credenciais.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold text-zinc-100">Área do docente</h1>
      <p className="mt-2 text-zinc-400">
        Faça login para criar, editar e excluir publicações.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4 rounded-[2px] border border-zinc-800 bg-zinc-900/50 p-6 shadow-lg"
      >
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-zinc-300">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-[2px] border border-zinc-700 bg-zinc-950/50 px-4 py-2 text-zinc-100 focus:border-[#c50014] focus:outline-none focus:ring-2 focus:ring-[#c50014]/30"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-zinc-300">
            Senha
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-[2px] border border-zinc-700 bg-zinc-950/50 px-4 py-2 text-zinc-100 focus:border-[#c50014] focus:outline-none focus:ring-2 focus:ring-[#c50014]/30"
          />
        </div>

        {error && (
          <p
            className="rounded-[2px] border border-red-900/50 bg-red-950/40 px-3 py-2 text-sm text-red-300"
            role="alert"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-[2px] bg-gradient-to-br from-[#d00018] to-[#8f000f] py-2 font-medium text-white hover:brightness-110 disabled:opacity-60"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-zinc-500">
        <Link href="/" className="text-[#ff6b7a] hover:underline">
          Voltar para o blog
        </Link>
      </p>

      <p className="mt-6 rounded-[2px] border border-zinc-800 bg-zinc-900/80 p-3 text-xs text-zinc-400">
        Usuário padrão (seed): professor@paif.com / professor123
      </p>
    </div>
  );
}
