# #23 — Filter soft delete lupa diterapkan di satu endpoint

**Indeks:** [`README.md`](./README.md) · **ID:** `#23` · **Kategori:** Database & transaksi

---

## Ringkasan

Model menggunakan **`deleted_at`** atau flag `is_active=false`, tetapi satu endpoint — misalnya search legacy atau webhook internal — **melupakan predicate** tersebut. Hasilnya data yang seharusnya tersembunyi (pasien yang meminta penghapusan, catatan yang dibatalkan) **muncul lagi** dalam API atau ekspor. Ini risiko privasi dan kepercayaan besar di healthcare.

---

## Mitigasi ideal (~60 detik)

“Soft delete itu harus konsisten—**default scope** ORM/query builder harus menyertakan filter aktif; endpoint mentah SQL harus diaudit. Tambahkan **lint/test** yang memastikan repository selalu menyuntikkan predicate kecuali super-admin eksplisit. Untuk GDPR/HIPAA-style rights, endpoint export harus menghormati permintaan hapus—bukan sekadar flag DB.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Global scope:** lapisan akses data yang otomatis menambahkan filter soft delete.
- **Escape hatch:** modul admin dengan otorisasi ketat untuk melihat arsip.

---

## Mengapa pola ini sangat umum di healthcare

1. Kode lama sebelum soft delete diperkenalkan.
2. Raw query untuk laporan cepat.
3. Microservice baru menyalin query dari dokumentasi tanpa scope.

---

## Pola gagal (ilustrasi)

```sql
SELECT * FROM patients WHERE mrn = $1; -- tanpa deleted_at IS NULL
```

---

## Gejala di production

- Pasien/klinisi melihat rekam yang seharusnya ditutup.
- Audit compliance menemukan ekspor berisi data terhapus logis.

---

## Diagnosis

1. Audit endpoint dengan grep `FROM patients` tanpa `deleted`.
2. Uji dengan fixture soft-deleted.

---

## Mitigasi yang disarankan

1. ORM middleware default scope.
2. Unit test repository memastikan predicate.
3. Role-based bypass terdokumentasi.

---

## Trade-off dan risiko

- Filter ganda bisa memperlambat query—indeks partial [#05](05-partial-composite-index-urutan-salah.md).

---

## Aspek khusus healthcare

- Permintaan pasien untuk pembatasan catatan harus konsisten lintas kanal (portal, HL7 export).

---

## Checklist review PR

- [ ] Query baru pada tabel soft-delete disetujui dengan bukti scope.

---

## Kata kunci untuk pencarian

`soft delete`, `default scope`, `deleted_at`, `paranoid sequelize`

---

## Catatan tambahan operasional

Integrasikan tes kontrak consumer yang memverifikasi tidak ada field dari entitas yang sudah dihapus logis pada response publik.

Lakukan audit berkala dengan query yang mencari **orphan UI**—endpoint yang belum terdaftar dalam matriks scope soft-delete.

---

## Referensi internal

- [`README.md`](./README.md) · **#24**.
