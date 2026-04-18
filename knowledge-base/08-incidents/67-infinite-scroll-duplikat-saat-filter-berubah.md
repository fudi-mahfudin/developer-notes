# #67 — Infinite scroll memuat duplikat saat filter berubah mid-flight

**Indeks:** [`README.md`](./README.md) · **ID:** `#67` · **Kategori:** Frontend & edge (browser / proxy)

---

## Ringkasan

Daftar infinite scroll menyimpan **cursor** internal. Ketika pengguna mengubah filter (misalnya rentang tanggal kunjungan) sementara permintaan halaman berikutnya masih berjalan, hasil baru dapat **digabungkan** dengan hasil lama tanpa reset—menghasilkan **duplikat** atau urutan campuran. Tanpa reset state pagination saat filter berubah, bug ini marah di dashboard klinis.

---

## Mitigasi ideal (~60 detik)

“Reset **items array** dan cursor ketika filter berubah—batalkan fetch pending dengan AbortController. Gunakan **query key** di React Query yang mencakup semua filter. Tampilkan skeleton selama transisi filter untuk mencegah interaksi ganda.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Cursor invalidation:** cursor lama tidak valid untuk filter baru.
- **In-flight cancellation:** hentikan permintaan halaman berikutnya yang tidak relevan.

---

## Mengapa pola ini sangat umum di healthcare

1. Filter kompleks pada riwayat lab dan radiologi.
2. Implementasi scroll manual tanpa library map state.
3. Race antara filter cepat dan jaringan lambat.

---

## Pola gagal (ilustrasi)

Menambahkan page2 hasil filter A ke state setelah user sudah beralih ke filter B.

---

## Gejala di production

- Item duplikat dalam daftar atau urutan tidak konsisten.

---

## Diagnosis

1. Log urutan append dan parameter filter tiap fetch.
2. Uji dengan filter toggle cepat.

---

## Mitigasi yang disarankan

1. Derive list identity dari serialized filter object.
2. Guard append dengan filterVersion.
3. Gunakan virtualization library yang aware query reset.

---

## Trade-off dan risiko

- Reset scroll ke atas dapat mengganggu UX—pertimbangkan preserve scroll hanya jika filter sama.

---

## Aspek khusus healthcare

- Duplikat order lab pada daftar tugas dapat menyebabkan pengambilan spesimen ganda.

---

## Checklist review PR

- [ ] Perubahan filter mengatur ulang pagination state sepenuhnya.

---

## Kata kunci untuk pencarian

`infinite scroll`, `filter reset`, `AbortController`, `React Query`

---

## Skenario regresi yang disarankan

1. Ubah filter berulang kali selagi scroll load berlangsung.
2. Kombinasikan sort asc/desc dengan filter cepat.
3. Pastikan tidak ada duplikat primary key pada render.

---

## KPI pemantauan

- Jumlah duplikat id pada response render (telemetri dev-only).

---

## Catatan tambahan operasional

Gunakan **dedupe by id** pada layer reducer sebagai safety net meskipun backend benar.

---

## Referensi internal

- [`README.md`](./README.md) · **#09**, **#63**.
