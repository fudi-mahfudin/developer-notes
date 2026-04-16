/**
 * Split Array Largest Sum
 * @see knowledge-base/05-coding-test2/038-split-array-largest-sum.md
 *
 * @param {number[]} nums
 * @param {number} k
 * @returns {number}
 */

function splitsNeeded(nums, maxSum) {
  let parts = 1;
  let cur = 0;
  for (const x of nums) {
    if (cur + x > maxSum) {
      parts++;
      cur = x;
    } else cur += x;
  }
  return parts;
}

export function splitArray(nums, k) {
  let lo = Math.max(...nums);
  let hi = nums.reduce((a, b) => a + b, 0);
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (splitsNeeded(nums, mid) <= k) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
