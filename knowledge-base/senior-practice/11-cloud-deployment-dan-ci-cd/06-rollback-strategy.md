# Rollback Strategy

## Tujuan

Dokumen ini menjelaskan bagaimana merancang **rollback** yang dapat dieksekusi di bawah tekanan: kapan rollback vs forward-fix, mekanisme revert deploy, data migration, dan komunikasi insiden.

## Kenapa Topik Ini Penting

- Tanpa strategi, rollback menjadi diskusi filosofis saat produksi merah.
- Rollback aplikasi tanpa rencana data bisa merusak konsistensi.

## Definisi rollback

Rollback mengembalikan sistem ke **keadaan operasi sebelumnya** yang diketahui stabil untuk mengurangi dampak pengguna.

Forward-fix memperbaiki ke depan tanpa revert penuh—kadang satu-satunya opsi aman.

## Kapan rollback vs forward-fix

### Rollback lebih masuk akal jika

- regresi jelas dari rilis terbaru;
- migrasi data belum destruktif atau masih reversible;
- mitigasi cepat lebih penting dari akar masalah lengkap.

### Forward-fix lebih masuk akal jika

- migrasi data sudah one-way;
- bug kecil dengan patch terisolasi dan risiko deploy rendah;
- rollback akan memperpanjang downtime lebih lama.

Keputusan harus time-box dan terdokumentasi.

## Level rollback

### Aplikasi / container

Kembalikan image digest sebelumnya via orchestrator atau pipeline.

### Konfigurasi

Revert perubahan config map / env dengan versi tersimpan.

### Database

- expand/contract memungkinkan fase mundur terbatas;
- backup/restore untuk skenario ekstrem—lambat dan berisiko.

### Feature flag

Nonaktifkan fitur bermasalah tanpa full revert binary—cepat jika arsitektur mendukung.

## Immutable artefak

Rollback andal membutuhkan artefak lama **masih tersedia** di registry dengan retensi kebijakan.

Jika image lama dihapus, rollback menjadi rebuild berbahaya.

## Database compatibility

Aturan praktis:

- deploy kode backward compatible dulu;
- lalu migrasi expand;
- kontrak baru;
- contract remove di rilis berikutnya.

Rollback kode ke versi lama bisa gagal jika skema sudah incompatible—rencanakan urutan.

## Traffic switch

Untuk blue-green/canary, rollback bisa berarti **mengalihkan traffic** kembali tanpa redeploy panjang.

## Verifikasi pasca-rollback

Setelah rollback:

- cek error rate dan latency;
- verifikasi integritas data kritikal (sampling);
- pantau queue backlog.

## Komunikasi

Template komunikasi:

- status: rollback dilakukan;
- dampak pengguna yang mungkin masih tersisa;
- ETA investigasi lanjutan.

## Anti-pattern

### Rollback tanpa tahu versi sebelumnya

Chaos.

### “Git revert” di server produksi

Tanpa pipeline—hindari kecuali break-glass.

### Rollback aplikasi tanpa mempertimbangkan job consumer versi campuran

Dapat memproses pesan dengan format baru.

### Menghapus image lama agresif

Mematikan opsi darurat.

## Heuristik senior

1. Uji rollback di staging seperti deploy biasa.
2. Simpan N versi image terakhir minimum.
3. Dokumentasikan batas rollback untuk setiap layanan data-intensif.

## Pertanyaan interview

### Dasar

- Apa beda rollback dan hotfix?
- Kenapa artefak immutable penting untuk rollback?

### Menengah

- Bagaimana Anda rollback jika migrasi DB sudah menghapus kolom?
- Bagaimana Anda menangani consumer async saat rollback versi?

### Senior

- Bagaimana kebijakan rollback berbeda untuk sistem pembayaran vs blog?

## Kasus nyata

- Rollback binary berhasil tetapi worker lama crash loop karena message format baru—mitigasi: poison queue handling dan versi skema pesan.

## Ringkasan brutal

- Rollback strategy tanpa **data story** adalah setengah strategi.

## Checklist

- [ ] Versi artefak sebelumnya dapat di-deploy ulang.
- [ ] Runbook rollback per layanan kritikal.
- [ ] Uji rollback tahunan atau setelah perubahan arsitektur besar.
- [ ] Komunikasi template siap.

## Penutup

Rollback adalah **insurance**; premi dibayar dengan disiplin artefak, migrasi bertahap, dan latihan.

## Kedalaman: dual-write window

Periode dual-write memungkinkan mundur dengan konsistensi lebih baik tetapi menambah kompleksitas—dokumentasikan durasi maksimum.

## Kedalaman: cache invalidation

Rollback aplikasi bisa meninggalkan cache stale—rencanakan TTL atau flush selektif.

## Latihan meja

Skenario: kolom baru NOT NULL tanpa default ditambahkan di prod. Apakah rollback masih aman? Apa langkah preventif seharusnya?

## Glosarium

- **Forward-fix**: patch majuan tanpa revert penuh.

## Ekstensi: automated rollback

Trigger rollback otomatis dari SLO breach membutuhkan tuning agar tidak flip-flop.

## Penutup organisasi

Latih rollback dalam game day; pertama kali saat insiden sungguhan adalah resep gagal.

## Lampiran: rollback decision tree

1. Apakah dampak user aktif? Ya → prioritas mitigasi.
2. Apakah terkait rilis terakhir dengan bukti? Ya → pertimbangkan revert app.
3. Apakah skema DB incompatible? Jika ya, flag off / forward-fix terarah.

## Refleksi

Jika tim tidak pernah melakukan rollback sukses di staging, asumsikan produksi juga tidak siap.

## Tambahan: koordinasi dengan data pipeline

Rollback aplikasi bisa membuat format event ke warehouse tidak lagi cocok dengan schema ingestion.

Pastikan pipeline downstream toleran terhadap versi skema atau freeze ingestion sementara dengan komunikasi eksplisit ke tim data.

## Tambahan: replay dan idempotensi

Jika rollback terjadi di tengah pemrosesan batch, idempotensi consumer harus mencegah duplikasi atau kehilangan.

Uji skenario “deploy → partial process → rollback → redeploy” di staging dengan volume kecil.

## Tambahan: dokumentasi batas rollback per layanan

Satu halaman per layanan tier-0: versi minimum yang kompatibel dengan skema DB saat ini, flag yang harus dimatikan sebelum revert binary, dan urutan revert (API dulu atau worker dulu).

Dokumen ini dibaca dalam latihan game day, bukan pertama kali saat pager.

## Penutup akhir

Strategi rollback yang baik membuat keputusan insiden **mechanical** di menit-menit pertama, bukan debat panjang.
