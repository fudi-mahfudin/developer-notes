# OWASP Dasar untuk Web App

## Tujuan

Topik ini penting karena OWASP memberi peta ancaman web yang paling sering terjadi.
Banyak insiden klasik berulang bukan karena serangan canggih, tetapi karena fondasi keamanan dasar diabaikan.

## Kenapa Topik Ini Penting

Dengan memahami OWASP dasar, tim bisa:

- mencegah celah umum sejak desain;
- memprioritaskan mitigasi realistis;
- meningkatkan kualitas code review keamanan.

Tanpa itu, tim hanya bereaksi setelah insiden.

## Model Mental yang Benar

1. Keamanan web adalah disiplin sistemik, bukan patch sekali.
2. OWASP adalah peta risiko umum, bukan checklist selesai sekali jalan.
3. Threat model aplikasi Anda tetap diperlukan.
4. Pencegahan lebih murah daripada respons insiden.
5. Security harus masuk SDLC dari awal.

## Kategori Risiko Umum OWASP

Secara praktis, area dasar yang harus dikuasai:

- broken access control;
- cryptographic failures;
- injection;
- insecure design;
- security misconfiguration;
- vulnerable components;
- identification/auth failures;
- logging/monitoring failures;
- SSRF.

## Broken Access Control

Masalah paling umum:

- user akses resource milik orang lain;
- role check lemah;
- endpoint admin tidak terlindungi.

Mitigasi:

- backend authorization enforcement;
- deny-by-default;
- test unauthorized paths.

## Cryptographic Failures

Contoh:

- password hash lemah;
- data sensitif tanpa enkripsi saat transit;
- key management buruk.

Mitigasi:

- TLS wajib;
- hash password kuat + salt;
- manajemen key/secrets disiplin.

## Injection

Bisa berupa:

- SQL injection;
- command injection;
- template injection.

Mitigasi:

- parameterized queries;
- input validation;
- least privilege DB account.

## Insecure Design

Bukan bug coding semata, tetapi desain yang salah:

- tidak ada rate limit;
- flow reset password lemah;
- trust boundary kabur.

Mitigasi butuh threat modeling dan review arsitektur.

## Security Misconfiguration

Contoh:

- debug mode aktif di produksi;
- default credentials;
- CORS terlalu longgar;
- bucket storage publik tak sengaja.

Hardening konfigurasi adalah kebutuhan rutin.

## Vulnerable Components

Dependency usang bisa membawa CVE serius.
Mitigasi:

- inventory dependency;
- update policy;
- scanning otomatis;
- patch cadence jelas.

## Auth Failures

Masalah:

- session management lemah;
- brute force tidak dibatasi;
- MFA tidak memadai di area risiko tinggi.

Ini sering menjadi pintu masuk account takeover.

## Logging and Monitoring Failures

Tanpa logging/monitoring:

- serangan terlambat terdeteksi;
- forensik sulit;
- respons insiden lambat.

Log keamanan harus cukup detail namun tetap menjaga privasi.

## SSRF

Server dipaksa mengakses URL internal/terlarang.
Mitigasi:

- allowlist host/protocol;
- blok private network target jika tidak perlu;
- validasi URL ketat.

## Secure SDLC Praktis

Masukkan keamanan ke alur kerja:

- secure coding guideline;
- review keamanan pada PR berisiko;
- scanner di CI;
- penetration test berkala;
- incident drill.

## Prioritization

Tidak semua isu punya dampak sama.
Prioritaskan berdasarkan:

- impact bisnis;
- exploitability;
- exposure area;
- data sensitivity.

Security backlog harus risk-based.

## Anti-Pattern Umum

### 1. Menganggap OWASP Checklist Tahunan

Padahal ancaman muncul terus.

### 2. Fokus Tool, Abaikan Desain

Scanner tidak menyelesaikan insecure design.

### 3. Menangani Security Hanya Menjelang Release

Biaya perbaikan melonjak.

### 4. Tidak Ada Ownership Jelas

Issue security terlantar.

## Heuristik Senior

1. Gunakan OWASP sebagai kerangka diskusi risiko.
2. Integrasikan security checks ke CI/CD.
3. Lakukan threat modeling untuk flow kritis.
4. Prioritaskan perbaikan berdasarkan dampak nyata.
5. Uji negative/abuse path, bukan happy path saja.
6. Pastikan logging mendukung deteksi dan forensik.
7. Bangun budaya security review lintas tim.

## Pertanyaan Interview

### Dasar

- Apa itu OWASP?
- Kenapa broken access control berbahaya?
- Apa itu injection?
- Kenapa security misconfiguration umum terjadi?

### Menengah

- Bagaimana memprioritaskan temuan keamanan?
- Kapan threat modeling dilakukan?
- Bagaimana mencegah vulnerable dependency jadi celah produksi?
- Apa peran logging dalam security?

### Senior

- Bagaimana Anda memasukkan praktik OWASP ke siklus delivery tanpa mematikan velocity?
- Bagaimana Anda membangun ownership keamanan lintas tim produk dan platform?
- Bagaimana Anda menilai maturity keamanan organisasi dari perspektif engineering?
- Bagaimana Anda mengkomunikasikan risiko keamanan ke stakeholder bisnis secara efektif?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- endpoint internal bocor ke publik;
- credential stuffing meningkat;
- dependency CVE kritis ditemukan di produksi;
- audit menemukan kontrol akses tidak konsisten.

## Ringkasan Brutal

- OWASP dasar adalah minimum hygiene, bukan advanced luxury.
- Banyak breach terjadi dari kelemahan yang sudah lama diketahui.
- Keamanan butuh desain, implementasi, dan operasi yang konsisten.
- Engineer senior memandang security sebagai quality baseline, bukan pekerjaan tim security saja.

## Checklist Pemahaman

- Saya paham kategori risiko web umum ala OWASP.
- Saya tahu mitigasi praktis untuk area paling kritis.
- Saya bisa memprioritaskan isu keamanan berbasis risiko.
- Saya menyadari tool scanner tidak cukup tanpa desain aman.
- Saya menempatkan keamanan sebagai bagian rutin dari SDLC.

## Penutup

OWASP tidak membuat aplikasi otomatis aman.
Tetapi mengabaikannya hampir menjamin Anda mengulang kesalahan yang sama dengan ribuan sistem lain.
