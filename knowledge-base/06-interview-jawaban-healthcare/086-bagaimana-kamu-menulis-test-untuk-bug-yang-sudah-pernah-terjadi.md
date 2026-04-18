# Bagaimana kamu menulis test untuk bug yang sudah pernah terjadi?

## 1) Pertanyaan

- Pertanyaan interviewer: Bagaimana kamu menulis test untuk bug yang sudah pernah terjadi?
- Kategori: Testing, QA, dan Code Quality
- Tujuan tersembunyi interviewer (yang sedang dinilai): kedalaman pemahaman teknis, kualitas keputusan, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Saat menulis test untuk bug yang pernah terjadi, saya mulai dari reproduksi minimal bug tersebut agar test benar-benar mengunci behavior yang dulu salah. Setelah itu saya tambahkan satu test guard untuk variasi edge case yang paling dekat dengan akar masalah. Jadi saya tidak hanya “menutup tiket”, tapi memastikan pola bug yang sama tidak kembali lewat jalur berbeda. Saya juga menamai test dengan bahasa yang menjelaskan konteks insiden supaya tim paham kenapa test itu penting. Dengan cara ini, test menjadi dokumentasi hidup dari pembelajaran insiden.

Struktur cepat:
- Konteks singkat: bug berulang biasanya karena pembelajaran insiden tidak dikunci di test.
- Aksi utama: ubah skenario bug nyata jadi regression test yang jelas konteksnya.
- Keputusan teknis/non-teknis: fokus pada perilaku yang dulu gagal, bukan hanya coverage tambahan.
- Hasil terukur: issue serupa lebih jarang lolos ke production.
- Closing relevan ke posisi: saya pakai test sebagai alat pencegahan, bukan formalitas.

## 3) Versi Ultra Singkat (10-20 detik)

> Saya tulis regression test dari reproduksi bug asli, lalu tambah guard edge-case agar pola bug yang sama tidak kambuh.

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

- Pertanyaan: Bagaimana kamu menulis test untuk bug yang sudah pernah terjadi?
- Jawaban 3 kalimat: konteks masalah, keputusan inti, dan dampak terukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh produksi.
- Follow-up paling mungkin: Kenapa pendekatan ini dipilih dibanding alternatif lain?
