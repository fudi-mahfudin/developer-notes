/**
 * Target Sum
 * @see knowledge-base/05-coding-test2/099-target-sum.md
 *
 * @param {number[]} nums
 * @param {number} target
 * @returns {number}
 */
export function findTargetSumWays(nums, target) {
  const offset = nums.reduce((a, b) => a + b, 0);
  let dp = Array(2 * offset + 1).fill(0);
  dp[offset] = 1;
  for (const x of nums) {
    const next = Array(2 * offset + 1).fill(0);
    for (let s = 0; s <= 2 * offset; s++) {
      if (dp[s] === 0) continue;
      if (s + x <= 2 * offset) next[s + x] += dp[s];
      if (s - x >= 0) next[s - x] += dp[s];
    }
    dp = next;
  }
  const idx = target + offset;
  if (idx < 0 || idx > 2 * offset) return 0;
  return dp[idx];
}
