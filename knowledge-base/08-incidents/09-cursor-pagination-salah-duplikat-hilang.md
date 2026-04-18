# #09 — Cursor pagination salah implementasi → duplikat atau hilang baris

**Indeks:** [`README.md`](./README.md) · **ID:** `#09` · **Kategori:** Database & transaksi

---

## Ringkasan

**Keyset pagination** bergantung pada **urutan stabil** dan predicate kontinu. Jika sort hanya berdasarkan timestamp tanpa **tie-breaker** unik, atau jika data **berubah** saat pengguna menggulir (baris baru masuk di wilayah cursor), hasilnya bisa **duplikat** atau **loncat** baris. Di healthcare, daftar order lab atau task perawat yang live-update sangat sensitif terhadap bug ini—kesalahan tampilan bisa mengarah pada tindakan klinis duplikat atau terlewat.

---

## Mitigasi ideal (~60 detik)

“Cursor itu harus **stabil**: pakai `(timestamp, id)` sebagai kunci sort—jangan hanya `created_at` jika banyak baris berbagi timestamp yang sama. Predicate berikutnya harus konsisten dengan arah sort. Kalau dataset berubah di bawah kaki—misalnya baris baru masuk—kita terima bahwa pagination **best effort** atau kita **freeze** snapshot dengan token versi. Untuk healthcare, UI harus menunjukkan ‘new items available’ daripada menyembunyikan silently.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Tie-breaker:** kolom unik (biasanya PK) untuk total order ketat.
- **Snapshot cursor:** cursor membawa versi MVCC atau revision log—kompleks tetapi konsisten.

---

## Mengapa pola ini sangat umum di healthcare

1. Event klinis sering batch-created dengan timestamp identik dari mesin yang sama.
2. Live feed ingin tanpa reload—tanpa semantik konsistensi yang jelas.
3. Tim menyalin tutorial cursor tanpa memahami non-unik sort.

---

## Pola gagal (ilustrasi)

```sql
ORDER BY ordered_at DESC
-- banyak baris berbagi ordered_at sama → urutan antara mereka tidak terdefinisi
```

---

## Gejala di production

- Pengguna melihat item yang sama dua kali di infinite scroll.
- Item “hilang” antar halaman ketika filter backend berubah diam-diam.

---

## Diagnosis

1. Reproduksi dengan dataset berisi duplicate sort keys.
2. Tambahkan `id` pada ORDER BY dan bandingkan hasil.

---

## Mitigasi yang disarankan

1. Selalu **`ORDER BY sort_col DESC, id DESC`** dengan predicate keyset konsisten.
2. Dokumentasikan bahwa pagination concurrent tidak linear snapshot.
3. Untuk UX kritis gunakan **server snapshot id** atau **changelog feed**.

---

## Trade-off dan risiko

- Snapshot konsisten bisa mahal—sesuaikan dengan risiko bisnis.

---

## Aspek khusus healthcare

- Daftar task perawat harus menghindari duplikasi visual yang menyesatkan pada obat high-alert.

---

## Checklist review PR

- [ ] Cursor pagination menyertakan **tie-breaker unik**.
- [ ] Dokumentasi API menjelaskan perilaku saat data berubah.

---

## Kata kunci untuk pencarian

`keyset pagination`, `tie breaker`, `unstable sort`, `cursor duplicate rows`

---

## Catatan tambahan operasional

Uji dengan fixture yang sengaja memiliki ratusan baris dengan `created_at` identik untuk memaksa determinisme.

---

## Referensi internal

- [`README.md`](./README.md) · **#08**.
