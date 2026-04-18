# #10 — `SELECT *` membawa blob besar tanpa kebutuhan

**Indeks:** [`README.md`](./README.md) · **ID:** `#10` · **Kategori:** Database & transaksi

---

## Ringkasan

`SELECT *` pada tabel yang menyimpan **blob**—PDF hasil radiologi, gambar dokumentasi luka, lampiran FHIR besar—memuat seluruh kolom ke memori aplikasi dan buffer DB tanpa kebutuhan UI saat itu. Di Node.js, ini memperbesar **GC pressure**, **network payload**, dan risiko **OOM** worker. Endpoint list yang “sekadar menampilkan metadata” sering memicu pola ini karena ORM default mengambil semua kolom.

---

## Mitigasi ideal (~60 detik)

“`SELECT *` pada tabel dengan lampiran klinis itu berbahaya: kita memuat megabyte per baris padahal UI cuma butuh nama file dan ukuran. Mitigasinya: **`select` eksplisit** kolom tipis—untuk blob simpan di object storage dengan URL presigned terpisah; listing query tidak boleh menyentuh kolom BYTEA/JSON besar. Tambahkan **DTO layer** yang melarang propagate blob ke serializer list. Ukur **response size** dan **heap** Node setelah perbaikan.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Projection minimization:** hanya kolom yang dibutuhkan layar/API.
- **Lazy attachment:** endpoint detail mengambil blob; list tidak.

---

## Mengapa pola ini sangat umum di healthcare

1. Skema menyatukan metadata dan konten biner dalam satu tabel untuk kemudahan awal.
2. ORM `findAll()` tanpa `select` eksplisit.
3. Mobile client meminta list lampiran dengan asumsi ringan.

---

## Pola gagal (ilustrasi)

```typescript
// pseudo ORM
const docs = await prisma.clinicalDocument.findMany({ where: { patientId } });
// membawa kolom payload_bytes untuk setiap baris
```

---

## Gejala di production

- Latency list lampiran sangat tinggi meski hanya menampilkan judul.
- Memory RSS naik pada worker saat batch export.

---

## Diagnosis

1. Profil payload response HTTP—lihat ukuran body.
2. Periksa SQL log untuk `SELECT *` atau kolom blob di query list.

---

## Mitigasi yang disarankan

1. Kolom terpisah / tabel anak untuk blob; query list join ringan saja.
2. `select` eksplisit di Prisma/TypeORM.
3. Streaming download dari storage untuk detail, bukan inline DB blob besar.

---

## Trade-off dan risiko

- Fragmentasi skema menambah join—pertimbangkan view tipis untuk list.

---

## Aspek khusus healthcare

- Radiologi dan patologi menghasilkan file besar—metadata saja untuk worklist.

---

## Checklist review PR

- [ ] Query list tidak menyertakan kolom LOB tanpa kebutuhan tegas.
- [ ] Uji ukuran JSON response sebelum merge.

---

## Kata kunci untuk pencarian

`SELECT *`, `projection`, `TOAST`, `bytea`, `lazy load attachment`

---

## Catatan tambahan operasional

Gunakan pemeriksaan otomatis di code review atau lint SQL untuk pola `SELECT *` pada tabel dokumen.

---

## Referensi internal

- [`README.md`](./README.md) · **#11** (join ke MV berat).
