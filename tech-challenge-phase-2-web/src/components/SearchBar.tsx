'use client';

import { FormEvent, useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

export function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <label htmlFor="search" className="sr-only">
        Buscar posts
      </label>
      <input
        id="search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por título ou conteúdo..."
        className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
      >
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
    </form>
  );
}
