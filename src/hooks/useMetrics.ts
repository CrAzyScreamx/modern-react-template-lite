import { useState, useEffect, useCallback, useRef } from 'react';
import type { MetricOverview, TimeseriesResult, ApiError } from '../types/api';

export interface MetricsState {
  overview: MetricOverview[] | null;
  timeseries: TimeseriesResult | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useMetrics(token: string | null): MetricsState {
  const [overview, setOverview] = useState<MetricOverview[] | null>(null);
  const [timeseries, setTimeseries] = useState<TimeseriesResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const counterRef = useRef(0);

  const fetchAll = useCallback(() => {
    if (!token) return;

    const fetchId = ++counterRef.current;
    setLoading(true);
    setError(null);

    const headers = { Authorization: `Bearer ${token}` };

    Promise.allSettled([
      fetch('/api/metrics/overview', { headers }),
      fetch('/api/metrics/timeseries?range=30d', { headers }),
    ]).then(async ([overviewResult, timeseriesResult]) => {
      if (fetchId !== counterRef.current) return; // stale

      let newError: string | null = null;

      if (overviewResult.status === 'fulfilled' && overviewResult.value.ok) {
        const data = (await overviewResult.value.json()) as {
          metrics: MetricOverview[];
        };
        setOverview(data.metrics);
      } else if (overviewResult.status === 'fulfilled') {
        const err = (await overviewResult.value.json()) as ApiError;
        newError = err.message;
      } else {
        newError = 'Failed to fetch metrics overview';
      }

      if (
        timeseriesResult.status === 'fulfilled' &&
        timeseriesResult.value.ok
      ) {
        const data = (await timeseriesResult.value.json()) as TimeseriesResult;
        setTimeseries(data);
      } else if (timeseriesResult.status === 'rejected') {
        newError = newError ?? 'Failed to fetch timeseries';
      }

      setError(newError);
      setLoading(false);
    });
  }, [token]);

  useEffect(() => {
    // Call inside a microtask so setState is in an async callback, not
    // synchronously in the effect body (satisfies react-hooks/set-state-in-effect).
    void Promise.resolve().then(fetchAll);
  }, [fetchAll]);

  return { overview, timeseries, loading, error, refresh: fetchAll };
}
