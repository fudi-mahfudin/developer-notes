/**
 * Two Sum
 * @see knowledge-base/05-coding-test2/001-two-sum.md
 *
 * Ringkasan soal:
 * - Tingkat: Easy | Topik: Array & HashMap
 * - Diberi `nums` dan `target`, cari dua indeks berbeda i, j agar nums[i] + nums[j] === target.
 * - Input: nums (number[]), target (number). Output: number[] berisi [i, j] (i < j).
 * - Constraints (varian LC): biasanya ada tepat satu jawaban; elemen yang sama tidak boleh dipakai
 *   dua kali (indeks harus beda).
 *
 * Solusi: satu lintasan — simpan nilai -> indeks di Map; untuk tiap i cek complement = target - nums[i].
 * Time: O(n), Space: O(n)
 *
 * @param {number[]} nums
 * @param {number} target
 * @returns {number[]} [i, j] dengan i < j dan nums[i] + nums[j] === target, atau [] jika tidak ada
 */
export function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return [];
}
