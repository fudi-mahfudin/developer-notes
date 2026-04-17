# Bagaimana menangani rate limiting?

## 1) Pertanyaan

- Pertanyaan interviewer: Bagaimana menangani rate limiting?
- Kategori: General
- Tujuan tersembunyi interviewer (yang sedang dinilai): kemampuan reasoning, kedalaman teknis, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Rate limiting saya desain per use case: kombinasi limit per-IP, per-user, dan per-endpoint kritikal. Strategi saya protective throttling with fairness: lindungi sistem dari abuse tapi tetap adil untuk traffic normal. Biasanya saya tambahkan response header limit-remaining dan retry-after agar client bisa adaptif. Untuk endpoint sensitif, saya kombinasikan dengan circuit breaker dan queue jika perlu.

Struktur cepat:
- Konteks singkat: tanpa rate limit, spike atau abuse bisa menjatuhkan layanan.
- Aksi utama: tetapkan limit bertingkat berdasarkan identitas dan kritikalitas endpoint.
- Keputusan teknis/non-teknis: berikan sinyal retry yang jelas ke client.
- Hasil terukur: stabilitas layanan terjaga saat burst traffic.
- Closing relevan ke posisi: saya menyeimbangkan keamanan, UX, dan kapasitas sistem.

## 3) Versi Ultra Singkat (10-20 detik)

> Saya terapkan protective throttling with fairness: sistem tetap aman dari abuse tanpa mengorbankan user normal.

## 4) Bukti Konkret (Wajib)

- Proyek/fitur yang relevan: Siloam Hospitals (optimasi performa, integrasi sistem, service Node.js TypeScript).
- Angka dampak (latency, error rate, revenue, waktu delivery, dll): redundant API call turun sekitar 70% pada view yang diukur.
- Peran spesifik saya (hindari klaim tim tanpa kontribusi pribadi): analisis akar masalah, implementasi solusi inti, validasi hasil, dan koordinasi lintas tim.
- Teknologi/alat yang digunakan: React, Next.js, TypeScript, Node.js, PostgreSQL, SQL Server, Elastic APM, SonarQube.
- Definisi strategi: protective throttling with fairness = pembatasan trafik yang melindungi sistem sekaligus mempertahankan akses wajar pengguna valid.

## 5) Red Flags (Yang Harus Dihindari)

- Jawaban normatif tanpa contoh proyek nyata.
- Klaim dampak tanpa metrik/indikator.
- Terlalu panjang hingga inti jawaban hilang.
- Menyalahkan pihak lain tanpa menunjukkan tindakan perbaikan.
- Tidak menyebut trade-off dari keputusan yang diambil.

## 6) Follow-up yang Biasanya Muncul

- Follow-up 1: Bagaimana memastikan jawaban tidak generik?
  - Jawaban ideal singkat: Saya selalu sertakan konteks proyek, kontribusi personal, dan satu dampak terukur.
- Follow-up 2: Apa hal yang akan kamu perbaiki jika diulang?
  - Jawaban ideal singkat: Saya biasanya memperkuat observability dan dokumentasi keputusan sejak awal.
- Follow-up 3: Bagaimana jika prioritas berubah mendadak?
  - Jawaban ideal singkat: Saya re-scope dengan stakeholder dan jaga jalur kritikal tetap aman.

## 7) Trade-off / Keputusan (Jika Technical)

- Opsi yang dipertimbangkan: solusi cepat jangka pendek vs solusi terukur yang lebih sustainable.
- Kenapa opsi final dipilih: memberi dampak stabil tanpa mengorbankan kualitas.
- Risiko dari opsi final: butuh disiplin eksekusi lebih tinggi.
- Mitigasi: checklist kualitas, review rutin, dan evaluasi metrik pasca-rilis.

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

- Pertanyaan: Bagaimana menangani rate limiting?
- Jawaban 3 kalimat: Konteks masalah, keputusan utama, dan dampak yang bisa diukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh nyata.
- Follow-up paling mungkin: Kenapa memilih pendekatan itu dibanding alternatif lain?
