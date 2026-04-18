# #18 — Tanpa statement timeout → satu query mengunci worker

**Indeks:** [`README.md`](./README.md) · **ID:** `#18` · **Kategori:** Database & transaksi

---

## Ringkasan

Tanpa **`statement_timeout`** (atau setara di mesin lain), satu query bisa berjalan tanpa batas ketika planner salah memilih nested loop besar atau pengguna mengirim rentang tanggal eksplisit besar. Worker Node.js menahan **koneksi pool** dan thread evloop sibuk menunggu respons DB—meningkatkan tail latency untuk semua endpoint lain yang berbagi pool.

---

## Mitigasi ideal (~60 detik)

“Statement timeout itu **safety net**: query tidak boleh lebih lama dari SLA layar—misalnya dua detik untuk API interaktif. Set di **server** (`statement_timeout`) dan/atau per session dari aplikasi; untuk reporting panjang gunakan **role/worker** berbeda dengan timeout lebih besar. Kombinasikan dengan **EXPLAIN** di staging dan guard parameter rentang tanggal. Di healthcare, timeout yang jelas lebih baik daripada menunggu tak tentu yang memicu reload berulang dari portal.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Statement timeout:** pembatalan query yang melebihi durasi.
- **Role-based limits:** API vs reporting worker berbeda timeout.

---

## Mengapa pola ini sangat umum di healthcare

1. Laporan ad hoc dari user bisnis tanpa guard.
2. ORM tidak menyetel timeout default aman.
3. Integrasi dikira kecil tetapi join meledak di prod.

---

## Pola gagal (ilustrasi)

User memilih rentang tiga tahun data encounter pada dashboard tanpa pagination—query berjalan menit.

---

## Gejala di production

- Seluruh aplikasi terasa lambat saat satu pengguna menjalankan laporan berat.
- DB CPU penuh pada satu query.

---

## Diagnosis

1. `pg_stat_activity` melihat query berjalan sangat lama.
2. Tidak ada timeout di session—periksa `SHOW statement_timeout`.

---

## Mitigasi yang disarankan

1. Set global/tier timeout.
2. Validasi parameter tanggal di controller.
3. Alihkan laporan besar ke job async + notifikasi.

---

## Trade-off dan risiko

- Timeout terlalu agresif memutus query sah batch—gunakan multiple roles.

---

## Aspek khusus healthcare

- Riset klinis kadang butuh scan besar—isolasi ke cluster/replica analitik.

---

## Checklist review PR

- [ ] Endpoint baru dengan query dinamis punya **batas parameter** dan timeout.

---

## Kata kunci untuk pencarian

`statement_timeout`, `idle_in_transaction_session_timeout`, `query timeout`

---

## Catatan tambahan operasional

Untuk Postgres, pertimbangkan juga **`lock_timeout`** pada transaksi yang memerlukan lock cepat atau gagal.

Bedakan timeout untuk **API sinkron** vs **worker batch** melalui role DB atau variabel sesi yang diset oleh middleware—jangan satu angka untuk semua beban.

Catat angka timeout pada **definitions SLO** per endpoint agar tidak terjadi argumen subjektif saat RCA insiden latensi.

---

## Referensi internal

- [`README.md`](./README.md) · **#16**.
