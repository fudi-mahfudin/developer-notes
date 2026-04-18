# #90 — Encoding HL7 (UTF-8 vs ISO-8859-1) → karakter nama rusak

**Indeks:** [`README.md`](./README.md) · **ID:** `#90` · **Kategori:** Domain healthcare & integrasi

---

## Ringkasan

HL7 klasik sering diasumsikan **ASCII/Latin-1**, tetapi banyak instalasi modern mengirim karakter **UTF-8**. Salah dekode menghasilkan nama pasien atau alamat tidak terbaca—mempengaruhi MPI dan komunikasi klinis. Parser Node.js harus membaca buffer dengan encoding yang tepat atau mendeteksi dari MSH.

---

## Mitigasi ideal (~60 detik)

“Deteksi karakter set dari segment **MSH-18** atau kontrak vendor; konversi buffer dengan `iconv-lite` ke Unicode internal UTF-8. Tolak atau flag pesan tanpa metadata encoding yang ambigu. Tambahkan tes dengan nama mengandung aksen lokal.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Charset contract:** kesepakatan eksplisit antara pengirim dan penerima.

---

## Mengapa pola ini sangat umum di healthcare

1. Rumah sakit internasional dengan alfabet berbeda.
2. Middleware mengubah encoding tanpa dokumentasi.
3. JSON wrapper mengasumsikan UTF-8 tetapi payload HL7 binari tidak.

---

## Pola gagal (ilustrasi)

Memanggil `buffer.toString()` default UTF-8 pada pesan Latin-1—karakter salah.

---

## Gejala di production

- Pasien tidak dapat dicari dengan nama benar—huruf rusak di UI.

---

## Diagnosis

1. Bandingkan hex payload vs string hasil parse.
2. Survey vendor charset.

---

## Mitigasi yang disarankan

1. Normalisasi Unicode NFC untuk penyimpanan.
2. Validasi karakter pengganti (`�`) dalam pipeline.

---

## Trade-off dan risiko

- Konversi charset CPU kecil tetapi harus ada di jalur panas—optimalkan.

---

## Aspek khusus healthcare

- Nama legal pasien penting untuk identifikasi pasien tepat—kesalahan encoding berbahaya.

---

## Checklist review PR

- [ ] Parser HL7 menyertakan tes charset dari prod-like vendor samples.

---

## Kata kunci untuk pencarian

`HL7 charset`, `MSH-18`, `iconv`, `Unicode NFC`

---

## Skenario regresi yang disarankan

1. Kirim nama dengan aksen Spanyol/Jerman melalui berbagai encoding.
2. Pastikan tidak ada karakter pengganti dalam DB.

---

## KPI pemantauan

- Hitungan karakter pengganti dalam field nama per juta pesan.

---

## Catatan tambahan operasional

Simpan **payload byte asli** untuk beberapa hari terkompresi untuk rekonsiliasi encoding jika vendor mengubah kontrak.

---

## Referensi internal

- [`README.md`](./README.md) · **#89**.
