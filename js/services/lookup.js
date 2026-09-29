// Live PubChem lookup for whatever the user types: a name (Indonesian or English), IUPAC name, CAS number,
// molecular formula, CID, SMILES, InChI or InChIKey. Shared by the molecule explorer and the unified search.
import { identify } from './identify.js';
import { parseFormula, hill } from './formula.js';
import {
  autocomplete,
  cidByName,
  cidsByFormula,
  cidsByInchikey,
  cidsBySmiles,
  cidsByInchi,
} from './pubchem.js';
import { searchByLabel } from './wiki.js';

/** PubChem's formula search wants Hill notation; "CuSO4·5H2O" becomes "CuH10O9S". */
const hillOf = text => {
  const { counts, error } = parseFormula(text);
  return error ? text : hill(counts);
};

/**
 * Returns { kind, cids, labels, names }: kind is what the term was recognised as (see identify()),
 * cids are PubChem compound ids in rank order, labels maps a CID to its Wikidata label (Indonesian or
 * English) and names are PubChem autocomplete suggestions for plain names.
 */
export async function liveLookup(term, max = 16) {
  const id = identify(term);
  const labels = new Map();
  let cids = [];
  let names = [];
  switch (id.kind) {
    case 'empty':
    case 'nuclide':
      break;
    case 'cid':
      cids = [id.value];
      break;
    case 'cas': {
      const cid = await cidByName(id.value).catch(() => null);
      cids = cid ? [cid] : [];
      break;
    }
    case 'inchikey':
      cids = await cidsByInchikey(id.value);
      break;
    case 'inchi':
      cids = await cidsByInchi(id.value);
      break;
    case 'smiles': {
      const [bySmiles, byFormula] = await Promise.all([
        cidsBySmiles(id.value),
        id.alsoFormula ? cidsByFormula(hillOf(id.value), max) : [],
      ]);
      cids = [...bySmiles, ...byFormula];
      break;
    }
    case 'formula':
      cids = await cidsByFormula(hillOf(id.value), max);
      break;
    default: {
      const [byLabelId, byLabelEn, auto, exact] = await Promise.all([
        searchByLabel(id.value, 'id').catch(() => []),
        searchByLabel(id.value, 'en').catch(() => []),
        autocomplete(id.value, 8).catch(() => []),
        cidByName(id.value).catch(() => null),
      ]);
      for (const hit of [...byLabelId, ...byLabelEn])
        if (!labels.has(hit.cid)) labels.set(hit.cid, hit.label);
      cids = [...(exact ? [exact] : []), ...labels.keys()];
      names = auto;
    }
  }
  return { kind: id.kind, cids: [...new Set(cids)].slice(0, max * 2), labels, names };
}
