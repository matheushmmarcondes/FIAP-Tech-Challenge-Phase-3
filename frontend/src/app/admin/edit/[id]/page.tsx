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
    return <p className="text-zinc-500">Carregando...</p>;
  }

  if (!post) {
    return <p className="text-red-400">Post não encontrado</p>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin" className="text-sm text-[#ff6b7a] hover:underline">
        ← Voltar
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-zinc-100">Editar publicação</h1>
      <div className="mt-6 rounded-[2px] border border-zinc-800 bg-zinc-900/50 p-6 shadow-lg">
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
