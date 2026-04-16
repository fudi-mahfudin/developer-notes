# Ceritakan pengalaman integrasi PostgreSQL dan Microsoft SQL Server.

## 1) Pertanyaan

- Pertanyaan interviewer: Ceritakan pengalaman integrasi PostgreSQL dan Microsoft SQL Server.
- Kategori: Database, SQL, dan Integrasi Multi-DB
- Tujuan tersembunyi interviewer (yang sedang dinilai): kedalaman pemahaman teknis, kualitas keputusan, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Pengalaman integrasi PostgreSQL dan SQL Server paling menantang buat saya ada di sinkronisasi FIFO inventory return antara KAIROS dan WMS. Tantangannya bukan cuma query beda dialect, tapi perbedaan model data, urutan transaksi, dan cara menangani error parsial. Saya pecah integrasi jadi mapping yang eksplisit, validasi lintas sistem, lalu reconciliation untuk kasus mismatch. Saya juga pakai logging terstruktur per transaksi supaya tracing saat incident tidak gelap. Hasilnya alur integrasi jadi lebih stabil dan selisih data lebih cepat ditangani.

Struktur cepat:
- Konteks singkat: lintas database berarti lintas asumsi data dan transaksi.
- Aksi utama: buat mapping, validasi, dan tracing transaksi yang eksplisit.
- Keputusan teknis/non-teknis: saya utamakan konsistensi alur dibanding optimasi prematur.
- Hasil terukur: mismatch lebih mudah dilacak dan diperbaiki.
- Closing relevan ke posisi: saya punya pengalaman nyata di integrasi multi-DB production.

## 3) Versi Ultra Singkat (10-20 detik)

> Integrasi PostgreSQL-SQL Server saya tangani dengan mapping eksplisit + reconciliation, terutama di kasus FIFO return lintas sistem.

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

- Pertanyaan: Ceritakan pengalaman integrasi PostgreSQL dan Microsoft SQL Server.
- Jawaban 3 kalimat: konteks masalah, keputusan inti, dan dampak terukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh produksi.
- Follow-up paling mungkin: Kenapa pendekatan ini dipilih dibanding alternatif lain?
