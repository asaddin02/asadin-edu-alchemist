// ChemTaxa · Curated Core Molecular Catalog
export const moleculeCategories = {
  "life": {
    "id": "Molekul Kehidupan & Sel",
    "en": "Molecules of Life",
    "icon": "heart",
    "color": "#10b981"
  },
  "atmosphere": {
    "id": "Atmosfer & Gas Bumi",
    "en": "Atmosphere & Planet",
    "icon": "globe",
    "color": "#06b6d4"
  },
  "food": {
    "id": "Makanan, Nutrisi & Rasa",
    "en": "Food & Nutrition",
    "icon": "cup",
    "color": "#f59e0b"
  },
  "household": {
    "id": "Bahan Rumah Tangga",
    "en": "Household Chemistry",
    "icon": "home",
    "color": "#8b5cf6"
  },
  "medicine": {
    "id": "Obat & Farmakologi",
    "en": "Medicines & Health",
    "icon": "pill",
    "color": "#ec4899"
  },
  "energy": {
    "id": "Energi & Bahan Bakar",
    "en": "Energy & Fuels",
    "icon": "fire",
    "color": "#ef4444"
  },
  "industrial": {
    "id": "Kimia Industri & Asam-Basa",
    "en": "Industrial & Synthesis",
    "icon": "industry",
    "color": "#3b82f6"
  },
  "material": {
    "id": "Material Maju & Polimer",
    "en": "Advanced Materials",
    "icon": "cube",
    "color": "#6366f1"
  }
};
export const curatedMolecules = [
  {
    "id": "water",
    "cid": 962,
    "formula": "H2O",
    "nameId": "Air",
    "nameEn": "Water",
    "iupac": "oxidane",
    "mass": 18.015,
    "category": "life",
    "level": "sd",
    "stateAtSTP": "liquid",
    "geometry": "Bengkok (Bent, 104.5°)",
    "polarity": "Sangat Polar (Ikatan Hidrogen)",
    "summaryId": "Molekul paling ajaib dan penting bagi seluruh kehidupan di Bumi. Menutupi 71% permukaan planet.",
    "summaryEn": "The most essential molecule for all life on Earth, covering 71% of our planet.",
    "detailsSD": "Air adalah cairan yang kita minum setiap hari! Satu molekul air terdiri dari 1 atom oksigen besar yang memegang 2 atom hidrogen kecil, mirip kepala karakter kartun dengan dua telinga bulat. Air bisa berubah wujud menjadi es saat dingin dan uap saat mendidih.",
    "detailsSMP": "Air tersusun atas 2 atom Hidrogen dan 1 atom Oksigen dengan ikatan kovalen polar. Massa molekul relatifnya adalah 18. Karena sifat polarnya yang kuat, air mampu melarutkan banyak zat (pelarut universal).",
    "detailsSMA": "Bentuk molekul air adalah bengkok (V-shape) dengan sudut ikatan 104.5° akibat tolakan dua pasangan elektron bebas (PEB) pada atom O (hibridisasi sp³). Memiliki ikatan hidrogen intermolekul yang menyebabkan titik didihnya sangat tinggi (100°C) dibanding hidrida golongan 16 lainnya.",
    "detailsKuliah": "Momen dipol permanen 1.85 D, konstanta dielektrik tinggi (~80 pada 20°C). Mengalami autoprotolisis (Kw = 1.0 x 10⁻¹⁴ pada 25°C). Struktur kristal es heksagonal (Ih) memiliki densitas lebih rendah daripada air cair, anomali vital bagi biosfer laut kutub.",
    "safety": {
      "health": 0,
      "flammability": 0,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Aman dikonsumsi dan ramah lingkungan.",
      "noteEn": "Completely safe and non-hazardous."
    },
    "funFactsId": [
      "Es mengapung di atas air karena molekul air saat membeku justru membentuk pola heksagonal yang berongga!",
      "Tubuh manusia terdiri dari sekitar 60% molekul air.",
      "Satu tetes air mengandung sekitar 1,5 triliun triliun (1.5 x 10²¹) molekul H2O!"
    ],
    "funFactsEn": [
      "Ice floats on water because freezing forms a hollow hexagonal lattice!",
      "Human bodies are approximately 60% water molecules.",
      "A single drop of water contains around 1.5 sextillion molecules!"
    ],
    "atoms3D": [
      {
        "element": "O",
        "x": 0,
        "y": 0.1173,
        "z": 0
      },
      {
        "element": "H",
        "x": -0.757,
        "y": -0.4692,
        "z": 0
      },
      {
        "element": "H",
        "x": 0.757,
        "y": -0.4692,
        "z": 0
      }
    ],
    "bonds3D": [
      {
        "from": 0,
        "to": 1,
        "order": 1
      },
      {
        "from": 0,
        "to": 2,
        "order": 1
      }
    ]
  },
  {
    "id": "oxygen",
    "cid": 977,
    "formula": "O2",
    "nameId": "Gas Oksigen",
    "nameEn": "Molecular Oxygen",
    "iupac": "molecular oxygen",
    "mass": 31.998,
    "category": "atmosphere",
    "level": "sd",
    "stateAtSTP": "gas",
    "geometry": "Linear (180°)",
    "polarity": "Nonpolar",
    "summaryId": "Gas yang kita hirup setiap detik untuk bernapas dan membakar energi dalam sel.",
    "summaryEn": "The gas we breathe every second to release energy in our cells.",
    "detailsSD": "Oksigen adalah gas di udara yang tidak berwarna dan tidak berbau. Kita menghirupnya saat bernapas agar tubuh berenergi. Oksigen dihasilkan oleh pepohonan saat fotosintesis!",
    "detailsSMP": "Molekul diatomik yang terdiri dari 2 atom oksigen yang saling berikatan rangkap dua (O=O). Menyusun sekitar 21% volume udara atmosfer bumi.",
    "detailsSMA": "Memiliki ikatan kovalen rangkap dua. Berdasarkan teori orbital molekul (MOT), O2 bersifat paramagnetik karena memiliki 2 elektron tidak berpasangan pada orbital anti-ikatan π*2p.",
    "detailsKuliah": "Konfigurasi elektron molekul: σ1s² σ*1s² σ2s² σ*2s² σ2pz² π2px² π2py² π*2px¹ π*2py¹. Orde ikatan = 2. Sifat diradikal triplet membuatnya reaktif terhadap pembakaran namun stabil secara kinetik pada suhu kamar.",
    "safety": {
      "health": 0,
      "flammability": 0,
      "instability": 0,
      "ghs": [
        "oxidizer"
      ],
      "noteId": "Oksidator kuat; mempercepat pembakaran zat lain.",
      "noteEn": "Strong oxidizer; accelerates combustion."
    },
    "funFactsId": [
      "Meskipun gas O2 tidak berwarna, oksigen cair berwarna biru muda pucat yang indah!",
      "Oksigen cair dapat ditarik oleh kutub magnet karena sifat paramagnetiknya.",
      "Semua oksigen di atmosfer dihasilkan oleh organisme fotosintetik seperti alga dan tumbuhan."
    ],
    "funFactsEn": [
      "Liquid oxygen has a beautiful pale sky-blue color!",
      "Liquid oxygen can be suspended between magnetic poles due to paramagnetism.",
      "Virtually all atmospheric oxygen was produced by photosynthetic organisms."
    ],
    "atoms3D": [
      {
        "element": "O",
        "x": -0.605,
        "y": 0,
        "z": 0
      },
      {
        "element": "O",
        "x": 0.605,
        "y": 0,
        "z": 0
      }
    ],
    "bonds3D": [
      {
        "from": 0,
        "to": 1,
        "order": 2
      }
    ]
  },
  {
    "id": "carbon-dioxide",
    "cid": 280,
    "formula": "CO2",
    "nameId": "Karbon Dioksida",
    "nameEn": "Carbon Dioxide",
    "iupac": "carbon dioxide",
    "mass": 44.009,
    "category": "atmosphere",
    "level": "sd",
    "stateAtSTP": "gas",
    "geometry": "Linear (180°)",
    "polarity": "Nonpolar (Momen Dipol Saling Meniadakan)",
    "summaryId": "Gas hasil pernapasan kita yang diserap tumbuhan untuk membuat makanan lewat fotosintesis.",
    "summaryEn": "The gas we exhale that plants absorb to make food via photosynthesis.",
    "detailsSD": "Saat kita menghembuskan napas, kita mengeluarkan karbon dioksida. Gelembung-gelembung di minuman soda yang menggelitik lidah juga merupakan gas karbon dioksida!",
    "detailsSMP": "Tersusun dari 1 atom Karbon di tengah dan 2 atom Oksigen di kanan-kiri (O=C=O). Merupakan salah satu gas rumah kaca yang menjaga kehangatan bumi.",
    "detailsSMA": "Bentuk molekul linear dengan sudut 180° (hibridisasi sp pada atom C). Meskipun ikatan C=O bersifat polar, simetri molekul menyebabkan momen dipol resultan bernilai 0 (nonpolar).",
    "detailsKuliah": "Mode vibrasi: peregangan simetris (IR-inaktif, Raman-aktif), peregangan asimetris (2349 cm⁻¹, IR-aktif kuat), dan tekukan terdegenerasi ganda (667 cm⁻¹). Absorpsi IR ini menjadi dasar fisika efek gas rumah kaca.",
    "safety": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "ghs": [
        "compressed_gas"
      ],
      "noteId": "Dapat menyebabkan asfiksia pada konsentrasi tinggi dalam ruangan tertutup.",
      "noteEn": "Can cause asphyxiation at high concentrations in confined spaces."
    },
    "funFactsId": [
      "Karbon dioksida padat disebut 'Dry Ice' (Es Kering) karena langsung menyublim jadi gas pada -78.5°C tanpa pernah meleleh jadi cairan!",
      "Tanpa efek rumah kaca alami dari CO2 dan uap air, suhu rata-rata Bumi akan berada di bawah titik beku (-18°C)."
    ],
    "funFactsEn": [
      "Solid CO2 is called Dry Ice because it sublimates directly from solid to gas at -78.5°C without melting!",
      "Without natural CO2 greenhouse effect, Earth average temperature would be frozen at -18°C."
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": 0,
        "y": 0,
        "z": 0
      },
      {
        "element": "O",
        "x": -1.16,
        "y": 0,
        "z": 0
      },
      {
        "element": "O",
        "x": 1.16,
        "y": 0,
        "z": 0
      }
    ],
    "bonds3D": [
      {
        "from": 0,
        "to": 1,
        "order": 2
      },
      {
        "from": 0,
        "to": 2,
        "order": 2
      }
    ]
  },
  {
    "id": "methane",
    "cid": 297,
    "formula": "CH4",
    "nameId": "Metana",
    "nameEn": "Methane",
    "iupac": "methane",
    "mass": 16.043,
    "category": "energy",
    "level": "smp",
    "stateAtSTP": "gas",
    "geometry": "Tetrahedral (109.5°)",
    "polarity": "Nonpolar",
    "summaryId": "Hidrokarbon paling sederhana, komponen utama gas alam pembakar kompor gas di dapur.",
    "summaryEn": "The simplest hydrocarbon and principal component of natural gas used for cooking.",
    "detailsSD": "Metana adalah gas bahan bakar yang tidak berwarna. Ketika kompor gas dinyalakan dengan api biru yang bersih, gas itulah yang sedang terbakar!",
    "detailsSMP": "Alkana paling sederhana dengan rumus CH4. Satu atom karbon mengikat 4 atom hidrogen dengan ikatan kovalen tunggal. Sangat mudah terbakar menghasilkan CO2 dan H2O.",
    "detailsSMA": "Bentuk geometri tetrahedral sempurna dengan sudut ikatan 109.5° berkat hibridisasi sp³. Molekul nonpolar simetris tinggi dengan gaya dispersi London yang lemah (titik didih -161.5°C).",
    "detailsKuliah": "Grup titik simetri Td. Energi disosiasi ikatan C-H rata-rata 439 kJ/mol. Memiliki potensi pemanasan global (GWP) 28-36 kali lipat lebih besar dibanding CO2 dalam horizon 100 tahun.",
    "safety": {
      "health": 1,
      "flammability": 4,
      "instability": 0,
      "ghs": [
        "flammable",
        "gas"
      ],
      "noteId": "Sangat mudah terbakar dan dapat membentuk campuran eksplosif dengan udara.",
      "noteEn": "Extremely flammable gas; can form explosive mixtures with air."
    },
    "funFactsId": [
      "Gas metana murni sebenarnya tidak berbau sama sekali. Perusahaan gas sengaja menambahkan zat berbau belerang (merkaptan) agar kita tahu bila ada kebocoran kompor!",
      "Planet Neptunus dan Uranus tampak berwarna biru indah karena kandungan gas metana di atmosfernya menyerap cahaya merah."
    ],
    "funFactsEn": [
      "Pure methane is odorless. Gas utilities add smelly mercaptans so people can instantly detect gas leaks!",
      "Neptune and Uranus look vibrant blue because atmospheric methane absorbs red light."
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": 0,
        "y": 0,
        "z": 0
      },
      {
        "element": "H",
        "x": 0.63,
        "y": 0.63,
        "z": 0.63
      },
      {
        "element": "H",
        "x": -0.63,
        "y": -0.63,
        "z": 0.63
      },
      {
        "element": "H",
        "x": -0.63,
        "y": 0.63,
        "z": -0.63
      },
      {
        "element": "H",
        "x": 0.63,
        "y": -0.63,
        "z": -0.63
      }
    ],
    "bonds3D": [
      {
        "from": 0,
        "to": 1,
        "order": 1
      },
      {
        "from": 0,
        "to": 2,
        "order": 1
      },
      {
        "from": 0,
        "to": 3,
        "order": 1
      },
      {
        "from": 0,
        "to": 4,
        "order": 1
      }
    ]
  },
  {
    "id": "salt-nacl",
    "cid": 5234,
    "formula": "NaCl",
    "nameId": "Garam Dapur (Natrium Klorida)",
    "nameEn": "Sodium Chloride (Table Salt)",
    "iupac": "sodium chloride",
    "mass": 58.44,
    "category": "household",
    "level": "sd",
    "stateAtSTP": "solid",
    "geometry": "Kisi Kristal Kubus Berpusat Muka (FCC)",
    "polarity": "Ikatan Ionik Kuat",
    "summaryId": "Kristal putih gurih yang selalu ada di masakan. Terbentuk dari logam eksplosif dan gas beracun yang bersatu jadi bumbu lezat!",
    "summaryEn": "White culinary crystals formed when a violent metal and toxic gas combine into a delicious seasoning!",
    "detailsSD": "Garam membuat masakan ibu jadi gurih dan lezat. Yang menakjubkan, garam dibuat dari logam Natrium yang bisa meledak di air dan gas Klorin yang beracun, tapi saat bersatu mereka jadi sangat aman dan enak!",
    "detailsSMP": "Contoh klasik ikatan ionik. Atom Na melepaskan 1 elektron valensinya membentuk kation Na⁺, sedangkan atom Cl menangkap 1 elektron membentuk anion Cl⁻. Keduanya saling tarik menarik kuat dengan gaya elektrostatik.",
    "detailsSMA": "Membentuk kisi kristal berpusat muka (Face-Centered Cubic) di mana setiap ion Na⁺ dikelilingi oleh 6 ion Cl⁻ (bilangan koordinasi 6:6). Menghasilkan titik leleh tinggi (801°C) dan menghantarkan listrik saat lelehan atau larutan (elektrolit kuat).",
    "detailsKuliah": "Energi kisi kristal Born-Haber sebesar -787 kJ/mol. Memiliki indeks bias n = 1.544. Dalam biokimia sel, gradien konsentrasi ion Na⁺ dan Cl⁻ melintasi membran sel merupakan basis transmisi impuls saraf potensial aksi (pompa Na⁺/K⁺-ATPase).",
    "safety": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Aman untuk makanan, konsumsi berlebih dapat memicu hipertensi.",
      "noteEn": "Safe dietary condiment; excess intake linked to hypertension."
    },
    "funFactsId": [
      "Pada zaman Romawi kuno, garam sangat berharga hingga digunakan untuk membayar tentara. Dari sinilah kata 'salary' (gaji) berasal!",
      "Jika air laut di seluruh dunia diuapkan, garam yang tertinggal cukup untuk membangun tembok setinggi 280 km mengelilingi khatulistiwa."
    ],
    "funFactsEn": [
      "In ancient Rome, soldiers were sometimes paid in salt, giving birth to the English word 'salary'!",
      "If all oceanic water evaporated, the salt left behind could build a 280-km tall wall around the equator."
    ],
    "atoms3D": [
      {
        "element": "Na",
        "x": -1.4,
        "y": 0,
        "z": 0
      },
      {
        "element": "Cl",
        "x": 1.4,
        "y": 0,
        "z": 0
      }
    ],
    "bonds3D": [
      {
        "from": 0,
        "to": 1,
        "order": 1
      }
    ]
  },
  {
    "id": "glucose",
    "cid": 5793,
    "formula": "C6H12O6",
    "nameId": "Glukosa (Gula Darah)",
    "nameEn": "D-Glucose",
    "iupac": "(2R,3S,4R,5R)-2,3,4,5,6-pentahydroxyhexanal",
    "mass": 180.16,
    "category": "life",
    "level": "smp",
    "stateAtSTP": "solid",
    "geometry": "Cincin Piranosa (Bentuk Kursi)",
    "polarity": "Sangat Polar (Banyak Gugus -OH)",
    "summaryId": "Bahan bakar utama untuk otak dan sel-sel tubuh manusia, dibuat oleh tanaman lewat fotosintesis.",
    "summaryEn": "The primary fuel for our brain and body cells, synthesized by plants through photosynthesis.",
    "detailsSD": "Glukosa adalah bentuk gula paling sederhana yang memberi kita tenaga untuk berlari, bermain, dan berpikir! Tanaman membuatnya dari sinar matahari, air, dan udara.",
    "detailsSMP": "Monosakarida dengan 6 atom karbon (heksosa). Glukosa dipecah dalam respirasi seluler bersama oksigen untuk menghasilkan energi (ATP), air, dan karbon dioksida.",
    "detailsSMA": "Memiliki 5 gugus hidroksil (-OH) dan 1 gugus aldehid (aldoheksosa). Di dalam larutan berair, rantai lurus glukosa melingkar membentuk cincin piranosa hemiasetal intramolekul (anomer α dan β) yang berada dalam konformasi kursi yang stabil.",
    "detailsKuliah": "Memiliki 4 pusat kiral stereogenik pada bentuk rantai terbuka (2⁴ = 16 kemungkinan stereoisomer). D-glukosa memiliki konfigurasi (2R,3S,4R,5R). Nilai rotasi optik spesifik [α]D²⁰ = +52.7° (mengalami mutarotasi hingga kesetimbangan α 36% : β 64%). Substrat utama glikolisis dan jalur asam sitrat.",
    "safety": {
      "health": 0,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Nutrien alami dasar tubuh manusia.",
      "noteEn": "Natural baseline nutrient for human biology."
    },
    "funFactsId": [
      "Otak manusia hanya berbobot 2% dari berat badan, tapi mengonsumsi lebih dari 20% seluruh glukosa dalam tubuh!",
      "Semua karbohidrat kompleks seperti nasi, jagung, dan roti akan dipecah oleh pencernaan menjadi molekul glukosa."
    ],
    "funFactsEn": [
      "The human brain weighs only 2% of body mass, yet devours over 20% of the body glucose!",
      "All dietary carbohydrates like rice and bread are broken down into glucose molecules."
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": 1.15,
        "y": -0.66,
        "z": 0.2
      },
      {
        "element": "C",
        "x": 1.15,
        "y": 0.66,
        "z": -0.2
      },
      {
        "element": "C",
        "x": 0,
        "y": 1.33,
        "z": 0.2
      },
      {
        "element": "C",
        "x": -1.15,
        "y": 0.66,
        "z": -0.2
      },
      {
        "element": "C",
        "x": -1.15,
        "y": -0.66,
        "z": 0.2
      },
      {
        "element": "O",
        "x": 0,
        "y": -1.33,
        "z": -0.2
      }
    ],
    "bonds3D": [
      {
        "from": 0,
        "to": 1,
        "order": 1
      },
      {
        "from": 1,
        "to": 2,
        "order": 1
      },
      {
        "from": 2,
        "to": 3,
        "order": 1
      },
      {
        "from": 3,
        "to": 4,
        "order": 1
      },
      {
        "from": 4,
        "to": 5,
        "order": 1
      },
      {
        "from": 5,
        "to": 0,
        "order": 1
      }
    ]
  },
  {
    "id": "caffeine",
    "cid": 2519,
    "formula": "C8H10N4O2",
    "nameId": "Kafein",
    "nameEn": "Caffeine",
    "iupac": "1,3,7-trimethylpurine-2,6-dione",
    "mass": 194.19,
    "category": "food",
    "level": "smp",
    "stateAtSTP": "solid",
    "geometry": "Cincin Purin Planar Terfusi",
    "polarity": "Sedang (LogP -0.07)",
    "summaryId": "Senyawa stimulan alami dalam biji kopi dan daun teh yang membantu kita tetap fokus dan terjaga.",
    "summaryEn": "Natural stimulant alkaloid found in coffee beans and tea leaves that boosts alertness.",
    "detailsSD": "Kafein ada di dalam secangkir teh dan kopi. Kafein membuat orang dewasa merasa segar dan tidak mengantuk saat bekerja.",
    "detailsSMP": "Alkaloid alami yang bekerja merangsang sistem saraf pusat. Memiliki rumus kimia C8H10N4O2 dan struktur cincin ganda purin.",
    "detailsSMA": "Struktur molekulnya terdiri dari cincin pirimidin dan imidazol yang terfusi dengan 3 gugus metil (-CH3) dan 2 gugus karbonil (=O). Bekerja sebagai antagonis kompetitif reseptor adenosin di otak.",
    "detailsKuliah": "Secara farmakologis menghambat fosfodiesterase (PDE) non-spesifik sehingga meningkatkan konsentrasi intraseluler cAMP. Mengikat reseptor adenosin A1 dan A2A karena kemiripan struktural dengan adenosin, mencegah perlambatan aktivitas saraf.",
    "safety": {
      "health": 2,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "exclamation"
      ],
      "noteId": "Aman dalam dosis konsumsi wajar; overdosis menyebabkan takikardia dan kegelisahan.",
      "noteEn": "Safe in dietary moderation; excessive intake causes tachycardia and anxiety."
    },
    "funFactsId": [
      "Tumbuhan kopi memproduksi kafein bukan untuk manusia, melainkan sebagai pestisida alami untuk mengusir serangga hama!",
      "Kafein adalah zat psikoaktif yang paling banyak dikonsumsi di seluruh dunia setiap hari."
    ],
    "funFactsEn": [
      "Coffee plants synthesize caffeine as a natural insecticide to paralyze insect pests!",
      "Caffeine is the most widely consumed psychoactive substance on Earth."
    ],
    "atoms3D": [
      {
        "element": "O",
        "x": 0.47,
        "y": 2.56,
        "z": 0
      },
      {
        "element": "O",
        "x": -3.12,
        "y": -0.44,
        "z": 0
      },
      {
        "element": "N",
        "x": -0.96,
        "y": -1.31,
        "z": 0
      },
      {
        "element": "N",
        "x": 2.21,
        "y": 0.14,
        "z": 0
      },
      {
        "element": "N",
        "x": -1.34,
        "y": 1.07,
        "z": 0
      },
      {
        "element": "N",
        "x": 1.41,
        "y": -1.93,
        "z": 0
      },
      {
        "element": "C",
        "x": 0.85,
        "y": 0.25,
        "z": 0
      },
      {
        "element": "C",
        "x": 0.38,
        "y": -1.02,
        "z": 0
      },
      {
        "element": "C",
        "x": 0.03,
        "y": 1.42,
        "z": 0
      },
      {
        "element": "C",
        "x": -1.9,
        "y": -0.24,
        "z": 0
      },
      {
        "element": "C",
        "x": 2.5,
        "y": -1.19,
        "z": 0
      }
    ],
    "bonds3D": [
      {
        "from": 0,
        "to": 8,
        "order": 2
      },
      {
        "from": 1,
        "to": 9,
        "order": 2
      },
      {
        "from": 2,
        "to": 7,
        "order": 1
      },
      {
        "from": 2,
        "to": 9,
        "order": 1
      },
      {
        "from": 3,
        "to": 6,
        "order": 1
      },
      {
        "from": 3,
        "to": 10,
        "order": 1
      },
      {
        "from": 4,
        "to": 8,
        "order": 1
      },
      {
        "from": 4,
        "to": 9,
        "order": 1
      },
      {
        "from": 5,
        "to": 7,
        "order": 1
      },
      {
        "from": 5,
        "to": 10,
        "order": 1
      },
      {
        "from": 6,
        "to": 7,
        "order": 2
      },
      {
        "from": 6,
        "to": 8,
        "order": 1
      }
    ]
  },
  {
    "id": "aspirin",
    "cid": 2244,
    "formula": "C9H8O4",
    "nameId": "Aspirin (Asam Asetilsalisilat)",
    "nameEn": "Aspirin (Acetylsalicylic Acid)",
    "iupac": "2-acetyloxybenzoic acid",
    "mass": 180.16,
    "category": "medicine",
    "level": "sma",
    "stateAtSTP": "solid",
    "geometry": "Cincin Aromatik dengan Gugus Karboksil & Ester",
    "polarity": "Polar Lemah (LogP 1.19)",
    "summaryId": "Obat pereda nyeri dan penurun demam paling bersejarah yang juga menjaga kesehatan jantung.",
    "summaryEn": "One of the most historic analgesics and antipyretics that also prevents blood clots.",
    "detailsSD": "Aspirin adalah obat yang diminum orang ketika merasa pusing atau demam agar tubuh kembali sehat dan bugar.",
    "detailsSMP": "Senyawa organik sintetis yang dibuat dari asam salisilat (berasal dari kulit pohon dedalu / willow tree) dan asam asetat.",
    "detailsSMA": "Memiliki dua gugus fungsi penting: asam karboksilat (-COOH) dan ester asetil (-OCOCH3) yang terikat pada cincin benzena pada posisi orto (1,2). Bekerja menghambat enzim siklooksigenase (COX).",
    "detailsKuliah": "Secara ireversibel mengasetilasi residu serin (Ser-530 pada COX-1 dan Ser-516 pada COX-2) melalui transfer gugus asetil, memblokir sintesis tromboksan A2 (efek antiplatelet kardiovaskular) dan prostaglandin pro-inflamasi.",
    "safety": {
      "health": 2,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "toxic"
      ],
      "noteId": "Gunakan sesuai resep; kontraindikasi sindrom Reye pada anak-anak penderita infeksi virus.",
      "noteEn": "Use per medical guidance; contraindicated in viral pediatric illnesses (Reye syndrome)."
    },
    "funFactsId": [
      "Kulit pohon willow telah digunakan oleh Hippocrates (bapak kedokteran) sejak 400 SM untuk meredakan nyeri persalinan!",
      "Astronaut misi Apollo membawa aspirin ke Bulan dalam kotak P3K mereka di tahun 1969."
    ],
    "funFactsEn": [
      "Hippocrates used willow bark tea to soothe pain and fever over 2,400 years ago!",
      "Apollo astronauts carried aspirin in their medical kits to the Moon in 1969."
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": 0,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.39,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 2.08,
        "y": 1.2,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.39,
        "y": 2.41,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": 2.41,
        "z": 0
      },
      {
        "element": "C",
        "x": -0.69,
        "y": 1.2,
        "z": 0
      },
      {
        "element": "C",
        "x": -2.18,
        "y": 1.2,
        "z": 0
      },
      {
        "element": "O",
        "x": -2.8,
        "y": 2.24,
        "z": 0
      },
      {
        "element": "O",
        "x": -2.8,
        "y": 0.16,
        "z": 0
      }
    ],
    "bonds3D": [
      {
        "from": 0,
        "to": 1,
        "order": 2
      },
      {
        "from": 1,
        "to": 2,
        "order": 1
      },
      {
        "from": 2,
        "to": 3,
        "order": 2
      },
      {
        "from": 3,
        "to": 4,
        "order": 1
      },
      {
        "from": 4,
        "to": 5,
        "order": 2
      },
      {
        "from": 5,
        "to": 0,
        "order": 1
      },
      {
        "from": 5,
        "to": 6,
        "order": 1
      },
      {
        "from": 6,
        "to": 7,
        "order": 2
      },
      {
        "from": 6,
        "to": 8,
        "order": 1
      }
    ]
  },
  {
    "id": "ethanol",
    "cid": 702,
    "formula": "C2H5OH",
    "nameId": "Etanol (Alkohol)",
    "nameEn": "Ethanol",
    "iupac": "ethanol",
    "mass": 46.069,
    "category": "household",
    "level": "smp",
    "stateAtSTP": "liquid",
    "geometry": "Tetrahedral pada C, Bengkok pada O",
    "polarity": "Polar (Mampu Membentuk Ikatan Hidrogen)",
    "summaryId": "Cairan antiseptik pembersih luka dan hand sanitizer pembunuh kuman yang juga merupakan biofuel ramah lingkungan.",
    "summaryEn": "Antiseptic disinfectant liquid in hand sanitizers and renewable biofuel.",
    "detailsSD": "Etanol adalah alkohol yang ada di hand sanitizer. Saat kita memakainya, tangan terasa dingin dan kuman-kuman jahat mati!",
    "detailsSMP": "Senyawa alkohol rantai pendek dengan gugus fungsi hidroksil (-OH). Dihasilkan dari fermentasi gula oleh ragi (yeast) seperti pada pembuatan tape.",
    "detailsSMA": "Mengandung gugus hidroksil polar dan rantai etil nonpolar. Menghasilkan larutan homogen dengan air dalam segala perbandingan (miscible). Titik didih 78.3°C karena ikatan hidrogen.",
    "detailsKuliah": "pKa = 15.9. Mengalami metabolisme di hepar oleh enzim alkohol dehidrogenase (ADH) menjadi asetaldehida, kemudian dioksidasi oleh ALDH menjadi asam asetat. Substrat sintesis ester etil dan pelarut protik serbaguna.",
    "safety": {
      "health": 1,
      "flammability": 3,
      "instability": 0,
      "ghs": [
        "flammable"
      ],
      "noteId": "Mudah terbakar; uap dapat memicu pusing bila terhirup berlebihan.",
      "noteEn": "Highly flammable liquid and vapor; keep away from open flames."
    },
    "funFactsId": [
      "Etanol terasa dingin di kulit karena molekulnya menguap sangat cepat sambil menyerap panas dari tangan kita!",
      "Mobil balap Formula 1 dan jutaan kendaraan di Brasil menggunakan bahan bakar berbasis bioetanol tebu."
    ],
    "funFactsEn": [
      "Ethanol feels cold on hands because it rapidly evaporates, drawing thermal energy from your skin!",
      "Many race cars and Brazilian passenger vehicles run on high-octane sugarcane bioethanol."
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": -1.2,
        "y": -0.2,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": 0.5,
        "z": 0
      },
      {
        "element": "O",
        "x": 1.1,
        "y": -0.4,
        "z": 0
      },
      {
        "element": "H",
        "x": 1.9,
        "y": 0.1,
        "z": 0
      }
    ],
    "bonds3D": [
      {
        "from": 0,
        "to": 1,
        "order": 1
      },
      {
        "from": 1,
        "to": 2,
        "order": 1
      },
      {
        "from": 2,
        "to": 3,
        "order": 1
      }
    ]
  },
  {
    "id": "acetic-acid",
    "cid": 176,
    "formula": "CH3COOH",
    "nameId": "Asam Asetat (Asam Cuka)",
    "nameEn": "Acetic Acid (Vinegar)",
    "iupac": "ethanoic acid",
    "mass": 60.052,
    "category": "household",
    "level": "sd",
    "stateAtSTP": "liquid",
    "geometry": "Trigonal Planar pada C Karbonil",
    "polarity": "Polar Kuat",
    "summaryId": "Cairan asam aromatik khas yang memberi rasa asam segar pada kuah bakso dan acar mentimun.",
    "summaryEn": "Distinct sour aromatic acid giving tangy zest to culinary vinegar and pickles.",
    "detailsSD": "Asam cuka adalah cairan yang membuat kuah bakso terasa asam segar! Aromanya sangat tajam dan khas saat botolnya dibuka.",
    "detailsSMP": "Asam karboksilat lemah dengan rumus CH3COOH. Larutan cuka makan di rumah biasanya memiliki konsentrasi 4% hingga 8% asam asetat dalam air.",
    "detailsSMA": "Memiliki gugus karboksil (-COOH). Asam lemah dengan Ka = 1.8 x 10⁻⁵ (pH sekitar 2.4 pada larutan 1 M). Bereaksi dengan baking soda menghasilkan gelembung gas CO2.",
    "detailsKuliah": "Membentuk dimer siklik stabil dalam fase gas dan pelarut nonpolar melalui sepasang ikatan hidrogen kuat. Asam asetat glasial murni membeku pada 16.6°C membentuk kristal mirip es. Prekursor utama vinil asetat monomer (VAM) untuk polimer PVA.",
    "safety": {
      "health": 3,
      "flammability": 2,
      "instability": 0,
      "ghs": [
        "corrosive",
        "flammable"
      ],
      "noteId": "Aman saat encer (cuka dapur); korosif pada konsentrasi murni (glasial).",
      "noteEn": "Safe at food dilution; corrosive skin burns at glacial purity."
    },
    "funFactsId": [
      "Campuran asam cuka dan baking soda adalah resep rahasia klasik untuk membuat gunung berapi meletus dalam pameran sains sekolah!",
      "Asam cuka telah dibuat oleh manusia sejak lebih dari 5.000 tahun lalu ketika anggur dibiarkan terpapar udara terbuka."
    ],
    "funFactsEn": [
      "Mixing vinegar and baking soda powers the classic school science volcano eruption!",
      "Humans have brewed vinegar for over 5,000 years through spontaneous wine fermentation."
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": -1.39,
        "y": -0.1,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": 0.5,
        "z": 0
      },
      {
        "element": "O",
        "x": 0.3,
        "y": 1.68,
        "z": 0
      },
      {
        "element": "O",
        "x": 1,
        "y": -0.4,
        "z": 0
      }
    ],
    "bonds3D": [
      {
        "from": 0,
        "to": 1,
        "order": 1
      },
      {
        "from": 1,
        "to": 2,
        "order": 2
      },
      {
        "from": 1,
        "to": 3,
        "order": 1
      }
    ]
  },
  {
    "id": "ammonia",
    "cid": 222,
    "formula": "NH3",
    "nameId": "Amonia",
    "nameEn": "Ammonia",
    "iupac": "ammonia",
    "mass": 17.031,
    "category": "industrial",
    "level": "smp",
    "stateAtSTP": "gas",
    "geometry": "Trigonal Piramidal (107.8°)",
    "polarity": "Polar Kuat",
    "summaryId": "Gas berbau tajam penyubur tanaman pangan dunia melalui pupuk urea.",
    "summaryEn": "Sharp-smelling gas that feeds billions of people through agricultural nitrogen fertilizers.",
    "detailsSD": "Amonia adalah gas dengan bau menyengat seperti cairan pembersih lantai. Amonia digunakan petani untuk membuat pupuk tanaman agar padi dan sayuran tumbuh subur!",
    "detailsSMP": "Senyawa kovalen polar antara 1 atom Nitrogen dan 3 atom Hidrogen. Bersifat basa lemah dan larut sangat baik dalam air.",
    "detailsSMA": "Geometri molekul trigonal piramidal dengan sudut 107.8° akibat 1 pasangan elektron bebas (PEB) pada atom N. Basa Lewis yang dapat mendonorkan pasangan elektron membentuk ion amonium (NH4⁺).",
    "detailsKuliah": "Mengalami inversi piramidal kuantum (frekuensi umbrella inversion ~24 GHz), fenomena bersejarah yang mendasari penemuan maser amonia pertama oleh Townes (Nobel Fisika). Diproduksi melalui proses Haber-Bosch eksotermik bertekanan tinggi.",
    "safety": {
      "health": 3,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "corrosive",
        "toxic"
      ],
      "noteId": "Gas korosif dan iritatif terhadap saluran pernapasan; gunakan di lemari asam.",
      "noteEn": "Corrosive and toxic inhalation hazard; handle in fume hoods."
    },
    "funFactsId": [
      "Proses Haber-Bosch untuk membuat amonia mengonsumsi sekitar 1-2% dari seluruh suplai energi dunia, namun memberi makan hampir separuh populasi bumi!",
      "Amonia juga terkandung dalam keringat dan urine hewan saat metabolisme protein."
    ],
    "funFactsEn": [
      "The Haber-Bosch ammonia process consumes 1-2% of global energy but sustains food for half of humanity!",
      "Ammonia naturally forms during biological breakdown of proteins."
    ],
    "atoms3D": [
      {
        "element": "N",
        "x": 0,
        "y": 0,
        "z": 0.11
      },
      {
        "element": "H",
        "x": 0,
        "y": 0.94,
        "z": -0.27
      },
      {
        "element": "H",
        "x": 0.81,
        "y": -0.47,
        "z": -0.27
      },
      {
        "element": "H",
        "x": -0.81,
        "y": -0.47,
        "z": -0.27
      }
    ],
    "bonds3D": [
      {
        "from": 0,
        "to": 1,
        "order": 1
      },
      {
        "from": 0,
        "to": 2,
        "order": 1
      },
      {
        "from": 0,
        "to": 3,
        "order": 1
      }
    ]
  },
  {
    "id": "sulfuric-acid",
    "cid": 1118,
    "formula": "H2SO4",
    "nameId": "Asam Sulfat (Air Aki)",
    "nameEn": "Sulfuric Acid",
    "iupac": "sulfuric acid",
    "mass": 98.079,
    "category": "industrial",
    "level": "sma",
    "stateAtSTP": "liquid",
    "geometry": "Tetrahedral pada Atom Belerang S",
    "polarity": "Sangat Polar & Higroskopis",
    "summaryId": "Raja bahan kimia industri dunia yang menggerakkan aki kendaraan bermotor dan manufaktur baterai.",
    "summaryEn": "The king of industrial chemicals powering car batteries, fertilizers, and mineral processing.",
    "detailsSD": "Asam sulfat ada di dalam aki motor dan mobil agar lampu dan klakson bisa menyala. Cairan ini sangat keras dan tidak boleh disentuh!",
    "detailsSMP": "Asam kuat diprotik yang melepaskan 2 ion H⁺ dalam air. Sering disebut air aki zuur. Sangat korosif dan dapat menghancurkan kain dan kertas.",
    "detailsSMA": "Bentuk tetrahedral pada atom S dengan hibridisasi sp³. Asam kuat bervalensi dua: ionisasi pertama berlangsung sempurna, ionisasi kedua memiliki Ka2 = 1.2 x 10⁻². Reaksi pengenceran dengan air sangat eksotermik (harus menuangkan asam ke air, BUKAN air ke asam!).",
    "detailsKuliah": "Pelarut asam super dan agen dehidrasi ekstrem yang mampu mengkarbonisasi sukrosa murni menjadi pilar karbon spons. Menjadi indikator kemajuan industri kimia suatu negara (produksi global >260 juta ton/tahun).",
    "safety": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "ghs": [
        "corrosive"
      ],
      "noteId": "Sangat korosif; bereaksi hebat dengan air melepaskan panas tinggi.",
      "noteEn": "Extremely corrosive; violently reacts with water with boiling heat release."
    },
    "funFactsId": [
      "Awan tebal di atmosfer planet Venus tersusun dari tetesan asam sulfat pekat murni!",
      "Trik laboratorium keselamatan kimia terpenting: 'Ingat 3A: Asam Masuk Air, jangan Air masuk Asam!'"
    ],
    "funFactsEn": [
      "The dense clouds cloaking planet Venus are made of concentrated sulfuric acid droplets!",
      "Crucial lab safety rule: Always Add Acid to water, never water to acid!"
    ],
    "atoms3D": [
      {
        "element": "S",
        "x": 0,
        "y": 0,
        "z": 0
      },
      {
        "element": "O",
        "x": 0,
        "y": 1.45,
        "z": 0
      },
      {
        "element": "O",
        "x": 0,
        "y": -1.45,
        "z": 0
      },
      {
        "element": "O",
        "x": 1.35,
        "y": 0,
        "z": 0.6
      },
      {
        "element": "O",
        "x": -1.35,
        "y": 0,
        "z": -0.6
      }
    ],
    "bonds3D": [
      {
        "from": 0,
        "to": 1,
        "order": 2
      },
      {
        "from": 0,
        "to": 2,
        "order": 2
      },
      {
        "from": 0,
        "to": 3,
        "order": 1
      },
      {
        "from": 0,
        "to": 4,
        "order": 1
      }
    ]
  },
  {
    "id": "dna-adenine",
    "cid": 190,
    "formula": "C5H5N5",
    "nameId": "Adenin (Basa Nitrogen DNA)",
    "nameEn": "Adenine (DNA Base)",
    "iupac": "9H-purin-6-amine",
    "mass": 135.13,
    "category": "life",
    "level": "sma",
    "stateAtSTP": "solid",
    "geometry": "Cincin Purin Aromatik Planar",
    "polarity": "Polar (Donor & Akseptor Ikatan Hidrogen)",
    "summaryId": "Huruf 'A' dalam kode genetik DNA pembawa cetak biru seluruh kehidupan makhluk hidup.",
    "summaryEn": "The letter 'A' in the universal genetic code of life holding biological blueprints.",
    "detailsSD": "Di dalam tubuh kita ada buku panduan ajaib bernama DNA. Adenin adalah salah satu huruf utama penyusun kode DNA tersebut!",
    "detailsSMP": "Salah satu dari 4 basa nitrogen pembentuk DNA dan RNA (A, T, G, C). Adenin selalu berpasangan dengan Timin (T) pada DNA.",
    "detailsSMA": "Basa nitrogen turunan purin (cincin ganda beranggotakan 6 dan 5). Membentuk tepat dua ikatan hidrogen spesifik dengan Timin (atau Urasil pada RNA) sesuai kaidah pasangan basa Watson-Crick.",
    "detailsKuliah": "Sistem aromatik heteroaromatik 10 elektron-π (aturan Huckel 4n+2). Menyusun nukleotida adenosin trifosfat (ATP), koenzim NAD⁺, FAD, dan koenzim A, menjadikannya molekul sentral transfer energi biokimia seluruh domain kehidupan.",
    "safety": {
      "health": 1,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Komponen nukleotida biologis alami.",
      "noteEn": "Natural biological nucleotide component."
    },
    "funFactsId": [
      "Adenin telah ditemukan di dalam meteorit luar angkasa purba, membuktikan molekul pembentuk DNA bisa terbentuk di kosmos!",
      "DNA seluruh sel di dalam tubuh manusia jika dibentangkan lurus dapat mencapai matahari bolak-balik puluhan kali."
    ],
    "funFactsEn": [
      "Adenine has been extracted from ancient meteorites, proving life building blocks form in cosmic nebulae!",
      "If unwound, all DNA inside a single human body would stretch to the sun and back dozens of times."
    ],
    "atoms3D": [
      {
        "element": "N",
        "x": 1.25,
        "y": -0.68,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.28,
        "y": 0.67,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": 1.33,
        "z": 0
      },
      {
        "element": "C",
        "x": -1.21,
        "y": 0.6,
        "z": 0
      },
      {
        "element": "C",
        "x": -1.18,
        "y": -0.8,
        "z": 0
      },
      {
        "element": "N",
        "x": 0,
        "y": -1.41,
        "z": 0
      }
    ],
    "bonds3D": [
      {
        "from": 0,
        "to": 1,
        "order": 2
      },
      {
        "from": 1,
        "to": 2,
        "order": 1
      },
      {
        "from": 2,
        "to": 3,
        "order": 2
      },
      {
        "from": 3,
        "to": 4,
        "order": 1
      },
      {
        "from": 4,
        "to": 5,
        "order": 2
      },
      {
        "from": 5,
        "to": 0,
        "order": 1
      }
    ]
  },
  {
    "id": "ascorbic-acid",
    "cid": 54670067,
    "formula": "C6H8O6",
    "nameId": "Vitamin C (Asam Askorbat)",
    "nameEn": "Vitamin C (L-Ascorbic Acid)",
    "iupac": "(5R)-[(1S)-1,2-dihydroxyethyl]-3,4-dihydroxyfuran-2(5H)-one",
    "mass": 176.12,
    "category": "food",
    "level": "smp",
    "stateAtSTP": "solid",
    "geometry": "Cincin Lakton Furanosa dengan Gugus Enadiol",
    "polarity": "Sangat Polar (Larut Air)",
    "summaryId": "Antioksidan alami penjaga daya tahan tubuh yang melimpah pada buah jeruk dan jambu biji.",
    "summaryEn": "Natural antioxidant booster defending immune health, rich in citrus and guava.",
    "detailsSD": "Vitamin C ada di buah jeruk yang manis dan asam. Vitamin ini membuat kita tidak mudah terserang flu dan sariawan!",
    "detailsSMP": "Vitamin larut air yang penting untuk sintesis kolagen dan penyerapan zat besi. Tubuh manusia tidak bisa membuatnya sendiri sehingga harus diperoleh dari makanan.",
    "detailsSMA": "Memiliki sistem enadiol terkonjugasi dengan gugus karbonil lakton furanosa. Gugus enadiol ini sangat mudah teroksidasi mendonasikan 2 elektron dan 2 proton menjadi asam dehidroaskorbat, menjadikannya agen pereduksi (antioksidan) yang ulung.",
    "detailsKuliah": "Kofaktor penting bagi enzim prolil dan lisil hidroksilase pada maturasi serat kolagen jaringan ikat. Defisiensi menyebabkan penyakit skurvi (skorbut). Memiliki dua karbon kiral dengan konfigurasi stereokimia aktif biologis (5R, 1S).",
    "safety": {
      "health": 0,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Suplemen nutrisi esensial yang aman.",
      "noteEn": "Essential human nutritional supplement."
    },
    "funFactsId": [
      "Jambu biji merah sebenarnya mengandung vitamin C empat kali lebih banyak dibanding buah jeruk!",
      "Hampir semua mamalia bisa memproduksi vitamin C sendiri di tubuhnya, kecuali manusia, kera, dan marmut yang kehilangan enzim penutupnya akibat mutasi jutaan tahun lalu."
    ],
    "funFactsEn": [
      "Guava actually contains over 4 times more vitamin C than oranges!",
      "Most mammals make their own vitamin C; humans lost the enzyme gene millions of years ago."
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": 0,
        "y": 1.2,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.2,
        "y": 0.4,
        "z": 0
      },
      {
        "element": "C",
        "x": 0.7,
        "y": -1,
        "z": 0
      },
      {
        "element": "O",
        "x": -0.7,
        "y": -0.8,
        "z": 0
      },
      {
        "element": "C",
        "x": -1.1,
        "y": 0.5,
        "z": 0
      }
    ],
    "bonds3D": [
      {
        "from": 0,
        "to": 1,
        "order": 2
      },
      {
        "from": 1,
        "to": 2,
        "order": 1
      },
      {
        "from": 2,
        "to": 3,
        "order": 1
      },
      {
        "from": 3,
        "to": 4,
        "order": 1
      },
      {
        "from": 4,
        "to": 0,
        "order": 1
      }
    ]
  },
  {
    "id": "benzene",
    "cid": 241,
    "formula": "C6H6",
    "nameId": "Benzena",
    "nameEn": "Benzene",
    "iupac": "benzene",
    "mass": 78.11,
    "category": "energy",
    "level": "sma",
    "stateAtSTP": "liquid",
    "geometry": "Planar Heksagonal Sempurna (120°)",
    "polarity": "Nonpolar Simetris",
    "summaryId": "Cincin hidrokarbon aromatik legendaris yang menginspirasi kimia organik modern melalui resonansi elektron.",
    "summaryEn": "Legendary aromatic hydrocarbon ring that founded modern organic chemistry through electron resonance.",
    "detailsSD": "Benzena adalah molekul berbentuk segi enam yang sangat rapi seperti sarang lebah madu!",
    "detailsSMP": "Senyawa hidrokarbon berbentuk cincin segi enam dengan rumus C6H6. Menjadi bahan dasar pembuatan plastik, pewarna pakaian, dan obat-obatan.",
    "detailsSMA": "Struktur cincin datar dengan 6 atom C terhibridisasi sp² dan sudut ikatan tepat 120°. Mengalami delokalisasi elektron-π (resonansi) yang memberikan kestabilan aromatik tinggi (energi resonansi ~150 kJ/mol). Lebih menyukai reaksi substitusi elektrofilik daripada adisi.",
    "detailsKuliah": "Grup titik simetri D6h. Memenuhi aturan aromatisitas Huckel (4n + 2 dengan n = 1, total 6 elektron-π). Panjang ikatan C-C terukur seragam 1.397 Å, berada tepat di antara ikatan tunggal C-C (1.54 Å) dan ikatan rangkap C=C (1.34 Å). Karsinogen kelas 1 IARC.",
    "safety": {
      "health": 2,
      "flammability": 3,
      "instability": 0,
      "ghs": [
        "flammable",
        "health_hazard"
      ],
      "noteId": "Karsinogenik dan mudah terbakar; hindari kontak kulit dan inhalasi uap.",
      "noteEn": "Human carcinogen and flammable liquid; handle under professional ventilation."
    },
    "funFactsId": [
      "Ahli kimia Friedrich August Kekule menemukan struktur melingkar benzena setelah bermimpi melihat seekor ular yang menggigit ekornya sendiri (Ouroboros)!",
      "Benzena pertama kali diisolasi oleh ilmuwan besar Michael Faraday pada tahun 1825 dari residu gas penerangan jalan London."
    ],
    "funFactsEn": [
      "August Kekule figured out benzene ring structure after dreaming of an ouroboros snake biting its tail!",
      "Benzene was first isolated by Michael Faraday in 1825 from London street gaslight condensate."
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": 0,
        "y": 1.39,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.2,
        "y": 0.7,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.2,
        "y": -0.7,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": -1.39,
        "z": 0
      },
      {
        "element": "C",
        "x": -1.2,
        "y": -0.7,
        "z": 0
      },
      {
        "element": "C",
        "x": -1.2,
        "y": 0.7,
        "z": 0
      }
    ],
    "bonds3D": [
      {
        "from": 0,
        "to": 1,
        "order": 2
      },
      {
        "from": 1,
        "to": 2,
        "order": 1
      },
      {
        "from": 2,
        "to": 3,
        "order": 2
      },
      {
        "from": 3,
        "to": 4,
        "order": 1
      },
      {
        "from": 4,
        "to": 5,
        "order": 2
      },
      {
        "from": 5,
        "to": 0,
        "order": 1
      }
    ]
  },
  {
    "id": "paracetamol",
    "cid": 1983,
    "formula": "C8H9NO2",
    "nameId": "Parasetamol (Asetaminofen)",
    "nameEn": "Paracetamol (Acetaminophen)",
    "iupac": "N-(4-hydroxyphenyl)acetamide",
    "mass": 151.16,
    "category": "medicine",
    "level": "smp",
    "stateAtSTP": "solid",
    "geometry": "Cincin Aromatik Tersubstitusi Para",
    "polarity": "Sedang (LogP 0.46)",
    "summaryId": "Obat penurun panas demam dan pereda pusing kepala yang paling umum tersedia di lemari obat keluarga.",
    "summaryEn": "The most ubiquitous over-the-counter fever reducer and headache reliever.",
    "detailsSD": "Saat badan kita panas karena demam atau sakit gigi, dokter sering memberikan sirup atau tablet parasetamol agar badan kembali nyaman.",
    "detailsSMP": "Senyawa organik turunan anilin dan fenol yang berfungsi sebagai analgetik (pereda nyeri) dan antipiretik (penurun suhu tubuh saat demam).",
    "detailsSMA": "Struktur molekul tersusun atas cincin benzena yang disubstitusi oleh gugus hidroksil fenolik (-OH) dan gugus asetamida (-NHCOCH3) pada posisi para (1,4). Bekerja menghambat sintesis prostaglandin di sistem saraf pusat.",
    "detailsKuliah": "Tidak memiliki aktivitas anti-inflamasi perifer yang signifikan dibanding NSAID konvensional karena diinaktivasi oleh peroksida di lokasi inflamasi. Dimetabolisme oleh CYP2E1 menjadi metabolit reaktif hepatotoksik NAPQI, yang dinetralkan oleh cadangan glutation hepar.",
    "safety": {
      "health": 2,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "exclamation"
      ],
      "noteId": "Aman pada dosis terapeutik (<4g/hari dewasa); overdosis menyebabkan gagal hati akut.",
      "noteEn": "Safe at therapeutic doses; severe hepatotoxicity upon overdose."
    },
    "funFactsId": [
      "Parasetamol pertama kali disintesis pada tahun 1877 oleh Harmon Northrop Morse, namun baru populer mendunia setelah tahun 1950-an!",
      "Merupakan salah satu dari sedikit obat pereda nyeri yang relatif aman dikonsumsi oleh ibu hamil bila sesuai anjuran dokter."
    ],
    "funFactsEn": [
      "Paracetamol was synthesized back in 1877 but only gained global medical fame after the 1950s!",
      "It is one of the few analgesics considered relatively safe during pregnancy under medical guidance."
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": 0,
        "y": -1.2,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.2,
        "y": -0.5,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.2,
        "y": 0.9,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": 1.6,
        "z": 0
      },
      {
        "element": "C",
        "x": -1.2,
        "y": 0.9,
        "z": 0
      },
      {
        "element": "C",
        "x": -1.2,
        "y": -0.5,
        "z": 0
      },
      {
        "element": "O",
        "x": 0,
        "y": -2.5,
        "z": 0
      },
      {
        "element": "N",
        "x": 0,
        "y": 3,
        "z": 0
      }
    ],
    "bonds3D": [
      {
        "from": 0,
        "to": 1,
        "order": 2
      },
      {
        "from": 1,
        "to": 2,
        "order": 1
      },
      {
        "from": 2,
        "to": 3,
        "order": 2
      },
      {
        "from": 3,
        "to": 4,
        "order": 1
      },
      {
        "from": 4,
        "to": 5,
        "order": 2
      },
      {
        "from": 5,
        "to": 0,
        "order": 1
      },
      {
        "from": 0,
        "to": 6,
        "order": 1
      },
      {
        "from": 3,
        "to": 7,
        "order": 1
      }
    ]
  },
  {
    "id": "graphene",
    "cid": 6850738,
    "formula": "C",
    "nameId": "Grafena (Material Masa Depan)",
    "nameEn": "Graphene (Wonder Material)",
    "iupac": "graphene",
    "mass": 12.011,
    "category": "material",
    "level": "kuliah",
    "stateAtSTP": "solid",
    "geometry": "Kisi Sarang Lebah 2D (Ketebalan Satu Atom)",
    "polarity": "Nonpolar Konduktif",
    "summaryId": "Material tertipis dan terkuat di alam semesta: lembaran karbon setebal 1 atom yang menghantar listrik lebih cepat dari tembaga.",
    "summaryEn": "The thinnest, strongest substance known: a one-atom-thick carbon sheet conducting electrons faster than copper.",
    "detailsSD": "Grafena adalah lembaran ajaib yang sangat tipis, hanya setebal satu atom saja! Jika kita mencoretkan pensil di kertas, di sana ada serpihan kecil grafena.",
    "detailsSMP": "Alotrop karbon berbentuk lapisan datar dua dimensi. 200 kali lebih kuat dari baja tapi sangat ringan dan transparan.",
    "detailsSMA": "Struktur kisi sarang lebah heksagonal dengan hibridisasi sp². Setiap atom C terikat pada 3 atom C lainnya dengan ikatan kovalen kuat, sementara elektron pada orbital p membentuk pita konduksi terdelokalisasi di seluruh bidang lembaran.",
    "detailsKuliah": "Semilogam celah-nol dengan dispersi energi linear di sekitar titik Dirac (K dan K'). Elektron berperilaku sebagai fermion Dirac tanpa massa efektif, menghasilkan mobilitas elektron balistik >200,000 cm²/(V·s) pada suhu kamar dan konduktivitas termal fenomenal ~5000 W/(m·K).",
    "safety": {
      "health": 1,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Hindari menghirup nanopartikel debu karbon mikroskopis.",
      "noteEn": "Avoid inhalation of dry nanomaterial airborne dust."
    },
    "funFactsId": [
      "Grafena pertama kali diisolasi oleh peneliti Andre Geim dan Konstantin Novoselov pada tahun 2004 hanya menggunakan selotip perekat kantor untuk mengelupas pensil grafit!",
      "Satu helai jaring grafena seukuran lapangan sepak bola dan setipis plastik pembungkus makanan cukup kuat untuk menahan berat seekor gajah dewasa tanpa robek."
    ],
    "funFactsEn": [
      "Graphene was first isolated in 2004 using ordinary Scotch tape peeled off graphite, winning a Nobel Prize!",
      "A hammock of one-atom-thick graphene could support a 4-kg cat while weighing less than one of its whiskers."
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": 0,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.42,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 2.13,
        "y": 1.23,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.42,
        "y": 2.46,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": 2.46,
        "z": 0
      },
      {
        "element": "C",
        "x": -0.71,
        "y": 1.23,
        "z": 0
      },
      {
        "element": "C",
        "x": -2.13,
        "y": 1.23,
        "z": 0
      }
    ],
    "bonds3D": [
      {
        "from": 0,
        "to": 1,
        "order": 1
      },
      {
        "from": 1,
        "to": 2,
        "order": 1
      },
      {
        "from": 2,
        "to": 3,
        "order": 1
      },
      {
        "from": 3,
        "to": 4,
        "order": 1
      },
      {
        "from": 4,
        "to": 5,
        "order": 1
      },
      {
        "from": 5,
        "to": 0,
        "order": 1
      },
      {
        "from": 5,
        "to": 6,
        "order": 1
      }
    ]
  }
];

export function getCuratedMolecule(idOrCid) {
  if (!idOrCid) return null;
  const q = String(idOrCid).trim().toLowerCase();
  return curatedMolecules.find(m => 
    String(m.id).toLowerCase() === q ||
    String(m.cid) === q ||
    m.formula.toLowerCase() === q ||
    m.nameId.toLowerCase() === q ||
    m.nameEn.toLowerCase() === q
  ) || null;
}

export function searchCurated(term) {
  if (!term) return curatedMolecules;
  const q = term.trim().toLowerCase();
  return curatedMolecules.filter(m => 
    m.nameId.toLowerCase().includes(q) ||
    m.nameEn.toLowerCase().includes(q) ||
    m.formula.toLowerCase().includes(q) ||
    m.iupac.toLowerCase().includes(q) ||
    m.summaryId.toLowerCase().includes(q) ||
    m.summaryEn.toLowerCase().includes(q)
  );
}
