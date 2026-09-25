// ChemTaxa · Asynchronous Client-Side Hash Router
import { $ } from './dom.js';

const routes = {
  home: () => import('../pages/home.js'),
  explore: () => import('../pages/explore.js'),
  molecule: () => import('../pages/molecule.js'),
  learn: () => import('../pages/learn.js'),
  lab: () => import('../pages/lab.js'),
  table: () => import('../pages/table.js'),
  compare: () => import('../pages/compare.js'),
  quiz: () => import('../pages/quiz.js'),
  glossary: () => import('../pages/glossary.js'),
  saved: () => import('../pages/saved.js'),
  teacher: () => import('../pages/teacher.js'),
  about: () => import('../pages/about.js'),
};

let currentToken = 0;
let scopedCleanups = [];
const scopedHandlers = [];
let routeHooks = { before: () => {}, after: () => {}, error: () => {} };

export function configureRouter(hooks) {
  routeHooks = { ...routeHooks, ...hooks };
}

export function parseRoute(hash = location.hash) {
  const clean = hash.replace(/^#\/?/, '') || 'home';
  const [pathWithAnchor, queryStr = ''] = clean.split('?');
  const [path, anchor = ''] = pathWithAnchor.split('#');
  const parts = path.split('/');
  const page = parts[0] || 'home';
  const id = parts.slice(1).join('/') || undefined;
  const params = new URLSearchParams(queryStr);

  return { page, id, params, anchor };
}

export function onScoped(type, selector, handler) {
  scopedHandlers.push({ type, selector, handler });
}

function handleScopedEvent(e) {
  for (const h of [...scopedHandlers]) {
    if (h.type !== e.type) continue;
    const target = e.target instanceof Element ? e.target.closest(h.selector) : null;
    if (target) h.handler(e, target);
  }
}

['click', 'input', 'change', 'submit', 'keydown'].forEach(evt =>
  document.addEventListener(evt, handleScopedEvent)
);

export async function navigate(hash) {
  if (location.hash === hash) {
    await renderCurrentRoute();
  } else {
    location.hash = hash;
  }
}

export async function renderCurrentRoute() {
  const token = ++currentToken;

  // Run cleanups
  scopedCleanups.forEach(fn => {
    try { fn(); } catch (_) {}
  });
  scopedCleanups = [];
  scopedHandlers.length = 0;

  const route = parseRoute();
  const main = $('#main');
  if (!main) return;

  routeHooks.before(route);

  const loader = routes[route.page];
  if (!loader) {
    main.innerHTML = `
      <section class="not-found-section container">
        <div class="empty-state">
          <div class="empty-icon">⚛️</div>
          <h2>Halaman Tidak Ditemukan</h2>
          <p>Halaman atau molekul kimia yang Anda cari tidak tersedia di ChemTaxa.</p>
          <a href="#/home" class="btn btn-primary">Kembali ke Beranda</a>
        </div>
      </section>
    `;
    routeHooks.error(route, new Error('Route not found'));
    return;
  }

  main.innerHTML = `
    <div class="status-loading">
      <div class="orbital-spinner" aria-hidden="true">
        <div class="orbit"></div>
        <div class="orbit-2"></div>
        <div class="nucleus"></div>
      </div>
      <p class="loading-text">Memuat materi ChemTaxa…</p>
    </div>
  `;

  try {
    const module = await loader();
    if (token !== currentToken) return; // Stale navigation

    main.dataset.page = route.page;
    window.scrollTo({ top: 0, behavior: 'instant' });

    await module.render({
      ...route,
      main,
      token,
      isCurrent: () => token === currentToken,
      on: onScoped,
      cleanup: fn => scopedCleanups.push(fn),
    });

    if (token !== currentToken) return;

    const baseTitle = 'ChemTaxa · Atlas Molekul Kimia Semesta';
    document.title = module.title ? `${module.title(route)} · ChemTaxa` : baseTitle;

    routeHooks.after(route, main);

    if (route.anchor) {
      const el = document.getElementById(route.anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  } catch (err) {
    if (token !== currentToken) return;
    console.error('Error rendering route:', err);
    main.innerHTML = `
      <section class="error-section container">
        <div class="empty-state">
          <div class="empty-icon">⚠️</div>
          <h2>Terjadi Gangguan</h2>
          <p>Gagal memuat materi kimia. Silakan periksa koneksi internet Anda atau coba lagi.</p>
          <button class="btn btn-outline" onclick="location.reload()">Muat Ulang</button>
        </div>
      </section>
    `;
    routeHooks.error(route, err);
  }
}

window.addEventListener('hashchange', () => renderCurrentRoute());
