# Q86 - Contract Testing FE-BE API

## Pertanyaan Interview

Bagaimana melakukan contract testing antara frontend dan backend API?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Contract testing memastikan frontend dan backend sepakat pada bentuk request/response.
Ini mengurangi bug integrasi yang sering lolos unit test masing-masing tim.

Saya biasanya pakai consumer-driven contracts:
frontend mendefinisikan ekspektasi minimum,
backend memverifikasi kontrak itu di CI.
Selain itu, skema OpenAPI dijadikan sumber kebenaran dan divalidasi otomatis.
Di domain healthcare, ini penting karena perubahan field kecil
bisa memutus alur operasional yang kritikal." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Bedanya contract test vs integration test?"
2. "Kapan contract test paling bernilai?"
3. "Bagaimana versioning kontrak?"
4. "Apakah mock server cukup?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Bedanya:
"Contract test cek kesepakatan antarmuka; integration test cek alur sistem nyata."

2) Paling bernilai:
"Saat FE dan BE deploy terpisah dengan cadence berbeda."

3) Versioning:
"Gunakan semver/compatibility rules dan deprecation policy."

4) Mock server cukup?
"Tidak; tetap perlu verifikasi provider agar mock tidak drift."

5) Anti-pattern:
"Dokumentasi kontrak ada, tapi tidak divalidasi otomatis di CI."

## Jawaban Ideal (Versi Singkat, Level Senior)

Contract testing efektif:
- kontrak terdokumentasi dan executable
- verifikasi provider otomatis
- gate CI sebelum release
- monitoring breaking change

## Penjelasan Detail yang Dicari Interviewer

### 1) Elemen kontrak

- method + path
- request schema
- response schema
- error codes semantics

### 2) Workflow praktis

1. Consumer publish contract.
2. Provider verify di pipeline.
3. Hasil verifikasi jadi syarat release.

### 3) Risiko dan mitigasi

- mock drift
- undocumented edge case
- perubahan backward-incompatible tanpa warning

Mitigasi:
- contract review policy
- contract test pada error scenarios
- central contract registry

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const contractExpectation = {
  endpoint: "POST /orders",
  responseStatus: 201,
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

FE-BE mismatch dapat langsung berdampak pada proses operasional.
Contract testing menurunkan risiko regresi integrasi
saat banyak tim bergerak paralel pada layanan kesehatan digital.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
backend ubah nama field tanpa koordinasi.
frontend gagal parse data status transaksi.

Perbaikan:
- tambah provider verification gate
- enforce backward-compatible rules

## Contoh Pola Kode yang Lebih Aman

```ts
type ApiContract = {
  name: string;
  version: string;
  verified: boolean;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan contract testing dengan tepat.
- Menjelaskan consumer-provider verification.
- Menjelaskan peran CI gate.
- Menjelaskan perbedaan dari integration test.
- Relevan untuk integrasi healthcare FE-BE.

## Ringkasan Final

Contract testing adalah safety net antar tim, bukan pengganti test lain.
Dengan kontrak executable dan verifikasi otomatis,
risiko mismatch FE-BE turun signifikan.
Ini mempercepat release dan menekan incident integrasi.
