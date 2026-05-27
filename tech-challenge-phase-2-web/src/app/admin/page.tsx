'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PostCard } from '@/components/PostCard';
import { useAuth } from '@/contexts/AuthContext';
import { usePosts } from '@/contexts/PostsContext';
import { api } from '@/services/api';

export default function AdminPage() {
  const { token } = useAuth();
  const { posts, loading, error, loadPosts } = usePosts();
  const router = useRouter();

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleDelete = async (id: string, title: string) => {
    if (!token) return;
    const confirmed = window.confirm(`Excluir a publicação "${title}"?`);
    if (!confirmed) return;

    try {
      await api.deletePost(id, token);
      await loadPosts();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao excluir');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Administração de posts</h1>
          <p className="text-slate-600">Gerencie as publicações do blog.</p>
        </div>
        <Link
          href="/admin/new"
          className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
        >
          Nova publicação
        </Link>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-red-700">{error}</p>
      )}

      {loading && <p className="text-slate-500">Carregando...</p>}

      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post._id} className="space-y-2">
            <PostCard post={post} />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => router.push(`/admin/edit/${post._id}`)}
                className="rounded-lg border border-slate-300 px-3 py-1 text-sm hover:bg-slate-50"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => handleDelete(post._id, post.title)}
                className="rounded-lg border border-red-200 px-3 py-1 text-sm text-red-700 hover:bg-red-50"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
