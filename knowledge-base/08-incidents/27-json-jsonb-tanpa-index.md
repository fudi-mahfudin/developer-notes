# #27 — Query JSON / JSONB tanpa index yang sesuai

**Indeks:** [`README.md`](./README.md) · **ID:** `#27` · **Kategori:** Database & transaksi

---

## Ringkasan

Menyimpan payload fleksibel **JSONB** untuk integrasi FHIR atau metadata perangkat medis tanpa **GIN index**, **expression index**, atau **generated column** menyebabkan predikat seperti `payload @> '{"status":"final"}'` atau `jsonb_path_query` memindai seluruh tabel. Di production, fitur pencarian berdasarkan field dalam JSON menjadi bottleneck seiring volume.

---

## Mitigasi ideal (~60 detik)

“Kalau kita query JSON tanpa index, kita scan besar. Mitigasinya: promosikan field kritis ke **kolom terstruktur** terindeks; kalau tetap di JSONB gunakan **GIN (jsonb_ops atau jsonb_path_ops)** sesuai operator; untuk satu field sering, pertimbangkan **generated column** terindeks. Analisis pola operator `@>` vs `->>` karena memengaruhi indeks. Untuk healthcare, minimalkan penyimpanan PHI dalam JSON tak terstruktur—lebih sulit audit dan indeks.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **GIN:** indeks umum untuk containment JSONB di Postgres.
- **Generated column:** mengekstrak subset JSON ke kolom query-friendly.

---

## Mengapa pola ini sangat umum di healthcare

1. Integrasi cepat menyimpan bundle FHIR utuh.
2. Query ad hoc oleh tim data science di production DB.
3. Tim tidak memahami perbedaan operator JSON.

---

## Pola gagal (ilustrasi)

Filter pada `resource->'code'->>'text'` tanpa index ekspresi—seq scan.

---

## Gejala di production

- Endpoint pencarian resource FHIR internal lambat meski volume moderat.

---

## Diagnosis

1. `EXPLAIN` menunjukkan seq scan pada tabel JSON besar.
2. Analisis query dengan `pg_stat_statements`.

---

## Mitigasi yang disarankan

1. Normalisasi field kritis.
2. Buat indeks GIN atau btree pada ekspresi stabil.
3. Partisi tabel jika pertumbuhan pesan besar.

---

## Trade-off dan risiko

- GIN index besar—monitor ukuran dan autovacuum [#04](04-terlalu-banyak-index-write-lambat.md).

---

## Aspek khusus healthcare

- Bundle FHIR bisa berisi PHI padat—pertimbangkan enkripsi kolom dan minimasi duplikasi.

---

## Checklist review PR

- [ ] Predikat JSON baru memiliki strategi indeks atau normalisasi.

---

## Kata kunci untuk pencarian

`jsonb`, `GIN index`, `generated column`, `FHIR storage`

---

## Catatan tambahan operasional

Catat operator query yang dipakai aplikasi agar indeks tidak salah tipe (`jsonb_ops` vs `jsonb_path_ops`).

Rencanakan **compaction/archiving** untuk dokumen JSON mentah yang tidak lagi di-query aktif—menjaga ukuran tabel dan statistik tetap sehat.

Evaluasi **compression** tingkat kolom/toast hanya setelah memahami trade-off CPU dekompresi pada query panas.

Untuk bundle FHIR besar, pertimbangkan **external object store** dengan referensi ringan di DB agar indeks tetap efektif pada metadata saja.

---

## Referensi internal

- [`README.md`](./README.md) · **#03**.
