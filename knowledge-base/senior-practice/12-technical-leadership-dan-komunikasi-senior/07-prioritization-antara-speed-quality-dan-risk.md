# Prioritisasi antara Speed, Quality, dan Risk

## Tujuan

Dokumen ini memberi kerangka untuk **prioritisasi** di engineering: kapan mempercepat delivery, kapan menahan laju demi kualitas, dan bagaimana memetakan **risiko** agar keputusan bisa dipertanggungjawabkan.

## Kenapa Topik Ini Penting

- Slogan “move fast and break things” tanpa konteks menghancurkan kepercayaan pengguna.
- Perfeksionisme tanpa konteks menghancurkan peluang bisnis.

## Segitiga yang dipadatkan

Tiga dimensi:

1. **Speed** — time to market.
2. **Quality** — keandalan, maintainability, keamanan.
3. **Risk** — probabilitas × dampak kegagalan.

Keputusan engineering adalah memilih titik pada segitiga untuk konteks saat ini.

## Klasifikasi pekerjaan

### Tier-0 (kritis)

Pembayaran, auth, data sensitif.

Biasanya: kualitas dan kontrol risiko tinggi, speed relatif lebih rendah.

### Tier-1 (core revenue)

Fitur utama yang mempengaruhi konversi.

Seimbang; eksperimen dengan guardrail observability.

### Tier-2 (supporting)

Internal tooling, nice-to-have.

Speed boleh lebih tinggi dengan risiko lebih besar tetapi tetap terukur.

## Kerangka RICE ringkas (adaptasi)

- **Reach**: berapa banyak pengguna/insiden yang terdampak?
- **Impact**: seberapa besar dampak bisnis/teknis?
- **Confidence**: seberapa yakin kita pada estimasi manfaat?
- **Effort**: biaya waktu engineering.

Gunakan untuk membandingkan inisiatif kualitas vs fitur.

## Risk assessment pragmatis

Tanyakan:

- apa skenario terburuk?
- seberapa mudah rollback?
- apakah ada monitoring yang mendeteksi cepat?

Risiko tinggi + deteksi lambat + rollback sulit = turunkan speed.

## Debt intentionally

Utang teknis **terencana** punya:

- owner;
- batas waktu atau trigger pembayaran (misalnya sebelum skala 10x traffic);
- dokumentasi ADR singkat.

Utang tak terencana hanya kekacauan.

## Komunikasi ke stakeholder

Bahas trade-off dalam bentuk:

- “Opsi A rilis 1 minggu lebih cepat dengan risiko X; opsi B lebih lambat dengan mitigasi Y.”

Biarkan stakeholder memilih risiko yang diterima secara eksplisit.

## Anti-pattern

### “Kita selalu prioritaskan kualitas”

Tanpa definisi, berarti tidak ada prioritas.

### Deadline membuat semua menjadi P0

Kehilangan sinyal sebenarnya.

### Risk assessment dokumen panjang untuk setiap bug kecil

Paralisis.

## Heuristik senior

1. Satu daftar prioritas terlihat oleh tim, bukan banyak backlog rahasia.
2. Revisit prioritas saat asumsi berubah (competitor launch, insiden).
3. Ukur outcome, bukan hanya output story point.

## Pertanyaan interview

### Dasar

- Bagaimana Anda memutuskan quick fix vs refactor?

### Menengah

- Bagaimana Anda memprioritaskan pekerjaan platform vs fitur produk?

### Senior

- Bagaimana Anda menangani konflik prioritas antar dua eksekutif?

## Kasus nyata

- Fitur promo dikejar tanpa load test—down saat puncak. Ke depan, promo tier-0 memerlukan checklist performa.

## Ringkasan brutal

- Prioritisasi tanpa **klasifikasi risiko** adalah daftar wishful thinking berlabel roadmap.

## Checklist keputusan

