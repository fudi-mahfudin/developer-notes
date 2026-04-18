# #28 — Typo enum / string status vs constraint database

**Indeks:** [`README.md`](./README.md) · **ID:** `#28` · **Kategori:** Database & transaksi

---

## Ringkasan

Kode TypeScript memakai literal string `'scheduled'` sedangkan constraint DB memakai `'SCHEDULED'` atau enum Postgres berbeda—insert/update **gagal** atau ter-silent melalui cast gelap. Di healthcare, status order lab atau status encounter yang salah satu huruf menyimpang dapat mengirim notifikasi ke workflow yang salah atau ditolak DB di tengah integrasi.

---

## Mitigasi ideal (~60 detik)

“Selaraskan status dengan **enum DB** atau **lookup table**—TypeScript mengimpor konstanta dari satu sumber kebenaran (`prisma generate`, codegen SQL). Validasi input dengan **zod/io-ts** memetakan ke union yang sama dengan constraint. Hindari string bebas pada kolom status kritis. Untuk migrasi nilai lama, tulis skrip transformasi eksplisit dengan audit.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Single source of truth:** definisi status di satu artefak yang diekspor ke app.
- **Check constraint:** DB menolak nilai di luar domain.

---

## Mengapa pola ini sangat umum di healthcare

1. Banyak status bisnis ditambahkan lintas tim tanpa RFC skema.
2. Case sensitivity berbeda antara Windows dev dan Linux prod.
3. JSON dari vendor eksternal menggunakan sinonim.

---

## Pola gagal (ilustrasi)

```typescript
await db.update({ status: 'complet' }); // typo vs 'complete'
```

---

## Gejala di production

- Error constraint violation di log worker—kadang tidak ter-map ke alert bisnis.
- Status order “nyangkut” tidak dikenali oleh mesin state.

---

## Diagnosis

1. Aggregasi error code 23514 atau sejenis.
2. Diff antara enum TS manual vs `pg_enum`.

---

## Mitigasi yang disarankan

1. Codegen dari DB atau gunakan lookup table dengan FK.
2. Test kontrak antara layanan producer/consumer status.
3. Feature flag untuk menambah status dengan migrasi lengkap.

---

## Trade-off dan risiko

- Enum keras memperlambat evolusi—gunakan versi API atau mapping layer.

---

## Aspek khusus healthcare

- Status “STAT” vs “ROUTINE” mempengaruhi prioritas perawatan—typo berbahaya.

---

## Checklist review PR

- [ ] Status baru disertai update constraint + konstanta terpusat.

---

## Kata kunci untuk pencarian

`check constraint`, `enum drift`, `domain model`, `zod`

---

## Catatan tambahan operasional

Ubah CI untuk membandingkan snapshot enum DB dengan definisi TypeScript pada build.

Saat menerjemahkan status dari vendor eksternal, simpan **tabel mapping versi** agar upgrade sinonim tidak memecahkan constraint diam-diam.

---

## Referensi internal

- [`README.md`](./README.md) · **#22**.
