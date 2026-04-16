# SLI, SLO, dan SLA

## Tujuan

Dokumen ini menjelaskan **Service Level Indicator (SLI)**, **Service Level Objective (SLO)**, dan **Service Level Agreement (SLA)** sebagai fondasi untuk mengukur keandalan layanan, mengambil keputusan engineering berbasis data, dan menyelaraskan ekspektasi antara tim teknis, produk, dan pelanggan.

Tanpa pemisahan konsep ini, tim sering mencampuradukkan “harus cepat” dengan “berapa toleransi gagal yang sehat”, sehingga on-call membara, prioritas tidak jelas, dan insiden dianggap “gagal” padahal perilaku sistem masih dalam batas yang disepakati.

## Kenapa Topik Ini Penting

- **Kejelasan**: SLI menjawab “apa yang kita ukur”; SLO menjawab “target berapa”; SLA menjawab “konsekuensi hukum/bisnis jika tidak tercapai”.
- **Prioritas**: Dengan SLO, tim bisa memprioritaskan pekerjaan yang benar-benar memengaruhi pengalaman pengguna, bukan optimasi kosmetik.
- **On-call yang sehat**: Alert dan incident response bisa diarahkan ke pelanggaran SLO atau risiko pelanggaran, bukan setiap fluktuasi metrik.
- **Negosiasi realistis**: SLA tanpa SLI/SLO yang matang sering tidak realistis atau tidak terukur, sehingga konflik dengan pelanggan internal/eksternal meningkat.

## Model Mental

1. **SLI** adalah pengukuran objektif kualitas layanan (misalnya proporsi request sukses, latency di bawah ambang).
2. **SLO** adalah target atau ambang batas pada SLI untuk periode waktu tertentu (misalnya 99,9% request bulan ini di bawah 300 ms p99).
3. **SLA** adalah komitmen kontrak (sering ke pelanggan) yang biasanya lebih ketat atau sama dengan SLO internal, dengan **remediasi** jika gagal.

Urutan berpikir sehat: pilih **SLI** yang mencerminkan pengalaman pengguna → tetapkan **SLO** yang achievable dan diukur → jika perlu kontrak eksternal, turunkan ke **SLA** dengan margin aman di atas SLO internal.

## SLI (Service Level Indicator)

### Definisi

SLI adalah **metrik kuantitatif** yang menggambarkan seberapa baik layanan memenuhi aspek tertentu dari sudut pandang pengguna (atau bisnis). SLI harus:

- **Dapat diukur** secara konsisten di lingkungan produksi.
- **Relevan** terhadap pain pengguna (bukan hanya CPU server).
- **Dapat dipertanggungjawabkan** (definisi “baik” jelas, misalnya HTTP 2xx/3xx dianggap sukses untuk availability).

### Contoh SLI umum

- **Availability**: proporsi request yang dianggap sukses dalam jendela waktu (misalnya tidak error 5xx, atau termasuk timeout sebagai gagal).
- **Latency**: proporsi request yang selesai di bawah ambang tertentu (misalnya p95 < 500 ms).
- **Correctness**: proporsi transaksi yang konsisten dengan aturan bisnis (lebih sulit, sering dipecah ke SLI teknis per flow).
- **Durability** (untuk storage): proporsi data yang tidak hilang dalam periode tertentu.

### Desain SLI yang buruk

- Mengukur “uptime server” padahal pengguna peduli pada **availability endpoint** atau journey utuh.
- Menghitung sukses dengan kriteria longgar (misalnya 4xx dihitung sukses) sehingga SLO “hijau” sementara pengguna gagal.
- SLI yang **sangat noisy** sehingga tidak stabil untuk SLO bulanan.

### Heuristik pemilihan SLI

- Mulai dari **user journey kritis** (checkout, login, pembayaran).
- Gunakan **golden signals** (latency, traffic, errors, saturation) sebagai bahan mentah, lalu distil menjadi SLI yang bermakna bisnis.
- Dokumentasikan **definisi sukses/gagal** secara eksplisit (status code, timeout, partial success).

## SLO (Service Level Objective)

### Definisi

SLO adalah **target** atau batas performa pada SLI untuk periode evaluasi (mingguan, bulanan, triwulan). Contoh: “99% request API `/orders` dalam 30 hari memiliki latency p99 di bawah 800 ms”.

SLO bukan janji kosong; ia membutuhkan:

- **Pengumpulan data** yang konsisten.
- **Error budget** (lihat bawah) untuk mengelola risiko rilis.
- **Kepemilikan** jelas (siapa yang bertanggung jawab jika budget habis).

### Error budget

Error budget adalah **sisa “ruang gagal”** di bawah target SLO. Jika SLO availability 99,9% per bulan, maka budget error kira-kira 0,1% dari waktu atau request—angka kecil yang harus dikelola dengan disiplin.

Implikasi praktis:

