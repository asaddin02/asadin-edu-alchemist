// Learning structure beyond the topic texts: the virtual labs, the "chemistry around me" places and the
// suggested learning path for each level.

/** Virtual labs (js/labs/<id>.js). `levels` = where the lab is suggested. */
export const LABS = [
  { id: 'wujud', icon: 'thermometer', levels: ['sd', 'smp'], topic: 'zat', title: ['Partikel & wujud zat', 'Particles & states of matter'], summary: ['Panaskan dan dinginkan zat, lihat partikel bergetar, mengalir, dan beterbangan, serta kurva pemanasan air.', 'Heat and cool a substance, watch particles vibrate, flow and fly, and follow water’s heating curve.'] },
  { id: 'orbital', icon: 'atom', levels: ['smp', 'sma', 'kuliah'], topic: 'atom', title: ['Konfigurasi elektron', 'Electron configuration'], summary: ['Pilih unsur mana pun: model Bohr, diagram orbital dengan panah spin, dan bentuk orbital s, p, d.', 'Pick any element: Bohr model, orbital box diagram with spins, and s, p, d orbital shapes.'] },
  { id: 'nyala', icon: 'flame', levels: ['smp', 'sma'], topic: 'atom', title: ['Uji nyala logam', 'Flame tests'], summary: ['Setiap logam memberi warna nyala khas karena loncatan elektronnya: rahasia warna kembang api.', 'Each metal gives a signature flame colour from its electron jumps — the secret of fireworks.'] },
  { id: 'vsepr', icon: 'cube', levels: ['sma', 'kuliah'], topic: 'bentuk', title: ['Bentuk molekul (VSEPR)', 'Molecular shapes (VSEPR)'], summary: ['Atur pasangan ikatan dan pasangan bebas, lalu putar bentuk 3D-nya beserta sudut dan contoh nyata.', 'Set bonding and lone pairs, then rotate the 3D shape with its angles and real examples.'] },
  { id: 'rakit', icon: 'puzzle', levels: ['smp', 'sma', 'kuliah'], topic: 'karbon', title: ['Perakit molekul & isomer', 'Molecule builder & isomers'], summary: ['Susun atom C, H, O, N, dan lainnya; cek aturan valensi dan temukan semua isomernya langsung dari PubChem.', 'Combine C, H, O, N and more; check valence rules and find every isomer live from PubChem.'] },
  { id: 'kristal', icon: 'crystal', levels: ['smp', 'sma', 'kuliah'], topic: 'material', title: ['Kristal & material', 'Crystals & materials'], summary: ['Jelajahi kisi logam, garam, intan, grafit, grafena, C₆₀, tabung nano, rutil, dan perovskit dalam 3D.', 'Explore metal, salt, diamond, graphite, graphene, C₆₀, nanotube, rutile and perovskite lattices in 3D.'] },
  { id: 'setara', icon: 'compare', levels: ['smp', 'sma', 'kuliah'], topic: 'stoikiometri', title: ['Penyetaraan reaksi', 'Balancing equations'], summary: ['Setarakan reaksi bertingkat kesulitan dengan neraca atom, atau ketik reaksimu sendiri untuk disetarakan otomatis.', 'Balance graded reactions with an atom tally, or type your own equation to balance it automatically.'] },
  { id: 'stoikiometri', icon: 'gauge', levels: ['smp', 'sma', 'kuliah'], topic: 'stoikiometri', title: ['Massa molar & mol', 'Molar mass & moles'], summary: ['Hitung Mr rumus apa pun, persentase unsur, dan konversi gram ↔ mol ↔ partikel ↔ volume gas.', 'Compute the Mr of any formula, element percentages and gram ↔ mole ↔ particle ↔ gas-volume conversions.'] },
  { id: 'ph', icon: 'drop', levels: ['sd', 'smp', 'sma'], topic: 'asam-basa', title: ['pH & indikator', 'pH & indicators'], summary: ['Uji larutan sehari-hari dengan lakmus, indikator universal, fenolftalein, kol ungu, dan kunyit.', 'Test everyday solutions with litmus, universal indicator, phenolphthalein, red cabbage and turmeric.'] },
  { id: 'titrasi', icon: 'beaker', levels: ['sma', 'kuliah'], topic: 'asam-basa', title: ['Titrasi asam–basa', 'Acid–base titration'], summary: ['Teteskan basa ke asam, lihat kurva pH terbentuk, dan temukan titik ekuivalen.', 'Add base to acid, watch the pH curve build and find the equivalence point.'] },
  { id: 'gas', icon: 'bubble', levels: ['smp', 'sma', 'kuliah'], topic: 'laju', title: ['Hukum gas', 'Gas laws'], summary: ['Ubah suhu, volume, dan jumlah partikel; lihat tekanan berubah sesuai PV = nRT.', 'Change temperature, volume and particle count; watch pressure follow PV = nRT.'] },
  { id: 'laju', icon: 'clock', levels: ['smp', 'sma', 'kuliah'], topic: 'laju', title: ['Laju reaksi & tumbukan', 'Reaction rate & collisions'], summary: ['Atur suhu, konsentrasi, dan katalis; hitung tumbukan efektif dan lihat grafik produk.', 'Tune temperature, concentration and catalyst; count effective collisions and watch the product curve.'] },
  { id: 'paruh', icon: 'nucleus', levels: ['smp', 'sma', 'kuliah'], topic: 'nuklir', title: ['Waktu paruh & peluruhan', 'Half-life & decay'], summary: ['Amati ratusan atom radioaktif meluruh secara acak, bandingkan dengan rumus N₀(½)ⁿ, dan hitung umur sampel seperti penanggalan karbon-14.', 'Watch hundreds of radioactive atoms decay at random, compare with N₀(½)ⁿ and work out a sample’s age as in carbon-14 dating.'] },
  { id: 'volta', icon: 'battery', levels: ['sma', 'kuliah'], topic: 'redoks', title: ['Sel volta', 'Voltaic cells'], summary: ['Pasangkan dua logam, tentukan anode dan katode, arah elektron, dan potensial sel.', 'Pair two metals, find the anode and cathode, electron flow and cell potential.'] },
];
export const findLab = id => LABS.find(l => l.id === id) || null;

