# Alert Fatigue vs Alert Quality

## Tujuan

Dokumen ini menjelaskan perbedaan antara **banyak alert** dan **alert yang bermutu**, serta cara mendesain sistem peringatan yang mendukung on-call tanpa mematikan kepercayaan tim.

Alert fatigue terjadi ketika volume atau noise alert begitu tinggi sehingga respons manusia menurun: diabaikan, di-silence permanen, atau dianggap “palsu” meskipun kadang benar.

## Kenapa Topik Ini Penting

- On-call yang kebal terhadap alarm **kehilangan kemampuan** mendeteksi insiden nyata.
- Alert buruk menambah **biaya operasional** (waktu orang, gangguan malam, turnover on-call).
- **SLO dan error budget** tidak berguna jika alert tidak terhubung ke keputusan yang jelas.

## Model Mental

1. Setiap alert harus memiliki **aksi eksplisit** yang diharapkan dari manusia.
2. **Symptom-based** lebih tahan lama daripada alert pada penyebab dangkal yang sering fluktuatif.
3. **Noise** membunuh signal; prioritas desain adalah mengurangi noise, bukan menambah panel.
4. Alert adalah **kontrak** antara sistem dan on-call: jika tidak dipenuhi, kontrak harus direvisi.
5. Kualitas alert diukur dari **MTTR** dan **false positive rate**, bukan dari jumlah rule.

## Apa Itu Alert Fatigue

Gejala:

- engineer membuka incident channel hanya untuk “ack tanpa baca”;
- alert sering dianggap flaky tanpa investigasi;
- silence grup alert menjadi kebiasaan;
- eskalasi ke manajemen terjadi terlambat karena “sudah biasa merah”.

Penyebab umum:

- threshold terlalu sensitif;
- tidak ada deduplikasi atau grouping;
- alert pada metrik yang tidak terhubung ke pengalaman pengguna;
- tidak ada ownership atau runbook.

## Apa Itu Alert Quality

Alert berkualitas:

- **jelas** (apa layanan, apa gejala, seberapa buruk);
- **actionable** (ada langkah pertama yang terdokumentasi);
- **jarang false positive** relatif terhadap insiden nyata;
- **terhubung** ke SLO atau risiko bisnis;
- memiliki **severity** yang konsisten dengan respons yang diharapkan.

## Dimensi Desain Alert

### Symptom vs cause

- **Symptom**: error rate naik, latency p99 melampaui budget, queue depth meledak.
- **Cause**: disk penuh pada satu node—bisa valid, tapi sering berfluktuasi dan memicu noise.

Mulai dari symptom yang memengaruhi user atau SLO; turunkan ke cause setelah triage.

### Threshold dan durasi

Alert “lonjakan 1 menit” sering noise. Gunakan:

- durasi minimum pelanggaran;
- persentase jendela (misalnya 5 dari 15 menit);
- burn rate multi-window untuk SLO.

### Severity ladder

Definisikan:

- **page** (bangunkan orang): hanya kondisi yang benar-benar membutuhkan respons segera;
- **ticket** (kerjakan jam kerja): degradasi tanpa immediate user outage;
- **info** (dashboard): tren yang perlu awareness.

Campur severity = on-call tidak percaya skala urgensi.

## Hubungan dengan SLO

Alert berkualitas sering dibangun dari:

- **error budget burn**;
- pelanggaran atau risiko pelanggaran SLO;
- anomali pada **golden signals** yang berkorelasi dengan SLO.

Jika alert tidak bisa dijelaskan dalam kalimat “ini memengaruhi SLO X karena …”, pertanyakan apakah alert itu perlu.

## Deduplikasi dan routing

- Gabungkan alert serupa dalam satu incident thread.
- Route berdasarkan **service owner** atau **runbook** default.
- Hindari alert yang sama ke semua channel tanpa filter.

## Runbook sebagai syarat

Tanpa runbook satu halaman untuk alert:

- on-call menebak;
- waktu MTTR membengkak;
- alert terasa “noise” karena tidak ada tindakan standar.

## Anti-pattern

### Alert pada setiap anomaly statistik

Tanpa konteks bisnis, ML anomaly sering false positive tinggi di traffic organik.

### Alert “disk akan penuh dalam 30 hari” ke paging

