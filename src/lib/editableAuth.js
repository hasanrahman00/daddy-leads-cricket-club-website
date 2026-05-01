// Shared auth helpers for any inline-editable component on the site.
// Single source of truth for the password prompt + 10-min idle auto-lock.

const PW_SESSION_KEY = '__cc_edit_pw__';
const PW_EXPIRES_KEY = '__cc_edit_pw_expires__';
const IDLE_MS = 10 * 60 * 1000; // 10 minutes

export function refreshUnlock() {
  sessionStorage.setItem(PW_EXPIRES_KEY, String(Date.now() + IDLE_MS));
}

export function clearUnlock() {
  sessionStorage.removeItem(PW_SESSION_KEY);
  sessionStorage.removeItem(PW_EXPIRES_KEY);
}

export function getValidPassword() {
  const pw = sessionStorage.getItem(PW_SESSION_KEY);
  const exp = parseInt(sessionStorage.getItem(PW_EXPIRES_KEY) || '0', 10);
  if (!pw || !exp || Date.now() >= exp) {
    if (pw || exp) clearUnlock();
    return null;
  }
  return pw;
}

async function verifyPassword(pw) {
  try {
    const res = await fetch('/api/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Edit-Password': pw },
      body: JSON.stringify({ action: 'verify' }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function ensurePassword() {
  const cached = getValidPassword();
  if (cached) {
    refreshUnlock();
    return cached;
  }

  const entered = window.prompt('Enter your edit password:');
  if (!entered) return null;

  const ok = await verifyPassword(entered);
  if (!ok) {
    window.alert('Wrong password.');
    return null;
  }
  sessionStorage.setItem(PW_SESSION_KEY, entered);
  refreshUnlock();
  return entered;
}

// POST a key/value to the editable-text endpoint, with full error handling.
// Returns { ok: true } on success, { ok: false, reason } otherwise.
export async function saveValue(key, value) {
  const pw = getValidPassword();
  if (!pw) return { ok: false, reason: 'locked' };

  try {
    const res = await fetch('/api/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Edit-Password': pw },
      body: JSON.stringify({ key, value }),
    });
    if (res.ok) {
      refreshUnlock();
      return { ok: true };
    }
    if (res.status === 401) {
      clearUnlock();
      return { ok: false, reason: 'unauthorized' };
    }
    if (res.status === 400) {
      return { ok: false, reason: 'invalid' };
    }
    return { ok: false, reason: 'server' };
  } catch {
    return { ok: false, reason: 'network' };
  }
}
