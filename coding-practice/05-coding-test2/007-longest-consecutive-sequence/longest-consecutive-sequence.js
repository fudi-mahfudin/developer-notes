/**
 * Longest Consecutive Sequence
 * @see knowledge-base/05-coding-test2/007-longest-consecutive-sequence.md
 *
 * Ringkasan: panjang rentang bilangan bulat berurutan terpanjang di nums (O(n)).
 * Time: O(n), Space: O(n)
 *
 * @param {number[]} nums
 * @returns {number}
 */
export function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;
  for (const x of set) {
    if (set.has(x - 1)) continue;
    let y = x;
    let len = 0;
    while (set.has(y)) {
      len++;
      y++;
    }
    best = Math.max(best, len);
  }
  return best;
}
