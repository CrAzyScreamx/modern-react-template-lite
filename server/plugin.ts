/**
 * Vite dev-server plugin that mounts the API routes.
 *
 * Uses Vite's configureServer hook to add connect-compatible middleware.
 * All routes are under /api/**.
 */

import type { Plugin } from 'vite';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleLogin, requireAuth } from './auth.js';
import { handleOverview, handleTimeseries } from './metrics.js';
import { handleActivity } from './activity.js';

function readBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk: Buffer) => { data += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(data ? (JSON.parse(data) as unknown) : undefined);
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function parseQuery(url: string): Record<string, string> {
  const idx = url.indexOf('?');
  if (idx === -1) return {};
  const params = new URLSearchParams(url.slice(idx + 1));
  const out: Record<string, string> = {};
  for (const [k, v] of params) out[k] = v;
  return out;
}

function toConnectRes(res: ServerResponse) {
  return {
    set statusCode(v: number) { res.statusCode = v; },
    get statusCode() { return res.statusCode; },
    setHeader(name: string, value: string) { res.setHeader(name, value); },
    end(body: string) { res.end(body); },
  };
}

export function apiPlugin(): Plugin {
  return {
    name: 'vite-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        const url = req.url ?? '/';
        const method = req.method ?? 'GET';

        // CORS for dev
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
        if (method === 'OPTIONS') { res.statusCode = 204; res.end(); return; }

        if (!url.startsWith('/api/')) { next(); return; }

        const cr = toConnectRes(res);
        const cReq = { method, url, headers: req.headers as Record<string, string | string[] | undefined> };

        try {
          // POST /api/auth/login
          if (method === 'POST' && url === '/api/auth/login') {
            const body = await readBody(req);
            await handleLogin(body, cr);
            return;
          }

          // Protected routes
          const claims = await requireAuth(cReq, cr);
          if (!claims) return;

          const query = parseQuery(url);
          const path = url.split('?')[0]!;

          if (method === 'GET' && path === '/api/metrics/overview') {
            handleOverview(cr);
            return;
          }

          if (method === 'GET' && path === '/api/metrics/timeseries') {
            handleTimeseries(query['range'], cr);
            return;
          }

          if (method === 'GET' && path === '/api/activity') {
            handleActivity(query['page'], cr);
            return;
          }

          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'NOT_FOUND', message: 'Route not found' }));
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          const msg = err instanceof Error ? err.message : 'Internal server error';
          res.end(JSON.stringify({ error: 'INTERNAL_ERROR', message: msg }));
        }
      });
    },
  };
}
