# Ownership Lintas Fungsi saat Incident atau Proyek Kompleks

## Tujuan

Dokumen ini menjelaskan bagaimana mendefinisikan **ownership** ketika masalah melintasi engineering, product, support, legal, dan infra—agar tidak ada “bola jatuh di antara kursi” saat insiden atau proyek kompleks.

## Kenapa Topik Ini Penting

- Insiden sering memburuk karena tidak jelas siapa **Incident Commander** dan siapa yang hanya mengamati.
- Proyek kompleks gagal karena antarmuka tanggung jawab kabur.

## Definisi ownership

Ownership berarti:

- **akuntabilitas** untuk outcome;
- **wewenang** untuk mengambil keputusan dalam mandat;
- **komunikasi** status ke stakeholder.

Bukan “saya punya kode di repo itu” saja.

## Peran saat insiden

### Incident Commander (IC)

Mengkoordinasi, memutus prioritas tindakan, menjaga komunikasi.

Tidak harus engineer paling senior teknis—harus orang terbaik dalam koordinasi saat itu.

### Subject Matter Experts (SME)

Memberi fakta teknis; tidak mengambil alih IC kecuali diserahkan.

### Scribe

Mencatat timeline dan tindakan—kritis untuk RCA.

### Liaison stakeholder

Menyaring update ke non-teknis agar IC tidak terganggu setiap menit.

## Handoff antar shift

Dokumen handoff singkat:

- status sistem;
- hipotesis aktif;
- tindakan berbahaya yang sedang berjalan;
- link channel dan dashboard.

## Ownership lintas fungsi di proyek

### RACI ringan

- **Responsible**: melaksanakan.
- **Accountable**: satu orang yang menyetujui arah.
- **Consulted**: memberi input.
- **Informed**: diberi tahu hasil.

Hindari lebih dari satu **Accountable** untuk deliverable yang sama.

### Decision log

Catat keputusan besar dengan tanggal dan pemicu—mirip ADR untuk proyek.

## Konflik prioritas

Naikkan ke **Accountable** dengan data:

- dampak pengguna;
- SLA;
- biaya delay.

Tanpa jalur eskalasi, deadlock politis.

## Budaya “default assignee”

Untuk sistem bersama (misalnya pipeline deploy), definikan tim platform sebagai default owner ticket orphan.

## Anti-pattern

### Semua orang di channel, tidak ada IC

Keputusan lambat dan duplikasi kerja.

### IC mikro-manage setiap perintah teknis

Bottleneck.

### “Bukan tim saya” saat sistem integrasi down

Ownership kabur.

### Blamestorming di channel publik

Menghancurkan psikologi dan tidak memperbaiki sistem.

## Heuristik senior

1. Tetapkan IC dalam 5 menit pertama insiden besar.
2. Satu komunikasi keluar channel resmi untuk update eksternal.
3. Postmortem fokus sistem, bukan individu—kecuali pelanggaran prosedur disengaja.

## Pertanyaan interview

### Dasar

- Apa peran Incident Commander?
- Bagaimana Anda menghindari duplikasi kerja saat banyak engineer volunteer?

### Menengah

- Bagaimana Anda menangani vendor third-party yang lambat merespons saat insiden?

### Senior

- Bagaimana Anda mendesain governance ownership untuk platform internal yang dipakai 50 tim?

## Kasus nyata

- Insiden pembayaran: legal dan finance perlu join—IC mengatur jadwal update jam demi jam agar tidak chaos.

## Ringkasan brutal

- Ownership lintas fungsi tanpa **peran eksplisit** adalah undangan untuk finger-pointing setelah api padam.

## Checklist insiden

- [ ] IC ditunjuk.
- [ ] Scribe aktif.
- [ ] Status page / komunikasi customer teratur.
- [ ] Handoff antar shift jelas.

## Penutup

Kepemimpinan saat krisis lebih tentang **kejelasan peran** daripada kejeniusan individu.

## Kedalaman: vendor dependency

Definisikan kontak escalation dan SLA di kontrak; saat insiden, jalur telepon/ ticket prioritas harus sudah diuji.

## Kedalaman: komunikasi legal

Untuk data breach, legal memimpin narasi publik—engineering menyediakan fakta teknis cepat dan akurat.

## Latihan meja

Simulasikan insiden multi-layanan: tulis daftar peran dan siapa memenuhi masing-masing.

## Glosarium

- **IC**: Incident Commander.

## Ekstensi: proyek regulasi

Ownership mencakup compliance officer sebagai consulted wajit—shift kiri compliance.

## Penutup organisasi

Playbook insiden dan proyek besar harus direview tahunan dengan semua fungsi relevan.

## Lampiran: template status update

- dampak pengguna saat ini;
- ETA perkiraan (rentang);
- tindakan mitigasi sedang berjalan;
- apa yang belum diketahui.

## Refleksi

Jika postmortem tidak bisa menjawab “siapa seharusnya memutus X”, perbaiki governance, bukan hanya teknis.

## Penutup akhir

Ownership yang jelas membuat **kepanikan terorganisir** mengalahkan **heroisme kacau**.

## Tambahan: proyek kompleks lintas negara

Zona waktu dan bahasa menambah friction—jadwalkan overlap dan single written source of truth async.

## Tambahan: rotasi IC

Latih IC dari berbagai level agar bus factor tidak terpusat pada satu VP engineering.

## Penutup praktis

Setelah setiap insiden besar, update satu baris playbook tentang peran yang rancu—dokumen hidup mengalahkan workshop sekali.

## Tambahan: komunikasi ke pelanggan enterprise

Untuk pelanggan B2B dengan DPA, siapkan template komunikasi yang sudah direview legal sebelumnya agar IC tidak menulis narasi hukum improvisasi di menit ke-30 insiden.

## Tambahan: multi-vendor

Jika beberapa vendor terlibat, tunjuk satu “vendor coordinator” internal untuk menghindari thread email paralel yang kontradiktif.

## Tambahan: proyek kompleks lintas kuartal

Untuk proyek multi-kuartal, review ownership tiap fase gate: siapa accountable saat desain vs implementasi vs go-live—transisi harus eksplisit.

## Tambahan: eskalasi HR/people

Jika insiden melibatkan perilaku tidak profesional di channel darurat, pisahkan thread teknis dari thread people management agar IC tidak terjebak dual role tanpa pelatihan.

## Penutup operasional

Ownership jelas mempercepat keputusan menit-menit pertama; ownership kabur memperpanjang MTTR lebih dari bug teknis sulit sekalipun.

## Tambahan: latihan tabletop

Latihan triwulanan dengan peran legal/fake vendor mengungkap gap playbook yang tidak terlihat saat latihan hanya engineering.

## Tambahan: dokumentasi kontak luar jam

Daftar telepon escalation vendor dan manajemen disimpan di tempat yang tidak bergantung pada sistem yang sedang down (misalnya status page vendor atau hotline tercetak untuk tier-0).

## Penutup akhir praktis

Insiden adalah tes organisasi: peran yang jelas mengalahkan hero individual yang kelelahan dan berisiko membuat kesalahan kedua.

## Penutup refleksi

Jika postmortem berulang menyebut “kurang komunikasi” tanpa mengubah struktur peran, organisasi belajar pelan dari insiden yang sama.
