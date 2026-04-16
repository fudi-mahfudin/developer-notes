# Bagaimana kamu melakukan graceful degradation di fitur kritikal?

## 1) Pertanyaan

- Pertanyaan interviewer: Bagaimana kamu melakukan graceful degradation di fitur kritikal?
- Kategori: Reliability, Incident, Observability
- Tujuan tersembunyi interviewer (yang sedang dinilai): kedalaman pemahaman teknis, kualitas keputusan, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Graceful degradation di fitur kritikal saya lakukan dengan mendefinisikan mode layanan minimal yang tetap bernilai untuk user saat sebagian komponen gagal. Misalnya, kalau dependency tertentu down, saya tetap layani alur inti dengan data yang aman sambil menunda fitur non-esensial. Saya selalu bedakan fitur mana yang wajib real-time dan mana yang boleh stale terbatas. Pendekatan ini saya pilih supaya sistem tidak jatuh total hanya karena satu titik gagal. Jadi degradasi itu disengaja dan terdesain, bukan “error handling dadakan” saat incident.

Struktur cepat:
- Konteks singkat: fitur kritikal harus tetap tersedia meski kapasitas turun.
- Aksi utama: definisikan mode operasi minimum dan prioritas fungsi inti.
- Keputusan teknis/non-teknis: kurangi fitur sekunder, pertahankan alur bisnis utama.
- Hasil terukur: gangguan user berkurang dan sistem tetap operasional saat incident.
- Closing relevan ke posisi: saya fokus pada kesinambungan layanan, bukan status semua fitur harus hijau.

## 3) Versi Ultra Singkat (10-20 detik)

> Saya desain mode minimum layanan saat komponen gagal, supaya fitur kritikal tetap usable walau tidak 100% lengkap.

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

- Pertanyaan: Bagaimana kamu melakukan graceful degradation di fitur kritikal?
- Jawaban 3 kalimat: konteks masalah, keputusan inti, dan dampak terukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh produksi.
- Follow-up paling mungkin: Kenapa pendekatan ini dipilih dibanding alternatif lain?
