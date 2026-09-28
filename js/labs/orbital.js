// Electron configuration: Bohr model, orbital boxes (Aufbau, Pauli, Hund) and orbital shapes.
import { esc } from '../core/dom.js';
import { S, pick, fmt } from '../core/prefs.js';
import { ELEMENTS, CATEGORIES, getElement } from '../data/periodicTable.js';
import { bohrSVG, orbitalBoxes, subshells, configText, valenceOf } from '../components/bohr.js';

const s = S({
  element: ['Unsur', 'Element'],
  add: ['+ elektron', '+ electron'],
  remove: ['− elektron', '− electron'],
  full: ['Konfigurasi lengkap', 'Full configuration'],
  short: ['Bentuk singkat (gas mulia)', 'Noble-gas shorthand'],
  shells: ['Elektron per kulit', 'Electrons per shell'],
  valence: ['Elektron valensi', 'Valence electrons'],
  position: ['Letak: periode {p}, {g}, blok {b}', 'Position: period {p}, {g}, {b}-block'],
  group: ['golongan {g}', 'group {g}'],
  series: ['deret {c}', '{c} series'],
  order: ['Urutan pengisian (Aufbau)', 'Filling order (Aufbau)'],
  rules: [
    'Aufbau: isi dari energi terendah. Pauli: maksimal 2 elektron berlawanan spin per kotak. Hund: pada subkulit setara, isi satu per satu dulu sebelum berpasangan.',
    'Aufbau: fill from lowest energy. Pauli: at most 2 opposite-spin electrons per box. Hund: in equal orbitals, fill singly before pairing.',
  ],
  exception: [
    'Catatan: konfigurasi ini dari data PubChem dan dapat menyimpang dari urutan Aufbau sederhana (misalnya Cr dan Cu).',
    'Note: this configuration comes from PubChem and may differ from simple Aufbau order (e.g. Cr and Cu).',
  ],
  shapes: ['Bentuk orbital', 'Orbital shapes'],
  shapeText: {
    s: ['Orbital s berbentuk bola; setiap kulit punya satu.', 's orbitals are spheres; every shell has one.'],
    p: [
      'Orbital p berbentuk halter di sepanjang sumbu x, y, atau z; tiga per kulit mulai n = 2.',
      'p orbitals are dumbbells along x, y or z; three per shell from n = 2.',
    ],
    d: [
      'Orbital d berbentuk daun semanggi (empat) dan satu halter bercincin (dz²); lima per kulit mulai n = 3.',
      'd orbitals are four cloverleaves plus a dumbbell with a ring (dz²); five per shell from n = 3.',
    ],
    f: [
      'Orbital f memiliki bentuk yang lebih rumit; tujuh per kulit mulai n = 4.',
      'f orbitals have more complex shapes; seven per shell from n = 4.',
    ],
  },
});

const ORDER = '1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p 7s 5f 6d 7p'.split(' ');
const NOBLE = [2, 10, 18, 36, 54, 86];

function shapeSVG(l) {
  const lobe = (rot, color) =>
    `<g transform="rotate(${rot} 60 60)"><ellipse cx="60" cy="33" rx="13" ry="24" fill="${color}"/><ellipse cx="60" cy="87" rx="13" ry="24" fill="${color}"/></g>`;
  const body = {
    s: '<circle cx="60" cy="60" r="36" fill="#4a9fe0" opacity=".8"/>',
    p: lobe(90, '#e9a23b') + lobe(0, '#3fb5a3'),
    d: lobe(45, '#e06fa8') + lobe(-45, '#7c7fe8'),
    f: lobe(0, '#b36fd6') + lobe(60, '#b36fd6') + lobe(120, '#b36fd6'),
  }[l];
  return `<svg viewBox="0 0 120 120" width="110" height="110" role="img" aria-label="${esc(`orbital ${l}`)}"><line x1="0" y1="60" x2="120" y2="60" class="axis"/><line x1="60" y1="0" x2="60" y2="120" class="axis"/>${body}</svg>`;
}

export function mount(host, { params }) {
  let z = Math.min(118, Math.max(1, Number(params?.get('z')) || 6));
  host.innerHTML = `<div class="lab-grid">
    <div class="card lab-controls">
      <div class="field"><label for="o-el">${esc(s.element)}</label><select id="o-el">${ELEMENTS.map(e => `<option value="${e.z}">${e.z}. ${esc(pick([e.id, e.en]))} (${e.s})</option>`).join('')}</select></div>
      <p class="btn-row"><button class="btn" type="button" data-step="-1">${esc(s.remove)}</button><button class="btn btn-primary" type="button" data-step="1">${esc(s.add)}</button></p>
      <div data-info aria-live="polite"></div>
      <p class="muted small">${esc(s.rules)}</p>
    </div>
    <div class="card center" data-bohr></div>
    <div class="card lab-wide"><h3 class="h-small">${esc(s.order)}</h3><div data-boxes></div></div>
    <div class="card lab-wide"><h3 class="h-small">${esc(s.shapes)}</h3><div class="shapes">${[
      's',
      'p',
      'd',
      'f',
    ]
      .map(
        l =>
          `<figure class="shape">${shapeSVG(l)}<figcaption><strong>${l}</strong> · ${esc(pick(s.shapeText[l]))}</figcaption></figure>`
      )
      .join('')}</div></div>
  </div>`;
  const select = host.querySelector('#o-el');
  function draw() {
    const e = ELEMENTS[z - 1];
    select.value = String(z);
    const parts = subshells(e.conf, e.z);
    const core = NOBLE.filter(n => n < z).pop();
    const coreEl = core ? getElement(core) : null;
    const coreParts = coreEl ? subshells(coreEl.conf, coreEl.z) : [];
    const outer = parts.filter(p => !coreParts.some(c => c.n === p.n && c.l === p.l && c.e === p.e));
    host.querySelector('[data-bohr]').innerHTML = bohrSVG(e.shells, e.s, 260);
    host.querySelector('[data-info]').innerHTML =
      `<h3>${esc(pick([e.id, e.en]))} (${esc(e.s)}) · Z = ${e.z}</h3>
      <p><strong>${esc(s.full)}:</strong> ${esc(configText(parts))}</p>
      ${coreEl ? `<p><strong>${esc(s.short)}:</strong> [${esc(coreEl.s)}] ${esc(configText(outer))}</p>` : ''}
      <p><strong>${esc(s.shells)}:</strong> ${e.shells.join(' · ')}</p>
      ${['s', 'p'].includes(e.block) ? `<p><strong>${esc(s.valence)}:</strong> ${valenceOf(parts)}</p>` : ''}
      <p>${esc(fmt(s.position, { p: e.period, g: e.group ? fmt(s.group, { g: e.group }) : fmt(s.series, { c: pick(CATEGORIES[e.cat].name).toLowerCase() }), b: e.block }))}</p>`;
    host.querySelector('[data-boxes]').innerHTML =
      `${orbitalBoxes(parts)}<p class="muted small">${ORDER.join(' → ')}</p><p class="muted small">${esc(s.exception)}</p>`;
  }
  select.addEventListener('change', () => {
    z = Number(select.value);
    draw();
  });
  host.querySelector('.btn-row').addEventListener('click', e => {
    const b = e.target.closest('[data-step]');
    if (!b) return;
    z = Math.min(118, Math.max(1, z + Number(b.dataset.step)));
    draw();
  });
  draw();
}
