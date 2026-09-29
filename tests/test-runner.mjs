// Unit and integration tests that run in Node without a browser: chemistry logic, PubChem parsers,
// crystal models, the security policy and the production server. Run: npm run test:unit
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  parseFormula,
  molarMass,
  hill,
  composition,
  balance,
  parseEquation,
  atomTally,
  formulaHTML,
  formulaUnicode,
} from '../js/services/formula.js';
import { identify, validCAS } from '../js/services/identify.js';
import { parseNuclide, nuclideLabel, daughter, halfLifeBand, durationText } from '../js/services/nuclide.js';
import { parseHalfLife, parseDecay } from '../js/services/elementview.js';
import { reference } from '../js/data/references.js';
import { LIBRARY, NUCLEAR } from '../js/data/reactionLibrary.js';
import { IONS } from '../js/data/ions.js';
import {
  parseSDF,
  parseGHS,
  parseExperimental,
  parseUses,
  parseSynonyms,
  casFromSynonyms,
} from '../js/services/pugview.js';
import { buildLattice } from '../js/services/lattice.js';
import { ELEMENTS, getElement } from '../js/data/periodicTable.js';
import {
  MOLECULES,
  getMolecule,
  getMoleculeByCid,
  searchCatalog,
  normalize,
} from '../js/data/curatedMolecules.js';
import { route } from '../server/policy.mjs';
import { depictSVG } from '../js/components/depict.js';
import { subshells, valenceOf } from '../js/components/bohr.js';
import { phAt } from '../js/labs/titrasi.js';
import { phOf } from '../js/labs/ph.js';
import { safeURL } from '../js/core/dom.js';

const close = (a, b, tol = 0.01) => assert.ok(Math.abs(a - b) <= tol, `${a} ≈ ${b}`);

test('formulas: brackets, hydrates, charges and molar mass', () => {
  assert.deepEqual(parseFormula('Ca(OH)2').counts, { Ca: 1, O: 2, H: 2 });
  assert.deepEqual(parseFormula('CuSO4·5H2O').counts, { Cu: 1, S: 1, O: 9, H: 10 });
  assert.deepEqual(parseFormula('[Cu(NH3)4]SO4').counts, { Cu: 1, N: 4, H: 12, S: 1, O: 4 });
  assert.equal(parseFormula('NH4+').charge, 1);
  assert.deepEqual(parseFormula('NH4+').counts, { N: 1, H: 4 });
  assert.equal(parseFormula('SO₄²⁻').charge, -2);
  assert.deepEqual(parseFormula('CO').counts, { C: 1, O: 1 });
  assert.deepEqual(parseFormula('Co').counts, { Co: 1 });
  assert.equal(parseFormula('Xy2').error, 'element');
  assert.equal(parseFormula('Mg(OH').error, 'brackets');
  close(molarMass(parseFormula('H2O').counts), 18.015);
  close(molarMass(parseFormula('C6H12O6').counts), 180.156);
  assert.equal(hill({ O: 1, H: 2, C: 2 }), 'C2H2O');
  assert.equal(hill({ Na: 1, Cl: 1 }), 'ClNa');
  const comp = composition(parseFormula('H2O').counts);
  close(comp[0].pct, 88.81);
  assert.equal(formulaHTML('NH4+'), 'NH<sub>4</sub><sup>+</sup>');
});

test('equation balancing finds the smallest whole-number coefficients', () => {
  const cases = [
    ['H2 + O2 -> H2O', [2, 1, 2]],
    ['C3H8 + O2 -> CO2 + H2O', [1, 5, 3, 4]],
    ['Fe + O2 -> Fe2O3', [4, 3, 2]],
    ['KMnO4 + HCl -> KCl + MnCl2 + H2O + Cl2', [2, 16, 2, 2, 8, 5]],
    ['Al + H2SO4 -> Al2(SO4)3 + H2', [2, 3, 1, 3]],
  ];
  for (const [eq, want] of cases) {
    const { reactants, products } = parseEquation(eq);
    assert.deepEqual(balance(reactants, products).coefficients, want, eq);
  }
  assert.equal(parseEquation('H2 + O2').error, 'arrow');
  assert.equal(balance(['H2O'], ['CO2']).error, 'unbalanceable');
  const tally = atomTally(['H2', 'O2'], ['H2O'], [2, 1, 2]);
  assert.deepEqual(tally, { H: [4, 4], O: [2, 2] });
});

