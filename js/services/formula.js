// Chemical formula tools: parsing (brackets, hydrates, charges), molar mass, composition, Hill order,
// pretty printing and exact equation balancing. Pure functions (tested in tests/test-runner.mjs).
import { elementBySymbol } from '../data/periodicTable.js';

const SUB = '₀₁₂₃₄₅₆₇₈₉';
const SUP = {
  '⁰': '0',
  '¹': '1',
  '²': '2',
  '³': '3',
  '⁴': '4',
  '⁵': '5',
  '⁶': '6',
  '⁷': '7',
  '⁸': '8',
  '⁹': '9',
  '⁺': '+',
  '⁻': '-',
};

/** Normalises unicode sub/superscripts, hydrate dots and spaces. */
function tidy(input) {
  return (
    String(input || '')
      .replace(/[₀-₉]/g, d => SUB.indexOf(d))
      // Superscript or space-separated charges become explicit: "SO₄²⁻" and "SO4 2-" → "SO4^2-".
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]*[⁺⁻]$/, m => `^${[...m].map(c => SUP[c]).join('')}`)
      .replace(/\s+(\d*[+-])$/, '^$1')
      .replace(/[·•∙*]/g, '.')
      .replace(/\s+/g, '')
  );
}

/**
 * Parses a formula such as "Ca(OH)2", "CuSO4·5H2O", "[Cu(NH3)4]SO4" or "NH4+".
 * Returns { counts: {El: n}, charge } or { error } with a readable message.
 */
export function parseFormula(input) {
  let text = tidy(input);
  if (!text) return { error: 'empty' };
  let charge = 0;
  // A charge is "^2-" / "^+" or a bare trailing sign ("NH4+": the 4 is a subscript).
  const chargeMatch = text.match(/\^(\d*)([+-])$/) || text.match(/()([+-])$/);
  if (chargeMatch && !/^[+-]$/.test(text)) {
    charge = (chargeMatch[2] === '+' ? 1 : -1) * (chargeMatch[1] ? Number(chargeMatch[1]) : 1);
    text = text.slice(0, -chargeMatch[0].length);
  }
  const counts = {};
  for (const part of text.split('.')) {
    if (!part) return { error: 'syntax' };
    const lead = part.match(/^(\d+)(?=[A-Z([])/);
    const factor = lead ? Number(lead[1]) : 1;
    const body = lead ? part.slice(lead[1].length) : part;
    const result = parseGroup(body);
    if (result.error) return result;
    for (const [el, n] of Object.entries(result.counts)) counts[el] = (counts[el] || 0) + n * factor;
  }
  return { counts, charge };
}

function parseGroup(text) {
  const stack = [{}];
  const closers = [];
  let i = 0;
  while (i < text.length) {
    const c = text[i];
    if (c === '(' || c === '[') {
      stack.push({});
      closers.push(c === '(' ? ')' : ']');
      i++;
    } else if (c === ')' || c === ']') {
      if (closers.pop() !== c) return { error: 'brackets' };
      i++;
      const m = text.slice(i).match(/^\d+/);
      const n = m ? Number(m[0]) : 1;
      if (m) i += m[0].length;
      const inner = stack.pop();
      const top = stack[stack.length - 1];
      for (const [el, k] of Object.entries(inner)) top[el] = (top[el] || 0) + k * n;
    } else if (/[A-Z]/.test(c)) {
      const m = text.slice(i).match(/^([A-Z][a-z]?)(\d*)/);
      let symbol = m[1];
      let consumed = m[0].length;
      // "Co" vs "C"+"O": prefer the two-letter symbol only when it exists.
      if (symbol.length === 2 && !elementBySymbol(symbol)) {
        symbol = symbol[0];
        consumed = 1;
        const d = text.slice(i + 1).match(/^\d+/);
        if (d) consumed += d[0].length;
      }
      if (!elementBySymbol(symbol)) return { error: 'element', symbol };
      const digits = text.slice(i + symbol.length, i + consumed);
      const n = digits ? Number(digits) : 1;
      const top = stack[stack.length - 1];
      top[symbol] = (top[symbol] || 0) + n;
      i += consumed;
    } else {
      return { error: 'syntax', at: c };
    }
  }
  if (closers.length) return { error: 'brackets' };
  if (!Object.keys(stack[0]).length) return { error: 'empty' };
  return { counts: stack[0] };
}

export function molarMass(counts) {
  let total = 0;
  for (const [el, n] of Object.entries(counts)) total += (elementBySymbol(el)?.m || 0) * n;
  return total;
}

/** Mass percentage of each element, largest first. */
export function composition(counts) {
  const total = molarMass(counts);
  return Object.entries(counts)
    .map(([el, n]) => {
      const mass = (elementBySymbol(el)?.m || 0) * n;
      return { el, n, mass, pct: total ? (mass / total) * 100 : 0 };
    })
    .sort((a, b) => b.pct - a.pct);
}

/** Hill notation: C, then H, then alphabetical (alphabetical when there is no carbon). */
export function hill(counts) {
  const keys = Object.keys(counts);
  const hasC = keys.includes('C');
  const order = keys.sort((a, b) => {
    if (hasC) {
      if (a === 'C') return -1;
      if (b === 'C') return 1;
      if (a === 'H') return -1;
      if (b === 'H') return 1;
    }
    return a.localeCompare(b);
  });
  return order.map(el => `${el}${counts[el] > 1 ? counts[el] : ''}`).join('');
}

export const totalAtoms = counts => Object.values(counts).reduce((a, b) => a + b, 0);

/** "C6H12O6" → "C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>"; trailing charges become superscripts. */
export function formulaHTML(formula) {
  const text = tidy(formula);
  let charge = '';
  const m = text.match(/\^(\d*[+-])$/) || text.match(/()([+-])$/);
  let body = text;
  if (m && body.length > m[0].length) {
    charge = (m[1] || m[2]).replace('-', '−');
    body = body.slice(0, -m[0].length);
  }
  const html = body
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/(^|\.)(\d+)/g, '$1<span class="coef">$2</span>')
    .replace(/([A-Za-z)\]])(\d+)/g, '$1<sub>$2</sub>')
    .replace(/\./g, '·');
  return charge ? `${html}<sup>${charge}</sup>` : html;
}

