# Konfigurasi, Secret, dan Deployment Safety

## Tujuan

Dokumen ini menjelaskan praktik **konfigurasi** dan **secret** yang aman di pipeline dan runtime, serta **deployment safety** (approval, blast radius, verifikasi) agar perubahan produksi dapat diaudit dan diulang.

## Kenapa Topik Ini Penting

- Secret bocor di repo adalah insiden klasik.
- Konfigurasi tak terdokumentasi membuat reproduksi dan rollback mustahil.

## Konfigurasi berlapis

### Default aman

Aplikasi harus berjalan dengan default konservatif (feature off, rate limit reasonable).

### Environment-specific

Override via env vars atau file konfigurasi dengan schema validation di startup.

### Runtime dynamic

Gunakan config service atau flag—dengan audit trail.

## Schema dan validasi

Validasi konfigurasi saat boot:

- tipe data;
- rentang nilai;
- dependensi antar field.

Gagal cepat lebih baik daripada corrupt state diam-diam.

## Secret management

### Jangan di git

Gunakan secret manager (Vault, cloud KMS/secret manager, CI secret).

### Injection

Mount secret sebagai file atau env dari orchestrator—hindari echo ke log.

### Rotasi

Rencanakan rotasi credential berkala dan prosedur darurat jika bocor.

### Least privilege

Token pipeline hanya akses yang diperlukan (registry read/write terpisah).

## Konfigurasi sebagai kode

Simpan definisi infra dan app config (non-secret) di repo dengan review.

Secret references (`secretRef`) bukan nilai plaintext.

## Deployment safety

### Dua orang rule

Perubahan produksi sensitif memerlukan dua persetujuan independen.

### Change window

Untuk sistem legacy rapuh—dokumentasikan trade-off dengan stakeholder.

### Automated verification

Smoke test dan synthetics setelah deploy sebelum dinyatakan selesai.

### Blast radius control

Feature flag, canary, dan limit concurrency untuk batch job berisiko.

## Audit logging

Catat:

- siapa;
- apa;
- kapan;
- hasil verifikasi.

Tanpa audit, postmortem menjadi cerita subjektif.

## Compliance

Beberapa domain memerlukan:

- enkripsi secret at rest dan in transit;
- pemisahan environment key material;
- retensi log akses secret.

## Anti-pattern

### `.env` produksi di Slack

Bocor permanen.

### Secret sama lintas staging dan prod

Compromise staging = compromise prod.

### Konfigurasi ubah langsung di console tanpa repo

Drift konfigurasi.

### Approval ceremonial tanpa reviewer yang paham

Tanda tangan tanpa tanggung jawab.

## Heuristik senior

1. Secret tidak pernah masuk build log—redaksi scanner di CI.
2. Rotasi minimal tahunan atau setelah personel offboarding.
3. Verifikasi otomatis pasca-deploy untuk layanan tier-0.

## Pertanyaan interview

### Dasar

- Kenapa secret tidak boleh di repo?
- Apa beda config dan secret operasional?

### Menengah

- Bagaimana rotasi database password tanpa downtime?
- Bagaimana Anda mencegah secret bocor di artefak image?

### Senior

- Bagaimana model multi-tenant secret di platform internal?

## Kasus nyata

- Token CI dengan scope admin di-commit—compromise supply chain. Mitigasi: secret scanning + permission minimal + rotasi.

## Ringkasan brutal

- Deployment safety adalah **governance + otomasi**, bukan sekadar “ada approval button”.

## Checklist

- [ ] Secret manager digunakan.
- [ ] Validasi config di boot.
- [ ] Audit log perubahan prod.
- [ ] Smoke test otomatis pasca-deploy.

## Penutup

Keamanan konfigurasi adalah bagian dari **defense in depth**—satu lapisan gagal tidak boleh membuka seluruh sistem.

## Kedalaman: sealed secrets / SOPS

GitOps dengan secret terenkripsi memungkinkan review tanpa plaintext—kelola kunci enkripsi dengan hati-hati.

## Kedalaman: emergency access

Break-glass harus rare, logged, dan di-review—tanpa itu, prosedur darurat menjadi pintu belakang permanen.

## Latihan meja

Tulis prosedur rotasi API key third-party dengan zero downtime untuk worker pool.

## Glosarium

- **Drift**: perbedaan antara keadaan aktual infra dan definisi yang diharapkan.

## Ekstensi: policy as code

Validasi manifest sebelum apply: namespace wajib, resource limits wajib, image registry allowlist.

## Penutup organisasi

Platform harus membuat “cara benar” lebih mudah dari “shortcut berbahaya”.

## Lampiran: pre-deploy checklist

- migrasi backward compatible;
- runbook rollback;
- dashboard siap;
- on-call notified.

## Refleksi

Jika setiap deploy membutuhkan ritual manual panjang, otomasi verifikasi lebih dulu daripada menambah engineer “release”.

## Penutup akhir

Konfigurasi dan secret yang rapi mengurangi **ketakutan deploy**—yang sering lebih merusak daripada bug itu sendiri.

## Ekstensi: supply chain

Pin dependencies dan verifikasi image signature—bagian dari safety modern.

## Ekstensi: least privilege runtime

Service account Kubernetes minimal, IAM role per pod—kurangi blast radius compromise.

## Penutup manajerial

Investasi deployment safety terlihat “lambat” di awal tetapi mempercepat **kepercayaan** bisnis pada engineering.

## Lampiran: incident dari config

Dokumentasikan insiden yang disebabkan config drift sebagai argumen untuk GitOps.

## Refleksi akhir

Tim yang tidak bisa menjelaskan dari mana nilai config prod berasal tidak siap untuk scale compliance.

## Penutup teknis

Gunakan typed configuration (misalnya protobuf/JSON schema) bila memungkinkan agar kesalahan unit terdeteksi di CI.

## Ekstensi: blue/green secrets

Rotasi secret saat traffic switch memerlukan koordinasi—jangan anggap atomik tanpa tes.

## Penutup budaya

Transparansi config non-secret dan disiplin secret membangun kepercayaan lintas fungsi.

## Penutup akhir praktis

Mulai dari satu layanan: schema config, secret manager, audit—kemudian replikasi pola, bukan copy-paste chaos.
