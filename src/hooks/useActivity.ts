import { useState, useEffect, useCallback } from 'react';
import type { ActivityPage, ApiError } from '../types/api';

export interface ActivityState {
  data: ActivityPage | null;
  loading: boolean;
  error: string | null;
  page: number;
  setPage: (p: number) => void;
}

export function useActivity(token: string | null): ActivityState {
  const [data, setData] = useState<ActivityPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const fetchPage = useCallback(
    async (p: number) => {
      if (!token) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/activity?page=${p}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          const err = (await res.json()) as ApiError;
          setError(err.message);
          return;
        }
        setData((await res.json()) as ActivityPage);
      } catch {
        setError('Failed to fetch activity');
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    void fetchPage(page);
  }, [fetchPage, page]);

  return { data, loading, error, page, setPage };
}
