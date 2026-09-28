// GHS hazard communication: the nine pictograms (drawn here so they work offline) and Indonesian
// translations of the hazard statements (H-codes) that PubChem reports in English.
import { esc } from '../core/dom.js';
import { pick, lang } from '../core/prefs.js';

export const PICTOGRAMS = {
  GHS01: {
    name: ['Bahan peledak', 'Explosive'],
    draw: '<circle cx="46" cy="60" r="11" fill="#000"/><path d="M52 50l6-8M58 56l9-3M50 45l1-9M40 48l-5-7M60 62l9 4" stroke="#000" stroke-width="4" stroke-linecap="round"/>',
  },
  GHS02: {
    name: ['Mudah menyala', 'Flammable'],
    draw: '<path d="M50 24c3 10 14 14 14 29a14 14 0 0 1-28 0c0-7 4-11 7-15 0 5 2 8 5 9-2-8 0-15 2-23z" fill="#000"/><rect x="30" y="70" width="40" height="5" fill="#000"/>',
  },
  GHS03: {
    name: ['Pengoksidasi', 'Oxidiser'],
    draw: '<circle cx="50" cy="62" r="11" fill="none" stroke="#000" stroke-width="5"/><path d="M50 22c3 8 10 11 10 20a10 10 0 0 1-20 0c0-5 3-8 5-11 0 4 1 6 3 7-1-6 0-11 2-16z" fill="#000"/><rect x="30" y="75" width="40" height="4" fill="#000"/>',
  },
  GHS04: {
    name: ['Gas bertekanan', 'Gas under pressure'],
    draw: '<rect x="27" y="44" width="46" height="18" rx="9" transform="rotate(-30 50 53)" fill="#000"/><rect x="68" y="30" width="7" height="10" transform="rotate(-30 71 35)" fill="#000"/>',
  },
  GHS05: {
    name: ['Korosif', 'Corrosive'],
    draw: '<rect x="28" y="24" width="10" height="20" rx="2" transform="rotate(20 33 34)" fill="#000"/><rect x="60" y="24" width="10" height="20" rx="2" transform="rotate(-20 65 34)" fill="#000"/><circle cx="37" cy="52" r="3" fill="#000"/><circle cx="62" cy="52" r="3" fill="#000"/><path d="M25 70h20v6H25zM55 66h20l-4 10H55z" fill="#000"/>',
  },
  GHS06: {
    name: ['Toksisitas akut', 'Acute toxicity'],
    draw: '<path d="M30 70l40-18M30 52l40 18" stroke="#000" stroke-width="6" stroke-linecap="round"/><ellipse cx="50" cy="38" rx="14" ry="13" fill="#000"/><rect x="43" y="47" width="14" height="8" fill="#000"/><circle cx="44" cy="37" r="4" fill="#fff"/><circle cx="56" cy="37" r="4" fill="#fff"/>',
  },
  GHS07: {
    name: ['Berbahaya / iritan', 'Harmful / irritant'],
    draw: '<rect x="44" y="24" width="12" height="36" rx="4" fill="#000"/><circle cx="50" cy="70" r="7" fill="#000"/>',
  },
  GHS08: {
    name: ['Bahaya kesehatan serius', 'Serious health hazard'],
    draw: '<circle cx="50" cy="30" r="9" fill="#000"/><path d="M30 76c0-18 8-30 20-30s20 12 20 30z" fill="#000"/><path d="M50 52l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#fff"/>',
  },
  GHS09: {
    name: ['Bahaya lingkungan', 'Environmental hazard'],
    draw: '<path d="M34 72V40M34 48l-8-8M34 54l9-9M34 60l-7-4" stroke="#000" stroke-width="4" stroke-linecap="round"/><path d="M48 66c6-8 18-8 24 0-6 8-18 8-24 0zM72 66l6-5v10z" fill="#000"/><path d="M28 76h46" stroke="#000" stroke-width="3"/>',
  },
};

export function pictogram(code, size = 64) {
  const p = PICTOGRAMS[code];
  if (!p) return '';
  const label = `${code}: ${pick(p.name)}`;
  return `<figure class="ghs-pic"><svg width="${size}" height="${size}" viewBox="0 0 100 100" role="img" aria-label="${esc(label)}"><polygon points="50,4 96,50 50,96 4,50" fill="#fff" stroke="#e2231a" stroke-width="7" stroke-linejoin="round"/>${p.draw}</svg><figcaption>${esc(pick(p.name))}</figcaption></figure>`;
}

