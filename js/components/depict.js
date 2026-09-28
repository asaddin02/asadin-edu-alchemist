// 2D structure drawings as inline SVG from PubChem 2D coordinates (data/molecules/depict.json).
// Small molecules are drawn as full structural formulas (every atom labelled, "rumus bangun");
// larger ones as skeletal formulas (carbon at line ends and corners, heteroatoms labelled with their H).
import { esc } from '../core/dom.js';

const COLORS = {
  O: '#d9363e',
  N: '#2f6fd6',
  S: '#b88400',
  P: '#d9661c',
  F: '#2c9a4b',
  Cl: '#2c9a4b',
  Br: '#a63d40',
  I: '#7a4bd6',
  H: 'currentColor',
  C: 'currentColor',
};
const SUB = n => String(n).replace(/\d/g, d => '₀₁₂₃₄₅₆₇₈₉'[d]);
const FIRST_H = new Set(['O', 'S', 'Se', 'F', 'Cl', 'Br', 'I']);

function label(atom, heavyNeighbours, full) {
  const [el, , , q, h] = atom;
  const charge = q ? `${Math.abs(q) > 1 ? Math.abs(q) : ''}${q > 0 ? '+' : '−'}` : '';
  if (full) return { text: el, charge };
  if (el === 'C' && heavyNeighbours > 0 && !q) return null;
  const hs = h ? `H${h > 1 ? SUB(h) : ''}` : '';
  if (!heavyNeighbours && hs) return { text: FIRST_H.has(el) ? `${hs}${el}` : `${el}${hs}`, charge };
  return { text: `${el}${hs}`, charge };
}

/** Inline SVG for a depiction { a: atoms, b: bonds, full }. `title` becomes the accessible name. */
export function depictSVG(d, { title = '', size = 240 } = {}) {
  if (!d?.a?.length) return '';
  const xs = d.a.map(a => a[1]);
  const ys = d.a.map(a => -a[2]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const bondLen = d.b.length
    ? d.b.reduce((s, [p, q]) => s + Math.hypot(xs[p] - xs[q], ys[p] - ys[q]), 0) / d.b.length
    : 1;
  const unit = 30 / (bondLen || 1);
  const pad = 22;
  const w = Math.max(60, (maxX - minX) * unit + pad * 2);
  const h = Math.max(60, (maxY - minY) * unit + pad * 2);
  const X = i => (xs[i] - minX) * unit + pad;
  const Y = i => (ys[i] - minY) * unit + pad;
  const heavy = d.a.map(() => 0);
  for (const [p, q] of d.b) {
    if (d.a[q][0] !== 'H') heavy[p]++;
    if (d.a[p][0] !== 'H') heavy[q]++;
  }
  const labels = d.a.map((a, i) => label(a, heavy[i], d.full));
  const lines = d.b
    .map(([p, q, order]) => {
      let x1 = X(p);
      let y1 = Y(p);
      let x2 = X(q);
      let y2 = Y(q);
      const len = Math.hypot(x2 - x1, y2 - y1) || 1;
      const ux = (x2 - x1) / len;
      const uy = (y2 - y1) / len;
      // Leave room for atom labels at either end.
      if (labels[p]) {
        x1 += ux * 9;
        y1 += uy * 9;
      }
      if (labels[q]) {
        x2 -= ux * 9;
        y2 -= uy * 9;
      }
      const nx = -uy * 3.2;
      const ny = ux * 3.2;
      const seg = (o = 0) =>
        `<line x1="${(x1 + nx * o).toFixed(1)}" y1="${(y1 + ny * o).toFixed(1)}" x2="${(x2 + nx * o).toFixed(1)}" y2="${(y2 + ny * o).toFixed(1)}"/>`;
      if (order === 2) return seg(-0.6) + seg(0.6);
      if (order === 3) return seg(-1.1) + seg(0) + seg(1.1);
      return seg();
    })
    .join('');
  const texts = labels
    .map((l, i) =>
      l
        ? `<text x="${X(i).toFixed(1)}" y="${(Y(i) + 5).toFixed(1)}" fill="${COLORS[d.a[i][0]] || 'currentColor'}">${esc(l.text)}${l.charge ? `<tspan dy="-7" font-size="10">${l.charge}</tspan>` : ''}</text>`
        : ''
    )
    .join('');
  const scale = Math.min(1, size / Math.max(w, h));
  return `<svg class="depict" viewBox="0 0 ${w.toFixed(0)} ${h.toFixed(0)}" width="${Math.round(w * scale)}" height="${Math.round(h * scale)}" role="img" aria-label="${esc(title)}"><g class="bonds" stroke="currentColor" stroke-width="2" stroke-linecap="round">${lines}</g><g class="labels" font-size="15" font-weight="700" text-anchor="middle" font-family="system-ui, sans-serif">${texts}</g></svg>`;
}
