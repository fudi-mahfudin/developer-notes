# Bedanya Redis sebagai cache vs message broker?

## 1) Pertanyaan

- Pertanyaan interviewer: Bedanya Redis sebagai cache vs message broker?
- Kategori: Caching, Queue, Messaging
- Tujuan tersembunyi interviewer (yang sedang dinilai): kemampuan reasoning, kedalaman teknis, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Redis sebagai cache dipakai untuk mempercepat read dengan TTL/invalidation, sedangkan sebagai message broker dipakai untuk komunikasi async ringan seperti pub/sub atau queue sederhana. Strategi saya purpose-driven Redis role: satu penggunaan Redis harus jelas tujuan utamanya supaya desain operasional tidak campur aduk. Kalau kebutuhan messaging makin kompleks, saya evaluasi broker khusus agar reliability tetap terjaga.

Struktur cepat:
- Konteks singkat: mencampur fungsi Redis tanpa batas jelas bisa memicu masalah operasional.
- Aksi utama: tetapkan peran Redis per use case sejak desain awal.
- Keputusan teknis/non-teknis: naik ke broker khusus jika butuh durability/ordering lebih kuat.
- Hasil terukur: arsitektur lebih jelas dan troubleshooting lebih cepat.
- Closing relevan ke posisi: saya memilih tool berdasarkan kebutuhan reliability nyata.

## 3) Versi Ultra Singkat (10-20 detik)

> Redis cache untuk akselerasi read, Redis broker untuk async ringan; pemilihannya saya tentukan dari tujuan operasional.

## 4) Bukti Konkret (Wajib)

- Proyek/fitur yang relevan: Siloam Hospitals (optimasi performa, integrasi sistem, service Node.js TypeScript).
- Angka dampak (latency, error rate, revenue, waktu delivery, dll): redundant API call turun sekitar 70% pada view yang diukur.
- Peran spesifik saya (hindari klaim tim tanpa kontribusi pribadi): analisis akar masalah, implementasi solusi inti, validasi hasil, dan koordinasi lintas tim.
- Teknologi/alat yang digunakan: React, Next.js, TypeScript, Node.js, PostgreSQL, SQL Server, Elastic APM, SonarQube.
- Definisi strategi: purpose-driven Redis role = menentukan peran Redis secara tegas agar konfigurasi dan ekspektasi sistem tetap selaras.

## 5) Red Flags (Yang Harus Dihindari)

- Jawaban normatif tanpa contoh proyek nyata.
- Klaim dampak tanpa metrik/indikator.
- Terlalu panjang hingga inti jawaban hilang.
- Menyalahkan pihak lain tanpa menunjukkan tindakan perbaikan.
- Tidak menyebut trade-off dari keputusan yang diambil.

## 6) Follow-up yang Biasanya Muncul

- Follow-up 1: Kapan cache harus dihindari?
  - Jawaban ideal singkat: Saat konsistensi real-time lebih penting dari latency dan invalidation berisiko tinggi.
- Follow-up 2: Bagaimana worker tetap aman saat retry?
  - Jawaban ideal singkat: Semua side effect saya desain idempotent dan dipagari unique constraint/event key.
- Follow-up 3: Kapan pilih queue daripada sync API?
  - Jawaban ideal singkat: Saat proses berat/non-kritis untuk response user dan bisa diproses asynchronous.

## 7) Trade-off / Keputusan (Jika Technical)

- Opsi yang dipertimbangkan: solusi cepat jangka pendek vs solusi terukur yang lebih sustainable.
- Kenapa opsi final dipilih: memberi dampak stabil tanpa mengorbankan kualitas.
- Risiko dari opsi final: butuh disiplin eksekusi lebih tinggi.
- Mitigasi: checklist kualitas, review rutin, dan evaluasi metrik pasca-rilis.

## 8) Struktur STAR (Opsional, untuk Behavioral)

- Situation: Ada kebutuhan perubahan pada sistem dengan tekanan waktu dan ekspektasi kualitas tinggi.
- Task: Memberikan solusi yang tepat tanpa mengorbankan stabilitas produksi.
- Action: Saya memprioritaskan risiko tertinggi, eksekusi bertahap, dan validasi hasil via metrik.
- Result: Dampak teknis dan operasional lebih terukur serta lebih mudah dipertanggungjawabkan.

## 9) Checklist Kualitas Jawaban

- [x] Menjawab langsung di awal.
- [x] Menampilkan kontribusi personal secara jelas.
- [x] Menyertakan bukti konkret dan metrik.
- [x] Menjelaskan trade-off keputusan.
- [x] Relevan dengan domain healthcare/fullstack.
- [x] Ringkas dan mudah dipahami interviewer.

## 10) Skor Evaluasi Diri

- Kejelasan: 8/10
- Kredibilitas: 8/10
- Relevansi ke role: 9/10
- Keringkasan: 8/10
- Catatan perbaikan: Tambahkan metrik sekunder yang lebih spesifik jika data tersedia untuk pertanyaan ini.

---

## Template Drill Cepat (Isi < 2 Menit)

- Pertanyaan: Bedanya Redis sebagai cache vs message broker?
- Jawaban 3 kalimat: Konteks masalah, keputusan utama, dan dampak yang bisa diukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh nyata.
- Follow-up paling mungkin: Kenapa memilih pendekatan itu dibanding alternatif lain?
