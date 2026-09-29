#!/usr/bin/env node
// Fetches the open reference data for every molecule in the catalogue (js/data/curatedMolecules.js):
//   PubChem PUG REST  → computed properties, synonyms, descriptions, 3D (or 2D) coordinates
//   PubChem PUG View  → experimental properties, GHS hazards, uses
//   Wikidata          → the matching item (by PubChem CID, or by name for materials and polymers)
//   Wikipedia id / en → the lead section · Wikimedia Commons → a licensed photo and its credit
// Writes data/molecules/<id>.json, data/molecules/index.json and data/classes.json.
// Usage: npm run sync:molecules [-- --only water,caffeine]
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ROOT, get, sparql, commonsInfo, wikiIntro, mapLimit, fileFromCommonsURL } from './lib/net.mjs';
import { MOLECULES } from '../js/data/curatedMolecules.js';
import { CLASSES } from '../js/data/classes.js';
import {
  PROPERTY_LIST,
  parseProperties,
  parseExperimental,
  parseGHS,
  parseUses,
  parseDescriptions,
  parseSynonyms,
  casFromSynonyms,
  parseSDF,
} from '../js/services/pugview.js';

const PUG = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug';
const VIEW = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound';
const only = process.argv.includes('--only')
  ? process.argv[process.argv.indexOf('--only') + 1].split(',')
  : null;
const list = only ? MOLECULES.filter(m => only.includes(m.id)) : MOLECULES;
const outDir = join(ROOT, 'data', 'molecules');
await mkdir(outDir, { recursive: true });

// Entries whose PubChem record describes something else (a monomer, the element) than the card itself.
const firstHolder = new Map();
for (const m of MOLECULES) if (!firstHolder.has(m.cid)) firstHolder.set(m.cid, m.id);
function subject(m) {
  if (m.poly) return 'monomer';
  if (firstHolder.get(m.cid) !== m.id) return m.lattice ? 'element' : 'shared';
  return 'self';
}
const stripName = s => s.replace(/\s*\(.*?\)\s*/g, ' ').trim();
/** Article titles to try when Wikidata has no sitelink: "Gas hidrogen (H₂)" → "Gas hidrogen", "Hidrogen". */
function nameCandidates(name) {
  const base = stripName(name);
  const inside = name.match(/\(([^)]+)\)/)?.[1];
  return [
    base,
    base.replace(/^(Gas|L-|D-|α-|β-)\s*/i, ''),
    inside && !/[₀-₉]/.test(inside) ? inside : null,
  ].filter(Boolean);
}
async function firstIntro(lang, titles) {
  for (const t of [...new Set(titles.filter(Boolean))]) {
    const found = await wikiIntro(lang, t);
    if (found) return found;
  }
  return null;
}

/**
 * Compact 2D drawing data from a PubChem 2D record: [[el, x, y, charge, hCount]], [[a, b, order]].
 * Small molecules (≤ 6 heavy atoms) keep every H as a drawn atom (full structural formula);
 * larger ones drop H and remember how many sit on each atom (skeletal formula).
 */
function depiction({ atoms, bonds }) {
  const heavy = atoms.filter(a => a[0] !== 'H').length;
  const keepH = heavy <= 6 || heavy === 0;
  const hOn = new Array(atoms.length).fill(0);
  for (const [a, b] of bonds) {
    if (atoms[a][0] === 'H' && atoms[b][0] !== 'H') hOn[b]++;
    if (atoms[b][0] === 'H' && atoms[a][0] !== 'H') hOn[a]++;
  }
  const keep = atoms.map(a => keepH || a[0] !== 'H');
  const map = new Map();
  const outAtoms = [];
  atoms.forEach((a, i) => {
    if (!keep[i]) return;
    map.set(i, outAtoms.length);
    outAtoms.push([
      a[0],
      Math.round(a[1] * 100) / 100,
      Math.round(a[2] * 100) / 100,
      a[4] || 0,
      keepH ? 0 : hOn[i],
    ]);
  });
  const outBonds = bonds
    .filter(([a, b]) => keep[a] && keep[b])
    .map(([a, b, o]) => [map.get(a), map.get(b), o]);
  return { a: outAtoms, b: outBonds, full: keepH ? 1 : 0 };
}

