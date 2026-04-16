# Bagaimana desain antrean pencetakan label farmasi dengan QZ Tray?

## 1) Pertanyaan

- Pertanyaan interviewer: Bagaimana desain antrean pencetakan label farmasi dengan QZ Tray?
- Kategori: System Design Healthcare
- Tujuan tersembunyi interviewer (yang sedang dinilai): kedalaman pemahaman teknis, kualitas keputusan, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Antrean pencetakan label farmasi dengan QZ Tray saya desain dengan prinsip queue yang tahan lonjakan dan tidak memblokir alur utama user. Saya pisahkan request cetak dari UI transaction agar kegagalan print tidak membatalkan proses klinis utama. Tiap job saya beri status lifecycle jelas: queued, processing, success, failed, lalu ada retry policy terukur. Saya juga simpan metadata printer dan template untuk memudahkan troubleshooting saat ada gangguan perangkat. Hasilnya operasional print lebih stabil dan gangguan lapangan lebih mudah ditangani.

Struktur cepat:
- Konteks singkat: proses print rawan gagal karena faktor perangkat/network lokal.
- Aksi utama: jalankan print via queue async dengan state job terpantau.
- Keputusan teknis/non-teknis: pisahkan jalur print dari transaksi utama agar tidak saling jatuh.
- Hasil terukur: antrean print lebih stabil dan recovery insiden lebih cepat.
- Closing relevan ke posisi: saya punya pengalaman langsung di workflow QZ Tray production.

## 3) Versi Ultra Singkat (10-20 detik)

> Saya desain antrean print QZ Tray secara asynchronous dengan status job jelas, sehingga proses farmasi tetap stabil saat printer bermasalah.

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

- Follow-up 1: Bagaimana desain tetap scalable?
  - Jawaban ideal singkat: Pisahkan bottleneck path dan scale horizontal komponen paling kritikal.
- Follow-up 2: Bagaimana menangani partial failure?
  - Jawaban ideal singkat: Gunakan state machine jelas, retry policy, dan kompensasi yang deterministic.
- Follow-up 3: Kenapa tidak pilih arsitektur paling kompleks?
  - Jawaban ideal singkat: Saya pilih yang paling maintainable sambil tetap memenuhi reliability target.

## 7) Trade-off / Keputusan (Jika Technical)

- Opsi yang dipertimbangkan: desain minimalis cepat rilis vs desain modular lebih tahan failure.
- Kenapa opsi final dipilih: keseimbangan maintainability tim dan target reliability.
- Risiko dari opsi final: kompleksitas operasional naik.
- Mitigasi: runbook, observability end-to-end, dan ownership komponen jelas.

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

- Pertanyaan: Bagaimana desain antrean pencetakan label farmasi dengan QZ Tray?
- Jawaban 3 kalimat: konteks masalah, keputusan inti, dan dampak terukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh produksi.
- Follow-up paling mungkin: Kenapa pendekatan ini dipilih dibanding alternatif lain?