- Jika budget error **menipis**, prioritas bergeser ke **stabilitas** (freeze fitur riskan, fokus remediasi, kurangi deploy agresif).
- Jika budget error **masih besar**, tim bisa menerima risiko lebih tinggi untuk **velocity** (eksperimen, refactor besar) selama tetap diawasi.

Tanpa error budget, SLO hanya angka di dashboard tanpa dampak ke prioritas.

### Window dan agregasi

- **Rolling window** (misal 30 hari terakhir): responsif terhadap degradasi baru.
- **Calendar window** (per bulan): mudah dilaporkan ke bisnis, bisa “reset” tajam di awal bulan.

Pilih window yang selaras dengan cara organisasi mengambil keputusan dan melaporkan ke pelanggan.

### Multi-SLO

Layanan nyata punya beberapa SLO (latency + availability + freshness data). Konflik bisa muncul (optimasi latency merusak konsistensi). Tim perlu **hierarki** atau trade-off tertulis agar on-call tidak adu argumen saat insiden.

## SLA (Service Level Agreement)

### Definisi

SLA adalah **perjanjian** (biasanya kontrak atau lampiran kontrak) antara penyedia layanan dan pelanggan yang mendefinisikan tingkat layanan yang dijanjikan dan **konsekuensi** jika tidak terpenuhi—misalnya kredit layanan, pengembalian dana parsial, atau eskalasi manajemen.

### Hubungan SLA dengan SLO

- Praktik umum: **SLO internal** lebih ketat atau sama dengan komitmen **SLA** ke pelanggan, sehingga ada **buffer** sebelum kontrak dilanggar.
- Jika SLA ditetapkan tanpa SLO internal yang terukur, tim sering **terkejut** saat klaim pelanggan valid tetapi metrik internal tidak selaras.

### Apa yang harus ada di SLA yang sehat

- SLI yang sama artinya dengan pengukuran internal (definisi downtime, excluded maintenance, cara menghitung).
- **Exclusions** yang wajar (force majeure, dependency pelanggan, maintenance terjadwal dengan notice).
- **Remediasi** yang jelas dan tidak mendorong perilaku gaming (misalnya kredit tanpa perbaikan akar).

### Risiko SLA

- **Over-promise**: SLA ketat tanpa arsitektur/on-call yang mendukung → utang operasional dan hukum.
- **Under-specify**: definisi kabur → sengketa interpretasi saat insiden.

## Perbedaan Ringkas (cheat sheet)

| Istilah | Fokus | Contoh |
|--------|--------|--------|
| SLI | Ukuran | % request sukses; % request p95 < 300 ms |
| SLO | Target internal | 99,9% availability per 30 hari |
| SLA | Kontrak + remediasi | 99,5% uptime atau kredit X% |

## Trade-off dan keputusan desain

### Ketat vs longgar

- SLO terlalu ketat → alert noise, tim takut deploy, optimasi prematur.
- SLO terlalu longgar → pengalaman buruk “dianggap OK”, insiden diterima sebagai norma.

### Banyak SLI vs sedikit SLI yang kuat

- Terlalu banyak SLI → fragmentasi perhatian dan dashboard yang tidak actionable.
- Terlalu sedikit → blind spot (misalnya availability hijau tetapi latency buruk).

### Percentile (p95/p99) vs mean

- Mean sering menipu untuk latency; **tail** lebih dekat dengan pengalaman buruk pengguna.
- SLO latency sebaiknya memakai percentile yang disepakati dan diukur dengan metode konsisten.

## Integrasi dengan observability

- **Metrics**: SLI biasanya dibangun dari time series (rate error, histogram latency).
- **Logging/tracing**: berguna untuk **diagnosis** saat SLO terancam, bukan untuk setiap definisi SLI.
- **Alerting**: alarm sebaiknya terhubung ke **SLO burn rate** atau anomali yang berkorelasi dengan pelanggaran SLO, bukan setiap threshold acak.

## Hubungan dengan incident response

- Saat insiden, pertanyaan pertama: **SLO mana** yang terancam? Apakah ini memakan error budget kritis?
- Postmortem sebaiknya merujuk pada **dampak ke SLO** dan langkah agar kejadian serupa tidak menghabiskan budget tanpa peringatan dini.

## Heuristik senior

1. Definisikan **5–10 menit** pertama user journey paling mahal; pilih SLI dari sana.
2. Tetapkan SLO yang **dapat dipertahankan** dengan data historis, bukan angka aspirasional semata.
3. Pisahkan SLO **per boundary** (API publik vs job internal) agar keputusan jelas.
4. Gunakan error budget sebagai **alat negosiasi** dengan produk: fitur vs risiko keandalan.
5. Review SLO **berkala**; sistem berubah, distribusi traffic berubah, target harus ikut berevolusi.

## Pertanyaan interview

### Dasar

