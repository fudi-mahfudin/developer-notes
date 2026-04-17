# Bagaimana desain sistem sinkronisasi jadwal dokter multi-channel?

## 1) Pertanyaan

- Pertanyaan interviewer: Bagaimana desain sistem sinkronisasi jadwal dokter multi-channel?
- Kategori: System Design Healthcare
- Tujuan tersembunyi interviewer (yang sedang dinilai): kedalaman pemahaman teknis, kualitas keputusan, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Sinkronisasi jadwal dokter multi-channel saya desain dengan satu sumber jadwal utama dan mekanisme update terurut untuk mencegah bentrok. Setiap perubahan jadwal saya treat sebagai event dengan version check supaya update lama tidak menimpa data terbaru. Saya juga pasang aturan conflict resolution yang eksplisit saat dua kanal mengirim update hampir bersamaan. Di sisi operasional, saya sediakan rekonsiliasi periodik agar drift kecil tidak menumpuk. Tujuannya sederhana: jadwal yang dilihat pasien dan staf tetap konsisten di semua channel.

Struktur cepat:
- Konteks singkat: multi-channel scheduling rawan conflict dan data drift.
- Aksi utama: gunakan event versioning dan conflict resolution rule yang jelas.
- Keputusan teknis/non-teknis: konsistensi jadwal lintas kanal diprioritaskan.
- Hasil terukur: bentrok jadwal dan koreksi manual berkurang.
- Closing relevan ke posisi: saya terbiasa mengelola sinkronisasi state lintas kanal.

## 3) Versi Ultra Singkat (10-20 detik)

> Saya sinkronkan jadwal dokter dengan source-of-truth tunggal + version check agar update lintas channel tidak saling tabrak.

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

- Pertanyaan: Bagaimana desain sistem sinkronisasi jadwal dokter multi-channel?
- Jawaban 3 kalimat: konteks masalah, keputusan inti, dan dampak terukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh produksi.
- Follow-up paling mungkin: Kenapa pendekatan ini dipilih dibanding alternatif lain?
