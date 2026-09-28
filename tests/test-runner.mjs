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
} from '../js/services/formula.js';
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
