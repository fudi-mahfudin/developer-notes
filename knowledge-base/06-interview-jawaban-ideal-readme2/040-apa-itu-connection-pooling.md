# Apa itu connection pooling?

## 1) Pertanyaan

- Pertanyaan interviewer: Apa itu connection pooling?
- Kategori: Database & Consistency
- Tujuan tersembunyi interviewer (yang sedang dinilai): kemampuan reasoning, kedalaman teknis, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Connection pooling adalah mekanisme reuse koneksi database supaya service tidak membuka koneksi baru di tiap request. Strategi saya pool-sizing by workload: ukuran pool ditentukan dari kapasitas DB, concurrency aplikasi, dan pola query, bukan angka default. Saya juga pasang timeout dan monitoring saturation supaya pool tidak jadi bottleneck tersembunyi. Dengan konfigurasi tepat, latency lebih stabil dan resource DB lebih terjaga.

Struktur cepat:
- Konteks singkat: koneksi berlebihan bisa menjatuhkan DB meski query sederhana.
- Aksi utama: atur ukuran pool berdasar beban dan kapasitas database nyata.
- Keputusan teknis/non-teknis: monitor saturation, timeout, dan queue wait time.
- Hasil terukur: stabilitas latency meningkat pada traffic tinggi.
- Closing relevan ke posisi: saya mengelola performa bukan hanya di query, tapi juga di konektivitas.

## 3) Versi Ultra Singkat (10-20 detik)

> Connection pooling saya kelola dengan pool-sizing by workload agar koneksi efisien tanpa membebani database.

## 4) Bukti Konkret (Wajib)

- Proyek/fitur yang relevan: Siloam Hospitals (optimasi performa, integrasi sistem, service Node.js TypeScript).
- Angka dampak (latency, error rate, revenue, waktu delivery, dll): redundant API call turun sekitar 70% pada view yang diukur.
- Peran spesifik saya (hindari klaim tim tanpa kontribusi pribadi): analisis akar masalah, implementasi solusi inti, validasi hasil, dan koordinasi lintas tim.
- Teknologi/alat yang digunakan: React, Next.js, TypeScript, Node.js, PostgreSQL, SQL Server, Elastic APM, SonarQube.
- Definisi strategi: pool-sizing by workload = mengonfigurasi connection pool sesuai karakter beban aplikasi dan kapasitas database.

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

- Pertanyaan: Apa itu connection pooling?
- Jawaban 3 kalimat: Konteks masalah, keputusan utama, dan dampak yang bisa diukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh nyata.
- Follow-up paling mungkin: Kenapa memilih pendekatan itu dibanding alternatif lain?