// ---------- Wikidata: items by PubChem CID ----------
console.log(`Wikidata items for ${list.length} molecules…`);
const wdByCid = new Map();
const cids = [...new Set(list.filter(m => subject(m) === 'self').map(m => m.cid))];
for (let i = 0; i < cids.length; i += 120) {
  const values = cids
    .slice(i, i + 120)
    .map(c => `"${c}"`)
    .join(' ');
  const res = await sparql(`SELECT ?item ?cid ?img ?idwiki ?enwiki WHERE {
    VALUES ?cid { ${values} } ?item wdt:P662 ?cid.
    OPTIONAL { ?item wdt:P18 ?img }
    OPTIONAL { ?idwiki schema:about ?item; schema:isPartOf <https://id.wikipedia.org/> }
    OPTIONAL { ?enwiki schema:about ?item; schema:isPartOf <https://en.wikipedia.org/> }
  }`);
  for (const b of res?.results?.bindings || []) {
    const cid = Number(b.cid.value);
    const row = {
      qid: b.item.value.split('/').pop(),
      image: fileFromCommonsURL(b.img?.value),
      idwiki: b.idwiki ? decodeURIComponent(b.idwiki.value.split('/wiki/')[1]).replace(/_/g, ' ') : null,
      enwiki: b.enwiki ? decodeURIComponent(b.enwiki.value.split('/wiki/')[1]).replace(/_/g, ' ') : null,
    };
    const prev = wdByCid.get(cid);
    const score = r => (r.enwiki ? 2 : 0) + (r.idwiki ? 1 : 0) + (r.image ? 1 : 0);
    if (!prev || score(row) > score(prev)) wdByCid.set(cid, row);
  }
}

// Materials, polymers and allotropes: find the Wikipedia article by the card's English name instead.
async function wikidataByName(m) {
  const search = await get(
    `https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language=en&type=item&limit=1&search=${encodeURIComponent(stripName(m.name[1]))}`
  );
  const qid = search?.search?.[0]?.id;
  if (!qid) return {};
  const res = await sparql(`SELECT ?img ?idwiki ?enwiki WHERE {
    OPTIONAL { wd:${qid} wdt:P18 ?img }
    OPTIONAL { ?idwiki schema:about wd:${qid}; schema:isPartOf <https://id.wikipedia.org/> }
    OPTIONAL { ?enwiki schema:about wd:${qid}; schema:isPartOf <https://en.wikipedia.org/> }
  } LIMIT 1`);
  const b = res?.results?.bindings?.[0] || {};
  return {
    qid,
    image: fileFromCommonsURL(b.img?.value),
    idwiki: b.idwiki ? decodeURIComponent(b.idwiki.value.split('/wiki/')[1]).replace(/_/g, ' ') : null,
    enwiki: b.enwiki ? decodeURIComponent(b.enwiki.value.split('/wiki/')[1]).replace(/_/g, ' ') : null,
  };
}

const wd = new Map();
await mapLimit(list, 2, async m => {
  wd.set(
    m.id,
    subject(m) === 'self' ? wdByCid.get(m.cid) || (await wikidataByName(m)) : await wikidataByName(m)
  );
});
const photos = await commonsInfo([...wd.values()].map(w => w?.image));

