/**
 * Judul: Topik 40 — Subarray sum equals K
 *
 * Soal test:
 * - subarraySumEqualsK: banyak subarray kontinu dengan jumlah tepat `k` (integer, boleh negatif).
 *
 * Kontrak: `nums` array integer; `k` integer.
 *
 * Solusi: Prefix sum + `Map` frekuensi prefix; `count += freq.get(sum - k)`.
 *
 * @see knowledge-base/05-coding-interview-v2/40-subarray-sum-equals-k.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/40-subarray-sum-equals-k/subarray-sum-equals-k.test.js`
 */

/**
 * Judul: Hitung subarray dengan jumlah `k`
 *
 * Soal test:
 * - `[1,1,1]`, `k=2` → `2`.
 *
 * Kontrak: `nums` tidak kosong boleh; jika kosong dan `k===0` definisikan 0 subarray.
 *
 * Solusi: `sum` running; `need = sum - k`; akumulasi dari map prefix.
 *
 * @param {number[]} nums
 * @param {number} k
 */
export function subarraySumEqualsK(nums, k) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  if (!Number.isInteger(k)) throw new RangeError("k must be integer");
  for (const x of nums) {
    if (!Number.isInteger(x)) throw new TypeError("elements must be integers");
  }
  /** @type {Map<number, number>} */
  const freq = new Map([[0, 1]]);
  let sum = 0;
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    const need = sum - k;
    count += freq.get(need) ?? 0;
    freq.set(sum, (freq.get(sum) ?? 0) + 1);
  }
  return count;
}

/**
 * Judul: Prefix sum 1D (untuk debugging / subarray manual)
 *
 * Soal test:
 * - `[1,2,3]` → `[0,1,3,6]`.
 *
 * Kontrak: integer finite.
 *
 * Solusi: Akumulasi.
 *
 * @param {number[]} nums
 * @returns {number[]}
 */
export function buildPrefixSum1D(nums) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  /** @type {number[]} */
  const ps = [0];
  for (const x of nums) {
    if (!Number.isInteger(x)) throw new TypeError("integers only");
    ps.push(ps[ps.length - 1] + x);
  }
  return ps;
}

/**
 * Judul: Jumlah subarray [l..r] inklusif dari prefix
 *
 * Soal test:
 * - Konsisten dengan selisih prefix.
 *
 * Kontrak: indeks valid.
 *
 * Solusi: `ps[r+1]-ps[l]`.
 *
 * @param {number[]} ps
 * @param {number} l
 * @param {number} r
 */
export function rangeSumFromPrefix1D(ps, l, r) {
  if (!Array.isArray(ps)) throw new TypeError("ps must be array");
  if (!Number.isInteger(l) || !Number.isInteger(r) || l < 0 || r < l) throw new RangeError("invalid range");
  if (r + 1 >= ps.length) throw new RangeError("out of range");
  return ps[r + 1] - ps[l];
}

/**
 * Judul: Apakah ada subarray dengan jumlah `k` (boolean)
 *
 * Soal test:
 * - Sama dengan `subarraySumEqualsK(nums,k) > 0`.
 *
 * Kontrak: sama.
 *
 * Solusi: Delegasi count.
 *
 * @param {number[]} nums
 * @param {number} k
 */
export function hasSubarraySumK(nums, k) {
  return subarraySumEqualsK(nums, k) > 0;
}
