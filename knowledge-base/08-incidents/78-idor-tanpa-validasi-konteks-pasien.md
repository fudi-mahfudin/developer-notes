# #78 — IDOR: akses resource tanpa validasi konteks pasien

**Indeks:** [`README.md`](./README.md) · **ID:** `#78` · **Kategori:** Keamanan, compliance & identitas

---

## Ringkasan

**Insecure Direct Object Reference** terjadi ketika API mengizinkan akses ke resource berdasarkan **ID yang dapat ditebak** tanpa memverifikasi bahwa pengguna berhak atas konteks pasien/tenant tersebut. Penyerang dapat mengiterasi UUID atau nomor urut untuk membaca catatan orang lain jika tidak ada pemeriksaan autorisasi di server.

---

## Mitigasi ideal (~60 detik)

“Selalu lakukan **authorization** di server: cocokkan `resource.patientId` dengan izin pengguna (RBAC/ABAC). Gunakan **scoped tokens** yang membatasi pasien dalam sesi. Jangan mengandalkan obscurity ID semata—UUID bukan pengganti ACL. Lakukan tes IDOR otomatis pada suite keamanan.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Object-level authorization:** setiap operasi memeriksa kepemilikan/izin pada entitas target.

---

## Mengapa pola ini sangat umum di healthcare

1. Endpoint REST naif `/records/:id`.
2. Copy endpoint internal ke portal pasien tanpa refactor izin.
3. GraphQL resolver tidak memfilter berdasarkan konteks.

---

## Pola gagal (ilustrasi)

GET `/labs/123` mengembalikan hasil selama pengguna login tanpa memastikan pasien 123 dalam daftar perawat.

---

## Gejala di production

- Laporan bug bounty atau audit menemukan akses lintas pasien.

---

## Diagnosis

1. Burp/ZAP scan dengan dua sesi pengguna berbeda.
2. Code review repository methods.

---

## Mitigasi yang disarankan

1. Policy layer terpusat (OPA/CASL server enforcement).
2. Tenant isolation pada query DB.
3. Audit log akses gagal/sukses.

---

## Trade-off dan risiko

- Double query untuk cek izin menambah latency—cache izin dengan TTL pendek non-sensitif.

---

## Aspek khusus healthcare

- Pelanggaran dapat melanggar peraturan privasi berat—prioritas absolut.

---

## Checklist review PR

- [ ] Endpoint baru dengan `:id` memiliki tes akses negatif lintas pengguna.

---

## Kata kunci untuk pencarian

`IDOR`, `object level authorization`, `tenant isolation`

---

## Skenario regresi yang disarankan

1. Dua akun perawat berbeda pasien—swap id di URL—harus 403.
2. Uji dengan token pasien portal vs staf.

---

## KPI pemantauan

- Hasil OWASP ASVS checklist untuk authorization setiap rilis mayor.

---

## Catatan tambahan operasional

Integrasikan **Semgrep rules** untuk pola akses repo tanpa filter pasien.

---

## Referensi internal

- [`README.md`](./README.md) · **#79**, **#47**.
