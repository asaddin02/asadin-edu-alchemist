// DOM helpers shared by every page.
export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
/** Escapes text for HTML content and attribute values. */
export const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ESC[c]);

let toastTimer = 0;
/** Short status message announced to screen readers (the #toast region is aria-live). */
export function toast(message, tone = 'info') {
  const box = $('#toast');
  if (!box) return;
  box.innerHTML = `<div class="toast toast-${tone}">${esc(message)}</div>`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (box.innerHTML = ''), 4000);
}

/** Returns the URL when it is http(s), else '' — third-party data must never yield javascript: links. */
export const safeURL = url => (/^https?:\/\//i.test(String(url || '').trim()) ? String(url).trim() : '');

export function debounce(fn, ms = 250) {
  let t = 0;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

/** JSON → URL-safe base64 (UTF-8), used for shareable assignment links. */
export function encodeData(obj) {
  const bytes = new TextEncoder().encode(JSON.stringify(obj));
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
export function decodeData(text) {
  try {
    const bin = atob(String(text).replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0))));
  } catch {
    return null;
  }
}

/** Saves text as a file download (notes export, worksheets). */
export function download(filename, text, type = 'application/json') {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const shuffle = list => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
