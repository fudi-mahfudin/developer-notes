# Secure API Design

## Tujuan

Topik ini menyatukan prinsip desain API agar aman secara default, bukan aman karena patch belakangan.

## Kenapa Penting

- API adalah pintu utama data dan aksi bisnis.
- Bug desain API sering lebih mahal dari bug implementasi kecil.
- API publik dan internal sama-sama butuh threat model.

## Model Mental

1. Anggap semua caller bisa salah atau berniat buruk.
2. Kontrak API harus eksplisit soal authz, validasi, dan error.
3. Minimalkan data dan aksi yang diekspos.
4. Idempotency penting untuk operasi sensitif.
5. Observability adalah bagian desain keamanan.

## Prinsip Inti

- least privilege.
- deny by default.
- explicit authorization checks.
- input validation ketat.
- output minimization.

## Authentication di API

- mekanisme auth jelas.
- token lifetime terkontrol.
- revocation policy ada.
- jangan menerima credential lewat channel tak aman.

## Authorization di API

Setiap endpoint mutasi/read sensitif harus cek:

- role/permission.
- resource ownership/scope.
- context tenant.

Tanpa ini, IDOR mudah terjadi.

## Data Minimization

Kirim hanya data yang diperlukan.
Over-sharing menambah risiko kebocoran dan privacy exposure.

## Error Handling Aman

Error response:

- jelas untuk client.
- tidak bocorkan detail internal.
- konsisten format.

Debug detail simpan di internal log, bukan response publik.

## Idempotency dan Safety

Untuk operasi yang bisa retry:

- gunakan idempotency key.
- pastikan duplicate tidak menghasilkan side effect ganda.

Ini meningkatkan keamanan operasional dan reliability.

## Rate Limit dan Abuse Control

Secure API design wajib memasukkan:

- rate limits per endpoint/identity.
- quota policy.
- anti-automation guard pada endpoint sensitif.

## Versioning dan Deprecation

Perubahan kontrak harus:

- backward-compatible bila mungkin.
- punya deprecation policy.
- diuji contract compatibility.

Breaking change tak terkelola bisa jadi security regression.

## Transport Security

- TLS wajib.
- cipher/protocol usang dimatikan.
- redirect ke HTTPS.

Data sensitif tanpa transport security = bocor by design.

## Logging dan Audit

API harus menghasilkan jejak:

- siapa memanggil.
- endpoint apa.
- outcome apa.
- correlation id.

Tanpa jejak ini, incident response lemah.

## Multi-Tenant Safety

Untuk sistem multi-tenant:

- tenant context wajib di-enforce server-side.
- query/filter harus tenant-scoped.
- cache key harus tenant-aware.

## Dependency Security

API yang memanggil downstream harus:

- timeout budget.
- retry aman.
- SSRF-safe outbound policy.
- contract validation terhadap response downstream.

## Security Testing API

Wajib ada:

- negative authz tests.
- injection tests.
- fuzzing ringan untuk input boundary.
- regression tests dari incident sebelumnya.

## Anti-Pattern

### 1. "API internal, jadi aman"

Salah.
Internal breach tetap mungkin.

### 2. Error verbose ke publik

Bocor detail sensitif.

### 3. Auth check hanya di gateway

Service tetap perlu enforcement.

### 4. Endpoint serbaguna terlalu permisif

Attack surface melebar.

## Heuristik Senior

1. Design API contract dengan security requirement eksplisit.
2. Enforce authz di layer use-case, bukan UI.
3. Minimalkan data yang diekspos default.
4. Gunakan idempotency untuk operasi kritis.
5. Integrasikan rate limit dan audit trail dari awal.
6. Review endpoint baru dengan threat-model checklist.
7. Jadikan incident security sebagai input perbaikan kontrak.

## Pertanyaan Interview

### Dasar

- Apa komponen minimal secure API?
- Kenapa authorization lebih dari sekadar login?
- Kenapa error response harus dibatasi?
- Kapan idempotency penting?

### Menengah

- Bagaimana mencegah IDOR pada API multi-tenant?
- Bagaimana desain rate limit yang tidak merusak UX?
- Apa risiko over-sharing response?
- Bagaimana menguji secure API secara praktis?

### Senior

- Bagaimana Anda membangun API security baseline lintas banyak tim?
- Bagaimana menyeimbangkan velocity produk dan kontrol keamanan API?
- Bagaimana Anda menilai maturity keamanan API organisasi?
- Bagaimana Anda merespons pola serangan baru tanpa memecah kontrak publik?

## Kasus Nyata

- endpoint internal diekspos tanpa authz memadai.
- response API membocorkan PII tidak perlu.
- duplicate payment akibat retry tanpa idempotency.
- incident investigasi gagal karena trace/audit minim.

## Ringkasan Brutal

- Secure API design bukan patch terakhir.
- Ia fondasi kontrak sejak awal.
- API aman berarti data minim, akses ketat, error terkontrol, dan jejak audit kuat.
- Tim senior menganggap keamanan API sebagai bagian kualitas inti, bukan beban compliance semata.

## Checklist

- Saya enforce authn/authz secara eksplisit.
- Saya meminimalkan data response.
- Saya punya error contract aman.
- Saya punya rate limit + audit trail.
- Saya punya test negatif untuk abuse path.

## Penutup

API yang aman bukan yang "belum diserang".
API yang aman adalah yang tetap terkontrol saat diserang.
