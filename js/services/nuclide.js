// Nuclide helpers for the isotope explorer, element pages and the half-life lab: decay-mode names, the daughter
// nuclide of a decay (Z and A bookkeeping only) and half-lives written in words. Data comes from
// data/isotopes.json and data/elements/<Z>.json (IAEA AMDC and IUPAC CIAAW via PubChem).
import { esc } from '../core/dom.js';
import { pick, num, lang } from '../core/prefs.js';
import { getElement } from '../data/periodicTable.js';

/** Decay modes as written by the AMDC, with the change in Z and A for the simple ones. */
export const DECAY = {
  'β-': {
    dz: 1,
    da: 0,
    name: ['Peluruhan beta minus (β⁻)', 'Beta-minus decay (β⁻)'],
    glossary: 'peluruhan-beta',
  },
  'β+': {
    dz: -1,
    da: 0,
    name: ['Peluruhan beta plus (β⁺)', 'Beta-plus decay (β⁺)'],
    glossary: 'peluruhan-beta',
  },
  ε: {
    dz: -1,
    da: 0,
    name: ['Penangkapan elektron (ε)', 'Electron capture (ε)'],
    glossary: 'penangkapan-elektron',
  },
  EC: { dz: -1, da: 0, name: ['Penangkapan elektron', 'Electron capture'], glossary: 'penangkapan-elektron' },
  α: { dz: -2, da: -4, name: ['Peluruhan alfa (α)', 'Alpha decay (α)'], glossary: 'peluruhan-alfa' },
  IT: {
    dz: 0,
    da: 0,
    name: ['Transisi isomerik (pancaran γ)', 'Isomeric transition (γ emission)'],
    glossary: 'sinar-gamma',
  },
  p: { dz: -1, da: -1, name: ['Emisi proton', 'Proton emission'] },
  '2p': { dz: -2, da: -2, name: ['Emisi dua proton', 'Two-proton emission'] },
  n: { dz: 0, da: -1, name: ['Emisi neutron', 'Neutron emission'] },
  '2n': { dz: 0, da: -2, name: ['Emisi dua neutron', 'Two-neutron emission'] },
  '2β-': { dz: 2, da: 0, name: ['Peluruhan beta ganda', 'Double beta decay'], glossary: 'peluruhan-beta' },
  '2β+': {
    dz: -2,
    da: 0,
    name: ['Peluruhan beta plus ganda', 'Double beta-plus decay'],
    glossary: 'peluruhan-beta',
  },
  'β-n': {
    dz: 1,
    da: -1,
    name: ['Beta minus diikuti emisi neutron', 'Beta-minus with neutron emission'],
    glossary: 'peluruhan-beta',
  },
  'β+p': {
    dz: -2,
    da: -1,
    name: ['Beta plus diikuti emisi proton', 'Beta-plus with proton emission'],
    glossary: 'peluruhan-beta',
  },
  SF: { dz: null, da: null, name: ['Fisi spontan', 'Spontaneous fission'], glossary: 'fisi' },
};
export const decayName = mode => pick(DECAY[mode]?.name || [mode, mode]);

/** The nuclide a decay mode leads to: { z, A, element } or null (fission and unusual modes). */
export function daughter(z, A, mode) {
  const d = DECAY[mode];
  if (!d || d.dz == null) return null;
  const e = getElement(z + d.dz);
  return e ? { z: z + d.dz, A: A + d.da, element: e } : null;
}

/** "¹⁴C", superscript mass number before the symbol. */
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
export const superscript = n => String(n).replace(/\d/g, d => SUP[d]);
export const nuclideLabel = (A, symbol) => `${superscript(A)}${symbol}`;
/** Nuclear notation as HTML: mass number above atomic number, left of the symbol (styled by .nuc in CSS). */
export const nucHTML = (A, Z, symbol) =>
  `<span class="nuc"><span class="nuc-idx"><sup>${esc(A)}</sup><sub>${esc(Z)}</sub></span>${esc(symbol)}</span>`;
/** Route id for a nuclide page: "C-14". */
export const nuclideId = (symbol, A) => `${symbol}-${A}`;
/** "C-14", "c14", "14C", "karbon-14", "carbon 14", "¹⁴C" → { element, A } or null. */
export function parseNuclide(text) {
  const t = String(text || '')
    .trim()
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, d => String(SUP.indexOf(d)));
  let m =
    t.match(/^([A-Za-z]{1,2})\s*[-–\s]?\s*(\d{1,3})$/) || t.match(/^([A-Za-zÀ-ÿ]{3,})\s*[-–\s]\s*(\d{1,3})$/);
  let sym;
  let A;
  if (m) [, sym, A] = m;
  else if ((m = t.match(/^(\d{1,3})\s*[-–]?\s*([A-Za-z]{1,2})$/))) [, A, sym] = m;
  else return null;
  const element = getElement(
    sym.length <= 2 ? sym.charAt(0).toUpperCase() + sym.slice(1).toLowerCase() : sym
  );
  A = Number(A);
  if (!element || A < element.z) return null;
  return { element, A };
}

