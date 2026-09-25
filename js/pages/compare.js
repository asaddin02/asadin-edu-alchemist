// ChemTaxa · Molecule Comparison Tool
import { $, $$ } from '../core/dom.js';
import { getPrefs } from '../core/prefs.js';
import { getUi } from '../i18n/ui.js';
import { curatedMolecules } from '../data/curatedMolecules.js';
import { MoleculeViewer3D } from '../components/moleculeViewer3D.js';

export function title() {
  return 'Bandingkan Molekul';
}

export async function render({ main, cleanup }) {
  const prefs = getPrefs();
  const ui = getUi(prefs.lang);

  let mol1 = curatedMolecules.find(m => m.id === 'water') || curatedMolecules[0];
  let mol2 = curatedMolecules.find(m => m.id === 'ethanol') || curatedMolecules[1];

  main.innerHTML = `
    <div class="container" style="padding-top: 40px; padding-bottom: 60px;">
      <div class="section-header">
        <div>
          <h2>${ui.navCompare}</h2>
          <p>Bandingkan dua struktur molekul secara berdampingan: amati perbedaan sudut ikatan, massa molar, kepolaran, dan sifat fisikanya.</p>
        </div>
      </div>

      <!-- Selectors Row -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 30px;">
        <div class="lab-card" style="padding: 16px 20px;">
          <label style="display:block; font-weight:700; margin-bottom:8px; color: var(--neon-cyan);">Pilih Molekul A:</label>
          <select id="compare-select-1" class="select-level" style="width:100%;">
            ${curatedMolecules.map(m => `
              <option value="${m.id}" ${m.id === mol1.id ? 'selected' : ''}>${m.formula} - ${prefs.lang === 'en' ? m.nameEn : m.nameId}</option>
            `).join('')}
          </select>
        </div>

        <div class="lab-card" style="padding: 16px 20px;">
          <label style="display:block; font-weight:700; margin-bottom:8px; color: var(--electric-azure);">Pilih Molekul B:</label>
          <select id="compare-select-2" class="select-level" style="width:100%;">
            ${curatedMolecules.map(m => `
              <option value="${m.id}" ${m.id === mol2.id ? 'selected' : ''}>${m.formula} - ${prefs.lang === 'en' ? m.nameEn : m.nameId}</option>
            `).join('')}
          </select>
        </div>
      </div>

      <!-- Dual 3D Viewers Stage -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 30px;">
        <div class="lab-card" style="padding: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3 id="comp-title-1" style="font-size: 1.2rem; color: var(--neon-cyan);">${mol1.nameId} (${mol1.formula})</h3>
            <span class="badge badge-lvl" style="--badge-col: var(--neon-cyan)">Molekul A</span>
          </div>
          <div class="viewer-canvas-wrap" id="comp-canvas-1" style="min-height: 320px;"></div>
        </div>

        <div class="lab-card" style="padding: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h3 id="comp-title-2" style="font-size: 1.2rem; color: var(--electric-azure);">${mol2.nameId} (${mol2.formula})</h3>
            <span class="badge badge-lvl" style="--badge-col: var(--electric-azure)">Molekul B</span>
          </div>
          <div class="viewer-canvas-wrap" id="comp-canvas-2" style="min-height: 320px;"></div>
        </div>
      </div>

      <!-- Comparison Matrix Table -->
      <div class="lab-card" style="overflow-x: auto;">
        <h3 style="font-size: 1.3rem; margin-bottom: 16px;">Tabel Matriks Perbandingan Sifat Kimia</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 0.92rem;">
          <thead>
            <tr style="border-bottom: 2px solid var(--border); text-align: left;">
              <th style="padding: 12px; color: var(--text-dim); width: 25%;">Parameter</th>
              <th id="th-name-1" style="padding: 12px; color: var(--neon-cyan); width: 37.5%;">${mol1.nameId}</th>
              <th id="th-name-2" style="padding: 12px; color: var(--electric-azure); width: 37.5%;">${mol2.nameId}</th>
            </tr>
          </thead>
          <tbody id="comp-matrix-body"></tbody>
        </table>
      </div>
    </div>
  `;

  let v1 = null, v2 = null;
  const c1 = $('#comp-canvas-1');
  const c2 = $('#comp-canvas-2');

  function initViewers() {
    if (v1) v1.destroy();
    if (v2) v2.destroy();

    if (c1) {
      v1 = new MoleculeViewer3D(c1, { autoRotate: true, showLabels: true });
      v1.setData(mol1.atoms3D, mol1.bonds3D);
    }
    if (c2) {
      v2 = new MoleculeViewer3D(c2, { autoRotate: true, showLabels: true });
      v2.setData(mol2.atoms3D, mol2.bonds3D);
    }
  }

  cleanup(() => {
    if (v1) v1.destroy();
    if (v2) v2.destroy();
  });

  function updateMatrix() {
    $('#comp-title-1').textContent = `${prefs.lang === 'en' ? mol1.nameEn : mol1.nameId} (${mol1.formula})`;
    $('#comp-title-2').textContent = `${prefs.lang === 'en' ? mol2.nameEn : mol2.nameId} (${mol2.formula})`;
    $('#th-name-1').textContent = prefs.lang === 'en' ? mol1.nameEn : mol1.nameId;
    $('#th-name-2').textContent = prefs.lang === 'en' ? mol2.nameEn : mol2.nameId;

    const rows = [
      { label: 'Rumus Kimia', v1: mol1.formula, v2: mol2.formula },
      { label: 'Massa Molar (Mr)', v1: `${mol1.mass} g/mol`, v2: `${mol2.mass} g/mol` },
      { label: 'Nama IUPAC Resmi', v1: mol1.iupac, v2: mol2.iupac },
      { label: 'Wujud pada STP', v1: mol1.stateAtSTP, v2: mol2.stateAtSTP },
      { label: 'Geometri Molekul', v1: mol1.geometry || 'N/A', v2: mol2.geometry || 'N/A' },
      { label: 'Kepolaran & Ikatan', v1: mol1.polarity, v2: mol2.polarity },
      { label: 'Tingkat Bahaya Kesehatan (NFPA)', v1: `Skala ${mol1.safety?.health ?? 0}/4`, v2: `Skala ${mol2.safety?.health ?? 0}/4` },
      { label: 'PubChem CID Resmi', v1: mol1.cid || '-', v2: mol2.cid || '-' }
    ];

    const body = $('#comp-matrix-body');
    if (body) {
      body.innerHTML = rows.map(r => `
        <tr style="border-bottom: 1px solid var(--border);">
          <td style="padding: 12px; font-weight: 600; color: var(--text-muted);">${r.label}</td>
          <td style="padding: 12px; font-family: var(--font-mono);">${r.v1}</td>
          <td style="padding: 12px; font-family: var(--font-mono);">${r.v2}</td>
        </tr>
      `).join('');
    }
  }

  const s1 = $('#compare-select-1');
  const s2 = $('#compare-select-2');

  if (s1) {
    s1.addEventListener('change', () => {
      mol1 = curatedMolecules.find(m => m.id === s1.value) || curatedMolecules[0];
      initViewers();
      updateMatrix();
    });
  }

  if (s2) {
    s2.addEventListener('change', () => {
      mol2 = curatedMolecules.find(m => m.id === s2.value) || curatedMolecules[1];
      initViewers();
      updateMatrix();
    });
  }

  initViewers();
  updateMatrix();
}
