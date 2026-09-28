// Lessons: the topic list for each level and a topic page with text, activities, quiz and teacher notes.
import { $, $$, esc } from '../core/dom.js';
import { S, pick, fmt, getPrefs, isTeacher } from '../core/prefs.js';
import { replaceQuery } from '../core/router.js';
import { levelName } from '../i18n/ui.js';
import { icon } from '../components/icons.js';
import { pageHead, breadcrumbs, levelBadge } from '../components/common.js';
import { moleculeCard } from '../components/cards.js';
import { richText, plainText } from '../components/richtext.js';
import { mountQuiz } from '../components/quiz.js';
import { TOPICS, findTopic, bodyLevel, quizFor, PHASES } from '../data/topics/index.js';
import { PATHS, findLab } from '../data/curriculum.js';
import { getMolecule } from '../data/curatedMolecules.js';
import { moleculeIndex } from '../services/data.js';
import { speak, stopSpeaking, canSpeak } from '../services/speech.js';
import { lessonsRead, markLesson, quizResults } from '../core/userdata.js';

const s = S({
  title: ['Materi belajar', 'Lessons'],
  lead: [
    'Empat belas topik kimia mengikuti Kurikulum Merdeka, masing-masing ditulis untuk SD, SMP, SMA, dan kuliah. Setiap topik punya kegiatan, kuis, dan catatan guru.',
    'Fourteen chemistry topics following Indonesia’s Kurikulum Merdeka, each written for primary, junior high, senior high and university, with activities, quizzes and teacher notes.',
  ],
  levelFor: ['Tampilkan untuk jenjang', 'Show for level'],
  read: ['Sudah dibaca', 'Read'],
  best: ['Kuis terbaik {best}/{total}', 'Best quiz {best}/{total}'],
  notFound: ['Materi tidak ditemukan.', 'Lesson not found.'],
  version: ['Versi materi', 'Lesson version'],
  points: ['Poin penting', 'Key points'],
  activity: ['Kegiatan', 'Activity'],
  molecules: ['Molekul dalam materi ini', 'Molecules in this lesson'],
  labs: ['Coba di laboratorium', 'Try it in the lab'],
  quiz: ['Uji pemahaman', 'Check your understanding'],
  markRead: ['Tandai sudah dibaca', 'Mark as read'],
  marked: ['Sudah dibaca ✓', 'Read ✓'],
  teacher: ['Catatan guru', 'Teacher notes'],
  cp: ['Capaian pembelajaran', 'Learning outcomes'],
  goals: ['Tujuan pembelajaran', 'Learning objectives'],
  duration: ['Alokasi waktu', 'Time'],
  steps: ['Langkah pembelajaran', 'Lesson steps'],
  misconceptions: ['Miskonsepsi yang sering muncul', 'Common misconceptions'],
  assessment: ['Asesmen', 'Assessment'],
  printPlan: ['Cetak modul ajar', 'Print lesson plan'],
  prevTopic: ['Materi sebelumnya', 'Previous lesson'],
  nextTopic: ['Materi berikutnya', 'Next lesson'],
  phase: ['Fase Kurikulum Merdeka', 'Curriculum phase'],
});

export const title = route => (route.id ? pick(findTopic(route.id)?.title || ['Materi', 'Lesson']) : s.title);

