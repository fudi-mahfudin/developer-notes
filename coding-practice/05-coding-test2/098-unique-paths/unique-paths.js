/**
 * Unique Paths
 * @see knowledge-base/05-coding-test2/098-unique-paths.md
 *
 * @param {number} m
 * @param {number} n
 * @returns {number}
 */
export function uniquePaths(m, n) {
  const dp = Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }
  return dp[n - 1];
}
