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
          <h1 className="text-2xl font-bold text-zinc-100">Administração de posts</h1>
          <p className="text-zinc-400">Gerencie as publicações do blog.</p>
        </div>
        <Link
          href="/admin/new"
          className="rounded-[2px] bg-gradient-to-br from-[#d00018] to-[#8f000f] px-4 py-2 font-medium text-white hover:brightness-110"
        >
          Nova publicação
        </Link>
      </div>

      {error && (
        <p className="rounded-[2px] border border-red-900/50 bg-red-950/40 px-4 py-3 text-red-300">
          {error}
        </p>
      )}

      {loading && <p className="text-zinc-500">Carregando...</p>}

      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post._id} className="space-y-2">
            <PostCard post={post} />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => router.push(`/admin/edit/${post._id}`)}
                className="rounded-[2px] border border-zinc-600 px-3 py-1 text-sm text-zinc-200 hover:bg-zinc-800"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => handleDelete(post._id, post.title)}
                className="rounded-[2px] border border-red-900/60 px-3 py-1 text-sm text-red-300 hover:bg-red-950/50"
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
