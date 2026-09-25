// ChemTaxa · Home Landing Page
import { $, $$ } from '../core/dom.js';
import { getPrefs } from '../core/prefs.js';
import { getUi } from '../i18n/ui.js';
import { getIcon } from '../components/icons.js';
import { curatedMolecules } from '../data/curatedMolecules.js';
import { renderMoleculeCard } from '../components/common.js';
import { MoleculeViewer3D } from '../components/moleculeViewer3D.js';
import { searchMolecules } from '../services/pubchem.js';

export function title() {
  return 'Beranda';
}

export async function render({ main, on, cleanup }) {
  const prefs = getPrefs();
  const ui = getUi(prefs.lang);

  // Molecule of the Day: Caffeine or Water
  const heroMol = curatedMolecules.find(m => m.id === 'caffeine') || curatedMolecules[0];

  // Group curated by level
  const sdMols = curatedMolecules.filter(m => m.level === 'sd');
  const smpMols = curatedMolecules.filter(m => m.level === 'smp');
  const smaMols = curatedMolecules.filter(m => m.level === 'sma');
  const univMols = curatedMolecules.filter(m => m.level === 'kuliah');

  main.innerHTML = `
    <!-- Hero Section -->
    <section class="hero-section container">
      <div class="hero-grid">
        <div class="hero-content">
          <div class="hero-badge">
            ${getIcon('atom', 16)}
            <span>ATLAS MOLEKUL KIMIA TERBUKA</span>
          </div>

          <h1 class="hero-title">
            Jelajahi Rahasia <br/>
            <span class="gradient-text">Struktur Molekul</span> Alam Semesta
          </h1>

          <p class="hero-desc">
            Dari segelas air hingga DNA kehidupan. Pelajari geometri 3D, ikatan atom, dan reaksi kimia dengan data resmi langsung dari PubChem NIH untuk SD, SMP, SMA, hingga Kuliah.
          </p>

          <!-- Search Bar -->
          <div class="search-box-wrap" id="hero-search-wrap">
            <form id="hero-search-form" class="search-input-group" role="search">
              <span class="search-icon-lead">${getIcon('search', 20)}</span>
              <input type="text" 
                     id="hero-search-input" 
                     class="search-input" 
                     placeholder="${ui.searchPlaceholder}" 
                     autocomplete="off" 
                     aria-label="Cari molekul" />
              <button type="submit" class="btn-search">
                ${getIcon('search', 16)}
                <span>${ui.searchBtn}</span>
              </button>
            </form>
            <div id="hero-suggest-box" class="suggest-dropdown" hidden></div>
          </div>

          <!-- Quick Tags -->
          <div class="quick-tags">
            <span>Rekomendasi Cepat:</span>
            <a href="#/molecule/water" class="quick-tag-pill">💧 Air (H₂O)</a>
            <a href="#/molecule/oxygen" class="quick-tag-pill">💨 Oksigen (O₂)</a>
            <a href="#/molecule/salt-nacl" class="quick-tag-pill">🧂 Garam (NaCl)</a>
            <a href="#/molecule/caffeine" class="quick-tag-pill">☕ Kafein</a>
            <a href="#/molecule/aspirin" class="quick-tag-pill">💊 Aspirin</a>
            <a href="#/molecule/graphene" class="quick-tag-pill">🔬 Grafena</a>
          </div>
        </div>

        <!-- Hero 3D Interactive Card -->
        <div class="hero-3d-card">
          <div class="hero-3d-header">
            <span class="hero-3d-title">
              ${getIcon('molecule', 18)}
              <span>Molekul Pilihan Hari Ini</span>
            </span>
            <span class="badge-lvl" style="--badge-col: var(--neon-cyan)">3D Interaktif</span>
          </div>

          <div class="hero-3d-viewer-box" id="hero-viewer-container"></div>

          <div class="hero-3d-footer">
            <div class="hero-mol-info">
              <h4>${prefs.lang === 'en' ? heroMol.nameEn : heroMol.nameId} (${heroMol.formula})</h4>
              <span>Putar dengan mouse atau sentuhan jari</span>
            </div>
            <a href="#/molecule/${heroMol.id}" class="btn-action">
              <span>Rincian Lengkap</span> →
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Level Track Pathway Showcase -->
    <section class="container" style="margin-top: 40px; margin-bottom: 50px;">
      <div class="section-header">
        <div>
          <h2>Pilih Jenjang Belajarmu</h2>
          <p>Materi, visual 3D, dan kedalaman penjelasan otomatis disesuaikan dengan tingkat pemahamanmu.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
        <div class="mol-card" style="cursor: pointer;" onclick="document.querySelector('#level-select').value='sd'; document.querySelector('#level-select').dispatchEvent(new Event('change'));">
          <div style="font-size: 2rem; margin-bottom: 8px;">🌱</div>
          <h3 style="font-size: 1.15rem; color: #10b981; margin-bottom: 6px;">Sekolah Dasar (SD)</h3>
          <p style="font-size: 0.88rem; color: var(--text-muted);">${ui.levelDescSD}</p>
        </div>

        <div class="mol-card" style="cursor: pointer;" onclick="document.querySelector('#level-select').value='smp'; document.querySelector('#level-select').dispatchEvent(new Event('change'));">
          <div style="font-size: 2rem; margin-bottom: 8px;">⚡</div>
          <h3 style="font-size: 1.15rem; color: #06b6d4; margin-bottom: 6px;">SMP (Menengah Pertama)</h3>
          <p style="font-size: 0.88rem; color: var(--text-muted);">${ui.levelDescSMP}</p>
        </div>

        <div class="mol-card" style="cursor: pointer;" onclick="document.querySelector('#level-select').value='sma'; document.querySelector('#level-select').dispatchEvent(new Event('change'));">
          <div style="font-size: 2rem; margin-bottom: 8px;">🔬</div>
          <h3 style="font-size: 1.15rem; color: #8b5cf6; margin-bottom: 6px;">SMA (Menengah Atas)</h3>
          <p style="font-size: 0.88rem; color: var(--text-muted);">${ui.levelDescSMA}</p>
        </div>

        <div class="mol-card" style="cursor: pointer;" onclick="document.querySelector('#level-select').value='kuliah'; document.querySelector('#level-select').dispatchEvent(new Event('change'));">
          <div style="font-size: 2rem; margin-bottom: 8px;">🌌</div>
          <h3 style="font-size: 1.15rem; color: #ec4899; margin-bottom: 6px;">Kuliah & Pengajar</h3>
          <p style="font-size: 0.88rem; color: var(--text-muted);">${ui.levelDescUniv}</p>
        </div>
      </div>
    </section>

    <!-- Curated Molecular Rails -->
    <section class="container" style="margin-bottom: 60px;">
      <div class="section-header">
        <div>
          <h2>Molekul Esensial Terpopuler</h2>
          <p>Koleksi molekul fundamental pembentuk kehidupan, atmosfer bumi, dan teknologi modern.</p>
        </div>
        <a href="#/explore" class="btn-action">
          <span>${ui.exploreAll}</span> →
        </a>
      </div>

      <div class="mol-grid">
        ${curatedMolecules.slice(0, 8).map(m => renderMoleculeCard(m)).join('')}
      </div>
    </section>

    <!-- Quick Tools Callout -->
    <section class="container" style="margin-bottom: 60px;">
      <div class="hero-3d-card" style="background: linear-gradient(135deg, rgba(14,21,37,0.9) 0%, rgba(139,92,246,0.15) 100%);">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; align-items: center;">
          <div>
            <span class="hero-badge">${getIcon('flask', 16)} FITUR INTERAKTIF</span>
            <h2 style="font-size: 2rem; margin-bottom: 12px;">Laboratorium Virtual 3D & Kalkulator Stoikiometri</h2>
            <p style="color: var(--text-muted); margin-bottom: 20px;">
              Rakit molekulmu sendiri, amati simulasi reaksi kimia pengikatan elektron, hitung massa molar rumus senyawa, dan uji keasaman larutan dengan simulasi pH interaktif!
            </p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <a href="#/lab" class="btn-search">Buka Lab Virtual</a>
              <a href="#/table" class="btn-action">Tabel Periodik 118 Unsur</a>
              <a href="#/quiz" class="btn-action">Uji di Kuis</a>
            </div>
          </div>
          <div style="text-align: center; font-size: 5rem;" aria-hidden="true">
            🧪 ⚗️ ⚛️
          </div>
        </div>
      </div>
    </section>
  `;

  // Initialize 3D Hero Viewer
  const viewerContainer = $('#hero-viewer-container');
  let viewerInstance = null;
  if (viewerContainer) {
    viewerInstance = new MoleculeViewer3D(viewerContainer, { autoRotate: true, showLabels: true });
    viewerInstance.setData(heroMol.atoms3D, heroMol.bonds3D);
    cleanup(() => viewerInstance.destroy());
  }

  // Handle Search Input & Suggestions
  const searchForm = $('#hero-search-form');
  const searchInput = $('#hero-search-input');
  const suggestBox = $('#hero-suggest-box');

  if (searchForm && searchInput && suggestBox) {
    let debounceTimer = null;

    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      const val = searchInput.value.trim();
      if (!val) {
        suggestBox.hidden = true;
        return;
      }

      debounceTimer = setTimeout(async () => {
        const results = await searchMolecules(val);
        if (results && results.length > 0) {
          suggestBox.innerHTML = results.map(r => `
            <div class="suggest-item" data-goto="${r.isRemote ? r.remoteQuery : r.id}">
              <div class="suggest-main">
                <span class="suggest-title">${r.nameId || r.nameEn}</span>
                <span class="suggest-sub">${r.nameEn || ''}</span>
              </div>
              <span class="suggest-pill">${r.formula || 'Molekul'}</span>
            </div>
          `).join('');
          suggestBox.hidden = false;
        } else {
          suggestBox.hidden = true;
        }
      }, 250);
    });

    searchForm.addEventListener('submit', e => {
      e.preventDefault();
      const val = searchInput.value.trim();
      if (val) {
        location.hash = `#/explore?q=${encodeURIComponent(val)}`;
      }
    });

    suggestBox.addEventListener('click', e => {
      const item = e.target.closest('.suggest-item');
      if (item && item.dataset.goto) {
        location.hash = `#/molecule/${encodeURIComponent(item.dataset.goto)}`;
      }
    });

    document.addEventListener('click', e => {
      if (!e.target.closest('#hero-search-wrap')) {
        suggestBox.hidden = true;
      }
    });
  }
}
