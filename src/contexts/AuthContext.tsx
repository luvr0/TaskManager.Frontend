'use client';

import { isAxiosError } from 'axios';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  login as loginRequest,
  logout as logoutRequest,
  refreshAccessToken,
} from '@/services/authService';
import type { AuthContextValue, AuthProviderProps } from '@/interfaces/contexts';
import type { LoginCredentials } from '@/types/services';
import {
  getAccessToken as readAccessToken,
  onForcedLogout,
  setAccessToken as persistAccessToken,
  subscribeToAccessToken,
} from '@/services/tokenStore';
 
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [accessToken, setAccessTokenState] = useState<string | null>(() => readAccessToken());
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    return subscribeToAccessToken(setAccessTokenState);
  }, []);

  const syncToken = useCallback((token: string | null) => {
    persistAccessToken(token);
    setAccessTokenState(token);
  }, []);

  const clearError = useCallback(() => {
    setAuthError(null);
  }, []);

  const handleLogout = useCallback(
    async (options?: { silent?: boolean }) => {
      const silent = options?.silent ?? false;
      try {
        await logoutRequest();
      } catch (error) {
        if (!silent) {
          console.error('Logout failed', error);
        }
      } finally {
        syncToken(null);
        if (!silent) {
          setAuthError(null);
          router.push('/login');
        }
      }
    },
    [router, syncToken]
  );

  useEffect(() => {
    const unsubscribe = onForcedLogout(() => {
      setAuthError('Sessão expirada, faça login novamente.');
      void handleLogout({ silent: true });
      router.push('/login');
    });

    return unsubscribe;
  }, [handleLogout, router]);

  useEffect(() => {
    let isActive = true;

    const bootstrap = async () => {
      try {
        const { accessToken: freshToken } = await refreshAccessToken();
        if (!isActive) return;
        syncToken(freshToken);
      } catch {
        if (!isActive) return;
        syncToken(null);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void bootstrap();
    return () => {
      isActive = false;
    };
  }, [syncToken]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        const { accessToken: token } = await loginRequest(credentials);
        syncToken(token);
        setAuthError(null);
      } catch (error) {
        const message = isAxiosError(error) && error.response?.status === 401
          ? 'Credenciais inválidas. Tente novamente.'
          : 'Não foi possível autenticar agora. Tente novamente em instantes.';
        setAuthError(message);
        throw error;
      }
    },
    [syncToken]
  );

  const getAccessToken = useCallback(() => readAccessToken(), []);

  const value = useMemo<AuthContextValue>(
    () => ({
      accessToken,
      isAuthenticated: Boolean(accessToken),
      isLoading,
      authError,
      login,
      logout: () => handleLogout(),
      getAccessToken,
      clearError,
    }),
    [accessToken, authError, clearError, getAccessToken, handleLogout, isLoading, login]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
