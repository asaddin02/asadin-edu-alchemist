// Acid–base titration: add NaOH to an acid and watch the pH curve and indicator colour.
import { esc } from '../core/dom.js';
import { S, pick, fmt, num } from '../core/prefs.js';
import { lineChart } from './kit.js';

const s = S({
  acid: ['Asam di labu (25,0 mL, 0,100 M)', 'Acid in the flask (25.0 mL, 0.100 M)'],
  strong: ['HCl (asam kuat)', 'HCl (strong acid)'],
  weak: ['CH₃COOH (asam lemah, Ka 1,8 × 10⁻⁵)', 'CH₃COOH (weak acid, Ka 1.8 × 10⁻⁵)'],
  indicator: ['Indikator', 'Indicator'],
  added: ['NaOH 0,100 M ditambahkan: {v} mL', '0.100 M NaOH added: {v} mL'],
  reset: ['Ulangi', 'Reset'],
  eq: ['Titik ekuivalen: 25,0 mL (pH {ph})', 'Equivalence point: 25.0 mL (pH {ph})'],
  half: ['Setengah ekuivalen: pH = pKa = {pka}', 'Half-equivalence: pH = pKa = {pka}'],
  curve: ['Kurva titrasi', 'Titration curve'],
  volume: ['Volume NaOH (mL)', 'NaOH volume (mL)'],
  good: [
    'Perubahan warna indikator ini berada dekat titik ekuivalen, jadi cocok.',
    'This indicator changes colour near the equivalence point, so it is suitable.',
  ],
  bad: [
    'Perubahan warna indikator ini jauh dari titik ekuivalen; hasil titrasi akan kurang tepat.',
    'This indicator changes colour far from the equivalence point; the result would be inaccurate.',
  ],
});

const IND = {
  pp: {
    name: ['Fenolftalein (8,2–10)', 'Phenolphthalein (8.2–10)'],
    lo: 8.2,
    hi: 10,
    a: '#f7f7fb',
    b: '#e8438f',
  },
  mo: {
    name: ['Metil jingga (3,1–4,4)', 'Methyl orange (3.1–4.4)'],
    lo: 3.1,
    hi: 4.4,
    a: '#e53935',
    b: '#fdd835',
  },
  btb: {
    name: ['Bromtimol biru (6,0–7,6)', 'Bromothymol blue (6.0–7.6)'],
    lo: 6,
    hi: 7.6,
    a: '#fdd835',
    b: '#1e63c4',
  },
};
const Ka = 1.8e-5;
const Ca = 0.1;
const Va = 25;
const Cb = 0.1;

export function phAt(weak, vb) {
  const na = Ca * Va;
  const nb = Cb * vb;
  const vt = Va + vb;
  if (!weak) {
    if (nb < na - 1e-9) return -Math.log10((na - nb) / vt);
    if (Math.abs(nb - na) < 1e-9) return 7;
    return 14 + Math.log10((nb - na) / vt);
  }
  if (nb === 0) return -Math.log10((-Ka + Math.sqrt(Ka * Ka + 4 * Ka * Ca)) / 2);
  if (nb < na - 1e-9) {
    const pure = -Math.log10((-Ka + Math.sqrt(Ka * Ka + 4 * Ka * ((na - nb) / vt))) / 2);
    return Math.max(pure, -Math.log10(Ka) + Math.log10(nb / (na - nb)));
  }
  if (Math.abs(nb - na) < 1e-9) return 14 + Math.log10(Math.sqrt((1e-14 / Ka) * (na / vt)));
  return 14 + Math.log10((nb - na) / vt);
}

function mix(a, b, t) {
  const pa = a
    .slice(1)
    .match(/\w\w/g)
    .map(h => parseInt(h, 16));
  const pb = b
    .slice(1)
    .match(/\w\w/g)
    .map(h => parseInt(h, 16));
  return `rgb(${pa.map((x, k) => Math.round(x + (pb[k] - x) * t)).join(',')})`;
}

