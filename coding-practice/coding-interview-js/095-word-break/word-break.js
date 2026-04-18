/**
 * Word Break
 * @see knowledge-base/05-coding-interview-pembahasan/095-word-break.md
 *
 * @param {string} s
 * @param {string[]} wordDict
 * @returns {boolean}
 */
export function wordBreak(s, wordDict) {
  const set = new Set(wordDict);
  const n = s.length;
  const dp = Array(n + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && set.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[n];
}
