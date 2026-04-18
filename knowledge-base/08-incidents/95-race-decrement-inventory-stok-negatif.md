# #95 — Race pada decrement inventory → stok negatif / oversell

**Indeks:** [`README.md`](./README.md) · **ID:** `#95` · **Kategori:** Domain healthcare & integrasi

---

## Ringkasan

Operasi **`quantity = quantity - 1`** tanpa locking atau tanpa **constraint** yang menjamin tidak negatif dapat menghasilkan **stok negatif** atau menjual lebih dari tersedia pada sistem inventaris farmasi/alat habis pakai ketika banyak permintaan paralel—keselamatan pasien dan compliance.

---

## Mitigasi ideal (~60 detik)

“Gunakan **transaction** dengan `SELECT … FOR UPDATE`, atau query atomic `UPDATE … WHERE quantity >= :need RETURNING`, atau pola **ledger** dengan sum credits/debits. Tambahkan **CHECK constraint** tidak negatif sebagai jaring pengaman. Pada Node, hindari read-modify-write tanpa transaksi DB.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Atomic decrement:** penurunan kuantitas yang aman secara konkuren.

---

## Mengapa pola ini sangat umum di healthcare

1. Flash distribution obat pada krisis.
2. Cache kuantitas di aplikasi tanpa sinkron DB.
3. Microservice pisah tanpa saga.

---

## Pola gagal (ilustrasi)

Dua thread membaca qty=1 lalu keduanya menulis 0 tanpa serialize.

---

## Gejala di production

- Stok sistem menunjukkan -3 unit; oversell pada high-alert drug.

---

## Diagnosis

1. Simulasikan konkurensi pada SKU langka.
2. Audit constraint DB.

---

## Mitigasi yang disarankan

1. Single-row atomic update.
2. Inventory reservations dengan TTL.

---

## Trade-off dan risiko

- Lock row dapat menjadi hot row [#13](13-lock-timeout-row-panas.md)—pecah per lokasi inventaris.

---

## Aspek khusus healthcare

- Obat kontrol ketat—oversell dapat berimplikasi hukum berat.

---

## Checklist review PR

- [ ] Operasi kurangi stok memiliki tes konkurensi dan constraint DB.

---

## Kata kunci untuk pencarian

`inventory race`, `negative stock`, `atomic update`, `ledger`

---

## Skenario regresi yang disarankan

1. Load test order paralel untuk SKU qty kecil.
2. Verifikasi constraint menolak negatif bahkan jika aplikasi salah.

---

## KPI pemantauan

- Insiden stok negatif per juta transaksi (harus nol).

---

## Catatan tambahan operasional

Koordinasikan dengan **tim farmasi** untuk prosedur stok fisik vs elektronik saat insiden.

---

## Referensi internal

- [`README.md`](./README.md) · **#13**, **#45**.
