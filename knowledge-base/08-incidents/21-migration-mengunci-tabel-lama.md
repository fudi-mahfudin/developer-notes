# #21 — Migration mengunci tabel terlalu lama di production

**Indeks:** [`README.md`](./README.md) · **ID:** `#21` · **Kategori:** Database & transaksi

---

## Ringkasan

Operasi skema seperti **`ALTER TABLE ADD COLUMN`** dengan rewrite penuh, pembuatan indeks **tanpa `CONCURRENTLY`**, atau lock akses eksklusif pada tabel besar dapat **memblokir** seluruh workload yang menyentuh tabel tersebut. Di rumah sakit yang beroperasi 24/7, downtime bahkan beberapa menit pada tabel encounter atau order tidak dapat diterima.

---

## Mitigasi ideal (~60 detik)

“Migrasi harus dirancang untuk **online**: gunakan langkah bertahap—tambah kolom nullable cepat; backfill batch; buat indeks **`CONCURRENTLY`**; hindari lock exclusive panjang; pada Postgres pertimbangkan **expand/contract**. Uji durasi lock pada snapshot volume prod. Komunikasikan **maintenance window** jika tidak ada alternatif. Untuk healthcare, koordinasi dengan tim klinis untuk jam rendah tetap tidak menjamin zero impact—monitoring guard wajib.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Expand/contract:** dua fase deploy untuk mengubah skema tanpa big bang lock.
- **Shadow index build:** indeks dibangun tanpa mengunci tulis (tergantung DB).

---

## Mengapa pola ini sangat umum di healthcare

1. Tabel fakta sangat besar sejak bertahun-tahun.
2. Script migrasi dari pengembang yang menguji di dataset kecil.
3. CI tidak mensimulasikan lock time.

---

## Pola gagal (ilustrasi)

`CREATE INDEX idx ON huge_table(col);` tanpa concurrent → rewrite/block.

---

## Gejala di production

- Seluruh endpoint yang menyentuh tabel timeout bersamaan selama migrasi.
- Antrean pasien terhenti di sistem registrasi.

---

## Diagnosis

1. Log migrasi dengan timestamp vs metrik error aplikasi.
2. Gunakan `pg_locks` selama dry-run staging besar.

---

## Mitigasi yang disarankan

1. Pecah migrasi multi-release [#22](22-migration-tidak-idempotent.md) dengan idempotensi.
2. Gunakan concurrent index / online DDL sesuai engine.
3. Throttle backfill untuk tidak membahayakan IO.

---

## Trade-off dan risiko

- Migrasi bertahap menambah kompleksitas state sementara—dokumentasikan invariant.

---

## Aspek khusus healthcare

- Jam operasi bed dan IGD tidak mengenal migrasi “malam saja” di zona waktu banyak cabang.

---

## Checklist review PR

- [ ] Skrip migrasi menyebutkan perkiraan lock dan strategi concurrent.
- [ ] Ada rollback path atau feature flag untuk kolom baru.

---

## Kata kunci untuk pencarian

`online DDL`, `CREATE INDEX CONCURRENTLY`, `expand contract migration`

---

## Catatan tambahan operasional

Simpan **replay migrasi** pada restore staging berkala untuk mendeteksi drift durasi ketika data tumbuh.

Selama migrasi berisiko tinggi, aktifkan **feature toggle** read-only pada fitur non-kritis yang menyentuh tabel terdampak agar beban tulis berkurang selama jendela pendek.

Cantumkan **estimated lock window** dalam komunikasi kepada tim operasional klinis agar antisipasi dapat direncanakan.

---

## Referensi internal

- [`README.md`](./README.md) · **#22**.
