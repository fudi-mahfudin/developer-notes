/**
 * Judul: Topik 16 — Two pointers
 *
 * Soal test:
 * - twoSumSorted: `[1,2,3,4,6]` target `6` → indeks `[1,3]`; tidak ada pasangan → `null`.
 * - isPalindromeAlphanumeric: frasa klasik true; `"race a car"` false.
 * - maxAreaWater: contoh tinggi standar → `49`.
 * - validPalindromeAtMostOneDelete: `"abca"` → `true`.
 * - mergeSorted: `[1,3]` + `[2,4]` → `[1,2,3,4]`.
 * - trapRainWater: contoh klasik → `6`.
 *
 * Ringkasan soal:
 * - Teknik dua indeks pada array terurut (two-sum, merge-like).
 * - Palindrome dengan filter alfanumerik (pointer kiri/kanan).
 * - Container with most water (pointer ke dalam).
 *
 * Solusi: Invariant pointer bergerak ke arah yang memperbaiki jawaban atau mempertahankan kontrak terurut.
 *
 * @see knowledge-base/05-coding-interview-v2/16-two-pointers.md
 *
 * Menjalankan tes: dari root repo Career, jalankan `pnpm test`.
 */

/**
 * @param {number[]} arr
 */
function assertSortedNonDecreasing(arr) {
  if (!Array.isArray(arr)) throw new TypeError("expected array");
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      throw new RangeError("array must be sorted non-decreasing");
    }
  }
}

/**
 * Judul: Two-sum pada array terurut non-descending
 *
 * Soal test:
 * - `twoSumSorted([1, 2, 3, 4, 6], 6)` → `[1, 3]`; `twoSumSorted([1, 2], 10)` → `null`.
 *
 * Ringkasan soal:
 * - Cari indeks `i < j` dengan `arr[i] + arr[j] === target` atau kembalikan `null`.
 *
 * Kontrak:
 * - `arr` terurut non-menurun; elemen finite number.
 * - `target` finite number.
 *
 * Solusi: Pointer kiri `l`, kanan `r`; jika jumlah > target geser `r--`, else `l++`.
 *
 * @param {number[]} arr
 * @param {number} target
 * @returns {[number, number] | null}
 */
export function twoSumSorted(arr, target) {
  if (!Array.isArray(arr)) throw new TypeError("arr must be an array");
  if (typeof target !== "number" || !Number.isFinite(target)) {
    throw new RangeError("target must be finite");
  }
  assertSortedNonDecreasing(arr);
  let l = 0;
  let r = arr.length - 1;
  while (l < r) {
    const a = arr[l];
    const b = arr[r];
    if (typeof a !== "number" || !Number.isFinite(a) || typeof b !== "number" || !Number.isFinite(b)) {
      throw new TypeError("elements must be finite numbers");
    }
    const s = a + b;
    if (s === target) return [l, r];
    if (s > target) r -= 1;
    else l += 1;
  }
  return null;
}

/**
 * Judul: Palindrome alfanumerik — case insensitive
 *
 * Soal test:
 * - `"A man, a plan, a canal: Panama"` → true; `"race a car"` → false.
 *
 * Ringkasan soal:
 * - Abaikan karakter non-alfanumerik; bandingkan simetri dari ujung.
 *
 * Kontrak: `s` string.
 *
 * Solusi: Dua pointer skip non-alnum; `toLowerCase` untuk huruf.
 *
 * @param {string} s
 */
export function isPalindromeAlphanumeric(s) {
  if (typeof s !== "string") throw new TypeError("s must be a string");
  const isAlnum = (c) => /[a-z0-9]/i.test(c);
  let l = 0;
  let r = s.length - 1;
  while (l < r) {
    while (l < r && !isAlnum(s[l])) l += 1;
    while (l < r && !isAlnum(s[r])) r -= 1;
    if (l >= r) break;
    if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;
    l += 1;
    r -= 1;
  }
  return true;
}

/**
 * Judul: Container with most water
 *
 * Soal test:
 * - `maxAreaWater([1,8,6,2,5,4,8,3,7])` → `49`.
 *
 * Ringkasan soal:
 * - Diberi tinggi tiang `heights[i]`, cari dua tiang yang membentuk wadah dengan air maksimum.
 *
 * Kontrak:
 * - `heights` array bilangan bulat non-negatif.
 *
 * Solusi: Dua pointer; area = `(r-l) * min(h[l],h[r])`; gerakkan pointer dengan tinggi lebih pendek.
 *
 * @param {number[]} heights
 */
