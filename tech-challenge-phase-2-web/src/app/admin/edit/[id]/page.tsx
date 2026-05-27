'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { PostForm } from '@/components/PostForm';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/services/api';
import type { Post, PostInput } from '@/types/post';

export default function EditPostPage() {
  const params = useParams();
  const id = params.id as string;
  const { token } = useAuth();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getPost(id);
        setPost(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (data: PostInput) => {
    if (!token) throw new Error('Não autenticado');
    await api.updatePost(id, data, token);
    router.push('/admin');
  };

  if (loading) {
    return <p className="text-slate-500">Carregando...</p>;
  }

  if (!post) {
    return <p className="text-red-600">Post não encontrado</p>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin" className="text-sm text-indigo-600 hover:underline">
        ← Voltar
      </Link>
      <h1 className="mt-4 text-2xl font-bold">Editar publicação</h1>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <PostForm
          submitLabel="Salvar alterações"
          initial={{
            title: post.title,
            content: post.content,
            author: post.author
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
