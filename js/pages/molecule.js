// ChemTaxa · Molecule Profile Page (3D & 2D Viewer, Level Tabs, PubChem Integration, Notes, TTS)
import { $, $$, toast } from '../core/dom.js';
import { getPrefs } from '../core/prefs.js';
import { getUi } from '../i18n/ui.js';
import { getIcon } from '../components/icons.js';
import { getMoleculeDetails } from '../services/pubchem.js';
import { MoleculeViewer3D } from '../components/moleculeViewer3D.js';
import { renderNFPADiamond } from '../components/common.js';
import { isBookmarked, toggleBookmark, getNote, setNote } from '../core/userdata.js';
import { canSpeak, speak, stopSpeaking, isSpeaking } from '../services/speech.js';

let currentViewer = null;

export function title(route) {
  return route.id ? `Molekul ${route.id}` : 'Rincian Molekul';
}

export async function render({ id, main, cleanup }) {
  const prefs = getPrefs();
  const ui = getUi(prefs.lang);

  const mol = await getMoleculeDetails(id);

  if (!mol) {
    main.innerHTML = `
      <div class="container" style="padding: 60px 20px; text-align: center;">
        <div style="font-size: 4rem; margin-bottom: 16px;">⚛️</div>
        <h2>Molekul Tidak Ditemukan</h2>
        <p style="color: var(--text-muted); margin-bottom: 24px;">
          Data molekul dengan pengenal '${id}' tidak ditemukan di katalog ataupun PubChem API.
        </p>
        <a href="#/explore" class="btn-search">Kembali ke Jelajah</a>
      </div>
    `;
    return;
  }

  const name = prefs.lang === 'en' ? (mol.nameEn || mol.nameId) : (mol.nameId || mol.nameEn);
  const bookmarked = isBookmarked(mol.id);
  const savedNote = getNote(`mol_${mol.id}`);

  main.innerHTML = `
    <div class="mol-profile-wrap container">
      <!-- Breadcrumb -->
      <div class="profile-breadcrumb">
        <a href="#/home">${ui.navHome}</a>
        <span>/</span>
        <a href="#/explore">${ui.navExplore}</a>
        <span>/</span>
        <span style="color: var(--text-main); font-weight: 600;">${name}</span>
      </div>

      <!-- Main Header Card -->
      <div class="profile-header-card">
        <div class="profile-title-row">
          <div class="profile-titles">
            <span class="profile-formula-badge">${mol.formula}</span>
            <h1>${name}</h1>
            <p class="profile-iupac">${mol.iupac || name}</p>
          </div>

          <div class="profile-action-btns">
            <!-- Text-to-Speech Button -->
            <button id="btn-speak-mol" class="btn-action" title="Dengarkan narasi suara" aria-label="Dengarkan penjelasan">
              ${getIcon('speaker', 18)} <span>${ui.listen}</span>
            </button>

            <!-- Bookmark Button -->
            <button id="btn-toggle-fav" class="btn-action" aria-label="Simpan molekul">
              ${getIcon(bookmarked ? 'bookmarkFill' : 'bookmark', 18)}
              <span>${bookmarked ? ui.savedMolecule : ui.saveMolecule}</span>
            </button>

            <!-- Share Button -->
            <button id="btn-share-mol" class="btn-action" title="Salin tautan" aria-label="Bagikan">
              ${getIcon('share', 18)} <span>Bagikan</span>
            </button>
          </div>
        </div>

        <p style="font-size: 1.05rem; color: var(--text-muted); line-height: 1.6;">
          ${prefs.lang === 'en' ? mol.summaryEn : mol.summaryId}
        </p>
      </div>

      <!-- Viewers Grid (3D Interactive on Left, 2D Official PubChem on Right) -->
      <div class="profile-viewers-grid">
        <!-- 3D Interactive Stage -->
        <div class="viewer-3d-box">
          <div class="viewer-toolbar">
            <div class="viewer-tools-group">
              <span style="font-weight: 700; font-size: 0.85rem; color: var(--neon-cyan);">Tampilan 3D:</span>
              <button class="btn-view-mode active" data-mode="ball-and-stick">Bola & Batang</button>
              <button class="btn-view-mode" data-mode="space-filling">Ruang Penuh (VDW)</button>
              <button class="btn-view-mode" data-mode="wireframe">Rangka Kawat</button>
            </div>
            <div class="viewer-tools-group">
              <button id="btn-toggle-autorotate" class="btn-action" style="padding: 4px 10px; font-size: 0.8rem;">
                Putar Otomatis
              </button>
            </div>
          </div>

          <div class="viewer-canvas-wrap" id="profile-3d-container"></div>
          <p class="viewer-hint">
            💡 Geser untuk memutar • Gulir mouse/cubit layar untuk memperbesar • Klik atom untuk melihat nama & sifat unsur.
          </p>
        </div>

        <!-- 2D Structure & PubChem Verification -->
        <div class="viewer-2d-box">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h4 style="font-weight: 700;">Diagram 2D PubChem</h4>
            ${mol.cid ? `<span class="meta-tag">CID: ${mol.cid}</span>` : ''}
          </div>

          <div class="viewer-2d-img-wrap">
            ${mol.cid ? `
              <img src="https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${mol.cid}/PNG" 
                   alt="Struktur 2D ${name}" />
            ` : `
              <div class="mol-fallback-icon">${getIcon('molecule', 64)}</div>
            `}
          </div>

          <div style="margin-top: 14px; text-align: center;">
            ${mol.cid ? `
              <a href="https://pubchem.ncbi.nlm.nih.gov/compound/${mol.cid}" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 class="btn-card-link" 
                 style="justify-content: center; gap: 6px;">
                <span>Buka Catatan Resmi di PubChem NIH</span> ↗
              </a>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- Properties Grid -->
      <div class="profile-prop-grid">
        <div class="prop-card">
          <div class="prop-label">${ui.formula}</div>
          <div class="prop-value" style="color: var(--neon-cyan);">${mol.formula}</div>
        </div>

        <div class="prop-card">
          <div class="prop-label">${ui.molarMass}</div>
          <div class="prop-value">${mol.mass} g/mol</div>
        </div>

        <div class="prop-card">
          <div class="prop-label">${ui.stateLabel}</div>
          <div class="prop-value" style="text-transform: capitalize;">${mol.stateAtSTP}</div>
        </div>

        <div class="prop-card">
          <div class="prop-label">${ui.geometryLabel}</div>
          <div class="prop-value" style="font-size: 0.95rem;">${mol.geometry || 'Tetrahedral / Terdefinisi'}</div>
        </div>

        <div class="prop-card">
          <div class="prop-label">${ui.polarityLabel}</div>
          <div class="prop-value" style="font-size: 0.95rem;">${mol.polarity || 'Kovalen Polar'}</div>
        </div>

        ${mol.xlogp !== undefined ? `
          <div class="prop-card">
            <div class="prop-label">Kelarutan (LogP)</div>
            <div class="prop-value">${mol.xlogp}</div>
          </div>
        ` : ''}
      </div>

      <!-- Level-Adapted Educational Explanations (Tabs for SD, SMP, SMA, Kuliah) -->
      <div class="level-tabs-card">
        <h3 style="font-size: 1.3rem; margin-bottom: 16px;">Penjelasan Berdasarkan Tingkat Pendidikan</h3>
        <div class="level-tabs-nav" role="tablist">
          <button class="tab-btn ${prefs.level === 'sd' ? 'active' : ''}" data-target-level="sd">
            🌱 Tingkat SD (Dasar & Cerita)
          </button>
          <button class="tab-btn ${prefs.level === 'smp' ? 'active' : ''}" data-target-level="smp">
            ⚡ Tingkat SMP (Rumus & Senyawa)
          </button>
          <button class="tab-btn ${prefs.level === 'sma' ? 'active' : ''}" data-target-level="sma">
            🔬 Tingkat SMA (Geometri & VSEPR)
          </button>
          <button class="tab-btn ${prefs.level === 'kuliah' ? 'active' : ''}" data-target-level="kuliah">
            🌌 Tingkat Kuliah & Pengajar (MOT & Termo)
          </button>
        </div>

        <div id="level-tab-content-sd" class="level-content" ${prefs.level === 'sd' ? '' : 'hidden'}>
          <p>${mol.detailsSD || mol.summaryId}</p>
        </div>

        <div id="level-tab-content-smp" class="level-content" ${prefs.level === 'smp' ? '' : 'hidden'}>
          <p>${mol.detailsSMP || mol.summaryId}</p>
        </div>

        <div id="level-tab-content-sma" class="level-content" ${prefs.level === 'sma' ? '' : 'hidden'}>
          <p>${mol.detailsSMA || mol.summaryId}</p>
        </div>

        <div id="level-tab-content-kuliah" class="level-content" ${prefs.level === 'kuliah' ? '' : 'hidden'}>
          <p>${mol.detailsKuliah || mol.summaryId}</p>
        </div>
      </div>

      <!-- Safety & NFPA Diamond -->
      <div class="lab-card" style="margin-bottom: 30px;">
        <h3 style="font-size: 1.25rem; margin-bottom: 16px;">${ui.safetyTitle}</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 30px; align-items: center;">
          ${renderNFPADiamond(mol.safety)}
          <div style="flex: 1; min-width: 260px;">
            <h4 style="margin-bottom: 6px; color: var(--text-main);">Petunjuk Keselamatan:</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
              ${prefs.lang === 'en' ? (mol.safety?.noteEn || 'Standard precautions apply.') : (mol.safety?.noteId || 'Gunakan peralatan keselamatan kimia standar.')}
            </p>
          </div>
        </div>
      </div>

      <!-- Fun Facts Section -->
      ${mol.funFactsId && mol.funFactsId.length > 0 ? `
        <div class="lab-card" style="margin-bottom: 30px; background: linear-gradient(135deg, rgba(14,21,37,0.85) 0%, rgba(245,158,11,0.08) 100%);">
          <h3 style="font-size: 1.25rem; color: var(--electron-amber); margin-bottom: 16px;">
            ✨ ${ui.funFactsTitle}
          </h3>
          <ul style="padding-left: 20px; display: flex; flex-direction: column; gap: 10px;">
            ${(prefs.lang === 'en' ? mol.funFactsEn : mol.funFactsId).map(fact => `
              <li style="color: var(--text-main); font-size: 0.95rem; line-height: 1.6;">${fact}</li>
            `).join('')}
          </ul>
        </div>
      ` : ''}

      <!-- Interactive Student Notebook -->
      <div class="note-box-card">
        <h3 style="font-size: 1.25rem; margin-bottom: 8px;">${ui.takeNotes}</h3>
        <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 14px;">
          Catatanmu tersimpan otomatis di perangkatmu dan bisa dicetak untuk tugas sekolah atau portofolio belajar.
        </p>

        <textarea id="note-input" class="note-textarea" placeholder="${ui.notePlaceholder}">${savedNote}</textarea>
        <div class="note-status-row">
          <span id="note-status-indicator">Tersinkronisasi</span>
          <button id="btn-save-note-manual" class="btn-action" style="padding: 6px 14px;">
            ${getIcon('check', 16)} <span>${ui.saveNoteBtn}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  // 1. Initialize 3D Viewer
  const container = $('#profile-3d-container');
  if (container) {
    currentViewer = new MoleculeViewer3D(container, {
      autoRotate: true,
      showLabels: true,
      mode: 'ball-and-stick'
    });
    currentViewer.setData(mol.atoms3D, mol.bonds3D);

    cleanup(() => {
      if (currentViewer) currentViewer.destroy();
      stopSpeaking();
    });

    // Toolbar mode toggles
    $$('.btn-view-mode').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.btn-view-mode').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentViewer.options.mode = btn.dataset.mode;
        currentViewer.draw();
      });
    });

    const autoRotateBtn = $('#btn-toggle-autorotate');
    if (autoRotateBtn) {
      autoRotateBtn.addEventListener('click', () => {
        currentViewer.options.autoRotate = !currentViewer.options.autoRotate;
        autoRotateBtn.textContent = currentViewer.options.autoRotate ? 'Hentikan Putar' : 'Putar Otomatis';
      });
    }
  }

  // 2. Level Tabs Switching
  $$('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetLvl = btn.dataset.targetLevel;

      ['sd', 'smp', 'sma', 'kuliah'].forEach(lvl => {
        const el = $(`#level-tab-content-${lvl}`);
        if (el) el.hidden = (lvl !== targetLvl);
      });
    });
  });

  // 3. Bookmark Toggle
  const favBtn = $('#btn-toggle-fav');
  if (favBtn) {
    favBtn.addEventListener('click', () => {
      const added = toggleBookmark(mol);
      favBtn.innerHTML = `${getIcon(added ? 'bookmarkFill' : 'bookmark', 18)} <span>${added ? ui.savedMolecule : ui.saveMolecule}</span>`;
      toast(added ? 'Molekul ditambahkan ke koleksi tersimpan!' : 'Molekul dihapus dari koleksi.');
    });
  }

  // 4. Share / Copy Link
  const shareBtn = $('#btn-share-mol');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
      toast(ui.copied, 'success');
    });
  }

  // 5. Text-to-Speech (Audio Narration)
  const speakBtn = $('#btn-speak-mol');
  if (speakBtn) {
    if (!canSpeak()) {
      speakBtn.style.display = 'none';
    } else {
      speakBtn.addEventListener('click', () => {
        if (isSpeaking()) {
          stopSpeaking();
          speakBtn.classList.remove('speaking');
          speakBtn.querySelector('span').textContent = ui.listen;
        } else {
          const textToSpeak = `${name}. Rumus kimia: ${mol.formula}. ${prefs.lang === 'en' ? mol.summaryEn : mol.summaryId}. ${mol.detailsSD || ''}`;
          speak(textToSpeak, prefs.lang, () => {
            speakBtn.classList.remove('speaking');
            speakBtn.querySelector('span').textContent = ui.listen;
          });
          speakBtn.classList.add('speaking');
          speakBtn.querySelector('span').textContent = ui.stopListening;
        }
      });
    }
  }

  // 6. Notes Auto-saving
  const noteInput = $('#note-input');
  const noteStatus = $('#note-status-indicator');
  const manualSaveBtn = $('#btn-save-note-manual');

  if (noteInput) {
    let saveTimeout = null;
    const save = () => {
      setNote(`mol_${mol.id}`, noteInput.value, { title: name, category: 'molecule' });
      if (noteStatus) noteStatus.textContent = '✓ ' + ui.noteSaved;
    };

    noteInput.addEventListener('input', () => {
      if (noteStatus) noteStatus.textContent = 'Menyimpan…';
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(save, 500);
    });

    if (manualSaveBtn) {
      manualSaveBtn.addEventListener('click', () => {
        save();
        toast('Catatan berhasil disimpan!');
      });
    }
  }
}
