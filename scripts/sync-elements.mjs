#!/usr/bin/env node
// Builds the periodic table from official open sources:
//   PubChem periodic table (NIH)       → js/data/periodicTable.js  (all 118 elements, bundled with the app)
//   Wikidata + Wikipedia (id, en) + Commons → data/elements/<Z>.json (lead text and a licensed photo)
// Usage: npm run sync:elements
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ROOT, get, sparql, commonsInfo, wikiIntro, mapLimit, fileFromCommonsURL } from './lib/net.mjs';

// Indonesian names following Kamus Besar Bahasa Indonesia and Indonesian school textbooks.
const NAMES_ID = `Hidrogen Helium Litium Berilium Boron Karbon Nitrogen Oksigen Fluorin Neon Natrium Magnesium
Aluminium Silikon Fosforus Belerang Klorin Argon Kalium Kalsium Skandium Titanium Vanadium Kromium Mangan Besi
Kobalt Nikel Tembaga Seng Galium Germanium Arsen Selenium Bromin Kripton Rubidium Stronsium Itrium Zirkonium
Niobium Molibdenum Teknesium Rutenium Rodium Paladium Perak Kadmium Indium Timah Antimon Telurium Iodin Xenon
Sesium Barium Lantanum Serium Praseodimium Neodimium Prometium Samarium Europium Gadolinium Terbium Disprosium
Holmium Erbium Tulium Iterbium Lutesium Hafnium Tantalum Wolfram Renium Osmium Iridium Platina Emas Raksa Talium
Timbal Bismut Polonium Astatin Radon Fransium Radium Aktinium Torium Protaktinium Uranium Neptunium Plutonium
Amerisium Kurium Berkelium Kalifornium Einsteinium Fermium Mendelevium Nobelium Lawrensium Rutherfordium Dubnium
Seaborgium Bohrium Hassium Meitnerium Darmstadtium Roentgenium Kopernisium Nihonium Flerovium Moskovium
Livermorium Tenesin Oganeson`.split(/\s+/);

const CATEGORY = {
  Nonmetal: 'nonmetal',
  'Noble gas': 'noble',
  'Alkali metal': 'alkali',
  'Alkaline earth metal': 'alkaline',
  Metalloid: 'metalloid',
  Halogen: 'halogen',
  'Post-transition metal': 'post',
  'Transition metal': 'transition',
  Lanthanide: 'lanthanide',
  Actinide: 'actinide',
};

const CORES = {
  He: '1s2',
  Ne: '[He]2s2 2p6',
  Ar: '[Ne]3s2 3p6',
  Kr: '[Ar]3d10 4s2 4p6',
  Xe: '[Kr]4d10 5s2 5p6',
  Rn: '[Xe]4f14 5d10 6s2 6p6',
};
function expand(conf) {
  let text = conf.replace(/\(.*?\)/g, ' ');
  for (let i = 0; i < 6 && /\[(\w+)\]/.test(text); i++)
    text = text.replace(/\[(\w+)\]/g, (_, core) => ` ${CORES[core] || ''} `);
  return [...text.matchAll(/(\d)([spdf])(\d+)/g)].map(m => ({ n: +m[1], l: m[2], e: +m[3] }));
}
// Madelung (aufbau) order, used when PubChem gives no configuration for a superheavy element.
const ORDER = '1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s 4f 5d 6p 7s 5f 6d 7p'.split(' ');
const CAP = { s: 2, p: 6, d: 10, f: 14 };
function aufbau(z) {
  const out = [];
  let left = z;
  for (const orb of ORDER) {
    if (left <= 0) break;
    const e = Math.min(CAP[orb[1]], left);
    out.push({ n: +orb[0], l: orb[1], e });
    left -= e;
  }
  return out;
}
function shells(z, conf) {
  let parts = expand(conf || '');
  if (parts.reduce((a, p) => a + p.e, 0) !== z) parts = aufbau(z);
  const out = [];
  for (const p of parts) out[p.n - 1] = (out[p.n - 1] || 0) + p.e;
  return Array.from(out, v => v || 0);
}

const PERIOD_START = [1, 3, 11, 19, 37, 55, 87];
function position(z) {
  let period = 7;
  for (let i = PERIOD_START.length - 1; i >= 0; i--)
    if (z >= PERIOD_START[i]) {
      period = i + 1;
      break;
    }
  const i = z - PERIOD_START[period - 1];
  let group = null;
  let x;
  let y = period;
  if (period === 1) group = z === 1 ? 1 : 18;
  else if (period <= 3) group = i < 2 ? i + 1 : i + 11;
  else if (period <= 5) group = i + 1;
  else if (i < 2) group = i + 1;
  else if (i <= 16) {
    // Lanthanides (La–Lu) and actinides (Ac–Lr) sit in the two rows under the main table.
    x = 3 + (i - 2);
    y = period === 6 ? 9 : 10;
  } else group = i - 14 + 1;
  if (group) x = group;
  const block = y >= 9 ? 'f' : group <= 2 || z === 2 ? 's' : group >= 13 ? 'p' : 'd';
  return { period, group, x, y, block };
}

const num = v => (v === '' || v == null || Number.isNaN(Number(v)) ? null : Number(v));

console.log('PubChem periodic table…');
const table = await get('https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON');
const cols = table.Table.Columns.Column;
const rows = table.Table.Row.map(r => Object.fromEntries(cols.map((c, i) => [c, r.Cell[i]])));
if (rows.length !== 118) throw new Error(`Expected 118 elements, got ${rows.length}`);

