# Contract Validation dan Backward Compatibility

## Tujuan

Topik ini penting karena API yang dipakai banyak consumer akan selalu berubah.
Masalahnya bukan perubahan itu sendiri.
Masalahnya adalah perubahan yang diam-diam mematahkan kontrak.

Kalau contract validation lemah:

- breaking change lolos review;
- partner integrasi baru sadar saat production rusak;
- frontend dan backend saling menyalahkan;
- mobile app lama gagal tanpa sinyal jelas;
- tim kehilangan kepercayaan pada kontrak API.

## Kenapa Topik Ini Penting

Setelah API dipakai:

- web frontend;
- mobile app;
- partner;
- internal service;
- batch job;
- admin tools,

setiap perubahan kontrak menjadi keputusan sistem, bukan sekadar refactor lokal.

## Model Mental yang Benar

Pegang ini:

1. Contract adalah janji, bukan hasil samping implementasi.
2. Validation kontrak harus dilakukan sebelum incident, bukan setelah.
3. Backward compatibility adalah strategi menurunkan biaya perubahan.
4. Tidak semua perubahan perlu versi baru, tetapi semua perubahan perlu dievaluasi dampaknya.
5. Semantics sama pentingnya dengan shape.

## Apa Itu Contract

Contract API mencakup:

- URL dan method;
- request shape;
- response shape;
- status code;
- error contract;
- auth expectation;
- pagination/filter semantics;
- behavior edge case.

Kalau salah satu bagian ini berubah, contract bisa ikut berubah.

## Contract Validation

Contract validation berarti memverifikasi bahwa implementasi aktual masih sesuai dengan janji yang diharapkan consumer.

Ini bisa dilakukan lewat:

- schema validation;
- contract test;
- consumer-driven contract;
- static spec diff;
- compatibility checklist di review.

## Backward Compatibility

Backward compatibility berarti consumer lama masih bisa memakai API setelah perubahan tertentu.

Ini sangat berharga karena:

- web frontend dan backend jarang deploy seratus persen sinkron;
- mobile update lambat;
- partner tidak selalu upgrade cepat;
- internal client bisa tersebar.

## Bentuk Breaking Change

Contoh breaking:

- hapus field;
- ubah tipe field;
- ubah status code;
- ubah enum semantics;
- jadikan field wajib;
- ubah auth/permission behavior;
- ubah default filter behavior yang dipakai client.

## Bentuk Non-Breaking yang Umum

Biasanya lebih aman:

- tambah field opsional;
- tambah endpoint baru;
- tambah metadata yang tidak diwajibkan;
- tambah query option baru dengan default lama tetap.

Tetapi hati-hati.
Tambah enum value atau ubah semantic default juga bisa tetap memecahkan consumer tertentu.

## Shape vs Semantics

Banyak tim terlalu fokus pada shape JSON.
Padahal semantics drift sama berbahayanya.

Contoh:

- field `status` tetap string;
- tetapi arti nilainya berubah;
- consumer logic lama jadi salah.

Secara teknis schema bisa terlihat sama.
Secara kontrak, Anda sudah memecahkan consumer.

## Schema Validation

Schema validation membantu memastikan:

- field wajib ada;
- type sesuai;
- nested object sesuai;
- value tertentu legal.

Ini penting untuk:

- request masuk;
- response keluar;
- komunikasi antar service.

## Request Validation

Request validation penting agar API:

- menolak input rusak dengan jujur;
- tidak memproses ambiguity berbahaya;
- menjaga behavior tetap predictable;
- menghasilkan error contract yang konsisten.

API tanpa request validation sering terlihat "fleksibel" sampai data busuk mulai masuk.

## Response Validation

Ini lebih sering diabaikan.
Padahal response validation juga penting, terutama untuk:

- generated client;
- internal platform API;
- typed consumer;
- contract testing.

Kalau backend menganggap response tidak perlu divalidasi, drift bisa lolos diam-diam.

## Producer dan Consumer View

Backend sering merasa:

- "perubahan ini kecil."

Consumer bisa melihat:

- "perubahan ini mematahkan flow inti."

Karena itu backward compatibility harus dilihat dari consumer impact, bukan dari rasa nyaman producer.

## Consumer-Driven Contract

Pendekatan ini berguna saat banyak consumer punya ekspektasi spesifik.

Tujuannya:

- consumer menyatakan kontrak yang mereka butuhkan;
- producer memvalidasi bahwa kontrak itu masih dipenuhi.

Ini sangat membantu untuk mencegah perubahan yang "aman menurut backend" tetapi sebenarnya memecahkan client.

## Versioning Bukan Satu-Satunya Jawaban

