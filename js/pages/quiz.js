// ChemTaxa · Gamified Molecule Quiz Arena
import { $, $$, toast } from '../core/dom.js';
import { getPrefs } from '../core/prefs.js';
import { getUi } from '../i18n/ui.js';
import { getIcon } from '../components/icons.js';
import { recordQuizResult, getQuizStats } from '../core/userdata.js';

export function title() {
  return 'Kuis Molekul';
}

const quizBank = {
  sd: [
    {
      q: 'Molekul apakah yang tersusun dari 2 atom Hidrogen dan 1 atom Oksigen?',
      options: ['Air (H₂O)', 'Garam (NaCl)', 'Gula (Glukosa)', 'Kapur (CaCO₃)'],
      correct: 0,
      exp: 'Tepat sekali! Air memiliki rumus molekul H₂O (2 atom H dan 1 atom O).'
    },
    {
      q: 'Gas apa yang kita hirup dari udara segar saat bernapas?',
      options: ['Oksigen (O₂)', 'Karbon Dioksida (CO₂)', 'Amonia (NH₃)', 'Metana (CH₄)'],
      correct: 0,
      exp: 'Benar! Paru-paru kita menyerap gas oksigen (O₂) untuk memberi energi pada seluruh tubuh.'
    },
    {
      q: 'Es batu yang mencair menjadi air minum adalah contoh perubahan...',
      options: ['Wujud Zat (Fisika)', 'Warna Benda', 'Rasa Makanan', 'Molekul Meledak'],
      correct: 0,
      exp: 'Hebat! Es mencair adalah perubahan wujud zat dari padat menjadi cair, molekulnya tetaplah H₂O!'
    },
    {
      q: 'Bumbu dapur berwarna putih asin yang tersusun dari logam Natrium dan gas Klorin adalah...',
      options: ['Garam Dapur (NaCl)', 'Gula Pasir', 'Merica', 'Tepung'],
      correct: 0,
      exp: 'Tepat! Natrium Klorida (NaCl) adalah nama ilmiah dari garam dapur.'
    }
  ],
  smp: [
    {
      q: 'Ikatan kimia yang terbentuk akibat serah terima (transfer) elektron disebut ikatan...',
      options: ['Ikatan Ionik', 'Ikatan Kovalen Nonpolar', 'Ikatan Hidrogen', 'Ikatan Logam'],
      correct: 0,
      exp: 'Benar! Ikatan ionik terjadi saat atom logam melepas elektron (kation) ke atom nonlogam (anion).'
    },
    {
      q: 'Larutan dengan nilai pH = 2.5 memiliki sifat...',
      options: ['Asam Kuat', 'Basa Kuat', 'Netral', 'Garam Elektrolit Lemah'],
      correct: 0,
      exp: 'Tepat! Larutan dengan pH < 7 bersifat asam, dan pH 2.5 tergolong asam kuat (mirip jus lemon/asam cuka).'
    },
    {
      q: 'Berapakah massa molekul relatif (Mr) dari molekul gas metana (CH₄)? (Ar C=12, H=1)',
      options: ['16 g/mol', '12 g/mol', '20 g/mol', '14 g/mol'],
      correct: 0,
      exp: 'Benar! Mr CH₄ = (1 × 12) + (4 × 1) = 16 g/mol.'
    },
    {
      q: 'Alkaloid alami yang ditemukan dalam kopi dan teh yang bekerja menstimulasi sistem saraf adalah...',
      options: ['Kafein', 'Etanol', 'Aspirin', 'Glukosa'],
      correct: 0,
      exp: 'Tepat! Kafein (C₈H₁₀N₄O₂) adalah stimulan saraf alami terpopuler di dunia.'
    }
  ],
  sma: [
    {
      q: 'Berdasarkan teori VSEPR, bentuk geometri molekul air (H₂O) adalah...',
      options: ['Bengkok / Bent (V-shape)', 'Linear', 'Tetrahedral', 'Trigonal Planar'],
      correct: 0,
      exp: 'Tepat! Rumus domain AX₂E₂ memiliki 2 PEI dan 2 PEB sehingga bentuknya bengkok dengan sudut 104.5°.'
    },
    {
      q: 'Senyawa organik berikut yang memiliki gugus fungsi ester (-COO-) adalah...',
      options: ['Aspirin (Asam Asetilsalisilat)', 'Etanol', 'Metana', 'Amonia'],
      correct: 0,
      exp: 'Benar! Aspirin memiliki gugus asetoksi ester (-OCOCH₃) dan asam karboksilat (-COOH).'
    },
    {
      q: 'Mengapa benzena (C₆H₆) lebih mudah mengalami reaksi substitusi daripada reaksi adisi?',
      options: [
        'Karena memiliki kestabilan resonansi aromatik elektron-π yang tinggi',
        'Karena tidak memiliki ikatan rangkap sama sekali',
        'Karena berwujud cairan pada suhu ruang',
        'Karena bersifat sangat asam'
      ],
      correct: 0,
      exp: 'Tepat! Delokalisasi 6 elektron-π cincin benzena memberikan energi resonansi tinggi (~150 kJ/mol).'
    }
  ],
  kuliah: [
    {
      q: 'Berdasarkan Teori Orbital Molekul (MOT), orde ikatan (bond order) pada molekul O₂ adalah...',
      options: ['2', '1', '2.5', '3'],
      correct: 0,
      exp: 'Tepat! Orde ikatan = 1/2 (10 elektron ikatan - 6 elektron anti-ikatan) = 2. Paramagnetik dengan 2 elektron di π*2p.'
    },
    {
      q: 'Dua molekul stereoisomer yang merupakan bayangan cermin yang tidak dapat saling dihimpitkan dinamakan...',
      options: ['Enantiomer', 'Diastereomer', 'Meso', 'Konformer'],
      correct: 0,
      exp: 'Benar! Enantiomer adalah pasangan bayangan cermin non-superimposable dengan sifat optik berlawanan.'
    }
  ]
};