Salah saluran; itu tiket maintenance.

### Terlalu banyak page untuk satu layanan

On-call tidak bisa membedakan kritis vs noise.

### Tidak pernah review alert setelah insiden

Rule basi menumpuk noise selamanya.

## Heuristik senior

1. Mulai dari SLO dan user journey kritis.
2. Setiap alert baru wajib punya runbook dan owner.
3. Review alert rule berkala; hapus yang tidak pernah menghasilkan tindakan nyata.
4. Pisahkan paging vs ticket vs dashboard.
5. Ukur false positive dan waktu ack-to-action.

## Pertanyaan interview

### Dasar

- Apa itu alert fatigue?
- Apa beda symptom-based dan cause-based alert?
- Kenapa severity penting?

### Menengah

- Bagaimana menghubungkan alert dengan SLO?
- Kapan multi-window burn rate dipakai?
- Bagaimana mengurangi duplicate alert?

### Senior

- Bagaimana Anda merombak alerting legacy tanpa kehilangan cakupan insiden?
- Metrik apa yang Anda gunakan untuk menilai kualitas alerting program?

## Kasus nyata

- Paging setiap restart pod → fatigue; diganti dengan SLO burn dan rate error sustained.
- Alert CPU > 80% → noise; diganti saturation + latency correlation.

## Ringkasan brutal

- Banyak alert bukan prestasi; itu sering tanda desain lemah.
- Alert berkualitas adalah yang **jarang** memanggil manusia tetapi **selalu** layak diperhatikan ketika memanggil.

## Checklist

- Saya bisa menjelaskan aksi untuk setiap alert paging saya.
- Saya punya severity ladder yang konsisten.
- Saya menghubungkan alert utama ke SLO atau risiko bisnis.
- Saya review rule berkala dan menghapus noise.

## Penutup

Perbaikan alerting adalah investasi pada **kepercayaan** on-call. Tanpa kepercayaan, observability Anda hanya koleksi grafik yang tidak mengubah perilaku saat malam hari.

## Lampiran: template satu halaman per alert

Untuk setiap alert paging, dokumentasikan:

- **Trigger**: metrik dan kondisi persis.
- **Dampak**: SLO atau pengguna mana.
- **Langkah 1–3**: cek dashboard mana, query mana, siapa di-escalate.
- **False positive**: kapan boleh abaikan dan kapan harus revisi rule.

Template ini memaksa tim menjawab “actionable atau bukan” sebelum merge rule.

## Konsep lanjutan: multi-burn-rate

Ide burn rate multi-window (pendek + panjang) membantu:

- menangkap degradasi **cepat** (window pendek);
- menghindari noise dari **spike singkat** (window panjang sebagai filter).

Anda tidak wajib mengimplementasikan rumit di hari pertama; prinsipnya adalah **jangan paging pada satu titik metrik tanpa konteks durasi**.

## Konsep lanjutan: alert budget untuk tim

Selain error budget untuk SLO, beberapa tim menggunakan **“alert budget”** informal:

- jumlah paging per layanan per bulan;
- review jika melewati ambang.

Ini memaksa product dan engineering mempertanyakan apakah degradasi diterima atau harus diperbaiki arsitekturnya.

## Failure mode organisasi

- **Tidak ada pemilik alert**: rule ditambah siapa saja, tidak pernah dihapus.
- **Rotasi on-call tanpa transfer pengetahuan**: setiap shift reinvent wheel.
- **Tooling fragmented**: alert di banyak sistem tanpa agregasi.

Perbaikan organisasi sama pentingnya dengan tuning threshold.

## Latihan praktik

1. Ambil 20 alert terakhir; klasifikasikan: actionable vs noise.
2. Pilih 3 noise terbesar; tulis revisi rule atau penghapusan dengan alasan.

Latihan ini biasanya menemukan quick win besar dalam satu sprint.

## Glosarium

- **Flapping**: alert naik-turun threshold cepat → noise; atasi dengan hysteresis atau durasi.
- **Silence**: alat penting tetapi toxic jika permanen; bedakan silence insiden vs silence abadi.

## Penutup operasional

Alert yang bagus membuat on-call **tidak her** saat pager berbunyi. Itu standar yang layak Anda pegang untuk tim Anda sendiri.
