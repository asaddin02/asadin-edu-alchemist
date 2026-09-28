// Atom drawings: a Bohr shell model (SVG) and orbital box diagrams following Aufbau, Pauli and Hund.
import { esc } from '../core/dom.js';
import { pick } from '../core/prefs.js';

const CORES = {
  He: '1s2',
  Ne: '[He] 2s2 2p6',
  Ar: '[Ne] 3s2 3p6',
  Kr: '[Ar] 3d10 4s2 4p6',
  Xe: '[Kr] 4d10 5s2 5p6',
  Rn: '[Xe] 4f14 5d10 6s2 6p6',
};
const MADELUNG = '1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p 7s 5f 6d 7p'.split(' ');
const CAP = { s: 2, p: 6, d: 10, f: 14 };
const SUP = d => String(d).replace(/\d/g, c => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]);

/** Subshells {n, l, e} of a PubChem configuration string (cores expanded), in Madelung order. */
export function subshells(conf, z) {
  let text = String(conf || '').replace(/\(.*?\)/g, ' ');
  for (let i = 0; i < 6 && /\[(\w+)\]/.test(text); i++)
    text = text.replace(/\[(\w+)\]/g, (_, c) => ` ${CORES[c] || ''} `);
  let parts = [...text.matchAll(/(\d)([spdf])(\d+)/g)].map(m => ({ n: +m[1], l: m[2], e: +m[3] }));
  if (parts.reduce((a, p) => a + p.e, 0) !== z) {
    parts = [];
    let left = z;
    for (const o of MADELUNG) {
      if (left <= 0) break;
      const e = Math.min(CAP[o[1]], left);
      parts.push({ n: +o[0], l: o[1], e });
      left -= e;
    }
  }
  return parts.sort((a, b) => MADELUNG.indexOf(`${a.n}${a.l}`) - MADELUNG.indexOf(`${b.n}${b.l}`));
}

/** "1s² 2s² 2p⁶ …" and the noble-gas short form. */
export function configText(parts) {
  return parts.map(p => `${p.n}${p.l}${SUP(p.e)}`).join(' ');
}

/** Bohr model: nucleus plus electrons evenly spaced on each shell. */
export function bohrSVG(shells, symbol, size = 260) {
  const c = size / 2;
  const step = (size / 2 - 18) / Math.max(shells.length, 1);
  const rings = shells
    .map((count, i) => {
      const r = 22 + step * (i + 0.6);
      const dots = Array.from({ length: count }, (_, k) => {
        const a = (2 * Math.PI * k) / count - Math.PI / 2;
        return `<circle cx="${(c + r * Math.cos(a)).toFixed(1)}" cy="${(c + r * Math.sin(a)).toFixed(1)}" r="${count > 18 ? 2.6 : 3.6}" class="bohr-e"/>`;
      }).join('');
      return `<circle cx="${c}" cy="${c}" r="${r.toFixed(1)}" class="bohr-ring"/>${dots}`;
    })
    .join('');
  const label = pick([
    `Model Bohr ${symbol}: ${shells.join(', ')} elektron per kulit`,
    `Bohr model of ${symbol}: ${shells.join(', ')} electrons per shell`,
  ]);
  return `<svg class="bohr" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="${esc(label)}">
    ${rings}<circle cx="${c}" cy="${c}" r="20" class="bohr-nucleus"/><text x="${c}" y="${c + 6}" text-anchor="middle" class="bohr-sym">${esc(symbol)}</text></svg>`;
}

/** Orbital boxes with ↑↓ arrows; Hund's rule fills each subshell singly before pairing. */
export function orbitalBoxes(parts) {
  return `<div class="orbitals">${parts
    .map(p => {
      const boxes = CAP[p.l] / 2;
      const spins = Array.from({ length: boxes }, (_, i) => (p.e > i ? 1 : 0) + (p.e > boxes + i ? 1 : 0));
      return `<div class="orb-group"><div class="orb-boxes">${spins
        .map(
          n =>
            `<span class="orb-box">${n >= 1 ? '<span class="up">↑</span>' : ''}${n === 2 ? '<span class="down">↓</span>' : ''}</span>`
        )
        .join('')}</div><span class="orb-label">${p.n}${p.l}${SUP(p.e)}</span></div>`;
    })
    .join('')}</div>`;
}

/** Valence electrons for main-group elements (s + p of the outer shell). */
export function valenceOf(parts) {
  const n = Math.max(...parts.map(p => p.n));
  return parts.filter(p => p.n === n && (p.l === 's' || p.l === 'p')).reduce((a, p) => a + p.e, 0);
}
