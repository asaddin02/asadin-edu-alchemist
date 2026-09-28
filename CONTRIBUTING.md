# Berkontribusi

Terima kasih! Moleculium dipakai pelajar dan guru, jadi ketepatan kimia dan kejelasan bahasa paling penting.

1. `npm ci`, lalu `npm run dev`.
2. Konten ditulis berpasangan `[Bahasa Indonesia, English]`. Tulis untuk pembaca jenjang yang dituju; hindari
   jargon di mode SD/SMP.
3. Setiap fakta baru sebaiknya punya sumber tepercaya (PubChem, buku teks, jurnal).
4. **Molekul baru**: tambahkan entri di `js/data/molecules/*.js`, jalankan
   `npm run sync:molecules -- --only <id>`, lalu periksa halaman molekulnya.
5. **Topik/kuis**: ikuti format berkas di `js/data/topics/`; tautan `[[istilah]]` dan `{{m:id}}` diperiksa otomatis.
6. Sebelum pull request: `npm run build` (precache) dan `npm run check` harus lulus.

Aplikasi sengaja tanpa framework dan tanpa dependensi produksi. Mohon jangan menambah pustaka pihak ketiga ke
browser; semua harus tetap berjalan offline dan di perangkat sekolah yang sederhana.
