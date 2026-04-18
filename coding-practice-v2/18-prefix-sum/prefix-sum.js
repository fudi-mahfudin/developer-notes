/**
 * Judul: Topik 18 — Prefix sum
 *
 * Soal test:
 * - `buildPrefixSum` + `rangeSumFromPrefix`: untuk `[2,4,-1,3]`, jumlah indeks 1..3 → `6`.
 * - subarraySumEqualsK: `[1,1,1]`, k=2 → `2` subarray.
 * - 2D: `rangeSum2D` pada contoh matrix sesuai nilai uji `(0,0)-(1,2)` dan `(0,1)-(1,2)`.
 * - rollingAveragesFromPrefix: sama numerik dengan rata-rata jendela panjang 2.
 *
 * Ringkasan soal:
 * - Prahitung jumlah prefiks untuk query rentang O(1) setelah O(n) preprocessing.
 * - Varian 2D untuk sub-persegi (bonus).
 *
 * Solusi: `prefix[i] = prefix[i-1] + arr[i-1]` (1-indexed prefix) atau 0-indexed sesuai konvensi API.
 *
 * @see knowledge-base/05-coding-interview-v2/18-prefix-sum.md
 *
 * Menjalankan tes: dari root repo Career, jalankan `pnpm test`.
 */

/**
 * Judul: Bangun array prefix sum (0-indexed: `ps[0]=0`, `ps[i+1]=ps[i]+arr[i]`)
 *
 * Soal test:
 * - Dipakai bersama `rangeSumFromPrefix` pada `[2, 4, -1, 3]` untuk query rentang inklusif.
 *
 * Ringkasan soal:
 * - `ps` panjang `n+1` sehingga jumlah `arr[l..r]` = `ps[r+1]-ps[l]`.
 *
 * Kontrak: `arr` array finite numbers.
 *
 * Solusi: Loop akumulasi.
 *
 * @param {number[]} arr
 * @returns {number[]}
 */
export function buildPrefixSum(arr) {
  if (!Array.isArray(arr)) throw new TypeError("arr must be an array");
  const ps = [0];
  for (let i = 0; i < arr.length; i++) {
    const x = arr[i];
    if (typeof x !== "number" || !Number.isFinite(x)) {
      throw new TypeError("elements must be finite numbers");
    }
    ps.push(ps[ps.length - 1] + x);
  }
  return ps;
}

/**
 * Judul: Query jumlah inklusif `[left, right]`
 *
 * Soal test:
 * - Untuk `arr = [2, 4, -1, 3]` dan prefix yang dibangun: `rangeSumFromPrefix(ps, 1, 3)` → `6`.
 *
 * Ringkasan soal:
 * - Gunakan hasil `buildPrefixSum`.
 *
 * Kontrak: `0 <= left <= right < arr.length`.
 *
 * Solusi: `ps[right+1]-ps[left]`.
 *
 * @param {number[]} ps
 * @param {number} left
 * @param {number} right
 */
export function rangeSumFromPrefix(ps, left, right) {
  if (!Array.isArray(ps)) throw new TypeError("ps must be an array");
  if (!Number.isInteger(left) || !Number.isInteger(right)) {
    throw new RangeError("left and right must be integers");
  }
  if (left < 0 || right < left || right + 1 >= ps.length) {
    throw new RangeError("invalid range for prefix array");
  }
  return ps[right + 1] - ps[left];
}

/**
 * Judul: Jumlah subarray dengan jumlah sama `k` (array berisi bilangan bulat — latihan + prefix + map)
 *
 * Soal test:
 * - `subarraySumEqualsK([1, 1, 1], 2)` → `2`.
 *
 * Ringkasan soal:
 * - Hitung banyaknya subarray kontinu dengan jumlah tepat `k` (bisa negatif).
 *
 * Kontrak: `nums` integers; `k` integer.
 *
 * Solusi: Prefix sum + `Map` frekuensi prefix yang sudah dilihat; pola `current - k`.
 *
 * @param {number[]} nums
 * @param {number} k
 */
