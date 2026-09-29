#!/usr/bin/env node
// Resolves every ion in js/data/ions.js to its PubChem record and checks it: the record's atoms and charge must
// equal the formula written in ions.js, otherwise the next candidate name is tried (and the ion is reported if
// none matches). Writes data/ions/<id>.json (identity, synonyms, description, 3D/2D structure) and
// data/ions/index.json. Usage: npm run sync:ions
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ROOT, get, mapLimit } from './lib/net.mjs';
import { IONS } from '../js/data/ions.js';
import { parseFormula } from '../js/services/formula.js';
import {
  PROPERTY_LIST,
  parseProperties,
  parseDescriptions,
  parseSynonyms,
  casFromSynonyms,
  parseSDF,
} from '../js/services/pugview.js';

const PUG = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug';
const outDir = join(ROOT, 'data', 'ions');
await mkdir(outDir, { recursive: true });

const sameCounts = (a, b) => {
  const ka = Object.keys(a).filter(k => a[k]);
  const kb = Object.keys(b).filter(k => b[k]);
  return ka.length === kb.length && ka.every(k => a[k] === b[k]);
};

/** PubChem formulas end with their charge ("O4S-2", "H4N+"); the charge itself comes from the Charge field. */
const countsOf = formula => parseFormula(String(formula).replace(/[+-]\d*$/, '')).counts || {};

async function resolve(ion) {
  const want = parseFormula(ion.f);
  for (const name of ion.q) {
    const found = await get(`${PUG}/compound/name/${encodeURIComponent(name)}/cids/JSON`);
    for (const cid of (found?.IdentifierList?.CID || []).slice(0, 5)) {
      const props = parseProperties(await get(`${PUG}/compound/cid/${cid}/property/${PROPERTY_LIST}/JSON`));
      if (props && props.charge === want.charge && sameCounts(countsOf(props.formula), want.counts))
        return { cid, props, name };
    }
  }
  return null;
}

const index = [];
const problems = [];
await mapLimit(IONS, 2, async ion => {
  if (ion.noRecord) return;
  const hit = await resolve(ion);
  if (!hit) {
    problems.push(
      `${ion.id} (${ion.f}): no PubChem record with this formula and charge for ${ion.q.join(' / ')}`
    );
    return;
  }
  const { cid, props } = hit;
  const [syn, desc] = await Promise.all([
    get(`${PUG}/compound/cid/${cid}/synonyms/JSON`),
    get(`${PUG}/compound/cid/${cid}/description/JSON`),
  ]);
  let structure = null;
  if (ion.poly) {
    const s3 = parseSDF(await get(`${PUG}/compound/cid/${cid}/record/SDF?record_type=3d`, { json: false }));
    const s2 = s3
      ? null
      : parseSDF(await get(`${PUG}/compound/cid/${cid}/record/SDF?record_type=2d`, { json: false }));
    structure = s3 ? { kind: '3d', ...s3 } : s2 ? { kind: '2d', ...s2 } : null;
  }
  const record = {
    id: ion.id,
    cid,
    props,
    cas: casFromSynonyms(syn),
    synonyms: parseSynonyms(syn),
    descriptions: parseDescriptions(desc),
    structure,
    synced: new Date().toISOString().slice(0, 10),
  };
  await writeFile(join(outDir, `${ion.id}.json`), JSON.stringify(record) + '\n');
  index.push({
    id: ion.id,
    cid,
    formula: props.formula,
    charge: props.charge,
    mw: props.mw,
    iupac: props.iupac || null,
  });
});

index.sort((a, b) => IONS.findIndex(i => i.id === a.id) - IONS.findIndex(i => i.id === b.id));
await writeFile(join(outDir, 'index.json'), JSON.stringify(index) + '\n');
for (const p of problems) console.warn('!', p);
console.log(
  `data/ions: ${index.length}/${IONS.length} ions matched to PubChem records (${IONS.filter(i => i.noRecord).length} have none)`
);
if (problems.length) process.exitCode = 1;
