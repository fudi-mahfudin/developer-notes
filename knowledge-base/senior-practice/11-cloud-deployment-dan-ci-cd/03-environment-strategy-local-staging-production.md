# Environment Strategy: Local, Staging, Production

## Tujuan

Dokumen ini menjelaskan strategi **environment** dari mesin developer hingga produksi: tujuan masing-masing, batasan paritas, data, dan bagaimana menghindari kebingungan “staging green, prod red”.

## Kenapa Topik Ini Penting

- Environment yang tidak jelas membuat bug reproduksi mustahil.
- Data produksi di staging tanpa kontrol adalah risiko compliance.
- Terlalu banyak environment tanpa owner memakan biaya tanpa nilai.

## Local

### Tujuan

Feedback cepat untuk developer: unit test, lint, partial integration.

### Batasan

Tidak meniru skala produksi, jaringan, atau data penuh.

### Praktik baik

- docker compose untuk dependency lokal;
- seed data sintetis;
- script `make dev` yang konsisten.

## Staging / Pre-production

### Tujuan

Validasi integrasi, uji regresi, rehearsal deploy, demo stakeholder.

### Jenis umum

- **shared staging**: murah, risiko interferensi antar tim;
- **ephemeral environment**: per PR atau per branch—lebih mahal, lebih terisolasi.

### Paritas

Prioritaskan:

- versi dependency sama;
- konfigurasi fitur utama sama;
- ukuran resource mendekati subset produksi yang representatif.

Paritas 100% sering tidak layak secara biaya—dokumentasikan celah.

## Production

### Tujuan

 Melayani pengguna dengan SLO, keamanan, dan audit.

### Prinsip

- perubahan melalui pipeline;
- akses manusia minimal dan terlog;
- observability wajib.

## Data strategy

### Jangan copy raw prod ke staging default

Gunakan:

- subset anonim;
- synthetic generator;
- refresh terjadwal dengan pipeline privasi.

### Exception

Break-glass investigasi dengan approval dan retensi pendek.

## Konfigurasi per environment

Gunakan:

- variabel environment dengan schema;
- secret manager berbeda per env;
- feature flag default aman.

Dokumentasikan perbedaan eksplisit (rate limit, URL third-party sandbox).

## Naming dan ownership

Nama environment harus konsisten di semua alat (CI, Terraform, dashboard).

Setiap environment non-local punya **owner on-call** atau tim platform.

## Promosi artefak

Promosi yang baik:

- artefak sama (digest) dari staging ke prod;
- konfigurasi berbeda via env/secret, bukan rebuild berbeda tanpa alasan.

## Anti-pattern

### “Staging adalah mini prod tanpa data”

Tanpa data representatif, bug data-shape tidak terdeteksi.

### Staging dipakai sebagai backup DB

Bukan tujuan staging.

### Terlalu banyak environment “QA1, QA2, QA3” tanpa kejelasan

Menghambat reproduksi bug.

### Konfigurasi staging meniru prod termasuk secret produksi

Risiko kebocoran ganda.

## Heuristik senior

1. Mulai dari ephemeral staging per PR jika tim > beberapa developer paralel.
2. Dokumentasikan perbedaan paritas yang disengaja.
3. Ukur biaya environment bulanan; sunyi yang tidak dipakai.

## Pertanyaan interview

### Dasar

- Apa perbedaan tujuan local vs staging?
- Kenapa data prod tidak ideal di staging?

### Menengah

- Bagaimana Anda memilih shared staging vs ephemeral?
- Bagaimana Anda menjaga secret berbeda antar env?

### Senior

- Bagaimana strategi environment berubah saat tim dari 5 menjadi 50 engineer?

## Kasus nyata

- Bug hanya muncul di prod karena staging menggunakan DB single-node sedangkan prod sharded—paritas arsitektur data diperbaiki.

## Ringkasan brutal

- Environment strategy adalah **kontrak data, konfigurasi, dan paritas**—bukan sekadar jumlah cluster.

## Checklist

- [ ] Ada dokumentasi perbedaan staging vs prod.
- [ ] Secret terpisah dan rotasi.
- [ ] Tidak ada copy data sensitif default.
- [ ] Artefak promosi jelas.

## Penutup

Staging yang tidak dipercaya menghancurkan kepercayaan pada pipeline—perbaiki paritas atau ubah ekspektasi secara eksplisit.

## Kedalaman: multi-region

Production multi-region menambah environment DR dan possibly read replica staging—perlu anggaran dan runbook tersendiri.

## Kedalaman: compliance environment

Beberapa industri memerlukan environment khusus audit—isolasi jaringan dan akses.

## Latihan meja

Daftar tiga bug historis yang “hanya di prod”. Apakah environment strategy yang lebih baik akan menangkapnya?

## Glosarium

- **Ephemeral**: environment sementara, dibuang setelah PR merge.

## Ekstensi: preview URL

Preview per PR membantu review UX tetapi perlu isolasi data dan rate limit.

## Penutup organisasi

Platform team harus menyediakan template environment agar setiap service tidak menemukan roda sendiri.

## Lampiran: environment matrix

| Aspek | Local | Staging | Prod |
|-------|-------|---------|------|
| Data | Synthetic | Anonymized subset | Real |
| Scale | Kecil | Medium | Full |
| Access | Developer | Team + QA | Restricted |

## Refleksi

Jika QA selalu mengatakan “cannot reproduce”, periksa environment sebelum menyalahkan QA.

## Tambahan: kontrak environment per layanan

Setiap layanan sebaiknya punya dokumen satu halaman yang menjawab:

- versi runtime (Node, JVM, glibc) di staging vs prod;
- variabel wajib dan default aman;
- dependensi eksternal (URL sandbox vs live) dan cara switch;
- batasan data yang boleh dipakai untuk skenario uji.

Kontrak ini dipakai saat onboarding engineer baru dan saat insiden “hanya di staging”.

## Tambahan: biaya vs nilai environment tambahan

Setiap environment baru harus punya pemilik dan KPI penggunaan (deploy per minggu, jam aktif).

Environment yang tidak pernah dipakai untuk gate rilis sebaiknya dimatikan atau digabung agar biaya cloud tidak membengkak tanpa feedback teknis.

## Penutup akhir

Strategi environment yang jujur tentang trade-off lebih bernilai daripada janji paritas sempurna yang tidak pernah benar.
