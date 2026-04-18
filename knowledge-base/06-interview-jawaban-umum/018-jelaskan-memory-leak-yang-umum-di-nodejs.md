# Jelaskan memory leak yang umum di Node.js.

## 1) Pertanyaan

- Pertanyaan interviewer: Jelaskan memory leak yang umum di Node.js.
- Kategori: JavaScript/TypeScript Fundamentals
- Tujuan tersembunyi interviewer (yang sedang dinilai): ketepatan cara berpikir, kedalaman pengalaman nyata, dan kualitas komunikasi jawaban.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Memory leak paling umum di Node.js yang saya temui adalah listener/timer yang tidak dibersihkan, closure menangkap object besar, dan cache in-memory tanpa eviction policy. Strategi saya leak prevention loop: deteksi lewat heap snapshot, validasi pola retain object, lalu pasang guardrail cleanup di lifecycle service. Di incident nyata, pendekatan ini membantu saya membedakan leak asli vs lonjakan memory normal karena load. Fokus saya bukan cuma restart service, tapi menghilangkan sumber leak permanen.

Struktur cepat:
- Konteks singkat: memory leak memperburuk latency lalu memicu crash saat load tinggi.
- Aksi utama: audit listener/timer/closure dan cek heap snapshot berkala.
- Keputusan teknis/non-teknis: tambah cleanup hook dan batas cache yang eksplisit.
- Hasil terukur: penggunaan memory lebih stabil dan restart darurat berkurang.
- Closing relevan ke posisi: saya terbiasa debug problem runtime sampai akar masalah.

## 3) Versi Ultra Singkat (10-20 detik)

> Saya tangani memory leak dengan leak prevention loop: profiling heap, identifikasi retain path, lalu perbaiki lifecycle cleanup.

## 4) Bukti Konkret (Wajib)

- Proyek/fitur yang relevan: Siloam Hospitals (optimasi performa, Node.js TypeScript services, integrasi lintas sistem).
- Angka dampak (latency, error rate, revenue, waktu delivery, dll): redundant API call turun sekitar 70% pada view yang diukur.
- Peran spesifik saya (hindari klaim tim tanpa kontribusi pribadi): analisis akar masalah, implementasi solusi inti, validasi hasil, dan koordinasi lintas tim.
- Teknologi/alat yang digunakan: React, Next.js, TypeScript, Node.js, PostgreSQL, SQL Server, Elastic APM, SonarQube.
- Definisi strategi: leak prevention loop = siklus deteksi, isolasi penyebab, dan pemasangan guardrail agar kebocoran memori tidak berulang.

## 5) Red Flags (Yang Harus Dihindari)

- Jawaban normatif tanpa contoh nyata.
- Klaim kontribusi tim tanpa menegaskan peran personal.
- Tidak ada metrik atau dampak.
- Jawaban muter dan tidak langsung ke inti.
- Defensif saat ditanya trade-off.

## 6) Follow-up yang Biasanya Muncul

- Follow-up 1: Bagaimana memastikan konsep ini dipahami tim?
  - Jawaban ideal singkat: Saya jelaskan lewat contoh kode kecil dan kaitkan ke bug nyata yang pernah terjadi.
- Follow-up 2: Kapan pendekatan ini tidak cocok?
  - Jawaban ideal singkat: Saat menambah kompleksitas tanpa dampak ke correctness/performance/reliability.
- Follow-up 3: Bagaimana mengecek implementasi sudah benar?
  - Jawaban ideal singkat: Lewat test yang relevan, code review, dan observasi metrik setelah rilis.

## 7) Trade-off / Keputusan (Jika Technical)

- Opsi yang dipertimbangkan: penjelasan teoretis murni vs penjelasan teoretis + contoh produksi.
- Kenapa opsi final dipilih: kombinasi konsep dan pengalaman membuat jawaban lebih kredibel.
- Risiko dari opsi final: jawaban bisa terlalu panjang jika tidak disiplin.
- Mitigasi: batasi 4-6 kalimat dan tutup dengan dampak praktis.

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

- Pertanyaan: Jelaskan memory leak yang umum di Node.js.
- Jawaban 3 kalimat: Konteks inti, aksi utama saya, dampak terukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Jawaban teori tanpa pengalaman nyata.
- Follow-up paling mungkin: Kenapa memilih pendekatan itu dibanding alternatif lain?
