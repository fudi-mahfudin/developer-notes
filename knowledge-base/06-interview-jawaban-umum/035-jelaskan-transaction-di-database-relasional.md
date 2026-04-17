# Jelaskan transaction di database relasional.

## 1) Pertanyaan

- Pertanyaan interviewer: Jelaskan transaction di database relasional.
- Kategori: Database & Consistency
- Tujuan tersembunyi interviewer (yang sedang dinilai): kemampuan reasoning, kedalaman teknis, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Transaction di database relasional saya posisikan sebagai boundary untuk unit bisnis yang harus atomik. Strategi saya atomicity-by-business-boundary: transaksi hanya membungkus langkah yang benar-benar perlu sukses/gagal bersama, supaya lock tidak terlalu lama. Saya juga menghindari kerja berat non-DB di dalam transaksi agar kontensi tidak melonjak. Hasilnya, konsistensi data tetap terjaga tanpa mengorbankan throughput.

Struktur cepat:
- Konteks singkat: transaksi terlalu lebar memicu lock contention dan deadlock.
- Aksi utama: definisikan unit bisnis atomik lalu batasi scope transaksi.
- Keputusan teknis/non-teknis: keluarkan proses non-kritis dari blok transaksi.
- Hasil terukur: anomali data turun tanpa menekan performa secara berlebihan.
- Closing relevan ke posisi: saya menyeimbangkan correctness dan kapasitas sistem.

## 3) Versi Ultra Singkat (10-20 detik)

> Saya terapkan atomicity-by-business-boundary agar data konsisten sambil menjaga durasi lock tetap sehat.

## 4) Bukti Konkret (Wajib)

- Proyek/fitur yang relevan: Siloam Hospitals (optimasi performa, integrasi sistem, service Node.js TypeScript).
- Angka dampak (latency, error rate, revenue, waktu delivery, dll): redundant API call turun sekitar 70% pada view yang diukur.
- Peran spesifik saya (hindari klaim tim tanpa kontribusi pribadi): analisis akar masalah, implementasi solusi inti, validasi hasil, dan koordinasi lintas tim.
- Teknologi/alat yang digunakan: React, Next.js, TypeScript, Node.js, PostgreSQL, SQL Server, Elastic APM, SonarQube.
- Definisi strategi: atomicity-by-business-boundary = batas transaksi mengikuti unit kerja bisnis yang wajib konsisten.

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

- Pertanyaan: Jelaskan transaction di database relasional.
- Jawaban 3 kalimat: Konteks masalah, keputusan utama, dan dampak yang bisa diukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh nyata.
- Follow-up paling mungkin: Kenapa memilih pendekatan itu dibanding alternatif lain?