- [ ] Tier layanan jelas.
- [ ] Rollback path ada.
- [ ] Observability cukup untuk risiko yang diterima.
- [ ] Utang terencana terdokumentasi.

## Penutup

Speed, quality, risk bukan musuh—mereka adalah **knob** yang diatur oleh konteks, bukan oleh slogan.

## Kedalaman: portfolio thinking

Sebagian kapasitas sprint dialokasikan untuk reliability “tanpa fitur” agar tidak selalu terdeprioritaskan.

## Kedalaman: opportunity cost

Setiap sprint “fitur baru” berarti tidak melakukan hal lain—nyatakan implisit secara eksplisit.

## Latihan meja

Diberi dua proyek sama effort, satu meningkatkan conversion 1%, satu mengurangi incident 30%—bagaimana Anda membandingkan di konteks startup vs enterprise?

## Glosarium

- **Tier-0**: layanan yang kegagalannya merupakan krisis perusahaan.

## Ekstensi: quantitative risk

Jika data historis ada, perkirakan expected downtime cost vs cost engineering mitigasi.

## Penutup organisasi

Leadership harus menerima bahwa **menolak** pekerjaan adalah bagian dari prioritisasi yang sehat.

## Lampiran: definisi P0/P1

Tulis definisi operasional agar tidak inflasi prioritas.

## Refleksi

Jika semua bug “P1”, sistem prioritas sudah mati—reset definisi dengan data insiden.

## Penutup akhir

Prioritisasi jujur mengakui **trade-off**, bukan berpura-pura semua bisa nomor satu.

## Tambahan: review pasca-mortem prioritas

Setelah insiden, evaluasi apakah prioritisasi sebelumnya salah karena informasi atau karena proses—perbaiki proses yang tepat.

## Tambahan: stakeholder alignment cadence

Sync bulanan product-engineering tentang risiko teknis top 3 mencegah kejutan kuartalan.

## Penutup praktis

Gunakan satu halaman “risk register” hidup per layanan kritikal—bukan slide tahunan yang statis.

## Tambahan: prioritas bergoyang saat insiden

Saat insiden besar, prioritas produk sementara membeku kecuali mitigasi—dokumentasikan perubahan prioritas agar ekspektasi tidak kabur setelah insiden.

## Tambahan: utang teknis terukur

Estimasi rough effort dan dampak defect/velocity untuk item utang membantu product memilih “bayar cicilan” vs “defer” secara sadar.

## Tambahan: cost of delay

Untuk fitur kompetitif, hitung cost of delay kasar (minggu tertunda × estimasi nilai). Angka kasar lebih baik daripada perdebatan tanpa skala.

## Tambahan: risk appetite per perusahaan

Startup early-stage mungkin menerima downtime lebih tinggi untuk learning cepat; fintech mature tidak. Sesuaikan bahasa prioritas dengan appetite risiko organisasi, bukan dogma industri.

## Tambahan: transparansi kapasitas

Tampilkan kapasitas tim nyata (orang × jam fokus) versus komitmen fitur. Overcommitment tersembunyi menghancurkan prioritisasi formal apa pun.

## Penutup operasional

Prioritisasi adalah percakapan berulang, bukan dokumen sekali setahun—refresh saat asumsi traffic atau regulasi berubah.

## Tambahan: “not now” bukan “no”

Dokumentasikan kriteria pemicu untuk menaikkan prioritas item yang ditunda agar tidak menjadi politik diam-diam di koridor.

## Penutup akhir praktis

Tim yang jujur tentang kapasitas dan risiko mendapat kepercayaan lebih besar untuk meminta waktu quality dibanding tim yang selalu janji hijau.

## Tambahan: alignment lintas fungsi

Product, engineering, dan support menyepakati definisi P0 bersama setiap kuartal mengurangi drama saat insiden ganda.

## Penutup refleksi

Jika roadmap selalu slip, periksa apakah masalahnya prioritisasi atau estimasi—dua diagnosis berbeda, dua set perbaikan proses.
