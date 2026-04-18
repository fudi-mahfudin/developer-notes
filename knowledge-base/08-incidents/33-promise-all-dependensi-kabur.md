# #33 — `Promise.all` pada dependensi tidak jelas → partial failure kabur

**Indeks:** [`README.md`](./README.md) · **ID:** `#33` · **Kategori:** Async, reliability & antrian

---

## Ringkasan

`Promise.all` gagal cepat pada penolakan pertama—cocok jika semua hasil **wajib**. Namun ketika beberapa operasi bersifat **opsional** atau ketika Anda ingin melanjutkan meskipun satu layanan non-kritis gagal, `all` menyembunyikan detail dan memutus seluruh rangkaian. Tanpa logging per-promise, diagnosis produksi sulit. Di healthcare, kombinasi “wajib vs best effort” sering salah klasifikasi.

---

## Mitigasi ideal (~60 detik)

“Pilih **`Promise.allSettled`** ketika Anda perlu semua hasil sukses/gagal terpisah—lalu map ke respons bisnis: gagal kritis → 500; gagal non-kritis → degradasi terkontrol. Dokumentasikan mana yang **hard dependency**. Hindari menangkap error dalam setiap promise tanpa struktur—hasil akhir harus deterministik. Untuk workflow klinis, kegagalan layanan radiologi minor tidak boleh membatalkan registrasi pasien jika bisnis mengizinkan.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Critical dependency:** kegagalan harus menghentikan operasi dan mengembalikan error jelas.
- **Graceful degradation:** melanjutkan dengan subset data + indikator UI.

---

## Mengapa pola ini sangat umum di healthcare

1. Integrasi banyak sistem dengan SLA berbeda.
2. Copy-paste snippet `Promise.all` dari tutorial.
3. Kesalahpahaman bahwa `catch` per item membuat `all` selalu sukses.

---

## Pola gagal (ilustrasi)

```typescript
await Promise.all([
  mustSucceed(),
  niceToHave(), // throws → entire route fails
]);
```

---

## Gejala di production

- Endpoint gagal total ketika layanan sekunder mati—padahal layanan primer hidup.

---

## Diagnosis

1. Ganti sementara dengan `allSettled` di staging untuk melihat distribusi error.
2. Trace span per integrasi.

---

## Mitigasi yang disarankan

1. Bungkus setiap call dengan konteks error berlabel.
2. Definisikan policy degradasi di kode domain.
3. Gunakan **circuit breaker** untuk layanan rapuh.

---

## Trade-off dan risiko

- Degradasi bisa menampilkan data tidak lengkap—komunikasikan ke UI.

---

## Aspek khusus healthcare

- Menyembunyikan kegagalan integrasi radiologi bisa berbahaya—UI harus menandai “status tidak terverifikasi”.

---

## Checklist review PR

- [ ] `Promise.all` hanya digunakan jika semua promise benar-benar wajib.

---

## Kata kunci untuk pencarian

`Promise.allSettled`, `partial failure`, `critical dependency`, `graceful degradation`

---

## Catatan tambahan operasional

Standarkan helper `gatherResults(labeledTasks)` di codebase untuk menghindari pola raw `all` yang kabur.

---

## Referensi internal

- [`README.md`](./README.md) · **#32**, **#34**.
