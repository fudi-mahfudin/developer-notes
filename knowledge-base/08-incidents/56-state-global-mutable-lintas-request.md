# #56 — State global mutable lintas request (anti-pattern singleton)

**Indeks:** [`README.md`](./README.md) · **ID:** `#56` · **Kategori:** Runtime Node.js & waktu

---

## Ringkasan

Variabel modul tingkat atas yang **mutan** (`let currentUser`, `lastRequestId`) dibagi oleh semua request dalam satu proses Node—menyebabkan **race condition** dan kebocoran konteks pasien antar sesi. Ini anti-pattern klasik yang sulit terdeteksi karena terlihat “bekerja” di beban rendah.

---

## Mitigasi ideal (~60 detik)

“Simpan konteks permintaan di **`AsyncLocalStorage`** atau parameter eksplisit—jangan global. Singleton hanya untuk **stateless** clients (DB pool, HTTP agent). Review modul legacy untuk variabel global. Untuk healthcare, bug ini dapat menyebabkan salah pasien [#61](61-wrong-patient-context-race-spa.md) di sisi server.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Request-scoped state:** data hidup hanya selama satu request/async chain.
- **Global mutable:** variabel dibagi lintas konkuren tanpa sinkronisasi.

---

## Mengapa pola ini sangat umum di healthcare

1. Trik cepat menyimpan user saat debugging yang ter-commit.
2. Session manual di luar framework.
3. Singleton cache tanpa awareness multi-tenant.

---

## Pola gagal (ilustrasi)

```typescript
let ctx: PatientContext;
app.use((req, res, next) => {
  ctx = extract(req); // tertimpa request paralel
  next();
});
```

---

## Gejala di production

- Data pasien A muncul pada respons untuk permintaan pasien B sporadis.

---

## Diagnosis

1. Audit `global` dan top-level `let` pada hot path.
2. Stress test paralel dengan correlation IDs berbeda.

---

## Mitigasi yang disarankan

1. AsyncLocalStorage untuk context propagation.
2. Functional style passing context object.
3. Lint rule melarang assignment ke module state dalam handler.

---

## Trade-off dan risiko

- AsyncLocalStorage menambah kompleksitas—dokumentasikan pola tim.

---

## Aspek khusus healthcare

- Kesalahan konteks pasien adalah insiden keselamatan—severity maksimum.

---

## Checklist review PR

- [ ] Tidak ada state mutable global untuk permintaan HTTP.

---

## Kata kunci untuk pencarian

`AsyncLocalStorage`, `global state`, `singleton`, `request scope`

---

## Catatan tambahan operasional

Latih developer baru dengan contoh exploit konkuren di workshop keamanan internal.

Gunakan **static analysis** untuk mendeteksi assignment ke variabel modul dari dalam handler HTTP.

---

## Referensi internal

- [`README.md`](./README.md) · **#61**.
