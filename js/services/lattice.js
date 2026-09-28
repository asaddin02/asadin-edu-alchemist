// Procedural crystal and nanostructure models for materials that have no single-molecule conformer
// (metals, ionic solids, covalent networks, carbon allotropes). Positions come from standard unit cells
// with measured lattice constants (Å); bonds join nearest neighbours. Output matches the viewer format:
// { atoms: [[symbol, x, y, z]], bonds: [[a, b, order]], cell: [[x,y,z] × 3] | null }.

const PHI = (1 + Math.sqrt(5)) / 2;

/** Learning notes for each structure type: [Bahasa Indonesia, English]. */
export const LATTICES = {
  rocksalt: {
    name: ['Kisi garam dapur (NaCl)', 'Rock-salt lattice (NaCl)'],
    cn: '6 : 6',
    note: [
      'Dua kisi kubus pusat muka yang saling menyusup: setiap kation dikelilingi 6 anion dalam susunan oktahedron, dan sebaliknya.',
      'Two interpenetrating face-centred cubic lattices: every cation is surrounded octahedrally by 6 anions, and vice versa.',
    ],
  },
  cscl: {
    name: ['Kisi sesium klorida', 'Caesium chloride lattice'],
    cn: '8 : 8',
    note: [
      'Satu ion di pusat kubus, delapan ion lawan di sudut-sudutnya.',
      'One ion at the cube centre, eight counter-ions at the corners.',
    ],
  },
  fluorite: {
    name: ['Kisi fluorit (CaF₂)', 'Fluorite lattice (CaF₂)'],
    cn: '8 : 4',
    note: [
      'Kation membentuk kisi kubus pusat muka; anion mengisi semua rongga tetrahedral.',
      'Cations form an fcc lattice; anions fill every tetrahedral hole.',
    ],
  },
  zincblende: {
    name: ['Kisi seng blende', 'Zinc-blende lattice'],
    cn: '4 : 4',
    note: [
      'Seperti intan, tetapi dua jenis atom berselang-seling; setiap atom terikat tetrahedral pada empat atom lain.',
      'Like diamond but with two alternating kinds of atom; each bonds tetrahedrally to four others.',
    ],
  },
  wurtzite: {
    name: ['Kisi wurtzit (heksagonal)', 'Wurtzite lattice (hexagonal)'],
    cn: '4 : 4',
    note: [
      'Versi heksagonal dari seng blende; setiap atom tetap terikat tetrahedral.',
      'The hexagonal cousin of zinc blende; every atom is still tetrahedrally bonded.',
    ],
  },
  diamond: {
    name: ['Kisi intan (kubus)', 'Diamond cubic lattice'],
    cn: '4',
    note: [
      'Setiap atom terikat kovalen pada empat tetangga dalam tetrahedron (hibridisasi sp³), membentuk jaringan raksasa.',
      'Every atom is covalently bonded to four neighbours in a tetrahedron (sp³), forming a giant network.',
    ],
  },
  graphite: {
    name: ['Lapisan grafit', 'Graphite layers'],
    cn: '3',
    note: [
      'Lembaran heksagonal sp² bertumpuk berjarak 3,35 Å, hanya ditahan gaya van der Waals yang lemah.',
      'Hexagonal sp² sheets stacked 3.35 Å apart, held only by weak van der Waals forces.',
    ],
  },
  graphene: {
    name: ['Lembaran grafena', 'Graphene sheet'],
    cn: '3',
    note: [
      'Satu lapis atom karbon sp² dalam pola sarang lebah, panjang ikatan 1,42 Å.',
      'A single layer of sp² carbon in a honeycomb, bond length 1.42 Å.',
    ],
  },
  fcc: {
    name: ['Kubus pusat muka (fcc)', 'Face-centred cubic (fcc)'],
    cn: '12',
    pack: 74,
    note: [
      'Atom di sudut dan di tengah setiap muka kubus; susunan paling rapat (74% ruang terisi). Logam fcc umumnya lunak dan mudah ditempa.',
      'Atoms at the corners and every face centre; closest packing (74% filled). fcc metals tend to be soft and ductile.',
    ],
  },
  bcc: {
    name: ['Kubus pusat badan (bcc)', 'Body-centred cubic (bcc)'],
    cn: '8',
    pack: 68,
    note: [
      'Atom di sudut dan satu di pusat kubus (68% ruang terisi).',
      'Atoms at the corners and one at the cube centre (68% filled).',
    ],
  },
  hcp: {
    name: ['Heksagonal rapat (hcp)', 'Hexagonal close-packed (hcp)'],
    cn: '12',
    pack: 74,
    note: [
      'Lapisan atom rapat bertumpuk pola ABAB (74% ruang terisi).',
      'Close-packed layers stacked ABAB (74% filled).',
    ],
  },
  rutile: {
    name: ['Kisi rutil', 'Rutile lattice'],
    cn: '6 : 3',
    note: [
      'Setiap ion logam di pusat oktahedron oksigen; setiap O terikat pada 3 logam.',
      'Each metal ion sits in an oxygen octahedron; each O bonds to 3 metals.',
    ],
  },
  perovskite: {
    name: ['Kisi perovskit (ABX₃)', 'Perovskite lattice (ABX₃)'],
    cn: '12 : 6',
    note: [
      'Kation besar A di sudut, kation kecil B di pusat oktahedron X. Struktur ini penting untuk sel surya generasi baru.',
      'Large A cations at the corners, small B cations inside X octahedra. Key to next-generation solar cells.',
    ],
  },
  cristobalite: {
    name: ['Jaringan SiO₄ (kristobalit ideal)', 'SiO₄ network (ideal cristobalite)'],
    cn: '4 : 2',
    note: [
      'Setiap Si di pusat tetrahedron O, dan setiap O menjembatani dua Si. Kuarsa memiliki jaringan tetrahedron yang sama dengan susunan heliks.',
      'Each Si sits in an O tetrahedron and each O bridges two Si. Quartz has the same tetrahedra arranged in helices.',
    ],
  },
  c60: {
    name: ['Bola C₆₀ (ikosahedron terpancung)', 'C₆₀ cage (truncated icosahedron)'],
    cn: '3',
    note: [
      '60 atom karbon pada sudut 12 segi lima dan 20 segi enam, seperti bola sepak.',
      '60 carbons at the corners of 12 pentagons and 20 hexagons, like a football.',
    ],
  },
  nanotube: {
    name: ['Tabung nano (10,0)', '(10,0) nanotube'],
    cn: '3',
    note: [
      'Lembaran grafena yang digulung. Arah gulungan (indeks n, m) menentukan apakah tabung bersifat logam atau semikonduktor.',
      'A rolled graphene sheet. The roll direction (n, m) decides whether it is metallic or semiconducting.',
    ],
  },
};

