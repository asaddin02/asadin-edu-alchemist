// ChemTaxa · Explore & Molecular Search Page
import { $, $$ } from '../core/dom.js';
import { getPrefs } from '../core/prefs.js';
import { getUi } from '../i18n/ui.js';
import { getIcon } from '../components/icons.js';
import { curatedMolecules, moleculeCategories } from '../data/curatedMolecules.js';
import { renderMoleculeCard } from '../components/common.js';
import { searchMolecules } from '../services/pubchem.js';

export function title() {
  return 'Jelajah Molekul';
}

export async function render({ main, params }) {
  const prefs = getPrefs();
  const ui = getUi(prefs.lang);

  const initialQuery = params.get('q') || '';
  const initialCategory = params.get('cat') || 'all';
  const initialLevel = params.get('level') || 'all';
  const initialState = params.get('state') || 'all';

  main.innerHTML = `
    <div class="container" style="padding-top: 40px; padding-bottom: 60px;">
      <div class="section-header">
        <div>
          <h2>${ui.navExplore}</h2>
          <p>Cari dan telusuri ribuan molekul kimia semesta berdasarkan rumus, kategori, dan jenjang sekolah.</p>
        </div>
      </div>

      <!-- Filter Controls Bar -->
      <div class="lab-card" style="margin-bottom: 30px; padding: 24px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; align-items: end;">
          <!-- Keyword Search -->
          <div style="grid-column: 1 / -1;">
            <label style="display:block; font-size: 0.85rem; font-weight:700; margin-bottom: 6px; color: var(--text-muted);">
              Kata Kunci / Rumus Kimia
            </label>
            <div class="search-input-group">
              <span class="search-icon-lead">${getIcon('search', 18)}</span>
              <input type="text" id="explore-query" class="search-input" 
                     placeholder="Contoh: H2O, Kafein, C6H12O6, Asam Sulfat, Garam…" 
                     value="${initialQuery}" />
              <button id="btn-clear-query" class="btn-tool" style="display: ${initialQuery ? 'inline-flex' : 'none'};">✕</button>
            </div>
          </div>

          <!-- Category Filter -->
          <div>
            <label style="display:block; font-size: 0.85rem; font-weight:700; margin-bottom: 6px; color: var(--text-muted);">
              ${ui.filterCategory}
            </label>
            <select id="filter-cat" class="select-level" style="width:100%;">
              <option value="all">${ui.allCategories}</option>
              ${Object.entries(moleculeCategories).map(([key, cat]) => `
                <option value="${key}" ${initialCategory === key ? 'selected' : ''}>${cat.id}</option>
              `).join('')}
            </select>
          </div>

          <!-- Level Filter -->
          <div>
            <label style="display:block; font-size: 0.85rem; font-weight:700; margin-bottom: 6px; color: var(--text-muted);">
              ${ui.filterLevel}
            </label>
            <select id="filter-lvl" class="select-level" style="width:100%;">
              <option value="all">${ui.allLevels}</option>
              <option value="sd" ${initialLevel === 'sd' ? 'selected' : ''}>SD (Mengenal Molekul)</option>
              <option value="smp" ${initialLevel === 'smp' ? 'selected' : ''}>SMP (Atom & Senyawa)</option>
              <option value="sma" ${initialLevel === 'sma' ? 'selected' : ''}>SMA (Geometri & Reaksi)</option>
              <option value="kuliah" ${initialLevel === 'kuliah' ? 'selected' : ''}>Kuliah & Pengajar</option>
            </select>
          </div>

          <!-- State of Matter Filter -->
          <div>
            <label style="display:block; font-size: 0.85rem; font-weight:700; margin-bottom: 6px; color: var(--text-muted);">
              ${ui.filterState}
            </label>
            <select id="filter-state" class="select-level" style="width:100%;">
              <option value="all">${ui.allStates}</option>
              <option value="gas" ${initialState === 'gas' ? 'selected' : ''}>Gas</option>
              <option value="liquid" ${initialState === 'liquid' ? 'selected' : ''}>Cair (Liquid)</option>
              <option value="solid" ${initialState === 'solid' ? 'selected' : ''}>Padat (Solid)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Results Count Bar -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <span id="results-count" style="font-size: 0.95rem; font-weight: 600; color: var(--text-muted);">
          Memuat daftar molekul...
        </span>
        <button id="btn-pubchem-live" class="btn-action" style="display: none;">
          ${getIcon('globe', 16)} <span>Cari di Database Global PubChem NIH</span>
        </button>
      </div>

      <!-- Molecules Results Grid -->
      <div id="explore-results-grid" class="mol-grid"></div>

      <!-- Empty State Container -->
      <div id="explore-empty-state" class="empty-state" style="display: none; padding: 60px 20px; text-align: center;">
        <div style="font-size: 4rem; margin-bottom: 16px;">⚗️</div>
        <h3>${ui.noResults}</h3>
        <p style="color: var(--text-muted); max-width: 480px; margin: 8px auto 20px;">
          ${ui.noResultsDesc}
        </p>
        <button id="btn-trigger-pubchem-search" class="btn-search">
          ${getIcon('globe', 18)} <span>Cari Langsung di Jutaan Molekul PubChem Resmi</span>
        </button>
      </div>
    </div>
  `;

  const queryInput = $('#explore-query');
  const clearBtn = $('#btn-clear-query');
  const catSelect = $('#filter-cat');
  const lvlSelect = $('#filter-lvl');
  const stateSelect = $('#filter-state');
  const grid = $('#explore-results-grid');
  const countLabel = $('#results-count');
  const emptyState = $('#explore-empty-state');
  const liveBtn = $('#btn-pubchem-live');
  const triggerPubChem = $('#btn-trigger-pubchem-search');

  function updateList(customList = null) {
    const q = queryInput.value.trim().toLowerCase();
    const cat = catSelect.value;
    const lvl = lvlSelect.value;
    const state = stateSelect.value;

    let items = customList || curatedMolecules;

    items = items.filter(m => {
      // Keyword match
      if (q) {
        const matchesName = (m.nameId && m.nameId.toLowerCase().includes(q)) ||
                            (m.nameEn && m.nameEn.toLowerCase().includes(q)) ||
                            (m.formula && m.formula.toLowerCase().includes(q)) ||
                            (m.iupac && m.iupac.toLowerCase().includes(q)) ||
                            (m.cid && String(m.cid) === q);
        if (!matchesName) return false;
      }

      // Category match
      if (cat !== 'all' && m.category !== cat) return false;

      // Level match
      if (lvl !== 'all' && m.level !== lvl) return false;

      // State match
      if (state !== 'all' && m.stateAtSTP !== state) return false;

      return true;
    });

    countLabel.textContent = `Menampilkan ${items.length} molekul`;

    if (items.length > 0) {
      grid.innerHTML = items.map(m => renderMoleculeCard(m)).join('');
      grid.style.display = 'grid';
      emptyState.style.display = 'none';
      liveBtn.style.display = q ? 'inline-flex' : 'none';
    } else {
      grid.innerHTML = '';
      grid.style.display = 'none';
      emptyState.style.display = 'block';
      liveBtn.style.display = 'none';
    }
  }

  // Handle PubChem Live Deep Query
  async function performPubChemQuery() {
    const q = queryInput.value.trim();
    if (!q) return;

    countLabel.textContent = `Mencari '${q}' di PubChem NIH…`;
    const results = await searchMolecules(q);
    if (results && results.length > 0) {
      updateList(results);
    } else {
      updateList([]);
    }
  }

  if (queryInput) {
    queryInput.addEventListener('input', () => {
      clearBtn.style.display = queryInput.value.trim() ? 'inline-flex' : 'none';
      updateList();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      queryInput.value = '';
      clearBtn.style.display = 'none';
      updateList();
    });
  }

  [catSelect, lvlSelect, stateSelect].forEach(sel => {
    if (sel) sel.addEventListener('change', () => updateList());
  });

  if (liveBtn) liveBtn.addEventListener('click', performPubChemQuery);
  if (triggerPubChem) triggerPubChem.addEventListener('click', performPubChemQuery);

  // Initial update
  updateList();
}