export async function render({ id, main, params, cleanup }) {
  if (!id) return renderList(main, params);
  const t = findTopic(id);
  if (!t) {
    main.innerHTML = `<section class="container page-state"><h1>${esc(s.notFound)}</h1><a class="btn" href="#/learn">${esc(s.title)}</a></section>`;
    return;
  }
  const idx = await moleculeIndex();
  let lv = params.get('lv') && t.body[params.get('lv')] ? params.get('lv') : bodyLevel(t, getPrefs().level);
  const order = TOPICS.map(x => x.id);
  const prev = findTopic(order[order.indexOf(t.id) - 1]);
  const next = findTopic(order[order.indexOf(t.id) + 1]);
  const done = lessonsRead()[t.id];

  const levels = ['sd', 'smp', 'sma', 'kuliah'].filter(l => t.body[l]);
  main.innerHTML = `<article class="container lesson">
    ${breadcrumbs([
      [s.title, '#/learn'],
      [pick(t.title), ''],
    ])}
    <header class="page-head">
      <p class="eyebrow">${icon(t.icon, { size: 18 })} ${esc(s.title)}</p>
      <h1>${esc(pick(t.title))}</h1>
      <p class="lead">${esc(pick(t.summary))}</p>
      <div class="lesson-tools">
        <div class="seg" role="group" aria-label="${esc(s.version)}">
          ${levels.map(l => `<button type="button" class="seg-btn" data-lv="${l}" aria-pressed="${l === lv}">${esc(levelName(l))}</button>`).join('')}
        </div>
        ${canSpeak() ? `<button class="btn" type="button" data-speak aria-pressed="false">${icon('speaker', { size: 18 })}<span>${esc(pick(['Dengarkan', 'Listen']))}</span></button>` : ''}
        <button class="btn" type="button" data-print>${icon('print', { size: 18 })}<span>${esc(pick(['Cetak', 'Print']))}</span></button>
        <button class="btn ${done ? 'is-done' : ''}" type="button" data-read>${icon('check', { size: 18 })}<span>${esc(done ? s.marked : s.markRead)}</span></button>
      </div>
      <p class="muted small" data-phase>${esc(s.phase)}: ${esc(pick(PHASES[lv]))}</p>
    </header>
    <div class="lesson-body prose" data-body>${richText(pick(t.body[lv]))}</div>
    <div class="grid grid-2">
      <section class="card"><h2 class="h-small">${icon('star', { size: 18 })} ${esc(s.points)}</h2><ul>${t.points.map(p => `<li>${esc(pick(p))}</li>`).join('')}</ul></section>
      <section class="card" data-activity>${activity(t, lv)}</section>
    </div>
    ${
      t.molecules?.length
        ? `<section><h2>${esc(s.molecules)}</h2><div class="grid grid-cards">${t.molecules
            .map(getMolecule)
            .filter(Boolean)
            .map(m => moleculeCard(m, idx.get(m.id)))
            .join('')}</div></section>`
        : ''
    }
    ${
      t.labs?.length
        ? `<section><h2>${esc(s.labs)}</h2><div class="grid grid-4">${t.labs
            .map(findLab)
            .filter(Boolean)
            .map(
              l =>
                `<a class="card lab-card" href="#/lab/${l.id}"><span class="topic-icon">${icon(l.icon, { size: 24 })}</span><span class="card-title">${esc(pick(l.title))}</span><span class="card-text">${esc(pick(l.summary))}</span></a>`
            )
            .join('')}</div></section>`
        : ''
    }
    <section class="card quiz-card" aria-labelledby="quiz-title"><h2 id="quiz-title">${icon('quiz', { size: 20 })} ${esc(s.quiz)}</h2><div data-quiz></div></section>
    ${isTeacher() ? teacherNotes(t) : ''}
    <nav class="pager" aria-label="${esc(pick(['Materi lain', 'Other lessons']))}">
      ${prev ? `<a class="btn" href="#/learn/${prev.id}">← ${esc(pick(prev.title))}</a>` : '<span></span>'}
      ${next ? `<a class="btn" href="#/learn/${next.id}">${esc(pick(next.title))} →</a>` : ''}
    </nav>
  </article>`;

  const quizBox = $('[data-quiz]', main);
  const startQuiz = () =>
    mountQuiz(quizBox, {
      id: `topic-${t.id}`,
      title: pick(t.title),
      questions: quizFor(t, lv),
      onDone: () => markLesson(t.id),
    });
  startQuiz();

  main.querySelector('.lesson-tools').addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.lv) {
      lv = b.dataset.lv;
      for (const x of $$('[data-lv]', main)) x.setAttribute('aria-pressed', String(x.dataset.lv === lv));
      $('[data-body]', main).innerHTML = richText(pick(t.body[lv]));
      $('[data-activity]', main).innerHTML = activity(t, lv);
      $('[data-phase]', main).textContent = `${s.phase}: ${pick(PHASES[lv])}`;
      replaceQuery({ lv });
      startQuiz();
    }
    if (b.hasAttribute('data-print')) window.print();
    if (b.hasAttribute('data-read')) {
      markLesson(t.id);
      b.classList.add('is-done');
      b.querySelector('span').textContent = s.marked;
    }
    if (b.hasAttribute('data-speak')) {
      if (b.getAttribute('aria-pressed') === 'true') return stopSpeaking();
      b.setAttribute('aria-pressed', 'true');
      speak(`${pick(t.title)}. ${plainText(pick(t.body[lv]))}`, () =>
        b.setAttribute('aria-pressed', 'false')
      );
    }
  });
  cleanup(stopSpeaking);
}

