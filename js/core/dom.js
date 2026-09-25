// ChemTaxa · DOM Helpers & UI Utilities
export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

export function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function toast(message, type = 'info', duration = 3000) {
  let container = $('#toast');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const el = document.createElement('div');
  el.className = `toast-item toast-${type}`;
  el.innerHTML = `<span class="toast-msg">${escapeHtml(message)}</span>`;
  container.appendChild(el);

  requestAnimationFrame(() => {
    el.classList.add('show');
  });

  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 350);
  }, duration);
}
