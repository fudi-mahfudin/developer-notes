# Apa standar kualitas minimal sebelum kamu approve PR?

## 1) Pertanyaan

- Pertanyaan interviewer: Apa standar kualitas minimal sebelum kamu approve PR?
- Kategori: Testing, QA, dan Code Quality
- Tujuan tersembunyi interviewer (yang sedang dinilai): kedalaman pemahaman teknis, kualitas keputusan, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Standar kualitas minimal sebelum approve PR saya adalah: perubahan bisa dipahami jelas, risiko diketahui, test relevan ada, dan dampak ke sistem existing terkendali. Saya cek bukan hanya “kode jalan”, tapi juga apakah perubahan ini mudah dirawat tim setelah merge. Kalau ada area rawan seperti contract change atau concurrency, saya minta evidence tambahan sebelum approval. Saya juga pastikan komentar review fokus ke kualitas output, bukan preferensi gaya pribadi. Buat saya approve PR berarti memberi izin perubahan masuk production path, jadi standarnya harus tegas.

Struktur cepat:
- Konteks singkat: approval PR yang longgar bisa jadi sumber incident diam-diam.
- Aksi utama: verifikasi kejelasan perubahan, test evidence, dan risiko operasional.
- Keputusan teknis/non-teknis: quality standard harus konsisten lintas reviewer.
- Hasil terukur: kualitas merge naik dan rework pasca-merge menurun.
- Closing relevan ke posisi: saya treat code review sebagai quality gate utama sebelum production.

## 3) Versi Ultra Singkat (10-20 detik)

> Saya approve PR jika jelas, teruji, risikonya dipahami, dan maintainability-nya masuk akal untuk tim setelah merge.

## 4) Bukti Konkret (Wajib)

- Proyek/fitur yang relevan: Siloam Hospitals (optimasi performa, integrasi lintas sistem, Node.js TypeScript services).
- Angka dampak (latency, error rate, revenue, waktu delivery, dll): redundant API call turun sekitar 70% pada view yang diukur.
- Peran spesifik saya (hindari klaim tim tanpa kontribusi pribadi): analisis akar masalah, implementasi solusi inti, validasi hasil, dan sinkronisasi lintas tim.
- Teknologi/alat yang digunakan: React, Next.js, TypeScript, Node.js, PostgreSQL, SQL Server, Elastic APM, SonarQube.

## 5) Red Flags (Yang Harus Dihindari)

- Jawaban terlalu umum tanpa contoh nyata.
- Klaim dampak tanpa metrik/indikator.
- Tidak menjelaskan trade-off keputusan.
- Fokus teori tanpa implikasi produksi.
- Jawaban terlalu panjang hingga inti hilang.

## 6) Follow-up yang Biasanya Muncul

- Follow-up 1: Kenapa tidak semuanya di e2e?
  - Jawaban ideal singkat: E2e mahal; saya batasi ke critical path dan dorong logic ke unit/integration.
- Follow-up 2: Bagaimana tangani flaky test?
  - Jawaban ideal singkat: Stabilkan test data, kurangi nondeterminism, dan isolasi dependency rapuh.
- Follow-up 3: Apa indikator quality gate efektif?
  - Jawaban ideal singkat: Defect leakage turun dan rework pasca-rilis berkurang.

## 7) Trade-off / Keputusan (Jika Technical)

- Opsi yang dipertimbangkan: coverage luas dangkal vs coverage fokus area risiko tinggi.
- Kenapa opsi final dipilih: kualitas rilis naik dengan biaya test yang tetap rasional.
- Risiko dari opsi final: area low-risk bisa kurang teruji.
- Mitigasi: review risiko berkala dan tambah test saat pattern bug berubah.

## 8) Struktur STAR (Opsional, untuk Behavioral)

- Situation: Ada kebutuhan perubahan di sistem dengan batas waktu dan tekanan stabilitas produksi.
- Task: Memberi solusi yang benar, aman, dan bisa dipertanggungjawabkan.
- Action: Saya prioritaskan risiko tertinggi, eksekusi bertahap, dan validasi berbasis metrik.
- Result: Kualitas delivery lebih stabil, risiko insiden menurun, dan komunikasi teknis lebih jelas.

## 9) Checklist Kualitas Jawaban

- [x] Menjawab pertanyaan langsung di awal.
- [x] Menjelaskan kontribusi personal secara tegas.
- [x] Menyertakan dampak terukur/indikator operasional.
- [x] Menjelaskan trade-off keputusan.
- [x] Relevan dengan domain healthcare dan role target.
- [x] Ringkas dan mudah dipahami interviewer.

## 10) Skor Evaluasi Diri

- Kejelasan: 9/10
- Kredibilitas: 9/10
- Relevansi ke role: 9/10
- Keringkasan: 8/10
- Catatan perbaikan: Tambahkan metrik sekunder spesifik per kasus saat data tersedia.

---

## Template Drill Cepat (Isi < 2 Menit)

- Pertanyaan: Apa standar kualitas minimal sebelum kamu approve PR?
- Jawaban 3 kalimat: konteks masalah, keputusan inti, dan dampak terukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh produksi.
- Follow-up paling mungkin: Kenapa pendekatan ini dipilih dibanding alternatif lain?
