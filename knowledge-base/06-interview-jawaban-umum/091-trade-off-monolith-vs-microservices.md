# Trade-off monolith vs microservices?

## 1) Pertanyaan

- Pertanyaan interviewer: Trade-off monolith vs microservices?
- Kategori: System Design
- Tujuan tersembunyi interviewer (yang sedang dinilai): kemampuan reasoning, kedalaman teknis, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Trade-off monolith vs microservices saya lihat dari tiga dimensi: kompleksitas operasional, kecepatan delivery tim, dan kebutuhan scaling domain. Strategi saya context-first architecture choice: pilih bentuk arsitektur sesuai tahap produk dan kapasitas tim. Monolith sering unggul di awal untuk fokus delivery, microservice unggul saat domain dan tim sudah besar.

Struktur cepat:
- Konteks singkat: pada kasus "Trade-off monolith vs microservices?", saya mulai dari risiko tertinggi yang memengaruhi user dan operasi.
- Aksi utama: saya pilih langkah implementasi yang paling cepat divalidasi dengan data.
- Keputusan teknis/non-teknis: saya jelaskan trade-off agar keputusan tetap pragmatis dan bisa dipertanggungjawabkan.
- Hasil terukur: saya ukur dampak ke latency, error rate, stabilitas, dan kecepatan delivery.
- Closing relevan ke posisi: pendekatan ini relevan untuk role backend healthcare yang menuntut reliability tinggi.

## 3) Versi Ultra Singkat (10-20 detik)

> Saya pilih monolith atau microservices berdasarkan konteks tim, domain, dan beban operasional, bukan ideologi teknis.

## 4) Bukti Konkret (Wajib)

- Proyek/fitur yang relevan: Siloam Hospitals (optimasi performa, integrasi sistem, service Node.js TypeScript).
- Angka dampak (latency, error rate, revenue, waktu delivery, dll): redundant API call turun sekitar 70% pada view yang diukur.
- Peran spesifik saya (hindari klaim tim tanpa kontribusi pribadi): analisis akar masalah, implementasi solusi inti, validasi hasil, dan koordinasi lintas tim.
- Teknologi/alat yang digunakan: React, Next.js, TypeScript, Node.js, PostgreSQL, SQL Server, Elastic APM, SonarQube.
- Definisi strategi: context-first architecture choice = keputusan arsitektur ditentukan oleh konteks organisasi dan produk saat ini.

## 5) Red Flags (Yang Harus Dihindari)

- Jawaban normatif tanpa contoh proyek nyata.
- Klaim dampak tanpa metrik/indikator.
- Terlalu panjang hingga inti jawaban hilang.
- Menyalahkan pihak lain tanpa menunjukkan tindakan perbaikan.
- Tidak menyebut trade-off dari keputusan yang diambil.

## 6) Follow-up yang Biasanya Muncul

- Follow-up 1: Bagaimana desain tetap scalable?
  - Jawaban ideal singkat: Pisahkan bottleneck path, cache selective, dan scale horizontal pada komponen kritikal.
- Follow-up 2: Bagaimana menangani partial failure?
  - Jawaban ideal singkat: State machine jelas, retry terbatas, dan fallback yang tidak merusak konsistensi.
- Follow-up 3: Kenapa tidak pakai arsitektur paling canggih?
  - Jawaban ideal singkat: Saya pilih desain yang paling maintainable oleh tim sambil memenuhi SLA target.

## 7) Trade-off / Keputusan (Jika Technical)

- Opsi yang dipertimbangkan: arsitektur sederhana cepat implementasi vs arsitektur modular dengan ketahanan lebih tinggi.
- Kenapa opsi final dipilih: perlu keseimbangan antara maintainability tim dan kebutuhan scale.
- Risiko dari opsi final: kompleksitas operasional meningkat.
- Mitigasi: observability end-to-end, runbook, dan ownership komponen yang jelas.

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

- Pertanyaan: Trade-off monolith vs microservices?
- Jawaban 3 kalimat: Konteks masalah, keputusan utama, dan dampak yang bisa diukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh nyata.
- Follow-up paling mungkin: Kenapa memilih pendekatan itu dibanding alternatif lain?
