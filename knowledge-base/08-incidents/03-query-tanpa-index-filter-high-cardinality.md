# #03 — Query tanpa index pada kolom filter high-cardinality

**Indeks:** [`README.md`](./README.md) · **ID:** `#03` · **Kategori:** Database & transaksi

---

## Ringkasan

Filter pada kolom **high-cardinality** seperti `patient_mrn`, `encounter_id`, atau kombinasi **facility_id + tanggal kunjungan** akan memaksa database memindai volume besar baris jika **tidak ada indeks yang selaras dengan pola WHERE**. Di staging dengan dataset kecil query tetap terasa cepat; di production, **full scan** atau **bitmap scan** pada jutaan baris menghasilkan timeout, antrean lock, dan degradasi lintas tenant pada aplikasi healthcare berbasis Node.js yang memakai pool koneksi terbatas.

---

## Mitigasi ideal (~60 detik)

“Masalahnya filter yang sering dipakai user—MRN, encounter ID, rentang tanggal—**tidak punya index yang cocok**, jadi Postgres atau SQL Server harus membaca setengah tabel. Mitigasinya: **analisis query panas dari log**, buat **index komposit** dengan urutan kolom sesuai selektivitas dan pola `WHERE`/`ORDER BY`, tambahkan **partial index** kalau query selalu menyertakan predicate tetap seperti `deleted_at IS NULL`. Setelah itu jalankan **`EXPLAIN (ANALYZE, BUFFERS)`** di staging dengan cardinality mirip prod—harusnya index scan atau bitmap index scan, bukan sequential scan besar. Untuk healthcare, pastikan index tidak melanggar kebijakan retain—kadang partial index membantu memisahkan data aktif.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **High-cardinality:** banyak nilai unik (ID medis, nomor kunjungan)—bukan seperti boolean “is_active”.
- **Tanpa index yang selaras:** predicate tidak memenuhi leading edge composite index, atau statistics membujuk planner memilih seq scan.

---

## Mengapa pola ini sangat umum di healthcare

1. Skema berkembang cepat (kolom baru untuk regulasi / integrasi) tanpa baseline index.
2. Query dari UI selalu pakai kombinasi filter yang **berbeda** dari yang diindeks awal.
3. ORM menghasilkan `WHERE` dengan **fungsi** atau **cast** yang membatalkan penggunaan index.

---

## Pola gagal (ilustrasi)

```sql
-- Indeks hanya pada (facility_id), query memfilter tanggal + MRN
SELECT * FROM encounters
WHERE facility_id = $1 AND visit_date BETWEEN $2 AND $3 AND patient_mrn = $4;
```

Tanpa indeks yang mencakup kolom selektif atau urutan yang tepat, biaya naik drastis.

---

## Gejala di production

- Endpoint pencarian pasien / encounter **timeout sporadis**.
- CPU DB tinggi pada jam sibuk tanpa peningkatan traffic proporsional di app server.
- **Buffer read** besar di `EXPLAIN` untuk query yang seharusnya sempit.

---

## Diagnosis

1. Kumpulkan **slow query log** atau sampling APM database.
2. Jalankan `EXPLAIN ANALYZE` dengan parameter produksi yang disanitasi.
3. Periksa **missing index** pada foreign key yang sering di-join tanpa index backing.

---

## Mitigasi yang disarankan

1. Indeks komposit: `(facility_id, visit_date)` atau `(patient_id, created_at)` sesuai pola bisnis.
2. **Partial index** untuk subset aktif: `WHERE deleted_at IS NULL`.
3. **Covering index** (INCLUDE kolom jarang berubah) untuk query read-heavy list.
4. **Vacuum/analyze** ritme agar planner tidak salah estimasi.

---

## Trade-off dan risiko

- Index berlebihan memperlambat **INSERT/UPDATE** dan maintenance—lihat [#04](04-terlalu-banyak-index-write-lambat.md).
- Index pada kolom sangat dinamis bisa menyebabkan **bloat**—monitor autovacuum.

---

## Aspek khusus healthcare

- **MRN** sering dicari harian oleh front desk—tanpa index yang tepat, sistem appointment dan registrasi ikut terguncang.
- **PHI:** hindari index pada kolom yang tidak perlu dicari global jika kebijakan membatasi pola akses.

---

## Checklist review PR

- [ ] Query baru dengan filter produksi punya **EXPLAIN** terlampir atau checklist index.
- [ ] FK yang dipakai di JOIN punya index di sisi child **kecuali** sudah ditinjau eksplisit.
- [ ] Tidak ada `WHERE lower(email)` tanpa index ekspresi—lihat [#07](07-full-table-scan-fungsi-pada-kolom-terindeks.md).

---

## Kata kunci untuk pencarian

`missing index`, `high cardinality`, `composite index`, `partial index`, `slow query`, `EXPLAIN ANALYZE`

---

## Referensi internal

- [`README.md`](./README.md) · **#05** (urutan kolom index), **#07** (fungsi pada kolom).
