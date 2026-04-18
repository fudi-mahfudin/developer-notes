# #94 — MPI match threshold terlalu longgar atau terlalu ketat

**Indeks:** [`README.md`](./README.md) · **ID:** `#94` · **Kategori:** Domain healthcare & integrasi

---

## Ringkasan

**Master Patient Index (MPI)** memakai skor kemiripan untuk menautkan record. **Threshold terlalu longgar**↑ false positive merge [#93](93-merge-pasien-salah-catatan-tertaut.md); **terlalu ketat**↑ duplicate rekor yang mengaburkan riwayat klinis—keduanya merugikan. Menyeimbangkan butuh data, tuning, dan review manusia.

---

## Mitigasi ideal (~60 detik)

“Gunakan model fitur (nama fonetik, alamat, ID penerbit) dengan **calibrasi** pada dataset historis. Sediakan **queue** untuk skor borderline. Ukur presisi/recall—bukan hanya akurasi. Perbarui threshold per wilayah jika demografi berbeda. Dokumentasikan alasan keputusan bisnis.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Precision/recall trade-off:** lebih banyak otomatis vs lebih aman manual.

---

## Mengapa pola ini sangat umum di healthcare

1. Data kualitas rendah pada pasien tidak lengkap.
2. Satu set threshold global untuk banyak negara.
3. KPI reduksi duplicate tanpa memperhatikan kesalahan merge.

---

## Pola gagal (ilustrasi)

Menurunkan threshold agar KPI “duplicate resolved” terlihat baik bulan ini.

---

## Gejala di production

- Lonjakan merge salah atau meningkatnya duplikat tidak tertaut.

---

## Diagnosis

1. Confusion matrix manual sample.
2. Analisis distribusi skor matching.

---

## Mitigasi yang disarankan

1. Active learning dengan reviewer klinis.
2. Separate thresholds untuk pasien bayi vs dewasa jika perlu.

---

## Trade-off dan risiko

- Review manusia mahal—prioritaskan antrean risiko tinggi.

---

## Aspek khusus healthcare

- Pasien kembar identik menuntut identifier tambahan—threshold saja tidak cukup.

---

## Checklist review PR

- [ ] Perubahan parameter MPI memiliki eksperimen terukur dan sign-off governance data.

---

## Kata kunci untuk pencarian

`MPI`, `probabilistic matching`, `threshold`, `record linkage`

---

## Skenario regresi yang disarankan

1. Dataset sintetis dengan nama mirip dan alamat sama—pastikan tidak merge otomatis tanpa ID tambahan.
2. Ukur dampak threshold pada populasi geriatri vs pediatri.

---

## KPI pemantauan

- Precision/recall bulanan pada sampel audit acak.

---

## Catatan tambahan operasional

Jangan gunakan satu angka **threshold “ajaib”** tanpa konteks—visualisasikan distribusi skor.

---

## Referensi internal

- [`README.md`](./README.md) · **#93**.
