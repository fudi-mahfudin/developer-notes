# Bagaimana kamu menangani duplicate record dari source eksternal?

## 1) Pertanyaan

- Pertanyaan interviewer: Bagaimana kamu menangani duplicate record dari source eksternal?
- Kategori: Database, SQL, dan Integrasi Multi-DB
- Tujuan tersembunyi interviewer (yang sedang dinilai): kedalaman pemahaman teknis, kualitas keputusan, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Untuk duplicate record dari source eksternal, saya pasang pagar di dua lapis: deduplication key di ingestion dan unique constraint di data layer. Jadi meskipun source mengirim event berulang, side effect bisnis tetap dieksekusi satu kali. Saya juga pisahkan antara duplicate yang valid untuk replay dan duplicate yang memang noise, supaya tidak salah buang data. Di pengalaman integrasi saya, kontrol ini penting karena dependency eksternal tidak selalu konsisten. Prinsip saya: anggap duplicate itu pasti terjadi, lalu desain sistem agar tetap benar.

Struktur cepat:
- Konteks singkat: source eksternal sering tidak menjamin exactly-once.
- Aksi utama: kombinasikan dedup logic di ingestion dan constraint di persistence.
- Keputusan teknis/non-teknis: sistem didesain tahan duplicate sejak awal.
- Hasil terukur: duplicate side effect turun dan data tetap konsisten.
- Closing relevan ke posisi: saya terbiasa membangun pipeline integrasi yang idempotent.

## 3) Versi Ultra Singkat (10-20 detik)

> Saya tangani duplicate record dengan dedup key + unique constraint, jadi replay event tidak berubah jadi side effect ganda.

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

- Pertanyaan: Bagaimana kamu menangani duplicate record dari source eksternal?
- Jawaban 3 kalimat: konteks masalah, keputusan inti, dan dampak terukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh produksi.
- Follow-up paling mungkin: Kenapa pendekatan ini dipilih dibanding alternatif lain?
