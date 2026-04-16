# Authentication dan Session Management

## Tujuan

Topik ini penting karena autentikasi dan sesi adalah pintu utama sistem.
Kesalahan kecil di area ini bisa membuka akses tidak sah berskala besar.

## Kenapa Topik Ini Penting

Jika auth/session lemah:

- account takeover meningkat;
- session hijacking terjadi;
- logout tidak benar-benar efektif;
- user trust dan compliance rusak.

## Model Mental yang Benar

1. Authentication menjawab "siapa Anda?".
2. Session management menjaga konteks identitas antar request.
3. Token/session bukan sekadar string, melainkan kredensial berharga.
4. Threat model harus mencakup theft, replay, fixation, dan CSRF.
5. UX dan security harus diseimbangkan secara sadar.

## Authentication Basics

Komponen inti:

- credential verification;
- MFA (jika perlu);
- secure password storage (hash + salt);
- rate limit login;
- audit login attempts.

## Password Handling

Prinsip:

- jangan simpan plaintext;
- gunakan algoritma hashing yang tepat untuk password;
- enforce password policy wajar;
- sediakan mekanisme reset aman.

Reset password sering jadi titik lemah jika token reset long-lived atau mudah ditebak.

## Session Models

Dua model umum:

- stateful session (server-side store + session ID);
- stateless token (mis. JWT) dengan validasi signature dan expiry.

Tidak ada model universal terbaik.
Pilih berdasarkan kebutuhan revocation, scale, dan kompleksitas.

## Session ID Security

Jika stateful:

- session ID harus acak kuat;
- simpan di cookie dengan `HttpOnly`, `Secure`, `SameSite`;
- rotate session setelah login;
- invalidate saat logout atau credential change.

## Token Security

Jika token-based:

- expiry jelas dan pendek untuk access token;
- refresh token disimpan aman;
- rotasi refresh token bila memungkinkan;
- deteksi token reuse untuk indikasi compromise.

## Session Expiration

Pertimbangkan:

- idle timeout;
- absolute timeout;
- re-auth untuk aksi sensitif.

Timeout terlalu longgar meningkatkan risiko penyalahgunaan.

## Logout Semantics

Logout harus benar-benar mencabut sesi/token relevan.

Kesalahan umum:

- hanya hapus token di frontend tanpa invalidasi server-side context.

## Multi-Device Session

User sering login dari banyak device.
Sistem matang memberi:

- daftar sesi aktif;
- revoke per-device;
- notifikasi login mencurigakan.

## Session Fixation

Pastikan session identifier di-rotate setelah autentikasi berhasil.
Jika tidak, attacker bisa memaksa session ID sebelum login korban.

## Replay Risk

Token/session bisa dicuri lalu dipakai ulang.
Mitigasi:

- TLS wajib;
- expiry pendek;
- token binding strategy (jika feasible);
- anomaly detection.

## CSRF Context

Untuk cookie-based auth, CSRF protection penting:

- SameSite cookie;
- CSRF token pada state-changing requests;
- origin/referrer validation.

## Brute Force Protection

Login endpoint wajib punya:

- rate limiting;
- temporary lockout policy seimbang;
- IP/device heuristics;
- alerting untuk pola serangan.

## MFA Consideration

MFA sangat penting untuk akun high-risk.
Tetapi implementasi harus:

- punya recovery flow aman;
- tidak membocorkan informasi sensitif;
- menjaga UX tetap masuk akal.

## Audit Logging

Log event auth penting:

- login success/failure;
- password reset request/confirm;
- session revoke;
- MFA challenge events.

Log harus aman dan tidak menyimpan credential sensitif.

## Anti-Pattern Umum

### 1. Token Long-Lived Tanpa Rotasi

Risk window terlalu besar.

### 2. Logout Lokal Saja

Session sebenarnya masih aktif.

### 3. Cookie Tanpa Flag Aman

Meningkatkan risiko theft.

### 4. Tidak Ada Rate Limit Login

Brute force jadi mudah.

## Heuristik Senior

1. Pilih model session sesuai threat model dan kebutuhan revocation.
2. Lindungi cookie/token sebagai kredensial utama.
3. Batasi lifetime sesi secara realistis.
4. Jadikan logout/revocation behavior eksplisit.
5. Terapkan rate limit dan monitoring auth events.
6. Uji flow auth untuk abuse path, bukan hanya happy path.
7. Dokumentasikan kebijakan sesi agar konsisten lintas tim.

## Pertanyaan Interview

### Dasar

- Apa beda authentication dan authorization?
- Kenapa session ID harus acak kuat?
- Kenapa cookie flags penting?
- Apa risiko token long-lived?

### Menengah

- Kapan memilih session stateful vs token stateless?
- Bagaimana menangani logout di multi-device?
- Bagaimana mencegah session fixation?
- Kapan MFA wajib?

### Senior

- Bagaimana Anda merancang auth/session architecture untuk aplikasi multi-platform?
- Bagaimana Anda menyeimbangkan security strictness dan UX friction?
- Bagaimana Anda mendeteksi dan merespons indikasi account takeover?
- Bagaimana Anda mengaudit implementasi auth agar tahan terhadap threat model modern?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- user mengeluh akun dipakai pihak lain;
- sesi tetap aktif setelah logout;
- reset password flow dieksploitasi;
- insiden credential stuffing meningkat.

## Ringkasan Brutal

- Auth/session adalah perimeter utama aplikasi.
- Kesalahan kecil di sini berdampak besar.
- Security flow harus dirancang untuk attacker behavior, bukan hanya user normal.
- Engineer senior memikirkan lifecycle sesi end-to-end, bukan sekadar endpoint login.

## Checklist Pemahaman

- Saya paham model session utama dan trade-off-nya.
- Saya tahu praktik aman untuk cookie/token.
- Saya bisa menjelaskan mitigasi fixation, replay, brute force, dan CSRF.
- Saya menganggap logout/revocation sebagai flow kritis.
- Saya menilai auth flow berdasarkan threat model, bukan asumsi ideal.

## Penutup

Authentication yang bagus bukan hanya berhasil login.
Ia memastikan identitas tetap terjaga aman sepanjang lifecycle sesi.
