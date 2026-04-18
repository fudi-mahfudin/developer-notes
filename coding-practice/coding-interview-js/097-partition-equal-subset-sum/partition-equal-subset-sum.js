/**
 * Partition Equal Subset Sum
 * @see knowledge-base/05-coding-interview-pembahasan/097-partition-equal-subset-sum.md
 *
 * @param {number[]} nums
 * @returns {boolean}
 */
export function canPartition(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2) return false;
  const t = sum / 2;
  const dp = Array(t + 1).fill(false);
  dp[0] = true;
  for (const x of nums) {
    for (let s = t; s >= x; s--) {
      dp[s] = dp[s] || dp[s - x];
    }
  }
  return dp[t];
}