// Measured lattice constants (Å) for the materials in the catalogue; others use the type default.
const CONSTANTS = {
  'rocksalt:Na-Cl': 5.64,
  'rocksalt:K-Cl': 6.29,
  'rocksalt:Mg-O': 4.21,
  'rocksalt:Ca-O': 4.81,
  'rocksalt:Ag-Cl': 5.55,
  'rocksalt:Pb-S': 5.94,
  'rocksalt:Na-F': 4.63,
  'cscl:N-Cl': 3.87,
  'cscl:Cs-Cl': 4.12,
  'fluorite:Ca-F': 5.46,
  'zincblende:Si-C': 4.36,
  'zincblende:Ga-As': 5.65,
  'zincblende:Zn-S': 5.41,
  'diamond:C': 3.567,
  'diamond:Si': 5.431,
  'diamond:Ge': 5.658,
  'fcc:Cu': 3.615,
  'fcc:Al': 4.05,
  'fcc:Au': 4.08,
  'fcc:Ag': 4.09,
  'fcc:Ni': 3.52,
  'bcc:Fe': 2.87,
  'bcc:Na': 4.29,
  'bcc:W': 3.16,
};
const HEX = {
  'hcp:Ti': [2.95, 4.69],
  'hcp:Mg': [3.21, 5.21],
  'hcp:Zn': [2.66, 4.95],
  'wurtzite:Zn-O': [3.25, 5.21, 0.382],
  'wurtzite:Ga-N': [3.19, 5.19, 0.377],
  'rutile:Ti-O': [4.59, 2.96, 0.305],
  'rutile:Sn-O': [4.74, 3.19, 0.307],
};

const FCC = [
  [0, 0, 0],
  [0.5, 0.5, 0],
  [0.5, 0, 0.5],
  [0, 0.5, 0.5],
];
const add = (a, b) => a.map((v, i) => v + b[i]);

/** Repeats fractional sites over n×n×n cells (including the far faces, so cells look complete). */
function tile(sites, vectors, n = 2, eps = 1e-6) {
  const atoms = [];
  const seen = new Set();
  for (let i = -1; i <= n; i++)
    for (let j = -1; j <= n; j++)
      for (let k = -1; k <= n; k++)
        for (const [el, f] of sites) {
          const u = [f[0] + i, f[1] + j, f[2] + k];
          if (u.some(v => v < -eps || v > n + eps)) continue;
          const x = u[0] * vectors[0][0] + u[1] * vectors[1][0] + u[2] * vectors[2][0];
          const y = u[0] * vectors[0][1] + u[1] * vectors[1][1] + u[2] * vectors[2][1];
          const z = u[0] * vectors[0][2] + u[1] * vectors[1][2] + u[2] * vectors[2][2];
          const key = `${x.toFixed(3)},${y.toFixed(3)},${z.toFixed(3)}`;
          if (seen.has(key)) continue;
          seen.add(key);
          atoms.push([el, x, y, z]);
        }
  return atoms;
}

