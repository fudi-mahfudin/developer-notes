# Apa strategi kamu saat migrasi skema database minim downtime?

## 1) Pertanyaan

- Pertanyaan interviewer: Apa strategi kamu saat migrasi skema database minim downtime?
- Kategori: Database, SQL, dan Integrasi Multi-DB
- Tujuan tersembunyi interviewer (yang sedang dinilai): kedalaman pemahaman teknis, kualitas keputusan, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Untuk migrasi skema minim downtime, saya pilih strategi bertahap: additive change dulu, dual-read/write jika perlu, lalu cleanup setelah trafik stabil. Saya menghindari perubahan besar sekali jalan karena risiko rollback-nya tinggi. Sebelum cutover, saya siapkan backfill terkontrol, monitoring khusus migrasi, dan rollback plan yang sudah diuji. Pengalaman phased migration di proyek sebelumnya membantu saya disiplin pada urutan ini. Tujuannya sederhana: sistem tetap berjalan untuk user, sementara struktur data berevolusi aman.

Struktur cepat:
- Konteks singkat: migrasi skema besar berisiko tinggi jika dilakukan sekali jalan.
- Aksi utama: lakukan transisi bertahap dengan observability dan rollback siap pakai.
- Keputusan teknis/non-teknis: prioritaskan kontinuitas layanan daripada kecepatan migrasi sesaat.
- Hasil terukur: downtime dan risiko rollback masif bisa ditekan.
- Closing relevan ke posisi: saya berpengalaman mengubah sistem tanpa mengganggu operasi inti.

## 3) Versi Ultra Singkat (10-20 detik)

> Migrasi minim downtime saya jalankan bertahap: additive schema, transisi terkontrol, lalu cleanup setelah stabil.

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

- Follow-up 1: Bagaimana mencegah deadlock?
  - Jawaban ideal singkat: Saya terapkan lock ordering konsisten dan batasi durasi transaksi.
- Follow-up 2: Apa langkah pertama saat data mismatch?
  - Jawaban ideal singkat: Saya jalankan reconciliation berbasis source-of-truth plus audit per selisih.
- Follow-up 3: Kapan perlu index baru?
  - Jawaban ideal singkat: Saat query plan menunjukkan bottleneck nyata dan trade-off write masih masuk akal.

## 7) Trade-off / Keputusan (Jika Technical)

- Opsi yang dipertimbangkan: throughput maksimum vs konsistensi data ketat.
- Kenapa opsi final dipilih: konsistensi data lebih kritikal di healthcare operation.
- Risiko dari opsi final: kontensi transaksi meningkat.
- Mitigasi: tuning query/index, lock strategy, dan reconciliation terjadwal.

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

- Pertanyaan: Apa strategi kamu saat migrasi skema database minim downtime?
- Jawaban 3 kalimat: konteks masalah, keputusan inti, dan dampak terukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh produksi.
- Follow-up paling mungkin: Kenapa pendekatan ini dipilih dibanding alternatif lain?
