# Runbook dan Postmortem

## Tujuan

Dokumen ini menjelaskan **runbook** (panduan operasi saat kejadian terulang) dan **postmortem** (pembelajaran setelah insiden) sebagai dua pilar **operability**: menurunkan MTTR dan mencegah insiden serupa tanpa menyimpan pengetahuan hanya di kepala individu.

Runbook tanpa review menjadi basi; postmortem tanpa action item menjadi teater. Keduanya harus hidup di backlog dan kebiasaan tim.

## Kenapa Topik Ini Penting

- On-call baru atau lintas zona waktu **tidak bisa** mengandalkan “tanya orang yang pernah kena”.
- Postmortem yang berkualitas mengubah **sistem dan proses**, bukan hanya dokumentasi arsip.
- Kepatuhan dan audit sering meminta bukti **respons terdokumentasi**.

## Model Mental

1. Runbook menjawab: “**Langkah apa** jika alert X muncul?”
2. Postmortem menjawab: “**Mengapa** ini terjadi dan **apa** yang kita ubah agar lebih jarang atau lebih ringan?”
3. Keduanya adalah **produk** yang punya owner dan siklus hidup.
4. Singkat dan actionable mengalahkan dokumen panjang yang tidak pernah dibaca saat pager.

## Runbook: definisi

Runbook adalah panduan ringkas—sering satu halaman per alert atau per skenario—berisi:

- trigger dan gejala yang diharapkan;
- verifikasi cepat (dashboard/query);
- mitigasi umum (restart, scale, flag off, rollback);
- eskalasi ke tim/dependency mana;
- batas waktu kapan eskalasi wajib.

## Struktur runbook yang layak

Gunakan format konsisten:

1. **Konteks**: layanan, dependensi utama.
2. **Diagnosis 5 menit**: tiga pemeriksaan pertama.
3. **Mitigasi**: perintah atau toggel yang aman.
4. **Verifikasi**: metrik yang harus kembali normal.
5. **Eskalasi**: siapa, dengan informasi apa.

## Runbook vs playbook besar

Playbook ensiklopedis sering tidak terbuka saat malam. Pecah menjadi **unit kecil** yang dapat dicari dengan nama alert.

## Uji runbook

- **Game day**: simulasikan alert, ukur apakah runbook cukup tanpa improvisasi besar.
- **Rotasi**: minta engineer yang tidak menulis runbook menjalankan latihan.

Runbook yang tidak pernah diuji adalah asumsi, bukan prosedur.

## Postmortem: tujuan

Postmortem (sering blameless) mendokumentasikan:

- timeline;
- dampak (pengguna, data, SLO);
- root dan contributing factors;
- apa yang berjalan baik;
- action items dengan owner.

## Format postmortem singkat

1. Ringkasan satu paragraf.
2. Timeline bullet dengan timestamp UTC.
3. Dampak terukur.
4. RCA ringkas dengan bukti.
5. Action items tabel: item, owner, due, jenis (mitigasi, deteksi, pencegahan).

## Blameless bukan tanpa akuntabilitas

Bedakan:

- **tidak menyalahkan individu secara personal**;
- dengan **mengakui** gap proses, review, atau kepemilikan yang perlu diperbaiki.

## Anti-pattern runbook

- Link ke wiki 40 halaman tanpa entry point.
- Perintah copy-paste tanpa penjelasan efek samping.
- Tidak ada versi atau tanggal terakhir diverifikasi.

## Anti-pattern postmortem

- Hanya “human error” tanpa perbaikan sistem.
- Action item vagus (“perbaiki monitoring”) tanpa owner.
- Tidak pernah ditindaklanjuti di sprint planning.

## Heuristik senior

1. Satu runbook per alert paging kritis.
2. Review runbook saat arsitektur berubah.
3. Postmortem dalam 48–72 jam setelah stabil (kecuali regulasi lain).
4. Tindak lanjut action item seperti bug P0/P1.

## Pertanyaan interview

### Dasar

- Apa beda runbook dan dokumentasi umum?
- Apa isi minimal postmortem?

### Menengah

- Bagaimana Anda menguji efektivitas runbook?
- Bagaimana memastikan action item tidak menguap?

### Senior

- Bagaimana Anda membangun budaya postmortem tanpa membuat tim defensif?

## Kasus nyata

- Runbook “DB connection exhausted” berisi langkah scale pool + eskalasi DBA → MTTR turun drastis.
- Postmortem tanpa action item berulang tiga kali untuk pola sama → sinyal kegagalan manajemen prioritas.

## Ringkasan brutal

- Runbook yang tidak dibaca saat insiden adalah sampah digital.
- Postmortem tanpa perubahan backlog adalah peluang yang dibuang.

## Checklist

- Saya punya runbook untuk alert paging utama.
- Saya pernah memperbarui runbook setelah perubahan sistem.
- Saya tahu format postmortem tim dan SLA penyelesaian action item.

## Penutup

Operability matang berarti pengetahuan insiden **ditransfer ke organisasi**, bukan hanya diingat oleh orang yang kebetulan shift malam itu.

## Lampiran: template runbook satu halaman

**Judul alert**: …  
**Owner layanan**: …  
**Gejala**: …  
**Cek cepat**: (1) … (2) … (3) …  
**Mitigasi**: …  
**Verifikasi**: metrik … harus …  
**Eskalasi**: ke … dengan data …  
**Catatan**: versi runbook, tanggal uji terakhir.

## Lampiran: template postmortem

**Insiden**: ID …  
**Periode dampak**: …  
**Severity**: …  
**Ringkasan**: …  
**Timeline**: …  
**Dampak**: …  
**RCA**: …  
**Yang berjalan baik**: …  
**Action items**: tabel …  
**Pelajaran**: …

## Kedalaman: integrasi dengan ticketing

Hubungkan runbook ke:

- tiket incident;
- tag layanan;
- CMDB atau service catalog jika ada.

Ini mempermudah audit trail dan statistik MTTR per komponen.

## Kedalaman: multibahasa dan multizonasi

Jika tim global:

- gunakan UTC eksplisif;
- hindari istilah lokal yang ambigu;
- sediakan ringkasan non-teknis untuk PM di channel terpisah.

## Latihan

Pilih satu alert musiman; tulis runbook dari nol dalam 30 menit, lalu review peer.

## Glosarium

- **Runbook**: prosedur operasi.
- **Postmortem**: belajar setelah stabil, bukan saat masih kebakaran.

## Penutup organisasi

Tanpa sponsor manajemen untuk **waktu** menulis dan menutup action item, runbook dan postmortem akan selalu kalah dari tekanan fitur. Itu keputusan prioritas, bukan kemampuan individual.

## Tambahan: metrik adopsi runbook

Ukur:

- berapa kali runbook diakses saat insiden vs di luar insiden;
- apakah langkah mitigasi paling atas cukup atau engineer selalu scroll ke bawah mencari “jalan pintas”.

Jika pola “selalu melewati langkah 1–3”, runbook perlu disederhanakan atau alert perlu diperbaiki.

## Tambahan: postmortem untuk insiden “kecil”

Insiden tanpa outage penuh tetap layak postmortem ringkas jika:

- hampir menyebabkan data corruption;
- mengungkap gap observability besar;
- mengulang pola yang sudah pernah terjadi.

Kriteria “layak postmortem” sebaiknya transparan agar tim tidak merasa dihukum untuk transparansi.
