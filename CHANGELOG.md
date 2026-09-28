# Changelog

## 2.0.0 — Moleculium (2026-09-26)

ChemTaxa dibangun ulang dan berganti nama menjadi **Moleculium**.

### Konten

- Katalog 292 molekul, mineral, dan material (sebelumnya 49) dengan CID yang diverifikasi ke PubChem.
- Data resmi tersinkron per molekul: sifat terhitung, data eksperimen, GHS, kegunaan, sinonim, struktur 3D/2D,
  artikel Wikipedia ID/EN, dan foto Commons berlisensi.
- Tabel periodik lengkap 118 unsur dari PubChem (sebelumnya 43), dengan foto, model Bohr, dan diagram orbital.
- Pohon golongan: 7 keluarga, 41 golongan, dan anggota tambahan dari PubChem.
- 14 topik Kurikulum Merdeka bertingkat (sebelumnya 8), 116 soal kuis berpembahasan, catatan guru.
- Kamus 126 istilah (sebelumnya 12). "Kimia di sekitarku" dengan 10 tempat.

### Fitur

- Mode Guru (5 mode), pencarian ke seluruh PubChem (nama Indonesia, rumus, CID), halaman untuk senyawa apa pun.
- 13 lab virtual, kuis tantangan dari data, lencana, bandingkan molekul, ruang guru (modul ajar, LKPD, kartu flash,
  tautan tugas), baca-suara, cetak, ekspor/impor data.
- Penampil 3D baru (pointer, sentuh, keyboard), gambar struktur 2D SVG, model kisi kristal.
- PWA: app shell dan data di-precache; "Simpan semua untuk offline".

### Produksi

- Server aman: daftar path yang diizinkan, 400 untuk URL rusak, proxy PubChem ber-cache dan bertempo, batas laju,
  header keamanan, HOST 0.0.0.0.
- Dockerfile, CI (lint, cek konten, tes unit, Playwright + axe, image Docker), deploy Cloudflare Pages,
  penyegaran data bulanan.
