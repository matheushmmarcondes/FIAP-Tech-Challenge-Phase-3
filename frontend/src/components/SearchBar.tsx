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
        className="flex-1 rounded-[2px] border border-zinc-700 bg-zinc-900/60 px-4 py-2 text-zinc-100 placeholder:text-zinc-600 focus:border-[#c50014] focus:outline-none focus:ring-2 focus:ring-[#c50014]/30"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-[2px] bg-gradient-to-br from-[#d00018] to-[#8f000f] px-5 py-2 font-medium text-white hover:brightness-110 disabled:opacity-60"
      >
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
    </form>
  );
}
