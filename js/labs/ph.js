// pH & indicators: everyday solutions or a custom acid/base, tested with seven indicators.
import { esc } from '../core/dom.js';
import { S, pick, num } from '../core/prefs.js';

const s = S({
  mode: ['Pilih', 'Choose'],
  everyday: ['Larutan sehari-hari', 'Everyday solutions'],
  custom: ['Buat larutan sendiri', 'Make your own solution'],
  solute: ['Zat terlarut', 'Solute'],
  conc: ['Konsentrasi', 'Concentration'],
  acidic: ['Asam', 'Acidic'],
  neutral: ['Netral', 'Neutral'],
  basic: ['Basa', 'Basic'],
  indicators: ['Indikator', 'Indicators'],
  note: [
    'pH larutan sehari-hari adalah nilai khas dan dapat sedikit berbeda.',
    'Everyday pH values are typical and can vary a little.',
  ],
  strong: ['kuat', 'strong'],
  weak: ['lemah', 'weak'],
  formula: ['pH = −log[H⁺] · pOH = 14 − pH (25 °C)', 'pH = −log[H⁺] · pOH = 14 − pH (25 °C)'],
});

const EVERYDAY = [
  { name: ['Asam lambung', 'Stomach acid'], ph: 1.5 },
  { name: ['Air jeruk nipis', 'Lime juice'], ph: 2.2 },
  { name: ['Minuman kola', 'Cola'], ph: 2.5 },
  { name: ['Cuka dapur', 'Vinegar'], ph: 2.9 },
  { name: ['Jus tomat', 'Tomato juice'], ph: 4.3 },
  { name: ['Kopi hitam', 'Black coffee'], ph: 5 },
  { name: ['Air hujan', 'Rain water'], ph: 5.6 },
  { name: ['Susu', 'Milk'], ph: 6.6 },
  { name: ['Air murni', 'Pure water'], ph: 7 },
  { name: ['Darah', 'Blood'], ph: 7.4 },
  { name: ['Air laut', 'Sea water'], ph: 8.1 },
  { name: ['Air soda kue', 'Baking-soda water'], ph: 8.3 },
  { name: ['Pasta gigi', 'Toothpaste'], ph: 9 },
  { name: ['Air sabun', 'Soapy water'], ph: 10 },
  { name: ['Pembersih amonia', 'Ammonia cleaner'], ph: 11.5 },
  { name: ['Air kapur', 'Limewater'], ph: 12.4 },
  { name: ['Pemutih', 'Bleach'], ph: 12.6 },
];

const SOLUTES = {
  HCl: { acid: true, strong: true, name: ['HCl (asam klorida)', 'HCl (hydrochloric acid)'] },
  CH3COOH: { acid: true, K: 1.8e-5, name: ['CH₃COOH (asam asetat)', 'CH₃COOH (acetic acid)'] },
  NaOH: { acid: false, strong: true, name: ['NaOH (natrium hidroksida)', 'NaOH (sodium hydroxide)'] },
  NH3: { acid: false, K: 1.8e-5, name: ['NH₃ (amonia)', 'NH₃ (ammonia)'] },
};

/** pH of a monoprotic acid or monobasic base (exact for strong, quadratic for weak, including water). */
export function phOf(key, c) {
  const sol = SOLUTES[key];
  const Kw = 1e-14;
  let x;
  if (sol.strong) x = c / 2 + Math.sqrt((c * c) / 4 + Kw);
  // Weak: solve x² + Kx − Kc = 0; a dilute acid or base can never be "less than neutral".
  else x = Math.max((-sol.K + Math.sqrt(sol.K * sol.K + 4 * sol.K * c)) / 2, 1e-7);
  return sol.acid ? -Math.log10(x) : 14 + Math.log10(x);
}

const lerp = (stops, v) => {
  for (let i = 0; i < stops.length - 1; i++) {
    const [a, ca] = stops[i];
    const [b, cb] = stops[i + 1];
    if (v <= b) {
      const t = Math.max(0, Math.min(1, (v - a) / (b - a)));
      const pa = ca.match(/\w\w/g).map(h => parseInt(h, 16));
      const pb = cb.match(/\w\w/g).map(h => parseInt(h, 16));
      return `rgb(${pa.map((x, k) => Math.round(x + (pb[k] - x) * t)).join(',')})`;
    }
  }
  return stops[stops.length - 1][1];
};
const UNIVERSAL = [
  [0, '#d7263d'],
  [3, '#f46036'],
  [5, '#f7b32b'],
  [7, '#4caf50'],
  [9, '#2e86ab'],
  [11, '#3d348b'],
  [14, '#5b1a7a'],
];
const INDICATORS = [
  {
    name: ['Indikator universal', 'Universal indicator'],
    color: ph =>
      lerp(
        UNIVERSAL.map(([a, c]) => [a, c.replace('#', '')]),
        ph
      ),
  },
  {
    name: ['Lakmus', 'Litmus'],
    color: ph => (ph < 4.5 ? '#d32f2f' : ph > 8.3 ? '#1e63c4' : '#8e44ad'),
    range: '4,5–8,3',
  },
  {
    name: ['Fenolftalein', 'Phenolphthalein'],
    color: ph => (ph < 8.2 ? '#f8f8f8' : ph < 10 ? '#f06292' : '#d81b60'),
    range: '8,2–10',
  },
  {
    name: ['Metil jingga', 'Methyl orange'],
    color: ph => (ph < 3.1 ? '#e53935' : ph > 4.4 ? '#fdd835' : '#fb8c00'),
    range: '3,1–4,4',
  },
  {
    name: ['Bromtimol biru', 'Bromothymol blue'],
    color: ph => (ph < 6 ? '#fdd835' : ph > 7.6 ? '#1e63c4' : '#43a047'),
    range: '6,0–7,6',
  },
  {
    name: ['Kol ungu / bunga telang', 'Red cabbage / butterfly pea'],
    color: ph =>
      lerp(
        [
          [1, 'e53945'],
          [4, 'e573a8'],
          [6, '8e4ab8'],
          [7, '6a4cc9'],
          [8, '3b6fd6'],
          [10, '2fa38a'],
          [12, '8bc34a'],
          [14, 'e8d43a'],
        ],
        ph
      ),
  },
  {
    name: ['Kunyit', 'Turmeric'],
    color: ph => (ph < 7.4 ? '#f5b700' : ph > 8.6 ? '#b3401d' : '#e07a1f'),
    range: '7,4–8,6',
  },
];

