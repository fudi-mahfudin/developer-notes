# Caching dan Rate Limiting

## Core Idea (Feynman Concept Applied)

Caching itu seperti menaruh barang yang sering dipakai di meja, bukan di gudang. Rate limiting itu seperti pembatas pintu agar ruangan tidak terlalu penuh.

## Penjelasan Detail Aspek Penting

- **Caching** mengurangi beban compute/database dengan menyimpan hasil query atau response yang sering dipakai. Saat request datang, sistem cek dulu apakah data ada di cache.
  - Jika ada, itu disebut **cache hit**: response lebih cepat karena tidak perlu hit database.
  - Jika tidak ada, itu **cache miss**: sistem ambil dari sumber utama, lalu simpan ke cache.
- **TTL (Time To Live)** menentukan umur data di cache. Setelah TTL habis, data dianggap kedaluwarsa dan harus diambil ulang dari sumber utama.
- Selain TTL, ada **eviction policy** (aturan pembuangan cache), misalnya:
  - LRU (Least Recently Used): data yang paling jarang dipakai dibuang dulu.
  - LFU (Least Frequently Used): data dengan frekuensi akses paling rendah dibuang dulu.
- Jenis cache yang umum:
  - **In-memory cache** (di proses aplikasi): sangat cepat, cocok untuk data kecil/cepat berubah, tapi tidak share antar instance.
  - **Distributed cache** (misalnya Redis): bisa dipakai banyak instance aplikasi sekaligus, cocok untuk skala produksi.
  - **HTTP/CDN cache**: cocok untuk konten publik atau response yang relatif statis.
- Tantangan caching:
  - **Stale data**: data cache sudah tidak sama dengan data terbaru di database.
  - **Cache stampede**: banyak request bersamaan saat cache expire, semuanya hit database sekaligus.
- Strategi invalidasi cache:
  - **Time-based**: biarkan TTL menghapus otomatis.
  - **Event-based**: saat data berubah (update/delete), key cache terkait langsung dihapus/di-refresh.
- **Rate limiting** membatasi jumlah request dalam periode tertentu agar API tetap stabil dan tidak mudah overload.
- Algoritma rate limiting yang umum:
  - **Fixed window**: hitung request dalam jendela waktu tetap (contoh: 100 request/jam). Sederhana, tapi bisa lonjakan di batas pergantian window.
  - **Sliding window**: perhitungan lebih halus berdasarkan waktu berjalan, lebih adil untuk user.
  - **Token bucket**: request memakai token; token diisi ulang berkala. Cocok untuk mengizinkan burst kecil yang terkontrol.
- Scope pembatasan rate limit bisa berbeda sesuai kebutuhan:
  - per IP,
  - per user ID,
  - per API key,
  - per endpoint kritikal (misalnya login, payment, atau create order).
- Dampak ke API dan user experience:
  - Saat limit tercapai, API mengembalikan **429 Too Many Requests**.
  - Sebaiknya sertakan info waktu coba lagi (misalnya header `Retry-After`) agar client bisa retry dengan benar.
- Caching dan rate limiting sering dipakai bersama:
  - Caching mengurangi beban baca.
  - Rate limiting melindungi API dari lonjakan/penggunaan berlebihan.
  - Kombinasi ini menjaga performa sekaligus stabilitas sistem.

### Pros dan Cons Caching

- **Pros**
  - Response lebih cepat untuk request berulang (latency turun).
  - Beban database/API downstream berkurang.
  - Biaya infrastruktur bisa lebih efisien karena hit ke sumber utama menurun.
- **Cons**
  - Risiko **stale data** jika invalidasi tidak disiplin.
  - Menambah kompleksitas desain (TTL, key strategy, invalidasi, observability).
  - Potensi masalah baru seperti cache stampede saat expiry bersamaan.

### Pros dan Cons Rate Limiting

- **Pros**
  - Melindungi API dari overload dan abuse.
  - Menjaga fairness antar pengguna/client.
  - Membantu menjaga SLA layanan saat traffic spike.
- **Cons**
  - Jika threshold tidak tepat, user valid bisa ikut terblokir.
  - Menambah state management (counter, window, token) yang harus konsisten.
  - Bisa menurunkan UX bila response 429 tidak disertai panduan retry yang jelas.

### Trade-off Praktis di Produksi

- Fokus pada **performa maksimal** biasanya mendorong TTL lebih panjang, tapi ini meningkatkan risiko data tidak fresh.
- Fokus pada **konsistensi data** biasanya mendorong TTL pendek atau invalidasi agresif, tapi ini bisa menambah beban ke sumber utama.
- Fokus pada **proteksi sistem** biasanya mendorong limit ketat, tapi bisa mengurangi kenyamanan user saat traffic normal tinggi.
- Pendekatan praktis: mulai dari threshold konservatif, ukur metrik (latency, hit ratio, 429 rate), lalu tuning bertahap berdasarkan data nyata.

