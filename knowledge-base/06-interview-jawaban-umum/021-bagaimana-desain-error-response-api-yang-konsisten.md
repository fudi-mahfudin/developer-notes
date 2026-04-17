# Bagaimana desain error response API yang konsisten?

## 1) Pertanyaan

- Pertanyaan interviewer: Bagaimana desain error response API yang konsisten?
- Kategori: Backend API & Security
- Tujuan tersembunyi interviewer (yang sedang dinilai): kemampuan reasoning, kedalaman teknis, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Error response yang konsisten saya desain dengan schema tetap: `code`, `message`, `details`, `traceId`, dan `timestamp`. Strategi saya stable error contract: developer client harus bisa memproses error secara deterministik tanpa parsing ad-hoc. Di production, ini mempercepat debug karena traceId langsung mengarah ke log/tracing. Saya juga bedakan error domain (validasi, auth, dependency, internal) agar tindakan perbaikan jelas.

Struktur cepat:
- Konteks singkat: format error acak membuat integrasi dan incident response lambat.
- Aksi utama: standarkan payload error lintas endpoint dan service.
- Keputusan teknis/non-teknis: kategorikan error agar action caller tidak ambigu.
- Hasil terukur: waktu diagnosis issue menurun karena korelasi log lebih cepat.
- Closing relevan ke posisi: saya membangun API yang mudah dioperasikan, bukan hanya bisa jalan.

## 3) Versi Ultra Singkat (10-20 detik)

> Saya pakai stable error contract dengan schema tetap dan traceId agar handling client serta troubleshooting jauh lebih cepat.

## 4) Bukti Konkret (Wajib)

- Proyek/fitur yang relevan: Siloam Hospitals (optimasi performa, integrasi sistem, service Node.js TypeScript).
- Angka dampak (latency, error rate, revenue, waktu delivery, dll): redundant API call turun sekitar 70% pada view yang diukur.
- Peran spesifik saya (hindari klaim tim tanpa kontribusi pribadi): analisis akar masalah, implementasi solusi inti, validasi hasil, dan koordinasi lintas tim.
- Teknologi/alat yang digunakan: React, Next.js, TypeScript, Node.js, PostgreSQL, SQL Server, Elastic APM, SonarQube.
- Definisi strategi: stable error contract = error response diseragamkan agar client handling dan observability tetap konsisten.

## 5) Red Flags (Yang Harus Dihindari)

- Jawaban normatif tanpa contoh proyek nyata.
- Klaim dampak tanpa metrik/indikator.
- Terlalu panjang hingga inti jawaban hilang.
- Menyalahkan pihak lain tanpa menunjukkan tindakan perbaikan.
- Tidak menyebut trade-off dari keputusan yang diambil.

## 6) Follow-up yang Biasanya Muncul

- Follow-up 1: Bagaimana verifikasi endpoint ini aman?
  - Jawaban ideal singkat: Saya cek validasi input, akses role-based, audit log, dan hasil security testing pada jalur kritikal.
- Follow-up 2: Kalau terjadi retry storm dari client?
  - Jawaban ideal singkat: Saya gabungkan idempotency key, rate limit, dan timeout policy agar sistem tetap stabil.
- Follow-up 3: Apa metrik paling penting setelah deploy?
  - Jawaban ideal singkat: Error rate, latency p95, jumlah 4xx/5xx anomali, dan security alert trend.

## 7) Trade-off / Keputusan (Jika Technical)

- Opsi yang dipertimbangkan: implementasi cepat minim guardrail vs implementasi aman dengan kontrol tambahan.
- Kenapa opsi final dipilih: kontrol keamanan dan konsistensi data lebih penting untuk domain healthcare.
- Risiko dari opsi final: development effort meningkat.
- Mitigasi: rollout bertahap, contract test, dan monitoring ketat pasca-rilis.

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

- Pertanyaan: Bagaimana desain error response API yang konsisten?
- Jawaban 3 kalimat: Konteks masalah, keputusan utama, dan dampak yang bisa diukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh nyata.
- Follow-up paling mungkin: Kenapa memilih pendekatan itu dibanding alternatif lain?
