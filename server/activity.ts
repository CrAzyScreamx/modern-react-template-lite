/**
 * Activity handler – paginated list of recent events.
 */

import type { ConnectResponse } from './auth.js';

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

const ACTIONS = ['login', 'logout', 'create', 'update', 'delete', 'export', 'import'] as const;
const RESOURCES = ['user', 'report', 'dashboard', 'settings', 'api_key', 'webhook'] as const;
const STATUSES = ['success', 'success', 'success', 'warning', 'error'] as const; // weighted
const NAMES = [
  'Alice Johnson', 'Bob Smith', 'Carol White', 'David Brown', 'Eve Davis',
  'Frank Wilson', 'Grace Lee', 'Henry Miller', 'Iris Taylor', 'Jack Anderson',
];

function seeded(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function pick<T>(arr: readonly T[], r: number): T {
  return arr[Math.floor(r * arr.length)] as T;
}

export const PAGE_SIZE = 10;
const TOTAL_ROWS = 87; // realistic-feeling total

export function generateAllActivity(): ActivityRow[] {
  const rand = seeded(99);
  const now = Date.now();

  return Array.from({ length: TOTAL_ROWS }, (_, i) => {
    const ago = (TOTAL_ROWS - i) * 7 * 60 * 1000; // ~7 min apart
    return {
      id: `act-${i + 1}`,
      user: pick(NAMES, rand()),
      action: pick(ACTIONS, rand()),
      resource: pick(RESOURCES, rand()),
      status: pick(STATUSES, rand()),
      timestamp: new Date(now - ago).toISOString(),
    };
  });
}

const ALL_ACTIVITY = generateAllActivity();

export function paginateActivity(page: number): ActivityPage {
  const safeP = Math.max(1, page);
  const start = (safeP - 1) * PAGE_SIZE;
  const rows = ALL_ACTIVITY.slice(start, start + PAGE_SIZE);

  return {
    rows,
    page: safeP,
    pageSize: PAGE_SIZE,
    total: TOTAL_ROWS,
    totalPages: Math.ceil(TOTAL_ROWS / PAGE_SIZE),
  };
}

export function handleActivity(pageParam: string | undefined, res: ConnectResponse): void {
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  if (isNaN(page) || page < 1) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'VALIDATION_ERROR', message: 'page must be a positive integer' }));
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(paginateActivity(page)));
}
