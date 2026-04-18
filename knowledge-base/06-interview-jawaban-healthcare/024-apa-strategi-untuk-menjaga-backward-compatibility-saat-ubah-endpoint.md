# Apa strategi untuk menjaga backward compatibility saat ubah endpoint?

## 1) Pertanyaan

- Pertanyaan interviewer: Apa strategi untuk menjaga backward compatibility saat ubah endpoint?
- Kategori: Backend/API & Data Consistency
- Tujuan tersembunyi interviewer (yang sedang dinilai): kedalaman pemahaman teknis, kualitas keputusan, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Untuk menjaga backward compatibility, saya pakai pendekatan additive change dulu dan hindari breaking change mendadak. Kalau harus ubah kontrak besar, saya sediakan fase transisi dengan versioning, deprecation notice, dan window migrasi yang realistis. Saya juga pastikan perubahan diproteksi contract test terhadap klien lama. Ini penting karena di lingkungan healthcare sering ada integrasi yang tidak bisa diupdate serentak. Jadi strategi saya adalah evolusi endpoint, bukan revolusi yang memutus layanan.

Struktur cepat:
- Konteks singkat: breaking change mendadak bisa memutus alur integrasi kritikal.
- Aksi utama: lakukan perubahan bertahap dengan versi/transisi yang terkontrol.
- Keputusan teknis/non-teknis: stabilitas klien existing jadi prioritas utama.
- Hasil terukur: gangguan integrasi saat rollout perubahan dapat diminimalkan.
- Closing relevan ke posisi: approach ini aman untuk ekosistem integrasi besar.

## 3) Versi Ultra Singkat (10-20 detik)

> Saya jaga kompatibilitas dengan additive change, fase transisi jelas, dan contract test untuk klien lama.

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

- Pertanyaan: Apa strategi untuk menjaga backward compatibility saat ubah endpoint?
- Jawaban 3 kalimat: konteks masalah, keputusan inti, dan dampak terukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh produksi.
- Follow-up paling mungkin: Kenapa pendekatan ini dipilih dibanding alternatif lain?
