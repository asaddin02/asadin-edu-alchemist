// ChemTaxa · Saved Bookmarks & Personal Notes Notebook
import { $, $$, toast } from '../core/dom.js';
import { getPrefs } from '../core/prefs.js';
import { getUi } from '../i18n/ui.js';
import { getIcon } from '../components/icons.js';
import { getBookmarks, getNotes, setNote } from '../core/userdata.js';
import { curatedMolecules } from '../data/curatedMolecules.js';
import { renderMoleculeCard } from '../components/common.js';

export function title() {
  return 'Koleksi & Catatan';
}

export async function render({ main }) {
  const prefs = getPrefs();
  const ui = getUi(prefs.lang);

  const bookmarks = getBookmarks();
  const notes = getNotes();

  const savedMols = bookmarks.map(b => {
    const id = typeof b === 'string' ? b : b.id;
    return curatedMolecules.find(m => m.id === id) || {
      id,
      nameId: id,
      nameEn: id,
      formula: 'Molekul Tersimpan',
      summaryId: 'Tersimpan dalam koleksi pribadi Anda.'
    };
  });

  const notesList = Object.entries(notes);

  main.innerHTML = `
    <div class="container" style="padding-top: 40px; padding-bottom: 60px;">
      <div class="section-header">
        <div>
          <h2>${ui.navSaved}</h2>
          <p>Kumpulan molekul yang kamu tandai dan rangkuman catatan belajar pribadimu.</p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button id="btn-print-notebook" class="btn-action">
            ${getIcon('print', 16)} <span>${ui.print}</span>
          </button>
          <button id="btn-export-notes" class="btn-action">
            ${getIcon('share', 16)} <span>Ekspor Data (JSON)</span>
          </button>
        </div>
      </div>

      <!-- Bookmarks Section -->
      <section style="margin-bottom: 40px;">
        <h3 style="font-size: 1.4rem; margin-bottom: 16px; display: flex; align-items: center; gap: 10px;">
          ${getIcon('bookmarkFill', 20)}
          <span>Molekul Favorit Saya (${savedMols.length})</span>
        </h3>

        ${savedMols.length > 0 ? `
          <div class="mol-grid">
            ${savedMols.map(m => renderMoleculeCard(m)).join('')}
          </div>
        ` : `
          <div class="lab-card" style="padding: 40px; text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 12px;">📑</div>
            <h4>Belum Ada Molekul Tersimpan</h4>
            <p style="color: var(--text-muted); margin-bottom: 16px;">
              Klik ikon pita bintang/bookmark pada kartu molekul untuk menyimpannya di sini.
            </p>
            <a href="#/explore" class="btn-search">Telusuri Molekul</a>
          </div>
        `}
      </section>

      <!-- Personal Notes Section -->
      <section>
        <h3 style="font-size: 1.4rem; margin-bottom: 16px; display: flex; align-items: center; gap: 10px;">
          ${getIcon('teacher', 20)}
          <span>Buku Catatan Belajar (${notesList.length})</span>
        </h3>

        ${notesList.length > 0 ? `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
            ${notesList.map(([key, val]) => `
              <div class="lab-card" style="padding: 24px; position: relative;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                  <h4 style="font-size: 1.15rem; color: var(--neon-cyan);">${val.title || key}</h4>
                  <span style="font-size: 0.75rem; color: var(--text-dim);">
                    ${new Date(val.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <p style="color: var(--text-main); font-size: 0.92rem; line-height: 1.6; white-space: pre-wrap; margin-bottom: 16px;">
                  ${val.content}
                </p>
                <div style="border-top: 1px solid var(--border); padding-top: 12px; display: flex; justify-content: flex-end;">
                  <button class="btn-tool btn-delete-note" data-note-key="${key}" title="Hapus catatan" style="color: var(--crimson-fire);">
                    ✕
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="lab-card" style="padding: 40px; text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 12px;">📝</div>
            <h4>Belum Ada Catatan Tertulis</h4>
            <p style="color: var(--text-muted);">
              Buka halaman rincian molekul apa saja dan ketik ringkasan atau pertanyaanmu di kotak 'Catatan Belajar Saya'.
            </p>
          </div>
        `}
      </section>
    </div>
  `;

  // Print button
  $('#btn-print-notebook')?.addEventListener('click', () => {
    window.print();
  });

  // Export JSON
  $('#btn-export-notes')?.addEventListener('click', () => {
    const data = {
      exportedAt: new Date().toISOString(),
      bookmarks: getBookmarks(),
      notes: getNotes()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chemtaxa-catatan-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast('Data berhasil diekspor!', 'success');
  });

  // Delete note button
  $$('.btn-delete-note').forEach(btn => {
    btn.addEventListener('click', () => {
      const k = btn.dataset.noteKey;
      setNote(k, ''); // clears note
      toast('Catatan berhasil dihapus.');
      render({ main });
    });
  });
}
