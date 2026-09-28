// Atoms: #/atom is the hub for atomic structure; #/atom/<symbol> is an element profile.
import { $, esc, safeURL } from '../core/dom.js';
import { S, pick, fmt, num, atLeast, depth } from '../core/prefs.js';
import { icon } from '../components/icons.js';
import { pageHead, breadcrumbs, loading, extLink } from '../components/common.js';
import { moleculeCard } from '../components/cards.js';
import { bohrSVG, orbitalBoxes, subshells, configText, valenceOf } from '../components/bohr.js';
import { ELEMENTS, CATEGORIES, getElement } from '../data/periodicTable.js';
import { MOLECULES } from '../data/curatedMolecules.js';
import { moleculeIndex, elementRecord } from '../services/data.js';
import { parseFormula } from '../services/formula.js';
import { trackVisit } from '../core/userdata.js';

const s = S({
  hubTitle: ['Atom: batu bata alam semesta', 'Atoms: the building blocks of everything'],
  hubLead: [
    'Setiap zat tersusun atas atom. Kenali partikel penyusunnya, cara elektron tersusun, dan mengapa unsur berbeda-beda.',
    'Everything is made of atoms. Meet their particles, how electrons are arranged and why elements differ.',
  ],
  particles: ['Tiga partikel penyusun atom', 'Three particles inside an atom'],
  proton: [
    'Proton (p⁺): bermuatan +1, di inti. Jumlahnya = nomor atom, menentukan jenis unsur.',
    'Proton (p⁺): charge +1, in the nucleus. Their number = atomic number, deciding the element.',
  ],
  neutron: [
    'Neutron (n⁰): netral, di inti. Jumlahnya membedakan isotop.',
    'Neutron (n⁰): neutral, in the nucleus. Their number distinguishes isotopes.',
  ],
  electron: [
    'Elektron (e⁻): bermuatan −1, bergerak di kulit/orbital. Elektron terluar menentukan reaksi.',
    'Electron (e⁻): charge −1, in shells/orbitals. The outermost ones decide reactions.',
  ],
  scale: [
    'Jika inti atom sebesar kelereng di tengah lapangan sepak bola, elektronnya beredar sejauh tribun penonton. Atom hampir seluruhnya ruang kosong!',
    'If the nucleus were a marble at the centre of a football pitch, the electrons would be out in the stands. Atoms are almost entirely empty space!',
  ],
  tryElement: ['Coba unsur', 'Try an element'],
  explore: ['Jelajahi lebih lanjut', 'Explore further'],
  // element page
  notFound: ['Unsur tidak ditemukan.', 'Element not found.'],
  atomicNumber: ['Nomor atom', 'Atomic number'],
  mass: ['Massa atom relatif', 'Relative atomic mass'],
  group: ['Golongan', 'Group'],
  period: ['Periode', 'Period'],
  block: ['Blok', 'Block'],
  category: ['Kategori', 'Category'],
  state: ['Wujud (25 °C)', 'State (25 °C)'],
  config: ['Konfigurasi elektron', 'Electron configuration'],
  shells: ['Elektron per kulit', 'Electrons per shell'],
  valence: ['Elektron valensi', 'Valence electrons'],
  eneg: ['Keelektronegatifan (Pauling)', 'Electronegativity (Pauling)'],
  radius: ['Jari-jari atom', 'Atomic radius'],
  ie: ['Energi ionisasi pertama', 'First ionisation energy'],
  ea: ['Afinitas elektron', 'Electron affinity'],
  ox: ['Bilangan oksidasi', 'Oxidation states'],
  mp: ['Titik leleh', 'Melting point'],
  bp: ['Titik didih', 'Boiling point'],
  density: ['Massa jenis', 'Density'],
  year: ['Ditemukan', 'Discovered'],
  ancient: ['Zaman kuno', 'Antiquity'],
  bohr: ['Model atom Bohr', 'Bohr model'],
  orbitals: ['Diagram orbital', 'Orbital diagram'],
  molecules: ['Molekul yang mengandung {name}', 'Molecules containing {name}'],
  noMolecules: [
    'Belum ada molekul katalog dengan unsur ini. Cari di PubChem lewat halaman Jelajah.',
    'No catalogue molecules with this element yet. Search PubChem from Explore.',
  ],
  wiki: ['Ensiklopedia', 'Encyclopedia'],
  photoBy: [
    'Foto: {author} · {license} · Wikimedia Commons',
    'Photo: {author} · {license} · Wikimedia Commons',
  ],
  labLink: ['Buka di lab Konfigurasi elektron', 'Open in the Electron configuration lab'],
  prev: ['Unsur sebelumnya', 'Previous element'],
  next: ['Unsur berikutnya', 'Next element'],
  states: { solid: ['Padat', 'Solid'], liquid: ['Cair', 'Liquid'], gas: ['Gas', 'Gas'] },
});

