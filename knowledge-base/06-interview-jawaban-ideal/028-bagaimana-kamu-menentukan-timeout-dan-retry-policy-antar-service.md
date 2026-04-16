# Bagaimana kamu menentukan timeout dan retry policy antar service?

## 1) Pertanyaan

- Pertanyaan interviewer: Bagaimana kamu menentukan timeout dan retry policy antar service?
- Kategori: Backend/API & Data Consistency
- Tujuan tersembunyi interviewer (yang sedang dinilai): kedalaman pemahaman teknis, kualitas keputusan, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Menentukan timeout dan retry policy saya lakukan per dependency, bukan satu angka global untuk semua service. Saya lihat karakter endpoint: criticality, SLA dependency, dan biaya retry terhadap sistem downstream. Retry selalu saya batasi dengan backoff dan idempotency guard supaya tidak berubah jadi retry storm. Saya juga definisikan kapan harus fail fast vs fallback agar perilaku sistem tetap prediktif. Dengan policy seperti ini, sistem lebih stabil saat ada gangguan eksternal.

Struktur cepat:
- Konteks singkat: policy seragam untuk semua service biasanya tidak efektif.
- Aksi utama: tetapkan timeout/retry berbasis karakter dependency.
- Keputusan teknis/non-teknis: reliability jangka panjang didahulukan dari “terlihat selalu sukses”.
- Hasil terukur: insiden timeout berantai dan overload dependency lebih terkendali.
- Closing relevan ke posisi: ini kunci untuk integrasi service yang sehat.

## 3) Versi Ultra Singkat (10-20 detik)

> Timeout-retry policy saya set per dependency dengan backoff, batas retry, dan idempotency guard agar tidak memicu retry storm.

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

- Pertanyaan: Bagaimana kamu menentukan timeout dan retry policy antar service?
- Jawaban 3 kalimat: konteks masalah, keputusan inti, dan dampak terukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh produksi.
- Follow-up paling mungkin: Kenapa pendekatan ini dipilih dibanding alternatif lain?