export function mount(host) {
  let ph = 7;
  host.innerHTML = `<div class="lab-grid">
    <div class="card lab-controls">
      <div class="seg" role="group" aria-label="${esc(s.mode)}"><button type="button" class="seg-btn" data-tab="everyday" aria-pressed="true">${esc(s.everyday)}</button><button type="button" class="seg-btn" data-tab="custom" aria-pressed="false">${esc(s.custom)}</button></div>
      <div data-everyday><div class="chip-grid">${EVERYDAY.map((x, i) => `<button type="button" class="chip" data-i="${i}">${esc(pick(x.name))}</button>`).join('')}</div><p class="muted small">${esc(s.note)}</p></div>
      <div data-custom hidden>
        <div class="field"><label for="ph-sol">${esc(s.solute)}</label><select id="ph-sol">${Object.entries(
          SOLUTES
        )
          .map(
            ([k, v]) =>
              `<option value="${k}">${esc(pick(v.name))} · ${esc(v.strong ? s.strong : s.weak)}</option>`
          )
          .join('')}</select></div>
        <div class="field slider"><label for="ph-c">${esc(s.conc)} <output id="ph-c-out">0,01 M</output></label><input id="ph-c" type="range" min="-6" max="0" step="0.1" value="-2" /></div>
      </div>
    </div>
    <div class="card center">
      <div class="beaker" aria-hidden="true"><span class="liquid" data-liquid></span></div>
      <p class="ph-value" data-ph aria-live="polite"></p>
      <div class="ph-scale" aria-hidden="true"><span class="ph-marker" data-marker></span></div>
      <p class="muted small">${esc(s.formula)}</p>
    </div>
    <div class="card lab-wide"><h3 class="h-small">${esc(s.indicators)}</h3><div class="indicators" data-ind></div></div>
  </div>`;

  function draw() {
    const kind = ph < 6.95 ? s.acidic : ph > 7.05 ? s.basic : s.neutral;
    const h = 10 ** -ph;
    const oh = 10 ** -(14 - ph);
    host.querySelector('[data-ph]').innerHTML =
      `<strong>pH ${num(ph, 2)}</strong> · ${esc(kind)}<br><small>[H⁺] = ${h.toExponential(2)} M · [OH⁻] = ${oh.toExponential(2)} M · pOH ${num(14 - ph, 2)}</small>`;
    host.querySelector('[data-liquid]').style.background = INDICATORS[0].color(ph);
    host.querySelector('[data-marker]').style.left = `${(ph / 14) * 100}%`;
    host.querySelector('[data-ind]').innerHTML = INDICATORS.map(
      ind =>
        `<div class="indicator"><span class="swatch" style="background:${ind.color(ph)}"></span><span>${esc(pick(ind.name))}${ind.range ? ` <small class="muted">(${ind.range})</small>` : ''}</span></div>`
    ).join('');
  }
  function custom() {
    const key = host.querySelector('#ph-sol').value;
    const exp = Number(host.querySelector('#ph-c').value);
    const c = 10 ** exp;
    host.querySelector('#ph-c-out').textContent = `${c >= 0.01 ? num(c, 3) : c.toExponential(1)} M`;
    ph = Math.max(0, Math.min(14, phOf(key, c)));
    draw();
  }
  host.addEventListener('click', e => {
    const tab = e.target.closest('[data-tab]');
    if (tab) {
      for (const b of host.querySelectorAll('[data-tab]')) b.setAttribute('aria-pressed', String(b === tab));
      host.querySelector('[data-everyday]').hidden = tab.dataset.tab !== 'everyday';
      host.querySelector('[data-custom]').hidden = tab.dataset.tab !== 'custom';
      if (tab.dataset.tab === 'custom') custom();
    }
    const item = e.target.closest('[data-i]');
    if (item) {
      ph = EVERYDAY[item.dataset.i].ph;
      for (const b of host.querySelectorAll('[data-i]')) b.setAttribute('aria-pressed', String(b === item));
      draw();
    }
  });
  host.querySelector('#ph-sol').addEventListener('change', custom);
  host.querySelector('#ph-c').addEventListener('input', custom);
  draw();
}
