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
    return <p className="text-slate-500">Carregando publicação...</p>;
  }

  if (error || !post) {
    return (
      <div className="space-y-4">
        <p className="text-red-600" role="alert">
          {error || 'Publicação não encontrada'}
        </p>
        <Link href="/" className="text-indigo-600 hover:underline">
          Voltar ao início
        </Link>
      </div>
    );
  }

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <Link href="/" className="text-sm text-indigo-600 hover:underline">
        ← Voltar
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">{post.title}</h1>
      <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-500">
        <span className="rounded-full bg-indigo-50 px-2 py-1 text-indigo-700">
          {post.author}
        </span>
        <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
      </div>
      <div className="prose prose-slate mt-8 max-w-none whitespace-pre-wrap text-slate-700">
        {post.content}
      </div>
    </article>
  );
}
