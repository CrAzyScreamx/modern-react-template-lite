/**
 * JWT auth utilities + login/requireAuth middleware.
 *
 * Uses the Web Crypto API (no external deps) with HS256.
 * Secret is read from JWT_SECRET env var; falls back to a stub in dev.
 */

const JWT_SECRET = process.env['JWT_SECRET'] ?? 'dev-stub-secret-change-in-prod';
const TOKEN_TTL_SECONDS = 900; // 15 min

// Stub credentials – replace with a real user store
const STUB_USERS: Record<string, string> = {
  admin: 'password123',
};

// ── helpers ──────────────────────────────────────────────────────────────────

function base64UrlEncode(bytes: Uint8Array | ArrayBuffer): string {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  return btoa(String.fromCharCode(...view))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function base64UrlDecode(str: string): string {
  return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
}

async function hmacKey(secret: string, usage: 'sign' | 'verify'): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    [usage],
  );
}

// ── public API ────────────────────────────────────────────────────────────────

export interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
}

export async function signJwt(subject: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload: JwtPayload = { sub: subject, iat: now, exp: now + TOKEN_TTL_SECONDS };

  const headerB64 = base64UrlEncode(new TextEncoder().encode(JSON.stringify(header)));
  const payloadB64 = base64UrlEncode(new TextEncoder().encode(JSON.stringify(payload)));
  const message = `${headerB64}.${payloadB64}`;

  const key = await hmacKey(JWT_SECRET, 'sign');
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));

  return `${message}.${base64UrlEncode(sig)}`;
}

export async function verifyJwt(token: string): Promise<JwtPayload> {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Malformed token');

  const [headerB64, payloadB64, sigB64] = parts as [string, string, string];
  const message = `${headerB64}.${payloadB64}`;

  const sigBytes = Uint8Array.from(base64UrlDecode(sigB64), (c) => c.charCodeAt(0));
  const key = await hmacKey(JWT_SECRET, 'verify');
  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    sigBytes,
    new TextEncoder().encode(message),
  );
  if (!valid) throw new Error('Invalid signature');

  const claims = JSON.parse(base64UrlDecode(payloadB64)) as JwtPayload;
  if (claims.exp < Math.floor(Date.now() / 1000)) throw new Error('Token expired');

  return claims;
}

// ── structured error helper ───────────────────────────────────────────────────

export interface ApiError {
  error: string;
  message: string;
}

export function apiError(error: string, message: string): ApiError {
  return { error, message };
}

// ── connect-style middleware / handlers ───────────────────────────────────────

export interface ConnectRequest {
  method?: string;
  url?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
}

export interface ConnectResponse {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(body: string): void;
}

/** POST /api/auth/login – validates credentials, returns a JWT. */
export async function handleLogin(
  body: unknown,
  res: ConnectResponse,
): Promise<void> {
  if (
    typeof body !== 'object' ||
    body === null ||
    typeof (body as Record<string, unknown>)['username'] !== 'string' ||
    typeof (body as Record<string, unknown>)['password'] !== 'string'
  ) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(apiError('VALIDATION_ERROR', 'username and password are required')));
    return;
  }

  const { username, password } = body as { username: string; password: string };
  if (STUB_USERS[username] !== password) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(apiError('INVALID_CREDENTIALS', 'Username or password is incorrect')));
    return;
  }

  const token = await signJwt(username);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ token, expiresIn: TOKEN_TTL_SECONDS }));
}

/** Extracts and verifies the Bearer token from the Authorization header. */
export async function requireAuth(
  req: ConnectRequest,
  res: ConnectResponse,
): Promise<JwtPayload | null> {
  const auth = req.headers['authorization'];
  const raw = Array.isArray(auth) ? auth[0] : auth;

  if (!raw || !raw.startsWith('Bearer ')) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(apiError('UNAUTHORIZED', 'Bearer token required')));
    return null;
  }

  try {
    return await verifyJwt(raw.slice(7));
  } catch {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(apiError('UNAUTHORIZED', 'Invalid or expired token')));
    return null;
  }
}