/** Plain text with unicode subscripts, for places where HTML is not allowed (titles, speech). */
export const formulaUnicode = formula =>
  tidy(formula).replace(/([A-Za-z)\]])(\d+)/g, (_, a, d) => a + [...d].map(x => SUB[x]).join(''));

// ---------- Equation balancing ----------
const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
};
const frac = (n, d = 1) => {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d) || 1;
  return [n / g, d / g];
};
const sub = (a, b) => frac(a[0] * b[1] - b[0] * a[1], a[1] * b[1]);
const mul = (a, b) => frac(a[0] * b[0], a[1] * b[1]);
const div = (a, b) => frac(a[0] * b[1], a[1] * b[0]);

/** Splits "2H2 + O2 -> 2H2O" (also →, =) into formulas, dropping any typed coefficients. */
export function parseEquation(text) {
  const sides = String(text).split(/->|→|⟶|=+>?|⇌/);
  if (sides.length !== 2) return { error: 'arrow' };
  const species = side =>
    side
      .split(/\s\+\s|\s\+|\+\s|(?<=[A-Za-z0-9)\]])\+(?=\d*[A-Z([])/)
      .map(s => s.trim().replace(/^\d+(?=[A-Z([])/, ''))
      .filter(Boolean);
  const reactants = species(sides[0]);
  const products = species(sides[1]);
  if (!reactants.length || !products.length) return { error: 'empty' };
  return { reactants, products };
}

/**
 * Smallest whole-number coefficients that conserve every element (and charge).
 * Returns { coefficients } or { error: 'unbalanceable' | 'ambiguous' | 'element' ... }.
 */
export function balance(reactants, products) {
  const species = [...reactants, ...products];
  const parsed = species.map(parseFormula);
  const bad = parsed.find(p => p.error);
  if (bad) return bad;
  const elements = [...new Set(parsed.flatMap(p => Object.keys(p.counts)))];
  const rows = elements.map(el =>
    parsed.map((p, j) => frac((p.counts[el] || 0) * (j < reactants.length ? 1 : -1)))
  );
  if (parsed.some(p => p.charge))
    rows.push(parsed.map((p, j) => frac(p.charge * (j < reactants.length ? 1 : -1))));
  const n = species.length;
  // Reduced row echelon form.
  const pivots = [];
  let r = 0;
  for (let c = 0; c < n && r < rows.length; c++) {
    const p = rows.findIndex((row, i) => i >= r && row[c][0] !== 0);
    if (p < 0) continue;
    [rows[r], rows[p]] = [rows[p], rows[r]];
    const lead = rows[r][c];
    rows[r] = rows[r].map(v => div(v, lead));
    for (let i = 0; i < rows.length; i++) {
      if (i === r || rows[i][c][0] === 0) continue;
      const f = rows[i][c];
      rows[i] = rows[i].map((v, k) => sub(v, mul(f, rows[r][k])));
    }
    pivots.push(c);
    r++;
  }
  const free = [...Array(n).keys()].filter(c => !pivots.includes(c));
  if (free.length === 0) return { error: 'unbalanceable' };
  if (free.length > 1) return { error: 'ambiguous' };
  const x = new Array(n).fill(null);
  x[free[0]] = frac(1);
  pivots.forEach((c, i) => (x[c] = mul(frac(-1), rows[i][free[0]])));
  const lcm = x.reduce((acc, v) => (acc * v[1]) / gcd(acc, v[1]), 1);
  let ints = x.map(v => (v[0] * lcm) / v[1]);
  if (ints.every(v => v <= 0)) ints = ints.map(v => -v);
  if (ints.some(v => v <= 0)) return { error: 'unbalanceable' };
  const g = ints.reduce((a, b) => gcd(a, b));
  return { coefficients: ints.map(v => v / g) };
}

/** Atom counts on each side for given coefficients: { el: [left, right] }. */
export function atomTally(reactants, products, coefficients) {
  const tally = {};
  const add = (list, offset, side) =>
    list.forEach((f, i) => {
      const p = parseFormula(f);
      if (p.error) return;
      for (const [el, n] of Object.entries(p.counts)) {
        tally[el] ||= [0, 0];
        tally[el][side] += n * (coefficients[offset + i] || 0);
      }
    });
  add(reactants, 0, 0);
  add(products, reactants.length, 1);
  return tally;
}
