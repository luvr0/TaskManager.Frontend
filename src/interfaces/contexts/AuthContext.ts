import type { ReactNode } from 'react';
import type { LoginCredentials } from '@/types/services';

export interface AuthContextValue {
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authError: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => string | null;
  clearError: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
