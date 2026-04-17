# Search a 2D Matrix

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Binary search
- **Inti masalah:** Matriks `m×n` terurut **per baris** dan baris-baris berurutan (elemen terakhir baris ≤ pertama baris berikutnya); tentukan apa `target` ada.

---

- Soal: Return `boolean`.
- Input: `matrix: number[][]`, `target: number`
- Constraints utama: O(log(mn)) treating as 1D sorted array **ata** O(m+n) two pointers from corner.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Binary search / staircase

## 2) Jawaban Ideal Singkat (30-60 detik)

> **Varian A (virtual flatten):** Anggap indeks `0..mn-1` mapped ke `(i,j)` dengan `i = idx // n`, `j = idx % n`; binary search comparator `matrix[i][j]` vs `target`. **Varian B:** Mulai pojok kanan atas (atau kiri bawah): jika sel > target geser kiri; jika < target geser bawah; `O(m+n)` tanpa binary search. Pilih sesuai constraint — LC 74 biasanya matrix fully sorted row-wise with rows increasing → virtual BS O(log mn).

Struktur cepat:
- Observasi inti masalah: Total order exists along row-major order.
- Strategi final yang dipilih: Binary search on index space OR elimination from corner.
- Kenapa strategi ini paling cocok: log complexity preferred when allowed.
- Time complexity: O(log(mn)) or O(m+n)
- Space complexity: O(1)
- Edge case utama: Empty matrix; single row/column; target at corners.

## 3) Versi Ultra Singkat (10-20 detik)

> Flatten logically: mid maps to matrix[mid/n][mid%n]; standard binary search.

## 4) Pseudocode Ringkas (5-10 baris)

```text
rows = matrix.length, cols = matrix[0].length
left = 0, right = rows * cols - 1
while left <= right:
  mid = left + (right - left) / 2
  val = matrix[mid / cols][mid % cols]
  if val == target: return true
  if val < target: left = mid + 1
  else: right = mid - 1
return false
```

## 5) Implementasi Final (Inti Saja)

```js
function searchMatrix(matrix, target) {
  if (!matrix.length || !matrix[0].length) return false;
  const m = matrix.length;
  const n = matrix[0].length;
  let left = 0, right = m * n - 1;
  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    const val = matrix[Math.floor(mid / n)][mid % n];
    if (val === target) return true;
    if (val < target) left = mid + 1;
    else right = mid - 1;
  }
  return false;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Row-major order preserves sortedness required for binary search when property holds globally.
- Kenapa semua kasus valid tercakup: Same as 1D BS on merged sorted list.
- Kenapa tidak ada kasus yang terlewat: Exhaustive index halving.

## 7) Dry Run Singkat

- Classic LC example matrix 5×5 with target `13` → true.

## 8) Red Flags (Yang Harus Dihindari)

- Menggunakan BS tanpa sorted global property — varian LC `74` vs `240` berbeda (yang 240 pakai staircase).
- Salah map mid ke `(i,j)`.

## 9) Follow-up yang Sering Muncul

- Matrix II (240): each row/col sorted independently — use O(m+n) search from corner.

## 10) Trade-off Keputusan

- O(log mn) vs O(m+n): depends on which LC version and constraints.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 9/10
- Efisiensi: 10/10
- Kejelasan penjelasan: 8/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Klaim varian soal (fully sorted vs row/col) di awal.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Binary search 2D
- Inti masalah (1 kalimat): Find in sorted 2D as 1D order.
- Soal: Boolean.
- Strategi final: Index mapping + BS
- Kompleksitas: O(log mn), O(1)
- 2 edge case: empty; one row
- 1 potensi bug: cols vs rows in div/mod
- 1 alasan valid: Row-major order monotonic when rows chained sorted
