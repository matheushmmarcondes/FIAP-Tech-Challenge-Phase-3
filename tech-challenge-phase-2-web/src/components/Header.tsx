'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const { user, isTeacher, logout, loading } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-bold text-indigo-700">
          PAIF Blog
        </Link>

        <nav className="flex flex-wrap items-center gap-3 text-sm font-medium">
          <Link href="/" className="text-slate-600 hover:text-indigo-700">
            Início
          </Link>

          {!loading && isTeacher && (
            <Link
              href="/admin"
              className="text-slate-600 hover:text-indigo-700"
            >
              Administração
            </Link>
          )}

          {!loading && !user && (
            <Link
              href="/login"
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-700"
            >
              Entrar
            </Link>
          )}

          {!loading && user && (
            <>
              <span className="text-slate-500">
                Olá, {user.name.split(' ')[0]}
              </span>
              <button
                type="button"
                onClick={logout}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
              >
                Sair
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
