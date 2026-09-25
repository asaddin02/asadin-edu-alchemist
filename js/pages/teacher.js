// ChemTaxa · Teacher Hub & Educator Pedagogical Toolkit
import { $, $$, toast } from '../core/dom.js';
import { getPrefs } from '../core/prefs.js';
import { getUi } from '../i18n/ui.js';
import { getIcon } from '../components/icons.js';
import { curatedMolecules } from '../data/curatedMolecules.js';

export function title() {
  return 'Ruang Guru & Pengajar';
}

export async function render({ main }) {
  const prefs = getPrefs();
  const ui = getUi(prefs.lang);

  main.innerHTML = `
    <div class="container" style="padding-top: 40px; padding-bottom: 60px;">
      <div class="section-header">
        <div>
          <h2>${ui.navTeacher}</h2>
          <p>Pusat perangkat ajar untuk guru, dosen, dan instruktur kimia: modul ajar terintegrasi Kurikulum Merdeka, pembuat lembar kerja siswa (LKS), dan kartu flashcard molekul cetak.</p>
        </div>
        <button id="btn-print-teacher-guide" class="btn-action">
          ${getIcon('print', 16)} <span>Cetak Modul Ajar</span>
        </button>
      </div>

      <!-- Feature 1: Modul Ajar & Alur Tujuan Pembelajaran (ATP) -->
      <div class="lab-card" style="margin-bottom: 30px; padding: 30px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
          <span class="badge badge-lvl" style="--badge-col: var(--quantum-emerald)">Kurikulum Merdeka & Global</span>
          <span style="font-weight: 700; color: var(--text-muted); font-size: 0.9rem;">Pedoman Pedagogi</span>
        </div>

        <h3 style="font-size: 1.6rem; margin-bottom: 12px;">Modul Ajar Terpadu Struktur Molekul</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
          Panduan pembelajaran berbasis penemuan (Discovery Learning) dan eksperimen laboratorium virtual untuk memvisualisasikan partikel mikroskopis abstrak menjadi pengalaman nyata.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
          <div class="prop-card">
            <h4 style="color: #10b981; margin-bottom: 8px;">Fase C (Kelas 5-6 SD)</h4>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 12px;">
              Fokus: Wujud zat, siklus air H₂O, partikel penyusun materi, dan observasi bahan sehari-hari di dapur.
            </p>
            <span class="meta-tag">Alokasi: 4 JP • Project-Based</span>
          </div>

          <div class="prop-card">
            <h4 style="color: #06b6d4; margin-bottom: 8px;">Fase D (Kelas 7-9 SMP)</h4>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 12px;">
              Fokus: Atom, ion, molekul unsur vs senyawa, ikatan kovalen/ionik, dan uji keasaman larutan (pH).
            </p>
            <span class="meta-tag">Alokasi: 6 JP • Inkuiri Terbimbing</span>
          </div>

          <div class="prop-card">
            <h4 style="color: #8b5cf6; margin-bottom: 8px;">Fase E/F (Kelas 10-12 SMA)</h4>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 12px;">
              Fokus: Teori VSEPR 3D, kepolaran momen dipol, gugus fungsi organik, stoikiometri, dan hukum kesetimbangan.
            </p>
            <span class="meta-tag">Alokasi: 8 JP • Eksperimen Lab Virtual</span>
          </div>

          <div class="prop-card">
            <h4 style="color: #ec4899; margin-bottom: 8px;">Pendidikan Tinggi (Kuliah)</h4>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 12px;">
              Fokus: Teori orbital molekul MOT, analisis konformasi, stereokimia enantiomer, spektroskopi IR/NMR, koordinasi PubChem.
            </p>
            <span class="meta-tag">Alokasi: 1 Semester • R&D Ilmiah</span>
          </div>
        </div>
      </div>

      <!-- Feature 2: Printable Flashcards Generator -->
      <div class="lab-card" style="margin-bottom: 30px; padding: 30px;">
        <h3 style="font-size: 1.5rem; margin-bottom: 8px;">Generator Kartu Flashcard Molekul Siap Cetak</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 24px;">
          Cetak kartu belajar molekul berkualitas tinggi untuk aktivitas diskusi kelompok, tebak-tebakan kelas, atau perlengkapan praktikum meja laboratorium.
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; margin-bottom: 24px;" id="printable-flashcards-grid">
          ${curatedMolecules.slice(0, 6).map(m => `
            <div style="border: 2px dashed var(--border); border-radius: var(--radius-md); padding: 16px; text-align: center; background: rgba(0,0,0,0.15);">
              <span style="font-family: var(--font-mono); font-size: 1.3rem; font-weight: 800; color: var(--neon-cyan); display: block; margin-bottom: 6px;">
                ${m.formula}
              </span>
              <strong style="font-size: 1.05rem; display: block; margin-bottom: 4px;">${m.nameId}</strong>
              <span style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-bottom: 10px;">
                Mr: ${m.mass} g/mol • ${m.geometry || 'Geometri Teratur'}
              </span>
              <p style="font-size: 0.82rem; color: var(--text-dim); line-height: 1.4;">
                ${m.summaryId.slice(0, 80)}…
              </p>
            </div>
          `).join('')}
        </div>

        <button id="btn-print-flashcards" class="btn-search">
          ${getIcon('print', 18)} <span>Cetak Seluruh Flashcard Ini</span>
        </button>
      </div>

      <!-- Feature 3: Student Worksheet (LKS) Generator -->
      <div class="lab-card" style="padding: 30px;">
        <h3 style="font-size: 1.5rem; margin-bottom: 8px;">Pembuat Lembar Kerja Siswa (LKS Interaktif)</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px;">
          Gunakan template tugas investigasi molekul berikut untuk diberikan kepada siswa sebagai tugas mandiri atau kelompok.
        </p>

        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 24px; margin-bottom: 20px;">
          <h4 style="margin-bottom: 12px; color: var(--neon-cyan);">Contoh Format Tugas Investigasi ChemTaxa:</h4>
          <ol style="padding-left: 20px; line-height: 1.8; color: var(--text-main); font-size: 0.95rem;">
            <li>Buka ChemTaxa dan cari molekul <strong>Air (H₂O)</strong> serta <strong>Metana (CH₄)</strong>.</li>
            <li>Gunakan <em>Lab Virtual 3D</em> untuk mengukur dan membandingkan sudut ikatan keduanya. Mengapa sudut ikatan air lebih kecil dibanding metana?</li>
            <li>Identifikasi jenis ikatan kimia dan momen dipol pada kedua molekul tersebut.</li>
            <li>Jelaskan peran ikatan hidrogen pada air terhadap kelangsungan hidup makhluk hidup di perairan es!</li>
          </ol>
        </div>

        <button id="btn-print-lks" class="btn-action">
          ${getIcon('print', 16)} <span>Cetak Format LKS Ini</span>
        </button>
      </div>
    </div>
  `;

  $('#btn-print-teacher-guide')?.addEventListener('click', () => window.print());
  $('#btn-print-flashcards')?.addEventListener('click', () => window.print());
  $('#btn-print-lks')?.addEventListener('click', () => window.print());
}
