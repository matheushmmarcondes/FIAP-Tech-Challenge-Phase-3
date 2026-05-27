'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';
import { api } from '@/services/api';
import type { LoginInput, User } from '@/types/user';

const TOKEN_KEY = 'paif_token';
const USER_KEY = 'paif_user';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  isTeacher: boolean;
  login: (credentials: LoginInput) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  });

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? (JSON.parse(storedUser) as User) : null;
  });

  const [loading] = useState(false);

  const login = useCallback(async (credentials: LoginInput) => {
    const response = await api.login(credentials);
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    setToken(response.token);
    setUser(response.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isTeacher: user?.role === 'teacher',
      login,
      logout
    }),
    [user, token, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}