test('PubChem SDF parser reads atoms, bonds and charges', () => {
  const sdf = `water
  test

  3  2  0  0  0  0  0  0  0  0999 V2000
    0.0000    0.3000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
    0.7600   -0.2000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
   -0.7600   -0.2000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
  1  2  1  0  0  0  0
  1  3  1  0  0  0  0
M  CHG  1   1  -1
M  END
$$$$`;
  const s = parseSDF(sdf);
  assert.equal(s.atoms.length, 3);
  assert.deepEqual(s.atoms[0].slice(0, 4), ['O', 0, 0.3, 0]);
  assert.equal(s.atoms[0][4], -1);
  assert.deepEqual(s.bonds, [
    [0, 1, 1],
    [0, 2, 1],
  ]);
  assert.equal(parseSDF('not a molfile'), null);
});

const view = infos => ({
  Record: {
    Reference: [
      { ReferenceNumber: 1, SourceName: 'Other notifier' },
      { ReferenceNumber: 2, SourceName: 'European Chemicals Agency (ECHA)' },
    ],
    Section: [{ TOCHeading: 'Safety', Section: [{ TOCHeading: 'GHS Classification', Information: infos }] }],
  },
});
const str = (s, markup) => ({ StringWithMarkup: [{ String: s, ...(markup ? { Markup: markup } : {}) }] });

test('GHS parser prefers the block backed by most reports', () => {
  const json = view([
    {
      ReferenceNumber: 1,
      Name: 'Pictogram(s)',
      Value: str(' ', [{ URL: 'https://x/GHS05.svg', Extra: 'Corrosive' }]),
    },
    { ReferenceNumber: 1, Name: 'Signal', Value: str('Danger') },
    {
      ReferenceNumber: 2,
      Name: 'Note',
      Value: str('This chemical does not meet GHS hazard criteria for 89.2% (1840 of 2063) of all reports.'),
    },
    {
      ReferenceNumber: 2,
      Name: 'Pictogram(s)',
      Value: str(' ', [{ URL: 'https://x/GHS07.svg', Extra: 'Irritant' }]),
    },
    {
      ReferenceNumber: 2,
      Name: 'GHS Hazard Statements',
      Value: str('H319 (10.8%): Causes serious eye irritation [Warning Serious eye damage/eye irritation]'),
    },
  ]);
  const g = parseGHS(json);
  assert.equal(g.reports, 2063);
  assert.equal(g.notMet, 89.2);
  assert.deepEqual(g.pictograms, [{ code: 'GHS07', label: 'Irritant' }]);
  assert.deepEqual(g.hazards, ['H319 (10.8%): Causes serious eye irritation']);
  const water = parseGHS(
    view([{ ReferenceNumber: 2, Name: 'GHS Hazard Statements', Value: str('Not Classified') }])
  );
  assert.equal(water.notClassified, true);
});

test('experimental properties, uses and synonyms are cleaned up', () => {
  const json = {
    Record: {
      Reference: [{ ReferenceNumber: 1, SourceName: 'HSDB' }],
      Section: [
        {
          TOCHeading: 'Experimental Properties',
          Section: [
            {
              TOCHeading: 'Boiling Point',
              Information: [
                { ReferenceNumber: 1, Value: str('100 °C') },
                { ReferenceNumber: 1, Value: str('100 °C') },
              ],
            },
            {
              TOCHeading: 'Kovats Retention Index',
              Information: [{ ReferenceNumber: 1, Value: { Number: [1] } }],
            },
            {
              TOCHeading: 'Uses',
              Information: [
                { Value: str('CIR ingredient: Water') },
                { Value: str('Used as a universal solvent in chemistry and industry.') },
              ],
            },
          ],
        },
      ],
    },
  };
  assert.deepEqual(parseExperimental(json), [{ key: 'Boiling Point', values: ['100 °C'], source: 'HSDB' }]);
  assert.deepEqual(parseUses(json), ['Used as a universal solvent in chemistry and industry.']);
  const syn = {
    InformationList: {
      Information: [{ Synonym: ['water', '7732-18-5', 'DTXSID6026296XXXX', 'dihydrogen oxide'] }],
    },
  };
  assert.deepEqual(parseSynonyms(syn), ['water', 'dihydrogen oxide']);
  assert.equal(casFromSynonyms(syn), '7732-18-5');
});

