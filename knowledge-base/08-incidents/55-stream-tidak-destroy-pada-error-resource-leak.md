# #55 — Stream tidak di-destroy pada error → resource leak

**Indeks:** [`README.md`](./README.md) · **ID:** `#55` · **Kategori:** Runtime Node.js & waktu

---

## Ringkasan

Stream Node (`fs.createReadStream`, HTTP response, multipart upload) yang tidak **`destroy()`** pada cabang error dapat menyimpan **file descriptors** dan buffer internal terbuka—meningkatkan penggunaan sumber daya OS hingga mencapai batas `ulimit`. Upload dokumen klinis besar sangat rentan.

---

## Mitigasi ideal (~60 detik)

“Gunakan **`pipeline()`** util yang otomatis merangkai destroy/handler error, atau `try/finally` dengan `stream.destroy(err)` pada exception. Pastikan promise dari stream operations di-`await` dengan benar. Pantau **open fd count** pada container. Untuk PHI, pastikan file sementara dihapus meskipun error.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **FD leak:** file descriptor tidak ditutup.
- **Pipeline:** helper `stream.pipeline` Node standard.

---

## Mengapa pola ini sangat umum di healthcare

1. Upload PDF radiologi multipart kompleks.
2. Early return pada validasi tanpa cleanup stream.
3. Proxy streaming response dari storage tanpa error hook.

---

## Pola gagal (ilustrasi)

Membaca stream ke buffer manual dan throw di tengah tanpa `destroy` pada source.

---

## Gejala di production

- Error `EMFILE` atau kinerja OS menurun setelah jam sibuk upload.

---

## Diagnosis

1. `lsof` pada proses Node di container (jika diizinkan).
2. Metrik fd dari agent OS.

---

## Mitigasi yang disarankan

1. Gunakan `pipeline`/`finished` dari `stream/promises`.
2. Hapus file temp pada `finally`.
3. Batasi concurrent upload per pod.

---

## Trade-off dan risiko

- Terlalu agresif destroy bisa memutus stream yang masih dibaca—pastikan semantik benar.

---

## Aspek khusus healthcare

- File sementara berisi PHI harus dihapus aman—ikuti pedoman organisasi.

---

## Checklist review PR

- [ ] Semua jalur stream punya cleanup error yang teruji.

---

## Kata kunci untuk pencarian

`stream.pipeline`, `destroy`, `EMFILE`, `fd leak`

---

## Catatan tambahan operasional

Integrasikan tes yang memicu error di tengah stream untuk memverifikasi tidak ada descriptor yang tertinggal.

Monitor **open files** pada container menggunakan metrik OS untuk alarm sebelum mencapai batas keras.

Pasang tes yang memaksa **client upload berhenti di tengah** untuk memastikan server membersihkan stream dengan benar.

Log **jumlah fd terbuka** per pod pada interval pendek untuk mendeteksi leak lebih awal.

---

## Referensi internal

- [`README.md`](./README.md) · **#70**, **#71**.
