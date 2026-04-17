# Q70 - Migrasi API Versioning

## Pertanyaan Interview

Bagaimana melakukan migrasi API versioning tanpa merusak klien existing?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Migrasi API versioning harus backward-compatible dulu, lalu phased deprecation.
Saya biasanya tambah versi baru (v2) tanpa langsung mematikan v1,
lalu monitor adopsi client dan komunikasikan timeline sunset secara jelas.

Kunci keberhasilan:
kontrak API terdokumentasi,
compatibility tests,
observability usage per versi,
dan support migration guide untuk klien.
Di healthcare, downtime atau breaking change mendadak sangat berisiko,
jadi transisi harus bertahap dan terukur." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan harus major version baru?"
2. "Bagaimana menentukan masa deprecation?"
3. "Bagaimana memonitor klien yang belum migrasi?"
4. "Apa strategi versioning yang dipilih?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Major version:
"Saat ada breaking change kontrak yang tak bisa kompatibel."

2) Masa deprecation:
"Berdasarkan criticality client dan pola adopsi nyata."

3) Monitor klien:
"Tag usage per API version dan consumer id."

4) Strategi version:
"Path/header versioning sesuai kebijakan platform."

5) Anti-pattern:
"Mematikan versi lama tanpa data adopsi dan komunikasi."

## Jawaban Ideal (Versi Singkat, Level Senior)

Versioning migration yang sehat:
- additive changes sebagai default
- explicit deprecation policy
- contract tests lintas versi
- telemetry adopsi client
- rollback plan

## Penjelasan Detail yang Dicari Interviewer

### 1) Jenis perubahan

- non-breaking: field tambahan opsional
- breaking: perubahan struktur/semantik wajib

### 2) Tahap migrasi

1. Rilis versi baru.
2. Publikasikan guide migration.
3. Pantau adoption metrics.
4. Kirim reminder deprecation.
5. Sunset versi lama dengan bertahap.

### 3) Risiko dan mitigasi

- client legacy tertinggal
- dokumentasi tidak sinkron
- test coverage kontrak kurang

Mitigasi:
- consumer-driven contract tests
- compatibility gateway checks
- komunikasi multi-channel ke integrator

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const deprecationPolicy = {
  currentVersion: "v2",
  deprecatedVersion: "v1",
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Integrasi healthcare sering melibatkan banyak pihak.
Perubahan API mendadak bisa memutus alur operasional penting.
Versioning yang disiplin menjaga continuity layanan
dan mengurangi risiko gangguan lintas sistem.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
endpoint lama dimatikan tanpa monitoring adopsi.
beberapa partner belum migrasi dan transaksi gagal massal.

Perbaikan:
- hidupkan kembali compatibility layer sementara
- buat dashboard adopsi versi
- tetapkan deprecation SLA yang realistis

## Contoh Pola Kode yang Lebih Aman

```ts
type ApiVersionLifecycle = {
  version: string;
  status: "active" | "deprecated" | "sunset";
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan konsep backward compatibility.
- Menjelaskan tahapan deprecation.
- Menjelaskan telemetry adopsi client.
- Menjelaskan contract testing lintas versi.
- Relevan untuk integrasi healthcare.

## Ringkasan Final

Migrasi versioning API adalah proses produk + engineering,
bukan sekadar rename endpoint.
Dengan rollout bertahap, monitoring adopsi, dan komunikasi jelas,
breaking impact ke klien bisa diminimalkan secara signifikan.
