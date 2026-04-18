# #100 — Disk penuh pada volume attachment → upload gagal dengan pesan tidak jelas

**Indeks:** [`README.md`](./README.md) · **ID:** `#100` · **Kategori:** Infrastruktur & operasi

---

## Ringkasan

Penyimpanan dokumen klinis pada **volume persistent** (NFS, EBS, disk VM) dapat mencapai **kapasitas penuh** ketika retensi tidak dipantau atau burst unggahan besar. Aplikasi Node.js sering mengembalikan error generik **EIO** atau **500** tanpa pesan yang menjelaskan penyebab—mengarahkan engineer ke bug aplikasi padahal infrastruktur.

---

## Mitigasi ideal (~60 detik)

“Pantau **disk utilization** dengan alert di bawah 85%, jalankan **lifecycle policy** ke cold storage, kompresi/archiving sesuai retensi PHI. Gunakan object storage yang diskalakan untuk attachment utama. Pastikan error mapping ke pesan operasional ‘penyimpanan penuh’ untuk tim IT rumah sakit.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **No space left on device:** error kernel saat write disk penuh.

---

## Mengapa pola ini sangat umum di healthcare

1. Pertumbuhan imaging dan PDF cepat.
2. Backup snapshot mengisi disk tersembunyi.
3. Log verbose mengisi partisi root.

---

## Pola gagal (ilustrasi)

Upload mulai menulis file temp lalu gagal di tengah—partial file tanpa cleanup.

---

## Gejala di production

- Semua unggahan gagal bersamaan—namun DB masih OK.

---

## Diagnosis

1. `df -h` pada server/NFS.
2. Korelasi error log ENOOSPC.

---

## Mitigasi yang disarankan

1. Separate partitions untuk log vs data.
2. Auto-scale storage managed service.
3. Alerting + runbook cleanup aman.

---

## Trade-off dan risiko

- Pembersihan otomatis berisiko menghapus data sah—gunakan policy legal IT.

---

## Aspek khusus healthcare

- Ketersediaan dokumen medis mempengaruhan kontinuitas perawatan—monitoring disk adalah monitoring pasien tidak langsung.

---

## Checklist review PR

- [ ] Penanganan error upload membedakan kegagalan penyimpanan vs validasi.

---

## Kata kunci untuk pencarian

`disk full`, `ENOSPC`, `NFS`, `EBS`

---

## Skenario regresi yang disarankan

1. Isi volume staging hingga 99%—pastikan pesan error dan alert sesuai.
2. Uji pemulihan setelah ekspansi volume tanpa restart aplikasi jika memungkinkan.

---

## KPI pemantauan

- Utilization disk maksimum per volume per hari; alert terpicu.

---

## Catatan tambahan operasional

Rencanakan **kapasitas tahunan** dengan faktor pertumbuhan dokumen digital rumah sakit.

---

## Referensi internal

- [`README.md`](./README.md) · **#70**, **#55**.
