# XSS, CSRF, SQL Injection, SSRF, dan IDOR

## Tujuan

Topik ini membahas serangan web paling umum yang terus berulang di sistem modern.
Kalau tim tidak paham ini secara operasional, celah dasar akan terus lolos.

## Kenapa Ini Penting

- Dampak finansial nyata.
- Dampak reputasi tinggi.
- Bisa dipicu attacker dengan skill menengah.
- Sering muncul dari kesalahan coding sehari-hari.

## Model Mental

1. Semua input eksternal tidak terpercaya.
2. Browser adalah lingkungan hostile.
3. Server harus enforce aturan, bukan frontend.
4. Data sensitif tidak boleh diekspos karena asumsi.
5. Security = desain + implementasi + operasi.

## XSS

XSS terjadi saat input user dieksekusi sebagai script.

Jenis umum:

- Stored XSS.
- Reflected XSS.
- DOM-based XSS.

Mitigasi:

- output encoding sesuai konteks.
- sanitasi input rich text.
- CSP yang ketat.
- hindari `innerHTML` tanpa sanitasi.

Failure mode:

- token dicuri.
- akun diambil alih.
- transaksi dipicu diam-diam.

## CSRF

CSRF memanfaatkan browser korban yang sudah login untuk mengirim request tanpa niat user.

Mitigasi:

- cookie `SameSite`.
- CSRF token untuk state-changing actions.
- cek `Origin`/`Referer`.
- jangan pakai GET untuk mutasi.

Failure mode:

- perubahan profil tanpa sadar.
- transfer dana ilegal.
- aksi admin terpicu diam-diam.

## SQL Injection

SQL injection terjadi saat query dirakit dari string input mentah.

Mitigasi:

- parameterized query/prepared statement.
- ORM dengan discipline benar.
- least privilege DB account.
- validasi input.

Failure mode:

- data bocor massal.
- data dihapus/diubah.
- bypass login.

## SSRF

SSRF memaksa server mengakses URL yang dipilih attacker.

Mitigasi:

- allowlist domain/protocol.
- blok akses ke private IP/ranges.
- normalisasi dan validasi URL ketat.
- timeout dan response-size limit.

Failure mode:

- akses metadata cloud.
- scanning internal network.
- pivot ke layanan internal.

## IDOR

IDOR terjadi saat akses resource hanya berdasarkan ID tanpa authorization check yang benar.

Mitigasi:

- cek ownership/scope per request.
- gunakan authorization policy yang konsisten.
- jangan andalkan obscurity ID.
- uji akses lintas tenant.

Failure mode:

- baca data user lain.
- edit resource bukan miliknya.
- eskalasi akses lintas organisasi.

## Interaksi Antar Serangan

Serangan sering tidak berdiri sendiri:

- XSS bisa mencuri token lalu mempermudah IDOR exploitation.
- SSRF bisa membuka data internal untuk tahap injection berikutnya.
- CSRF efektif jika session/cookie policy lemah.

## Guardrail Implementasi

- secure coding checklist per PR.
- lint/security scanner di CI.
- test negatif untuk abuse path.
- code review fokus trust boundary.

## Guardrail Arsitektur

- API gateway policy.
- WAF (sebagai lapisan tambahan, bukan solusi utama).
- segmentation network internal.
- centralized authz checks.

## Observability Keamanan

Pantau:

- auth failure spikes.
- unusual resource access patterns.
- repeated payload signatures.
- blocked request trends.

Tanpa observability, serangan sering diketahui terlambat.

## Anti-Pattern

### 1. "Sanitize sekali di frontend"

Salah.
Backend tetap wajib validasi dan encode.

### 2. "ID random cukup aman"

Salah.
Authorization tetap wajib.

### 3. "WAF sudah cukup"

Salah.
WAF hanya lapisan tambahan.

### 4. "SQL injection solved by ORM"

Tidak selalu benar.
Raw query atau misuse tetap berisiko.

## Heuristik Senior

1. Treat every boundary as hostile.
2. Encode output sesuai konteks render.
3. Enforce authz dekat use-case boundary.
4. Batasi kemampuan server mengakses network internal.
5. Gunakan query parameterization tanpa kompromi.
6. Uji abuse case secara eksplisit di test suite.
7. Audit endpoint kritis secara berkala.

## Pertanyaan Interview

### Dasar

- Apa beda XSS dan CSRF?
- Kenapa parameterized query penting?
- Apa itu IDOR?
- Kenapa SSRF berbahaya di cloud?

### Menengah

- Bagaimana mendesain mitigasi XSS untuk rich text?
- Kapan SameSite cukup untuk CSRF?
- Bagaimana memvalidasi URL terhadap SSRF?
- Bagaimana mengetes IDOR secara sistematis?

### Senior

- Bagaimana memprioritaskan perbaikan 5 risiko ini pada produk besar dengan waktu terbatas?
- Bagaimana membangun guardrail agar bug kelas ini tidak berulang lintas tim?
- Bagaimana mengkomunikasikan risiko keamanan ke stakeholder non-teknis tanpa alarmisme?
- Bagaimana mengukur efektivitas mitigasi secara operasional?

## Kasus Nyata

- Portal admin bocor karena IDOR.
- Form komentar kena stored XSS.
- Integrasi webhook internal dieksploitasi via SSRF.
- Endpoint laporan raw SQL jadi pintu injection.
- Cookie policy longgar memicu CSRF.

## Ringkasan Brutal

- Ini bukan topik "opsional security".
- Ini baseline engineering dewasa.
- Bug kelas ini biasanya bukan karena attacker jenius, tapi karena hygiene lemah.
- Tim senior membangun sistem yang aman-by-default, bukan patch-by-incident.

## Checklist

- Saya bisa membedakan 5 risiko ini.
- Saya tahu mitigasi teknis utama tiap risiko.
- Saya paham failure mode bisnisnya.
- Saya memasukkan abuse-path dalam testing.
- Saya tidak mengandalkan satu lapisan perlindungan.

## Penutup

Kalau lima topik ini belum solid, jangan bicara arsitektur aman.
Mulai dari fondasi ini dulu, lalu naik ke kontrol yang lebih maju.
