# Bedanya authentication dan authorization?

## 1) Pertanyaan

- Pertanyaan interviewer: Bedanya authentication dan authorization?
- Kategori: Backend API & Security
- Tujuan tersembunyi interviewer (yang sedang dinilai): kemampuan reasoning, kedalaman teknis, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Authentication menjawab 'siapa kamu', sedangkan authorization menjawab 'apa yang boleh kamu lakukan'. Strategi saya authn-before-authz discipline: identitas diverifikasi dulu, lalu hak akses dicek berdasarkan role/scope resource. Di incident review, pemisahan ini sangat membantu karena sumber kegagalan cepat ketahuan apakah token invalid atau privilege kurang.

Struktur cepat:
- Konteks singkat: mencampur authn/authz sering bikin celah keamanan dan bug akses.
- Aksi utama: pisahkan middleware verifikasi identitas dan evaluasi permission.
- Keputusan teknis/non-teknis: gunakan role/scope yang eksplisit per resource.
- Hasil terukur: kontrol akses lebih presisi dan audit log lebih jelas.
- Closing relevan ke posisi: saya menjaga security model tetap sederhana tapi kuat.

## 3) Versi Ultra Singkat (10-20 detik)

> Authn verifikasi identitas, authz verifikasi izin; saya selalu terapkan urutan authn-before-authz secara disiplin.

## 4) Bukti Konkret (Wajib)

- Proyek/fitur yang relevan: Siloam Hospitals (optimasi performa, integrasi sistem, service Node.js TypeScript).
- Angka dampak (latency, error rate, revenue, waktu delivery, dll): redundant API call turun sekitar 70% pada view yang diukur.
- Peran spesifik saya (hindari klaim tim tanpa kontribusi pribadi): analisis akar masalah, implementasi solusi inti, validasi hasil, dan koordinasi lintas tim.
- Teknologi/alat yang digunakan: React, Next.js, TypeScript, Node.js, PostgreSQL, SQL Server, Elastic APM, SonarQube.
- Definisi strategi: authn-before-authz discipline = memastikan proses identitas dan otorisasi dipisah jelas dengan urutan yang benar.

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

- Pertanyaan: Bedanya authentication dan authorization?
- Jawaban 3 kalimat: Konteks masalah, keputusan utama, dan dampak yang bisa diukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh nyata.
- Follow-up paling mungkin: Kenapa memilih pendekatan itu dibanding alternatif lain?
