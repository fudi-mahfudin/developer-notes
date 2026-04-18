# Jelaskan circuit breaker pattern.

## 1) Pertanyaan

- Pertanyaan interviewer: Jelaskan circuit breaker pattern.
- Kategori: Reliability & Observability
- Tujuan tersembunyi interviewer (yang sedang dinilai): kemampuan reasoning, kedalaman teknis, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Circuit breaker saya gunakan untuk menghentikan panggilan berulang ke dependency yang sedang gagal agar sistem tidak ikut tumbang. Strategi saya cascading-failure containment: putus rantai kegagalan sedini mungkin sambil memberi fallback yang aman. Setelah dependency pulih, half-open trial dipakai untuk recovery bertahap.

Struktur cepat:
- Konteks singkat: pada kasus "Jelaskan circuit breaker pattern.", saya identifikasi risiko operasional paling kritikal lebih dulu.
- Aksi utama: saya pilih langkah implementasi yang bisa divalidasi cepat lewat metrik dan log produksi.
- Keputusan teknis/non-teknis: saya jelaskan trade-off agar keputusan tetap pragmatis.
- Hasil terukur: saya ukur dampaknya ke latency, error rate, stabilitas, atau lead time.
- Closing relevan ke posisi: pendekatan ini relevan untuk backend healthcare yang menuntut reliability tinggi.

## 3) Versi Ultra Singkat (10-20 detik)

> Circuit breaker saya pakai untuk mencegah cascading failure saat dependency bermasalah.

## 4) Bukti Konkret (Wajib)

- Proyek/fitur yang relevan: Siloam Hospitals (optimasi performa, integrasi sistem, service Node.js TypeScript).
- Angka dampak (latency, error rate, revenue, waktu delivery, dll): redundant API call turun sekitar 70% pada view yang diukur.
- Peran spesifik saya (hindari klaim tim tanpa kontribusi pribadi): analisis akar masalah, implementasi solusi inti, validasi hasil, dan koordinasi lintas tim.
- Teknologi/alat yang digunakan: React, Next.js, TypeScript, Node.js, PostgreSQL, SQL Server, Elastic APM, SonarQube.
- Definisi strategi: cascading-failure containment = membatasi penyebaran kegagalan dependency agar layanan inti tetap bertahan.

## 5) Red Flags (Yang Harus Dihindari)

- Jawaban normatif tanpa contoh proyek nyata.
- Klaim dampak tanpa metrik/indikator.
- Terlalu panjang hingga inti jawaban hilang.
- Menyalahkan pihak lain tanpa menunjukkan tindakan perbaikan.
- Tidak menyebut trade-off dari keputusan yang diambil.

## 6) Follow-up yang Biasanya Muncul

- Follow-up 1: Langkah pertama saat incident?
  - Jawaban ideal singkat: Saya cek blast radius, stabilkan layanan dulu, baru lanjut RCA detail.
- Follow-up 2: Bagaimana kurangi alert noise?
  - Jawaban ideal singkat: Alert dibuat berbasis baseline dan actionable condition, bukan sekadar threshold mentah.
- Follow-up 3: Apa output wajib postmortem?
  - Jawaban ideal singkat: Timeline, root cause, action item owner+due date, dan guardrail pencegahan.

## 7) Trade-off / Keputusan (Jika Technical)

- Opsi yang dipertimbangkan: patch cepat per incident vs perbaikan struktural berbasis observability.
- Kenapa opsi final dipilih: menurunkan incident berulang dan MTTR jangka panjang.
- Risiko dari opsi final: butuh investasi waktu di awal.
- Mitigasi: mulai dari endpoint paling kritikal lalu perluas bertahap.

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

- Pertanyaan: Jelaskan circuit breaker pattern.
- Jawaban 3 kalimat: Konteks masalah, keputusan utama, dan dampak yang bisa diukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh nyata.
- Follow-up paling mungkin: Kenapa memilih pendekatan itu dibanding alternatif lain?
