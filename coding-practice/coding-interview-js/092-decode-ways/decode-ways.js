/**
 * Decode Ways
 * @see knowledge-base/05-coding-interview-pembahasan/092-decode-ways.md
 *
 * @param {string} s
 * @returns {number}
 */
export function numDecodings(s) {
  const n = s.length;
  const dp = Array(n + 1).fill(0);
  dp[n] = 1;
  for (let i = n - 1; i >= 0; i--) {
    if (s[i] === '0') {
      dp[i] = 0;
      continue;
    }
    dp[i] = dp[i + 1];
    if (i + 1 < n) {
      const two = Number(s.slice(i, i + 2));
      if (two >= 10 && two <= 26) dp[i] += dp[i + 2];
    }
  }
  return dp[0];
}
