# Unit Test, Integration Test, End-to-End Test

## Tujuan

Topik ini penting karena banyak tim punya banyak test tetapi kualitas rilis tetap buruk.
Masalahnya bukan jumlah test, tetapi komposisi dan tujuan tiap level test.

## Kenapa Topik Ini Penting

Jika level test tidak jelas:

- bug lolos ke produksi;
- test suite lambat;
- test flaky;
- tim tidak percaya hasil CI;
- perubahan kecil terasa berisiko tinggi.

## Model Mental yang Benar

Pegang ini:

1. Unit test, integration test, dan E2E test memecahkan jenis risiko berbeda.
2. Tidak ada satu level test yang bisa menggantikan semuanya.
3. Biaya test meningkat saat scope test makin luas.
4. Kecepatan feedback sama pentingnya dengan cakupan.
5. Tujuan utama testing adalah mengurangi ketidakpastian rilis.

## Unit Test

Unit test menguji unit logika kecil secara terisolasi.

Biasanya:

- cepat;
- deterministik;
- mudah dijalankan banyak.

## Kapan Unit Test Bernilai Tinggi

- business rules;
- edge-case logic;
- pure function;
- transformasi data;
- validation logic.

Untuk logic kompleks, unit test memberi ROI besar.

## Keterbatasan Unit Test

Unit test tidak membuktikan:

- wiring antar komponen;
- integrasi dependency nyata;
- konfigurasi runtime;
- contract eksternal.

Jadi unit test tinggi belum berarti sistem teruji end-to-end.

## Integration Test

Integration test memverifikasi interaksi antar komponen nyata:

- app + database;
- app + queue;
- app + external API stub/real sandbox;
- beberapa module bersama.

Tujuannya memastikan wiring dan boundary bekerja.

## Kapan Integration Test Kritis

- query/repository layer;
- transaction flow;
- serialization/deserialization boundary;
- API contract internal;
- side effect antar komponen.

## Keterbatasan Integration Test

- lebih lambat dari unit test;
- setup lebih kompleks;
- bisa lebih flaky jika environment tidak stabil.

Namun ia menangkap bug yang tidak terlihat di unit test.

## End-to-End (E2E) Test

E2E test meniru alur user nyata dari luar sistem.
Contoh:

- login;
- checkout;
- create order sampai notifikasi.

E2E memastikan komponen utama bekerja bersama dalam skenario realistis.

## Nilai E2E

- validasi flow bisnis kritis;
- deteksi regression lintas layer;
- meningkatkan kepercayaan deploy.

## Biaya E2E

- paling lambat;
- paling mahal dirawat;
- paling rentan flaky;
- debugging failure lebih sulit.

Karena itu E2E harus fokus pada happy-path dan risk-path paling kritis.

## Coverage Myth

Coverage tinggi bukan jaminan kualitas.
Anda bisa punya 90% coverage dengan assertion lemah.

Lebih penting:

- test bernilai;
- skenario relevan;
- assertion kuat;
- sinyal failure jelas.

## Test Level Mapping to Risk

Contoh mapping:

- logic domain rumit -> unit test;
- boundary data/dependency -> integration test;
- flow user pendapatan -> E2E.

Mapping ini mencegah over-testing di layer yang salah.

## Feedback Loop

Ideal:

- unit test memberi feedback detik-menit;
- integration test menit;
- E2E lebih lambat tapi terkontrol.

Jika semua andalkan E2E, feedback terlalu lambat.

## Flakiness Management

Flaky test merusak trust.
Penyebab umum:

- race async;
- data test tidak terisolasi;
- time dependency;
- environment tidak stabil.

Flaky test harus diperlakukan sebagai bug prioritas.

## Mocking Strategy

Di unit test, mock bisa masuk akal untuk isolasi.
Di integration test, mock berlebihan bisa menghilangkan nilai integrasi.

Prinsip:

- mock seperlunya;
- jangan mock hal yang justru ingin diverifikasi.

## Test Data Discipline

Kualitas test tergantung kualitas data test:

- data minimal namun representatif;
- include edge case;
- avoid brittle fixtures besar tak terkontrol.

## CI Strategy

Pisahkan jalur test:

- quick checks per PR;
- full suite berkala atau sebelum release.

Tujuan: menjaga kecepatan developer sekaligus quality gate.

## Anti-Pattern Umum

### 1. Semua Didorong ke E2E

Suite jadi lambat dan rapuh.

### 2. Hanya Unit Test

Bug integrasi lolos.

### 3. Coverage Chasing

Fokus angka, bukan nilai.

### 4. Flaky Test Dibiarkan

Tim kehilangan kepercayaan pada CI.

## Heuristik Senior

1. Definisikan risiko utama per fitur.
2. Pilih level test paling murah yang bisa menangkap risiko itu.
3. Simpan E2E untuk flow kritis.
4. Jaga unit test cepat dan fokus logika.
5. Gunakan integration test untuk boundary penting.
6. Eliminasi flaky test secara agresif.
7. Evaluasi test suite sebagai produk: maintainability, signal quality, runtime.

## Pertanyaan Interview

### Dasar

- Apa beda unit, integration, dan E2E test?
- Kenapa ketiganya dibutuhkan?
- Kenapa E2E tidak boleh terlalu banyak?
- Apa masalah flaky test?

### Menengah

- Bagaimana memilih level test untuk fitur baru?
- Kapan mock membantu, kapan merusak?
- Bagaimana menjaga runtime test suite tetap sehat?
- Kenapa coverage bukan indikator tunggal kualitas?

### Senior

- Bagaimana Anda mendesain testing strategy untuk tim yang CI-nya lambat dan tidak dipercaya?
- Bagaimana Anda menyeimbangkan speed vs confidence pada pipeline?
- Bagaimana Anda menentukan flow bisnis mana yang wajib E2E?
- Bagaimana Anda membangun budaya quality yang tidak bergantung pada satu jenis test?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- bug lintas service lolos meski unit test hijau;
- CI membutuhkan 45 menit sehingga developer sering skip test;
- E2E sering flaky sehingga rerun jadi kebiasaan;
- tim berdebat coverage tinggi tetapi incident tetap tinggi.

## Ringkasan Brutal

- Testing strategy bukan soal banyaknya test.
- Ini soal test yang tepat untuk risiko yang tepat.
- Unit cepat, integration realistis, E2E selektif.
- Flaky test adalah utang kualitas yang mahal.
- Engineer senior membangun sistem test yang dipercaya, bukan sekadar memenuhi checklist.

## Checklist Pemahaman

- Saya bisa membedakan tujuan tiap level test.
- Saya tidak mengandalkan satu level test saja.
- Saya tahu kapan E2E perlu dibatasi.
- Saya paham pentingnya feedback cepat di CI.
- Saya menganggap flaky test sebagai masalah serius.

## Penutup

Test yang baik adalah test yang membantu tim berubah cepat tanpa kehilangan kepercayaan pada hasil rilis.
Jika test suite menghambat itu, strateginya perlu diperbaiki.
