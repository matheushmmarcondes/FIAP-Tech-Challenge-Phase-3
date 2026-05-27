'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PostForm } from '@/components/PostForm';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/services/api';
import type { PostInput } from '@/types/post';

export default function NewPostPage() {
  const { token, user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (data: PostInput) => {
    if (!token) throw new Error('Não autenticado');
    await api.createPost(
      { ...data, author: data.author || user?.name || 'Docente' },
      token
    );
    router.push('/admin');
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin" className="text-sm text-[#ff6b7a] hover:underline">
        ← Voltar
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-zinc-100">Nova publicação</h1>
      <div className="mt-6 rounded-[2px] border border-zinc-800 bg-zinc-900/50 p-6 shadow-lg">
        <PostForm
          submitLabel="Publicar"
          initial={{ title: '', content: '', author: user?.name || '' }}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
