import type { AuthResponse, LoginInput } from '@/types/user';
import type { Post, PostInput } from '@/types/post';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(
      (data as { message?: string }).message || 'Erro na requisição',
      response.status
    );
  }

  return data as T;
}

export const api = {
  login: (body: LoginInput) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(body)
    }),

  getPosts: () => request<Post[]>('/posts'),

  getPost: (id: string) => request<Post>(`/posts/${id}`),

  searchPosts: (q: string) =>
    request<Post[]>(`/posts/search?q=${encodeURIComponent(q)}`),

  createPost: (body: PostInput, token: string) =>
    request<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(body)
    }, token),

  updatePost: (id: string, body: PostInput, token: string) =>
    request<Post>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body)
    }, token),

  deletePost: (id: string, token: string) =>
    request<{ message: string }>(`/posts/${id}`, {
      method: 'DELETE'
    }, token)
};

export { ApiError };
