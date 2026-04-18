# Q76 - Desain Plugin / Extensibility System

## Pertanyaan Interview

Bagaimana mendesain plugin/extensibility system yang tetap aman dan maintainable?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Extensibility system yang baik harus punya kontrak plugin yang ketat,
boundary eksekusi yang jelas, dan governance lifecycle plugin.
Tujuannya memberi fleksibilitas tanpa mengorbankan stabilitas core system.

Saya biasanya mulai dari interface plugin minimal:
hook yang diizinkan, input/output schema, timeout, dan error isolation.
Plugin tidak boleh akses internal state secara bebas.
Untuk production, perlu version compatibility policy dan observability per plugin.
Di healthcare, ini penting karena extensibility sering dibutuhkan,
tapi safety dan auditability tidak boleh turun." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apa risiko terbesar plugin architecture?"
2. "Bagaimana mencegah plugin merusak core app?"
3. "Bagaimana versioning kontrak plugin?"
4. "Perlukah sandboxing plugin?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Risiko terbesar:
"Plugin side effect tidak terkontrol dan sulit di-debug."

2) Cegah kerusakan:
"Isolasi execution + strict API surface + timeout."

3) Versioning:
"Semver kontrak plugin dengan compatibility matrix."

4) Sandboxing:
"Perlu jika plugin berasal dari pihak tidak sepenuhnya trusted."

5) Anti-pattern:
"Memberi akses plugin langsung ke semua dependency internal."

## Jawaban Ideal (Versi Singkat, Level Senior)

Prinsip desain:
- kontrak stabil
- isolasi runtime
- observability dan error containment
- governance plugin lifecycle

## Penjelasan Detail yang Dicari Interviewer

### 1) Komponen utama

- plugin manifest (name, version, capabilities)
- hook registry terkontrol
- validation input/output
- permission model

### 2) Reliability controls

- circuit breaker per plugin
- retry policy selektif
- plugin disable switch
- fallback behavior default

### 3) Operasional

- dashboard health per plugin
- release channel plugin (stable/canary)
- compatibility testing otomatis

Mitigasi:
- plugin API docs ketat
- security review plugin pihak ketiga
- deprecation process kontrak lama

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const pluginContract = {
  hook: "onOrderCreated",
  timeoutMs: 500,
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Sistem healthcare sering perlu ekstensi integrasi cepat.
Tanpa kontrol, plugin bisa menyebabkan:
- gangguan transaksi inti
- kebocoran data
- perilaku sulit diprediksi

Arsitektur plugin yang disiplin menjaga agility dan safety.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
plugin notifikasi baru melempar exception tak tertangani,
memblokir flow order utama.

Perbaikan:
- error isolation di boundary plugin
- fallback ke core flow
- alert khusus plugin failure

## Contoh Pola Kode yang Lebih Aman

```ts
type PluginCapability = {
  name: string;
  allowedHooks: string[];
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan kontrak plugin dan boundary.
- Menjelaskan error isolation.
- Menjelaskan version governance.
- Menjelaskan security/sandbox consideration.
- Relevan untuk integrasi healthcare.

## Ringkasan Final

Extensibility yang sehat memberi ruang inovasi tanpa membahayakan core system.
Kuncinya ada pada kontrak ketat, isolasi eksekusi, dan operasi yang terukur.
Dengan pendekatan ini, plugin architecture tetap scalable dan aman untuk production.
