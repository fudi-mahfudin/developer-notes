# #24 — Hard delete vs kebijakan retain bentrok dengan foreign key

**Indeks:** [`README.md`](./README.md) · **ID:** `#24` · **Kategori:** Database & transaksi

---

## Ringkasan

Regulasi retensi medis mengharuskan data disimpan selama **tahun**. Hard delete pada entitas induk tanpa strategi **anonymize/archive** melanggar kebijakan atau gagal karena **foreign key** mencegah penghapusan. Sebaliknya, cascade delete tidak sengaja menghapus riwayat yang harus dipertahankan. Node.js service yang tidak memahami constraint DB akan mengembalikan 500 atau menyembunyikan error sebagai kegagalan bisnis yang kabur.

---

## Mitigasi ideal (~60 detik)

“Kita harus memetakan **retention policy** ke model data: apa yang boleh dihapus keras, apa yang harus disamarkan, apa yang tidak boleh dihapus. Gunakan **soft delete + anonymization** untuk identitas, pertahankan fakta klinis sesuai hukum. Pada level DB definisikan FK dan **ON DELETE** dengan hati-hati—hindari CASCADE luas tanpa review. Untuk permintaan hapus pasien, jalankan **workflow legal** yang mengubah identifier tanpa merusak audit trail yang disyaratkan.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Legal hold:** larangan menghapus subset record untuk investigasi.
- **Anonymization:** menghapus/mengaburkan identifier tanpa menghapus jejak klinis yang diperlukan.

---

## Mengapa pola ini sangat umum di healthcare

1. Permintaan hapus data dari pasien vs kewajiban retensi.
2. Migrasi dari sistem lama dengan skema tidak konsisten.
3. Developer menghapus pasien uji di production-like dengan DELETE keras.

---

## Pola gagal (ilustrasi)

`DELETE FROM patients WHERE id=…` ditolak FK atau menghapus riwayat yang seharusnya tetap.

---

## Gejala di production

- Error 23503 Postgres atau pesan ORM tidak terjemahkan ke UX yang benar.
- Insiden compliance setelah skrip cleanup.

---

## Diagnosis

1. Diagram FK dan kebijakan retensi dokumen.
2. Review semua `onDelete` di skema.

---

## Mitigasi yang disarankan

1. Gunakan **status retention** daripada delete untuk kasus ambigu.
2. Skrip anonim dengan audit oleh compliance.
3. Tooling untuk export then purge cold storage sesuai hukum.

---

## Trade-off dan risiko

- Menyimpan data terlalu lama juga risiko—sesuaikan dengan klasifikasi data.

---

## Aspek khusus healthcare

- Bukti medicolegal sering membutuhkan rantai tidak terputus—jangan cascade tanpa persetujuan HIM.

---

## Checklist review PR

- [ ] Operasi delete/hapus massal memiliki review compliance dan tes FK.

---

## Kata kunci untuk pencarian

`foreign key`, `retention`, `right to erasure`, `anonymization`

---

## Catatan tambahan operasional

Pisahkan environment seed data dari skrip yang bisa dijalankan di staging mirip prod dengan guard environment.

Libatkan **HIM/legal** sebelum menambahkan CASCADE atau skrip penghapusan massal—dokumen retensi sering lebih spesifik daripada asumsi engineer.

Simpan bukti tinjauan dalam **ticket change** untuk audit regulator di masa depan.

---

## Referensi internal

- [`README.md`](./README.md) · **#23**.