/** Bonds every pair closer than `max` Å (optionally only between different elements). */
function connect(atoms, max, { hetero = false, order = 1 } = {}) {
  const bonds = [];
  for (let i = 0; i < atoms.length; i++)
    for (let j = i + 1; j < atoms.length; j++) {
      if (hetero && atoms[i][0] === atoms[j][0]) continue;
      const d = Math.hypot(atoms[i][1] - atoms[j][1], atoms[i][2] - atoms[j][2], atoms[i][3] - atoms[j][3]);
      if (d > 0.1 && d <= max) bonds.push([i, j, order]);
    }
  return bonds;
}

const cubic = a => [
  [a, 0, 0],
  [0, a, 0],
  [0, 0, a],
];
const hexagonal = (a, c) => [
  [a, 0, 0],
  [-a / 2, (a * Math.sqrt(3)) / 2, 0],
  [0, 0, c],
];

export function buildLattice(type, elements = ['C']) {
  const [A, B = A, C] = elements;
  const key = `${type}:${elements.slice(0, 2).join('-')}`;
  let atoms;
  let bonds = [];
  let cell = null;
  switch (type) {
    case 'rocksalt': {
      const a = CONSTANTS[key] || 5.6;
      cell = cubic(a);
      atoms = tile([...FCC.map(f => [A, f]), ...FCC.map(f => [B, add(f, [0.5, 0, 0])])], cell, 2);
      bonds = connect(atoms, a / 2 + 0.05, { hetero: true });
      break;
    }
    case 'cscl': {
      const a = CONSTANTS[key] || 4.1;
      cell = cubic(a);
      atoms = tile(
        [
          [B, [0, 0, 0]],
          [A, [0.5, 0.5, 0.5]],
        ],
        cell,
        2
      );
      bonds = connect(atoms, (a * Math.sqrt(3)) / 2 + 0.05, { hetero: true });
      break;
    }
    case 'fluorite': {
      const a = CONSTANTS[key] || 5.46;
      cell = cubic(a);
      const anions = [];
      for (const x of [0.25, 0.75])
        for (const y of [0.25, 0.75]) for (const z of [0.25, 0.75]) anions.push([B, [x, y, z]]);
      atoms = tile([...FCC.map(f => [A, f]), ...anions], cell, 1);
      bonds = connect(atoms, (a * Math.sqrt(3)) / 4 + 0.05, { hetero: true });
      break;
    }
    case 'zincblende':
    case 'diamond': {
      const a = CONSTANTS[key] || CONSTANTS[`${type}:${A}`] || 5.43;
      cell = cubic(a);
      const second = type === 'diamond' ? A : B;
      atoms = tile([...FCC.map(f => [A, f]), ...FCC.map(f => [second, add(f, [0.25, 0.25, 0.25])])], cell, 1);
      bonds = connect(atoms, (a * Math.sqrt(3)) / 4 + 0.05);
      break;
    }
    case 'cristobalite': {
      const a = 7.16;
      cell = cubic(a);
      const si = [...FCC, ...FCC.map(f => add(f, [0.25, 0.25, 0.25]))];
      const siAtoms = tile(
        si.map(f => ['Si', f]),
        cell,
        1
      );
      atoms = [...siAtoms];
      const dSi = (a * Math.sqrt(3)) / 4 + 0.05;
      for (let i = 0; i < siAtoms.length; i++)
        for (let j = i + 1; j < siAtoms.length; j++) {
          const p = siAtoms[i];
          const q = siAtoms[j];
          if (Math.hypot(p[1] - q[1], p[2] - q[2], p[3] - q[3]) <= dSi)
            atoms.push(['O', (p[1] + q[1]) / 2, (p[2] + q[2]) / 2, (p[3] + q[3]) / 2]);
        }
      bonds = connect(atoms, 1.62, { hetero: true });
      break;
    }
    case 'fcc':
    case 'bcc': {
      const a = CONSTANTS[`${type}:${A}`] || (type === 'fcc' ? 4 : 3);
      cell = cubic(a);
      const sites =
        type === 'fcc'
          ? FCC
          : [
              [0, 0, 0],
              [0.5, 0.5, 0.5],
            ];
      atoms = tile(
        sites.map(f => [A, f]),
        cell,
        2
      );
      break;
    }
    case 'hcp': {
      const [a, c] = HEX[`hcp:${A}`] || [3, 4.9];
      cell = hexagonal(a, c);
      atoms = tile(
        [
          [A, [0, 0, 0]],
          [A, [2 / 3, 1 / 3, 0.5]],
        ],
        cell,
        2
      );
      break;
    }
    case 'wurtzite': {
      const [a, c, u] = HEX[key] || [3.2, 5.2, 0.38];
      cell = hexagonal(a, c);
      atoms = tile(
        [
          [A, [1 / 3, 2 / 3, 0]],
          [A, [2 / 3, 1 / 3, 0.5]],
          [B, [1 / 3, 2 / 3, u]],
          [B, [2 / 3, 1 / 3, 0.5 + u]],
        ],
        cell,
        2
      );
      bonds = connect(atoms, 2.1, { hetero: true });
      break;
    }
    case 'rutile': {
      const [a, c, u] = HEX[key] || [4.6, 3, 0.305];
      cell = [
        [a, 0, 0],
        [0, a, 0],
        [0, 0, c],
      ];
      atoms = tile(
        [
          [A, [0, 0, 0]],
          [A, [0.5, 0.5, 0.5]],
          [B, [u, u, 0]],
          [B, [1 - u, 1 - u, 0]],
          [B, [0.5 + u, 0.5 - u, 0.5]],
          [B, [0.5 - u, 0.5 + u, 0.5]],
        ],
        cell,
        2
      );
      bonds = connect(atoms, 2.1, { hetero: true });
      break;
    }
    case 'perovskite': {
      const a = 3.84;
      cell = cubic(a);
      const X = C || 'O';
      atoms = tile(
        [
          [A, [0, 0, 0]],
          [B, [0.5, 0.5, 0.5]],
          [X, [0.5, 0.5, 0]],
          [X, [0.5, 0, 0.5]],
          [X, [0, 0.5, 0.5]],
        ],
        cell,
        1
      );
      bonds = connect(atoms, a / 2 + 0.05).filter(([i, j]) => atoms[i][0] === B || atoms[j][0] === B);
      break;
    }
    case 'graphene':
    case 'graphite': {
      const a = 2.46;
      const layers = type === 'graphite' ? 3 : 1;
      atoms = [];
      for (let l = 0; l < layers; l++) {
        const shift = l % 2 ? [a / 2, a / (2 * Math.sqrt(3))] : [0, 0];
        for (let i = -4; i <= 4; i++)
          for (let j = -4; j <= 4; j++)
            for (const base of [
              [0, 0],
              [a / 2, a / (2 * Math.sqrt(3))],
            ]) {
              const x = i * a + j * (a / 2) + base[0] + shift[0];
              const y = j * ((a * Math.sqrt(3)) / 2) + base[1] + shift[1];
              if (Math.hypot(x, y) <= 7.2) atoms.push([A, x, y, (l - (layers - 1) / 2) * 3.35]);
            }
      }
      bonds = connect(atoms, 1.5);
      break;
    }
    case 'c60': {
      const pts = [];
      const perms = ([x, y, z]) => [
        [x, y, z],
        [y, z, x],
        [z, x, y],
      ];
      const signs = v =>
        [1, -1].flatMap(sx => [1, -1].flatMap(sy => [1, -1].map(sz => [v[0] * sx, v[1] * sy, v[2] * sz])));
      for (const base of [
        [0, 1, 3 * PHI],
        [1, 2 + PHI, 2 * PHI],
        [PHI, 2, 2 * PHI + 1],
      ])
        for (const p of perms(base))
          for (const s of signs(p))
            if (!pts.some(q => Math.hypot(q[0] - s[0], q[1] - s[1], q[2] - s[2]) < 1e-6)) pts.push(s);
      atoms = pts.map(p => [A, p[0] * 0.71, p[1] * 0.71, p[2] * 0.71]);
      bonds = connect(atoms, 1.5);
      break;
    }
    case 'nanotube': {
      const a = 2.46;
      const n = 10;
      const circ = n * a;
      const R = circ / (2 * Math.PI);
      atoms = [];
      const h = (a * Math.sqrt(3)) / 2;
      for (let row = 0; row < 9; row++)
        for (let i = 0; i < n; i++)
          for (const [bx, by] of [
            [0, 0],
            [a / 2, a / (2 * Math.sqrt(3))],
          ]) {
            const x = (i * a + (row % 2) * (a / 2) + bx) % circ;
            const y = row * h + by;
            const t = (2 * Math.PI * x) / circ;
            atoms.push([A, R * Math.cos(t), y - 4.5 * h, R * Math.sin(t)]);
          }
      bonds = connect(atoms, 1.55);
      break;
    }
    default:
      atoms = [[A, 0, 0, 0]];
  }
  return { atoms, bonds, cell, info: LATTICES[type] || null };
}
