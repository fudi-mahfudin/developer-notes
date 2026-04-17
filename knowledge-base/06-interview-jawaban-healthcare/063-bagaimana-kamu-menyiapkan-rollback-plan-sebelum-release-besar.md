# Bagaimana kamu menyiapkan rollback plan sebelum release besar?

## 1) Pertanyaan

- Pertanyaan interviewer: Bagaimana kamu menyiapkan rollback plan sebelum release besar?
- Kategori: Reliability, Incident, Observability
- Tujuan tersembunyi interviewer (yang sedang dinilai): kedalaman pemahaman teknis, kualitas keputusan, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Sebelum release besar, rollback plan saya selalu saya perlakukan sebagai bagian dari release plan, bukan lampiran. Saya siapkan titik balik yang jelas: versi apa yang jadi target rollback, bagaimana skema data kompatibel, dan siapa yang mengeksekusi jika trigger terpenuhi. Saya juga pasang indikator keputusan rollback yang objektif, misalnya error spike atau degradasi latency di endpoint kritikal. Di pengalaman saya, rollback yang tidak dilatih hanya memberi rasa aman palsu. Karena itu saya lebih suka rollback sederhana yang benar-benar bisa dijalankan cepat.

Struktur cepat:
- Konteks singkat: release besar tanpa rollback siap meningkatkan blast radius.
- Aksi utama: definisikan trigger rollback, jalur eksekusi, dan owner yang jelas.
- Keputusan teknis/non-teknis: pilih rollback yang sederhana tapi pasti bisa dijalankan.
- Hasil terukur: waktu recovery saat release bermasalah jauh lebih cepat.
- Closing relevan ke posisi: saya anggap rollback sebagai fitur reliability, bukan prosedur darurat.

## 3) Versi Ultra Singkat (10-20 detik)

> Rollback plan saya siapkan sejak awal release: trigger objektif, langkah eksekusi jelas, dan kompatibilitas data sudah dipikirkan.

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

- Pertanyaan: Bagaimana kamu menyiapkan rollback plan sebelum release besar?
- Jawaban 3 kalimat: konteks masalah, keputusan inti, dan dampak terukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh produksi.
- Follow-up paling mungkin: Kenapa pendekatan ini dipilih dibanding alternatif lain?
