# Debugging Production Issue Secara Sistematis

## Tujuan

Dokumen ini menjelaskan pendekatan **terstruktur** untuk mendiagnosis masalah di produksi: mengurangi tebak-tebakan, mempercepat time-to-mitigate, dan menghasilkan bukti yang bisa masuk postmortem tanpa mengorbankan keamanan atau stabilitas.

Debugging acak sering memperburuk insiden (query berat di DB produksi, restart membabi buta, perubahan konfigurasi tanpa rollback path).

## Kenapa Topik Ini Penting

- Produksi adalah lingkungan **berisiko tinggi**; kesalahan diagnosis bisa menjadi insiden kedua.
- Tekanan waktu mendorong shortcut yang meninggalkan **jejak audit buruk**.
- Tim yang punya metode sama mengurangi variansi MTTR antar individu.

## Model Mental

1. **Stabilkan dulu** dampak pengguna bila perlu, baru investigasi dalam.
2. **Hipotesis berbasis sinyal**, bukan cerita linear tanpa bukti.
3. **Batasi blast radius** dari setiap tindakan diagnostik.
4. **Dokumentasikan** langkah dan timestamp untuk handoff dan RCA.
5. **Selesai** berarti mitigasi + pemahaman cukup untuk action item, bukan harus tahu setiap baris penyebab dalam jam pertama.

## Fase nol: konfirmasi masalah nyata

Sebelum deep dive:

- verifikasi alert bukan false positive;
- pastikan gejala masih reproduktif atau ada rentang waktu jelas;
- kumpulkan **scope**: layanan, region, persentase traffic.

Men-debug “noise” membuang kapasitas on-call.

## Fase satu: snapshot konteks (5–15 menit)

Kumpulkan paralel:

- **Metrics**: error rate, latency percentiles, saturation sejak kapan mulai drift.
- **Deploy / change**: versi rilis, feature flag, konfigurasi, skala infrastruktur.
- **Dependency**: status third-party, limit rate, maintenance window.
- **Trace** contoh request bermasalah jika tersedia.

Output fase ini: **timeline** kasar dan satu hipotesis utama.

## Fase dua: narrow the blast radius

Tanyakan:

- apakah masalah **global** atau **segmen** (tenant, shard, AZ)?
- apakah **read path**, **write path**, atau **async worker**?

Pemetaan ini menentukan alat berikutnya (DB slow log vs queue consumer vs CDN).

## Fase tiga: form hipotesis terukur

Format:

- Jika hipotesis A benar, kita akan melihat **S** di metrik/log dalam **T** menit setelah eksperimen kecil X.

Tanpa prediksi terukur, Anda tidak bisa membuang hipotesis dengan cepat.

## Eksperimen diagnostik yang aman

Prinsip:

- **read-only** lebih dulu daripada mutasi;
- **sampling** daripada full scan;
- **time-box** setiap eksperimen (misalnya 10 menit).

Contoh aman:

- query read dengan `LIMIT` dan indeks jelas;
- trace satu `request_id` yang sudah diketahui;
- bandingkan metrik antara replica/canary vs baseline.

Hindari di menit panik:

- `SELECT *` tanpa filter pada tabel besar;
- restart massal tanpa hipotesis;
- menonaktifkan auth atau rate limit “untuk tes”.

## Korelasi: metrics, trace, log

Alur klasik:

1. pilih **endpoint atau job** bermasalah dari metrics;
2. buka **trace** untuk melihat span lambat atau error;
3. ambil **log** dengan `trace_id` / waktu / `host` untuk detail exception.

Jika salah satu pilar hilang, dokumentasikan gap observability sebagai action item.

## Peran perubahan terbaru

Pertanyaan produktif:

- apa yang berubah dalam **jendela korelasi** (kode, data, traffic, infra)?

Gunakan:

- changelog release;
- diff konfigurasi;
- pipeline deployment history.

## Debugging lintas layanan

Untuk arsitektur terdistribusi:

- jangan asumsikan root di layanan yang mem-pager pertama;
- ikuti **dependency graph** dari trace;
- periksa **timeout budget** dan error di boundary call.

Sering bottleneck ada di downstream yang tidak mem-pager sendiri.

## Reproduksi di luar produksi

Jika memungkinkan:

- replay traffic sampling di staging;
- gunakan data **anonim** / subset;
- synthetic test yang meniru skenario.

Reproduksi mengurangi tekanan “live debugging” berkelanjutan.

## Membatasi cognitive load on-call

Praktik:

- satu **scribe** mencatat langkah di channel insiden;
- hindari paralel perintah berbahaya tanpa koordinasi;
- rotasi investigator jika durasi panjang.

## Anti-pattern

### “Coba restart dulu”

Tanpa hipotesis, restart menyembunyikan gejala dan merusak bukti.

### Meng-query produksi berat

Dapat menjadi penyebab insiden kedua.

### Debugging tanpa komunikasi

Stakeholder mendengar kabar dari luar, kepercayaan menurun.

### Fix langsung di server

Tanpa pipeline audit trail—hindari kecuali prosedur break-glass eksplisit.

## Heuristik senior

1. Tulis timeline sebelum menambah kompleksitas.
2. Satu hipotesis aktif; buang atau konfirmasi dengan cepat.
3. Gunakan read-only path dulu.
4. Catat setiap tindakan dengan siapa dan kapan.
5. Akhiri sesi dengan daftar action item observability jika blind spot ditemukan.

## Pertanyaan interview

### Dasar

- Apa langkah pertama Anda saat pager untuk latency?
- Kenapa restart bukan langkah default?

### Menengah

- Bagaimana Anda membedakan masalah di service Anda vs dependency?
- Bagaimana membatasi risiko query diagnostik di DB produksi?

### Senior

- Bagaimana Anda membangun budaya debugging produksi yang aman lintas tim?

## Kasus nyata

- Insiden ganda karena `EXPLAIN` tanpa filter di tabel order 100M rows—mitigasi: read replica diagnostik atau query terbatas.

## Ringkasan brutal

- Debugging produksi tanpa disiplin adalah improvisasi berbahaya.
- Sistematis berarti **hipotesis, bukti, batas risiko, dokumentasi**.

## Checklist

- Saya punya timeline sebelum eksperimen panjang.
- Saya memilih eksperimen read-only atau berisiko rendah dulu.
- Saya menghubungkan metrics, trace, dan log.
- Saya mencatat langkah untuk RCA.

## Penutup

On-call hebat bukan yang paling cepat mengetik perintah, melainkan yang paling cepat **mengurangi ketidakpastian** dengan jejak yang bisa dipercaya.

## Lampiran: skrip pertanyaan lima menit

1. Siapa yang terdampak dan seberapa luas?
2. Mulai kapan metrik menyimpang dari baseline?
3. Apa perubahan terkorelasi dalam ± window yang sama?
4. Apa hipotesis tunggal terkuat sekarang?
5. Apa eksperimen terkecil untuk menguji/menyangkal hipotesis itu?

## Kedalaman: break-glass

Kadang akses atau tindakan luar rutin diperlukan. Syarat:

- persetujuan sesuai kebijakan;
- log tindakan;
- rencana rollback;
- postmortem review prosedur.

Tanpa itu, break-glass menjadi normalitas berbahaya.

## Kedalaman: tooling read-only

Gunakan:

- read-only role DB;
- admin console dengan audit log;
- feature untuk trace sampling admin.

Investasi tooling ini membayar saat malam hari.

## Latihan meja

Simulasikan: error 5xx naik setelah deploy. Tulis timeline dan dua hipotesis dengan eksperimen verifikasi masing-masing.

## Glosarium

- **MTTR**: dipengaruhi langsung oleh kualitas metode debugging dan runbook.
- **Correlation window**: rentang waktu untuk mencocokkan perubahan dengan gejala—terlalu sempit menyesatkan, terlalu lebar membingungkan.

## Penutup manajerial

Dukung tim dengan **waktu** dan **tooling** untuk debugging aman. Tanpa itu, “sistematis” hanya slogan.