const UNITS = {
  ys: ['yoktodetik', 'yoctoseconds', 1e-24],
  zs: ['zeptodetik', 'zeptoseconds', 1e-21],
  as: ['attodetik', 'attoseconds', 1e-18],
  fs: ['femtodetik', 'femtoseconds', 1e-15],
  ps: ['pikodetik', 'picoseconds', 1e-12],
  ns: ['nanodetik', 'nanoseconds', 1e-9],
  us: ['mikrodetik', 'microseconds', 1e-6],
  ms: ['milidetik', 'milliseconds', 1e-3],
  s: ['detik', 'seconds', 1],
  m: ['menit', 'minutes', 60],
  h: ['jam', 'hours', 3600],
  d: ['hari', 'days', 86400],
  y: ['tahun', 'years', 1],
  ky: ['ribu tahun', 'thousand years', 1e3],
  My: ['juta tahun', 'million years', 1e6],
  Gy: ['miliar tahun', 'billion years', 1e9],
  Ty: ['triliun tahun', 'trillion years', 1e12],
};

/**
 * Half-life text from the AMDC ("5.70 ky ± 0.03", "Stable", "Not-specified <110ns") in words:
 * "5,70 ribu tahun". The uncertainty is kept when `withError` is set.
 */
export function halfLifeText(raw, withError = false) {
  const t = String(raw || '').trim();
  if (!t || /^not-specified/i.test(t)) return pick(['Belum diketahui', 'Not known']);
  if (/^stable/i.test(t)) return pick(['Stabil', 'Stable']);
  const m = t.match(/^([<>~]?)\s*([\d.]+(?:[eE][-+]?\d+)?)\s*([a-zA-Zμ]+)\b(?:\s*±\s*([\d.]+))?/);
  if (!m) return t;
  const [, op, value, unit, err] = m;
  const u = UNITS[unit === 'μs' ? 'us' : unit];
  if (!u) return t;
  const words = lang() === 'en' ? u[1] : u[0];
  const big = ['Py', 'Ey', 'Zy', 'Yy'].includes(unit);
  const v = Number(value);
  const shown = big ? v.toExponential(2) : num(v, 4);
  return `${op}${shown} ${big ? `${unit}` : words}${withError && err ? ` ± ${num(Number(err), 4)}` : ''}`;
}

/** Half-life bands for filters and colouring. */
export function halfLifeBand(seconds, stable) {
  if (stable) return 'stable';
  if (seconds == null) return 'unknown';
  if (seconds < 1) return 'sub-second';
  if (seconds < 86400) return 'day';
  if (seconds < 3.15576e7 * 1000) return 'millennium';
  return 'long';
}
export const BANDS = {
  stable: ['Stabil', 'Stable'],
  long: ['> 1000 tahun', '> 1000 years'],
  millennium: ['1 hari – 1000 tahun', '1 day – 1000 years'],
  day: ['1 detik – 1 hari', '1 second – 1 day'],
  'sub-second': ['< 1 detik', '< 1 second'],
  unknown: ['Belum diketahui', 'Not known'],
};

/** A duration in seconds in words, for the half-life lab: 3 hari, 17 ribu tahun, 4,46 miliar tahun. */
export function durationText(seconds) {
  if (!Number.isFinite(seconds)) return '–';
  if (seconds === 0) return '0';
  const YEAR = 365.2422 * 86400;
  const steps = [
    [1e9 * YEAR, UNITS.Gy],
    [1e6 * YEAR, UNITS.My],
    [1e3 * YEAR, UNITS.ky],
    [YEAR, UNITS.y],
    [86400, UNITS.d],
    [3600, UNITS.h],
    [60, UNITS.m],
    [1, UNITS.s],
    [1e-3, UNITS.ms],
    [1e-6, UNITS.us],
  ];
  const [size, unit] = steps.find(([size]) => seconds >= size) || steps.at(-1);
  const v = seconds / size;
  return `${num(v, v < 10 ? 2 : v < 100 ? 1 : 0)} ${lang() === 'en' ? unit[1] : unit[0]}`;
}
