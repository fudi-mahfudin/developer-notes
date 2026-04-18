# #96 — Cache aturan interaksi obat stale setelah update formularium

**Indeks:** [`README.md`](./README.md) · **ID:** `#96` · **Kategori:** Domain healthcare & integrasi

---

## Ringkasan

**Clinical decision support** untuk interaksi obat sering meng-cache hasil lookup berdasarkan pasangan kode obat. Saat **formularium** berubah—interaksi baru ditambahkan atau dicabut—cache usang dapat menampilkan **peringatan salah** atau **tidak ada peringatan** saat seharusnya ada—mempengaruhi keselamatan.

---

## Mitigasi ideal (~60 detik)

“Invalidasi cache ketika versi formularium bertambah—gunakan **global version key** dalam cache entry; atau TTL pendek + webhook refresh. Jalankan tes CDS setelah deploy formularium. Untuk obat high-alert, pertimbangkan bypass cache.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Formularium version:** penanda konsistensi aturan interaksi.

---

## Mengapa pola ini sangat umum di healthcare

1. Lookup vendor mahal—cache agresif.
2. Update obat mingguan tanpa redeploy app.
3. Multi-layer cache [#50](50-cache-in-memory-per-pod-inkonsisten.md).

---

## Pola gagal (ilustrasi)

Cache Map permanen di memori worker tanpa invalidasi.

---

## Gejala di production

- Farmasi melihat peringatan tidak konsisten antar workstation.

---

## Diagnosis

1. Bandingkan hasil CDS dengan referensi vendor langsung.
2. Periksa version formularium pada respons.

---

## Mitigasi yang disarankan

1. Pub/sub invalidasi ke semua pod.
2. Versioned cache keys.

---

## Trade-off dan risiko

- Bypass cache meningkatkan latency—prioritaskan obat berisiko.

---

## Aspek khusus healthcare

- False negative interaksi berbahaya dapat menyebabkan efek buruk pasien—severity tinggi.

---

## Checklist review PR

- [ ] Deploy formularium menyertakan bump versi dan tes CDS smoke.

---

## Kata kunci untuk pencarian

`drug interaction`, `CDS cache`, `formulary version`

---

## Skenario regresi yang disarankan

1. Ubah aturan interaksi pada staging—ukur waktu hingga semua pod konsisten.
2. Uji dengan kombinasi obat yang baru ditambahkan interaksinya.

---

## KPI pemantauan

- Selisih hasil CDS cache vs sumber kebenaran (harus nol).

---

## Catatan tambahan operasional

Libatkan **tim farmasi klinis** untuk menandatangani jadwal refresh cache yang aman.

---

## Referensi internal

- [`README.md`](./README.md) · **#46**, **#50**.