export async function render({ main }) {
  const prefs = getPrefs();
  const ui = getUi(prefs.lang);

  const initialLvl = prefs.level || 'sma';
  let activeLvl = initialLvl;
  let questions = quizBank[activeLvl] || quizBank.sma;
  let currentQIdx = 0;
  let sessionScore = 0;

  function renderQuizUI() {
    const stats = getQuizStats();
    const q = questions[currentQIdx];

    if (!q) {
      // Quiz Finished Summary
      main.innerHTML = `
        <div class="container" style="padding: 60px 20px; max-width: 650px; text-align: center;">
          <div class="lab-card" style="padding: 40px;">
            <div style="font-size: 4rem; margin-bottom: 12px;">🏆</div>
            <h2 style="font-size: 2rem; margin-bottom: 8px;">Kuis Selesai!</h2>
            <p style="color: var(--text-muted); margin-bottom: 24px;">
              Selamat! Kamu telah menyelesaikan tantangan kimia jenjang ${activeLvl.toUpperCase()}.
            </p>

            <div class="prop-card" style="margin-bottom: 24px;">
              <div class="prop-label">${ui.quizScore}</div>
              <div class="prop-value" style="font-size: 2.8rem; color: var(--neon-cyan);">
                +${sessionScore} Poin
              </div>
            </div>

            <div style="display: flex; gap: 12px; justify-content: center;">
              <button id="btn-quiz-retry" class="btn-search">Ulangi Kuis</button>
              <a href="#/explore" class="btn-action">Jelajahi Molekul Lain</a>
            </div>
          </div>
        </div>
      `;

      $('#btn-quiz-retry')?.addEventListener('click', () => {
        currentQIdx = 0;
        sessionScore = 0;
        renderQuizUI();
      });
      return;
    }

    main.innerHTML = `
      <div class="container" style="padding-top: 40px; padding-bottom: 60px; max-width: 760px;">
        <div class="section-header">
          <div>
            <h2>${ui.quizTitle}</h2>
            <p>Uji ketajaman pemahaman struktur molekul dan ikatan kimia semesta.</p>
          </div>
        </div>

        <!-- Level Selector for Quiz -->
        <div class="lab-nav-tabs" style="margin-bottom: 24px;">
          ${['sd', 'smp', 'sma', 'kuliah'].map(lvl => `
            <button class="lab-tab-pill ${activeLvl === lvl ? 'active' : ''}" data-quiz-lvl="${lvl}">
              ${lvl.toUpperCase()}
            </button>
          `).join('')}
        </div>

        <!-- Quiz Stage Card -->
        <div class="lab-card" style="padding: 32px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <span class="badge badge-lvl" style="--badge-col: var(--neon-cyan)">
              Soal ${currentQIdx + 1} dari ${questions.length}
            </span>
            <span style="font-size: 0.9rem; font-weight: 700; color: var(--electron-amber);">
              Skor Sesi: +${sessionScore}
            </span>
          </div>

          <h3 style="font-size: 1.4rem; font-weight: 700; margin-bottom: 24px; line-height: 1.4;">
            ${q.q}
          </h3>

          <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
            ${q.options.map((opt, i) => `
              <button class="btn-action btn-quiz-opt" data-opt-idx="${i}" style="padding: 14px 18px; text-align: left; justify-content: flex-start; font-size: 1rem;">
                <span style="font-family: var(--font-mono); font-weight: 700; margin-right: 12px; color: var(--neon-cyan);">${['A', 'B', 'C', 'D'][i]}.</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>

          <div id="quiz-feedback-box" style="display: none; padding: 16px 20px; border-radius: var(--radius-sm); margin-bottom: 20px; font-size: 0.95rem; line-height: 1.6;"></div>

          <button id="btn-next-question" class="btn-search" style="display: none; width: 100%; justify-content: center; padding: 14px;">
            <span>${ui.quizNext}</span> →
          </button>
        </div>
      </div>
    `;

    // Bind Level Switches
    $$('[data-quiz-lvl]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeLvl = btn.dataset.quizLvl;
        questions = quizBank[activeLvl] || quizBank.sma;
        currentQIdx = 0;
        sessionScore = 0;
        renderQuizUI();
      });
    });

    // Option Clicks
    const optButtons = $$('.btn-quiz-opt');
    const feedbackBox = $('#quiz-feedback-box');
    const nextBtn = $('#btn-next-question');

    optButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const chosen = parseInt(btn.dataset.optIdx, 10);
        optButtons.forEach(b => b.disabled = true);

        if (chosen === q.correct) {
          btn.style.background = 'rgba(16, 185, 129, 0.25)';
          btn.style.borderColor = 'var(--quantum-emerald)';
          btn.style.color = 'var(--quantum-emerald)';
          sessionScore += 25;
          recordQuizResult(25, `Juara Kimia ${activeLvl.toUpperCase()}`);
          feedbackBox.innerHTML = `🎉 <strong>Benar!</strong> ${q.exp}`;
          feedbackBox.style.background = 'rgba(16, 185, 129, 0.15)';
          feedbackBox.style.color = '#10b981';
          feedbackBox.style.border = '1px solid var(--quantum-emerald)';
          feedbackBox.style.display = 'block';
          toast('Jawaban tepat! +25 Poin', 'success');
        } else {
          btn.style.background = 'rgba(239, 68, 68, 0.25)';
          btn.style.borderColor = 'var(--crimson-fire)';
          btn.style.color = 'var(--crimson-fire)';
          const correctBtn = optButtons[q.correct];
          if (correctBtn) {
            correctBtn.style.background = 'rgba(16, 185, 129, 0.25)';
            correctBtn.style.borderColor = 'var(--quantum-emerald)';
          }
          feedbackBox.innerHTML = `💡 <strong>Kurang tepat.</strong> ${q.exp}`;
          feedbackBox.style.background = 'rgba(239, 68, 68, 0.15)';
          feedbackBox.style.color = '#ef4444';
          feedbackBox.style.border = '1px solid var(--crimson-fire)';
          feedbackBox.style.display = 'block';
        }

        nextBtn.style.display = 'inline-flex';
      });
    });

    nextBtn.addEventListener('click', () => {
      currentQIdx++;
      renderQuizUI();
    });
  }

  renderQuizUI();
}
