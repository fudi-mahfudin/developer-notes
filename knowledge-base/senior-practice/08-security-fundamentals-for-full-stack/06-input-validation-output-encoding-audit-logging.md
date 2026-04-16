# Input Validation, Output Encoding, dan Audit Logging

## Tujuan

Topik ini menggabungkan tiga kontrol dasar yang menentukan apakah sistem tahan terhadap penyalahgunaan sehari-hari.

## Kenapa Penting

- Input tanpa validasi membuka pintu injection.
- Output tanpa encoding membuka XSS.
- Tanpa audit log, insiden sulit dideteksi dan diinvestigasi.

## Model Mental

1. Validasi di boundary masuk.
2. Encode di boundary keluar.
3. Log event keamanan yang bermakna.
4. Jangan percaya data karena "datang dari internal".
5. Logging tanpa struktur = noise.

## Input Validation

Tujuan validasi:

- pastikan shape benar.
- pastikan type benar.
- pastikan range/business rule benar.
- tolak input ambigu.

## Strategi Validasi

- schema validation.
- whitelist field.
- explicit allow values.
- panjang input dibatasi.
- normalisasi format.

## Fail Closed

Jika ragu, tolak input.
Fail-open memperbesar attack surface.

## Business Validation

Selain format:

- tanggal masuk akal?
- nominal tidak negatif?
- status transition valid?

Validation teknis saja tidak cukup.

## Output Encoding

Encoding harus sesuai konteks:

- HTML context.
- attribute context.
- URL context.
- JavaScript context.

Satu metode encoding untuk semua konteks itu keliru.

## Templating Discipline

Gunakan template engine dengan auto-escape default.
Hindari bypass escape kecuali ada alasan kuat dan sanitasi ketat.

## API Output Safety

Untuk API JSON:

- hindari echo input mentah tanpa sanitasi yang tepat.
- jangan bocorkan internal error detail.
- jaga konsistensi error contract.

## Audit Logging

Audit log bukan debug log biasa.
Ia untuk:

- keamanan.
- compliance.
- forensik.

## Event yang Wajib Diaudit

- login sukses/gagal.
- perubahan permission/role.
- akses data sensitif.
- perubahan konfigurasi kritis.
- aksi admin high-impact.

## Struktur Audit Log

Minimal memuat:

- timestamp.
- actor/user id.
- aksi.
- resource.
- hasil (success/fail).
- correlation/request id.

## Integrity Audit Log

Audit log harus:

- append-only sebisa mungkin.
- akses terbatas.
- retensi sesuai kebijakan.
- terlindung dari modifikasi tak sah.

## Privacy dan Logging

Jangan log:

- password.
- token.
- data PII berlebihan tanpa alasan.

Audit penting, tetapi privasi juga wajib.

## Korelasi Insiden

Tanpa correlation id lintas service:

- investigasi lambat.
- root cause kabur.

Audit logging harus disiapkan untuk sistem terdistribusi.

## Anti-Pattern

### 1. Validasi hanya di frontend

Tidak cukup.

### 2. Sanitasi universal tanpa konteks output

Rawan bypass.

### 3. Audit log terlalu minim

Forensik gagal.

### 4. Audit log terlalu verbose tanpa struktur

Sinyal tenggelam.

## Heuristik Senior

1. Validasi input di semua boundary eksternal.
2. Encode output sesuai konteks render.
3. Definisikan event audit penting sejak desain.
4. Gunakan format log terstruktur.
5. Terapkan redaction sensitif data.
6. Uji skenario abuse dan lihat apakah audit trail cukup.
7. Sinkronkan kebijakan logging dengan legal/compliance.

## Pertanyaan Interview

### Dasar

- Kenapa validasi backend wajib?
- Apa beda validasi dan encoding?
- Kenapa audit logging penting?
- Data apa yang tidak boleh masuk log?

### Menengah

- Bagaimana membedakan schema validation dan business validation?
- Bagaimana desain audit log untuk aksi admin?
- Kapan auto-escape tidak cukup?
- Bagaimana menjaga audit log tetap berguna tanpa berlebihan?

### Senior

- Bagaimana Anda merancang governance input/output handling lintas banyak service?
- Bagaimana Anda menyeimbangkan kebutuhan forensik dan privasi data?
- Bagaimana Anda menilai apakah audit trail saat ini cukup untuk investigasi insiden nyata?
- Bagaimana Anda membangun review checklist agar bug validation/encoding tidak berulang?

## Kasus Nyata

- endpoint menerima field tak terduga lalu dieksekusi.
- komentar pengguna memicu stored XSS.
- investigasi fraud gagal karena audit log tidak mencatat actor.
- log observability membocorkan token sesi.

## Ringkasan Brutal

- Validasi, encoding, dan audit logging adalah trio wajib.
- Mengabaikan salah satunya membuat sistem rapuh.
- Tim senior memperlakukan ini sebagai baseline engineering, bukan tambahan opsional.

## Checklist

- Saya validasi input di boundary.
- Saya encode output sesuai konteks.
- Saya punya audit events yang jelas.
- Saya redact data sensitif.
- Saya bisa melakukan forensik dasar dari audit trail.

## Penutup

Sistem aman bukan hanya yang menolak serangan.
Sistem aman juga yang bisa membuktikan apa yang terjadi saat serangan terjadi.
