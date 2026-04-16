# Ceritakan proyek paling berdampak di Siloam Hospitals.

## 1) Pertanyaan

- Pertanyaan interviewer: Ceritakan proyek paling berdampak di Siloam Hospitals.
- Kategori: Behavioral & Communication
- Tujuan tersembunyi interviewer (yang sedang dinilai): kedalaman pemahaman teknis, kualitas keputusan, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Proyek paling berdampak buat saya di Siloam adalah optimasi transaction review flow yang sebelumnya terasa lambat di operasional harian. Saya mulai dari tracing menggunakan Elastic APM, lalu menemukan bottleneck di pola fetch dan struktur data-table. Setelah itu saya refactor jalur request dan merapikan alur data agar call yang tidak perlu bisa dieliminasi. Hasilnya, redundant API call turun sekitar 70% pada view yang kami ukur dan pengalaman pengguna internal jadi jauh lebih responsif. Saya anggap proyek ini berdampak karena efeknya langsung terasa ke tim yang memakai sistem setiap hari.

Struktur cepat:
- Konteks singkat: ada pain point performa di alur transaksi yang sering dipakai.
- Aksi utama: saya lakukan profiling, identifikasi bottleneck, lalu refactor terarah.
- Keputusan teknis/non-teknis: perbaiki root cause dulu, bukan menambah workaround.
- Hasil terukur: redundant API call turun sekitar 70% di view yang dipantau.
- Closing relevan ke posisi: saya bisa mengubah data observability jadi improvement nyata.

## 3) Versi Ultra Singkat (10-20 detik)

> Proyek paling berdampak saya adalah optimasi flow transaksi di Siloam yang menurunkan redundant API call sekitar 70% dan mempercepat kerja user internal.

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

- Follow-up 1: Bagaimana memastikan jawabanmu tidak terdengar generik?
  - Jawaban ideal singkat: Saya selalu kaitkan dengan situasi spesifik, tindakan personal, dan dampak terukur.
- Follow-up 2: Apa keputusan paling sulit yang pernah kamu ambil?
  - Jawaban ideal singkat: Biasanya trade-off speed vs reliability, lalu saya pilih jalur paling aman untuk operasi.
- Follow-up 3: Kalau diulang, apa yang kamu ubah?
  - Jawaban ideal singkat: Saya akan menambah observability lebih awal agar feedback loop lebih cepat.

## 7) Trade-off / Keputusan (Jika Technical)

- Opsi yang dipertimbangkan: jawaban aman normatif vs jawaban berbasis pengalaman konkret.
- Kenapa opsi final dipilih: jawaban berbasis bukti lebih kredibel dan membedakan kandidat.
- Risiko dari opsi final: rawan over-claim jika tidak hati-hati.
- Mitigasi: fokus pada kontribusi personal dan dampak yang benar-benar terukur.

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

- Pertanyaan: Ceritakan proyek paling berdampak di Siloam Hospitals.
- Jawaban 3 kalimat: konteks masalah, keputusan inti, dan dampak terukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh produksi.
- Follow-up paling mungkin: Kenapa pendekatan ini dipilih dibanding alternatif lain?