/** Places for "Kimia di sekitarku" (molecules list them in their `ctx`). */
export const PLACES = [
  { id: 'dapur', icon: 'kitchen', name: ['Dapur & makanan', 'Kitchen & food'], about: ['Bumbu, gula, garam, cuka, dan aroma masakan Nusantara adalah molekul-molekul yang bisa kamu kenali.', 'Spices, sugar, salt, vinegar and the aromas of Indonesian cooking are molecules you can get to know.'] },
  { id: 'kamar-mandi', icon: 'bath', name: ['Kamar mandi & kebersihan', 'Bathroom & cleaning'], about: ['Sabun, pasta gigi, pemutih, dan pembersih bekerja dengan reaksi kimia. Kenali juga yang tidak boleh dicampur.', 'Soap, toothpaste, bleach and cleaners work by chemistry — and some must never be mixed.'] },
  { id: 'tubuh', icon: 'body', name: ['Tubuh manusia', 'Human body'], about: ['Dari air dan oksigen sampai hormon dan DNA: tubuhmu adalah pabrik kimia yang luar biasa.', 'From water and oxygen to hormones and DNA, your body is an amazing chemical factory.'] },
  { id: 'apotek', icon: 'pill', name: ['Apotek & kesehatan', 'Pharmacy & health'], about: ['Obat, antiseptik, dan vitamin. Untuk belajar saja; selalu ikuti petunjuk dokter atau apoteker.', 'Medicines, antiseptics and vitamins. For learning only; always follow a doctor or pharmacist.'] },
  { id: 'kebun', icon: 'sprout', name: ['Kebun, sawah & pertanian', 'Garden, rice field & farm'], about: ['Pupuk, fotosintesis, pestisida, dan molekul yang dibuat tumbuhan.', 'Fertilisers, photosynthesis, pesticides and the molecules plants make.'] },
  { id: 'udara', icon: 'cloud', name: ['Udara & iklim', 'Air & climate'], about: ['Gas di atmosfer, polusi, lapisan ozon, dan gas rumah kaca.', 'Atmospheric gases, pollution, the ozone layer and greenhouse gases.'] },
  { id: 'bumi', icon: 'mountain', name: ['Bumi, tambang & batuan', 'Earth, mines & rocks'], about: ['Mineral dan logam dari perut Bumi Indonesia: timah, nikel, bauksit, tembaga, emas, dan belerang.', 'Minerals and metals from Indonesian ground: tin, nickel, bauxite, copper, gold and sulfur.'] },
  { id: 'energi', icon: 'car', name: ['Kendaraan & energi', 'Vehicles & energy'], about: ['Bahan bakar, baterai, biodiesel, dan material untuk energi bersih.', 'Fuels, batteries, biodiesel and clean-energy materials.'] },
  { id: 'gawai', icon: 'phone', name: ['Gawai & teknologi', 'Gadgets & technology'], about: ['Silikon cip, layar, LED, dan baterai di dalam ponselmu.', 'The silicon chips, screens, LEDs and batteries inside your phone.'] },
  { id: 'sekolah', icon: 'school', name: ['Laboratorium sekolah', 'School laboratory'], about: ['Pereaksi dan zat yang sering dipakai dalam praktikum kimia.', 'Reagents and substances often used in school chemistry practicals.'] },
];
export const findPlace = id => PLACES.find(p => p.id === id) || null;

/** Suggested order of topics for each level. */
export const PATHS = {
  sd: ['zat', 'larutan', 'partikel', 'atom', 'reaksi', 'asam-basa', 'termokimia', 'antarmolekul', 'ion', 'biomolekul', 'material', 'analitik', 'lingkungan', 'nuklir'],
  smp: [
    'zat', 'larutan', 'partikel', 'atom', 'periodik', 'ion', 'ikatan', 'antarmolekul', 'reaksi', 'stoikiometri',
    'termokimia', 'laju', 'asam-basa', 'redoks', 'elektrokimia', 'karbon', 'gugus-fungsi', 'biomolekul', 'material',
    'nuklir', 'analitik', 'lingkungan', 'kesetimbangan', 'termodinamika', 'reaksi-organik', 'anorganik',
  ],
  sma: [
    'atom', 'periodik', 'nuklir', 'ikatan', 'bentuk', 'antarmolekul', 'ion', 'stoikiometri', 'reaksi', 'larutan',
    'termokimia', 'laju', 'kesetimbangan', 'asam-basa', 'redoks', 'elektrokimia', 'karbon', 'gugus-fungsi',
    'reaksi-organik', 'biomolekul', 'anorganik', 'material', 'analitik', 'spektroskopi', 'termodinamika', 'kuantum',
    'lingkungan', 'partikel', 'zat',
  ],
  kuliah: [
    'atom', 'kuantum', 'periodik', 'ikatan', 'bentuk', 'antarmolekul', 'stoikiometri', 'reaksi', 'termodinamika',
    'termokimia', 'kesetimbangan', 'laju', 'asam-basa', 'redoks', 'elektrokimia', 'ion', 'anorganik', 'karbon',
    'gugus-fungsi', 'reaksi-organik', 'biomolekul', 'material', 'analitik', 'spektroskopi', 'nuklir', 'larutan',
    'lingkungan', 'partikel',
  ],
};
