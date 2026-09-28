// Flame tests: each metal ion gives a characteristic colour from electrons falling back to lower levels.
import { esc, shuffle } from '../core/dom.js';
import { S, pick, fmt } from '../core/prefs.js';

const s = S({
  choose: ['Pilih garam logam', 'Choose a metal salt'],
  colour: ['Warna nyala', 'Flame colour'],
  line: ['Garis spektrum terkuat: {nm} nm', 'Strongest spectral line: {nm} nm'],
  why: [
    'Panas nyala menaikkan elektron ke tingkat energi lebih tinggi. Saat kembali turun, elektron melepaskan energi sebagai cahaya dengan panjang gelombang tertentu. Setiap unsur punya "sidik jari" warna sendiri.',
    'The flame’s heat lifts electrons to higher energy levels. As they fall back, they release energy as light of specific wavelengths. Each element has its own colour fingerprint.',
  ],
  uses: [
    'Kembang api memakai garam-garam ini: stronsium untuk merah, barium untuk hijau, natrium untuk kuning, tembaga untuk biru.',
    'Fireworks use these salts: strontium for red, barium for green, sodium for yellow and copper for blue.',
  ],
  game: ['Tebak logamnya!', 'Guess the metal!'],
  gameQ: ['Nyala di bawah ini berasal dari logam apa?', 'Which metal gives the flame below?'],
  right: ['Benar!', 'Correct!'],
  wrong: ['Belum tepat, itu {name}.', 'Not quite — it was {name}.'],
  again: ['Soal lain', 'Another one'],
  spectrum: ['Spektrum cahaya tampak', 'Visible spectrum'],
});

const METALS = [
  {
    el: 'Li',
    ion: 'Li⁺',
    name: ['Litium', 'Lithium'],
    color: '#e8364a',
    nm: 671,
    word: ['merah tua', 'crimson'],
  },
  {
    el: 'Na',
    ion: 'Na⁺',
    name: ['Natrium', 'Sodium'],
    color: '#ffb300',
    nm: 589,
    word: ['kuning jingga terang', 'intense yellow-orange'],
  },
  {
    el: 'K',
    ion: 'K⁺',
    name: ['Kalium', 'Potassium'],
    color: '#b388ff',
    nm: 766,
    word: ['ungu muda (lila)', 'lilac'],
  },
  {
    el: 'Ca',
    ion: 'Ca²⁺',
    name: ['Kalsium', 'Calcium'],
    color: '#ff6f3c',
    nm: 622,
    word: ['merah bata', 'brick red'],
  },
  {
    el: 'Sr',
    ion: 'Sr²⁺',
    name: ['Stronsium', 'Strontium'],
    color: '#ff1744',
    nm: 650,
    word: ['merah terang', 'bright red'],
  },
  {
    el: 'Ba',
    ion: 'Ba²⁺',
    name: ['Barium', 'Barium'],
    color: '#9ccc3c',
    nm: 524,
    word: ['hijau apel', 'apple green'],
  },
  {
    el: 'Cu',
    ion: 'Cu²⁺',
    name: ['Tembaga', 'Copper'],
    color: '#26c6a0',
    nm: 510,
    word: ['hijau kebiruan', 'blue-green'],
  },
  {
    el: 'B',
    ion: 'B (asam borat)',
    name: ['Boron', 'Boron'],
    color: '#66bb6a',
    nm: 548,
    word: ['hijau', 'green'],
  },
];

/** Animated flame in the given colour (pure CSS). */
const flame = color =>
  `<div class="flame" style="--flame:${color}" aria-hidden="true"><span></span><span></span><span></span></div>`;

export function mount(host) {
  let current = METALS[1];
  host.innerHTML = `<div class="lab-grid">
    <div class="card lab-controls">
      <fieldset><legend>${esc(s.choose)}</legend><div class="chip-grid">${METALS.map(
        m =>
          `<button type="button" class="chip chip-lg" data-el="${m.el}" aria-pressed="${m === current}">${esc(m.ion)} · ${esc(pick(m.name))}</button>`
      ).join('')}</div></fieldset>
      <div data-result aria-live="polite"></div>
      <p class="muted">${esc(s.why)}</p>
      <p class="muted">${esc(s.uses)}</p>
    </div>
    <div class="card center burner" data-flame></div>
    <div class="card lab-wide"><h3 class="h-small">${esc(s.spectrum)}</h3><div class="spectrum" data-spectrum><span class="spectrum-bar"></span></div>
      <p class="spectrum-scale"><span>400 nm</span><span>500 nm</span><span>600 nm</span><span>700 nm</span></p></div>
    <div class="card lab-wide" data-game></div>
  </div>`;

  function show(m) {
    current = m;
    for (const b of host.querySelectorAll('[data-el]'))
      b.setAttribute('aria-pressed', String(b.dataset.el === m.el));
    host.querySelector('[data-flame]').innerHTML = flame(m.color);
    host.querySelector('[data-result]').innerHTML =
      `<h3>${esc(pick(m.name))} (${esc(m.ion)})</h3><p><strong>${esc(s.colour)}:</strong> ${esc(pick(m.word))}</p><p>${esc(fmt(s.line, { nm: m.nm }))}</p>`;
    const left = ((m.nm - 380) / (750 - 380)) * 100;
    host.querySelector('[data-spectrum]').innerHTML =
      `<span class="spectrum-bar"></span><span class="spectrum-line" style="left:${left}%"></span>`;
  }
  function game() {
    const target = shuffle(METALS)[0];
    const options = shuffle([target, ...shuffle(METALS.filter(m => m !== target)).slice(0, 3)]);
    host.querySelector('[data-game]').innerHTML =
      `<h3 class="h-small">${esc(s.game)}</h3><p>${esc(s.gameQ)}</p>
      <div class="game-row">${flame(target.color)}<div class="chip-grid">${options.map(o => `<button type="button" class="btn" data-guess="${o.el}">${esc(pick(o.name))}</button>`).join('')}</div></div>
      <p data-answer aria-live="polite"></p>`;
    host.querySelector('[data-game]').onclick = e => {
      const b = e.target.closest('[data-guess]');
      if (b) {
        host.querySelector('[data-answer]').innerHTML =
          `${esc(b.dataset.guess === target.el ? s.right : fmt(s.wrong, { name: pick(target.name) }))} <button class="btn btn-small" type="button" data-again>${esc(s.again)}</button>`;
      }
      if (e.target.closest('[data-again]')) game();
    };
  }
  host.querySelector('.chip-grid').addEventListener('click', e => {
    const b = e.target.closest('[data-el]');
    if (b) show(METALS.find(m => m.el === b.dataset.el));
  });
  show(current);
  game();
}
