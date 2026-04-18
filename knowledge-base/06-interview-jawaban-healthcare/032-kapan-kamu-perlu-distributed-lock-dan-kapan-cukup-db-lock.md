# Kapan kamu perlu distributed lock, dan kapan cukup DB lock?

## 1) Pertanyaan

- Pertanyaan interviewer: Kapan kamu perlu distributed lock, dan kapan cukup DB lock?
- Kategori: Backend/API & Data Consistency
- Tujuan tersembunyi interviewer (yang sedang dinilai): kedalaman pemahaman teknis, kualitas keputusan, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Saya pakai DB lock saat konflik berada dalam satu boundary database dan durasi lock bisa dijaga pendek. Distributed lock saya pertimbangkan saat ada resource lintas service atau lintas node yang tidak bisa dijamin hanya dengan transaction DB lokal. Di praktiknya, saya selalu mulai dari opsi paling sederhana dulu karena distributed lock punya kompleksitas operasional lebih tinggi. Kalau kebutuhan sudah lintas sistem, baru saya naikkan ke lock terdistribusi dengan timeout dan observability jelas. Prinsip saya: jangan pakai palu besar kalau masalahnya masih bisa diselesaikan di level DB dengan aman.

Struktur cepat:
- Konteks singkat: pemilihan lock yang salah bisa bikin sistem lambat atau tetap race.
- Aksi utama: identifikasi dulu scope konflik, lokal DB atau lintas service.
- Keputusan teknis/non-teknis: default ke DB lock, escalate ke distributed lock bila benar-benar perlu.
- Hasil terukur: concurrency tetap aman tanpa menambah kompleksitas berlebihan.
- Closing relevan ke posisi: saya pilih mekanisme kontrol berdasarkan kebutuhan nyata, bukan hype.

## 3) Versi Ultra Singkat (10-20 detik)

> DB lock cukup untuk konflik lokal satu database; distributed lock dipakai ketika resource kritikalnya lintas service/node.

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

- Follow-up 1: Bagaimana mencegah duplicate processing saat retry?
  - Jawaban ideal singkat: Saya gunakan idempotency key dengan scope jelas dan simpan hasil request sebelumnya.
- Follow-up 2: Kalau service downstream timeout?
  - Jawaban ideal singkat: Saya terapkan timeout eksplisit, retry terbatas dengan backoff, dan fallback aman.
- Follow-up 3: Apa bukti endpoint siap production?
  - Jawaban ideal singkat: Saya cek error rate, p95 latency, retry trend, dan hasil load test jalur kritikal.

## 7) Trade-off / Keputusan (Jika Technical)

- Opsi yang dipertimbangkan: implementasi endpoint cepat vs endpoint dengan guardrail reliability.
- Kenapa opsi final dipilih: stabilitas API menekan incident dan mempermudah integrasi klien.
- Risiko dari opsi final: effort implementasi dan governance lebih tinggi.
- Mitigasi: contract test, guideline API, dan observability pasca-rilis.

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

- Pertanyaan: Kapan kamu perlu distributed lock, dan kapan cukup DB lock?
- Jawaban 3 kalimat: konteks masalah, keputusan inti, dan dampak terukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh produksi.
- Follow-up paling mungkin: Kenapa pendekatan ini dipilih dibanding alternatif lain?
