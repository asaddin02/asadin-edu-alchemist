# Moleculium · Asadin Edu

Atlas terbuka **molekul, unsur, dan material dunia** untuk pelajar SD sampai mahasiswa, serta guru.
Dwibahasa (Bahasa Indonesia dan English), tanpa akun, tanpa iklan, tanpa analitik, dan bisa dipakai offline.
Saudara dari [BioTaxa](https://github.com/asaddin02/asadin-edu-biotaxa) dalam keluarga Asadin Edu.

> _English summary:_ Moleculium is an open, bilingual chemistry atlas: 292 curated molecules and materials with
> PubChem data, 3D models and licensed photos; all 118 elements; search across 100+ million PubChem compounds;
> 14 curriculum lessons with 116 quiz questions; 13 virtual labs; a teacher room. No framework, no build step,
> no tracking.

## Isi

| Bagian                  | Isi                                                                                                                                                                                                                                                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Katalog**             | 292 kartu molekul, mineral, dan material yang ditulis untuk pelajar: unsur dan alotrop, senyawa anorganik (hidrida, oksida, asam, basa, garam, kompleks), mineral, senyawa organik per gugus fungsi, biomolekul, obat, polimer, keramik, semikonduktor, nanomaterial, dan material baterai.                                          |
| **Data resmi**          | Sifat terhitung, struktur 2D/3D, data eksperimen (titik leleh/didih, massa jenis, kelarutan, dll.), klasifikasi bahaya GHS, kegunaan, dan sinonim dari **PubChem (NIH)**; uraian dari **Wikipedia** ID/EN; foto berlisensi dari **Wikimedia Commons**; penghubung dari **Wikidata**.                                                 |
| **Semua senyawa dunia** | Pencarian langsung ke lebih dari 100 juta senyawa PubChem, termasuk dengan nama Indonesia (lewat label Wikidata), rumus molekul (isomer), atau nomor CID.                                                                                                                                                                            |
| **Golongan**            | Pohon golongan materi: 7 keluarga dan 41 golongan, masing-masing dengan definisi, ciri, rumus umum, tata nama, anggota katalog, dan anggota lain dari PubChem (pencarian substruktur SMARTS).                                                                                                                                        |
| **Tabel periodik**      | 118 unsur dari tabel periodik PubChem: warna kategori/wujud/blok atau peta panas (keelektronegatifan, jari-jari, energi ionisasi, titik leleh, massa jenis, tahun ditemukan). Setiap unsur punya model Bohr, diagram orbital, foto, dan artikel Wikipedia.                                                                           |
| **5 mode**              | SD, SMP, SMA, Kuliah, dan Guru. Kedalaman teks, data yang ditampilkan, kuis, dan lab menyesuaikan mode.                                                                                                                                                                                                                              |
| **Materi**              | 14 topik Kurikulum Merdeka (zat, atom, sistem periodik, ikatan, bentuk molekul, stoikiometri, asam–basa, reaksi & energi, laju & kesetimbangan, redoks, kimia karbon, biomolekul, material, lingkungan & kimia hijau), masing-masing ditulis untuk tiap jenjang, dengan kegiatan, **116 soal kuis** berpembahasan, dan catatan guru. |
| **13 lab virtual**      | Partikel & wujud zat, konfigurasi elektron, uji nyala, VSEPR 3D, perakit molekul & isomer (PubChem langsung), kristal & material, penyetaraan reaksi, massa molar & mol, pH & 7 indikator, titrasi, hukum gas, laju reaksi (tumbukan), sel volta (dengan Nernst).                                                                    |
| **Lainnya**             | Kuis tantangan yang dibuat acak dari data, kamus 126 istilah, "Kimia di sekitarku" (10 tempat), bandingkan dua molekul, koleksi & catatan, lencana, ruang guru (modul ajar, LKPD, kartu flash, tautan tugas), baca-suara, cetak.                                                                                                     |

Struktur 3D digambar dengan penampil Canvas buatan sendiri (tanpa pustaka), struktur 2D digambar sebagai SVG
dari koordinat 2D PubChem, dan kisi kristal (NaCl, intan, grafit, grafena, C₆₀, tabung nano, logam fcc/bcc/hcp,
rutil, perovskit, dll.) dibangun dari sel satuan dengan konstanta kisi terukur.

## Menjalankan

Tidak ada langkah build dan tidak ada dependensi produksi. Butuh Node.js 20+.

```bash
npm start            # server produksi: http://localhost:8080
npm run dev          # http://127.0.0.1:8086 dengan log permintaan
```

Atau buka dengan server statis apa pun (`npm run start:static`). Tanpa server Node, aplikasi memanggil PubChem
langsung dari browser (PubChem mendukung CORS).

## Deploy

Pilih salah satu:

1. **Cloudflare Pages (disarankan).** Isi variable `CLOUDFLARE_PAGES_PROJECT` serta secret `CLOUDFLARE_API_TOKEN`
   dan `CLOUDFLARE_ACCOUNT_ID` di GitHub (opsional: variable `SITE_URL`). Workflow **Deploy** berjalan setiap CI di
   `main` lulus, atau jalankan manual. Proxy PubChem berjalan sebagai Pages Function dengan cache di edge.
2. **Docker / server sekolah.**
   ```bash
   docker build -t moleculium .
   docker run -d -p 8080:8080 --restart unless-stopped moleculium
   ```
3. **Hosting statis** (GitHub Pages, Netlify, dll.): `npm run build:site`, lalu unggah folder `dist/`.

### Pengaturan server (`server/server.mjs`)

| Variabel                             | Bawaan         | Arti                                                             |
| ------------------------------------ | -------------- | ---------------------------------------------------------------- |
| `PORT`                               | `8080`         | Port HTTP                                                        |
| `HOST`                               | `0.0.0.0`      | Alamat yang didengarkan (`127.0.0.1` untuk lokal saja)           |
| `PROXY`                              | `1`            | `0` mematikan proxy PubChem; browser memanggil PubChem langsung  |
| `PUBCHEM_INTERVAL_MS`                | `250`          | Jeda minimal antarpermintaan ke PubChem (batas PubChem: 5/detik) |
| `CACHE_MAX_ENTRIES` / `CACHE_MAX_MB` | `4000` / `256` | Batas cache proxy                                                |
| `CLIENT_LIMIT_PER_MIN`               | `300`          | Batas permintaan API per klien per menit                         |
| `TRUST_PROXY`                        | `0`            | Jumlah reverse proxy di depan server (untuk IP klien yang benar) |
| `HSTS`                               | –              | `1` bila di belakang HTTPS                                       |
| `LOG`                                | –              | `1` untuk log setiap permintaan                                  |

Server hanya menyajikan path yang diizinkan (`/`, `index.html`, `css/`, `js/`, `assets/`, `data/…`); berkas lain
seperti `.git/`, `package.json`, `server/`, atau `scripts/` selalu 404. URL rusak dijawab 400 tanpa mematikan
server. Proxy hanya meneruskan endpoint baca PubChem yang ada di daftar izin (`server/policy.mjs`).

## Memperbarui data

Data referensi disinkronkan dari sumber resmi dan disimpan di repo agar cepat, bisa offline, dan hasil tes pasti:

```bash
npm run sync            # unsur (PubChem periodic table + Wikidata/Wikipedia/Commons) lalu molekul
npm run sync:molecules -- --only water,caffeine
npm run data:check      # cek semua tautan, kuis, rekaman PubChem, dan reaksi
npm run build           # perbarui daftar precache service worker
```

Workflow **Refresh data** menjalankan sinkronisasi setiap bulan dan membuka pull request untuk ditinjau.
Rincian sumber dan lisensi: [docs/DATA-SOURCES.md](docs/DATA-SOURCES.md).

**Menambah molekul:** tambahkan entri di salah satu berkas `js/data/molecules/*.js` (lihat keterangan field di
`js/data/curatedMolecules.js`), lalu `npm run sync:molecules -- --only <id>` dan `npm run data:check`.

## Kualitas

```bash
npm run lint         # ESLint + Prettier
npm run data:check   # integritas konten
npm run test:unit    # kimia, parser PubChem, kisi kristal, kebijakan proxy, keamanan server
npm run test:e2e     # Playwright: halaman, lab, kuis, guru, PWA offline, axe WCAG 2.1 AA (tema terang, termasuk preferensi gelap lama)
npm run check        # semuanya
```

Tes browser men-stub jaringan PubChem/Wikimedia sehingga berjalan offline dan deterministik.

## Struktur

```
index.html · sw.js · manifest.webmanifest
css/            style.css (token & komponen) · layouts.css (halaman, lab, cetak)
js/app.js       shell, router, service worker
js/core/        router, preferensi, penyimpanan lokal, data pengguna
js/components/  penampil 3D, gambar 2D, GHS, model Bohr, kartu, kuis, rich text
js/pages/       beranda, jelajah, molekul, golongan, tabel, atom, belajar, lab, kuis, bandingkan,
                di sekitarku, kamus, tersimpan, guru, tugas, tentang
js/labs/        13 laboratorium virtual
js/data/        katalog molekul, golongan, tabel periodik (hasil sinkronisasi), kamus, topik, kurikulum
js/services/    klien PubChem & Wikimedia, parser PUG View, rumus kimia, kisi kristal, suara
data/           rekaman PubChem/Wikipedia per molekul & unsur, gambar 2D, anggota golongan
server/         server produksi dan kebijakan keamanan bersama
functions/      Cloudflare Pages Function (proxy PubChem di edge)
scripts/        sinkronisasi data, build, cek konten, ikon
tests/          tes unit (Node) dan tes browser (Playwright)
```

## Lisensi

- Kode: [MIT](LICENSE).
- Materi belajar (kartu, topik, kuis, kamus): [CC BY-SA 4.0](LICENSE-CONTENT.md).
- Data dan media pihak ketiga mengikuti lisensi sumbernya; lihat [docs/DATA-SOURCES.md](docs/DATA-SOURCES.md).

Moleculium adalah alat belajar, bukan petunjuk medis, farmasi, atau keselamatan kerja.
