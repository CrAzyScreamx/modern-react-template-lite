import { useState, useCallback } from 'react';
import type { LoginResponse, ApiError } from '../types/api';

const TOKEN_KEY = 'metrics-token';

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export function useAuth(): AuthState & AuthActions {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        if (!res.ok) {
          const err = (await res.json()) as ApiError;
          setError(err.message);
          return false;
        }
        const data = (await res.json()) as LoginResponse;
        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        return true;
      } catch {
        setError('Network error — could not reach the server');
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, []);

  return { token, loading, error, login, logout };
}
