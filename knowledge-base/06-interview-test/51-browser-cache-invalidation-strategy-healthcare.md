# Q51 - Strategi Cache Invalidation di Browser

## Pertanyaan Interview

Bagaimana strategi cache invalidation yang efektif di browser?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Cache invalidation itu sulit karena trade-off antara performa dan data freshness.
Untuk aset statis seperti JS/CSS, saya gunakan filename versioning (content hash)
agar browser otomatis mengambil file baru saat ada release.
Untuk data API, saya gunakan strategy berbasis risiko:
network-first untuk data kritikal, stale-while-revalidate untuk data non-kritikal.

Kuncinya bukan cuma cache policy, tapi juga observability:
kita harus bisa tahu kapan user mendapat stale data, kapan revalidate gagal,
dan bagaimana rollback policy saat terjadi incident.
Di healthcare, invalidation salah bisa berarti user melihat status lama
yang berdampak operasional." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apa beda cache busting dan invalidation?"
2. "Kapan pakai ETag/If-None-Match?"
3. "Apa TTL selalu cukup?"
4. "Bagaimana invalidasi cepat saat incident?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Cache busting vs invalidation:
"Cache busting ganti key/version, invalidation menetapkan kapan cache dianggap tidak valid."

2) ETag:
"Saat ingin revalidation efisien tanpa unduh payload penuh."

3) TTL cukup?
"Tidak selalu; untuk data kritikal perlu event-driven invalidation."

4) Incident:
"Punya kill switch cache policy + force refresh mekanisme."

5) Anti-pattern:
"Satu policy cache untuk semua jenis resource."

## Jawaban Ideal (Versi Singkat, Level Senior)

Strategi efektif:
- klasifikasi resource berdasarkan criticality
- versioning aset statis
- conditional request (ETag/Last-Modified)
- fallback dan kill switch
- monitoring cache behavior

## Penjelasan Detail yang Dicari Interviewer

### 1) Klasifikasi resource lebih dulu

- Static immutable assets: cache lama, versioned filename.
- Semi-dynamic data: SWR + background refresh.
- Highly critical data: network-first + strict TTL.

### 2) Mekanisme invalidation yang dipakai

- Build hash untuk bundle.
- Surrogate key atau tag invalidation di edge/CDN.
- Conditional request dengan `304 Not Modified`.
- Event-triggered purge untuk data kritikal.

### 3) Risiko jika invalidation lemah

- pengguna melihat UI lama setelah deployment
- data status tidak sinkron antar perangkat
- incident lebih lama dipulihkan karena cache menahan versi buruk

Mitigasi:
- release checklist cache
- canary rollout
- emergency cache purge runbook

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const CACHE_POLICY = {
  assets: "immutable-versioned",
  criticalApi: "network-first",
  nonCriticalApi: "stale-while-revalidate",
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Sistem healthcare sangat bergantung pada data yang benar pada waktu yang benar.
Jika invalidation salah:
- status transaksi bisa terlihat sukses padahal gagal
- dashboard operasional terlambat sinkron
- keputusan user menjadi tidak akurat

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
aset frontend baru dirilis, tapi service worker menyajikan bundle lama.
validasi bisnis lama tetap berjalan dan menolak payload baru.

Perbaikan:
- version pinning yang konsisten
- force activate service worker saat major release
- fallback disable SW sementara jika perlu

## Contoh Pola Kode yang Lebih Aman

```ts
type ResourceClass = "static" | "critical-data" | "non-critical-data";

type InvalidationPolicy = {
  resource: ResourceClass;
  ttlSeconds: number;
  revalidate: boolean;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan invalidation sebagai desain, bukan setting tunggal.
- Menjelaskan klasifikasi resource.
- Menyebut versioning, ETag, TTL, dan purge.
- Menyebut incident response cache.
- Mengaitkan dampak operasional di healthcare.

## Ringkasan Final

Cache invalidation yang baik harus berbasis criticality data.
Performa penting, tapi freshness untuk data sensitif jauh lebih penting.
Di aplikasi healthcare, strategi cache harus defensif,
terukur, dan siap di-override cepat saat terjadi masalah produksi.
