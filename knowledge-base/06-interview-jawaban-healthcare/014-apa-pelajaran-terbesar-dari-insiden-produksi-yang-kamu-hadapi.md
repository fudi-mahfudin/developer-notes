# Apa pelajaran terbesar dari insiden produksi yang kamu hadapi?

## 1) Pertanyaan

- Pertanyaan interviewer: Apa pelajaran terbesar dari insiden produksi yang kamu hadapi?
- Kategori: Behavioral & Communication
- Tujuan tersembunyi interviewer (yang sedang dinilai): kedalaman pemahaman teknis, kualitas keputusan, dan relevansi pengalaman nyata.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Pelajaran terbesar dari insiden produksi buat saya adalah: kecepatan recovery penting, tapi pencegahan insiden berulang jauh lebih penting. Di beberapa kasus, masalah bukan datang dari satu bug besar, tapi dari kombinasi observability yang kurang jelas dan asumsi lintas tim yang tidak sinkron. Setelah insiden, saya biasakan postmortem yang fokus ke tindakan nyata: perbaikan root cause, penambahan guardrail, dan ownership yang jelas. Saya juga memastikan hasil postmortem diterjemahkan jadi perubahan process, bukan hanya dokumentasi. Dengan pola itu, insiden jadi sumber peningkatan sistem, bukan sekadar gangguan sesaat.

Struktur cepat:
- Konteks singkat: incident produksi selalu punya biaya operasional nyata.
- Aksi utama: saya stabilkan layanan dulu, lalu lanjut RCA yang actionable.
- Keputusan teknis/non-teknis: saya fokus pada perbaikan sistemik, bukan sekadar patch.
- Hasil terukur: peluang incident berulang menurun dan recovery playbook lebih siap.
- Closing relevan ke posisi: saya belajar mengubah incident menjadi peningkatan reliability jangka panjang.

## 3) Versi Ultra Singkat (10-20 detik)

> Pelajaran terbesar saya: incident harus ditutup dengan perbaikan sistemik dan guardrail, bukan hanya “service sudah hidup lagi”.

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

- Pertanyaan: Apa pelajaran terbesar dari insiden produksi yang kamu hadapi?
- Jawaban 3 kalimat: konteks masalah, keputusan inti, dan dampak terukur.
- Bukti 1 metrik: Redundant API call turun sekitar 70% pada view yang dioptimasi.
- 1 red flag yang harus dihindari: Menjawab teori tanpa contoh produksi.
- Follow-up paling mungkin: Kenapa pendekatan ini dipilih dibanding alternatif lain?
