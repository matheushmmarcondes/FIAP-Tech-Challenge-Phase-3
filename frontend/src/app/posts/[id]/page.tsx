'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { api } from '@/services/api';
import type { Post } from '@/types/post';
import { formatDate } from '@/lib/formatDate';

export default function PostDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getPost(id);
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Post não encontrado');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return <p className="text-zinc-500">Carregando publicação...</p>;
  }

  if (error || !post) {
    return (
      <div className="space-y-4">
        <p className="text-red-400" role="alert">
          {error || 'Publicação não encontrada'}
        </p>
        <Link href="/" className="text-[#ff6b7a] hover:underline">
          Voltar ao início
        </Link>
      </div>
    );
  }

  return (
    <article className="rounded-[2px] border border-zinc-800 bg-zinc-900/50 p-6 shadow-lg">
      <Link href="/" className="text-sm text-[#ff6b7a] hover:underline">
        ← Voltar
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-zinc-100">{post.title}</h1>
      <div className="mt-3 flex flex-wrap gap-2 text-sm text-zinc-500">
        <span className="rounded-[2px] border border-zinc-700 bg-zinc-800/80 px-2 py-1 text-zinc-300">
          {post.author}
        </span>
        <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
      </div>
      <div className="mt-8 max-w-none whitespace-pre-wrap leading-relaxed text-zinc-300">
        {post.content}
      </div>
    </article>
  );
}
