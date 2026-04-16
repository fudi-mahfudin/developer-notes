# Bagaimana desain monitoring end-to-end untuk workflow klinis?

## 1) Pertanyaan

- Pertanyaan interviewer: Bagaimana desain monitoring end-to-end untuk workflow klinis?
- Kategori: System Design Healthcare
- Tujuan tersembunyi interviewer (yang sedang dinilai): kedalaman pemahaman teknis, kualitas keputusan, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Monitoring end-to-end workflow klinis saya bangun dari journey utama user, bukan dari komponen teknis terpisah. Saya pasang metric dan trace di setiap titik kritikal workflow, lalu hubungkan dengan correlation id agar satu kasus bisa ditelusuri lintas service. Selain metrik teknis, saya juga monitor indikator operasional seperti jumlah workflow tertahan atau gagal per tahap. Ini penting karena sistem bisa tampak sehat di level infra, tapi sebenarnya alur bisnisnya macet. Bagi saya, monitoring yang bagus harus menjawab: “pasien dan user operasional benar-benar bisa menyelesaikan proses atau tidak.”

Struktur cepat:
- Konteks singkat: health service hijau belum tentu alur klinis berjalan.
- Aksi utama: instrumentasi tiap tahap workflow dengan trace dan metric terhubung.
- Keputusan teknis/non-teknis: gabungkan metrik teknis dan metrik operasional.
- Hasil terukur: bottleneck alur klinis terdeteksi lebih cepat.
- Closing relevan ke posisi: saya fokus pada outcome alur bisnis, bukan sekadar uptime.

## 3) Versi Ultra Singkat (10-20 detik)

> Saya monitor workflow klinis dari perspektif perjalanan user end-to-end, bukan hanya health komponen teknis.

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

- Pertanyaan: Bagaimana desain monitoring end-to-end untuk workflow klinis?
- Jawaban 3 kalimat: konteks masalah, keputusan inti, dan dampak terukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh produksi.
- Follow-up paling mungkin: Kenapa pendekatan ini dipilih dibanding alternatif lain?
