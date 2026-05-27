'use client';

import { useEffect } from 'react';
import { PostCard } from '@/components/PostCard';
import { SearchBar } from '@/components/SearchBar';
import { usePosts } from '@/contexts/PostsContext';

export default function HomePage() {
  const { posts, loading, error, loadPosts, searchPosts } = usePosts();

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <div className="space-y-8">
      <section className="paif-hero relative overflow-hidden rounded-[3px] border border-zinc-800 px-6 py-10 text-zinc-100">
        <div
          className="paif-hero-accent pointer-events-none absolute -right-16 -top-24 h-64 w-64 rotate-12 rounded-full blur-3xl"
          aria-hidden
        />
        <h1 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
          Blog educacional PAIF
        </h1>
        <p className="relative mt-3 max-w-2xl text-zinc-400">
          Conteúdos, atividades e materiais publicados por docentes para a
          comunidade escolar. Alunos e alunas podem ler; professores gerenciam
          as publicações.
        </p>
      </section>

      <SearchBar onSearch={searchPosts} loading={loading} />

      {error && (
        <p
          className="rounded-[2px] border border-red-900/50 bg-red-950/40 px-4 py-3 text-red-300"
          role="alert"
        >
          {error}
        </p>
      )}

      {loading && (
        <p className="text-center text-zinc-500" aria-live="polite">
          Carregando publicações...
        </p>
      )}

      {!loading && posts.length === 0 && (
        <p className="rounded-[2px] border border-dashed border-zinc-700 bg-zinc-900/40 p-8 text-center text-zinc-500">
          Nenhuma publicação encontrada.
        </p>
      )}

      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