Kadang orang berkata:

- "kalau berubah, bikin v2."

Itu malas.

Sebelum versioning, lihat dulu:

- apakah perubahan bisa additive?
- apakah field lama bisa dipertahankan sementara?
- apakah transisi bisa dibuat bertahap?

Versioning adalah alat, bukan pelarian dari discipline compatibility.

## Deprecation Window

Backward compatibility sering berarti:

1. tanda deprecated;
2. komunikasikan perubahan;
3. support dua bentuk sementara;
4. baru hapus versi atau field lama saat aman.

Tanpa transisi ini, perubahan kontrak menjadi brutal.

## Nullable dan Optional Semantics

Banyak breaking change tersembunyi datang dari area ini:

- field dulu selalu ada, sekarang kadang hilang;
- field dulu string, sekarang `null`;
- field dulu optional, sekarang wajib.

Consumer sering memiliki asumsi implicit tentang nullability.
Jangan remehkan.

## Error Contract Juga Harus Stabil

Kalau validasi gagal:

- shape error harus konsisten;
- code harus bisa diandalkan;
- field-level detail bila ada harus stabil.

Perubahan error contract bisa mematahkan UX dan monitoring consumer.

## Backward Compatible by Design

Prinsip sehat:

- tambah daripada ganti;
- longgarkan transisi secara terkontrol;
- jangan ubah makna diam-diam;
- jangan hapus dulu sebelum usage lama turun;
- ukur siapa masih memakai bentuk lama.

## Feature Flag dan Compatibility

Kadang perubahan kontrak perlu rollout bertahap.
Feature flag bisa membantu.
Tetapi hati-hati:

- dua kontrak hidup sekaligus menambah complexity;
- observability harus jelas;
- cleanup harus direncanakan.

## Documentation Drift

Contract validation teknis penting.
Tetapi dokumentasi juga harus ikut dijaga.

Kalau spec berkata satu hal dan implementasi berkata hal lain:

- client bingung;
- support sibuk;
- trust hilang.

## Anti-Pattern Umum

### 1. Ubah Shape Response tanpa Audit Consumer

Ini cara cepat membuat incident.

### 2. Menganggap Tambah Enum Value Selalu Aman

Sering salah.

### 3. Request Validation Longgar, Response Validation Nol

Contract drift tak terdeteksi.

### 4. "Bikin v2" untuk Semua Hal

Version sprawl dan maintenance meledak.

## Heuristik Senior

1. Tinjau perubahan dari sisi consumer, bukan hanya producer.
2. Validasi request dan response.
3. Jangan remehkan semantic change.
4. Gunakan additive change jika masih realistis.
5. Siapkan deprecation window untuk perubahan yang tak bisa dihindari.
6. Lindungi error contract juga.
7. Pantau siapa masih memakai contract lama.

## Pertanyaan Interview

### Dasar

- Apa itu backward compatibility?
- Kenapa contract validation penting?
- Apa contoh breaking change?
- Kenapa response contract juga harus dijaga?

### Menengah

- Kapan additive change cukup?
- Kenapa semantic drift berbahaya?
- Apa risiko optional/nullability berubah?
- Bagaimana contract test membantu?

### Senior

- Bagaimana Anda menilai apakah perubahan API perlu versi baru atau cukup deprecation bertahap?
- Bagaimana Anda melindungi banyak consumer dengan release cadence berbeda?
- Bagaimana Anda mendesain workflow review untuk perubahan kontrak?
- Bagaimana Anda menjelaskan ke tim bahwa "kelihatan kecil" tidak berarti non-breaking?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- frontend web update cepat tetapi mobile tertinggal;
- partner integrasi memakai parsing kaku;
- backend ingin membersihkan response shape lama;
- validation error berubah dan form client rusak.

## Ringkasan Brutal

- Kontrak API harus dijaga seperti janji produksi.
- Breaking change tidak selalu terlihat besar.
- Validation kontrak mencegah surprise mahal.
- Backward compatibility menurunkan biaya perubahan lintas tim dan lintas client.
- Engineer senior tidak mengubah kontrak dengan harapan consumer akan "menyesuaikan sendiri".

## Checklist Pemahaman

- Saya bisa membedakan shape change dan semantic change.
- Saya tahu request dan response sama-sama butuh validation.
- Saya paham pentingnya backward compatibility.
- Saya tidak menganggap versioning sebagai jawaban pertama untuk semua perubahan.
- Saya tahu deprecation window perlu dirancang.

## Penutup

API yang matang bukan API yang tidak pernah berubah.
Ia adalah API yang berubah tanpa mengkhianati consumer secara diam-diam.
