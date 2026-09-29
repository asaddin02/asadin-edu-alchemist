// Hash router: #/page/id?key=value. Pages are ES modules loaded on demand; each exports
// render(ctx) and optionally title(route). ctx.cleanup(fn) registers work to undo when leaving the page.
import { $, esc } from './dom.js';
import { pick } from './prefs.js';

// Page modules, loaded on demand.
const PAGES = Object.fromEntries(
  [
    'home',
    'explore',
    'molecule',
    'classes',
    'table',
    'atom',
    'learn',
    'lab',
    'quiz',
    'compare',
    'around',
    'glossary',
    'saved',
    'teacher',
    'assignment',
    'about',
    'search',
    'peta',
    'isotope',
    'ion',
    'reaction',
    'material',
  ].map(p => [p, `../pages/${p}.js`])
);
/** Imports a page module; a failed request is retried with a fresh URL because browsers cache import failures. */
const loadPage = path =>
  import(path).catch(() =>
    new Promise(r => setTimeout(r, 500)).then(() => import(`${path}?retry=${Date.now()}`))
  );
export const PAGE_NAMES = Object.keys(PAGES);

let token = 0;
const cleanups = [];
let hooks = { before() {}, after() {} };
export const configureRouter = h => (hooks = { ...hooks, ...h });

export function parseRoute(hash = location.hash) {
  const raw = hash.replace(/^#\/?/, '');
  const [path, query = ''] = raw.split('?');
  const parts = path
    .split('/')
    .filter(Boolean)
    .map(p => {
      try {
        return decodeURIComponent(p);
      } catch {
        return p;
      }
    });
  return {
    page: parts[0] || 'home',
    id: parts.slice(1).join('/') || null,
    params: new URLSearchParams(query),
  };
}

/** Builds "#/page/id?x=1" with encoded parts; empty params are dropped. */
export function routeURL(page, id = null, params = {}) {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v != null && v !== '' && v !== false) q.set(k, v);
  const path = [page, ...(id == null ? [] : String(id).split('/'))].map(encodeURIComponent).join('/');
  return `#/${path}${q.toString() ? `?${q}` : ''}`;
}

/** Changes the query string without re-rendering (filters, tabs). */
export function replaceQuery(params) {
  const { page, id } = parseRoute();
  history.replaceState(history.state, '', routeURL(page, id, params));
}

export const go = hash => {
  if (location.hash === hash) render();
  else location.hash = hash;
};

/** Renders the current route. `navigated` is true when the user moved to another page (not the first load). */
export async function render(navigated = false) {
  const mine = ++token;
  for (const fn of cleanups.splice(0))
    try {
      fn();
    } catch {}
  const route = parseRoute();
  // Recorded when rendering starts: pages may later rewrite the query (filters, tabs).
  const startHash = location.hash;
  const main = $('#main');
  hooks.before(route);
  const loader = Object.hasOwn(PAGES, route.page) ? PAGES[route.page] : null;
  if (!loader) {
    main.innerHTML = notFound();
    document.title = 'Alchemist';
    document.body.dataset.route = startHash;
    return;
  }
  main.setAttribute('aria-busy', 'true');
  try {
    // One retry covers a module request that failed on a flaky connection.
    const mod = await loadPage(loader);
    if (mine !== token) return;
    main.dataset.page = route.page;
    const ctx = {
      ...route,
      main,
      isCurrent: () => mine === token,
      cleanup: fn => cleanups.push(fn),
    };
    await mod.render(ctx);
    if (mine !== token) return;
    const title = mod.title?.(route);
    document.title = title
      ? `${title} · Alchemist`
      : pick(['Alchemist · Ensiklopedia kimia interaktif', 'Alchemist · Interactive chemistry encyclopedia']);
    window.scrollTo(0, 0);
    // After navigation, move focus to the page heading so screen-reader users hear where they are,
    // unless the user has already moved focus elsewhere (for example into the open menu).
    const h1 = main.querySelector('h1');
    const active = document.activeElement;
    if (navigated && h1 && !active?.closest('.drawer, .menu, [role="dialog"]')) {
      h1.setAttribute('tabindex', '-1');
      h1.focus({ preventScroll: true });
    }
    hooks.after(route);
    document.body.dataset.route = startHash;
  } catch (error) {
    if (mine !== token) return;
    console.error(error);
    main.innerHTML = `<section class="container page-state" role="alert">
      <h1>${esc(pick(['Halaman gagal dimuat', 'The page failed to load']))}</h1>
      <p>${esc(pick(['Periksa koneksi internet, lalu coba lagi.', 'Check your internet connection and try again.']))}</p>
      <button class="btn btn-primary" type="button" data-action="reload">${esc(pick(['Coba lagi', 'Try again']))}</button>
      <details class="muted small"><summary>${esc(pick(['Detail teknis', 'Technical details']))}</summary><code>${esc(String(error?.message || error).slice(0, 300))}</code></details>
    </section>`;
    document.body.dataset.route = startHash;
  } finally {
    if (mine === token) main.removeAttribute('aria-busy');
  }
}

/** Only "#/…" hashes are routes; in-page anchors such as the skip link (#main) are left alone. */
const isRoute = () => !location.hash || location.hash.startsWith('#/');

function notFound() {
  return `<section class="container page-state">
    <h1>${esc(pick(['Halaman tidak ditemukan', 'Page not found']))}</h1>
    <p>${esc(pick(['Alamat ini tidak ada di Alchemist.', 'This address does not exist in Alchemist.']))}</p>
    <a class="btn btn-primary" href="#/">${esc(pick(['Ke beranda', 'Go home']))}</a>
  </section>`;
}

window.addEventListener('hashchange', () => isRoute() && render(true));
document.addEventListener('click', e => {
  // A full reload also clears module requests the browser has cached as failed.
  if (e.target.closest('[data-action="reload"]')) location.reload();
});
