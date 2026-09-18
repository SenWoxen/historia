/**
 * STORY DATA — Historia: Pergerakan Nasional Indonesia
 * -----------------------------------------------------
 * Schema engine yang dipakai (tidak berubah):
 *   Line shapes:
 *     { speaker, text }                  spoken/narrated line
 *     { speaker, text, cast: [...] }     line + set who is on stage
 *     { choice: [{ label, goto }] }      branch to another scene id
 *     { goto: 'sceneId' }                jump without asking
 *     { end: true }                      episode finished
 *   cast entries: { id, at: 'left'|'center'|'right', flip?, dim? }
 *
 * Tokoh yang ditaruh di atas panggung hanyalah NPC yang sprite-nya SUDAH
 * ADA (scholar / guard / elder di src/art/sprites.jsx). Tidak ada asset
 * sprite baru. Pati (histor) adalah MC/guide, bukan tokoh sejarah — ia
 * hanya menjelaskan, bertanya, dan memberi konteks.
 */

export const episodes = [
  /* ================================================================== */
  /* PROLOG — LATAR BELAKANG PERGERAKAN NASIONAL                        */
  /* ================================================================== */
  {
    id: 'prolog',
    number: '0',
    title: 'Latar Belakang Pergerakan Nasional',
    blurb:
      'Sebelum organisasi besar lahir, ada sekolah, kaum terdidik, dan guncangan dunia yang mengubah cara berpikir.',
    accent: '#8AA859',
    start: 'pembuka',
    scenes: {
      pembuka: {
        background: 'archive',
        lines: [
          {
            speaker: 'narrator',
            text: 'Museum sejarah. Sebuah ruangan sunyi, dan satu sosok yang menunggu di depan pintu masuk.',
            cast: [{ id: 'histor', at: 'center' }],
          },
          {
            speaker: 'histor',
            text: 'Selamat datang. Saya Pati, pemandu kalian untuk perjalanan kali ini.',
          },
          {
            speaker: 'histor',
            text: 'Kita akan menelusuri satu bagian penting dari sejarah bangsa ini: masa pergerakan nasional.',
          },
          { speaker: 'histor', text: 'Tapi sebelum Budi Utomo atau Sarekat Islam lahir... ada yang lebih dulu terjadi.' },
          {
            speaker: 'histor',
            text: 'Bayangkan Hindia Belanda pada akhir abad ke-19. Kehidupan di bawah pemerintahan kolonial.',
            cast: [{ id: 'histor', at: 'left' }],
          },
          {
            speaker: 'narrator',
            text: 'Atmosfer berganti menjadi warna kelabu. Pati menunjuk ke papan bertuliskan "Pendidikan".',
          },
          { speaker: 'histor', text: 'Pada masa itu, sekolah mulai dibuka untuk anak-anak bumiputra.' },
          { speaker: 'histor', text: 'Dari sekolah-sekolah itulah muncul kelompok baru: kaum terdidik.' },
          { speaker: 'histor', text: 'Mereka membaca, berdiskusi, dan mulai mempertanyakan keadaan di sekelilingnya.' },
          { speaker: 'histor', text: 'Kondisi kolonial yang dirasakan sehari-hari ikut membentuk kesadaran mereka.' },
          { speaker: 'histor', text: 'Kesadaran sosial dan politik tumbuh pelan-pelan, dari ruang-ruang kecil.' },
          {
            speaker: 'histor',
            text: 'Ada juga kenangan masa lalu yang tidak pernah benar-benar hilang.',
            cast: [{ id: 'histor', at: 'center' }],
          },
          { speaker: 'histor', text: 'Siapa yang tidak pernah mendengar tentang kejayaan Sriwijaya dan Majapahit?' },
          {
            speaker: 'histor',
            text: 'Nama-nama itu hidup di ingatan, dan menjadi bahan bakar bagi mimpi tentang masa depan.',
          },
          { speaker: 'histor', text: 'Namun pergerakan tidak tumbuh dari dalam saja.' },
          { speaker: 'histor', text: 'Dunia di luar Hindia juga bergerak — dan kabar itu sampai ke ruang-ruang diskusi kaum terdidik.' },
          { speaker: 'histor', text: 'Di India, Kongres Nasional India berdiri. Lalu ada pemikiran Gandhisme yang menyebar.' },
          { speaker: 'histor', text: 'Di Turki, gerakan Turki Muda mengguncang kekuasaan lama.' },
          { speaker: 'histor', text: 'Sekitar waktu itu juga, Jepang mengalahkan Rusia. Sebuah bangsa Asia mengalahkan negara Eropa.' },
          { speaker: 'histor', text: 'Tiongkok bergolak dengan nasionalisme Sun Yat-sen.' },
          { speaker: 'histor', text: 'Bersamaan dengan itu, gagasan liberalisme, demokrasi, dan nasionalisme mengalir dari Eropa.' },
          {
            speaker: 'histor',
            text: 'Jadi ada faktor dari dalam dan faktor dari luar. Pertanyaannya... mana yang lebih dulu mendorong lahirnya pergerakan?',
            cast: [{ id: 'histor', at: 'center' }],
          },
          {
            choice: [
              { label: 'Faktor internal — pendidikan & kesadaran sendiri.', goto: 'internal' },
              { label: 'Faktor eksternal — pengaruh dunia luar.', goto: 'eksternal' },
            ],
          },
        ],
      },
      internal: {
        background: 'archive',
        lines: [
          { speaker: 'histor', text: 'Pilihan yang masuk akal. Pendidikan melahirkan kaum terdidik, dan merekalah yang mulai bergerak.' },
          { speaker: 'histor', text: 'Kenangan masa lalu juga memberi gambaran bahwa bangsa ini pernah berdiri besar.' },
          { speaker: 'histor', text: 'Faktor internal inilah yang menyiapkan "bahan bakar" sebelum dunia luar ikut meniup api.' },
          { goto: 'simpulan' },
        ],
      },
      eksternal: {
        background: 'archive',
        lines: [
          { speaker: 'histor', text: 'Betul, kabar dari luar sangat memengaruhi cara berpikir kaum terdidik.' },
          { speaker: 'histor', text: 'Kemenangan Jepang, nasionalisme Tiongkok, dan gerakan Turki Muda memberi teladan.' },
          { speaker: 'histor', text: 'Namun ingat — semua pengaruh itu baru berarti karena di dalam sudah ada kesadaran yang tumbuh.' },
          { goto: 'simpulan' },
        ],
      },
      simpulan: {
        background: 'archive',
        lines: [
          { speaker: 'histor', text: 'Sebenarnya keduanya berjalan bersama. Internal menyiapkan tanah, eksternal menyiram benih.' },
          { speaker: 'histor', text: 'Dan di atas tanah itulah organisasi pertama mulai berdiri.' },
          { speaker: 'histor', text: 'Organisasi itu bernama... Budi Utomo.' },
          { speaker: 'histor', text: 'Ikuti saya. Kita mulai babak pertama.' },
          { end: true },
        ],
      },
    },
  },

  /* ================================================================== */
  /* EPISODE 1 — BUDI UTOMO                                             */
  /* ================================================================== */
  {
    id: 'ep1',
    number: 'I',
    title: 'Budi Utomo',
    blurb:
      'Dari ruang sekolah, lahir organisasi pertama yang menandai awal pergerakan nasional: 20 Mei 1908.',
    accent: '#B23A2E',
    start: 'pembuka',
    scenes: {
      pembuka: {
        background: 'archive',
        lines: [
          {
            speaker: 'narrator',
            text: 'Pati berhenti di depan satu etalase. Di dalamnya, foto-foto lama dan dokumen berpita merah.',
            cast: [{ id: 'histor', at: 'center' }],
          },
          { speaker: 'histor', text: 'Ini dia. Titik awal yang sering disebut-sebut dalam sejarah pergerakan nasional.' },
          { speaker: 'histor', text: 'Budi Utomo. Didirikan pada 20 Mei 1908 di Jakarta.' },
          { speaker: 'histor', text: 'Tanggal yang sama, bertahun-tahun kemudian, diperingati sebagai Hari Kebangkitan Nasional.' },
          { speaker: 'histor', text: 'Tapi jangan bayangkan ini lahir dari ruang rapat megah. Peristiwanya lebih sederhana.' },
          {
            speaker: 'narrator',
            text: 'Pati menunjuk nama-nama dalam dokumen: sebuah gagasan yang digagas oleh Dr. Wahidin Soedirohoesodo.',
            cast: [{ id: 'histor', at: 'left' }, { id: 'wahidin', at: 'right', flip: true }],
          },
          {
            speaker: 'wahidin',
            text: 'Pendidikan adalah jalan untuk memajukan bangsa. Dari atas, dari bawah — harus terus digalang.',
          },
          { speaker: 'histor', text: 'Dr. Wahidin percaya pendidikan harus diusahakan dari atas: lewat dana pelajar, beasiswa, dan bantuan untuk yang kurang mampu.' },
          {
            speaker: 'histor',
            text: 'Gagasan ini kemudian ditangkap oleh para pelajar STOVIA — di antaranya dr. Cipto Mangunkusumo.',
            cast: [{ id: 'histor', at: 'left' }, { id: 'tjipto', at: 'right', flip: true }],
          },
          { speaker: 'tjipto', text: 'Pendidikan saja tidak cukup. Jangkauannya harus lebih luas dari sekadar sekolah.' },
          { speaker: 'histor', text: 'Di sinilah perbedaan pandangan muncul: pendidikan dari atas, atau pendidikan dari bawah?' },
          { speaker: 'histor', text: 'Wahidin ingin pendidikan digalang lewat jalur atas — dana dan bantuan untuk pelajar.' },
          { speaker: 'histor', text: 'Tjipto menginginkan pendidikan yang lebih luas, menjangkau rakyat banyak, bukan hanya segelintir.' },
          {
            choice: [
              { label: 'Pendidikan dari atas — dana & beasiswa pelajar.', goto: 'atas' },
              { label: 'Pendidikan dari bawah — jangkauan yang lebih luas.', goto: 'bawah' },
            ],
          },
        ],
      },
      atas: {
        background: 'archive',
        lines: [
          { speaker: 'histor', text: 'Itulah pandangan Wahidin: menolong mereka yang sudah di bangku sekolah, agar makin banyak yang terdidik.' },
          { speaker: 'histor', text: 'Sekolah anak bumiputra masih sedikit, jadi mengalirkan dana ke pelajar dianggap paling mungkin.' },
          { goto: 'kongres' },
        ],
      },
      bawah: {
        background: 'archive',
        lines: [
          { speaker: 'histor', text: 'Itulah pandangan Tjipto: pendidikan tidak boleh berhenti di sekolah elite.' },
          { speaker: 'histor', text: 'Ia ingin pendidikan menjangkau masyarakat luas, agar kesadaran tumbuh dari lapisan bawah.' },
          { goto: 'kongres' },
        ],
      },
      kongres: {
        background: 'archive',
        lines: [
          { speaker: 'histor', text: 'Perbedaan itu tidak membuat Budi Utomo berhenti. Organisasi tetap berdiri dan tumbuh.' },
          { speaker: 'histor', text: 'Kongres pertamanya digelar pada 3–5 Oktober 1908, di Yogyakarta.' },
          { speaker: 'histor', text: 'Sekitar 300 orang hadir — dan mayoritas mereka adalah priyayi.' },
          { speaker: 'histor', text: 'R.A.A. Tirtokoesoemo terpilih sebagai ketua.' },
          { speaker: 'histor', text: 'Menarik, ya? Organisasi yang menandai awal kebangkitan, namun pesertanya masih didominasi satu golongan.' },
          {
            speaker: 'histor',
            text: 'Tujuan awal Budi Utomo memang belum sepenuhnya bersifat nasional.',
            cast: [{ id: 'histor', at: 'center' }],
          },
          { speaker: 'histor', text: 'Bahkan Tjipto sempat berusaha menjadikan Budi Utomo organisasi politik — dengan hasil yang berbeda dari harapannya.' },
          { speaker: 'histor', text: 'Meski begitu, keberadaannya membuktikan satu hal: kaum terdidik mulai berhimpun.' },
          { speaker: 'histor', text: 'Organisasi itu modern, dan kehadirannya menandai tumbuhnya kesadaran nasional.' },
          { speaker: 'histor', text: 'Budi Utomo membuka jalan. Tapi yang datang setelahnya membawa warna yang berbeda.' },
          { speaker: 'histor', text: 'Di layar berikutnya... Sarekat Islam. Mari kita lihat.' },
          { end: true },
        ],
      },
    },
  },

  /* ================================================================== */
  /* EPISODE 2 — SAREKAT ISLAM                                          */
  /* ================================================================== */
  {
    id: 'ep2',
    number: 'II',
    title: 'Sarekat Islam',
    blurb:
      'Dari perkumpulan pedagang kecil, Sarekat Islam tumbuh menjadi organisasi yang menjangkau banyak lapisan.',
    accent: '#3C6E71',
    start: 'pembuka',
    scenes: {
      pembuka: {
        background: 'harbour',
        lines: [
          {
            speaker: 'narrator',
            text: 'Diorama pelabuhan kecil. Pati berdiri di samping etalase berisi kain batik dan dokumen dagang.',
            cast: [{ id: 'histor', at: 'center' }],
          },
          { speaker: 'histor', text: 'Kalau Budi Utomo lahir dari ruang pendidikan, Sarekat Islam lahir dari... pasar.' },
          { speaker: 'histor', text: 'Kisahnya dimulai dari seorang pengusaha batik di Solo: Haji Samanhudi.' },
          {
            speaker: 'histor',
            text: 'Sebelum itu, sudah ada yang merintis jalan: Tirtoadisuryo mendirikan Sarekat Dagang Islamiyah di Batavia pada 1909.',
            cast: [{ id: 'histor', at: 'left' }, { id: 'tirto', at: 'right', flip: true }],
          },
          { speaker: 'tirto', text: 'Para pedagang pribumi harus bersatu menghadapi persaingan yang tidak seimbang.' },
          { speaker: 'histor', text: 'Pada 1910, organisasi serupa muncul di Buitenzorg — sekarang dikenal sebagai Bogor.' },
          { speaker: 'histor', text: 'Lalu pada 1911, Tirtoadisuryo mendorong Haji Samanhudi untuk membentuk perkumpulan serupa.' },
          {
            speaker: 'histor',
            text: 'Dari situlah lahir Sarekat Dagang Islam.',
            cast: [{ id: 'histor', at: 'left' }, { id: 'samanhudi', at: 'right', flip: true }],
          },
          { speaker: 'samanhudi', text: 'Para pedagang kita tidak boleh terus berjalan sendiri-sendiri.' },
          { speaker: 'histor', text: 'Kemudian H.O.S. Tjokroaminoto ikut membantu menyusun anggaran dasar organisasi ini.' },
          {
            speaker: 'histor',
            text: 'Pada 1912, nama organisasi berubah: Sarekat Dagang Islam menjadi Sarekat Islam.',
            cast: [{ id: 'histor', at: 'left' }, { id: 'tjokro', at: 'right', flip: true }],
          },
          { speaker: 'tjokro', text: 'Bukan hanya pedagang. Semua yang ingin memajukan diri boleh bergabung.' },
          {
            choice: [
              { label: 'Agar fokusnya berpindah dari dagang ke politik.', goto: 'jwb1' },
              { label: 'Agar keanggotaannya tidak hanya pedagang, tapi lebih luas.', goto: 'jwb2' },
            ],
          },
        ],
      },
      jwb1: {
        background: 'harbour',
        lines: [
          { speaker: 'histor', text: 'Sebagian betul — organisasi mulai bergerak lebih dari sekadar urusan dagang.' },
          { speaker: 'histor', text: 'Tapi bagian terpenting adalah keanggotaannya yang diperluas, tidak lagi terbatas pedagang.' },
          { goto: 'perluasan' },
        ],
      },
      jwb2: {
        background: 'harbour',
        lines: [
          { speaker: 'histor', text: 'Tepat. Keanggotaan diperluas: tidak hanya pedagang, tetapi siapa saja yang ingin maju.' },
          { speaker: 'histor', text: 'Dari situ Sarekat Islam tumbuh menjadi organisasi yang besar.' },
          { goto: 'perluasan' },
        ],
      },
      perluasan: {
        background: 'harbour',
        lines: [
          { speaker: 'histor', text: 'Periode 1911–1916 adalah masa perkembangan pesat Sarekat Islam.' },
          { speaker: 'histor', text: 'Tujuannya mencakup banyak hal: perdagangan, bantuan kepada anggota, pendidikan, dan peningkatan derajat bumiputra.' },
          { speaker: 'histor', text: 'Persis seperti namanya yang baru — bukan lagi urusan dagang semata.' },
          { speaker: 'histor', text: 'Namun perjalanannya tidak selalu mulus.' },
          { speaker: 'histor', text: 'Di Surakarta, organisasi ini sempat dibekukan.' },
          { speaker: 'histor', text: 'Pembekuan itu akhirnya dicabut pada 26 Agustus 1912, dengan syarat: anggaran dasar diubah.' },
          { speaker: 'histor', text: 'Dan pada Mei 1912, Tjokroaminoto sendiri resmi bergabung.' },
          { speaker: 'histor', text: 'Dengan pemimpin seperti Tjokroaminoto, Sarekat Islam tumbuh jauh melampaui lingkup pedagang batik.' },
          { speaker: 'histor', text: 'Satu hal yang bisa kita catat: gerakan tidak hanya lahir dari sekolah, tetapi juga dari pasar dan tempat ibadah.' },
          { speaker: 'histor', text: 'Tapi ada satu organisasi yang mencoba langkah yang berbeda — lebih terang-terangan politik.' },
          { speaker: 'histor', text: 'Indische Partij. Kita lanjut.' },
          { end: true },
        ],
      },
    },
  },

  /* ================================================================== */
  /* EPISODE 3 — INDISCHE PARTIJ                                        */
  /* ================================================================== */
  {
    id: 'ep3',
    number: 'III',
    title: 'Indische Partij',
    blurb:
      'Organisasi pertama yang terang-terangan menyebut diri partai politik — dan yang pertama dibubarkan pemerintah.',
    accent: '#3C5A8A',
    start: 'pembuka',
    scenes: {
      pembuka: {
        background: 'courtyard',
        lines: [
          {
            speaker: 'narrator',
            text: 'Ruang berganti menjadi gedung tua bergaya kolonial. Pati berhenti di depan deretan potret tiga orang.',
            cast: [{ id: 'histor', at: 'center' }],
          },
          { speaker: 'histor', text: 'Kalau Budi Utomo dan Sarekat Islam masih bergerak hati-hati, ada yang memilih jalan lebih tegas.' },
          { speaker: 'histor', text: 'Mereka berasal dari kaum terpelajar yang ingin organisasi politik terbuka bagi berbagai golongan.' },
          {
            speaker: 'histor',
            text: 'Tiga nama. Satu tujuan. Mereka dikenal sebagai Tiga Serangkai.',
            cast: [{ id: 'histor', at: 'left' }, { id: 'dekkers', at: 'right', flip: true }],
          },
          { speaker: 'dekkers', text: 'Kita tidak boleh memandang rendah golongan mana pun. Semua Indiers adalah satu.' },
          { speaker: 'histor', text: 'E.F.E. Douwes Dekker — penulis, jurnalis, penggerak.' },
          {
            speaker: 'histor',
            text: 'Bersamanya, dr. Cipto Mangunkusumo dan Suwardi Suryaningrat.',
            cast: [
              { id: 'histor', at: 'left' },
              { id: 'dekkers', at: 'right', flip: true },
              { id: 'tjipto', at: 'center', dim: true },
            ],
          },
          { speaker: 'tjipto', text: 'Kita berdiri untuk persatuan, bukan untuk satu golongan saja.' },
          {
            speaker: 'histor',
            text: 'Dan Suwardi — nama yang kelak dikenal dengan nama lain — melengkapi tiga serangkai itu.',
            cast: [
              { id: 'histor', at: 'left' },
              { id: 'suwardi', at: 'right', flip: true },
            ],
          },
          { speaker: 'suwardi', text: 'Hindia harus bersiap menuju kehidupan rakyat yang merdeka.' },
          { speaker: 'histor', text: 'Indische Partij didirikan di Bandung pada 25 Desember 1912.' },
          { speaker: 'histor', text: 'Mereka menyebarkan gagasan lewat surat kabar De Express.' },
          {
            choice: [
              { label: 'Berjuang lewat Sarekat/akademik saja.', goto: 'salah1' },
              { label: 'Persatuan semua Indiers menuju kemerdekaan.', goto: 'benar' },
            ],
          },
        ],
      },
      salah1: {
        background: 'courtyard',
        lines: [
          { speaker: 'histor', text: 'Bukan itu. Yang mereka perjuangkan justru lebih tegas: persatuan semua Indiers.' },
          { speaker: 'histor', text: 'Gagasan utama Indische Partij adalah mengakhiri hubungan kolonial dan memajukan Hindia.' },
          { goto: 'larangan' },
        ],
      },
      benar: {
        background: 'courtyard',
        lines: [
          { speaker: 'histor', text: 'Tepat. Persatuan semua Indiers — tanpa membedakan golongan.' },
          { speaker: 'histor', text: 'Gagasan mereka mencakup persamaan ketatanegaraan dan persiapan menuju kehidupan yang merdeka.' },
          { goto: 'larangan' },
        ],
      },
      larangan: {
        background: 'courtyard',
        lines: [
          { speaker: 'histor', text: 'Gagasan seberani itu tentu tidak disambut hangat oleh pemerintah kolonial.' },
          { speaker: 'histor', text: 'Pada 11 Maret 1913, pemerintah menyatakan Indische Partij terlarang.' },
          { speaker: 'histor', text: 'Ketiga tokohnya ditangkap.' },
          { speaker: 'histor', text: 'Mereka kemudian memilih dibuang ke Belanda.' },
          { speaker: 'histor', text: 'Tanpa Tiga Serangkai, organisasi ini mengalami kemunduran.' },
          { speaker: 'histor', text: 'Para penerusnya mencoba menghidupkannya lagi dengan nama baru: Partai Insulinde.' },
          { speaker: 'histor', text: 'Namun jejak Indische Partij tetap penting: ia menunjukkan bahwa organisasi politik terbuka bisa berdiri.' },
          { speaker: 'histor', text: 'Sementara itu, di tempat yang jauh dari Hindia, ada gerakan lain yang tumbuh.' },
          { speaker: 'histor', text: 'Bukan di pasar, bukan di gedung rapat... melainkan di negeri Belanda.' },
          { speaker: 'histor', text: 'Perhimpunan Indonesia. Mari kita lihat.' },
          { end: true },
        ],
      },
    },
  },

  /* ================================================================== */
  /* EPISODE 4 — PERHIMPUNAN INDONESIA                                  */
  /* ================================================================== */
  {
    id: 'ep4',
    number: 'IV',
    title: 'Perhimpunan Indonesia',
    blurb:
      'Dari perkumpulan pelajar di Belanda, tumbuh organisasi yang dengan tegas menuju cita-cita Indonesia merdeka.',
    accent: '#4C6B8A',
    start: 'pembuka',
    scenes: {
      pembuka: {
        background: 'archive',
        lines: [
          {
            speaker: 'narrator',
            text: 'Pati membuka papan berisi garis waktu. Beberapa nama tertulis di atasnya, dihapus, lalu ditulis ulang.',
            cast: [{ id: 'histor', at: 'center' }],
          },
          { speaker: 'histor', text: 'Ada satu organisasi yang sejarahnya paling jelas terlihat dari perubahannya: nama.' },
          { speaker: 'histor', text: 'Ia lahir sebagai Indische Vereeniging pada 1908.' },
          { speaker: 'histor', text: 'Saat itu, ia masih berbentuk perkumpulan pelajar Hindia di Belanda.' },
          { speaker: 'histor', text: 'Perkumpulan itu kemudian berkembang. Tujuan dan arahnya mulai bergeser.' },
          { speaker: 'histor', text: 'Pada 1922, namanya berubah menjadi Indonesische Vereeniging.' },
          { speaker: 'histor', text: 'Perubahan nama bukan sekadar ganti kata — ia berkaitan dengan perubahan identitas.' },
          { speaker: 'histor', text: 'Dari "Hindia" yang penuh nuansa kolonial, menuju "Indonesia" yang menegaskan diri.' },
          { speaker: 'histor', text: 'Puncaknya, pada 8 Februari 1925, organisasi ini menjadi Perhimpunan Indonesia.' },
          { speaker: 'histor', text: 'Dan majalahnya pun berubah: dari Hindia Poetra menjadi Indonesia Merdeka.' },
          { speaker: 'histor', text: 'Lihat arahnya. Organisasi ini tidak lagi bicara soal kemajuan di bawah kolonial.' },
          { speaker: 'histor', text: 'Ia bergerak menuju satu gagasan besar: Nasional Indonesia.' },
          {
            choice: [
              { label: 'Indische Vereeniging → Perhimpunan Indonesia → Indonesische Vereeniging', goto: 'salah4' },
              { label: 'Indische Vereeniging → Indonesische Vereeniging → Perhimpunan Indonesia', goto: 'benar4' },
            ],
          },
        ],
      },
      salah4: {
        background: 'archive',
        lines: [
          { speaker: 'histor', text: 'Perhatikan urutannya sekali lagi.' },
          { speaker: 'histor', text: 'Indische Vereeniging dulu (1908), lalu berubah jadi Indonesische Vereeniging (1922).' },
          { speaker: 'histor', text: 'Baru pada 1925 menjadi Perhimpunan Indonesia.' },
          { goto: 'pemimpin' },
        ],
      },
      benar4: {
        background: 'archive',
        lines: [
          { speaker: 'histor', text: 'Betul. Perubahan nama mencerminkan perubahan arah organisasi.' },
          { speaker: 'histor', text: 'Dari "Hindia" ke "Indonesia" — dari perkumpulan sosial ke gerakan nasional.' },
          { goto: 'pemimpin' },
        ],
      },
      pemimpin: {
        background: 'archive',
        lines: [
          { speaker: 'histor', text: 'Organisasi ini juga dipimpin oleh tokoh-tokoh yang disebut dalam sumber.' },
          {
            speaker: 'histor',
            text: 'Salah satunya: Mohammad Hatta, yang memimpin Perhimpunan Indonesia pada 1926–1930.',
            cast: [{ id: 'histor', at: 'left' }, { id: 'hatta', at: 'right', flip: true }],
          },
          { speaker: 'hatta', text: 'Indonesia merdeka bukan sekadar cita-cita. Ia harus diperjuangkan dengan kesungguhan.' },
          { speaker: 'histor', text: 'Perhimpunan Indonesia menjadi contoh bagaimana pelajar di luar negeri ikut mematangkan cita-cita nasional.' },
          { speaker: 'histor', text: 'Tapi gerakan tidak hanya tumbuh di kalangan pelajar dan politikus.' },
          { speaker: 'histor', text: 'Ada yang lebih muda. Ada juga yang selama ini jarang disebut.' },
          { speaker: 'histor', text: 'Pemuda, dan perempuan. Kita lanjut.' },
          { end: true },
        ],
      },
    },
  },

  /* ================================================================== */
  /* EPISODE 5 — PERGERAKAN PEMUDA DAN PEREMPUAN                        */
  /* ================================================================== */
  {
    id: 'ep5',
    number: 'V',
    title: 'Pergerakan Pemuda dan Perempuan',
    blurb:
      'Ketika pemuda dan perempuan mulai berhimpun, gerakan kebangsaan mendapat denyut yang lebih muda dan lebih luas.',
    accent: '#A34A6E',
    start: 'pemuda',
    scenes: {
      pemuda: {
        background: 'archive',
        lines: [
          {
            speaker: 'narrator',
            text: 'Pati menunjuk papan foto sekelompok pemuda berseragam sederhana, berdiri di depan sebuah gedung.',
            cast: [{ id: 'histor', at: 'center' }],
          },
          { speaker: 'histor', text: 'Bagian ini dimulai dari para pemuda. Organisasi mereka tumbuh hampir bersamaan.' },
          { speaker: 'histor', text: 'Pada 7 Maret 1915, di gedung STOVIA, lahir sebuah organisasi bernama Tri Koro Dharmo.' },
          {
            speaker: 'histor',
            text: 'Tri Koro Dharmo — tiga tujuan mulia: Sakti, Budi, Bakti.',
            cast: [{ id: 'histor', at: 'left' }, { id: 'satiman', at: 'right', flip: true }],
          },
          { speaker: 'satiman', text: 'Kita ingin membangun Jawa Raya — pemuda Jawa bersatu, terpelajar, dan berbakti.' },
          { speaker: 'histor', text: 'Tokoh-tokoh di baliknya antara lain dr. Satiman Wiryosanjoyo, Kadarman, dan Sunardi.' },
          { speaker: 'histor', text: 'Organisasi pemuda ini masih bersifat kedaerahan — fokusnya ke Jawa.' },
          { speaker: 'histor', text: 'Lalu pada 12 Juni 1918, di Solo, organisasi ini berubah nama menjadi Jong Java.' },
          { speaker: 'histor', text: 'Sementara itu, di Sumatera, lahir Jong Sumatranen Bond pada 9 Desember 1917.' },
          { speaker: 'histor', text: 'Organisasi pemuda daerah lain juga bermunculan di berbagai tempat.' },
          { speaker: 'histor', text: 'Masing-masing masih kedaerahan... tapi mereka mulai saling bertemu.' },
          { speaker: 'histor', text: 'Dan dari pertemuan-pertemuan itulah, nanti, persatuan diuji.' },
          { goto: 'perempuan' },
        ],
      },
      perempuan: {
        background: 'archive',
        lines: [
          {
            speaker: 'narrator',
            text: 'Pati berpindah ke bagian lain: ruangan dengan foto-foto perempuan bersanggul dan perkakas kerajinan.',
            cast: [{ id: 'histor', at: 'center' }],
          },
          { speaker: 'histor', text: 'Sekarang giliran para perempuan. Gerakan mereka juga bagian dari sejarah ini.' },
          { speaker: 'histor', text: 'Semuanya bermula dari satu keyakinan sederhana: perempuan juga harus berpendidikan.' },
          {
            speaker: 'histor',
            text: 'Gagasan itu lama digaungkan oleh R.A. Kartini.',
            cast: [{ id: 'histor', at: 'left' }, { id: 'karta', at: 'right', flip: true }],
          },
          { speaker: 'karta', text: 'Perempuan yang terdidik akan mendidik generasi berikutnya.' },
          { speaker: 'histor', text: 'Pada 11 Februari 1914, di Kudus, berdiri Kerajinan Amai Setia.' },
          { speaker: 'histor', text: 'Organisasi ini dirintis oleh Rohanah Kudus.' },
          {
            speaker: 'histor',
            text: 'Tujuannya: pendidikan dan keterampilan bagi perempuan.',
            cast: [{ id: 'histor', at: 'left' }, { id: 'rohanah', at: 'right', flip: true }],
          },
          { speaker: 'rohanah', text: 'Perempuan perlu bekal — tidak hanya urusan rumah tangga, tetapi juga keterampilan dan pengetahuan.' },
          { speaker: 'histor', text: 'Di kalangan pemuda, ada juga Jong Java Dames Afdeeling — bagian perempuan dari Jong Java.' },
          { speaker: 'histor', text: 'Semua aliran ini akhirnya bertemu di satu titik bersejarah.' },
          { speaker: 'histor', text: 'Kongres Perempuan Indonesia I digelar pada 22–25 Desember 1928, di Yogyakarta.' },
          { speaker: 'histor', text: 'Diikuti oleh 30 organisasi wanita.' },
          {
            speaker: 'histor',
            text: 'Tujuannya: mempererat hubungan antarorganisasi perempuan dan membahas kemajuan perempuan.',
            cast: [{ id: 'histor', at: 'center' }],
          },
          { speaker: 'histor', text: 'Dari kongres ini, dibentuk pula satu wadah bersama: PPPI.' },
          {
            choice: [
              { label: 'Organisasi pemuda bersifat kedaerahan, perempuan fokus pendidikan.', goto: 'paham5' },
              { label: 'Pemuda dan perempuan bergerak tanpa tujuan apa pun.', goto: 'salah5' },
            ],
          },
        ],
      },
      paham5: {
        background: 'archive',
        lines: [
          { speaker: 'histor', text: 'Betul. Organisasi pemuda awalnya kedaerahan, dan gerakan perempuan menekankan pendidikan.' },
          { speaker: 'histor', text: 'Keduanya kemudian melebur ke arah yang sama: persatuan.' },
          { goto: 'jembatan' },
        ],
      },
      salah5: {
        background: 'archive',
        lines: [
          { speaker: 'histor', text: 'Justru sebaliknya — keduanya punya tujuan yang jelas.' },
          { speaker: 'histor', text: 'Pemuda menekuni kedaerahan lalu melebar ke persatuan; perempuan memperjuangkan pendidikan.' },
          { goto: 'jembatan' },
        ],
      },
      jembatan: {
        background: 'archive',
        lines: [
          { speaker: 'histor', text: 'Semua benang merah ini — pemuda, perempuan, pelajar, organisasi politik — mulai menuju satu titik.' },
          { speaker: 'histor', text: 'Titik di mana mereka tidak lagi bicara sebagai orang Jawa, Sumatera, atau golongan mana pun.' },
          { speaker: 'histor', text: 'Tapi sebagai satu bangsa.' },
          { speaker: 'histor', text: 'Dan titik itu punya nama. Sumpah Pemuda.' },
          { end: true },
        ],
      },
    },
  },

  /* ================================================================== */
  /* FINAL — SUMPAH PEMUDA                                               */
  /* ================================================================== */
  {
    id: 'final',
    number: 'VI',
    title: 'Sumpah Pemuda',
    blurb:
      '27–28 Oktober 1928: pemuda dari seluruh Nusantara bersatu dalam satu naskah — satu tanah air, satu bangsa, satu bahasa.',
    accent: '#C9A227',
    start: 'pembuka',
    scenes: {
      pembuka: {
        background: 'archive',
        lines: [
          {
            speaker: 'narrator',
            text: 'Lampu redup. Di tengah ruangan, patung perunggu dua pemuda berjabat tangan. Pati berdiri di sampingnya.',
            cast: [{ id: 'histor', at: 'center' }],
          },
          { speaker: 'histor', text: 'Semua jalan yang kita telusuri — Budi Utomo, Sarekat Islam, Indische Partij, Perhimpunan Indonesia — bermuara di sini.' },
          { speaker: 'histor', text: 'Kongres Pemuda Kedua. 27–28 Oktober 1928, di Batavia — kota yang kini kita kenal sebagai Jakarta.' },
          {
            speaker: 'histor',
            text: 'Para pemuda dari berbagai organisasi daerah duduk bersama. Jong Java, Jong Sumatranen Bond, dan lainnya.',
            cast: [
              { id: 'histor', at: 'left' },
              { id: 'wakil', at: 'right', flip: true },
            ],
          },
          { speaker: 'wakil', text: 'Kita datang dari daerah yang berbeda, tetapi yang kita cari sama: Indonesia.' },
          { speaker: 'histor', text: 'Mereka tidak lagi menyebut dirinya orang Jawa atau orang Sumatera lebih dulu.' },
          { speaker: 'histor', text: 'Mereka berbicara sebagai satu bangsa.' },
          { speaker: 'histor', text: 'Kongres ini melahirkan satu ikrar yang kita kenal sebagai Sumpah Pemuda.' },
          {
            speaker: 'histor',
            text: 'Tiga pokok. Mari kita lihat apa saja isinya.',
            cast: [{ id: 'histor', at: 'center' }],
          },
          { speaker: 'narrator', text: 'Di layar, tiga kalimat muncul satu per satu. Pati menunjuknya.' },
          {
            choice: [
              { label: 'Tanah air Indonesia, bangsa Indonesia, bahasa Indonesia.', goto: 'benarfinal' },
              { label: 'Jawa Raya, Sumatera Raya, Kalimantan Raya.', goto: 'salahfinal' },
            ],
          },
        ],
      },
      benarfinal: {
        background: 'archive',
        lines: [
          { speaker: 'histor', text: 'Tepat. Tiga pokok Sumpah Pemuda: satu tanah air Indonesia, satu bangsa Indonesia, satu bahasa Indonesia.' },
          { speaker: 'histor', text: 'Ikrar itu bukan sekadar kalimat — ia adalah hasil dari bertahun-tahun organisasi pemuda bertemu dan berdiskusi.' },
          { goto: 'penerimaan' },
        ],
      },
      salahfinal: {
        background: 'archive',
        lines: [
          { speaker: 'histor', text: 'Bukan itu. Perhatikan lagi.' },
          { speaker: 'histor', text: 'Tiga pokoknya adalah: satu tanah air Indonesia, satu bangsa Indonesia, dan satu bahasa Indonesia.' },
          { goto: 'penerimaan' },
        ],
      },
      penerimaan: {
        background: 'archive',
        lines: [
          { speaker: 'histor', text: 'Perkembangan organisasi pemuda yang bertahun-tahun itu akhirnya berbuah pada persatuan.' },
          { speaker: 'histor', text: 'Dari kedaerahan, mereka sampai pada kebangsaan.' },
          { speaker: 'histor', text: 'Sumpah Pemuda menjadi penegasan: Indonesia itu satu.' },
          { goto: 'epilog' },
        ],
      },
      epilog: {
        background: 'archive',
        lines: [
          {
            speaker: 'narrator',
            text: 'Lampu kembali menyala. Museum kembali ramai seperti biasa. Pati tersenyum.',
            cast: [{ id: 'histor', at: 'center' }],
          },
          { speaker: 'histor', text: 'Dan di sinilah perjalanan kita berakhir. Mari kita rangkum.' },
          { speaker: 'histor', text: 'Semuanya dimulai dari pendidikan dan lahirnya kaum terdidik.' },
          { speaker: 'histor', text: 'Lalu muncul organisasi pertama: Budi Utomo.' },
          { speaker: 'histor', text: 'Dari pasar dan tempat ibadah, tumbuh Sarekat Islam.' },
          { speaker: 'histor', text: 'Dari kalangan terpelajar, lahir Indische Partij yang tegas menuntut persatuan.' },
          { speaker: 'histor', text: 'Dari para pelajar di Belanda, Perhimpunan Indonesia mematangkan cita-cita kemerdekaan.' },
          { speaker: 'histor', text: 'Pemuda dan perempuan datang membawa denyut yang lebih muda dan lebih luas.' },
          { speaker: 'histor', text: 'Dan pada 1928, semuanya bersatu dalam Sumpah Pemuda.' },
          { speaker: 'histor', text: 'Perjalanan yang panjang, bukan? Dari satu ruang sekolah, sampai satu bangsa.' },
          { speaker: 'histor', text: 'Terima kasih sudah berjalan bersama saya hari ini.' },
          { speaker: 'histor', text: 'Sampai jumpa di museum — dan di babak sejarah berikutnya.' },
          { end: true },
        ],
      },
    },
  },
]

export const getEpisode = (id) => episodes.find((e) => e.id === id)