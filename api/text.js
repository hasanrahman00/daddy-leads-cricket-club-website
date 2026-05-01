import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const STORE_KEY = 'cc_texts';
// 1.5MB cap so player photos (base64 data URLs) fit comfortably; plain text
// values are far below this anyway.
const MAX_VALUE_LEN = 1_500_000;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'GET') {
    try {
      const texts = (await redis.get(STORE_KEY)) || {};
      return res.status(200).json(texts);
    } catch (err) {
      return res.status(500).json({ error: 'fetch_failed' });
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
      return res.status(500).json({ error: 'save_failed' });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'method_not_allowed' });
}