test('crystal models have textbook coordination numbers', () => {
  const maxDegree = ({ bonds }) => {
    const d = new Map();
    for (const [a, b] of bonds) {
      d.set(a, (d.get(a) || 0) + 1);
      d.set(b, (d.get(b) || 0) + 1);
    }
    return Math.max(...d.values());
  };
  assert.equal(maxDegree(buildLattice('rocksalt', ['Na', 'Cl'])), 6);
  assert.equal(maxDegree(buildLattice('cscl', ['Cs', 'Cl'])), 8);
  assert.equal(maxDegree(buildLattice('diamond', ['C'])), 4);
  assert.equal(maxDegree(buildLattice('graphene', ['C'])), 3);
  const c60 = buildLattice('c60', ['C']);
  assert.equal(c60.atoms.length, 60);
  assert.equal(c60.bonds.length, 90);
});

test('periodic table: 118 PubChem elements with Indonesian names', () => {
  assert.equal(ELEMENTS.length, 118);
  assert.equal(getElement('Fe').id, 'Besi');
  assert.equal(getElement(79).s, 'Au');
  assert.equal(getElement('emas').z, 79);
  for (const e of ELEMENTS)
    assert.equal(
      e.shells.reduce((a, b) => a + b, 0),
      e.z,
      e.s
    );
  assert.equal(valenceOf(subshells(getElement('Cl').conf, 17)), 7);
});

test('catalogue lookups and search (Indonesian, English, formula)', () => {
  assert.ok(MOLECULES.length >= 250);
  assert.equal(getMolecule('water').cid, 962);
  assert.equal(getMoleculeByCid(2519).id, 'caffeine');
  assert.equal(searchCatalog('air')[0].id, 'water');
  assert.equal(searchCatalog('caffeine')[0].id, 'caffeine');
  assert.equal(searchCatalog('C6H12O6', { glucose: 'C6H12O6' })[0].id, 'glucose');
  assert.equal(normalize('C₆H₁₂O₆ Ésö'), 'c6h12o6 eso');
});

test('2D drawings label heteroatoms and escape text', () => {
  const svg = depictSVG({ a: [['O', 0, 0, 0, 2]], b: [], full: 0 }, { title: '<water>' });
  assert.match(svg, /H₂O/);
  assert.match(svg, /aria-label="&lt;water&gt;"/);
});

test('titration and pH models match textbook values', () => {
  close(phAt(false, 0), 1, 0.01);
  close(phAt(false, 25), 7, 0.01);
  close(phAt(true, 12.5), 4.74, 0.02);
  close(phAt(true, 25), 8.72, 0.02);
  close(phOf('HCl', 0.01), 2, 0.01);
  close(phOf('NaOH', 0.01), 12, 0.01);
  close(phOf('CH3COOH', 0.1), 2.88, 0.02);
});

test('third-party URLs are limited to http(s)', () => {
  assert.equal(safeURL('https://id.wikipedia.org/wiki/Air'), 'https://id.wikipedia.org/wiki/Air');
  assert.equal(safeURL('javascript:alert(1)'), '');
  assert.equal(safeURL(' JaVaScRiPt:alert(1)'), '');
  assert.equal(safeURL('data:text/html,x'), '');
  assert.equal(safeURL(null), '');
});

test('search input is recognised as CID, CAS, InChIKey, InChI, SMILES, formula, nuclide or name', () => {
  const kind = q => identify(q).kind;
  assert.equal(kind('962'), 'cid');
  assert.equal(kind('64-17-5'), 'cas');
  assert.equal(identify('64-17-5').valid, true);
  assert.equal(validCAS('7732-18-5'), true);
  assert.equal(validCAS('7732-18-6'), false);
  assert.equal(kind('LFQSCWFLJHTTHZ-UHFFFAOYSA-N'), 'inchikey');
  assert.equal(kind('InChI=1S/H2O/h1H2'), 'inchi');
  assert.equal(kind('CC(=O)O'), 'smiles');
  assert.equal(kind('c1ccccc1'), 'smiles');
  assert.equal(kind('C6H12O6'), 'formula');
  assert.equal(kind('CuSO4.5H2O'), 'formula');
  assert.equal(kind('CCl4'), 'formula');
  assert.equal(kind('C-14'), 'nuclide');
  assert.equal(kind('uranium-235'), 'nuclide');
  assert.equal(kind('H2'), 'formula');
  assert.equal(kind('natrium'), 'name');
  assert.equal(kind('asam sulfat'), 'name');
  const ccO = identify('CCO');
  assert.equal(ccO.kind, 'smiles');
  assert.equal(ccO.alsoFormula, true);
});

