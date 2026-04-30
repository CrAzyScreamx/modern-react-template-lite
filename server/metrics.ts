/**
 * Metrics handlers – overview and timeseries.
 *
 * All data is deterministic in-memory mock data.
 */

export interface MetricOverview {
  id: string;
  label: string;
  value: number;
  unit: string;
  change: number; // percentage vs previous period
  trend: 'up' | 'down' | 'neutral';
}

export interface TimeseriesPoint {
  date: string; // ISO date string (YYYY-MM-DD)
  value: number;
}

export interface TimeseriesResult {
  metric: string;
  range: string;
  data: TimeseriesPoint[];
}

// ── data generators ───────────────────────────────────────────────────────────

/** Deterministic seeded pseudo-random (for consistent test snapshots). */
function seeded(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

export function generateOverview(): MetricOverview[] {
  return [
    { id: 'active_users', label: 'Active Users', value: 12_847, unit: '', change: 8.3, trend: 'up' },
    { id: 'revenue', label: 'Revenue', value: 94_230, unit: '$', change: 12.1, trend: 'up' },
    { id: 'signups_today', label: 'Signups Today', value: 243, unit: '', change: -4.2, trend: 'down' },
    { id: 'churn_rate', label: 'Churn Rate', value: 2.4, unit: '%', change: -0.3, trend: 'up' }, // lower is better
    { id: 'mrr', label: 'MRR', value: 31_400, unit: '$', change: 6.7, trend: 'up' },
    { id: 'latency_p95', label: 'Latency p95', value: 142, unit: 'ms', change: -18, trend: 'up' }, // lower is better
  ];
}

export function generateTimeSeries(days: number, seed = 42): TimeseriesPoint[] {
  const rand = seeded(seed);
  const base = 1000;
  const today = new Date();

  return Array.from({ length: days }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (days - 1 - i));
    const noise = rand() * 200 - 100;
    const trend = i * 3;
    const seasonal = Math.sin((i / days) * Math.PI * 2) * 150;
    return {
      date: d.toISOString().slice(0, 10),
      value: Math.max(0, Math.round(base + trend + seasonal + noise)),
    };
  });
}

/** Parse range query param like "30d" → number of days (capped at 90). */
export function parseRange(range: string | undefined): number {
  if (!range) return 30;
  const match = /^(\d+)d$/.exec(range);
  if (!match || !match[1]) return 30;
  const days = parseInt(match[1], 10);
  return Math.min(Math.max(1, days), 90);
}

// ── handlers ──────────────────────────────────────────────────────────────────

import type { ConnectResponse } from './auth.js';

export function handleOverview(res: ConnectResponse): void {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ metrics: generateOverview() }));
}

export function handleTimeseries(rangeParam: string | undefined, res: ConnectResponse): void {
  const days = parseRange(rangeParam);
  const result: TimeseriesResult = {
    metric: 'active_users',
    range: `${days}d`,
    data: generateTimeSeries(days),
  };
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(result));
}
