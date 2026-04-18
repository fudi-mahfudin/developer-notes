# #29 — Trigger DB dengan efek samping tidak terdokumentasi di aplikasi

**Indeks:** [`README.md`](./README.md) · **ID:** `#29` · **Kategori:** Database & transaksi

---

## Ringkasan

**Trigger** pada tabel dapat meng-update tabel lain, menulis audit, atau mengubah nilai tanpa pengetahuan layer aplikasi Node.js. Saat developer berpikir operasi sederhana, efek samping trigger menyebabkan **lock tambahan**, **constraint surprise**, atau **duplikasi audit**. Di healthcare, trigger yang tidak terdokumentasi membuat perilaku sulit direproduksi di staging tanpa snapshot trigger yang sama.

---

## Mitigasi ideal (~60 detik)

“Trigger itu logika tersembunyi—baik untuk invariant, buruk untuk kejutan. Mitigasinya: daftar semua trigger di **runbook arsitektur**, review saat migrasi; pertimbangkan memindahkan efek ke **domain service** agar teruji unit. Jika trigger tetap dipakai, dokumentasikan **urutan eksekusi** dan interaksi dengan ORM (misalnya batch insert). Untuk audit PHI, pastikan trigger tidak menulis ke log tidak aman.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Hidden path:** cabang eksekusi di luar kode aplikasi utama.
- **Trigger cascade:** rangkaian trigger lintas tabel memanjangkan transaksi.

---

## Mengapa pola ini sangat umum di healthcare

1. Audit trigger ditambahkan oleh DBA tanpa sinergi dev.
2. Replikasi partial staging tanpa trigger yang sama.
3. Tooling ORM tidak menampilkan trigger dalam diff.

---

## Pola gagal (ilustrasi)

Insert kecil ke `orders` memicu trigger yang meng-update agregat pada tabel besar → lock panjang.

---

## Gejala di production

- Bug “ajaib” yang tidak muncul saat unit test tanpa DB penuh.
- Deadlock melibatkan trigger tak terduga.

---

## Diagnosis

1. `information_schema.triggers` vs perilaku aplikasi.
2. Trace lock dengan log trigger disabled (hanya di staging).

---

## Mitigasi yang disarankan

1. Dokumentasi trigger + ownership tim.
2. Refactor ke service layer jika kompleksitas tinggi.
3. Tes integrasi dengan DB fixture lengkap.

---

## Trade-off dan risiko

- Menghapus trigger bisa melanggar compliance jika audit ada di DB—koordinasi.

---

## Aspek khusus healthcare

- Audit trail sering trigger-based—ubah dengan persetujuan compliance.

---

## Checklist review PR

- [ ] Migrasi baru menyebutkan dampak pada trigger yang ada.

---

## Kata kunci untuk pencarian

`database trigger`, `hidden logic`, `audit trigger`

---

## Catatan tambahan operasional

Export definisi trigger sebagai bagian dari artefak infrastruktur-as-code ketika memungkinkan.

Lakukan **pair review** DBA + backend saat menambah trigger pada tabel hot—pertimbangkan dampak lock dan urutan dengan trigger audit yang sudah ada.

Simpan diagram **urutan eksekusi trigger** jika ada lebih dari satu pada tabel yang sama.

---

## Referensi internal

- [`README.md`](./README.md) · **#14**.
