# Q67 - Konfigurasi Environment Lintas Stage

## Pertanyaan Interview

Bagaimana mengelola konfigurasi environment lintas stage (dev/staging/prod)?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Konfigurasi lintas stage harus eksplisit, tervalidasi, dan immutable saat runtime.
Saya hindari hardcode dan mengelola config lewat environment variables
dengan schema validation saat startup.

Prinsip penting:
perbedaan stage hanya pada value config, bukan logika kode.
Semua variabel wajib terdokumentasi dan punya default aman untuk non-prod.
Di production, secret tidak boleh ada di source code,
dan perubahan config harus bisa diaudit.
Di healthcare, salah config kecil bisa berdampak besar ke integrasi dan keamanan." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kenapa config perlu validation saat startup?"
2. "Bagaimana mencegah config drift antar stage?"
3. "Apa beda config dan feature flag?"
4. "Bagaimana rollback config?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Startup validation:
"Fail fast jika variabel penting hilang atau invalid."

2) Cegah drift:
"Gunakan template config terpusat + CI check."

3) Config vs flag:
"Config untuk environment setup; flag untuk kontrol perilaku fitur."

4) Rollback:
"Versioned config dan prosedur rollback teruji."

5) Anti-pattern:
"Nilai config beda-beda manual tanpa governance."

## Jawaban Ideal (Versi Singkat, Level Senior)

Config management yang sehat:
- centralized definition
- schema validation
- secure secret injection
- auditable changes
- predictable rollout

## Penjelasan Detail yang Dicari Interviewer

### 1) Prinsip desain

- one source of truth untuk daftar config
- typed config access di code
- fail fast pada startup

### 2) Operasional lintas stage

- parity antar stage semirip mungkin
- beda hanya endpoint/credential/scale limits
- release checklist mencakup config verification

### 3) Risiko umum

- typo env var menyebabkan fallback diam-diam
- secret tertukar antar stage
- endpoint production dipakai dari staging

Mitigasi:
- strict validation
- naming convention konsisten
- automated smoke test pasca deploy

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const requiredEnv = ["NODE_ENV", "API_BASE_URL", "DB_URL"];
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Sistem healthcare sering banyak integrasi eksternal.
Config yang salah bisa menyebabkan:
- kirim data ke endpoint salah
- kegagalan transaksi berantai
- risiko kepatuhan data

Governance config kuat menurunkan insiden operasional.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
service produksi memakai credential staging untuk salah satu gateway.
proses transaksi gagal intermiten.

Perbaikan:
- startup validation credential scope
- audit config pipeline
- canary check sebelum full rollout

## Contoh Pola Kode yang Lebih Aman

```ts
type AppConfig = {
  nodeEnv: "development" | "staging" | "production";
  apiBaseUrl: string;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan fail-fast config validation.
- Menjelaskan pencegahan config drift.
- Menjelaskan security secret handling.
- Menjelaskan ops rollout/rollback.
- Relevan untuk integrasi healthcare.

## Ringkasan Final

Konfigurasi environment adalah bagian dari reliability engineering.
Tujuannya memastikan perilaku aplikasi prediktif di semua stage.
Dengan validation, governance, dan audit yang baik,
risiko insiden karena salah konfigurasi bisa ditekan signifikan.
