# Feature Flag

## Tujuan

Dokumen ini menjelaskan **feature flag** (toggle): kapan dipakai, desain yang aman, operasi (rollout, kill switch), dan anti-pattern yang membuat flag menjadi utang teknis permanen.

## Kenapa Topik Ini Penting

- Flag memungkinkan deploy terpisah dari **release perilaku** ke pengguna.
- Tanpa disiplin, flag menjadi spaghetti kondisional dan risiko keamanan.

## Jenis flag

### Release toggle

Menyembunyikan fitur belum siap; umumnya umur pendek.

### Ops toggle / kill switch

Mematikan cepat bagian sistem saat insiden (misalnya non-critical recommendation).

### Experiment / A/B

Mengukur dampak produk; perlu analitik dan etika privasi.

### Permission / entitlements

Mengaktifkan fitur per tenant/plan—sering lebih permanen dan perlu model konfigurasi jelas.

## Arsitektur penyedia flag

### Client-side vs server-side

- **Server-side** lebih aman untuk logika sensitif dan konsistensi.
- **Client-side** untuk UI minor; hindari menyembunyikan otorisasi murni di klien.

### Delivery mechanism

Polling, streaming, atau embed pada bootstrap config. Pertimbangkan latency dan failure mode saat provider down.

### Default saat failure

Definisi eksplisit: fail-closed vs fail-open. Fail-open untuk payment biasanya buruk.

## Lifecycle flag

1. dibuat dengan owner dan tanggal expiry;
2. rollout bertahap;
3. stabil penuh;
4. **dihapus** dari kode dan konfigurasi.

Flag tanpa expiry menjadi liabilitas.

## Rollout bertahap

Strategi:

- persentase traffic;
- allowlist internal;
- per region;
- per tenant tier.

Pantau metrik golden signals per cohort.

## Observability

Log/span harus mencatat **flag version** atau decision id untuk RCA.

Tanpa itu, perilaku “aneh” sulit dilacak ke flag.

## Testing

- uji kombinasi flag kritis di CI;
- contract test untuk default off/on;
- dokumentasi matrix flag untuk QA.

## Keamanan dan compliance

- flag yang mengubah aliran pembayaran atau privasi memerlukan audit;
- hindari flag yang mem-bypass auth;
- RBAC untuk mengubah flag di produksi.

## Anti-pattern

### Ratusan flag permanen tanpa ownership

Codebase tidak terbaca.

### Flag nested tanpa dokumentasi

Kombinatorial explosion bug.

### Menggunakan flag sebagai pengganti branch strategy buruk

Menunda merge bukan solusi arsitektur.

### Kill switch yang tidak pernah diuji

Saat insiden, tidak jalan atau mematikan hal salah.

## Heuristik senior

1. Setiap flag punya owner dan tiket penghapusan.
2. Batasi jumlah flag aktif per layanan; review berkala.
3. Uji kill switch dalam game day.

## Pertanyaan interview

### Dasar

- Apa beda release toggle dan kill switch?
- Risiko flag di client untuk otorisasi?

### Menengah

- Bagaimana Anda menghindari explosion kombinasi flag di test?
- Bagaimana default saat provider flag down?

### Senior

- Bagaimana governance flag lintas banyak tim di monorepo?

## Kasus nyata

- Flag lupa di-on untuk subset tenant menyebabkan inkonsistensi data—mitigasi: observability per cohort dan migration guard.

## Ringkasan brutal

- Feature flag adalah **alat operasi dan produk**, bukan tempat menyimpan utang merge.

## Checklist

- [ ] Ada mekanisme expiry/review flag.
- [ ] Perubahan flag produksi ter-audit.
- [ ] Kill switch diuji berkala.
- [ ] Tidak ada otorisasi sensitif murni di klien.

## Penutup

Tanpa lifecycle, feature flag adalah **toggle bomb** yang meledak saat refactor besar.

## Kedalaman: konsistensi read-your-writes

Untuk flag yang mempengaruhi UX, pertimbangkan konsistensi sesi pengguna agar tidak flip-flop mid-session kecuali memang disengaja.

## Kedalaman: edge cache

CDN atau edge bisa cache respons lama—perubahan flag mungkin tertunda; dokumentasikan TTL dan invalidation.

## Latihan meja

Tulis rencana penghapusan untuk satu flag hipotetis: branch kode, migrasi data, dan verifikasi.

## Glosarium

- **Kill switch**: flag operasi untuk mematikan cepat fitur non-esensial.

## Ekstensi: open-source vs vendor

Vendor memberikan UI dan audit; open-source memberikan kontrol. Pilih berdasarkan kebutuhan compliance dan ukuran tim.

## Penutup organisasi

Buat forum review flag bulanan dengan daftar flag tertua.

## Lampiran: template definisi flag

- nama;
- jenis;
- owner;
- tanggal target removal;
- default on/off;
- dampak metrik yang dipantau.

## Refleksi

Jumlah flag sering berkorelasi dengan ketakutan deploy—perbaiki pipeline dan test, bukan hanya menambah flag.

## Tambahan: konsistensi antar klien

Aplikasi mobile, web, dan backend bisa membaca flag dari sumber berbeda dengan cache berbeda pula.

Dokumentasikan SLA propagasi perubahan flag dan perilaku saat versi klien lama tidak mengenal flag baru (fallback perilaku aman).

## Tambahan: pengujian regresi matrix

Buat subset matrix kombinasi flag yang “wajib hijau” di CI untuk area berisiko (checkout, pembayaran).

Matrix penuh sering tidak layak; pilih kombinasi berdasarkan analisis risiko dan insiden historis.

## Tambahan: dokumentasi untuk support

Tim support perlu artikel internal: flag mana yang mempengaruhan UX terlihat pengguna, siapa yang bisa mengubahnya, dan dampak rollback flag terhadap data.

Tanpa ini, support membuka tiket engineering untuk setiap keluhan yang sebenarnya hanya toggle salah.

## Tambahan: decommission provider

Saat migrasi vendor flag, rencanakan dual-read sementara dan cutover dengan daftar flag kritis yang diverifikasi manual sebelum mematikan sistem lama.

## Penutup akhir

Feature flag hebat mempercepat **learning** dengan risiko terkendali; feature flag buruk memperlambat **reasoning** tentang sistem.
