import { Redis } from '@upstash/redis';

const STORE_KEY = 'cc_texts';
// 1.5MB cap so player photos (base64 data URLs) fit comfortably; plain text
// values are far below this anyway.
const MAX_VALUE_LEN = 1_500_000;

// Diagnostic: log which env vars are visible to this function at startup.
// Lets us confirm via Vercel logs whether Upstash credentials are reaching
// the runtime. (Logs only the LENGTH of secrets — never the values.)
const ENV_DIAG = {
  hasUrl: !!process.env.UPSTASH_REDIS_REST_URL,
  urlLen: (process.env.UPSTASH_REDIS_REST_URL || '').length,
  hasToken: !!process.env.UPSTASH_REDIS_REST_TOKEN,
  tokenLen: (process.env.UPSTASH_REDIS_REST_TOKEN || '').length,
  hasPassword: !!process.env.EDIT_PASSWORD,
};
console.log('[api/text] env at boot:', ENV_DIAG);

// Use the explicit constructor instead of Redis.fromEnv() so missing env
// vars surface as a clear, throwable error instead of an opaque warning.
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || '';
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || '';
const redis =
  REDIS_URL && REDIS_TOKEN
    ? new Redis({ url: REDIS_URL, token: REDIS_TOKEN })
    : null;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  // Fail fast with a clear error if env vars never reached the runtime.
  if (!redis) {
    return res.status(500).json({
      error: 'redis_not_configured',
      diag: ENV_DIAG,
      hint: 'UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN missing in Vercel env vars (or empty string).',
    });
  }

  if (req.method === 'GET') {
    try {
      const texts = (await redis.get(STORE_KEY)) || {};
      return res.status(200).json(texts);
    } catch (err) {
      console.error('[api/text] GET failed:', err?.message);
      return res.status(500).json({ error: 'fetch_failed', message: err?.message });
    }
  }

  if (req.method === 'POST') {
    const expected = process.env.EDIT_PASSWORD;
    if (!expected) {
      return res.status(500).json({ error: 'server_not_configured' });
    }

    const provided = req.headers['x-edit-password'];
    if (!provided || provided !== expected) {
      return res.status(401).json({ error: 'unauthorized' });
    }

    const body = req.body || {};
    const action = body.action;

    if (action === 'verify') {
      return res.status(200).json({ ok: true });
    }

    const { key, value } = body;
    if (typeof key !== 'string' || !key || typeof value !== 'string') {
      return res.status(400).json({ error: 'invalid_payload' });
    }
    if (value.length > MAX_VALUE_LEN) {
      return res.status(400).json({ error: 'too_long' });
    }
    if (!/^[a-zA-Z0-9_]+$/.test(key) || key.length > 64) {
      return res.status(400).json({ error: 'invalid_key' });
    }

    try {
      const current = (await redis.get(STORE_KEY)) || {};
      current[key] = value.trim();
      await redis.set(STORE_KEY, current);
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error('[api/text] POST save failed:', err?.message);
      return res.status(500).json({ error: 'save_failed', message: err?.message });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'method_not_allowed' });
}
