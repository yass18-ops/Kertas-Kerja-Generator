// Data Pratetap Auto-Fill untuk Kertas Kerja USIM
// Menyediakan contoh kertas kerja lengkap yang menepati format universiti

export const USIM_PRESETS = [
  {
    id: 'kepimpinan',
    title: 'Karnival Kepimpinan Mahasiswa USIM 2026',
    subtitle: 'Majlis Perwakilan Pelajar (MPP USIM)',
    category: 'Kepimpinan & Pengurusan',
    data: {
      eventMeta: {
        programName: 'Karnival Kepimpinan & Integrasi Mahasiswa USIM 2026',
        startDate: '2026-11-14',
        endDate: '2026-11-15',
        venue: 'Kompleks Dewan Tuanku Canselor (DTC)',
        organizer: 'Majlis Perwakilan Pelajar (MPP USIM)',
        collaborator: 'Pusat Pembangunan Hal Ehwal Pelajar (PHEP)',
        pax: '100 orang mahasiswa Universiti Sains Islam Malaysia'
      },
      proposalDetails: {
        purpose: 'Kertas kerja ini dikemukakan bertujuan untuk memohon pertimbangan dan kelulusan daripada pihak pengurusan Universiti Sains Islam Malaysia (USIM) bagi menganjurkan Karnival Kepimpinan & Integrasi Mahasiswa USIM 2026 serta permohonan peruntukan kewangan berkaitan.',
        synopsis: 'Karnival Kepimpinan & Integrasi Mahasiswa merupakan inisiatif strategik kepimpinan mahasiswa USIM untuk melahirkan barisan pemimpin berdaya saing berteraskan integrasi ilmu Naqli dan Aqli. Program ini menggabungkan sesi perkongsian kepimpinan, bengkel modul pengurusan organisasi, dan aktiviti interaksi antara pemimpin kelab serta persatuan pelajar.',
        background: [
          'Universiti Sains Islam Malaysia sentiasa komited dalam memupuk sahsiah holistik pelajar selaras dengan aspirasi universiti berteraskan integrasi ilmu Naqli dan Aqli.',
          'Sehubungan dengan itu, program ini dirangka untuk melengkapkan barisan kepimpinan pelajar dengan ilmu pengurusan persatuan, tadbir urus berhemah, serta pemantapan tatacara penyediaan kertas kerja.'
        ]
      },
      objectives: [
        { description: 'Melahirkan mahasiswa yang berketrampilan tinggi dalam aspek kepimpinan berteraskan nilai integriti dan etika kepimpinan Islam.' },
        { description: 'Memperkukuh sinergi dan jaringan kerjasama erat antara barisan persatuan serta kelab pelajar di peringkat universiti.' },
        { description: 'Memberi pendedahan praktikal mengenai pengurusan organisasi, tatakelola kewangan, dan penyediaan dokumen pentadbiran berkualiti.' }
      ],
      committee: {
        patron: { name: "Prof. Dato' Ts. Dr. Sharifudin Md Shaarani", role: 'Naib Canselor' },
        advisor: { name: 'Prof. Madya Dr. Mohd Rushdan bin Mohd Jailani', role: 'Dekan', pejabat: 'Pusat Pembangunan Hal Ehwal Pelajar (PHEP)' },
        coordinator: { name: 'Encik Ahmad Farhan bin Zulkifli', role: 'Penasihat Kelab', pejabat: 'Pusat Pembangunan Hal Ehwal Pelajar (PHEP)' },
        director: { name: 'Muhammad Amirul bin Haziq', matric: '1220456' },
        secretary: { name: 'Nurul Izzah binti Ridzuan', matric: '1220789' },
        subCommittees: [
          {
            roleName: 'Bendahari Kehormat',
            members: [{ name: 'Ahmad Danial bin Shamsul', matric: '1220112' }]
          },
          {
            roleName: 'AJK Protokol & Jemputan',
            members: [
              { name: 'Siti Sarah binti Kamaruddin', matric: '1220334' },
              { name: 'Luqman Hakim bin Azhar', matric: '1220556' }
            ]
          },
          {
            roleName: 'AJK Publisiti & Media',
            members: [{ name: 'Nur Aina binti Roslan', matric: '1220889' }]
          },
          {
            roleName: 'AJK Logistik & Fasiliti',
            members: [{ name: 'Muhammad Faris bin Zainal', matric: '1220667' }]
          },
          {
            roleName: 'AJK Makanan & Jamuan',
            members: [{ name: 'Nur Farhana binti Zaki', matric: '1220443' }]
          }
        ]
      },
      itinerary: {
        date: '14 - 15 November 2026',
        timeRange: '8:00 Pagi - 5:30 Petang',
        venue: 'Kompleks Dewan Tuanku Canselor (DTC)',
        activities: [
          { time: '0800', activity: 'Pendaftaran Peserta dan Sarapan Pagi' },
          { time: '0830', activity: 'Taklimat Program dan Sesi Suai Kenal' },
          { time: '0930', activity: 'Slot 1: Kepimpinan Madani Berteraskan Integrasi Naqli & Aqli' },
          { time: '1100', activity: 'Rehat Minum Pagi' },
          { time: '1130', activity: 'Slot 2: Pengurusan Organisasi & Protokol Rasmi Universiti' },
          { time: '1300', activity: 'Rehat, Makan Tengah Hari dan Solat Zohor Berjemaah' },
          { time: '1430', activity: 'Slot 3: Bengkel Penyediaan Kertas Kerja & Pengurusan Kewangan' },
          { time: '1630', activity: 'Pembentangan Simulasi Program & Resolusi' },
          { time: '1700', activity: 'Majlis Perasmian Penutup & Sesi Bergambar' },
          { time: '1730', activity: 'Bersurai' }
        ]
      },
      financials: {
        income: [
          { source: 'Peruntukan Tabung Aktiviti Pelajar (PHEP)', amount: 3500 },
          { source: 'Yuran Komitmen Peserta', amount: 1000 }
        ],
        expenses: [
          {
            category: 'Breakfast',
            item: 'Sarapan Pagi Peserta & Urus Setia',
            calculation: '100 orang x RM 4.00',
            amount: 400,
            fundSource: 'Peruntukan Tabung Aktiviti Pelajar (PHEP)'
          },
          {
            category: 'Lunch',
            item: 'Makan Tengah Hari Peserta & Urus Setia',
            calculation: '100 orang x RM 7.00',
            amount: 700,
            fundSource: 'Peruntukan Tabung Aktiviti Pelajar (PHEP)'
          },
          {
            category: 'Cenderamata',
            item: 'Plaq Penghargaan Penceramah Jemputan',
            calculation: '2 orang x RM 150.00',
            amount: 300,
            fundSource: 'Peruntukan Tabung Aktiviti Pelajar (PHEP)'
          },
          {
            category: 'Logistik',
            item: 'Modul Cetakan, Tag Nama & Fail Peserta',
            calculation: '100 set x RM 15.00',
            amount: 1500,
            fundSource: 'Yuran Komitmen Peserta'
          },
          {
            category: 'Lain-lain',
            item: 'Banner Publisiti & Kain Rentang',
            calculation: '2 unit x RM 100.00',
            amount: 200,
            fundSource: 'Peruntukan Tabung Aktiviti Pelajar (PHEP)'
          }
        ]
      },
      signatures: {
        preparedBy: { name: 'Muhammad Amirul bin Haziq', role: 'Pengarah Program' },
        reviewedBy: { name: 'Prof. Madya Dr. Mohd Rushdan bin Mohd Jailani', role: 'Penasihat Program' }
      }
    }
  },
  {
    id: 'teknologi',
    title: 'Simposium Kecerdasan Buatan & Keselamatan Siber 2026',
    subtitle: 'Persatuan Mahasiswa Fakulti Sains dan Teknologi (FST)',
    category: 'Akademik & Teknologi',
    data: {
      eventMeta: {
        programName: 'Simposium Kecerdasan Buatan & Keselamatan Siber 2026',
        startDate: '2026-12-05',
        endDate: '2026-12-05',
        venue: 'Dewan Kuliah Pusat 1 (DKP 1)',
        organizer: 'Persatuan Mahasiswa Fakulti Sains dan Teknologi (FST)',
        collaborator: 'Kelab Sains Komputer (COMPSSA USIM)',
        pax: '80 orang ahli persatuan fakulti dan mahasiswa sains komputer'
      },
      proposalDetails: {
        purpose: 'Kertas kerja ini bertujuan untuk mendapatkan kelulusan dan sokongan kewangan bagi penganjuran Simposium Kecerdasan Buatan & Keselamatan Siber 2026 anjuran mahasiswa Fakulti Sains dan Teknologi USIM.',
        synopsis: 'Simposium ini bertujuan mendedahkan penuntut kepada kemajuan teknologi AI generatif dan keselamatan siber terkini, di samping menghubungkan mahasiswa dengan pakar industri teknologi digital tempatan.',
        background: [
          'Perkembangan pesat teknologi digital dan kecerdasan buatan memerlukan pendedahan berterusan kepada mahasiswa bagi meningkatkan kebolehpasaran graduan.',
          'Program ini membuka ruang perkongsian ilmu secara langsung daripada pemain industri utama bidang sains data dan sekuriti siber.'
        ]
      },
      objectives: [
        { description: 'Meningkatkan pemahaman mahasiswa berkenaan aplikasi etika dan amalan selamat kecerdasan buatan dalam era industri 4.0.' },
        { description: 'Membina kemahiran teknikal peserta dalam mengesan dan menangani ancaman keselamatan siber semasa.' }
      ],
      committee: {
        patron: { name: "Prof. Dato' Ts. Dr. Sharifudin Md Shaarani", role: 'Naib Canselor' },
        advisor: { name: 'Prof. ChM. Dr. Mohammad Noor Jalil', role: 'Dekan Fakulti Sains dan Teknologi', pejabat: 'Fakulti Sains dan Teknologi (FST)' },
        coordinator: { name: 'Dr. Nurul Halimatul Asma', role: 'Penyelaras Program', pejabat: 'Fakulti Sains dan Teknologi (FST)' },
        director: { name: 'Ahmad Faiz bin Khairuddin', matric: '1221567' },
        secretary: { name: 'Nur Syuhada binti Mansor', matric: '1221890' },
        subCommittees: [
          {
            roleName: 'AJK Teknikal & Multimedia',
            members: [{ name: 'Muhammad Hafiz bin Imran', matric: '1221234' }]
          },
          {
            roleName: 'AJK Publisiti & Media',
            members: [{ name: 'Fatin Nabilah binti Salleh', matric: '1221456' }]
          },
          {
            roleName: 'AJK Makanan & Jamuan',
            members: [{ name: 'Syaza Izzati binti Rosli', matric: '1221789' }]
          }
        ]
      },
      itinerary: {
        date: '5 Disember 2026',
        timeRange: '8:30 Pagi - 4:30 Petang',
        venue: 'Dewan Kuliah Pusat 1 (DKP 1)',
        activities: [
          { time: '0830', activity: 'Pendaftaran Peserta dan Sarapan' },
          { time: '0900', activity: 'Ucaptama: Halatuju AI & Keselamatan Siber Negara' },
          { time: '1030', activity: 'Rehat Minum Pagi' },
          { time: '1100', activity: 'Bengkel Praktikal: Pengesanan Kerentanan Siber' },
          { time: '1300', activity: 'Makan Tengah Hari & Solat Zohor' },
          { time: '1415', activity: 'Forum Panel: Peluang Kerjaya Masa Hadapan Bersama Pakar Industri' },
          { time: '1600', activity: 'Sesi Soal Jawab & Majlis Penutup' },
          { time: '1630', activity: 'Bersurai' }
        ]
      },
      financials: {
        income: [
          { source: 'Peruntukan Tabung Amanah Fakulti FST', amount: 2000 },
          { source: 'Tajaan Syarikat Rakan Industri', amount: 1500 }
        ],
        expenses: [
          {
            category: 'Breakfast',
            item: 'Sarapan Pagi Peserta',
            calculation: '80 orang x RM 4.00',
            amount: 320,
            fundSource: 'Peruntukan Tabung Amanah Fakulti FST'
          },
          {
            category: 'Lunch',
            item: 'Makan Tengah Hari Peserta & Penceramah',
            calculation: '80 orang x RM 7.00',
            amount: 560,
            fundSource: 'Peruntukan Tabung Amanah Fakulti FST'
          },
          {
            category: 'Cenderamata',
            item: 'Cenderamata 3 Ahli Panel Jemputan',
            calculation: '3 orang x RM 150.00',
            amount: 450,
            fundSource: 'Tajaan Syarikat Rakan Industri'
          },
          {
            category: 'Logistik',
            item: 'Bahan Bengkel & Sijil Penyertaan Digital',
            calculation: '80 orang x RM 10.00',
            amount: 800,
            fundSource: 'Tajaan Syarikat Rakan Industri'
          }
        ]
      },
      signatures: {
        preparedBy: { name: 'Ahmad Faiz bin Khairuddin', role: 'Pengarah Program' },
        reviewedBy: { name: 'Prof. ChM. Dr. Mohammad Noor Jalil', role: 'Dekan Fakulti' }
      }
    }
  },
  {
    id: 'kemasyarakatan',
    title: 'Misi Sukarelawan Siswa Prihatin USIM 2026',
    subtitle: 'Sekretariat Pusat Islam USIM',
    category: 'Khidmat Komuniti & Dakwah',
    data: {
      eventMeta: {
        programName: 'Misi Sukarelawan Siswa Prihatin USIM 2026',
        startDate: '2026-10-17',
        endDate: '2026-10-18',
        venue: 'Kompleks Islam Tuanku Muhriz (KITM)',
        organizer: 'Sekretariat Pusat Islam USIM',
        collaborator: 'Sekretariat Rakan Siswa YADIM USIM',
        pax: '50 orang sukarelawan mahasiswa USIM'
      },
      proposalDetails: {
        purpose: 'Memohon kelulusan serta peruntukan bagi menjayakan program khidmat masyarakat Misi Sukarelawan Siswa Prihatin 2026 santunan komuniti setempat.',
        synopsis: 'Program ini memberi fokus kepada khidmat komuniti, aktiviti gotong-royong, serta bimbingan fardu ain dan motivasi akademik kepada anak-anak qaryah masjid setempat.',
        background: [
          'Pembudayaan amalan kesukarelawanan merupakan tonggak penting dalam melahirkan mahasiswa USIM yang prihatin terhadap kebajikan masyarakat luar.',
          'Program ini memupuk jiwa prihatin dan menyemai sifat kasih sayang berlandaskan prinsip rahmah selaras nilai teras universiti.'
        ]
      },
      objectives: [
        { description: 'Memupuk semangat kesukarelawanan dan empati sosial dalam kalangan mahasiswa USIM terhadap komuniti yang memerlukan.' },
        { description: 'Menyediakan bimbingan fardu ain dan motivasi pendidikan kepada anak-anak komuniti asnaf setempat.' }
      ],
      committee: {
        patron: { name: "Prof. Dato' Ts. Dr. Sharifudin Md Shaarani", role: 'Naib Canselor' },
        advisor: { name: 'Dr. Muhammad Hafiz bin Saleh', role: 'Pengarah Pusat Islam', pejabat: 'Pusat Islam / Kompleks Islam Tuanku Muhriz' },
        coordinator: { name: 'Ustaz Khairul Anuar bin Osman', role: 'Pegawai Hal Ehwal Pelajar', pejabat: 'Pusat Islam / Kompleks Islam Tuanku Muhriz' },
        director: { name: 'Muhammad Syafiq bin Zulkifli', matric: '1223011' },
        secretary: { name: 'Aimi Nadiah binti Azman', matric: '1223044' },
        subCommittees: [
          {
            roleName: 'AJK Kebajikan & Keselamatan',
            members: [{ name: 'Muhammad Arif bin Ridzuan', matric: '1223088' }]
          },
          {
            roleName: 'AJK Logistik & Pengangkutan',
            members: [{ name: 'Danish Hakim bin Rosman', matric: '1223099' }]
          },
          {
            roleName: 'AJK Makanan & Jamuan',
            members: [{ name: 'Siti Nur Aisyah binti Rahim', matric: '1223122' }]
          }
        ]
      },
      itinerary: {
        date: '17 - 18 Oktober 2026',
        timeRange: '7:30 Pagi - 6:00 Petang',
        venue: 'Kompleks Islam Tuanku Muhriz (KITM)',
        activities: [
          { time: '0730', activity: 'Pelepasan Konvoi Sukarelawan di Dataran Canselor' },
          { time: '0830', activity: 'Ketibaan dan Taklimat Agihan Tugasan' },
          { time: '0900', activity: 'Aktiviti Gotong-Royong Pembersihan & Baik Pulih Balai Komuniti' },
          { time: '1230', activity: 'Makan Tengah Hari & Solat Zohor' },
          { time: '1430', activity: 'Kelas Bimbingan Motivasi & Cilik Pintar Bersama Anak-Anak Asnaf' },
          { time: '1630', activity: 'Penyampaian Kotak Rezeki Rahmah Kepada Keluarga Terpilih' },
          { time: '1730', activity: 'Sesi Bergambar & Penutup' },
          { time: '1800', activity: 'Perjalanan Pulang ke Kampus USIM' }
        ]
      },
      financials: {
        income: [
          { source: 'Peruntukan Pusat Islam USIM', amount: 2500 },
          { source: 'Tabung Infaq Prihatin', amount: 1500 }
        ],
        expenses: [
          {
            category: 'Breakfast',
            item: 'Sarapan Pagi Sukarelawan',
            calculation: '50 orang x RM 4.00',
            amount: 200,
            fundSource: 'Peruntukan Pusat Islam USIM'
          },
          {
            category: 'Lunch',
            item: 'Makan Tengah Hari Sukarelawan & Komuniti',
            calculation: '50 orang x RM 7.00',
            amount: 350,
            fundSource: 'Peruntukan Pusat Islam USIM'
          },
          {
            category: 'Logistik',
            item: 'Peralatan Gotong-Royong & Cat Pembersihan',
            calculation: '1 pakej gotong-royong',
            amount: 800,
            fundSource: 'Tabung Infaq Prihatin'
          },
          {
            category: 'Cenderamata',
            item: 'Bakul Makanan Asas (Kotak Rezeki) Komuniti',
            calculation: '20 buah keluarga x RM 50.00',
            amount: 1000,
            fundSource: 'Tabung Infaq Prihatin'
          }
        ]
      },
      signatures: {
        preparedBy: { name: 'Muhammad Syafiq bin Zulkifli', role: 'Pengarah Program' },
        reviewedBy: { name: 'Dr. Muhammad Hafiz bin Saleh', role: 'Pengarah Pusat Islam' }
      }
    }
  }
];
