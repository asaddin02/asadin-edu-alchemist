export default {
  id: 'karbon',
  icon: 'hexagon',
  levels: ['smp', 'sma', 'kuliah'],
  title: ['Kimia karbon: hidrokarbon dan gugus fungsi', 'Carbon chemistry: hydrocarbons and functional groups'],
  summary: [
    'Keistimewaan atom karbon, alkana–alkena–alkuna, minyak bumi, tata nama IUPAC, gugus fungsi, dan isomer.',
    'What makes carbon special, alkanes–alkenes–alkynes, petroleum, IUPAC naming, functional groups and isomers.',
  ],
  body: {
    smp: [
      `Karbon punya 4 elektron valensi sehingga dapat membentuk 4 ikatan kovalen, termasuk dengan sesama karbon. Karbon dapat membentuk rantai panjang, cabang, dan cincin. Karena itu dikenal puluhan juta [[senyawa-organik]].

[[hidrokarbon|Hidrokarbon]] hanya berisi C dan H. Contohnya {{m:methane|metana}} (gas alam), {{m:propane|propana}} dan {{m:butane|butana}} (LPG), serta campuran di bensin dan solar. Semua berasal dari minyak bumi dan gas alam yang terbentuk dari sisa makhluk hidup purba selama jutaan tahun.

Minyak bumi dipisahkan dengan **distilasi bertingkat** berdasarkan titik didih: gas, bensin, minyak tanah, solar, oli, hingga aspal. Pembakaran hidrokarbon menghasilkan energi, CO₂, dan uap air.`,
      `Carbon has 4 valence electrons, so it forms 4 covalent bonds, including with other carbons. It builds long chains, branches and rings — which is why there are tens of millions of [[senyawa-organik|organic compounds]].

[[hidrokarbon|Hydrocarbons]] contain only C and H: {{m:methane|methane}} (natural gas), {{m:propane|propane}} and {{m:butane|butane}} (LPG), and the mixtures in petrol and diesel. They come from petroleum and natural gas formed from ancient living things over millions of years.

Crude oil is separated by **fractional distillation** by boiling point: gases, petrol, kerosene, diesel, lubricating oil and bitumen. Burning hydrocarbons releases energy, CO₂ and water vapour.`,
    ],
    sma: [
      `Hidrokarbon dibagi berdasarkan jenis ikatan:

- [[jenuh|Alkana]] (CₙH₂ₙ₊₂), ikatan tunggal: metana, etana, propana… Titik didih naik seiring panjang rantai.
- Alkena (CₙH₂ₙ), ikatan C=C: {{m:ethylene|etena}} adalah bahan plastik. Uji: menghilangkan warna air brom (adisi).
- Alkuna (CₙH₂ₙ₋₂), ikatan C≡C: {{m:acetylene|etuna/asetilena}}.
- Aromatik: cincin {{m:benzene|benzena}} dengan elektron terdelokalisasi.

**Tata nama IUPAC**: tentukan rantai terpanjang, beri nomor dari ujung terdekat cabang atau gugus fungsi, sebutkan cabang (metil, etil) sesuai abjad. Contoh: {{m:isooctane|2,2,4-trimetilpentana}}.

[[gugus-fungsi|Gugus fungsi]] menentukan sifat: alkohol –OH ({{m:ethanol|etanol}}), eter –O– ({{m:diethyl-ether|dietil eter}}), aldehida –CHO ({{m:formaldehyde|formaldehida}}), keton –CO– ({{m:acetone|aseton}}), asam karboksilat –COOH ({{m:acetic-acid|asam asetat}}), ester –COO– ({{m:ethyl-acetate|etil asetat}}), amina –NH₂, dan amida –CONH₂ ({{m:urea|urea}}).

[[isomer|Isomer]]: rumus molekul sama, struktur berbeda. C₂H₆O dapat berupa etanol (cair) atau {{m:dimethyl-ether|dimetil eter}} (gas). Jelajahi isomer apa pun dengan {{lab:rakit|lab Perakit molekul}} yang mencari langsung di PubChem.`,
      `Hydrocarbons are grouped by bond type:

- [[jenuh|Alkanes]] (CₙH₂ₙ₊₂), single bonds: methane, ethane, propane… Boiling points rise with chain length.
- Alkenes (CₙH₂ₙ), C=C: {{m:ethylene|ethene}} is the raw material of plastics. Test: they decolourise bromine water (addition).
- Alkynes (CₙH₂ₙ₋₂), C≡C: {{m:acetylene|ethyne/acetylene}}.
- Aromatics: {{m:benzene|benzene}} rings with delocalised electrons.

**IUPAC naming**: find the longest chain, number from the end nearest a branch or functional group, list branches (methyl, ethyl) alphabetically. Example: {{m:isooctane|2,2,4-trimethylpentane}}.

[[gugus-fungsi|Functional groups]] decide behaviour: alcohols –OH ({{m:ethanol|ethanol}}), ethers –O– ({{m:diethyl-ether|diethyl ether}}), aldehydes –CHO ({{m:formaldehyde|formaldehyde}}), ketones –CO– ({{m:acetone|acetone}}), carboxylic acids –COOH ({{m:acetic-acid|acetic acid}}), esters –COO– ({{m:ethyl-acetate|ethyl acetate}}), amines –NH₂ and amides –CONH₂ ({{m:urea|urea}}).

[[isomer|Isomers]] share a formula but differ in structure. C₂H₆O is either ethanol (liquid) or {{m:dimethyl-ether|dimethyl ether}} (gas). Explore isomers of any formula with the {{lab:rakit|Molecule builder lab}}, which searches PubChem live.`,
    ],
    kuliah: [
      `Reaktivitas organik dijelaskan oleh efek elektronik (induktif, resonansi, hiperkonjugasi) dan sterik. Mekanisme utama:

- Substitusi nukleofilik SN1 (karbokation, rasemisasi) dan SN2 (serangan belakang, inversi Walden).
- Eliminasi E1/E2 (aturan Zaitsev) yang bersaing dengan substitusi.
- Adisi elektrofilik pada alkena (aturan Markovnikov) dan adisi nukleofilik pada karbonil.
- Substitusi elektrofilik aromatik (nitrasi, halogenasi, Friedel–Crafts) dengan efek pengarah orto/para dan meta.

Stereokimia: pusat kiral diberi konfigurasi R/S (aturan Cahn–Ingold–Prelog); ikatan rangkap diberi E/Z. Enantiomer memiliki sifat fisika sama tetapi dapat berbeda efek biologis; talidomida adalah contoh tragis.

Identifikasi struktur modern memakai spektroskopi: IR (gugus fungsi, C=O ≈ 1700 cm⁻¹, O–H lebar ≈ 3300 cm⁻¹), NMR ¹H dan ¹³C (lingkungan atom), dan spektrometri massa (massa molekul). Banyak spektrum referensi dapat ditelusuri dari tautan PubChem di halaman molekul.`,
      `Organic reactivity follows electronic effects (induction, resonance, hyperconjugation) and sterics. Key mechanisms:

- Nucleophilic substitution SN1 (carbocation, racemisation) and SN2 (backside attack, Walden inversion).
- Elimination E1/E2 (Zaitsev’s rule) competing with substitution.
- Electrophilic addition to alkenes (Markovnikov’s rule) and nucleophilic addition to carbonyls.
- Electrophilic aromatic substitution (nitration, halogenation, Friedel–Crafts) with ortho/para and meta directing effects.

Stereochemistry: chiral centres get R/S configurations (Cahn–Ingold–Prelog rules); double bonds get E/Z. Enantiomers share physical properties but can act differently in the body — thalidomide is a tragic example.

Structures are identified by spectroscopy: IR (functional groups, C=O ≈ 1700 cm⁻¹, broad O–H ≈ 3300 cm⁻¹), ¹H and ¹³C NMR (atomic environments) and mass spectrometry (molecular mass). Reference spectra are linked from PubChem on each molecule page.`,
    ],
  },
  points: [
    ['Karbon membentuk 4 ikatan dan dapat membuat rantai, cabang, dan cincin.', 'Carbon forms 4 bonds and builds chains, branches and rings.'],
    ['Alkana CₙH₂ₙ₊₂, alkena CₙH₂ₙ, alkuna CₙH₂ₙ₋₂.', 'Alkanes CₙH₂ₙ₊₂, alkenes CₙH₂ₙ, alkynes CₙH₂ₙ₋₂.'],
    ['Gugus fungsi menentukan sifat dan nama senyawa organik.', 'Functional groups decide properties and names.'],
    ['Isomer: rumus molekul sama, struktur berbeda.', 'Isomers: same formula, different structure.'],
  ],
  molecules: ['methane', 'ethylene', 'acetylene', 'benzene', 'ethanol', 'acetone', 'acetic-acid', 'ethyl-acetate', 'isooctane'],
  labs: ['rakit', 'vsepr'],
  activity: {
    smp: ['Kunjungi halaman LPG, bensin (isooktana), dan solar (heksadekana) di Moleculium, bandingkan titik didih dari data PubChem, lalu kaitkan dengan panjang rantai.', 'Visit the LPG, petrol (isooctane) and diesel (hexadecane) pages, compare PubChem boiling points and relate them to chain length.'],
    sma: ['Gunakan lab Perakit molekul untuk C₄H₁₀, C₅H₁₂, dan C₂H₆O. Gambar semua isomer yang ditemukan dan beri nama IUPAC.', 'Use the Molecule builder for C₄H₁₀, C₅H₁₂ and C₂H₆O. Draw every isomer found and give IUPAC names.'],
    kuliah: ['Buat ester aroma buah (etil asetat, isoamil asetat) di laboratorium dengan katalis asam; bahas mekanisme esterifikasi Fischer.', 'Make fruity esters (ethyl acetate, isoamyl acetate) with acid catalysis and discuss the Fischer esterification mechanism.'],
  },
  quiz: [
    { lv: 'smp', q: ['Komponen utama gas LPG adalah…', 'LPG mainly contains…'], options: [['Metana dan etana', 'Methane and ethane'], ['Propana dan butana', 'Propane and butane'], ['Oktana', 'Octane'], ['Hidrogen', 'Hydrogen']], answer: 1, explain: ['LPG (liquefied petroleum gas) adalah campuran propana dan butana cair.', 'LPG is liquefied propane and butane.'] },
    { lv: 'smp', q: ['Minyak bumi dipisahkan dengan…', 'Crude oil is separated by…'], options: [['Penyaringan', 'Filtration'], ['Distilasi bertingkat', 'Fractional distillation'], ['Kromatografi kertas', 'Paper chromatography'], ['Magnet', 'Magnets']], answer: 1, explain: ['Fraksi dipisahkan berdasarkan perbedaan titik didih.', 'Fractions separate by boiling point.'] },
    { lv: 'sma', q: ['Rumus umum alkena adalah…', 'The general formula of alkenes is…'], options: [['CₙH₂ₙ₊₂', 'CₙH₂ₙ₊₂'], ['CₙH₂ₙ', 'CₙH₂ₙ'], ['CₙH₂ₙ₋₂', 'CₙH₂ₙ₋₂'], ['CₙHₙ', 'CₙHₙ']], answer: 1, explain: ['Satu ikatan rangkap dua mengurangi dua atom H dari alkana.', 'One double bond removes two H from the alkane.'] },
    { lv: 'sma', q: ['Gugus fungsi –COOH dimiliki oleh…', 'The –COOH group belongs to…'], options: [['Alkohol', 'Alcohols'], ['Aldehida', 'Aldehydes'], ['Asam karboksilat', 'Carboxylic acids'], ['Ester', 'Esters']], answer: 2, explain: ['Gugus karboksil –COOH khas asam karboksilat, seperti asam asetat.', 'The carboxyl group –COOH defines carboxylic acids, such as acetic acid.'] },
    { lv: 'sma', q: ['Etanol dan dimetil eter adalah…', 'Ethanol and dimethyl ether are…'], options: [['Zat yang sama', 'The same substance'], ['Isomer', 'Isomers'], ['Alotrop', 'Allotropes'], ['Isotop', 'Isotopes']], answer: 1, explain: ['Keduanya C₂H₆O tetapi strukturnya berbeda.', 'Both are C₂H₆O with different structures.'] },
    { lv: 'sma', q: ['Nama IUPAC aseton adalah…', 'The IUPAC name of acetone is…'], options: [['Propanal', 'Propanal'], ['Propanon', 'Propanone'], ['Propanol', 'Propanol'], ['Etanal', 'Ethanal']], answer: 1, explain: ['Keton tiga karbon: propan-2-on atau propanon.', 'A three-carbon ketone: propan-2-one, or propanone.'] },
    { lv: 'sma', q: ['Alkena dapat dibedakan dari alkana dengan…', 'Alkenes can be told from alkanes with…'], options: [['Air brom', 'Bromine water'], ['Kertas lakmus', 'Litmus paper'], ['Air kapur', 'Limewater'], ['Uji nyala', 'A flame test']], answer: 0, explain: ['Alkena menghilangkan warna jingga air brom melalui reaksi adisi.', 'Alkenes decolourise orange bromine water by addition.'] },
    { lv: 'kuliah', q: ['Reaksi SN2 pada pusat kiral menghasilkan…', 'An SN2 reaction at a chiral centre gives…'], options: [['Rasemat', 'A racemate'], ['Inversi konfigurasi', 'Inversion of configuration'], ['Retensi konfigurasi', 'Retention of configuration'], ['Tidak ada produk', 'No product']], answer: 1, explain: ['Serangan dari belakang membalik konfigurasi (inversi Walden).', 'Backside attack flips the configuration (Walden inversion).'] },
  ],
  teacher: {
    cp: ['Fase D–F: peserta didik mengenal senyawa karbon, menamai hidrokarbon dan turunannya, serta mengaitkan gugus fungsi dengan sifat dan kegunaan.', 'Phases D–F: learners explore carbon compounds, name hydrocarbons and derivatives, and link functional groups to properties and uses.'],
    goals: [
      ['Membedakan alkana, alkena, alkuna, dan aromatik.', 'Distinguish alkanes, alkenes, alkynes and aromatics.'],
      ['Memberi nama IUPAC dan mengenali gugus fungsi.', 'Give IUPAC names and recognise functional groups.'],
      ['Menentukan isomer dari satu rumus molekul.', 'Find isomers of a molecular formula.'],
    ],
    duration: ['6 × 45 menit', '6 × 45 min'],
    steps: [
      ['Model molimod atau plastisin untuk alkana C₁–C₅.', 'Model kits or play dough for C₁–C₅ alkanes.'],
      ['Tur gugus fungsi di halaman Golongan Moleculium.', 'Functional-group tour in Moleculium’s Classes pages.'],
      ['Tantangan isomer dengan lab Perakit molekul (data live PubChem).', 'Isomer challenge with the Molecule builder (live PubChem data).'],
    ],
    misconceptions: [['"Organik berarti alami atau sehat." Dalam kimia, organik berarti senyawa karbon, termasuk plastik dan racun.', '"Organic means natural or healthy." In chemistry it means carbon compounds, including plastics and poisons.']],
    assessment: ['Kuis Moleculium dan poster keluarga gugus fungsi dengan contoh sehari-hari.', 'Moleculium quiz and a functional-group family poster with everyday examples.'],
  },
};
