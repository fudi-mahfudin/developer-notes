# Q50 - Service Worker dan Risiko Caching yang Salah

## Pertanyaan Interview

Apa itu service worker, dan apa risiko jika strategi caching salah?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Service worker adalah script yang berjalan di background browser untuk intercept request,
mendukung cache, offline mode, dan kontrol network strategy.
Kalau caching salah, aplikasi bisa menyajikan data usang, file JS lama, atau perilaku inkonsisten.
Pada aplikasi sensitif seperti healthcare, ini bisa berbahaya karena user melihat informasi
yang tidak up-to-date.

Karena itu strategi cache harus jelas:
asset statis biasanya cache-first dengan versioning,
sedangkan data dinamis sensitif lebih aman network-first atau stale-while-revalidate terkontrol.
Kunci utamanya invalidation yang disiplin dan observability cache behavior." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan cache-first aman dipakai?"
2. "Apa bahaya terbesar stale data?"
3. "Bagaimana rollback jika SW rusak?"
4. "Bagaimana update service worker yang aman?"
5. "Apa anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) Cache-first aman:
"Untuk aset statis yang versioned dan jarang berubah."

2) Bahaya stale data:
"User mengambil keputusan dari data lama."

3) Rollback:
"Bump version, clear cache strategy, dan force update flow."

4) Update aman:
"Gunakan lifecycle install/activate dengan migration cache terkontrol."

5) Anti-pattern:
"Mencache semua endpoint API tanpa klasifikasi sensitivitas."

## Jawaban Ideal (Versi Singkat, Level Senior)

Service worker powerful, tapi harus:
- punya strategi cache per jenis resource
- punya invalidation/versioning rapi
- punya fallback dan monitoring

## Penjelasan Detail yang Dicari Interviewer

### 1) Resource classification

Pisahkan:
- static assets (JS/CSS/fonts)
- semi-dynamic content
- highly dynamic/sensitive API data

Setiap kelas butuh strategi berbeda.

### 2) Risiko operasional

- stale UI bundle: client bug lama bertahan
- stale API response: keputusan bisnis salah
- inconsistent behavior antar tab/user

### 3) Mitigasi praktis

- cache naming by version
- clear old caches saat activate
- batasi caching endpoint sensitif
- expose cache metrics/error reporting

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
self.addEventListener("fetch", (event) => {
  // contoh konseptual: jangan samakan strategi untuk semua request
});
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Dalam healthcare platform:
- akurasi data sangat kritikal
- stale data bisa mengganggu alur operasional
- reliability offline harus seimbang dengan freshness

Service worker harus didesain dengan policy risiko, bukan hanya performa.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
endpoint status transaksi dicache terlalu agresif.
dashboard menampilkan status lama.
tim operasional melakukan tindakan berdasarkan informasi tidak terbaru.

Perbaikan:
- network-first untuk data kritikal
- cache TTL ketat
- invalidation saat event mutasi penting

## Contoh Pola Kode yang Lebih Aman

```ts
type CacheStrategy = "cache-first" | "network-first" | "stale-while-revalidate";
```

Pilih strategy per endpoint/resource, bukan global one-size-fits-all.

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan konsep service worker.
- Menjelaskan risiko caching salah.
- Menyebut cache invalidation/versioning.
- Menjelaskan strategi berdasarkan jenis resource.
- Relevan dengan kebutuhan akurasi data healthcare.

## Ringkasan Final

Service worker memberikan kontrol besar pada performa dan offline experience,
tetapi kesalahan cache strategy bisa menyebabkan regresi serius dan stale data.
Untuk aplikasi healthcare, safety-first design berarti
cache hanya dipakai agresif pada resource yang tepat,
dan data kritikal selalu diprioritaskan freshness-nya.
