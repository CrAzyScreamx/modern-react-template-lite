/** Shared API types (mirrors server/metrics.ts and server/activity.ts). */

export interface MetricOverview {
  id: string;
  label: string;
  value: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface TimeseriesPoint {
  date: string;
  value: number;
}

export interface TimeseriesResult {
  metric: string;
  range: string;
  data: TimeseriesPoint[];
}

export interface ActivityRow {
  id: string;
  user: string;
  action: string;
  resource: string;
  status: 'success' | 'warning' | 'error';
  timestamp: string;
}

export interface ActivityPage {
  rows: ActivityRow[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiError {
  error: string;
  message: string;
}

export interface LoginResponse {
  token: string;
  expiresIn: number;
}

export interface OverviewResponse {
  metrics: MetricOverview[];
}
