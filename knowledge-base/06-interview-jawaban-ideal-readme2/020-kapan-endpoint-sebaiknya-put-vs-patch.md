# Kapan endpoint sebaiknya PUT vs PATCH?

## 1) Pertanyaan

- Pertanyaan interviewer: Kapan endpoint sebaiknya PUT vs PATCH?
- Kategori: Backend API & Security
- Tujuan tersembunyi interviewer (yang sedang dinilai): ketepatan cara berpikir, kedalaman pengalaman nyata, dan kualitas komunikasi jawaban.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Saya pilih PUT saat client mengirim representasi resource yang lengkap dan update-nya bersifat replacement; PATCH saya pakai untuk perubahan parsial agar payload lebih efisien. Strategi saya semantic endpoint discipline: metode HTTP dipilih berdasarkan semantik bisnis, bukan kebiasaan tim. Ini penting supaya kontrak API jelas, audit perubahan mudah, dan bug integrasi menurun.

Struktur cepat:
- Konteks singkat: salah pilih method bikin perilaku API ambigu bagi consumer.
- Aksi utama: definisikan aturan PUT/PATCH di API guideline sejak awal.
- Keputusan teknis/non-teknis: sesuaikan method dengan bentuk perubahan bisnis.
- Hasil terukur: integrasi client lebih konsisten dan error misuse endpoint berkurang.
- Closing relevan ke posisi: saya menjaga desain API tetap intuitif dan tahan evolusi.

## 3) Versi Ultra Singkat (10-20 detik)

> PUT untuk replace penuh, PATCH untuk perubahan parsial; saya jaga disiplin semantik agar kontrak API tetap jelas.

## 4) Bukti Konkret (Wajib)

- Proyek/fitur yang relevan: Siloam Hospitals (optimasi performa, Node.js TypeScript services, integrasi lintas sistem).
- Angka dampak (latency, error rate, revenue, waktu delivery, dll): redundant API call turun sekitar 70% pada view yang diukur.
- Peran spesifik saya (hindari klaim tim tanpa kontribusi pribadi): analisis akar masalah, implementasi solusi inti, validasi hasil, dan koordinasi lintas tim.
- Teknologi/alat yang digunakan: React, Next.js, TypeScript, Node.js, PostgreSQL, SQL Server, Elastic APM, SonarQube.
- Definisi strategi: semantic endpoint discipline = menentukan method HTTP dari makna perubahan bisnis yang sebenarnya.

## 5) Red Flags (Yang Harus Dihindari)

- Jawaban normatif tanpa contoh nyata.
- Klaim kontribusi tim tanpa menegaskan peran personal.
- Tidak ada metrik atau dampak.
- Jawaban muter dan tidak langsung ke inti.
- Defensif saat ditanya trade-off.

## 6) Follow-up yang Biasanya Muncul

- Follow-up 1: Bagaimana memastikan konsistensi implementasi antar endpoint?
  - Jawaban ideal singkat: Saya pakai guideline API, contract test, dan review checklist khusus endpoint kritikal.
- Follow-up 2: Apa metrik yang kamu pantau setelah endpoint rilis?
  - Jawaban ideal singkat: Error rate, latency p95, retry pattern, dan anomali status code.
- Follow-up 3: Apa risiko jika tim tidak disiplin soal ini?
  - Jawaban ideal singkat: Risiko utamanya data inconsistency, bug sulit reproduksi, dan biaya incident meningkat.

## 7) Trade-off / Keputusan (Jika Technical)

- Opsi yang dipertimbangkan: desain endpoint cepat implementasi vs desain endpoint konsisten dan aman di retry.
- Kenapa opsi final dipilih: konsistensi API menurunkan risiko incident dan mempercepat integrasi klien.
- Risiko dari opsi final: butuh governance dan disiplin dokumentasi.
- Mitigasi: contract test, guideline API, dan observability pasca-rilis.

## 8) Struktur STAR (Opsional, untuk Behavioral)

- Situation: Ada kebutuhan perubahan pada sistem dengan batas waktu dan ekspektasi stabilitas tinggi.
- Task: Menghasilkan solusi yang benar, jelas, dan aman untuk produksi.
- Action: Saya fokus pada akar masalah, eksekusi bertahap, lalu validasi dampak.
- Result: Perubahan lebih terukur, risiko berkurang, dan komunikasi tim lebih jelas.

## 9) Checklist Kualitas Jawaban

- [x] Menjawab inti pertanyaan di awal.
- [x] Menjelaskan kontribusi personal.
- [x] Menyertakan bukti konkret dan dampak.
- [x] Menjelaskan trade-off keputusan.
- [x] Relevan dengan konteks role yang dilamar.
- [x] Durasi cocok untuk jawaban interview.

## 10) Skor Evaluasi Diri

- Kejelasan: 9/10
- Kredibilitas: 9/10
- Relevansi ke role: 9/10
- Keringkasan: 8/10
- Catatan perbaikan: siapkan 1 metrik tambahan spesifik jika interviewer minta detail lebih dalam.

---

## Template Drill Cepat (Isi < 2 Menit)

- Pertanyaan: Kapan endpoint sebaiknya PUT vs PATCH?
- Jawaban 3 kalimat: Konteks inti, aksi utama saya, dampak terukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Jawaban teori tanpa pengalaman nyata.
- Follow-up paling mungkin: Kenapa memilih pendekatan itu dibanding alternatif lain?
