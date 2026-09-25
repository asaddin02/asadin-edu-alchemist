// ChemTaxa · About & Official Open Science Data Sources
import { $, $$ } from '../core/dom.js';
import { getPrefs } from '../core/prefs.js';
import { getUi } from '../i18n/ui.js';
import { getIcon } from '../components/icons.js';

export function title() {
  return 'Tentang & Sumber Data';
}

export async function render({ main }) {
  const prefs = getPrefs();
  const ui = getUi(prefs.lang);

  main.innerHTML = `
    <div class="container" style="padding-top: 40px; padding-bottom: 60px; max-width: 860px;">
      <div class="section-header">
        <div>
          <h2>${ui.navAbout}</h2>
          <p>Mengenal ChemTaxa: atlas struktur molekul terbuka dan platform edukasi kimia modern bagian dari ekosistem Asadin Edu.</p>
        </div>
      </div>

      <div class="lab-card" style="padding: 36px; margin-bottom: 30px;">
        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 20px;">
          <div style="color: var(--neon-cyan);">${getIcon('atom', 36)}</div>
          <div>
            <h3 style="font-size: 1.8rem; font-weight: 800;">ChemTaxa · Asadin Edu</h3>
            <span style="font-size: 0.9rem; color: var(--text-muted);">Atlas Molekul & Kimia Semesta untuk SD sampai Kuliah</span>
          </div>
        </div>

        <p style="font-size: 1.05rem; line-height: 1.7; color: var(--text-main); margin-bottom: 20px;">
          <strong>ChemTaxa</strong> diciptakan untuk menjawab tantangan terbesar dalam pembelajaran kimia: <em>abstraksi partikel mikroskopis</em>. Di ruang kelas konvensional, murid sering kesulitan membayangkan bagaimana atom-atom kecil yang tak kasat mata saling bergandengan membentuk geometri tiga dimensi yang menentukan seluruh sifat benda di dunia nyata.
        </p>

        <p style="font-size: 1rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 30px;">
          Sebagai pendamping dari proyek saudara kami <strong>BioTaxa</strong> (yang berfokus pada keanekaragaman hayati dan taksonomi biologi), ChemTaxa menelusuri fondasi materi yang lebih dalam: <strong>kimia molekuler dan atom</strong> yang menyusun tubuh makhluk hidup, atmosfer planet, obat-obatan, dan material maju masa depan.
        </p>

        <div style="border-top: 1px solid var(--border); padding-top: 24px;">
          <h4 style="font-size: 1.2rem; margin-bottom: 14px; color: var(--neon-cyan);">
            🌐 Integrasi API Resmi & Transparansi Sains:
          </h4>
          <ul style="padding-left: 20px; line-height: 1.8; color: var(--text-main); font-size: 0.95rem;">
            <li>
              <strong>PubChem PUG REST API:</strong> Dikelola oleh <em>National Center for Biotechnology Information (NCBI)</em> pada <em>National Library of Medicine (NLM / NIH)</em>, Amerika Serikat. ChemTaxa mengambil diagram 2D, koordinat 3D SDF, massa molar presisi, dan nama IUPAC secara langsung dari pangkalan data ilmiah publik terbesar di dunia.
            </li>
            <li>
              <strong>Standar Tata Nama IUPAC:</strong> Mengikuti aturan formal <em>International Union of Pure and Applied Chemistry</em> untuk memastikan akurasi terminologi bagi pelajar SMA dan mahasiswa tingkat sarjana.
            </li>
            <li>
              <strong>Kurikulum Bertingkat Adaptif:</strong> Konten dirancang bertingkat untuk 4 fase perkembangan kognitif: SD (Mengenal Molekul), SMP (Atom & Ikatan Dasar), SMA (Geometri VSEPR & Kimia Organik), dan Kuliah (MOT, Stereokimia & Spektroskopi).
            </li>
            <li>
              <strong>100% Bebas Akses & Open Source:</strong> Seluruh fitur, lab virtual 3D, kalkulator stoikiometri, dan kartu flashcard dapat diakses tanpa biaya oleh siapapun di seluruh penjuru dunia.
            </li>
          </ul>
        </div>
      </div>

      <div class="lab-card" style="padding: 28px; background: rgba(0,242,254,0.05); border-color: rgba(0,242,254,0.2);">
        <h4 style="font-size: 1.1rem; color: var(--neon-cyan); margin-bottom: 8px;">🤝 Lisensi & Kontribusi</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
          ChemTaxa dilisensikan di bawah <strong>MIT License</strong>. Konten edukasi berada di bawah lisensi terbuka Creative Commons (CC BY-SA 4.0). Dibuat dengan dedikasi tinggi agar para pelajar, mahasiswa, dan guru di seluruh Indonesia dan dunia merasakan betapa mengasyikkannya mempelajari kimia molekul!
        </p>
      </div>
    </div>
  `;
}