function activity(t, lv) {
  const a = t.activity?.[lv] || Object.values(t.activity || {})[0];
  return a
    ? `<h2 class="h-small">${icon('flask', { size: 18 })} ${esc(s.activity)}</h2><p>${esc(pick(a))}</p>`
    : '';
}

function teacherNotes(t) {
  const n = t.teacher;
  if (!n) return '';
  return `<section class="card teacher-notes" aria-labelledby="tn-title">
    <h2 id="tn-title">${icon('teacher', { size: 20 })} ${esc(s.teacher)}</h2>
    <dl>
      <dt>${esc(s.cp)}</dt><dd>${esc(pick(n.cp))}</dd>
      <dt>${esc(s.goals)}</dt><dd><ol>${n.goals.map(g => `<li>${esc(pick(g))}</li>`).join('')}</ol></dd>
      <dt>${esc(s.duration)}</dt><dd>${esc(pick(n.duration))}</dd>
      <dt>${esc(s.steps)}</dt><dd><ol>${n.steps.map(g => `<li>${esc(pick(g))}</li>`).join('')}</ol></dd>
      <dt>${esc(s.misconceptions)}</dt><dd><ul>${n.misconceptions.map(g => `<li>${esc(pick(g))}</li>`).join('')}</ul></dd>
      <dt>${esc(s.assessment)}</dt><dd>${esc(pick(n.assessment))}</dd>
    </dl>
    <a class="btn" href="#/teacher?topic=${t.id}">${icon('print', { size: 16 })} ${esc(s.printPlan)}</a>
  </section>`;
}

function renderList(main, params) {
  const pref = getPrefs().level === 'guru' ? 'sma' : getPrefs().level;
  let lv = ['sd', 'smp', 'sma', 'kuliah'].includes(params.get('lv')) ? params.get('lv') : pref;
  const read = lessonsRead();
  const quiz = quizResults();
  const draw = () => {
    const order = PATHS[lv] || PATHS.smp;
    const list = [...order.map(findTopic), ...TOPICS.filter(t => !order.includes(t.id))].filter(
      t => t && t.body[lv]
    );
    main.querySelector('[data-topics]').innerHTML = list
      .map((t, i) => {
        const q = quiz[`topic-${t.id}`];
        return `<a class="card topic-card" href="#/learn/${t.id}?lv=${lv}">
          <span class="topic-num">${i + 1}</span>
          <span class="topic-icon">${icon(t.icon, { size: 24 })}</span>
          <span class="card-title">${esc(pick(t.title))}</span>
          <span class="card-text">${esc(pick(t.summary))}</span>
          <span class="topic-meta">${t.levels.map(levelBadge).join(' ')}</span>
          <span class="topic-meta">${read[t.id] ? `${icon('check', { size: 14 })} ${esc(s.read)}` : ''}${q ? ` · ${esc(fmt(s.best, q))}` : ''}</span>
          <span class="card-next">${esc(pick(read[t.id] ? ['Baca kembali', 'Read again'] : ['Mulai belajar', 'Start learning']))} ${icon('arrowRight', { size: 16 })}</span>
        </a>`;
      })
      .join('');
  };
  main.innerHTML = `<div class="container">
    ${pageHead({ title: esc(s.title), lead: esc(s.lead) })}
    <div class="seg" role="group" aria-label="${esc(s.levelFor)}">
      ${['sd', 'smp', 'sma', 'kuliah'].map(l => `<button type="button" class="seg-btn" data-lv="${l}" aria-pressed="${l === lv}">${esc(levelName(l))}</button>`).join('')}
    </div>
    <p class="muted small" data-phase>${esc(pick(PHASES[lv]))}</p>
    <div class="grid grid-3" data-topics></div>
  </div>`;
  main.querySelector('.seg').addEventListener('click', e => {
    const b = e.target.closest('[data-lv]');
    if (!b) return;
    lv = b.dataset.lv;
    for (const x of $$('[data-lv]', main)) x.setAttribute('aria-pressed', String(x.dataset.lv === lv));
    main.querySelector('[data-phase]').textContent = pick(PHASES[lv]);
    replaceQuery({ lv });
    draw();
  });
  draw();
}
