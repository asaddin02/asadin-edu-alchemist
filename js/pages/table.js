// ChemTaxa · Interactive Periodic Table of Elements
import { $, $$ } from '../core/dom.js';
import { getPrefs } from '../core/prefs.js';
import { getUi } from '../i18n/ui.js';
import { getIcon } from '../components/icons.js';
import { elements, categories, getElement } from '../data/periodicTable.js';
import { curatedMolecules } from '../data/curatedMolecules.js';

export function title() {
  return 'Tabel Periodik 118 Unsur';
}

export async function render({ main }) {
  const prefs = getPrefs();
  const ui = getUi(prefs.lang);

  // Group elements into grid layout
  // Periods 1 to 7, Groups 1 to 18
  const defaultSelected = elements[0]; // Hydrogen

  main.innerHTML = `
    <div class="table-wrap container">
      <div class="section-header">
        <div>
          <h2>${ui.navTable}</h2>
          <p>Tabel periodik unsur kimia interaktif: pelajari nomor atom, massa, elektronegativitas, dan jembatan ke molekul-molekul semesta.</p>
        </div>
      </div>

      <!-- Categories Legend -->
      <div class="ptable-legend">
        ${Object.entries(categories).map(([k, c]) => `
          <div class="legend-pill">
            <span class="legend-dot" style="--cat-col: ${c.color}"></span>
            <span>${prefs.lang === 'en' ? c.en : c.id}</span>
          </div>
        `).join('')}
      </div>

      <div style="display: grid; grid-template-columns: 2.5fr 1fr; gap: 24px; align-items: start;">
        <!-- Periodic Table Grid Container -->
        <div class="lab-card" style="padding: 16px; overflow-x: auto;">
          <div class="ptable-grid" style="display: grid; grid-template-columns: repeat(18, minmax(48px, 1fr)); gap: 4px;">
            ${elements.map(el => {
              const catObj = categories[el.cat] || { color: '#64748b' };
              const colStart = el.group;
              const rowStart = el.period;

              return `
                <div class="ptable-cell" 
                     data-atomic-num="${el.n}"
                     style="grid-column: ${colStart}; grid-row: ${rowStart}; border-color: ${catObj.color}40; background: ${catObj.color}15;"
                     title="${el.nameId} (${el.s}) - No: ${el.n}, Massa: ${el.mass}">
                  <span class="ptable-num">${el.n}</span>
                  <span class="ptable-sym" style="color: ${catObj.color};">${el.s}</span>
                  <span class="ptable-name">${el.nameId}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Element Details Inspector Panel -->
        <div class="lab-card" id="element-inspector-card" style="position: sticky; top: 90px;">
          <div style="text-align: center; border-bottom: 1px solid var(--border); padding-bottom: 20px; margin-bottom: 20px;">
            <div id="insp-badge-box" style="display: inline-block; width: 80px; height: 80px; border-radius: 16px; background: rgba(0,242,254,0.15); border: 2px solid var(--neon-cyan); display: flex; flex-direction: column; align-items: center; justify-content: center; margin-bottom: 12px;">
              <span id="insp-num" style="font-size: 0.8rem; color: var(--text-dim);">1</span>
              <span id="insp-sym" style="font-size: 2.2rem; font-weight: 900; line-height: 1; color: var(--neon-cyan);">H</span>
            </div>
            <h3 id="insp-name" style="font-size: 1.5rem; margin-bottom: 4px;">Hidrogen</h3>
            <p id="insp-cat" style="font-size: 0.88rem; color: var(--text-muted); font-weight: 600;">Nonlogam Reaktif</p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px; font-size: 0.9rem;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-muted);">Massa Atom Relatif:</span>
              <strong id="insp-mass" style="font-family: var(--font-mono);">1.008 u</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-muted);">Elektronegativitas:</span>
              <strong id="insp-en" style="font-family: var(--font-mono);">2.20</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-muted);">Konfigurasi Elektron:</span>
              <strong id="insp-conf" style="font-family: var(--font-mono);">1s¹</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-muted);">Valensi Elektron:</span>
              <strong id="insp-val" style="font-family: var(--font-mono);">1</strong>
            </div>
          </div>

          <div style="margin-top: 24px; border-top: 1px solid var(--border); padding-top: 16px;">
            <h4 style="font-size: 0.95rem; margin-bottom: 10px;">Molekul yang Mengandung Unsur Ini:</h4>
            <div id="insp-molecules-list" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const inspNum = $('#insp-num');
  const inspSym = $('#insp-sym');
  const inspName = $('#insp-name');
  const inspCat = $('#insp-cat');
  const inspMass = $('#insp-mass');
  const inspEn = $('#insp-en');
  const inspConf = $('#insp-conf');
  const inspVal = $('#insp-val');
  const inspMolsList = $('#insp-molecules-list');
  const inspBadgeBox = $('#insp-badge-box');

  function showElementDetails(el) {
    if (!el) return;
    const catObj = categories[el.cat] || { color: '#00f2fe', id: el.cat, en: el.cat };
    inspNum.textContent = el.n;
    inspSym.textContent = el.s;
    inspSym.style.color = catObj.color;
    inspBadgeBox.style.borderColor = catObj.color;
    inspBadgeBox.style.background = `${catObj.color}20`;
    inspName.textContent = prefs.lang === 'en' ? el.nameEn : el.nameId;
    inspCat.textContent = prefs.lang === 'en' ? catObj.en : catObj.id;
    inspCat.style.color = catObj.color;
    inspMass.textContent = `${el.mass} u`;
    inspEn.textContent = el.en !== null ? el.en : 'N/A';
    inspConf.textContent = el.conf;
    inspVal.textContent = el.val;

    // Find molecules with this element symbol
    const foundMols = curatedMolecules.filter(m => {
      // Check if formula contains element symbol
      const regex = new RegExp(`(?<=[^a-z]|^)${el.s}(?=[A-Z0-9]|$)`);
      return regex.test(m.formula);
    });

    if (foundMols.length > 0) {
      inspMolsList.innerHTML = foundMols.map(m => `
        <a href="#/molecule/${m.id}" class="quick-tag-pill" style="font-size: 0.8rem;">
          ${m.formula} (${prefs.lang === 'en' ? m.nameEn : m.nameId})
        </a>
      `).join('');
    } else {
      inspMolsList.innerHTML = `<span style="color: var(--text-dim); font-size: 0.82rem;">Belum ada contoh molekul spesifik di katalog dasar.</span>`;
    }
  }

  $$('.ptable-cell').forEach(cell => {
    cell.addEventListener('click', () => {
      const num = parseInt(cell.dataset.atomicNum, 10);
      const el = elements.find(e => e.n === num);
      if (el) showElementDetails(el);
    });
  });

  // Default display Hydrogen
  showElementDetails(defaultSelected);
}
