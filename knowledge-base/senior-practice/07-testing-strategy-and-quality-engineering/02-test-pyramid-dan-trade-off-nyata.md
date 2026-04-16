# Test Pyramid dan Trade-off Nyata

## Tujuan

Topik ini penting karena banyak tim menghafal "test pyramid" tetapi gagal menerjemahkannya ke keputusan praktis.
Pyramid bukan dogma; ia alat berpikir biaya vs kepercayaan.

## Kenapa Topik Ini Penting

Jika komposisi test salah:

- CI lambat;
- flaky tinggi;
- bug penting tetap lolos;
- developer kehilangan kepercayaan pada suite test.

## Model Mental yang Benar

1. Semakin tinggi level test, semakin realistis, semakin mahal.
2. Semakin rendah level test, semakin cepat, semakin sempit cakupan.
3. Strategi sehat mencari kombinasi, bukan absolut.
4. Test pyramid adalah guidance, bukan hukum fisika.
5. Trade-off harus eksplisit terhadap risiko produk.

## Inti Test Pyramid

Secara umum:

- banyak unit test;
- cukup integration test;
- sedikit E2E test yang sangat bernilai.

Alasan:

- menjaga feedback cepat;
- tetap menangkap bug integrasi;
- memvalidasi flow kritis end-to-end.

## Kenapa Tidak "Semua E2E"

E2E memang realistis, tetapi:

- lambat;
- rapuh;
- mahal dirawat;
- sulit diagnosis.

Jika terlalu dominan, tim akan takut menyentuh test suite.

## Kenapa Tidak "Hanya Unit"

Unit test tidak memvalidasi:

- wiring;
- konfigurasi;
- contract antar sistem;
- perilaku runtime nyata.

Tanpa integration/E2E, bug boundary mudah lolos.

## Trade-off Nyata

### Kecepatan vs Realisme

- Unit: cepat, kurang realistis.
- E2E: realistis, lambat.

### Biaya Maintenance vs Confidence

- E2E coverage luas meningkatkan confidence;
- tetapi maintenance cost bisa meledak.

### Isolasi vs Sistemik

- Unit bagus untuk isolasi bug logic;
- integration/E2E bagus untuk bug sistemik.

## Context Matters

Komposisi ideal berbeda untuk:

- library domain logic;
- backend API;
- frontend app;
- platform dengan banyak integrasi eksternal.

Satu formula persentase untuk semua tim adalah pendekatan malas.

## Risk-Based Composition

Mulai dari risiko:

- risiko logika domain -> unit;
- risiko boundary data -> integration;
- risiko alur bisnis kritis -> E2E.

Ini lebih sehat daripada "target 80% semua layer".

## Pyramid vs Trophy

Beberapa tim mengusulkan "testing trophy" (lebih banyak integration).
Intinya bukan memilih simbol.
Intinya:

- cari level test dengan signal terbaik untuk biaya yang masuk akal.

Jika integration memberi value besar di stack Anda, naikkan porsi integration secara sadar.

## Flaky Cost Awareness

Trade-off yang sering dilupakan:

- satu E2E flaky bisa membunuh produktivitas tim lebih dari puluhan unit test yang missing.

Kualitas sinyal test lebih penting dari jumlah test.

## Runtime Budget

Tetapkan budget waktu suite:

- PR checks harus cepat;
- full regression bisa lebih lama tapi terjadwal.

Tanpa runtime budget, pyramid mudah runtuh ke suite lambat.

## Evolution Over Time

Komposisi test harus dievaluasi periodik:

- apakah bug dominan lolos di layer tertentu?;
- apakah suite makin flaky?;
- apakah area kritis belum punya perlindungan?

Pyramid bukan setup sekali lalu selesai.

## Anti-Pattern Umum

### 1. Dogma Persentase Kaku

Mengabaikan konteks risiko nyata.

### 2. Coverage Number Worship

Angka naik, confidence tidak.

### 3. Menumpuk E2E untuk Semua Skenario

Biaya meledak, tim frustasi.

### 4. Tidak Review Efektivitas Test

Suite tumbuh tanpa arah.

## Heuristik Senior

1. Mulai dari bug yang paling mahal jika lolos.
2. Gunakan level test termurah yang masih menangkap risiko.
3. Jaga jalur PR tetap cepat.
4. Simpan E2E untuk journey kritis.
5. Kurangi test yang noisy atau redundant.
6. Ukur flakiness sebagai metrik kualitas.
7. Perbarui komposisi saat arsitektur berubah.

## Pertanyaan Interview

### Dasar

- Apa itu test pyramid?
- Kenapa E2E tidak boleh mendominasi?
- Kenapa unit test saja tidak cukup?
- Apa trade-off utama antar level test?

### Menengah

- Bagaimana menentukan distribusi test untuk service baru?
- Kapan integration test harus ditambah?
- Bagaimana menangani suite E2E yang lambat?
- Metrik apa untuk menilai kualitas test suite?

### Senior

- Bagaimana Anda merancang strategi test untuk tim besar multi-service?
- Bagaimana Anda menyeimbangkan confidence dan kecepatan delivery?
- Bagaimana Anda memutuskan test mana yang dihapus karena tidak bernilai?
- Bagaimana Anda mengubah budaya tim dari coverage-oriented ke signal-oriented?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- PR pipeline memakan >30 menit;
- E2E flaky menjadi alasan merge tertunda;
- bug integrasi sering lolos meski unit hijau;
- tim menambah test terus tetapi incident tidak turun.

## Ringkasan Brutal

- Test pyramid adalah alat ekonomi engineering.
- Tujuannya bukan estetika komposisi test, tapi signal terbaik dengan biaya realistis.
- Komposisi harus risk-based, bukan angka dogmatis.
- Engineer senior merawat test suite sebagai sistem produksi kedua.

## Checklist Pemahaman

- Saya paham trade-off utama tiap level test.
- Saya tidak memakai test pyramid secara dogmatis.
- Saya menilai test berdasarkan signal dan biaya.
- Saya menjaga runtime/falakiness sebagai kualitas inti.
- Saya siap menyesuaikan komposisi test seiring perubahan sistem.

## Penutup

Pyramid yang sehat bukan yang paling indah di slide.
Pyramid yang sehat adalah yang membantu tim release cepat dengan confidence nyata.