export function subarraySumEqualsK(nums, k) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  if (!Number.isInteger(k)) throw new RangeError("k must be an integer");
  /** @type {Map<number, number>} */
  const freq = new Map([[0, 1]]);
  let sum = 0;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    if (!Number.isInteger(x)) throw new TypeError("elements must be integers");
    sum += x;
    const need = sum - k;
    count += freq.get(need) ?? 0;
    freq.set(sum, (freq.get(sum) ?? 0) + 1);
  }
  return count;
}

/**
 * Judul: Bangun 2D prefix sum untuk matrix numerik
 *
 * Soal test:
 * - Matrix 2×3 contoh uji; dipasangkan dengan `rangeSum2D` untuk verifikasi sub-persegi.
 *
 * Ringkasan soal:
 * - `ps[i+1][j+1]` = jumlah persegi dari `(0,0)` ke `(i,j)` inklusif.
 *
 * Kontrak: `matrix` persegi panjang, baris sama panjang; finite numbers.
 *
 * Solusi: `ps[i][j] = val + ps[i-1][j] + ps[i][j-1] - ps[i-1][j-1]`.
 *
 * @param {number[][]} matrix
 * @returns {number[][]}
 */
export function buildPrefixSum2D(matrix) {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    throw new TypeError("matrix must be non-empty array");
  }
  const rows = matrix.length;
  const cols = matrix[0].length;
  for (let i = 0; i < rows; i++) {
    if (!Array.isArray(matrix[i]) || matrix[i].length !== cols) {
      throw new RangeError("matrix must be rectangular");
    }
  }
  /** @type {number[][]} */
  const ps = Array.from({ length: rows + 1 }, () => new Array(cols + 1).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const x = matrix[i][j];
      if (typeof x !== "number" || !Number.isFinite(x)) {
        throw new TypeError("cells must be finite numbers");
      }
      ps[i + 1][j + 1] = x + ps[i][j + 1] + ps[i + 1][j] - ps[i][j];
    }
  }
  return ps;
}

/**
 * Judul: Query jumlah sub-persegi dalam 2D prefix
 *
 * Soal test:
 * - `rangeSum2D(ps, 0, 0, 1, 2)` → `21`; `rangeSum2D(ps, 0, 1, 1, 2)` → `16` pada matrix contoh tes.
 *
 * Ringkasan soal:
 * - Koordinat inklusif `(r1,c1)` hingga `(r2,c2)`.
 *
 * Kontrak: indeks valid terhadap `matrix` asli.
 *
 * Solusi: Inklusi-eksklusi dari `ps`.
 *
 * @param {number[][]} ps
 * @param {number} r1
 * @param {number} c1
 * @param {number} r2
 * @param {number} c2
 */
export function rangeSum2D(ps, r1, c1, r2, c2) {
  if (!Array.isArray(ps)) throw new TypeError("ps must be array");
  if (![r1, c1, r2, c2].every((x) => Number.isInteger(x) && x >= 0)) {
    throw new RangeError("coordinates must be non-negative integers");
  }
  if (r1 > r2 || c1 > c2) throw new RangeError("invalid rectangle");
  return ps[r2 + 1][c2 + 1] - ps[r1][c2 + 1] - ps[r2 + 1][c1] + ps[r1][c1];
}

/**
 * Judul: Rata-rata subarray panjang `len` bergeser — via prefix
 *
 * Soal test:
 * - `rollingAveragesFromPrefix([1, 2, 3, 4], 2)` → `[1.5, 2.5, 3.5]`.
 *
 * Ringkasan soal:
 * - Alternatif sliding window; di sini via `rangeSumFromPrefix / len`.
 *
 * Kontrak: `arr` panjang `n`, `len` positif `<= n`.
 *
 * Solusi: Loop `i` start index.
 *
 * @param {number[]} arr
 * @param {number} len
 * @returns {number[]}
 */
export function rollingAveragesFromPrefix(arr, len) {
  if (!Array.isArray(arr)) throw new TypeError("arr must be an array");
  if (!Number.isInteger(len) || len <= 0 || len > arr.length) {
    throw new RangeError("len must be positive integer <= arr.length");
  }
  const ps = buildPrefixSum(arr);
  const out = [];
  for (let i = 0; i + len <= arr.length; i++) {
    out.push(rangeSumFromPrefix(ps, i, i + len - 1) / len);
  }
  return out;
}
