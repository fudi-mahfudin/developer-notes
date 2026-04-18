# #11 — JOIN berlebihan pada materialized view yang stale

**Indeks:** [`README.md`](./README.md) · **ID:** `#11` · **Kategori:** Database & transaksi

---

## Ringkasan

**Materialized view (MV)** mempercepat laporan dengan pre-agregasi, tetapi isinya **tidak realtime** sampai di-refresh. JOIN berlapis antara tabel operasional transaksional dan MV tanpa memahami **freshness** menampilkan ringkasan penagihan, okupansi bed, atau KPI lab yang **sudah usang**—padahal tabel fakta dasar sudah berubah. Di healthcare dashboard, mismatch ini dapat membingungkan klinisi dan tim revenue cycle.

---

## Mitigasi ideal (~60 detik)

“MV itu snapshot—kalau kita join MV ke tabel live tanpa sadar staleness, kita campur **angka historis** dengan **status real-time** dan menghasilkan keputusan salah. Mitigasinya: dokumentasikan **jadwal refresh** MV; untuk UI klinis kritis pakai **sumber transaksional** atau MV yang di-refresh near-real-time; tambahkan **badge ‘data sampai jam X’**. Kalau query planner memilih MV karena murah tetapi tidak sesuai SLA data, paksa path lain atau pecah endpoint.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Staleness:** selisih waktu antara event terbaru dan snapshot MV terakhir.
- **Hybrid query:** menggabungkan MV summary dengan detail live tanpa semantik yang jelas.

---

## Mengapa pola ini sangat umum di healthcare

1. Dashboard eksekutif membutuhkan performa → MV.
2. Tim tidak membedakan MV untuk analitik vs operasional harian.
3. Refresh nightly tidak cukup untuk OK bed occupancy intraday.

---

## Pola gagal (ilustrasi)

Dashboard menampilkan **sisa slot OR** dari MV kemarin join appointment hari ini—slot terlihat salah.

---

## Gejala di production

- Keluhan “angka tidak sama dengan sistem sumber” setelah cutover cepat.
- Investigasi panjang yang menunjukkan MV belum refresh.

---

## Diagnosis

1. Bandingkan **COUNT/SUM** MV vs query langsung pada subset.
2. Lihat metadata `refresh` di Postgres / job scheduler.

---

## Mitigasi yang disarankan

1. **CONCURRENT refresh** pada jadwal ketat + monitoring gagal refresh.
2. Pisahkan endpoint **analytics** vs **operational**.
3. Tampilkan **timestamp last refresh** di payload.

---

## Trade-off dan risiko

- Refresh concurrent membebani IO—atur jendela maintenance.

---

## Aspek khusus healthcare

- KPI pasien keselamatan tidak boleh bergantung MV harian semata.

---

## Checklist review PR

- [ ] Penggunaan MV dicatat dalam kontrak API dengan freshness.
- [ ] Alarm jika job refresh gagal dua kali berturut-turut.

---

## Kata kunci untuk pencarian

`materialized view`, `stale read`, `REFRESH MATERIALIZED VIEW`, `dashboard consistency`

---

## Catatan tambahan operasional

Untuk Postgres, pertimbangkan `REFRESH MATERIALIZED VIEW CONCURRENTLY` hanya jika unique index pada MV memenuhi syarat.

Saat mendesain dashboard, pisahkan endpoint **operasional** (butuh konsistensi kuat) dari **analitik** (boleh eventual consistency) agar trade-off MV tidak mengaburkan bug integritas data.

Cantumkan **`asOf`** atau **`snapshotTime`** dalam payload API agar klien tidak menginterpretasikan angka MV sebagai keadaan real-time tanpa konteks.

---

## Referensi internal

- [`README.md`](./README.md) · **#06** (perubahan plan), **#19** (replica lag konsep berbeda).
