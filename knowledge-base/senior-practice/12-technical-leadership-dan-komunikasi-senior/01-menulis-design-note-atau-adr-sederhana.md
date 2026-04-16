# Menulis Design Note atau ADR Sederhana

## Tujuan

Dokumen ini menjelaskan cara menulis **design note** atau **Architecture Decision Record (ADR)** yang ringkas, dapat dicari, dan benar-benar dipakai—bukan dokumen upacara yang tidak pernah dibaca.

## Kenapa Topik Ini Penting

- Keputusan arsitektur yang hanya hidup di Slack hilang saat scroll.
- ADR terlalu berat sering membuat tim menghindari dokumentasi sama sekali.

Format sederhana yang konsisten lebih bernilai daripada template megah yang kosong.

## Kapan menulis ADR

- keputusan dengan **trade-off signifikan** (teknologi, pola data, boundary layanan);
- perubahan yang sulit di-rollback atau mahal jika salah;
- keputusan yang akan ditanyakan lagi dalam enam bulan “kenapa begini?”.

Tidak perlu ADR untuk rename variabel kecil.

## Struktur minimal ADR

1. **Judul dan tanggal**
2. **Status**: proposed, accepted, superseded
3. **Konteks**: masalah, batasan, metrik atau beban yang relevan
4. **Keputusan**: apa yang kita pilih
5. **Konsekuensi**: positif, negatif, risiko residual
6. **Alternatif yang dipertimbangkan**: singkat, dengan alasan penolakan

Empat halaman cukup untuk banyak kasus.

## Design note vs ADR

**Design note** lebih fleksibel: bisa menjelaskan eksplorasi sebelum keputusan final.

**ADR** mengunci keputusan dengan status jelas.

Gunakan keduanya jika budaya tim membedakan eksplorasi dan komitmen.

## Bahasa dan audiens

Tulis untuk engineer lain **dan** product manager yang perlu konteks risiko.

Hindari akronim tanpa definisi pertama kali.

## Bukti, bukan otoritas

Sertakan:

- benchmark kasar;
- referensi insiden terkait;
- prinsip yang dilanggar jika memilih alternatif berisiko.

“Karena saya bilang” bukan ADR.

## Lokasi dan penemuan

Simpan di repo dekat kode (`docs/adr/NNNN-judul.md`) agar PR bisa mereferensikan.

Nomor urut membantu rujukan stabil.

## Siklus hidup

Saat keputusan diganti:

- tandai ADR lama `superseded by ADR NNNN`;
- jangan hapus; sejarah penting untuk RCA budaya.

## Review

ADR sebaiknya melalui PR seperti kode:

- reviewer memeriksa konsistensi dengan sistem lain;
- dissent dicatat—keputusan bulat bukan selalu benar, tetapi proses harus jelas.

## Anti-pattern

### Template 10 halaman kosong

Menghalangi penggunaan.

### ADR setelah insiden tanpa konteks sebelumnya

Terlambat; gunakan postmortem terpisah dengan tautan.

### Dua ADR kontradiktif tanpa status

Membingungkan.

### Hanya bahasa marketing

Tanpa trade-off nyata.

## Heuristik senior

1. Time-box penulisan: draft 30–60 menit, iterasi review.
2. Satu keputusan utama per ADR; pecah jika terlalu luas.
3. Tautkan ke tiket implementasi.

## Pertanyaan interview

### Dasar

- Apa tujuan ADR?
- Apa beda konteks dan keputusan?

### Menengah

- Bagaimana Anda menangani dissent dalam diskusi ADR?
- Bagaimana ADR berhubungan dengan RFC besar perusahaan?

### Senior

- Bagaimana Anda membuat budaya ADR di tim yang anti-dokumentasi?

## Kasus nyata

- Tim memilih event sourcing tanpa ADR—setelah turnover, tidak ada yang tahu batas bounded context. ADR retrospektif dibuat dengan sakit hati.

## Ringkasan brutal

- ADR yang tidak pernah di-update saat dunia berubah adalah **museum dust**—status `superseded` adalah fitur, bukan aib.

## Checklist

- [ ] Konteks cukup untuk pembaca baru enam bulan kemudian.
- [ ] Alternatif dan konsekuensi negatif jujur.
- [ ] Status dan tanggal jelas.
- [ ] Tautan ke PR/kode relevan.

## Penutup

Dokumentasi keputusan adalah **bahan bakar onboarding** dan **perisai politis** saat trade-off dipertanyakan ulang.

## Kedalaman: diagram ringkas

Satu diagram arsitektur sering menggantikan paragraf panjang—pastikan sumber diagram (repo) tidak hanya slide privat.

## Kedalaman: risiko compliance

Untuk domain teregulasi, ADR mungkin menjadi artefak audit—pastikan versi dan peninjau tercatat sesuai kebutuhan hukum.

## Latihan meja

Tulis ADR satu halaman untuk keputusan: cache Redis vs in-memory untuk rate limit—selesai dalam 45 menit.

## Glosarium

- **ADR**: catatan keputusan arsitektur dengan konteks dan konsekuensi.

## Ekstensi: lightweight RFC

Untuk perubahan lintas banyak tim, RFC lebih besar dengan timeline komentar publik—ADR bisa merangkum hasil akhir RFC.

## Penutup organisasi

Katalog ADR per domain membantu platform team menghindari solusi duplikat bertentangan.

## Lampiran: contoh judul

- `0007-use-postgres-for-job-queue-instead-of-redis`

Judul spesifik memudahkan pencarian.

## Refleksi

Jika tidak ada yang merujuk ADR dalam diskusi PR, kemungkinan mereka tidak tahu dokumen itu ada—perbaiki penemuan, bukan panjang teks.

## Penutup akhir

Menulis ADR sederhana dengan konsisten mengalahkan **kebijaksanaan tribal** yang hilang saat orang resign.

## Tambahan: bahasa Indonesia vs Inggris

Pilih satu bahasa dominan untuk ADR global di perusahaan multinasional; terjemahkan ringkasan eksekutif bila perlu agar tidak memecah basis pengetahuan.

## Tambahan: ADR untuk “tidak melakukan”

Keputusan untuk tidak mengadopsi teknologi hype juga layak di-ADR-kan agar diskusi tidak berulang tiap kuartal.

## Penutup praktis

Mulai dari ADR kecil yang benar-benar dipakai minggu ini, bukan program dokumentasi megah yang tidak pernah terisi.

## Tambahan: sinkronisasi wiki internal

Jika organisasi memakai wiki terpisah dari repo, setidaknya tautkan ADR ke halaman indeks yang mudah dicari. Duplikasi penuh teks ADR di wiki sering berkarat—single source of truth di git lebih mudah diverifikasi lewat PR.

## Tambahan: ADR untuk eksperimen gagal

Dokumentasikan eksperimen yang dibatalkan bersama pembelajaran. Ini mencegah tim berikutnya mengulang percobaan yang sama tanpa data baru.

## Tambahan: metrik penggunaan ADR

Periksa berapa sering ADR dirujuk PR atau postmortem per kuartal. Angka rendah sering berarti masalah penemuan atau integrasi alur kerja, bukan otomatis berarti ADR tidak berguna.

## Tambahan: onboarding ADR

Sesi singkat untuk engineer baru: lokasi katalog, arti status `superseded`, dan contoh draft ADR yang layak direview dalam satu putaran feedback.

## Penutup operasional

ADR adalah alat. Jika proses review ADR lebih berat daripada manfaatnya, sederhanakan template sebelum membuang kebiasaan dokumentasi sepenuhnya.
