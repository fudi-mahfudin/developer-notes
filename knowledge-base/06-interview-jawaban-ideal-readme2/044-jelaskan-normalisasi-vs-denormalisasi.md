# Jelaskan normalisasi vs denormalisasi.

## 1) Pertanyaan

- Pertanyaan interviewer: Jelaskan normalisasi vs denormalisasi.
- Kategori: Database & Consistency
- Tujuan tersembunyi interviewer (yang sedang dinilai): kemampuan reasoning, kedalaman teknis, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Normalisasi saya gunakan saat konsistensi dan integritas data jadi prioritas utama; denormalisasi saya pakai untuk read path tertentu yang butuh performa tinggi dengan trade-off redundancy. Strategi saya selective denormalization: denormalisasi dilakukan terarah pada query hotspot, bukan menyebar ke semua model. Saya pastikan ada mekanisme sinkronisasi agar data turunan tidak cepat usang.

Struktur cepat:
- Konteks singkat: denormalisasi sembarangan meningkatkan risiko inkonsistensi data.
- Aksi utama: identifikasi hotspot query sebelum membuat struktur data turunan.
- Keputusan teknis/non-teknis: tetapkan owner sinkronisasi untuk field denormalized.
- Hasil terukur: performa read naik tanpa kehilangan kontrol kualitas data.
- Closing relevan ke posisi: saya memilih trade-off arsitektur data secara disiplin.

## 3) Versi Ultra Singkat (10-20 detik)

> Saya normalisasi untuk konsistensi, denormalisasi secara selektif untuk performa hotspot dengan kontrol sinkronisasi yang jelas.

## 4) Bukti Konkret (Wajib)

- Proyek/fitur yang relevan: Siloam Hospitals (optimasi performa, integrasi sistem, service Node.js TypeScript).
- Angka dampak (latency, error rate, revenue, waktu delivery, dll): redundant API call turun sekitar 70% pada view yang diukur.
- Peran spesifik saya (hindari klaim tim tanpa kontribusi pribadi): analisis akar masalah, implementasi solusi inti, validasi hasil, dan koordinasi lintas tim.
- Teknologi/alat yang digunakan: React, Next.js, TypeScript, Node.js, PostgreSQL, SQL Server, Elastic APM, SonarQube.
- Definisi strategi: selective denormalization = menerapkan denormalisasi hanya pada area bernilai tinggi dengan kontrol konsistensi yang jelas.

## 5) Red Flags (Yang Harus Dihindari)

- Jawaban normatif tanpa contoh proyek nyata.
- Klaim dampak tanpa metrik/indikator.
- Terlalu panjang hingga inti jawaban hilang.
- Menyalahkan pihak lain tanpa menunjukkan tindakan perbaikan.
- Tidak menyebut trade-off dari keputusan yang diambil.

## 6) Follow-up yang Biasanya Muncul

- Follow-up 1: Bagaimana mencegah deadlock?
  - Jawaban ideal singkat: Lock ordering konsisten, transaksi dibuat sesingkat mungkin, dan query dioptimalkan sebelum lock panjang.
- Follow-up 2: Jika ada data mismatch antar sistem?
  - Jawaban ideal singkat: Saya jalankan reconciliation dari source-of-truth dengan audit trail per perubahan.
- Follow-up 3: Kapan perlu index tambahan?
  - Jawaban ideal singkat: Saat query plan menunjukkan bottleneck nyata dan trade-off write overhead masih masuk akal.

## 7) Trade-off / Keputusan (Jika Technical)

- Opsi yang dipertimbangkan: throughput tinggi dengan kontrol longgar vs konsistensi ketat antar data source.
- Kenapa opsi final dipilih: menghindari data drift lebih krusial daripada optimasi sesaat.
- Risiko dari opsi final: potensi kontensi transaksi lebih tinggi.
- Mitigasi: tuning query/index, lock ordering, dan reconciliation job.

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

- Pertanyaan: Jelaskan normalisasi vs denormalisasi.
- Jawaban 3 kalimat: Konteks masalah, keputusan utama, dan dampak yang bisa diukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh nyata.
- Follow-up paling mungkin: Kenapa memilih pendekatan itu dibanding alternatif lain?
