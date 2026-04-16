/**
 * Longest Increasing Subsequence
 * @see knowledge-base/05-coding-test2/096-longest-increasing-subsequence.md
 *
 * @param {number[]} nums
 * @returns {number}
 */
export function lengthOfLIS(nums) {
  const tails = [];
  for (const x of nums) {
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    if (lo === tails.length) tails.push(x);
    else tails[lo] = x;
  }
  return tails.length;
}
