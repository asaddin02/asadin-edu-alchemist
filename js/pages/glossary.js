// ChemTaxa · Chemical Glossary & Terminology Dictionary
import { $, $$ } from '../core/dom.js';
import { getPrefs } from '../core/prefs.js';
import { getUi } from '../i18n/ui.js';
import { getIcon } from '../components/icons.js';
import { glossary } from '../data/glossary.js';

export function title() {
  return 'Kamus Kimia';
}

export async function render({ main }) {
  const prefs = getPrefs();
  const ui = getUi(prefs.lang);

  main.innerHTML = `
    <div class="container" style="padding-top: 40px; padding-bottom: 60px;">
      <div class="section-header">
        <div>
          <h2>${ui.navGlossary}</h2>
          <p>Kamus lengkap istilah kimia dan struktur molekul: disajikan dengan penjelasan sederhana untuk pemula serta rincian ilmiah formal untuk mahasiswa dan pengajar.</p>
        </div>
      </div>

      <!-- Search Input -->
      <div class="lab-card" style="padding: 20px; margin-bottom: 24px;">
        <div class="search-input-group">
          <span class="search-icon-lead">${getIcon('search', 18)}</span>
          <input type="text" id="glossary-search" class="search-input" 
                 placeholder="Cari istilah kimia (cth: Kovalen, VSEPR, Kiralitas, pH, Elektronegativitas)…" />
        </div>
      </div>

      <!-- Terms Grid -->
      <div id="glossary-list" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
        ${glossary.map(item => `
          <div class="lab-card glossary-card" data-term="${item.term.toLowerCase()} ${item.id.toLowerCase()} ${item.en.toLowerCase()}" style="padding: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
              <h3 style="font-size: 1.3rem; color: var(--neon-cyan);">${prefs.lang === 'en' ? item.en : item.id}</h3>
              <span class="meta-tag" style="text-transform: capitalize;">${item.cat}</span>
            </div>

            <div style="margin-bottom: 14px;">
              <span style="font-size: 0.78rem; text-transform: uppercase; font-weight: 700; color: var(--quantum-emerald);">
                🌱 Penjelasan Sederhana (SD / SMP):
              </span>
              <p style="font-size: 0.95rem; color: var(--text-main); margin-top: 4px; line-height: 1.5;">
                ${prefs.lang === 'en' ? item.simpleEn : item.simpleId}
              </p>
            </div>

            <div>
              <span style="font-size: 0.78rem; text-transform: uppercase; font-weight: 700; color: var(--photon-purple);">
                🔬 Penjelasan Ilmiah (SMA / Kuliah):
              </span>
              <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 4px; line-height: 1.5;">
                ${prefs.lang === 'en' ? item.scientificEn : item.scientificId}
              </p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const searchInput = $('#glossary-search');
  const cards = $$('.glossary-card');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      cards.forEach(card => {
        const text = card.dataset.term;
        card.style.display = text.includes(q) ? 'block' : 'none';
      });
    });
  }
}
