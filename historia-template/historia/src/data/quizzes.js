/**
 * Quiz data for Historia.
 *
 * Each quiz is keyed by episode id and contains questions derived from
 * the existing story material in src/data/story.js.
 */

export const quizzes = {
  prolog: {
    id: 'prolog-quiz',
    episode: 'prolog',
    title: 'Uji Ingatan — Latar Belakang',
    questions: [
      {
        question: 'Organisasi pertama yang menandai awal pergerakan nasional Indonesia adalah...',
        options: [
          'Sarekat Islam',
          'Budi Utomo',
          'Indische Partij',
          'Perhimpunan Indonesia',
        ],
        answer: 1,
        explanation: 'Budi Utomo didirikan pada 20 Mei 1908 dan merupakan organisasi kebangkitan nasional pertama.',
      },
      {
        question: 'Tanggal berapakah Budi Utomo didirikan?',
        options: [
          '17 Agustus 1908',
          '20 Mei 1908',
          '10 November 1908',
          '3 Oktober 1908',
        ],
        answer: 1,
        explanation: 'Budi Utomo didirikan pada 20 Mei 1908. Tanggal ini kemudian diperingati sebagai Hari Kebangkitan Nasional.',
      },
      {
        question: 'Siapa penggagas utama ide pendirian Budi Utomo?',
        options: [
          'dr. Cipto Mangunkusumo',
          'H.O.S. Tjokroaminoto',
          'Dr. Wahidin Soedirohoesodo',
          'E.F.E. Douwes Dekker',
        ],
        answer: 2,
        explanation: 'Dr. Wahidin Soedirohoesodo adalah penggagas utama Budi Utomo. Ia berasal dari STOVIA dan advocate pendidikan.',
      },
      {
        question: 'Faktor internal yang mendorong lahirnya pergerakan nasional adalah...',
        options: [
          'Kemenangan Jepang atas Rusia',
          'Pendidikan dan kesadaran kaum terdidik',
          'Pengaruh nasionalisme Tiongkok',
          'Gerakan Turki Muda',
        ],
        answer: 1,
        explanation: 'Faktor internal adalah pendidikan dan kesadaran kaum terdidik yang tumbuh dari ruang-ruang diskusi.',
      },
      {
        question: 'Sebutan "kaum terdidik" dalam prolog muncul dari...',
        options: [
          'Pelajar STOVIA dan sekolah bumiputra',
          'Para pedagang batik di Solo',
          'Pelajar di Belanda',
          'Pemuda di Surakarta',
        ],
        answer: 0,
        explanation: 'Kaum terdidik muncul dari sekolah-sekolah bumiputra dan pelajar STOVIA yang mulai membaca dan berdiskusi.',
      },
    ],
  },

  ep1: {
    id: 'ep1-quiz',
    episode: 'ep1',
    title: 'Uji Ingatan — Budi Utomo',
    questions: [
      {
        question: 'Budi Utomo didirikan pada tanggal...',
        options: [
          '3–5 Oktober 1908',
          '20 Mei 1908',
          '26 Agustus 1912',
          '25 Desember 1912',
        ],
        answer: 1,
        explanation: 'Budi Utomo didirikan pada 20 Mei 1908 di Jakarta.',
      },
      {
        question: 'Kongres pertama Budi Utomo digelar pada...',
        options: [
          '20 Mei 1908 di Jakarta',
          '3–5 Oktober 1908 di Yogyakarta',
          '11 Maret 1913 di Bandung',
          '27 Oktober 1928 di Batavia',
        ],
        answer: 1,
        explanation: 'Kongres pertama Budi Utomo digelar pada 3–5 Oktober 1908 di Yogyakarta dengan sekitar 300 peserta.',
      },
      {
        question: 'R.A.A. Tirtokoesoemo terpilih sebagai...',
        options: [
          'Bendahara Budi Utomo',
          'Ketua pertama Budi Utomo',
          'Sekretaris De Express',
          'Pendiri Sarekat Islam',
        ],
        answer: 1,
        explanation: 'R.A.A. Tirtokoesoemo terpilih sebagai ketua pertama Budi Utomo dalam kongres 1908.',
      },
      {
        question: 'Perbedaan pandangan antara Wahidin dan Tjipto dalam Budi Utomo adalah...',
        options: [
          'Wahidin ingin politik terbuka, Tjipto ingin pendidikan only',
          'Wahidin ingin pendidikan dari atas, Tjipto ingin pendidikan ke bawah',
          'Wahidin ingin aksi kekerasan, Tjipto ingin diplomasi',
          'Tidak ada perbedaan pandangan',
        ],
        answer: 1,
        explanation: 'Wahidin percaya pendidikan harus dari atas lewat dana dan beasiswa. Tjipto ingin pendidikan menjangkau masyarakat luas.',
      },
      {
        question: 'Mayoritas peserta kongres pertama Budi Utomo berasal dari golongan...',
        options: [
          'Pedagang batik',
          'Pemuda pelajar STOVIA',
          'PRIYAYI',
          'Tani',
        ],
        answer: 2,
        explanation: 'Kongres pertama Budi Utomo mayoritas dihadiri oleh priyayi, menunjukkan organisasi masih terbatas satu golongan.',
      },
    ],
  },

  ep2: {
    id: 'ep2-quiz',
    episode: 'ep2',
    title: 'Uji Ingatan — Sarekat Islam',
    questions: [
      {
        question: 'Sarekat Islam awalnya bernama...',
        options: [
          'Sarekat Dagang Islam',
          'Indische Vereeniging',
          'Indische Partij',
          'Tri Koro Dharmo',
        ],
        answer: 0,
        explanation: 'Sarekat Islam awalnya bernama Sarekat Dagang Islam sebelum namanya diubah pada 1912.',
      },
      {
        question: 'Siapa pengusaha batik Solo yang menjadi pendiri Sarekat Dagang Islam?',
        options: [
          'Tirtoadisuryo',
          'H.O.S. Tjokroaminoto',
          'Haji Samanhudi',
          'Dr. Satiman Wiryosanjoyo',
        ],
        answer: 2,
        explanation: 'Haji Samanhudi adalah pengusaha batik Solo yang menjadi pendiri Sarekat Dagang Islam pada 1911.',
      },
      {
        question: 'Tahun berapakah nama organisasi berubah menjadi Sarekat Islam?',
        options: [
          '1909',
          '1910',
          '1911',
          '1912',
        ],
        answer: 3,
        explanation: 'Pada 1912, nama Sarekat Dagang Islam berubah menjadi Sarekat Islam. H.O.S. Tjokroaminoto juga resmi bergabung pada Mei 1912.',
      },
      {
        question: 'Siapa yang membantu menyusun anggaran dasar Sarekat Islam?',
        options: [
          'Dr. Wahidin Soedirohoesodo',
          'E.F.E. Douwes Dekker',
          'H.O.S. Tjokroaminoto',
          'Mohammad Hatta',
        ],
        answer: 2,
        explanation: 'H.O.S. Tjokroaminoto membantu menyusun anggaran dasar organisasi ini.',
      },
      {
        question: 'Di kota mana Sarekat Islam sempat dibekukan sebelum dibolehkan kembali pada 26 Agustus 1912?',
        options: [
          'Jakarta',
          'Surakarta',
          'Bandung',
          'Bogor',
        ],
        answer: 1,
        explanation: 'Di Surakarta, Sarekat Islam sempat dibekukan. Pembekuan dicabut pada 26 Agustus 1912 dengan syarat anggaran dasar diubah.',
      },
    ],
  },

  ep3: {
    id: 'ep3-quiz',
    episode: 'ep3',
    title: 'Uji Ingatan — Indische Partij',
    questions: [
      {
        question: 'Indische Partij didirikan di kota...',
        options: [
          'Jakarta',
          'Surakarta',
          'Bandung',
          'Yogyakarta',
        ],
        answer: 2,
        explanation: 'Indische Partij didirikan di Bandung pada 25 Desember 1912.',
      },
      {
        question: 'Tiga Serangkai Indische Partij adalah...',
        options: [
          'Wahidin, Tjipto, Tirto',
          'Dekkers, Tjipto, Suwardi',
          'Samanhudi, Tjokro, Hatta',
          'Satiman, Kartini, Rohanah',
        ],
        answer: 1,
        explanation: 'Tiga Serangkai adalah E.F.E. Douwes Dekker, dr. Cipto Mangunkusumo, dan Suwardi Suryaningrat.',
      },
      {
        question: 'Surat kabar yang digunakan Indische Partij untuk menyebarkan gagasan adalah...',
        options: [
          'Hindia Poetra',
          'Indonesia Merdeka',
          'De Express',
          'Bumi Putra',
        ],
        answer: 2,
        explanation: 'Indische Partij menyebarkan gagasan lewat surat kabar bernama De Express.',
      },
      {
        question: 'Pemerintah kolonial menyatakan Indische Partij terlarang pada...',
        options: [
          '25 Desember 1912',
          '11 Maret 1913',
          '26 Agustus 1912',
          '27 Oktober 1928',
        ],
        answer: 1,
        explanation: 'Pada 11 Maret 1913, pemerintah kolonial menyatakan Indische Partij terlarang dan ketiga tokohnya ditangkap.',
      },
      {
        question: 'Setelah dibubarkan, Indische Partij dihidupkan kembali dengan nama...',
        options: [
          'Sarekat Islam',
          'Perhimpunan Indonesia',
          'Partai Insulinde',
          'Jong Java',
        ],
        answer: 2,
        explanation: 'Para penerus Indische Partij mencoba menghidupkannya kembali dengan nama Partai Insulinde.',
      },
    ],
  },

  ep4: {
    id: 'ep4-quiz',
    episode: 'ep4',
    title: 'Uji Ingatan — Perhimpunan Indonesia',
    questions: [
      {
        question: 'Organisasi ini awalnya bernama Indische Vereeniging pada tahun...',
        options: [
          '1908',
          '1912',
          '1922',
          '1925',
        ],
        answer: 0,
        explanation: 'Indische Vereeniging didirikan pada 1908 sebagai perkumpulan pelajar Hindia di Belanda.',
      },
      {
        question: 'Urutan perubahan nama organisasi yang benar adalah...',
        options: [
          'Indische Vereeniging → Perhimpunan Indonesia → Indonesische Vereeniging',
          'Indonesische Vereeniging → Indische Vereeniging → Perhimpunan Indonesia',
          'Indische Vereeniging → Indonesische Vereeniging → Perhimpunan Indonesia',
          'Perhimpunan Indonesia → Indische Vereeniging → Indonesische Vereeniging',
        ],
        answer: 2,
        explanation: 'Indische Vereeniging (1908) → Indonesische Vereeniging (1922) → Perhimpunan Indonesia (1925).',
      },
      {
        question: 'Pada tahun berapakah organisasi ini menjadi Perhimpunan Indonesia?',
        options: [
          '1908',
          '1922',
          '1925',
          '1930',
        ],
        answer: 2,
        explanation: 'Pada 8 Februari 1925, organisasi ini resmi menjadi Perhimpunan Indonesia.',
      },
      {
        question: 'Majalah Perhimpunan Indonesia yang sebelumnya bernama Hindia Poetra berubah menjadi...',
        options: [
          'De Express',
          'Indonesia Merdeka',
          'Budi Utomo',
          'Sarekat Islam',
        ],
        answer: 1,
        explanation: 'Majalah ini berubah dari Hindia Poetra menjadi Indonesia Merdeka, mencerminkan pergeseran identitas organisasi.',
      },
      {
        question: 'Siapa yang memimpin Perhimpunan Indonesia pada 1926–1930?',
        options: [
          'Dr. Wahidin Soedirohoesodo',
          'Dr. Cipto Mangunkusumo',
          'Mohammad Hatta',
          'H.O.S. Tjokroaminoto',
        ],
        answer: 2,
        explanation: 'Mohammad Hatta memimpin Perhimpunan Indonesia pada 1926–1930.',
      },
    ],
  },

  ep5: {
    id: 'ep5-quiz',
    episode: 'ep5',
    title: 'Uji Ingatan — Pemuda dan Perempuan',
    questions: [
      {
        question: 'Tri Koro Dharmo didirikan pada tanggal...',
        options: [
          '7 Maret 1915',
          '12 Juni 1918',
          '9 Desember 1917',
          '22 Desember 1928',
        ],
        answer: 0,
        explanation: 'Tri Koro Dharmo didirikan pada 7 Maret 1915 di gedung STOVIA.',
      },
      {
        question: 'Tiga tujuan mulia Tri Koro Dharmo adalah...',
        options: [
          'Satu tanah air, satu bangsa, satu bahasa',
          'Sakti, Budi, Bakti',
          'Pendidikan, dagang, politik',
          'Jawa Raya, Sumatera Raya, Indonesia',
        ],
        answer: 1,
        explanation: 'Tri Koro Dharmo memiliki tiga tujuan: Sakti, Budi, Bakti.',
      },
      {
        question: 'Organisasi pemuda yang berasal dari Sumatera dan berdiri pada 9 Desember 1917 adalah...',
        options: [
          'Tri Koro Dharmo',
          'Jong Java',
          'Jong Sumatranen Bond',
          'Perhimpunan Indonesia',
        ],
        answer: 2,
        explanation: 'Jong Sumatranen Bond didirikan pada 9 Desember 1917 sebagai organisasi pemuda Sumatera.',
      },
      {
        question: 'Kerajinan Amai Setia didirikan oleh...',
        options: [
          'R.A. Kartini',
          'Rohanah Kudus',
          'Haji Samanhudi',
          'Tirtoadisuryo',
        ],
        answer: 1,
        explanation: 'Kerajinan Amai Setia didirikan oleh Rohanah Kudus pada 11 Februari 1914 di Kudus.',
      },
      {
        question: 'Kongres Perempuan Indonesia I digelar pada...',
        options: [
          '11 Februari 1914',
          '7 Maret 1915',
          '22–25 Desember 1928',
          '27–28 Oktober 1928',
        ],
        answer: 2,
        explanation: 'Kongres Perempuan Indonesia I digelar pada 22–25 Desember 1928 di Yogyakarta dengan 30 organisasi wanita.',
      },
    ],
  },

  final: {
    id: 'final-quiz',
    episode: 'final',
    title: 'Uji Ingatan — Sumpah Pemuda',
    questions: [
      {
        question: 'Kongres Pemuda Kedua dilaksanakan pada...',
        options: [
          '20 Mei 1908',
          '27–28 Oktober 1928',
          '3–5 Oktober 1908',
          '22–25 Desember 1928',
        ],
        answer: 1,
        explanation: 'Kongres Pemuda Kedua digelar pada 27–28 Oktober 1928 di Batavia.',
      },
      {
        question: 'Tiga pokok Sumpah Pemuda adalah...',
        options: [
          'Satu tanah air, satu bangsa, satu bahasa',
          'Sakti, Budi, Bakti',
          'Pendidikan, perdagangan, politik',
          'Jawa Raya, Sumatera Raya, Indonesia',
        ],
        answer: 0,
        explanation: 'Tiga pokok Sumpah Pemuda: satu tanah air Indonesia, satu bangsa Indonesia, satu bahasa Indonesia.',
      },
      {
        question: 'Kongres Pemuda Kedua dihadiri oleh organisasi pemuda dari berbagai daerah, kecuali...',
        options: [
          'Jong Java',
          'Jong Sumatranen Bond',
          'Budi Utomo',
          'Perhimpunan Indonesia',
        ],
        answer: 2,
        explanation: 'Budi Utomo adalah organisasi orang tua, bukan organisasi pemuda yang hadir dalam Kongres Pemuda 1928.',
      },
      {
        question: 'Hasil akhir dari bertahun-tahun organisasi pemuda bertemu adalah...',
        options: [
          'Pendidikan bagi kaum terdidik',
          'Persatuan bangsa Indonesia',
          'Pasar yang adil untuk pedagang',
          'Partai politik terbuka',
        ],
        answer: 1,
        explanation: 'Semua organisasi pemuda dari berbagai daerah bertemu dan menyatakan persatuan bangsa Indonesia dalam Sumpah Pemuda.',
      },
      {
        question: 'Sumpah Pemuda menegaskan bahwa Indonesia adalah...',
        options: [
          'Negeri Belanda',
          'Satu tanah air, satu bangsa, satu bahasa',
          'Kerajaan Hindia',
          'Daerah jajahan Eropa',
        ],
        answer: 1,
        explanation: 'Sumpah Pemuda menegaskan: satu tanah air Indonesia, satu bangsa Indonesia, satu bahasa Indonesia.',
      },
    ],
  },
}

export const getQuiz = (episodeId) => quizzes[episodeId] ?? null
