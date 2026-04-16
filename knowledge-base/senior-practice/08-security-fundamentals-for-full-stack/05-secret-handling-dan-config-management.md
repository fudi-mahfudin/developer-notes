# Secret Handling dan Config Management

## Tujuan

Topik ini fokus pada cara menangani secret dan konfigurasi agar sistem tidak bocor dari hal paling dasar.

## Kenapa Penting

- Kebocoran secret sering menjadi root cause breach.
- Konfigurasi salah bisa mem-bypass kontrol keamanan lain.
- Recovery secret leak mahal dan mengganggu operasi.

## Model Mental

1. Secret adalah aset kritis.
2. Secret lifecycle harus dikelola end-to-end.
3. Config adalah kode operasional.
4. Default harus aman.
5. Rotasi secret bukan event darurat, tapi rutin.

## Apa Itu Secret

Contoh:

- API key.
- DB password.
- JWT signing key.
- OAuth client secret.
- encryption key.

Bukan secret:

- host URL publik.
- feature flag non-sensitif.

## Prinsip Dasar

- Jangan hardcode secret di source code.
- Jangan commit secret ke repo.
- Jangan log secret.
- Jangan kirim secret lewat channel tidak aman.

## Penyimpanan Secret

Gunakan secret manager terpusat bila mungkin.

Minimal requirement:

- encrypted at rest.
- access control granular.
- audit trail akses.
- dukung rotasi.

## Distribusi Secret

Secret harus dikirim ke runtime dengan channel aman:

- environment injection aman.
- mounted secret file dengan izin ketat.
- short-lived credential bila tersedia.

## Rotasi Secret

Strategi sehat:

- jadwal rotasi rutin.
- mekanisme dual-key saat transisi.
- rollback plan jika rotasi gagal.

Tanpa rotasi, blast radius kebocoran terlalu besar.

## Secret Scope

Batasi scope secret:

- per service.
- per environment.
- per tenant/partner bila perlu.

Satu secret super-privileged lintas sistem adalah anti-pattern.

## Least Privilege untuk Credential

Credential harus punya hak minimum.

Contoh:

- read-only key untuk read path.
- write key terpisah untuk job khusus.

## Config Management

Pisahkan:

- config statis.
- config environment-specific.
- secret config.

Campur semuanya dalam satu file besar tanpa kontrol akan berakhir kacau.

## Validation Config di Startup

Aplikasi wajib gagal cepat jika config invalid:

- env var wajib kosong.
- format salah.
- nilai di luar range.

Fail-fast lebih aman daripada jalan setengah salah.

## Environment Separation

Pastikan pemisahan jelas:

- local.
- staging.
- production.

Jangan pakai secret produksi di staging/dev.

## Logging Discipline

Redact data sensitif:

- header auth.
- token.
- API key.
- password field.

Audit logging harus membantu forensik tanpa membocorkan secret.

## Incident Response

Saat secret leak:

1. identifikasi cakupan.
2. revoke/rotate segera.
3. audit penggunaan.
4. patch akar masalah.
5. dokumentasi postmortem.

## Anti-Pattern

### 1. `.env` production dibagikan via chat

Sangat berisiko.

### 2. Secret dipakai lintas semua service

Blast radius besar.

### 3. Tidak ada audit akses secret

Sulit forensik.

### 4. Config tanpa validation

Incident karena typo jadi umum.

## Heuristik Senior

1. Treat secret as toxic data.
2. Centralize secret governance.
3. Validate config pada startup.
4. Enforce least privilege untuk credential.
5. Rotate secret dengan runbook jelas.
6. Redact sensitif data di log/telemetry.
7. Uji prosedur leak-response secara berkala.

## Pertanyaan Interview

### Dasar

- Kenapa secret tidak boleh di hardcode?
- Apa beda config biasa dan secret?
- Kenapa rotasi penting?
- Kenapa log redaction wajib?

### Menengah

- Bagaimana mendesain rotasi tanpa downtime?
- Bagaimana fail-fast config validation di startup?
- Bagaimana membatasi scope credential?
- Bagaimana mencegah secret leak di CI?

### Senior

- Bagaimana Anda membangun secret governance untuk banyak tim dan environment?
- Bagaimana mengukur maturity config management organisasi?
- Bagaimana merancang prosedur respons kebocoran secret yang realistis?
- Bagaimana menyeimbangkan operability dan security pada dynamic config?

## Kasus Nyata

- API key bocor di commit lama.
- token auth terekam di log observability.
- staging pakai credential produksi.
- rotasi dadakan memutus integrasi kritis.

## Ringkasan Brutal

- Secret handling buruk cepat jadi insiden besar.
- Config management buruk membuat sistem rapuh bahkan tanpa serangan.
- Tim senior membangun lifecycle secret yang disiplin, bukan ad-hoc panic.

## Checklist

- Saya tidak hardcode/commit secret.
- Saya punya strategi rotasi.
- Saya punya config validation di startup.
- Saya redact data sensitif di log.
- Saya punya runbook kebocoran secret.

## Penutup

Keamanan sering gagal bukan di cryptography tingkat tinggi.
Ia gagal di cara tim menyimpan, mendistribusikan, dan memutar secret sehari-hari.
