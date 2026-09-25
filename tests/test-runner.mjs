// ChemTaxa · Automated Test Suite & Scientific Verification Runner
import assert from 'assert';
import { elements, getElement } from '../js/data/periodicTable.js';
import { curatedMolecules, getCuratedMolecule, searchCurated } from '../js/data/curatedMolecules.js';
import { parseSDF, translateQuery } from '../js/services/pubchem.js';
import { curriculum } from '../js/data/curriculum.js';

let passed = 0;
let total = 0;

function it(name, fn) {
  total++;
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
  }
}

console.log('\n🧪 Running ChemTaxa Automated Test Suite:\n');

// 1. Periodic Table Tests
it('Periodic table contains valid elements with symbols and masses', () => {
  assert(elements.length > 20, 'Should have rich element database');
  const h = getElement('H');
  assert(h && h.n === 1 && h.mass === 1.008, 'Hydrogen properties mismatch');
  const c = getElement('C');
  assert(c && c.n === 6 && c.mass === 12.011, 'Carbon properties mismatch');
  const o = getElement('O');
  assert(o && o.n === 8 && o.mass === 15.999, 'Oxygen properties mismatch');
});

// 2. Curated Molecules Tests
it('Curated molecules database has 3D coordinates and complete metadata', () => {
  assert(curatedMolecules.length >= 10, 'Should have curated molecules');
  const water = getCuratedMolecule('water');
  assert(water && water.formula === 'H2O', 'Water not found or formula wrong');
  assert(water.atoms3D && water.atoms3D.length === 3, 'Water must have 3 atoms in 3D');
  assert(water.bonds3D && water.bonds3D.length === 2, 'Water must have 2 bonds in 3D');

  const caffeine = getCuratedMolecule('caffeine');
  assert(caffeine && caffeine.cid === 2519, 'Caffeine CID mismatch');
  assert(caffeine.atoms3D.length > 0, 'Caffeine 3D coordinates missing');
});

// 3. Search & Translation Tests
it('Indonesian common term dictionary maps correctly to standard chemical names', () => {
  assert.strictEqual(translateQuery('air'), 'water');
  assert.strictEqual(translateQuery('garam dapur'), 'sodium chloride');
  assert.strictEqual(translateQuery('asam cuka'), 'acetic acid');
  assert.strictEqual(translateQuery('glukosa'), 'glucose');
});

it('Local search matches formulas, Indonesian names, and English names', () => {
  const byFormula = searchCurated('H2O');
  assert(byFormula.some(m => m.id === 'water'), 'Formula search failed');

  const byIdName = searchCurated('Garam');
  assert(byIdName.some(m => m.id === 'salt-nacl'), 'Indonesian name search failed');
});

// 4. PubChem 3D SDF Parser Tests
it('SDF Parser correctly extracts atoms and bond topology from PubChem 3D record', () => {
  const sampleSDF = `
2519
  -OEChem-09252602443D

  3  2  0     0  0  0  0  0  0999 V2000
    0.0000    0.1173    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
   -0.7570   -0.4692    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    0.7570   -0.4692    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
  1  2  1  0  0  0  0
  1  3  1  0  0  0  0
M  END
$$$$`;

  const parsed = parseSDF(sampleSDF);
  assert(parsed !== null, 'SDF parsing returned null');
  assert.strictEqual(parsed.atoms.length, 3, 'Should extract 3 atoms');
  assert.strictEqual(parsed.bonds.length, 2, 'Should extract 2 bonds');
  assert.strictEqual(parsed.atoms[0].element, 'O', 'First atom should be Oxygen');
  assert.strictEqual(parsed.bonds[0].order, 1, 'First bond should be single order');
});

// 5. Curriculum Data Integrity
it('Curriculum contains tracks for all educational tiers with checkpoints', () => {
  assert(curriculum.sd && curriculum.sd.length > 0, 'SD curriculum missing');
  assert(curriculum.smp && curriculum.smp.length > 0, 'SMP curriculum missing');
  assert(curriculum.sma && curriculum.sma.length > 0, 'SMA curriculum missing');
  assert(curriculum.kuliah && curriculum.kuliah.length > 0, 'Kuliah curriculum missing');

  const sampleUnit = curriculum.sd[0];
  assert(sampleUnit.checkpoints && sampleUnit.checkpoints.length > 0, 'Checkpoints missing');
});


// 6. Comprehensive Molecules & Atomic Module Verification
it('Curated molecules contains 49 diverse molecules across 8 categories', () => {
  assert(curatedMolecules.length >= 45, `Expected >= 45 molecules, got ${curatedMolecules.length}`);
  const categories = new Set(curatedMolecules.map(m => m.category));
  assert(categories.size >= 8, `Expected >= 8 categories, got ${categories.size}`);
  
  // Verify essential categories exist
  ['atmosphere', 'life', 'food', 'household', 'medicine', 'energy', 'industrial', 'material'].forEach(cat => {
    assert(categories.has(cat), `Category missing: ${cat}`);
  });
});

console.log(`\nResults: ${passed} / ${total} tests passed.\n`);
if (passed === total) {
  console.log('🎉 All automated tests passed successfully!\n');
  process.exit(0);
} else {
  console.error('❌ Some tests failed.\n');
  process.exit(1);
}
