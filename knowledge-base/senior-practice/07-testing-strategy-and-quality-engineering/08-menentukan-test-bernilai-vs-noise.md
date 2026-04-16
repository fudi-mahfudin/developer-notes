# Menentukan Test Mana yang Bernilai dan Mana yang Noise

## Tujuan

Topik ini penting karena banyak test suite membesar tetapi confidence tidak naik.
Penyebab utamanya adalah banyak test noise yang tidak memberi sinyal berarti.

## Kenapa Topik Ini Penting

Test noise menyebabkan:

- CI lambat;
- false alarm tinggi;
- reviewer sulit melihat risiko nyata;
- developer mengabaikan failure karena terbiasa noise.

## Model Mental yang Benar

1. Test bernilai menangkap risiko nyata dengan sinyal jelas.
2. Test noise mahal dirawat namun jarang menangkap bug penting.
3. Kualitas test lebih penting dari jumlah test.
4. Test harus dievaluasi secara ekonomi: biaya vs manfaat.
5. Menghapus test noise kadang lebih sehat daripada menambah test baru.

## Ciri Test Bernilai Tinggi

- memverifikasi behavior bisnis penting;
- melindungi incident yang pernah terjadi;
- assertion spesifik dan jelas;
- deterministik;
- failure mudah didiagnosis.

## Ciri Test Noise

- assertion dangkal;
- duplikat coverage test lain;
- brittle ke refactor internal;
- flaky tanpa nilai tambahan;
- setup besar untuk behavior sepele.

## Signal-to-Noise Ratio

Pertanyaan utama:

- saat test gagal, apakah tim belajar sesuatu penting?

Jika jawaban sering tidak, test itu kemungkinan noise.

## Business Criticality Mapping

Test bernilai biasanya ada di area:

- pembayaran;
- auth/authorization;
- data consistency;
- flow onboarding utama;
- compliance path.

Area non-kritis tidak butuh kedalaman test sama.

## Regression-Oriented Testing

Setiap bug mahal yang pernah lolos harus berubah jadi regression test bernilai.
Ini memberi ROI tinggi karena berbasis bukti risiko nyata.

## Maintainability Cost

Test bisa jadi liability jika:

- sulit dibaca;
- sulit diubah;
- tergantung detail implementasi.

Test bernilai harus tetap maintainable.

## Flaky as Noise Multiplier

Satu flaky test bisa menurunkan trust terhadap seluruh suite.
Flaky test yang tidak punya nilai unik sebaiknya dihapus atau didesain ulang.

## Over-Specification Problem

Test yang mengunci urutan call internal tanpa alasan bisnis sering jadi noise.
Ia mematahkan refactor tanpa mencegah bug user-facing.

## Coverage Illusion

Coverage tinggi bisa dibangun dengan banyak test noise.
Jangan pakai coverage sebagai indikator tunggal nilai test.

## Review Test Quality

Saat review PR test, tanya:

- risiko apa yang ditangkap?
- apakah assertion meaningful?
- apakah test stabil?
- apakah test ini redundant?

Jika tidak ada jawaban kuat, kemungkinan noise.

## Test Suite Pruning

Lakukan pruning berkala:

- hapus test redundant;
- gabung test yang terlalu granular tanpa nilai;
- perbaiki atau buang flaky noise;
- fokuskan suite pada high-value checks.

Pruning bukan anti-quality, justru pro-quality.

## Heuristik Senior

1. Setiap test harus punya alasan bisnis/teknis jelas.
2. Prioritaskan test yang menangkap risk mahal.
3. Hindari test yang memverifikasi implementation trivia.
4. Rawat readability test setara production code.
5. Perbaiki noise sources sebelum menambah suite.
6. Jadikan incident history sebagai input utama penambahan test.
7. Berani menghapus test yang tidak lagi bernilai.

## Pertanyaan Interview

### Dasar

- Apa bedanya test bernilai dan test noise?
- Kenapa banyak test belum tentu bagus?
- Apa ciri test flaky yang berbahaya?
- Kenapa assertion quality penting?

### Menengah

- Bagaimana mengevaluasi ROI sebuah test?
- Kapan test layak dihapus?
- Bagaimana mencegah test brittle saat refactor?
- Apa hubungan business criticality dan prioritas test?

### Senior

- Bagaimana Anda membersihkan test suite legacy yang besar namun low-signal?
- Bagaimana Anda meyakinkan tim bahwa menghapus test tertentu itu sehat?
- Metrik apa yang Anda pakai untuk menilai kualitas test suite?
- Bagaimana Anda membangun budaya test yang fokus pada risk reduction?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- CI sering merah karena hal sepele;
- test suite lama membuat tim enggan refactor;
- bug kritis lolos meski coverage tinggi;
- developer terbiasa rerun test tanpa memahami failure.

## Ringkasan Brutal

- Test yang tidak memberi sinyal adalah utang, bukan aset.
- Lebih banyak test bukan otomatis lebih aman.
- Fokus pada test yang melindungi risiko nyata.
- Engineer senior mengelola test suite sebagai portofolio investasi, bukan koleksi tanpa arah.

## Checklist Pemahaman

- Saya bisa mengidentifikasi test noise.
- Saya menilai test dengan lensa risiko dan nilai.
- Saya tidak terjebak coverage vanity metric.
- Saya siap pruning test yang redundant/flaky.
- Saya mengutamakan clarity dan maintainability test.

## Penutup

Kualitas test suite ditentukan oleh sinyalnya saat gagal.
Jika test gagal tidak membantu keputusan engineering, test itu kemungkinan besar noise.

## Latihan Praktis untuk Tim

Untuk membuat topik ini actionable, lakukan latihan mingguan:

1. pilih 10 test yang paling sering gagal;
2. klasifikasikan: bernilai tinggi atau noise;
3. hitung biaya rerun dan waktu investigasi;
4. putuskan: perbaiki, sederhanakan, atau hapus.

Dengan latihan ini, tim belajar melihat test sebagai aset yang harus dioptimalkan.

## Metrik Evaluasi Noise

Metrik sederhana yang bisa dipakai:

- flaky rate per test file;
- rerun count per minggu;
- mean time to diagnose test failure;
- persentase failure yang berujung bug nyata;
- test runtime contribution.

Jika metrik menunjukkan biaya tinggi dengan nilai rendah, test perlu diintervensi.

## Governance Ringkas

Buat aturan ringan:

- test baru harus menyebut risiko yang ditangkap;
- flaky test di atas ambang tertentu wajib diprioritaskan;
- test yang redundant boleh dihapus dengan review;
- PR besar harus menyertakan dampak ke runtime suite.

Governance ringan tetapi konsisten menjaga suite tetap sehat.
