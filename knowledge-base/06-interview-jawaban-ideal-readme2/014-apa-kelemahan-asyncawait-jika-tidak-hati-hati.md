# Apa kelemahan async/await jika tidak hati-hati?

## 1) Pertanyaan

- Pertanyaan interviewer: Apa kelemahan async/await jika tidak hati-hati?
- Kategori: JavaScript/TypeScript Fundamentals
- Tujuan tersembunyi interviewer (yang sedang dinilai): ketepatan cara berpikir, kedalaman pengalaman nyata, dan kualitas komunikasi jawaban.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Kelemahan `async/await` yang paling sering saya lihat adalah false sense of safety: kode terlihat linear, tapi race condition, swallowing error, atau serialisasi yang tidak perlu tetap bisa terjadi. Saya pernah menemukan loop async yang seharusnya paralel tapi jadi lambat karena `await` dipakai di tempat yang salah. Strategi saya adalah explicit-async-control, yaitu setiap penggunaan `await` harus jelas tujuannya: kontrol urutan, kontrol error, atau kontrol konkurensi. Saya lengkapi dengan timeout, cancellation signal, dan observability minimum untuk operasi kritikal. Dengan disiplin ini, `async/await` tetap powerful tanpa jadi sumber latency tersembunyi.

Struktur cepat:
- Konteks singkat: async/await mudah dibaca, tapi mudah disalahgunakan.
- Aksi utama: audit titik `await` untuk mencegah serialisasi tak perlu.
- Keputusan teknis/non-teknis: tambah timeout dan observability di jalur kritikal.
- Hasil terukur: latency lebih stabil dan error handling lebih konsisten.
- Closing relevan ke posisi: saya pakai async/await secara sadar terhadap dampak produksi.

## 3) Versi Ultra Singkat (10-20 detik)

> Kelemahan async/await saya atasi dengan strategi explicit-async-control: setiap `await` harus punya tujuan urutan, error, atau konkurensi yang jelas.

## 4) Bukti Konkret (Wajib)

- Proyek/fitur yang relevan: Siloam Hospitals (optimasi performa, Node.js TypeScript services, integrasi lintas sistem).
- Angka dampak (latency, error rate, revenue, waktu delivery, dll): redundant API call turun sekitar 70% pada view yang diukur.
- Peran spesifik saya (hindari klaim tim tanpa kontribusi pribadi): analisis akar masalah, implementasi solusi inti, validasi hasil, dan koordinasi lintas tim.
- Teknologi/alat yang digunakan: React, Next.js, TypeScript, Node.js, PostgreSQL, SQL Server, Elastic APM, SonarQube.
- Definisi strategi: explicit-async-control = menjadikan urutan eksekusi, batas waktu, dan model error sebagai keputusan eksplisit pada setiap operasi asinkron.

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

- Pertanyaan: Apa kelemahan async/await jika tidak hati-hati?
- Jawaban 3 kalimat: Konteks inti, aksi utama saya, dampak terukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Jawaban teori tanpa pengalaman nyata.
- Follow-up paling mungkin: Kenapa memilih pendekatan itu dibanding alternatif lain?
