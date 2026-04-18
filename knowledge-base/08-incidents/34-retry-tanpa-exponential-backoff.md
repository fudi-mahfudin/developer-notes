# #34 — Retry tanpa exponential backoff → thundering herd ke DB / API

**Indeks:** [`README.md`](./README.md) · **ID:** `#34` · **Kategori:** Async, reliability & antrian

---

## Ringkasan

Ketika banyak klien mengalami error bersamaan (DB restart, blip jaringan), **retry segera** dengan interval tetap atau tanpa jitter menyebabkan **thundering herd**—semua mencoba lagi pada detik yang sama, memperburuk kegagalan. Node.js worker dan browser pasien portal dapat membanjiri sistem yang baru pulih.

---

## Mitigasi ideal (~60 detik)

“Gunakan **exponential backoff dengan jitter**—misalnya backoff eksponensial ditambah random 0–20% untuk menghindari sinkronisasi gelombang. Batasi **maksimum retry** dan **total deadline**. Untuk server-side job, gunakan queue dengan delay natif. Thundering herd sering membuat outage kecil menjadi besar—mitigasi ini wajib di integrasi healthcare ke sistem payer yang rapuh.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Jitter:** variasi acak pada delay untuk menghindari titik tabrakan.
- **Budget retry:** batas waktu total untuk semua percobaan.

---

## Mengapa pola ini sangat umum di healthcare

1. Library HTTP default tanpa retry policy matang.
2. Mobile app retry agresif saat sinyal buruk.
3. Worker Kubernetes restart serentak memicu retry serentak.

---

## Pola gagal (ilustrasi)

```typescript
for (let i = 0; i < 5; i++) {
  await sleep(1000); // fixed — semua klien selaras
  await callApi();
}
```

---

## Gejala di production

- Lonjakan traffic berulang dengan pola periodik setelah insiden.
- Recovery DB lebih lambat karena beban tambahan.

---

## Diagnosis

1. Plot request rate menunjukkan puncak teratur pasca error massal.
2. Periksa konfigurasi retry klien populer.

---

## Mitigasi yang disarankan

1. Pakai pustaka seperti `p-retry` dengan jitter atau policy Resilience4j setara.
2. **Circuit breaker** membuka ketika error masih tinggi.
3. Edge rate limit untuk melindungi origin.

---

## Trade-off dan risiko

- Backoff panjang menunda pemulihan pengalaman pengguna—tampilkan status penundaan.

---

## Aspek khusus healthcare

- Portal pasien seluler sering retry—koordinasikan dengan timeout UX yang manusiawi.

---

## Checklist review PR

- [ ] Retry policy punya jitter dan batas absolut.

---

## Kata kunci untuk pencarian

`exponential backoff`, `jitter`, `thundering herd`, `retry storm`

---

## Catatan tambahan operasional

Catat metrik **retry count per route** untuk mendeteksi integrasi yang sering mengherder tanpa insiden besar.

---

## Referensi internal

- [`README.md`](./README.md) · **#35**, **#40**.
