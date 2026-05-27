'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const { user, isTeacher, logout, loading } = useAuth();

  return (
    <header className="border-b border-zinc-800 bg-black/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-95"
          aria-label="PAIF Blog — página inicial"
        >
          <Image
            src="/paif-logo.png"
            alt="PAIF — Plataforma de Atividades Escolares"
            width={156}
            height={52}
            priority
            className="h-10 w-auto max-w-[9.75rem]"
          />
          <span className="hidden text-sm font-medium tracking-wide text-zinc-400 sm:inline">
            Blog
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-3 text-sm font-medium">
          <Link href="/" className="text-zinc-400 transition hover:text-zinc-100">
            Início
          </Link>

          {!loading && isTeacher && (
            <Link
              href="/admin"
              className="text-zinc-400 transition hover:text-[#ff4d5d]"
            >
              Administração
            </Link>
          )}

          {!loading && !user && (
            <Link
              href="/login"
              className="rounded-[2px] bg-gradient-to-br from-[#d00018] to-[#8f000f] px-3 py-1.5 text-white shadow-[0_0_20px_rgba(255,26,51,0.25)] hover:brightness-110"
            >
              Entrar
            </Link>
          )}

          {!loading && user && (
            <>
              <span className="text-zinc-500">
                Olá, {user.name.split(' ')[0]}
              </span>
              <button
                type="button"
                onClick={logout}
                className="rounded-[2px] border border-zinc-600 px-3 py-1.5 text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-900"
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
