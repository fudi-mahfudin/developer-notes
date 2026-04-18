# #25 — Race pada unique constraint → baris duplikat saat burst insert

**Indeks:** [`README.md`](./README.md) · **ID:** `#25` · **Kategori:** Database & transaksi

---

## Ringkasan

Dua permintaan paralel melakukan **cek read** “apakah sudah ada?” lalu **insert** jika belum—tanpa transaksi yang mengunci rentang atau tanpa mengandalkan **unique constraint** database. Pada burst traffic (registrasi vaksin, booking), keduanya melihat kosong dan menyisipkan duplikat sebelum constraint—atau constraint menyelamatkan tetapi aplikasi tidak menangani error **23505** dengan idempotensi.

---

## Mitigasi ideal (~60 detik)

“Solusi utamanya adalah **unique index** pada kombinasi yang harus unik—database sebagai arbiter kebenaran. Aplikasi menangkap konflik dan memperlakukan sebagai **success idempotent** atau mengembalikan resource yang sudah ada. Hindari pola check-then-insert tanpa serialisasi. Untuk nomor urut global, gunakan **sequence** atau **serialisasi** melalui advisory lock slot kecil.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Upsert:** `INSERT … ON CONFLICT` membuat operasi aman terhadap race.
- **Idempotent retry:** klien mengirim idempotency key yang sama.

---

## Mengapa pola ini sangat umum di healthcare

1. Integrasi duplikat dari HIS dan lab eksternal.
2. Retry jaringan mengirim ulang payload sama.
3. Worker paralel memproses antrian tanpa koordinasi.

---

## Pola gagal (ilustrasi)

```typescript
const exists = await findByExternalId(x);
if (!exists) await create({ externalId: x }); // race window
```

---

## Gejala di production

- Duplikat encounter/order dengan ID eksternal sama.
- Error 500 dari unhandled unique violation.

---

## Diagnosis

1. Analisis duplikat dengan query grup `HAVING count>1`.
2. Trace request IDs pada waktu kejadian.

---

## Mitigasi yang disarankan

1. Unique constraint + upsert.
2. Idempotency key header pada API publik [#36](36-idempotency-key-hilang-client-only.md).

---

## Trade-off dan risiko

- Unique terlalu ketat bisa menolak kasus sah edge—definisikan escape manual.

---

## Aspek khusus healthcare

- Identitas pesanan lab harus unik untuk menghindari pengambilan darah ganda.

---

## Checklist review PR

- [ ] Insert berdasarkan ID eksternal memakai upsert atau conflict handling.

---

## Kata kunci untuk pencarian

`unique violation`, `ON CONFLICT`, `upsert`, `idempotency`

---

## Catatan tambahan operasional

Log konflik unik sebagai metrik bisnis—menandakan retry atau integrasi ganda.

Untuk integrasi HL7/FHIR, mapping **message control ID** ke idempotency internal mengurangi duplikasi saat jaringan mengirim ulang payload identik.

---

## Referensi internal

- [`README.md`](./README.md) · **#26**.