export const title = route => {
  if (!route.id) return pick(['Atom', 'Atoms']);
  const e = getElement(route.id);
  return e ? pick([e.id, e.en]) : pick(['Unsur', 'Element']);
};

export async function render({ id, main, isCurrent }) {
  if (!id) return renderHub(main);
  const e = getElement(id);
  if (!e) {
    main.innerHTML = `<section class="container page-state"><h1>${esc(s.notFound)}</h1><a class="btn" href="#/table">${esc(pick(['Tabel periodik', 'Periodic table']))}</a></section>`;
    return;
  }
  trackVisit(`el:${e.s}`, pick([e.id, e.en]));
  main.innerHTML = `<div class="container">${loading()}</div>`;
  const [rec, idx] = await Promise.all([elementRecord(e.z).catch(() => null), moleculeIndex()]);
  if (!isCurrent()) return;
  const parts = subshells(e.conf, e.z);
  const cat = CATEGORIES[e.cat];
  const withEl = MOLECULES.filter(m => {
    const f = idx.get(m.id)?.formula;
    return f && parseFormula(f).counts?.[e.s];
  });
  const lv = depth();
  const prev = ELEMENTS[e.z - 2];
  const next = ELEMENTS[e.z];
  const wiki = pick([rec?.wiki?.id, rec?.wiki?.en]) || rec?.wiki?.en || rec?.wiki?.id;
  const paras = wiki?.extract?.split('\n').filter(Boolean) || [];
  const photo =
    rec?.photo && rec.photo.kind !== 'diagram' && !/\.svg$/i.test(rec.photo.file) ? rec.photo : null;
  const stateName = s.states?.[e.state] ? pick(s.states[e.state]) : e.state || '–';

  const facts = [
    [s.atomicNumber, e.z],
    [s.mass, e.m != null ? `${e.m} u` : '–'],
    [s.category, pick(cat.name)],
    [s.group, e.group ?? `${pick(['deret', 'series'])} ${e.block}`],
    [s.period, e.period],
    [s.block, e.block],
    [s.state, stateName],
    atLeast('smp') ? [s.shells, e.shells.join(' · ')] : null,
    atLeast('smp') && ['s', 'p'].includes(e.block) ? [s.valence, valenceOf(parts)] : null,
    atLeast('sma') ? [s.config, `${configText(parts)}`] : null,
    atLeast('sma') ? [s.eneg, e.eneg ?? '–'] : null,
    atLeast('sma') ? [s.radius, e.rad ? `${e.rad} pm` : '–'] : null,
    atLeast('sma') ? [s.ie, e.ie ? `${num(e.ie, 3)} eV` : '–'] : null,
    lv === 'kuliah' ? [s.ea, e.ea != null ? `${num(e.ea, 3)} eV` : '–'] : null,
    atLeast('sma') ? [s.ox, e.ox || '–'] : null,
    atLeast('smp') ? [s.mp, e.mp ? `${num(e.mp, 1)} K (${num(e.mp - 273.15, 1)} °C)` : '–'] : null,
    atLeast('smp') ? [s.bp, e.bp ? `${num(e.bp, 1)} K (${num(e.bp - 273.15, 1)} °C)` : '–'] : null,
    atLeast('smp') ? [s.density, e.d != null ? `${num(e.d, e.d < 0.01 ? 6 : 3)} g/cm³` : '–'] : null,
    [s.year, e.year === 0 ? s.ancient : (e.year ?? '–')],
  ].filter(Boolean);

  main.innerHTML = `<article class="container element-page" style="--accent:${cat.color}">
    ${breadcrumbs([
      [pick(['Tabel periodik', 'Periodic table']), '#/table'],
      [pick([e.id, e.en]), ''],
    ])}
    <header class="element-head">
      <div class="element-big" aria-hidden="true"><span class="z">${e.z}</span><span class="sym">${esc(e.s)}</span><span class="nm">${esc(pick([e.id, e.en]))}</span><span class="m">${e.m ?? ''}</span></div>
      <div>
        <p class="eyebrow">${esc(pick(cat.name))}</p>
        <h1>${esc(pick([e.id, e.en]))} <span class="muted">(${esc(e.s)})</span></h1>
        <p class="mol-other">${esc(pick([e.en, e.id]))}</p>
        <nav class="el-nav" aria-label="${esc(pick(['Unsur lain', 'Other elements']))}">
          ${prev ? `<a class="btn btn-small" href="#/atom/${prev.s}" aria-label="${esc(s.prev)}: ${esc(pick([prev.id, prev.en]))}">${`← ${esc(prev.s)}`}</a>` : ''}
          ${next ? `<a class="btn btn-small" href="#/atom/${next.s}" aria-label="${esc(s.next)}: ${esc(pick([next.id, next.en]))}">${`${esc(next.s)} →`}</a>` : ''}
        </nav>
      </div>
    </header>
    <div class="element-grid">
      <div class="card">
        <table class="data-table"><tbody>${facts.map(([k, v]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}</tbody></table>
        <p class="source-line">${esc(pick(['Sumber', 'Source']))}: ${extLink(`https://pubchem.ncbi.nlm.nih.gov/element/${e.z}`, 'PubChem Periodic Table')}</p>
      </div>
      <div class="element-visuals">
        ${photo ? `<figure class="mol-photo"><img src="${esc(safeURL(photo.thumb))}" alt="${esc(pick(['Foto', 'Photo']))}: ${esc(pick([e.id, e.en]))}" width="${photo.width || 640}" height="${photo.height || 480}" loading="lazy" data-fallback="remove" /><figcaption>${esc(fmt(s.photoBy, { author: photo.author, license: photo.license || '—' }))}${safeURL(photo.page) ? ` · <a href="${esc(safeURL(photo.page))}" target="_blank" rel="noopener">${esc(pick(['sumber', 'source']))}</a>` : ''}</figcaption></figure>` : ''}
        <figure class="card bohr-card"><figcaption class="h-small">${esc(s.bohr)}</figcaption>${bohrSVG(e.shells, e.s, 240)}</figure>
      </div>
    </div>
    ${atLeast('sma') ? `<section class="card"><h2 class="h-small">${esc(s.orbitals)}</h2>${orbitalBoxes(parts)}<p><a href="#/lab/orbital?z=${e.z}">${esc(s.labLink)}</a></p></section>` : ''}
    ${
      paras.length
        ? `<section class="mol-section"><h2>${esc(s.wiki)}</h2><div class="wiki">${(lv === 'sd' ? paras.slice(0, 1) : lv === 'smp' ? paras.slice(0, 2) : paras).map(p => `<p>${esc(p)}</p>`).join('')}</div>
      <p class="source-line">Wikipedia, CC BY-SA 4.0 · ${extLink(wiki.url, wiki.title)}</p></section>`
        : ''
    }
    <section class="mol-section">
      <h2>${esc(fmt(s.molecules, { name: pick([e.id, e.en]) }))}</h2>
      ${
        withEl.length
          ? `<div class="grid grid-cards">${withEl
              .slice(0, 16)
              .map(m => moleculeCard(m, idx.get(m.id)))
              .join('')}</div>`
          : `<p class="muted">${esc(s.noMolecules)}</p>`
      }
      <p><a class="link-more" href="#/explore?q=${encodeURIComponent(e.s)}">${icon('search', { size: 16 })} ${esc(pick(['Cari senyawa lain di PubChem', 'Search more compounds in PubChem']))}</a></p>
    </section>
  </article>`;
}

function renderHub(main) {
  const sample = ['H', 'C', 'O', 'Na', 'Fe', 'Au'].map(getElement);
  main.innerHTML = `<div class="container">
    ${pageHead({ title: esc(s.hubTitle), lead: esc(s.hubLead) })}
    <section class="grid grid-2">
      <div class="card">
        <h2 class="h-small">${esc(s.particles)}</h2>
        <ul class="particles">
          <li><span class="dot dot-p" aria-hidden="true"></span>${esc(s.proton)}</li>
          <li><span class="dot dot-n" aria-hidden="true"></span>${esc(s.neutron)}</li>
          <li><span class="dot dot-e" aria-hidden="true"></span>${esc(s.electron)}</li>
        </ul>
        <p class="muted">${esc(s.scale)}</p>
      </div>
      <div class="card center">
        <label class="field"><span>${esc(s.tryElement)}</span>
          <select data-pick>${ELEMENTS.map(e => `<option value="${e.s}" ${e.s === 'C' ? 'selected' : ''}>${e.z}. ${esc(pick([e.id, e.en]))} (${e.s})</option>`).join('')}</select></label>
        <div data-bohr>${bohrSVG(getElement('C').shells, 'C', 240)}</div>
        <p data-shells class="formula">${getElement('C').shells.join(' · ')}</p>
      </div>
    </section>
    <section>
      <h2>${esc(s.explore)}</h2>
      <div class="grid grid-4">
        <a class="card lab-card" href="#/table"><span class="topic-icon">${icon('table', { size: 24 })}</span><span class="card-title">${esc(pick(['Tabel periodik', 'Periodic table']))}</span><span class="card-text">${esc(pick(['118 unsur dengan data PubChem', '118 elements with PubChem data']))}</span></a>
        <a class="card lab-card" href="#/lab/orbital"><span class="topic-icon">${icon('atom', { size: 24 })}</span><span class="card-title">${esc(pick(['Lab konfigurasi elektron', 'Electron configuration lab']))}</span><span class="card-text">${esc(pick(['Aufbau, Pauli, Hund, dan bentuk orbital', 'Aufbau, Pauli, Hund and orbital shapes']))}</span></a>
        <a class="card lab-card" href="#/lab/nyala"><span class="topic-icon">${icon('flame', { size: 24 })}</span><span class="card-title">${esc(pick(['Uji nyala logam', 'Flame tests']))}</span><span class="card-text">${esc(pick(['Warna nyala dari loncatan elektron', 'Flame colours from electron jumps']))}</span></a>
        <a class="card lab-card" href="#/learn/atom"><span class="topic-icon">${icon('book', { size: 24 })}</span><span class="card-title">${esc(pick(['Materi: Atom dan strukturnya', 'Lesson: Atoms and their structure']))}</span><span class="card-text">${esc(pick(['Dari Dalton sampai mekanika kuantum', 'From Dalton to quantum mechanics']))}</span></a>
      </div>
      <p class="hero-try">${sample.map(e => `<a class="chip" href="#/atom/${e.s}">${esc(e.s)} · ${esc(pick([e.id, e.en]))}</a>`).join(' ')}</p>
    </section>
  </div>`;
  const select = $('[data-pick]', main);
  select.addEventListener('change', () => {
    const e = getElement(select.value);
    $('[data-bohr]', main).innerHTML = bohrSVG(e.shells, e.s, 240);
    $('[data-shells]', main).textContent = e.shells.join(' · ');
  });
}
