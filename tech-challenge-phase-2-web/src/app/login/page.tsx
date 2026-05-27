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
    return <p className="text-slate-500">Redirecionando...</p>;
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
      <h1 className="text-2xl font-bold text-slate-900">Área do docente</h1>
      <p className="mt-2 text-slate-600">
        Faça login para criar, editar e excluir publicações.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Senha
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-500">
        <Link href="/" className="text-indigo-600 hover:underline">
          Voltar para o blog
        </Link>
      </p>

      <p className="mt-6 rounded-lg bg-slate-100 p-3 text-xs text-slate-600">
        Usuário padrão (seed): professor@paif.com / professor123
      </p>
    </div>
  );
}
