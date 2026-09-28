// Quiz runner: one question at a time with instant feedback and explanations.
// Questions: { q, options: [..], answer: index, explain } where every text is a string or [id, en] pair.
import { esc, shuffle } from '../core/dom.js';
import { pick, S } from '../core/prefs.js';
import { recordQuiz } from '../core/userdata.js';
import { icon } from './icons.js';

const s = S({
  question: ['Soal {n} dari {total}', 'Question {n} of {total}'],
  check: ['Periksa jawaban', 'Check answer'],
  next: ['Soal berikutnya', 'Next question'],
  finish: ['Lihat hasil', 'See results'],
  correct: ['Benar!', 'Correct!'],
  wrong: ['Belum tepat.', 'Not quite.'],
  answerWas: ['Jawaban yang benar: {a}', 'The right answer: {a}'],
  choose: ['Pilih satu jawaban dulu.', 'Choose an answer first.'],
  result: ['Skormu {score} dari {total}', 'You scored {score} of {total}'],
  best: ['Skor terbaik: {best}/{total}', 'Best score: {best}/{total}'],
  again: ['Ulangi kuis', 'Try again'],
  perfect: ['Sempurna! Kamu menguasai materi ini.', 'Perfect! You have mastered this.'],
  good: [
    'Bagus! Baca lagi bagian yang salah, lalu coba lagi.',
    'Good! Review the ones you missed, then try again.',
  ],
  keep: [
    'Terus berlatih. Baca materinya dulu, lalu ulangi.',
    'Keep practising. Read the lesson, then try again.',
  ],
  review: ['Pembahasan', 'Review'],
});

const fmt = (t, v) => t.replace(/\{(\w+)\}/g, (_, k) => v[k]);

export function mountQuiz(host, { id, title, questions, shuffleOptions = true, onDone }) {
  const items = questions.map(q => {
    const order = shuffleOptions ? shuffle(q.options.map((_, i) => i)) : q.options.map((_, i) => i);
    return { ...q, order };
  });
  let i = 0;
  let score = 0;
  const log = [];

  function show() {
    const q = items[i];
    host.innerHTML = `<form class="quiz" novalidate>
      <p class="quiz-progress">${esc(fmt(s.question, { n: i + 1, total: items.length }))}</p>
      <progress class="quiz-bar" max="${items.length}" value="${i}" aria-hidden="true"></progress>
      <fieldset>
        <legend class="quiz-q">${esc(pick(q.q))}</legend>
        ${q.svg ? `<div class="quiz-img">${q.svg}</div>` : ''}
        ${q.image ? `<img class="quiz-img" src="${esc(q.image)}" alt="${esc(pick(q.imageAlt || ['Gambar soal', 'Question image']))}" width="260" height="200" />` : ''}
        <div class="quiz-options">
          ${q.order
            .map(
              (o, k) =>
                `<label class="quiz-option"><input type="radio" name="answer" value="${o}" ${k === 0 ? '' : ''}/><span>${esc(pick(q.options[o]))}</span></label>`
            )
            .join('')}
        </div>
      </fieldset>
      <div class="quiz-feedback" aria-live="polite"></div>
      <div class="quiz-actions"><button class="btn btn-primary" type="submit">${esc(s.check)}</button></div>
    </form>`;
    const form = host.querySelector('form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (form.dataset.checked) return next();
      const chosen = form.querySelector('input[name="answer"]:checked');
      const fb = form.querySelector('.quiz-feedback');
      if (!chosen) {
        fb.innerHTML = `<p class="warn">${esc(s.choose)}</p>`;
        return;
      }
      const ok = Number(chosen.value) === q.answer;
      if (ok) score++;
      log.push({ q, chosen: Number(chosen.value), ok });
      form.dataset.checked = '1';
      for (const input of form.querySelectorAll('input')) {
        input.disabled = true;
        const label = input.closest('label');
        if (Number(input.value) === q.answer) label.classList.add('is-right');
        else if (input === chosen) label.classList.add('is-wrong');
      }
      fb.innerHTML = `<div class="feedback ${ok ? 'ok' : 'no'}">
        ${icon(ok ? 'check' : 'x', { size: 20 })}
        <div><strong>${esc(ok ? s.correct : s.wrong)}</strong>
        ${ok ? '' : `<p>${esc(fmt(s.answerWas, { a: pick(q.options[q.answer]) }))}</p>`}
        ${q.explain ? `<p>${esc(pick(q.explain))}</p>` : ''}</div></div>`;
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = i + 1 < items.length ? s.next : s.finish;
      btn.focus();
    });
  }

  function next() {
    i++;
    if (i < items.length) return show();
    const saved = id ? recordQuiz(id, score, items.length, title) : null;
    const ratio = score / items.length;
    host.innerHTML = `<div class="quiz-result" tabindex="-1">
      <p class="quiz-score">${esc(fmt(s.result, { score, total: items.length }))}</p>
      <p class="stars" aria-hidden="true">${'★'.repeat(Math.round(ratio * 5))}${'☆'.repeat(5 - Math.round(ratio * 5))}</p>
      <p>${esc(ratio === 1 ? s.perfect : ratio >= 0.6 ? s.good : s.keep)}</p>
      ${saved ? `<p class="muted">${esc(fmt(s.best, { best: saved.best, total: saved.total }))}</p>` : ''}
      <button class="btn btn-primary" type="button" data-again>${esc(s.again)}</button>
      <details class="quiz-review"><summary>${esc(s.review)}</summary><ol>${log
        .map(
          l =>
            `<li class="${l.ok ? 'ok' : 'no'}"><p><strong>${esc(pick(l.q.q))}</strong></p><p>${icon(l.ok ? 'check' : 'x', { size: 16 })} ${esc(
              pick(l.q.options[l.q.answer])
            )}</p>${l.q.explain ? `<p class="muted">${esc(pick(l.q.explain))}</p>` : ''}</li>`
        )
        .join('')}</ol></details>
    </div>`;
    host.querySelector('.quiz-result').focus();
    host
      .querySelector('[data-again]')
      .addEventListener('click', () => mountQuiz(host, { id, title, questions, shuffleOptions, onDone }));
    onDone?.(score, items.length);
  }

  show();
}