test('nuclides: notation, decay products, half-life bands and durations', () => {
  const c14 = parseNuclide('C-14');
  assert.equal(c14.element.s, 'C');
  assert.equal(c14.A, 14);
  for (const text of ['14C', 'karbon-14', 'carbon 14', '¹⁴C']) assert.equal(parseNuclide(text)?.A, 14, text);
  assert.equal(parseNuclide('C-3'), null, 'A below Z is not a nuclide');
  assert.equal(nuclideLabel(235, 'U'), '²³⁵U');
  assert.deepEqual([daughter(6, 14, 'β-').element.s, daughter(6, 14, 'β-').A], ['N', 14]);
  assert.deepEqual([daughter(92, 238, 'α').element.s, daughter(92, 238, 'α').A], ['Th', 234]);
  assert.equal(daughter(19, 40, 'ε').element.s, 'Ar');
  assert.equal(daughter(92, 235, 'SF'), null);
  assert.equal(halfLifeBand(null, true), 'stable');
  assert.equal(halfLifeBand(0.01, false), 'sub-second');
  assert.equal(halfLifeBand(3600, false), 'day');
  assert.equal(halfLifeBand(1.8e11, false), 'long');
  assert.equal(durationText(0), '0');
  assert.match(durationText(330177.6), /^3[.,]82 /);
  assert.match(durationText(1.408e17), /^4[.,]46 /);
});

test('element records: half-lives and decay modes as the IAEA AMDC writes them', () => {
  const h = parseHalfLife('5.70 ky ± 0.03');
  close(h.seconds / (365.2422 * 86400), 5700, 1);
  assert.equal(parseHalfLife('Stable').stable, true);
  assert.equal(parseHalfLife('Not-specified').seconds, null);
  assert.equal(parseHalfLife('<110 ns').limit, '<');
  assert.deepEqual(parseDecay('β-=100%'), [{ mode: 'β-', op: '=', pct: 100 }]);
  assert.deepEqual(
    parseDecay('α ≈ 100%; SF ?').map(d => d.mode),
    ['α', 'SF']
  );
  assert.deepEqual(parseDecay('IS=98.93%'), [], 'isotopic abundance is not a decay mode');
});

test('unicode formulas, textbook references and the reaction library', () => {
  assert.equal(formulaUnicode('SO4 2-'), 'SO₄²⁻');
  assert.equal(formulaUnicode('NH4+'), 'NH₄⁺');
  assert.equal(formulaUnicode('CuSO4·5H2O'), 'CuSO₄·5H₂O');
  const ref = reference('13-3-shifting-equilibria-le-chateliers-principle');
  assert.equal(
    ref.url,
    'https://openstax.org/books/chemistry-2e/pages/13-3-shifting-equilibria-le-chateliers-principle'
  );
  assert.match(ref.label, /13\.3 Shifting Equilibria: Le Châtelier’s Principle/);
  assert.equal(reference('oc:11-2-the-sn2-reaction').book, 'organic-chemistry');
  assert.equal(reference('xx:1-1-nothing'), null);
  const coef = c => (c === 'n' ? 1 : typeof c === 'string' ? Number(c.replace('n', '')) || 1 : c);
  for (const r of LIBRARY) {
    const sum = side => {
      const out = { charge: 0 };
      for (const [c, f] of side) {
        const p = parseFormula(f);
        for (const [el, n] of Object.entries(p.counts)) out[el] = (out[el] || 0) + n * coef(c);
        out.charge += (p.charge || 0) * coef(c);
      }
      return out;
    };
    assert.deepEqual(sum(r.r), sum(r.p), r.id);
  }
  for (const r of NUCLEAR)
    for (const k of [0, 1]) {
      const total = side => side.reduce((a, x) => a + x[k] * (x[3] || 1), 0);
      assert.equal(total(r.r), total(r.p), `${r.id} ${k ? 'Z' : 'A'}`);
    }
  for (const i of IONS) assert.equal(Math.sign(parseFormula(i.f).charge), i.kind === 'cation' ? 1 : -1, i.id);
});

