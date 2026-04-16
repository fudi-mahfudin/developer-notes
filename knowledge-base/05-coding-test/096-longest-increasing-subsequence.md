# Longest Increasing Subsequence

## 1) Ringkasan Soal

- Sumber soal: LeetCode / Interview Bank
- Tingkat kesulitan: Medium
- Topik utama: DP/Binary Search
- Inti masalah (1-2 kalimat): Menyelesaikan longest increasing subsequence dengan strategi yang benar secara logika, efisien terhadap constraints, dan aman terhadap edge case klasik interview.

## 2) Detail Soal

- Input: Parameter mengikuti definisi soal Longest Increasing Subsequence.
- Output: Hasil akhir sesuai format yang diminta soal.
- Constraints: Ukuran state wajib dijaga agar tidak melebihi O(n^2) pada batas n tipikal interview.
- Contoh input-output:
  - Input: input sesuai definisi problem
  - Output: output sesuai definisi problem

## 3) Klarifikasi yang Harus Ditanyakan (Jika Interview Live)

- Apakah input bisa kosong/null?
- Apakah boleh memodifikasi input in-place?
- Jika ada banyak jawaban valid, output mana yang diharapkan?
- Target kompleksitas minimal yang interviewer harapkan?

## 4) Analisis Pola Masalah

- Pola yang terdeteksi: DP/Binary Search.
- Kenapa pola ini relevan: Pola ini menekan kompleksitas dari pendekatan naif dan menjaga solusi tetap mudah di-dry-run.
- Red flag/pitfall yang mungkin muncul: Off-by-one, salah inisialisasi state, dan lupa kasus batas (array kosong, node null, target tidak ditemukan).

## 5) Pseudocode (Versi Awal)

```text
1. Validasi input dan edge case utama.
2. Inisialisasi struktur data yang cocok dengan pola soal.
3. Iterasi/traversal sambil update state inti.
4. Saat kondisi target terpenuhi, simpan/return hasil.
5. Selesaikan iterasi dan kembalikan output final.
```

## 6) Strategi Penyelesaian

### Strategi A - Brute Force

- Ide: Enumerasi semua kemungkinan dan cek kondisi valid satu per satu.
- Kompleksitas waktu: O(n^2) sampai eksponensial, tergantung tipe soal.
- Kompleksitas ruang: O(1) sampai O(n).
- Kelebihan: Mudah dijelaskan sebagai baseline.
- Kekurangan: Cepat timeout pada input besar.
- Cocok dipakai saat: Validasi pemahaman problem sebelum optimasi.

### Strategi B - Optimal

- Ide: Terapkan pendekatan DP/Binary Search yang paling lazim dipakai untuk problem ini.
- Kompleksitas waktu: O(n) atau O(n log n) untuk mayoritas varian.
- Kompleksitas ruang: O(1) sampai O(n), bergantung struktur bantu.
- Kelebihan: Lolos constraints interview secara konsisten.
- Kekurangan: Butuh disiplin detail implementasi.
- Cocok dipakai saat: Sesi coding utama saat dinilai performa + kualitas reasoning.

### Strategi C - Alternatif (Opsional)

- Ide: Variasi berbasis data structure lain (heap/deque/recursion+memo) untuk konteks tertentu.
- Kompleksitas waktu: Biasanya setara atau sedikit lebih tinggi dari strategi optimal.
- Kompleksitas ruang: Bisa lebih besar jika menukar simplicity dengan speed implementasi.
- Kelebihan: Menunjukkan fleksibilitas problem solving.
- Kekurangan: Tidak selalu paling efisien.

## 7) Trade-off Keputusan

- Trade-off 1 (mis. waktu vs memori): Menyimpan state tambahan mempercepat lookup tetapi menambah konsumsi memori.
- Trade-off 2 (mis. kode sederhana vs performa): Solusi optimal lebih cepat, namun lebih sensitif terhadap bug kecil.
- Alasan memilih strategi final: Strategi B paling kuat untuk memenuhi correctness + performance di interview.

## 8) Implementasi Final

```ts
// Pendekatan final: implementasi pattern utama yang paling sering dipakai interviewer.
function longestIncreasingSubsequence(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```

## 8.1) Aturan Coding (JavaScript/TypeScript)

- Gunakan `const` sebagai default, `let` hanya bila nilai berubah.
- Hindari `var`.
- Pakai nama variabel deskriptif (`left`, `right`, `freqMap`, `result`, `queue`).
- Hindari mutasi input kecuali diminta soal.
- Pecah ke helper function bila logika bercabang panjang.
- Komentar hanya di bagian yang tidak self-explanatory.
- Jika TypeScript, definisikan tipe parameter dan return.

## 8.2) Format Jawaban Saat Interview (Disarankan)

- Jelaskan observasi pola, data structure, lalu kompleksitas.
- Sebutkan time/space complexity sebelum ditanya.
- Sebutkan edge case kritikal sebelum mulai coding.
- Tutup dengan dry run singkat pada contoh input.

## 9) Dry Run Manual

- Kasus uji 1 (normal): Gunakan contoh resmi untuk memastikan output benar.
- Kasus uji 2 (edge case): Input minimum/empty/null (jika valid) tidak menimbulkan error.
- Kasus uji 3 (besar/limit): Input besar tetap selesai dalam batas kompleksitas target.
- Jejak langkah ringkas: Verifikasi update state di setiap iterasi/traversal sampai return final.

## 10) Validasi Kompleksitas

- Time complexity final: Sesuai strategi B (umumnya O(n) atau O(n log n)).
- Space complexity final: O(1) hingga O(n), sesuai struktur pendukung.
- Apakah sesuai constraints? Ya, untuk batas interview umum.

## 11) Common Mistakes & Debug Notes

- Bug yang sempat muncul: Kondisi loop salah atau state tidak di-reset dengan benar.
- Penyebab: Fokus ke happy path, mengabaikan kasus batas.
- Cara memperbaiki: Tambah guard clause + uji 3 edge case wajib sebelum submit.
- Insight untuk soal serupa: Identifikasi pola inti lebih menentukan daripada hafalan solusi.

## 11.1) Daftar Edge Case Minimum (Wajib Cek)

- Input kosong.
- Input ukuran 1.
- Ada duplikat / tidak ada duplikat (jika relevan).
- Semua nilai sama.
- Nilai negatif / nol (jika relevan).
- Kasus batas maksimum constraints.
