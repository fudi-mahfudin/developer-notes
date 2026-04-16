# API Security Architecture - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu API security architecture
- lapisan-lapisan utama untuk melindungi API
- perbedaan auth, validation, rate limit, dan data protection
- kesalahan umum saat API hanya "terlihat aman"

API adalah pintu masuk sistem.

Kalau arsitektur keamanannya lemah,
semua keindahan internal
jadi tidak terlalu berarti.

API security bukan satu fitur.
Ia adalah kombinasi:
- identity
- access control
- input validation
- transport security
- abuse protection
- observability

Kalau hanya satu lapisan yang dipikirkan,
yang lain sering jadi celah.

---

## 1. Apa Itu API Security Architecture?

API security architecture adalah cara
merancang dan mengoperasikan API
agar:
- hanya actor sah yang bisa mengakses
- actor sah hanya bisa melakukan hal yang diizinkan
- input tidak merusak sistem
- data sensitif tidak bocor
- abuse tidak menjatuhkan layanan

Ini lebih luas daripada sekadar:
- pakai token
- pakai HTTPS

---

## 2. Authentication adalah Gerbang Awal

API harus tahu:
- siapa caller-nya

Itu bisa berupa:
- end user token
- API key
- service credential
- mTLS identity

Tanpa authn yang jelas,
semua keputusan selanjutnya rapuh.

Tapi authn saja tidak cukup.
Setelah tahu siapa caller,
API masih harus memutuskan:
- boleh apa?

---

## 3. Authorization Harus Resource-Aware

API security yang matang
tidak berhenti di:
- token valid

Ia juga memeriksa:
- actor boleh akses resource ini tidak?
- tenant cocok tidak?
- action ini diizinkan tidak?

Bug umum:
- endpoint hanya mengecek login
  tapi tidak mengecek ownership/scope resource

Itu jalan tercepat menuju data leak.

---

## 4. Transport Security

Data API yang berjalan di jaringan
harus diasumsikan berisiko
jika transport-nya tidak dilindungi.

Itu sebabnya:
- TLS
- secure channel
- certificate trust

menjadi fondasi.

Tanpa transport security,
token dan payload
bisa disadap atau dimodifikasi.

Lapisan bawah ini tidak glamor,
tapi sangat penting.

---

## 5. Input Validation

Setiap input API
adalah boundary tak tepercaya.

Maka perlu:
- schema validation
- type validation
- semantic validation
- size limit
- content sanitization bila relevan

Tanpa validasi,
API bisa rusak oleh:
- malformed payload
- oversize body
- unexpected enum/state
- injection vector

Frontend validation tidak cukup.

---

## 6. Output/Data Exposure Control

API security juga soal:
- data apa yang dikembalikan

Kesalahan umum:
- response mengandung field internal
- data sensitif ikut keluar
- object mentah di-serialize langsung

Security bukan cuma mencegah akses ilegal.
Security juga mencegah paparan data berlebihan
ke caller yang sah sekalipun.

---

## 7. Abuse Protection

API terbuka terhadap abuse:
- brute force
- scraping
- credential stuffing
- expensive query abuse
- bot noise

Karena itu arsitektur API aman
sering butuh:
- rate limiting
- quota
- anomaly detection
- request size limit

Kalau tidak,
caller jahat atau ceroboh
bisa menghabiskan kapasitas.

---

## 8. Machine-to-Machine Security

Tidak semua caller adalah manusia.

Banyak API dipakai oleh:
- internal service
- partner integration
- scheduled jobs

Masing-masing perlu:
- identity jelas
- secret/credential sehat
- scope sempit
- auditability

Shared secret besar untuk semua integrasi
adalah desain malas dan berbahaya.

---

## 9. Tenant Boundary

Dalam multi-tenant API,
boundary tenant sangat kritikal.

Tanya:
- bagaimana API tahu caller berada di tenant mana?
- bagaimana memastikan query tidak keluar tenant?

Jika tenant context hanya dipercaya dari header mentah
tanpa verifikasi,
itu celah besar.

