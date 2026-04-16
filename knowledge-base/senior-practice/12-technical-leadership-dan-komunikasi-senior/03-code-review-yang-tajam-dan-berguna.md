# Code Review yang Tajam dan Berguna

## Tujuan

Dokumen ini menjelaskan bagaimana melakukan **code review** yang meningkatkan kualitas sistem, kecepatan belajar tim, dan keamanan—tanpa menjadi arena ego atau nitpick kosmetik.

## Kenapa Topik Ini Penting

- Review buruk memperlambat merge tanpa mengurangi bug.
- Review yang hanya style tanpa substansi membuang fokus.

## Tujuan review (urutan prioritas)

1. **Kebenaran** dan edge case.
2. **Keamanan** dan privasi data.
3. **Operabilitas** (logging, metrik, failure mode).
4. **Maintainability** jangka panjang.
5. **Style** konsisten dengan codebase—setelah hal di atas.

## Komentar yang actionable

Format baik:

- “Jika `user` null di sini, kita throw—apakah caller menangkap?”
- “Pertimbangkan timeout pada HTTP call ini agar tidak hang worker.”

Format buruk:

- “Ini jelek.”
- “Saya tidak suka.”

## Tingkat kekerasan sesuai risiko

PR yang menyentuh pembayaran atau auth memerlukan scrutinity lebih tinggi daripada rename copy.

## Ukuran PR

PR kecil lebih mudah direview bermakna.

Jika PR besar tak terhindari, minta penulis menunjuk area risiko tertinggi di deskripsi.

## Nitpick style

Otomatiskan dengan formatter/linter; review manusia untuk logika.

Jika menyarankan gaya minor, batch dalam satu komentar akhir atau approve dengan nit optional.

## Budaya balas komentar

Penulis menjawab dengan:

- perubahan kode;
- atau penjelasan mengapa tidak diubah dengan trade-off.

Komentar tanpa resolusi membusuk.

## Reviewer rotasi

Jangan hanya staff paling senior—distribusikan beban dan keterampilan.

## Waktu respons

SLA tim: misalnya review dalam satu hari kerja untuk PR non-darat.

## Keamanan checklist singkat

- input validation;
- query parameterized;
- secret tidak di log;
- otorisasi per resource.

## Anti-pattern

### Bike-shedding

Debat panjang pada hal trivial.

### Approval tanpa membaca

Rubber stamp.

### Komentar personal

Menyerang penulis, bukan kode.

### “Tulis ulang total” tanpa konteks

Demotivasi kecuali benar-benar diperlukan.

## Heuristik senior

1. Mulai dari ringkasan keseluruhan PR, baru detail.
2. Apresiasi bagian yang bagus—mengajar melalui reinforcement.
3. Tandai komentar blocking vs non-blocking eksplisit.

## Pertanyaan interview

### Dasar

- Apa yang Anda cari pertama dalam PR backend?
- Bagaimana Anda memberi feedback keras tanpa merendahkan?

### Menengah

- Bagaimana Anda menangani PR besar dari engineer junior?

### Senior

- Bagaimana Anda mengukur efektivitas proses review tim?

## Kasus nyata

- Bug SQL injection lolos karena review hanya fokus naming—checklist keamanan ditambahkan ke template PR.

## Ringkasan brutal

- Code review yang baik adalah **transfer risiko ke diskusi terdokumentasi**, bukan teater gatekeeping.

## Checklist reviewer

- [ ] Saya memahami tujuan PR dari deskripsi.
- [ ] Saya memeriksa jalur error dan logging.
- [ ] Saya memeriksa dampak performa kasar bila relevan.
- [ ] Komentar saya actionable.

## Penutup

Review adalah **produk kolaboratif**; hasilnya kode bersama, bukan panggung debat.

## Kedalaman: pair review

Untuk PR kompleks, sesi 15 menit live sering lebih cepat daripada puluhan komentar asinkron.

## Kedalaman: ownership file CODEOWNERS

Otomatisasi routing review mengurangi PR terjebak tanpa ahli domain.

## Latihan meja

Tulis lima komentar review untuk PR fiktif yang menambahkan endpoint tanpa rate limit.

## Glosarium

- **Nit**: komentar non-blocking minor.

## Ekstensi: review untuk dokumentasi

ADR dan runbook juga layak review peer dengan kriteria kejelasan dan akurasi operasional.

## Penutup organisasi

Metrik lead time PR vs defect rate pasca-merge menunjukkan apakah review seimbang.

## Lampiran: template komentar blocking

- “Blocking: missing auth check on DELETE /resource/:id.”

Jelas dan terukur.

## Refleksi

Jika penulis selalu defensif, evaluasi tone komentar reviewer senior, bukan hanya “mereka tidak matang”.

## Penutup akhir

Review tajam berarti **pertanyaan tepat pada titik risiko**, bukan jumlah baris komentar.

## Tambahan: async vs sync

Komentar async bagus untuk detail; sync singkat bagus untuk kesalahpahaman arsitektur—campur strategi.

## Tambahan: lint otomatis vs review manusia

Reviewer tidak boleh menghabiskan waktu pada hal yang bisa diotomatisasi—investasi tooling mengembalikan waktu untuk logika.

## Penutup praktis

Setelah sebulan, audit sample PR: apakah komentar mayoritas tentang logika atau format? Sesuaikan tooling.

## Tambahan: review untuk perubahan performa

Tanyakan kompleksitas algoritma kasar, query N+1, dan pola alokasi memori bila PR menyentuh jalur panas. Satu komentar “apakah ini dipanggil per request?” sering membuka diskusi lebih berguna daripada debat gaya.

## Tambahan: review untuk perubahan kontrak API

Pastikan versioning, deprecation header, dan dokumentasi konsumen diperbarui. Breaking change tanpa rencana migrasi adalah bug organisasi, bukan hanya bug kode.

## Tambahan: SLA review turnaround

Jika PR kritis menunggu review karena bottleneck orang, rotasi reviewer cadangan atau batas WIP per orang. Proses yang mengandalkan satu hero review tidak skalabel.

## Tambahan: tone dalam komentar async

Gunakan kalimat netral: “Pertimbangkan …” vs “Harus …” sesuai tingkat kepastian risiko. Blocking issue tetap jelas dengan kata “Blocking:”.

## Tambahan: review dokumentasi operasional

Perubahan yang mempengaruhi runbook atau alert harus menyertakan update dokumen yang sama atau tiket follow-up eksplisit agar drift operasional tidak terakumulasi.

## Penutup operasional

Review yang berkualitas meningkatkan kecepatan jangka panjang meskipun terasa memperlambat menit pertama—ukur defect escape rate pasca-merge sebagai umpan balik.

## Tambahan: latihan reviewer baru

Shadow reviewer senior selama satu minggu dengan penjelasan “mengapa komentar ini blocking” mempercepat kalibrasi standar tim.

## Penutup akhir praktis

Review tajam adalah **kumpulan pertanyaan tepat** yang membuat bug mahal lebih sering tertangkap sebelum produksi, bukan volume komentar per baris.
