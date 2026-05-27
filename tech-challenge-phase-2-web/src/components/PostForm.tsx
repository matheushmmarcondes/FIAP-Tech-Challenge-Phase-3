'use client';

import { FormEvent, useState } from 'react';
import type { PostInput } from '@/types/post';

interface PostFormProps {
  initial?: PostInput;
  submitLabel: string;
  onSubmit: (data: PostInput) => Promise<void>;
}

export function PostForm({ initial, submitLabel, onSubmit }: PostFormProps) {
  const [title, setTitle] = useState(initial?.title || '');
  const [content, setContent] = useState(initial?.content || '');
  const [author, setAuthor] = useState(initial?.author || '');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await onSubmit({ title, content, author });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">
          Título
        </label>
        <input
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div>
        <label htmlFor="author" className="mb-1 block text-sm font-medium">
          Autor
        </label>
        <input
          id="author"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      <div>
        <label htmlFor="content" className="mb-1 block text-sm font-medium">
          Conteúdo
        </label>
        <textarea
          id="content"
          required
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
      >
        {loading ? 'Salvando...' : submitLabel}
      </button>
    </form>
  );
}
