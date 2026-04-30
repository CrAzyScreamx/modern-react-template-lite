import { describe, it, expect, afterAll } from 'vitest';
import { app } from './index.ts';
import type { Server } from 'node:http';

describe('GET /health', () => {
  let server: Server;
  let baseUrl: string;

  it('returns {"status":"ok"} with HTTP 200', async () => {
    await new Promise<void>((resolve) => {
      server = app.listen(0, () => {
        const address = server.address() as { port: number };
        baseUrl = `http://localhost:${address.port}`;
        resolve();
      });
    });

    const res = await fetch(`${baseUrl}/health`);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toMatch(/application\/json/);
    expect(body).toEqual({ status: 'ok' });
  });

  afterAll(() => {
    server?.close();
  });
});
