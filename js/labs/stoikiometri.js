// Molar mass & moles: parse any formula, show element percentages and convert grams ↔ moles ↔ particles ↔ gas volume.
import { esc } from '../core/dom.js';
import { S, pick, num } from '../core/prefs.js';
import { parseFormula, molarMass, composition, formulaHTML } from '../services/formula.js';
import { atomColor } from '../components/moleculeViewer3D.js';
import { getElement } from '../data/periodicTable.js';

const s = S({
  formula: ['Rumus kimia', 'Chemical formula'],
  hint: [
    'Mendukung kurung dan hidrat: Ca(OH)2, CuSO4·5H2O, (NH4)2SO4',
    'Supports brackets and hydrates: Ca(OH)2, CuSO4·5H2O, (NH4)2SO4',
  ],
  mr: ['Massa molar (Mr)', 'Molar mass (Mr)'],
  calc: ['Perhitungan', 'Working'],
  convert: ['Konversi jumlah zat', 'Convert amounts'],
  mass: ['Massa (g)', 'Mass (g)'],
  mol: ['Jumlah (mol)', 'Amount (mol)'],
  particles: ['Jumlah partikel', 'Number of particles'],
  volume: ['Volume gas STP (L)', 'Gas volume at STP (L)'],
  volumeNote: [
    'Volume gas hanya berlaku untuk zat berwujud gas; STP = 0 °C, 1 atm (22,4 L/mol).',
    'Gas volume only applies to gases; STP = 0 °C, 1 atm (22.4 L/mol).',
  ],
  element: ['Unsur', 'Element'],
  count: ['Jumlah atom', 'Atoms'],
  massCol: ['Massa (g/mol)', 'Mass (g/mol)'],
  pct: ['% massa', 'Mass %'],
  error: [
    'Rumus belum dikenali. Periksa huruf besar/kecil (Co ≠ CO) dan tanda kurung.',
    'Formula not recognised. Check capitals (Co ≠ CO) and brackets.',
  ],
});

const NA = 6.02214076e23;
// Inputs use plain JavaScript numbers (not locale formatting) so they can be edited and read back.
const plain = v =>
  v === 0
    ? '0'
    : Math.abs(v) >= 1e5 || Math.abs(v) < 1e-3
      ? v.toExponential(4)
      : String(Number(v.toPrecision(6)));

export function mount(host) {
  host.innerHTML = `<div class="lab-grid">
    <div class="card lab-controls">
      <div class="field"><label for="st-f">${esc(s.formula)}</label><input id="st-f" class="mono" value="C6H12O6" autocomplete="off" /></div>
      <p class="muted small">${esc(s.hint)}</p>
      <p>${['H2O', 'CO2', 'NaCl', 'Ca(OH)2', 'C8H10N4O2', 'CuSO4·5H2O', '(NH4)2SO4', 'C12H22O11'].map(f => `<button type="button" class="chip" data-f="${f}">${formulaHTML(f)}</button>`).join(' ')}</p>
      <div data-mr aria-live="polite"></div>
    </div>
    <div class="card" data-comp></div>
    <div class="card lab-wide">
      <h3 class="h-small">${esc(s.convert)}</h3>
      <div class="grid grid-4 convert">
        ${['mass', 'mol', 'particles', 'volume'].map(k => `<div class="field"><label for="cv-${k}">${esc(s[k])}</label><input id="cv-${k}" data-k="${k}" inputmode="decimal" autocomplete="off" /></div>`).join('')}
      </div>
      <p class="muted small">${esc(s.volumeNote)}</p>
    </div>
  </div>`;
  let mr = 0;
  const input = host.querySelector('#st-f');

  function update() {
    const p = parseFormula(input.value);
    const box = host.querySelector('[data-mr]');
    if (p.error) {
      box.innerHTML = `<p class="warn">${esc(s.error)}</p>`;
      host.querySelector('[data-comp]').innerHTML = '';
      mr = 0;
      return;
    }
    mr = molarMass(p.counts);
    const comp = composition(p.counts);
    box.innerHTML = `<p class="formula formula-lg">${formulaHTML(input.value)}</p><p><strong>${esc(s.mr)}:</strong> ${num(mr, 3)} g/mol</p>
      <p class="muted small"><strong>${esc(s.calc)}:</strong> ${Object.entries(p.counts)
        .map(([el, n]) => `${n} × ${getElement(el).m}`)
        .join(' + ')} = ${num(mr, 3)}</p>`;
    host.querySelector('[data-comp]').innerHTML =
      `<div class="comp-bar" role="img" aria-label="${esc(comp.map(c => `${c.el} ${c.pct.toFixed(1)}%`).join(', '))}">${comp
        .map(c => `<span style="flex-basis:${Math.max(c.pct, 0.8)}%;background:${atomColor(c.el)}"></span>`)
        .join('')}</div>
      <table class="data-table"><thead><tr><th scope="col">${esc(s.element)}</th><th scope="col">${esc(s.count)}</th><th scope="col">${esc(s.massCol)}</th><th scope="col">${esc(s.pct)}</th></tr></thead>
      <tbody>${comp.map(c => `<tr><th scope="row"><span class="dot" style="background:${atomColor(c.el)}"></span> ${esc(c.el)} · ${esc(pick([getElement(c.el).id, getElement(c.el).en]))}</th><td>${c.n}</td><td>${num(c.mass, 3)}</td><td>${num(c.pct, 2)}%</td></tr>`).join('')}</tbody></table>`;
    convert('mol', 1);
  }
  function convert(from, value) {
    if (!mr || !Number.isFinite(value)) return;
    const mol =
      from === 'mass'
        ? value / mr
        : from === 'particles'
          ? value / NA
          : from === 'volume'
            ? value / 22.4
            : value;
    const vals = { mass: mol * mr, mol, particles: mol * NA, volume: mol * 22.4 };
    for (const k of Object.keys(vals)) if (k !== from) host.querySelector(`#cv-${k}`).value = plain(vals[k]);
    if (from === 'mol' && value === 1) host.querySelector('#cv-mol').value = '1';
  }
  input.addEventListener('input', update);
  host.querySelector('.convert').addEventListener('input', e => {
    const k = e.target.dataset.k;
    const v = Number(String(e.target.value).replace(',', '.'));
    if (k && v > 0) convert(k, v);
  });
  host.addEventListener('click', e => {
    const c = e.target.closest('[data-f]');
    if (c) {
      input.value = c.dataset.f;
      update();
    }
  });
  update();
}
