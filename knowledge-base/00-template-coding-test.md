# Template Materi Coding Test

Gunakan template ini untuk latihan coding test agar pembahasan terstruktur: dari memahami soal, menyusun pseudocode, memilih strategi, sampai evaluasi trade-off.

---

# [Judul Soal]

## 1) Ringkasan Soal

- Sumber soal:
- Tingkat kesulitan: Easy / Medium / Hard
- Topik utama: Array / String / HashMap / Tree / Graph / DP / dll
- Inti masalah (1-2 kalimat):

## 2) Detail Soal

- Input:
- Output:
- Constraints:
- Contoh input-output:

## 3) Klarifikasi yang Harus Ditanyakan (Jika Interview Live)

- Apakah input bisa kosong/null?
- Apakah ada nilai duplikat?
- Apakah output harus urut tertentu?
- Batas ukuran data maksimum?

## 4) Analisis Pola Masalah

- Pola yang terdeteksi:
- Kenapa pola ini relevan:
- Red flag/pitfall yang mungkin muncul:

## 5) Pseudocode (Versi Awal)

```text
# tulis langkah algoritma secara bahasa natural
# fokus pada alur logika, bukan sintaks bahasa
```

## 6) Strategi Penyelesaian

### Strategi A - Brute Force

- Ide:
- Kompleksitas waktu:
- Kompleksitas ruang:
- Kelebihan:
- Kekurangan:
- Cocok dipakai saat:

### Strategi B - Optimal

- Ide:
- Kompleksitas waktu:
- Kompleksitas ruang:
- Kelebihan:
- Kekurangan:
- Cocok dipakai saat:

### Strategi C - Alternatif (Opsional)

- Ide:
- Kompleksitas waktu:
- Kompleksitas ruang:
- Kelebihan:
- Kekurangan:

## 7) Trade-off Keputusan

- Trade-off 1 (mis. waktu vs memori):
- Trade-off 2 (mis. kode sederhana vs performa):
- Alasan memilih strategi final:

## 8) Implementasi Final

```ts
// 1) Jelaskan pendekatan final
// 2) Implementasi fungsi utama
// 3) Edge case handling
// 4) Kembalikan hasil
```

## 8.1) Aturan Coding (JavaScript/TypeScript)

- Gunakan `const` sebagai default, `let` hanya jika nilai berubah.
- Hindari `var`.
- Gunakan nama variabel yang menjelaskan maksud (`left`, `right`, `freqMap`, `result`), bukan nama generik (`a`, `b`, `x`) kecuali loop indeks sederhana.
- Hindari mutasi input jika soal tidak meminta in-place.
- Jika menggunakan object/map sebagai lookup:
  - jelaskan kenapa memilih `Map` atau object biasa.
  - hati-hati dengan key non-string pada object.
- Pisahkan logika ke helper function jika membuat solusi lebih mudah dibaca.
- Selalu tulis komentar singkat hanya pada bagian logika yang tidak langsung jelas.
- Jika pakai TypeScript:
  - definisikan tipe parameter dan return function.
  - hindari `any` kecuali benar-benar darurat.
- Jangan over-engineer:
  - untuk interview, utamakan solusi benar, jelas, dan teruji dulu.
  - optimasi setelah baseline benar.

## 8.2) Format Jawaban Saat Interview (Disarankan)

- Jelaskan pendekatan dalam 3 langkah:
  1. observasi pola,
  2. struktur data yang dipilih,
  3. alasan kompleksitas.
- Sebutkan kompleksitas **sebelum** interviewer bertanya.
- Sebutkan edge case utama sebelum coding.
- Lakukan dry run singkat setelah coding selesai.

## 9) Dry Run Manual

- Kasus uji 1 (normal):
- Kasus uji 2 (edge case):
- Kasus uji 3 (besar/limit):
- Jejak langkah ringkas:

## 10) Validasi Kompleksitas

- Time complexity final:
- Space complexity final:
- Apakah sesuai constraints?

## 11) Common Mistakes & Debug Notes

- Bug yang sempat muncul:
- Penyebab:
- Cara memperbaiki:
- Insight untuk soal serupa:

## 11.1) Daftar Edge Case Minimum (Wajib Cek)

- Input kosong.
- Input ukuran 1.
- Ada duplikat / tidak ada duplikat.
- Semua nilai sama.
- Nilai negatif / nol (jika relevan).
- Kasus batas maksimum constraints.

---

## Template Singkat (Untuk Drill Cepat)

- Soal:
- Pseudocode 5-10 baris:
- Strategi final:
- Kompleksitas:
- 1 trade-off utama:
- 1 bug yang harus dihindari:

