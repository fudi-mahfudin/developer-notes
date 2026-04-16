# Incident Triage dan Rollback Decision

## Tujuan

Dokumen ini menjelaskan **triage insiden** (mengklasifikasi urgensi, dampak, dan langkah pertama) serta **keputusan rollback** sebagai kontrol risiko saat perubahan software memperburuk produksi.

Keduanya sering menentukan apakah insiden berakhir dalam menit atau berjam-jam, dan apakah data pengguna tetap konsisten setelah pemulihan.

## Kenapa Topik Ini Penting

- Waktu awal insiden paling mahal; triage yang lambat memperbesar blast radius.
- Rollback yang salah-bisa memperparah inkonsistensi data atau mengulang bug.
- Keputusan harus dibuat di bawah tekanan; **kerangka** mengurangi panic.

## Model Mental

1. **Stabilkan** (mitigate user impact) sebelum obsess mencari root cause.
2. **Triage** menjawab: siapa commander, seberapa besar dampak, apa hipotesis cepat.
3. **Rollback** adalah salah satu alat mitigasi, bukan tujuan akhir.
4. Setiap rollback punya **biaya** (data migration, feature loss, deploy queue).
5. Dokumentasikan keputusan untuk postmortem.

## Fase triage awal (menit 0–15)

Langkah paralel yang umum:

- tetapkan **incident commander** (satu orang memutuskan arah komunikasi).
- kategorikan **severity** (pengguna tidak bisa checkout vs degradasi minor).
- kumpulkan **fakta cepat**: mulai degradasi, deploy terakhir, flag aktif, dependency status.
- buka **channel komunikasi** terpusat; hindari fragmentasi di banyak DM.

## Klasifikasi dampak

Pertanyaan cepat:

- berapa persen traffic atau segmen pengguna terdampak?
- apakah data integrity terancam?
- apakah ada compliance atau finansial risk?

Klasifikasi memandu apakah perlu **all-hands** atau cukup tim service.

## Hipotesis vs investigasi mendalam

Di awal insiden, gunakan **hipotesis berbasis sinyal**:

- deploy baru + error spike = prioritas cek changelog dan rollback candidate.
- latency tanpa error = prioritas dependency atau resource saturation.

Hindari deep dive tanpa containment jika pengguna masih menderita.

## Rollback: kapan layak

Rollback masuk akal jika:

- perubahan baru sangat berkorelasi dengan gejala;
- rollback path **teruji** dan **reversible**;
- tidak ada migrasi data satu arah yang membuat rollback berbahaya.

Rollback **kurang** layak jika:

- masalah sudah ada sebelum deploy tetapi baru terdeteksi;
- rollback memicu versi schema tidak kompatibel;
- incident disebabkan traffic atau data, bukan kode baru.

## Rollforward sebagai opsi

Kadang **hotfix forward** lebih aman daripada rollback, terutama jika:

- migrasi sudah setengah jalan;
- rollback membutuhkan downtime panjang.

Keputusan ini butuh penilaian risiko eksplisit.

## Data dan konsistensi

Rollback aplikasi tanpa memikirkan:

- job async setengah jalan;
- outbox/event;
- cache invalidation;

dapat meninggalkan sistem dalam state **inkonsisten**. Tanyakan: “setelah rollback, apakah pembacaan/penulisan data masih valid?”

## Komunikasi stakeholder

- update ringkas berkala (frekuensi sesuai severity).
- hindari jargon berlebihan; sertakan ETA jika diketahui, atau katakan tidak diketahui.
- eskalasi ke bisnis jika dampak revenue/compliance jelas.

## Checklist keputusan rollback

- Apakah kita yakin versi sebelumnya sehat (diverifikasi metrik)?
- Apakah ada migrasi DB yang memblok rollback?
- Apakah feature flag bisa mematikan fitur bermasalah tanpa full rollback?
- Siapa yang mengeksekusi rollback dan memverifikasi setelahnya?

## Anti-pattern

### Diskusi tanpa commander

Keputusan lambat dan kontradiktif.

### Rollback tanpa verifikasi baseline

Memutar ke versi lain yang juga rusak.

### Menyembunyikan rollback gagal

Mengaburkan pembelajaran dan memperpanjang insiden.

## Heuristik senior

1. Definisikan playbook triage per layanan kritis.
2. Latih rollback di staging atau game day.
3. Prefer flag kill switch jika tersedia sebelum full rollback.
4. Catat timestamp setiap keputusan besar.

## Pertanyaan interview

### Dasar

- Apa perbedaan triage dan RCA mendalam?
- Kapan rollback vs hotfix?

### Menengah

- Bagaimana menangani rollback dengan migrasi schema?
- Bagaimana komunikasi insiden ke bisnis?

### Senior

- Bagaimana Anda mendesain release agar rollback selalu opsi realistis?

## Kasus nyata

- Rollback API memulihkan error rate tetapi cache lama menyebabkan data stale—mitigasi: flush cache terkontrol atau revalidasi.

## Ringkasan brutal

- Triage buruk memperpanjang penderitaan pengguna.
- Rollback bukan tombol ajaib; itu keputusan risiko data dan operasi.

## Checklist

- Saya punya incident commander dan channel tunggal.
- Saya punya kriteria rollback vs forward.
- Saya memikirkan konsistensi data sebelum memutar versi.

## Penutup

Insiden tidak diukur dari seberapa cepat Anda menemukan root cause pertama kali, melainkan seberapa cepat **dampak pengguna** terkendali. Triage dan rollback adalah alat kendali dampak itu.

## Lampiran: template update status insiden

Gunakan format singkat berulang:

- waktu (UTC);
- gejala saat ini (metrik ringkas);
- tindakan yang sedang berjalan;
- ETA berikutnya atau “belum ada ETA”.

Konsistensi format mengurangi noise komunikasi saat krisis.

## Kedalaman: feature flag sebagai jalan tengah

Sebelum rollback penuh, pertimbangkan:

- mematikan fitur spesifik;
- mengurangi traffic ke jalur baru;
- mengaktifkan mode read-only sementara.

Ini sering lebih cepat dan lebih aman daripada revert seluruh artefak.

## Kedalaman: peran database dalam rollback

Jika insiden melibatkan tulis DB:

- identifikasi apakah transaksi sudah commit;
- apakah compensating action diperlukan;
- apakah backup point-in-time relevan (langkah berat, jarang pertama).

Jangan anggap rollback deploy otomatis memperbaiki data.

## Latihan meja (tabletop)

Simulasikan insiden dengan kartu skenario:

- deploy X + error Y;
- praktikkan triage 10 menit pertama dan keputusan go/no-go rollback.

## Glosarium

- **Commander**: orchestrator komunikasi dan prioritas, bukan satu-satunya implementor.
- **Blast radius**: luas dampak yang ingin Anda minimalkan di menit awal.

## Penutup manajerial

Dukung tim dengan kebijakan yang jelas: kapan rollback boleh dieksekusi tanpa persetujuan multi-layer, kapan butuh CAB. Ambiguitas di sini memakan waktu saat pager berbunyi.

## Tambahan: handoff antar shift on-call

Saat insiden melewati pergantian shift:

- ringkas state saat ini (gejala, hipotesis aktif, perintah yang sudah dijalankan);
- sebutkan keputusan terbuka (rollback tertunda, menunggu data);
- arahkan ke log/trace id penting.

Handoff yang buruk mengulang pekerjaan dan menambah risiko kesalahan manusia di tengah lelah.