### Contoh Kasus Proses Bisnis Nyata

- **Kasus 1: Dashboard Operasional Rumah Sakit (read-heavy)**
  - Kondisi: banyak admin membuka dashboard bed occupancy, antrean farmasi, dan status transaksi setiap beberapa detik.
  - Masalah tanpa cache: query agregasi ke database berjalan berulang, CPU database naik, response melambat di jam sibuk.
  - Solusi:
    - Cache response dashboard selama 15-30 detik (TTL pendek agar tetap cukup fresh).
    - Gunakan key cache per unit/cabang agar invalidasi lebih terarah.
  - Hasil yang diharapkan: waktu respon dashboard turun, beban query menurun, namun data tetap relevan untuk monitoring operasional.
  - Catatan trade-off: data bisa terlambat beberapa detik; ini biasanya masih bisa diterima untuk dashboard monitoring.

- **Kasus 2: Endpoint Login/OTP (abuse-prone)**
  - Kondisi: endpoint login dan OTP sering jadi target brute force atau spam request.
  - Masalah tanpa rate limiting: lonjakan request bisa mengganggu user valid dan meningkatkan biaya OTP/provider.
  - Solusi:
    - Terapkan rate limit per IP dan per user identifier (misalnya nomor HP/email).
    - Untuk endpoint OTP, bisa pakai limit lebih ketat (contoh: 5 request/10 menit).
    - Kembalikan `429` + `Retry-After` agar client tahu kapan boleh mencoba lagi.
  - Hasil yang diharapkan: sistem lebih tahan abuse dan biaya operasional lebih terkendali.
  - Catatan trade-off: ada risiko false positive (user valid ikut kena limit), jadi threshold perlu diuji bertahap.

- **Kasus 3: Checkout/Booking dengan Trafik Promo (burst traffic)**
  - Kondisi: saat promo dimulai, banyak user melakukan request hampir bersamaan.
  - Masalah tanpa kombinasi strategi: database cepat jenuh, endpoint kritikal timeout.
  - Solusi:
    - Cache data referensi yang jarang berubah (misal daftar layanan, jam operasional, konfigurasi biaya).
    - Terapkan rate limiting token bucket pada endpoint kritikal untuk menahan lonjakan tiba-tiba tanpa memblok total.
  - Hasil yang diharapkan: sistem tetap responsif saat lonjakan, transaksi inti lebih stabil.
  - Catatan trade-off: proteksi terlalu agresif bisa menurunkan conversion, jadi pemantauan metrik bisnis harus berjalan bersamaan.

- **Kasus 4: Integrasi Sinkronisasi Inventory ke WMS**
  - Kondisi: service internal sinkronisasi stok ke sistem pihak ketiga (WMS) secara berkala.
  - Masalah tanpa limit: burst retry saat sistem eksternal lambat dapat memperparah kegagalan (thundering herd).
  - Solusi:
    - Cache metadata/lookup yang sering dipakai saat sinkronisasi.
    - Batasi request outbound ke WMS dengan rate limiting + retry berjarak (backoff).
  - Hasil yang diharapkan: integrasi lebih stabil, kegagalan berantai berkurang.
  - Catatan trade-off: sinkronisasi bisa sedikit lebih lambat, tetapi reliabilitas keseluruhan meningkat.

## Best Practices

- Cache hanya data yang relatif stabil.
- Definisikan invalidasi cache untuk update penting.
- Beri response jelas saat limit tercapai (429).
- Monitor hit ratio dan 429 rate secara berkala untuk tuning threshold.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
const RATE_LIMIT = 100; // max request per jam

function canProceed(requestCount: number): boolean {
  // Jika melebihi limit, tolak request
  return requestCount < RATE_LIMIT;
}
```

## Checklist Pemahaman

- [ ] Tahu kapan data cocok untuk cache.
- [ ] Tahu dampak bisnis rate limiting.
- [ ] Bisa memilih strategi rate limiting sesuai karakter endpoint.
- [ ] Bisa menjelaskan trade-off TTL panjang vs data freshness.

## Latihan Mandiri

- Latihan 1 (basic): Rancang strategi cache untuk endpoint dashboard harian.
- Latihan 2 (intermediate): Tentukan rate limit berbeda untuk login, search, dan create order.
- Latihan 3 (simulasi produksi): Simulasikan burst traffic promo, lalu buat tuning plan berbasis hit ratio, p95, dan 429 rate.
