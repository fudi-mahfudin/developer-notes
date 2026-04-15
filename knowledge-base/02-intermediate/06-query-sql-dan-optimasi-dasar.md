# Query SQL dan Optimasi Dasar

## Core Idea (Feynman Concept Applied)

Query itu seperti mencari buku di perpustakaan. Kalau katalog dan rak teratur (index bagus), kamu cepat menemukan buku.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- Query SQL harus benar dan efisien.
- Index mempercepat baca tetapi menambah biaya tulis.
- Query plan dipakai untuk memahami bottleneck nyata.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: indexing terarah.
  - Kapan dipakai: kolom filter/sort sering dipakai.
  - Kelebihan: latency turun.
  - Keterbatasan: overhead write.
- Strategi 2: pagination + selective columns.
  - Kapan dipakai: endpoint list.
  - Kelebihan: payload kecil.
  - Keterbatasan: kompleksitas state paging.

### Risiko dan Pitfall
- Risiko 1: full table scan.
  - Gejala: query melambat drastis.
  - Dampak: beban DB naik.
  - Mitigasi: index + query rewrite.
- Risiko 2: over-indexing.
  - Gejala: insert/update lambat.
  - Dampak: throughput turun.
  - Mitigasi: audit index berkala.

### Pros dan Cons
- **Pros**
  - Performa API meningkat.
  - Biaya infrastruktur lebih efisien.
- **Cons**
  - Optimasi butuh pemahaman query plan.
  - Salah tuning bisa memindahkan masalah.

### Trade-off Praktis di Produksi
- Kecepatan baca vs biaya tulis.
- Query fleksibel vs performa stabil.
- Keputusan dari p95 query time dan DB CPU.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Laporan transaksi harian**
  - Kondisi: jutaan baris.
  - Masalah tanpa strategi: timeout.
  - Solusi: index tanggal + pagination.
  - Hasil yang diharapkan: laporan cepat diakses.
  - Catatan trade-off: maintenance index.
- **Kasus 2: Pencarian inventory**
  - Kondisi: filter kombinasi SKU/status.
  - Masalah tanpa strategi: response lambat.
  - Solusi: composite index + batasi kolom output.
  - Hasil yang diharapkan: pencarian responsif.
  - Catatan trade-off: kompleksitas query meningkat.

## Best Practices

- Pilih kolom seperlunya.
- Periksa query plan saat query lambat.
- Jaga konsistensi transaksi untuk data kritikal.
- Gunakan pagination default pada endpoint list untuk menjaga beban query stabil.

## Contoh Praktis Ringkas (dengan komentar kode)

```sql
-- Ambil transaksi terbaru dengan pagination
SELECT id, patient_id, status, created_at
FROM transactions
WHERE status = 'PENDING'
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;
```

## Checklist Pemahaman

- [ ] Tahu kapan index membantu.
- [ ] Tahu risiko query tanpa pagination.
- [ ] Bisa membedakan kapan perlu composite index.
- [ ] Bisa membaca indikasi dasar full table scan dari query plan.

## Latihan Mandiri

- Latihan 1 (basic): Tulis query untuk laporan retur inventory per hari.
- Latihan 2 (intermediate): Tambahkan index yang relevan lalu bandingkan waktu query.
- Latihan 3 (simulasi produksi): Simulasikan endpoint laporan dengan data besar, lalu tetapkan strategi query + pagination agar p95 tetap dalam target.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: slow query count, DB CPU.
- Metrik bisnis: waktu akses laporan.
- Ambang batas awal: query kritikal p95 < 300ms.
