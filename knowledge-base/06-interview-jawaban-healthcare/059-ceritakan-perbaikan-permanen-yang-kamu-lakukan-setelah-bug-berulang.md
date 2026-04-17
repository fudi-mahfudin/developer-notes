# Ceritakan perbaikan permanen yang kamu lakukan setelah bug berulang.

## 1) Pertanyaan

- Pertanyaan interviewer: Ceritakan perbaikan permanen yang kamu lakukan setelah bug berulang.
- Kategori: Reliability, Incident, Observability
- Tujuan tersembunyi interviewer (yang sedang dinilai): kedalaman pemahaman teknis, kualitas keputusan, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Perbaikan permanen setelah bug berulang biasanya saya mulai dari dua sisi: perbaikan code path dan perbaikan guardrail. Code path saya rapikan supaya akar bug hilang, lalu saya tambah regression test agar pola yang sama tidak lolos lagi. Di sisi operasional, saya perbaiki alert dan logging supaya sinyal awal lebih cepat terbaca. Jadi perbaikan tidak berhenti di patch, tapi sampai sistem punya antibodi terhadap bug serupa. Ini yang menurut saya membedakan tim yang sekadar reaktif dan tim yang benar-benar belajar dari insiden.

Struktur cepat:
- Konteks singkat: patch tanpa guardrail membuat bug lama mudah kambuh.
- Aksi utama: perbaiki akar code dan tambahkan perlindungan operasional.
- Keputusan teknis/non-teknis: investasi waktu di prevention lebih murah daripada incident berulang.
- Hasil terukur: frekuensi bug serupa turun dan confidence rilis naik.
- Closing relevan ke posisi: saya menutup incident dengan sistem yang lebih kuat, bukan hanya service kembali hidup.

## 3) Versi Ultra Singkat (10-20 detik)

> Perbaikan permanen saya gabungkan code fix + regression guardrail, supaya bug yang sama tidak punya jalan balik.

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

- Follow-up 1: Langkah pertama saat incident?
  - Jawaban ideal singkat: Tentukan blast radius, stabilkan layanan, lalu lanjut RCA detail.
- Follow-up 2: Bagaimana mengurangi alert noise?
  - Jawaban ideal singkat: Gunakan threshold berbasis baseline dan alert yang benar-benar actionable.
- Follow-up 3: Apa output wajib postmortem?
  - Jawaban ideal singkat: Timeline, root cause, owner action item, dan guardrail pencegahan.

## 7) Trade-off / Keputusan (Jika Technical)

- Opsi yang dipertimbangkan: fix cepat ad-hoc vs perbaikan sistematis berbasis observability.
- Kenapa opsi final dipilih: menurunkan incident berulang dan mempercepat recovery jangka panjang.
- Risiko dari opsi final: investasi awal lebih besar.
- Mitigasi: implementasi bertahap dari jalur paling kritikal.

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

- Pertanyaan: Ceritakan perbaikan permanen yang kamu lakukan setelah bug berulang.
- Jawaban 3 kalimat: konteks masalah, keputusan inti, dan dampak terukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh produksi.
- Follow-up paling mungkin: Kenapa pendekatan ini dipilih dibanding alternatif lain?
