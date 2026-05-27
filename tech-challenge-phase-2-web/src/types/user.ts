export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
}
