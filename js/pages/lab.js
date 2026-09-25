// ChemTaxa · Virtual Chemistry Laboratory
import { $, $$, toast } from '../core/dom.js';
import { getPrefs } from '../core/prefs.js';
import { getUi } from '../i18n/ui.js';
import { getIcon } from '../components/icons.js';
import { elements, getElement } from '../data/periodicTable.js';
import { MoleculeViewer3D } from '../components/moleculeViewer3D.js';

export function title() {
  return 'Lab Virtual 3D';
}

export async function render({ main, cleanup }) {
  const prefs = getPrefs();
  const ui = getUi(prefs.lang);

  main.innerHTML = `
    <div class="lab-wrap container">
      <div class="section-header">
        <div>
          <h2>${ui.navLab}</h2>
          <p>Eksperimen interaktif tanpa risiko: rakit molekul 3D, simulasikan reaksi eksotermik, hitung massa molar stoikiometri, dan uji skala pH asam-basa.</p>
        </div>
      </div>

      <!-- Lab Navigation Tabs -->
      <div class="lab-nav-tabs" role="tablist">
        <button class="lab-tab-pill active" data-tab="builder">
          ${getIcon('cube', 18)} <span>1. Geometri & Perakitan 3D</span>
        </button>
        <button class="lab-tab-pill" data-tab="reactions">
          ${getIcon('fire', 18)} <span>2. Simulator Reaksi Kimia</span>
        </button>
        <button class="lab-tab-pill" data-tab="stoichiometry">
          ${getIcon('scale', 18)} <span>3. Kalkulator Massa Molar & Stoikiometri</span>
        </button>
        <button class="lab-tab-pill" data-tab="ph">
          ${getIcon('flask', 18)} <span>4. Simulator pH & Asam-Basa</span>
        </button>
      </div>

      <!-- Tab 1: Molecule Builder & Geometries -->
      <section id="panel-builder" class="lab-panel active">
        <div class="lab-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
            <div>
              <h3 style="font-size: 1.3rem;">Eksplorasi Geometri Molekul 3D (VSEPR)</h3>
              <p style="color: var(--text-muted); font-size: 0.9rem;">Pilih model bentuk geometri untuk mengamati sudut ikatan dan orientasi ruang.</p>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button class="btn-action btn-geo" data-geo="linear">Linear (180°)</button>
              <button class="btn-action btn-geo" data-geo="bent">Bengkok / Bent (104.5°)</button>
              <button class="btn-action btn-geo" data-geo="trigonal_planar">Trigonal Planar (120°)</button>
              <button class="btn-action btn-geo active" data-geo="tetrahedral">Tetrahedral (109.5°)</button>
              <button class="btn-action btn-geo" data-geo="octahedral">Oktahedral (90°)</button>
            </div>
          </div>

          <div class="viewer-canvas-wrap" id="lab-builder-canvas" style="min-height: 420px;"></div>
          <div id="builder-geo-explanation" style="margin-top: 16px; padding: 14px 20px; background: rgba(0,0,0,0.2); border-radius: var(--radius-sm); font-size: 0.95rem; color: var(--text-main);">
            <strong>Bentuk Tetrahedral (AX₄):</strong> Sudut ikatan 109.5°. Contoh klasik: Metana (CH₄). Keempat ikatan menjauh simetris ke empat sudut ruang piramida berkaki tiga.
          </div>
        </div>
      </section>

      <!-- Tab 2: Reaction Simulator -->
      <section id="panel-reactions" class="lab-panel">
        <div class="lab-card">
          <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Simulator Reaksi & Pemutusan Ikatan Kimia</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 24px;">
            Pilih reaksi kimia dan tekan tombol 'Mulai Reaksi' untuk melihat elektron berpindah dan energi dilepaskan!
          </p>

          <div style="margin-bottom: 20px;">
            <label style="display:block; font-weight:700; margin-bottom: 8px; color: var(--text-muted);">Pilih Reaksi Kimia:</label>
            <select id="reaction-selector" class="select-level" style="max-width: 500px; width: 100%;">
              <option value="water">2 H₂ + O₂ → 2 H₂O (Pembentukan Air Eksotermik)</option>
              <option value="combustion">CH₄ + 2 O₂ → CO₂ + 2 H₂O (Pembakaran Gas Metana)</option>
              <option value="salt">2 Na + Cl₂ → 2 NaCl (Sintesis Kristal Garam Ionik)</option>
              <option value="ammonia">N₂ + 3 H₂ → 2 NH₃ (Sintesis Amonia Haber-Bosch)</option>
              <option value="neutral">HCl + NaOH → NaCl + H₂O (Netralisasi Asam-Basa)</option>
            </select>
          </div>

          <div style="background: rgba(0,0,0,0.3); border-radius: var(--radius-md); padding: 30px; text-align: center; margin-bottom: 24px;">
            <div id="reaction-equation" style="font-size: 1.8rem; font-family: var(--font-mono); font-weight: 800; color: var(--neon-cyan); margin-bottom: 20px;">
              2 H₂ + O₂ → 2 H₂O
            </div>

            <div id="reaction-visual-stage" style="display: flex; align-items: center; justify-content: center; gap: 30px; margin: 30px 0; font-size: 2.4rem;">
              <div id="reactants-visual">💧 💧 + 💨</div>
              <div id="reaction-arrow" style="color: var(--electron-amber);">➔</div>
              <div id="products-visual" style="opacity: 0.3;">🌊 🌊</div>
            </div>

            <button id="btn-run-reaction" class="btn-search" style="padding: 12px 28px; font-size: 1rem;">
              ${getIcon('fire', 18)} <span>Nyalakan & Mulai Reaksi!</span>
            </button>
          </div>

          <div id="reaction-thermo-info" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
            <div class="prop-card">
              <div class="prop-label">Entalpi Reaksi (ΔH)</div>
              <div class="prop-value" style="color: var(--crimson-fire);">-572 kJ/mol (Eksotermik)</div>
            </div>
            <div class="prop-card">
              <div class="prop-label">Jenis Ikatan Yang Terbentuk</div>
              <div class="prop-value" style="font-size: 0.95rem;">Kovalen Polar O-H</div>
            </div>
            <div class="prop-card">
              <div class="prop-label">Aplikasi di Dunia Nyata</div>
              <div class="prop-value" style="font-size: 0.95rem;">Mesin Roket Hidrogen Cair</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 3: Stoichiometry & Molar Mass Calculator -->
      <section id="panel-stoichiometry" class="lab-panel">
        <div class="lab-card">
          <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Kalkulator Massa Molar & Stoikiometri</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 24px;">
            Ketik rumus kimia apa saja (termasuk tanda kurung seperti Ca(OH)₂, Al₂(SO₄)₃, atau C₆H₁₂O₆) untuk menghitung massa molekul relatif (Mr) dan persentase komposisi massanya secara seketika.
          </p>

          <div style="max-width: 550px; margin-bottom: 24px;">
            <label style="display:block; font-weight:700; margin-bottom: 8px; color: var(--text-muted);">
              Ketik Rumus Kimia:
            </label>
            <div class="search-input-group">
              <input type="text" id="stoich-input" class="search-input" 
                     placeholder="Contoh: H2SO4, C6H12O6, Ca(OH)2, (NH4)2SO4…" 
                     value="C6H12O6" />
              <button id="btn-calc-stoich" class="btn-search">Hitung Mr</button>
            </div>
          </div>

          <div id="stoich-results-box" style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 24px; align-items: start;">
            <div class="prop-card" style="padding: 24px; text-align: center;">
              <div class="prop-label">Total Massa Molar (Mr)</div>
              <div id="stoich-total-mr" style="font-size: 2.6rem; font-weight: 900; font-family: var(--font-mono); color: var(--neon-cyan); margin: 8px 0;">
                180.16 g/mol
              </div>
              <p style="font-size: 0.88rem; color: var(--text-muted);">1 mol senyawa ini setara dengan 180.16 gram materi murni.</p>
            </div>

            <div style="background: rgba(0,0,0,0.2); border-radius: var(--radius-md); padding: 20px;">
              <h4 style="margin-bottom: 14px;">Komposisi Unsur Penyusun (% Massa):</h4>
              <div id="stoich-breakdown-list" style="display: flex; flex-direction: column; gap: 12px;"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 4: pH Simulator -->
      <section id="panel-ph" class="lab-panel">
        <div class="lab-card">
          <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Simulator pH & Indikator Warna Larutan</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">
            Geser nilai pH dari 0 (asam sangat pekat) hingga 14 (basa sangat pekat) untuk melihat perubahan warna indikator universal dan konsentrasi ion H⁺.
          </p>

          <div class="ph-meter-wrap">
            <div class="ph-beaker-stage">
              <div id="ph-liquid-layer" class="ph-liquid" style="background-color: #22c55e;"></div>
            </div>

            <div class="ph-slider-box">
              <div id="ph-value-text" class="ph-value-display">pH 7.0</div>
              <div id="ph-class-text" class="ph-classification" style="color: #22c55e;">Netral (Air Murni)</div>
              <input type="range" id="ph-range-slider" class="ph-slider" min="0" max="14" step="0.1" value="7.0" />
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; width: 100%; max-width: 680px;">
              <div class="prop-card">
                <div class="prop-label">Konsentrasi Ion [H⁺]</div>
                <div id="ph-h-conc" class="prop-value" style="font-size: 1rem;">1.0 × 10⁻⁷ M</div>
              </div>
              <div class="prop-card">
                <div class="prop-label">Konsentrasi Ion [OH⁻]</div>
                <div id="ph-oh-conc" class="prop-value" style="font-size: 1rem;">1.0 × 10⁻⁷ M</div>
              </div>
              <div class="prop-card">
                <div class="prop-label">Contoh Cairan Sehari-hari</div>
                <div id="ph-benchmark" class="prop-value" style="font-size: 0.95rem; color: var(--neon-cyan);">Air Minum Kemasan</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  // 1. Tab Navigation
  $$('.lab-tab-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      $$('.lab-tab-pill').forEach(p => p.classList.remove('active'));
      $$('.lab-panel').forEach(pan => pan.classList.remove('active'));
      pill.classList.add('active');
      const target = pill.dataset.tab;
      $(`#panel-${target}`)?.classList.add('active');
    });
  });

  // 2. Geometry Builder Viewer Setup
  const builderCanvasWrap = $('#lab-builder-canvas');
  let builderViewer = null;

  const geometries = {
    linear: {
      atoms: [
        { element: 'C', x: 0, y: 0, z: 0 },
        { element: 'O', x: -1.2, y: 0, z: 0 },
        { element: 'O', x: 1.2, y: 0, z: 0 }
      ],
      bonds: [{ from: 0, to: 1, order: 2 }, { from: 0, to: 2, order: 2 }],
      exp: '<strong>Linear (AX₂):</strong> Sudut ikatan 180°. Contoh: Karbon Dioksida (CO₂). Momen dipol saling meniadakan sehingga molekul bersifat nonpolar.'
    },
    bent: {
      atoms: [
        { element: 'O', x: 0, y: 0.1, z: 0 },
        { element: 'H', x: -0.75, y: -0.5, z: 0 },
        { element: 'H', x: 0.75, y: -0.5, z: 0 }
      ],
      bonds: [{ from: 0, to: 1, order: 1 }, { from: 0, to: 2, order: 1 }],
      exp: '<strong>Bengkok / Bent (AX₂E₂):</strong> Sudut ikatan 104.5°. Contoh: Air (H₂O). Dua pasangan elektron bebas (PEB) menekan sudut ikatan ke bawah.'
    },
    trigonal_planar: {
      atoms: [
        { element: 'B', x: 0, y: 0, z: 0 },
        { element: 'F', x: 0, y: 1.3, z: 0 },
        { element: 'F', x: 1.12, y: -0.65, z: 0 },
        { element: 'F', x: -1.12, y: -0.65, z: 0 }
      ],
      bonds: [{ from: 0, to: 1, order: 1 }, { from: 0, to: 2, order: 1 }, { from: 0, to: 3, order: 1 }],
      exp: '<strong>Trigonal Planar (AX₃):</strong> Sudut ikatan tepat 120°. Contoh: Boron Trifluorida (BF₃). Tiga ligan tersebar merata pada satu bidang datar.'
    },
    tetrahedral: {
      atoms: [
        { element: 'C', x: 0, y: 0, z: 0 },
        { element: 'H', x: 0.63, y: 0.63, z: 0.63 },
        { element: 'H', x: -0.63, y: -0.63, z: 0.63 },
        { element: 'H', x: -0.63, y: 0.63, z: -0.63 },
        { element: 'H', x: 0.63, y: -0.63, z: -0.63 }
      ],
      bonds: [{ from: 0, to: 1, order: 1 }, { from: 0, to: 2, order: 1 }, { from: 0, to: 3, order: 1 }, { from: 0, to: 4, order: 1 }],
      exp: '<strong>Tetrahedral (AX₄):</strong> Sudut ikatan 109.5°. Contoh: Metana (CH₄). Geometri tiga dimensi paling fundamental dalam kimia organik karbon.'
    },
    octahedral: {
      atoms: [
        { element: 'S', x: 0, y: 0, z: 0 },
        { element: 'F', x: 1.4, y: 0, z: 0 },
        { element: 'F', x: -1.4, y: 0, z: 0 },
        { element: 'F', x: 0, y: 1.4, z: 0 },
        { element: 'F', x: 0, y: -1.4, z: 0 },
        { element: 'F', x: 0, y: 0, z: 1.4 },
        { element: 'F', x: 0, y: 0, z: -1.4 }
      ],
      bonds: [
        { from: 0, to: 1, order: 1 }, { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 }, { from: 0, to: 4, order: 1 },
        { from: 0, to: 5, order: 1 }, { from: 0, to: 6, order: 1 }
      ],
      exp: '<strong>Oktahedral (AX₆):</strong> Sudut ikatan tepat 90°. Contoh: Sulfur Heksafluorida (SF₆). Sangat simetris dengan hibridisasi sp³d².'
    }
  };

  if (builderCanvasWrap) {
    builderViewer = new MoleculeViewer3D(builderCanvasWrap, { autoRotate: true, showLabels: true });
    builderViewer.setData(geometries.tetrahedral.atoms, geometries.tetrahedral.bonds);
    cleanup(() => builderViewer.destroy());

    $$('.btn-geo').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.btn-geo').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const g = geometries[btn.dataset.geo];
        if (g) {
          builderViewer.setData(g.atoms, g.bonds);
          const expBox = $('#builder-geo-explanation');
          if (expBox) expBox.innerHTML = g.exp;
        }
      });
    });
  }

  // 3. Reaction Simulator Logic
  const rxSelect = $('#reaction-selector');
  const rxEq = $('#reaction-equation');
  const runRxBtn = $('#btn-run-reaction');
  const reactantsEl = $('#reactants-visual');
  const productsEl = $('#products-visual');

  const rxData = {
    water: {
      eq: '2 H₂ + O₂ → 2 H₂O',
      reactants: '💨 💨 (2 H₂) + 💨 (O₂)',
      products: '💧 💧 (2 H₂O)',
      deltaH: '-572 kJ/mol (Eksotermik Panas Tinggi)',
      bond: 'Kovalen Polar O-H',
      use: 'Mesin Roket Uap & Sel Bahan Bakar Ramah Lingkungan'
    },
    combustion: {
      eq: 'CH₄ + 2 O₂ → CO₂ + 2 H₂O',
      reactants: '🔥 (CH₄) + 💨 💨 (2 O₂)',
      products: '🌫️ (CO₂) + 💧 💧 (2 H₂O)',
      deltaH: '-890 kJ/mol (Sangat Eksotermik)',
      bond: 'Ikatan C=O dan O-H',
      use: 'Kompor Gas Rumah Tangga & Pembangkit Listrik Gas'
    },
    salt: {
      eq: '2 Na + Cl₂ → 2 NaCl',
      reactants: '💥 (2 Na Logam) + ☠️ (Cl₂ Gas)',
      products: '🧂 🧂 (2 Kristal NaCl)',
      deltaH: '-822 kJ/mol (Reaksi Eksplosif Kilat)',
      bond: 'Ikatan Ionik Na⁺—Cl⁻',
      use: 'Garam Konsumsi & Elektrolit Cairan Tubuh'
    },
    ammonia: {
      eq: 'N₂ + 3 H₂ → 2 NH₃',
      reactants: '💨 (N₂) + 💨 💨 💨 (3 H₂)',
      products: '🌾 🌾 (2 NH₃ Pupuk)',
      deltaH: '-92 kJ/mol (Katalis Besi Fe)',
      bond: 'Kovalen Polar N-H',
      use: 'Sintesis Pupuk Pertanian Penopang 50% Pangan Dunia'
    },
    neutral: {
      eq: 'HCl + NaOH → NaCl + H₂O',
      reactants: '🧪 (HCl Asam Kuat) + 🧼 (NaOH Basa Kuat)',
      products: '🧂 (NaCl) + 💧 (Air Netral pH 7)',
      deltaH: '-57.3 kJ/mol (Netralisasi Murni)',
      bond: 'Pembentukan H₂O dari H⁺ + OH⁻',
      use: 'Pengolahan Air Limbah & Obat Antasida Lambung'
    }
  };

  if (rxSelect) {
    rxSelect.addEventListener('change', () => {
      const data = rxData[rxSelect.value];
      if (data) {
        rxEq.textContent = data.eq;
        reactantsEl.innerHTML = data.reactants;
        productsEl.innerHTML = data.products;
        productsEl.style.opacity = '0.3';
        reactantsEl.style.opacity = '1.0';
      }
    });
  }

  if (runRxBtn) {
    runRxBtn.addEventListener('click', () => {
      reactantsEl.style.transition = 'all 0.5s ease';
      productsEl.style.transition = 'all 0.5s ease';
      reactantsEl.style.opacity = '0.2';
      reactantsEl.style.transform = 'scale(0.8)';
      productsEl.style.opacity = '1.0';
      productsEl.style.transform = 'scale(1.2)';

      toast('Reaksi berhasil disimulasikan! Energi panas dilepaskan.', 'success');

      setTimeout(() => {
        reactantsEl.style.transform = 'none';
        productsEl.style.transform = 'none';
      }, 600);
    });
  }

  // 4. Stoichiometry & Formula Parser
  function parseChemicalFormula(formula) {
    // Regex tokenizes Elements and optional parentheses
    const stack = [{}];
    const regex = /([A-Z][a-z]*)(\d*)|(\()|(\))(\d*)/g;
    let match;

    while ((match = regex.exec(formula)) !== null) {
      const [full, elem, countStr, openParen, closeParen, parenCountStr] = match;
      if (elem) {
        const count = countStr ? parseInt(countStr, 10) : 1;
        const cur = stack[stack.length - 1];
        cur[elem] = (cur[elem] || 0) + count;
      } else if (openParen) {
        stack.push({});
      } else if (closeParen) {
        const popped = stack.pop();
        const multiplier = parenCountStr ? parseInt(parenCountStr, 10) : 1;
        const cur = stack[stack.length - 1];
        for (const [k, v] of Object.entries(popped)) {
          cur[k] = (cur[k] || 0) + v * multiplier;
        }
      }
    }

    return stack[0];
  }

  function calculateMolarMass(formula) {
    try {
      const counts = parseChemicalFormula(formula.trim());
      let totalMr = 0;
      const breakdown = [];

      for (const [sym, count] of Object.entries(counts)) {
        const el = getElement(sym);
        const mass = el ? el.mass : 0;
        const subtotal = mass * count;
        totalMr += subtotal;
        breakdown.push({ symbol: sym, name: el ? el.nameId : sym, count, mass, subtotal });
      }

      breakdown.forEach(item => {
        item.percentage = totalMr > 0 ? ((item.subtotal / totalMr) * 100).toFixed(2) : 0;
      });

      return { totalMr: totalMr.toFixed(3), breakdown };
    } catch (e) {
      return null;
    }
  }

  const stoichInput = $('#stoich-input');
  const stoichBtn = $('#btn-calc-stoich');
  const mrDisplay = $('#stoich-total-mr');
  const breakdownList = $('#stoich-breakdown-list');

  function updateStoichiometry() {
    const f = stoichInput.value.trim();
    if (!f) return;
    const res = calculateMolarMass(f);
    if (res && res.breakdown.length > 0) {
      mrDisplay.textContent = `${res.totalMr} g/mol`;
      breakdownList.innerHTML = res.breakdown.map(b => `
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 4px;">
            <span><strong>${b.name} (${b.symbol})</strong> × ${b.count}</span>
            <span>${b.subtotal.toFixed(2)} g/mol (<strong>${b.percentage}%</strong>)</span>
          </div>
          <div style="height: 8px; border-radius: 4px; background: rgba(255,255,255,0.08); overflow: hidden;">
            <div style="width: ${b.percentage}%; height: 100%; background: var(--neon-cyan);"></div>
          </div>
        </div>
      `).join('');
    } else {
      mrDisplay.textContent = 'Rumus tidak valid';
      breakdownList.innerHTML = '<p style="color:var(--crimson-fire); font-size:0.9rem;">Periksa kembali format rumus kimia (gunakan huruf kapital di awal unsur, cth: H2O, NaCl, CaCO3).</p>';
    }
  }

  if (stoichBtn) stoichBtn.addEventListener('click', updateStoichiometry);
  if (stoichInput) stoichInput.addEventListener('keydown', e => { if (e.key === 'Enter') updateStoichiometry(); });
  updateStoichiometry();

  // 5. pH Meter Simulator
  const phSlider = $('#ph-range-slider');
  const phDisplay = $('#ph-value-text');
  const phClass = $('#ph-class-text');
  const phLiquid = $('#ph-liquid-layer');
  const hConcEl = $('#ph-h-conc');
  const ohConcEl = $('#ph-oh-conc');
  const benchEl = $('#ph-benchmark');

  function getPhColor(val) {
    if (val < 3) return '#ef4444'; // strong acid red
    if (val < 6) return '#f59e0b'; // weak acid orange
    if (val < 8) return '#22c55e'; // neutral green
    if (val < 11) return '#06b6d4'; // weak base cyan/blue
    return '#8b5cf6'; // strong base purple
  }

  function getPhBenchmark(val) {
    if (val <= 1.5) return 'Asam Lambung / Asam Baterai';
    if (val <= 2.5) return 'Jus Lemon / Asam Cuka';
    if (val <= 3.5) return 'Minuman Bersoda / Anggur';
    if (val <= 4.5) return 'Jus Tomat / Kopi Hitam';
    if (val <= 6.5) return 'Susu Murni / Air Hujan Alami';
    if (val <= 7.5) return 'Air Murni / Darah Manusia Sehat';
    if (val <= 8.5) return 'Air Laut Alami / Baking Soda';
    if (val <= 10.5) return 'Sabun Mandi / Pasta Gigi';
    if (val <= 11.5) return 'Cairan Pembersih Lantai Amonia';
    return 'Pemutih Pakaian / Cairan Pembersih Pipa';
  }

  function updatePhUI(val) {
    const num = parseFloat(val);
    phDisplay.textContent = `pH ${num.toFixed(1)}`;
    const col = getPhColor(num);
    phLiquid.style.backgroundColor = col;

    let clsName = 'Netral';
    if (num < 6.8) clsName = num < 3 ? 'Asam Sangat Kuat' : 'Asam';
    else if (num > 7.2) clsName = num > 11 ? 'Basa Sangat Kuat' : 'Basa';

    phClass.textContent = clsName;
    phClass.style.color = col;

    const hVal = Math.pow(10, -num).toExponential(1);
    const ohVal = Math.pow(10, -(14 - num)).toExponential(1);
    hConcEl.textContent = `${hVal} M`;
    ohConcEl.textContent = `${ohVal} M`;
    benchEl.textContent = getPhBenchmark(num);
  }

  if (phSlider) {
    phSlider.addEventListener('input', e => updatePhUI(e.target.value));
    updatePhUI(7.0);
  }
}
