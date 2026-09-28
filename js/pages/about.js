// About: purpose, official data sources and licences, privacy, offline download and credits.
import { $, esc, toast } from '../core/dom.js';
import { S, pick, fmt } from '../core/prefs.js';
import { icon } from '../components/icons.js';
import { pageHead, extLink } from '../components/common.js';
import { CONFIG } from '../config.js';
import { MOLECULES } from '../data/curatedMolecules.js';
import { GLOSSARY } from '../data/glossary.js';
import { TOPICS } from '../data/topics/index.js';
import { LABS } from '../data/curriculum.js';
import { allDataFiles } from '../services/data.js';

const s = S({
  title: ['Tentang Moleculium', 'About Moleculium'],
  lead: [
    'Moleculium adalah atlas terbuka molekul, unsur, dan material dunia untuk pelajar SD sampai mahasiswa serta guru, bagian dari ekosistem Asadin Edu bersama BioTaxa.',
    'Moleculium is an open atlas of the world’s molecules, elements and materials for learners from primary school to university and their teachers, part of the Asadin Edu family alongside BioTaxa.',
  ],
  what: ['Apa isinya?', 'What is inside?'],
  whatList: [
    [
      '{m} kartu molekul, mineral, dan material yang ditulis untuk pelajar, dengan struktur 3D, foto, dan data PubChem.',
      'Tabel periodik 118 unsur dengan data resmi PubChem dan artikel Wikipedia.',
      'Pencarian ke lebih dari 100 juta senyawa PubChem, termasuk dengan nama bahasa Indonesia.',
      '{t} materi Kurikulum Merdeka untuk SD–kuliah, {l} laboratorium virtual, kuis, dan kamus {g} istilah.',
      'Ruang guru: modul ajar, lembar kerja, kartu flash, dan tautan tugas.',
    ],
    [
      '{m} learner-friendly cards for molecules, minerals and materials, with 3D structures, photos and PubChem data.',
      'A 118-element periodic table with official PubChem data and Wikipedia articles.',
      'Search across more than 100 million PubChem compounds, including by Indonesian name.',
      '{t} lessons for primary to university, {l} virtual labs, quizzes and a {g}-term glossary.',
      'A teacher room: lesson plans, worksheets, flashcards and assignment links.',
    ],
  ],
  sources: ['Sumber data resmi dan gratis', 'Official, free data sources'],
  pubchem: [
    'PubChem (National Library of Medicine, NIH, AS): sifat terhitung, struktur 2D/3D, data eksperimen, klasifikasi GHS, kegunaan, sinonim, dan tabel periodik. Data PubChem umumnya domain publik; data dari tiap penyumbang mengikuti ketentuan sumbernya yang dicantumkan.',
    'PubChem (US National Library of Medicine, NIH): computed properties, 2D/3D structures, experimental data, GHS classification, uses, synonyms and the periodic table. PubChem data are largely public domain; contributed data follow the terms of the credited source.',
  ],
  wikidata: [
    'Wikidata (CC0): penghubung antara PubChem, nama bahasa Indonesia, artikel Wikipedia, dan foto.',
    'Wikidata (CC0): links PubChem, Indonesian names, Wikipedia articles and photos.',
  ],
  wikipedia: [
    'Wikipedia bahasa Indonesia dan Inggris (CC BY-SA 4.0): bagian pembuka artikel, selalu ditampilkan dengan tautan ke artikelnya.',
    'Indonesian and English Wikipedia (CC BY-SA 4.0): article leads, always shown with a link to the article.',
  ],
  commons: [
    'Wikimedia Commons: foto zat dan unsur dengan nama pembuat dan lisensi masing-masing.',
    'Wikimedia Commons: photos of substances and elements with each author and licence.',
  ],
  how: [
    'Data katalog disinkronkan dari sumber-sumber ini dengan skrip terbuka (npm run sync), lalu disimpan agar cepat dan bisa dipakai offline. Senyawa di luar katalog diambil langsung saat dibuka.',
    'Catalogue data are synced from these sources by open scripts (npm run sync) and stored for speed and offline use. Compounds outside the catalogue are fetched live when opened.',
  ],
  privacy: ['Privasi', 'Privacy'],
  privacyText: [
    'Tanpa akun, iklan, cookie pelacak, atau analitik. Simpanan, catatan, dan kemajuan hanya ada di perangkatmu. Saat mencari atau membuka senyawa baru, browser menghubungi PubChem dan Wikimedia secara langsung atau melalui server Moleculium.',
    'No accounts, ads, tracking cookies or analytics. Bookmarks, notes and progress live only on your device. When you search or open new compounds, your browser contacts PubChem and Wikimedia directly or through the Moleculium server.',
  ],
  offline: ['Pakai tanpa internet', 'Use offline'],
  offlineText: [
    'Moleculium adalah aplikasi web progresif (PWA): bisa dipasang di layar utama dan tetap berjalan tanpa internet. Tekan tombol di bawah saat ada Wi-Fi untuk menyimpan seluruh data katalog dan 118 unsur ({n} berkas).',
    'Moleculium is a progressive web app (PWA): install it on your home screen and it works without internet. Press the button below on Wi-Fi to store all catalogue and element data ({n} files).',
  ],
  offlineBtn: ['Simpan semua untuk offline', 'Save everything for offline'],
  offlineWorking: ['Menyimpan… {done}/{total}', 'Saving… {done}/{total}'],
  offlineDone: ['Selesai. Data katalog siap dipakai offline.', 'Done. Catalogue data is ready offline.'],
  offlineNo: [
    'Fitur ini memerlukan HTTPS atau localhost dan browser yang mendukung service worker.',
    'This needs HTTPS or localhost and a browser with service workers.',
  ],
  limits: ['Batasan', 'Limitations'],
  limitsText: [
    'Moleculium adalah alat belajar, bukan petunjuk medis, farmasi, atau keselamatan kerja. Data eksperimen dan klasifikasi bahaya berasal dari sumber PubChem apa adanya dan dapat berbeda antarsumber. Selalu ikuti lembar data keselamatan (SDS) dan pengawasan guru di laboratorium.',
    'Moleculium is a learning tool, not medical, pharmaceutical or workplace-safety advice. Experimental data and hazard classifications come from PubChem sources as published and may differ between sources. Always follow safety data sheets (SDS) and a teacher’s supervision in the lab.',
  ],
  license: ['Lisensi & kode', 'Licence & code'],
  licenseText: [
    'Kode sumber: MIT. Materi belajar (teks kartu, materi, kuis, kamus): CC BY-SA 4.0. Teks Wikipedia: CC BY-SA 4.0. Foto: lisensi masing-masing di Commons.',
    'Source code: MIT. Learning content (cards, lessons, quizzes, glossary): CC BY-SA 4.0. Wikipedia text: CC BY-SA 4.0. Photos: their own Commons licences.',
  ],
  cite: ['Cara mengutip', 'How to cite'],
  family: ['Keluarga Asadin Edu', 'The Asadin Edu family'],
  familyText: [
    'BioTaxa adalah atlas makhluk hidup; Moleculium adalah atlas molekul dan materi. Keduanya terbuka, dwibahasa, dan bebas dipakai sekolah.',
    'BioTaxa is the atlas of living things; Moleculium is the atlas of molecules and matter. Both are open, bilingual and free for schools.',
  ],
  repo: ['Kode sumber & laporan masalah', 'Source code & issue reports'],
});

