# #69 — SSE connection drop tanpa backoff → polling agresif

**Indeks:** [`README.md`](./README.md) · **ID:** `#69` · **Kategori:** Frontend & edge (browser / proxy)

---

## Ringkasan

**Server-Sent Events** dapat terputus oleh proxy idle timeout atau jaringan mobile. Fallback polling yang **terlalu agresif** tanpa exponential backoff dapat membanjiri API dengan permintaan yang sama serta menghabiskan baterai perangkat tenaga medis. Tanpa jitter, banyak klien yang reconnect bersamaan menyebabkan thundering herd.

---

## Mitigasi ideal (~60 detik)

“Gunakan **retry SSE** dengan backoff dan jitter; sesuaikan header `retry` dari server. Untuk fallback polling, gunakan interval adaptif—semakin sering gagal semakin panjang interval hingga batas maksimum. Pertimbangkan **websocket** dua arah jika proxy memutus SSE terus-menerus.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Polling storm:** banyak klien memukul endpoint status dengan frekuensi tinggi setelah drop.

---

## Mengapa pola ini sangat umum di healthcare

1. Dashboard perawat pada Wi-Fi rumah sakit yang tidak stabil.
2. Reverse proxy default timeout pendek.
3. Implementasi EventSource tanpa error handler.

---

## Pola gagal (ilustrasi)

`setInterval(fetchStatus, 1000)` tanpa mendeteksi SSE aktif.

---

## Gejala di production

- Lonjakan GET `/status` mengikuti gangguan jaringan massal.

---

## Diagnosis

1. Plot frekuensi polling per klien vs error SSE.
2. Periksa konfigurasi nginx `proxy_read_timeout`.

---

## Mitigasi yang disarankan

1. Tune proxy idle untuk SSE dengan komentar dokumentasi.
2. Heartbeat comment SSE untuk menjaga koneksi.
3. Backoff pada klien.

---

## Trade-off dan risiko

- Heartbeat meningkatkan bandwidth—sesuaikan interval.

---

## Aspek khusus healthcare

- Update status bed operasi harus cepat tetapi tidak boleh membahayakan infrastruktur dengan polling liar.

---

## Checklist review PR

- [ ] EventSource error path mengimplementasikan backoff.

---

## Kata kunci untuk pencarian

`EventSource`, `SSE timeout`, `proxy_read_timeout`, `polling backoff`

---

## Skenario regresi yang disarankan

1. Matikan SSE server sementara—klien harus fallback terkontrol.
2. Uji dengan proxy nginx timeout 5s vs 300s.
3. Uji ratusan klien reconnect bersamaan.

---

## KPI pemantauan

- Rata-rata interval polling fallback per sesi klien.

---

## Catatan tambahan operasional

Abungkan **feature flag** untuk mematikan SSE di wilayah yang diketahui bermasalah sambil menyiapkan WebSocket alternatif.

---

## Referensi internal

- [`README.md`](./README.md) · **#68**, **#34**.
