// ChemTaxa · Official PubChem PUG REST API Service (NCBI / NIH)
import { getCuratedMolecule, searchCurated } from '../data/curatedMolecules.js';

const cache = new Map();

// Indonesian common terms dictionary to map directly to official PubChem chemical names
const idToEnTerms = {
  'air': 'water',
  'oksigen': 'oxygen',
  'gas oksigen': 'oxygen',
  'karbon dioksida': 'carbon dioxide',
  'karbondioksida': 'carbon dioxide',
  'metana': 'methane',
  'amonia': 'ammonia',
  'garam': 'sodium chloride',
  'garam dapur': 'sodium chloride',
  'asam cuka': 'acetic acid',
  'cuka': 'acetic acid',
  'alkohol': 'ethanol',
  'etanol': 'ethanol',
  'gula': 'sucrose',
  'gula pasir': 'sucrose',
  'glukosa': 'glucose',
  'gula darah': 'glucose',
  'asam sulfat': 'sulfuric acid',
  'air aki': 'sulfuric acid',
  'asam klorida': 'hydrochloric acid',
  'asam sitrat': 'citric acid',
  'kafein': 'caffeine',
  'aspirin': 'aspirin',
  'parasetamol': 'paracetamol',
  'vitamin c': 'ascorbic acid',
  'asam askorbat': 'ascorbic acid',
  'baking soda': 'sodium bicarbonate',
  'soda kue': 'sodium bicarbonate',
  'karbon monoksida': 'carbon monoxide',
  'ozon': 'ozone',
  'hidrogen peroksida': 'hydrogen peroxide',
  'klorin': 'chlorine',
  'batu kapur': 'calcium carbonate',
  'kalsium karbonat': 'calcium carbonate',
  'soda api': 'sodium hydroxide',
  'natrium hidroksida': 'sodium hydroxide',
  'urea': 'urea',
  'asam amino': 'glycine',
  'glisin': 'glycine',
  'kolesterol': 'cholesterol',
  'nikotin': 'nicotine',
  'mentol': 'menthol',
  'kapsaisin': 'capsaicin',
  'kurkumin': 'curcumin',
  'klorofil': 'chlorophyll',
  'grafena': 'graphene',
  'teflon': 'polytetrafluoroethylene',
  'intan': 'diamond',
  'grafit': 'graphite'
};

export function translateQuery(term) {
  if (!term) return '';
  const clean = term.trim().toLowerCase();
  return idToEnTerms[clean] || term.trim();
}

/** Robust PubChem 3D SDF parser */
export function parseSDF(sdfText) {
  if (!sdfText || typeof sdfText !== 'string') return null;
  const lines = sdfText.split(/\r?\n/).map(l => l.trimEnd()).filter(Boolean);
  if (lines.length < 4) return null;

  // Find line containing V2000
  let countsIdx = lines.findIndex(l => l.includes('V2000'));
  if (countsIdx === -1) {
    countsIdx = 3;
  }

  const countsLine = lines[countsIdx];
  if (!countsLine) return null;

  const numAtoms = parseInt(countsLine.slice(0, 3).trim(), 10);
  const numBonds = parseInt(countsLine.slice(3, 6).trim(), 10);

  if (isNaN(numAtoms) || numAtoms <= 0) return null;

  const atoms = [];
  const bonds = [];
  let lineIdx = countsIdx + 1;

  for (let i = 0; i < numAtoms && lineIdx < lines.length; i++, lineIdx++) {
    const line = lines[lineIdx];
    const x = parseFloat(line.slice(0, 10).trim());
    const y = parseFloat(line.slice(10, 20).trim());
    const z = parseFloat(line.slice(20, 30).trim());
    const element = line.slice(31, 34).trim();
    atoms.push({ index: i, x: isNaN(x) ? 0 : x, y: isNaN(y) ? 0 : y, z: isNaN(z) ? 0 : z, element });
  }

  for (let i = 0; i < numBonds && lineIdx < lines.length; i++, lineIdx++) {
    const line = lines[lineIdx];
    const from = parseInt(line.slice(0, 3).trim(), 10) - 1;
    const to = parseInt(line.slice(3, 6).trim(), 10) - 1;
    const order = parseInt(line.slice(6, 9).trim(), 10) || 1;
    if (from >= 0 && to >= 0 && from < numAtoms && to < numAtoms) {
      bonds.push({ from, to, order });
    }
  }

  return { atoms, bonds };
}