export function maxAreaWater(heights) {
  if (!Array.isArray(heights)) throw new TypeError("heights must be an array");
  if (heights.length < 2) return 0;
  let l = 0;
  let r = heights.length - 1;
  let best = 0;
  while (l < r) {
    const hl = heights[l];
    const hr = heights[r];
    if (!Number.isInteger(hl) || hl < 0 || !Number.isInteger(hr) || hr < 0) {
      throw new RangeError("heights must be non-negative integers");
    }
    const w = r - l;
    best = Math.max(best, w * Math.min(hl, hr));
    if (hl < hr) l += 1;
    else r -= 1;
  }
  return best;
}

/**
 * Judul: Hapus paling banyak satu karakter agar palindrome
 *
 * Soal test:
 * - `validPalindromeAtMostOneDelete("abca")` → `true`.
 *
 * Ringkasan soal:
 * - Varian dua pointer: jika mismatch, coba skip kiri atau kanan (valid palindrome substring).
 *
 * Kontrak: `s` string huruf kecil saja (disederhanakan).
 *
 * Solusi: Helper `isPalRange` + rekursi satu level.
 *
 * @param {string} s
 */
export function validPalindromeAtMostOneDelete(s) {
  if (typeof s !== "string") throw new TypeError("s must be a string");
  const isPal = (i, j) => {
    while (i < j) {
      if (s[i] !== s[j]) return false;
      i += 1;
      j -= 1;
    }
    return true;
  };
  let l = 0;
  let r = s.length - 1;
  while (l < r) {
    if (s[l] !== s[r]) {
      return isPal(l + 1, r) || isPal(l, r - 1);
    }
    l += 1;
    r -= 1;
  }
  return true;
}

/**
 * Judul: Merge dua array terurut menjadi satu (latihan pointer)
 *
 * Soal test:
 * - `mergeSorted([1, 3], [2, 4])` → `[1, 2, 3, 4]`.
 *
 * Ringkasan soal:
 * - Gabungkan `a` dan `b` non-descending menjadi array terurut (bukan in-place merge ke `a`).
 *
 * Kontrak: keduanya terurut non-descending; angka finite.
 *
 * Solusi: Dua indeks; bandingkan kepala, dorong yang lebih kecil.
 *
 * @param {number[]} a
 * @param {number[]} b
 */
export function mergeSorted(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) throw new TypeError("a and b must be arrays");
  assertSortedNonDecreasing(a);
  assertSortedNonDecreasing(b);
  const out = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    const x = a[i];
    const y = b[j];
    if (typeof x !== "number" || !Number.isFinite(x) || typeof y !== "number" || !Number.isFinite(y)) {
      throw new TypeError("elements must be finite numbers");
    }
    if (x <= y) {
      out.push(x);
      i += 1;
    } else {
      out.push(y);
      j += 1;
    }
  }
  while (i < a.length) out.push(a[i++]);
  while (j < b.length) out.push(b[j++]);
  return out;
}

/**
 * Judul: Trap rain water (bonus klasik — dua pointer dari ujung)
 *
 * Soal test:
 * - `trapRainWater([0,1,0,2,1,0,1,3,2,1,2,1])` → `6`.
 *
 * Ringkasan soal:
 * - Hitung air yang tertampung antar tiang.
 *
 * Kontrak: `heights` non-negative integers.
 *
 * Solusi: Dua pointer dengan `leftMax` dan `rightMax`.
 *
 * @param {number[]} heights
 */
export function trapRainWater(heights) {
  if (!Array.isArray(heights)) throw new TypeError("heights must be an array");
  if (heights.length === 0) return 0;
  let l = 0;
  let r = heights.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;
  while (l < r) {
    const hl = heights[l];
    const hr = heights[r];
    if (!Number.isInteger(hl) || hl < 0 || !Number.isInteger(hr) || hr < 0) {
      throw new RangeError("heights must be non-negative integers");
    }
    if (hl < hr) {
      if (hl >= leftMax) leftMax = hl;
      else water += leftMax - hl;
      l += 1;
    } else {
      if (hr >= rightMax) rightMax = hr;
      else water += rightMax - hr;
      r -= 1;
    }
  }
  return water;
}
