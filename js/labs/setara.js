// Balancing equations: graded practice with a live atom tally, and an automatic balancer for any equation.
import { esc } from '../core/dom.js';
import { S, pick, fmt } from '../core/prefs.js';
import { formulaHTML, balance, atomTally, parseEquation } from '../services/formula.js';
import { markLab } from '../core/userdata.js';
import { REACTIONS } from '../data/reactions.js';

const s = S({
  practice: ['Latihan', 'Practice'],
  level: ['Tingkat', 'Level'],
  easy: ['Mudah', 'Easy'],
  medium: ['Sedang', 'Medium'],
  hard: ['Sulit', 'Hard'],
  tally: ['Neraca atom', 'Atom tally'],
  left: ['Kiri', 'Left'],
  right: ['Kanan', 'Right'],
  check: ['Periksa', 'Check'],
  show: ['Lihat jawaban', 'Show answer'],
  next: ['Reaksi berikutnya', 'Next reaction'],
  balanced: ['Setara! Semua atom sama di kedua sisi.', 'Balanced! Every atom matches on both sides.'],
  simplest: [
    'Setara, tetapi koefisien bisa disederhanakan.',
    'Balanced, but the coefficients can be simplified.',
  ],
  notYet: [
    'Belum setara. Lihat baris neraca yang masih merah.',
    'Not balanced yet. Check the red rows of the tally.',
  ],
  own: ['Setarakan reaksimu sendiri', 'Balance your own equation'],
  ownHint: [
    'Tulis dengan tanda + dan -> atau =, misalnya: C3H8 + O2 -> CO2 + H2O',
    'Use + and -> or =, e.g. C3H8 + O2 -> CO2 + H2O',
  ],
  go: ['Setarakan', 'Balance'],
  result: ['Hasil', 'Result'],
  err_arrow: [
    'Tuliskan tanda panah (->) di antara reaktan dan produk.',
    'Put an arrow (->) between reactants and products.',
  ],
  err_element: ['Ada lambang unsur yang tidak dikenal: {x}.', 'Unknown element symbol: {x}.'],
  err_unbalanceable: [
    'Reaksi ini tidak dapat disetarakan. Periksa rumusnya.',
    'This equation cannot be balanced. Check the formulas.',
  ],
  err_ambiguous: [
    'Ada lebih dari satu cara menyetarakan; reaksi ini gabungan beberapa reaksi.',
    'There is more than one way to balance; it combines several reactions.',
  ],
  err_other: [
    'Rumus belum benar. Periksa huruf besar/kecil dan tanda kurung.',
    'A formula is not valid. Check capital letters and brackets.',
  ],
});

const gcdAll = list =>
  list.reduce((a, b) => {
    while (b) [a, b] = [b, a % b];
    return a;
  });