/** Search compounds locally & via PubChem autocomplete / PUG REST API */
export async function searchMolecules(searchTerm) {
  const query = searchTerm.trim();
  if (!query) return [];

  const localMatches = searchCurated(query);
  const translated = translateQuery(query);

  if (localMatches.length >= 4) {
    return localMatches;
  }

  try {
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/autocomplete/compound/${encodeURIComponent(translated)}/json?limit=6`;
    const res = await fetch(url, { signal: AbortSignal.timeout(3500) });
    if (res.ok) {
      const data = await res.json();
      const terms = data?.dictionary_terms?.compound || [];
      const remoteResults = [];

      for (const term of terms) {
        if (!localMatches.some(m => m.nameEn.toLowerCase() === term.toLowerCase() || m.nameId.toLowerCase() === term.toLowerCase())) {
          remoteResults.push({
            id: term.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            nameId: term,
            nameEn: term,
            formula: 'Molekul PubChem',
            isRemote: true,
            remoteQuery: term
          });
        }
      }
      return [...localMatches, ...remoteResults];
    }
  } catch (err) {
    // Network / timeout fallback
  }

  return localMatches;
}

/** Get full details of a molecule, either curated or directly fetched live from PubChem */
export async function getMoleculeDetails(idOrCidOrName) {
  if (!idOrCidOrName) return null;

  const curated = getCuratedMolecule(idOrCidOrName);
  if (curated) {
    if (curated.atoms3D && curated.atoms3D.length > 0) {
      return curated;
    }
  }

  const cacheKey = String(idOrCidOrName).toLowerCase();
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const queryTerm = translateQuery(curated ? curated.nameEn : idOrCidOrName);
  const isCid = /^\d+$/.test(String(idOrCidOrName).trim());

  try {
    const propUrl = isCid
      ? `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${idOrCidOrName}/property/MolecularFormula,MolecularWeight,IUPACName,XLogP,ExactMass,TPSA,RotatableBondCount,HBondDonorCount,HBondAcceptorCount,Charge/JSON`
      : `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(queryTerm)}/property/MolecularFormula,MolecularWeight,IUPACName,XLogP,ExactMass,TPSA,RotatableBondCount,HBondDonorCount,HBondAcceptorCount,Charge/JSON`;

    const propRes = await fetch(propUrl, { signal: AbortSignal.timeout(5000) });
    if (!propRes.ok) {
      return curated || null;
    }

    const propData = await propRes.json();
    const props = propData?.PropertyTable?.Properties?.[0];
    if (!props) return curated || null;

    const cid = props.CID;

    let descriptionText = '';
    try {
      const descUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/description/JSON`;
      const descRes = await fetch(descUrl, { signal: AbortSignal.timeout(4000) });
      if (descRes.ok) {
        const descData = await descRes.json();
        const info = descData?.InformationList?.Information?.find(i => i.Description);
        if (info?.Description) descriptionText = info.Description;
      }
    } catch (_) {}

    let parsed3D = null;
    try {
      const sdfUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/record/SDF/?record_type=3d`;
      const sdfRes = await fetch(sdfUrl, { signal: AbortSignal.timeout(4000) });
      if (sdfRes.ok) {
        const sdfText = await sdfRes.text();
        parsed3D = parseSDF(sdfText);
      }
    } catch (_) {}

    const result = {
      ...(curated || {}),
      id: curated?.id || String(cid),
      cid: cid,
      formula: props.MolecularFormula || curated?.formula || 'N/A',
      nameId: curated?.nameId || props.IUPACName || queryTerm,
      nameEn: curated?.nameEn || queryTerm,
      iupac: props.IUPACName || curated?.iupac || queryTerm,
      mass: parseFloat(props.MolecularWeight) || curated?.mass || 0,
      xlogp: props.XLogP ?? 'N/A',
      tpsa: props.TPSA ?? 'N/A',
      charge: props.Charge ?? 0,
      hBondDonor: props.HBondDonorCount ?? 0,
      hBondAcceptor: props.HBondAcceptorCount ?? 0,
      category: curated?.category || 'material',
      level: curated?.level || 'sma',
      stateAtSTP: curated?.stateAtSTP || 'solid',
      geometry: curated?.geometry || 'Geometri Berdasarkan PubChem 3D',
      polarity: curated?.polarity || (props.XLogP < 0 ? 'Polar' : 'Nonpolar'),
      summaryId: curated?.summaryId || descriptionText || 'Molekul resmi terverifikasi dari basis data PubChem NCBI/NIH.',
      summaryEn: curated?.summaryEn || descriptionText || 'Official verified compound from NIH/NCBI PubChem database.',
      detailsSD: curated?.detailsSD || `Molekul ini memiliki rumus kimia ${props.MolecularFormula} dengan nomor identifikasi PubChem CID ${cid}.`,
      detailsSMP: curated?.detailsSMP || `Senyawa ini memiliki massa molekul relatif (Mr) ${props.MolecularWeight} g/mol dan rumus molekul ${props.MolecularFormula}.`,
      detailsSMA: curated?.detailsSMA || `IUPAC: ${props.IUPACName}. Nilai TPSA ${props.TPSA} Å² dan LogP ${props.XLogP}, menunjukkan karakteristik polaritas dan permeabilitas membran.`,
      detailsKuliah: curated?.detailsKuliah || `Data PubChem CID ${cid}: Massa eksak ${props.ExactMass} Da, Donor Ikatan Hidrogen: ${props.HBondDonorCount}, Akseptor: ${props.HBondAcceptorCount}, Muatan Formal: ${props.Charge}.`,
      safety: curated?.safety || { health: 1, flammability: 1, instability: 0, ghs: ['safe'], noteId: 'Gunakan standar keselamatan kimia umum.', noteEn: 'Standard laboratory precautions apply.' },
      funFactsId: curated?.funFactsId || [`Molekul ini terdaftar secara resmi di National Center for Biotechnology Information (NCBI) dengan nomor CID ${cid}.`],
      funFactsEn: curated?.funFactsEn || [`Officially registered at the US National Center for Biotechnology Information under CID ${cid}.`],
      img2dUrl: `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG`,
      atoms3D: parsed3D?.atoms || curated?.atoms3D || [],
      bonds3D: parsed3D?.bonds || curated?.bonds3D || []
    };

    cache.set(cacheKey, result);
    return result;
  } catch (err) {
    return curated || null;
  }
}
