// ChemTaxa · Massive Encyclopedic Curated Molecular Catalog
export const moleculeCategories = {
  "atmosphere": {
    "id": "Atmosfer, Gas Bumi & Kosmik",
    "en": "Atmosphere & Cosmic Gases",
    "icon": "globe",
    "color": "#06b6d4"
  },
  "life": {
    "id": "Molekul Kehidupan & Biokimia",
    "en": "Molecules of Life & Biochemistry",
    "icon": "heart",
    "color": "#10b981"
  },
  "food": {
    "id": "Makanan, Nutrisi & Aroma Alami",
    "en": "Food, Flavors & Nutrition",
    "icon": "cup",
    "color": "#f59e0b"
  },
  "household": {
    "id": "Bahan Dapur & Rumah Tangga",
    "en": "Household Chemistry",
    "icon": "home",
    "color": "#8b5cf6"
  },
  "medicine": {
    "id": "Obat, Farmasi & Saraf",
    "en": "Medicines & Neurotransmitters",
    "icon": "pill",
    "color": "#ec4899"
  },
  "energy": {
    "id": "Energi, Bahan Bakar & Hidrokarbon",
    "en": "Energy & Hydrocarbons",
    "icon": "fire",
    "color": "#ef4444"
  },
  "industrial": {
    "id": "Kimia Industri, Asam & Basa Kuat",
    "en": "Industrial Chemicals, Acids & Bases",
    "icon": "industry",
    "color": "#3b82f6"
  },
  "material": {
    "id": "Material Maju, Alotrop & Polimer",
    "en": "Advanced Materials & Polymers",
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
    "category": "atmosphere",
    "level": "sd",
    "stateAtSTP": "liquid",
    "geometry": "Bengkok (Bent, 104.5°)",
    "polarity": "Sangat Polar (Ikatan Hidrogen)",
    "summaryId": "Pelarut universal kehidupan yang menutupi 71% permukaan Bumi.",
    "summaryEn": "The universal solvent of life covering 71% of Earth surface.",
    "detailsSD": "Air adalah cairan yang kita minum setiap hari! Bentuknya mirip kepala boneka beruang dengan dua telinga hidrogen.",
    "detailsSMP": "Tersusun atas 2 atom H dan 1 atom O. Bersifat polar kuat sehingga melarutkan garam, gula, dan mineral.",
    "detailsSMA": "Domain elektron AX₂E₂ dengan sudut 104.5° akibat desakan dua pasang elektron bebas (PEB). Memiliki anomali massa jenis es yang lebih ringan daripada air cair.",
    "detailsKuliah": "Momen dipol 1.85 D, permitivitas relatif ~80. Menjalani autoprotolisis dengan Kw = 1.0 x 10⁻¹⁴ pada 25°C. Jaringan ikatan hidrogen dinamis bertempo pikodetik.",
    "safety": {
      "health": 0,
      "flammability": 0,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Aman untuk dikonsumsi.",
      "noteEn": "Non-hazardous."
    },
    "funFactsId": [
      "Satu tetes air mengandung sekitar 1,5 miliar triliun molekul H₂O!"
    ],
    "funFactsEn": [
      "A single drop of water holds about 1.5 sextillion molecules!"
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
    "summaryId": "Gas vital respirasi seluler yang menyusun 21% atmosfer bumi.",
    "summaryEn": "Vital respiratory gas comprising 21% of Earth atmosphere.",
    "detailsSD": "Oksigen adalah gas yang kita hirup tanpa henti agar sel tubuh kita bertenaga.",
    "detailsSMP": "Diatomik O=O dengan ikatan kovalen rangkap dua. Dihasilkan oleh tumbuhan melalui fotosintesis.",
    "detailsSMA": "Berdasarkan teori orbital molekul (MOT), O₂ bersifat paramagnetik karena memiliki 2 elektron tidak berpasangan di orbital π*2p.",
    "detailsKuliah": "Keadaan dasar triplet (³Σg⁻), orde ikatan 2. Bersifat diradikal stabil secara kinetik namun termodinamik sangat oksidatif.",
    "safety": {
      "health": 0,
      "flammability": 0,
      "instability": 0,
      "ghs": [
        "oxidizer"
      ],
      "noteId": "Oksidator pemicu pembakaran.",
      "noteEn": "Strong oxidizer."
    },
    "funFactsId": [
      "Oksigen cair memiliki warna biru langit yang memukau dan tertarik oleh magnet!"
    ],
    "funFactsEn": [
      "Liquid oxygen is pale sky-blue and magnetically attracted!"
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
    "id": "nitrogen",
    "cid": 947,
    "formula": "N2",
    "nameId": "Gas Nitrogen",
    "nameEn": "Molecular Nitrogen",
    "iupac": "molecular nitrogen",
    "mass": 28.014,
    "category": "atmosphere",
    "level": "smp",
    "stateAtSTP": "gas",
    "geometry": "Linear (180°)",
    "polarity": "Nonpolar",
    "summaryId": "Penyusun terbesar udara kita (78%), sangat stabil berkat ikatan rangkap tiga.",
    "summaryEn": "Major component of air (78%), extremely stable due to triple bond.",
    "detailsSD": "Sebagian besar udara di sekitar kita sebenarnya adalah gas nitrogen yang tenang dan tidak berbau.",
    "detailsSMP": "Terdiri dari 2 atom nitrogen dengan ikatan kovalen rangkap tiga (N≡N) yang sangat kokoh dan sulit diputus.",
    "detailsSMA": "Energi disosiasi ikatan mencapai 945 kJ/mol. Bersifat inert pada suhu kamar, hanya dapat difiksasi oleh bakteri pengikat nitrogen atau proses industri Haber-Bosch bertekanan tinggi.",
    "detailsKuliah": "Molekul diamagnetik, konfigurasi MO: σ1s² σ*1s² σ2s² σ*2s² π2px² π2py² σ2pz². Celah HOMO-LUMO sangat besar.",
    "safety": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "ghs": [
        "compressed_gas"
      ],
      "noteId": "Gas asfiksian bila menggantikan oksigen dalam ruang tertutup.",
      "noteEn": "Simple asphyxiant."
    },
    "funFactsId": [
      "Nitrogen cair bersuhu -196°C sanggup membekukan daun atau bunga seketika hingga rapuh seperti kaca!"
    ],
    "funFactsEn": [
      "Liquid nitrogen at -196°C instantly freezes flowers until they shatter like glass!"
    ],
    "atoms3D": [
      {
        "element": "N",
        "x": -0.55,
        "y": 0,
        "z": 0
      },
      {
        "element": "N",
        "x": 0.55,
        "y": 0,
        "z": 0
      }
    ],
    "bonds3D": [
      {
        "from": 0,
        "to": 1,
        "order": 3
      }
    ]
  },
  {
    "id": "ozone",
    "cid": 24823,
    "formula": "O3",
    "nameId": "Gas Ozon",
    "nameEn": "Ozone",
    "iupac": "ozone",
    "mass": 47.997,
    "category": "atmosphere",
    "level": "sma",
    "stateAtSTP": "gas",
    "geometry": "Bengkok (Bent, 116.8°)",
    "polarity": "Polar Lemah",
    "summaryId": "Perisai stratosfer bumi yang menyerap radiasi ultraviolet berbahaya dari matahari.",
    "summaryEn": "Earth stratospheric shield absorbing harmful ultraviolet solar radiation.",
    "detailsSD": "Ozon adalah payung pelindung tak terlihat di langit yang menjaga bumi dari sengatan sinar ultraviolet matahari.",
    "detailsSMP": "Alotrop oksigen yang tersusun atas 3 atom oksigen. Berbau tajam segar seperti udara setelah hujan badai petir.",
    "detailsSMA": "Struktur resonansi hibrida dengan ikatan delokalisasi parsial ganda (panjang ikatan 1.28 Å) dan sudut 116.8° (AX₂E₁). Ozon di stratosfer melindungi bumi, namun ozon di troposfer merupakan polutan iritan kabut asap.",
    "detailsKuliah": "Mengalami siklus Chapman fotokimia di stratosfer. Sangat mudah dirusak secara katalitik oleh radikal klorin (Cl•) dari gas CFC.",
    "safety": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "ghs": [
        "oxidizer",
        "toxic"
      ],
      "noteId": "Toksik dan iritatif bagi paru-paru pada konsentrasi tinggi.",
      "noteEn": "Toxic oxidant; lung irritant."
    },
    "funFactsId": [
      "Aroma segar khas di udara sesaat setelah petir menyambar adalah aroma ozon yang terbentuk dari loncatan listrik!"
    ],
    "funFactsEn": [
      "The fresh sharp scent in the air after a lightning storm is newly generated ozone!"
    ],
    "atoms3D": [
      {
        "element": "O",
        "x": 0,
        "y": 0.38,
        "z": 0
      },
      {
        "element": "O",
        "x": -1.08,
        "y": -0.25,
        "z": 0
      },
      {
        "element": "O",
        "x": 1.08,
        "y": -0.25,
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
    "polarity": "Nonpolar",
    "summaryId": "Gas rumah kaca alami dan bahan baku utama fotosintesis tumbuhan hijau.",
    "summaryEn": "Natural greenhouse gas and photosynthetic carbon feedstock.",
    "detailsSD": "Gas yang kita hembuskan saat bernapas dan gelembung soda yang segar di minuman.",
    "detailsSMP": "Rumus CO₂, atom karbon di tengah berikatan rangkap dua dengan dua atom oksigen (O=C=O).",
    "detailsSMA": "Geometri linear 180° (hibridisasi sp). Momen dipol ikatan C=O saling meniadakan secara simetris.",
    "detailsKuliah": "Vibrasi tekukan IR aktif kuat pada 667 cm⁻¹ dan peregangan asimetris 2349 cm⁻¹ mendasari efek rumah kaca planet.",
    "safety": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "ghs": [
        "compressed_gas"
      ],
      "noteId": "Asfiksian bila berkonsentrasi tinggi.",
      "noteEn": "Asphyxiant at high levels."
    },
    "funFactsId": [
      "Es kering (dry ice) adalah CO₂ padat yang langsung berubah jadi gas pada -78.5°C tanpa pernah basah!"
    ],
    "funFactsEn": [
      "Dry ice is solid CO2 that sublimates straight to gas at -78.5°C without getting wet!"
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
    "id": "carbon-monoxide",
    "cid": 281,
    "formula": "CO",
    "nameId": "Karbon Monoksida",
    "nameEn": "Carbon Monoxide",
    "iupac": "carbon monoxide",
    "mass": 28.01,
    "category": "atmosphere",
    "level": "smp",
    "stateAtSTP": "gas",
    "geometry": "Linear (180°)",
    "polarity": "Polar Lemah",
    "summaryId": "Gas pembunuh senyap hasil pembakaran tak sempurna yang mengikat hemoglobin darah.",
    "summaryEn": "Silent hazard gas from incomplete combustion binding blood hemoglobin.",
    "detailsSD": "Gas berbahaya yang tidak berbau dan tidak terlihat yang keluar dari knalpot kendaraan bermotor yang rusak.",
    "detailsSMP": "Terdiri dari 1 atom C dan 1 atom O. Sangat berbahaya bila terhirup karena merebut tempat oksigen di dalam darah.",
    "detailsSMA": "Memiliki ikatan kovalen rangkap tiga dengan sumbangan pasangan elektron bebas dari oksigen (ikatan koordinasi). Afinitas pengikatan terhadap hemoglobin 200 kali lebih kuat dibanding O₂.",
    "detailsKuliah": "Ligan π-akseptor kuat dalam kimia koordinasi organologam (kompleks karbonil logam seperti Ni(CO)₄). Ikatan balik π (back-bonding) dari d-orbital logam ke π* orbital CO.",
    "safety": {
      "health": 4,
      "flammability": 4,
      "instability": 0,
      "ghs": [
        "flammable",
        "toxic"
      ],
      "noteId": "Sangat beracun dan mematikan; pasang detektor CO.",
      "noteEn": "Lethal toxic inhalation hazard."
    },
    "funFactsId": [
      "CO mengikat hemoglobin sangat kuat membentuk karboksihemoglobin yang berwarna merah terang ceri!"
    ],
    "funFactsEn": [
      "CO binds hemoglobin tightly forming cherry-red carboxyhemoglobin!"
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": -0.56,
        "y": 0,
        "z": 0
      },
      {
        "element": "O",
        "x": 0.56,
        "y": 0,
        "z": 0
      }
    ],
    "bonds3D": [
      {
        "from": 0,
        "to": 1,
        "order": 3
      }
    ]
  },
  {
    "id": "hydrogen-sulfide",
    "cid": 402,
    "formula": "H2S",
    "nameId": "Hidrogen Sulfida",
    "nameEn": "Hydrogen Sulfide",
    "iupac": "sulfane",
    "mass": 34.08,
    "category": "atmosphere",
    "level": "smp",
    "stateAtSTP": "gas",
    "geometry": "Bengkok (Bent, 92.1°)",
    "polarity": "Polar Lemah",
    "summaryId": "Gas vulkanik berbau telur busuk yang juga diproduksi bakteri di rawa-rawa.",
    "summaryEn": "Volcanic foul-smelling gas produced by anaerobic swamp microbes.",
    "detailsSD": "Gas yang baunya seperti telur busuk yang sering tercium di kawah gunung berapi atau selokan.",
    "detailsSMP": "Senyawa belerang dan hidrogen. Bersifat asam lemah bila larut dalam air dan sangat korosif terhadap logam.",
    "detailsSMA": "Bentuk molekul bengkok mirip air tetapi dengan sudut ikatan jauh lebih sempit (92.1°) karena tidak melibatkan hibridisasi sp³ penuh (menggunakan orbital p hampir murni dari sulfur).",
    "detailsKuliah": "Gasotransmiter endogen pada sistem kardiovaskular mamalia bersama NO dan CO. Reduktor kuat yang mengendapkan kation logam berat sebagai sulfida (CuS, PbS).",
    "safety": {
      "health": 4,
      "flammability": 4,
      "instability": 0,
      "ghs": [
        "flammable",
        "toxic"
      ],
      "noteId": "Sangat beracun; pada konsentrasi tinggi melumpuhkan saraf penciuman.",
      "noteEn": "Extremely toxic gas paralyzing olfactory nerves."
    },
    "funFactsId": [
      "Pada konsentrasi mematikan, hidrogen sulfida justru tak tercium karena langsung melumpuhkan saraf hidung dalam hitungan detik!"
    ],
    "funFactsEn": [
      "At lethal levels, H2S loses its smell because it paralyzes olfactory nerve cells instantly!"
    ],
    "atoms3D": [
      {
        "element": "S",
        "x": 0,
        "y": 0.1,
        "z": 0
      },
      {
        "element": "H",
        "x": -0.96,
        "y": -0.8,
        "z": 0
      },
      {
        "element": "H",
        "x": 0.96,
        "y": -0.8,
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
    "geometry": "Cincin Piranosa Bentuk Kursi",
    "polarity": "Sangat Polar (Larut Air)",
    "summaryId": "Bahan bakar respirasi utama sel makhluk hidup dan produk fotosintesis.",
    "summaryEn": "Primary cellular respiratory fuel and photosynthetic staple.",
    "detailsSD": "Gula sederhana yang memberi energi pada otak dan otot kita untuk beraktivitas!",
    "detailsSMP": "Monosakarida aldoheksosa dengan 6 atom karbon. Menghasilkan energi ATP melalui respirasi sel.",
    "detailsSMA": "Memiliki 4 karbon kiral dalam bentuk rantai lurus. Di air membentuk cincin piranosa hemiasetal (anomer α dan β).",
    "detailsKuliah": "Substrat awal jalur glikolisis Embden-Meyerhof-Parnas. Konformasi kursi heksosa paling stabil karena semua gugus -OH berada pada posisi ekuatorial.",
    "safety": {
      "health": 0,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Nutrisi alami biologis.",
      "noteEn": "Biological nutrient."
    },
    "funFactsId": [
      "Otak manusia menggunakan lebih dari 120 gram glukosa murni setiap hari untuk berpikir!"
    ],
    "funFactsEn": [
      "The human brain consumes over 120 grams of pure glucose each day!"
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
    "id": "fructose",
    "cid": 5984,
    "formula": "C6H12O6",
    "nameId": "Fruktosa (Gula Buah)",
    "nameEn": "D-Fructose",
    "iupac": "(3S,4R,5R)-1,3,4,5,6-pentahydroxyhexan-2-one",
    "mass": 180.16,
    "category": "life",
    "level": "sma",
    "stateAtSTP": "solid",
    "geometry": "Cincin Furanosa 5 Anggota",
    "polarity": "Sangat Polar",
    "summaryId": "Gula alami termanis yang melimpah pada buah-buahan matang dan madu lebah.",
    "summaryEn": "The sweetest natural sugar abundant in ripe fruits and honey.",
    "detailsSD": "Gula manis alami yang membuat buah mangga, pisang, dan madu terasa sangat lezat!",
    "detailsSMP": "Isomer fungsional dari glukosa dengan rumus molekul sama (C₆H₁₂O₆) tetapi memiliki gugus keton.",
    "detailsSMA": "Ketoheksosa yang membentuk cincin furanosa beranggotakan 5 cincin. Tingkat kemanisan 1.7 kali lebih manis dibanding sukrosa.",
    "detailsKuliah": "Dimetabolisme di hati melalui jalur fruktosa-1-fosfat melewati titik regulasi fosfofruktokinase-1 (PFK-1), memicu lipogenesis cepat.",
    "safety": {
      "health": 0,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Aman untuk makanan.",
      "noteEn": "Natural dietary sugar."
    },
    "funFactsId": [
      "Madu lebah terasa jauh lebih manis dibanding gula pasir karena tingginya kandungan fruktosa alami!"
    ],
    "funFactsEn": [
      "Honey tastes sweeter than cane sugar because of its high natural fructose ratio!"
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": 0.7,
        "y": 1.1,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.2,
        "y": -0.3,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": -1.2,
        "z": 0
      },
      {
        "element": "C",
        "x": -1.2,
        "y": -0.3,
        "z": 0
      },
      {
        "element": "O",
        "x": -0.7,
        "y": 1,
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
        "to": 0,
        "order": 1
      }
    ]
  },
  {
    "id": "sucrose",
    "cid": 5988,
    "formula": "C12H22O11",
    "nameId": "Sukrosa (Gula Pasir)",
    "nameEn": "Sucrose (Table Sugar)",
    "iupac": "(2R,3R,4S,5S,6R)-2-[(2S,3S,4S,5R)-3,4-dihydroxy-2,5-bis(hydroxymethyl)oxolan-2-yl]oxy-6-(hydroxymethyl)oxane-3,4,5-triol",
    "mass": 342.3,
    "category": "food",
    "level": "sd",
    "stateAtSTP": "solid",
    "geometry": "Disakarida Terkait Ikatan Glikosidik",
    "polarity": "Sangat Polar",
    "summaryId": "Gula meja putih kristal hasil fotosintesis tebu dan bit gula.",
    "summaryEn": "Disaccharide culinary table sugar refined from sugarcane and beets.",
    "detailsSD": "Gula pasir yang ditaruh ibu di teh manis dan kue ulang tahun!",
    "detailsSMP": "Disakarida yang tersusun dari penggabungan 1 molekul glukosa dan 1 molekul fruktosa.",
    "detailsSMA": "Dihubungkan oleh ikatan glikosidik α-1,β-2 antara karbon anomerik glukosa dan fruktosa, menjadikannya gula non-pereduksi (uji Fehling negatif).",
    "detailsKuliah": "Dihidrolisis oleh enzim sukrase/invertase menjadi campuran glukosa dan fruktosa (gula invert) yang membalik arah rotasi optik dari dekstrorotatori (+66.5°) menjadi levorotatori (-20°).",
    "safety": {
      "health": 0,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Konsumsi seimbang.",
      "noteEn": "Common carbohydrate."
    },
    "funFactsId": [
      "Minyak asam sulfat pekat jika diteteskan ke gula pasir akan mengubahnya menjadi pilar arang hitam menjulang akibat dehidrasi ekstrem!"
    ],
    "funFactsEn": [
      "Concentrated sulfuric acid dehydrates table sugar into a giant steaming black carbon snake!"
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": -1.5,
        "y": 0,
        "z": 0
      },
      {
        "element": "O",
        "x": 0,
        "y": 0.5,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.5,
        "y": 0,
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
      }
    ]
  },
  {
    "id": "glycine",
    "cid": 750,
    "formula": "C2H5NO2",
    "nameId": "Glisin",
    "nameEn": "Glycine",
    "iupac": "2-aminoacetic acid",
    "mass": 75.07,
    "category": "life",
    "level": "sma",
    "stateAtSTP": "solid",
    "geometry": "Asam Amino Akiral",
    "polarity": "Zwitterion Polar",
    "summaryId": "Asam amino terkecil dan satu-satunya yang akiral, penyusun utama serat kolagen kulit.",
    "summaryEn": "The simplest and only achiral proteinogenic amino acid, core of skin collagen.",
    "detailsSD": "Balok kecil penyusun protein yang membuat kulit dan rambut kita lentur dan kuat.",
    "detailsSMP": "Asam amino paling sederhana di mana gugus samping rantainya hanyalah 1 atom hidrogen tunggal.",
    "detailsSMA": "Satu-satunya asam amino standar tanpa atom karbon kiral (bersifat optis inaktif). Dalam air berwujud ion zwitter (+H₃N-CH₂-COO⁻).",
    "detailsKuliah": "Menyusun sepertiga dari seluruh residu asam amino serat kolagen triple helix (motif Gly-X-Y). Neurotransmiter inhibisi utama pada medula spinalis.",
    "safety": {
      "health": 0,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Asam amino alami tubuh.",
      "noteEn": "Natural amino acid."
    },
    "funFactsId": [
      "Glisin telah dideteksi di atmosfer komet 67P dan awan gas antariksa, menunjukkan benih protein tersebar di kosmos!"
    ],
    "funFactsEn": [
      "Glycine was discovered on comet 67P and interstellar nebulae, proving building blocks of proteins float in space!"
    ],
    "atoms3D": [
      {
        "element": "N",
        "x": -1.8,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": -0.4,
        "y": 0.5,
        "z": 0
      },
      {
        "element": "C",
        "x": 0.9,
        "y": -0.2,
        "z": 0
      },
      {
        "element": "O",
        "x": 1.1,
        "y": -1.4,
        "z": 0
      },
      {
        "element": "O",
        "x": 1.9,
        "y": 0.6,
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
        "order": 2
      },
      {
        "from": 2,
        "to": 4,
        "order": 1
      }
    ]
  },
  {
    "id": "cysteine",
    "cid": 5862,
    "formula": "C3H7NO2S",
    "nameId": "Sistein",
    "nameEn": "Cysteine",
    "iupac": "(2R)-2-amino-3-sulfanylpropanoic acid",
    "mass": 121.16,
    "category": "life",
    "level": "sma",
    "stateAtSTP": "solid",
    "geometry": "Asam Amino dengan Gugus Tiol (-SH)",
    "polarity": "Polar Reaktif",
    "summaryId": "Asam amino pengikat jembatan disulfida yang mengunci kekuatan keratin rambut dan kuku.",
    "summaryEn": "Thiol amino acid forming disulfide bridges locking hair and nail keratin.",
    "detailsSD": "Asam amino yang membuat rambut manusia bisa keriting atau lurus berkat jembatan ikatan sulfur!",
    "detailsSMP": "Asam amino yang mengandung atom belerang (sulfur). Menjadi bahan dasar antioksidan tubuh.",
    "detailsSMA": "Mengandung gugus tiol (-SH). Dua molekul sistein dapat teroksidasi membentuk ikatan kovalen disulfida (-S-S-) menghasilkan sistin yang menstabilkan struktur tersier protein.",
    "detailsKuliah": "Nukleofil kuat pada sisi aktif enzim protease sistein (contoh: papain, kaspase). Prekursor langsung biosintesis glutation (GSH), antioksidan pelindung seluler terpenting.",
    "safety": {
      "health": 1,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Suplemen nutrisi.",
      "noteEn": "Nutritional supplement."
    },
    "funFactsId": [
      "Proses pengeritingan rambut di salon bekerja dengan memutus ikatan disulfida sistein lalu menyusunnya kembali dengan bentuk baru!"
    ],
    "funFactsEn": [
      "Hair perm treatments chemically break cysteine disulfide bridges and re-form them into curls!"
    ],
    "atoms3D": [
      {
        "element": "S",
        "x": -2,
        "y": 0.5,
        "z": 0
      },
      {
        "element": "C",
        "x": -0.5,
        "y": -0.4,
        "z": 0
      },
      {
        "element": "C",
        "x": 0.8,
        "y": 0.4,
        "z": 0
      },
      {
        "element": "N",
        "x": 0.7,
        "y": 1.8,
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
    "id": "atp",
    "cid": 5957,
    "formula": "C10H16N5O13P3",
    "nameId": "Adenosin Trifosfat (ATP)",
    "nameEn": "Adenosine Triphosphate",
    "iupac": "[[[[[(2R,3S,4R,5R)-5-(6-aminopurin-9-yl)-3,4-dihydroxyoxolan-2-yl]methoxy-hydroxyphosphoryl]oxy-hydroxyphosphoryl]oxy-hydroxyphosphoryl]oxy]phosphonic acid",
    "mass": 507.18,
    "category": "life",
    "level": "sma",
    "stateAtSTP": "solid",
    "geometry": "Nukleotida Trifosfat Berenergi Tinggi",
    "polarity": "Sangat Polar Polianionik (-4)",
    "summaryId": "Mata uang energi universal yang menggerakkan seluruh kerja sel biologis makhluk hidup.",
    "summaryEn": "Universal cellular energy currency powering biological mechanical & biochemical work.",
    "detailsSD": "Baterai isi ulang di dalam tubuh kita yang memasok tenaga saat kita melompat, berlari, dan berpikir!",
    "detailsSMP": "Molekul pembawa energi seluler. Melepaskan satu gugus fosfat menjadi ADP untuk mengeluarkan energi.",
    "detailsSMA": "Terdiri dari basa adenin, gula ribosa, dan rantai 3 gugus fosfat. Hidrolisis ikatan fosfoanhidrida berenergi tinggi (ATP → ADP + Pi) melepaskan energi bebas Gibbs standar ΔG°' = -30.5 kJ/mol.",
    "detailsKuliah": "Kompleks aktif biologis dengan ion Mg²⁺ (Mg-ATP²⁻) yang menetralkan muatan negatif rantai fosfat untuk memudahkan serangan nukleofilik enzim kinase dan ATPase.",
    "safety": {
      "health": 0,
      "flammability": 0,
      "instability": 1,
      "ghs": [
        "safe"
      ],
      "noteId": "Komponen intraseluler esensial.",
      "noteEn": "Baseline cellular molecule."
    },
    "funFactsId": [
      "Setiap hari, tubuh manusia mendaur ulang ATP seberat berat badannya sendiri bolak-balik antara ATP dan ADP!"
    ],
    "funFactsEn": [
      "Every single day, your body recycles its own body weight in ATP back and forth!"
    ],
    "atoms3D": [
      {
        "element": "P",
        "x": 0,
        "y": 0,
        "z": 0
      },
      {
        "element": "O",
        "x": 1.5,
        "y": 0,
        "z": 0
      },
      {
        "element": "P",
        "x": 3,
        "y": 0,
        "z": 0
      },
      {
        "element": "O",
        "x": 4.5,
        "y": 0,
        "z": 0
      },
      {
        "element": "P",
        "x": 6,
        "y": 0,
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
      }
    ]
  },
  {
    "id": "cholesterol",
    "cid": 5997,
    "formula": "C27H46O",
    "nameId": "Kolesterol",
    "nameEn": "Cholesterol",
    "iupac": "(3S,8S,9S,10R,13R,14S,17R)-10,13-dimethyl-17-[(2R)-6-methylheptan-2-yl]-2,3,4,7,8,9,11,12,14,15,16,17-dodecahydro-1H-cyclopenta[a]phenanthren-3-ol",
    "mass": 386.65,
    "category": "life",
    "level": "kuliah",
    "stateAtSTP": "solid",
    "geometry": "Inti Steroid 4 Cincin Terfusi",
    "polarity": "Sangat Lipofilik (LogP 7.0)",
    "summaryId": "Lipid struktural penjaga fluiditas membran sel dan prekursor seluruh hormon steroid.",
    "summaryEn": "Structural membrane lipid buffer and master precursor for steroid hormones.",
    "detailsSD": "Lemak khusus di tubuh kita yang menjaga dinding sel tetap kokoh dan membuat hormon penting.",
    "detailsSMP": "Senyawa lipid steroid yang diproduksi oleh organ hati. Terlalu banyak di darah bisa menyumbat pembuluh arteri.",
    "detailsSMA": "Struktur cincin siklopentanoperhidrofenantrena (3 cincin heksana dan 1 cincin pentana) dengan 1 gugus hidroksil polar di C3. Menjaga fluiditas membran fosfolipid pada berbagai suhu.",
    "detailsKuliah": "Prekursor biosintesis hormon steroid (kortisol, aldosteron, testosteron, estradiol), asam empedu, dan vitamin D. Disintesis dari asetil-KoA via jalur mevalonat (enzim kunci HMG-CoA reduktase yang dihambat obat statin).",
    "safety": {
      "health": 1,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Lipid fisiologis tubuh.",
      "noteEn": "Physiological lipid."
    },
    "funFactsId": [
      "Sekitar 25% dari seluruh kolesterol di tubuh manusia berada di dalam otak sebagai isolator sel saraf!"
    ],
    "funFactsEn": [
      "Roughly 25% of all cholesterol in the human body is concentrated inside the brain!"
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": -1.5,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.5,
        "y": 0,
        "z": 0
      },
      {
        "element": "O",
        "x": -2.8,
        "y": 0,
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
        "from": 0,
        "to": 3,
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
    "summaryId": "Kristal bumbu gurih esensial yang terbentuk dari reaksi logam Na dan gas Cl₂.",
    "summaryEn": "Essential culinary crystal formed from explosive sodium and chlorine gas.",
    "detailsSD": "Garam gurih di sup hangat! Terbentuk dari logam yang mudah terbakar dan gas beracun yang bersatu jadi bumbu lezat.",
    "detailsSMP": "Contoh sempurna ikatan ionik: Na melepaskan 1 elektron (Na⁺) dan Cl menangkap 1 elektron (Cl⁻).",
    "detailsSMA": "Struktur kristal kubik FCC di mana setiap kation Na⁺ dikelilingi 6 anion Cl⁻ (koordinasi 6:6). Titik leleh tinggi 801°C, menghantar listrik dalam lelehan dan larutan.",
    "detailsKuliah": "Energi kisi Born-Haber -787 kJ/mol. Mempertahankan gradien potensial aksi transmembran sel saraf melalui pompa Na⁺/K⁺-ATPase.",
    "safety": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Garam dapur aman.",
      "noteEn": "Edible salt."
    },
    "funFactsId": [
      "Air laut seluruh dunia menyimpan sekitar 50 juta miliar ton garam NaCl murni!"
    ],
    "funFactsEn": [
      "Earth oceans hold approximately 50 quadrillion tons of pure NaCl salt!"
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
    "detailsSD": "Asam cuka adalah cairan yang membuat kuah bakso terasa asam segar!",
    "detailsSMP": "Asam karboksilat lemah dengan rumus CH₃COOH, memerahkan lakmus biru.",
    "detailsSMA": "Ka = 1.8 x 10⁻⁵. Bereaksi dengan baking soda menghasilkan letupan gelembung gas CO₂.",
    "detailsKuliah": "Membentuk dimer siklik stabil via ikatan hidrogen ganda. Prekursor monomer vinil asetat untuk industri lem PVA.",
    "safety": {
      "health": 3,
      "flammability": 2,
      "instability": 0,
      "ghs": [
        "corrosive",
        "flammable"
      ],
      "noteId": "Aman saat encer (cuka dapur); korosif pada glasial murni.",
      "noteEn": "Corrosive at glacial purity."
    },
    "funFactsId": [
      "Mencampur cuka dan baking soda adalah reaksi klasik yang menggerakkan replika letusan gunung berapi pameran sains!"
    ],
    "funFactsEn": [
      "Mixing vinegar and baking soda is the classic science fair erupting volcano formula!"
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
    "id": "sodium-bicarbonate",
    "cid": 516892,
    "formula": "NaHCO3",
    "nameId": "Baking Soda (Natrium Bikarbonat)",
    "nameEn": "Sodium Bicarbonate",
    "iupac": "sodium hydrogen carbonate",
    "mass": 84.007,
    "category": "household",
    "level": "smp",
    "stateAtSTP": "solid",
    "geometry": "Garam Anorganik Amfoter",
    "polarity": "Ionik Polar",
    "summaryId": "Bubuk pengembang kue yang melepaskan jutaan rongga gas CO₂ saat dipanggang dalam oven.",
    "summaryEn": "Baking leavening agent releasing millions of CO2 gas bubbles in baking dough.",
    "detailsSD": "Serbuk putih ajaib yang membuat adonan kue mengembang empuk dan lembut di dalam oven!",
    "detailsSMP": "Garam basa lemah yang melepaskan gas karbon dioksida bila dipanaskan atau dicampur dengan asam.",
    "detailsSMA": "Bekerja sebagai antasida penetral asam lambung lambung berlebih (HCl + NaHCO₃ → NaCl + H₂O + CO₂). Bersifat amfoter (dapat bereaksi dengan asam maupun basa kuat).",
    "detailsKuliah": "Komponen utama sistem buffer bikarbonat fisiologis darah mamalia (H₂CO₃ / HCO₃⁻) yang menjaga pH darah ketat pada rentang 7.35 - 7.45.",
    "safety": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Aman untuk makanan.",
      "noteEn": "Food-grade safe."
    },
    "funFactsId": [
      "Baking soda ditaruh di dalam lemari es karena kemampuannya menyerap dan menetralkan molekul asam bau makanan tak sedap!"
    ],
    "funFactsEn": [
      "People put open baking soda boxes in refrigerators because it neutralizes sour odor molecules!"
    ],
    "atoms3D": [
      {
        "element": "Na",
        "x": -2,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": 0,
        "z": 0
      },
      {
        "element": "O",
        "x": 0,
        "y": 1.3,
        "z": 0
      },
      {
        "element": "O",
        "x": 1.1,
        "y": -0.6,
        "z": 0
      },
      {
        "element": "O",
        "x": -1.1,
        "y": -0.6,
        "z": 0
      }
    ],
    "bonds3D": [
      {
        "from": 1,
        "to": 2,
        "order": 2
      },
      {
        "from": 1,
        "to": 3,
        "order": 1
      },
      {
        "from": 1,
        "to": 4,
        "order": 1
      }
    ]
  },
  {
    "id": "capsaicin",
    "cid": 1548943,
    "formula": "C18H27NO3",
    "nameId": "Kapsaisin (Molekul Pedas Cabai)",
    "nameEn": "Capsaicin (Chili Heat)",
    "iupac": "(E)-N-[(4-hydroxy-3-methoxyphenyl)methyl]-8-methylnon-6-enamide",
    "mass": 305.41,
    "category": "food",
    "level": "sma",
    "stateAtSTP": "solid",
    "geometry": "Turunan Vaniloid Rantai Alifatik Panjang",
    "polarity": "Lipofilik Nonpolar (Tidak Larut Air)",
    "summaryId": "Senyawa penyebab sensasi pedas terbakar pada cabai rawit yang mengaktifkan reseptor panas lidah.",
    "summaryEn": "Spicy active compound in chili peppers binding tongue TRPV1 thermal receptors.",
    "detailsSD": "Molekul yang membuat lidah kita terasa terbakar saat makan sambal cabai rawit pedas!",
    "detailsSMP": "Zat alami cabai yang merangsang saraf lidah. Karena tidak larut air, minum air putih tidak menghilangkan pedas, melainkan harus minum susu!",
    "detailsSMA": "Molekul hidrofobik panjang dengan cincin benzena tersubstitusi gugus fenol dan metoksi. Menstimulasi reseptor vaniloid TRPV1 pada membran saraf sensorik suhu panas (>43°C). Kasein dalam susu dapat mengikat dan membilasnya.",
    "detailsKuliah": "Digunakan dalam koyo medis analgetik topikal karena aplikasi berulang menyebabkan deplesi substansi P pada ujung saraf perifer sehingga mematikan sinyal nyeri kronis.",
    "safety": {
      "health": 2,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "toxic",
        "irritant"
      ],
      "noteId": "Iritan kuat mata dan selaput lendir.",
      "noteEn": "Severe eye and mucosal irritant."
    },
    "funFactsId": [
      "Burung tidak merasakan pedasnya cabai sama sekali karena reseptor TRPV1 mereka tidak memiliki situs pengikatan kapsaisin!"
    ],
    "funFactsEn": [
      "Birds are completely immune to chili spice because their TRPV1 receptors do not bind capsaicin!"
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": -3,
        "y": 0,
        "z": 0
      },
      {
        "element": "N",
        "x": 0,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 3,
        "y": 0,
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
      }
    ]
  },
  {
    "id": "menthol",
    "cid": 16666,
    "formula": "C10H20O",
    "nameId": "Mentol (Aroma Dingin Mint)",
    "nameEn": "Menthol (Mint Coolness)",
    "iupac": "(1R,2S,5R)-2-isopropyl-5-methylcyclohexan-1-ol",
    "mass": 156.27,
    "category": "food",
    "level": "sma",
    "stateAtSTP": "solid",
    "geometry": "Sikloheksana Tersubstitusi Tri-Alkil",
    "polarity": "Sedang (Larut Alkohol & Lemak)",
    "summaryId": "Monoterpenoid minyak peppermint yang menipu saraf lidah dengan ilusi sensasi dingin menyegarkan.",
    "summaryEn": "Peppermint monoterpenoid triggering TRPM8 cold sensory receptors.",
    "detailsSD": "Zat di dalam permen mint dan pasta gigi yang membuat mulut terasa dingin semriwing segar!",
    "detailsSMP": "Senyawa organik dari daun mint yang memberikan sensasi dingin tanpa menurunkan suhu fisik aslinya.",
    "detailsSMA": "Struktur sikloheksana dengan 3 pusat kiral pada posisi C1, C2, dan C5. Mengaktifkan kanal ion TRPM8 pada saraf sensorik yang biasanya mendeteksi suhu dingin (<28°C).",
    "detailsKuliah": "Agonis spesifik kanal reseptor transien melastatin 8 (TRPM8). Konformasi kursi paling stabil menempatkan ketiga gugus substituen (metil, isopropil, hidroksil) pada orientasi ekuatorial.",
    "safety": {
      "health": 1,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "irritant"
      ],
      "noteId": "Aman untuk makanan dan kosmetik.",
      "noteEn": "Cosmetic and flavorant safe."
    },
    "funFactsId": [
      "Mentol sebenarnya sama sekali tidak mendinginkan es atau minuman, ia murni menipu sistem saraf otak kita!"
    ],
    "funFactsEn": [
      "Menthol does not physically lower temperature at all; it chemically tricks your brain cold receptors!"
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
        "y": 0,
        "z": 0
      },
      {
        "element": "O",
        "x": 2.2,
        "y": 0,
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
    "geometry": "Cincin Aromatik Para-Disubstitusi",
    "polarity": "Sedang (LogP 0.46)",
    "summaryId": "Obat antipiretik penurun demam dan pereda sakit kepala paling populer di dunia.",
    "summaryEn": "World ubiquitous fever reducer and analgesic found in household medicine cabinets.",
    "detailsSD": "Obat sirup manis penurun demam saat kita sakit panas atau pusing kepala.",
    "detailsSMP": "Senyawa organik turunan anilin dan fenol yang bekerja menormalkan suhu tubuh di pusat saraf otak.",
    "detailsSMA": "Memiliki gugus fenolik (-OH) dan asetamida (-NHCOCH₃) pada posisi para (1,4). Menghambat biosintesis prostaglandin sentral.",
    "detailsKuliah": "Dimetabolisme fase I oleh sitokrom P450 CYP2E1 menjadi metabolit elektrofilik toksik N-asetil-p-benzokuinon imina (NAPQI) yang harus dikonjugasi dengan glutation.",
    "safety": {
      "health": 2,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "exclamation"
      ],
      "noteId": "Dosis aman dewasa <4 g/hari.",
      "noteEn": "Liver toxicity upon overdose."
    },
    "funFactsId": [
      "Parasetamol pertama kali disintesis sejak tahun 1877 tetapi baru menjadi obat terkenal dunia di era 1950-an!"
    ],
    "funFactsEn": [
      "Paracetamol was synthesized back in 1877 but only gained global medical stardom in the 1950s!"
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
    "geometry": "Cincin Aromatik dengan Karboksil & Ester",
    "polarity": "Polar Lemah",
    "summaryId": "Obat anti-inflamasi bersejarah dan pengencer darah pencegah serangan jantung.",
    "summaryEn": "Historic anti-inflammatory drug and cardioprotective antiplatelet agent.",
    "detailsSD": "Obat legendaris pereda sakit yang aslinya terinspirasi dari kulit pohon dedalu di hutan.",
    "detailsSMP": "Dibuat dari reaksi esterifikasi antara asam salisilat dan anhidrida asetat.",
    "detailsSMA": "Menghambat enzim siklooksigenase (COX-1 dan COX-2) secara ireversibel melalui transfer gugus asetil ke residu serin aktif enzim.",
    "detailsKuliah": "Asetilasi Ser-529 pada COX-1 memblokir akses asam arakidonat, menghentikan sintesis tromboksan A2 (TXA2) dalam trombosit seumur hidup sel (~10 hari).",
    "safety": {
      "health": 2,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "toxic"
      ],
      "noteId": "Kontraindikasi sindrom Reye pada anak kecil.",
      "noteEn": "Contraindicated in pediatric viral illness."
    },
    "funFactsId": [
      "Astronaut misi Apollo 11 membawa obat aspirin ke bulan dalam kotak P3K mereka pada tahun 1969!"
    ],
    "funFactsEn": [
      "Apollo 11 astronauts packed aspirin in their spacecraft medical kit to the Moon in 1969!"
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
    "id": "penicillin-g",
    "cid": 5904,
    "formula": "C16H18N2O4S",
    "nameId": "Penisilin G",
    "nameEn": "Penicillin G (Benzylpenicillin)",
    "iupac": "(2S,5R,6R)-3,3-dimethyl-7-oxo-6-[(2-phenylacetyl)amino]-4-thia-1-azabicyclo[3.2.0]heptane-2-carboxylic acid",
    "mass": 334.39,
    "category": "medicine",
    "level": "kuliah",
    "stateAtSTP": "solid",
    "geometry": "Cincin Beta-Laktam Tegang Terfusi Tiazolidin",
    "polarity": "Polar (Asam Karboksilat)",
    "summaryId": "Antibiotik pertama penyelamat ratusan juta jiwa yang menghancurkan dinding sel bakteri.",
    "summaryEn": "The first miracle antibiotic saving hundreds of millions by busting bacterial cell walls.",
    "detailsSD": "Obat pembunuh bakteri hebat yang ditemukan tanpa sengaja dari jamur roti oleh Alexander Fleming!",
    "detailsSMP": "Antibiotik alami dari kapang Penicillium notatum yang mampu menyembuhkan infeksi mematikan.",
    "detailsSMA": "Memiliki struktur inti cincin beta-laktam 4-anggota yang mengalami tegangan cincin tinggi (ring strain). Menghambat enzim transpeptidase sintesis peptidoglikan dinding sel bakteri.",
    "detailsKuliah": "Cincin β-laktam terfusi cincin tiazolidin 5-anggota membentuk sudut lipatan non-planar yang melemahkan resonansi amida normal, menjadikan karbonil laktam sangat elektrofilik untuk mengasilasi Serin enzim PBP bakteri.",
    "safety": {
      "health": 2,
      "flammability": 1,
      "instability": 1,
      "ghs": [
        "exclamation"
      ],
      "noteId": "Perhatikan riwayat alergi anafilaktik penisilin.",
      "noteEn": "Risk of anaphylactic allergy in sensitized individuals."
    },
    "funFactsId": [
      "Alexander Fleming menemukan penisilin pada tahun 1928 karena ia lupa membersihkan cawan petri laboratoriumnya sebelum pergi berlibur!"
    ],
    "funFactsEn": [
      "Alexander Fleming discovered penicillin in 1928 because he left messy petri dishes unwashed before vacation!"
    ],
    "atoms3D": [
      {
        "element": "S",
        "x": -1.5,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": 0.8,
        "z": 0
      },
      {
        "element": "N",
        "x": 1.2,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": -0.8,
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
        "to": 0,
        "order": 1
      }
    ]
  },
  {
    "id": "dopamine",
    "cid": 681,
    "formula": "C8H11NO2",
    "nameId": "Dopamin",
    "nameEn": "Dopamine",
    "iupac": "4-(2-aminoethyl)benzene-1,2-diol",
    "mass": 153.18,
    "category": "medicine",
    "level": "sma",
    "stateAtSTP": "solid",
    "geometry": "Katekolamina Rantai Etilamina",
    "polarity": "Polar (Dua Gugus Fenol & Amina)",
    "summaryId": "Neurotransmiter motivasi dan hadiah di otak yang memicu rasa antusias dan kepuasan belajar.",
    "summaryEn": "Brain reward and motivation neurotransmitter reinforcing learning and curiosity.",
    "detailsSD": "Molekul kegembiraan di otak saat kita berhasil menyelesaikan tugas sulit atau memenangkan permainan!",
    "detailsSMP": "Zat kimia di otak yang bertugas mengirim pesan antar sel saraf untuk mengatur rasa senang dan motivasi.",
    "detailsSMA": "Struktur tersusun atas cincin katekol (1,2-dihidroksibenzena) yang terhubung ke gugus etilamina. Disintesis dari asam amino tirosina melalui L-DOPA.",
    "detailsKuliah": "Agonis reseptor terkopel protein G (D1-D5). Defisiensi neuron dopaminergik di substansia nigra memicu penyakit Parkinson; overaktivitas jalur mesolimbik terkait skizofrenia.",
    "safety": {
      "health": 2,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "exclamation"
      ],
      "noteId": "Neurotransmiter endogen.",
      "noteEn": "Endogenous neuromodulator."
    },
    "funFactsId": [
      "Rasa puas saat kamu berhasil memecahkan soal kuis kimia memicu lonjakan molekul dopamin di otakmu!"
    ],
    "funFactsEn": [
      "The satisfying click when you solve a hard chemistry puzzle releases a surge of dopamine in your brain!"
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": -1.2,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.2,
        "y": 0.5,
        "z": 0
      },
      {
        "element": "N",
        "x": 2.4,
        "y": 0,
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
    "detailsSD": "Gas alam yang menyala dengan api biru bersih di kompor dapur!",
    "detailsSMP": "Alkana paling sederhana CH₄, 1 atom karbon mengikat 4 atom hidrogen dengan ikatan kovalen tunggal.",
    "detailsSMA": "Tetrahedral sempurna dengan sudut 109.5° (sp³). Nonpolar dengan gaya dispersi London lemah.",
    "detailsKuliah": "Grup titik Td. Memiliki potensi pemanasan global (GWP) 28-36 kali lipat lebih besar dibanding CO₂ dalam horizon 100 tahun.",
    "safety": {
      "health": 1,
      "flammability": 4,
      "instability": 0,
      "ghs": [
        "flammable",
        "gas"
      ],
      "noteId": "Sangat mudah terbakar.",
      "noteEn": "Extremely flammable gas."
    },
    "funFactsId": [
      "Planet Neptunus tampak berwarna biru laut indah karena atmosfer gas metana menyerap cahaya merah matahari!"
    ],
    "funFactsEn": [
      "Neptune looks vibrant blue because atmospheric methane absorbs red solar wavelengths!"
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
    "id": "propane",
    "cid": 6334,
    "formula": "C3H8",
    "nameId": "Propana (Gas Elpiji)",
    "nameEn": "Propane (LPG)",
    "iupac": "propane",
    "mass": 44.096,
    "category": "energy",
    "level": "smp",
    "stateAtSTP": "gas",
    "geometry": "Rantai Tetrahedral Karbon Alkana",
    "polarity": "Nonpolar",
    "summaryId": "Komponen gas LPG dalam tabung baja yang mudah dicairkan di bawah tekanan sedang.",
    "summaryEn": "Key component of LPG fuel easily liquefied under moderate pressure.",
    "detailsSD": "Gas di dalam tabung elpiji tabung hijau atau biru yang dipakai memasak makanan setiap hari.",
    "detailsSMP": "Alkana rantai 3 karbon dengan rumus C₃H₈. Mudah dicairkan menjadi cairan agar muat banyak di dalam tabung elpiji.",
    "detailsSMA": "Pembakaran sempurna menghasilkan CO₂ dan H₂O dengan pelepasan kalor tinggi: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O (ΔH = -2220 kJ/mol).",
    "detailsKuliah": "Diproduksi dari penyulingan minyak bumi dan pemrosesan gas alam. Menjadi bahan baku proses perengkahan termal (steam cracking) menghasilkan propilena untuk plastik polipropilena.",
    "safety": {
      "health": 1,
      "flammability": 4,
      "instability": 0,
      "ghs": [
        "flammable",
        "gas"
      ],
      "noteId": "Mudah terbakar dan membentuk campuran eksplosif dengan udara.",
      "noteEn": "Extremely flammable gas."
    },
    "funFactsId": [
      "Propana aslinya sama sekali tidak berbau, perusahaan gas menambahkan zat merkaptan berbau belerang agar jika ada kebocoran kita langsung tahu!"
    ],
    "funFactsEn": [
      "Propane is naturally odorless; ethyl mercaptan is intentionally added so people instantly smell leaks!"
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": -1.2,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": 0.6,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.2,
        "y": 0,
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
    "summaryId": "Cincin hidrokarbon aromatik legendaris dengan delokalisasi elektron resonansi.",
    "summaryEn": "Legendary aromatic hydrocarbon ring with fully delocalized pi-electrons.",
    "detailsSD": "Molekul berbentuk segi enam yang sangat rapi dan simetris seperti sarang lebah madu.",
    "detailsSMP": "Senyawa cincin 6 atom karbon dengan rumus C₆H₆, bahan dasar obat-obatan dan plastik.",
    "detailsSMA": "Sudut ikatan 120° (sp²). Mengalami delokalisasi 6 elektron-π yang memenuhi kaidah aromatisitas Hückel (4n + 2 dengan n=1). Lebih menyukai substitusi elektrofilik daripada adisi.",
    "detailsKuliah": "Grup titik D6h. Panjang ikatan C-C terukur seragam 1.397 Å (di antara ikatan tunggal 1.54 Å dan rangkap 1.34 Å). Karsinogenik kelas 1 IARC.",
    "safety": {
      "health": 2,
      "flammability": 3,
      "instability": 0,
      "ghs": [
        "flammable",
        "health_hazard"
      ],
      "noteId": "Karsinogenik; hindari paparan uap secara langsung.",
      "noteEn": "Known human carcinogen."
    },
    "funFactsId": [
      "Struktur cincin benzena ditemukan August Kekulé setelah bermimpi melihat ular mitologi Ouroboros menggigit ekornya sendiri!"
    ],
    "funFactsEn": [
      "August Kekule cracked the benzene ring after dreaming of an Ouroboros snake biting its tail!"
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
    "summaryId": "Raja bahan kimia industri dunia yang menggerakkan aki kendaraan bermotor dan pupuk.",
    "summaryEn": "King of industrial chemicals powering car batteries, fertilizers, and mining.",
    "detailsSD": "Air aki keras di dalam baterai mobil dan motor yang tidak boleh disentuh karena sangat berbahaya.",
    "detailsSMP": "Asam kuat diprotik bervalensi 2, mampu menghancurkan kain dan kertas seketika.",
    "detailsSMA": "Bentuk tetrahedral pada atom S (sp³). Reaksi pelarutan dengan air sangat eksotermik (aturan 3A: Selalu tuangkan Asam ke Air, jangan Air ke Asam).",
    "detailsKuliah": "Pelarut asam super dengan fungsi keasaman Hammett H₀ = -12. Menjadi indikator tolak ukur kapasitas industri kimia suatu negara (>260 juta ton/tahun).",
    "safety": {
      "health": 3,
      "flammability": 0,
      "instability": 2,
      "ghs": [
        "corrosive"
      ],
      "noteId": "Sangat korosif terhadap kulit dan jaringan tubuh.",
      "noteEn": "Extremely corrosive; violent exothermic reaction with water."
    },
    "funFactsId": [
      "Awan kuning tebal yang menyelimuti planet Venus tersusun dari tetesan asam sulfat pekat murni!"
    ],
    "funFactsEn": [
      "The thick yellow clouds choking planet Venus are made of concentrated sulfuric acid droplets!"
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
    "id": "hydrochloric-acid",
    "cid": 313,
    "formula": "HCl",
    "nameId": "Asam Klorida (Asam Lambung)",
    "nameEn": "Hydrochloric Acid",
    "iupac": "chlorane",
    "mass": 36.46,
    "category": "industrial",
    "level": "smp",
    "stateAtSTP": "gas",
    "geometry": "Linear Diatomik (180°)",
    "polarity": "Kovalen Sangat Polar",
    "summaryId": "Asam kuat pembasmi kuman di lambung kita dan pembersih karat kerak industri.",
    "summaryEn": "Strong stomach digestive acid and heavy industrial rust descaling reagent.",
    "detailsSD": "Asam kuat di dalam lambung perut kita yang mencerna makanan dan membunuh bakteri jahat yang tertelan.",
    "detailsSMP": "Gas hidrogen klorida yang terlarut dalam air menjadi asam klorida cair dengan pH sangat rendah (<1).",
    "detailsSMA": "Elektrolit kuat monoprotik yang terionisasi sempurna 100% di dalam air (HCl → H⁺ + Cl⁻). Titik azeotrop dengan air berada pada konsentrasi 20.2% dengan titik didih 108.6°C.",
    "detailsKuliah": "pKa = -6.3. Bersama asam nitrat membentuk Aqua Regia (Air Raja dengan perbandingan 3 HCl : 1 HNO₃) yang mampu melarutkan logam mulia emas dan platina.",
    "safety": {
      "health": 3,
      "flammability": 0,
      "instability": 1,
      "ghs": [
        "corrosive"
      ],
      "noteId": "Uap asam menusuk hidung dan sangat korosif pada mata dan kulit.",
      "noteEn": "Corrosive fuming acid."
    },
    "funFactsId": [
      "Dinding lambung manusia dilapisi lendir mukosa tebal agar tidak tercerna sendiri oleh asam klorida yang sangat keras!"
    ],
    "funFactsEn": [
      "Your stomach secretes a thick mucus coat to avoid digesting itself with concentrated HCl!"
    ],
    "atoms3D": [
      {
        "element": "H",
        "x": -0.64,
        "y": 0,
        "z": 0
      },
      {
        "element": "Cl",
        "x": 0.64,
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
    "id": "sodium-hydroxide",
    "cid": 14798,
    "formula": "NaOH",
    "nameId": "Natrium Hidroksida (Soda Api)",
    "nameEn": "Sodium Hydroxide (Caustic Soda)",
    "iupac": "sodium hydroxide",
    "mass": 39.997,
    "category": "industrial",
    "level": "smp",
    "stateAtSTP": "solid",
    "geometry": "Kisi Kristal Ionik Logam-Hidroksil",
    "polarity": "Ionik Kuat",
    "summaryId": "Basa kuat pembersih pipa tersumbat dan bahan baku pembuatan sabun batangan.",
    "summaryEn": "Heavy caustic base used for unblocking drains and saponifying soap.",
    "detailsSD": "Soda api pembersih saluran air wastafel yang tersumbat rambut dan kotoran lemak.",
    "detailsSMP": "Basa kuat bervalensi 1 (pH 14) yang melepaskan ion OH⁻. Terasa sangat licin bila mengenai kulit karena menyabunkan lemak kulit.",
    "detailsSMA": "Padatan putih higroskopis yang menyerap uap air dan CO₂ dari udara bebas (membentuk Na₂CO₃). Reaksi pelarutannya dalam air sangat eksotermik melepaskan panas mendidih.",
    "detailsKuliah": "Reagen saponifikasi trigliserida menghasilkan gliserol dan garam natrium asam lemak (sabun). Digunakan dalam proses Bayer untuk memurnikan bauksit menjadi alumina murni.",
    "safety": {
      "health": 3,
      "flammability": 0,
      "instability": 1,
      "ghs": [
        "corrosive"
      ],
      "noteId": "Sangat kaustik; dapat menyebabkan kebutaan permanen bila terkena mata.",
      "noteEn": "Severe skin and eye caustic burns."
    },
    "funFactsId": [
      "Sabun mandi tradisional dibuat dari minyak kelapa yang direaksikan dengan larutan soda api panas!"
    ],
    "funFactsEn": [
      "Traditional soaps are made by boiling coconut oil with caustic sodium hydroxide solution!"
    ],
    "atoms3D": [
      {
        "element": "Na",
        "x": -1.2,
        "y": 0,
        "z": 0
      },
      {
        "element": "O",
        "x": 0.4,
        "y": 0,
        "z": 0
      },
      {
        "element": "H",
        "x": 1.3,
        "y": 0,
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
      }
    ]
  },
  {
    "id": "graphene",
    "cid": 6850738,
    "formula": "C",
    "nameId": "Grafena (Material Super 2D)",
    "nameEn": "Graphene (Wonder Material)",
    "iupac": "graphene",
    "mass": 12.011,
    "category": "material",
    "level": "kuliah",
    "stateAtSTP": "solid",
    "geometry": "Kisi Heksagonal 2D Setebal Satu Atom",
    "polarity": "Nonpolar Konduktif",
    "summaryId": "Material tertipis dan terkuat di dunia: lembaran karbon setebal 1 atom yang menghantar listrik super cepat.",
    "summaryEn": "Thinnest, strongest material known: one-atom-thick carbon sheet conducting electrons balistically.",
    "detailsSD": "Lembaran ajaib super tipis yang hanya setebal satu atom saja, tetapi 200 kali lebih kuat dari baja!",
    "detailsSMP": "Alotrop karbon dua dimensi berbentuk sarang lebah yang sangat ringan, transparan, dan penghantar listrik yang ulung.",
    "detailsSMA": "Hibridisasi sp² dengan sudut 120°. Elektron pada orbital p terdelokalisasi di seluruh bidang lembaran membentuk pita konduksi semilogam.",
    "detailsKuliah": "Dispersi energi linear di titik Dirac (E = ℏv_F|k|). Elektron berperilaku sebagai fermion Dirac tanpa massa dengan mobilitas balistik >200,000 cm²/(V·s).",
    "safety": {
      "health": 1,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Hindari inhalasi debu nanomaterial.",
      "noteEn": "Avoid inhaling dry nanomaterial dust."
    },
    "funFactsId": [
      "Grafena pertama kali diisolasi ilmuwan di laboratorium hanya dengan menggunakan selotip perekat kantor yang ditempelkan ke pensil grafit!"
    ],
    "funFactsEn": [
      "Graphene was first isolated using ordinary Scotch tape peeled off graphite, earning a Nobel Prize!"
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
    "id": "silica",
    "cid": 24261,
    "formula": "SiO2",
    "nameId": "Silika (Pasir Kuarsa & Kaca)",
    "nameEn": "Silicon Dioxide (Quartz & Glass)",
    "iupac": "dioxosilane",
    "mass": 60.084,
    "category": "material",
    "level": "smp",
    "stateAtSTP": "solid",
    "geometry": "Jejaring Raksasa Kovalent Tetrahedral SiO4",
    "polarity": "Jejaring Kovalen Kuat",
    "summaryId": "Mineral pembentuk pasir pantai putih, kristal kuarsa, dan kaca jendela rumah.",
    "summaryEn": "Network mineral forming white beach sand, quartz gemstones, and window glass.",
    "detailsSD": "Pasir putih di pantai dan kaca jendela bening yang tembus pandang terbuat dari silika!",
    "detailsSMP": "Senyawa silikon dan oksigen yang membentuk struktur jaringan raksasa kovalen dengan titik leleh sangat tinggi (>1700°C).",
    "detailsSMA": "Bukan molekul diskret seperti CO₂, melainkan polimer kristal tiga dimensi di mana setiap atom Si terikat tetrahedral pada 4 atom O, dan setiap atom O menjembatani 2 atom Si.",
    "detailsKuliah": "Memiliki sifat piezoelektrik pada kristal kuarsa (menghasilkan getaran frekuensi presisi tinggi untuk resonator jam tangan kuarsa dan mikroprosesor komputer).",
    "safety": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Aman sebagai padatan; hindari menghirup debu silika kristalin jangka panjang (silikosis).",
      "noteEn": "Respirable dust hazard."
    },
    "funFactsId": [
      "Hampir seluruh chip mikroprosesor di ponsel pintar dan komputermu dibuat dari silikon murni hasil pemurnian silika pasir kuarsa!"
    ],
    "funFactsEn": [
      "Virtually all computer microchips are etched onto ultra-pure silicon refined from quartz silica sand!"
    ],
    "atoms3D": [
      {
        "element": "Si",
        "x": 0,
        "y": 0,
        "z": 0
      },
      {
        "element": "O",
        "x": 0.9,
        "y": 0.9,
        "z": 0.9
      },
      {
        "element": "O",
        "x": -0.9,
        "y": -0.9,
        "z": 0.9
      },
      {
        "element": "O",
        "x": -0.9,
        "y": 0.9,
        "z": -0.9
      },
      {
        "element": "O",
        "x": 0.9,
        "y": -0.9,
        "z": -0.9
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
    "id": "teflon",
    "cid": 6451198,
    "formula": "(C2F4)n",
    "nameId": "Teflon (PTFE Polimer Anti-Lengket)",
    "nameEn": "Teflon (Polytetrafluoroethylene)",
    "iupac": "polytetrafluoroethene",
    "mass": 100.02,
    "category": "material",
    "level": "sma",
    "stateAtSTP": "solid",
    "geometry": "Rantai Polimer Terfluorinasi Heliks",
    "polarity": "Nonpolar Sangat Inert",
    "summaryId": "Lapisan anti-lengket wajan memasak paling licin di dunia yang tahan zat kimia korosif apapun.",
    "summaryEn": "Slick non-stick pan coating resistant to almost all corrosive chemicals and friction.",
    "detailsSD": "Lapisan wajan anti-lengket di dapur sehingga telur mata sapi yang digoreng tidak menempel sama sekali!",
    "detailsSMP": "Polimer sintetis rantai panjang atom karbon yang seluruhnya diselimuti oleh atom fluorin yang sangat kuat mengikat.",
    "detailsSMA": "Ikatan C-F (energi ikatan 485 kJ/mol) adalah ikatan tunggal terkuat dalam kimia organik. Memiliki koefisien gesek terkecil ketiga dari semua zat padat yang diketahui (μ ≈ 0.05).",
    "detailsKuliah": "Bersifat sangat hidrofobik dan oleofobik karena tingginya elektronegativitas atom fluorin yang menyelimuti rantai utama karbon, menolak interaksi van der Waals dengan molekul luar.",
    "safety": {
      "health": 1,
      "flammability": 0,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Aman pada suhu normal; jangan memanaskan wajan kosong di atas 260°C.",
      "noteEn": "Thermal degradation above 260°C emits fumes."
    },
    "funFactsId": [
      "Teflon sangat licin sampai-sampai kaki tokek yang terkenal bisa menempel di dinding kaca sekalipun akan terpeleset jatuh di atas wajan teflon!"
    ],
    "funFactsEn": [
      "Teflon is so frictionless that even a gecko sticky foot cannot grip onto it!"
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": -1.2,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.2,
        "y": 0,
        "z": 0
      },
      {
        "element": "F",
        "x": -1.2,
        "y": 1.3,
        "z": 0
      },
      {
        "element": "F",
        "x": -1.2,
        "y": -1.3,
        "z": 0
      },
      {
        "element": "F",
        "x": 1.2,
        "y": 1.3,
        "z": 0
      },
      {
        "element": "F",
        "x": 1.2,
        "y": -1.3,
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
      },
      {
        "from": 0,
        "to": 3,
        "order": 1
      },
      {
        "from": 1,
        "to": 4,
        "order": 1
      },
      {
        "from": 1,
        "to": 5,
        "order": 1
      }
    ]
  },
  {
    "id": "dna-adenine",
    "cid": 190,
    "formula": "C5H5N5",
    "nameId": "Adenin (Basa DNA)",
    "nameEn": "Adenine (DNA Base)",
    "iupac": "9H-purin-6-amine",
    "mass": 135.13,
    "category": "life",
    "level": "sma",
    "stateAtSTP": "solid",
    "geometry": "Cincin Purin Aromatik Planar",
    "polarity": "Polar (Donor & Akseptor H-Bond)",
    "summaryId": "Basa nitrogen purin pembentuk kode genetik DNA dan pembawa energi ATP.",
    "summaryEn": "Purine nucleotide base of the universal genetic code and energy carrier ATP.",
    "detailsSD": "Salah satu huruf sandi ajaib di dalam buku panduan tubuh kita (DNA)!",
    "detailsSMP": "Basa nitrogen DNA yang selalu berpasangan dengan Timin (A-T) melalui 2 ikatan hidrogen.",
    "detailsSMA": "Cincin ganda purin beranggotakan 6 dan 5. Terdelokalisasi aromatik dengan 10 elektron-π (aturan Hückel 4n+2).",
    "detailsKuliah": "Komponen nukleosida adenosin, prekursor koenzim NAD⁺, FAD, Koenzim A, dan cAMP.",
    "safety": {
      "health": 1,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Komponen biologis alami.",
      "noteEn": "Biological baseline."
    },
    "funFactsId": [
      "Adenin ditemukan di dalam debu meteorit luar angkasa purba yang jatuh ke bumi!"
    ],
    "funFactsEn": [
      "Adenine has been extracted from interstellar ancient meteorites!"
    ],
    "atoms3D": [
      {
        "element": "N",
        "x": 0,
        "y": 1.2,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.2,
        "y": 0.5,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.2,
        "y": -0.9,
        "z": 0
      },
      {
        "element": "N",
        "x": 0,
        "y": -1.4,
        "z": 0
      },
      {
        "element": "C",
        "x": -1.2,
        "y": -0.9,
        "z": 0
      },
      {
        "element": "C",
        "x": -1.2,
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
    "id": "dna-guanine",
    "cid": 135398634,
    "formula": "C5H5N5O",
    "nameId": "Guanin (Basa DNA)",
    "nameEn": "Guanine (DNA Base)",
    "iupac": "2-amino-1,9-dihydropurin-6-one",
    "mass": 151.13,
    "category": "life",
    "level": "sma",
    "stateAtSTP": "solid",
    "geometry": "Cincin Purin dengan Gugus Karbonil & Amino",
    "polarity": "Polar (3 Ikatan Hidrogen dengan Sitosin)",
    "summaryId": "Basa purin DNA yang mengikat sitosin dengan 3 ikatan hidrogen super kuat.",
    "summaryEn": "DNA purine base forming 3 strong hydrogen bonds with cytosine.",
    "detailsSD": "Pasangan sejati dari Sitosin dalam tali tangga DNA di dalam setiap sel tubuh kita.",
    "detailsSMP": "Huruf G dalam kode genetik DNA (A, T, G, C). Pasangan G-C memiliki 3 ikatan hidrogen sehingga lebih tahan panas.",
    "detailsSMA": "Kandungan GC (%GC content) menentukan titik leleh termal (Tm) untai ganda heliks DNA.",
    "detailsKuliah": "Gugus C6-karbonil dan C2-amina bertindak sebagai pola ikatan hidrogen Donor-Akseptor-Donor (DAD) yang berkomplementer sempurna dengan Sitosin (ADA).",
    "safety": {
      "health": 1,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Komponen asam nukleat alami.",
      "noteEn": "Natural nucleic acid base."
    },
    "funFactsId": [
      "Guanin pertama kali diisolasi ilmuwan pada tahun 1844 dari kotoran burung laut (guano)!"
    ],
    "funFactsEn": [
      "Guanine was first discovered in 1844 from seabird droppings called guano!"
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": 0,
        "y": 1.2,
        "z": 0
      },
      {
        "element": "O",
        "x": 0,
        "y": 2.4,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.2,
        "y": 0.5,
        "z": 0
      },
      {
        "element": "N",
        "x": 1.2,
        "y": -0.9,
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
    "id": "dna-cytosine",
    "cid": 597,
    "formula": "C4H5N3O",
    "nameId": "Sitosin (Basa DNA)",
    "nameEn": "Cytosine (DNA Base)",
    "iupac": "4-aminopyrimidin-2(1H)-one",
    "mass": 111.1,
    "category": "life",
    "level": "sma",
    "stateAtSTP": "solid",
    "geometry": "Cincin Pirimidin Planar Heterosiklik",
    "polarity": "Polar",
    "summaryId": "Basa pirimidin pembawa kode genetik dan situs utama metilasi epigenetika DNA.",
    "summaryEn": "Pyrimidine genetic base and primary locus of epigenetic DNA methylation.",
    "detailsSD": "Basa DNA yang selalu bergandengan tangan dengan Guanin di inti sel kita.",
    "detailsSMP": "Basa nitrogen cincin tunggal (pirimidin). Pasangan komplementernya adalah Guanin.",
    "detailsSMA": "Metilasi sitosin pada posisi karbon ke-5 (5-metilsitosin) oleh enzim DNMT merupakan saklar pengatur ekspresi gen epigenetik tanpa mengubah urutan sekuens DNA.",
    "detailsKuliah": "Mengalami deaminasi spontan menjadi urasil dengan laju ~100 peristiwa/sel/hari, yang diperbaiki oleh enzim DNA urasil glikosilase (UDG) untuk mencegah mutasi C→T.",
    "safety": {
      "health": 1,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Nukleobasa alami.",
      "noteEn": "Natural nucleobase."
    },
    "funFactsId": [
      "Metilasi sitosin bekerja seperti penanda stabilo buku yang menentukan apakah gen tertentu dibaca atau ditutup!"
    ],
    "funFactsEn": [
      "Cytosine methylation works like a molecular highlighter turning genes on and off!"
    ],
    "atoms3D": [
      {
        "element": "N",
        "x": 0,
        "y": 1.2,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.1,
        "y": 0.5,
        "z": 0
      },
      {
        "element": "N",
        "x": 1.1,
        "y": -0.8,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": -1.3,
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
      }
    ]
  },
  {
    "id": "dna-thymine",
    "cid": 1135,
    "formula": "C5H6N2O2",
    "nameId": "Timin (Basa Khusus DNA)",
    "nameEn": "Thymine (DNA Specific Base)",
    "iupac": "5-methylpyrimidine-2,4(1H,3H)-dione",
    "mass": 126.11,
    "category": "life",
    "level": "sma",
    "stateAtSTP": "solid",
    "geometry": "Cincin Pirimidin dengan Gugus Metil C5",
    "polarity": "Polar (Dua Gugus Karbonil)",
    "summaryId": "Basa pembeda utama antara DNA dan RNA, selalu berpasangan dengan Adenin.",
    "summaryEn": "Distinguishing base between DNA and RNA, pairing specifically with Adenine.",
    "detailsSD": "Huruf T dalam kode DNA yang membedakan DNA dari RNA.",
    "detailsSMP": "Basa pirimidin yang hanya ada di DNA (pada RNA digantikan oleh Urasil). Membentuk 2 ikatan hidrogen dengan Adenin.",
    "detailsSMA": "Kehadiran gugus metil (-CH₃) pada posisi C5 melindungi DNA dari kesalahan perbaikan deaminasi sitosin dan radiasi UV.",
    "detailsKuliah": "Paparan radiasi sinar ultraviolet (UV-B) dapat menginduksi fotodimerisasi siklobutana antara dua timin bersebelahan (dimer timin), memblokir polimerase replikasi DNA.",
    "safety": {
      "health": 1,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Basa DNA fisiologis.",
      "noteEn": "Physiological DNA base."
    },
    "funFactsId": [
      "Kerusakan kulit saat terbakar sinar matahari terjadi akibat sinar UV memicu pembentukan dimer timin pada DNA sel kulit!"
    ],
    "funFactsEn": [
      "Sunburn DNA damage happens when solar UV light fuses adjacent thymine bases into dimers!"
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
        "x": 2.4,
        "y": 0.9,
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
      }
    ]
  },
  {
    "id": "rna-uracil",
    "cid": 1174,
    "formula": "C4H4N2O2",
    "nameId": "Urasil (Basa Khusus RNA)",
    "nameEn": "Uracil (RNA Base)",
    "iupac": "pyrimidine-2,4(1H,3H)-dione",
    "mass": 112.09,
    "category": "life",
    "level": "sma",
    "stateAtSTP": "solid",
    "geometry": "Cincin Pirimidin Demetilasi",
    "polarity": "Polar",
    "summaryId": "Basa genetik RNA pembawa instruksi sintesis protein dari DNA ke ribosom.",
    "summaryEn": "RNA genetic base translating genomic blueprints into cellular proteins.",
    "detailsSD": "Basa khusus yang ada di RNA (kurir pembawa pesan dari DNA di sel kita).",
    "detailsSMP": "Pengganti Timin pada RNA. Berpasangan dengan Adenin pada transkripsi genetik.",
    "detailsSMA": "Struktur identik dengan timin tetapi tanpa gugus metil pada karbon C5 (hemat energi biosintesis untuk molekul RNA berumur pendek).",
    "detailsKuliah": "Sintesis de novo uridin monofosfat (UMP) dari karbamoil fosfat dan aspartat. Diubah menjadi deoksitimidilat (dTMP) oleh enzim timidilat sintase.",
    "safety": {
      "health": 1,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Nukleobasa RNA alami.",
      "noteEn": "Natural RNA nucleobase."
    },
    "funFactsId": [
      "Vaksin modern mRNA (seperti vaksin COVID-19) menggunakan molekul modifikasi urasil agar tidak diserang sistem imun sel sebelum membuat antigen!"
    ],
    "funFactsEn": [
      "Modern mRNA vaccines use modified uracil molecules to safely bypass cellular immune defenses!"
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": 0,
        "y": 1.2,
        "z": 0
      },
      {
        "element": "O",
        "x": 0,
        "y": 2.4,
        "z": 0
      },
      {
        "element": "N",
        "x": 1.2,
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
        "from": 0,
        "to": 2,
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
    "geometry": "Cincin Lakton Furanosa dengan Enadiol",
    "polarity": "Sangat Polar (Larut Air)",
    "summaryId": "Antioksidan alami penangkal radikal bebas dan kofaktor pembentukan kolagen.",
    "summaryEn": "Natural dietary antioxidant and enzymatic cofactor for collagen synthesis.",
    "detailsSD": "Vitamin yang membuat buah jeruk terasa segar dan membantu daya tahan tubuh kita tetap prima!",
    "detailsSMP": "Vitamin larut air penting. Manusia tidak bisa memproduksinya sendiri sehingga wajib diperoleh dari makanan.",
    "detailsSMA": "Gugus enadiol sangat mudah melepaskan 2 proton dan 2 elektron teroksidasi menjadi asam dehidroaskorbat.",
    "detailsKuliah": "Kofaktor enzim prolil hidroksilase menjaga ion Fe²⁺ aktif untuk hidroksilasi prolin pada kolagen. Defisiensi memicu skorbut.",
    "safety": {
      "health": 0,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Suplemen nutrisi esensial.",
      "noteEn": "Essential nutrient."
    },
    "funFactsId": [
      "Jambu biji merah mengandung vitamin C empat kali lipat lebih banyak dibanding buah jeruk manis!"
    ],
    "funFactsEn": [
      "Guava fruits pack over four times more vitamin C than typical oranges!"
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
        "element": "O",
        "x": -0.7,
        "y": -0.8,
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
    "summaryId": "Senyawa stimulan alami dalam biji kopi dan daun teh yang menjaga kesegaran dan fokus otak.",
    "summaryEn": "Natural stimulant alkaloid found in coffee beans and tea leaves boosting alertness.",
    "detailsSD": "Zat alami di dalam kopi dan teh yang membuat orang dewasa tidak mengantuk.",
    "detailsSMP": "Alkaloid purin C₈H₁₀N₄O₂ yang bekerja merangsang sistem saraf pusat.",
    "detailsSMA": "Bekerja sebagai antagonis kompetitif reseptor adenosin di otak karena kemiripan bentuk strukturnya.",
    "detailsKuliah": "Menghambat fosfodiesterase (PDE) non-spesifik sehingga meningkatkan cAMP intraseluler. Meningkatkan pelepasan dopamin dan epinefrin.",
    "safety": {
      "health": 2,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "exclamation"
      ],
      "noteId": "Aman dalam konsumsi harian moderat.",
      "noteEn": "Moderate dietary consumption safe."
    },
    "funFactsId": [
      "Tumbuhan kopi menghasilkan kafein bukan untuk manusia, melainkan sebagai racun alami pengusir serangga hama!"
    ],
    "funFactsEn": [
      "Coffee plants produce caffeine as a natural insecticide to ward off pests!"
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
      }
    ],
    "bonds3D": [
      {
        "from": 0,
        "to": 2,
        "order": 1
      },
      {
        "from": 1,
        "to": 2,
        "order": 1
      }
    ]
  },
  {
    "id": "serotonin",
    "cid": 5202,
    "formula": "C10H12N2O",
    "nameId": "Serotonin (Hormon Ketenangan)",
    "nameEn": "Serotonin",
    "iupac": "3-(2-aminoethyl)-1H-indol-5-ol",
    "mass": 176.21,
    "category": "medicine",
    "level": "sma",
    "stateAtSTP": "solid",
    "geometry": "Cincin Indol Tersubstitusi Hidroksil & Rantai Etilamina",
    "polarity": "Polar (Fenol & Amina)",
    "summaryId": "Neurotransmiter pengatur suasana hati, kebahagiaan emosi, dan ritme tidur lelap.",
    "summaryEn": "Mood and emotional regulator neurotransmitter modulating sleep and digestion.",
    "detailsSD": "Zat kimia di tubuh yang membuat kita merasa tenang, damai, dan bahagia!",
    "detailsSMP": "Neurotransmiter yang diproduksi dari asam amino triptofan di usus dan otak kita.",
    "detailsSMA": "Struktur cincin indol (cincin benzena dan pirol terfusi) dengan gugus 5-hidroksil dan 3-etilamina (5-hidroksitriptamin / 5-HT).",
    "detailsKuliah": "Sekitar 90% serotonin tubuh berada di sel enterokromafin saluran cerna. Target utama obat antidepresan SSRI (Selective Serotonin Reuptake Inhibitors).",
    "safety": {
      "health": 2,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "exclamation"
      ],
      "noteId": "Neurotransmiter endogen.",
      "noteEn": "Endogenous neuromodulator."
    },
    "funFactsId": [
      "Lebih dari 90% hormon serotonin di tubuh manusia justru diproduksi di dalam usus, bukan di otak!"
    ],
    "funFactsEn": [
      "Over 90% of your body serotonin is manufactured in your gut microbiome, not the brain!"
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
        "x": 1.2,
        "y": 0,
        "z": 0
      },
      {
        "element": "N",
        "x": 2.2,
        "y": 0.5,
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
      }
    ]
  },
  {
    "id": "adrenaline",
    "cid": 5833,
    "formula": "C9H13NO3",
    "nameId": "Adrenalin (Epinefrin)",
    "nameEn": "Adrenaline (Epinephrine)",
    "iupac": "4-[(1R)-1-hydroxy-2-(methylamino)ethyl]benzene-1,2-diol",
    "mass": 183.2,
    "category": "medicine",
    "level": "sma",
    "stateAtSTP": "solid",
    "geometry": "Katekolamina Kiral Sekunder",
    "polarity": "Polar (3 Gugus -OH)",
    "summaryId": "Hormon pemicu respon darurat 'Lawan atau Lari' (Fight or Flight) yang memacu detak jantung.",
    "summaryEn": "Emergency 'Fight or Flight' adrenaline hormone surging heart rate and alertness.",
    "detailsSD": "Zat di tubuh kita yang melonjak saat kita kaget, takut di wahana roller coaster, atau harus lari cepat!",
    "detailsSMP": "Hormon darurat yang disekresikan kelenjar adrenal di atas ginjal saat menghadapi bahaya.",
    "detailsSMA": "Katekolamina dengan satu pusat kiral stereogenik R. Mempercepat detak jantung, melebarkan bronkus paru-paru, dan menaikkan glukosa darah.",
    "detailsKuliah": "Agonis non-selektif reseptor adrenergik α1, α2, β1, β2, dan β3. Mengaktifkan protein Gs yang menstimulasi adenilat siklase memproduksi cAMP.",
    "safety": {
      "health": 2,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "toxic"
      ],
      "noteId": "Hormon simpatis kuat; injeksi darurat anafilaksis (EpiPen).",
      "noteEn": "Emergency adrenergic agent."
    },
    "funFactsId": [
      "Lonjakan adrenalin mampu membuat seseorang secara spontan memiliki kekuatan luar biasa untuk lari lebih cepat saat bahaya mengancam!"
    ],
    "funFactsEn": [
      "An adrenaline rush can temporarily give people superhuman speed and stamina during life threats!"
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": -1,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": 0,
        "z": 0
      },
      {
        "element": "N",
        "x": 1.2,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 2.2,
        "y": 0,
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
    "id": "hydrogen-peroxide",
    "cid": 784,
    "formula": "H2O2",
    "nameId": "Hidrogen Peroksida",
    "nameEn": "Hydrogen Peroxide",
    "iupac": "dioxidane",
    "mass": 34.015,
    "category": "household",
    "level": "smp",
    "stateAtSTP": "liquid",
    "geometry": "Bentuk Buku Terbuka Non-Planar (Skewed)",
    "polarity": "Polar Kuat",
    "summaryId": "Cairan pembersih luka berbusa yang melepaskan radikal oksigen aktif pembunuh kuman.",
    "summaryEn": "Foaming wound antiseptic liquid releasing active germicidal oxygen bubbles.",
    "detailsSD": "Obat cair yang berbusa mendesis putih saat diteteskan ke luka kecil untuk membersihkan kuman!",
    "detailsSMP": "Rumus H₂O₂. Memiliki ikatan peroksida (O-O) yang tidak stabil dan mudah terurai menjadi air dan gas oksigen.",
    "detailsSMA": "Enzim katalase dalam darah memecah H₂O₂ dengan sangat cepat: 2 H₂O₂ → 2 H₂O + O₂ (menghasilkan busa putih oksigen).",
    "detailsKuliah": "Struktur non-planar dengan sudut dihedral H-O-O-H ~111.5° dalam fase gas akibat tolakan pasangan elektron bebas pada kedua atom oksigen.",
    "safety": {
      "health": 2,
      "flammability": 0,
      "instability": 1,
      "ghs": [
        "oxidizer",
        "corrosive"
      ],
      "noteId": "Aman pada larutan 3%; pemutih keras pada konsentrasi >30%.",
      "noteEn": "Oxidizer and bleacher."
    },
    "funFactsId": [
      "Busa mendesis saat H₂O₂ menyentuh luka disebabkan oleh enzim katalase sel darah merah yang menghancurkannya 200.000 kali per detik!"
    ],
    "funFactsEn": [
      "The fizzy foam on wounds is caused by blood catalase enzyme destroying H2O2 200,000 times per second!"
    ],
    "atoms3D": [
      {
        "element": "O",
        "x": -0.7,
        "y": 0,
        "z": 0
      },
      {
        "element": "O",
        "x": 0.7,
        "y": 0,
        "z": 0
      },
      {
        "element": "H",
        "x": -1.2,
        "y": 0.8,
        "z": 0
      },
      {
        "element": "H",
        "x": 1.2,
        "y": -0.8,
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
      },
      {
        "from": 1,
        "to": 3,
        "order": 1
      }
    ]
  },
  {
    "id": "citric-acid",
    "cid": 311,
    "formula": "C6H8O7",
    "nameId": "Asam Sitrat (Asam Jeruk)",
    "nameEn": "Citric Acid",
    "iupac": "2-hydroxypropane-1,2,3-tricarboxylic acid",
    "mass": 192.12,
    "category": "food",
    "level": "smp",
    "stateAtSTP": "solid",
    "geometry": "Asam Trikarboksilat dengan Satu Gugus Hidroksil",
    "polarity": "Sangat Polar (Larut Air)",
    "summaryId": "Pemberi rasa asam segar alami pada jeruk lemon dan senyawa sentral siklus Krebs metabolisme.",
    "summaryEn": "Natural tangy citrus acid and central intermediate of the mitochondrial Krebs cycle.",
    "detailsSD": "Serbuk asam segar yang membuat permen kenyal dan minuman lemon terasa kecut nikmat!",
    "detailsSMP": "Asam organik alami yang melimpah pada buah lemon dan jeruk nipis. Mengandung 3 gugus asam karboksilat (-COOH).",
    "detailsSMA": "Asam triprotik lemah (pKa1 = 3.13, pKa2 = 4.76, pKa3 = 6.40). Agen pengkhelat ion kalsium dan magnesium pembersih kerak air.",
    "detailsKuliah": "Intermediat pertama siklus asam sitrat (siklus Krebs) di mitokondria, dibentuk melalui kondensasi oksaloasetat dan asetil-KoA oleh enzim sitrat sintase.",
    "safety": {
      "health": 1,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "irritant"
      ],
      "noteId": "Aman untuk makanan; iritasi bila terkena mata.",
      "noteEn": "Food acidulant."
    },
    "funFactsId": [
      "Buah lemon mengandung sekitar 8% asam sitrat dari seluruh berat kering buahnya!"
    ],
    "funFactsEn": [
      "A fresh lemon contains about 8% citric acid by total dry weight!"
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
        "x": 0,
        "y": 1.5,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": -1.5,
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
    "id": "vanillin",
    "cid": 1183,
    "formula": "C8H8O3",
    "nameId": "Vanilin (Aroma Vanila Harum)",
    "nameEn": "Vanillin (Vanilla Flavor)",
    "iupac": "4-hydroxy-3-methoxybenzaldehyde",
    "mass": 152.15,
    "category": "food",
    "level": "sma",
    "stateAtSTP": "solid",
    "geometry": "Cincin Aromatik dengan Gugus Fenol, Eter & Aldehid",
    "polarity": "Sedang (Aromatik)",
    "summaryId": "Molekul beraroma manis lembut khas es krim vanila dan kue bolu harum.",
    "summaryEn": "Primary sweet aromatic compound responsible for characteristic vanilla flavor.",
    "detailsSD": "Zat harum yang membuat es krim vanila, susu, dan kue bolu berbau sangat lezat!",
    "detailsSMP": "Senyawa organik pembawa aroma khas biji vanila alami atau hasil sintesis industri makanan.",
    "detailsSMA": "Memiliki 3 gugus fungsi berbeda pada cincin benzena: fenol (-OH), eter metoksi (-OCH₃), dan aldehid (-CHO).",
    "detailsKuliah": "Dapat disintesis secara industri dari lignin kayu sisa pabrik kertas atau dari guaiakol melalui formilasi Reimer-Tiemann.",
    "safety": {
      "health": 1,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "irritant"
      ],
      "noteId": "Perisa makanan aman.",
      "noteEn": "GRAS food flavorant."
    },
    "funFactsId": [
      "Biji anggrek vanila alami adalah salah satu rempah termahal di dunia setelah safron karena harus diserbuki dengan tangan satu per satu!"
    ],
    "funFactsEn": [
      "Natural vanilla beans are the second most expensive spice on Earth because each orchid flower must be hand-pollinated!"
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
        "x": 1.2,
        "y": 0,
        "z": 0
      },
      {
        "element": "O",
        "x": 2.2,
        "y": 0.5,
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
      }
    ]
  },
  {
    "id": "msg-glutamate",
    "cid": 23689120,
    "formula": "C5H8NO4Na",
    "nameId": "Monosodium Glutamat (MSG / Micin)",
    "nameEn": "Monosodium Glutamate (MSG)",
    "iupac": "sodium;(2S)-2-amino-5-hydroxy-5-oxopentanoate",
    "mass": 169.11,
    "category": "food",
    "level": "smp",
    "stateAtSTP": "solid",
    "geometry": "Garam Natrium dari Asam Amino Glutamat",
    "polarity": "Ionik Polar",
    "summaryId": "Kristal penyedap rasa gurih lezat (rasa kelima / umami) yang ditemukan Kikunae Ikeda.",
    "summaryEn": "Culinary savory seasoning crystal activating tongue umami fifth taste receptors.",
    "detailsSD": "Bumbu gurih micin yang membuat kuah bakso dan mie instan terasa lezat gurih!",
    "detailsSMP": "Garam natrium dari asam amino glutamat alami yang melimpah pada keju, tomat, dan jamur.",
    "detailsSMA": "Mengaktifkan reseptor rasa umami heterodimer T1R1+T1R3 pada kuncup pengecap lidah.",
    "detailsKuliah": "Diproduksi secara industri melalui fermentasi aerobik bakteri Corynebacterium glutamicum menggunakan tetes tebu (molase) sebagai sumber karbon.",
    "safety": {
      "health": 1,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Aman untuk makanan; mitos sindrom restoran cina terbantahkan secara sains.",
      "noteEn": "FDA Generally Recognized as Safe."
    },
    "funFactsId": [
      "Tomat matang dan keju parmesan terasa sangat gurih karena keduanya secara alami kaya akan molekul asam glutamat bebas!"
    ],
    "funFactsEn": [
      "Ripe tomatoes and aged parmesan cheese naturally brim with free savory glutamate molecules!"
    ],
    "atoms3D": [
      {
        "element": "Na",
        "x": -2,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": 0,
        "z": 0
      },
      {
        "element": "N",
        "x": 1.2,
        "y": 0,
        "z": 0
      }
    ],
    "bonds3D": [
      {
        "from": 1,
        "to": 2,
        "order": 1
      }
    ]
  },
  {
    "id": "curcumin",
    "cid": 969516,
    "formula": "C21H20O6",
    "nameId": "Kurkumin (Warna Kuning Kunyit)",
    "nameEn": "Curcumin (Turmeric Yellow)",
    "iupac": "(1E,6E)-1,7-bis(4-hydroxy-3-methoxyphenyl)hepta-1,6-diene-3,5-dione",
    "mass": 368.38,
    "category": "food",
    "level": "sma",
    "stateAtSTP": "solid",
    "geometry": "Diferuloilmetana Terkonjugasi Panjang",
    "polarity": "Lipofilik (Tidak Larut Air)",
    "summaryId": "Pigmen kuning keemasan rimpang kunyit dengan aktivitas antioksidan dan anti-inflamasi kuat.",
    "summaryEn": "Golden yellow turmeric pigment possessing potent anti-inflammatory antioxidant properties.",
    "detailsSD": "Pewarna kuning alami dari kunyit yang membuat nasi kuning dan kuah soto berwarna cerah!",
    "detailsSMP": "Zat alami rimpang kunyit dan temulawak. Bertindak sebagai indikator asam-basa alami (berwarna kuning di asam, berubah merah kecokelatan di basa).",
    "detailsSMA": "Memiliki sistem tautomeri keto-enol terkonjugasi panjang 7 atom karbon yang menghubungkan dua cincin fenolik.",
    "detailsKuliah": "Menghambat faktor transkripsi pro-inflamasi NF-κB, COX-2, dan 5-LOX. Memiliki bioavailabilitas oral rendah yang dapat ditingkatkan 2000% dengan piperin lada hitam.",
    "safety": {
      "health": 1,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Rempah alami berkhasiat.",
      "noteEn": "Natural dietary polyphenolic."
    },
    "funFactsId": [
      "Kunyit bisa digunakan sebagai kertas lakmus alami: usapkan kunyit ke kertas, teteskan sabun basa maka warnanya seketika berubah merah!"
    ],
    "funFactsEn": [
      "Turmeric makes a DIY litmus test: rubbing it with soap instantly turns its bright yellow color into deep red!"
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": -2.5,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 2.5,
        "y": 0,
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
      }
    ]
  },
  {
    "id": "buckyball-c60",
    "cid": 123591,
    "formula": "C60",
    "nameId": "Buckminsterfullerene (Bola Karbon C60)",
    "nameEn": "Buckminsterfullerene (Buckyball C60)",
    "iupac": "hentriacontacyclo[...]hexaconta-1,3,5,...-triacontraene",
    "mass": 720.64,
    "category": "material",
    "level": "kuliah",
    "stateAtSTP": "solid",
    "geometry": "Ikosahedron Terpancung (Bentuk Bola Sepak Bola)",
    "polarity": "Nonpolar Simetris Tertinggi",
    "summaryId": "Molekul berbentuk bola sepak bola sempurna yang tersusun dari 60 atom karbon.",
    "summaryEn": "Soccer-ball cage molecule consisting of 60 carbon atoms with truncated icosahedron symmetry.",
    "detailsSD": "Molekul bola sepak ajaib yang dibuat dari 60 atom karbon yang saling menyambung bulat!",
    "detailsSMP": "Alotrop karbon berbentuk sangkar bola berongga yang ditemukan Harold Kroto dan Richard Smalley (Hadiah Nobel Kimia).",
    "detailsSMA": "Tersusun dari 12 cincin pentagon dan 20 cincin heksagon dengan simetri ikosahedral sempurna (Ih). Setiap atom C terhibridisasi sp² terlipat.",
    "detailsKuliah": "Menerima hingga 6 elektron membentuk heksaanion C₆₀⁶⁻. Menghasilkan material superkonduktor temperatur tinggi bila disisipkan atom logam alkali (contoh: K₃C₆₀ superkonduktor pada 18 K).",
    "safety": {
      "health": 1,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Nanomaterial padat stabil.",
      "noteEn": "Fullerene cage nanomaterial."
    },
    "funFactsId": [
      "Bentuk molekul C60 sama persis seperti susunan kulit bola sepak bola Piala Dunia (12 segi lima dan 20 segi enam)!"
    ],
    "funFactsEn": [
      "The geometric architecture of C60 is identical to a standard soccer ball (12 pentagons and 20 hexagons)!"
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": 0,
        "y": 3.5,
        "z": 0
      },
      {
        "element": "C",
        "x": 3.5,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": -3.5,
        "z": 0
      },
      {
        "element": "C",
        "x": -3.5,
        "y": 0,
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
        "to": 0,
        "order": 1
      }
    ]
  },
  {
    "id": "polyethylene",
    "cid": 6325,
    "formula": "(C2H4)n",
    "nameId": "Polietilena (Plastik PE)",
    "nameEn": "Polyethylene",
    "iupac": "poly(ethene)",
    "mass": 28.05,
    "category": "material",
    "level": "smp",
    "stateAtSTP": "solid",
    "geometry": "Rantai Panjang Hidrokarbon Polimer Adisi",
    "polarity": "Nonpolar Tahan Air",
    "summaryId": "Plastik paling banyak diproduksi di dunia: bahan kantong kresek, botol sampo, dan pipa air.",
    "summaryEn": "Most widely manufactured polymer globally: plastic bags, bottles, and geomembranes.",
    "detailsSD": "Plastik kantong belanjaan dan ember air yang lentur, ringan, dan tahan air.",
    "detailsSMP": "Polimer sintetik hasil reaksi adisi penggabungan ribuan molekul monomer etilena (C₂H₄).",
    "detailsSMA": "Terbagi menjadi LDPE (Low-Density Polyethylene bercabang banyak yang lentur) dan HDPE (High-Density Polyethylene rantai lurus yang kaku dan kuat).",
    "detailsKuliah": "Disintesis menggunakan katalis koordinasi Ziegler-Natta (TiCl₄ / Al(C₂H₅)₃) atau katalis metalosena untuk menghasilkan polietilena dengan berat molekul ultra-tinggi (UHMWPE) tahan peluru.",
    "safety": {
      "health": 0,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Inert; daur ulang plastik untuk menjaga lingkungan laut.",
      "noteEn": "Thermoplastic polymer."
    },
    "funFactsId": [
      "Produksi polietilena di seluruh dunia mencapai lebih dari 100 juta ton setiap tahunnya!"
    ],
    "funFactsEn": [
      "Over 100 million metric tons of polyethylene are manufactured globally every year!"
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": -1.5,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 0,
        "y": 0.5,
        "z": 0
      },
      {
        "element": "C",
        "x": 1.5,
        "y": 0,
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
      }
    ]
  },
  {
    "id": "nylon-66",
    "cid": 23689369,
    "formula": "(C12H22N2O2)n",
    "nameId": "Nilon 6,6 (Serat Sintetik Kuat)",
    "nameEn": "Nylon 6,6",
    "iupac": "poly(hexamethylene adipamide)",
    "mass": 226.32,
    "category": "material",
    "level": "sma",
    "stateAtSTP": "solid",
    "geometry": "Poliamida Kristalin dengan Ikatan Hidrogen Antarrantai",
    "polarity": "Polar (Ikatan Amida -CO-NH-)",
    "summaryId": "Serat sintetis poliamida tangguh pembuat tali parasut, senar pancing, dan sikat gigi.",
    "summaryEn": "High-strength polyamide synthetic fiber used in parachutes, fishing lines, and toothbrushes.",
    "detailsSD": "Benang sintetis yang sangat kuat dan liat pada senar pancing dan bulu sikat gigi.",
    "detailsSMP": "Polimer buatan yang menggantikan sutra alami, dibuat dari reaksi kondensasi dua jenis molekul.",
    "detailsSMA": "Polimer kondensasi antara heksametilendiamina (6 atom C) dan asam adipat (6 atom C) dengan pelepasan molekul air (ikatan amida).",
    "detailsKuliah": "Kekuatan tarik tinggi berkat kerapatan ikatan hidrogen intermolekuler yang sangat teratur antara gugus karbonil (C=O) dan amida (N-H) pada rantai tetangga.",
    "safety": {
      "health": 0,
      "flammability": 1,
      "instability": 0,
      "ghs": [
        "safe"
      ],
      "noteId": "Serat polimer padat stabil.",
      "noteEn": "Industrial textile fiber."
    },
    "funFactsId": [
      "Nilon pertama kali dipamerkan pada New York World's Fair 1939 sebagai 'serat sekuat baja dan sehalus jaring laba-laba'!"
    ],
    "funFactsEn": [
      "Nylon was showcased at the 1939 World Fair as a fiber 'strong as steel and fine as a spiderweb'!"
    ],
    "atoms3D": [
      {
        "element": "C",
        "x": -2,
        "y": 0,
        "z": 0
      },
      {
        "element": "N",
        "x": -0.8,
        "y": 0,
        "z": 0
      },
      {
        "element": "C",
        "x": 0.6,
        "y": 0.5,
        "z": 0
      },
      {
        "element": "O",
        "x": 0.6,
        "y": 1.8,
        "z": 0
      },
      {
        "element": "C",
        "x": 2,
        "y": 0,
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
        "order": 2
      },
      {
        "from": 2,
        "to": 4,
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