API security architecture
harus memikirkan tenant isolation
sebagai concern kelas satu.

---

## 10. Sensitive Operation Protection

Tidak semua endpoint punya risiko sama.

Operasi sensitif seperti:
- reset credential
- approve claim
- export PII
- payment action

mungkin butuh perlindungan ekstra:
- stronger auth
- stricter audit
- re-auth
- approval flow

Security yang sehat
tidak memperlakukan semua endpoint identik.

---

## 11. Error Handling

Error response harus cukup jelas
untuk client sah,
tapi tidak terlalu bocor
untuk penyerang.

Contoh buruk:
- stack trace mentah
- detail DB/schema bocor
- policy internals terlalu detail

API security perlu error semantics
yang seimbang:
- berguna
- tidak bocor berlebihan

---

## 12. Logging dan Audit

Kamu perlu tahu:
- siapa memanggil apa
- kapan ditolak
- kapan izin sensitif diberikan
- pola anomali apa muncul

Tapi logging juga harus hati-hati:
- jangan log secret
- jangan log payload sensitif mentah tanpa kontrol

Security dan observability
harus bekerja bersama,
bukan saling merusak.

---

## 13. Healthcare Example

Dalam API healthcare:
- akses data pasien
- hasil lab
- billing
- consent

semuanya sensitif.

API perlu memastikan:
- actor sah
- tenant/clinic context benar
- role/scope cocok
- field sensitif tidak ikut bocor
- semua akses penting tercatat

Satu endpoint yang terlalu permisif
bisa menjadi insiden besar.

---

## 14. Defense in Depth

Jangan mengandalkan satu lapisan.

API security yang matang
punya beberapa lapisan:
- authn
- authz
- validation
- rate limiting
- secure transport
- auditing
- secret hygiene

Kalau satu lapisan gagal,
lapisan lain masih menahan.

Ini lebih realistis
daripada percaya pada satu gerbang besar.

---

## 15. Anti-Pattern Umum

1. Mengira token valid berarti akses aman.
2. Mengandalkan frontend validation.
3. Mengekspos object internal mentah di response.
4. Tidak membedakan endpoint sensitif dan biasa.
5. Tidak punya audit trail untuk operasi penting.

---

## 16. Best Practices

- desain API dengan prinsip least privilege dan bounded trust.
- validasi semua input di boundary.
- terapkan authorization berbasis resource/context.
- lindungi operasi sensitif dengan kontrol tambahan.
- gabungkan keamanan dengan observability dan audit.

---

## 17. Pertanyaan Desain Penting

Sebelum merilis endpoint baru, tanya:
1. Siapa caller-nya?
2. Bagaimana identitasnya diverifikasi?
3. Resource apa yang disentuh dan siapa yang boleh mengaksesnya?
4. Input apa yang harus divalidasi?
5. Data apa yang terlalu sensitif untuk dikembalikan/log?

---

## 18. Mini Latihan

Latihan:
1. Audit satu endpoint dan petakan lapisan security-nya.
2. Identifikasi field sensitif yang tidak perlu ada di response.
3. Tentukan abuse protection untuk endpoint mahal.
4. Rancang audit log minimal untuk operasi sensitif.
5. Cari tempat di mana tenant context terlalu dipercaya.

---

## 19. Jawaban Contoh Ringkas

API security yang sehat berarti:
- caller diverifikasi
- izin diperiksa
- input divalidasi
- data sensitif dilindungi
- abuse dibatasi

---

## 20. Checklist Kelulusan Topik API Security Architecture

Kamu dianggap lulus topik ini jika sudah bisa:
- melihat API security sebagai sistem berlapis,
- memisahkan authn, authz, validation, dan exposure control,
- mendesain proteksi untuk endpoint sensitif,
- memikirkan tenant dan machine identity,
- menggabungkan security dengan logging dan audit yang benar.

---

## 21. Ringkasan Brutal

- API aman bukan karena pakai token.
- API aman karena setiap boundary, permission, payload, dan exposure dipikirkan.
- Kalau security API-mu hanya "ada middleware auth",
  itu belum arsitektur.
