'use client';

import { AuthProvider } from './AuthContext';
import { PostsProvider } from './PostsContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PostsProvider>{children}</PostsProvider>
    </AuthProvider>
  );
}
