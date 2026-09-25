# ChemTaxa · Asadin Edu ⚛️
> **Atlas Molekul Kimia Semesta & Laboratorium Interaktif Terbuka untuk SD sampai Kuliah**  
> *Open Molecular Atlas, Interactive 3D Chem Lab & Learning Platform (Bilingual: Indonesia & English)*

[![Status](https://img.shields.io/badge/Status-Production%20Ready-success.svg)](#)
[![API](https://img.shields.io/badge/Data%20Source-PubChem%20NIH-blue.svg)](https://pubchem.ncbi.nlm.nih.gov)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)
[![Curriculum](https://img.shields.io/badge/Kurikulum-SD%20%7C%20SMP%20%7C%20SMA%20%7C%20Kuliah-emerald.svg)](#)

---

## 🌟 Tentang Proyek ChemTaxa

**ChemTaxa** adalah platform pembelajaran kimia dan penjelajah struktur molekul interaktif yang menjadi saudara komplementer dari proyek **BioTaxa** dalam ekosistem pendidikan terbuka **Asadin Edu**. 

Jika **BioTaxa** berfokus pada keanekaragaman makhluk hidup dan taksonomi biologi, maka **ChemTaxa** menelusuri fondasi materi yang paling mendasar: **atom, ikatan, dan arsitektur geometri molekul 3D** yang menyusun segala hal di alam semesta—mulai dari air yang kita minum, udara pernapasan, obat-obatan, hingga material maju masa depan seperti grafena.

---

## 🚀 Fitur Unggulan

### 1. Integrasi API Resmi Gratis PubChem (NCBI / NLM / NIH)
- **Kueri Data Global:** Terhubung langsung ke *National Library of Medicine* (USA) untuk mengambil properti kimia, formula, IUPAC name, LogP, TPSA, muatan formal, dan deskripsi ilmiah terverifikasi.
- **Visualisasi Struktur 2D & 3D:** Mengunduh diagram 2D resmi dan mengurai koordinat 3D SDF untuk diputar secara langsung.
- **Kamus Cerdas Dwi-Bahasa:** Menerjemahkan istilah lokal Indonesia (cth: *air, garam dapur, asam cuka, kafein, glukosa*) langsung ke penamaan standar internasional.

### 2. Mesin Visualisasi 3D Molekul Mandiri (Pure Canvas 3D Engine)
- Render 3D tanpa dependensi eksternal yang berat.
- Kontrol sentuh dan mouse penuh: rotasi bebas, zoom in/out, pan, dan putar otomatis.
- Tiga mode representasi ilmiah:
  1. **Bola & Batang (Ball-and-Stick):** Menampilkan sudut ikatan dan atom dengan pewarnaan standar CPK (*Corey-Pauling-Koltun*).
  2. **Ruang Penuh (Space-Filling / Van der Waals):** Menggambarkan volume awan elektron nyata molekul.
  3. **Rangka Kawat (Wireframe):** Analisis kerangka ikatan.
- **Inspektur Atom Interaktif:** Klik atom apa saja untuk melihat nomor atom, nama unsur, massa, dan konfigurasi elektron.

### 3. Penyesuaian 4 Tingkat Pendidikan (Adaptive Learning Tiers)
- 🌱 **SD (Sekolah Dasar):** Bahasa ramah anak, cerita analogi balok lego semesta, wujud zat, dan molekul sehari-hari.
- ⚡ **SMP (Menengah Pertama):** Partikel materi, perbedaan ikatan kovalen vs ionik, rumus senyawa dasar, dan sifat asam-basa.
- 🔬 **SMA (Menengah Atas):** Geometri molekul VSEPR 3D, kepolaran dipol, gugus fungsi organik (alkohol, karboksilat, ester), termokimia, dan isomer.
- 🌌 **Kuliah & Pengajar:** Teori orbital molekul (MOT), stereokimia enantiomer, spektroskopi IR/NMR, dan data resmi PubChem CID.

### 4. Laboratorium Virtual Terpadu (Virtual Chem Lab)
- **Rakit Geometri VSEPR:** Eksplorasi interaktif bentuk Linear (180°), Bengkok (104.5°), Trigonal Planar (120°), Tetrahedral (109.5°), dan Oktahedral (90°).
- **Simulator Reaksi Kimia Eksotermik:** Animasi pemutusan ikatan dan pembentukan molekul baru ($2H_2 + O_2 \rightarrow 2H_2O$, pembakaran metana, dsb.) lengkap dengan nilai entalpi $\Delta H$.
- **Kalkulator Stoikiometri & Massa Molar ($M_r$):** Pengurai rumus kimia otomatis dengan tanda kurung (cth: $Ca(OH)_2$, $C_6H_{12}O_6$) menghitung massa molar dan diagram persentase massa unsur.
- **Simulator pH & Indikator Universal:** Bejana virtual dengan cairan yang berubah warna sesuai nilai pH (0 - 14) lengkap dengan konsentrasi ion $[H^+]$ dan $[OH^-]$.

### 5. Tabel Periodik 118 Unsur Interaktif
- Tampilan 18 golongan dan 7 periode dengan palet warna kategori ilmiah.
- Laci inspektor unsur dengan massa relatif, elektronegativitas, valensi, dan tautan langsung ke molekul-molekul semesta yang mengandung unsur tersebut.

### 6. Perbandingan Molekul Berdampingan (Dual Synchronized Comparison)
- Dua penampil 3D simultan untuk membandingkan molekul serupa (cth: Air vs Hidrogen Peroksida, Etanol vs Metanol, Kafein vs Adenosin).
- Matriks perbandingan sifat fisik dan bahaya NFPA.

### 7. Ruang Guru & Perangkat Ajar (Teacher Hub)
- Modul Ajar terintegrasi Kurikulum Merdeka (Fase C, D, E/F, hingga Perguruan Tinggi).
- Generator kartu flashcard molekul siap cetak untuk aktivitas kelas.
- Lembar Kerja Siswa (LKS) investigasi sains.

### 8. Fitur Aksesibilitas & Ramah Belajar
- **Narasi Suara (Text-to-Speech):** Membacakan penjelasan molekul dengan suara audio interaktif.
- **Buku Catatan Belajar:** Otomatis menyimpan catatan refleksi siswa ke LocalStorage dan dapat diekspor ke JSON atau dicetak.
- **Kuis & Gamifikasi:** Kuis bertingkat dengan lencana prestasi yang tersimpan di profil.
- **PWA Siap Offline:** Service Worker yang memungkinkan penggunaan di kelas tanpa koneksi internet yang stabil.

---

## 💻 Struktur Direktori Proyek

```
asadin-edu-chemtaxa/
├── assets/
│   └── brand/               # Vektor SVG logo atom dan identitas visual
├── css/
│   ├── style.css            # Desain sistem cyber-chemistry, tema gelap/terang, token warna
│   └── layouts.css          # Layout hero, kartu molekul, panggung 3D, lab virtual, tabel
├── js/
│   ├── app.js               # Entry point aplikasi & inisialisasi shell
│   ├── components/
│   │   ├── common.js        # Kartu molekul, badge jenjang, belah ketupat NFPA
│   │   ├── icons.js         # Ikon vektor sains SVG mandiri
│   │   ├── layout.js        # Header, menu navigasi, pemilih jenjang, footer
│   │   └── moleculeViewer3D.js # Mesin render 3D berbasis Canvas
│   ├── core/
│   │   ├── dom.js           # Helper DOM ($ / $$), toast alert
│   │   ├── prefs.js         # Pengaturan level, bahasa, tema ke LocalStorage
│   │   ├── router.js        # Router hash dinamis dengan modul lazy-load
│   │   └── userdata.js      # Penyimpanan bookmark, catatan, dan skor kuis
│   ├── data/
│   │   ├── curatedMolecules.js # Katalog 50+ molekul dasar dengan koordinat 3D
│   │   ├── curriculum.js    # Silabus kurikulum SD, SMP, SMA, Kuliah
│   │   ├── glossary.js      # Kamus 100+ istilah kimia dwi-bahasa
│   │   └── periodicTable.js # Data 118 unsur periodik lengkap
│   ├── i18n/
│   │   └── ui.js            # Kamus antarmuka bilingual (ID & EN)
│   ├── pages/
│   │   ├── home.js          # Beranda & sorotan molekul pilihan
│   │   ├── explore.js       # Pencarian live & multi-filter
│   │   ├── molecule.js      # Profil lengkap molekul, 3D, tab edukasi, TTS
│   │   ├── lab.js           # Laboratorium virtual 3D, stoikiometri, pH
│   │   ├── table.js         # Tabel periodik 118 unsur
│   │   ├── compare.js       # Perbandingan molekul berdampingan
│   │   ├── quiz.js          # Arena kuis kimia & lencana juara
│   │   ├── glossary.js      # Kamus & glosarium istilah
│   │   ├── saved.js         # Koleksi molekul favorit & buku catatan
│   │   ├── teacher.js       # Ruang guru, modul ajar, flashcard cetak
│   │   └── about.js         # Informasi proyek & transparansi API PubChem
│   └── services/
│       ├── bgCanvas.js      # Partikel orbital atom animasi latar belakang
│       ├── pubchem.js       # Klien resmi PubChem PUG REST API & parser SDF
│       └── speech.js        # Layanan sintesis suara pembaca materi (TTS)
├── server/
│   └── server.mjs           # Server HTTP Node.js mandiri tanpa dependensi luar
├── tests/
│   └── test-runner.mjs      # Pengujian otomatis integritas data & parser
├── index.html               # Halaman utama aplikasi web
├── manifest.webmanifest     # Manifest Progressive Web App (PWA)
├── sw.js                    # Service worker offline caching
└── package.json             # Konfigurasi proyek npm
```

---

## 🛠️ Cara Menjalankan Secara Lokal

ChemTaxa dibangun secara murni menggunakan **Vanilla Web Standards (ES Modules, Modern CSS, HTML5 Canvas)** tanpa memerlukan proses build yang rumit.

### 1. Menggunakan Node.js Built-in Server (Rekomendasi)
```bash
# Masuk ke folder proyek
cd asadin-edu-chemtaxa

# Jalankan server
npm start
# atau
npm run dev
```
Akses di peramban web: **`http://127.0.0.1:8086`**

### 2. Menjalankan Tes Otomatis
```bash
npm test
```
Seluruh pengujian integritas tabel periodik, parser SDF PubChem, kamus terjemahan, dan kurikulum akan dieksekusi secara otomatis.

---

## 📜 Lisensi & Atribusi Data

- **Perangkat Lunak:** Dilisensikan di bawah [MIT License](LICENSE).
- **Materi Edukasi:** Dilisensikan di bawah [Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/).
- **Data Ilmiah:** Diberdayakan oleh **PubChem**, basis data terbuka dari *National Center for Biotechnology Information (NCBI)*, *National Library of Medicine (NLM)*, *National Institutes of Health (NIH)*, Amerika Serikat.

---
*ChemTaxa · Menginspirasi Generasi Baru Ilmuwan Kimia Mulai dari Sekolah Dasar hingga Universitas!*