export const title = () => s.title;

export function render({ main }) {
  const list = s.whatList.map(x =>
    fmt(x, { m: MOLECULES.length, t: TOPICS.length, l: LABS.length, g: GLOSSARY.length })
  );
  main.innerHTML = `<div class="container narrow prose">
    ${pageHead({ title: esc(s.title), lead: esc(s.lead) })}
    <h2>${esc(s.what)}</h2><ul>${list.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    <h2>${esc(s.sources)}</h2>
    <ul class="sources">
      <li>${icon('flask', { size: 18 })} ${esc(s.pubchem)} ${extLink('https://pubchem.ncbi.nlm.nih.gov/', 'pubchem.ncbi.nlm.nih.gov')}</li>
      <li>${icon('link', { size: 18 })} ${esc(s.wikidata)} ${extLink('https://www.wikidata.org/', 'wikidata.org')}</li>
      <li>${icon('book', { size: 18 })} ${esc(s.wikipedia)} ${extLink('https://id.wikipedia.org/', 'id.wikipedia.org')}</li>
      <li>${icon('palette', { size: 18 })} ${esc(s.commons)} ${extLink('https://commons.wikimedia.org/', 'commons.wikimedia.org')}</li>
    </ul>
    <p class="muted">${esc(s.how)}</p>
    <h2>${esc(s.offline)}</h2>
    <p data-offline-text>${esc(s.offlineText.replace('{n}', '…'))}</p>
    <p><button class="btn btn-primary" type="button" data-offline>${icon('download', { size: 16 })} ${esc(s.offlineBtn)}</button></p>
    <p class="muted" data-offline-status aria-live="polite"></p>
    <h2>${esc(s.privacy)}</h2><p>${esc(s.privacyText)}</p>
    <h2>${esc(s.limits)}</h2><p>${esc(s.limitsText)}</p>
    <h2>${esc(s.license)}</h2><p>${esc(s.licenseText)}</p>
    <h2>${esc(s.cite)}</h2><p class="mono">Moleculium · Asadin Edu (${new Date().getFullYear()}). ${esc(pick(['Atlas molekul, unsur, dan material dunia.', 'World atlas of molecules, elements and materials.']))} ${esc(location.origin)}</p>
    <h2>${esc(s.family)}</h2><p>${esc(s.familyText)}</p>
    <p>${extLink(CONFIG.repository, s.repo)}</p>
  </div>`;

  allDataFiles().then(files => {
    $('[data-offline-text]', main).textContent = s.offlineText.replace('{n}', files.length);
  });
  $('[data-offline]', main).addEventListener('click', async e => {
    const status = $('[data-offline-status]', main);
    if (!('caches' in window) || !navigator.serviceWorker?.controller) {
      status.textContent = s.offlineNo;
      return;
    }
    e.currentTarget.disabled = true;
    const files = await allDataFiles();
    const cache = await caches.open('moleculium-data-v1');
    let done = 0;
    const queue = [...files];
    await Promise.all(
      Array.from({ length: 6 }, async () => {
        while (queue.length) {
          const path = queue.shift();
          try {
            const res = await fetch(path);
            if (res.ok) await cache.put(new URL(path, document.baseURI).href, res);
          } catch {}
          done++;
          if (done % 10 === 0 || done === files.length)
            status.textContent = fmt(s.offlineWorking, { done, total: files.length });
        }
      })
    );
    status.textContent = s.offlineDone;
    toast(s.offlineDone);
  });
}
