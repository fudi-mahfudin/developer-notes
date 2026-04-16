# Rekonsiliasi Data dan Audit Trail

## Tujuan

Topik ini penting karena sistem nyata tidak hidup dalam dunia sempurna.
Data bisa drift.
Integrasi bisa gagal sebagian.
Operator perlu tahu apa yang terjadi.

Rekonsiliasi data dan audit trail adalah fondasi untuk:

- menemukan ketidaksesuaian;
- menjelaskan sejarah perubahan;
- memperbaiki data dengan percaya diri;
- memenuhi kebutuhan operasional dan kepatuhan tertentu.

## Kenapa Topik Ini Penting

Tanpa rekonsiliasi:

- data salah bisa hidup lama;
- tim baru sadar saat user komplain;
- root cause analysis lambat;
- koreksi jadi berisiko karena sumber kebenaran tak jelas.

Tanpa audit trail:

- siapa mengubah apa sulit dijawab;
- debugging histori rumit;
- perubahan penting terasa seperti hilang di kabut.

## Model Mental yang Benar

Pegang ini:

1. Rekonsiliasi adalah mekanisme mendeteksi dan memperbaiki drift.
2. Audit trail adalah jejak perubahan yang dapat ditelusuri.
3. Keduanya bukan hanya untuk compliance; mereka untuk operability.
4. Sistem distributed hampir selalu pada akhirnya membutuhkan keduanya.
5. Logging biasa tidak sama dengan audit trail.

## Rekonsiliasi Data

Rekonsiliasi berarti membandingkan dua representasi data atau lebih untuk memastikan mereka masih konsisten sesuai aturan yang diharapkan.

Contoh:

- total transaksi internal vs report partner;
- projection read model vs source-of-truth;
- saldo agregat vs ledger detail;
- stok reserved vs stok available.

## Kapan Rekonsiliasi Dibutuhkan

Biasanya saat:

- ada integrasi lintas sistem;
- ada eventual consistency;
- ada batch sync;
- ada process yang bisa gagal parsial;
- ada domain bernilai tinggi seperti finansial, inventory, healthcare.

Kalau data lintas boundary penting tetapi tidak ada rekonsiliasi, Anda sedang buta.

## Bentuk Rekonsiliasi

Rekonsiliasi bisa:

- periodik batch;
- on-demand manual;
- triggered by anomaly;
- near-real-time check untuk subset tertentu.

Pilihannya bergantung pada:

- criticality;
- volume;
- biaya compare;
- toleransi drift.

## Rekonsiliasi Bukan Hanya Diff

Anda juga perlu menjawab:

- jika beda, apa yang dipercaya?
- siapa sumber kebenaran?
- apakah bisa auto-repair?
- apakah perlu human review?
- bagaimana mencegah perbaikan yang salah?

Kalau pertanyaan ini tidak dijawab, rekonsiliasi hanya menghasilkan laporan masalah, bukan penyelesaian.

## Audit Trail

Audit trail adalah catatan perubahan yang cukup terstruktur untuk menjawab:

- siapa melakukan perubahan;
- kapan perubahan terjadi;
- apa yang berubah;
- dari nilai apa ke nilai apa;
- dalam konteks request/job/actor apa.

Ini lebih kaya dan lebih terarah daripada log debug biasa.

## Audit Trail vs Logging

Logging biasa:

- fokus observability teknis;
- sering berumur pendek;
- bisa noisy;
- tidak selalu lengkap secara domain.

Audit trail:

- fokus perubahan data/aksi penting;
- lebih terstruktur;
- lebih stabil sebagai catatan;
- sering dibutuhkan untuk investigasi bisnis.

Kalau semua digantungkan pada log aplikasi biasa, Anda akan kecewa saat incident.

## Granularity Audit

Tidak semua perubahan perlu audit trail yang sama detail.
Anda harus memilih:

- event bisnis penting;
- perubahan status;
- approval;
- data sensitif;
- financial effect;
- permission change;
- operational override.

Kalau semuanya diaudit setara, noise tinggi.
Kalau terlalu sedikit, investigasi sulit.

## Before/After State

Sering berguna menyimpan:

- before value;
- after value;
- actor;
- timestamp;
- reason atau metadata.

Tetapi detail yang disimpan harus mempertimbangkan:

- biaya storage;
- privacy;
- sensitivity;
- kebutuhan investigasi.

## Immutable History

Audit trail yang sehat cenderung diperlakukan immutable.
Kalau catatan audit sendiri mudah diubah tanpa jejak, nilainya turun drastis.

## Correlation ID

Sangat membantu jika audit trail atau log penting bisa dihubungkan ke:

- request id;
- job id;
- user id;
- tenant id;
- saga id.

Tanpa korelasi, sejarah perubahan tetap sulit dirangkai.

## Rekonsiliasi dan Source of Truth

Anda tidak bisa merekonsiliasi dengan benar kalau tidak jelas:

- data mana yang authoritative;
- data mana yang projection atau copy;
- kondisi mana yang dianggap drift.

Ownership data tetap fondasi.

## Auto-Repair vs Manual Review

Sebagian mismatch bisa auto-repair.
Sebagian lain terlalu berisiko.

Pertanyaan penting:

- apakah sumber kebenaran jelas?
- apakah repair idempotent?
- apakah repair bisa menyebabkan efek samping baru?
- apakah domain terlalu sensitif untuk auto-fix?

Dalam sistem bernilai tinggi, manual review sering tetap diperlukan untuk subset kasus.

## Batch Reconciliation

Bagus untuk:

- volume besar;
- sistem reporting;
- financial close;
- sync periodik.

Tetapi batch berarti drift bisa hidup sampai job berikutnya.

## Real-Time Reconciliation

Lebih cepat mendeteksi masalah.
Tetapi:

- biaya sistemik lebih tinggi;
- implementasi lebih kompleks;
- tidak selalu perlu untuk semua data.

Seperti biasa, pilih berdasarkan criticality.

## Audit Trail untuk Debugging

Saat insiden:

- siapa mengubah status ini?
- dari mana permintaan datang?
- apakah ini aksi user, job otomatis, atau admin override?
- kapan tepatnya terjadi?

Pertanyaan ini jauh lebih mudah dijawab jika audit trail ada.

## Compliance dan Forensics

Untuk beberapa domain, audit trail juga penting untuk:

- compliance;
- dispute resolution;
- security review;
- legal traceability.

Tetapi bahkan tanpa regulasi pun, nilainya tetap besar secara operasional.

## Storage dan Privacy Trade-off

Audit trail yang terlalu verbose:

- mahal;
- noisy;
- berisiko menyimpan data sensitif berlebihan.

Audit trail yang terlalu tipis:

- tidak berguna untuk investigasi.

Jadi desainnya harus sadar:

- data apa yang disimpan;
- berapa lama retensi;
- siapa yang boleh akses.

## Rekonsiliasi dan Idempotency

Repair process harus hati-hati.
Kalau repair action dijalankan ulang, sebaiknya tidak merusak data tambahan.

Artinya:

- repair job sendiri perlu semantics yang aman;
- audit repair harus dicatat;
- duplicate repair harus dihindari atau aman.

## Anti-Pattern Umum

### 1. Mengandalkan Log Aplikasi Biasa Sebagai Audit Trail

Biasanya tidak cukup.

### 2. Drift Baru Disadari dari Keluhan User

Itu artinya observability data Anda lemah.

### 3. Audit Trail Tanpa Actor/Context

Catatan ada, tetapi tetap sulit dipakai.

### 4. Rekonsiliasi Tanpa Jalur Repair

Tim tahu ada mismatch, tetapi tidak tahu harus melakukan apa.

## Heuristik Senior

1. Tentukan sumber kebenaran dulu.
2. Buat rekonsiliasi untuk data lintas boundary yang penting.
3. Audit trail harus cukup untuk menjawab siapa, kapan, apa, dan konteks.
4. Bedakan log teknis dari audit domain.
5. Pilih auto-repair hanya jika risiko dan ownership jelas.
6. Pertimbangkan privacy dan retensi saat mendesain audit trail.
7. Catat tindakan koreksi juga, bukan hanya perubahan awal.

## Pertanyaan Interview

### Dasar

- Apa itu rekonsiliasi data?
- Apa beda audit trail dan logging biasa?
- Kenapa source-of-truth penting dalam rekonsiliasi?
- Kapan audit trail dibutuhkan?

### Menengah

- Bagaimana Anda memutuskan data mana yang perlu direkonsiliasi periodik?
- Apa metadata minimum yang harus ada pada audit trail?
- Kapan auto-repair aman dan kapan perlu review manual?
- Kenapa correlation id membantu investigasi?

### Senior

- Bagaimana Anda mendesain strategi rekonsiliasi untuk sistem yang eventual consistency?
- Bagaimana Anda menyeimbangkan audit detail dengan privacy dan storage cost?
- Bagaimana Anda membangun operasional untuk menangani mismatch yang terus muncul?
- Bagaimana Anda menjelaskan nilai audit trail ke tim yang hanya melihatnya sebagai beban tambahan?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- angka dashboard tidak cocok dengan sumber transaksi;
- status order partner berbeda dari sistem internal;
- admin perlu tahu siapa yang mengubah data sensitif;
- queue failure menyebabkan projection tertinggal;
- incident perlu forensics perubahan historis.

## Ringkasan Brutal

- Rekonsiliasi adalah cara mendeteksi dan memperbaiki drift.
- Audit trail adalah sejarah perubahan yang dapat dipertanggungjawabkan.
- Log biasa tidak cukup untuk menggantikan audit trail.
- Kalau source-of-truth kabur, rekonsiliasi jadi tebak-tebakan.
- Engineer senior membangun sistem agar data salah bisa ditemukan dan dijelaskan, bukan hanya berharap tidak pernah salah.

## Checklist Pemahaman

- Saya tahu kapan rekonsiliasi perlu dibuat.
- Saya bisa membedakan audit trail dari logging teknis.
- Saya paham pentingnya source-of-truth.
- Saya tahu audit trail harus membawa actor dan context.
- Saya sadar repair process sendiri perlu desain yang aman.

## Penutup

Sistem yang matang bukan sistem yang tidak pernah drift.
Sistem yang matang adalah sistem yang mampu mendeteksi drift, menjelaskan sejarah perubahan, dan memperbaiki keadaan tanpa menebak.
