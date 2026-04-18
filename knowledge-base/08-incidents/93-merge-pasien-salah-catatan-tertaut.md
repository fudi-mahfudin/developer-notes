# #93 — Merge pasien salah → catatan tertaut ke individu salah

**Indeks:** [`README.md`](./README.md) · **ID:** `#93` · **Kategori:** Domain healthcare & integrasi

---

## Ringkasan

Operasi **merge pasien** yang keliru—karena algoritma MPI lemah atau intervensi manual salah—menyatukan catatan dua orang berbeda atau memecah identitas. Akibatnya diagnosis, alergi, dan billing tercampur—insiden keselamatan dan hukum yang sangat serius.

---

## Mitigasi ideal (~60 detik)

“Terapkan **probabilistic matching** dengan threshold konservatif, **human review** untuk skor ambigu, dan **undo merge** yang diaudit. Setelah merge, jalankan integritas referensi dan notifikasi ke downstream. Untuk otomasi, gunakan minimal dua identifier kuat (MRN + DOB + nama) sebelum merge otomatis.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **False positive merge:** dua individu berbeda dianggap sama.

---

## Mengapa pola ini sangat umum di healthcare

1. Nama umum dan tanggal lahir identik.
2. Tekanan operasional untuk mengurangi duplikat cepat.
3. Integrasi sistem luar tanpa identifier nasional.

---

## Pola gagal (ilustrasi)

Merge otomatis karena nama + tanggal lahir sama tanpa verifikasi alamat.

---

## Gejala di production

- Pasien melihat catatan orang lain di portal—insiden besar.

---

## Diagnosis

1. Query duplicate detection metrics.
2. Audit trail merge decisions.

---

## Mitigasi yang disarankan

1. Role khusus untuk merge manual.
2. Cooling-off period sebelum merge permanen.
3. Broadcast event merge ke sistem lain.

---

## Trade-off dan risiko

- Terlalu konservatif meninggalkan duplicate records—keseimbangan dengan [#94](94-mpi-match-threshold-longgar-ketat.md).

---

## Aspek khusus healthcare

- Komunikasi transparan ke pasien jika insiden terjadi sesuai hukum setempat.

---

## Checklist review PR

- [ ] Fitur merge memiliki persetujuan multi-mata dan logging lengkap.

---

## Kata kunci untuk pencarian

`MPI`, `patient merge`, `record linkage`, `false positive`

---

## Skenario regresi yang disarankan

1. Dataset sintetis dengan nama mirip—ukur false positive rate.
2. Uji rollback merge pada staging dengan volume besar.

---

## KPI pemantauan

- Jumlah undo merge dan keluhan pasien terkait identitas.

---

## Catatan tambahan operasional

Siapkan **runbook komunikasi krisis** jika merge salah terdeteksi di produksi.

---

## Referensi internal

- [`README.md`](./README.md) · **#94**.
