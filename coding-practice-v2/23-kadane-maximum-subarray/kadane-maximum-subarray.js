/**
 * Judul: Topik 23 — Kadane / maximum subarray
 *
 * Soal test:
 * - maxSubArraySum: contoh klasik jumlah 6; array satu elemen; semua negatif → elemen terbesar.
 * - maxSubArrayRange: mengembalikan indeks dan jumlah untuk subarray optimal.
 *
 * Ringkasan soal:
 * - Subarray kontigu dengan jumlah maksimum — DP satu variabel `cur = max(x, cur+x)`.
 *
 * Solusi: Satu pass O(n), O(1) ruang; lacak `best` dan untuk range, reset `start` saat memulai subarray baru.
 *
 * @see knowledge-base/05-coding-interview-v2/23-kadane-maximum-subarray.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/23-kadane-maximum-subarray/kadane-maximum-subarray.test.js`
 */

/**
 * Judul: Jumlah subarray kontigu maksimum (Kadane)
 *
 * Soal test:
 * - Contoh `[-2,1,-3,4,-1,2,1,-5,4]` → `6`; `[5]` → `5`; `[-3,-1,-2]` → `-1`.
 *
 * Ringkasan soal:
 * - Tidak mengosongkan subarray (minimal satu elemen).
 *
 * Kontrak: `nums` non-kosong; setiap elemen finite number.
 *
 * Solusi: `cur = max(nums[i], cur + nums[i])`, `best = max(best, cur)`.
 *
 * @param {number[]} nums
 */
export function maxSubArraySum(nums) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  if (nums.length === 0) throw new RangeError("nums must be non-empty");
  let best = -Infinity;
  let cur = 0;
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    if (typeof x !== "number" || !Number.isFinite(x)) {
      throw new TypeError("elements must be finite numbers");
    }
    cur = Math.max(x, cur + x);
    best = Math.max(best, cur);
  }
  return best;
}

/**
 * Judul: Subarray maksimum beserta rentang indeks inklusif
 *
 * Soal test:
 * - Mengembalikan `{ sum, start, end }` dengan panjang minimal 1; `end >= start`.
 *
 * Ringkasan soal:
 * - Variasi interview: tunjukkan rentang untuk debugging / highlight UI.
 *
 * Kontrak: `nums` non-kosong; jika beberapa rentang dengan jumlah sama, ambil yang pertama selesai (greedy earliest).
 *
 * Solusi: Saat `cur = x` (reset), set `tempStart = i`; saat `best` update, set `start = tempStart`, `end = i`.
 *
 * @param {number[]} nums
 * @returns {{ sum: number; start: number; end: number }}
 */
export function maxSubArrayRange(nums) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  if (nums.length === 0) throw new RangeError("nums must be non-empty");
  let best = -Infinity;
  let cur = 0;
  let tempStart = 0;
  let bestStart = 0;
  let bestEnd = 0;
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    if (typeof x !== "number" || !Number.isFinite(x)) {
      throw new TypeError("elements must be finite numbers");
    }
    if (cur + x < x) {
      cur = x;
      tempStart = i;
    } else {
      cur = cur + x;
    }
    if (cur > best) {
      best = cur;
      bestStart = tempStart;
      bestEnd = i;
    }
  }
  return { sum: best, start: bestStart, end: bestEnd };
}

/**
 * Judul: Jumlah subarray maksimum dengan batas panjang (varian enterprise)
 *
 * Soal test:
 * - Dengan `maxLen = 2` pada `[1, -2, 3, 4]` jawaban dibatasi panjang window.
 *
 * Ringkasan soal:
 * - Latihan sliding window + Kadane-like; untuk `maxLen >= nums.length` setara Kadane biasa.
 *
 * Kontrak: `maxLen` integer 1..`nums.length`.
 *
 * Solusi: Untuk setiap `i`, pertahankan jendela akhir di `i` dengan panjang ≤ `maxLen` (deque atau loop — di sini O(n·maxLen) sederhana untuk kejelasan; untuk interview kecil OK).
 *
 * @param {number[]} nums
 * @param {number} maxLen
 */
export function maxSubArraySumWithMaxLength(nums, maxLen) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  if (nums.length === 0) throw new RangeError("nums must be non-empty");
  if (!Number.isInteger(maxLen) || maxLen < 1 || maxLen > nums.length) {
    throw new RangeError("maxLen must be integer in [1, nums.length]");
  }
  for (const x of nums) {
    if (typeof x !== "number" || !Number.isFinite(x)) throw new TypeError("elements must be finite numbers");
  }
  let best = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    let s = 0;
    for (let len = 1; len <= maxLen && i - len + 1 >= 0; len++) {
      s += nums[i - len + 1];
      best = Math.max(best, s);
    }
  }
  return best;
}
