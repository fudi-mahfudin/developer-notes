# Quality Gate, Static Analysis, dan Code Review Heuristics

## Tujuan

Topik ini penting karena kualitas software tidak boleh bergantung pada heroics individu.
Quality gate membangun sistem pencegahan otomatis sebelum bug mencapai produksi.

## Kenapa Topik Ini Penting

Tanpa quality gate:

- standar kode inkonsisten;
- bug dasar lolos berulang;
- review jadi debat subjektif;
- technical debt menumpuk cepat.

## Model Mental yang Benar

1. Quality gate adalah pagar minimum, bukan pengganti engineering judgment.
2. Static analysis menangkap kelas masalah tertentu secara murah.
3. Code review harus fokus risk dan design intent, bukan kosmetik.
4. Gate yang terlalu banyak/noisy merusak produktivitas.
5. Tujuan akhir: mengurangi defect dan meningkatkan consistency.

## Komponen Quality Gate

- linting;
- type checks;
- unit/integration test minimum;
- security scan dasar;
- dependency vulnerability check;
- formatting consistency.

Pilih gate yang memberi sinyal tinggi, bukan hanya checklist panjang.

## Static Analysis Value

Static analysis bagus untuk:

- nullability/type issue;
- unused/dead code;
- code smell umum;
- anti-pattern keamanan tertentu;
- style consistency.

Ia cepat dan bisa dijalankan di setiap PR.

## Batasan Static Analysis

Tidak bisa menangkap:

- intent bisnis salah;
- arsitektur buruk tingkat tinggi;
- race condition kompleks;
- UX regressions.

Jadi static analysis harus dipadukan dengan review manusia.

## Code Review Heuristics

Review efektif fokus pada:

- correctness;
- failure mode;
- security;
- maintainability;
- observability impact;
- backward compatibility.

Komentar soal style sebaiknya diotomasi oleh formatter/linter.

## Risk-Based Review

Tidak semua PR butuh kedalaman sama.

PR high-risk:

- auth/payment;
- data migration;
- concurrency;
- API contract.

PR low-risk:

- typo/docs/refactor lokal.

Alokasi energi review harus proporsional.

## Definition of Done

Gate dan review harus terhubung ke definisi selesai:

- test relevan ada;
- logging/metrics cukup;
- error handling jelas;
- docs perubahan kontrak diperbarui.

Tanpa DoD, gate jadi formalitas.

## CI Integration

Quality gate ideal:

- otomatis;
- cepat;
- hasil jelas;
- mudah ditindaklanjuti.

Gate yang lambat dan sering false-positive akan diakali tim.

## Policy: Blocker vs Warning

Tidak semua rule harus memblokir merge.
Klasifikasikan:

- blocker: keamanan, test gagal, type error kritis;
- warning: style atau smell minor.

Kalau semua blocker, tim akan frustrasi dan bypass culture muncul.

## Code Review Anti-Pattern

### 1. Nitpick Cosmetic

Waktu habis untuk hal otomatis.

### 2. "LGTM" Tanpa Membaca Risiko

Review tidak memberi nilai.

### 3. Terlalu Lama Menahan PR

Meningkatkan batch size dan risiko merge.

### 4. Reviewer Tidak Paham Domain

False confidence.

## Review Checklist Ringkas

- apakah perubahan memecah behavior existing?
- apakah error/failure mode sudah dipikirkan?
- apakah kontrak eksternal berubah?
- apakah test menutup risiko utama?
- apakah ada observability yang hilang?

Checklist sederhana konsisten lebih kuat daripada komentar random.

## Balancing Speed and Quality

Quality gate bukan tujuan untuk memperlambat.
Ia bertujuan:

- mencegah defect murah;
- menjaga flow review terfokus;
- mempercepat delivery jangka panjang.

Jika gate menghambat tanpa value, revisi perlu dilakukan.

## Heuristik Senior

1. Otomatiskan semua hal yang bisa dinilai mesin.
2. Simpan energi review manusia untuk keputusan desain dan risiko.
3. Tetapkan rule blocker secara ketat namun tidak berlebihan.
4. Pantau false-positive rate tools.
5. Pastikan CI feedback cepat dan actionable.
6. Review dengan konteks dampak bisnis, bukan hanya kode lokal.
7. Audit quality gate berkala agar tetap relevan.

## Pertanyaan Interview

### Dasar

- Apa itu quality gate?
- Kenapa static analysis penting?
- Apa beda rule blocker dan warning?
- Kenapa code review tidak boleh fokus style?

### Menengah

- Bagaimana menentukan quality gate minimum untuk tim?
- Kapan static analysis justru mengganggu?
- Bagaimana meningkatkan kualitas code review?
- Bagaimana mengurangi review bottleneck?

### Senior

- Bagaimana Anda merancang governance quality untuk organisasi multi-tim?
- Bagaimana Anda menyeimbangkan strictness gate dan developer velocity?
- Metrik apa untuk menilai efektivitas code review?
- Bagaimana Anda menghentikan budaya "approve cepat tanpa analisis"?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- bug sederhana berulang setiap sprint;
- CI penuh warning yang diabaikan;
- review penuh komentar gaya, isu arsitektur lolos;
- PR menumpuk karena reviewer bottleneck.

## Ringkasan Brutal

- Quality tidak bisa diharapkan dari niat baik semata.
- Gate otomatis + review tajam adalah kombinasi wajib.
- Otomatiskan trivial checks, fokuskan manusia pada risiko tinggi.
- Engineer senior membangun sistem kualitas yang konsisten, bukan mengandalkan pahlawan.

## Checklist Pemahaman

- Saya paham peran quality gate sebagai baseline.
- Saya tahu batasan static analysis.
- Saya punya heuristik review berbasis risiko.
- Saya bisa membedakan blocker dan warning dengan sehat.
- Saya siap mengevaluasi ulang gate jika sinyalnya menurun.

## Penutup

Quality gate yang baik membuat kualitas menjadi default.
Tanpa itu, kualitas hanya jadi harapan yang tidak konsisten.