export function mount(host) {
  let level = 'easy';
  let i = 0;
  const list = () => REACTIONS.filter(r => r.lv === level);
  host.innerHTML = `<div class="lab-grid">
    <div class="card lab-wide">
      <h3 class="h-small">${esc(s.practice)}</h3>
      <div class="seg" role="group" aria-label="${esc(s.level)}">${['easy', 'medium', 'hard'].map(l => `<button type="button" class="seg-btn" data-level="${l}">${esc(s[l])}</button>`).join('')}</div>
      <div data-eq></div>
    </div>
    <div class="card lab-wide">
      <h3 class="h-small">${esc(s.own)}</h3>
      <form class="filters" data-own><div class="field field-grow"><label for="own-eq">${esc(s.ownHint)}</label><input id="own-eq" class="mono" value="C3H8 + O2 -> CO2 + H2O" autocomplete="off" /></div><button class="btn btn-primary" type="submit">${esc(s.go)}</button></form>
      <div data-own-out aria-live="polite"></div>
    </div>
  </div>`;

  function drawEq() {
    const rx = list()[i % list().length];
    for (const b of host.querySelectorAll('[data-level]'))
      b.setAttribute('aria-pressed', String(b.dataset.level === level));
    const input = (f, k) =>
      `<span class="eq-term"><label class="sr-only" for="c${k}">${esc(pick(['Koefisien', 'Coefficient']))} ${esc(f)}</label><input id="c${k}" class="coef-input" type="number" min="1" max="30" value="1" data-k="${k}" />${formulaHTML(f)}</span>`;
    const all = [...rx.r, ...rx.p];
    host.querySelector('[data-eq]').innerHTML = `<p class="eq-name">${esc(pick(rx.name))}</p>
      <p class="equation">${rx.r.map((f, k) => input(f, k)).join(' <span class="op">+</span> ')} <span class="op">→</span> ${rx.p.map((f, k) => input(f, k + rx.r.length)).join(' <span class="op">+</span> ')}</p>
      <div data-tally></div>
      <p class="btn-row"><button class="btn btn-primary" type="button" data-check>${esc(s.check)}</button><button class="btn" type="button" data-show>${esc(s.show)}</button><button class="btn" type="button" data-next>${esc(s.next)}</button></p>
      <p data-feedback aria-live="polite"></p>`;
    host.querySelector('[data-eq]').dataset.n = all.length;
    tally();
  }
  function coefs() {
    return [...host.querySelectorAll('.coef-input')].map(x => Math.max(1, Math.round(Number(x.value) || 1)));
  }
  function tally() {
    const rx = list()[i % list().length];
    const t = atomTally(rx.r, rx.p, coefs());
    host.querySelector('[data-tally]').innerHTML =
      `<table class="data-table tally"><caption>${esc(s.tally)}</caption><thead><tr><th scope="col"></th><th scope="col">${esc(s.left)}</th><th scope="col">${esc(s.right)}</th></tr></thead><tbody>${Object.entries(
        t
      )
        .map(
          ([el, [l, r]]) =>
            `<tr class="${l === r ? 'ok' : 'no'}"><th scope="row">${esc(el)}</th><td>${l}</td><td>${r}</td></tr>`
        )
        .join('')}</tbody></table>`;
    return t;
  }
  host.querySelector('[data-eq]').addEventListener('input', tally);
  host.querySelector('[data-eq]').addEventListener('click', e => {
    const rx = list()[i % list().length];
    const fb = host.querySelector('[data-feedback]');
    if (e.target.closest('[data-check]')) {
      const t = tally();
      const ok = Object.values(t).every(([l, r]) => l === r);
      const c = coefs();
      fb.textContent = ok ? (gcdAll(c) > 1 ? s.simplest : s.balanced) : s.notYet;
      fb.className = ok ? 'ok' : 'warn';
      if (ok) markLab('setara');
    }
    if (e.target.closest('[data-show]')) {
      const { coefficients } = balance(rx.r, rx.p);
      host.querySelectorAll('.coef-input').forEach((x, k) => (x.value = coefficients[k]));
      tally();
      fb.textContent = s.balanced;
    }
    if (e.target.closest('[data-next]')) {
      i++;
      drawEq();
    }
  });
  host.querySelector('.seg').addEventListener('click', e => {
    const b = e.target.closest('[data-level]');
    if (!b) return;
    level = b.dataset.level;
    i = 0;
    drawEq();
  });
  host.querySelector('[data-own]').addEventListener('submit', e => {
    e.preventDefault();
    const out = host.querySelector('[data-own-out]');
    const parsed = parseEquation(host.querySelector('#own-eq').value);
    const res = parsed.error ? parsed : balance(parsed.reactants, parsed.products);
    if (res.error) {
      const msg = s[`err_${res.error}`] || s.err_other;
      out.innerHTML = `<p class="warn">${esc(fmt(msg, { x: res.symbol || '' }))}</p>`;
      return;
    }
    const c = res.coefficients;
    const term = (f, k) => `${c[k] > 1 ? `<span class="coef">${c[k]}</span>` : ''}${formulaHTML(f)}`;
    out.innerHTML = `<p class="equation result">${parsed.reactants.map((f, k) => term(f, k)).join(' + ')} → ${parsed.products.map((f, k) => term(f, k + parsed.reactants.length)).join(' + ')}</p>`;
  });
  drawEq();
}
