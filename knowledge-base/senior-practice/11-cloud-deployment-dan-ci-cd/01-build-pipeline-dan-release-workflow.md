# Build Pipeline dan Release Workflow

## Tujuan

Dokumen ini menjelaskan bagaimana merancang **build pipeline** dan **release workflow** yang dapat diandalkan: hasil build reproduksibel, jejak audit jelas, dan integrasi dengan praktik keamanan serta rollback.

## Kenapa Topik Ini Penting

- Pipeline lemah menghasilkan artefak “works on my machine”.
- Release ad-hoc meningkatkan risiko insiden dan sulit diaudit.
- Workflow yang jelas mengurangi bottleneck pada satu orang “release master”.

## Komponen build pipeline

### Sumber kode

Trigger dari merge ke branch utama atau tag semver. Hindari build dari branch lokal yang tidak tercatat.

### Dependency resolution

Lockfile (npm, poetry, go.sum) wajib untuk reproduksibilitas.

### Langkah build

- install dependencies dengan checksum;
- compile / bundle;
- unit test cepat;
- static analysis (lint, typecheck);
- security scan (dependency, secret scan).

### Artefak

Output harus **immutability**: digest image atau hash artefak disimpan dan direferensikan deploy.

## Release workflow: definisi

Release workflow adalah urutan disetujui dari:

1. merge / tag;
2. build dan verifikasi;
3. promosi ke environment;
4. verifikasi pasca-deploy;
5. komunikasi status.

Tanpa definisi, “release” berarti hal berbeda untuk setiap orang.

## Branching dan versioning

### Semantic versioning

Gunakan semver untuk library dan API publik agar konsumen memahami breaking change.

### Git tag sebagai sumber kebenaran

Tag rilis memetakan kode ke artefak yang di-deploy.

### Changelog

Otomatisasi dari conventional commit atau manual terkurasi—yang penting ada **human-readable** ringkasan untuk support.

## Quality gate di pipeline

Urutan umum:

1. format/lint cepat;
2. unit test;
3. build artefak;
4. integration test terhadap artefak;
5. optional e2e pada environment ephemeral.

Gagal gate harus **memblok** promosi artefak ke produksi.

## Artefak container

### Multi-stage build

Kurangi ukuran image dan permukaan serangan dengan stage final minimal.

### Non-root user

Jalankan proses aplikasi tanpa root di container.

### Metadata label

Sertakan `org.opencontainers.image.revision` untuk korelasi insiden.

## Reproducible builds

Prinsip:

- pin base image digest;
- lock dependencies;
- hindari `apt-get upgrade` tak terkontrol di build produksi tanpa kebijakan.

Build yang tidak reproduksibel menyulitkan RCA ketika artefak hilang.

## Pipeline sebagai kode

Definisikan pipeline di repo (YAML, DSL) dengan:

- review peer;
- versioning;
- environment variables terdokumentasi.

## Secrets di pipeline

- gunakan secret store CI, bukan plaintext di YAML;
- rotasi credential pipeline;
- least privilege token untuk registry dan cluster.

## Observability pipeline

Metrik build:

- durasi stage;
- failure rate per stage;
- queue time.

Alert jika durasi atau failure naik—pipeline lambat adalah bottleneck rilis.

## Anti-pattern

### Build dan test hanya di laptop

Tidak ada bukti objektif sebelum produksi.

### Deploy dari branch random

Sulit dilacak dan di-rollback.

### Skip test “karena urgent”

Menormalisikan bypass gate.

### Artefak mutable

Overwrite tag image yang sama merusak jejak audit.

## Heuristik senior

1. Satu artefak per rilis, dipromosikan lintas environment.
2. Gate gagal = tidak deploy.
3. Dokumentasikan siapa yang bisa bypass dan kapan (break-glass).
4. Ukur pipeline; optimalkan bottleneck nyata, bukan micro-optimasi.

## Pertanyaan interview

### Dasar

- Apa beda CI dan CD?
- Kenapa lockfile penting?

### Menengah

- Bagaimana Anda memisahkan build, test, dan deploy dalam pipeline?
- Bagaimana Anda memastikan artefak yang di-deploy sama dengan yang diuji?

### Senior

- Bagaimana Anda mendesain pipeline untuk monorepo besar dengan banyak layanan?

## Kasus nyata

- Tim deploy dari `main` terbaru tanpa tag—insiden tidak bisa direplikasi dengan commit tepat. Mitigasi: immutable tag + artefak tersimpan.

## Ringkasan brutal

- Pipeline yang baik adalah **kontrak** antara dev dan operasi: bukti, bukan janji.

## Checklist

- [ ] Artefak immutable dengan digest.
- [ ] Lockfile dan base image ter-pin.
- [ ] Gate keamanan minimal ada.
- [ ] Metrik durasi build tersedia.

## Penutup

Release workflow bukan dokumentasi statis; ia hidup bersama arsitektur dan harus direview saat layanan bertambah.

## Kedalaman: monorepo vs polyrepo

Monorepo membutuhkan caching build dan selective test; polyrepo membutuhkan koordinasi versi dependency. Pilih tooling yang sesuai, bukan mode yang populer.

## Kedalaman: signed artefak

Tanda tangani image atau binary dan verifikasi di deploy untuk mengurangi risiko supply chain.

## Kedalaman: hotfix path

Hotfix harus tetap melalui pipeline minimal atau prosedur break-glass terdokumentasi dengan postmortem wajib.

## Latihan meja

Gambar alur dari merge hingga produksi untuk layanan kecil. Tandai gate dan artefak di setiap langkah.

## Glosarium

- **CD**: continuous delivery (siap deploy) vs continuous deployment (otomatis ke prod)—bedakan eksplisit di tim.

## Ekstensi: database migration di pipeline

Migrasi skema perlu strategi backward compatible dan urutan deploy vs aplikasi—koordinasikan dengan workflow rilis, bukan sebagai afterthought.

## Ekstensi: compliance

Beberapa industri memerlukan SBOM dan rekaman build. Rencanakan export artefak metadata sejak awal.

## Penutup organisasi

Investasi pipeline membayar sebagai **pengurangan insiden** dan **peningkatan kepercayaan** rilis.

## Lampiran: definisi “done” rilis

- artefak tersimpan;
- tag dibuat;
- changelog diperbarui;
- dashboard baseline direkam;
- rollback path diketahui.

## Refleksi

Jika tim takut deploy, masalahnya sering workflow dan bukan “kurang heroisme”.

## Penutup akhir

Build pipeline yang matang mengubah rilis dari ritual menegangkan menjadi **operasi biasa** dengan bukti.
