# Breaking Down Problem dan Membagi Pekerjaan ke Tim

## Tujuan

Dokumen ini menjelaskan cara **memecah masalah** besar menjadi pekerjaan paralel yang jelas ownership-nya, dengan batasan antarmuka yang mengurangi merge conflict dan rework.

## Kenapa Topik Ini Penting

- Masalah besar tanpa dekomposisi menghasilkan branch panjang dan integrasi menyakitkan.
- Pembagian buruk menciptakan bottleneck sequential tak perlu.

## Langkah nol: definisi outcome

Sebelum task breakdown, tulis:

- definisi selesai untuk pengguna atau sistem;
- constraint waktu dan risiko.

Tanpa outcome, breakdown menjadi daftar aktivitas tanpa arah.

## Identifikasi boundary

Pecah berdasarkan:

- bounded context domain;
- lapisan (API, worker, UI);
- risiko (area berisiko tinggi dapat diparallelkan dengan spike terpisah).

## Kerja vertikal vs horizontal

### Vertical slice

Satu engineer menyelesaikan alur tipikal end-to-end kecil.

Mengurangi handoff dan meningkatkan feedback.

### Horizontal layer

Berguna untuk infrastruktur bersama tetapi risiko integrasi di akhir.

Campuran sering optimal: slice untuk fitur, horizontal untuk platform.

## Kontrak antar-task

Dokumentasikan:

- format API sementara;
- event schema;
- flag perilaku.

Kontrak berubah harus punya owner dan versi.

## Ukuran task

Task ideal selesai dalam 1–3 hari untuk mengurangi uncertainty.

Task “implementasi total refactor” tanpa sub-milestone adalah red flag.

## Dependency graph

Gambar DAG sederhana: node tugas, edge dependency.

Paralelkan jalur kritis panjang jika memungkinkan.

## Spike time-box

Untuk ketidakpastian tinggi, spike 1–2 hari dengan output: keputusan, perkiraan, risiko.

Spike tanpa batas waktu menjadi proyek gelap.

## Koordinasi harian ringan

Sync singkat atau status async yang menjawab:

- apa yang menghalangi;
- apakah kontrak antar pihak berubah.

## Anti-pattern

### Micro-task tanpa konteks

Engineer kehilangan makna.

### “Everyone on the same file”

Konflik merge dan frustasi.

### Menunda integrasi hingga akhir sprint

Menemukan masalah arsitektur terlambat.

### Memecah berdasarkan orang, bukan masalah

Menghasilkan silo pengetahuan.

## Heuristik senior

1. Pecah hingga setiap task punya test acceptance jelas.
2. Prioritaskan risiko awal dalam sprint.
3. Gunakan feature flag untuk menggabungkan partial work ke trunk.

## Pertanyaan interview

### Dasar

- Apa beda vertical slice dan horizontal layer?
- Bagaimana Anda menangani dependency keras antar task?

### Menengah

- Bagaimana Anda memecah proyek lintas 3 tim tanpa daily meeting panjang?

### Senior

- Bagaimana Anda mendeteksi breakdown yang terlalu optimis sebelum sprint dimulai?

## Kasus nyata

- Dua tim mengimplementasikan format event berbeda—integrasi gagal. Mitigasi: schema registry dan contoh fixture bersama.

## Ringkasan brutal

- Breakdown yang baik adalah **desain antarmuka**, bukan sekadar daftar todo di Jira.

## Checklist

- [ ] Outcome dan acceptance criteria jelas per task.
- [ ] Kontrak antar-task tertulis.
- [ ] Dependency graph direview.
- [ ] Spike untuk area tidak pasti.

## Penutup

Membagi pekerjaan adalah **kepemimpinan teknis**—memengaruhi kecepatan lebih dari jam coding individu.

## Kedalaman: workstream lead

Untuk proyek besar, tunjuk lead per stream dengan mandat koordinasi kontrak.

## Kedalaman: tooling

Issue tracker dengan field dependency dan estimasi ringan membantu transparansi.

## Latihan meja

Ambil fitur “notifikasi email untuk order completed”. Pecah menjadi 6 task dengan kontrak jelas.

## Glosarium

- **Spike**: eksplorasi time-box untuk mengurangi ketidakpastian teknis.

## Ekstensi: design pairing awal

Sesi desain 60 menit sebelum breakdown mengurangi revisi besar di minggu ketiga.

## Penutup organisasi

Retrospektif breakdown: apakah task yang selesai akhir minggu seharusnya dipecah lebih awal?

## Lampiran: definisi siap untuk task

- dependensi jelas;
- mock API tersedia bila perlu;
- test strategy sketched.

## Refleksi

Jika engineer sering “menunggu PR lain”, breakdown atau kontrak integrasi gagal.

## Penutup akhir

Tim cepat bukan karena semua orang jenius, melainkan karena **pekerjaan paralel yang kompatibel**.

## Tambahan: dokumentasi handoff minimal

Setiap task selesai meninggalkan catatan satu paragraf untuk integrator berikutnya—mengurangi waktu sinkronisasi verbal berulang.

## Tambahan: ukuran tim vs granularity

Tim kecil mendapat manfaat slice lebih besar; tim besar butuh kontrak lebih keras dan ownership file/directory.

## Penutup praktis

Review breakdown di awal sprint dengan pertanyaan: “apa yang paling mungkin salah?” dan alokasikan buffer di sana.

## Tambahan: integrasi bertahap

Rencanakan titik integrasi harian atau dua hari sekali meskipun task belum selesai semua—misalnya stub API di-merge lebih dulu. Integrasi big-bang di akhir sprint sering memunculkan masalah arsitektur yang sudah terlambat diperbaiki murah.

## Tambahan: definisi “siap untuk QA”

Tulis kriteria yang mencakup data seed, flag, dan environment yang dipakai QA. Tanpa itu, breakdown bisa “selesai” di mata engineer tetapi tidak terverifikasi.

## Tambahan: buffer eksplisit

Sisakan kapasitas tidak dialokasikan untuk risiko integrasi dan bugfound—menjadwalkan sprint 100% penuh task adalah resep slip tanpa akuntabilitas.

## Tambahan: retrospektif estimasi

Bandingkan estimasi awal dengan durasi aktual per task besar untuk mengkalibrasi breakdown berikutnya. Pola bias optimis harus diperbaiki dengan data, bukan dengan ceramah.

## Penutup operasional

Breakdown yang baik membuat status meeting singkat karena dependensi sudah terlihat di papan, bukan tersembunyi di kepala satu orang.

## Tambahan: komunikasi perubahan kontrak

Jika kontrak antar-task berubah, update satu pesan pinned di channel proyek dan revisi tiket dependen agar tidak ada asumsi lawas yang bertahan.

## Penutup akhir praktis

Membagi pekerjaan dengan baik adalah **desain komunikasi** sebanyak desain teknis—kontrak yang jelas mengurangi meeting improvisasi panjang.
