// Recognises what a search term is: a PubChem CID, CAS number, InChI, InChIKey, SMILES, molecular formula,
// nuclide ("C-14") or plain name. Used by the unified search and the molecule explorer to pick PubChem lookups.
import { parseFormula } from './formula.js';
import { parseNuclide } from './nuclide.js';
import { S } from '../core/prefs.js';

export const CAS = /^\d{2,7}-\d{2}-\d$/;
export const INCHIKEY = /^[A-Z]{14}-[A-Z]{10}-[A-Z]$/;
export const INCHI = /^InChI=1S?\//;

/** CAS check digit: sum of digits × position (from the right, excluding the check digit) mod 10. */
export function validCAS(text) {
  if (!CAS.test(text)) return false;
  const digits = text.replace(/-/g, '');
  const check = Number(digits.at(-1));
  const body = digits.slice(0, -1).split('').reverse();
  return body.reduce((sum, d, i) => sum + Number(d) * (i + 1), 0) % 10 === check;
}

/**
 * Patterns that only appear in SMILES: bonds, stereo marks, bracket atoms, a leading aromatic ring atom ("c1ccccc1"),
 * or a branch not followed by a count ("CC(C)O"; formulas always write "(OH)2").
 */
const SMILES_ONLY = /[=#@/\\[\]]|^[cnops]\d|\)(?!\d)/;
const SMILES_CHARS = /^[A-Za-z0-9@+\-[\]()=#$/\\%.:*·]+$/;
/** Aromatic ring atoms with ring-closure digits, e.g. "Oc1ccccc1". */
const AROMATIC_RING = /[cnops]\d.*[cnops]{2}/;

/**
 * Returns { kind, value } where kind is one of: cid, cas, inchikey, inchi, smiles, formula, nuclide, name.
 * Ambiguous strings such as "CCO" (a valid SMILES that also parses as a formula) get kind 'smiles' with
 * `alsoFormula: true`, so callers can try both.
 */
export function identify(raw) {
  const q = String(raw || '').trim();
  if (!q) return { kind: 'empty', value: q };
  if (/^\d{1,10}$/.test(q)) return { kind: 'cid', value: Number(q) };
  if (CAS.test(q)) return { kind: 'cas', value: q, valid: validCAS(q) };
  if (INCHIKEY.test(q)) return { kind: 'inchikey', value: q };
  if (INCHI.test(q)) return { kind: 'inchi', value: q };
  const nuclide = parseNuclide(q);
  // "C-14", "14C", "karbon-14" are nuclides; "H2" or "O2" are formulas.
  if (nuclide && (/[-\s]/.test(q) || /^\d/.test(q) || /[a-zA-Z]{3,}/.test(q)))
    return { kind: 'nuclide', value: nuclide };
  if (!/\s/.test(q) && SMILES_CHARS.test(q)) {
    const parsed = !parseFormula(q).error;
    const formulaLike =
      parsed && /^[A-Z][A-Za-z0-9().·]*$/.test(q) && (/\d/.test(q) || /[A-Z].*[A-Z]/.test(q));
    if (SMILES_ONLY.test(q)) return { kind: 'smiles', value: q, alsoFormula: false };
    if (/^[BCNOSPFI]+$/.test(q) && q.length >= 2 && /C/.test(q))
      return { kind: 'smiles', value: q, alsoFormula: formulaLike };
    if (formulaLike) return { kind: 'formula', value: q };
    if (!parsed && AROMATIC_RING.test(q)) return { kind: 'smiles', value: q, alsoFormula: false };
  }
  return { kind: 'name', value: q };
}

const KINDS = S({
  cid: ['nomor CID PubChem', 'a PubChem CID'],
  cas: ['nomor CAS', 'a CAS number'],
  inchikey: ['InChIKey', 'an InChIKey'],
  inchi: ['InChI', 'an InChI'],
  smiles: ['SMILES', 'a SMILES string'],
  formula: ['rumus molekul', 'a molecular formula'],
  nuclide: ['nuklida (isotop)', 'a nuclide (isotope)'],
  name: ['nama', 'a name'],
});
export const kindLabel = kind => (kind in KINDS ? KINDS[kind] : kind);
