// ChemTaxa · Curriculum & Learning Pathways (SD, SMP, SMA, Kuliah)
import { $, $$, toast } from '../core/dom.js';
import { getPrefs, setPref } from '../core/prefs.js';
import { getUi } from '../i18n/ui.js';
import { getIcon } from '../components/icons.js';
import { curriculum } from '../data/curriculum.js';
import { curatedMolecules } from '../data/curatedMolecules.js';
import { recordQuizResult } from '../core/userdata.js';

export function title() {
  return 'Materi & Kurikulum';
}

export async function render({ main, params }) {
  const prefs = getPrefs();
  const ui = getUi(prefs.lang);

  const activeLevel = params.get('lvl') || prefs.level || 'sma';
  const units = curriculum[activeLevel] || curriculum.sma;

  main.innerHTML = `
    <div class="container" style="padding-top: 40px; padding-bottom: 60px;">
      <div class="section-header">
        <div>
          <h2>${ui.navLearn}</h2>
          <p>Jalur kurikulum terstruktur bertahap dari pemahaman konsep dasar partikel hingga mekanika kuantum dan spektroskopi molekuler.</p>
        </div>
      </div>

      <!-- Level Track Pills Selector -->
      <div class="lab-nav-tabs" style="margin-bottom: 30px;">
        <button class="lab-tab-pill ${activeLevel === 'sd' ? 'active' : ''}" data-lvl-switch="sd">
          🌱 SD: Molekul di Sekitarku
        </button>
        <button class="lab-tab-pill ${activeLevel === 'smp' ? 'active' : ''}" data-lvl-switch="smp">
          ⚡ SMP: Atom & Senyawa Dasar
        </button>
        <button class="lab-tab-pill ${activeLevel === 'sma' ? 'active' : ''}" data-lvl-switch="sma">
          🔬 SMA: Geometri & Kimia Karbon
        </button>
        <button class="lab-tab-pill ${activeLevel === 'kuliah' ? 'active' : ''}" data-lvl-switch="kuliah">
          🌌 Kuliah: MOT & Stereokimia
        </button>
      </div>

      <!-- Curriculum Units List -->
      <div style="display: flex; flex-direction: column; gap: 30px;">
        ${units.map((unit, uIdx) => {
          const titleText = prefs.lang === 'en' ? unit.titleEn : unit.titleId;
          const summaryText = prefs.lang === 'en' ? unit.summaryEn : unit.summaryId;
          const contentText = prefs.lang === 'en' ? unit.contentEn : unit.contentId;

          return `
            <article class="lab-card" style="padding: 32px;" id="unit-${unit.id}">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <span class="badge badge-lvl" style="--badge-col: var(--neon-cyan)">Unit ${uIdx + 1}</span>
                <span style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">
                  Modul Pembelajaran ChemTaxa
                </span>
              </div>

              <h3 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 12px; color: var(--text-main);">
                ${titleText}
              </h3>
              <p style="font-size: 1.05rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 24px;">
                ${summaryText}
              </p>

              <!-- Educational Content Box -->
              <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 24px; margin-bottom: 24px; line-height: 1.7;">
                ${contentText}
              </div>

              <!-- Related 3D Molecules Showcase -->
              ${unit.relatedMolecules && unit.relatedMolecules.length > 0 ? `
                <div style="margin-bottom: 24px; background: rgba(0,242,254,0.05); border: 1px solid rgba(0,242,254,0.2); border-radius: var(--radius-md); padding: 16px 20px;">
                  <h4 style="font-size: 0.95rem; margin-bottom: 10px; color: var(--neon-cyan);">
                    🔍 Amati Contoh Molekul 3D Nyata di Modul Ini:
                  </h4>
                  <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    ${unit.relatedMolecules.map(mId => {
                      const m = curatedMolecules.find(item => item.id === mId);
                      if (!m) return '';
                      return `
                        <a href="#/molecule/${m.id}" class="btn-action" style="font-size: 0.85rem;">
                          ${m.formula} (${prefs.lang === 'en' ? m.nameEn : m.nameId}) →
                        </a>
                      `;
                    }).join('')}
                  </div>
                </div>
              ` : ''}

              <!-- Interactive Checkpoints -->
              ${unit.checkpoints && unit.checkpoints.length > 0 ? `
                <div style="border-top: 1px solid var(--border); padding-top: 20px;">
                  <h4 style="font-size: 1.15rem; margin-bottom: 16px; color: var(--electron-amber);">
                    🎯 Uji Pemahaman Cepat (Checkpoint):
                  </h4>
                  <div style="display: flex; flex-direction: column; gap: 16px;">
                    ${unit.checkpoints.map((cp, qIdx) => `
                      <div class="checkpoint-card" data-correct="${cp.correct}" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 18px;">
                        <p style="font-weight: 700; margin-bottom: 12px; color: var(--text-main);">
                          ${qIdx + 1}. ${cp.q}
                        </p>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                          ${cp.options.map((opt, optIdx) => `
                            <button class="btn-action btn-opt" data-opt-idx="${optIdx}" style="text-align: left; justify-content: flex-start; width: 100%;">
                              <span style="font-family: var(--font-mono); margin-right: 8px;">${['A', 'B', 'C', 'D'][optIdx]}.</span>
                              <span>${opt}</span>
                            </button>
                          `).join('')}
                        </div>
                        <div class="cp-feedback" style="display: none; margin-top: 12px; padding: 10px 14px; border-radius: var(--radius-sm); font-size: 0.9rem;"></div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </article>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Track Selector Switch
  $$('[data-lvl-switch]').forEach(btn => {
    btn.addEventListener('click', () => {
      const lvl = btn.dataset.lvlSwitch;
      setPref('level', lvl);
      location.hash = `#/learn?lvl=${lvl}`;
    });
  });

  // Checkpoints Interactive Logic
  $$('.checkpoint-card').forEach(card => {
    const correctIdx = parseInt(card.dataset.correct, 10);
    const feedbackBox = card.querySelector('.cp-feedback');
    const optButtons = card.querySelectorAll('.btn-opt');

    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const chosenIdx = parseInt(btn.dataset.optIdx, 10);
        optButtons.forEach(b => b.disabled = true);

        if (chosenIdx === correctIdx) {
          btn.style.background = 'rgba(16, 185, 129, 0.2)';
          btn.style.borderColor = 'var(--quantum-emerald)';
          btn.style.color = 'var(--quantum-emerald)';
          feedbackBox.innerHTML = '🎉 <strong>Jawaban Benar!</strong> Pemahamanmu luar biasa.';
          feedbackBox.style.background = 'rgba(16, 185, 129, 0.15)';
          feedbackBox.style.color = '#10b981';
          feedbackBox.style.display = 'block';
          recordQuizResult(10, 'Murid Teladan');
          toast('Jawaban tepat! +10 Poin Ilmu Kimia.', 'success');
        } else {
          btn.style.background = 'rgba(239, 68, 68, 0.2)';
          btn.style.borderColor = 'var(--crimson-fire)';
          btn.style.color = 'var(--crimson-fire)';
          const correctBtn = optButtons[correctIdx];
          if (correctBtn) {
            correctBtn.style.background = 'rgba(16, 185, 129, 0.2)';
            correctBtn.style.borderColor = 'var(--quantum-emerald)';
          }
          feedbackBox.innerHTML = '💡 <strong>Belum tepat.</strong> Pelajari kembali materi modul di atas untuk memperkuat konsepmu.';
          feedbackBox.style.background = 'rgba(239, 68, 68, 0.15)';
          feedbackBox.style.color = '#ef4444';
          feedbackBox.style.display = 'block';
        }
      });
    });
  });
}