const H_ID = {
  H200: 'Bahan peledak tidak stabil',
  H201: 'Bahan peledak; bahaya ledakan massal',
  H202: 'Bahan peledak; bahaya lontaran serpihan berat',
  H203: 'Bahan peledak; bahaya api, ledakan, atau lontaran',
  H204: 'Bahaya api atau lontaran',
  H205: 'Dapat meledak massal jika terbakar',
  H220: 'Gas amat sangat mudah menyala',
  H221: 'Gas mudah menyala',
  H222: 'Aerosol amat sangat mudah menyala',
  H223: 'Aerosol mudah menyala',
  H224: 'Cairan dan uap amat sangat mudah menyala',
  H225: 'Cairan dan uap sangat mudah menyala',
  H226: 'Cairan dan uap mudah menyala',
  H228: 'Padatan mudah menyala',
  H229: 'Wadah bertekanan: dapat meledak jika dipanaskan',
  H230: 'Dapat bereaksi eksplosif walaupun tanpa udara',
  H231: 'Dapat bereaksi eksplosif walaupun tanpa udara pada tekanan atau suhu tinggi',
  H240: 'Dapat meledak jika dipanaskan',
  H241: 'Dapat terbakar atau meledak jika dipanaskan',
  H242: 'Dapat terbakar jika dipanaskan',
  H250: 'Menyala sendiri jika terkena udara',
  H251: 'Memanas sendiri; dapat terbakar',
  H252: 'Memanas sendiri dalam jumlah besar; dapat terbakar',
  H260: 'Bila terkena air melepaskan gas mudah menyala yang dapat menyala sendiri',
  H261: 'Bila terkena air melepaskan gas mudah menyala',
  H270: 'Dapat menyebabkan atau memperhebat kebakaran; oksidator',
  H271: 'Dapat menyebabkan kebakaran atau ledakan; oksidator kuat',
  H272: 'Dapat memperhebat kebakaran; oksidator',
  H280: 'Berisi gas bertekanan; dapat meledak jika dipanaskan',
  H281: 'Berisi gas yang sangat dingin; dapat menyebabkan luka bakar dingin',
  H290: 'Dapat korosif terhadap logam',
  H300: 'Fatal jika tertelan',
  H301: 'Toksik jika tertelan',
  H302: 'Berbahaya jika tertelan',
  H304: 'Dapat fatal jika tertelan dan masuk ke saluran napas',
  H310: 'Fatal jika terkena kulit',
  H311: 'Toksik jika terkena kulit',
  H312: 'Berbahaya jika terkena kulit',
  H314: 'Menyebabkan kulit terbakar parah dan kerusakan mata',
  H315: 'Menyebabkan iritasi kulit',
  H317: 'Dapat menyebabkan reaksi alergi pada kulit',
  H318: 'Menyebabkan kerusakan mata yang serius',
  H319: 'Menyebabkan iritasi mata yang serius',
  H330: 'Fatal jika terhirup',
  H331: 'Toksik jika terhirup',
  H332: 'Berbahaya jika terhirup',
  H334: 'Dapat menyebabkan alergi, gejala asma, atau sesak napas jika terhirup',
  H335: 'Dapat menyebabkan iritasi saluran pernapasan',
  H336: 'Dapat menyebabkan kantuk atau pusing',
  H340: 'Dapat menyebabkan cacat genetik',
  H341: 'Diduga dapat menyebabkan cacat genetik',
  H350: 'Dapat menyebabkan kanker',
  H351: 'Diduga dapat menyebabkan kanker',
  H360: 'Dapat merusak kesuburan atau janin',
  H361: 'Diduga dapat merusak kesuburan atau janin',
  H362: 'Dapat membahayakan bayi yang menyusu',
  H370: 'Menyebabkan kerusakan organ',
  H371: 'Dapat menyebabkan kerusakan organ',
  H372: 'Menyebabkan kerusakan organ melalui paparan lama atau berulang',
  H373: 'Dapat menyebabkan kerusakan organ melalui paparan lama atau berulang',
  H400: 'Sangat toksik bagi kehidupan akuatik',
  H401: 'Toksik bagi kehidupan akuatik',
  H402: 'Berbahaya bagi kehidupan akuatik',
  H410: 'Sangat toksik bagi kehidupan akuatik dengan efek jangka panjang',
  H411: 'Toksik bagi kehidupan akuatik dengan efek jangka panjang',
  H412: 'Berbahaya bagi kehidupan akuatik dengan efek jangka panjang',
  H413: 'Dapat menimbulkan efek berbahaya jangka panjang bagi kehidupan akuatik',
  H420: 'Merusak kesehatan masyarakat dan lingkungan dengan merusak ozon di atmosfer atas',
};

/** "H302 (98.9%): Harmful if swallowed" → { code, pct, text } in the current language. */
export function hazardStatement(raw) {
  const m = String(raw).match(/^(H\d{3}[A-Za-z]*)(?:\+H\d{3})*\s*(\(([^)]*)\))?:\s*(.*)$/);
  if (!m) return { code: '', pct: '', text: raw };
  const code = m[1].slice(0, 4);
  const text = lang() === 'id' && H_ID[code] ? H_ID[code] : m[4];
  return { code: m[1], pct: m[3] || '', text };
}

export const SIGNAL = { Danger: ['Bahaya', 'Danger'], Warning: ['Peringatan', 'Warning'] };
