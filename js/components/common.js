// ChemTaxa · Common UI Components & Card Renderers
import { getPrefs } from '../core/prefs.js';
import { getUi } from '../i18n/ui.js';
import { getIcon } from './icons.js';
import { isBookmarked } from '../core/userdata.js';

export function renderMoleculeCard(m) {
  const prefs = getPrefs();
  const lang = prefs.lang;
  const name = lang === 'en' ? (m.nameEn || m.nameId) : (m.nameId || m.nameEn);
  const summary = lang === 'en' ? (m.summaryEn || m.summaryId) : (m.summaryId || m.summaryEn);
  const bookmarked = isBookmarked(m.id);

  const levelLabels = {
    sd: { text: 'SD', color: '#10b981' },
    smp: { text: 'SMP', color: '#06b6d4' },
    sma: { text: 'SMA', color: '#8b5cf6' },
    kuliah: { text: 'Kuliah', color: '#ec4899' }
  };
  const lvl = levelLabels[m.level] || levelLabels.sma;

  return `
    <article class="mol-card" data-mol-id="${m.id}">
      <div class="mol-card-header">
        <span class="badge badge-lvl" style="--badge-col: ${lvl.color}">${lvl.text}</span>
        <button class="btn-icon btn-bookmark ${bookmarked ? 'active' : ''}" 
                data-bookmark-id="${m.id}" 
                title="${bookmarked ? 'Hapus bookmark' : 'Simpan molekul'}"
                aria-label="Simpan molekul ${name}">
          ${getIcon(bookmarked ? 'bookmarkFill' : 'bookmark', 18)}
        </button>
      </div>

      <div class="mol-card-visual">
        ${m.cid ? `
          <img src="https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${m.cid}/PNG" 
               alt="Struktur 2D ${name}" 
               class="mol-2d-img" 
               loading="lazy"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <div class="mol-fallback-icon" style="display:none;">
            ${getIcon('molecule', 48)}
          </div>
        ` : `
          <div class="mol-fallback-icon">
            ${getIcon('molecule', 48)}
          </div>
        `}
      </div>

      <div class="mol-card-body">
        <div class="mol-formula">${m.formula || 'Molekul'}</div>
        <h3 class="mol-name">
          <a href="#/molecule/${m.id}">${name}</a>
        </h3>
        <p class="mol-summary">${summary}</p>

        <div class="mol-meta-row">
          ${m.mass ? `<span class="meta-tag">Mr ${m.mass}</span>` : ''}
          ${m.stateAtSTP ? `<span class="meta-tag">${m.stateAtSTP}</span>` : ''}
        </div>
      </div>

      <div class="mol-card-footer">
        <a href="#/molecule/${m.id}" class="btn-card-link">
          <span>Pelajari & 3D</span>
          <span class="arrow">→</span>
        </a>
      </div>
    </article>
  `;
}

export function renderNFPADiamond(safety = {}) {
  const h = safety.health ?? 0;
  const f = safety.flammability ?? 0;
  const r = safety.instability ?? 0;

  return `
    <div class="nfpa-diamond-wrap" title="Standar Bahaya NFPA 704: Biru=Kesehatan, Merah=Mudah Terbakar, Kuning=Reaktivitas">
      <div class="nfpa-diamond">
        <div class="nfpa-cell nfpa-top" style="background:#ef4444; color:#fff;">${f}</div>
        <div class="nfpa-cell nfpa-left" style="background:#3b82f6; color:#fff;">${h}</div>
        <div class="nfpa-cell nfpa-right" style="background:#eab308; color:#000;">${r}</div>
        <div class="nfpa-cell nfpa-bottom" style="background:#fff; color:#000;">-</div>
      </div>
      <div class="nfpa-legend">
        <span><strong style="color:#ef4444">F:${f}</strong> Api</span>
        <span><strong style="color:#3b82f6">H:${h}</strong> Bahaya</span>
        <span><strong style="color:#eab308">R:${r}</strong> Reaktif</span>
      </div>
    </div>
  `;
}
