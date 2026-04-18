# #52 — Operasi crypto / hash sinkron di jalur request panas

**Indeks:** [`README.md`](./README.md) · **ID:** `#52` · **Kategori:** Runtime Node.js & waktu

---

## Ringkasan

Fungsi seperti **bcrypt** dengan cost tinggi, **PBKDF2** panjang, atau **signing** payload besar pada setiap request login API dapat memblokir event loop serupa dengan JSON parse berat. Di healthcare, endpoint autentikasi pasien dan verifikasi TOTP sering menjalankan operasi KDF yang disalahkonfigurasi untuk throughput tinggi.

---

## Mitigasi ideal (~60 detik)

“Gunakan cost factor bcrypt yang seimbang dengan ancaman vs throughput—pertimbangkan **argon2** dengan parameter yang didukung hardware. Cache intermediate hanya jika aman—biasanya tidak untuk password. Offload operasi berat ke **worker threads** atau layanan auth terpisah. Pantau **latency login** vs CPU.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **KDF cost:** parameter yang memperbesar waktu brute-force tetapi juga CPU.

---

## Mengapa pola ini sangat umum di healthcare

1. Kebijakan keamanan menuntut bcrypt rounds tinggi tanpa load test.
2. Hashing berulang pada setiap request karena desain token stateless berat.
3. Library default tidak disesuaikan dengan traffic portal.

---

## Pola gagal (ilustrasi)

bcrypt cost 14 pada endpoint login dengan ribuan percobaan per menit selama kampanye—CPU penuh.

---

## Gejala di production

- Login latency naik drastis saat kampanye publik; API lain ikut melambat pada pod sama.

---

## Diagnosis

1. CPU flamegraph menunjukkan `bcrypt` dominan.
2. Bandingkan durasi login vs worker count.

---

## Mitigasi yang disarankan

1. Sesuaikan cost dengan benchmark target ms.
2. Pisahkan pool pod untuk auth vs API umum.
3. Rate limit login untuk melindungi CPU dan brute force [#83](83-rate-limit-portal-pasien-lemah.md).

---

## Trade-off dan risiko

- Menurunkan cost meningkatkan risiko brute force—kombinasikan dengan MFA dan rate limit.

---

## Aspek khusus healthcare

- Portal pasien sering menjadi target credential stuffing saat berita kesehatan ramai—perlindungan harus menyeluruh.

---

## Checklist review PR

- [ ] Parameter KDF ditinjau dengan metrik throughput dan ancaman.

---

## Kata kunci untuk pencarian

`bcrypt`, `argon2`, `worker_threads`, `CPU bound`

---

## Catatan tambahan operasional

Uji **burst login** di staging dengan pola realistis sebelum peluncuran kampanye besar.

Pertimbangkan **hardware security module** atau layanan auth terkelola jika beban KDF terus meningkat melebihi kapasitas pod.

Monitor rasio **login gagal vs sukses** untuk membedakan brute force dari masalah konfigurasi KDF.

Lakukan **profiling berkala** pada endpoint login untuk memastikan tidak ada regresi KDF setelah upgrade library.

---

## Referensi internal

- [`README.md`](./README.md) · **#51**.
