# #60 — Round-trip timezone hasil lab vs server vs zona pengguna

**Indeks:** [`README.md`](./README.md) · **ID:** `#60` · **Kategori:** Runtime Node.js & waktu

---

## Ringkasan

Hasil laboratorium membawa **timestamp koleksi dan hasil** yang dihasilkan di zona waktu lab server, dikonversi oleh API Node ke UTC, lalu ditampilkan ke pengguna dalam zona rumah sakit atau pasien. Tanpa metadata zona yang konsisten, **round-trip** (tampilkan → edit → simpan) dapat menggeser waktu atau tanggal. Kesalahan ini mengganggu interpretasi klinis dan audit trail.

---

## Mitigasi ideal (~60 detik)

“Simpan **instant UTC** plus **zona tampilan** atau offset saat pengumpulan jika relevan; tampilkan dengan formatter zona pengguna—jangan ulang-ulang konversi ganda. Untuk field yang bersifat ‘tanggal medis’ saja, pertimbangkan simpan **date-only** dengan aturan timezone eksplisit. Dokumentasikan rantai konversi dari LIS ke EMR.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Instant vs civil date:** hasil lab sering perlu keduanya—pisahkan kolom bila perlu.
- **Round-trip fidelity:** nilai yang ditampilkan dapat disimpan kembali tanpa drift.

---

## Mengapa pola ini sangat umum di healthcare

1. Banyak sistem melibatkan lab pusat berbeda zona dengan rumah sakit cabang.
2. UI memformat ulang tanpa mempertahankan offset asli.
3. Report PDF menggunakan zona server.

---

## Pola gagal (ilustrasi)

Konversi `Date` ke string lokal lalu parse kembali sebagai UTC—double shift.

---

## Gejala di production

- Hasil yang sudah final berubah jam setelah penyimpanan kedua dari UI.

---

## Diagnosis

1. Tes edit-save pada record lab dengan timestamp contoh.
2. Bandingkan payload API awal vs setelah edit.

---

## Mitigasi yang disarankan

1. Gunakan tipe data datetime kaya zona di domain layer.
2. Field terpisah untuk `collectedAt` instan vs `reportedDate` tanggal saja jika bisnis membutuhkan.
3. Snapshot nilai yang ditampilkan untuk audit.

---

## Trade-off dan risiko

- Kompleksitas model naik—komunikasikan ke QA dengan matriks zona.

---

## Aspek khusus healthcare

- Kultur mikro punya jendela kritis—timestamp kesalahan dapat mengubah interpretasi pertumbuhan.

---

## Checklist review PR

- [ ] Alur lab UI→API→DB mempertahankan makna waktu tanpa drift ganda.

---

## Kata kunci untuk pencarian

`lab timestamp`, `timezone round trip`, `LIS integration`

---

## Catatan tambahan operasional

Simpan **original vendor timestamp string** dalam kolom audit read-only untuk bandingkan dengan nilai normalisasi internal.

Libatkan **ahli patologi klinis** saat mendefinisikan apakah suatu field harus presisi menit atau cukup tanggal medis saja.

Pastikan **label cetak hasil** ke pasien memakai zona yang dapat dipahami pasien, bukan zona server pusat data.

Integrasikan **feedback klinisi** setelah insiden waktu untuk memperbaiki kontrak data dengan lab mitra.

---

## Referensi internal

- [`README.md`](./README.md) · **#57**, **#59**.
