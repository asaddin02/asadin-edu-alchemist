// Voltaic cells: pair two metals, find anode and cathode, electron flow and E°cell (and Nernst for university).
import { esc } from '../core/dom.js';
import { S, pick, fmt, num, atLeast } from '../core/prefs.js';

const s = S({
  metalA: ['Logam 1', 'Metal 1'],
  metalB: ['Logam 2', 'Metal 2'],
  anode: ['Anode (−): oksidasi', 'Anode (−): oxidation'],
  cathode: ['Katode (+): reduksi', 'Cathode (+): reduction'],
  ecell: [
    'E°sel = E°katode − E°anode = {c} − ({a}) = {e} V',
    'E°cell = E°cathode − E°anode = {c} − ({a}) = {e} V',
  ],
  notation: ['Notasi sel', 'Cell notation'],
  same: ['Pilih dua logam yang berbeda.', 'Choose two different metals.'],
  flow: [
    'Elektron mengalir dari {a} ke {c} melalui kawat; ion bergerak melalui jembatan garam.',
    'Electrons flow from {a} to {c} through the wire; ions move through the salt bridge.',
  ],
  overall: ['Reaksi total', 'Overall reaction'],
  table: ['Potensial reduksi standar (25 °C)', 'Standard reduction potentials (25 °C)'],
  nernst: ['Konsentrasi ion (persamaan Nernst)', 'Ion concentrations (Nernst equation)'],
  e: ['E sel = {e} V', 'E cell = {e} V'],
  bridge: ['jembatan garam', 'salt bridge'],
});

const METALS = [
  { el: 'Mg', z: 2, E: -2.37, name: ['Magnesium', 'Magnesium'] },
  { el: 'Al', z: 3, E: -1.66, name: ['Aluminium', 'Aluminium'] },
  { el: 'Zn', z: 2, E: -0.76, name: ['Seng', 'Zinc'] },
  { el: 'Fe', z: 2, E: -0.44, name: ['Besi', 'Iron'] },
  { el: 'Ni', z: 2, E: -0.25, name: ['Nikel', 'Nickel'] },
  { el: 'Sn', z: 2, E: -0.14, name: ['Timah', 'Tin'] },
  { el: 'Pb', z: 2, E: -0.13, name: ['Timbal', 'Lead'] },
  { el: 'Cu', z: 2, E: 0.34, name: ['Tembaga', 'Copper'] },
  { el: 'Ag', z: 1, E: 0.8, name: ['Perak', 'Silver'] },
  { el: 'Au', z: 3, E: 1.5, name: ['Emas', 'Gold'] },
];
const SUP = { 1: '⁺', 2: '²⁺', 3: '³⁺' };
const lcm = (a, b) =>
  (a * b) /
  ((x, y) => {
    while (y) [x, y] = [y, x % y];
    return x;
  })(a, b);

function cellSVG(an, ca) {
  return `<svg class="cell" viewBox="0 0 520 260" role="img" aria-label="${esc(fmt(s.flow, { a: an.el, c: ca.el }))}">
    <path d="M110 40 H410" class="wire"/><path d="M110 40 V110 M410 40 V110" class="wire"/>
    <circle cx="260" cy="40" r="22" class="meter"/><text x="260" y="46" text-anchor="middle" class="meter-text">V</text>
    <path d="M150 28 l14 -6 l0 12 z M340 28 l14 6 l-14 6 z" class="arrow"/>
    <text x="200" y="22" text-anchor="middle" class="flow-text">e⁻ →</text><text x="320" y="22" text-anchor="middle" class="flow-text">e⁻ →</text>
    <rect x="40" y="120" width="150" height="120" rx="10" class="beaker-a"/><rect x="330" y="120" width="150" height="120" rx="10" class="beaker-c"/>
    <rect x="100" y="80" width="20" height="130" class="electrode"/><rect x="400" y="80" width="20" height="130" class="electrode"/>
    <path d="M160 150 V110 H360 V150" class="bridge"/><text x="260" y="104" text-anchor="middle" class="small-text">${esc(s.bridge)}</text>
    <text x="110" y="232" text-anchor="middle" class="label">${esc(an.el)} | ${esc(an.el)}${SUP[an.z]}</text>
    <text x="410" y="232" text-anchor="middle" class="label">${esc(ca.el)}${SUP[ca.z]} | ${esc(ca.el)}</text>
    <text x="110" y="72" text-anchor="middle" class="sign">− anode</text><text x="410" y="72" text-anchor="middle" class="sign">+ katode/cathode</text>
  </svg>`;
}

