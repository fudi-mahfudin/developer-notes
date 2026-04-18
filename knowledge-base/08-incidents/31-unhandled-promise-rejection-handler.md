# #31 — Unhandled promise rejection di request handler

**Indeks:** [`README.md`](./README.md) · **ID:** `#31` · **Kategori:** Async, reliability & antrian

---

## Ringkasan

Di Node.js, **Promise** yang gagal tanpa `.catch()` atau tanpa `await` dalam `try/catch` menghasilkan **unhandled rejection**. Pada server HTTP (Express/Fastify/Nest), ini bisa mengakhiri response dengan status tidak konsisten, membocorkan detail error, atau—pada versi runtime tertentu—mengancam stabilitas proses. Di healthcare, kegagalan penyimpanan order atau update status pasien bisa “hilang” dari sudut pandang klien meskipun efek parsial terjadi di downstream.

---

## Mitigasi ideal (~60 detik)

“Selalu hubungkan async request ke **error middleware** terpusat—gunakan `async` handler yang dibungkus wrapper yang menangkap rejection, atau `.catch(next)` pola Express. Di Nest gunakan filter exception global. Tambahkan **`process.on('unhandledRejection')`** hanya sebagai jaring pengaman dengan logging yang tidak membocorkan PHI—bukan pengganti penanganan normal. Pastikan semua cabang early-return pada promise chain menangani error.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Unhandled rejection:** penolakan promise tanpa subscriber error pada giliran tick yang sama (perilaku tepat bergantung versi Node).
- **Double response bug:** mencoba mengirim respons dua kali setelah error async.

---

## Mengapa pola ini sangat umum di healthcare

1. Callback berlapis pada integrasi HL7/FHIR.
2. Parallel call tanpa `Promise.allSettled`.
3. Developer mengira middleware ORM sudah menangkap semua error async.

---

## Pola gagal (ilustrasi)

```typescript
router.post('/orders', (req, res) => {
  createOrder(req.body); // async tanpa await/catch — rejection mengambang
  res.sendStatus(202);
});
```

---

## Gejala di production

- Status 202/200 padahal insert gagal.
- Lonjakan log `UnhandledPromiseRejectionWarning`.

---

## Diagnosis

1. Aktifkan `--trace-unhandled` di staging.
2. Correlasi span APM dengan endpoint tanpa catch.

---

## Mitigasi yang disarankan

1. Wrapper handler async terpusat.
2. Gunakan framework yang memaksa pola ini (Fastify hooks).
3. Lindungi boundary eksternal dengan timeout dan error mapping.

---

## Trade-off dan risiko

- Catch terlalu luas bisa menelan bug—log dengan correlation id.

---

## Aspek khusus healthcare

- Kesalahan pada order obat tidak boleh diam tanpa alert—mapping error ke kode bisnis yang jelas.

---

## Checklist review PR

- [ ] Tidak ada pemanggilan async fire-and-forget pada jalur request tanpa pengawasan.

---

## Kata kunci untuk pencarian

`unhandledRejection`, `async handler`, `express-async-errors`, `Fastify error handler`

---

## Catatan tambahan operasional

Ubah tes integrasi untuk memastikan endpoint mengembalikan **5xx terkontrol** ketika dependency DB dilempar error.

---

## Referensi internal

- [`README.md`](./README.md) · **#33**, **#35**.
