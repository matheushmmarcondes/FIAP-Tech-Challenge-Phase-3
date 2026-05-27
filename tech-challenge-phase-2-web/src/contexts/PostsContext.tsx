'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';
import { api } from '@/services/api';
import type { Post } from '@/types/post';

interface PostsContextValue {
  posts: Post[];
  loading: boolean;
  error: string | null;
  loadPosts: () => Promise<void>;
  searchPosts: (query: string) => Promise<void>;
  clearError: () => void;
}

const PostsContext = createContext<PostsContextValue | undefined>(undefined);

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getPosts();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar posts');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchPosts = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      if (!query.trim()) {
        const data = await api.getPosts();
        setPosts(data);
        return;
      }
      const data = await api.searchPosts(query);
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro na busca');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo(
    () => ({
      posts,
      loading,
      error,
      loadPosts,
      searchPosts,
      clearError
    }),
    [posts, loading, error, loadPosts, searchPosts, clearError]
  );

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts deve ser usado dentro de PostsProvider');
  }
  return context;
}
