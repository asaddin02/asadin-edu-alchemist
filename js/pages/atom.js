// ChemTaxa · Atomic Structure, Quantum Orbitals, Bonding & VSEPR Explorer
import { $, $$ } from '../core/dom.js';
import { getPrefs } from '../core/prefs.js';
import { getUi } from '../i18n/ui.js';
import { getIcon } from '../components/icons.js';

export function title() {
  return 'Struktur Atom, Orbital & Ikatan';
}

export async function render({ main, cleanup }) {
  const prefs = getPrefs();
  const ui = getUi(prefs.lang);

  main.innerHTML = `
    <div class="container" style="padding-top: 40px; padding-bottom: 60px;">
      <div class="section-header">
        <div>
          <span class="hero-badge">${getIcon('atom', 16)} FUNDAMEN KIMIA SEMESTA</span>
          <h2>Struktur Atom, Orbital Kuantum & Ikatan Molekul</h2>
          <p>Pelajari fondasi materi dari tingkat terdalam: partikel subatomik quark, bentuk awan probabilitas elektron 3D, aturan bilangan kuantum, jenis ikatan kimia, hingga geometri molekul VSEPR.</p>
        </div>
      </div>

      <!-- Navigation Tabs for Atom Explorer -->
      <div class="lab-nav-tabs" style="margin-bottom: 28px; display: flex; flex-wrap: wrap; gap: 8px;">
        <button class="lab-tab-pill active" data-atom-tab="subatomic">
          ⚛️ 1. Partikel Subatomik & Inti
        </button>
        <button class="lab-tab-pill" data-atom-tab="orbitals">
          🌐 2. Bentuk Orbital 3D (s, p, d)
        </button>
        <button class="lab-tab-pill" data-atom-tab="quantum">
          🔢 3. 4 Bilangan Kuantum
        </button>
        <button class="lab-tab-pill" data-atom-tab="aufbau">
          🪜 4. Aturan Pengisian (Aufbau & Hund)
        </button>
        <button class="lab-tab-pill" data-atom-tab="bonding">
          🔗 5. Ikatan Kimia & Gaya Antarmolekul
        </button>
        <button class="lab-tab-pill" data-atom-tab="vsepr">
          📐 6. Geometri VSEPR & Gugus Fungsi
        </button>
      </div>

      <!-- Tab 1: Subatomic Particles -->
      <section id="atom-panel-subatomic" class="lab-panel active">
        <div class="lab-card" style="padding: 32px; margin-bottom: 24px;">
          <h3 style="font-size: 1.5rem; margin-bottom: 12px; color: var(--neon-cyan);">Anatomi Partikel Subatomik</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
            Atom bukanlah bola pejal tak terbagi, melainkan sistem miniatur kosmos yang terdiri dari inti padat berkerapatan ekstrem yang dikelilingi oleh ruang hampa dan awan probabilitas elektron.
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 30px;">
            <div class="prop-card" style="border-left: 4px solid #ef4444;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <h4 style="color: #ef4444; font-size: 1.2rem;">Proton (p⁺)</h4>
                <span class="meta-tag">Muatan: +1</span>
              </div>
              <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 8px;">
                Partikel bermuatan positif di dalam inti atom. <strong>Jumlah proton menentukan identitas unsur kimia</strong> (Nomor Atom Z).
              </p>
              <div style="font-size: 0.8rem; color: var(--text-dim);">
                Massa: 1.673 × 10⁻²⁷ kg (1.007 u) • Terdiri dari: <strong>2 Quark Up (+⅔) + 1 Quark Down (-⅓)</strong>
              </div>
            </div>

            <div class="prop-card" style="border-left: 4px solid #3b82f6;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <h4 style="color: #3b82f6; font-size: 1.2rem;">Neutron (n⁰)</h4>
                <span class="meta-tag">Muatan: 0 (Netral)</span>
              </div>
              <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 8px;">
                Partikel netral penyemen inti atom bersama gaya nuklir kuat agar proton-proton yang bermuatan positif tidak saling tolak meledak.
              </p>
              <div style="font-size: 0.8rem; color: var(--text-dim);">
                Massa: 1.675 × 10⁻²⁷ kg (1.008 u) • Terdiri dari: <strong>1 Quark Up (+⅔) + 2 Quark Down (-⅓)</strong>
              </div>
            </div>

            <div class="prop-card" style="border-left: 4px solid var(--neon-cyan);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <h4 style="color: var(--neon-cyan); font-size: 1.2rem;">Elektron (e⁻)</h4>
                <span class="meta-tag">Muatan: -1</span>
              </div>
              <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 8px;">
                Partikel fundamental lepton bermassa sangat ringan yang mengelilingi inti dalam orbital gelombang probabilitas. <strong>Elektron valensi terluar menentukan seluruh ikatan kimia!</strong>
              </p>
              <div style="font-size: 0.8rem; color: var(--text-dim);">
                Massa: 9.109 × 10⁻³¹ kg (1/1836 massa proton) • Partikel Fundamental Sejati (Titik Tanpa Substruktur)
              </div>
            </div>
          </div>

          <div style="background: rgba(0,242,254,0.06); border: 1px solid rgba(0,242,254,0.25); border-radius: var(--radius-md); padding: 20px;">
            <h4 style="color: var(--neon-cyan); margin-bottom: 8px;">🔭 Skala Ruang Hampa Atom yang Menakjubkan:</h4>
            <p style="color: var(--text-main); font-size: 0.92rem; line-height: 1.6;">
              Jika inti atom dibayangkan sebesar kelereng kecil (1 cm) yang diletakkan di tengah lapangan stadion sepak bola, maka elektron terdekatnya berputar di tribun terluar stadion, dan <strong>99.9999999999999% volume atom adalah ruang hampa murni</strong>!
            </p>
          </div>
        </div>
      </section>

      <!-- Tab 2: 3D Orbital Shape Visualizer -->
      <section id="atom-panel-orbitals" class="lab-panel">
        <div class="lab-card" style="padding: 32px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
            <div>
              <h3 style="font-size: 1.5rem; color: var(--electric-azure); margin-bottom: 4px;">Visualisasi Bentuk Orbital 3D Interaktif</h3>
              <p style="color: var(--text-muted); font-size: 0.9rem;">
                Awan probabilitas di mana elektron memiliki kemungkinan 90% ditemukan (Penyelesaian Persamaan Gelombang Schrödinger Ψ).
              </p>
            </div>

            <!-- Orbital Selector Buttons -->
            <div style="display: flex; gap: 8px;">
              <button class="btn-action btn-orb-select active" data-orb="s">Orbital s (Bola)</button>
              <button class="btn-action btn-orb-select" data-orb="p">Orbital p (Dumbbell)</button>
              <button class="btn-action btn-orb-select" data-orb="d">Orbital d (Daun Semanggi)</button>
            </div>
          </div>

          <div class="viewer-canvas-wrap" id="atom-orbital-canvas-box" style="min-height: 420px; position: relative; background: radial-gradient(circle at center, #0e1525 0%, #060a12 100%); border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.08); overflow: hidden;">
            <canvas id="orbital-3d-canvas" style="width: 100%; height: 420px; display: block; cursor: grab;"></canvas>
            <div style="position: absolute; bottom: 12px; left: 16px; font-size: 0.8rem; color: var(--text-dim); pointer-events: none;">
              🖱️ Geser dengan mouse atau sentuhan untuk memutar sudut pandang orbital 3D
            </div>
          </div>

          <div id="orbital-desc-box" style="margin-top: 16px; padding: 18px 24px; background: rgba(0,0,0,0.25); border-radius: var(--radius-sm); font-size: 0.95rem; line-height: 1.6;">
            <strong style="color: var(--neon-cyan);">Orbital s (Sharp, l = 0):</strong> Berbentuk bola sferis simetris sempurna tanpa bidang simpul angular. Elektron dapat ditemukan dengan kemungkinan yang sama ke segala arah dari inti atom. Setiap kulit atom memiliki 1 orbital s (maksimal 2 elektron).
          </div>
        </div>
      </section>

      <!-- Tab 3: Quantum Numbers -->
      <section id="atom-panel-quantum" class="lab-panel">
        <div class="lab-card" style="padding: 32px;">
          <h3 style="font-size: 1.5rem; margin-bottom: 12px; color: var(--photon-purple);">4 Bilangan Kuantum: Alamat Rumah Elektron</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
            Sama seperti alamat surat memiliki Negara, Kota, Jalan, dan Nomor Rumah, setiap elektron di dalam atom memiliki tepat 4 bilangan kuantum unik yang membedakannya dari elektron lain.
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
            <div class="prop-card">
              <span class="meta-tag" style="background: rgba(139,92,246,0.15); color: #8b5cf6;">1. Bilangan Kuantum Utama</span>
              <h4 style="font-size: 1.4rem; font-family: var(--font-mono); margin: 8px 0; color: #8b5cf6;">n (1, 2, 3, 4…)</h4>
              <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">
                Menyatakan <strong>kulit atom</strong> dan tingkat energi utama elektron serta ukuran jari-jari orbital elektron dari inti atom.
              </p>
            </div>

            <div class="prop-card">
              <span class="meta-tag" style="background: rgba(6,182,212,0.15); color: #06b6d4;">2. Bilangan Kuantum Azimut</span>
              <h4 style="font-size: 1.4rem; font-family: var(--font-mono); margin: 8px 0; color: #06b6d4;">l (0 s/d n-1)</h4>
              <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">
                Menyatakan <strong>subkulit</strong> dan bentuk tiga dimensi orbital (l=0 adalah s, l=1 adalah p, l=2 adalah d, l=3 adalah f).
              </p>
            </div>

            <div class="prop-card">
              <span class="meta-tag" style="background: rgba(16,185,129,0.15); color: #10b981;">3. Bilangan Kuantum Magnetik</span>
              <h4 style="font-size: 1.4rem; font-family: var(--font-mono); margin: 8px 0; color: #10b981;">mₗ (-l … 0 … +l)</h4>
              <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">
                Menyatakan <strong>orientasi ruang</strong> orbital terhadap medan magnet (contoh: subkulit p memiliki 3 orientasi: pₓ, pᵧ, p_z).
              </p>
            </div>

            <div class="prop-card">
              <span class="meta-tag" style="background: rgba(245,158,11,0.15); color: #f59e0b;">4. Bilangan Kuantum Spin</span>
              <h4 style="font-size: 1.4rem; font-family: var(--font-mono); margin: 8px 0; color: #f59e0b;">mₛ (+½ atau -½)</h4>
              <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5;">
                Menyatakan <strong>arah putaran rotasi intrinsik</strong> elektron pada porosnya sendiri (searah jarum jam ↑ atau berlawanan ↓).
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 4: Aufbau & Hund Rule -->
      <section id="atom-panel-aufbau" class="lab-panel">
        <div class="lab-card" style="padding: 32px;">
          <h3 style="font-size: 1.5rem; margin-bottom: 12px; color: var(--quantum-emerald);">Aturan Pengisian Elektron Konfigurasi Atom</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
            Tiga aturan fundamental fisika kuantum yang mengatur bagaimana elektron menghuni orbital atom sebelum membentuk ikatan kovalen molekul:
          </p>

          <div style="display: flex; flex-direction: column; gap: 20px;">
            <div style="background: rgba(0,0,0,0.2); border-left: 4px solid var(--neon-cyan); border-radius: var(--radius-sm); padding: 18px 24px;">
              <h4 style="font-size: 1.15rem; color: var(--neon-cyan); margin-bottom: 6px;">1. Prinsip Aufbau (Membangun dari Energi Rendah)</h4>
              <p style="font-size: 0.92rem; color: var(--text-main); line-height: 1.6;">
                Elektron selalu mengisi orbital dengan tingkat energi terendah terlebih dahulu sebelum menempati orbital berenergi lebih tinggi.
                <br/><strong style="font-family: var(--font-mono); color: var(--electric-azure);">Urutan Energi: 1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p → 5s → 4d → 5p → 6s…</strong>
              </p>
            </div>

            <div style="background: rgba(0,0,0,0.2); border-left: 4px solid var(--photon-purple); border-radius: var(--radius-sm); padding: 18px 24px;">
              <h4 style="font-size: 1.15rem; color: var(--photon-purple); margin-bottom: 6px;">2. Larangan Pauli (Eksklusi)</h4>
              <p style="font-size: 0.92rem; color: var(--text-main); line-height: 1.6;">
                Tidak boleh ada dua elektron dalam satu atom yang memiliki keempat bilangan kuantum (n, l, mₗ, mₛ) yang identik sama persis. Akibatnya, <strong>satu orbital maksimal hanya dapat dihuni oleh 2 elektron dengan arah spin berlawanan</strong> (↑↓).
              </p>
            </div>

            <div style="background: rgba(0,0,0,0.2); border-left: 4px solid var(--electron-amber); border-radius: var(--radius-sm); padding: 18px 24px;">
              <h4 style="font-size: 1.15rem; color: var(--electron-amber); margin-bottom: 6px;">3. Kaidah Hund (Penghuni Bus Sendiri-sendiri)</h4>
              <p style="font-size: 0.92rem; color: var(--text-main); line-height: 1.6;">
                Pada orbital-orbital yang setingkat energi (seperti 3 orbital p atau 5 orbital d), elektron akan menempati orbital secara sendiri-sendiri dengan spin paralel (↑) terlebih dahulu, sebelum berpasangan (↑↓). Hal ini meminimalkan gaya tolak elektrostatik antar elektron.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 5: Chemical Bonding & Intermolecular Forces -->
      <section id="atom-panel-bonding" class="lab-panel">
        <div class="lab-card" style="padding: 32px;">
          <h3 style="font-size: 1.5rem; margin-bottom: 12px; color: var(--neon-cyan);">Jembatan Atom ke Molekul: Ikatan Kimia & Gaya Antarmolekul</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
            Atom bergabung menjadi molekul untuk mencapai konfigurasi elektron stabil (aturan oktet 8 elektron atau duplet 2 elektron seperti gas mulia).
          </p>

          <h4 style="font-size: 1.25rem; color: var(--electric-azure); margin-bottom: 16px;">A. Tiga Ikatan Intramolekul Utama (Kuat)</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px; margin-bottom: 30px;">
            <div class="prop-card" style="border-top: 4px solid #ef4444;">
              <h5 style="color: #ef4444; font-size: 1.1rem; margin-bottom: 8px;">1. Ikatan Ionik (Elektrovalen)</h5>
              <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 8px;">
                Terjadi akibat <strong>serah-terima elektron</strong> antara atom logam (kehilangan elektron jadi kation) dan atom nonlogam (menangkap elektron jadi anion).
              </p>
              <div style="font-size: 0.82rem; color: var(--text-main);">
                Contoh: <strong>NaCl (Garam Dapur)</strong>, <strong>MgO</strong>. Sifat: Titik leleh sangat tinggi, menghantarkan listrik dalam lelehan/larutan.
              </div>
            </div>

            <div class="prop-card" style="border-top: 4px solid var(--neon-cyan);">
              <h5 style="color: var(--neon-cyan); font-size: 1.1rem; margin-bottom: 8px;">2. Ikatan Kovalen (Sharing)</h5>
              <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 8px;">
                Terjadi akibat <strong>pemakaian bersama pasangan elektron</strong> oleh sesama atom nonlogam yang sama-sama ingin mencapai kestabilan oktet.
              </p>
              <div style="font-size: 0.82rem; color: var(--text-main);">
                Jenis: Tunggal (σ), Rangkap 2 (σ+π), Rangkap 3 (σ+2π). Polar (H₂O, HCl) vs Nonpolar (O₂, CH₄) berdasarkan perbedaan elektronegativitas (ΔEN).
              </div>
            </div>

            <div class="prop-card" style="border-top: 4px solid #f59e0b;">
              <h5 style="color: #f59e0b; font-size: 1.1rem; margin-bottom: 8px;">3. Ikatan Logam (Lautan Elektron)</h5>
              <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 8px;">
                Kation-kation logam tersusun rapi dalam <strong>lautan elektron valensi terdelokalisasi</strong> yang bebas mengalir ke segala arah.
              </p>
              <div style="font-size: 0.82rem; color: var(--text-main);">
                Menyebabkan logam mengkilap, konduktor panas & listrik unggul, serta dapat ditempa (liat/malleable) tanpa retak.
              </div>
            </div>
          </div>

          <h4 style="font-size: 1.25rem; color: var(--photon-purple); margin-bottom: 16px;">B. Gaya Tarik Antarmolekul (Menentukan Titik Didih & Wujud Zat)</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
            <div style="background: rgba(0,0,0,0.25); border-radius: var(--radius-sm); padding: 18px;">
              <strong style="color: #ec4899; font-size: 1rem; display: block; margin-bottom: 6px;">💧 Ikatan Hidrogen (Super Kuat)</strong>
              <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
                Gaya tarik dipol ekstra kuat antara atom H yang terikat pada F, O, atau N dengan pasangan elektron bebas molekul tetangga. Inilah sebab air berwujud cair pada suhu kamar dan DNA dapat berpilin!
              </p>
            </div>

            <div style="background: rgba(0,0,0,0.25); border-radius: var(--radius-sm); padding: 18px;">
              <strong style="color: #38bdf8; font-size: 1rem; display: block; margin-bottom: 6px;">⚡ Gaya Dipol-Dipol</strong>
              <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
                Tarik-menarik elektrostatis antara ujung positif molekul polar dengan ujung negatif molekul polar tetangganya (contoh: HCl, Aseton).
              </p>
            </div>

            <div style="background: rgba(0,0,0,0.25); border-radius: var(--radius-sm); padding: 18px;">
              <strong style="color: #10b981; font-size: 1rem; display: block; margin-bottom: 6px;">🌊 Gaya London (Dispersi)</strong>
              <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
                Dipol sesaat akibat pergerakan acak elektron yang mengimbas molekul tetangga. Terjadi pada semua molekul, termasuk gas mulia (He, Ne) dan molekul nonpolar (O₂, N₂).
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 6: VSEPR, Molecular Geometries & Functional Groups -->
      <section id="atom-panel-vsepr" class="lab-panel">
        <div class="lab-card" style="padding: 32px;">
          <h3 style="font-size: 1.5rem; margin-bottom: 12px; color: var(--electric-azure);">Geometri Molekul 3D (VSEPR), Hibridisasi & Gugus Fungsi Organik</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
            Teori <em>Valence Shell Electron Pair Repulsion</em> (VSEPR) menyatakan pasangan elektron ikatan (PEI) dan pasangan elektron bebas (PEB) saling tolak sejauh mungkin di ruang 3D, menentukan bentuk fisik molekul.
          </p>

          <h4 style="font-size: 1.2rem; color: var(--neon-cyan); margin-bottom: 14px;">Bentuk Geometri VSEPR Pokok:</h4>
          <div style="overflow-x: auto; margin-bottom: 30px;">
            <table class="chem-data-table" style="width: 100%; border-collapse: collapse; font-size: 0.88rem;">
              <thead>
                <tr style="background: rgba(255,255,255,0.05); text-align: left;">
                  <th style="padding: 12px;">Bentuk 3D</th>
                  <th style="padding: 12px;">Notasi AXE</th>
                  <th style="padding: 12px;">PEI</th>
                  <th style="padding: 12px;">PEB</th>
                  <th style="padding: 12px;">Sudut Ikatan</th>
                  <th style="padding: 12px;">Hibridisasi</th>
                  <th style="padding: 12px;">Contoh Molekul</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                  <td style="padding: 12px; font-weight: bold; color: var(--neon-cyan);">Linear</td>
                  <td style="padding: 12px; font-family: var(--font-mono);">AX₂</td>
                  <td style="padding: 12px;">2</td>
                  <td style="padding: 12px;">0</td>
                  <td style="padding: 12px;">180°</td>
                  <td style="padding: 12px; font-family: var(--font-mono);">sp</td>
                  <td style="padding: 12px;">CO₂, BeCl₂</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                  <td style="padding: 12px; font-weight: bold; color: #38bdf8;">Segitiga Datar (Trigonal Planar)</td>
                  <td style="padding: 12px; font-family: var(--font-mono);">AX₃</td>
                  <td style="padding: 12px;">3</td>
                  <td style="padding: 12px;">0</td>
                  <td style="padding: 12px;">120°</td>
                  <td style="padding: 12px; font-family: var(--font-mono);">sp²</td>
                  <td style="padding: 12px;">BF₃, SO₃</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                  <td style="padding: 12px; font-weight: bold; color: #818cf8;">Bengkok / V-Shape (3 Domain)</td>
                  <td style="padding: 12px; font-family: var(--font-mono);">AX₂E</td>
                  <td style="padding: 12px;">2</td>
                  <td style="padding: 12px;">1</td>
                  <td style="padding: 12px;">&lt; 120°</td>
                  <td style="padding: 12px; font-family: var(--font-mono);">sp²</td>
                  <td style="padding: 12px;">SO₂, O₃ (Ozon)</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                  <td style="padding: 12px; font-weight: bold; color: #a855f7;">Tetrahedron (Tetrahedral)</td>
                  <td style="padding: 12px; font-family: var(--font-mono);">AX₄</td>
                  <td style="padding: 12px;">4</td>
                  <td style="padding: 12px;">0</td>
                  <td style="padding: 12px;">109.5°</td>
                  <td style="padding: 12px; font-family: var(--font-mono);">sp³</td>
                  <td style="padding: 12px;">CH₄ (Metana), CCl₄</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                  <td style="padding: 12px; font-weight: bold; color: #ec4899;">Piramida Trigonal</td>
                  <td style="padding: 12px; font-family: var(--font-mono);">AX₃E</td>
                  <td style="padding: 12px;">3</td>
                  <td style="padding: 12px;">1</td>
                  <td style="padding: 12px;">107°</td>
                  <td style="padding: 12px; font-family: var(--font-mono);">sp³</td>
                  <td style="padding: 12px;">NH₃ (Amonia), PCl₃</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                  <td style="padding: 12px; font-weight: bold; color: #06b6d4;">Bengkok / V-Shape (4 Domain)</td>
                  <td style="padding: 12px; font-family: var(--font-mono);">AX₂E₂</td>
                  <td style="padding: 12px;">2</td>
                  <td style="padding: 12px;">2</td>
                  <td style="padding: 12px;">104.5°</td>
                  <td style="padding: 12px; font-family: var(--font-mono);">sp³</td>
                  <td style="padding: 12px;">H₂O (Air), H₂S</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                  <td style="padding: 12px; font-weight: bold; color: #10b981;">Bipiramida Trigonal</td>
                  <td style="padding: 12px; font-family: var(--font-mono);">AX₅</td>
                  <td style="padding: 12px;">5</td>
                  <td style="padding: 12px;">0</td>
                  <td style="padding: 12px;">90° &amp; 120°</td>
                  <td style="padding: 12px; font-family: var(--font-mono);">sp³d</td>
                  <td style="padding: 12px;">PCl₅</td>
                </tr>
                <tr>
                  <td style="padding: 12px; font-weight: bold; color: #f59e0b;">Oktahedron (Octahedral)</td>
                  <td style="padding: 12px; font-family: var(--font-mono);">AX₆</td>
                  <td style="padding: 12px;">6</td>
                  <td style="padding: 12px;">0</td>
                  <td style="padding: 12px;">90°</td>
                  <td style="padding: 12px; font-family: var(--font-mono);">sp³d²</td>
                  <td style="padding: 12px;">SF₆ (Sulfur Heksafluorida)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 style="font-size: 1.2rem; color: var(--quantum-emerald); margin-bottom: 14px;">Gugus Fungsi Kimia Organik & Makromolekul:</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
            <div class="prop-card">
              <span class="meta-tag" style="background: rgba(16,185,129,0.15); color: #10b981;">Alkohol &amp; Eter</span>
              <h5 style="margin: 8px 0; color: #10b981;">-OH &amp; -O-</h5>
              <p style="font-size: 0.85rem; color: var(--text-muted);">
                Etanol (antiseptik &amp; minuman), Dimetil eter (aerosol &amp; pendingin).
              </p>
            </div>

            <div class="prop-card">
              <span class="meta-tag" style="background: rgba(6,182,212,0.15); color: #06b6d4;">Aldehida &amp; Keton</span>
              <h5 style="margin: 8px 0; color: #06b6d4;">-CHO &amp; -CO-</h5>
              <p style="font-size: 0.85rem; color: var(--text-muted);">
                Formaldehida (pengawet biologi), Aseton (pelarut kuteks &amp; industri).
              </p>
            </div>

            <div class="prop-card">
              <span class="meta-tag" style="background: rgba(245,158,11,0.15); color: #f59e0b;">Asam Karboksilat &amp; Ester</span>
              <h5 style="margin: 8px 0; color: #f59e0b;">-COOH &amp; -COO-</h5>
              <p style="font-size: 0.85rem; color: var(--text-muted);">
                Asam Cuka (asam asetat), Ester perisa aroma buah-buahan sintetis.
              </p>
            </div>

            <div class="prop-card">
              <span class="meta-tag" style="background: rgba(236,72,153,0.15); color: #ec4899;">Amina &amp; Amida (Biomolekul)</span>
              <h5 style="margin: 8px 0; color: #ec4899;">-NH₂ &amp; -CO-NH-</h5>
              <p style="font-size: 0.85rem; color: var(--text-muted);">
                Pembangun Asam Amino, Ikatan Peptida Protein tubuh, Kafein &amp; Nilon.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  // Tab Switching
  $$('[data-atom-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('[data-atom-tab]').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.atomTab;
      ['subatomic', 'orbitals', 'quantum', 'aufbau', 'bonding', 'vsepr'].forEach(name => {
        const pan = $(`#atom-panel-${name}`);
        if (pan) pan.classList.toggle('active', name === target);
      });
      if (target === 'orbitals' && drawOrbital) drawOrbital();
    });
  });

  // Orbital 3D Canvas Renderer
  const canvas = $('#orbital-3d-canvas');
  let currentOrbMode = 's';
  let rotX = 0.3, rotY = 0.4;
  let isDragging = false, lastX = 0, lastY = 0;
  let animId = null;

  function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = (rect.width || 400) * dpr;
    canvas.height = 420 * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
  }

  function drawOrbital() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width / (window.devicePixelRatio || 1);
    const h = 420;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;

    ctx.save();
    ctx.translate(cx, cy);

    // Draw coordinate axes
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-160, 0); ctx.lineTo(160, 0); // x-axis
    ctx.moveTo(0, -160); ctx.lineTo(0, 160); // y-axis
    ctx.stroke();

    if (currentOrbMode === 's') {
      // s-orbital: Shaded sphere with glowing probability gradient
      const grad = ctx.createRadialGradient(-20, -20, 10, 0, 0, 100);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.3, '#00f2fe');
      grad.addColorStop(0.7, '#3b82f6');
      grad.addColorStop(1, 'rgba(11, 18, 32, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, 100, 0, Math.PI * 2);
      ctx.fill();

      // Nucleus
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fill();
    } else if (currentOrbMode === 'p') {
      // p-orbital: Two teardrop lobes along orientation
      const rot = rotY;
      ctx.rotate(rot);

      // Positive lobe (Blue)
      const grad1 = ctx.createRadialGradient(0, -60, 5, 0, -60, 50);
      grad1.addColorStop(0, '#ffffff');
      grad1.addColorStop(0.4, '#38bdf8');
      grad1.addColorStop(1, 'rgba(56, 189, 248, 0)');

      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.ellipse(0, -60, 45, 65, 0, 0, Math.PI * 2);
      ctx.fill();

      // Negative lobe (Pink/Purple)
      const grad2 = ctx.createRadialGradient(0, 60, 5, 0, 60, 50);
      grad2.addColorStop(0, '#ffffff');
      grad2.addColorStop(0.4, '#ec4899');
      grad2.addColorStop(1, 'rgba(236, 72, 153, 0)');

      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.ellipse(0, 60, 45, 65, 0, 0, Math.PI * 2);
      ctx.fill();

      // Nodal plane at center
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (currentOrbMode === 'd') {
      // d-orbital: 4 cloverleaf lobes
      const rot = rotY;
      ctx.rotate(rot);

      [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].forEach((ang, idx) => {
        ctx.save();
        ctx.rotate(ang + Math.PI / 4);

        const col = (idx % 2 === 0) ? '#10b981' : '#f59e0b';
        const grad = ctx.createRadialGradient(0, -50, 4, 0, -50, 40);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.4, col);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, -50, 32, 48, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // Nucleus
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  window.addEventListener('resize', () => { resizeCanvas(); drawOrbital(); });
  resizeCanvas();
  drawOrbital();

  // Mouse drag rotation
  canvas.addEventListener('mousedown', e => {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
  });
  window.addEventListener('mousemove', e => {
    if (isDragging) {
      rotY += (e.clientX - lastX) * 0.01;
      rotX += (e.clientY - lastY) * 0.01;
      lastX = e.clientX;
      lastY = e.clientY;
      drawOrbital();
    }
  });
  window.addEventListener('mouseup', () => { isDragging = false; });

  // Touch for mobile
  canvas.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      isDragging = true;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
    }
  }, { passive: true });
  canvas.addEventListener('touchmove', e => {
    if (isDragging && e.touches.length === 1) {
      rotY += (e.touches[0].clientX - lastX) * 0.01;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
      drawOrbital();
    }
  }, { passive: true });
  canvas.addEventListener('touchend', () => { isDragging = false; });

  // Auto rotate loop
  function loop() {
    if (!isDragging) {
      rotY += 0.005;
      drawOrbital();
    }
    animId = requestAnimationFrame(loop);
  }
  animId = requestAnimationFrame(loop);

  cleanup(() => {
    if (animId) cancelAnimationFrame(animId);
  });

  // Orbital selection buttons
  const descBox = $('#orbital-desc-box');
  const descriptions = {
    s: '<strong style="color: var(--neon-cyan);">Orbital s (Sharp, l = 0):</strong> Berbentuk bola sferis simetris sempurna tanpa bidang simpul angular. Elektron dapat ditemukan dengan kemungkinan yang sama ke segala arah dari inti atom. Setiap kulit atom memiliki 1 orbital s (maksimal 2 elektron).',
    p: '<strong style="color: var(--electric-azure);">Orbital p (Principal, l = 1):</strong> Berbentuk dumbbell dua daun (balon terpilin) dengan simpul nodal pada inti atom di mana probabilitas elektron nol. Memiliki 3 orientasi ruang: p_x, p_y, p_z (maksimal 6 elektron).',
    d: '<strong style="color: var(--quantum-emerald);">Orbital d (Diffuse, l = 2):</strong> Berbentuk daun semanggi berdaun empat (cloverleaf) yang bertanggung jawab atas sifat magnetik, warna-warni memukau, dan aktivitas katalitik logam transisi (seperti Besi, Tembaga, Emas). Memiliki 5 orientasi ruang (maksimal 10 elektron).'
  };

  $$('.btn-orb-select').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.btn-orb-select').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentOrbMode = btn.dataset.orb;
      if (descBox) descBox.innerHTML = descriptions[currentOrbMode];
      drawOrbital();
    });
  });
}