// ---------- PubChem, per molecule ----------
console.log('PubChem records, Wikipedia and photos…');
const index = [];
const depictions = {};
let n3d = 0;
let nPhoto = 0;
const warnings = [];
await mapLimit(list, 3, async (m, i) => {
  const [propsJson, synJson, descJson, expJson, ghsJson, usesJson] = await Promise.all([
    get(`${PUG}/compound/cid/${m.cid}/property/${PROPERTY_LIST}/JSON`),
    get(`${PUG}/compound/cid/${m.cid}/synonyms/JSON`),
    get(`${PUG}/compound/cid/${m.cid}/description/JSON`),
    get(`${VIEW}/${m.cid}/JSON?heading=Experimental+Properties`),
    get(`${VIEW}/${m.cid}/JSON?heading=GHS+Classification`),
    get(`${VIEW}/${m.cid}/JSON?heading=Uses`),
  ]);
  const props = parseProperties(propsJson);
  if (!props) {
    warnings.push(`${m.id}: no PubChem record for CID ${m.cid}`);
    return;
  }
  const sdf2d = parseSDF(
    await get(`${PUG}/compound/cid/${m.cid}/record/SDF?record_type=2d`, { json: false })
  );
  if (sdf2d) depictions[m.id] = depiction(sdf2d);
  let structure = null;
  if (!m.lattice) {
    const sdf3d = await get(`${PUG}/compound/cid/${m.cid}/record/SDF?record_type=3d`, { json: false });
    const parsed3d = parseSDF(sdf3d);
    if (parsed3d) {
      structure = { kind: '3d', ...parsed3d };
      n3d++;
    } else if (sdf2d) {
      structure = { kind: '2d', ...sdf2d };
    }
  }

  const w = wd.get(m.id) || {};
  const [wid, wen] = await Promise.all([
    firstIntro('id', [w.idwiki, ...nameCandidates(m.name[0])]),
    firstIntro('en', [w.enwiki, ...nameCandidates(m.name[1]), props.title]),
  ]);
  const photo = w.image ? photos.get(w.image) || null : null;
  if (photo) {
    photo.kind = /\.svg$/i.test(photo.file) ? 'diagram' : 'photo';
    nPhoto++;
  }

  const record = {
    id: m.id,
    cid: m.cid,
    subject: subject(m),
    props,
    cas: casFromSynonyms(synJson),
    synonyms: parseSynonyms(synJson),
    descriptions: parseDescriptions(descJson),
    experimental: parseExperimental(expJson),
    ghs: parseGHS(ghsJson),
    uses: parseUses(usesJson),
    structure,
    wikidata: w.qid || null,
    wiki: { id: wid, en: wen },
    photo,
    synced: new Date().toISOString().slice(0, 10),
  };
  await writeFile(join(outDir, `${m.id}.json`), JSON.stringify(record) + '\n');
  index.push({
    id: m.id,
    cid: m.cid,
    formula: props.formula,
    mw: props.mw,
    iupac: props.iupac || null,
    cas: record.cas || null,
    inchikey: props.inchikey || null,
    s: structure?.kind || (m.lattice ? 'lattice' : null),
    photo: photo?.kind === 'photo' ? photo.thumb : null,
    ghs: record.ghs?.pictograms?.map(p => p.code) || [],
  });
  if ((i + 1) % 25 === 0) console.log(`  ${i + 1}/${list.length}`);
});

if (!only) {
  index.sort((a, b) => MOLECULES.findIndex(m => m.id === a.id) - MOLECULES.findIndex(m => m.id === b.id));
  await writeFile(join(outDir, 'index.json'), JSON.stringify(index) + '\n');
  const ordered = Object.fromEntries(
    MOLECULES.filter(m => depictions[m.id]).map(m => [m.id, depictions[m.id]])
  );
  await writeFile(join(outDir, 'depict.json'), JSON.stringify(ordered) + '\n');

  // ---------- More real members of each class, straight from PubChem ----------
  console.log('Class members from PubChem substructure search…');
  const curated = new Set(MOLECULES.map(m => m.cid));
  const classes = {};
  for (const c of CLASSES.filter(c => c.smarts)) {
    const found = await get(
      `${PUG}/compound/fastsubstructure/smarts/${encodeURIComponent(c.smarts)}/cids/JSON?MaxRecords=60`
    );
    const ids = (found?.IdentifierList?.CID || []).filter(id => !curated.has(id)).slice(0, 40);
    if (!ids.length) continue;
    const table = await get(
      `${PUG}/compound/cid/${ids.join(',')}/property/Title,MolecularFormula,MolecularWeight/JSON`
    );
    classes[c.id] = (table?.PropertyTable?.Properties || [])
      // Keep compounds with a real name rather than a registry code or a long systematic name.
      .filter(p => p.Title && p.Title.length <= 32 && !/^\d|^[A-Z]{2,}\d|\[/.test(p.Title))
      .slice(0, 24)
      .map(p => ({ cid: p.CID, title: p.Title, formula: p.MolecularFormula, mw: Number(p.MolecularWeight) }));
  }
  await writeFile(join(ROOT, 'data', 'classes.json'), JSON.stringify(classes) + '\n');
}

for (const w of warnings) console.warn('!', w);
console.log(
  `data/molecules: ${index.length} records · ${n3d} with PubChem 3D · ${nPhoto} with Commons images`
);
