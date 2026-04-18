# #13 — Lock timeout pada row “hot” (counter, slot jadwal)

**Indeks:** [`README.md`](./README.md) · **ID:** `#13` · **Kategori:** Database & transaksi

---

## Ringkasan

**Hot row** adalah satu baris tabel yang di-update sangat sering—contoh **counter antrian**, **slot appointment** untuk dokter populer, atau **flag status** encounter pusat. Transaksi yang menahan lock lama pada baris ini membuat transaksi lain **timeout** atau menunggu berantai. Di healthcare, jam praktik menyebabkan kontensi tinggi pada slot terbatas.

---

## Mitigasi ideal (~60 detik)

“Hot row itu bottleneck serial—semua request mengunci baris yang sama. Mitigasinya: **kurangi durasi transaksi** pada baris itu; pecah counter ke **sharded counters** atau gunakan **increment atomic singkat**; untuk slot appointment pertimbangkan **optimistic concurrency** dengan versi kolom atau **advisory lock** dengan granularity lebih halus. Kalau tetap perlu serialisasi, naikkan **timeout** saja bukan solusi—kita harus mengurangi konflik.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Row-level lock contention:** banyak transaksi menunggu lock pada primary key sama.
- **Hot spot:** pola akses tidak merata menuju sedikit key.

---

## Mengapa pola ini sangat umum di healthcare

1. Slot dokter langka—banyak pasien berebut waktu sama.
2. Generator nomor kunjungan global per fasilitas.
3. Status encounter terpusat yang di-update oleh banyak integrasi.

---

## Pola gagal (ilustrasi)

```sql
BEGIN;
UPDATE appointment_slots SET remaining = remaining - 1 WHERE id = $hotId;
-- transaksi melakukan logika berat sebelum COMMIT → lock panjang
```

---

## Gejala di production

- Error `lock timeout` / `could not obtain lock` pada jam tertentu.
- Latency ekor panjang pada endpoint booking.

---

## Diagnosis

1. Monitor **wait events** dan query yang menunggu lock row tertentu.
2. Identifikasi PK/unik yang sering muncul di blocking chain.

---

## Mitigasi yang disarankan

1. Singkatkan transaksi—pindahkan efek samping berat keluar commit.
2. **Sharding** counter—misalnya beberapa sequence per loket.
3. Gunakan **queue** untuk serialisasi di luar DB jika cocok.

---

## Trade-off dan risiko

- Sharding menambah kompleksitas laporan—dokumentasikan agregasi.

---

## Aspek khusus healthcare

- Booking pasien bersifat sensitif waktu—UX harus menampilkan konflik dengan jelas, bukan error generik.

---

## Checklist review PR

- [ ] Tidak ada logika berat atau call HTTP dalam transaksi yang mengunci slot.

---

## Kata kunci untuk pencarian

`hot row`, `lock contention`, `appointment slot`, `SERIAL`, `optimistic locking`

---

## Catatan tambahan operasional

Ukur **queue depth** pada connection pool ketika kontensi naik—kadang bottleneck di aplikasi, bukan DB semata.

---

## Referensi internal

- [`README.md`](./README.md) · **#12**, **#14**.
