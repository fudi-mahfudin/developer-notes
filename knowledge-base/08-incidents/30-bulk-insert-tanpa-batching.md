# #30 — Bulk insert tanpa batching → spike memori Node

**Indeks:** [`README.md`](./README.md) · **ID:** `#30` · **Kategori:** Database & transaksi

---

## Ringkasan

Memuat **ratusan ribu objek** ke memori JavaScript lalu memanggil `insertMany` sekaligus atau membentuk satu query multi-values raksasa meningkatkan **heap usage**, **GC pause**, dan risiko **OOM** pada worker. Database juga menerima payload besar sekaligus. Impor data pasien/hasil lab batch dari CSV sering memicu pola ini.

---

## Mitigasi ideal (~60 detik)

“Bulk insert harus **streaming atau chunk**—misalnya 500–5000 baris per batch tergantung lebar kolom—dengan kontrol memori dan commit per chunk. Gunakan **COPY FROM** Postgres untuk ingest besar dari file. Hindari menahan seluruh dataset dalam array JS; pakai stream parser. Pantau **heap** dan **statement size limit**. Untuk healthcare, validasi batch untuk PHI sebelum insert—jangan mengorbankan integritas demi kecepatan mentah.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Chunking:** membagi input menjadi transaksi lebih kecil berturut-turut.
- **COPY:** jalur native DB untuk ingest massal.

---

## Mengapa pola ini sangat umum di healthcare

1. Migrasi data historis satu kali besar.
2. Job nightly sinkronisasi dari EHR eksternal.
3. Developer menggunakan contoh tutorial dengan dataset kecil.

---

## Pola gagal (ilustrasi)

```typescript
const rows = JSON.parse(fs.readFileSync('huge.json')); // GB RAM
await prisma.thing.createMany({ data: rows });
```

---

## Gejala di production

- Worker restart OOM saat job impor.
- DB menolak query karena melebihi `max_allowed_packet` / parameter limit.

---

## Diagnosis

1. Profil heap saat job.
2. Log error ukuran paket/query.

---

## Mitigasi yang disarankan

1. Stream CSV/JSON dengan iterator.
2. Batch insert dengan loop + progress checkpoint.
3. Gunakan COPY melalui `pg-copy-streams` atau sejenis.

---

## Trade-off dan risiko

- Chunk lebih kecil meningkatkan jumlah round-trip—sesuaikan ukuran chunk dengan latency.

---

## Aspek khusus healthcare

- Impor PHI harus terenkripsi dalam transit dan memiliki audit siapa memicu job.

---

## Checklist review PR

- [ ] Job bulk menyebutkan ukuran chunk dan perkiraan RAM.

---

## Kata kunci untuk pencarian

`bulk insert`, `chunk`, `COPY`, `OOM`, `streaming`

---

## Catatan tambahan operasional

Simpan checkpoint batch di tabel job agar impor dapat dilanjutkan setelah kegagalan tanpa duplikasi [#25](25-race-unique-constraint-duplikat.md).

Untuk dataset sangat besar, jalankan impor pada **window maintenance** dengan rate limit yang dikontrol agar tidak mengalahkan kapasitas replikasi dan backup berkelanjutan.

---

## Referensi internal

- [`README.md`](./README.md) · **#18**.