export function mount(host) {
  host.innerHTML = `<div class="lab-grid">
    <div class="card lab-controls">
      <div class="field"><label for="v-a">${esc(s.metalA)}</label><select id="v-a">${METALS.map(m => `<option value="${m.el}" ${m.el === 'Zn' ? 'selected' : ''}>${esc(pick(m.name))} (${m.el})</option>`).join('')}</select></div>
      <div class="field"><label for="v-b">${esc(s.metalB)}</label><select id="v-b">${METALS.map(m => `<option value="${m.el}" ${m.el === 'Cu' ? 'selected' : ''}>${esc(pick(m.name))} (${m.el})</option>`).join('')}</select></div>
      ${
        atLeast('kuliah')
          ? `<fieldset data-nernst><legend>${esc(s.nernst)}</legend>
        <div class="field slider"><label for="v-ca">[anode ion] <output id="v-ca-out">1 M</output></label><input id="v-ca" type="range" min="-3" max="0" step="0.1" value="0" /></div>
        <div class="field slider"><label for="v-cc">[cathode ion] <output id="v-cc-out">1 M</output></label><input id="v-cc" type="range" min="-3" max="0" step="0.1" value="0" /></div></fieldset>`
          : ''
      }
      <div data-out aria-live="polite"></div>
    </div>
    <div class="card" data-svg></div>
    <div class="card lab-wide"><h3 class="h-small">${esc(s.table)}</h3><table class="data-table"><tbody>${METALS.map(
      m =>
        `<tr><th scope="row">${m.el}${SUP[m.z]} + ${m.z}e⁻ → ${m.el}</th><td>${m.E > 0 ? '+' : ''}${num(m.E, 2)} V</td></tr>`
    ).join('')}</tbody></table></div>
  </div>`;
  function draw() {
    const a = METALS.find(m => m.el === host.querySelector('#v-a').value);
    const b = METALS.find(m => m.el === host.querySelector('#v-b').value);
    const out = host.querySelector('[data-out]');
    if (a === b) {
      out.innerHTML = `<p class="warn">${esc(s.same)}</p>`;
      host.querySelector('[data-svg]').innerHTML = '';
      return;
    }
    const [an, ca] = a.E < b.E ? [a, b] : [b, a];
    const e = ca.E - an.E;
    const n = lcm(an.z, ca.z);
    const ka = n / an.z;
    const kc = n / ca.z;
    const coef = (k, t) => (k > 1 ? `${k}${t}` : t);
    let nernst = '';
    if (host.querySelector('[data-nernst]')) {
      const cA = 10 ** Number(host.querySelector('#v-ca').value);
      const cC = 10 ** Number(host.querySelector('#v-cc').value);
      host.querySelector('#v-ca-out').textContent = `${num(cA, 3)} M`;
      host.querySelector('#v-cc-out').textContent = `${num(cC, 3)} M`;
      const E = e - (0.0592 / n) * Math.log10(cA ** ka / cC ** kc);
      nernst = `<p><strong>${esc(fmt(s.e, { e: num(E, 3) }))}</strong> · E = E° − (0,0592/${n}) log Q</p>`;
    }
    out.innerHTML = `<p><strong>${esc(s.anode)}:</strong> ${an.el} → ${an.el}${SUP[an.z]} + ${an.z}e⁻</p>
      <p><strong>${esc(s.cathode)}:</strong> ${ca.el}${SUP[ca.z]} + ${ca.z}e⁻ → ${ca.el}</p>
      <p><strong>${esc(s.overall)}:</strong> ${coef(ka, an.el)} + ${coef(kc, `${ca.el}${SUP[ca.z]}`)} → ${coef(ka, `${an.el}${SUP[an.z]}`)} + ${coef(kc, ca.el)}</p>
      <p class="ph-value">${esc(fmt(s.ecell, { c: num(ca.E, 2), a: num(an.E, 2), e: num(e, 2) }))}</p>
      ${nernst}
      <p><strong>${esc(s.notation)}:</strong> <span class="mono">${an.el} | ${an.el}${SUP[an.z]} || ${ca.el}${SUP[ca.z]} | ${ca.el}</span></p>
      <p class="muted">${esc(fmt(s.flow, { a: an.el, c: ca.el }))}</p>`;
    host.querySelector('[data-svg]').innerHTML = cellSVG(an, ca);
  }
  host.addEventListener('change', draw);
  host.addEventListener('input', e => e.target.type === 'range' && draw());
  draw();
}
