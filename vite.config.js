import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Local-dev replacement for the Vercel /api/text serverless function.
// In production the real api/text.js runs on Vercel and writes to Upstash.
// In `vite dev` we serve the same shape from in-memory storage so the
// EditableText component works end-to-end without any backend setup.
function devApiTextPlugin(env) {
  const EDIT_PASSWORD = env.EDIT_PASSWORD || '';
  const store = {}; // resets when dev server restarts

  const send = (res, status, body) => {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify(body));
  };

  const readBody = (req) =>
    new Promise((resolve) => {
      let raw = '';
      req.on('data', (chunk) => {
        raw += chunk;
      });
      req.on('end', () => {
        try {
          resolve(raw ? JSON.parse(raw) : {});
        } catch {
          resolve({});
        }
      });
    });

  return {
    name: 'dev-api-text',
    configureServer(server) {
      server.middlewares.use('/api/text', async (req, res, next) => {
        if (req.method === 'GET') {
          return send(res, 200, store);
        }

        if (req.method === 'POST') {
          if (!EDIT_PASSWORD) {
            return send(res, 500, { error: 'EDIT_PASSWORD missing in .env' });
          }

          const provided = req.headers['x-edit-password'];
          if (!provided || provided !== EDIT_PASSWORD) {
            return send(res, 401, { error: 'unauthorized' });
          }

          const body = await readBody(req);

          if (body.action === 'verify') {
            return send(res, 200, { ok: true });
          }

          const { key, value } = body;
          if (typeof key !== 'string' || !key || typeof value !== 'string') {
            return send(res, 400, { error: 'invalid_payload' });
          }
          if (value.length > 1_500_000) {
            return send(res, 400, { error: 'too_long' });
          }
          if (!/^[a-zA-Z0-9_]+$/.test(key) || key.length > 64) {
            return send(res, 400, { error: 'invalid_key' });
          }

          store[key] = value.trim();
          return send(res, 200, { ok: true });
        }

        return next();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), devApiTextPlugin(env)],
    server: {
      port: 5173,
      open: true,
    },
  };
});
