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
      <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 px-6 py-10 text-white shadow-lg">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Blog educacional PAIF
        </h1>
        <p className="mt-3 max-w-2xl text-indigo-100">
          Conteúdos, atividades e materiais publicados por docentes para a
          comunidade escolar. Alunos e alunas podem ler; professores gerenciam
          as publicações.
        </p>
      </section>

      <SearchBar onSearch={searchPosts} loading={loading} />

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-red-700" role="alert">
          {error}
        </p>
      )}

      {loading && (
        <p className="text-center text-slate-500" aria-live="polite">
          Carregando publicações...
        </p>
      )}

      {!loading && posts.length === 0 && (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
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
