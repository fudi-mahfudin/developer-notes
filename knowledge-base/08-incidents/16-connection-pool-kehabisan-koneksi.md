# #16 — Connection pool kehabisan koneksi saat lonjakan traffic

**Indeks:** [`README.md`](./README.md) · **ID:** `#16` · **Kategori:** Database & transaksi

---

## Ringkasan

Pool koneksi DB membatasi jumlah **sesi simultan** ke server. Ketika traffic melonjak—campaign kesehatan, registrasi vaksin massal, atau retry kilat dari klien gagal—permintaan melebihi `max` pool atau transaksi mengikat koneksi terlalu lama. Node.js mulai mengantre pada `pool.query`, menyebabkan **timeout berantai** dan gejala “seluruh sistem down” walau CPU DB masih tersisa.

---

## Mitigasi ideal (~60 detik)

“Pool habis bukan selalu DB lambat—seringnya aplikasi **menahan koneksi**. Mitigasinya: sesuaikan **pool size** dengan worker count dan batas DB; pasang **acquire timeout** yang jelas; kurangi transaksi panjang [#14](14-transaction-scope-terlalu-lebar.md); tambahkan **rate limit** dan **queue** di edge; skala horizontal app dengan pool per instance yang tidak melebihi **max_connections** DB. Untuk healthcare, pantau **waiting clients** pada pool metrics.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Pool exhaustion:** semua koneksi dipinjam, permintaan baru menunggu atau gagal.
- **Little's Law intuition:** jumlah permintaan dalam sistem ≈ arrival rate × latency.

---

## Mengapa pola ini sangat umum di healthcare

1. Lonjakan terjadwal (jam buka poli) dan tak terduga (insiden publik).
2. Worker Node yang besar dengan pool default terlalu besar per proses.
3. Background job dan API berbagi pool tanpa isolasi.

---

## Pola gagal (ilustrasi)

`max=100` pada 20 pod → 2000 koneksi potensial ke Postgres dengan `max_connections` 200.

---

## Gejala di production

- Error `timeout acquiring connection`.
- Latency meluncur naik tanpa slow query dominan tunggal.

---

## Diagnosis

1. Metrik pool: **waiting count**, **idle**, **total**.
2. DB side: jumlah sesi aktif vs `max_connections`.

---

## Mitigasi yang disarankan

1. Hitung ulang pool size = `(core_count * factor)` dengan faktor konservatif.
2. Bedakan pool untuk job berat vs API interaktif (dua pool atau cluster DB read replica).
3. Autoscaling horizontal dengan memperhatikan koneksi agregat.

---

## Trade-off dan risiko

- Pool terlalu kecil mengurangi throughput sehat—uji beban.

---

## Aspek khusus healthcare

- Insiden kesehatan masyarakat dapat melipatgandakan traffic portal pasien dalam jam.

---

## Checklist review PR

- [ ] Perubahan concurrency worker disertai tinjauan pool size.

---

## Kata kunci untuk pencarian

`connection pool`, `pgbouncer`, `acquire timeout`, `max_connections`

---

## Catatan tambahan operasional

Gunakan **PgBouncer** atau sejenis untuk multiplexing jika banyak instance Node.

Dokumentasikan formula sizing pool di runbook tim—misalnya “max pool per pod × jumlah pod ≤ 70% max_connections DB” agar onboarding engineer tidak mengulang kesalahan konfigurasi.

Pasang **dashboard** yang menampilkan korelasi antara lonjakan pool wait dengan query **N+1** atau transaksi panjang agar akar masalah tidak disalahkan semata pada database.

---

## Referensi internal

- [`README.md`](./README.md) · **#17**, **#18**.