export function mount(host) {
  let weak = false;
  let vb = 0;
  let ind = 'pp';
  host.innerHTML = `<div class="lab-grid">
    <div class="card lab-controls">
      <fieldset><legend>${esc(s.acid)}</legend><div class="seg"><button type="button" class="seg-btn" data-acid="strong" aria-pressed="true">${esc(s.strong)}</button><button type="button" class="seg-btn" data-acid="weak" aria-pressed="false">${esc(s.weak)}</button></div></fieldset>
      <div class="field"><label for="t-ind">${esc(s.indicator)}</label><select id="t-ind">${Object.entries(
        IND
      )
        .map(([k, v]) => `<option value="${k}">${esc(pick(v.name))}</option>`)
        .join('')}</select></div>
      <p class="btn-row">${[0.1, 1, 5].map(d => `<button class="btn" type="button" data-add="${d}">+${String(d).replace('.', pick([',', '.']))} mL</button>`).join('')}<button class="btn" type="button" data-reset>${esc(s.reset)}</button></p>
      <div class="field slider"><label for="t-v">${esc(s.volume)} <output id="t-v-out">0</output></label><input id="t-v" type="range" min="0" max="50" step="0.1" value="0" /></div>
      <div data-status aria-live="polite"></div>
    </div>
    <div class="card center"><div class="flask" aria-hidden="true"><span class="liquid" data-liquid></span></div><p class="ph-value" data-ph></p></div>
    <div class="card lab-wide"><h3 class="h-small">${esc(s.curve)}</h3><div data-chart></div></div>
  </div>`;

  function draw() {
    const ph = phAt(weak, vb);
    const I = IND[ind];
    const t = Math.max(0, Math.min(1, (ph - I.lo) / (I.hi - I.lo)));
    host.querySelector('[data-liquid]').style.background = mix(I.a, I.b, t);
    host.querySelector('[data-ph]').innerHTML = `<strong>pH ${num(ph, 2)}</strong>`;
    host.querySelector('#t-v').value = vb;
    host.querySelector('#t-v-out').textContent = num(vb, 1);
    const eqPH = phAt(weak, 25);
    // An indicator suits the titration when its colour change sits inside the steep pH jump around the
    // equivalence point (here: between 0.1 mL before and after it).
    const mid = (I.lo + I.hi) / 2;
    const suits = mid >= phAt(weak, 24.9) && mid <= phAt(weak, 25.1);
    host.querySelector('[data-status]').innerHTML =
      `<p>${esc(fmt(s.added, { v: num(vb, 1) }))}</p><p>${esc(fmt(s.eq, { ph: num(eqPH, 2) }))}</p>
      ${weak ? `<p>${esc(fmt(s.half, { pka: num(-Math.log10(Ka), 2) }))}</p>` : ''}<p class="${suits ? 'ok' : 'warn'}">${esc(suits ? s.good : s.bad)}</p>`;
    const points = Array.from({ length: 251 }, (_, i) => [i * 0.2, phAt(weak, i * 0.2)]);
    host.querySelector('[data-chart]').innerHTML = lineChart({
      series: [{ points }],
      xMin: 0,
      xMax: 50,
      yMin: 0,
      yMax: 14,
      xLabel: s.volume,
      yLabel: 'pH',
      marks: [{ x: 25, y: eqPH, label: pick(['ekuivalen', 'equivalence']) }],
      hLines: [
        { y: I.lo, label: `${I.lo}` },
        { y: I.hi, label: `${I.hi}` },
      ],
      point: [vb, ph],
      label: `${s.curve}: pH ${num(ph, 2)} ${pick(['pada', 'at'])} ${num(vb, 1)} mL`,
    });
  }
  host.addEventListener('click', e => {
    const acid = e.target.closest('[data-acid]');
    if (acid) {
      weak = acid.dataset.acid === 'weak';
      for (const b of host.querySelectorAll('[data-acid]'))
        b.setAttribute('aria-pressed', String(b === acid));
      vb = 0;
    }
    const add = e.target.closest('[data-add]');
    if (add) vb = Math.min(50, Math.round((vb + Number(add.dataset.add)) * 10) / 10);
    if (e.target.closest('[data-reset]')) vb = 0;
    if (acid || add || e.target.closest('[data-reset]')) draw();
  });
  host.querySelector('#t-v').addEventListener('input', e => {
    vb = Number(e.target.value);
    draw();
  });
  host.querySelector('#t-ind').addEventListener('change', e => {
    ind = e.target.value;
    draw();
  });
  draw();
}
