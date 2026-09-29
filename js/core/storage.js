// localStorage that never throws (private windows, blocked storage, full quota) and keeps one prefix.
const PREFIX = 'alchemist:';
// The app was called Moleculium before; copy its saved progress once so nobody loses notes or bookmarks.
const LEGACY = 'moleculium:';

try {
  const old = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(LEGACY)) old.push(key);
  }
  for (const key of old) {
    const next = PREFIX + key.slice(LEGACY.length);
    if (localStorage.getItem(next) == null) localStorage.setItem(next, localStorage.getItem(key));
    localStorage.removeItem(key);
  }
} catch {}

export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function remove(key) {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {}
}

/** All Alchemist keys, for export. */
export function dump() {
  const out = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(PREFIX)) out[key.slice(PREFIX.length)] = JSON.parse(localStorage.getItem(key));
    }
  } catch {}
  return out;
}
