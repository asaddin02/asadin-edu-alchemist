// Parser for PubChem PUG View element records (rest/pug_view/data/element/<Z>/JSON). PubChem gathers each
// element's data from official sources: IUPAC CIAAW (standard atomic weights, isotopic abundances), the IAEA
// Atomic Mass Data Center (masses, half-lives and decay modes of every nuclide), NIST, Los Alamos National
// Laboratory and Jefferson Lab (history, uses, occurrence) and the IUPAC Periodic Table of the Elements and
// Isotopes. Values are kept as the source writes them; nothing is estimated here. Pure functions, no DOM.

const clean = s =>
  String(s || '')
    .replace(/[\u200b\u00ad]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

function find(sections, heading) {
  for (const s of sections || []) {
    if (s.TOCHeading === heading) return s;
    const inner = find(s.Section, heading);
    if (inner) return inner;
  }
  return null;
}

const strings = info => (info?.Value?.StringWithMarkup || []).map(s => clean(s.String));
const text = info => strings(info).join(' ') || (info?.Value?.Number ? String(info.Value.Number[0]) : '');

/** Short source keys, shown on the page with the reference's own URL. */
export const SOURCE_KEYS = [
  ['ciaaw', /CIAAW/],
  ['iptei', /IPTEI/],
  ['amdc', /Atomic Mass Data Center/],
  ['nist', /NIST/],
  ['lanl', /Los Alamos/],
  ['jlab', /Jefferson Lab/],
  ['pubchem', /PubChem/],
];
const keyOf = name => SOURCE_KEYS.find(([, re]) => re.test(name || ''))?.[0] || 'other';

/** Seconds in each half-life unit used by the IAEA AMDC (NUBASE: 1 y = 365.2422 d). */
const YEAR = 365.2422 * 86400;
const UNIT = {
  ys: 1e-24,
  zs: 1e-21,
  as: 1e-18,
  fs: 1e-15,
  ps: 1e-12,
  ns: 1e-9,
  us: 1e-6,
  μs: 1e-6,
  ms: 1e-3,
  s: 1,
  m: 60,
  h: 3600,
  d: 86400,
  y: YEAR,
  ky: 1e3 * YEAR,
  My: 1e6 * YEAR,
  Gy: 1e9 * YEAR,
  Ty: 1e12 * YEAR,
  Py: 1e15 * YEAR,
  Ey: 1e18 * YEAR,
  Zy: 1e21 * YEAR,
  Yy: 1e24 * YEAR,
};

/**
 * Half-life text → { value, unit, seconds, stable, limit } where `limit` is '<' or '>' for bounds.
 * "Stable" → stable; "Not-specified" and unparsable text → seconds null.
 */
export function parseHalfLife(raw) {
  const t = clean(raw);
  if (/^stable/i.test(t)) return { stable: true, seconds: Infinity, value: null, unit: null, limit: null };
  const m = t.match(
    /^([<>~]?)\s*([\d.]+(?:[eE][-+]?\d+)?)\s*(ys|zs|as|fs|ps|ns|us|μs|ms|s|m|h|d|y|ky|My|Gy|Ty|Py|Ey|Zy|Yy)\b/
  );
  if (!m) return { stable: false, seconds: null, value: null, unit: null, limit: null };
  return {
    stable: false,
    value: Number(m[2]),
    unit: m[3],
    seconds: Number(m[2]) * UNIT[m[3]],
    limit: m[1] === '<' || m[1] === '>' ? m[1] : null,
  };
}

/**
 * Decay modes "β-=100%; β-n ?" → [{ mode, pct, op }]. PubChem's rendering of the intensity uncertainties is not
 * reliable, so only the mode and its central value are kept. IS (isotopic abundance) is not a decay mode and is
 * dropped: natural abundance comes from CIAAW instead.
 */
export function parseDecay(raw) {
  return clean(raw)
    .split(/\s*;\s*/)
    .map(part => {
      const m = part.match(/^([^=<>≈~?]+?)\s*(=|<|>|≈|~)?\s*([\d.]+)?\s*(?:±\s*[\d.]+)?\s*%?\s*(\?)?$/);
      if (!m) return null;
      const mode = m[1].trim();
      if (!mode || mode === 'IS') return null;
      return { mode, op: m[2] || (m[4] ? '?' : null), pct: m[3] != null ? Number(m[3]) : null };
    })
    .filter(Boolean);
}

/** "56Fe", "47Fem" → { A: 56, iso: '' | 'm' | 'n' | … }. */
export function parseNuclide(label, symbol) {
  const m = clean(label).match(/^(\d+)([A-Z][a-z]?)([a-z]?)$/);
  if (!m || (symbol && m[2] !== symbol)) return null;
  return { A: Number(m[1]), iso: m[3] || '' };
}

/**
 * Reads one element record. Returns
 * { weight, natural: [{ A, mass, abundance }], nuclides: [{ A, iso, mass, half, seconds, stable, decay, year, est }],
 *   stableCount, texts: { history, uses, sources, description, handling, isotopes }, isotopeUses,
 *   abundance: { crust, ocean, source }, physical, forms: [{ cid, name, formula, charge, smiles }], refs }.
 */
export function parseElementRecord(json, symbol) {
  const record = json?.Record;
  if (!record) return null;
  const refs = new Map(
    (record.Reference || []).map(r => [
      r.ReferenceNumber,
      { key: keyOf(r.SourceName), name: clean(r.SourceName), url: r.URL || '', license: r.LicenseURL || '' },
    ])
  );
  const used = new Map();
  const ref = n => {
    const r = refs.get(n) || { key: 'other', name: 'PubChem', url: '' };
    used.set(r.key, r);
    return r;
  };
  const S = record.Section;

  // Standard atomic weight from CIAAW: one value with its uncertainty ("55.845(2)", kind 'standard') or, for
  // elements whose isotopic make-up varies in nature, an interval ("[12.0096, 12.0116]", kind 'interval').
  // Elements without one (no stable isotope and no characteristic terrestrial composition) fall back to NIST, which
  // gives either a mass number in brackets ("[98]", kind 'mass-number') or the relative atomic mass of one isotope
  // ("241.0568293(19)" is ²⁴¹Am, kind 'isotope-mass', with A). A "#" marks an estimated mass (AMDC convention).
  let weight = null;
  const aw = find(S, 'Atomic Weight');
  for (const key of ['ciaaw', 'nist']) {
    const info = aw?.Information?.find(i => refs.get(i.ReferenceNumber)?.key === key);
    if (!info) continue;
    const value = text(info).replace(/^Relative Mass:\s*/i, '');
    if (!value) continue;
    const r = ref(info.ReferenceNumber);
    if (key === 'ciaaw')
      weight = { value, kind: /^\[[\d.\s]+,[\d.\s]+\]$/.test(value) ? 'interval' : 'standard' };
    else if (/^\[\d+\]$/.test(value)) weight = { value, kind: 'mass-number', A: Number(value.slice(1, -1)) };
    else
      weight = {
        value,
        kind: 'isotope-mass',
        A: Math.round(parseFloat(value)),
        estimated: value.includes('#'),
      };
    weight.source = r.key;
    break;
  }

  // Natural isotopic composition: CIAAW, else NIST.
  let natural = [];
  const iso = find(S, 'Isotope Mass and Abundance');
  for (const key of ['ciaaw', 'nist']) {
    const infos = iso?.Information?.filter(i => refs.get(i.ReferenceNumber)?.key === key) || [];
    const col = re => strings(infos.find(i => re.test(i.Name || '')));
    const names = col(/^Isotope/);
    if (!names.length) continue;
    const masses = col(/Mass/);
    const abund = col(/Abundance/);
    natural = names
      .map((n, i) => ({ ...parseNuclide(n, symbol), mass: masses[i] || '', abundance: abund[i] || '' }))
      .filter(x => x.A);
    if (natural.length) {
      ref(infos[0].ReferenceNumber);
      natural.source = key;
    }
    break;
  }
  const naturalSource = natural.source || null;
  natural = natural.filter(x => x.abundance);

  // Every known nuclide (IAEA AMDC).
  const table = find(S, 'Atomic Mass, Half Life, and Decay');
  let nuclides = [];
  if (table?.Information?.length) {
    const col = re => strings(table.Information.find(i => re.test(i.Name || '')));
    const names = col(/^Nuclide/);
    const masses = col(/Atomic Mass/);
    const halves = col(/Half Life/);
    const years = col(/Discovery/);
    const decays = col(/Decay/);
    ref(table.Information[0].ReferenceNumber);
    nuclides = names
      .map((n, i) => {
        const id = parseNuclide(n, symbol);
        if (!id) return null;
        const half = (halves[i] || '').replace(/\s*\[Estimated\]/i, '').trim();
        const h = parseHalfLife(half);
        return {
          ...id,
          mass: (masses[i] || '').replace(/\s*\[Estimated\]/i, '').trim(),
          half,
          seconds: Number.isFinite(h.seconds) ? h.seconds : null,
          stable: h.stable,
          decay: parseDecay(decays[i] || ''),
          year: /^\d{4}$/.test(years[i] || '') ? Number(years[i]) : null,
          est: /Estimated/i.test(`${masses[i]} ${halves[i]}`),
        };
      })
      .filter(Boolean);
  }

  // Descriptive text from the reference sources, each with its source.
  const texts = {};
  const TEXT = [
    ['history', 'History'],
    ['uses', 'Uses'],
    ['sources', 'Sources'],
    ['description', 'Description'],
    ['handling', 'Handling and Storage'],
    ['isotopes', 'Isotopes'],
  ];
  for (const [key, heading] of TEXT) {
    const section = find(S, heading);
    const out = [];
    for (const info of section?.Information || []) {
      if (/Count|Stable Isotope/i.test(info.Name || '')) continue;
      const parts = strings(info).filter(t => t.length > 25);
      if (!parts.length) continue;
      const r = ref(info.ReferenceNumber);
      out.push({ text: parts.join(' ').replace(/\s*▸\s*/g, ' '), source: r.key });
    }
    if (out.length) texts[key] = out;
  }
  const stableInfo = find(S, 'Isotopes')?.Information?.find(i => /Stable Isotope Count/i.test(i.Name || ''));
  const stableCount = stableInfo ? Number(text(stableInfo)) : null;
  if (stableInfo) ref(stableInfo.ReferenceNumber);

  // "Isotopes in Medicine", "Isotopes in Industry", … (IUPAC IPTEI).
  const isotopeUses = [];
  const walk = sections => {
    for (const s of sections || []) {
      const topic =
        s.TOCHeading.match(/^Isotopes in (.+)$/)?.[1] || s.TOCHeading.match(/^Isotopes Used as (.+)$/)?.[1];
      if (topic)
        for (const info of s.Information || []) {
          const r = ref(info.ReferenceNumber);
          const t = strings(info)
            .join(' ')
            .replace(/\s*\[[\d\],\s–-]+\]/g, '');
          if (t) isotopeUses.push({ topic, text: t, source: r.key });
        }
      walk(s.Section);
    }
  };
  walk(S);

  const one = heading => {
    const info = find(S, heading)?.Information?.[0];
    if (!info) return null;
    ref(info.ReferenceNumber);
    return text(info).replace(/(\d)×10(-?\d+)/g, '$1×10^$2') || null;
  };
  const abundanceRef = ['Estimated Crustal Abundance', 'Estimated Oceanic Abundance']
    .map(h => refs.get(find(S, h)?.Information?.[0]?.ReferenceNumber)?.key)
    .find(Boolean);
  const abundance = {
    crust: one('Estimated Crustal Abundance'),
    ocean: one('Estimated Oceanic Abundance'),
    source: abundanceRef || null,
  };
  const physical = one('Physical Description');

  // Element forms: the element itself and its ions (isotope-labelled forms are skipped).
  const formSec = find(S, 'Element Forms');
  let forms = [];
  if (formSec?.Information?.length) {
    const col = re => strings(formSec.Information.find(i => re.test(i.Name || '')));
    const cids = col(/^CID/);
    const names = col(/^Name/);
    const formulas = col(/^Formula/);
    const smiles = col(/^SMILES/);
    forms = cids
      .map((cid, i) => {
        const f = formulas[i] || '';
        const m = f.match(/([+-])(\d*)$/);
        return {
          cid: Number(cid),
          name: names[i] || '',
          formula: f,
          charge: m ? (m[1] === '-' ? -1 : 1) * Number(m[2] || 1) : 0,
          smiles: smiles[i] || '',
        };
      })
      .filter(f => f.cid && !/^\[\d/.test(f.smiles) && !/-\d+\b/.test(f.name));
  }

  return {
    weight,
    natural,
    naturalSource,
    nuclides,
    stableCount: Number.isFinite(stableCount) ? stableCount : null,
    texts,
    isotopeUses,
    abundance,
    physical,
    forms,
    refs: Object.fromEntries([...used].map(([k, r]) => [k, { name: r.name, url: r.url }])),
  };
}
