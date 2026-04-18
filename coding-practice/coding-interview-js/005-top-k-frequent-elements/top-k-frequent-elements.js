/**
 * Top K Frequent Elements
 * @see knowledge-base/05-coding-interview-pembahasan/005-top-k-frequent-elements.md
 *
 * Ringkasan: k elemen dengan frekuensi tertinggi (urutan bebas untuk frek sama).
 * Time: O(n), Space: O(n)
 *
 * @param {number[]} nums
 * @param {number} k
 * @returns {number[]}
 */
export function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);

  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [n, f] of freq) buckets[f].push(n);

  const res = [];
  for (let f = buckets.length - 1; f >= 0 && res.length < k; f--) {
    for (const n of buckets[f]) {
      res.push(n);
      if (res.length === k) break;
    }
  }
  return res;
}
