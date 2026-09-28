# Sumber data dan lisensi

Semua sumber resmi, gratis, dan tanpa kunci API. Data katalog disinkronkan oleh skrip terbuka dan disimpan di
`data/` serta `js/data/periodicTable.js`; senyawa di luar katalog diambil langsung saat dibuka.

| Sumber                                                                       | Yang diambil                                                                                                                                                                 | Lisensi / ketentuan                                                                                                                   | Skrip                                       |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| [PubChem PUG REST](https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest) (NLM/NIH) | Sifat terhitung (rumus, massa, IUPAC, SMILES, InChI, XLogP, TPSA, …), sinonim, deskripsi, rekaman SDF 2D dan 3D, pencarian nama/rumus/substruktur                            | Data PubChem umumnya domain publik; data dari penyumbang (mis. HSDB, ECHA, ChEBI) mengikuti ketentuan sumber yang dicantumkan PubChem | `sync-molecules.mjs`, `services/pubchem.js` |
| [PubChem PUG View](https://pubchem.ncbi.nlm.nih.gov/docs/pug-view)           | Data eksperimen, klasifikasi GHS (blok ECHA C&L dengan laporan terbanyak), kegunaan                                                                                          | Idem; nama sumber ditampilkan di halaman molekul (mode Kuliah)                                                                        | `services/pugview.js`                       |
| [PubChem Periodic Table](https://pubchem.ncbi.nlm.nih.gov/periodic-table/)   | 118 unsur: massa, konfigurasi, keelektronegatifan, jari-jari, energi ionisasi, afinitas, biloks, wujud, titik leleh/didih, massa jenis, kategori, tahun ditemukan, warna CPK | Domain publik                                                                                                                         | `sync-elements.mjs`                         |
| [Wikidata](https://www.wikidata.org/)                                        | Item per CID (P662) atau per nomor atom, gambar (P18), tautan Wikipedia, label Indonesia untuk pencarian                                                                     | CC0                                                                                                                                   | kedua skrip, `services/wiki.js`             |
| [Wikipedia](https://www.wikipedia.org/) (id, en)                             | Bagian pembuka artikel                                                                                                                                                       | CC BY-SA 4.0 — selalu ditampilkan dengan judul dan tautan artikel                                                                     | kedua skrip, `services/wiki.js`             |
| [Wikimedia Commons](https://commons.wikimedia.org/)                          | Foto zat dan unsur                                                                                                                                                           | Lisensi masing-masing berkas; nama pembuat, lisensi, dan tautan ditampilkan di bawah foto                                             | kedua skrip, `services/wiki.js`             |

## Kebijakan pemakaian yang dipatuhi

- PubChem: maksimal 5 permintaan per detik. Skrip sinkronisasi memakai jeda 260 ms; server/Function Moleculium
  menjeda dan meng-cache permintaan untuk seluruh kelas; browser tanpa server membatasi diri ~4/detik.
- Wikimedia: User-Agent deskriptif pada skrip sinkronisasi; permintaan browser memakai `origin=*`.

## Nilai yang perlu dipahami

- **Data eksperimen** ditampilkan apa adanya dari sumber (bahasa Inggris, satuan asli). Nilai dapat berbeda antarsumber.
- **GHS**: bila sebagian besar laporan ke ECHA menyatakan zat tidak memenuhi kriteria bahaya, Moleculium menampilkan
  persentasenya (misalnya air 99,5%) agar pelajar tidak salah paham. Terjemahan pernyataan bahaya ke Bahasa Indonesia
  mengikuti kode H internasional.
- **Polimer dan alotrop** memakai CID monomer atau unsur sebagai model; halaman molekul menampilkan catatannya.
- **Model kisi kristal** dibangun dari sel satuan ideal dengan konstanta kisi terukur; ini model pembelajaran, bukan
  hasil difraksi.