- Apa perbedaan SLI, SLO, dan SLA?
- Mengapa availability saja tidak cukup sebagai satu-satunya SLI?
- Apa itu error budget?

### Menengah

- Bagaimana Anda memilih percentile untuk SLO latency?
- Bagaimana Anda menghindari SLO yang tidak selaras dengan pengalaman pengguna?
- Kapan rolling window lebih baik dari calendar window?

### Senior

- Bagaimana Anda menurunkan komitmen SLA ke pelanggan menjadi SLO internal dan roadmap engineering?
- Bagaimana Anda menangani konflik antara beberapa SLO (latency vs throughput)?
- Metrik apa yang Anda gunakan untuk mendeteksi “burn” error budget lebih awal?

## Koneksi ke kasus nyata

- E-commerce: SLO checkout ketat, SLA ke merchant untuk API order status—ketidakselarasan definisi “sukses” menyebabkan klaim kompensasi.
- SaaS B2B: SLA uptime di kontrak, tetapi tim internal tidak punya SLO per endpoint → insiden “kecil” memicu eskalasi pelanggan tanpa peringatan internal.
- Platform data: SLI freshness pipeline; SLO keterlambatan data; SLA ke tim analitik untuk laporan harian.

## Ringkasan brutal

- **SLI tanpa definisi jelas** adalah statistik kosong.
- **SLO tanpa error budget** adalah dekorasi dashboard.
- **SLA tanpa pengukuran yang sama dengan internal** adalah undangan konflik dan panic deploy.

## Checklist pemahaman

- Saya bisa menjelaskan SLI, SLO, dan SLA dalam satu kalimat masing-masing.
- Saya punya contoh SLI konkret untuk layanan yang pernah saya tangani.
- Saya memahami konsep error budget dan implikasinya ke prioritas rilis.
- Saya tahu mengapa SLA eksternal sering membutuhkan buffer di atas SLO internal.
- Saya bisa menghubungkan SLO dengan alerting dan postmortem.

## Penutup

SLI, SLO, dan SLA adalah bahasa bersama antara engineering, produk, dan bisnis. Semakin awal tim memakai bahasa ini dengan definisi yang tegas, semakin sedikit drama saat metrik merah—karena merah itu sudah diberi makna, prioritas, dan batas yang disepakati.

## Referensi perilaku (bukan definisi standar tunggal)

Praktik industri (misalnya Google SRE) menekankan **SLO berbasis SLI** dan pengelolaan **error budget**. Nama dan rumus persis bisa bervariasi antar organisasi; yang tidak boleh bervariasi adalah **kejelasan definisi** dan **keselarasan pengukuran** antara monitoring, keputusan engineering, dan komitmen ke pelanggan.

## Glosarium singkat tambahan

- **Burn rate**: kecepatan konsumsi error budget relatif terhadap ekspektasi; burn tinggi memerlukan respons cepat meskipun SLO bulanan belum “jebol”.
- **Composite SLI**: menggabungkan beberapa sinyal (misalnya availability dan latency) menjadi satu indiktor dengan bobot—berguna tetapi rawan opak jika tidak didokumentasikan.
- **User-centric SLI**: SLI yang diukur dari sisi klien atau synthetic monitoring, melengkapi metrik server-side.

## Contoh numerik sederhana (ilustrasi)

Misalkan 1 juta request per bulan dan SLO availability **99,9%**:

- Request yang “boleh gagal” kira-kira **1.000** dalam bulan itu (0,1% dari 1 juta), jika definisi gagal jelas dan konsisten.
- Jika satu insiden menghapus 800 request gagal dalam satu jam, Anda **tidak** boleh menganggap remeh: budget bulanan hampir habis untuk satu kejadian.

Angka ilustratif ini menunjukkan mengapa insiden “kecil” yang sering berulang sama berbahayanya dengan outage besar sesekali.

## Anti-pattern yang sering terlihat di organisasi

1. **SLO = SLA copy-paste** tanpa margin operasional.
2. **Dashboard SLO** dibuat tanpa runbook atau owner saat pelanggaran.
3. **Alert pada SLI mentah** tanpa konteks budget (misalnya lonjakan singkat yang tidak relevan dengan SLO bulanan).
4. **Tidak ada review** setelah arsitektur berubah (misalnya split service) sehingga SLI tidak lagi merepresentasikan journey pengguna.

## Langkah implementasi minimal di tim

1. Daftar 3–5 journey kritis.
2. Untuk masing-masing, definisikan 1–2 SLI dengan rumus tegas.
3. Tetapkan SLO per kuartal dengan data baseline.
4. Hubungkan alert utama ke **pelanggaran atau risiko pelanggaran** SLO.
5. Rapat bulanan 30 menit: review error budget dan keputusan produk/engineering.

Dengan langkah ini, SLI/SLO/SLA berhenti menjadi materi presentasi dan mulai menjadi **instrumen pengambilan keputusan**.
