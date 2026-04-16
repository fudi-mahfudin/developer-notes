# Bedanya let, const, dan var?

## 1) Pertanyaan

- Pertanyaan interviewer: Bedanya let, const, dan var?
- Kategori: JavaScript/TypeScript Fundamentals
- Tujuan tersembunyi interviewer (yang sedang dinilai): ketepatan cara berpikir, kedalaman pengalaman nyata, dan kualitas komunikasi jawaban.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Di production, saya hampir selalu pakai `const` sebagai default, `let` untuk nilai yang memang berubah, dan menghindari `var` karena hoisting serta function scope-nya sering bikin bug halus. Strategi saya adalah scope safety by default: batasi mutabilitas dari awal agar intent kode jelas dan review lebih cepat. Di tim, aturan ini saya kombinasikan dengan lint rule supaya konsisten lintas developer. Dampaknya, bug akibat reassignment tak sengaja dan shadowing jadi jauh berkurang.

Struktur cepat:
- Konteks singkat: bug variabel biasanya muncul dari scope dan mutabilitas yang tidak disiplin.
- Aksi utama: tetapkan `const` default, `let` terkontrol, `var` dihindari.
- Keputusan teknis/non-teknis: enforce lewat lint rule agar standar tim konsisten.
- Hasil terukur: bug reassignment/shadowing menurun saat review dan testing.
- Closing relevan ke posisi: saya menjaga kualitas dari keputusan fundamental paling dasar.

## 3) Versi Ultra Singkat (10-20 detik)

> Saya pakai const-by-default, let-when-needed, dan hindari var untuk menjaga scope safety serta mencegah bug halus.

## 4) Bukti Konkret (Wajib)

- Proyek/fitur yang relevan: Siloam Hospitals (optimasi performa, Node.js TypeScript services, integrasi lintas sistem).
- Angka dampak (latency, error rate, revenue, waktu delivery, dll): redundant API call turun sekitar 70% pada view yang diukur.
- Peran spesifik saya (hindari klaim tim tanpa kontribusi pribadi): analisis akar masalah, implementasi solusi inti, validasi hasil, dan koordinasi lintas tim.
- Teknologi/alat yang digunakan: React, Next.js, TypeScript, Node.js, PostgreSQL, SQL Server, Elastic APM, SonarQube.
- Definisi strategi: scope safety by default = memilih pola deklarasi variabel yang meminimalkan side effect sejak awal.

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

- Pertanyaan: Bedanya let, const, dan var?
- Jawaban 3 kalimat: Konteks inti, aksi utama saya, dampak terukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Jawaban teori tanpa pengalaman nyata.
- Follow-up paling mungkin: Kenapa memilih pendekatan itu dibanding alternatif lain?
