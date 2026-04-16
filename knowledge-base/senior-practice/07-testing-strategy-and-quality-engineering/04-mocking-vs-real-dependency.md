# Mocking vs Real Dependency

## Tujuan

Topik ini penting karena keputusan mock vs real dependency sangat memengaruhi kualitas sinyal test.
Mock berlebihan membuat test hijau palsu.
Real dependency berlebihan membuat test lambat dan rapuh.

## Kenapa Topik Ini Penting

Jika salah pilih:

- bug integrasi lolos;
- CI jadi lambat;
- test sulit dirawat;
- developer salah percaya hasil test.

## Model Mental yang Benar

1. Mock adalah alat isolasi, bukan default absolut.
2. Real dependency memberi realisme, tetapi biayanya lebih tinggi.
3. Pilih berdasarkan tujuan test dan risiko yang ingin ditangkap.
4. Jangan mock hal yang justru ingin diverifikasi.
5. Strategi sehat biasanya campuran, bukan ekstrem.

## Kapan Mock Tepat

Mock cocok untuk:

- unit test logic murni;
- dependency lambat/acak;
- error path sulit dipicu;
- isolasi behavior kecil.

Tujuan: feedback cepat dan deterministik.

## Kapan Real Dependency Tepat

Real dependency (atau environment mendekati real) cocok untuk:

- integration test boundary;
- query dan transaction behavior;
- serialization contract;
- wiring konfigurasi.

Tujuan: deteksi mismatch nyata.

## Fake, Stub, Mock

Penting membedakan:

- stub: jawaban sederhana;
- mock: verifikasi interaksi/expectation;
- fake: implementasi ringan menyerupai dependency.

Banyak kebingungan test berasal dari istilah yang dicampur.

## Risiko Over-Mocking

- test mengunci implementation detail;
- refactor kecil mematahkan banyak test;
- behavior real dependency tidak tervalidasi;
- false confidence tinggi.

Over-mocking membuat test suite terlihat kuat padahal rapuh.

## Risiko Over-Real

- setup kompleks;
- runtime lama;
- flaky karena environment;
- sulit debugging.

Semua test real dependency juga bukan solusi.

## Boundary-Oriented Strategy

Prinsip praktis:

- di unit test: mock boundary keluar;
- di integration test: real-kan boundary penting;
- di E2E: real flow semaksimal relevan.

Ini menjaga keseimbangan kecepatan dan realisme.

## External API Testing

Untuk external API:

- unit: mock/fake untuk logic handling;
- integration: sandbox/stub contract-based;
- production safety: monitoring + canary.

Anda jarang bisa mengandalkan real API eksternal untuk seluruh suite CI.

## Database Example

Unit test repository logic dengan mock bisa cepat.
Tapi behavior query/transaction harus diuji dengan DB nyata (atau sangat mendekati) di integration test.

Jika tidak, bug SQL/transaction lolos.

## Time and Randomness

Waktu, random, dan network adalah sumber nondeterminism.
Mock/fake sering tepat untuk menstabilkan test.

Tetapi jangan sampai mocking menghapus verification atas contract penting.

## Interaction vs State Assertion

Mock sering mendorong interaction assertion berlebihan.
Lebih sehat fokus ke observable outcome ketika memungkinkan.

Interaction assertion hanya saat interaksi itu memang bagian kontrak penting.

## Contract Drift Risk

Jika semua test consumer memock provider, drift kontrak mudah lolos.
Di sinilah contract/integration test dengan dependency yang lebih real jadi penting.

## Anti-Pattern Umum

### 1. Mock Everything

Hasil: hijau palsu.

### 2. Real Everything

Hasil: suite lambat dan rapuh.

### 3. Assert Call Count Berlebihan

Refactor jadi sulit tanpa nilai bisnis.

### 4. Tidak Ada Layered Strategy

Tim bingung kapan pakai apa.

## Heuristik Senior

1. Tentukan tujuan test dulu, baru pilih mock/real.
2. Mock untuk isolasi logic, real untuk validasi boundary.
3. Lindungi integration points dengan test non-mock.
4. Hindari coupling test ke detail implementasi internal.
5. Jaga test tetap deterministik dan cepat.
6. Evaluasi false positive/false negative dari strategi test Anda.
7. Dokumentasikan guideline agar tim konsisten.

## Pertanyaan Interview

### Dasar

- Kapan sebaiknya memakai mock?
- Apa risiko over-mocking?
- Kenapa real dependency penting?
- Apa bedanya mock dan stub?

### Menengah

- Bagaimana menyeimbangkan kecepatan test dan kepercayaan hasil?
- Kapan interaction assertion memang diperlukan?
- Bagaimana mengetes integrasi external API tanpa membuat CI rapuh?
- Kenapa database test tidak cukup dengan mock repository?

### Senior

- Bagaimana Anda menetapkan testing guideline mock vs real untuk tim besar?
- Bagaimana Anda memperbaiki suite yang terlalu banyak over-mocking?
- Bagaimana Anda mengukur bahwa strategi test saat ini memberi confidence nyata?
- Bagaimana Anda menghindari brittle test saat refactor arsitektur besar?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- unit test hijau tetapi integrasi gagal di staging;
- setiap refactor mematahkan ratusan test karena verifikasi call detail;
- CI terlalu lambat karena hampir semua test mengandalkan environment penuh;
- tim bingung standar kapan harus mock.

## Ringkasan Brutal

- Mock dan real dependency keduanya alat, bukan ideologi.
- Pilihan yang benar bergantung pada risiko yang ingin ditangkap.
- Over-mocking menipu; over-real menghambat.
- Engineer senior membangun strategi berlapis yang menjaga kecepatan sekaligus kepercayaan.

## Checklist Pemahaman

- Saya tahu kapan mock masuk akal.
- Saya tahu kapan real dependency wajib.
- Saya tidak lagi memock boundary penting secara membabi buta.
- Saya paham risiko interaction assertion berlebihan.
- Saya bisa menyusun strategi mock vs real lintas level test.

## Penutup

Pertanyaan "mock atau real?" hampir selalu dijawab "tergantung tujuan test".
Kematangan engineering terlihat dari seberapa sadar tim terhadap trade-off itu.
