# #50 — Cache in-memory per instance → inkonsistensi antar pod

**Indeks:** [`README.md`](./README.md) · **ID:** `#50` · **Kategori:** Worker, cron, lock terdistribusi & cache

---

## Ringkasan

Map JavaScript global di setiap proses Node untuk menyimpan cache referensi (misalnya daftar ICD) akan **berbeda** antar replica Kubernetes—invalidasi pada satu pod tidak mempengaruhi lain. Pengguna mendapatkan respons berbeda saat load balancer mengarahkan ke pod berbeda—menimbulkan bug **intermittent** yang sulit dilacak.

---

## Mitigasi ideal (~60 detik)

“Gunakan **Redis/Memcached** terpusat atau **CDN** untuk cache bersama; jika tetap in-memory, pastikan data **immutable versioned** yang jarang berubah dan invalidasi melalui **reload pod** terkontrol atau TTL sangat pendek. Untuk konfigurasi kritis healthcare, hindari cache in-memory yang mempengaruhi keputusan klinis tanpa konsistensi.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Split-brain cache:** nilai berbeda pada instance berbeda.
- **Sticky sessions:** mengurangi gejala tetapi tidak memperbaiki akar.

---

## Mengapa pola ini sangat umum di healthcare

1. Micro-caching untuk mengurangi query DB tanpa infrastruktur Redis awal.
2. Feature flag lokal pada memori worker.
3. Rolling deploy mengubah isi cache per pod bertahap.

---

## Pola gagal (ilustrasi)

Module singleton `let icdCache` diisi saat cold start—pod baru vs pod lama punya versi berbeda selama rollout.

---

## Gejala di production

- Pengguna melaporkan “kadang benar kadang salah” setelah deploy parsial.

---

## Diagnosis

1. Bandingkan response curl berulang ke endpoint yang sama melalui LB.
2. Periksa penggunaan `global` cache variabel.

---

## Mitigasi yang disarankan

1. Pindahkan cache ke layer terdistribusi.
2. Gunakan TTL pendek + etag/version header.
3. Koordinasi rolling update dengan drain connection.

---

## Trade-off dan risiko

- Redis menambah hop latency—ukur dan optimalkan serialization.

---

## Aspek khusus healthcare

- Daftar interaksi obat harus konsisten lintas pod—sangat sensitif.

---

## Checklist review PR

- [ ] Tidak ada cache mutable global untuk data yang dapat berubah tanpa restart serempak.

---

## Kata kunci untuk pencarian

`in-memory cache`, `per-pod cache`, `sticky sessions`, `distributed cache`

---

## Catatan tambahan operasional

Gunakan **readiness probe** yang memastikan cache warming selesai sebelum pod menerima traffic produksi.

Hindari menyimpan **feature flag klinis** hanya di memori pod—gunakan layanan konfigurasi terpusat dengan snapshot konsisten.

Uji **rolling deploy** dengan verifikasi konsistensi respons lintas pod untuk endpoint yang memakai cache memori.

Simpan flag versi pada respons HTTP (`X-Config-Version`) untuk membantu klien mendeteksi inkonsistensi sementara.

---

## Referensi internal

- [`README.md`](./README.md) · **#45**, **#96**.
