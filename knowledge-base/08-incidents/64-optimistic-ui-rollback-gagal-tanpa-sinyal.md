# #64 — Optimistic UI rollback gagal tanpa sinyal jelas ke pengguna

**Indeks:** [`README.md`](./README.md) · **ID:** `#64` · **Kategori:** Frontend & edge (browser / proxy)

---

## Ringkasan

**Optimistic update** meningkatkan UX dengan menampilkan perubahan sebelum server mengonfirmasi. Jika server menolak atau permintaan gagal, rollback harus **jelas**—toast, warna merah, atau mengembalikan field. Tanpa itu, klinisi mengira order atau alergi telah disimpan padahal tidak—risiko keselamatan pasien.

---

## Mitigasi ideal (~60 detik)

“Setiap optimistic action simpan **pending state** dan tampilkan indikator—jika gagal, kembalikan UI dan beri pesan eksplisit; log untuk audit. Untuk aksi berisiko tinggi, pertimbangkan tidak optimistic—atau konfirmasi kedua. Sinkronkan dengan server-state library yang mendukung rollback otomatis.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Optimistic consistency:** UI mendahului kebenaran server sementara.
- **Compensating UX:** rollback + komunikasi kegagalan.

---

## Mengapa pola ini sangat umum di healthcare

1. EMR ingin respons instan untuk alur sibuk.
2. Retry otomatis tersembunyi tanpa feedback.
3. Dual-write ke beberapa sistem tanpa semantik transaksi.

---

## Pola gagal (ilustrasi)

Tombol “Simpan” langsung mengubah label menjadi “Tersimpan” sebelum 200 OK—error jaringan tidak mengembalikan label.

---

## Gejala di production

- Pasien menerima pengobatan berdasarkan asumsi order tercatat padahal gagal.

---

## Diagnosis

1. Audit semua mutasi optimistic vs error path.
2. Uji dengan server yang mengembalikan 409/500.

---

## Mitigasi yang disarankan

1. Status tri-state: idle/pending/failed/success.
2. Banner persisten sampai sinkron sukses untuk entitas kritis.
3. Offline queue dengan indikator jelas.

---

## Trade-off dan risiko

- Terlalu banyak modal error dapat mengganggu—prioritaskan high-risk flows.

---

## Aspek khusus healthcare

- Order obat high-alert tidak boleh optimistic tanpa approval ketat.

---

## Checklist review PR

- [ ] Mutasi klinis berisiko punya UX gagal yang tidak ambigu.

---

## Kata kunci untuk pencarian

`optimistic UI`, `rollback`, `pending state`, `offline queue`

---

## Skenario regresi yang disarankan

1. Matikan API di tengah mutasi optimistic—pastikan rollback visual.
2. Paksa timeout dan 409 conflict—UI harus menjelaskan langkah selanjutnya.
3. Simulasikan dua pengguna mengedit field sama—konflik harus terlihat.
4. Jaringan offline setelah optimistic—antrean ditampilkan.
5. Refresh halaman saat pending—state tidak boleh mengklaim sukses.

---

## KPI pemantauan

- Rasio mutasi gagal yang tidak menampilkan banner vs yang menampilkan.
- Waktu hingga pengguna mengoreksi setelah rollback otomatis.

---

## Catatan tambahan operasional

Bedakan warna **pending** dan **berhasil** secara konsisten di seluruh produk—hindari hanya ikon kecil tanpa teks.

---

## Referensi internal

- [`README.md`](./README.md) · **#65**.