test('proxy policy only forwards read-only PubChem endpoints', () => {
  assert.deepEqual(route('pubchem/rest/pug/compound/cid/962/property/MolecularFormula/JSON'), {
    provider: 'pubchem',
    path: 'rest/pug/compound/cid/962/property/MolecularFormula/JSON',
    search: '',
  });
  assert.equal(
    route('pubchem/rest/pug_view/data/compound/962/JSON', '?heading=GHS+Classification').search,
    '?heading=GHS+Classification'
  );
  assert.equal(route('pubchem/rest/pug/compound/cid/962/XML').error, 403);
  assert.equal(route('pubchem/rest/pug_view/data/compound/962/JSON', '?evil=1').error, 403);
  assert.equal(route('pubchem/rest/pug/compound/name/..%2F..%2Fetc/cids/JSON').error, 403);
  assert.equal(route('pubchem/../../etc/passwd').error, 403);
  assert.equal(route('other/thing').error, 404);
  // Identifier lookups for the unified search: InChIKey in the path, SMILES and InChI as query parameters.
  assert.equal(
    route('pubchem/rest/pug/compound/inchikey/LFQSCWFLJHTTHZ-UHFFFAOYSA-N/cids/JSON').error,
    undefined
  );
  assert.equal(route('pubchem/rest/pug/compound/inchikey/not-a-key/cids/JSON').error, 403);
  assert.equal(route('pubchem/rest/pug/compound/smiles/cids/JSON', '?smiles=CCO').search, '?smiles=CCO');
  assert.equal(
    route('pubchem/rest/pug/compound/inchi/cids/JSON', '?inchi=InChI%3D1S%2FH2O%2Fh1H2').error,
    undefined
  );
  assert.equal(route('pubchem/rest/pug/compound/smiles/cids/JSON', '?smiles=CCO&evil=1').error, 403);
});

/** Starts the production server on a random local port and waits until it answers. */
async function startServer(env = {}) {
  const port = 18000 + Math.floor(Math.random() * 2000);
  const server = spawn(process.execPath, ['server/server.mjs'], {
    cwd: fileURLToPath(new URL('..', import.meta.url)),
    env: { ...process.env, PORT: String(port), HOST: '127.0.0.1', ...env },
  });
  const base = `http://127.0.0.1:${port}`;
  for (let i = 0; i < 50; i++) {
    try {
      await fetch(`${base}/`);
      break;
    } catch {
      await new Promise(r => setTimeout(r, 100));
    }
  }
  return { base, server };
}

test('production server: allow-listed files, bad URLs and the health endpoint', async () => {
  const { base, server } = await startServer();
  try {
    const status = async (path, init) => (await fetch(base + path, init)).status;
    const home = await fetch(`${base}/`);
    assert.equal(home.status, 200);
    assert.match(home.headers.get('content-security-policy'), /frame-ancestors 'none'/);
    assert.equal(home.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(await status('/.git/config'), 404);
    assert.equal(await status('/package.json'), 404);
    assert.equal(await status('/server/server.mjs'), 404);
    assert.equal(await status('/data/.sync-cache/x.json'), 404);
    assert.equal(await status('/%E0%A4%A'), 400);
    assert.equal(await status('/'), 200, 'server keeps running after a malformed URL');
    assert.equal(await status('/js/app.js'), 200);
    assert.equal(await status('/data/molecules/water.json'), 200);
    assert.equal(await status('/data/elements/26.json'), 200);
    assert.equal(await status('/data/ions/index.json'), 200);
    assert.equal(await status('/data/ions/sulfat.json'), 200);
    assert.equal(await status('/data/isotopes.json'), 200);
    assert.equal(await status('/', { method: 'POST' }), 405);
    const health = await (await fetch(`${base}/api/health`)).json();
    assert.equal(health.ok, true);
    assert.equal(health.proxy, true);
    assert.equal(await status('/api/pubchem/rest/pug/compound/cid/962/XML'), 403);
    assert.equal(await status('/api/nothing'), 404);
  } finally {
    server.kill();
  }
});

test('PROXY=0 serves the app but turns the API off', async () => {
  const { base, server } = await startServer({ PROXY: '0' });
  try {
    assert.equal((await fetch(`${base}/`)).status, 200);
    assert.equal((await fetch(`${base}/api/health`)).status, 404);
  } finally {
    server.kill();
  }
});
