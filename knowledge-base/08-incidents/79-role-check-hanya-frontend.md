# #79 — Pengecekan role hanya di frontend

**Indeks:** [`README.md`](./README.md) · **ID:** `#79` · **Kategori:** Keamanan, compliance & identitas

---

## Ringkasan

Menyembunyikan tombol atau route di UI berdasarkan **role** tanpa memvalidasi di **server** memungkinkan penyerang memanggil API langsung dengan token yang sah untuk role lebih rendah tetapi melakukan aksi privilese. Frontend tidak pernah dipercaya sebagai barrier keamanan.

---

## Mitigasi ideal (~60 detik)

“Ulangi semua pemeriksaan role/permission di **middleware server** dekat handler; gunakan policy terpusat. Untuk SPA, route guard hanya UX—bukan keamanan. Otomasi tes API yang memastikan 403 untuk role rendah pada semua endpoint sensitif.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Defense in depth:** beberapa lapisan, minimum server authoritative.

---

## Mengapa pola ini sangat umum di healthcare

1. Tim frontend mengimplementasikan kontrol cepat.
2. Monolith migrasi ke SPA tanpa refactor backend.
3. Asumsi “pengguna tidak jahat”.

---

## Pola gagal (ilustrasi)

Tombol admin disembunyikan tetapi `POST /admin/export` tidak memeriksa role.

---

## Gejala di production

- Eksploitasi API oleh insider atau token curian dengan scope rendah.

---

## Diagnosis

1. Matrix endpoint × role otomatis.
2. Code review mencari `if (role)` hanya di TSX.

---

## Mitigasi yang disarankan

1. Shared policy module untuk FE dan BE (types) tetapi enforce BE.
2. Integration tests matrix.

---

## Trade-off dan risiko

- Duplikasi logika—kurangi dengan generator policy.

---

## Aspek khusus healthcare

- Role perawat vs farmasi vs billing ketat—salah akses berisiko keselamatan dan fraud.

---

## Checklist review PR

- [ ] Perubahan UI otorisasi disertai tes API untuk role yang ditolak.

---

## Kata kunci untuk pencarian

`frontend authorization`, `RBAC server`, `policy enforcement`

---

## Skenario regresi yang disarankan

1. Gunakan token JWT role `nurse` untuk memanggil semua endpoint admin collection.
2. Pastikan setiap 403 tercatat untuk audit brute force internal.

---

## KPI pemantauan

- Persentase endpoint dengan automated negative-role tests.

---

## Catatan tambahan operasional

Buat **matrix spreadsheet** endpoint vs role yang di-review kuartalan oleh security champion.

---

## Referensi internal

- [`README.md`](./README.md) · **#47**, **#78**.
