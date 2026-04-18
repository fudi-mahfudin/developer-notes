# #08 — Pagination `OFFSET` besar → timeout

**Indeks:** [`README.md`](./README.md) · **ID:** `#08` · **Kategori:** Database & transaksi

---

## Ringkasan

Pola `ORDER BY ... LIMIT x OFFSET y` mengharuskan mesin database **memindai dan membuang** `y` baris sebelum mengembalikan halaman berikutnya. Untuk **offset besar** (misalnya halaman ratusan pada daftar histori encounter), biaya naik linear—sering memicu **timeout** dan beban IO meskipun `LIMIT` kecil. API Node.js yang mengekspos page number tanpa keyset pagination sangat rentan terhadap pola ini di production healthcare dengan histori pasien panjang.

---

## Mitigasi ideal (~60 detik)

“OFFSET besar bikin database harus membaca dan membuang jutaan baris sebelum mengembalikan dua puluh baris berikutnya. Mitigasinya: **keyset pagination** pakai **cursor** `(sort_column, id)` dengan `WHERE (sort_column, id) > ($lastSort, $lastId)`—atau token cursor terenkode; hindari **page number** untuk dataset dalam. Kalau tetap perlu offset untuk kasus admin jarang, set **timeout** dan batas page. Di healthcare, daftar pasien aktif harus pakai filter tanggal/status agar offset tidak pernah besar.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Offset pagination:** skip N baris berurutan setelah sort stabil.
- **Keyset / seek:** lanjutkan dari titik terakhir dengan predicate, bukan skip.

---

## Mengapa pola ini sangat umum di healthcare

1. UI meniru pola “halaman” seperti spreadsheet.
2. Laporan audit diminta untuk “loncat ke halaman 500”.
3. API publik tidak membatasi `page` query param.

---

## Pola gagal (ilustrasi)

```sql
SELECT * FROM clinical_events
ORDER BY occurred_at DESC
LIMIT 20 OFFSET 200000;
```

Database tetap harus menilai urutan untuk 200020 baris teratas.

---

## Gejala di production

- Endpoint histori timeout ketika pengguna mencoba halaman dalam.
- CPU DB spike pada scan + sort besar.

---

## Diagnosis

1. Lihat query log dengan **OFFSET** tinggi.
2. Profil `EXPLAIN`—perhatikan cost sort dan filter.

---

## Mitigasi yang disarankan

1. **Keyset pagination** dengan kolom terindeks + tie-breaker `id`.
2. **Search** dengan filter tanggal/status mengurangi kedalaman offset.
3. **Materialized summary** untuk laporan administratif.

---

## Trade-off dan risiko

- Keyset tidak mendukung “loncat halaman acak”—UX harus infinite scroll atau filter.
- Sort non-unik tanpa tie-breaker menyebabkan duplikat/halaman hilang—lihat [#09](09-cursor-pagination-salah-duplikat-hilang.md).

---

## Aspek khusus healthcare

- Riwayat medis multi-tahun membuat offset tanpa filter sangat berbahaya untuk performa dan privasi (eksposur data berlebihan).

---

## Checklist review PR

- [ ] Endpoint list dengan histori panjang memakai **cursor**, bukan offset besar.
- [ ] Parameter page di API publik dibatasi atau ditolak.

---

## Kata kunci untuk pencarian

`keyset pagination`, `cursor pagination`, `OFFSET performance`, `seek method`

---

## Catatan tambahan operasional

Encode cursor sebagai string yang menandatangani filter + sort version agar klien tidak memanipulasi predicate menjadi scan penuh.

---

## Referensi internal

- [`README.md`](./README.md) · **#09**.