const elements = rows.map(r => {
  const z = Number(r.AtomicNumber);
  const pos = position(z);
  return {
    z,
    s: r.Symbol,
    en: r.Name,
    id: NAMES_ID[z - 1],
    m: num(r.AtomicMass),
    cpk: r.CPKHexColor ? `#${r.CPKHexColor.toLowerCase()}` : null,
    conf: r.ElectronConfiguration || '',
    shells: shells(z, r.ElectronConfiguration),
    eneg: num(r.Electronegativity),
    rad: num(r.AtomicRadius),
    ie: num(r.IonizationEnergy),
    ea: num(r.ElectronAffinity),
    ox: (r.OxidationStates || '').replace(/\s+/g, ' ').trim(),
    state: (r.StandardState || '').toLowerCase() || null,
    mp: num(r.MeltingPoint),
    bp: num(r.BoilingPoint),
    d: num(r.Density),
    cat: CATEGORY[r.GroupBlock] || 'unknown',
    year: /^\d+$/.test(r.YearDiscovered)
      ? Number(r.YearDiscovered)
      : r.YearDiscovered === 'Ancient'
        ? 0
        : null,
    ...pos,
  };
});

console.log('Wikidata items, photos and Wikipedia pages…');
const wd = await sparql(`SELECT ?el ?z ?img ?idwiki ?enwiki WHERE {
  ?el wdt:P31 wd:Q11344; wdt:P1086 ?z. FILTER(?z <= 118)
  OPTIONAL { ?el wdt:P18 ?img }
  OPTIONAL { ?idwiki schema:about ?el; schema:isPartOf <https://id.wikipedia.org/> }
  OPTIONAL { ?enwiki schema:about ?el; schema:isPartOf <https://en.wikipedia.org/> }
}`);
const byZ = new Map();
for (const b of wd.results.bindings) {
  const z = Number(b.z.value);
  if (byZ.has(z)) continue;
  const title = url => (url ? decodeURIComponent(url.split('/wiki/')[1]).replace(/_/g, ' ') : null);
  byZ.set(z, {
    qid: b.el.value.split('/').pop(),
    image: fileFromCommonsURL(b.img?.value),
    idwiki: title(b.idwiki?.value),
    enwiki: title(b.enwiki?.value),
  });
}
const photos = await commonsInfo([...byZ.values()].map(v => v.image));

const outDir = join(ROOT, 'data', 'elements');
await mkdir(outDir, { recursive: true });
let withPhoto = 0;
await mapLimit(elements, 4, async el => {
  const w = byZ.get(el.z) || {};
  const [wid, wen] = await Promise.all([
    wikiIntro('id', w.idwiki || el.id),
    wikiIntro('en', w.enwiki || el.en),
  ]);
  const photo = w.image ? photos.get(w.image) || null : null;
  if (photo) withPhoto++;
  await writeFile(
    join(outDir, `${el.z}.json`),
    JSON.stringify({ z: el.z, qid: w.qid || null, wiki: { id: wid, en: wen }, photo }, null, 1) + '\n'
  );
});

const header = `// GENERATED by scripts/sync-elements.mjs from the PubChem periodic table (NIH). Do not edit by hand:
// run \`npm run sync:elements\`. Units: mass u · radius pm · ionisation & affinity eV · mp/bp K · density g/cm³.
// Fields: z number · s symbol · en/id names · cpk colour · conf configuration · shells electrons per shell ·
// eneg Pauling electronegativity · ox oxidation states · state at 25 °C · cat category · year discovered (0 = ancient) ·
// x,y table column/row (rows 9–10 are the lanthanide and actinide rows) · block s/p/d/f · group · period.
`;
const body = `export const ELEMENTS = [\n${elements.map(e => `  ${JSON.stringify(e)},`).join('\n')}\n];\n`;
const helpers = `
export const CATEGORIES = {
  alkali: { name: ['Logam alkali', 'Alkali metal'], color: '#e8663d' },
  alkaline: { name: ['Logam alkali tanah', 'Alkaline earth metal'], color: '#e9a23b' },
  transition: { name: ['Logam transisi', 'Transition metal'], color: '#d4b83a' },
  post: { name: ['Logam pascatransisi', 'Post-transition metal'], color: '#7fb069' },
  metalloid: { name: ['Metaloid', 'Metalloid'], color: '#3fb5a3' },
  nonmetal: { name: ['Nonlogam', 'Nonmetal'], color: '#4a9fe0' },
  halogen: { name: ['Halogen', 'Halogen'], color: '#7c7fe8' },
  noble: { name: ['Gas mulia', 'Noble gas'], color: '#b36fd6' },
  lanthanide: { name: ['Lantanida', 'Lanthanide'], color: '#e06fa8' },
  actinide: { name: ['Aktinida', 'Actinide'], color: '#d45d6f' },
  unknown: { name: ['Belum diketahui', 'Unknown properties'], color: '#8a94a6' },
};

const bySymbol = new Map(ELEMENTS.map(e => [e.s.toLowerCase(), e]));

/** Finds an element by atomic number, symbol, or English/Indonesian name. */
export function getElement(key) {
  if (key == null) return null;
  if (typeof key === 'number' || /^\\d+$/.test(String(key))) return ELEMENTS[Number(key) - 1] || null;
  const q = String(key).trim().toLowerCase();
  return bySymbol.get(q) || ELEMENTS.find(e => e.en.toLowerCase() === q || e.id.toLowerCase() === q) || null;
}

/** Exact symbol lookup (case-sensitive, as used in formulas). */
export const elementBySymbol = symbol => {
  const e = bySymbol.get(String(symbol).toLowerCase());
  return e && e.s === symbol ? e : null;
};
`;
await writeFile(join(ROOT, 'js', 'data', 'periodicTable.js'), header + body + helpers);
console.log(`periodicTable.js: ${elements.length} elements · ${withPhoto} photos · data/elements/*.json`);
