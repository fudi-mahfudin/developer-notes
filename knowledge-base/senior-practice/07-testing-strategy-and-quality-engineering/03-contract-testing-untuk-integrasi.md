# Contract Testing untuk Integrasi

## Tujuan

Topik ini penting karena banyak integrasi gagal bukan karena service mati, tetapi karena kontrak berubah diam-diam.
Contract testing mengurangi risiko ini sebelum produksi.

## Kenapa Topik Ini Penting

Tanpa contract testing:

- provider mengubah response dan consumer rusak;
- perubahan non-breaking secara schema ternyata breaking secara semantic;
- bug integrasi baru terlihat di staging/produksi.

## Model Mental yang Benar

1. Integrasi adalah kesepakatan antar pihak.
2. Kesepakatan harus diuji otomatis.
3. Contract testing melengkapi integration/E2E, bukan menggantikan.
4. Validasi shape saja tidak cukup; behavior penting.
5. Backward compatibility adalah disiplin, bukan niat baik.

## Apa Itu Contract Testing

Contract testing memverifikasi bahwa:

- provider memenuhi kontrak yang diharapkan consumer;
- consumer tidak mengasumsikan hal di luar kontrak.

Biasanya melalui:

- schema checks;
- consumer-driven contract;
- provider verification.

## Consumer-Driven Contract (CDC)

CDC berarti consumer mendefinisikan kebutuhan minimalnya.
Provider memverifikasi kontrak itu terhadap implementasi.

Manfaat:

- perubahan provider lebih aman;
- kebutuhan consumer eksplisit;
- regressions cepat terdeteksi.

## Provider Perspective

Provider tetap perlu:

- versi kontrak jelas;
- kebijakan deprecate;
- test compatibility antar versi.

Provider tidak boleh mengandalkan asumsi "consumer pasti menyesuaikan".

## Shape vs Semantics

Schema valid belum tentu perilaku valid.

Contoh:

- field ada tetapi makna berubah;
- enum nilai baru memecah logic lama;
- default behavior berubah.

Contract test ideal menangkap keduanya sejauh mungkin.

## Request Contract dan Response Contract

Uji dua arah:

- request format/validation;
- response structure/content guarantees;
- status code behavior;
- error shape consistency.

Integrasi sering gagal di error path, bukan happy path.

## Versioning dan Contract

Contract testing membantu saat:

- menambah field;
- menghapus field;
- mengubah type;
- mengubah behavior endpoint.

Dengan pipeline verifikasi, perubahan breaking bisa tertahan sebelum release.

## Where to Run

Contract checks sebaiknya:

- di CI provider;
- di CI consumer;
- sebelum deployment production.

Semakin awal gagal, semakin murah memperbaiki.

## External Partner Integration

Jika partner eksternal tidak mendukung CDC formal:

- gunakan schema validation internal;
- buat canary checks;
- simulasikan kontrak yang Anda butuhkan;
- monitor drift produksi.

Anda tetap butuh guardrail meski kontrol tidak penuh.

## Contract Test Scope

Jangan jadikan contract test seperti E2E penuh.
Fokus:

- boundary contract;
- field/behavior penting;
- compatibility guarantees.

Jika terlalu luas, maintainability turun.

## Anti-Pattern Umum

### 1. Hanya Andalkan Dokumen API

Dokumen bisa out-of-sync.

### 2. Schema Test Saja

Semantic drift lolos.

### 3. Contract Test Terlalu Luas

Jadi rapuh dan mahal.

### 4. Tidak Ada Governance Breaking Change

Contract test ada, proses keputusan tidak ada.

## Heuristik Senior

1. Definisikan kontrak minimal yang benar-benar dipakai consumer.
2. Verifikasi kontrak di pipeline provider.
3. Uji error contract, bukan hanya happy path.
4. Dokumentasikan kebijakan backward compatibility.
5. Gunakan contract test untuk komunikasi lintas tim.
6. Pantau drift antara kontrak dan perilaku produksi.
7. Jangan perluas contract test jadi integration test umum.

## Pertanyaan Interview

### Dasar

- Apa itu contract testing?
- Kenapa integrasi butuh contract test?
- Apa beda schema test dan contract test?
- Kenapa backward compatibility penting?

### Menengah

- Bagaimana CDC bekerja?
- Kapan contract test gagal menangkap masalah?
- Bagaimana menangani semantic changes?
- Bagaimana menerapkan contract testing jika provider eksternal?

### Senior

- Bagaimana Anda membangun governance breaking changes lintas banyak tim?
- Bagaimana Anda mencegah contract test menjadi brittle?
- Bagaimana Anda mengintegrasikan contract testing ke release workflow CI/CD?
- Bagaimana Anda mengukur efektivitas contract testing dalam menurunkan incident integrasi?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- provider menambah perubahan kecil dan consumer crash;
- error payload berubah membuat client parsing gagal;
- tim lintas domain saling menyalahkan saat outage integrasi;
- release provider sering ditunda karena ketidakpastian dampak.

## Ringkasan Brutal

- Integrasi tanpa contract testing adalah kepercayaan buta.
- Dokumen API tanpa verifikasi otomatis tidak cukup.
- Contract testing memaksa kesepakatan menjadi executable.
- Engineer senior memperlakukan kontrak sebagai artefak hidup yang diuji terus-menerus.

## Checklist Pemahaman

- Saya bisa menjelaskan peran contract testing.
- Saya paham perbedaan shape vs semantic compatibility.
- Saya tahu contract check harus masuk pipeline.
- Saya sadar error contract juga harus diuji.
- Saya melihat contract testing sebagai alat kolaborasi lintas tim.

## Penutup

Kontrak integrasi yang tidak diuji akan rusak pada waktu terburuk.
Contract testing adalah investasi kecil untuk mencegah biaya koordinasi dan outage yang jauh lebih mahal.
