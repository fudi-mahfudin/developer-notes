# Q68 - Secret Management pada Node.js

## Pertanyaan Interview

Bagaimana secret management yang aman untuk aplikasi Node.js?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Secret management yang aman berarti secret tidak hardcoded,
tidak disimpan di repo, dan rotasinya terkelola.
Di runtime, secret sebaiknya diambil dari secret manager terpusat
atau environment injection yang aman.

Prinsip penting:
least privilege akses secret,
audit trail siapa mengakses apa,
dan rotasi berkala tanpa downtime.
Saya juga memastikan logging tidak pernah menampilkan secret.
Di healthcare, ini krusial karena kebocoran credential
bisa berdampak langsung ke keamanan data sensitif." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kenapa `.env` tidak cukup untuk production?"
2. "Bagaimana rotasi secret tanpa ganggu layanan?"
3. "Apa itu least privilege untuk secret?"
4. "Bagaimana mencegah secret bocor ke log?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) `.env` production:
"Kurang governance, audit, dan kontrol akses granular."

2) Rotasi tanpa downtime:
"Dual-key strategy dan reload secret terkontrol."

3) Least privilege:
"Service hanya boleh akses secret yang benar-benar dibutuhkan."

4) Cegah bocor log:
"Redaction middleware dan larangan log config mentah."

5) Anti-pattern:
"Menyimpan secret statis jangka panjang tanpa rotasi."

## Jawaban Ideal (Versi Singkat, Level Senior)

Secret management matang:
- secret store terpusat
- IAM ketat
- rotasi otomatis/terjadwal
- auditability
- runtime injection aman

## Penjelasan Detail yang Dicari Interviewer

### 1) Lifecycle secret

- provisioning
- distribution
- usage
- rotation
- revocation

### 2) Kontrol keamanan

- encrypt at rest dan in transit
- identity-based access
- short-lived credentials jika memungkinkan

### 3) Operasional

- rotasi terjadwal dengan test
- emergency revoke runbook
- monitoring failed access attempts

Mitigasi:
- secret scanning pada CI
- policy as code untuk IAM
- periodic credential hygiene review

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const dbPassword = process.env.DB_PASSWORD; // injected securely at runtime
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Healthcare systems sering terhubung ke banyak layanan kritikal.
Secret leak bisa menyebabkan:
- akses tidak sah ke data sensitif
- gangguan layanan integrasi
- isu kepatuhan dan audit serius

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
token API pihak ketiga tertulis di config repo privat.
token bocor via mirror/backup yang tidak terlindungi.

Perbaikan:
- revoke token segera
- pindah ke secret manager
- aktifkan secret scanning wajib

## Contoh Pola Kode yang Lebih Aman

```ts
type SecretReference = {
  name: string;
  version?: string;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan kenapa secret tidak boleh hardcoded.
- Menjelaskan storage dan access control.
- Menjelaskan rotasi dan revocation.
- Menjelaskan audit/logging hygiene.
- Relevan dengan keamanan healthcare.

## Ringkasan Final

Secret management adalah fondasi keamanan backend.
Fokusnya bukan hanya menyimpan secret, tapi mengelola siklus hidupnya.
Dengan kontrol akses ketat, rotasi disiplin, dan auditability,
risiko kebocoran credential bisa ditekan signifikan.
