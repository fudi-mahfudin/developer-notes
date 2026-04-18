# #06 — Query plan berubah setelah statistik / `ANALYZE` → regresi performa

**Indeks:** [`README.md`](./README.md) · **ID:** `#06` · **Kategori:** Database & transaksi

---

## Ringkasan

Database relasional menggunakan **cost-based optimizer** yang mengandalkan **statistik distribusi** kolom (histogram, null fraction, correlation). Setelah **bulk load**, migrasi besar, atau `VACUUM`/`ANALYZE` rutin, estimasi cardinalitas berubah—planner bisa **memilih nested loop** vs **hash join** lain, atau **melepaskan** penggunaan indeks yang sebelumnya efisien. Di healthcare, regresi ini sering muncul setelah **cutover data historis** atau **purge** partition, membuat endpoint yang stabil tiba-tiba timeout tanpa perubahan kode Node.js.

---

## Mitigasi ideal (~60 detik)

“Planner itu mengikuti statistik—kalau distribusi data berubah, **plan bisa berubah drastis**. Mitigasinya: setelah migrasi besar atau load harian batch, jalankan **`ANALYZE`** terkontrol dan bandingkan **EXPLAIN** query kritis sebelum/sesudah; kalau regresi, pertimbangkan **`SET [enable_*]` debug**, **extended statistics**, atau **hint/plan stab** sesuai DB yang dipakai—di Postgres kadang perlu **`pg_stat_statements`** untuk melihat shift runtime. Untuk healthcare, simpan **baseline latency** endpoint pasien/order agar alarm ON ketika median naik walau deploy tidak ada.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Plan regression:** peningkatan biaya eksekusi untuk query yang sama secara tekstual setelah perubahan stats/schema.
- **Correlation misestimate:** dua kolom filter tidak independen—optimizer salah menduga jumlah baris.

---

## Mengapa pola ini sangat umum di healthcare

1. Data pasien tidak merata antar cabang—skew tinggi setelah pembukaan lokasi baru.
2. Purge/archive mengubah rasio status aktif vs historis.
3. Job ETL malam mengisi tabel fakta besar → statistics stale di siang hari.

---

## Pola gagal (ilustrasi)

Statistik menduga filter `priority = 'STAT'` sangat selektif; setelah kebijakan rumah sakit mengubah banyak order menjadi STAT, selektivitas turun—plan nested loop menjadi bencana.

---

## Gejala di production

- Timeout mendadak pada query yang sama versinya setelah maintenance DB.
- `EXPLAIN` berbeda untuk SQL identik antara staging dan prod—biasanya cardinality.

---

## Diagnosis

1. Bandingkan `EXPLAIN (ANALYZE, BUFFERS)` before/after peristiwa maintenance.
2. Periksa **autoanalyze** thresholds—apakah tabel besar kekurangan sampel?
3. Lihat **pg_stat_statements** mean time lonjak untuk query fingerprint sama.

---

## Mitigasi yang disarankan

1. Jalankan **`ANALYZE`** selektif pada tabel yang baru dimuat besar.
2. Buat **extended statistics** di Postgres untuk kombinasi kolom yang sering difilter bersamaan.
3. Untuk query sangat kritis, pertimbangkan **surat penstabil** (materialized path) atau **isi statement_timeout + guard** di aplikasi.

---

## Trade-off dan risiko

- Hint berlebihan mengunci evolusi skema— dokumentasi dan review berkala.
- Frequent manual analyze pada tabel besar bisa mengganggu IO—jadwalkan.

---

## Aspek khusus healthcare

- **Peak jam praktik:** regresi plan pada query appointment sangat terasa pengguna klinis.

---

## Checklist review PR

- [ ] Perubahan migrasi data besar disertai **catatan analisis statistik**.
- [ ] Query panas punya **uji performa** pasca-analyze di staging.

---

## Kata kunci untuk pencarian

`query plan regression`, `ANALYZE`, `cardinality misestimate`, `extended statistics`, `pg_stat_statements`

---

## Catatan tambahan operasional

Simpan snapshot `EXPLAIN` untuk query dengan SLA ketat di repositori runbook sehingga on-call dapat membandingkan saat insiden. Gunakan label rilis untuk mengkorelasikan lonjakan DB dengan migrasi vs deploy aplikasi. Bandingkan juga **rows estimated vs actual** pada `EXPLAIN ANALYZE` untuk mendeteksi cardinality drift lebih awal.

Saat rollout statistik baru, lakukan **canary** pada satu replica read-only untuk membandingkan median latency endpoint sebelum promosi penuh.

---

## Referensi internal

- [`README.md`](./README.md) · **#03**, **#05**.
