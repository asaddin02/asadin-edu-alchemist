// Practice reactions for the balancing lab, graded by difficulty. Checked by scripts/check-data.mjs:
// every reaction must have exactly one balanced solution.
export const REACTIONS = [
  { lv: 'easy', r: ['H2', 'O2'], p: ['H2O'], name: ['Pembentukan air', 'Making water'] },
  { lv: 'easy', r: ['N2', 'H2'], p: ['NH3'], name: ['Proses Haber', 'Haber process'] },
  { lv: 'easy', r: ['Mg', 'O2'], p: ['MgO'], name: ['Magnesium terbakar', 'Burning magnesium'] },
  { lv: 'easy', r: ['Na', 'Cl2'], p: ['NaCl'], name: ['Pembentukan garam', 'Making salt'] },
  { lv: 'easy', r: ['H2O2'], p: ['H2O', 'O2'], name: ['Penguraian hidrogen peroksida', 'Hydrogen peroxide decomposing'] },
  { lv: 'medium', r: ['CH4', 'O2'], p: ['CO2', 'H2O'], name: ['Pembakaran metana', 'Burning methane'] },
  { lv: 'medium', r: ['Fe', 'O2'], p: ['Fe2O3'], name: ['Perkaratan besi', 'Iron rusting'] },
  { lv: 'medium', r: ['NaHCO3', 'CH3COOH'], p: ['CH3COONa', 'H2O', 'CO2'], name: ['Soda kue + cuka', 'Baking soda + vinegar'] },
  { lv: 'medium', r: ['Zn', 'HCl'], p: ['ZnCl2', 'H2'], name: ['Seng dalam asam', 'Zinc in acid'] },
  { lv: 'medium', r: ['CaCO3'], p: ['CaO', 'CO2'], name: ['Membuat kapur tohor', 'Making quicklime'] },
  { lv: 'hard', r: ['C3H8', 'O2'], p: ['CO2', 'H2O'], name: ['Pembakaran LPG (propana)', 'Burning LPG (propane)'] },
  { lv: 'hard', r: ['C6H12O6', 'O2'], p: ['CO2', 'H2O'], name: ['Respirasi sel', 'Cellular respiration'] },
  { lv: 'hard', r: ['Al', 'H2SO4'], p: ['Al2(SO4)3', 'H2'], name: ['Aluminium dalam asam sulfat', 'Aluminium in sulfuric acid'] },
  { lv: 'hard', r: ['C8H18', 'O2'], p: ['CO2', 'H2O'], name: ['Pembakaran bensin (oktana)', 'Burning petrol (octane)'] },
  { lv: 'hard', r: ['KMnO4', 'HCl'], p: ['KCl', 'MnCl2', 'H2O', 'Cl2'], name: ['Permanganat + HCl (redoks)', 'Permanganate + HCl (redox)'] },
];
