# Bagaimana kamu menjaga ritme delivery tanpa mengorbankan reliability?

## 1) Pertanyaan

- Pertanyaan interviewer: Bagaimana kamu menjaga ritme delivery tanpa mengorbankan reliability?
- Kategori: Leadership, Collaboration, Delivery
- Tujuan tersembunyi interviewer (yang sedang dinilai): kedalaman pemahaman teknis, kualitas keputusan, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Menjaga ritme delivery tanpa mengorbankan reliability saya lakukan dengan quality guardrail yang tidak dinegosiasikan: test kritikal, observability minimum, dan rollback readiness. Saya atur scope sprint agar kapasitas tim tidak habis untuk fitur saja; selalu ada ruang untuk hardening teknis. Ketika tekanan deadline naik, saya lebih memilih memangkas scope non-esensial daripada menurunkan standar reliability. Dengan begitu, ritme tetap jalan dan risiko incident tetap terkendali. Bagi saya, delivery cepat yang rapuh itu hutang yang segera jatuh tempo.

Struktur cepat:
- Konteks singkat: akselerasi tanpa guardrail sering berujung incident.
- Aksi utama: tetapkan standar reliability minimum yang wajib lolos tiap release.
- Keputusan teknis/non-teknis: trade-off dilakukan di scope, bukan kualitas kritikal.
- Hasil terukur: release cadence terjaga dengan defect kritikal lebih rendah.
- Closing relevan ke posisi: saya terbiasa menyeimbangkan kecepatan dan ketahanan sistem.

## 3) Versi Ultra Singkat (10-20 detik)

> Saya jaga ritme delivery dengan guardrail kualitas tetap ketat, lalu kompromi di scope non-kritikal, bukan di reliability.

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

- Follow-up 1: Bagaimana menghadapi perbedaan prioritas stakeholder?
  - Jawaban ideal singkat: Saya transparan soal trade-off dampak bisnis, risiko teknis, dan kapasitas tim.
- Follow-up 2: Bagaimana membangun ownership tim?
  - Jawaban ideal singkat: Saya pastikan scope, owner, dan definition of done jelas sejak awal.
- Follow-up 3: Apa hal yang paling kamu jaga saat delivery?
  - Jawaban ideal singkat: Konsistensi kualitas minimum agar kecepatan tidak berubah jadi technical debt.

## 7) Trade-off / Keputusan (Jika Technical)

- Opsi yang dipertimbangkan: dorong delivery secepat mungkin vs delivery terukur dengan quality baseline.
- Kenapa opsi final dipilih: hasil lebih sustainable dan mengurangi debt operasional.
- Risiko dari opsi final: negosiasi stakeholder lebih kompleks.
- Mitigasi: komunikasi data-driven dan checkpoint progres rutin.

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

- Pertanyaan: Bagaimana kamu menjaga ritme delivery tanpa mengorbankan reliability?
- Jawaban 3 kalimat: konteks masalah, keputusan inti, dan dampak terukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh produksi.
- Follow-up paling mungkin: Kenapa pendekatan ini dipilih dibanding alternatif lain?
