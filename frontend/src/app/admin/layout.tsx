'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { token, isTeacher, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!token || !isTeacher)) {
      router.replace('/login');
    }
  }, [loading, token, isTeacher, router]);

  if (loading) {
    return <p className="text-zinc-500">Verificando permissões...</p>;
  }

  if (!token || !isTeacher) {
    return null;
  }

  return <div className="space-y-6">{children}</div>;
}
